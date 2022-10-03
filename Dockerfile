FROM gcr.io/distroless/nodejs@sha256:6e883fc7f431a50531bb4dfb808a2f52297ae7b39d232961dd3ddb06c9cabada

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
