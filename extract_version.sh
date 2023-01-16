#!/bin/sh
NAME=$npm_package_name
VERSION=$npm_package_version
DATE=`date +%Y-%m-%d`
REV=`git rev-parse --short HEAD`
cat << EOF > src/version.json
{"name": "${NAME}", "version": "$VERSION", "date": "$DATE", "rev": "$REV" }
EOF
