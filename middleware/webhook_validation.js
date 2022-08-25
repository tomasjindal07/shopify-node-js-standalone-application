const Shop = require('../models/shop');
const Shopify = require('../libraries/Shopify');

module.exports = async (req,res, next) => {
    
    const hmac = req.headers['x-shopify-hmac-sha256'];
    const shop = req.headers['x-shopify-shop-domain'];

    if(!shop || !hmac){
        return res.status(401).json({
            success : false,
            message : "Unauthorized"
        });
    }

    const shopData = await Shop.findOne({where : {shop: shop, status : 'A'}});

    if(!shopData){
        return res.status(404).json({
            success : false,
            message : "Shop Not Found"
        });
    }

    const shopCredentials = JSON.parse(shopData.credentials);

    const shopify = new Shopify(shop,shopCredentials.access_token);
    const isValid = shopify.verifyWebhook(req.body,hmac);

    if(!isValid){
        return res.status(401).json({
            success : false,
            message : "Unauthorized"
        });
    }

    req.shopData = shopData;

    next();
}