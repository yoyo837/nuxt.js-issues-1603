#!/bin/bash

PID=$(ps -ef | grep /data/ydmap/node/ydmap-ssr-portal | grep -v grep | awk '{ print $2 }')

if [ -z "$PID" ]
then
    echo Application is already stopped
else
    echo kill $PID
    kill $PID
