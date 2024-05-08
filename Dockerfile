FROM gcr.io/distroless/nodejs20-debian12@sha256:a69b487c1d156e3aeaab0ffb587f46248c8e891e289081a3c28f7104a69c4515

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
