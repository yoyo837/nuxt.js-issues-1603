#!/bin/bash
yarn

yarn run build

nohup yarn run start > ssr.log &
