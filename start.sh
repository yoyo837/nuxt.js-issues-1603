#!/bin/bash
yarn

yarn run build

nohup yarn run start-without-build > ssr.log &
