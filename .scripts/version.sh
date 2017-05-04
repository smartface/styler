#!/usr/bin/env bash

version=$(cat package.json | jase version)

type=$1

if [ -f $type ] ; then
    version=$(node ./.scripts/incVersion.js -v $version);
else
    if [[ $type == "minor" || $type == "major" || $type == "patch" ]] ; then
        version=$(node ./.scripts/incVersion.js -v $version --$type);
    fi
fi

if [ -f $version ] ; then
    echo "no version found";
else
    result=$(cat package.json | jase version -s $version > package2.json);
    mv package2.json package.json;
fi
