const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Customer = sequelize.define('customer',{
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
  shopify_customer_id:{
    type: Sequelize.BIGINT,
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
  first_name:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  address_1:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  address_2:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  zip_code:{
    type: Sequelize.STRING,
    allowNull: false,
    length: 10
  },
  city:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  province_code:{
    type: Sequelize.STRING,
    allowNull: false,
    length: 3
  },
  country_code:{
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
      fields: ['shop_id','shopify_customer_id']
    },
    {
      fields: ['email']
    },
    {
      fields: ['phone']
    },
    {
      fields: ['province_code']
    },
    {
      fields: ['country_code']
    }
  ]
});

module.exports = Customer;