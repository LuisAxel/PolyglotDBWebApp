#!/bin/bash

# Ruta en contenedor
container_file_path="/entities-relations.cypher"

if ! docker exec neo4j1 test -f "${container_file_path}"; then
    echo "Copiando y ejecutando archivo..."
    # Copia y ejecuta archivo
    docker cp entities-relations.cypher neo4j1:"${container_file_path}"
    docker exec -it neo4j1 cypher-shell -u neo4j -p neo4j123 -f /entities-relations.cypher
    echo "Terminando ejecucion."
else
    echo "Archivo encontrado en el contenedor, terminando ejecucion."
fi
