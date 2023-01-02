FROM gcr.io/distroless/nodejs@sha256:039aeeddc00d285be1a32d41648d3941cbdaab05cce03344a1267f49cce464d3

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
