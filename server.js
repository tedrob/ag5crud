'use strict'

const express         = require('express'), //
      app             = express(),
      port            = process.env.PORT || 8080,
      baseUrl         = 'http:\\localhost', // :${port}'`,
      path            = require('path'),
      cors            = require('cors'),
      bodyParser      = require('body-parser'),
      cRoutes         = require('./src/db/routes/coinsRIndex'),  //works
      db = require('\./src/db/models');

console.log('before server');

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
app.use('/coins', cRoutes);
db.sequelize.sync().then(() => {

  app.use(express.static(path.join(__dirname, '\./dist')));
  console.log('real path=',path.join(__dirname, '\./dist/index.html'));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '\./dist/index.html'));
  });
  app.listen(port, cors(), () => {
    console.log(`server3-listening at ${baseUrl} port ${port}`);
  });
})
module.exports = app;
