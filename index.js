const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const config = require('config');

var app = express();

app.use(bodyParser.json());

app.listen(3000, function() {
	console.log("El servidor se encuentra en el puerto 3000");
});

app.get('/', function(req, res) {
	res.send("Hola bienvenido a la página");
});

app.get('/webhook', function(req, res) {
	if (req.query['hub.verify_token'] === config.get(validationToken)) {
		res.send(req.query['hub.challenge']);
	} else {
		res.send("Tu no tienes que entrar aquí");
	}
});

app.post('/webhook', function(req, res) {
	var data = req.body;
	if(data.object == 'page'){
		data.entry.forEach(function(pageEntry){
			pageEntry.messaging.forEach(function(messagingEvent){
				if (messagingEvent.message) {
					reciveMessage(messagingEvent);
				}
			});
		});
		res.sendStatus(200);
	}
});

function reciveMessage(event) {
	// console.log(event);
	const senderId = event.sender.id;
	const messageText = event.message.text;

	eveluateMessage(senderId, messageText);
}

function eveluateMessage(recipientId, message) {
	let finalMessage = '';

	if(isContain(message, 'ayuda')) {
		finalMessage = 'Por el momento no te puedo ayudar';
	} else if (isContain(message, 'gato')) {
		sendMessageImage(recipientId);
	} else if (isContain(message, 'nombre')) {
		finalMessage = 'Yo soy OneBot, un bot de prueba :D';
	} else {
		finalMessage = 'Solo se repetir las cosas : ' + message;
	}
	sendMessageText(recipientId, finalMessage)
}

function sendMessageText(recipientId, message) {
	const messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			text: message
		}
	};
	callSendAPI(messageData);
}

function sendMessageImage(recipientId) {
	const messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: "image",
				payload: {
					url: "https://i.imgur.com/RtC6c01.jpg"
				}
			}
		}
	};
	callSendAPI(messageData);
}

function callSendAPI(messageData) {
	request({
		uri: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token : config.get('pageAccessToken') },
		method: 'POST',
		json: messageData
	}, function(error, response, data) {
		if (error) {
			console.log('No es posible enviar el mensaje');
		} else {
			console.log('El mensaje fue enviado');
		}
	});
}

function isContain(sentence, word) {
	return sentence.indexOf(word) > -1;
}