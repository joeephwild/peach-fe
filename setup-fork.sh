#!/bin/bash

# Setup script for linking to fork repository
echo "Setting up fork repository connection..."

# Check if fork remote exists
if git remote get-url fork >/dev/null 2>&1; then
    echo "Fork remote already exists"
else
    echo "Adding fork remote..."
    git remote add fork https://github.com/tribecajack/peach-ui.git
fi

echo ""
echo "Next steps:"
echo "1. Create the repository 'peach-ui' at https://github.com/tribecajack"
echo "2. Run: ./push-to-fork.sh"
echo ""
echo "Note: You may need to authenticate with GitHub when pushing for the first time." 