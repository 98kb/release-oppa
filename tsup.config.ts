import { defineConfig } from 'tsup';

export const createTsupConfig = (options = {}) => {
  return defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: false,
    ...options,
  });
};

export default createTsupConfig();
