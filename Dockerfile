FROM gcr.io/distroless/nodejs20-debian12@sha256:55fcbc1b781606f4aa3587d3ee174a8acfc975b02a3ea252cef282895ac362d5

ENV NODE_ENV=production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /.env ./
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=3000
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
