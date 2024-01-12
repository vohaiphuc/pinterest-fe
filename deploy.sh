#!/usr/bin/env bash

cd `dirname $BASH_SOURCE`

docker-compose stop
docker-compose rm -f
docker rm -f cons-vite-pin
docker-compose pull
docker-compose up -d
docker cp nginx.conf cons-vite-pin:/etc/nginx/

cd - > /dev/null
