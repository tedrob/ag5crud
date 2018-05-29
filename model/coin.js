'use strict'
module.exports = (sequelize, DataTypes) => {
  const Coin = sequelize.definne('Coin', {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
});
  return Coin;
};
