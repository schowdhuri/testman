#!/bin/sh
yarn start:server &
yarn start:client &
wait
