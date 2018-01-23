#!/bin/bash

ROVERWEB_INSTALL_PATH="/opt/rover-web"
NODEJS_SERVER_PATH="${ROVERWEB_INSTALL_PATH}/scripts/nodejs"

cd ${NODEJS_SERVER_PATH}
node start_roverweb.js

