#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to fix all remaining terrible descriptions in swarm file
function fixFinalSwarmDescriptions() {
  const filePath = path.join(__dirname, '..', 'src', 'data', 'monsters', 'swarm.ts');
  
  if (fs.existsSync(filePath)) {
    console.log(`\nProcessing swarm monsters...`);
    
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');
    let fixedCount = 0;
    
    // Use regex to find and replace all terrible descriptions
    const terriblePattern = /"description":\s*"A medium swarm of Tiny beasts with challenge rating [\d.]+\.?"/g;
    
    content = content.replace(terriblePattern, (match) => {
      fixedCount++;
      console.log(`  ✅ Fixed: "${match}"`);
      return '"description": "A coordinated swarm of creatures moving as one entity, overwhelming prey through sheer numbers and coordinated attacks."';
    });
    
    if (fixedCount > 0) {
      console.log(`  Fixed ${fixedCount} terrible descriptions`);
      
      // Write the updated file
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
  
  console.log(`\n🎉 Final swarm descriptions fixed successfully!`);
}

// Run the fix
fixFinalSwarmDescriptions(); 