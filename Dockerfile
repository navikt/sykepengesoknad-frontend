# gjør det mulig å bytte base-image slik at vi får bygd både innenfor og utenfor NAV
ARG BASE_IMAGE_PREFIX=""
FROM ${BASE_IMAGE_PREFIX}node as builder

ADD / /source
ENV CI=true
WORKDIR /source
RUN npm ci && npm run build:demo
RUN cp -r /source/build /demo
RUN npm run build

FROM docker.adeo.no:5000/pus/decorator
ENV APPLICATION_NAME=sykepengesok
COPY --from=builder /source/build /app
COPY --from=builder /demo /app/demo

ADD decorator.yaml /decorator.yaml
