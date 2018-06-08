const Coin      = require('\../models').Coin;
      express   = require('express'),
      api       = express.Router(),
      db        = require(`\../models/`),
      config    = require(`\../../db/config.json`)[db.env],
      conStr    = process.env.DATABASE_URL || config.url,
      Sequelize = require('sequelize');

console.log('controller coin', db.env, 'cS', conStr);

module.exports = {
  // create
  create(req, res, next) {
    return Coin
      .create({
        name: req.body.name,
        price: req.body.price,
        done: false
      })
      .then((coin) => { console.log(res);
        //res.status(200).json({ coin: 'Coin added successfully'});
      })
      .catch((err) => {
        if (err) {
          console.log('err', err);
          // res.status(400).send(err + 'Unable to connect');
        }
      })
      console.log('coin created');
      next;
    }, // retrive, update, delete
  }
// });
