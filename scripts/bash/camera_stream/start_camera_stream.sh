#!/bin/bash
export LD_LIBRARY_PATH=/usr/local/lib
sudo /usr/local/bin/mjpg_streamer -i "/usr/local/lib/input_raspicam.so -x 640 -y 480 -fps 30" -o "/usr/local/lib/output_http.so -w /usr/local/www -p 8081"

