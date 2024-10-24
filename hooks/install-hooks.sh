#!/bin/bash

echo "Installing Git hooks..."

# Copy all scripts from the hooks directory to .git/hooks
cp hooks/* .git/hooks/
chmod +x .git/hooks/*  # Make hooks executable

echo "Git hooks installed successfully."
