# 🔄 Git Workflow

This document describes the Git practices adopted in this project.

## 🌳 Main Branches

### `main`

- 🚫 Production branch
- Always stable and ready for deployment
- Protected: no direct commits allowed
- Receives merges only from `development` branch
- Where version tags are created

### `development`

- 🌱 Development branch
- Integration environment
- Receives feature branch merges
- Testing environment
- Base for new features

## 📝 Temporary Branches

### Feature Branches

- Naming: `feat/feature-name`
- Created from `development`
- Example: `feat/add-contact-section`
- Merged back to `development`

### Fix Branches

- Naming: `fix/fix-description`
- Production bugs:
  - Created from `main`
  - Merged to both `main` AND `development`
  - Triggers PATCH version bump (0.4.0 -> 0.4.1)
- Development bugs:
  - Created from `development`
  - Merged only to `development`

### Documentation Branches

- Naming: `docs/description`
- Created from current project branch
- Example: `docs/api-documentation`

## 📝 Commit Types

- `feat`: ✨ new feature
- `fix`: 🐛 bug fix
- `docs`: 📚 documentation changes
- `style`: 💅 formatting, semicolons, etc; no code change
- `refactor`: ♻️ code refactoring
- `test`: ✅ adding or updating tests
- `chore`: 🔧 build updates, package updates, etc

## 🔄 Workflow

1. Create new branch from appropriate base:

```bash
git checkout development
git checkout -b feat/new-feature
```

1. Develop and commit changes:

```bash
git add .
git commit -m "feat: add new feature"
```

1. Keep branch updated:

```bash
git checkout development
git pull
git checkout feat/new-feature
git merge development --no-ff
```

> 💡 We use `--no-ff` to preserve branch history and maintain change context by preventing fast-forward merges.

1. Push and Pull Request:

```bash
git push origin feat/new-feature
# Create PR on GitHub: feat/new-feature -> development
```

1. After approval and merge, clean up:

```bash
git checkout development
git pull
git branch -d feat/new-feature
git push origin --delete feat/new-feature
```

## 🏷️ Versioning

We follow Semantic Versioning (MAJOR.MINOR.PATCH):

- MAJOR (0.4.0 -> 1.0.0): incompatible API changes
- MINOR (0.4.0 -> 0.5.0): backwards-compatible features
- PATCH (0.4.0 -> 0.4.1): backwards-compatible bug fixes

## 🔢 Version Management

### Version Bump Process

We use semantic versioning (MAJOR.MINOR.PATCH) and manage versions through an automated process using pnpm scripts.

#### Prerequisites
- Ensure you have `pnpm` installed
- Have `git` configured
- All changes must be merged to `main` first
- CI/CD pipeline must be passing

#### Running Version Bump

Use one of the following pnpm commands based on the type of change:

```bash
# For bug fixes and small improvements (0.4.2 -> 0.4.3)
pnpm version:patch

# For new features (0.4.2 -> 0.5.0)
pnpm version:minor

# For breaking changes (0.4.2 -> 1.0.0)
pnpm version:major
```

#### Testing Version Bump (Dry Run)

To simulate a version bump without making any changes, use the dry-run commands:

```bash
# Simulate patch version bump
pnpm version:patch:dry

# Simulate minor version bump
pnpm version:minor:dry

# Simulate major version bump
pnpm version:major:dry
```

The dry run will:
- Show all proposed changes
- Calculate the new version
- Display the CHANGELOG entry
- List all git operations
- Not make any actual changes

#### When to Use Each Version Type

- **PATCH** (0.0.x): 
  - Bug fixes
  - Small improvements
  - Documentation updates
  - No breaking changes

- **MINOR** (0.x.0):
  - New features
  - Substantial improvements
  - Deprecation notices
  - No breaking changes

- **MAJOR** (x.0.0):
  - Breaking changes
  - Major redesigns
  - Incompatible API changes

#### Version Bump Best Practices

- Always run version bumps from `main` branch (script handles this automatically)
- Ensure all changes are properly documented
- Review generated CHANGELOG entries
- Verify CI/CD pipeline after version bump
- Use meaningful commit messages following conventional commits:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation
  - `chore:` for maintenance

> 💡 Tip: The automated script helps maintain consistency, but always review the generated changes before confirming.

## 🏷️ Version Control

1. Merge `development` to `main`:

```bash
git checkout main
git merge development --no-ff
```

> 💡 We use `--no-ff` to preserve branch history and maintain change context by preventing fast-forward merges.

1. Version bump and tag:

```bash
pnpm version:patch
```

## 🎯 Branch Naming

- Feature: `feat/feature-name`
- Bug Fix: `fix/bug-name`
- Documentation: `docs/what-changed`
- Refactor: `refactor/what-changed`

## ⚡ Quick Tips

- Always pull before starting new work
- Keep commits atomic and focused
- Write meaningful commit messages
- Update documentation when needed

## 📝 Best Practices

1. Never commit directly to `main` or `development`
2. Keep branches updated with their bases
3. Create small, focused pull requests
4. Review code before merging
5. Delete branches after merging
6. Write clear, descriptive commit messages
7. Squash commits when appropriate

## 📝 Initial Setup

For new developers:

```bash
git clone [repository-url]
git checkout development
```

## 🤖 CI/CD

- Pull Requests to `development`: run tests and lint
- Merge to `main`: automatic production deployment
- Tags: generate GitHub releases
