FROM gcr.io/distroless/nodejs18@sha256:2de42a3372258144025566ebfbed7a64eeeed4a3dc75bd212ec5301daa2b0625

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
