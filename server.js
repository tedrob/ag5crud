const express = require('express'),
//const app = express();
//const bodyParser = require('body-parser');
//const methodOverride = require('method-override');
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      // methodOverride = require('method-override'),
      // cors = require('cors'),
      // favicon = require('serve-favicon'),
      coinRoutes = require('./expressRoutes/coinRoutes'),
      db = require('./model/coin'),
      config = require('./config/config.json');
//const PORT = process.env.PORT || 8080;

// configuration ===========================//
//const pg = require('pg');
// const conStr = process.env.enc.DATABASE_URL || 'development'
//const DATABASE_URL = `heroku config:get DATABASE_URL -a ag5-crud`;
// const DATABASE_URL = `$(heroku config:get DATABASE_URL -a ag5-crud)`;
// config = require(`${__dirname}/../config/config.json`)[env];


app.use(bodyParser.urlencoded({'extended':false }));
app.use('/coins', coinRoutes);
app.use(express.static(path.join(__dirname, 'dist')));

// app.use(bodyParser.json());
// app.use(cors());
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// app.use(express.static(path.join('./src/favicon.ico')));
// app.use(methodOverride());
// routes =================================================
// console.log('db',app.get('env'), 'dbb', DATABASE_URL);
// const config = require(`${__dirname}./config/config.json`)[env];
console.log('db2', config.development.url_prod);

if ('production' !== app.get('env')) {
  console.log('server app -production');
}

// Setuo a default catch-all route
app.get('*', (req, res) => {
  /* res.status(200).send({
    message: 'Welcome to the beginning of nothingness',
  }); */
   res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// create coins and send back all coins after creation
/* app.listen(8080);
console.log('App listening on port 8080'); */
app.listen(process.env.PORT || 8080, () => {
  console.log('App listening on port 8080');
});

