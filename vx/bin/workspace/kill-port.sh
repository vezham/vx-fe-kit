#!/usr/bin/env bash

ports="${1:-}"
missing='{args.port}'

if [ -z "$ports" ] || [ "$ports" = "$missing" ]; then
    read -r -p "Ports to kill: " ports
fi

ports=$(printf '%s' "$ports" | tr ',' ' ')

if [ -z "$ports" ]; then
    echo "No ports provided" >&2
    exit 1
fi

for port in $ports; do
    case "$port" in
        '' | *[!0-9]*)
            echo "Skipping invalid port: $port" >&2
            continue
            ;;
    esac

    if [ "$port" -lt 1 ] || [ "$port" -gt 65535 ]; then
        echo "Skipping invalid port: $port" >&2
        continue
    fi

    # Only stop TCP listeners; connected clients may belong to other apps.
    pids=$(lsof -nP -tiTCP:"$port" -sTCP:LISTEN)

    if [ -z "$pids" ]; then
        echo "No TCP listener found on port $port"
    else
        kill -9 $pids && echo "Killed process(es) on port $port"
    fi
done
