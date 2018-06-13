const coinsController = require('\../controllers').coins;
// import { Routes } from '@angular/router';
/* const express = require('express'),
      Routes  = express.Router(),
      // coin    = require('\../models').coin,
      // http    = require('http'),
      app     = express();
 */
const coins = require('\./../models/coin');
const persons = require('\./../models/persons')

console.log('routes index-coin'); // , coins); this showed something
// console.log('routes index-persons'); //, persons);

// module.exports = Routes; //
/* module.exports = {
  coins,
  // persons,
}; */

module.exports = (app) => {
  coinsController.create(app);
}

//app.use('/coins', coins);
/*
module.exports = () => {
  // app.use('/users', users);
  console.log('routes index');
  app.use('/coins', coins);
  const { Client } = require('pg');
  const http = require('http');
  const Port = process.env.Port || 8080;
  const server = http.createServer((req, res, done) => {
    const client = new Client({
      connectionString: DATABASE_URL,
    });
    res.statusCode = 200;
    res.setHeater('Content-Type', 'text/plain');
    client.connect()
      .then(() => {
        coinsController.create(app);
      })
      .then((result) => {
        result.on('end', () => {
          done();
          return res.json({});
        })
        res.result();
        client.end();
      })
      .catch(()=>{
        res.end('Error');
        client.end();
      })
      next;
  });
  // console.log('rtes', app.body.name, '{', app.body.price, '}' ); //
  // coinsController.create(app);
}; //
 */
