FROM gcr.io/distroless/nodejs@sha256:6b2a243b543dbdb919977ceb43c7f7bf090ce66f02d1f12780fe52037f1bdc15

ENV NODE_ENV production

COPY /next.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080

CMD ["./node_modules/next/dist/bin/next", "start"]
