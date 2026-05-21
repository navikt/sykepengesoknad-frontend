FROM gcr.io/distroless/nodejs24-debian13@sha256:e70510b44870c5686983f2b11f22b884f2dfacf86aea69b6b0edb2ccb3f237f4

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
