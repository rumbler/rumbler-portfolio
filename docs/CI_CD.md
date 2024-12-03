# CI/CD Workflows

This document describes the CI/CD workflows for the Rumbler Portfolio project, following GitHub Flow.

## Overview

The project follows GitHub Flow with four environments in a logical progression:

- Development - For testing during development (commit hash)
- Staging - Development branch, for validation (commit hash)
- Release - Main branch, for pre-release (RC tag, e.g., v1.2.0-rc.1)
- Production - Only stable version tags (e.g., v1.2.0)

## Branch Protection Rules

### Main Branch

- Protected from direct pushes
- Requires pull request with approved reviews
- Must pass CI checks before merging
- Automatically generates RC tags on merge

### Development Branch

- Base branch for feature development
- Requires CI checks to pass
- Recommended code review for pull requests

## Workflows

### Continuous Integration (CI)

The CI workflow runs on:

- All pushes to `development`
- All pull requests to `main` and `development`
- All version tags (`v*`)
- All merges to `main` (via pull request)

CI Steps:

1. Application build and test
2. Artifact upload to Nexus (except for PRs)
3. Version generation:

- For production tags: uses the tag itself (e.g., v1.2.0)
- For main branch: generates automatic RC tag (e.g., v1.2.0-rc.1)
- For development: uses short commit hash

### Continuous Deployment (CD)

#### Development Environment

- Trigger: Push to `development` branch
- Docker Tag: `development`
- Purpose: Testing during development
- Version: Commit hash

#### Staging Environment

- Trigger: Push to `development` branch after CI
- Docker Tag: `staging`
- Purpose: Feature validation before merging to main
- Version: Commit hash

#### Release Environment (Pre-Production)

- Trigger: Merge to `main` branch (via pull request)
- Docker Tag: `release`
- Purpose: Final validation before release
- Protection: Deploy only from `main` branch via PR merges
- Version: Automatic RC tag (e.g., v1.2.0-rc.1)

#### Production Environment

- Trigger: Manual version tag creation (v*)
- Docker Tag: tag version (e.g., v1.2.0)
- Purpose: Production environment
- Protection: Deploy only from manually created stable version tags
- Version: Stable tag (e.g., v1.2.0)

## GitHub Flow Process

1. Development:

- Create feature branch from `development`
- Work on changes in feature branch
- Open PR to `development` when ready
- After review and approval, merge to `development`
- Automatic deploy to staging with commit hash

1. Release:

- Create PR from `development` to `main` when features are ready
- Review and testing required
- After approval and merge:
- CI automatically creates RC tag
- Deploys to release environment with RC tag

1. Production:

- Test thoroughly in release environment
  - If approved:
    - Manually create stable version tag (v*)
    - Automatic deploy to production with stable tag
  - If issues found:
    - Fix in development and repeat process

## Versioning

We follow Semantic Versioning (SemVer):

- **Stable Version**: v1.2.3
  - MAJOR (1): Incompatible changes
  - MINOR (2): New compatible features
  - PATCH (3): Bug fixes

- **Release Candidate**: v1.2.3-rc.1
  - Automatically generated after merge to main
  - Number increments with each new merge
