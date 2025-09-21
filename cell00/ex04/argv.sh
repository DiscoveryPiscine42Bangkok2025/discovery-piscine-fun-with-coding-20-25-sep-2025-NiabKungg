#!/bin/sh

if [ "$#" -eq 0 ]; then
    echo "No arguments supplied"
    exit 0
fi

count=0
for arg in "$@"; do
    if [ $count -eq 3 ]; then
        break
    fi
    echo "$arg"
    count=$((count + 1))
done
