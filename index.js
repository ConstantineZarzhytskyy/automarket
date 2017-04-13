'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var port = Number(process.env.PORT || 8000);
var api = require('./api.js');

app.use('/', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use('/api', api);

app.listen(port, function () {
  console.log('Server is running');
});
