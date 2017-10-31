/*
 Copyright (c) 2017 FH Dortmund.
 All rights reserved. This program and the accompanying materials
 are made available under the terms of the Eclipse Public License v1.0
 which accompanies this distribution, and is available at
 http://www.eclipse.org/legal/epl-v10.html

 Description:
    rover-web | Main node script to start the roverweb
				HTTP server, TCP server, and SocketIO server
	
 Prerequisites:
 	1) Node.Js must be installed on your system.
	2) Node.Js modules required: socket.io net connect serve-static http

 Author:
    M. Ozcelikors <mozcelikors@gmail.com>, created 28.10.2017
*/

// Total infrastructure of this web application is as follows:
//		TCP_Client << client_interface << socketIO (HTTP) << Serve-static Webpage (HTTP) + socketIO Client
//		TCP_Server >> server_interface >> socketIO (HTTP) >> Serve-static Webpage (HTTP) + socketIO Client

const roverweb_http_server = require('./roverweb_http_server');
const roverweb_tcp_server = require('./roverweb_tcp_server');
const roverweb_tcp_client = require('./roverweb_tcp_client');
const roverweb_socketio_server = require('./roverweb_socketio_server');

// Variables to start
ROVERWEB_HOST = '127.0.0.1';
ROVERWEB_LISTEN_PORT = 8502;
ROVERWEB_SEND_PORT = 8501;
HTTP_PORT = 5500;
SOCKETIO_PORT = 5502;

// Start HTTP Server to serve the web-page
let ret = roverweb_http_server.run(HTTP_PORT);

// Start TCP socket Server for rover-app >> rover-web
let ret2 = roverweb_tcp_server.run(ROVERWEB_HOST, ROVERWEB_LISTEN_PORT);

// Start TCP socket Client for rover-web >> rover-app
let ret3 = roverweb_tcp_client.run(ROVERWEB_HOST, ROVERWEB_SEND_PORT);

// Start Socket.Io Server for data passing: TCP >> socketIO >> Our Webpage (HTTP)
//											TCP << socketIO << Our Webpage (HTTP)
let ret4 = roverweb_socketio_server.run(SOCKETIO_PORT);
