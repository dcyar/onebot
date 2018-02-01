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

			});
		});
		res.sendStatus(200);
	}
});