'use strict'
const env = process.env.NODE_ENV || 'development',
      config = require(`${__dirname}/../config/config.json`)[env],
      connectString = process.env.DATABASE_URL || config.url,
      Sequelize = require('sequelize');
      // sequelize = new Sequelize(config.url_prod, {

let sequelize;
if (env === 'production') {
  sequelize = new Sequelize(connectString, {
    dialect: 'postgres',
      ssl: true,
      operatorsAliases: 'false',
      dialectOptions: {
        ssl: true
    },
  });
} else {
  sequelize = new Sequelize(connectString, {
    dialect: 'postgres',
    ssl: false,
    operatorsAliases: 'false',
    dialectOptions: {
      ssl: false
    },
  });
}

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
