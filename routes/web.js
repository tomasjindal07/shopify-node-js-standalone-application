const express = require('express');

const isAuth = require('../middleware/auth');

const dasboardController = require('../controllers/dashboard');
const shopifyController = require('../controllers/shopify');

const route = express.Router();

/* Shopify App Route   */
route.get('/callback/',shopifyController.getShopifyCallBack);
route.get('/redirect/',shopifyController.getShopifyRedirect);


/* Dashboard Route */
route.get('/', isAuth, dasboardController.getDashboard);

module.exports = route;