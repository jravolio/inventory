FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY next.config.js ./next.config.js

COPY ./src/pages ./src/pages
COPY public ./public
COPY styles ./styles

CMD [ "yarn", "dev" ]