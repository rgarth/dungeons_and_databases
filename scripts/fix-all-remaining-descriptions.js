#!/usr/bin/env node

/**
 * Fix All Remaining Terrible Descriptions
 * 
 * This script uses regex to find and replace ALL terrible descriptions
 * that match the pattern "A [size] [type] with challenge rating [number]."
 */

const fs = require('fs');
const path = require('path');

// Function to generate a better description based on size and type
function generateBetterDescription(size, type, challengeRating) {
  const sizeDescriptions = {
    'Tiny': 'A tiny',
    'Small': 'A small',
    'Medium': 'A medium-sized',
    'Large': 'A large',
    'Huge': 'A massive',
    'Gargantuan': 'An enormous'
  };
  
  const typeDescriptions = {
    'aberration': 'otherworldly aberration',
    'beast': 'wild beast',
    'celestial': 'divine celestial',
    'construct': 'magical construct',
    'dragon': 'powerful dragon',
    'elemental': 'elemental being',
    'fey': 'mystical fey creature',
    'fiend': 'demonic fiend',
    'giant': 'massive giant',
    'humanoid': 'humanoid creature',
    'monstrosity': 'terrifying monstrosity',
    'ooze': 'amorphous ooze',
    'plant': 'sentient plant',
    'swarm': 'coordinated swarm',
    'undead': 'undead creature'
  };
  
  const sizeDesc = sizeDescriptions[size] || 'A';
  const typeDesc = typeDescriptions[type] || 'creature';
  
  // Add some variety based on challenge rating
  let powerLevel = '';
  if (parseFloat(challengeRating) >= 20) {
    powerLevel = 'legendary';
  } else if (parseFloat(challengeRating) >= 10) {
    powerLevel = 'powerful';
  } else if (parseFloat(challengeRating) >= 5) {
    powerLevel = 'formidable';
  } else if (parseFloat(challengeRating) >= 1) {
    powerLevel = 'dangerous';
  } else {
    powerLevel = 'common';
  }
  
  return `${sizeDesc} ${powerLevel} ${typeDesc} with distinctive features and abilities.`;
}

// Function to fix terrible descriptions
function fixAllTerribleDescriptions() {
  const monsterTypes = [
    'aberration', 'beast', 'celestial', 'construct', 'dragon', 
    'elemental', 'fey', 'fiend', 'giant', 'humanoid', 
    'monstrosity', 'ooze', 'plant', 'swarm', 'undead'
  ];
  
  let totalFixed = 0;
  
  monsterTypes.forEach(type => {
    const filePath = path.join(__dirname, '..', 'src', 'data', 'monsters', `${type}.ts`);
    
    if (fs.existsSync(filePath)) {
      console.log(`\nProcessing ${type} monsters...`);
      
      // Read the file content
      let content = fs.readFileSync(filePath, 'utf8');
      let fixedInFile = 0;
      
      // Use regex to find and replace all terrible descriptions
      const terriblePattern = /"description":\s*"A\s+(\w+)\s+(\w+)\s+with\s+challenge\s+rating\s+([\d.]+)\.?"/g;
      
      content = content.replace(terriblePattern, (match, size, type, challengeRating) => {
        const betterDescription = generateBetterDescription(size, type, challengeRating);
        fixedInFile++;
        totalFixed++;
        console.log(`  ✅ Fixed: "${match}"`);
        return `"description": "${betterDescription}"`;
      });
      
      if (fixedInFile > 0) {
        console.log(`  Fixed ${fixedInFile} terrible descriptions`);
        
        // Write the updated file
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`Total descriptions fixed: ${totalFixed}`);
  console.log(`\n🎉 All terrible descriptions fixed successfully!`);
}

// Run the fix
fixAllTerribleDescriptions(); 