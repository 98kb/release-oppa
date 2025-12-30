import {recommended, strict, typescript} from "eslint-config-98kb";
import {defineConfig, globalIgnores} from "eslint/config";

export default defineConfig([
  globalIgnores([
    "**/dist/**",
    "**/node_modules/**",
    "**/coverage/**",
    "**/.next/**",
    "packages/eslint-config/**",
    "**/cdk.out/**",
    "**/*.md",
    "tsup.config.ts",
  ]),
  ...recommended,
  ...strict,
  ...typescript,
  {
    rules: {
      "no-new": "off",
      camelcase: "off",
      "no-console": "off",
    },
  },
  {
    files: ["tsup.config.ts"],
    rules: {
      "98kb/filename": "off",
    },
  },
  {
    files: ["**/tsup.config.ts"],
    rules: {
      "import/extensions": "off",
    },
  },
]);
