#!/bin/bash

# wjdlz/NOTE: to mask values
mask_value() {
    local value=$1
    local name=$2
    
    if [ "$value" = "null" ] || [ -z "$value" ]; then
        echo "wjdlz/ERROR: Invalid $name value"
        return 1
    fi
    
    echo "::add-mask::$value"
    return 0
}
