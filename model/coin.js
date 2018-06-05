'use strict'
const env = process.env.MODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const Sequelize = require('sequelize');
const Datatypes = require('sequelize/lib/data-types');
const sequelize = new Sequelize(config.url_prod, {
  dialect: 'postgres',
  'ssl': true,
  operatorsAliases: 'false',
  dialectOptions: {
    ssl: true
  },
});

module.exports = (sequelize, DataTypes) => { //
  const Coin = sequelize.define('Coin', {
    name: {
      type: Datatypes.STRING,
      allowNull: true,
    },
    price: {
      type: Datatypes.DECIMAL,
      allowNull: true,
    },
  });
    return Coin;
}; //
