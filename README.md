# release-oppa

A monorepo setup for publishing npm packages using pnpm workspaces, with TypeScript, tsup, ESLint, Prettier, and semantic-release for automated versioning and changelogs.

## 🚀 Features

- **pnpm Workspaces**: Efficient monorepo management
- **TypeScript**: Type-safe development with shared configurations
- **tsup**: Fast TypeScript bundler with ESM and CJS output
- **ESLint**: Code linting with TypeScript support
- **Prettier**: Consistent code formatting
- **EditorConfig**: Editor consistency across team members
- **Semantic Release**: Automated versioning and changelog generation
- **Hybrid Versioning Strategy**:
  - Each package manages its own **minor** and **patch** releases independently
  - **Major** version bumps happen at the root level and affect all packages simultaneously

## 📦 Structure

```
release-oppa/
├── packages/           # All publishable packages go here
│   └── [package-name]/ # Individual package directory
├── .editorconfig       # Editor configuration
├── .eslintrc.json      # ESLint configuration
├── .prettierrc         # Prettier configuration
├── .releaserc.json     # Semantic-release configuration
├── tsconfig.base.json  # Base TypeScript configuration
├── tsconfig.json       # Root TypeScript configuration
├── tsup.config.ts      # Shared tsup configuration
├── pnpm-workspace.yaml # pnpm workspace configuration
└── package.json        # Root package.json with scripts
```

## 🛠️ Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Install pnpm if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install
```

## 📝 Scripts

- `pnpm build` - Build all packages
- `pnpm lint` - Lint all packages
- `pnpm lint:fix` - Fix linting issues
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm typecheck` - Type-check all packages
- `pnpm clean` - Clean build artifacts
- `pnpm create-package <name>` - Create a new package with boilerplate
- `pnpm bump-major` - Bump major version for ALL packages (for breaking changes)
- `pnpm release` - Manually trigger release for all packages (mainly for local testing)

## 📦 Creating a New Package

### Quick Start (Recommended)

Use the automated script to create a new package:

```bash
pnpm create-package my-package
```

This will create a complete package structure with:

- `package.json` with proper configuration
- `tsconfig.json` extending base config
- `tsup.config.ts` for building
- `.releaserc.json` for semantic-release
- `src/index.ts` with example code
- `README.md` with basic documentation

### Manual Setup

To manually create a new package in the monorepo:

1. Create a new directory in `packages/`:

```bash
mkdir -p packages/my-package/src
```

2. Create a `package.json`:

```json
{
  "name": "@release-oppa/my-package",
  "version": "1.0.0",
  "description": "Description of my package",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "keywords": [],
  "author": "",
  "license": "MIT"
}
```

3. Create a `tsconfig.json`:

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

4. Create a `tsup.config.ts`:

```typescript
import { createTsupConfig } from '../../tsup.config';

export default createTsupConfig();
```

5. Create `.releaserc.json` for the package:

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

6. Create your source code in `src/index.ts`

7. Build and test:

```bash
cd packages/my-package
pnpm build
```

## 🔄 Versioning and Releases

This monorepo uses a **hybrid versioning strategy** with **semantic-release**:

- **Minor and Patch releases**: Each package manages these independently based on its own commits
- **Major releases**: Handled at the root level and applied to ALL packages simultaneously

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - A new feature (**minor** version bump for the affected package)
- `fix:` - A bug fix (**patch** version bump for the affected package)
- `perf:` - Performance improvement (**patch** version bump)
- `docs:` - Documentation changes (no version bump)
- `style:` - Code style changes (no version bump)
- `refactor:` - Code refactoring (no version bump)
- `test:` - Adding or updating tests (no version bump)
- `chore:` - Other changes (no version bump)

**Important**: Commits with `BREAKING CHANGE:` or `!` suffix (e.g., `feat!:`) will **NOT** trigger automatic releases. Breaking changes must be managed manually using the major version bump script.

### Release Process

#### Automated Minor/Patch Releases (Per Package)

When you push commits to `main` branch:

1. CI/CD analyzes commits for each package
2. Determines if minor or patch release is needed
3. Generates changelog for the package
4. Publishes the package to npm
5. Creates GitHub release

Each package releases independently based on its own changes.

#### Manual Major Release (All Packages)

For breaking changes affecting the entire monorepo:

1. **Run the major bump script** from the root:

   ```bash
   pnpm bump-major
   ```

   This will:
   - Increment major version for ALL packages (e.g., 1.2.3 → 2.0.0)
   - Update all CHANGELOG.md files
   - Show you the changes to review

2. **Review and commit**:

   ```bash
   git diff  # Review all changes
   git add .
   git commit -m "chore: bump major version for all packages

   BREAKING CHANGE: <describe breaking changes>"
   ```

3. **Push to trigger release**:

   ```bash
   git push origin main
   ```

4. **Document breaking changes**: Update release notes with migration guides

### Example Scenarios

**Scenario 1**: Adding a new feature to one package

```bash
# In packages/example
git commit -m "feat(example): add new greeting function"
git push
# Result: @release-oppa/example goes from 1.0.0 → 1.1.0
```

**Scenario 2**: Bug fix in multiple packages

```bash
git commit -m "fix(example): correct typo
fix(other): fix edge case"
git push
# Result: Both packages get patch bumps independently
```

**Scenario 3**: Breaking change across all packages

```bash
# From root
pnpm bump-major
# Review changes
git add .
git commit -m "chore: bump major version for all packages

BREAKING CHANGE: Updated API signature across all packages"
git push
# Result: ALL packages go from 1.x.x → 2.0.0
```

## 🔧 CI/CD

This repository includes GitHub Actions workflows:

- **CI Workflow** (`.github/workflows/ci.yml`): Runs on pull requests and pushes
  - Code formatting check
  - Linting
  - Type checking
  - Build verification
- **Release Workflow** (`.github/workflows/release.yml`): Runs on main/next branch
  - All CI checks
  - Per-package semantic-release analysis
  - Independent minor/patch version bumps
  - Package publishing to npm
  - GitHub release creation for each updated package

### Setting up CI/CD

To enable automated releases:

1. **Add npm token**: Create an npm token and add it as `NPM_TOKEN` secret in GitHub repository settings
2. **GitHub token**: The `GITHUB_TOKEN` is automatically provided by GitHub Actions
3. **Branch protection**: Configure `main` branch to require CI checks before merging
4. **For major releases**: Use `pnpm bump-major` locally and commit the changes

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Follow the commit convention
4. Submit a pull request

## 📄 License

MIT
