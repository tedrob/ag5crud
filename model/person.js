module.exports = (sequelize, DataTypes) => {
  //return const Person = sequelize.define('Person', {
  const Persons = sequelize.define('Person', {
    name : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    }, email : {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  return Persons;
};
