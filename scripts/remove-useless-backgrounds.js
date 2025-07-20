#!/usr/bin/env node

/**
 * Remove Useless Backgrounds Script
 * 
 * This script removes generic "formidable opponent" backgrounds from monster data
 */

const fs = require('fs');
const path = require('path');

// Function to process all monster files
function removeUselessBackgrounds() {
  const monsterTypes = [
    'aberration', 'beast', 'celestial', 'construct', 'dragon', 
    'elemental', 'fey', 'fiend', 'giant', 'humanoid', 
    'monstrosity', 'ooze', 'plant', 'swarm', 'undead'
  ];
  
  let totalProcessed = 0;
  let totalRemoved = 0;
  
  monsterTypes.forEach(type => {
    const filePath = path.join(__dirname, '..', 'src', 'data', 'monsters', `${type}.ts`);
    
    if (fs.existsSync(filePath)) {
      console.log(`Processing ${type} monsters...`);
      
      // Read the file content
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Count how many "formidable opponent" backgrounds we have
      const formidableMatches = content.match(/formidable opponent/gi);
      const formidableCount = formidableMatches ? formidableMatches.length : 0;
      
      if (formidableCount > 0) {
        console.log(`  Found ${formidableCount} "formidable opponent" backgrounds`);
        
        // Remove the entire background line for formidable opponent entries
        content = content.replace(/\s*"background":\s*"[^"]*formidable opponent[^"]*",?\n/g, '');
        
        // Write the updated file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✅ Removed ${formidableCount} useless backgrounds`);
        totalRemoved += formidableCount;
      } else {
        console.log(`  No useless backgrounds found`);
      }
      
      totalProcessed++;
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`Files processed: ${totalProcessed}`);
  console.log(`Useless backgrounds removed: ${totalRemoved}`);
  console.log(`\n🎉 Useless backgrounds removed successfully!`);
}

// Run the script
if (require.main === module) {
  console.log('🚀 Starting removal of useless backgrounds...\n');
  removeUselessBackgrounds();
} 