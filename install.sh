#!/bin/bash

apt-get update
apt-get install -y nginx docker.io nodejs npm

# docker
ln -sf /usr/bin/docker.io /usr/bin/docker
usermod -a -G docker vagrant

# node
ln -sf /usr/bin/nodejs /usr/bin/node

# npm
npm install -g bower gulp grunt-cli

# mongo
docker run -d -p 27017:27017 --name mongodb dockerfile/mongodb
