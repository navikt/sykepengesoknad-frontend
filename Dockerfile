FROM gcr.io/distroless/nodejs20-debian12@sha256:8ce2935455d9c9c8ea04d53ea42c30bfba5ceffbf580fd796217f35c00d6d11c

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
