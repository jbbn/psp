FROM node:13.0-alpine

ARG NODE_ENV=development
ENV NODE_ENV="${NODE_ENV}"

WORKDIR /usr/local/src/psp-app/
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn --pure-lockfile

ADD . .

CMD ["yarn", "start"]
