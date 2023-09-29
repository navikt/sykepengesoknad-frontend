FROM gcr.io/distroless/nodejs18-debian12@sha256:ee36c135f8391f1facc373d9e9c0445fde06b0ab45c514ef33b84163fe7ec14b

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
