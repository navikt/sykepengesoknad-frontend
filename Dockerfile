FROM gcr.io/distroless/nodejs20-debian12@sha256:04350092341fdc31bd1c9c7cac4f50f9194652f3afd8d4a442428b102c9d66c2

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
