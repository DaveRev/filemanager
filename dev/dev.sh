#! /bin/bash

SELF=$0
BUILD_PATH=`dirname $SELF`
cd $BUILD_PATH
cd ../
rm assets
ln -s dev assets
