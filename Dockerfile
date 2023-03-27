FROM gcr.io/distroless/nodejs18@sha256:c6163adfda796463a5691fc9f29733320ca2846985ba3708e0d490fbcbdc66f8

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
