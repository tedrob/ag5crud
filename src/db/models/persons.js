'use strict';
module.exports = (sequelize, DataTypes) => {
  var Persons = sequelize.define('Persons', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 100] },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Persons.associate = (models) => {
    // associations can be defined here
  };
  return Persons;
};
