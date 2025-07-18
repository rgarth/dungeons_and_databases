#!/usr/bin/env node

/**
 * Fix All Terrible Descriptions Script
 * 
 * This script finds and fixes all terrible monster descriptions like:
 * - "A large aberration with challenge rating 10"
 * - "A small beast with challenge rating 0"
 * - "A medium humanoid with challenge rating 1"
 * etc.
 */

const fs = require('fs');
const path = require('path');

// Better descriptions for common monsters
const BETTER_DESCRIPTIONS = {
  // Aberrations
  "Aboleth": {
    description: "A massive, ancient aberration with a bulbous, fish-like body and four writhing tentacles. The aboleth's skin is covered in a slimy, translucent mucus that transforms creatures it touches. Its three eyes glow with malevolent intelligence, and it possesses memories that span millennia, making it one of the oldest and most knowledgeable creatures in existence.",
    background: "Aboleths are among the oldest creatures in the multiverse, predating even the gods themselves. They dwell in vast underwater caverns and ancient ruins, where they rule over enslaved minions and plot to expand their influence. Aboleths possess perfect memories that stretch back to the dawn of time, and they use their telepathic abilities to probe the minds of lesser creatures, learning their deepest desires and using this knowledge to manipulate and enslave them. They are master manipulators who prefer to work through proxies rather than confront enemies directly."
  },
  "Chuul": {
    description: "A massive, lobster-like aberration with chitinous armor and powerful pincers. The chuul's body is covered in dark, segmented plates, and it has numerous writhing tentacles around its mouth. Its eyes glow with a malevolent intelligence, and it can sense magical auras from great distances.",
    background: "Chuuls are ancient aberrations that serve as guardians and enforcers for more powerful creatures like aboleths and mind flayers. They are often found in underground lakes, ancient ruins, or near magical sites where they can detect and hunt spellcasters. Chuuls are highly territorial and will attack any creature that enters their domain, especially those carrying magical items or displaying magical abilities."
  },
  "Cloaker": {
    description: "A large, leathery aberration that resembles a living cloak or manta ray. The cloaker's body is covered in dark, rubbery skin that can blend seamlessly with shadows. When motionless, it appears to be nothing more than a discarded piece of clothing, but when it attacks, it reveals rows of sharp teeth and a long, whip-like tail.",
    background: "Cloakers are stealthy aberrations that lurk in dark places, particularly in the Underdark and abandoned ruins. They are ambush predators that use their ability to create illusory duplicates to confuse and overwhelm their prey. Cloakers are highly intelligent and often work together in small groups, using their moaning abilities to disorient victims before swooping in for the kill."
  },
  "Gibbering Mouther": {
    description: "A writhing mass of liquefied flesh covered in dozens of eyes and mouths that constantly babble and gibber. The gibbering mouther's amorphous body shifts and flows like quicksand, and the ground around it becomes soft and unstable. Its many mouths speak in different voices, creating a maddening cacophony that can drive creatures to insanity.",
    background: "Gibbering mouthers are the result of failed magical experiments or the corruption of living creatures by aberrant magic. They are often found in areas where reality has been warped by powerful magic, such as near ancient spell circles or in regions affected by planar rifts. The creature's constant babbling contains fragments of forgotten languages and forbidden knowledge, making it both fascinating and dangerous to study."
  },
  "Otyugh": {
    description: "A massive, bloated aberration with a roughly spherical body supported by three thick, elephantine legs. The otyugh's rough, rock-like hide is covered in filth and emits a foul stench of decay. It has two prehensile tentacles ending in leaf-like pads with sharp spikes, and a third tentacle topped with three eyes and an olfactory organ. Its massive mouth is filled with sharp teeth, and the entire creature is often covered in refuse and carrion.",
    background: "Otyughs are scavenger aberrations that dwell in sewers, dungeons, and other filthy environments where they can feed on waste and carrion. They are often found near settlements where they can scavenge from garbage dumps or sewage systems. Despite their grotesque appearance, otyughs are intelligent enough to communicate telepathically and can sometimes be bargained with, though they prefer to eat rather than talk."
  },

  // Beasts
  "Ape": {
    description: "A powerful primate with muscular arms and intelligent eyes. Apes are highly intelligent creatures that can use tools and communicate through gestures and vocalizations. They are excellent climbers and can swing through trees with remarkable agility.",
    background: "Apes inhabit dense forests and jungles where they live in social groups led by dominant males. They are omnivorous, feeding on fruits, leaves, insects, and occasionally small animals. Apes are known for their problem-solving abilities and have been observed using sticks as tools to extract insects from tree bark."
  },
  "Baboon": {
    description: "A small, intelligent primate with distinctive facial features and a long tail. Baboons are highly social animals that live in large troops with complex hierarchies. They are excellent climbers and can be quite aggressive when defending their territory.",
    background: "Baboons inhabit savannas, grasslands, and rocky areas where they forage for food in large groups. They are omnivorous, eating fruits, seeds, insects, and small animals. Baboons are known for their complex social behavior and communication through vocalizations and body language."
  },
  "Octopus": {
    description: "A small, intelligent cephalopod with eight flexible tentacles and a bulbous head. Octopuses are masters of camouflage and can change their skin color and texture to blend seamlessly with their surroundings. They are excellent swimmers and can squeeze through incredibly small spaces.",
    background: "Octopuses inhabit coastal waters and coral reefs, where they hunt for crabs, fish, and other small marine creatures. They are highly intelligent for invertebrates and have been known to solve complex puzzles and use tools. When threatened, they release a cloud of dark ink to confuse predators and escape."
  },
  "Giant Octopus": {
    description: "A massive cephalopod with eight powerful tentacles, each lined with suckers that can grip with incredible strength. Giant octopuses are highly intelligent and territorial, often claiming underwater caves or shipwrecks as their lairs. They can change color rapidly for camouflage or communication.",
    background: "Giant octopuses dwell in deep coastal waters, often near shipwrecks or underwater caves. They are excellent hunters that can take down large fish, sharks, and even small whales. Despite their size, they are surprisingly stealthy and can ambush prey with remarkable precision."
  },
  "Owl": {
    description: "A nocturnal bird of prey with large, forward-facing eyes and exceptional hearing. Owls have specialized feathers that allow them to fly silently, making them deadly hunters in the darkness. Their heads can rotate nearly 270 degrees to scan their surroundings.",
    background: "Owls are found in forests, grasslands, and urban areas where they hunt small mammals, birds, and insects. They are excellent at detecting movement and sound, with some species able to hear a mouse's heartbeat from several feet away. Many cultures consider them symbols of wisdom."
  },
  "Giant Owl": {
    description: "A massive owl with a wingspan that can reach over 20 feet. Giant owls are intelligent creatures that often form bonds with good-aligned beings, serving as mounts or companions. They have the same silent flight and keen senses as their smaller cousins, but on a much larger scale.",
    background: "Giant owls typically dwell in ancient forests or remote mountain ranges. They are often found in the company of druids, rangers, or other nature-loving beings. Some giant owls have learned to speak Common and can communicate with humanoids."
  },
  "Panther": {
    description: "A sleek, powerful big cat with dark fur and incredible agility. Panthers are excellent climbers and can leap great distances. They are solitary hunters that prefer to stalk their prey from the shadows before launching a swift, deadly attack.",
    background: "Panthers inhabit dense forests and jungles where their dark coloration provides excellent camouflage. They are territorial animals that mark their territory with scent and vocalizations. Panthers are most active at dawn and dusk, when their prey is also active."
  },
  "Wolf": {
    description: "A medium-sized canine with gray or brown fur and sharp teeth. Wolves are highly social animals that live in packs led by an alpha pair. They are excellent hunters that work together to bring down large prey.",
    background: "Wolves inhabit forests, grasslands, and tundra where they hunt deer, elk, and other large herbivores. They are highly intelligent and communicate through body language, vocalizations, and scent marking. Wolves are fiercely loyal to their pack and will defend their territory from intruders."
  },
  "Dire Wolf": {
    description: "A massive wolf with shaggy fur and powerful jaws. Dire wolves are larger and more ferocious than their modern counterparts. They hunt in packs and are known for their incredible stamina and coordination.",
    background: "Dire wolves once roamed the wilderness in large packs, preying on large game like mammoths and giant deer. They are highly intelligent and work together with remarkable efficiency to bring down their prey. Despite their size, they are surprisingly stealthy hunters."
  }
};

// Function to check if a description is terrible
function isTerribleDescription(description) {
  if (!description) return false;
  
  const terriblePatterns = [
    /^A \w+ \w+ with challenge rating \d+(?:\.\d+)?\.$/,
    /^A \w+ \w+ with challenge rating \d+(?:\.\d+)?$/,
    /^A \w+ \w+ with challenge rating \d+(?:\.\d+)?\s*$/,
    /^A \w+ \w+ with challenge rating \d+(?:\.\d+)?\s*\.\s*$/
  ];
  
  return terriblePatterns.some(pattern => pattern.test(description.trim()));
}

// Function to fix terrible descriptions
function fixTerribleDescriptions() {
  const monsterTypes = [
    'aberration', 'beast', 'celestial', 'construct', 'dragon', 
    'elemental', 'fey', 'fiend', 'giant', 'humanoid', 
    'monstrosity', 'ooze', 'plant', 'swarm', 'undead'
  ];
  
  let totalFixed = 0;
  let totalFound = 0;
  
  monsterTypes.forEach(type => {
    const filePath = path.join(__dirname, '..', 'src', 'data', 'monsters', `${type}.ts`);
    
    if (fs.existsSync(filePath)) {
      console.log(`\nProcessing ${type} monsters...`);
      
      // Read the file content
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Find all monster entries
      const monsterPattern = /"name":\s*"([^"]+)"[^}]*?}(?=\s*,|\s*\])/gs;
      let match;
      let foundInFile = 0;
      let fixedInFile = 0;
      
      while ((match = monsterPattern.exec(content)) !== null) {
        const monsterName = match[1];
        const monsterBlock = match[0];
        
        // Check if this monster has a terrible description
        const descriptionMatch = monsterBlock.match(/"description":\s*"([^"]*)"/);
        if (descriptionMatch && isTerribleDescription(descriptionMatch[1])) {
          foundInFile++;
          totalFound++;
          
          console.log(`  Found terrible description for: ${monsterName}`);
          
          // Check if we have a better description for this monster
          if (BETTER_DESCRIPTIONS[monsterName]) {
            const betterInfo = BETTER_DESCRIPTIONS[monsterName];
            
            // Replace the terrible description
            let updatedBlock = monsterBlock.replace(
              /"description":\s*"[^"]*"/,
              `"description": "${betterInfo.description}"`
            );
            
            // Add background if it doesn't exist
            if (!updatedBlock.includes('"background"')) {
              updatedBlock = updatedBlock.replace(/}(?=\s*,|\s*\])/, `,\n    "background": "${betterInfo.background}"\n  }`);
            }
            
            // Replace the original block
            content = content.replace(monsterBlock, updatedBlock);
            fixedInFile++;
            totalFixed++;
            console.log(`    ✅ Fixed ${monsterName}`);
          } else {
            console.log(`    ⚠️  No better description available for ${monsterName}`);
          }
        }
      }
      
      if (foundInFile > 0) {
        console.log(`  Found ${foundInFile} terrible descriptions, fixed ${fixedInFile}`);
        
        // Write the updated file
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`Total terrible descriptions found: ${totalFound}`);
  console.log(`Total descriptions fixed: ${totalFixed}`);
  console.log(`\n🎉 Terrible descriptions fixed successfully!`);
}

// Run the fix
fixTerribleDescriptions(); 