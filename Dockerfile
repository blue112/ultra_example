FROM node:10

ADD dist/ /home/node/app/
ADD package.json /home/node/app/

WORKDIR /home/node/app/
RUN npm install

CMD npm start

EXPOSE 3000
