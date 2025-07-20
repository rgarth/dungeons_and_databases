#!/usr/bin/env node

/**
 * Check for duplicates between descriptions and backgrounds
 */

const fs = require('fs');
const path = require('path');

// Function to check for duplicates
function checkDuplicates() {
  const monsterTypes = [
    'aberration', 'beast', 'celestial', 'construct', 'dragon', 
    'elemental', 'fey', 'fiend', 'giant', 'humanoid', 
    'monstrosity', 'ooze', 'plant', 'swarm', 'undead'
  ];
  
  let totalDuplicates = 0;
  
  monsterTypes.forEach(type => {
    const filePath = path.join(__dirname, '..', 'src', 'data', 'monsters', `${type}.ts`);
    
    if (fs.existsSync(filePath)) {
      console.log(`\nChecking ${type} monsters...`);
      
      // Read the file content
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Find all monster entries
      const monsterPattern = /"name":\s*"([^"]+)"[^}]*?}(?=\s*,|\s*\])/gs;
      let match;
      let duplicatesInFile = 0;
      
      while ((match = monsterPattern.exec(content)) !== null) {
        const monsterName = match[1];
        const monsterBlock = match[0];
        
        // Check if this monster has both description and background
        const descriptionMatch = monsterBlock.match(/"description":\s*"([^"]*)"/);
        const backgroundMatch = monsterBlock.match(/"background":\s*"([^"]*)"/);
        
        if (descriptionMatch && backgroundMatch) {
          const description = descriptionMatch[1];
          const background = backgroundMatch[1];
          
          // Check if they are similar (not exact duplicates, but very similar)
          const descWords = description.toLowerCase().split(/\s+/);
          const bgWords = background.toLowerCase().split(/\s+/);
          
          // Count common words
          const commonWords = descWords.filter(word => bgWords.includes(word));
          const similarity = commonWords.length / Math.max(descWords.length, bgWords.length);
          
          if (similarity > 0.3) { // If more than 30% of words are the same
            console.log(`  ⚠️  Potential duplicate for ${monsterName}:`);
            console.log(`     Description: "${description}"`);
            console.log(`     Background: "${background}"`);
            console.log(`     Similarity: ${(similarity * 100).toFixed(1)}%`);
            duplicatesInFile++;
            totalDuplicates++;
          }
        }
      }
      
      if (duplicatesInFile > 0) {
        console.log(`  Found ${duplicatesInFile} potential duplicates`);
      }
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`Total potential duplicates found: ${totalDuplicates}`);
  
  if (totalDuplicates === 0) {
    console.log(`\n🎉 No duplicates found!`);
  } else {
    console.log(`\n⚠️  Consider reviewing these for potential duplicates.`);
  }
}

// Run the check
checkDuplicates(); 