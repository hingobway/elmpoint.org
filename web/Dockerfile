FROM node:10.9-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm i -g yarn; \
  yarn

ENV PORT 8080
EXPOSE 8080

CMD ["yarn","docker:start"]