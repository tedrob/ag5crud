'use strict';
const express = require('express'), //
      app = express(),
      http = require('http'),
      https = require('https'),
      httpserver = require('http-server'),
      path = require('path'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      // coinRoutes = require('./expressRoutes/coinRoutes'),
      cRoutes = require('./src/db/routes/coinsRIndex'),
      env = app.get('env'),
      config = require(`${__dirname}/config/config.json`)[env],
      connectString = process.env.DATABASE_URL || config.url,
      Port = process.env.PORT || 8080,
      db = require(`\./src/db/models`);
// Sets up the Express app to handle data parsing

// const env = app.get('env');

app.use((req, res, next) => {
  app.use(cors());
  app.options('*', cors());
  app.use(bodyParser.json());
  /* app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.text()); */
  // app.use('/coins', coinRoutes); //
  app.use('/', cRoutes);
  // app.use(allowCrossDomain);
  // app.use(express.methodOverride());
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control_allow-Origin', 'GET, POST, OPTION, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

// let Port = process.env.PORT || 8080;

// Setup a default catch-all route
/* if ('production' === env) {
  console.log('server server-production=',env);
  // console.log('port-P', Port, 'process.env', process.env.DATABASE_URL);
  console.log('process DB ', '(', process.env.DATABASE_URL, ')');
  app.use(express.static(path.join(__dirname, './dist')));
  app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
    next;
  });
}
else {
  console.log('server server-development=',env); //
  console.log('port-D', Port);
  app.use(express.static(path.join(__dirname, './dist'))); //
  app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
    next;
  });
};
 */
// create coins and send back all coins after creation;

// routes ===========================
db.sequelize.sync().then(() => {  //
  console.log('server -env', env);
  app.use(express.static(path.join(__dirname, './dist')));
  app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
    next;
  });
  app.listen(Port, cors(), () => {
    console.log('server2', Port);
  });
});

// Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);
// module.exports = app;
