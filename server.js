var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var token = '7788';
var page_token = 'CAAN5IdgZBuDsBAHFJFwFxNO0OdXQfVrqZAwsQ2tH54ynGxu830cFTTjhzctbogucZBGrGUZCdGKVCfAlIZCizZClzZC95WkPlaL219IbSsfppouEEXP2YJEkPUVeN2293lnJhq9Lqw0z7NYJ6QSM9VGYdHTgxsybDqIkNRkxvtHSAWZADBGgob355gRKaSs9wDsZD';

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// 
function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:page_token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

app.get('/webhook', function (req, res) {
	if (req.query['hub.verify_token'] === token) {
		res.send(req.query['hub.challenge']); 
	} else {
		res.send('Error, wrong vaildation token');
	}
});

app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      // Handle a text message from this sender
      console.log('AAAA ===>>> ' + text);
      sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
    }
  }
  res.sendStatus(200);
});

// app.post('/webhook/', function (req, res) {
// 	messaging_events = req.body.entry[0].messaging;
// 	for (i = 0; i < messaging_events.length; i++){
// 		event = res.body.entry[0].messaging[i];
// 		sender = event.sender.id;
// 		if (event.message && event.message.text) {
// 			text = event.message.text;
// 			// Handle a text message from this sender
// 			sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
// 		}
// 	};
// 	res.sendStatus(200);
// });


app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});
