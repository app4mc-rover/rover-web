#!/bin/bash
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt install nodejs
sudo npm install socket.io net connect serve-static http