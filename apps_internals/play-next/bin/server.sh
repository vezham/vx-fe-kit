#!/bin/bash

# wjdlz/NOTE: export ENV var if exists
if [ -f .env ]; then
    set -o allexport
    source .env
    set +o allexport
fi

# $serve (dev, start,..)
# $port (path to ROOT_DIR from Working Dir)
# $1 - serve (dev)
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
