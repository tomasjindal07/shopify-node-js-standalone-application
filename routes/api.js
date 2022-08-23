const express = require('express');

const isValidWebhook = require('../middleware/webhook_validation');
const webhooksController = require('../controllers/api/webhooks');
 
const route = express.Router();

route.post('/uninstalled/',isValidWebhook,webhooksController.postUninstall);

module.exports = route;