echo "Bygger sykepengesok latest for docker compose utvikling"

npm i

npm run build
cd server
npm i
npm run build
cd ..
docker build . -t sykepengesok:latest
