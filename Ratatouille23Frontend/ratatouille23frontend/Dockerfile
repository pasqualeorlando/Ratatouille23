#Stage 1
#FROM node:18-alpine as builder
#WORKDIR /app
#COPY package.json .
#COPY package-lock.json .
#RUN npm install
#RUN npm start
#COPY . .
#RUN npm start

#Stage 2
FROM nginx:1.19.0
COPY nginx-ui.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY /build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]