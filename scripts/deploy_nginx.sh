#!/bin/bash

image_name='nginx:1.13.8'

cd ../nginx

docker rm -f deploy_nginx &> /dev/null

docker run --name=deploy_nginx --publish=80:80 \
              --volume=`pwd`/frontend:/app/frontend/:ro \
              --volume=`pwd`/conf.d:/etc/nginx/conf.d:ro \
              --volume=`pwd`/backend:/app/backend/:ro \
              --link deploy_django:django \
              -it -d ${image_name}

echo 'Deployment of nginx finished'
exit 0
