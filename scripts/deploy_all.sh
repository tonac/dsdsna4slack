#!/bin/bash

bash deploy_psql.sh
bash deploy_angular.sh
bash deploy_django.sh
bash deploy_nginx.sh
exit 0
