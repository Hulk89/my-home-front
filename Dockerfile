FROM node:9.11.1-alpine
MAINTAINER hulk.oh "snuboy89@gmail.com"

ENV TZ ROK

RUN npm install -g http-server

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

EXPOSE 8080
CMD ["http-server", "dist"]

