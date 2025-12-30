#!/usr/bin/env tsx

/**
 * Script to create a new package in the monorepo
 * Usage: pnpm create-package <package-name>
 */

import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const packageName = process.argv[2];

if (!packageName) {
  console.error('Error: Package name is required');
  console.log('Usage: pnpm create-package <package-name>');
  process.exit(1);
}

// Validate package name
if (!/^[a-z0-9-]+$/.test(packageName)) {
  console.error('Error: Package name must contain only lowercase letters, numbers, and hyphens');
  process.exit(1);
}

const packageDir = join(rootDir, 'packages', packageName);
const srcDir = join(packageDir, 'src');

// Check if package already exists
if (existsSync(packageDir)) {
  console.error(`Error: Package "${packageName}" already exists`);
  process.exit(1);
}

console.log(`Creating package: @release-oppa/${packageName}`);

// Create directories
mkdirSync(srcDir, { recursive: true });

// Create package.json
const packageJson = {
  name: `@release-oppa/${packageName}`,
  version: '1.0.0',
  description: `Description for ${packageName}`,
  type: 'module',
  main: './dist/index.cjs',
  module: './dist/index.js',
  types: './dist/index.d.ts',
  exports: {
    '.': {
      types: './dist/index.d.ts',
      import: './dist/index.js',
      require: './dist/index.cjs',
    },
  },
  files: ['dist'],
  scripts: {
    build: 'tsup',
    typecheck: 'tsc --noEmit',
    clean: 'rm -rf dist',
  },
  keywords: [packageName],
  author: '',
  license: 'MIT',
  publishConfig: {
    access: 'public',
  },
};

writeFileSync(join(packageDir, 'package.json'), JSON.stringify(packageJson, null, 2));

// Create tsconfig.json
const tsconfig = {
  extends: '../../tsconfig.base.json',
  compilerOptions: {
    rootDir: './src',
    outDir: './dist',
  },
  include: ['src'],
};

writeFileSync(join(packageDir, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));

// Create tsup.config.ts
const tsupConfig = `import { createTsupConfig } from '../../tsup.config';

export default createTsupConfig();
`;

writeFileSync(join(packageDir, 'tsup.config.ts'), tsupConfig);

// Create .releaserc.json
const releaserc = {
  branches: ['main', 'next'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { breaking: true, release: false },
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'perf', release: 'patch' },
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.gitTag} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
  tagFormat: '${version}',
};

writeFileSync(join(packageDir, '.releaserc.json'), JSON.stringify(releaserc, null, 2));

// Create src/index.ts
const indexTs = `/**
 * ${packageName} package
 */

export function hello(name: string): string {
  return \`Hello from ${packageName}, \${name}!\`;
}
`;

writeFileSync(join(srcDir, 'index.ts'), indexTs);

// Create README.md
const readme = `# @release-oppa/${packageName}

Description for ${packageName} package.

## Installation

\`\`\`bash
npm install @release-oppa/${packageName}
# or
pnpm add @release-oppa/${packageName}
\`\`\`

## Usage

\`\`\`typescript
import { hello } from '@release-oppa/${packageName}';

console.log(hello('World'));
\`\`\`

## License

MIT
`;

writeFileSync(join(packageDir, 'README.md'), readme);

console.log('✅ Package created successfully!');
console.log('\nNext steps:');
console.log(`  1. cd packages/${packageName}`);
console.log('  2. Edit src/index.ts with your code');
console.log('  3. Run pnpm build to build the package');
console.log('  4. Update README.md with documentation');
console.log('\nTo build all packages: pnpm build');
