const Customer = require('../../models/customer');

exports.postCustomer = async (req,res) => {

    const shopifyCustomer = JSON.parse(req.body);
    
    const customerData = {
        shop_id             : req.shopData.id,
        shopify_customer_id : shopifyCustomer.id,
        email               : shopifyCustomer.email,
        phone               : shopifyCustomer.phone,
        first_name          : (shopifyCustomer.default_address.first_name)    ? shopifyCustomer.default_address.first_name      : '', 
        last_name           : (shopifyCustomer.default_address.last_name)     ? shopifyCustomer.default_address.last_name       : '', 
        address_1           : (shopifyCustomer.default_address.address1)      ? shopifyCustomer.default_address.address1        : '', 
        address_2           : (shopifyCustomer.default_address.address2)      ? shopifyCustomer.default_address.address2        : '', 
        zip_code            : (shopifyCustomer.default_address.zip)           ? shopifyCustomer.default_address.zip             : '', 
        city                : (shopifyCustomer.default_address.city)          ? shopifyCustomer.default_address.city            : '', 
        province_code       : (shopifyCustomer.default_address.province_code) ? shopifyCustomer.default_address.province_code   : '', 
        country_code        : (shopifyCustomer.default_address.country_code)  ? shopifyCustomer.default_address.country_code    : ''  
    };

    try {
        let customer = await Customer.findOne({where: {shop_id : req.shopData.id,shopify_customer_id:shopifyCustomer.id}});

        if(customer){
            await customer.update(customerData);
        } else {
            customer = await Customer.create(customerData);
        }

        console.log(customer);

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