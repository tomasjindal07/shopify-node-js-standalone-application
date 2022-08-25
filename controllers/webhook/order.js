const Order     = require('../../models/order');
const OrderItem     = require('../../models/order_item');
const Customer  = require('../../models/customer');
const Product   = require('../../models/product');
const ProductVariant   = require('../../models/product_variant');

exports.postOrder = async (req,res) => {

    const shopifyOrder = JSON.parse(req.body);
    
    const customerId = shopifyOrder.customer.id;
    const customer   = await Customer.findOne({where: {shop_id : req.shopData.id,shopify_customer_id:customerId}});
    
    const orderData = {
        shop_id                     : req.shopData.id,
        customer_id                 : (customer) ? customer.id : 0,
        shopify_order_id            : shopifyOrder.id,
        order_number                : shopifyOrder.order_number,
        financial_status            : (shopifyOrder.financial_status) ? shopifyOrder.financial_status : '',
        fulfillment_status          : (shopifyOrder.fulfillment_status) ? shopifyOrder.fulfillment_status : '',
        total_price                 : shopifyOrder.total_price,
        email                       : shopifyOrder.email,
        phone                       : shopifyOrder.phone,
        billing_first_name          : (shopifyOrder.billing_address.first_name)      ? shopifyOrder.billing_address.first_name       : '', 
        billing_last_name           : (shopifyOrder.billing_address.last_name)       ? shopifyOrder.billing_address.last_name        : '', 
        billing_address_1           : (shopifyOrder.billing_address.address1)        ? shopifyOrder.billing_address.address1         : '', 
        billing_address_2           : (shopifyOrder.billing_address.address2)        ? shopifyOrder.billing_address.address2         : '', 
        billing_zip                 : (shopifyOrder.billing_address.zip)             ? shopifyOrder.billing_address.zip              : '', 
        billing_city                : (shopifyOrder.billing_address.city)            ? shopifyOrder.billing_address.city             : '', 
        billing_province_code       : (shopifyOrder.billing_address.province_code)   ? shopifyOrder.billing_address.province_code    : '', 
        billing_country_code        : (shopifyOrder.billing_address.country_code)    ? shopifyOrder.billing_address.country_code     : '',
        billing_phone               : (shopifyOrder.billing_address.phone)           ? shopifyOrder.billing_address.phone            : '',
        shipping_first_name         : (shopifyOrder.shipping_address.first_name)     ? shopifyOrder.shipping_address.first_name      : '', 
        shipping_last_name          : (shopifyOrder.shipping_address.last_name)      ? shopifyOrder.shipping_address.last_name       : '', 
        shipping_address_1          : (shopifyOrder.shipping_address.address1)       ? shopifyOrder.shipping_address.address1        : '', 
        shipping_address_2          : (shopifyOrder.shipping_address.address2)       ? shopifyOrder.shipping_address.address2        : '', 
        shipping_zip                : (shopifyOrder.shipping_address.zip)            ? shopifyOrder.shipping_address.zip             : '', 
        shipping_city               : (shopifyOrder.shipping_address.city)           ? shopifyOrder.shipping_address.city            : '', 
        shipping_province_code      : (shopifyOrder.shipping_address.province_code)  ? shopifyOrder.shipping_address.province_code   : '', 
        shipping_country_code       : (shopifyOrder.shipping_address.country_code)   ? shopifyOrder.shipping_address.country_code    : '', 
        shipping_phone              : (shopifyOrder.shipping_address.phone)          ? shopifyOrder.shipping_address.phone           : ''  
    };

    try {
        let o = await Order.findOne({where: {shop_id : req.shopData.id,shopify_order_id:shopifyOrder.id}});

        if(o){
            await o.destroy();
        }

        const order = await Order.create(orderData);

        if(order){
            if(shopifyOrder.line_items.length > 0){
                shopifyOrder.line_items.map(async(line_item) => {
                    const variant_id = line_item.variant_id;

                    const product = await Product.findOne({
                        where : {
                            shop_id : req.shopData.id,
                        },
                        include : {
                            model : ProductVariant,
                            where : {
                                shopify_variant_id : variant_id
                            }
                        }
                    });

                    if(product){
                        const orderItemData = {
                            order_id	            :  order.id,
                            product_variant_id	    :  product.product_variants[0].id,
                            shopify_line_item_id    : line_item.id,
                            quantity                : line_item.quantity,
                            price                   : line_item.price,
                            extra   : JSON.stringify({
                                name    : line_item.name,
                                sku     : line_item.sku,
                                grams   : line_item.grams
                            })
                        }

                        await OrderItem.create(orderItemData);
                    }
                });
            }
        }

        res.status(200).json({
            success : true
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false,
            message : error
        });
    }
};