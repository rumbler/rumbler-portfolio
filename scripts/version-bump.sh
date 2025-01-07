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

# Function to apply colors conditionally
apply_color() {
    local is_dry_run=$1
    local color_code=$2
    local text=$3

    if [ "$is_dry_run" = true ]; then
        echo -e "${color_code}${text}${NC}"
    else
        echo "$text"
    fi
}

# Generate changelog entry
generate_changelog() {
    local version=$1
    local last_version_commit=$2  # Novo parâmetro para especificar o commit de referência
    local is_dry_run=$3  # Novo parâmetro para indicar se é dry-run

    # Definir códigos de cor
    local GREEN='\033[0;32m'
    local YELLOW='\033[1;33m'
    local BLUE='\033[0;34m'
    local MAGENTA='\033[0;35m'
    local CYAN='\033[0;36m'
    local NC='\033[0m'

    # Se nenhum commit de referência for fornecido, use o último tag
    if [ -z "$last_version_commit" ]; then
        last_version_commit=$(git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)
    fi

    # Array de tipos de commits para capturar
    local commit_types=(
        "feat:Added"
        "fix:Fixed"
        "docs:Documentation"
        "style:Style Changes"
        "refactor:Refactoring"
        "perf:Performance Improvements"
        "test:Test Changes"
        "build:Build System"
        "ci:CI Changes"
        "chore:Chores"
        "revert:Reverts"
    )

    # Limpar variáveis de saída
    local changelog_sections=()
    local all_commits=()

    # Iterar sobre os tipos de commits
    for type_mapping in "${commit_types[@]}"; do
        IFS=':' read -r commit_prefix section_name <<< "$type_mapping"
        
        # Buscar commits deste tipo
        local commits=$(git log "$last_version_commit"..HEAD --pretty=format:"%s" | grep "^$commit_prefix" || true)
        
        # Se houver commits, adicionar à seção
        if [ ! -z "$commits" ]; then
            local section_title
            case "$section_name" in
                "Added") section_title=$(apply_color "$is_dry_run" "$GREEN" "### $section_name") ;;
                "Fixed") section_title=$(apply_color "$is_dry_run" "$YELLOW" "### $section_name") ;;
                "Documentation") section_title=$(apply_color "$is_dry_run" "$BLUE" "### $section_name") ;;
                "Refactoring") section_title=$(apply_color "$is_dry_run" "$MAGENTA" "### $section_name") ;;
                *) section_title=$(apply_color "$is_dry_run" "$CYAN" "### $section_name") ;;
            esac

            local section="${section_title}\n"
            while IFS= read -r commit; do
                section+="- $commit\n"
                all_commits+=("$commit")
            done <<< "$commits"
            section+="\n"
            changelog_sections+=("$section")
        fi
    done

    # Buscar outros commits que não se encaixam nos tipos acima
    local other_commits=$(git log "$last_version_commit"..HEAD --pretty=format:"%s" | grep -vE "^($(IFS='|'; echo "${commit_types[@]/%:*/}"))" || true)
    if [ ! -z "$other_commits" ]; then
        while IFS= read -r commit; do
            all_commits+=("$commit")
        done <<< "$other_commits"
    fi

    # Gerar changelog final
    echo ""  # Add blank line before version header
    apply_color "$is_dry_run" "$YELLOW" "## [$version] - $(date +%Y-%m-%d)"
    echo ""

    # Imprimir seções
    for section in "${changelog_sections[@]}"; do
        echo -e "$section"
    done
}

# Function to prepare version in development
prepare_version() {
    get_versions
    
    echo -e "${YELLOW}$BOX_TOP"
    center_text "Preparing Version $NEW_VERSION"
    echo -e "$BOX_BOTTOM${NC}"
    echo ""  # Adiciona espaço entre as tabelas
    echo -e "${CYAN}$BOX_TOP"
    center_text "Current Version: $CURRENT_VERSION"
    center_text "New Version: $NEW_VERSION"
    echo -e "$BOX_BOTTOM${NC}"

    # Encontrar o commit do último bump de versão
    LAST_VERSION_COMMIT=$(git log --grep="^chore: bump version" -n 1 --pretty=format:"%H")

    if [ "$DRY_RUN" = true ]; then
        echo -e "${YELLOW}Dry Run Changelog:${NC}"
        generate_changelog "$NEW_VERSION" "$LAST_VERSION_COMMIT" true
    else
        # Update VERSION file and package.json
        execute_cmd "echo $NEW_VERSION > VERSION"
        execute_cmd "pnpm version $NEW_VERSION --no-git-tag-version"
        
        # Update changelog with new entry at the beginning, passando o commit de referência
        execute_cmd "printf '%s\n\n%s' \"\$(generate_changelog \"$NEW_VERSION\" \"$LAST_VERSION_COMMIT\")\" \"\$(cat CHANGELOG.md)\" > CHANGELOG.md"
        
        # Stage changes
        execute_cmd "git add VERSION package.json CHANGELOG.md"
        execute_cmd "git commit -m 'chore: bump version $NEW_VERSION'"
        
        echo -e "${GREEN}Version bump prepared successfully!${NC}"
        echo -e "${YELLOW}Review the changes and push manually when ready.${NC}"
    fi
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
        echo -e "${YELLOW}Would execute:${NC} git push --follow-tags origin main"
        
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
        execute_cmd "git push --follow-tags origin main"
        
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
    if [ "$DRY_RUN" = false ] && [ "$CURRENT_BRANCH" != "main" ]; then
        echo -e "${RED}Error: Tags can only be created from the main branch${NC}"
        exit 1
    fi
    create_tag
else
    if [ "$DRY_RUN" = false ] && [ "$CURRENT_BRANCH" != "development" ]; then
        echo -e "${RED}Error: Version bumps can only be done from the development branch${NC}"
        exit 1
    fi
    prepare_version
fi
