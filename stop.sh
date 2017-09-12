#!/bin/bash

PID=$(ps -ef | grep build/main.js | grep -v grep | awk '{ print $2 }')

if [ -z "$PID" ]
then
    echo Application is already stopped
else
    echo kill $PID
    kill $PID
fi
