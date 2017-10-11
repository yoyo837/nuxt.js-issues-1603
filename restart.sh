#!/bin/bash
/data/ydmap/node/ydmap-ssr-portal/stop.sh

sleep 5

rm -rf /data/ydmap/node/ydmap-ssr-portal

mkdir -p /data/ydmap/node/ydmap-ssr-portal

cd /data/ydmap/services/jenkins/test/workspace/ydmap-ssr-portal/

git checkout master

cp -r /data/ydmap/services/jenkins/test/workspace/ydmap-ssr-portal/ /data/ydmap/node/

cd /data/ydmap/node/ydmap-ssr-portal/

echo 由于jenkins似乎会一定几率杀死start.sh拉起的ssr-portal应用的进程，触发点尚不明确。故此，需要手动启动此应用以跳过此问题后续解决。
# ./start.sh
echo 请在 /data/ydmap/node/ 下执行 ./start.sh

# sleep 20
# tail -f /data/ydmap/node/ydmap-ssr-portal/ssr.log
