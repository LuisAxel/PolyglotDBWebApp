#!/bin/bash

# Ruta en contenedor
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
container_file_path="/entities-relations.cypher"

# Revisa si hay contenido en la base de datos
db_content=$(docker exec neo4j1 cypher-shell -u neo4j -p neo4j123 "MATCH (n) RETURN COUNT(n) AS node_count")

# Extract node count
node_count=$(echo "${db_content}" | awk 'NR==2 {print $1}')

if [[ "${node_count}" -eq 0 ]]; then
    echo "Copiando y ejecutando archivo de inicio..."
    # Copia y ejecuta archivo
    docker cp ${SCRIPT_DIR}/entities-relations.cypher neo4j1:"${container_file_path}"
    docker exec -it neo4j1 cypher-shell -u neo4j -p neo4j123 -f /entities-relations.cypher
    echo "Terminando ejecucion."
else
    echo "La base tiene datos. Terminando ejecucion."
fi
