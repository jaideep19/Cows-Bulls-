FROM node:latest

WORKDIR ./

COPY package*.json ./

#RUN npm install
# If you are building your code for production
RUN npm ci

COPY . .

EXPOSE 3030

CMD [ "node", "index.js" ]
