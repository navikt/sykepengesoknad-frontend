FROM node

WORKDIR /usr/src/app
COPY . .

EXPOSE 3000

CMD ["npm", "run", "build"]
