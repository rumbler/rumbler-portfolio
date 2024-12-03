# 🔄 Git Workflow

This document describes the Git practices adopted in this project, following GitHub Flow.

## 🌳 Main Branches

### `main`

- 🚫 Pre-production (release) branch
- Always stable and ready for final testing
- Protected: no direct commits allowed
- Receives merges only from `development` via Pull Request
- Generates RC tags automatically after each merge
- Base for production tags creation

### `development`

- 🌱 Development and staging branch
- Integration environment
- Receives feature branch merges
- Base for new features
- Automatic deployment to staging environment

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

### RC Tags (Release Candidate)

- Generated automatically after merge to `main`
- Format: `vX.Y.Z-rc.N`
  - X.Y.Z: current or next version
  - N: incremental RC number
- Example: `v1.2.0-rc.1`, `v1.2.0-rc.2`
- Automatic deployment to release environment

### Production Tags

- Created manually after RC validation
- Format: `vX.Y.Z`
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
   - Merge after approval

2. **Release Preparation**
   - Open PR from `development` to `main`
   - After approval and merge:
     - CI generates RC tag automatically
     - Deploys to release environment

3. **Production Release**
   - Test RC version in release environment
   - If approved:
     - Create production tag manually
     - CI deploys to production
   - If issues found:
     - Fix in `development`
     - New PR to `main`
     - New RC generated

## ✅ Best Practices

- Keep commits small and focused
- Write meaningful commit messages
- Update documentation when needed
- Always create PR for `main`
- Perform thorough code reviews
- Test RCs properly before production
