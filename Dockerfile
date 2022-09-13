FROM gcr.io/distroless/nodejs@sha256:093f37cdbaabb9fa50473a0a0d020e7a3cec480f1eb1b77c1f49eb0b13d0096e

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
