FROM gcr.io/distroless/nodejs18-debian12@sha256:dfe95c6727ae6e4ac921e8197a2a5aa0e06d91d4924bb69a93ed8ed953a83a4f

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
