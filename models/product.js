const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product',{
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
  shopify_product_id:{
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  title:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  description:{
    type: Sequelize.TEXT,
    allowNull: false,
  },
  image_url:{
    type: Sequelize.TEXT,
    allowNull: false,
  },
  handle:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  status:{
    type: Sequelize.STRING,
    allowNull: false,
  }
},
{
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  indexes : [
    {
      unique: true,
      fields: ['shop_id','shopify_product_id']
    },
    {
      fields: ['handle']
    },
    {
      fields: ['status']
    }
  ]
});

module.exports = Product;