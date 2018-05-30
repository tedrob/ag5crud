'use strict';
module.exports = (sequelize, DataTypes) => {
  var Test = sequelize.define('Test', {
    name: DataTypes.STRING,
    cost: DataTypes.DECIMAL
  }, {});
  Test.associate = function(models) {
    // associations can be defined here
  };
  return Test;
};