/*
 Copyright (c) 2017 FH Dortmund.
 All rights reserved. This program and the accompanying materials
 are made available under the terms of the Eclipse Public License v1.0
 which accompanies this distribution, and is available at
 http://www.eclipse.org/legal/epl-v10.html

 Description:
    rover-web | SocketIO server for TCP server <-> Web-Page communication
				using SocketIO client-side implementations
	
 Prerequisites:
 	1) Node.Js must be installed on your system.
	2) Node.Js modules required: socket.io, http

 Author:
    M. Ozcelikors <mozcelikors@gmail.com>, created 29.10.2017
*/

// Total infrastructure of this web application is as follows:
//		TCP_Client << client_interface << socketIO (HTTP) << Serve-static Webpage (HTTP) + socketIO Client
//		TCP_Server >> server_interface >> socketIO (HTTP) >> Serve-static Webpage (HTTP) + socketIO Client

module.exports = {
   run: function(socketio_port) {
	   
	   	// Interface between TCP client and SocketIO server to share variables
		var client_interface = require('./interfaces/if_tcpclient_socketio'); 
		
		// Interface between TCP server and SocketIO server to share variables
		var server_interface = require('./interfaces/if_tcpserver_socketio'); 
		
		// Variables
		var SOCKETIO_SERVER_PORT = socketio_port;
		
		// Modules
		var io = require('socket.io');
		var http = require ('http');
		
		// Start socket.io HTTP server
		socketio_server = http.createServer();
		socketio_server.listen(SOCKETIO_SERVER_PORT);
		
		// socket.io event-based communication to pass data between web-page and remote TCP server
		var io = require('socket.io').listen(socketio_server);
		console.log ("rover-web Socket.Io server: Attempting to connect to port " +SOCKETIO_SERVER_PORT);	
		io.sockets.on('connection', function(socket) {
		
			console.log ("rover-web Socket.Io server: Successfully connected to port "+SOCKETIO_SERVER_PORT );		
			
			// Send events to SocketIO client, given inputs from shared variable interface
			// Timer event
			var tmr_period = 1000;//in milliseconds
			var tmr_event = setInterval(function() {
				//console.log ("rover-web SocketIO server: setInterval Timer");
				//console.log ("rover-web SocketIO server: send_flag: "+server_interface.if_tcpserver_socketio.send_flag);
				if (server_interface.if_tcpserver_socketio.send_flag == 1)
				{
					if (server_interface.if_tcpserver_socketio.data_type == 'util')
					{
						//console.log ("rover-web SocketIO server: Try send util event");
						//socket.broadcast.emit sends to all sockets
						//socket.emit sends to only connected socket
						socket.broadcast.emit('util', server_interface.if_tcpserver_socketio.data);
					}
					else if (server_interface.if_tcpserver_socketio.data_type == 'sensor')
					{
						//console.log ("rover-web SocketIO server: Try send sensor event");	
						//socket.broadcast.emit sends to all sockets
						//socket.emit sends to only connected socket
						socket.broadcast.emit('sensor', server_interface.if_tcpserver_socketio.data);
					}
					server_interface.if_tcpserver_socketio.send_flag = 0;
				}
			}, tmr_period);
			
			
			// Receive thrown events from SocketIO client
			
			// control data
			socket.on('control', function(data){
		
				//console.log ("rover-web Socket.Io server: A message received: "+data);

				// Construct JSON and send over TCP
				var json_obj = {"rover_dtype":"control",
				 				 "data":{
									 "command":data
									}
				 				};
				var string_obj = JSON.stringify(json_obj);
				string_obj = string_obj + '\r\n'; //Add EOF string
				//console.log('rover-web SocketIO server: Passing data to TCP client:'+string_obj);
				// Use interface to let tcp client know that we want to send data now.
				client_interface.if_tcpclient_socketio.data = string_obj;
				client_interface.if_tcpclient_socketio.send_flag = 1;
				 
			});
			
			// speed data
			socket.on('speed', function(data){
		
				//console.log ("rover-web Socket.Io server: A message received: "+data);
				 
				// Construct JSON and send over TCP
				var json_obj = {"rover_dtype":"speed",
				 				 "data":{
									 "speed":data
									}
				 				};
				var string_obj = JSON.stringify(json_obj);
				string_obj = string_obj + '\r\n'; //Add EOF string
				//console.log('rover-web SocketIO server: Passing data to TCP client:'+string_obj);
				// Use interface to let tcp client know that we want to send data now.
				client_interface.if_tcpclient_socketio.data = string_obj;
				client_interface.if_tcpclient_socketio.send_flag = 1;
				 
			});
		});
   }
}