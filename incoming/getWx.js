require('dotenv').config({path: PATH_TO_ENV});

var rest = require('restler');
var async = require('async');
var express = require('express');
var app = express();
var fxml_url = 'http://flightxml.flightaware.com/json/FlightXML2/';
var username = process.env.USERNAME;
var apiKey = process.env.API_KEY;

var router = express.Router();

// Twilio
var authToken = process.env.AUTH_TOKEN;
var accountSid = process.env.ACCOUNT_SID;
var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

var airport = null;

router.route('/')
	.post(function(request, response, next) {
		getWeather(request.body.Body, request.body.From);
		next();
	})

function getWeather(arpt, number) {
 rest.get(fxml_url + 'Metar', {
	 username: username,
	 password: apiKey,
	 query: {airport: arpt}
 }).on('complete', function(data, response) {
	 if (response && response instanceof Error == false) {
		 client.sendMessage({
			 to: number,
			 from: +15174350318,
			 body: data["MetarResult"]
		 });
	 } else {
		 console.log("There was an error");
	 }
 })
}

module.exports = router;
