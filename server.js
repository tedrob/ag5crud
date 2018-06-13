'use strict';
require('zone.js/dist/zone-node');
// require('reflect-metadata');
const express         = require('express'), //
      app             = express(),
      port            = process.env.PORT || 8080,
      baseUrl         = `http:\\localhost:${port}`,
      // http = require('http'),
      // https = require('https'),
      // httpserver      = require('http-server'),
      path            = require('path'),
      cors            = require('cors'),
      bodyParser      = require('body-parser'),
      methodOverride  = require('method-override'),
      // coinRoutes = require('./expressRoutes/coinRoutes'),
      // api           = require('\./src/db/routes/index'), no good
      //indexRouter  = require('\./src/db/routes/index'),
      // coinsRouter  = require('\./src/db/routes/coin'),
      // coinRoutes    = require('\./src/db/routes/coin.js'),
      // coinRoutes      = require('\./src/db/routes/coin'),
      // db            = {}, // require(`\./src/db/models`),
      // dbRoutes      = require('\./src/db/routes/index.js'), // causes error
      // dbRoutes = require('\./src/db/routes'), // causes error
      //dbModels      = require('\./src/db//models/index.js');
      // --- dbmodels        = require('\./src/db/models'),

      // mountRoutes   = require('\./src/db/routes');
      cRoutes         = require('./src/db/routes/coinsRIndex'),  //works
      db = require('\./src/db/models');
      // db = require('\./src/db/models/index.js');
      // config        = require(`${__dirname}/config/config.json`)[db.env];
      // connectString = process.env.DATABASE_URL || config.url || config.use_env_variable;
// const newIndex = require('\./src/db/index');

/* const debug = require('debug')('http'),
  http = require('http'),
  name = 'ng5crud',
  // app = require('\../server.js'),
  db = require('\./src/db/models'); */

// console.log('serv-index', coinRoutes);
//console.log('serv-index2', cRoutes);

// Sets up the Express app to handle data parsing

//app.use((req, res, next) => {
/*   app.use(cors());
  app.options('*', cors());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json({
    type: 'application/json'
  })); */
  // app.use(bodyParser.json({type: 'application/vnd.api+json'}));
  // app.use(methodOverride('Xhttp-Method-Override'));
  // app.use(bodyParser.text());
  // app.use('/coins', coinRoutes); //
  // app.use('/coins', cRoutes);  //works locally \/ causes error
  // app.use('\./src/db/routes/');  // causes error
  // app.use('/coins', mountRoutes);
  // app.use(app.router);
  // app.use('/coins', dbRoutes);
  // app.use('\/coins', dbRoutes);  // this was connected.
  // app.use('\/', indexRouter);
  // app.use('\/coin', coinsRouter);

  // app.use('/coins', api);  no good
  // app.use(express.methodOverride());
  // routes =========================================
  // app.use('/coins', coinRoutes);
  /* app.use('/coins', cRoutes); // this appears to have at at least connected
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control_allow-Origin', 'GET, POST, OPTION, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); */

  /* app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
  }));*/
  // next();
//});

// used to test env variables
/* console.log(`Setup app-use complete \n dbenv=${db.env} \n FOO not set=${process.env.FOO} `);
if (process.env.NODE_ENV != 'production') {
  require('dotenv').load();
}
console.log(`Now not Prod! FOO value=${process.env.FOO} `); */

// create coins and send back all coins after creation;
// catch 404 and forward to error handler
/* app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
}); */
// error handlers

//development error handler
/* if(app.get('env') === 'development') {
  console.log('in-development');
  app.use((err, req, res, next) => {
    res.status(err.status | 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//production error handler
app.use((err, req, res, next) => {
  console.log('production error handler');
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
}); */
console.log('before server');
// set the engine
// app.engine('view', './');
// app.set('views', './');

// set up ++++++++++++++++++++++++
app.use(express.static(path.join(__dirname, '\./dist')));
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({
  type: 'application/json'
}));
app.use('/coins', cRoutes); // this appears to have at at least connected
/* setHeader('Access-Control-Allow-Origin', '*');
setHeader('Access-Control_allow-Origin', 'GET, POST, OPTION, PUT, DELETE');
setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); */

//
// routes ===========================
db.sequelize.sync().then(() => {

  app.use(express.static(path.join(__dirname, '\./dist')));
  console.log('real path=',path.join(__dirname, '\./dist/index.html'));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '\./dist/index.html'));
  });
  app.listen(port, cors(), () => {
    console.log(`server3-listening at ${baseUrl} port ${port}`);
  });
});
//);

// Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);
module.exports = app;
