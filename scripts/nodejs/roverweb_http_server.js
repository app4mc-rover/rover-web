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
		// Variables
		var HTTP_SERVER_PORT = port_;
		
		// Modules
		var connect = require('connect');
		var http = require ('http');
		var serveStatic = require('serve-static');
		
		// ----
		
		// Start server-static based HTTP server
		var http_server = connect().use(serveStatic("../../")).listen(HTTP_SERVER_PORT, function(){
			console.log('rover-web HTTP server: is now running on '+HTTP_SERVER_PORT+'...');
		});
   }
}