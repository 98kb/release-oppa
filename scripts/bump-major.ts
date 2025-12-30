#!/usr/bin/env tsx

/**
 * Script to bump the major version of all packages in the monorepo
 * This should be run from the root level only
 * Usage: pnpm bump-major
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

interface PackageJson {
  name: string;
  version: string;
  [key: string]: unknown;
}

interface PackageUpdate {
  name: string;
  path: string;
  pkgJson: PackageJson;
  currentVersion: string;
  newVersion: string;
}

console.log('🚀 Major Version Bump\n');
console.log('This will bump the major version of ALL packages in the monorepo.');
console.log('Each package will get a new major version (e.g., 1.2.3 -> 2.0.0)\n');

// Get all packages
const packagesDir = join(rootDir, 'packages');
const packages = readdirSync(packagesDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

if (packages.length === 0) {
  console.error('❌ No packages found in packages/ directory');
  process.exit(1);
}

console.log(`Found ${packages.length} package(s):\n`);

const updates: PackageUpdate[] = [];

// Read current versions
for (const pkg of packages) {
  const pkgJsonPath = join(packagesDir, pkg, 'package.json');

  if (!existsSync(pkgJsonPath)) {
    console.warn(`⚠️  Skipping ${pkg}: no package.json found`);
    continue;
  }

  const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8')) as PackageJson;
  const currentVersion = pkgJson.version;
  const [major] = currentVersion.split('.').map(Number);
  const newVersion = `${major + 1}.0.0`;

  updates.push({
    name: pkgJson.name,
    path: pkgJsonPath,
    pkgJson,
    currentVersion,
    newVersion,
  });

  console.log(`  ${pkgJson.name}: ${currentVersion} -> ${newVersion}`);
}

if (updates.length === 0) {
  console.error('\n❌ No packages to update');
  process.exit(1);
}

console.log('\n⚠️  This is a destructive operation. Press Ctrl+C to cancel.');
console.log('Continuing in 5 seconds...\n');

// Wait 5 seconds
await new Promise((resolve) => setTimeout(resolve, 5000));

// Update package.json files
console.log('Updating package.json files...\n');

for (const update of updates) {
  update.pkgJson.version = update.newVersion;
  writeFileSync(update.path, JSON.stringify(update.pkgJson, null, 2) + '\n');
  console.log(`  ✅ Updated ${update.name}`);
}

// Update changelogs
console.log('\nUpdating CHANGELOG.md files...\n');

const releaseDate = new Date().toISOString().split('T')[0];

for (const update of updates) {
  const changelogPath = join(dirname(update.path), 'CHANGELOG.md');
  const changelogEntry = `# [${update.newVersion}](https://github.com/98kb/release-oppa/compare/${update.name}@${update.currentVersion}...${update.name}@${update.newVersion}) (${releaseDate})

### ⚠ BREAKING CHANGES

* Major version bump - please review migration guide

`;

  if (existsSync(changelogPath)) {
    const existingChangelog = readFileSync(changelogPath, 'utf-8');
    writeFileSync(changelogPath, changelogEntry + existingChangelog);
  } else {
    writeFileSync(changelogPath, changelogEntry);
  }
  console.log(`  ✅ Updated CHANGELOG for ${update.name}`);
}

console.log('\n📝 Next steps:');
console.log('  1. Review the changes with: git diff');
console.log(
  '  2. Commit the changes: git add . && git commit -m "chore: bump major version for all packages"'
);
console.log('  3. Push to trigger release: git push origin main');
console.log('  4. Create and publish release notes with breaking changes documentation');
console.log('\n✨ Done!');
