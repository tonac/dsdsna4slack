#!/bin/bash

image_name='postgres:10.1-alpine'

cd ../postgresql

docker rm -f deploy_psql &> /dev/null

docker create --name=deploy_psql --volume=`pwd`/data_production/:/var/lib/postgresql/data/ \
              -e POSTGRES_USER=dsd -e POSTGRES_PASSWORD=dsdLozinkaMuySegura \
              -it ${image_name}

docker start deploy_psql


echo 'Deployment postgresql database started'
exit 0
