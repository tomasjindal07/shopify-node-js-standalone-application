const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

/* Load Route */
const webRoute = require('./routes/web');
const webhookRoute = require('./routes/webhook');

/* Load util */
const sequelize = require('./util/database');

/* Load Models */
const Shop = require('./models/shop');
const Customer = require('./models/customer');
const Product = require('./models/product');
const ProductVariant = require('./models/product_variant');
const Order = require('./models/order');
const OrderItem = require('./models/order_item');

/* Create Epxress App Server */
const app = express();

/* Set Template Engine */
app.set('view engine', 'ejs');
app.set('views', 'views');

/* Define Static Path to Load Css and Js */
app.use(express.static(path.join(__dirname, 'public')));

/* Start Session */
app.use(
    session({
        secret: 'IERYIEUWYIEWDFJKSB26438664872647724JF!@#$%^&*()_+',
        resave: false,
        saveUninitialized: false,
        store: new SequelizeStore({
            db: sequelize,
        }),
    })
);

/* Routes */
app.use(bodyParser.urlencoded({extended:false}),webRoute);
app.use('/webhook',bodyParser.raw({ type: "application/json", inflate:true }),webhookRoute);


/* 404 : Page not Found */
app.use((req,res,next) => {
    res.render('errors/404');
});

/* Associations */
Shop.hasMany(Customer,{
    foreignKey : 'shop_id'
});
Customer.belongsTo(Shop,{
    constraints : true, 
    onDelete : 'CASCADE',
    foreignKey : 'shop_id'
});

Shop.hasMany(Product,{
    foreignKey : 'shop_id'
});
Product.belongsTo(Shop,{
    constraints : true, 
    onDelete : 'CASCADE',
    foreignKey : 'shop_id'
});

Product.hasMany(ProductVariant,{
    foreignKey : 'product_id'
});
ProductVariant.belongsTo(Product,{
    constraints : true, 
    onDelete : 'CASCADE',
    foreignKey : 'product_id'
});

Shop.hasMany(Order,{
    foreignKey : 'shop_id'
});
Order.belongsTo(Shop,{
    constraints : true, 
    onDelete : 'CASCADE',
    foreignKey : 'shop_id'
});

Order.hasMany(OrderItem,{
    foreignKey : 'order_id'
});
OrderItem.belongsTo(Order,{
    constraints : true, 
    onDelete : 'CASCADE',
    foreignKey : 'order_id'
});

Customer.hasMany(Order,{
    foreignKey : 'customer_id'
});
Order.belongsTo(Customer,{
    constraints : true, 
    onDelete : 'CASCADE',
    foreignKey : 'customer_id'
});

Order.belongsToMany(ProductVariant,{through : OrderItem, foreignKey: 'order_id'});
ProductVariant.belongsToMany(Order,{through : OrderItem, foreignKey: 'product_variant_id'});

/* 
    Sync DB
    Listen Server
*/
sequelize.sync()
.then((result) => {
    app.listen(3000);   
})
.catch((error) => {
    console.log(error);
});