'use strict';
const express = require('express'), //
      app = express(),
      path = require('path'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      coinRoutes = require('./expressRoutes/coinRoutes'),
      env = app.get('env');
      // db = require('./model/coin'),

// Sets up the Express app to handle data parsing

// const env = app.get('env');

app.use((req, res, next) => {
  app.use(cors());
  app.options('*', cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.text());
  app.use('/coins', coinRoutes); //
  // app.use(allowCrossDomain);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control_allow-Origin', 'GET, POST, OPTION, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

// Setup a default catch-all route
if ('production' === env) {
  console.log('server server-production=',env);
  console.log('port', process.env.PORT || 8080);
  app.use(express.static(path.join(__dirname, './dist')));
  app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
    next;
  });
}
else {
  console.log('server server-development=',env); //
  console.log('port',process.env.PORT || 8080);
  app.use(express.static(path.join(__dirname, './dist'))); //
  app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
    next;
  });
};

// create coins and send back all coins after creation;
// sequelize.sync().then(() => {
  app.listen(process.env.PORT || 8080, () => {
    console.log('server', app.get('env'));
  });
// });

// Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);
module.exports = app;
