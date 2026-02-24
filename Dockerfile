FROM gcr.io/distroless/nodejs24-debian12@sha256:aad62f814208ec57ff3a67a9ca8764b0bfa0f7af9809008a04aada96f6987dab

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
