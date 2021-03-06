'use strict'
const express = require('express'),
      coinRoutes = express.Router(),
      Coin = require('./../model/coin'),
      env = process.env.NODE_ENV || 'development',
      PORT = process.env.PORT || 8080,
      config = require(`${__dirname}/../config/config.json`)[env],
      connectString = process.env.DATABASE_URL || config.url,
      pg = require('pg'),
      Sequelize = require('sequelize');

const client = new pg.Client(connectString);
console.log('database', '(',process.env.DATABASE_URL,')');
console.log('database2', '(', connectString, ')');
console.log('env 2', '(', env, ')');



// const Sequelize = require('sequelize');
// const sequelize = new Sequelize(config.url_prod, {
let sequelize;
if (env === 'production') {
  sequelize = new Sequelize(connectString, {
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    operatorsAliases: false,
  });
} else {
  sequelize = new Sequelize(connectString, {
    dialect: 'postgres',
    ssl: false,

    dialectOptions: {
      ssl: false
    },
    operatorsAliases: false,
  });
}


//if (config.use_env_variable) {
/* if ( env === 'production') {
  // console.log('routes-prod', config.url_prod, 'env',config.use_env_variable );
  app.use(cors());
  sequelize = new Sequelize(config.url_prod, {
    dialect: 'postgres',
    'ssl': true,
    dialectOptions: {
    ssl: true
    },
    operatorsAliases: false, //
  }); //
} else {
  // console.log('routes-dev',config.url );
  sequelize = new Sequelize(config.url_prod, {
    dialect: 'postgres',
    'ssl': true,
    dialectOptions:{
      ssl: true
    },
    operatorsAliases: false,
  }); //
} */ //


// Require Item model in our routes module //
// add to make sure connecting
/* sequelize.authenticate().then(() => {
  console.log('Success!');
}); */
/* sequelize.operatorsAliases = false;
sequelize.ssl = true;
console.log('seq', sequelize.ssl); */

const Posts = sequelize.define('Coin', {
  'name': {type: Sequelize.STRING},
  'price': {type: Sequelize.DECIMAL},
});

// Defined store route
coinRoutes.route('/add').post((req, res, next) => {
  const results = [];
  console.log('name',req.body.name, 'price', req.body.price)
  const data = {'name': req.body.name, 'price': req.body.price, complete: false};//
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
    console.log('err',err.message,'info', err.info);
    res.status(400).send(err.message + 'Unable to connect to database'); //
  })
});
/* coinRoutes.route('/add').post(function (req, res) {
  console.log('in add', req.body);

  const coin = new Coin(req.body);
  coin.save()
    .then(item => {
      res.status(200).json({
        'coin': 'Coin added successfully'
      });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
}); */

// Defined get data(index or listing) route

///////////////////////////////////
/*
coinRoutes.route('/').get(function (req, res) {
  Coin.find(function (err, coins) {
    if (err) {
      console.log(err);
    } else {
      res.json(coins);
    }
  });
});

// Defined edit route
coinRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Coin.findById(id, function (err, coin) {
    res.json(coin);
  });
});

//  Defined update route
coinRoutes.route('/update/:id').post(function (req, res) {
  Coin.findById(req.params.id, function (err, coin) {
    if (!coin)
      return next(new Error('Could not load Document'));
    else {
      coin.name = req.body.name;
      coin.price = req.body.price;

      coin.save().then(coin => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
coinRoutes.route('/delete/:id').get(function (req, res) {
  Coin.findByIdAndRemove({
    _id: req.params.id
  }, function (err, coin) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});
 */
/////////////////////////////////////////////////////////
module.exports = coinRoutes;
// exports = coinRoutes; this creates an error so don't use

