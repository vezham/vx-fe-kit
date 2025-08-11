#!/bin/bash

# $name (accounts, business, hq,..)
# $dir (path to ROOT_DIR from Working Dir)
# $1 - name (vx/config/firebase/$name.json)
# $2 - dir (../../v)

name=${1:-"app"}
dir=${2:-"../.."}

# read config
config=`cat $dir/vx/config/firebase/$name.json`

# switch for hosting from ROOT
cd $dir

# create firebase.json file
touch "firebase.json"

# write config to firebase.json
echo $config >> firebase.json
