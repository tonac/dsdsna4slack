FROM node:9.1.0-alpine

RUN npm install -g @angular/cli@1.5.0

USER node
WORKDIR /home/node/
COPY package.json package.json
RUN npm install

RUN mkdir /home/node/app
WORKDIR /home/node/app

CMD /bin/sh docker_dev.sh
