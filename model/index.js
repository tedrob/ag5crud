'use strict';

const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const Sequelize = require('sequelize');
let sequelize;
console.log('index', env);

if (env === 'production') {
  console.log('index-prod');
  sequelize = new Sequelize(config.url_prod, {
    'host': process.env.POSTGRESQL_LOCAL_HOST,
    'dialect': 'postgres',
    'ssl': true,
    'dialectOptions': {
      ssl: true
    },
    'operatorsAliases': false,
  });
} else {
  console.log('index-dev');
  sequelize = new Sequelize(config.url, {
    'host': process.env.POSTGRESQL_LOCAL_HOST,
    'dialect': 'postgres',
    'ssl': false,
    'dialectOptions': {
      'ssl': false,
    },
    'operatorsAliases': false,
  });
}

sequelize
  .authenticate()
  .then((err) => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database', err.info)
  });

const basename = path.basename(module.filename); //

const db = {}; //

fs
  .readdirSync(__dirname) //
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

