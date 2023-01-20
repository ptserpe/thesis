# Dockerfile
FROM node:16-alpine3.16

# create destination directory
RUN mkdir -p /usr/src/ts-node-app
WORKDIR /usr/src/ts-node-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/ts-node-app/
RUN yarn

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "yarn", "start" ]