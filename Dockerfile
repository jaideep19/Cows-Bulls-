FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install

RUN npm install -g serve

RUN npm run build

COPY build /app

CMD serve -s build
