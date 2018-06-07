'use strict';
// const Datatypes = require('sequelize/lib/data-types');

module.exports = (sequelize, DataTypes) => {
  var Coin = sequelize.define('Coin', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {});
  Coin.associate = function(models) {
    // associations can be defined here
  };
  return Coin;
};
