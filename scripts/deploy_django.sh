#!/bin/bash

image_name='django:1.0'

cd ../backend

docker rm -f deploy_django &> /dev/null

if [ -z $(docker images -q ${image_name}) ]; then
    echo "Docker has no image $image_name, building new image"
    docker build .
fi

docker create --name=deploy_django --link deploy_psql:postgres --volume=`pwd`:/app/ -it ${image_name}  /bin/sh
docker start deploy_django

docker exec deploy_django pip install -r requirements.txt
docker exec deploy_django python manage.py collectstatic --noinput
docker exec deploy_django python manage.py makemigrations
docker exec deploy_django python manage.py migrate

docker exec -d deploy_django /usr/local/bin/gunicorn backend.wsgi:application -w 1 -b :8000

rm -rf ../nginx/backend
cp -R staticfiles/ ../nginx/backend

exit 0
