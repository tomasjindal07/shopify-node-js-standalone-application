const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Shop = sequelize.define('shop',{
  id: {
    type : Sequelize.INTEGER,
    autoIncrement : true,
    allowNull: false,
    primaryKey: true
  },
  shop:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  shop_name:{
    type: Sequelize.STRING,
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
  country:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  currency:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  domain:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  credentials:{
    type: Sequelize.TEXT
  },
  status:{
    type: Sequelize.CHAR,
    allowNull: false,
    length: 1,
    default:'A'
  }
},
{
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  indexes : [
    {
      unique: true,
      fields: ['shop']
    },
    {
      fields: ['status']
    }
  ]
});

module.exports = Shop;