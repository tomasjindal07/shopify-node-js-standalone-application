const crypto = require('crypto');
const axios  = require('axios');

const { config  } = require('../config');

class Shopify {
    constructor(shop,access_token = ''){
        this.shop           = shop;
        this.access_token   = access_token;
        this.api_key        = config.shopify.api_key;
        this.api_secret     = config.shopify.api_secret;
        this.api_version    = config.shopify.api_version;
        this.base_url       = config.base_url;
    }

    startBasicAuth(parameters){
        const query = {
            client_id: this.api_key,
            scope: "read_products,read_customers,read_fulfillments,read_checkouts,read_analytics,read_orders,read_script_tags,write_script_tags,read_price_rules,read_discounts,write_discounts,read_price_rules,write_price_rules",
            redirect_uri: this.base_url+"/redirect",
            state: +new Date()
        };
        const queryString = new URLSearchParams(query).toString();
        
        return `https://${this.shop}/admin/oauth/authorize?${queryString}`; 
    }

    hmacvalidator(params){

        const parameters = [];
        const hmac = params.hmac;
        for (const key in params) {
            if (key !== "hmac" && key !== "signature") {
                parameters.push(key + '=' + params[key]);
            }
        }

        const message = parameters.sort().join(hmac ? '&' : '');

        const generateHmac = crypto
            .createHmac('SHA256', this.api_secret)
            .update(message)
            .digest('hex');

        return generateHmac === hmac;
    }

    verifyWebhook(data,hmac){
        const generateHmac = crypto
            .createHmac('sha256', this.api_secret)
            .update(data, 'utf8', 'hex')
            .digest('base64');

            return generateHmac === hmac;
    }

    async getAccessToken(code){        
        const url = "https://"+this.shop+"/admin/oauth/access_token";
        
        const headers = {
            'Content-Type': 'application/json',
        };
        
        const requestBody = {
            client_id       : this.api_key,
            client_secret   : this.api_secret,
            code            : code
        };

        try {
            const tokenData = await axios.post(url,requestBody,{
                headers: headers
            });
    
            this.access_token = tokenData.data.access_token;
    
            return tokenData.data;

        } catch (error) {
            return false;
        }
    }

    async getShopData(){
        const url = "https://"+this.api_key+":"+this.access_token+"@"+this.shop+"/admin/api/"+this.api_version+"/shop.json";
        
        const headers = {
            'Content-Type': 'application/json',
        };

        try {

            const shopData = await axios.get(url,{
                headers: headers
            });
    
            return shopData.data.shop;

        } catch (error) {
            return false;
        }
    }

    async postWebhooks(topic,address){
        const url = "https://"+this.api_key+":"+this.access_token+"@"+this.shop+"/admin/api/"+this.api_version+"/webhooks.json";

        const headers = {
            'Content-Type': 'application/json',
        };

        const requestBody = {
            webhook : {
                topic   : topic,
                address : `${this.base_url}/${address}`,
                format  : "json"
            }
        };

        try {
            const webhookData = await axios.post(url,requestBody,{
                headers: headers
            });
    
            return webhookData.data.webhook;

        } catch (error) {
            return false;
        }

    }
}

module.exports = Shopify;