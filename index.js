const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

var app = express();

app.use(bodyParser.json());

app.listen(3000, function() {
	console.log("El servidor se encuentra en el puerto 3000");
});

app.get('/', function(req, res) {
	res.send("Hola bienvenido a la página");
});
