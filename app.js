var authToken = "3a4c70d14ef4dd3a3ddb2fe567b38b68";
var accountSid = "AC7a5910c2e815f67cd98c43ad4b8bee65";

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

