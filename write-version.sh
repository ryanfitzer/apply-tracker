#!/bin/bash

current_date=$(date +"%Y-%m-%d.%T" )
current_version=$( cat package.json | jq -r '.version');

echo "{\"version\":\"$current_version ($current_date)\"}" > ./dist/version.json