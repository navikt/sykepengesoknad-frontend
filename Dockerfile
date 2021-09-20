FROM node:16-alpine

ENV NODE_ENV production

COPY server/dist/index.js .
COPY server/node_modules .
COPY /build ./build

CMD ["node", "index.js"]

EXPOSE 8080
