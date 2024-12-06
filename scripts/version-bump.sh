#!/bin/bash

# Exit on error
set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Constants for box drawing
BOX_TOP="╔═══════════════════════════════════════════╗"
BOX_BOTTOM="╚═══════════════════════════════════════════╝"
BOX_DIVIDER="╠═══════════════════════════════════════════╣"
BOX_EMPTY="║                                           ║"

# Function to center text in box
center_text() {
    local text="$1"
    local width=43  # Width of our box
    local padding=$(( (width - ${#text}) / 2 ))
    printf "║%*s%s%*s║\n" $padding "" "$text" $(( width - padding - ${#text} )) ""
}

# Check if help is requested
if [ "$1" = "--help" ] || [ "$1" = "-h" ] || [ "$2" = "--help" ] || [ "$2" = "-h" ]; then
    echo -e "${CYAN}Usage: $0 [patch|minor|major|tag] [--dry-run]${NC}"
    echo -e "${YELLOW}Options:${NC}"
    echo "  --dry-run    Simulate the version bump without making changes"
    echo "  --help, -h   Show this help message"
    echo ""
    echo -e "${BLUE}Commands:${NC}"
    echo "  patch, minor, major   Updates VERSION, CHANGELOG.md when in development branch"
    echo "  tag                   Creates and pushes a new version tag when in main branch"
    exit 0
fi

# Check if version type is provided
if [ $# -lt 1 ]; then
    echo -e "${RED}Usage: $0 [patch|minor|major|tag] [--dry-run]${NC}"
    exit 1
fi

VERSION_TYPE=$1
DRY_RUN=false

# Check for dry-run flag
if [ "$2" = "--dry-run" ]; then
    DRY_RUN=true
    echo -e "${YELLOW}$BOX_TOP"
    center_text "DRY RUN MODE ACTIVE"
    center_text "No changes will be made to files"
    echo -e "$BOX_BOTTOM${NC}"
fi

# Validate version type
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major|tag)$ ]]; then
    echo -e "${RED}Error: Version type must be patch, minor, major, or tag${NC}"
    exit 1
fi

# Function to execute or simulate command
execute_cmd() {
    if [ "$DRY_RUN" = true ]; then
        echo -e "${CYAN}   → Would execute:${NC} $*"
    else
        echo -e "${GREEN}   → Executing:${NC} $*"
        eval "$*"
    fi
}

# Get current version and calculate new version
get_versions() {
    CURRENT_VERSION=$(cat VERSION)
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
}

# Get commits since last version
get_commits_by_type() {
    local commit_type=$1
    local pattern=$2
    git log --pretty=format:"%s" $(git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD | grep "^$pattern" || true
}

# Generate changelog entry
generate_changelog() {
    local version=$1
    local features=$(get_commits_by_type "feat" "feat:")
    local fixes=$(get_commits_by_type "fix" "fix:")
    local docs=$(get_commits_by_type "docs" "docs:")
    local others=$(git log --pretty=format:"%s" $(git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD | grep -vE "^(feat:|fix:|docs:)" || true)

    # Only include sections that have commits
    echo "## [$version] - $(date +%Y-%m-%d)"
    echo

    if [ ! -z "$features" ]; then
        echo "### Added"
        echo "$features" | while read -r line; do
            echo "- $line"
        done
        echo
    fi

    if [ ! -z "$fixes" ]; then
        echo "### Fixed"
        echo "$fixes" | while read -r line; do
            echo "- $line"
        done
        echo
    fi

    if [ ! -z "$docs" ]; then
        echo "### Documentation"
        echo "$docs" | while read -r line; do
            echo "- $line"
        done
        echo
    fi

    if [ ! -z "$others" ]; then
        echo "### Other Changes"
        echo "$others" | while read -r line; do
            echo "- $line"
        done
        echo
    fi
}

# Function to prepare version in development
prepare_version() {
    get_versions
    
    echo -e "$BOX_TOP"
    center_text "Preparing Version $NEW_VERSION"
    echo "$BOX_DIVIDER"
    center_text "Current Version: $CURRENT_VERSION"
    center_text "New Version: $NEW_VERSION"
    echo "$BOX_BOTTOM"

    # Update VERSION file
    execute_cmd "echo $NEW_VERSION > VERSION"
    
    # Update changelog with new entry at the beginning
    execute_cmd "printf '%s\n%s' \"\$(generate_changelog \"$NEW_VERSION\")\" \"\$(cat CHANGELOG.md)\" > CHANGELOG.md"
    
    # Stage changes
    execute_cmd "git add VERSION CHANGELOG.md"
    execute_cmd "git commit -m 'chore: bump version $NEW_VERSION'"
    
    echo -e "${GREEN}Version bump prepared successfully!${NC}"
    echo -e "${YELLOW}Review the changes and push manually when ready.${NC}"
}

# Function to create tag in main
create_tag() {
    local CURRENT_VERSION=$(cat VERSION)
    
    echo -e "$BOX_TOP"
    center_text "TAG OPERATION"
    echo "$BOX_DIVIDER"
    center_text "Version: v$CURRENT_VERSION"
    echo "$BOX_BOTTOM

${BOLD}The following actions will be taken:${NC}"

    echo -e "${BOLD}1. Create and Push Tag${NC}"
    if [ "$DRY_RUN" = true ]; then
        echo -e "${YELLOW}Would execute:${NC} git tag -a v$CURRENT_VERSION -m \"Release version $CURRENT_VERSION\""
        echo -e "${YELLOW}Would execute:${NC} git push origin v$CURRENT_VERSION"
        
        echo -e "
${YELLOW}$BOX_TOP"
        center_text "DRY RUN SUMMARY - MAIN BRANCH"
        echo "$BOX_DIVIDER"
        center_text "The following would have been done:"
        center_text "→ Create tag v$CURRENT_VERSION"
        center_text "→ Push tag to origin"
        echo -e "$BOX_BOTTOM${NC}"
    else
        execute_cmd "git tag -a v$CURRENT_VERSION -m \"Release version $CURRENT_VERSION\""
        execute_cmd "git push origin v$CURRENT_VERSION"
        
        echo -e "
${GREEN}$BOX_TOP"
        center_text "TAG CREATED AND PUSHED"
        center_text "v$CURRENT_VERSION"
        echo -e "$BOX_BOTTOM${NC}"
    fi
}

# Main execution
CURRENT_BRANCH=$(git branch --show-current)

if [ "$VERSION_TYPE" = "tag" ]; then
    if [ "$CURRENT_BRANCH" != "main" ]; then
        echo -e "${RED}Error: Tags can only be created from the main branch${NC}"
        exit 1
    fi
    create_tag
else
    if [ "$CURRENT_BRANCH" != "development" ]; then
        echo -e "${RED}Error: Version bumps can only be done from the development branch${NC}"
        exit 1
    fi
    prepare_version
fi
