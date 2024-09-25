FROM gcr.io/distroless/nodejs20-debian12@sha256:2818fb8cdc25894d9c6b6e6bf72b4033d949f5d6d65173a6d7aeec0266f03037

ENV NODE_ENV=production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
