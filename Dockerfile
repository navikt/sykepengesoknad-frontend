FROM gcr.io/distroless/nodejs@sha256:0ab0c25a43c128eea3709246f6ec6383ac8b2027b33431b79199b1cf13331a64

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
