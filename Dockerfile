FROM nginx:alpine

COPY nginx_syksykepengesoknad.conf /etc/nginx/conf.d/default.conf
COPY /build /usr/share/nginx/html/syk/sykepengesoknad
COPY demoredirect.html /usr/share/nginx/html/index.html


# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html/syk/sykepengesoknad
COPY ./env.sh .
COPY ./process-index-html.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh
RUN chmod +x process-index-html.sh

EXPOSE 8080

ENV BASE_NAME=/syk/sykepengesoknad
ENV PUBLIC_URL=/syk/sykepengesoknad

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/syk/sykepengesoknad/env.sh && /usr/share/nginx/html/syk/sykepengesoknad/process-index-html.sh && nginx -g \"daemon off;\""]
