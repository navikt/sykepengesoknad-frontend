#!/bin/bash

export TIMESTAMP=$(date +%s)
echo "Benytter $TIMESTAMP som query param timestamp for static ressurser"

sed -i 's~##DECORATOR_URL##~'"$DECORATOR_URL"'~g' index.html
sed -i 's~##PUBLIC_URL##~'"$PUBLIC_URL"'~g' index.html
sed -i 's~.chunk.css"~'".chunk.css?ts=$TIMESTAMP\""'~g' index.html
sed -i 's~.chunk.js"~'".chunk.js?ts=$TIMESTAMP\""'~g' index.html
