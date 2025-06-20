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
      // Markdown files
      "**/*.md", 
      "**/*.mdx", 
      "**/README.md", 
      "**/docs/**/*.md",
      // Cursor configuration
      ".cursorrules",
      // Next.js build output and generated files
      ".next/**/*",
      ".next/types/**/*",
      "out/**/*",
      // Dependencies
      "node_modules/**/*",
      // Build output and temporary files
      "dist/**/*",
      "build/**/*",
      ".turbo/**/*",
      // Scripts and generated files that shouldn't be linted
      "scripts/**/*.js",
      "cache_status_checker.js",
      // Prisma generated files
      "prisma/generated/**/*",
      // TypeScript declaration files
      "**/*.d.ts",
      // Environment files
      ".env*",
      "!.env.example",
    ],
  },
  // Then apply Next.js rules to remaining files
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
