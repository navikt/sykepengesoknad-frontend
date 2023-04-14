FROM gcr.io/distroless/nodejs18@sha256:1fd03807e02eeb78efaacb0e38e8e68ead0639733e92e7cc9a9e017cd9b50bbf

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
