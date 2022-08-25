const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ProductVariant = sequelize.define('product_variant',{
  id: {
    type : Sequelize.INTEGER,
    autoIncrement : true,
    allowNull: false,
    primaryKey: true
  },
  product_id:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  shopify_variant_id:{
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  title:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  price:{
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  sku:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  weight:{
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  inventory_quantity:{
    type: Sequelize.INTEGER,
    allowNull: false,
  }
},
{
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  indexes : [
    {
      unique: true,
      fields: ['product_id','shopify_variant_id']
    },
    {
      fields: ['sku']
    }
  ]
});

module.exports = ProductVariant;