#!/bin/bash

for file in ./*
do
    fileext=${file##*.}
    if [ ${file##*/} != 'rename2font.sh' ] && { [ $fileext = 'ttf' ] || [ $fileext = 'woff' ]; }; then
        fontname=$(fc-query "$file" | grep -Po 'fullname: "\K[\w- ]*')
        mv $file "$fontname."$fileext
    fi
done