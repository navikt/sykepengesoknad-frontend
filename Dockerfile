# gjør det mulig å bytte base-image slik at vi får bygd både innenfor og utenfor NAV
FROM node as builder
WORKDIR /app

COPY . ./

RUN npm install
RUN npm run build


FROM nginx:alpine
RUN mkdir /usr/share/nginx/html/sykepengesoknad
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html/sykepengesoknad
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
