import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // First, explicitly ignore files and directories that cause noise
  {
    ignores: [
      // Jest configuration
      "jest.config.js",
      "jest.setup.js",
      // Build outputs
      ".next/**/*",
      ".next/types/**/*",
      "out/**/*",
      "dist/**/*",
      "build/**/*",
      ".turbo/**/*",
      // Dependencies
      "node_modules/**/*",
      // Environment files
      ".env*",
      "!.env.example",
      // TypeScript declaration files
      "**/*.d.ts",
      // Documentation and markdown files
      "**/*.md",
      "**/*.mdx",
      "docs/**/*.md",
      "README.md",
      "DEPLOYMENT.md",
      "SINGLE_SOURCE_OF_TRUTH.md",
      // Cursor configuration
      ".cursorrules",
      // Scripts and generated files that shouldn't be linted
      "scripts/**/*.js",
      "cache_status_checker.js",
      // Prisma generated files
      "prisma/generated/**/*",
    ],
  },
  // Then apply Next.js rules to remaining files
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
