docker load < ./project-name-server.tar && \
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d