#!/usr/bin/env node

/**
 * Upload Monster Images to Vercel Blob Storage
 * 
 * This script uploads all resized monster images to Vercel Blob Storage
 * for efficient serving and cost optimization.
 */

const fs = require('fs');
const path = require('path');
const { put } = require('@vercel/blob');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Configuration
const IMAGES_DIR = path.join(__dirname, '../public/monster-images');
const BLOB_PREFIX = 'monster-images';

console.log('🚀 Uploading monster images to Vercel Blob Storage...');

// Get all PNG files
const imageFiles = fs.readdirSync(IMAGES_DIR)
  .filter(file => file.endsWith('.png'))
  .filter(file => !file.startsWith('.'));

console.log(`📁 Found ${imageFiles.length} images to upload`);

// Upload function
async function uploadImage(filename) {
  const filePath = path.join(IMAGES_DIR, filename);
  const blobPath = `${BLOB_PREFIX}/${filename}`;
  
  try {
    console.log(`📤 Uploading: ${filename}`);
    
    const fileBuffer = fs.readFileSync(filePath);
    const blob = await put(blobPath, fileBuffer, {
      access: 'public',
      addRandomSuffix: false
    });
    
    console.log(`✅ Uploaded: ${filename} -> ${blob.url}`);
    return { success: true, filename, url: blob.url };
  } catch (error) {
    console.error(`❌ Error uploading ${filename}:`, error.message);
    return { success: false, filename, error: error.message };
  }
}

// Main upload function
async function uploadAllImages() {
  console.log('🔄 Starting upload process...\n');
  
  const results = [];
  let successCount = 0;
  let errorCount = 0;
  
  // Upload images in batches to avoid overwhelming the API
  const batchSize = 10;
  for (let i = 0; i < imageFiles.length; i += batchSize) {
    const batch = imageFiles.slice(i, i + batchSize);
    
    console.log(`📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(imageFiles.length / batchSize)}`);
    
    const batchPromises = batch.map(uploadImage);
    const batchResults = await Promise.all(batchPromises);
    
    results.push(...batchResults);
    
    // Count results
    batchResults.forEach(result => {
      if (result.success) {
        successCount++;
      } else {
        errorCount++;
      }
    });
    
    // Small delay between batches
    if (i + batchSize < imageFiles.length) {
      console.log('⏳ Waiting 1 second before next batch...\n');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // Summary
  console.log('\n📊 Upload Summary:');
  console.log(`✅ Successfully uploaded: ${successCount} images`);
  console.log(`❌ Failed uploads: ${errorCount} images`);
  console.log(`📁 Total processed: ${results.length} images`);
  
  if (errorCount > 0) {
    console.log('\n❌ Failed uploads:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.filename}: ${r.error}`);
    });
  }
  
  // Save results to file for reference
  const resultsFile = path.join(__dirname, 'upload-results.json');
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  console.log(`\n📄 Results saved to: ${resultsFile}`);
  
  return results;
}

// Run the upload
uploadAllImages()
  .then(() => {
    console.log('\n🎉 Upload process complete!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Upload process failed:', error);
    process.exit(1);
  }); 