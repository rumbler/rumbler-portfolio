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
    echo -e "${CYAN}Usage: $0 [patch|minor|major] [--dry-run]${NC}"
    echo -e "${YELLOW}Options:${NC}"
    echo "  --dry-run    Simulate the version bump without making changes"
    echo "  --help, -h   Show this help message"
    echo ""
    echo -e "${BLUE}When run from development branch:${NC}"
    echo "  - Updates VERSION, CHANGELOG.md"
    echo -e "${BLUE}When run from main branch:${NC}"
    echo "  - Creates and pushes a new version tag"
    exit 0
fi

# Check if version type is provided
if [ $# -lt 1 ]; then
    echo -e "${RED}Usage: $0 [patch|minor|major] [--dry-run]${NC}"
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
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
    echo -e "${RED}Error: Version type must be patch, minor, or major${NC}"
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

# Generate changelog entry
generate_changelog() {
    echo -e "${CYAN}## [$1] - $(date +%Y-%m-%d)

### Added
- [Feature] Add your new features here
- [Enhancement] List your enhancements

### Changed
- [Update] List your updates here
- [Refactor] List your refactors

### Fixed
- [Fix] List your bug fixes here
- [Security] List your security fixes${NC}
"
}

# Function to prepare version in development
prepare_version() {
    if [ "$DRY_RUN" = true ]; then
        echo -e "${YELLOW}$BOX_TOP"
        center_text "DEVELOPMENT BRANCH PREVIEW"
        echo -e "$BOX_BOTTOM${NC}"
    else
        echo -e "${GREEN}$BOX_TOP"
        center_text "PREPARING NEW VERSION"
        echo -e "$BOX_BOTTOM${NC}"
    fi

    echo -e "
${BOLD}Current State:${NC}
   → Branch: ${CYAN}development${NC}
   → Current Version: ${YELLOW}$CURRENT_VERSION${NC}
   → Target Version: ${GREEN}$NEW_VERSION${NC}

${BOLD}The following changes will be made:${NC}
"
    echo -e "${BOLD}1. Version Files${NC}"
    echo -e "   → Updating VERSION and package.json to ${GREEN}$NEW_VERSION${NC}"
    execute_cmd "echo \"$NEW_VERSION\" > VERSION"
    execute_cmd "pnpm pkg set version=$NEW_VERSION"
    
    echo -e "
${BOLD}2. CHANGELOG.md${NC}"
    if [ "$DRY_RUN" = true ]; then
        echo -e "   → Would add new entry to CHANGELOG.md:
${YELLOW}$BOX_DIVIDER${NC}"
        generate_changelog "$NEW_VERSION"
        echo -e "${YELLOW}$BOX_DIVIDER${NC}"
    else
        generate_changelog "$NEW_VERSION" >> CHANGELOG.md
        echo -e "${GREEN}   → Added new entry for version $NEW_VERSION${NC}"
    fi

    echo -e "
${BOLD}3. Git Changes${NC}"
    execute_cmd "git add VERSION package.json CHANGELOG.md"
    execute_cmd "git commit -m \"chore: bump version $NEW_VERSION\""
    
    if [ "$DRY_RUN" = true ]; then
        echo -e "
${YELLOW}$BOX_TOP"
        center_text "DRY RUN COMPLETED"
        center_text "No actual changes have been made"
        echo -e "$BOX_BOTTOM${NC}"
    else
        echo -e "
${GREEN}$BOX_TOP"
        center_text "VERSION PREPARED"
        center_text "All changes have been committed"
        echo -e "$BOX_BOTTOM${NC}"
    fi
}

# Function to create tag in main
create_tag() {
    local CURRENT_VERSION=$(cat VERSION)
    
    echo -e "
${BOLD}Current State:${NC}
   → Branch: ${CYAN}main${NC}
   → Version to Tag: ${GREEN}$CURRENT_VERSION${NC}

${BOLD}The following actions will be taken:${NC}"

    echo -e "${BOLD}1. Create and Push Tag${NC}"
    execute_cmd "git tag -a v$CURRENT_VERSION -m \"Release version $CURRENT_VERSION\""
    execute_cmd "git push origin v$CURRENT_VERSION"
    
    if [ "$DRY_RUN" = true ]; then
        echo -e "
${YELLOW}$BOX_TOP"
        center_text "DRY RUN SUMMARY - MAIN BRANCH"
        echo -e "$BOX_DIVIDER"
        center_text "The following would have been done:"
        center_text "→ Created tag v$CURRENT_VERSION"
        center_text "→ Pushed tag to origin"
        echo -e "$BOX_BOTTOM${NC}"
    else
        echo -e "
${GREEN}$BOX_TOP"
        center_text "TAG CREATED AND PUSHED"
        center_text "v$CURRENT_VERSION"
        echo -e "$BOX_BOTTOM${NC}"
    fi
}

# Main execution
CURRENT_BRANCH=$(git branch --show-current)

# Sync with remote
echo -e "${CYAN}Syncing with remote...${NC}"
execute_cmd "git fetch --tags"

# Get versions
get_versions

# In dry-run mode, show what would happen in both branches
if [ "$DRY_RUN" = true ]; then
    echo -e "
${BOLD}Current branch:${NC} ${CYAN}$CURRENT_BRANCH${NC}
"
    prepare_version
    echo ""
    create_tag
    exit 0
fi

# For actual execution, check branch
case $CURRENT_BRANCH in
    development)
        prepare_version
        ;;
    main)
        create_tag
        ;;
    *)
        echo -e "${RED}Error: Must be on development branch to prepare version or main branch to create tag${NC}"
        exit 1
        ;;
esac
