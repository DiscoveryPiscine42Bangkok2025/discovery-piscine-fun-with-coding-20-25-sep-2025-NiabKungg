#!/bin/sh

printf "%d\n" "$(find . -mindepth 1 \( -type f -o -type d \) | wc -l)"