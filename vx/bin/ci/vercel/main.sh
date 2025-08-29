#!/bin/bash

# $name (mocks, accounts, business, hq,..)
# $dir (path to ROOT_DIR from Working Dir)
# $1 - name (vx/config/vercel/$name.json)
# $2 - dir (../../../vx)

name=${1:-"__mocks__/mock"}
dir=${2:-"../../.."}

# read config
config=`cat $dir/vx/config/vercel/$name.json`

# switch for hosting from ROOT
# cd $dir

# create vercel.json file
touch "vercel.json"

# write config to vercel.json
echo $config >> vercel.json
