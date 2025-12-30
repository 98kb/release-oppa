# @release-oppa/example

Example package demonstrating the monorepo setup with TypeScript, tsup, and semantic-release.

## Installation

```bash
npm install @release-oppa/example
# or
pnpm add @release-oppa/example
```

## Usage

```typescript
import { greet, Example } from '@release-oppa/example';

// Use the greet function
console.log(greet('World')); // Hello, World!

// Use the Example class
const example = new Example('test');
console.log(example.getValue()); // test
console.log(example.toUpperCase()); // TEST
```

## License

MIT
