var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var token = "7788";

var app = express();
var PORT = process.env.PORT || 3000;

app.get('/webhook', function (req, res) {
	if (req.query['hub.verify_token'] === token) {
		res.send(req.query['hub.challenge']); 
	} else {
		res.send('Error, wrong vaildation token');
	}
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});
