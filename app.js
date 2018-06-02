'use strict';
const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      favicon = require('serve-favicon'),
      coinRoutes = require('./expressRoutes/coinRoutes');


// ------------------
const Sequelize = require('sequelize');
const sequelize = new Sequelize('codeforgeek', 'postgres', 'P2ssw0rd', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
});

//-------------------

// Set up the express app
// ================================================
const app = express();
const PORT = process.env.PORT || 8080;

// const db = require('./model/index.js');
const db = require('./model/coin');


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join('./src/favicon.ico')));
app.use(bodyParser.urlencoded({  extended: false }));
// app.use(bodyParser.text());

// Static directory
// app.use(express.static('public'));
app.use('/coins', coinRoutes);


// development error handler
/* if (app.get('env') === 'development') {
  console.log('hooAhh in dev')
  app.use((err, req, res, next) => {
    console.log('devlopment');
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
} */

if ('production' !== app.get('env')) {
  const fav = favicon.ico;
  // app.use(express.static(path.join(__dirname, 'dist')));
  path.join(__dirname, './dist/index.html');
  path.join(__dirname, './dist/favicon.ico');
  app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
    res.sendFile(path.join(__dirname, './dist/favicon.ico'));
  });
  console.log('app -production');
  app.use(express.static(__dirname + 'dist'));
}

// production error handler
/* app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
}); */

/* sequelize.authenticate().then(() => {
  console.log('Success!');
  // const Post
}); */ //

// app.use(express.static(path.join(__dirname, 'dist')));

// path.join(__dirname,'/dist/index.html');

/* app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
}); */

/*sequelize.sync().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log('Server started....');
  });
}); */ //
app.listen(PORT, () => {
  console.log('connected..2.');
});

// Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);
// module.exports = app;
