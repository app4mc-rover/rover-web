/*
 Copyright (c) 2017 FH Dortmund.
 All rights reserved. This program and the accompanying materials
 are made available under the terms of the Eclipse Public License v1.0
 which accompanies this distribution, and is available at
 http://www.eclipse.org/legal/epl-v10.html

 Description:
    rover-web | socket.IO client-side functions
	
 Prerequisites:
 	1) Node.Js must be installed on your system.
	2) Node.Js modules required: socket.io

 Author:
    M. Ozcelikors <mozcelikors@gmail.com>, created 27.10.2017
*/

var socketIOClient = io.connect('http://'+document.location.hostname+':5502');//('http://'+document.location.hostname+':5502');

//Example data:
// Send your data
//socket.emit('my-data', {
//     data1 : 'something',
//     data2 : 'something'
//});

// Received Events from SocketIO Server side
//socketIOClient.on('util', function(data){
//	alert('data recv'+data);
	// Do something with your new data
//});

//socketIOClient.on('sensor', function(data){
//	alert('data recv'+data);
//	// Do something with your new data
//});

// For throwing event to server from client javascript apps
function throwSocketIOEvent(event_, data_)
{
	//var socketIOClient = io.connect('http://192.168.168.1:5502');
	socketIOClient.emit(event_, data_);
}