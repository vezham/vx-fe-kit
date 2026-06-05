#!/bin/bash

if [ -n "$1" ] && [ -d "$1" ]; then
    cd "$1" || exit 1
    shift
fi

# wjdlz/NOTE: export ENV var if exists
if [ -f .env ]; then
    set -o allexport
    source .env
    set +o allexport
fi

# Args:
# $1 - optional app root when it points to a directory
# next arg (now $1) - serve mode after shifting app root (dev, start, ...)
serve=${1:-"dev"}
# local vars
hostname=${HOST_NAME:-"localhost"}
port=${PORT:-"3000"}

pre_setup(){
    if [ "$serve" = "start" ]; then
        port=${PRE_PORT:-"8080"}
    fi
}

main() {
    pre_setup
    next $serve --hostname $hostname --port $port # NODE_OPTIONS=--max-old-space-size=12288 
}

# Run main function
main
