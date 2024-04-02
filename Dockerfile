FROM gcr.io/distroless/nodejs20-debian12@sha256:36a64f13fd57646fd2059f258f759a8d2ccfbca7a397c550b425c63171fc47cb

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
