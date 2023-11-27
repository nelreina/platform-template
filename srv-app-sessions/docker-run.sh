docker rm srv-app-sessions -f
docker run --name srv-app-sessions --restart=always -d -e STREAM= srv-app-sessions:latest

docker logs -f srv-app-sessions

