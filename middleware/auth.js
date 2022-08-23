const Shop = require('../models/shop');
const { config  } = require('../config');

module.exports = async (req,res, next) => {
    if(!req.session.shop || !req.session.access_token){
        return res.render('errors/404');
    }

    const shop = req.session.shop;
    const shopData = await Shop.findOne({where : {shop: shop, status : 'A'}});

    if(!shopData){
        return res.redirect(config.shopify_app_url);
    }
    
    req.shopData = shopData;

    next();
}