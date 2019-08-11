#!/bin/bash

for file in ./*
do
	if [ ${file##*/} != 'rename2font.sh' ]
    then
        fontname=$(fc-query "$file" | grep -Po 'fullname: "\K[\w- ]*')
        mv $file "$fontname.ttf"
    fi
done