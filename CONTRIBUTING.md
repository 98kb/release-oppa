# Contributing to release-oppa

Thank you for your interest in contributing to release-oppa! This document provides guidelines and instructions for contributing to this monorepo.

## Development Setup

1. **Prerequisites**:
   - Node.js >= 18.0.0
   - pnpm >= 8.0.0

2. **Fork and clone the repository**:

   ```bash
   git clone https://github.com/YOUR_USERNAME/release-oppa.git
   cd release-oppa
   ```

3. **Install dependencies**:

   ```bash
   pnpm install
   ```

4. **Create a new branch**:
   ```bash
   git checkout -b feat/my-new-feature
   ```

## Development Workflow

### Building Packages

```bash
# Build all packages
pnpm build

# Build a specific package
cd packages/my-package
pnpm build
```

### Linting and Formatting

```bash
# Lint all code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Check code formatting
pnpm format:check

# Format code
pnpm format
```

### Type Checking

```bash
# Type-check all packages
pnpm typecheck
```

### Cleaning Build Artifacts

```bash
# Clean all build artifacts
pnpm clean
```

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. This is important for automatic version bumping and changelog generation.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature (triggers minor version bump)
- **fix**: A bug fix (triggers patch version bump)
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding or updating tests
- **chore**: Changes to build process, dependencies, or auxiliary tools

### Breaking Changes

To indicate a breaking change (triggers major version bump):

1. Add `BREAKING CHANGE:` in the commit body, or
2. Add `!` after the type: `feat!: ...`

### Examples

```bash
# Feature commit
git commit -m "feat(example): add new greeting function"

# Bug fix commit
git commit -m "fix(example): correct typo in error message"

# Breaking change
git commit -m "feat!: change API signature

BREAKING CHANGE: The greet function now requires an options object"

# Scoped commit
git commit -m "docs(readme): update installation instructions"
```

## Creating a New Package

1. **Create the package directory structure**:

   ```bash
   mkdir -p packages/my-package/src
   cd packages/my-package
   ```

2. **Create `package.json`** (see README.md for template)

3. **Create `tsconfig.json`**:

   ```json
   {
     "extends": "../../tsconfig.base.json",
     "compilerOptions": {
       "rootDir": "./src",
       "outDir": "./dist"
     },
     "include": ["src"]
   }
   ```

4. **Create `tsup.config.ts`**:

   ```typescript
   import { createTsupConfig } from '../../tsup.config';

   export default createTsupConfig();
   ```

5. **Create `.releaserc.json`** (for semantic-release):

   ```json
   {
     "extends": "../../.releaserc.json",
     "plugins": [
       "@semantic-release/commit-analyzer",
       "@semantic-release/release-notes-generator",
       [
         "@semantic-release/changelog",
         {
           "changelogFile": "CHANGELOG.md"
         }
       ],
       "@semantic-release/npm",
       [
         "@semantic-release/git",
         {
           "assets": ["package.json", "CHANGELOG.md"]
         }
       ]
     ]
   }
   ```

6. **Create your source code** in `src/index.ts`

7. **Add a README.md** for your package

8. **Build and test**:
   ```bash
   pnpm build
   pnpm lint
   pnpm typecheck
   ```

## Synchronized Versioning

All packages in this monorepo share the same major version. When making breaking changes:

1. Use the `BREAKING CHANGE` footer or `!` in commit messages
2. Semantic-release will bump the major version
3. Update all packages to maintain the same major version

## Pull Request Process

1. **Update your branch** with the latest changes from `main`:

   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Ensure all checks pass**:

   ```bash
   pnpm lint
   pnpm format:check
   pnpm typecheck
   pnpm build
   ```

3. **Commit your changes** following the commit convention

4. **Push your branch** and create a pull request

5. **Describe your changes** in the PR description

6. **Wait for review** and address any feedback

## Release Process

Releases are automated through semantic-release:

1. Commits are analyzed when merged to `main`
2. Version is determined based on commit messages
3. Changelog is generated
4. Packages are published to npm
5. GitHub release is created

You don't need to manually bump versions or create releases!

## Questions or Issues?

If you have questions or encounter issues, please:

1. Check existing issues on GitHub
2. Create a new issue if needed
3. Join our discussions

Thank you for contributing! 🎉
