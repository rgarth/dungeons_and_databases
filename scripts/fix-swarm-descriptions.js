#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to fix swarm descriptions
function fixSwarmDescriptions() {
  const filePath = path.join(__dirname, '..', 'src', 'data', 'monsters', 'swarm.ts');
  
  if (fs.existsSync(filePath)) {
    console.log(`\nProcessing swarm monsters...`);
    
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');
    let fixedCount = 0;
    
    // Replace specific terrible descriptions
    const replacements = [
      {
        from: '"description": "A medium swarm of Tiny beasts with challenge rating 0.5."',
        to: '"description": "A writhing mass of hundreds of poisonous centipedes moving as one entity. The swarm creates a terrifying sight as the creatures crawl over each other, overwhelming prey through sheer numbers and venom."'
      },
      {
        from: '"description": "A medium swarm of Tiny beasts with challenge rating 0.25."',
        to: '"description": "A writhing mass of hundreds of rats moving as one entity. The swarm creates a terrifying cacophony of squeaks and rustling as it moves, overwhelming prey through sheer numbers."'
      },
      {
        from: '"description": "A medium swarm of Tiny beasts with challenge rating 1."',
        to: '"description": "A dense cloud of thousands of insects moving as one entity. The swarm creates a loud buzzing sound and can quickly overwhelm prey through sheer numbers and their ability to crawl into any opening."'
      },
      {
        from: '"description": "A medium swarm of Tiny beasts with challenge rating 2."',
        to: '"description": "A horrifying mass of hundreds of spiders crawling over each other in a coordinated swarm. The spiders work together to trap and overwhelm prey, using their webs and venom to deadly effect."'
      }
    ];
    
    replacements.forEach(replacement => {
      if (content.includes(replacement.from)) {
        content = content.replace(replacement.from, replacement.to);
        fixedCount++;
        console.log(`  ✅ Fixed: "${replacement.from}"`);
      }
    });
    
    if (fixedCount > 0) {
      console.log(`  Fixed ${fixedCount} terrible descriptions`);
      
      // Write the updated file
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
  
  console.log(`\n🎉 Swarm descriptions fixed successfully!`);
}

// Run the fix
fixSwarmDescriptions(); 