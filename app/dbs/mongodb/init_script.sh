#!/bin/bash

# Espera 10 segundos a que se inicialice el cluster
sleep 10

# Obten la ip del coordinador
MONGO_HOST="27017"

echo "MongoDB host: ${MONGO_HOST}"

echo "Creando schema..."
mongosh --port ${MONGO_HOST} create_schema.js

echo "Insertando documentos iniciales en schema..."
mongosh --port ${MONGO_HOST} insert_documents.js

echo
