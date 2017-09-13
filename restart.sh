#!/bin/bash
/data/ydmap/node/ydmap-ssr-portal/stop.sh

sleep 5

rm -rf /data/ydmap/node/node_modules/

cp -r /data/ydmap/node/ydmap-ssr-portal/node_modules/ /data/ydmap/node/

rm -rf /data/ydmap/node/ydmap-ssr-portal

mkdir -p /data/ydmap/node/ydmap-ssr-portal

cp -r /data/ydmap/services/jenkins/test/workspace/ydmap-ssr-portal/ /data/ydmap/node/

cp -r /data/ydmap/node/node_modules/ /data/ydmap/node/ydmap-ssr-portal/

cd /data/ydmap/node/ydmap-ssr-portal/

./start.sh
# sleep 20
# tail -f /data/ydmap/node/ydmap-ssr-portal/ssr.log
