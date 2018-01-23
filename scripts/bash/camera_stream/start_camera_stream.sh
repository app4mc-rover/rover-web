#!/bin/bash
PREFIX="/usr"
INPUT_LIB=`find ${PREFIX} -name input_raspicam.so`
OUTPUT_LIB=`find ${PREFIX} -name output_http.so`
OUTPUT_DIR="/usr/local/www"
HTTP_PORT="8081"

echo "Found - ${INPUT_LIB}"
echo "Found - ${OUTPUT_LIB}"

mjpg_streamer -i "${INPUT_LIB} -x 640 -y 480 -fps 30" -o "${OUTPUT_LIB} -w ${OUTPUT_DIR} -p ${HTTP_PORT}"
