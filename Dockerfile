FROM gcr.io/distroless/nodejs18-debian12@sha256:c2de6dd6f5f8ddbfc977b1f16b5a121017f3bf11e9993baa922aa18322c2bf24

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
