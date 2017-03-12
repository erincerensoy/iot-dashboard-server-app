"use strict";
let express = require("express");
var path = require('path');
let chat_app = require('express')();
let http = require('http').Server(chat_app);
let io = require('socket.io')(http);
var bodyParser = require('body-parser');

let clientListNames = [];
let dashboard_messages = ["hello iot"];

chat_app.use(express.static(__dirname, '/'));
chat_app.use(express.static(__dirname, '/server/'));
chat_app.use(express.static(__dirname + "/..", '/client/'));
chat_app.use(express.static(__dirname + '/node_modules'));

chat_app.use(bodyParser.json()); // for parsing application/json
chat_app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

chat_app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

chat_app.post('/messages', function(req, res){
	let message = req.body;
	
	console.log('delivering message to clients... message:', message);
	dashboard_messages.push(message)
	io.emit('sendMessage', message)

	res.json(req.body);
});

io.on('connection', function(socket){
	console.log('client connection started.');
	
	socket.on('disconnect', function(){
		
  	});
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});