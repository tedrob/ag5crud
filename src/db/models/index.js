'use strict';

const fs            = require('fs'),
      path          = require('path'),
      Sequelize     = require('sequelize'),
      // basename   = path.basename(__filename);
      basename      = path.basename(module.filename), //added this back
      env           = process.env.NODE_ENV || 'development',
      config        = require('\../config.json')[env],
      Datatypes = require('sequelize/lib/data-types'),  // needed so not have to add to all models
      connectString = process.env.DATABASE_URL || config.url,
      db        = {};

console.log('checking', '(', process.env[config.use_env_variable],')');

let sequelize;
if ('production' === env) {
  sequelize = new Sequelize(connectString, {
    host: 'localhost',
    dialect: 'postgres',
      ssl: true,
      operatorsAliases: false,
      dialectOptions: {
        ssl: true
      },
    }
  );
} else {
  sequelize = new Sequelize(connectString, {
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
    db[model.name] = model;
    // console.log('model', model.name);
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then (() => {
    console.log('connection has been exablish successfully.');
  })
  .catch((err) => {
    console.log('Unable to connection to database:', err);
  });

console.log('fs- after', config.url);
console.log('fs- afterP', connectString);
console.log('fs- host',  '{', process.env.host, '}','local','[', `${'localhost'}`,']');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('\./coin')(sequelize, Sequelize);

module.exports = db;
