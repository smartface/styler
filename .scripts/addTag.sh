#!/usr/bin/env bash

if [ ! -f $NEW_APP_VERSION ]; then
    echo "adding new version $NEW_APP_VERSION";
    git tag $version || status=$?;
    git push --tags || status=$?;
    
    if [ $status != "0" ]; then
        unset NEW_APP_VERSION;
    fi
fi
