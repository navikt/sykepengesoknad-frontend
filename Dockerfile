FROM gcr.io/distroless/nodejs18-debian11@sha256:117e714f608555028a18c8162db6246557ec667159d18714a4dd7a9ee5948be2

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
