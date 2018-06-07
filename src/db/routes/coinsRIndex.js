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

console.log('config', conStr);

console.log('new r Pool-host', '(', process.env.POSTGRESQL_LOCAL_HOST, ')', 'env', env); //

// app.get('/src/db/models/coin.js');

// pool.post()

// router.route('/add').post((req, res, next) => {});
console.log('inNewRouter', conStr);

// this will do all crud functions
let sequelize;
if (env === 'production') {
  sequelize = new Sequelize(conStr, {
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    operatorsAliases: false,
  });
} else {
  sequelize = new Sequelize(conStr, {
    dialect: 'postgres',
    ssl: false,
    operatorsAliases: 'false',
    dialectOptions: {
      ssl: false
    },
  });
}

const Posts = sequelize.define('Coin', {
  'name': {
    type: Sequelize.STRING
  },
  'price': {
    type: Sequelize.DECIMAL
  },
});

// Defined store route
  // create coin
  cRoutes.route('/add').post((req, res, next) => {
    /* const data = {
      name: req.body.name,
      price: req.body.price,
      complete: false
    }; */
    Posts.create({
      name: req.body.name,
      price: req.body.price
    })
    .then(() => {
        res.status(200).json({
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
