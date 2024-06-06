#!/bin/bash

# Step 1: Almacena la ruta de donde se ejecuta el script
SCRIPT_LOCATION=$(dirname "$(readlink -f "$0")")

# Step 2: Detén todos los contenedores

# Postgresql
if [ "$(docker ps -q -f name=postgresql)" ]; then
    docker stop postgresql
    docker rm postgresql
fi

# Riak KV
# Check if containers are running and stop them
if [ "$(docker ps -q -f name=coordinator)" ] || [ "$(docker ps -q -f name=member)" ]; then
    docker compose -f "${SCRIPT_LOCATION}/riakkv/docker-compose.yml" down
fi

# MongoDB
# Check if containers are running and stop them
if [ "$(docker ps -q -f name=mongo1)" ]; then
    docker compose -f "${SCRIPT_LOCATION}/mongodb/compose.yaml" down
fi

# Neo4J
# Check if containers are running and stop them
if [ "$(docker ps -q -f name=neo4j1)" ]; then
    docker compose -f "${SCRIPT_LOCATION}/neo4j/docker-compose.yaml" down
fi
