#!/bin/bash
/data/ydmap/services/jenkins/test/workspace/ydmap-ssr-portal/stop.sh
sleep 5

rm -rf /data/ydmap/node/ydmap-ssr-portal

mkdir -p /data/ydmap/node/ydmap-ssr-portal

cp -r /data/ydmap/services/jenkins/test/workspace/ydmap-ssr-portal/ /data/ydmap/node/

BUILD_ID=DONTKILLME

/data/ydmap/node/ydmap-ssr-portal/start.sh
# sleep 20
# tail -f /data/ydmap/node/ydmap-ssr-portal/ssr.log
