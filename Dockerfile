FROM gcr.io/distroless/nodejs18@sha256:c959c19bfb9db4e64dda3326be228a7b0a0deb83295f4775ce9a2ff8ee2bb944

ENV NODE_ENV production

COPY /next.config.js ./
COPY /next-logger.config.js ./
COPY /.next ./.next
COPY /public ./public
COPY /node_modules ./node_modules

ENV PORT=8080
ENV NODE_OPTIONS='-r next-logger'

CMD ["./node_modules/next/dist/bin/next", "start"]
