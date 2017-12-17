/*
 Copyright (c) 2017 FH Dortmund.
 All rights reserved. This program and the accompanying materials
 are made available under the terms of the Eclipse Public License v1.0
 which accompanies this distribution, and is available at
 http://www.eclipse.org/legal/epl-v10.html

 Description:
    rover-web | standalone HTTP server to display web interface
	
 Prerequisites:
 	1) Node.Js must be installed on your system.
	2) Node.Js modules required: connect, http, serve-static

 Author:
    M. Ozcelikors <mozcelikors@gmail.com>, created 28.10.2017
*/

// Total infrastructure of this web application is as follows:
//		TCP_Client << client_interface << socketIO (HTTP) << Serve-static Webpage (HTTP) + socketIO Client
//		TCP_Server >> server_interface >> socketIO (HTTP) >> Serve-static Webpage (HTTP) + socketIO Client

module.exports = {
   run: function(port_) {
	   	// Socket.io interface
		var io_interface = require('./interfaces/if_io'); 
	  
		// Variables
		var HTTP_SERVER_PORT = port_;
		
		// Modules
		// Setup basic express server
		var express = require('express');
		var app = express();
		var path = require('path');
		var server = require('http').createServer(app);
		io_interface.if_io.io = require('socket.io')(server);
		var port = process.env.PORT || port_;
		
		// ----
		
		// Routing
		app.use(express.static(path.join(__dirname, '/public')));
		
		// Start HTTP server
		server.listen(port, function () {
			console.log('Server listening at port %d', port);
		});
		
		
   }
}