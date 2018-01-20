/*
 Copyright (c) 2017 FH Dortmund.
 All rights reserved. This program and the accompanying materials
 are made available under the terms of the Eclipse Public License v1.0
 which accompanies this distribution, and is available at
 http://www.eclipse.org/legal/epl-v10.html

 Description:
    rover-web | sensor display behavior

 Author:
    M. Ozcelikors <mozcelikors@gmail.com>, created 27.10.2017
*/

// Make sure to connect to socketIO server to listen on events
// In this case, a parent webpage already calling this:
// var socketIOClient = io.connect('http://'+$(location).attr('hostname')+':5500');

// Sensor event handler
// parent means container of the iframe
parent.socketIOClient.on('sensor', function(data){
	
	function redrawSensorDisplay(infrared0, infrared1, infrared2, infrared3, front_sr04, rear_sr04,temperature, humidity, compass )
	{	
		// jQuery domain, redraw everything
		
			document.getElementById("sensorReading").innerHTML = "";
			document.getElementById("sensorReading").innerHTML = "<span style=\"font:'Arial';\"><table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"> \
<tr> \
<td width=\"10%\"><img src=\"images/icons/infrared.png\" width=\"111\" height=\"28\" /></td> \
<td width=\"20%\"><span style=\"font-size:18px; color:#FFF;\">Rear-Right: </span><span style=\" font-size:18px; color:#00CCFF;\">"+infrared0+"&nbsp;cm</span><br /> \
<span style=\"font-size:18px; color:#FFF;\">Rear-Left: </span><span style=\" font-size:18px; color:#00CCFF;\">"+infrared1+"&nbsp;cm</span><br /> \
<span style=\"font-size:18px; color:#FFF;\">Front-Right: </span><span style=\" font-size:18px; color:#00CCFF;\">"+infrared2+"&nbsp;cm</span><br /> \
<span style=\"font-size:18px; color:#FFF;\">Front-Left:</span><span style=\" font-size:18px; color:#00CCFF;\">&nbsp;"+infrared3+"&nbsp;cm</span></td> \
<td width=\"8%\"><img src=\"images/icons/ultrasonic.png\" width=\"78\" height=\"42\" /></td> \
<td width=\"19%\" valign=\"middle\"><span style=\"font-size:18px; color:#FFF;\">Front: </span><span style=\" font-size:18px; color:#00CCFF;\">"+front_sr04+"&nbsp;cm</span><br /> \
<span style=\"font-size:18px; color:#FFF;\">Rear: &nbsp;</span><span style=\" font-size:18px; color:#00CCFF;\">"+rear_sr04+"&nbsp;cm</span></td> \
<td width=\"8%\"><img src=\"images/icons/temperature.png\" width=\"73\" height=\"73\" /></td> \
<td width=\"19%\"><span style=\"font-size:18px; color:#FFF;\">Temperature: </span><span style=\" font-size:18px; color:#00CCFF;\">"+temperature+"&nbsp;deg</span><br /> \
<span style=\"font-size:18px; color:#FFF;\">Humidity: &nbsp;</span><span style=\" font-size:18px; color:#00CCFF;\">"+humidity+"&nbsp;%</span><br /></td> \
<td width=\"8%\"><img src=\"images/icons/compass-icon-13564.png\" width=\"88\" height=\"85\" /></td> \
<td width=\"19%\"><span style=\"font-size:18px; color:#FFF;\">Bearing: </span><span style=\" font-size:18px; color:#00CCFF;\">"+compass+"&nbsp;deg</span><br /></td> \
</tr> \
</table></span>";
		
		
	}

	// Parse received JSON data string
	try
	{
		var json_data = JSON.parse(data);
	}
	catch(ex)
	{
		var json_data = {"rover_dtype":"sensor",
				 				 "data":{
									 "infrared0":0,
									 "infrared1":0,
									 "infrared2":0,
									 "infrared3":0,
									 "front":0,
									 "rear":0,
									 "temperature":0,
									 "humidity":0,
									 "bearing":0,
									}
				 				};
	}
	
	// Re-draw
	redrawSensorDisplay(	json_data.data.infrared0, 
							json_data.data.infrared1, 
							json_data.data.infrared2, 
							json_data.data.infrared3, 
							json_data.data.front, 
							json_data.data.rear,
							json_data.data.temperature, 
							json_data.data.humidity, 
							json_data.data.bearing );
	
});
