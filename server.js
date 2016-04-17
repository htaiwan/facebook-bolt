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

app.post('/webhook/', function (req, res) {
	messaging_events = req.body.entry[0].messaging;
	for (i = 0; i < messaging_events.length; i++){
		event = res.body.entry[0].messaging[i];
		sender = event.sender.id;
		if (event.message && event.message.text) {
			text = event.message.text;
			// Handle a text message from this sender
		}
	};
	res.sendStatus(200);
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});
