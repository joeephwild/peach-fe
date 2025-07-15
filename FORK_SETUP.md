# Fork Repository Setup

This repository is linked to a fork at https://github.com/tribecajack/peach-ui

## Setup Instructions

1. **Create the fork repository**:

   - Go to https://github.com/tribecajack
   - Create a new repository named "peach-ui"
   - Make it public or private as needed

2. **Push to the fork**:
   ```bash
   ./push-to-fork.sh
   ```

## Automation

- **Automatic push script**: `./push-to-fork.sh` - Pushes to both origin and fork
- **Git hook**: Automatically pushes to fork after pushing to origin
- **Setup script**: `./setup-fork.sh` - Helps with initial setup

## Remotes

- `origin`: https://github.com/blockworks-foundation/mango-v4-ui.git
- `fork`: https://github.com/tribecajack/peach-ui.git

## Authentication

You may need to authenticate with GitHub when pushing for the first time. You can use:

- Personal Access Token
- SSH keys
- GitHub CLI

## Workflow

All changes made to this repository will be automatically reflected in the fork when you push using the provided scripts.
