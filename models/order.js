const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Order = sequelize.define('order',{
  id: {
    type : Sequelize.INTEGER,
    autoIncrement : true,
    allowNull: false,
    primaryKey: true
  },
  shop_id:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  customer_id:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  shopify_order_id:{
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  order_number:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  financial_status:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  fulfillment_status:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  total_price:{
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  email:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  billing_first_name:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  billing_last_name:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  billing_phone:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  billing_address_1:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  billing_address_2:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  billing_zip:{
    type: Sequelize.STRING,
    allowNull: false,
    length: 10
  },
  billing_city:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  billing_province_code:{
    type: Sequelize.STRING,
    allowNull: false,
    length: 3
  },
  billing_country_code:{
    type: Sequelize.STRING,
    allowNull: false,
    length: 3
  },
  shipping_first_name:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  shipping_last_name:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  shipping_phone:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  shipping_address_1:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  shipping_address_2:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  shipping_zip:{
    type: Sequelize.STRING,
    allowNull: false,
    length: 10
  },
  shipping_city:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  shipping_province_code:{
    type: Sequelize.STRING,
    allowNull: false,
    length: 3
  },
  shipping_country_code:{
    type: Sequelize.STRING,
    allowNull: false,
    length: 3
  }
},
{
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  indexes : [
    {
      unique: true,
      fields: ['shop_id','shopify_order_id']
    },
    {
      fields: ['email']
    },
    {
      fields: ['phone']
    },
    {
      fields: ['order_number']
    },
    {
      fields: ['financial_status']
    },
    {
      fields: ['fulfillment_status']
    },
    {
      fields: ['customer_id']
    }
  ]
});

module.exports = Order;