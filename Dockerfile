FROM gcr.io/distroless/nodejs20-debian12@sha256:7fff8fb4a6463da2765532290c958f7e6fc01d54d7539f0d2bda1e93c7636d7c

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
