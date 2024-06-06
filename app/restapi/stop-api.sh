#!/bin/bash

API_DIRECTORY=$(dirname "$(readlink -f "$0")")

stop_api() {
    local pattern="$1"
    local pid=$(pgrep -f "$pattern")
    if [ -n "$pid" ]; then
        echo "Stopping API $pattern with PID $pid..."
        kill "$pid"
        echo "API $pattern stopped."
    else
        echo "API $pattern is not running."
    fi
}

stop_api "${API_DIRECTORY}/postgresql/app.js"
stop_api "${API_DIRECTORY}/mongodb/app.js"
stop_api "${API_DIRECTORY}/riakkv/app.js"
stop_api "${API_DIRECTORY}/neo4j/app.js"
