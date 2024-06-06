#!/bin/bash

# Step 1: Get script location
SCRIPT_PATH=$(dirname "$(readlink -f "$0")")

# Step 2: Run all init-scripts for NoSQL databases
echo "init-script for MongoDB..."
${SCRIPT_PATH}/mongodb/init-script.sh

echo "init-script for RiakKV..."
${SCRIPT_PATH}/riakkv/init-script.sh

echo "init-script for Neo4J..."
${SCRIPT_PATH}/neo4j/init-script.sh
