#!/bin/bash

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

stop_api "/postgresql/app.js"
stop_api "/mongodb/app.js"
stop_api "/riakkv/app.js"
stop_api "/neo4j/app.js"
