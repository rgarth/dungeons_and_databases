#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to fix swarm descriptions correctly
function fixSwarmDescriptionsCorrectly() {
  const filePath = path.join(__dirname, '..', 'src', 'data', 'monsters', 'swarm.ts');
  
  if (fs.existsSync(filePath)) {
    console.log(`\nFixing swarm descriptions correctly...`);
    
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');
    let fixedCount = 0;
    
    // Correct descriptions for each swarm type
    const correctDescriptions = {
      "Swarm of Bats": "A cloud of hundreds of bats flying together in perfect coordination. The swarm creates a terrifying sound of flapping wings and high-pitched squeaks as it moves through the darkness.",
      "Swarm of Beetles": "A dense mass of hundreds of beetles crawling together in perfect coordination. The swarm creates a rustling sound as the insects move over each other, overwhelming prey through sheer numbers.",
      "Swarm of Centipedes": "A writhing mass of hundreds of poisonous centipedes moving as one entity. The swarm creates a terrifying sight as the creatures crawl over each other, overwhelming prey through sheer numbers and venom.",
      "Swarm of Insects": "A dense cloud of thousands of insects moving as one entity. The swarm creates a loud buzzing sound and can quickly overwhelm prey through sheer numbers and their ability to crawl into any opening.",
      "Swarm of Poisonous Snakes": "A horrifying mass of hundreds of venomous snakes writhing together in a coordinated swarm. The snakes work together to trap and overwhelm prey, using their venom to deadly effect.",
      "Swarm of Quippers": "A school of hundreds of vicious, carnivorous fish swimming together in perfect coordination. The swarm creates a terrifying sight as the fish dart and weave through the water, overwhelming prey through sheer numbers.",
      "Swarm of Rats": "A writhing mass of hundreds of rats moving as one entity. The swarm creates a terrifying cacophony of squeaks and rustling as it moves, overwhelming prey through sheer numbers.",
      "Swarm of Ravens": "A cloud of hundreds of ravens flying together in perfect coordination. The swarm creates a terrifying sound of flapping wings and harsh caws as it moves through the air.",
      "Swarm of Spiders": "A horrifying mass of hundreds of spiders crawling over each other in a coordinated swarm. The spiders work together to trap and overwhelm prey, using their webs and venom to deadly effect.",
      "Swarm of Wasps": "A dense cloud of hundreds of angry wasps flying together in perfect coordination. The swarm creates a terrifying buzzing sound and can quickly overwhelm prey through sheer numbers and their painful stings."
    };
    
    // Find all monster entries and fix their descriptions
    const monsterPattern = /"name":\s*"([^"]+)"[^}]*?"description":\s*"([^"]*)"[^}]*?}/gs;
    
    content = content.replace(monsterPattern, (match, monsterName, description) => {
      // Check if this is a swarm and has a generic description
      if (monsterName.startsWith("Swarm of") && (description.includes("coordinated swarm") || description.includes("rats") || description.includes("bats"))) {
        const correctDescription = correctDescriptions[monsterName];
        if (correctDescription) {
          fixedCount++;
          console.log(`  ✅ Fixed ${monsterName}: "${description}"`);
          return match.replace(`"description": "${description}"`, `"description": "${correctDescription}"`);
        }
      }
      return match;
    });
    
    if (fixedCount > 0) {
      console.log(`  Fixed ${fixedCount} swarm descriptions`);
      
      // Write the updated file
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
  
  console.log(`\n🎉 Swarm descriptions fixed correctly!`);
}

// Run the fix
fixSwarmDescriptionsCorrectly(); 