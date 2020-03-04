#!/bin/sh
service nginx start
node /usr/src/webapp/dist/server/index.js
