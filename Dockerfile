FROM node:latest

WORKDIR ./

RUN npm install -g serve

COPY build build

EXPOSE 3000

CMD serve -s build

# CMD
