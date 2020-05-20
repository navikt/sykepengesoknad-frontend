echo "Bygger sykepengesok latest for docker compose utvikling"

npm i

PUBLIC_URL="/nysykepengesoknad" npm run build
docker build . -f Dockerfile.nysykepengesoknad -t sykepengesok:latest
