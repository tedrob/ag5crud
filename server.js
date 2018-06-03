'use strict';
const express = require('express'), //
      app = express(),
      bodyParser = require('body-parser'),
      path = require('path'),
      cors = require('cors'),
      favicon = require('serve-favicon'),
      coinRoutes = require('./expressRoutes/coinRoutes'),
      db = require('./model/coin'),
      config = require('./config/config.json'),
      PORT = process.env.PORT || 8080,
      Sequelize = require('sequelize'),
      sequelize = new Sequelize(config.development.url_prod, {
        dialect: 'postgres',
        'ssl': 'true',
        dialectOptions: {
          ssl: 'true'
        },
        operatorsAliases: 'false', //
      }); //
// configuration ===========================//
//const pg = require('pg');
// const conStr = process.env.enc.DATABASE_URL || 'development'
//const DATABASE_URL = `heroku config:get DATABASE_URL -a ag5-crud`;
// const DATABASE_URL = `$(heroku config:get DATABASE_URL -a ag5-crud)`;
// config = require(`${__dirname}/../config/config.json`)[env];
// console.log('server', config);

/* app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.text());
 */
/* function ignoreFavicon(req, res, next) {
  if (req.originalUrl == '/favicon.ico') {
    res.status(204).json({
      nope: true
    });
  } else {
    next();
  }
}

app.use(ignoreFavicon); */
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/coins', coinRoutes);
app.use(express.static('/public'));
app.use(favicon(path.join(__dirname + '\/public/favicon.ico')));

// console.log('db server',db);

// app.use(bodyParser.json());
// app.use(cors());
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// app.use(express.static(path.join('./src/favicon.ico')));
// app.use(methodOverride());
// routes =================================================
// console.log('db',app.get('env'), 'dbb', DATABASE_URL);
// const config = require(`${__dirname}./config/config.json`)[env];
// console.log('db2', config.development.url_prod);

if ('production' === app.get('env')) {
  console.log('server -production'); //
  app.use(express.static('/public'));
  app.use(express.static(path.join(__dirname, '/dist')));
  app.use(favicon(path.join(__dirname + '/dist/favicon.ico')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
}
else {
  app.use(express.static(path.join(__dirname, '/src')));
  // app.use(cors());
  app.use(favicon(__dirname + '/public/favicon.ico'));
  console.log('server app-', app.get('env'));
  app.get('*', (req, res, next) => {
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
  app.listen(PORT, () => {
    console.log('server', app.get('env'));
    console.log('App listening on port 8080');
  });
// });
module.exports = app;
