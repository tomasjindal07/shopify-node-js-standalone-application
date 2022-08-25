const Product = require('../../models/product');
const ProductVariant = require('../../models/product_variant');

exports.postProduct = async (req,res) => {

    const shopifyProduct = JSON.parse(req.body);
    
    const productData = {
        shop_id             : req.shopData.id,
        shopify_product_id  : shopifyProduct.id,
        title               : shopifyProduct.title,
	    description         : shopifyProduct.body_html,
	    image_url           : (shopifyProduct.image.src) ? shopifyProduct.image.src : '',
	    handle              : shopifyProduct.handle,
	    status              : shopifyProduct.status
    };

    try {
        let product = await Product.findOne({where: {shop_id : req.shopData.id,shopify_product_id:shopifyProduct.id}});

        if(product){
            await product.update(productData);
        } else {
            product = await Product.create(productData);
        }

        if(product && shopifyProduct.variants.length > 0){
            shopifyProduct.variants.map(async (variant) => {

                const productVariantData = {
                    product_id          : product.id,
                    shopify_variant_id  : variant.id,
                    title               : variant.title,
	                price               : variant.price,
	                sku                 : variant.sku,
	                weight              : variant.weight,
	                inventory_quantity  : variant.inventory_quantity
                };

                let productVariant = await ProductVariant.findOne({
                    where: {
                        product_id : product.id,
                        shopify_variant_id:variant.id
                    }
                });

                if(productVariant){
                    await productVariant.update(productVariantData);
                } else {
                    productVariant = await ProductVariant.create(productVariantData);
                }
            });
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