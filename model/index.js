'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.POSRGRESQL_LOCAL_DB, '', '', {
  host: process.env.POSTGRESQL_LOCAL_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl:true
  },
  define: { timestamps: false},
  freezeTableName: true,
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  },
  operatorsAliases: false,
});

const basename = path.basename(module.filename);

const env = process.env.NODE_ENV || 'development';
// const config = require('../config/config.json')[env];// `${__dirname}./../config/config`)[env]
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
// import config from './../config';

const db = {};
/* let sequelize;
if(config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.url);
} */

fs
  .readdirSync(__dirname)
  // .readdirSync('./model/')
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

exports = db;
