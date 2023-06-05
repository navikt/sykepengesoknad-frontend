FROM gcr.io/distroless/nodejs18-debian11@sha256:13a2e3e503bba93f569316fd1606a6cbd4edd24e7d22023f433f9342cc68d7a9

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
