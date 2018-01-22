/*
 Copyright (c) 2017 FH Dortmund.
 All rights reserved. This program and the accompanying materials
 are made available under the terms of the Eclipse Public License v1.0
 which accompanies this distribution, and is available at
 http://www.eclipse.org/legal/epl-v10.html

 Description:
    rover-web | Main behavior of rover-web

 Author:
    M. Ozcelikors <mozcelikors@gmail.com>, created 27.10.2017
*/

/* Operation modes and Commands for 'control' interface
P -> Parking Mode Left
O -> Parking Mode Right
U -> Compass Calibration
M -> Adaptive Cr. Mode
X -> Manual Drive Mode
L -> Booth Mode - Demo1
N -> Booth Mode - Demo2

R -> Shutdown Hook
U -> Compass Calibration
F -> Stop Movement

Q -> Go Forward-Left
W -> Go Forward
E -> Go Forward-Right
A -> Go Backward-Left
S -> Go Backward
D -> Go Backward-Right
*/

var PREV_OPERATION_MODE = "F";
var _OPERATION_MODE = "F";

var isDown = false;
var DRIVING_MODES = {
		MANUAL: {value:0},
		ACC:    {value:1},
		PARKING:{value:2},
		BOOTH1: {value:3},
		BOOTH2: {value:4}
};
var driving_mode = DRIVING_MODES.MANUAL;

function handleParkingDirectionVisibility()
{
	if (driving_mode == DRIVING_MODES.PARKING)
	{
		$("#ParkingDirectionDiv").slideDown(300);
	}
	else
	{
		$("#ParkingDirectionDiv").slideUp(300);
		$('#parkingdirectionselect').val('parking_select');
	}
}

$(document).keydown(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	
	if(keycode == 81){ //Q
		driving_mode = DRIVING_MODES.MANUAL;
		$("#modeselect").val("manualdrive");
		if (_OPERATION_MODE != "Q")
		{
			_OPERATION_MODE = "Q";	
			throwSocketIOEvent('control','Q');
		}
	}
	if(keycode == 87){ //W
		driving_mode = DRIVING_MODES.MANUAL;
		$("#modeselect").val("manualdrive");
		if (_OPERATION_MODE != "W")
		{
			_OPERATION_MODE = "W";
			throwSocketIOEvent('control','W');
		}
	}
	if(keycode == 69){ //E
		driving_mode = DRIVING_MODES.MANUAL;
		$("#modeselect").val("manualdrive");
		if (_OPERATION_MODE != "E")
		{
			_OPERATION_MODE = "E";	
			throwSocketIOEvent('control','E');
		}
	}
	if(keycode == 65){ //A
		driving_mode = DRIVING_MODES.MANUAL;
		$("#modeselect").val("manualdrive");
		if (_OPERATION_MODE != "A")
		{
			_OPERATION_MODE = "A";	
			throwSocketIOEvent('control','A');
		}
	}
	if(keycode == 83){ //S
		driving_mode = DRIVING_MODES.MANUAL;
		$("#modeselect").val("manualdrive");
		if (_OPERATION_MODE != "S")
		{
			_OPERATION_MODE = "S";	
			throwSocketIOEvent('control','S');
		}
	}
	if(keycode == 68){ //D
		driving_mode = DRIVING_MODES.MANUAL;
		$("#modeselect").val("manualdrive");
		if (_OPERATION_MODE != "D")
		{
			_OPERATION_MODE = "D";	
			throwSocketIOEvent('control','D');
		}
	}
	if(keycode == 70){ //F
		driving_mode = DRIVING_MODES.MANUAL;
		$("#modeselect").val("manualdrive");
		if (_OPERATION_MODE != "F")
		{
			_OPERATION_MODE = "F";	
			throwSocketIOEvent('control','F');
		}
	}
	handleParkingDirectionVisibility();
});

$(document).keyup(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == 81){ //Q
		_OPERATION_MODE = "F";	
		throwSocketIOEvent('control','F');
	}
	if(keycode == 87){ //W
		_OPERATION_MODE = "F";
		throwSocketIOEvent('control','F');
	}
	if(keycode == 69){ //E
		_OPERATION_MODE = "F";
		throwSocketIOEvent('control','F');
	}
	if(keycode == 65){ //A
		_OPERATION_MODE = "F";
		throwSocketIOEvent('control','F');
	}
	if(keycode == 83){ //S
		_OPERATION_MODE = "F";
		throwSocketIOEvent('control','F');
	}
	if(keycode == 68){ //D
		_OPERATION_MODE = "F";
		throwSocketIOEvent('control','F');
	}
	if(keycode == 70){ //F
		_OPERATION_MODE = "F";
		throwSocketIOEvent('control','F');
	}
});

$(document).ready(function(){
	 //Parking direction prompt initially invisible
	 $("#ParkingDirectionDiv").hide();
	
	 $('#calibratecompass_btn').mousedown(function(){
	 		throwSocketIOEvent('control','U');
	 });
	 $('#modeselect').change(function(){
		 	if ($('#modeselect').val()=="acc")                      //ACC mode
			{
				driving_mode = DRIVING_MODES.ACC;
				throwSocketIOEvent('control','M');
			}
			else if ($('#modeselect').val()=="manualdrive")         //Manual drive mode
			{
				driving_mode = DRIVING_MODES.MANUAL;
				throwSocketIOEvent('control','X'); 
			}
			else if ($('#modeselect').val()=="parking")         	//Parking mode
			{
				driving_mode = DRIVING_MODES.PARKING;
			}
			else if ($('#modeselect').val()=="booth1")         	    //Booth mode - Demo 1
			{
				driving_mode = DRIVING_MODES.BOOTH1;
				throwSocketIOEvent('control','L');
			}
			else if ($('#modeselect').val()=="booth2")         		//Booth mode - Demo 2
			{
				driving_mode = DRIVING_MODES.BOOTH2;
				throwSocketIOEvent('control','N'); 
			}
			handleParkingDirectionVisibility();
	 });
	 
	 $('#parkingdirectionselect').change(function(){
			if (driving_mode == DRIVING_MODES.PARKING)
			{
				if ($('#parkingdirectionselect').val()=="parking_left")
				{
					throwSocketIOEvent('control','P');
				}
				else if ($('#parkingdirectionselect').val()=="parking_right")
				{
					throwSocketIOEvent('control','O');
				}
				else //Parking direction is unselected i.e. "parking_select"
				{
					//So stop.. (and change to manual mode)
					throwSocketIOEvent('control','X');
				}
			}
	 });
	 
	 $('#forward_btn').mousedown(function(){
		 	driving_mode = DRIVING_MODES.MANUAL;
		 	$("#modeselect").val("manualdrive");
			if (_OPERATION_MODE != "W")
			{
				_OPERATION_MODE = "W";	
				throwSocketIOEvent('control','W');
			}
			isDown = true;
			handleParkingDirectionVisibility();
	 });

	 $('#backward_btn').mousedown(function(){
		 	driving_mode = DRIVING_MODES.MANUAL;
		 	$("#modeselect").val("manualdrive");
			if (_OPERATION_MODE != "S")
			{
				_OPERATION_MODE = "S";	
				throwSocketIOEvent('control','S');
			}
			isDown = true;
			handleParkingDirectionVisibility();
	 });

	 $('#turnleft_btn').mousedown(function(){
		 	driving_mode = DRIVING_MODES.MANUAL;
		 	$("#modeselect").val("manualdrive");
			if (_OPERATION_MODE != "Q")
			{
				_OPERATION_MODE = "Q";	
				throwSocketIOEvent('control','Q');
			}
			isDown = true;
			handleParkingDirectionVisibility();
	 });

	 $('#turnright_btn').mousedown(function(){
		 	driving_mode = DRIVING_MODES.MANUAL;
		 	$("#modeselect").val("manualdrive");
			if (_OPERATION_MODE != "E")
			{
				_OPERATION_MODE = "E";	
				throwSocketIOEvent('control','E');
			}
			isDown = true;
			handleParkingDirectionVisibility();
	 });

	 $('#turnbackright_btn').mousedown(function(){
		 	driving_mode = DRIVING_MODES.MANUAL;
		 	$("#modeselect").val("manualdrive");
			if (_OPERATION_MODE != "D")
			{
				_OPERATION_MODE = "D";	
				throwSocketIOEvent('control','D');
			}
			isDown = true;
			handleParkingDirectionVisibility();
	 });

	 $('#turnbackleft_btn').mousedown(function(){
		 	driving_mode = DRIVING_MODES.MANUAL;
		 	$("#modeselect").val("manualdrive");
			if (_OPERATION_MODE != "A")
			{
				_OPERATION_MODE = "A";
				throwSocketIOEvent('control','A');
			}
			isDown = true;
			handleParkingDirectionVisibility();
	 });

	 $('#roundleft_btn').mousedown(function(){
		 	driving_mode = DRIVING_MODES.MANUAL;
		 	$("#modeselect").val("manualdrive");
			if (_OPERATION_MODE != "J")
			{
				_OPERATION_MODE = "J";
				throwSocketIOEvent('control','J');	
			}
			isDown = true;
			handleParkingDirectionVisibility();
	 });

	 $('#roundright_btn').mousedown(function(){
		 	driving_mode = DRIVING_MODES.MANUAL;
		 	$("#modeselect").val("manualdrive");
			if (_OPERATION_MODE != "K")
			{
				_OPERATION_MODE = "K";
				throwSocketIOEvent('control','K');	
			}
			isDown = true;
			handleParkingDirectionVisibility();
	 });
	 
	 $('#shutdown_btn').mousedown(function(){
		 	// Send shutdown hook to RPi - we denote it by "R"
			throwSocketIOEvent('control','R');
		 
     });
	 
	 $(document).mouseup(function(){
			if (isDown == true)
			{
				_OPERATION_MODE = "F";
				throwSocketIOEvent('control','F');
				isDown = false;	
			}	 
	 });
	 
	 
	 

	 $('#sensorinfo_btn').click(function(){
	 	$('#sensorSectionDiv').slideToggle(300);
	 });
	 $('#sensorinfo2_btn').click(function(){
	 	$('#sensorSection2Div').slideToggle(300);
	 });
	 $('#keyboardinfo_btn').click(function(){
	 	$('#keyboardInfo').fadeToggle(300);
	 });
	 $('#keyboardInfo').click(function(){
	 	$('#keyboardInfo').fadeToggle(300);
	 });


	throwSocketIOEvent('control',_OPERATION_MODE);

})


function refreshSwatch() {
	var speed = $( "#sliderSpeed" ).slider( "value" );
	$(document).ready(function(){
		throwSocketIOEvent('speed',speed);
	});

}


$(function(){
	$( "#sliderSpeed" ).slider({
		orientation: "horizontal",
		range: "min",
		min: 360,
		max: 480,
		value: 480,
		step: 10,
		slide: refreshSwatch,
		change: refreshSwatch
  });

	$('#sliderSpeed').slider();
});
