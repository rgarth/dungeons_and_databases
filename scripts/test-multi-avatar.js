#!/usr/bin/env node

// Test script to demonstrate the new multi-avatar generation system

import fs from 'fs';
import path from 'path';

// Simulate the new filename generation logic
const CONFIG = {
  outputDir: './public/avatars'
};

// Find the next available filename for a race/class/gender combination
function getNextAvailableFilename(baseFilename) {
  const outputDir = CONFIG.outputDir;
  const baseFile = `${baseFilename}.png`;
  const basePath = path.join(outputDir, baseFile);
  
  // If base file doesn't exist, use it
  if (!fs.existsSync(basePath)) {
    return baseFile;
  }
  
  // Otherwise, find the next numbered variation
  let counter = 1;
  while (true) {
    const numberedFile = `${baseFilename}_${counter}.png`;
    const numberedPath = path.join(outputDir, numberedFile);
    
    if (!fs.existsSync(numberedPath)) {
      return numberedFile;
    }
    counter++;
  }
}

// Test cases
const testCases = [
  'Human_Fighter_Male',
  'Elf_Wizard_Female', 
  'Dwarf_Cleric_Male',
  'Human_Fighter_Male', // Duplicate - should get _1
  'Human_Fighter_Male', // Another duplicate - should get _2
  'Elf_Wizard_Female'   // Duplicate - should get _1
];

console.log('🧪 Testing Multi-Avatar Filename Generation\n');

testCases.forEach((testCase, index) => {
  const nextFilename = getNextAvailableFilename(testCase);
  console.log(`${index + 1}. ${testCase} → ${nextFilename}`);
  
  // Simulate creating the file by actually creating it temporarily
  const fullPath = path.join(CONFIG.outputDir, nextFilename);
  
  // Ensure directory exists
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  // Create empty file to simulate generation
  fs.writeFileSync(fullPath, '');
});

console.log('\n✅ Test completed! Check public/avatars/ directory');
console.log('\n💡 Expected Results:');
console.log('   - Human_Fighter_Male.png');
console.log('   - Human_Fighter_Male_1.png');
console.log('   - Human_Fighter_Male_2.png');
console.log('   - Elf_Wizard_Female.png');
console.log('   - Elf_Wizard_Female_1.png');
console.log('   - Dwarf_Cleric_Male.png');

console.log('\n🔄 When you run generate-avatars again, new avatars will get the next available number!'); 