/*
 Copyright (c) 2017 FH Dortmund.
 All rights reserved. This program and the accompanying materials
 are made available under the terms of the Eclipse Public License v1.0
 which accompanies this distribution, and is available at
 http://www.eclipse.org/legal/epl-v10.html

 Description:
    rover-web | utilization display behavior

 Author:
    M. Ozcelikors <mozcelikors@gmail.com>, created 27.10.2017
*/
// Make sure to connect to socketIO server to listen on events
// In this case, a parent webpage already calling this:
// var socketIOClient = io.connect('http://'+$(location).attr('hostname')+':5500');

// Util event handler
// parent means container of the iframe
parent.socketIOClient.on('util', function(data){
	
	function redrawUtilDisplay(averageCore0, averageCore1, averageCore2, averageCore3)
	{	
		// Find average
		var averageSensorReading = Math.round((averageCore0+averageCore1+averageCore2+averageCore3)/4);
		// jQuery domain
		$(document).ready(function (){
			// Reset and plot everything
			$('#distSensorReading').html("");
			
			$('#distSensorReading').prepend("<br /><br /><span style=\"font-size:20px; color:#CCC;\">Avg. Util (RaspberryPi)</span><br /><span style=\" font-size:40px; color:#00CCFF;\">"+averageSensorReading+"&nbsp;%</span>");
			
			$.jqplot.config.enablePlugins = true;
			var raspberry = [averageCore0, averageCore1, averageCore2, averageCore3];
			var ticks = ['Core0', 'Core1', 'Core2', 'Core3'];
			var labels = ['Raspberry Pi'];
			plot1 = $.jqplot('chartdiv', [raspberry], {
				// Only animate if we're not using excanvas (not in IE 7 or IE 8)..
				//animate: !$.jqplot.use_excanvas,
				seriesDefaults:{
					renderer:$.jqplot.BarRenderer,
					pointLabels: { show: true }
				},
				legend: {show:true, labels:labels},
				axes: {
					xaxis: {
						renderer: $.jqplot.CategoryAxisRenderer,
						ticks: ticks
					}
				},
				title : 'System Core Utilization',
				highlighter: { show: false },
				series:[{color:'#0099CC'}, {color:'lightgreen'}, {color:'orange'}]
			});
			plot1.redraw();	
		
		});
		
	}

	// Parse received JSON data string
	try
	{
		var json_data = JSON.parse(data);
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

	// Re-draw
	redrawUtilDisplay(	json_data.data.core0,
						json_data.data.core1,
						json_data.data.core2,
						json_data.data.core3 );
	
});
