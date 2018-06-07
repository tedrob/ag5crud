'use strict'
const express = require('express'),
      cRoutes = express.Router(),
      pg      = require('pg'),
      path    = require('path'),
      env     = process.env.NODE_ENV || 'development',
      config  = require(`../../db/config.json`)[env],
      conStr  = process.env.DATABASE_URL || config.url,
      Sequelize = require('sequelize');

console.log('new routes', '(', conStr, ')');

// router.route('/add').post((req, res, next) => {});
console.log('inNewRouter', config);

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
cRoutes.route('/add').post((req, res, next) => {
  const results = [];
  console.log('name', req.body.name, 'price', req.body.price)
  const data = {
    name: req.body.name,
    price: req.body.price,
    complete: false
  }; //
  Posts.create({
      name: req.body.name,
      price: req.body.price
    })
    .then((item) => {
      // console.log('created');
      res.status(200).json({
        coin: 'Coin added successfully',
      });
    })
    .catch((err) => {
      console.log('err', err.message, 'info', err.info);
      res.status(400).send(err.message + 'Unable to connect to database'); //
    })
});

module.exports = cRoutes;

