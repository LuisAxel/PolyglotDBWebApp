#!/bin/bash

API_DIRECTORY=$(pwd)

#Start all APIs
node ${API_DIRECTORY}/postgresql/app.js &
node ${API_DIRECTORY}/mongodb/app.js &
node ${API_DIRECTORY}/riakkv/app.js &
node ${API_DIRECTORY}/neo4j/app.js &
