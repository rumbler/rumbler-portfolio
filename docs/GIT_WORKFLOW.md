# 🔄 Git Workflow

This document describes the Git practices adopted in this project, following GitLab Flow methodology with environment-based branches and version management.

## 🌳 Main Branches

### `main`

- 🚫 Release branch
- Always stable and ready for release
- Protected branch rules:
  - No direct pushes allowed
  - Requires pull request before merging
  - Requires minimum 1 approval
  - Must be up to date before merging
  - Status checks must pass before merging
  - Branch cannot be deleted
  - Linear history required (no merge commits)
- Receives merges only from `development` via Pull Request
- Base for production version tags
- Base for release environment
- After validation in release, promotes to production

### `development`

- 🌱 Development branch
- Integration environment for features
- Protected branch rules:
  - No direct pushes allowed
  - Requires pull request before merging
  - Requires minimum 1 approval
  - Must be up to date before merging
  - Status checks must pass before merging
  - Branch cannot be deleted
  - Linear history required (no merge commits)
- Receives feature branch merges
- Base for new features
- Base for development environment

## 📝 Temporary Branches

### Feature Branches

- Naming: `feat/feature-name`
- Created from `development`
- Example: `feat/add-contact-section`
- Merged via PR to `development`

### Fix Branches

- Naming: `fix/fix-description`
- Production bugs:
  - Created from `main`
  - Merged to both `main` AND `development`
  - Triggers PATCH version (0.4.0 -> 0.4.1)
- Development bugs:
  - Created from `development`
  - Merged only to `development`

### Documentation Branches

- Naming: `docs/description`
- Created from current project branch
- Example: `docs/api-documentation`

## 🏷️ Versioning

### Version Management

- Managed through `version-bump.sh` script
- Development branch:
  - Run before merging to main: `pnpm version:patch` (or minor/major)
  - Updates VERSION, CHANGELOG.md, and package.json
  - Creates version commit automatically
- Main branch:
  - Run after merge approval: `pnpm version:patch` (or minor/major)
  - Creates and pushes version tag automatically
  - Format: `vX.Y.Z`

### Semantic Versioning

- Follows Semantic Versioning:
  - MAJOR (X): incompatible changes
  - MINOR (Y): new backwards-compatible features
  - PATCH (Z): backwards-compatible bug fixes
- Example: `v1.2.0`, `v1.2.1`
- Automatic deployment to production

## 📝 Commit Types

- `feat`: ✨ new feature
- `fix`: 🐛 bug fix
- `docs`: 📚 documentation
- `style`: 💎 formatting, semicolons, etc
- `refactor`: ♻️ code refactoring
- `test`: 🧪 tests
- `chore`: 🔧 build, dependencies, etc

## 🔄 Workflow

1. **Feature Development**
   - Create branch `feat/name` from `development`
   - Develop and commit changes
   - Open PR to `development`
   - Merge after approval and CI checks
   - Automatic deployment to development environment for testing

2. **Release Process**
   - In development branch:
     - Run `pnpm version:patch` (or minor/major)
     - Push version changes
   - Open PR from `development` to `main`
   - After approval and CI checks:
     - Switch to main branch
     - Run `pnpm version:patch` (or minor/major)
     - Tag is created and pushed automatically
     - CI deploys to release environment
     - After validation in release, promotes to production

3. **Production Issues**
   - For urgent fixes:
     - Create `fix/name` from `main`
     - Fix the issue
     - Run `pnpm version:patch` in main
     - Deploy to release for validation
     - After validation, promote to production
     - Merge back to both `main` AND `development`
   - For non-urgent fixes:
     - Create `fix/name` from `development`
     - Fix the issue
     - Follow normal release process

## ✅ Best Practices

- Keep commits small and focused
- Write meaningful commit messages
- Update documentation when needed
- Always create PR for changes
- Perform thorough code reviews
- Test in development before release
- Validate in release before production
- Use version bump script for releases
- Keep branches synchronized
