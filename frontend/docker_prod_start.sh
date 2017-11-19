test -d /home/node/app/node_modules || mkdir -p /home/node/app/node_modules
cp -rfu /home/node/node_modules/* /home/node/app/node_modules
ng serve build -prod
