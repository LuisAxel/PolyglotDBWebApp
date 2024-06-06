#!/bin/bash

# Step 1: Almacena la ruta de donde se ejecuta el script
SCRIPT_LOCATION=$(dirname "$(readlink -f "$0")")

# Step 2: Inicia todas las dbs

# Postgresql
if [ ! "$(docker ps -q -f name=postgresql)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=postgresql)" ]; then
        # cleanup
        docker rm postgresql
    fi
    # Inicia el contenedor
    docker run -d --name postgresql -p 5432:5432 luisaxel/postgresql:latest
fi

# Riak KV
if [ ! "$(docker ps -q -f name=coordinator)" ] || [ ! "$(docker ps -q -f name=member)" ]; then
    docker compose -f "${SCRIPT_LOCATION}/riakkv/docker-compose.yml" scale coordinator=1 member=3
fi

# MongoDB
# Check if containers are running
if [ ! "$(docker ps -q -f name=mongo1)" ]; then
    docker compose -f "${SCRIPT_LOCATION}/mongodb/compose.yaml" up -d --wait
fi

# Neo4J
# Check if containers are running
if [ ! "$(docker ps -q -f name=neo4j1)" ]; then
    docker compose -f "${SCRIPT_LOCATION}/neo4j/docker-compose.yaml" up -d
fi
