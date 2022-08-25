const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const OrderItem = sequelize.define('order_item',{
  id: {
    type : Sequelize.INTEGER,
    autoIncrement : true,
    allowNull: false,
    primaryKey: true
  },
  order_id:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  product_variant_id:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  shopify_line_item_id:{
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  quantity:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price:{
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  extra:{
    type: Sequelize.TEXT,
    allowNull: false,
  }
},
{
  timestamps : false,
  indexes : [
    {
      fields: ['shopify_line_item_id']
    },
    {
      fields: ['quantity']
    }
  ]
});

module.exports = OrderItem;