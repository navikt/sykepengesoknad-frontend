FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim

WORKDIR /app

ENV NODE_ENV=production

COPY --chown=node:node /next.config.js ./
COPY --chown=node:node /next-logger.config.js ./
COPY --chown=node:node /.next ./.next
COPY --chown=node:node /.env.production ./
COPY --chown=node:node /public ./public
COPY --chown=node:node /node_modules ./node_modules

ENV PORT=3000
ENV NODE_OPTIONS="-r next-logger"

CMD ["./node_modules/next/dist/bin/next", "start"]

