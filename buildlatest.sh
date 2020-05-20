echo "Bygger sykepengesok latest for docker compose utvikling"

npm i

npm run build
docker build . -f Dockerfile.root -t sykepengesok:latest
