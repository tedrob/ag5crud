'use strict'
const env = process.env.NODE_ENV || 'development',
      config = require(`${__dirname}/../config/config.json`)[env],
      Sequelize = require('sequelize'),
// const Datatypes = require('sequelize/lib/data-types');
      sequelize = new Sequelize(config.url_prod, {
        dialect: 'postgres',
        ssl: true,
        operatorsAliases: 'false',
        dialectOptions: {
          ssl: true
      },
});

module.exports = (sequelize, DataTypes) => { //
  const Coin = sequelize.define('Coin', {
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: true,
    },
  });
    return Coin;
};
