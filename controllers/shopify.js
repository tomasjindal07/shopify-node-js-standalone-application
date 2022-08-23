const Shop = require('../models/shop');
const Shopify = require('../libraries/Shopify');

exports.getShopifyCallBack = async (req,res) => {
    const shop = req.query.shop;
    const shopify = new Shopify(shop);
    const isValidRequest = shopify.hmacvalidator(req.query);

    if(!isValidRequest){
        return res.status(401).render('errors/error');
    }

    try {
        const shopData = await Shop.findOne({where : {shop: shop, status : 'A'}});
        
        if(!shopData){
            const shopify     = new Shopify(shop);
            const redirectUrl = shopify.startBasicAuth(req.query);
            if(redirectUrl != false){
                return res.redirect(redirectUrl);
            }

            return res.status(401).render('errors/error');
        } else {

            const storeData = JSON.parse(shopData.credentials);

            req.session.shop         = shop;
            req.session.access_token = storeData.access_token;
            req.session.shop_name    = shopData.shop_name;
            req.session.email        = shopData.email;

            return res.redirect('/');
        }
    } catch (error) {
        return res.status(404).render('errors/404');   
    }
};

exports.getShopifyRedirect = async (req,res,next) => {
    const shop = req.query.shop;
    const shopify = new Shopify(shop);
    const isValidRequest = shopify.hmacvalidator(req.query);

    
    if(!isValidRequest){
        return res.status(401).render('errors/error');
    } else {

        const tokenData = await shopify.getAccessToken(req.query.code);

        if(!tokenData){
            return res.status(401).render('errors/error');
        } else {

            const shopData = await shopify.getShopData();

            if(!shopData){
                return res.status(401).render('errors/error');
            }
            
            const insertData = {
                shop : shop,
                credentials : JSON.stringify({
                    access_token    : tokenData.access_token,
                    scopes          : tokenData.scope,
                }),
                city            : shopData.city,
                country         : shopData.country_code,
                email           : shopData.email,
                currency        : shopData.currency,
                domain          : shopData.domain,
                phone           : shopData.phone,
                shop_name       : shopData.name,
                status          : 'A'
            };

            try {
                const s = await Shop.findOne({where : {shop: shop}});
            
                if(s){
                    await s.update(insertData);
                } else {
                    await Shop.create(insertData);
                }

                const uninstalledWebhookData = await shopify.postWebhooks('app/uninstalled','api/uninstalled');

                req.session.shop         = shop;
                req.session.access_token = tokenData.access_token;
                req.session.shop_name    = shopData.shop_name;
                req.session.email        = shopData.email;
                
                return res.redirect('/');
            } catch (error) {
                return res.status(401).render('errors/error');
            }   
        } 
    }
};