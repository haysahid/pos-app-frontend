# Dockerfile
FROM node:18.16-alpine

# create destination directory
RUN mkdir -p /usr/src/pos-app-frontend
WORKDIR /usr/src/pos-app-frontend

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/pos-app-frontend/
RUN npm install
RUN npm run build
# RUN npm run generate

ENV API_1="http://projects.my.id/api/"

# ENV API_1="http://127.0.0.1:8000/api/"
ENV API_2="https://api.rajaongkir.com/starter/"
# ENV IMG_URL="http://127.0.0.1:8000/storage/"

ENV IMG_URL="http://projects.my.id/storage/"

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD [ "npm", "run", "start" ]