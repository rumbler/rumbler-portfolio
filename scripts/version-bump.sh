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

# Check current branch and switch to main if needed
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    if [ "$DRY_RUN" = true ]; then
        echo "Not on main branch. Currently on: $CURRENT_BRANCH"
        echo "Would switch to main branch and stash changes"
    else
        echo "Not on main branch. Currently on: $CURRENT_BRANCH"
        echo "Stashing changes and switching to main..."
        execute_cmd "git stash -u"
        execute_cmd "git checkout main"
        echo "Successfully switched to main branch"
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

# Calculate new version without making changes
if [ "$DRY_RUN" = true ]; then
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
else
    # Bump version
    echo "Preparing $VERSION_TYPE version bump..."
    execute_cmd "pnpm version $VERSION_TYPE --no-git-tag-version"
    NEW_VERSION=$(pnpm pkg get version | tr -d '"')
fi

# Create CHANGELOG entry
CHANGELOG_ENTRY="## [$NEW_VERSION] - $(date +%Y-%m-%d)

### Added
${FEATURES:-"No new features"}

### Fixed
${FIXES:-"No fixes"}

### Documentation
${DOCS:-"No documentation changes"}

### Other Changes
${OTHERS:-"No other changes"}
"

# Show proposed changes
echo "
=== Proposed Changes ===
1. Version bump: $CURRENT_VERSION -> $NEW_VERSION
2. VERSION file will be updated
3. New CHANGELOG entry will be:

$CHANGELOG_ENTRY

=== Git Operations ===
1. Create commit with message: chore(release): bump version to $NEW_VERSION
2. Create tag: v$NEW_VERSION
3. Push main branch with tags
4. Switch to development
5. Sync development with remote
6. Merge main into development
7. Push development
"

if [ "$DRY_RUN" = true ]; then
    echo "=== DRY RUN COMPLETE ==="
    echo "No changes were made. Run without --dry-run to apply changes."
    exit 0
fi

# Only ask for confirmation in real run
if [ "$DRY_RUN" = false ]; then
    printf "\nAre you sure you want to proceed? [y/N] "
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Operation cancelled"
        exit 1
    fi
fi

# Add new entry to CHANGELOG.md
execute_cmd "echo \"$CHANGELOG_ENTRY\" | cat - CHANGELOG.md > temp && mv temp CHANGELOG.md"

# Update VERSION file
execute_cmd "echo \"$NEW_VERSION\" > VERSION"

# Commit changes
echo "Committing version bump..."
execute_cmd "git add package.json VERSION CHANGELOG.md"
execute_cmd "git commit -m \"chore(release): bump version to $NEW_VERSION\""

# Create tag
echo "Creating version tag..."
execute_cmd "git tag -a \"v$NEW_VERSION\" -m \"Release v$NEW_VERSION\""

# Push main with tags
echo "Pushing main branch with tags..."
execute_cmd "git push origin main --follow-tags"

# Switch to development
echo "Switching to development branch..."
execute_cmd "git checkout development"

# Sync development
echo "Synchronizing development branch..."
sync_all

echo "Merging main into development..."
execute_cmd "git merge main --no-ff -m \"chore: sync development with main after version bump to $NEW_VERSION\""

echo "Pushing development branch..."
execute_cmd "git push origin development"

echo "
=== Version Bump Complete ===
- New version: $NEW_VERSION
- Changes pushed to main
- Development synced and updated
- Current branch: development"
