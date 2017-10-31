/*
 Copyright (c) 2017 FH Dortmund.
 All rights reserved. This program and the accompanying materials
 are made available under the terms of the Eclipse Public License v1.0
 which accompanies this distribution, and is available at
 http://www.eclipse.org/legal/epl-v10.html

 Description:
    rover-web | standalone TCP server that reads from NET socket and 
				writes interfaces to communicate with socket.IO server
	
 Prerequisites:
 	1) Node.Js must be installed on your system.
	2) Node.Js modules required: net, socket.io

 Author:
    M. Ozcelikors <mozcelikors@gmail.com>, created 28.10.2017
*/

// Total infrastructure of this web application is as follows:
//		TCP_Client << client_interface << socketIO (HTTP) << Serve-static Webpage (HTTP) + socketIO Client
//		TCP_Server >> server_interface >> socketIO (HTTP) >> Serve-static Webpage (HTTP) + socketIO Client

module.exports = {
   run: function(host_, port_) {
		// Interface between TCP server and SocketIO server to share variables
		var server_interface = require('./interfaces/if_tcpserver_socketio'); 
		//To use interface:
		//server_interface.if_tcpserver_socketio.send_flag = 0;
		
		var net = require('net');
		var ROVERWEB_LISTENPORT = port_;
		
		// Create net based TCP server
		var server = net.createServer();
		
		server.listen(ROVERWEB_LISTENPORT, host_);
		console.log ('rover-web TCP server: is now running listening to port '+ROVERWEB_LISTENPORT+'...');
		
		// Event for Client Connection
		server.on('connection', function(sock) {
			console.log('rover-web TCP server: A client is connected: ' + sock.remoteAddress +':'+ sock.remotePort);
			
			// Event for Data Reception
			sock.on('data', function(data) {
				var string_data = data.toString('utf8');
				//Remove received EOF characters '\r\n' in received data from TCP
				string_data.replace('\r\n', '');
				// Parse received JSON data string
				try
				{
					var json_data = JSON.parse(string_data);
				}
				catch(ex)
				{
					var json_data = {"rover_dtype":"util",
											 "data":{
												 "core0":0,
												 "core1":0,
												 "core2":0,
												 "core3":0,
												}
											};
				}

				
				server_interface.if_tcpserver_socketio.data = string_data;
				server_interface.if_tcpserver_socketio.data_type = json_data.rover_dtype;
				server_interface.if_tcpserver_socketio.send_flag = 1;
				//console.log('rover-web TCP server: '+sock.remoteAddress +':'+ sock.remotePort+ ' says: ' + string_data);
			});   
			
			// Event for Client Disconnection
			sock.on('close', function(data) {
				console.log('rover-web TCP server: A client is disconnected: ' + sock.remoteAddress +':'+ sock.remotePort);
			});
			
			// Event for Errors
			sock.on('error', function(err) {
				console.log('rover-web TCP server: An error has been detected..');
			});
		});
   }
}