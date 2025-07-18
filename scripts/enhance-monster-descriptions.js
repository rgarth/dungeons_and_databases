#!/usr/bin/env node

/**
 * Enhance Monster Descriptions Script
 * 
 * This script enhances monster descriptions by:
 * 1. Removing generic "formidable opponent" backgrounds
 * 2. Adding better descriptions from D&D lore sources
 * 3. Providing more interesting and useful information
 */

const fs = require('fs');
const path = require('path');

// Enhanced monster descriptions from D&D lore
const ENHANCED_DESCRIPTIONS = {
  // Dragons
  "Ancient Red Dragon": {
    description: "Ancient red dragons are the most covetous of the true dragons, driven by their insatiable thirst for wealth. They are vain and territorial, and their arrogance makes them believe they are superior to all other creatures.",
    background: "Red dragons prefer to dwell in warm regions, particularly active volcanoes, hot springs, and arid wastelands. They are known for their fiery breath and their tendency to collect vast hoards of treasure."
  },
  "Ancient Gold Dragon": {
    description: "Ancient gold dragons are the most powerful and majestic of the metallic dragons. They are wise, benevolent, and dedicated to protecting the innocent and maintaining the balance between good and evil.",
    background: "Gold dragons prefer to live in secluded, beautiful locations such as mountain peaks, hidden valleys, or enchanted forests. They are known for their wisdom and their ability to shape-shift into humanoid forms."
  },
  "Adult Blue Dragon": {
    description: "Adult blue dragons are cunning and territorial, preferring to dwell in arid regions. They are known for their lightning breath and their love of riddles and complex schemes.",
    background: "Blue dragons make their lairs in vast underground caverns beneath the desert sands. They are excellent burrowers and often create elaborate tunnel systems to protect their hoards."
  },
  
  // Beasts
  "Giant Eagle": {
    description: "Giant eagles are majestic birds of prey that soar through the skies with incredible grace and speed. They are intelligent creatures that often serve as mounts or allies to good-aligned beings.",
    background: "These magnificent birds nest in high mountain peaks and are known for their keen eyesight and ability to spot prey from great distances. They are fiercely protective of their territory and young."
  },
  "Dire Wolf": {
    description: "Dire wolves are massive, prehistoric wolves that are larger and more ferocious than their modern counterparts. They hunt in packs and are known for their incredible stamina and coordination.",
    background: "These ancient predators once roamed the wilderness in large packs, preying on large game. They are highly intelligent and work together with remarkable efficiency to bring down their prey."
  },
  "Giant Spider": {
    description: "Giant spiders are enormous arachnids that spin webs to catch prey and create elaborate lairs. They are patient hunters that wait for their victims to become entangled in their sticky webs.",
    background: "These creatures prefer dark, enclosed spaces such as caves, abandoned buildings, or dense forests. They are excellent climbers and can move silently through their web-filled domains."
  },
  
  // Humanoids
  "Orc": {
    description: "Orcs are fierce, warlike humanoids with greenish-gray skin and prominent tusks. They are known for their strength, aggression, and tribal society based on might and conquest.",
    background: "Orcs typically dwell in harsh environments such as mountains, caves, or wastelands. They organize themselves into tribes led by the strongest warriors and are constantly seeking to expand their territory."
  },
  "Goblin": {
    description: "Goblins are small, green-skinned humanoids with a penchant for mischief and cruelty. They are cowardly when alone but dangerous in groups, especially when led by stronger creatures.",
    background: "Goblins prefer to live in dark, cramped spaces such as caves, ruins, or underground warrens. They are excellent at setting traps and ambushes, using their small size and agility to their advantage."
  },
  "Hobgoblin": {
    description: "Hobgoblins are disciplined, militaristic humanoids that value order and hierarchy. They are larger and more organized than goblins, with a strong martial tradition and sophisticated tactics.",
    background: "Hobgoblins build fortified settlements and maintain strict military discipline. They are known for their engineering skills and ability to construct elaborate fortifications and war machines."
  },
  
  // Undead
  "Skeleton": {
    description: "Skeletons are animated undead creatures created from the bones of the dead. They are mindless servants that follow the commands of their creator without fear or hesitation.",
    background: "Skeletons are typically created by necromancers or other evil spellcasters to serve as guards, laborers, or soldiers. They are immune to many forms of damage and can be easily controlled."
  },
  "Zombie": {
    description: "Zombies are shambling undead creatures created from reanimated corpses. They are slow but relentless, driven by an insatiable hunger for the flesh of the living.",
    background: "Zombies are often created through necromantic magic or as the result of certain diseases or curses. They are mindless and easily controlled, making them popular servants for evil spellcasters."
  },
  "Vampire": {
    description: "Vampires are powerful undead creatures that feed on the blood of the living. They are charismatic, intelligent, and often maintain their personality and memories from life.",
    background: "Vampires are typically created when a person is killed by a vampire's bite and then buried in unhallowed ground. They are immortal but vulnerable to sunlight, running water, and certain holy symbols."
  },
  
  // Fiends
  "Imp": {
    description: "Imps are small, mischievous fiends that serve as familiars to evil spellcasters. They are cowardly but cunning, using their invisibility and shape-shifting abilities to spy and cause trouble.",
    background: "Imps are native to the Nine Hells and are often bound to serve evil masters. They are excellent spies and can turn invisible at will, making them perfect for gathering information or delivering messages."
  },
  "Succubus": {
    description: "Succubi are seductive fiends that use their charm and beauty to corrupt mortals. They feed on the life force of their victims and are masters of deception and manipulation.",
    background: "Succubi often work alone, infiltrating mortal societies to corrupt individuals and spread evil. They are excellent at disguising themselves and can change their appearance to match their target's desires."
  },
  "Balor": {
    description: "Balors are massive, demonic warriors that lead armies of lesser fiends. They are incredibly powerful and destructive, wielding flaming swords and whips that can tear through armor and flesh alike.",
    background: "Balors are among the most powerful demons in the Abyss, often serving as generals in the Blood War against the devils. They are fearless in battle and revel in destruction and chaos."
  },
  
  // Constructs
  "Golem": {
    description: "Golems are magical constructs created from inanimate materials and brought to life through powerful magic. They are mindless servants that follow their creator's commands with unwavering loyalty.",
    background: "Golems are typically created by powerful spellcasters to serve as guardians, laborers, or warriors. They are immune to most forms of magic and can only be destroyed through specific means."
  },
  "Animated Armor": {
    description: "Animated armor consists of empty suits of armor that have been magically brought to life. They serve as guardians and defenders, often protecting valuable locations or treasures.",
    background: "Animated armor is created through powerful enchantment magic, often to protect the tombs of important figures or to guard magical items. They are mindless but effective guardians."
  },
  
  // Elementals
  "Fire Elemental": {
    description: "Fire elementals are living flames that burn with intense heat and destructive power. They are immune to fire damage and can set their surroundings ablaze with their mere presence.",
    background: "Fire elementals are native to the Elemental Plane of Fire and are often summoned to the Material Plane by powerful spellcasters. They are chaotic and unpredictable, spreading destruction wherever they go."
  },
  "Water Elemental": {
    description: "Water elementals are living water that can flow through any opening and drown their enemies. They are fluid and adaptable, able to change their shape and size as needed.",
    background: "Water elementals are native to the Elemental Plane of Water and are often found in large bodies of water. They are excellent swimmers and can move through water with incredible speed."
  },
  
  // Fey
  "Dryad": {
    description: "Dryads are tree spirits that are bound to specific trees and protect the forests they inhabit. They are beautiful and mysterious, with the ability to charm and control woodland creatures.",
    background: "Dryads are deeply connected to nature and the trees they protect. They rarely leave their forests and are fiercely protective of their territory and the creatures that live within it."
  },
  "Satyr": {
    description: "Satyrs are mischievous fey creatures with the upper body of a human and the lower body of a goat. They are known for their love of music, wine, and revelry, as well as their chaotic nature.",
    background: "Satyrs are often found in wild, untamed areas where they can indulge in their love of freedom and pleasure. They are excellent musicians and often use their pipes to charm and control others."
  },
  
  // Giants
  "Hill Giant": {
    description: "Hill giants are massive humanoids that dwell in hilly or mountainous regions. They are simple-minded but incredibly strong, using their size and strength to dominate smaller creatures.",
    background: "Hill giants are the most common and least intelligent of the giant races. They live in simple communities and often raid nearby settlements for food and treasure."
  },
  "Frost Giant": {
    description: "Frost giants are massive humanoids that thrive in cold, arctic environments. They are fierce warriors who value strength and honor, often living in fortified strongholds made of ice and stone.",
    background: "Frost giants are native to cold regions and are well-adapted to freezing temperatures. They are excellent hunters and often keep giant animals as pets and mounts."
  },
  
  // Monstrosities
  "Owlbear": {
    description: "Owlbears are ferocious hybrid creatures with the body of a bear and the head of an owl. They are incredibly aggressive and territorial, attacking any creature that enters their domain.",
    background: "Owlbears are believed to be the result of magical experimentation, combining the strength of a bear with the hunting instincts of an owl. They are solitary creatures that prefer dense forests."
  },
  "Mimic": {
    description: "Mimics are shapeshifting creatures that can take the form of inanimate objects, typically treasure chests or doors. They use this ability to lure unsuspecting prey into their grasp.",
    background: "Mimics are often found in dungeons and ruins where they can easily blend in with the surroundings. They are patient hunters that can wait for days or weeks for the perfect opportunity to strike."
  },
  
  // Aberrations
  "Beholder": {
    description: "Beholders are floating, spherical aberrations covered in eyes and armed with deadly magical rays. They are incredibly intelligent and paranoid, believing themselves to be the most perfect beings in existence.",
    background: "Beholders are native to the Underdark and are known for their xenophobia and paranoia. Each beholder believes it is unique and perfect, and they often war with other beholders over minor differences."
  },
  "Mind Flayer": {
    description: "Mind flayers, also known as illithids, are humanoid aberrations with octopus-like heads and powerful psionic abilities. They are highly intelligent and seek to dominate and enslave other creatures.",
    background: "Mind flayers are native to the Underdark and often establish vast underground empires. They are excellent psions and use their mental powers to control and manipulate other creatures."
  }
};

// Function to enhance monster data
function enhanceMonsterData(monsterData) {
  const enhanced = { ...monsterData };
  
  // Check if we have enhanced descriptions for this monster
  if (ENHANCED_DESCRIPTIONS[monsterData.name]) {
    const enhancedInfo = ENHANCED_DESCRIPTIONS[monsterData.name];
    
    // Replace generic description if it exists
    if (enhancedInfo.description) {
      enhanced.description = enhancedInfo.description;
    }
    
    // Replace generic background if it exists
    if (enhancedInfo.background) {
      enhanced.background = enhancedInfo.background;
    }
  } else {
    // Remove generic "formidable opponent" backgrounds
    if (enhanced.background && enhanced.background.toLowerCase().includes('formidable opponent')) {
      delete enhanced.background;
    }
  }
  
  return enhanced;
}

// Function to process all monster files
function processMonsterFiles() {
  const monsterTypes = [
    'aberration', 'beast', 'celestial', 'construct', 'dragon', 
    'elemental', 'fey', 'fiend', 'giant', 'humanoid', 
    'monstrosity', 'ooze', 'plant', 'swarm', 'undead'
  ];
  
  let totalProcessed = 0;
  let totalEnhanced = 0;
  
  monsterTypes.forEach(type => {
    const filePath = path.join(__dirname, '..', 'src', 'data', 'monsters', `${type}.ts`);
    
    if (fs.existsSync(filePath)) {
      console.log(`Processing ${type} monsters...`);
      
      // Read the file content
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Extract the monsters array - handle TypeScript export format
      const monstersMatch = content.match(/export const \w+: Monster\[\] = (\[[\s\S]*?\]);/);
      console.log(`  Found monsters array: ${monstersMatch ? 'Yes' : 'No'}`);
      if (monstersMatch) {
        const monstersStr = monstersMatch[1];
        let monsters;
        
        try {
          // Convert TypeScript object format to valid JSON
          let jsonStr = monstersStr
            .replace(/(\w+):/g, '"$1":') // Quote property names
            .replace(/'/g, '"') // Replace single quotes with double quotes
            .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas
          
          // Parse the JSON
          monsters = JSON.parse(jsonStr);
          
          // Enhance each monster
          const enhancedMonsters = monsters.map(monster => {
            totalProcessed++;
            const enhanced = enhanceMonsterData(monster);
            if (enhanced.description !== monster.description || enhanced.background !== monster.background) {
              totalEnhanced++;
            }
            return enhanced;
          });
          
          // Replace the monsters array in the file - maintain TypeScript format
          const enhancedMonstersStr = JSON.stringify(enhancedMonsters, null, 2)
            .replace(/"(\w+)":/g, '$1:') // Remove quotes from property names
            .replace(/"/g, "'"); // Replace double quotes with single quotes
          content = content.replace(monstersMatch[1], enhancedMonstersStr);
          
          // Write the enhanced file
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`✅ Enhanced ${enhancedMonsters.length} ${type} monsters`);
          
        } catch (error) {
          console.error(`❌ Error processing ${type} monsters:`, error.message);
        }
      }
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`Total monsters processed: ${totalProcessed}`);
  console.log(`Total monsters enhanced: ${totalEnhanced}`);
  console.log(`\n🎉 Monster descriptions enhanced successfully!`);
}

// Run the enhancement
if (require.main === module) {
  console.log('🚀 Starting monster description enhancement...\n');
  processMonsterFiles();
} 