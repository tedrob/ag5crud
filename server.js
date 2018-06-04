'use strict';
const express = require('express'), //
      app = express(),
      path = require('path'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      favicon = require('serve-favicon'),
      coinRoutes = require('./expressRoutes/coinRoutes'),
      // db = require('./model/coin'),
      config = require('./config/config.json'),
      // PORT = process.env.PORT || 8080,
      Sequelize = require('sequelize'),
      sequelize = new Sequelize(config.development.url_prod, {
        dialect: 'postgres',
        'ssl': true,
        operatorsAliases: 'false', //
        dialectOptions: {
          ssl: true
        },
        pool: {
          max: 9,
          min: 0,
          idle: 10000
        },
      });

// const cors = require('cors');
const PORT = process.env.PORT || 8080;
// configuration ===========================//
// const pg = require('pg'); //
const db = require('./model/coin');

// Sets up the Express app to handle data parsing

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

function ignoreFavicon(req, res, next) {
  if (req.originalUrl === 'public/favicon.ico') {
    res.status(204).json({
      nope: true
    });
    next;
  } else {
    next();
  }
};

app.use(ignoreFavicon);

app.use(express.static('public')); //
app.use(favicon(path.join(__dirname, 'public/favicon.ico')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.text());

app.use('/coins', coinRoutes);

// Setup a default catch-all route
if ('production' === app.get('env')) {
  const env = app.get('env')
  console.log('server server-production=',env);
  app.use(express.static(path.join(__dirname, 'dist')));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
  // app.use(ignoreFavicon);
  app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
    next;
  });
}
else {
  const env = app.get('env')
  console.log('server server-development=',env);
  app.use(express.static(path.join(__dirname, 'dist')));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
  app.use(favicon(path.join(__dirname, 'dist/favicon.ico')));
  // app.use(ignoreFavicon);
  app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
    next;
  });
};

// create coins and send back all coins after creation;
sequelize.sync().then(() => {
  app.listen(process.env.PORT || 8080, () => {
    console.log('server', app.get('env'));
    console.log('Server listening on Port', PORT);
  });
});

// Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);
module.exports = app;
