// coinRoutes.js

const express = require('express');
const { Client } = require('pg');
const app = express();
const coinRoutes = express.Router();
const env = process.env.MODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:P2ssw0rd@localhost:5432/ag5ted';
let client = new  Client({
  connectionString: 'postgres://postgres:P2ssw0rd@localhost:5432/ag5ted',
  ssl: true,
  operatorsAliases: false,
})

const Sequelize = require('sequelize');
let sequelize;
console.log('env', env);
console.log('env2',config.url);

// ---
if (config.use_env_variable) {
  let conf = `postgres://ddpdvlujtbflwv:4bfec4912dbaf8969f9bd4fe6b51936f34781e2a2edd713257c12ddc9d6dcff3@ec2-54-243-235-153.compute-1.amazonaws.com:5432/dc79kjvbe6a50`;
  conf = 'heroku config:get DATABASE_URL -a ag5-crud';
  sequelize = new Sequelize(config.url, {
    dialect: 'postgres',
    operatorsAliases: false,
    ssl: true
  });

} else {
  conf = '${heroku config:get DATABASE_URL -a ag5-crud}';
  console.log('conf1', config.url, ' ssl', config.ssl); //
  sequelize = new Sequelize(config.url, {dialect: 'postgres', operatorsAliases: false, ssl: true});
  console.log('conf', config.url);
  console.log('dev', connectionString);
  // console.log('seq', sequelize);

} //
const PORT = process.env.PORT || 8080;

// Require Item model in our routes module
// const coin = require('./../model/coin');
const coin = require('./../model');


// add to make sure connecting
sequelize.authenticate().then(() => {
  console.log('Success!');
});
sequelize.operatorsAliases = false;
sequelize.ssl = true;
console.log('seq', sequelize.ssl);

const Posts = sequelize.define('Coin', {
  name: {type: Sequelize.STRING},
  price: {type: Sequelize.DECIMAL},
});

// Defined store route
coinRoutes.route('/add').post((req, res, next) => {
  const results = [];
  const data = {text: req.body, complete: false};
  console.log('ready to post name=', req.body.name, ' and  price=', req.body.price);

  console.log('post data', JSON.stringify(data)); //
  Posts.create({
    name: req.body.name,
    price: req.body.price
  })
  .then((item) =>{
    console.log('created');
      res.status(200).json({
      'coin': 'Coin added successfully'
    });
  })
  .catch((err) => {
    res.status(400).send(err + 'Unable to connect to database');
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

module.exports = coinRoutes;
// exports = coinRoutes; this creates an error so don't use

