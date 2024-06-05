#!/bin/bash

stop_api() {
    local pid=$(pgrep -f "$1")
    if [ -n "$pid" ]; then
        echo "Stopping API $1 with PID $pid..."
        kill "$pid"
        echo "API $1 stopped."
    else
        echo "API $1 is not running."
    fi
}

stop_api "postgresql"
stop_api "mongodb"
stop_api "riakkv"
stop_api "neo4j"
