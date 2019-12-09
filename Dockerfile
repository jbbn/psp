FROM node:13.0-alpine

WORKDIR /usr/local/src/psp-app/
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn --pure-lockfile

ADD . .

CMD ["yarn", "start"]
