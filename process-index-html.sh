#!/bin/bash

sed -i 's~##DECORATOR_URL##~'"$DECORATOR_URL"'~g' index.html
sed -i 's~##PUBLIC_URL##~'"$PUBLIC_URL"'~g' index.html
