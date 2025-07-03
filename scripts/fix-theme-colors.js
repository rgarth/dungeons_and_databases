#!/usr/bin/env node

/**
 * Script to systematically identify and fix hardcoded theme colors
 * This helps us replace all bg-[var(--color-*)] patterns with proper theme-aware styling
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Patterns to search for
const HARDCODED_PATTERNS = [
  'bg-\\[var\\(--color-',
  'text-\\[var\\(--color-',
  'border-\\[var\\(--color-',
];

// Files to exclude from search
const EXCLUDE_PATTERNS = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '.next',
  'coverage',
  '*.log',
  '*.lock',
  'package.json',
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  'tsconfig.json',
  'next.config.js',
  'tailwind.config.js',
  'postcss.config.js',
  'eslint.config.js',
  'jest.config.js',
  '*.test.js',
  '*.test.ts',
  '*.test.tsx',
  '__tests__',
  'test-',
  'scripts/',
  'migrations/',
  'supabase/',
  'prisma/',
  'public/',
  'docs/',
  'dev-tools/',
];

// Theme-aware replacement patterns
const REPLACEMENT_PATTERNS = {
  // Status colors
  'bg-\\[var\\(--color-success-bg\\)\\]': 'style={{ backgroundColor: "var(--color-surface-secondary)" }}',
  'text-\\[var\\(--color-success\\)\\]': 'style={{ color: "var(--color-success)" }}',
  'border-\\[var\\(--color-success-border\\)\\]': 'style={{ borderColor: "var(--color-success)" }}',
  
  'bg-\\[var\\(--color-warning-bg\\)\\]': 'style={{ backgroundColor: "var(--color-surface-secondary)" }}',
  'text-\\[var\\(--color-warning\\)\\]': 'style={{ color: "var(--color-warning)" }}',
  'border-\\[var\\(--color-warning-border\\)\\]': 'style={{ borderColor: "var(--color-warning)" }}',
  
  'bg-\\[var\\(--color-error-bg\\)\\]': 'style={{ backgroundColor: "var(--color-surface-secondary)" }}',
  'text-\\[var\\(--color-error\\)\\]': 'style={{ color: "var(--color-error)" }}',
  'border-\\[var\\(--color-error-border\\)\\]': 'style={{ borderColor: "var(--color-error)" }}',
  
  // Text colors
  'text-\\[var\\(--color-text-primary\\)\\]': 'style={{ color: "var(--color-text-primary)" }}',
  'text-\\[var\\(--color-text-secondary\\)\\]': 'style={{ color: "var(--color-text-secondary)" }}',
  'text-\\[var\\(--color-text-tertiary\\)\\]': 'style={{ color: "var(--color-text-tertiary)" }}',
  'text-\\[var\\(--color-text-muted\\)\\]': 'style={{ color: "var(--color-text-muted)" }}',
  
  // Background colors
  'bg-\\[var\\(--color-surface\\)\\]': 'style={{ backgroundColor: "var(--color-surface)" }}',
  'bg-\\[var\\(--color-surface-secondary\\)\\]': 'style={{ backgroundColor: "var(--color-surface-secondary)" }}',
  'bg-\\[var\\(--color-card\\)\\]': 'style={{ backgroundColor: "var(--color-card)" }}',
  'bg-\\[var\\(--color-card-secondary\\)\\]': 'style={{ backgroundColor: "var(--color-card-secondary)" }}',
  
  // Border colors
  'border-\\[var\\(--color-border\\)\\]': 'style={{ borderColor: "var(--color-border)" }}',
  'border-\\[var\\(--color-accent\\)\\]': 'style={{ borderColor: "var(--color-accent)" }}',
  
  // Accent colors
  'text-\\[var\\(--color-accent\\)\\]': 'style={{ color: "var(--color-accent)" }}',
  'bg-\\[var\\(--color-accent\\)\\]': 'style={{ backgroundColor: "var(--color-accent)" }}',
};

function shouldExcludeFile(filePath) {
  return EXCLUDE_PATTERNS.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace('*', '.*'));
      return regex.test(filePath);
    }
    return filePath.includes(pattern);
  });
}

function findHardcodedColors() {
  console.log('🔍 Searching for hardcoded theme colors...\n');
  
  const results = [];
  
  HARDCODED_PATTERNS.forEach(pattern => {
    try {
      // Escape the pattern for grep
      const escapedPattern = pattern.replace(/\\/g, '\\\\');
      const grepCommand = `grep -r "${escapedPattern}" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx"`;
      const output = execSync(grepCommand, { encoding: 'utf8' });
      
      const lines = output.split('\n').filter(line => line.trim());
      
      lines.forEach(line => {
        const [filePath, ...rest] = line.split(':');
        const content = rest.join(':').trim();
        
        if (!shouldExcludeFile(filePath)) {
          results.push({
            file: filePath,
            pattern: pattern,
            content: content,
            line: content
          });
        }
      });
    } catch (error) {
      // grep returns non-zero exit code when no matches found
      if (error.status !== 1) {
        console.error(`Error searching for pattern ${pattern}:`, error.message);
      }
    }
  });
  
  return results;
}

function generateReport(results) {
  console.log(`📊 Found ${results.length} instances of hardcoded theme colors\n`);
  
  // Group by file
  const files = {};
  results.forEach(result => {
    if (!files[result.file]) {
      files[result.file] = [];
    }
    files[result.file].push(result);
  });
  
  console.log('📁 Files with hardcoded theme colors:\n');
  
  Object.entries(files).forEach(([file, instances]) => {
    console.log(`  ${file} (${instances.length} instances)`);
    instances.forEach(instance => {
      console.log(`    - ${instance.pattern}: ${instance.content.substring(0, 80)}...`);
    });
    console.log('');
  });
  
  // Summary by pattern
  const patternCounts = {};
  results.forEach(result => {
    patternCounts[result.pattern] = (patternCounts[result.pattern] || 0) + 1;
  });
  
  console.log('📈 Pattern breakdown:\n');
  Object.entries(patternCounts).forEach(([pattern, count]) => {
    console.log(`  ${pattern}: ${count} instances`);
  });
  
  return { files, patternCounts };
}

function suggestReplacements() {
  console.log('\n🛠️  Suggested replacement strategy:\n');
  
  console.log('1. Use the new theme utility functions:');
  console.log('   - Import from @/lib/theme-utils');
  console.log('   - Use getStatusStyles(), getTagStyles(), etc.');
  console.log('');
  
  console.log('2. Use React hooks for dynamic theming:');
  console.log('   - Import from @/hooks/use-theme');
  console.log('   - Use useStatusStyles(), useTagStyles(), etc.');
  console.log('');
  
  console.log('3. Replace hardcoded patterns with inline styles:');
  Object.entries(REPLACEMENT_PATTERNS).forEach(([pattern, replacement]) => {
    console.log(`   ${pattern} → ${replacement}`);
  });
  
  console.log('\n4. Priority order:');
  console.log('   - Status messages (success, warning, error)');
  console.log('   - Language and skill tags');
  console.log('   - Magical item rarity colors');
  console.log('   - Spell level colors');
  console.log('   - General UI elements');
}

function main() {
  console.log('🎨 Theme Color Analysis Tool\n');
  console.log('This tool helps identify hardcoded theme colors that need to be replaced\n');
  
  const results = findHardcodedColors();
  
  if (results.length === 0) {
    console.log('✅ No hardcoded theme colors found!');
    return;
  }
  
  const report = generateReport(results);
  suggestReplacements();
  
  console.log('\n📝 Next steps:');
  console.log('1. Review the files listed above');
  console.log('2. Use the theme utility functions for new components');
  console.log('3. Gradually replace hardcoded patterns with theme-aware styling');
  console.log('4. Test each change to ensure proper theme adaptation');
}

if (require.main === module) {
  main();
}

module.exports = {
  findHardcodedColors,
  generateReport,
  suggestReplacements,
  REPLACEMENT_PATTERNS
}; 