echo "Bygger sykepengesok latest for docker compose utvikling"

npm i

npm run build
docker build . -f Dockerfile.nysykepengesoknad -t sykepengesok:latest
