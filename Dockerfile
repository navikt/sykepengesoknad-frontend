FROM gcr.io/distroless/nodejs20-debian12@sha256:a6c0e95f6f70fb21586757a846d8b8d287609f2414bcc2399895adb055768648

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
