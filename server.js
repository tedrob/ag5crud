const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// configuration ===========================
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// routes =================================================

// create coins and send back all coins after creation
app.listen(8080);
console.log('App listening on port 8080');
