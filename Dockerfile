FROM gcr.io/distroless/nodejs18-debian12@sha256:ce4b47fe6b9c6a2be7eb63836975f37c4e33144e22c06d64b49ae83838b5c8ff

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
