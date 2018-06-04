'use strict';
const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      favicon = require('serve-favicon'),
      config = require('./config/config.json'),
      coinRoutes = require('./expressRoutes/coinRoutes');


// ------------------
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.production.url_prod, {
  dialect: 'postgres',
  'ssl': true,
  operatorsAliases: false,
  dialectOptions: {
    ssl:true
  },
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

function ignoreFavicon(req, res, next) {
  if ( req.originalUrl === 'favicon.ico' ) {
    res.status(204).json({nope: true});
  } else {
    next();
  }
}

app.use(ignoreFavicon);

app.use(express.static('public'));
app.use(favicon(path.join(__dirname + '\/public/favicon.ico')));

/* app.use ((req, res, next) => {
  console.log('originalURL',req.originalUrl.split('/').pop());
  console.log('originalURL ', req.originalUrl.split('/').pop());
  if ((req.originalUrl  && req.originalUrl.split('/').pop()) === 'favicon.ico') {
    return res.sendStatus(204);
  } //
  return next();
}); */

// app.use(express.static(path.join('./src/favicon.ico')));
app.use(bodyParser.urlencoded({  extended: true }));
/* app.use(bodyParser.json({
  type: 'application/vnd.api+json'
})); */
app.use(bodyParser.text());

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

// app.use(cors());

if ('production' === app.get('env')) {
  console.log('app -production');
  app.use(express.static(path.join(__dirname, '/dist')));
  app.use(favicon(path.join(__dirname + '\/public/favicon.ico')));
  app.use(ignoreFavicon);
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
  }); //
} else {
  console.log('app -development');
  app.use(express.static(path.join(__dirname, '/dist')));
  app.use(favicon(path.join(__dirname + '/public/favicon.ico')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/index.html'));
  });
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

// sequelize.sync().then(() => {
  app.listen(process.env.PORT || 8080, () => {
    console.log('app', app.get('env'));
    console.log('Server started....');
  });
// });

/* app.listen(PORT, () => {
  console.log('connected..2.');
}); */

// Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);
module.exports = app;
