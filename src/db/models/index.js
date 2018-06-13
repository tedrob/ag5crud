'use strict';

const fs            = require('fs'),
      path          = require('path'),
      Sequelize     = require('sequelize'),
      basename      = path.basename(module.filename),
      env           = process.env.NODE_ENV || 'development',
      config        = require('\../config.json')[env],
      DataTypes = require('sequelize/lib/data-types'),  // needed so not have to add to all models
      connectString = process.env.DATABASE_URL || config.url,
      db            = {};

if (env !== 'production') {
  require('dotenv').load();
}

console.log('models-index env', env);
let sequelize;
if ('production' === env) {
//if (config.use_env_variable) {${process.env.DATABASE_URL}`
  console.log(`P-db-models-index env=${env}`);
  sequelize = new Sequelize(`${process.env.DATABASE_URL}`, {
    host: 'localhost',
    dialect: 'postgres',
    ssl: true, //
    dialectOptions: {
      ssl: true
    },
    operatorsAliases: false,
    }
  );
} else {
  console.log(`D-db-models-index env=${env}`);
  sequelize = new Sequelize(`${process.env.DATABASE_URL_DEV}`, { //connectString, {
    host: 'localhost',
    dialect: 'postgres',
      ssl: false,
      operatorsAliases: false,
      dialectOptions: {
        ssl: false
      },
    }
  );
};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    //console.log('model', model.name);
    db[model.name] = model;

  });

Object.keys(db).forEach((modelName) => {
  console.log('models-index-modelN=', modelName);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

console.log('models-index-checking', '(',env, ')\n',
  `URL = ${process.env.DATABASE_URL_DEV}`,
  /* 'config', config,
  '\nprocess-Port', db.port,
  `\nconnectionStr ${connectString}`,
  `\nconfig = ${process.env.DATABASE_URL_DEV}`,
  `\nvalue = ${process.env.FOO}`,
  `\nNODE_ENV = ${process.env.NODE_ENV}` */
);

sequelize
  .authenticate()
  .then (() => {
    console.log('connection has been exablish successfully-Models.');
  })
  .catch((err) => {
    console.log('Unable to connection-Models to database:', err);
  });

// console.log('fs- after', config.url);
// console.log('fs- afterP', connectString);
const Host = process.env.host || 'localhost';
console.log('fs- host',  '{', Host, '}','local','[', `${'localhost'}`,']');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.user = require('\./coin')(sequelize, Sequelize);
// db.coin = require('\./coin')(sequelize, sequelize); // (db/models)

module.exports = db;
