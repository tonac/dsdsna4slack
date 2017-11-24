test -d /home/node/app/node_modules || mkdir -p /home/node/app/node_modules
cp -rfu /home/node/node_modules/* /home/node/app/node_modules
npm install
ng serve --host 0.0.0.0
