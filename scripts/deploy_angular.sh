#!/bin/bash

image_name='angular:1.0'

cd ../frontend
rm -rf dist/

docker rm -f deploy_angular &> /dev/null

if [ -z $(docker images -q ${image_name}) ]; then
    echo "Docker has no image $image_name, building new image"
    docker build .
fi

docker create --name=deploy_angular --volume=`pwd`:/home/node/app/ -it ${image_name} /bin/sh
docker start deploy_angular

docker exec deploy_angular test -d /home/node/app/node_modules || \
       (mkdir -p /home/node/app/node_modules && cp -rfu /home/node/node_modules/* /home/node/app/node_modules)
docker exec deploy_angular npm install
docker exec deploy_angular ng build -prod

if [ ! -d dist/ ]; then
    echo 'Some error occurred, no angular production build generated'
    exit 1
fi

echo
echo 'Angular files generated successfully'

rm -rf ../nginx/frontend
cp -R dist/ ../nginx/frontend

docker stop deploy_angular

exit 0
