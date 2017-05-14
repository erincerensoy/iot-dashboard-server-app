"use strict";

let express = require("express");
let path = require('path');
let iot_app = require('express')();
let kafka_consumer = require('express')();
let http = require('http').Server(iot_app);
let httpKafkaConsumer = require('http').Server(kafka_consumer);
let io = require('socket.io')(http);
let bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
var https = require('http');
var kafka = require('kafka-node');
var avro = require('avsc');
 var parse = require('fast-json-parse')
//const kafkaSse = require('kafka-sse');
//var crypto = require('crypto');
//var algorithm = 'aes-256-ctr';
//var password = 'd6F3Efeq';


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


function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}


var Consumer = kafka.Consumer;
var client = new kafka.Client('34.208.151.182:2181');
var consumer = new Consumer(
        client,
        [
           { topic: 'IotBusinessCriticDevice',partition:0}
        ],
        {
            autoCommit: false	
        },
        {
        	fromOffset:'latest'
        }

    );


consumer.on('message', function (message) {

  var s = JSON.stringify(message.value);
  var arr = s.split('-');

  var jsonObject = JSON.stringify(
	{
	    	
	"deviceId":arr[0],
	"deviceType":arr[1],
	"data":arr[2]
	}
);

var postheaders = {
    'Content-Type' : 'application/json',
    'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
};

var optionspost = {
    host : 'localhost',
    port :  4000,            
    path : '/messages',
    method : 'POST',
    headers : postheaders
};

var reqPost = https.request(optionspost, function(res) {

    res.on('data', function(d) {
        process.stdout.write(d);

    });
});

reqPost.write(jsonObject);
reqPost.end();


});
