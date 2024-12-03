#!/bin/bash

# Exit on error
set -e

# Check if help is requested (before any git operations)
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

# Function to sync all branches
sync_all() {
    if [ "$DRY_RUN" = true ]; then
        echo "Would synchronize branches..."
        return
    fi
    echo "Fetching all changes..."
    execute_cmd "git fetch --all"
}

# Check current branch and switch to development if needed
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "development" ]; then
    if [ "$DRY_RUN" = true ]; then
        echo "Not on development branch. Currently on: $CURRENT_BRANCH"
        echo "Would switch to development branch and stash changes"
    else
        echo "Not on development branch. Currently on: $CURRENT_BRANCH"
        echo "Stashing changes and switching to development..."
        execute_cmd "git stash -u"
        execute_cmd "git checkout development"
        echo "Successfully switched to development branch"
    fi
fi

# Sync everything before starting
sync_all

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ] && [ "$DRY_RUN" = false ]; then
    echo "Error: Working directory is not clean. Commit or stash changes first."
    exit 1
fi

# Get current version before bump
CURRENT_VERSION=$(pnpm pkg get version | tr -d '"')

# Get commit messages since last tag
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
if [ -n "$LAST_TAG" ]; then
    COMMITS=$(git log $LAST_TAG..HEAD --pretty=format:"- %s" | grep -vE "^- Merge |^- chore\(release\)")
else
    COMMITS=$(git log --pretty=format:"- %s" | grep -vE "^- Merge |^- chore\(release\)")
fi

# Categorize commits
FEATURES=$(echo "$COMMITS" | grep "^- feat:" || true)
FIXES=$(echo "$COMMITS" | grep "^- fix:" || true)
DOCS=$(echo "$COMMITS" | grep "^- docs:" || true)
OTHERS=$(echo "$COMMITS" | grep -vE "^- (feat|fix|docs):" || true)

# Calculate new version
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

# Create version bump branch
if [ "$DRY_RUN" = false ]; then
    BUMP_BRANCH="version/bump-to-$NEW_VERSION"
    execute_cmd "git checkout -b $BUMP_BRANCH"
fi

# Update version in package.json
if [ "$DRY_RUN" = false ]; then
    execute_cmd "pnpm version $NEW_VERSION --no-git-tag-version"
fi

# Generate changelog content
CHANGELOG_CONTENT="## [${NEW_VERSION}] - $(date +%Y-%m-%d)\n\n"

if [ -n "$FEATURES" ]; then
    CHANGELOG_CONTENT="${CHANGELOG_CONTENT}### Features\n\n${FEATURES}\n\n"
fi

if [ -n "$FIXES" ]; then
    CHANGELOG_CONTENT="${CHANGELOG_CONTENT}### Bug Fixes\n\n${FIXES}\n\n"
fi

if [ -n "$DOCS" ]; then
    CHANGELOG_CONTENT="${CHANGELOG_CONTENT}### Documentation\n\n${DOCS}\n\n"
fi

if [ -n "$OTHERS" ]; then
    CHANGELOG_CONTENT="${CHANGELOG_CONTENT}### Other Changes\n\n${OTHERS}\n\n"
fi

# Update CHANGELOG.md
if [ "$DRY_RUN" = false ]; then
    if [ -f CHANGELOG.md ]; then
        # Preserve existing content
        EXISTING_CONTENT=$(cat CHANGELOG.md)
        echo -e "# Changelog\n\n${CHANGELOG_CONTENT}${EXISTING_CONTENT#\# Changelog}" > CHANGELOG.md
    else
        echo -e "# Changelog\n\n${CHANGELOG_CONTENT}" > CHANGELOG.md
    fi
fi

# Commit changes
if [ "$DRY_RUN" = false ]; then
    execute_cmd "git add package.json CHANGELOG.md"
    execute_cmd "git commit -m \"bump version ($NEW_VERSION)\""
    execute_cmd "git push origin $BUMP_BRANCH"
    
    echo "✨ Branch $BUMP_BRANCH created successfully!"
    echo "🔍 Create a Pull Request to main branch to continue the release process"
else
    echo "Changes that would be made:"
    echo "- Update version to $NEW_VERSION"
    echo "- Update CHANGELOG.md"
    echo "- Create and push branch $BUMP_BRANCH"
fi
