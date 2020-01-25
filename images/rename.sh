#!/bin/bash

for D in */
do

dir=`echo $D|sed 's/\///'`
cp "$dir/img.jpg" "111/${dir}.jpg"

done