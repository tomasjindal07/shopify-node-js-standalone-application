const express = require('express');

const isValidWebhook        = require('../middleware/webhook_validation');
const shopController        = require('../controllers/webhook/shop');
const customerController    = require('../controllers/webhook/customer');
const productController     = require('../controllers/webhook/product');
const orderController     = require('../controllers/webhook/order');
 
const route = express.Router();

route.post('/uninstalled/',isValidWebhook,shopController.postUninstall);
route.post('/customer/create/',isValidWebhook,customerController.postCustomer);
route.post('/product/create/',isValidWebhook,productController.postProduct);
route.post('/order/create/',isValidWebhook,orderController.postOrder);

module.exports = route;