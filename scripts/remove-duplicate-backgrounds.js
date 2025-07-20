#!/usr/bin/env node

/**
 * Remove Duplicate Backgrounds Script
 * 
 * This script removes backgrounds that are identical to descriptions
 */

const fs = require('fs');
const path = require('path');

// Function to process all monster files
function removeDuplicateBackgrounds() {
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
      
      // Find all monster objects using a more robust pattern
      const monsterPattern = /(\{[^}]*"name":\s*"[^"]*"[^}]*\})/gs;
      let match;
      let removedCount = 0;
      
      while ((match = monsterPattern.exec(content)) !== null) {
        const monsterBlock = match[1];
        
        // Extract description and background
        const descMatch = monsterBlock.match(/"description":\s*"([^"]*)"/);
        const bgMatch = monsterBlock.match(/"background":\s*"([^"]*)"/);
        
        if (descMatch && bgMatch) {
          const description = descMatch[1];
          const background = bgMatch[1];
          
          // If they're identical, remove the background
          if (description === background) {
            // Remove the background line and its trailing comma
            const newBlock = monsterBlock.replace(/\s*"background":\s*"[^"]*",?\n?/g, '');
            
            // Replace the original block with the updated one
            content = content.replace(monsterBlock, newBlock);
            removedCount++;
            
            // Extract monster name for logging
            const nameMatch = monsterBlock.match(/"name":\s*"([^"]*)"/);
            if (nameMatch) {
              console.log(`  ✅ Removed duplicate background for ${nameMatch[1]}`);
            }
          }
        }
      }
      
      if (removedCount > 0) {
        // Write the updated file
        fs.writeFileSync(filePath, content, 'utf8');
        totalRemoved += removedCount;
      }
      
      totalProcessed++;
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`Files processed: ${totalProcessed}`);
  console.log(`Duplicate backgrounds removed: ${totalRemoved}`);
  console.log(`\n🎉 Duplicate backgrounds removed successfully!`);
}

// Run the script
if (require.main === module) {
  console.log('🚀 Starting removal of duplicate backgrounds...\n');
  removeDuplicateBackgrounds();
} 