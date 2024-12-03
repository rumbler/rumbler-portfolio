#!/bin/bash

# Exit on error
set -e

# Check if help is requested
if [ "$1" = "--help" ] || [ "$1" = "-h" ] || [ "$2" = "--help" ] || [ "$2" = "-h" ]; then
    echo "Usage: $0 [patch|minor|major] [--dry-run]"
    echo "Options:"
    echo "  --dry-run    Simulate the version bump without making changes"
    echo "  --help, -h   Show this help message"
    exit 0
fi

# Check if version type is provided
if [ $# -lt 1 ]; then
    echo "Usage: $0 [patch|minor|major] [--dry-run]"
    exit 1
fi

VERSION_TYPE=$1
DRY_RUN=false

# Check for dry-run flag
if [ "$2" = "--dry-run" ]; then
    DRY_RUN=true
    echo "=== DRY RUN MODE - No changes will be made ==="
fi

# Validate version type
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
    echo "Error: Version type must be patch, minor, or major"
    exit 1
fi

# Function to execute or simulate command
execute_cmd() {
    if [ "$DRY_RUN" = true ]; then
        echo "Would execute: $*"
    else
        eval "$*"
    fi
}

# Check current branch and ensure we're on main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "Error: Must be on main branch to create production tag"
    exit 1
fi

# Sync with remote
echo "Fetching latest changes..."
execute_cmd "git fetch --tags"

# Get current version and calculate new version
CURRENT_VERSION=$(pnpm pkg get version | tr -d '"')

case $VERSION_TYPE in
    patch)
        NEW_VERSION=$(echo "$CURRENT_VERSION" | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')
        ;;
    minor)
        NEW_VERSION=$(echo "$CURRENT_VERSION" | awk -F. '{$(NF-1) = $(NF-1) + 1; $NF = 0;} 1' | sed 's/ /./g')
        ;;
    major)
        NEW_VERSION=$(echo "$CURRENT_VERSION" | awk -F. '{$1 = $1 + 1; $(NF-1) = 0; $NF = 0;} 1' | sed 's/ /./g')
        ;;
esac

# Get latest RC tag for this version
LATEST_RC=$(git tag -l "v${CURRENT_VERSION}-rc.*" | sort -V | tail -n1)

if [ -z "$LATEST_RC" ]; then
    echo "Error: No RC tag found for version ${CURRENT_VERSION}"
    exit 1
fi

echo "
=== Version Tag Creation ===
Current version: $CURRENT_VERSION
New version: $NEW_VERSION
Based on RC: $LATEST_RC

This will:
1. Create tag v$NEW_VERSION from $LATEST_RC
2. Push tag to remote
3. CI will automatically deploy to production
"

if [ "$DRY_RUN" = true ]; then
    echo "=== DRY RUN COMPLETE ==="
    echo "No changes were made. Run without --dry-run to apply changes."
    exit 0
fi

# Ask for confirmation
printf "\nAre you sure you want to proceed? [y/N] "
read -r response
if [[ ! "$response" =~ ^[Yy]$ ]]; then
    echo "Operation cancelled"
    exit 1
fi

# Create and push tag
echo "Creating production tag v$NEW_VERSION from $LATEST_RC..."
execute_cmd "git tag -a v$NEW_VERSION $LATEST_RC -m \"Release v$NEW_VERSION\""
execute_cmd "git push origin v$NEW_VERSION"

echo "
=== Version Tag Created ===
✅ Tag v$NEW_VERSION created and pushed
🚀 CI will now deploy to production

Monitor the deployment at:
https://github.com/rumbler/rumbler-portfolio/actions"
