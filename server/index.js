"use strict";

let express = require("express");
let path = require('path');
let iot_app = require('express')();
let http = require('http').Server(iot_app);
let io = require('socket.io')(http);
let bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;

let iot_db;

iot_app.use(express.static(__dirname, '/'));
iot_app.use(express.static(__dirname, '/server/'));
iot_app.use(express.static(__dirname + "/..", '/client/'));
iot_app.use(express.static(__dirname + '/node_modules'));

iot_app.use(bodyParser.json()); // for parsing application/json
iot_app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Connect to the db
MongoClient.connect("mongodb://52.41.41.92:27017/messagesDb", function(err, db) {
  if(!err) {
    console.log("Connection to messagesDb successful.");
	iot_db = db;
  }
});

iot_app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

iot_app.post('/messages', function(req, res){
	let message = req.body;
	
	broadcastMessageToClients(message);
	persistMessage(message);

	//Send Response
	console.log("returning response...");
	res.json(req.body);
});

let persistMessage = (message) => {
	console.log('persisting message:', message);
	iot_db.collection('messages').insert(message);
}

let broadcastMessageToClients = (message) => {
	console.log('delivering message to clients... message:', message);
	io.emit('sendMessage', message);
};

io.on('connection', function(socket){
	console.log('client connection started.');
	
	socket.on('disconnect', function(){
		console.log('client socket disconnected.');
  	});
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});