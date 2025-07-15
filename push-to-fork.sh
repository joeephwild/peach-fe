#!/bin/bash

# Script to push changes to both origin and fork
echo "Pushing to origin..."
if git push origin main; then
    echo "✓ Successfully pushed to origin"
else
    echo "✗ Failed to push to origin (this is normal if you don't have write access)"
fi

echo ""
echo "Pushing to fork..."
if git push fork main; then
    echo "✓ Successfully pushed to fork"
else
    echo "✗ Failed to push to fork"
    echo "Make sure the repository exists at https://github.com/tribecajack/peach-ui"
    echo "You may need to authenticate with GitHub"
fi

echo ""
echo "Push operation completed!" 