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
     "branches": ["main", "next"],
     "plugins": [
       [
         "@semantic-release/commit-analyzer",
         {
           "preset": "conventionalcommits",
           "releaseRules": [
             { "breaking": true, "release": false },
             { "type": "feat", "release": "minor" },
             { "type": "fix", "release": "patch" },
             { "type": "perf", "release": "patch" }
           ]
         }
       ],
       [
         "@semantic-release/release-notes-generator",
         {
           "preset": "conventionalcommits"
         }
       ],
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
           "assets": ["package.json", "CHANGELOG.md"],
           "message": "chore(release): ${nextRelease.gitTag} [skip ci]\n\n${nextRelease.notes}"
         }
       ],
       "@semantic-release/github"
     ],
     "tagFormat": "${version}"
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

## Versioning Strategy

This monorepo uses a **hybrid versioning approach**:

- **Minor and Patch releases**: Managed automatically per package based on conventional commits
- **Major releases**: Managed manually at the root level for all packages

### For Regular Changes (feat, fix, perf)

1. Use conventional commits as usual:
   ```bash
   git commit -m "feat(package-name): add new feature"
   git commit -m "fix(package-name): fix bug"
   ```
2. Push to trigger automatic release of affected packages

### For Breaking Changes

**DO NOT use `BREAKING CHANGE:` or `!` in commits** - these won't trigger releases.

Instead, for breaking changes:

1. **Run the major version bump script**:

   ```bash
   pnpm bump-major
   ```

2. **Review the changes** and commit:

   ```bash
   git add .
   git commit -m "chore: bump major version for all packages

   BREAKING CHANGE: Describe the breaking changes and migration path"
   ```

3. **Push to release**: All packages will be published with new major version

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

This monorepo uses **semantic-release** with a hybrid strategy:

### Automatic Releases (Minor/Patch)

Each package releases independently when changes are merged to `main`:

1. Commits are analyzed per package
2. Version is determined (minor for `feat:`, patch for `fix:`)
3. Changelog is generated for that package
4. Package is published to npm
5. GitHub release is created

### Manual Major Releases

For breaking changes that affect all packages:

1. Use `pnpm bump-major` to update all package versions
2. Commit with breaking change description
3. Push to trigger release of all packages with new major version

You don't need to manually bump versions for regular changes!

## Questions or Issues?

If you have questions or encounter issues, please:

1. Check existing issues on GitHub
2. Create a new issue if needed
3. Join our discussions

Thank you for contributing! 🎉
