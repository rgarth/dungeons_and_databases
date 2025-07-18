#!/usr/bin/env node

/**
 * Resize Monster Images
 * 
 * This script converts all monster images to 800x800 using ImageMagick.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const INPUT_DIR = path.join(__dirname, '../public/monster-images');
const OUTPUT_DIR = path.join(__dirname, '../public/monster-images/resized');
const TARGET_SIZE = '800x800';

console.log('🖼️  Resizing monster images to 800x800...');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✅ Created output directory: ${OUTPUT_DIR}`);
}

// Get all image files
const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
const imageFiles = fs.readdirSync(INPUT_DIR)
  .filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext) && !file.startsWith('.');
  });

console.log(`📁 Found ${imageFiles.length} image files to resize`);

// Process each image
let processed = 0;
let errors = 0;

for (const file of imageFiles) {
  const inputPath = path.join(INPUT_DIR, file);
  const outputPath = path.join(OUTPUT_DIR, file);
  
  try {
    // Use ImageMagick to resize the image
    const command = `convert "${inputPath}" -resize ${TARGET_SIZE}^ -gravity center -extent ${TARGET_SIZE} "${outputPath}"`;
    
    console.log(`🔄 Resizing: ${file}`);
    execSync(command, { stdio: 'pipe' });
    
    processed++;
    console.log(`✅ Resized: ${file}`);
  } catch (error) {
    errors++;
    console.error(`❌ Error resizing ${file}:`, error.message);
  }
}

console.log('\n📊 Resize Summary:');
console.log(`✅ Successfully processed: ${processed} images`);
console.log(`❌ Errors: ${errors} images`);
console.log(`📁 Output directory: ${OUTPUT_DIR}`);

if (errors > 0) {
  console.log('\n⚠️  Some images failed to resize. Check the errors above.');
  process.exit(1);
} else {
  console.log('\n🎉 All images resized successfully!');
} 