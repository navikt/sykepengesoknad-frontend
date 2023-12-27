FROM gcr.io/distroless/nodejs20-debian12@sha256:7715474a901a28e3edcdf7730f14b33e30c26085989ce04b0de163fe8fab0f03

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
