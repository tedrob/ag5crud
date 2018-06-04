'use strict';
const express = require('express'), //
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
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

const PORT = process.env.PORT || 8080;
// configuration ===========================//
// const pg = require('pg'); //
const db = require('./model/coin');

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(cors());

function ignoreFavicon(req, res, next) {
  if (req.originalUrl === '/public/favicon.ico') {
    res.status(204).json({
      nope: true
    });
  } else {
    next();
  }
}

app.use(ignoreFavicon);

app.use(express.static('public')); //
app.use(favicon(path.join(__dirname + '\/public/favicon.ico')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.text());

app.use('/coins', coinRoutes);

if ('production' === app.get('env')) {
  console.log('server -production');
  app.use(express.static(path.join(__dirname, '/dist')));
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(favicon(path.join(__dirname + '/public/favicon.ico')));
  app.use(ignoreFavicon);
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
}
else {
  console.log('server app-');
  app.use(express.static(path.join(__dirname, '/src')));
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(favicon(path.join(__dirname + '/public/favicon.ico')));
    app.use(ignoreFavicon);
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/index.html'));
  });
}


// Setuo a default catch-all route
/* app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'dist/index.html'));
}); */ //

// create coins and send back all coins after creation
/* app.listen(8080);
console.log('App listening on port 8080'); */
/* app.listen(process.env.PORT || 8080, () => {
  console.log('App listening on port 8080');
}); */

// sequelize.sync().then(() => {
  app.listen(process.env.PORT || 8080, () => {
    console.log('server', app.get('env'));
    console.log('Server listening on Port', PORT);
  });
// });
module.exports = app;
