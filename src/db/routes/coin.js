// const db = require('\./../../db');
// import db from './../models/index';
// conimport db from './../models/index';
const Coin    = require('\./../models').Coin
      express = require('express'),
      router  = express.Router(),
      env     = process.env.NODE_ENV || 'development',
      config    = require(`\../../db/config.json`)[env],
      conStr = process.env.DATABASE_URL || config.url,
      dbModels = require('\../models');
      Sequelize = require('sequelize');
      console.log('coin -before module', dbModels.env);

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
          dialectOptions: {
            ssl: false
          },
          operatorsAliases: false,
        });
      }

sequelize
  .authenticate()
    .then(() => {
      console.log('connection has been establish successfullyC.');
    })
    .catch((err) => {
      console.log('Unable to connectionCoin to database:', err);
    });

// module.exports =
router.route('/add').post((req, res, next) => {
  const data = {
    name: req.body.name,
    price: req.body.price,
    complete: false
  };
  Post.create({
    name: req.body.name,
    price: req.body.price,
    done: false
  })
  .then((coin) => {
    console.log('routes-coin-OK', coin);
  })
  .catch((error) => {
    console.log('routes-coin-error', error);
  })
  next;
});

module.exports = router;
/*       express = require('express'),
      router = express.Router(),
      coin    = require('\../models/').Coin,
      db      = require('\../models/'),

      configs = require('\./../config.js'),
      config = require(`\../../db/config.json`)[db.env],
      conStr    = process.env.DATABASE_URL || config.url,
      // db = {}
      Sequelize = require('sequelize');
console.log('routes-coin-create', db.env); // replaced controller

let sequelize;
if (db.env === 'production') {
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
    console.log('connection has been exablish successfully.-Routes');
  })
  .catch((err) => {
    console.log('Unable to connection to database:', err);
  });


const Posts = sequelize.define('Coin', {
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL
  },
});

router.route('/add').post((req,_res, next) => {
  const coin = new coin();
  coin.name = req.body.name;
  coin.price = req.body.price;
  Posts.create({
    name: req.body.name,
    price: req.body.price
  })
  .then((_coin) => {
      console.log('added');
    })
    .catch(() => {
      console.log('error', err);
    })
  next;
});
 */
