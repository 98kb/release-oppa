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
- **Synchronized Versioning**: All packages share the same major version

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

## 📦 Creating a New Package

To create a new package in the monorepo:

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

This monorepo uses **semantic-release** for automated versioning and changelog generation. All packages will be published under the same major version.

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - A new feature (minor version bump)
- `fix:` - A bug fix (patch version bump)
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Other changes (dependencies, configs, etc.)

Breaking changes (major version bump):

- Add `BREAKING CHANGE:` in the commit body, or
- Add `!` after the type: `feat!:`

### Release Process

Releases are automated through CI/CD:

1. Push commits following the convention above
2. Semantic-release analyzes commits
3. Determines the next version
4. Generates changelog
5. Publishes packages to npm
6. Creates GitHub release

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Follow the commit convention
4. Submit a pull request

## 📄 License

MIT
