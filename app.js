var authToken = "";
var accountSid = "";

var express = require('express');
var app = express();
var twilio = require('twilio');
var path = require('path');
var bodyParser = require('body-parser');

var client = new twilio.RestClient(accountSid, authToken);

var getWx = require('./incoming/getWx.js');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', getWx);

app.listen(3000, function(err) {
  if (err) {
    throw err;
  }
});

