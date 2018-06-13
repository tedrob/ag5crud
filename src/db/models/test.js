'use strict';
//const Datatypes = require('sequelize/lib/data-types');

module.exports = (sequelize, DataTypes) => {
  console.log('define test');
  var Test = sequelize.define('Test', {
    name: DataTypes.STRING,
    cost: DataTypes.DECIMAL
  }, {});
  Test.associate = function(models) {
    // associations can be defined here
  };
  return Test;
};
