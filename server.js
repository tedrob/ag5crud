'use strict';
const express = require('express'), //
      app = express(),
      http = require('http'),
      https = require('https'),
      httpserver = require('http-server'),
      path = require('path'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      coinRoutes = require('./expressRoutes/coinRoutes'),
      env = app.get('env'),
      config = require(`${__dirname}/config/config.json`)[env],
      connectString = process.env.DATABASE_URL || config.url,
      db = require(`${__dirname}/src/db/models/`),
      Sequelize = require('sequelize');
      // db = require('./model/coin'),
//
let sequelize;
// let http = require('https');


if (env === 'production') {
  sequelize = new Sequelize(connectString, {
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    operatorsAliases: false,
  });
} else {
  sequelize = new Sequelize(connectString, {
    dialect: 'postgres',
    ssl: false,
    operatorsAliases: 'false',
    dialectOptions: {
      ssl: false
    },
  });
}



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

let Port = process.env.PORT || 8080;

// Setup a default catch-all route
if ('production' === env) {
  console.log('server server-production=',env);
  console.log('port-P', Port);
  console.log('process ','(',process.env.HEROKU_POSTGRSQL_POINTY_73069,')');
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

// create coins and send back all coins after creation;
sequelize.sync().then(() => {
  //https.createServer(app.options('*', cors()), app.listen(Port), () => {
  http.createServer(app).listen(Port, cors(), () => {
    console.log('server2', Port);
  });
/*   app.listen(process.env.PORT || 8080, () => {
    console.log('server', app.get('env'));
  }); */
});//

// Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);
// module.exports = app;
