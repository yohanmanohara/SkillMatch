#!/bin/bash

echo "Pre-commit hook is running..."

ROOT_DIR=$(pwd)


echo "Building the client..."
if [ -d "$ROOT_DIR/client" ]; then
    BUILD_OUTPUT_CLIENT=$(cd "$ROOT_DIR/client" && npm run build)
    BUILD_STATUS_CLIENT=$?
else
    echo "Client directory not found!"
    exit 1
fi

if [ $BUILD_STATUS_CLIENT -ne 0 ]; then
    echo "Client build failed! Commit aborted."
    echo "$BUILD_OUTPUT_CLIENT"
    exit 1
else
    echo "Client built successfully."
fi

echo "Client build succeeded. Proceeding with the commit."
exit 0
