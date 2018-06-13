'use strict';
// const Datatypes = require('sequelize/lib/data-types');

module.exports = (sequelize, DataTypes) => {
  console.log('models-define coin');
  const Coin = sequelize.define('Coin', {
    name:  DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {});
  Coin.associate = (models) => {
    // associations can be defined here
  };
  return Coin;
};
