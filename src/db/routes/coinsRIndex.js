'use strict'
// import db from './../models/index';

const express   = require('express'),
      cRoutes   = express.Router(), //
      path      = require('path'),
      env       = process.env.NODE_ENV || 'development',
      config    = require(`\../../db/config.json`)[env],
      conStr    = process.env.DATABASE_URL || config.url,
      db        = {},
      models    = require('\../models'),
      Sequelize = require('sequelize');

console.log('config', conStr, 'dbEnv', db.env);
db.env = env;
console.log('new r Pool-host', '(', process.env.POSTGRESQL_LOCAL_HOST, ')', 'env', env, 'dbEnv', db.env); //
// app.get('/src/db/models/coin.js');

// pool.post()

// router.route('/add').post((req, res, next) => {});
console.log('inNewRouter', conStr);

// this will do all crud functions
console.log('db env', db.env);
let sequelize;
if (env === 'production') {
  sequelize = new Sequelize(conStr, {
    host: 'localhost',
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    operatorsAliases: false,
  });
} else {
  sequelize = new Sequelize(conStr, {
     host: 'localhost',
    dialect: 'postgres',
    ssl: false,
    operatorsAliases: 'false',
    dialectOptions: {
      ssl: false
    },
  });
}

sequelize
  .authenticate()
  .then(() => {
    console.log('connection has been exablish successfully.');
  })
  .catch((err) => {
    console.log('Unable to connection to database:', err);
  });

/////////////////////////////////////////
/* const Coin = require('./../models/coin');
console.log('Coin', Coin);
module.exports = (app) => {
  app.get('/coin', (req, res) => {
    getCoins(res);
  });

  app.post('/add', () => {
    Coin.create({
      name: req.body.name,
      price: req.body.price
    }, (err) => {
      if (err) res.send(err);
    });
  })
} */
/////////////////////////////////////////
const Posts = sequelize.define('Coin', {
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL
  },
});

// Defined store route
/* cRoutes.post('/add', (req, res, next) => {
  const data = [{
      name: req.body.name,
      price: req.body.price,
      complete: false
  }];
  Posts.create({
    name: req.body.name,
    price: req.body.price
  }, (err, result) =>{
    if (err) {
      console.error(err);
      res.statusCode = 500;
      return res.json({
        errors: ['failed to create coin']
      });
    }
    const coinId = result.rows[0].id;
    console.log('coinID', coinId);
    res.statusCode(201).json({
      coin: 'Coin add successfully'
    });
  })
  next;
}); */
  // create coin
    cRoutes.route('/add').post((req, res, next) => {
    const data = {
      name: req.body.name,
      price: req.body.price,
      complete: false
    };
    Posts.create({
      name: req.body.name,
      price: req.body.price
    })
    .then(() => {
        res.status(201).json({
          coin: 'Coin add successfully'
        });
    })
    .catch((err) => {
      if (err) {
        console.log('err', err);
        res.status(400).send(err+'Unable to connect');
      }
    })
    next;
  });

module.exports = cRoutes; //
