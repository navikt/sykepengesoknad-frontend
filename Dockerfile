FROM gcr.io/distroless/nodejs24-debian13@sha256:7cca079bad19303c78cd874a5da79832441985a216b767196507d69b8784a698

ENV NODE_ENV=production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /.env.production ./
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=3000
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
