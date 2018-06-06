'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
// const basename = path.basename(module.filename);
const env       = process.env.NODE_ENV || 'development';
const config = require('\../config.json')[env];
const connectString = process.env.DATABASE_URL || config.url;

const db        = {};

console.log('checking', '(', process.env[config.use_env_variable],')');

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(connectString, {
    dialect: 'postgres',
      ssl: false,
      operatorsAliases: 'false',
      dialectOptions: {
        ssl: false
      },
    }
  );
};
console.log('ccof-fs',env);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    // console.log('model', model.name);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

console.log('fs- after', config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

exports = db;
