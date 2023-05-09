# Dockerfile
FROM node:18.16-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install
RUN npm run build

ENV API_1="http://34.143.202.14/api/"
ENV API_2="https://api.rajaongkir.com/starter/"
ENV IMG_URL="http://34.143.202.14/storage/"

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

CMD [ "npm", "run", "start" ]