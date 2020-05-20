echo "Bygger sykepengesok latest for docker compose utvikling"

npm i

PUBLIC_URL="" npm run build
docker build . -f Dockerfile.root -t sykepengesok:latest
