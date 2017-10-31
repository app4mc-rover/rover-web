/*
 Copyright (c) 2017 FH Dortmund.
 All rights reserved. This program and the accompanying materials
 are made available under the terms of the Eclipse Public License v1.0
 which accompanies this distribution, and is available at
 http://www.eclipse.org/legal/epl-v10.html

 Description:
    rover-web | standalone TCP client that reads from socket.IO
				through interfaces and writes to NET sockets
	
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
		
		// Interface between TCP client and SocketIO server to share variables
		var client_interface = require('./interfaces/if_tcpclient_socketio'); 
		
		var net = require('net');
		
		var client = new net.Socket();
		var intervalConnect = false;
		
		console.log ("rover-web TCP client: started service...");
		console.log ("rover-web TCP client: trying to connect to "+host_+":"+port_+"...");
		
		function clientConnect()
		{
			client.connect({
				port: port_,
				host: host_	
			});
		}
		
		function launchIntervalConnect()
		{
			if (false != intervalConnect)
				return;
			intervalConnect = setInterval(clientConnect, 2500);	
		}
		
		function clearIntervalConnect()
		{
			if (false == intervalConnect)
				return;
			clearInterval(intervalConnect);
			intervalConnect = false;	
		}
		
		client.on('connect', function() {
			clearIntervalConnect()
			console.log ("rover-web TCP client: connected to server...");
			
			// Timer event to keep client writing without destruction until closing..
			var tmr_event_ = setInterval(function() {
				//console.log ("rover-web TCP client: setInterval Timer");
				//console.log ("rover-web TCP client: send_flag: "+client_interface.if_tcpclient_socketio.send_flag);
				if (client_interface.if_tcpclient_socketio.send_flag == 1)
				{
					client.write(client_interface.if_tcpclient_socketio.data);
					//console.log ("rover-web TCP client: data written :"+client_interface.if_tcpclient_socketio.data);
					client_interface.if_tcpclient_socketio.send_flag = 0;
				}
			}, 10);
		});
		
		client.on('error', function(error) {
			launchIntervalConnect()
		});
		
		client.on('close', function(error) {
			launchIntervalConnect()
			//console.log ("rover-web TCP client: server closed, trying to reconnect...");
		});
		
		client.on('end', function(error) {
			launchIntervalConnect()
			//console.log ("rover-web TCP client: server closed, trying to reconnect...");
		});
		
		client.on('close', function() {
			//console.log('Connection closed');
			client.destroy();
		});
		
		clientConnect()
   }
}



