#!/usr/bin/env node

/**
 * Add Better Backgrounds Script
 * 
 * This script adds meaningful background information to monsters
 * Focuses only on the "background" field, not descriptions
 */

const fs = require('fs');
const path = require('path');

// Better background information for monsters
const BETTER_BACKGROUNDS = {
  // Dragons
  "Ancient Red Dragon": "Red dragons prefer to dwell in warm regions, particularly active volcanoes, hot springs, and arid wastelands. They are known for their fiery breath and their tendency to collect vast hoards of treasure.",
  "Ancient Gold Dragon": "Gold dragons prefer to live in secluded, beautiful locations such as mountain peaks, hidden valleys, or enchanted forests. They are known for their wisdom and their ability to shape-shift into humanoid forms.",
  "Adult Blue Dragon": "Blue dragons make their lairs in vast underground caverns beneath the desert sands. They are excellent burrowers and often create elaborate tunnel systems to protect their hoards.",
  "Adult Black Dragon": "Black dragons prefer to dwell in swamps, marshes, and other wetlands. They are known for their acidic breath and their tendency to ambush prey from beneath the water.",
  "Adult Green Dragon": "Green dragons make their homes in dense forests and jungles. They are excellent climbers and often build their lairs in massive trees or underground caverns beneath the forest floor.",
  "Adult White Dragon": "White dragons prefer cold, arctic environments such as glaciers, ice caves, and frozen mountains. They are the most feral and animalistic of the chromatic dragons.",
  
  // Beasts
  "Giant Eagle": "These magnificent birds nest in high mountain peaks and are known for their keen eyesight and ability to spot prey from great distances. They are fiercely protective of their territory and young.",
  "Dire Wolf": "These ancient predators once roamed the wilderness in large packs, preying on large game. They are highly intelligent and work together with remarkable efficiency to bring down their prey.",
  "Giant Spider": "These creatures prefer dark, enclosed spaces such as caves, abandoned buildings, or dense forests. They are excellent climbers and can move silently through their web-filled domains.",
  "Giant Bear": "Giant bears are solitary creatures that establish large territories in wilderness areas. They are excellent hunters and will defend their territory fiercely against any perceived threats.",
  "Giant Crocodile": "These massive reptiles lurk in rivers, swamps, and coastal waters. They are patient ambush predators that can hold their breath for extended periods while waiting for prey.",
  "Giant Shark": "Giant sharks patrol the open ocean and coastal waters. They are apex predators that can sense blood from miles away and are known for their incredible speed and power.",
  
  // Humanoids
  "Orc": "Orcs typically dwell in harsh environments such as mountains, caves, or wastelands. They organize themselves into tribes led by the strongest warriors and are constantly seeking to expand their territory.",
  "Goblin": "Goblins prefer to live in dark, cramped spaces such as caves, ruins, or underground warrens. They are excellent at setting traps and ambushes, using their small size and agility to their advantage.",
  "Hobgoblin": "Hobgoblins build fortified settlements and maintain strict military discipline. They are known for their engineering skills and ability to construct elaborate fortifications and war machines.",
  "Drow": "Drow live in vast underground cities in the Underdark. They are ruled by powerful matriarchs and are known for their cruelty, ambition, and mastery of dark magic.",
  "Dwarf": "Dwarves build their kingdoms deep within mountains and hills. They are master craftsmen and miners, known for their skill with stone and metal.",
  "Elf": "Elves typically dwell in enchanted forests and secluded valleys. They are deeply connected to nature and magic, and many live for centuries.",
  
  // Undead
  "Skeleton": "Skeletons are typically created by necromancers or other evil spellcasters to serve as guards, laborers, or soldiers. They are immune to many forms of damage and can be easily controlled.",
  "Zombie": "Zombies are often created through necromantic magic or as the result of certain diseases or curses. They are mindless and easily controlled, making them popular servants for evil spellcasters.",
  "Vampire": "Vampires are typically created when a person is killed by a vampire's bite and then buried in unhallowed ground. They are immortal but vulnerable to sunlight, running water, and certain holy symbols.",
  "Ghost": "Ghosts are the spirits of the dead who cannot find rest. They are often bound to specific locations or objects and may seek to complete unfinished business or exact revenge.",
  "Wraith": "Wraiths are the spirits of evil beings who have been transformed into undead creatures. They are incorporeal and can pass through walls and other solid objects.",
  
  // Fiends
  "Imp": "Imps are native to the Nine Hells and are often bound to serve evil masters. They are excellent spies and can turn invisible at will, making them perfect for gathering information or delivering messages.",
  "Succubus": "Succubi often work alone, infiltrating mortal societies to corrupt individuals and spread evil. They are excellent at disguising themselves and can change their appearance to match their target's desires.",
  "Balor": "Balors are among the most powerful demons in the Abyss, often serving as generals in the Blood War against the devils. They are fearless in battle and revel in destruction and chaos.",
  "Pit Fiend": "Pit fiends are the highest-ranking devils in the Nine Hells. They serve as generals and administrators, commanding vast armies of lesser devils in the eternal Blood War.",
  
  // Constructs
  "Golem": "Golems are typically created by powerful spellcasters to serve as guardians, laborers, or warriors. They are immune to most forms of magic and can only be destroyed through specific means.",
  "Animated Armor": "Animated armor is created through powerful enchantment magic, often to protect the tombs of important figures or to guard magical items. They are mindless but effective guardians.",
  "Flying Sword": "Flying swords are created by powerful enchanters to serve as guardians or assassins. They are highly mobile and can strike with incredible speed and precision.",
  
  // Elementals
  "Fire Elemental": "Fire elementals are native to the Elemental Plane of Fire and are often summoned to the Material Plane by powerful spellcasters. They are chaotic and unpredictable, spreading destruction wherever they go.",
  "Water Elemental": "Water elementals are native to the Elemental Plane of Water and are often found in large bodies of water. They are excellent swimmers and can move through water with incredible speed.",
  "Earth Elemental": "Earth elementals are native to the Elemental Plane of Earth and are often found in mountains, caves, and other rocky terrain. They are incredibly strong and can move through solid stone.",
  "Air Elemental": "Air elementals are native to the Elemental Plane of Air and are often found in high mountains or during storms. They are incredibly fast and can fly with great agility.",
  
  // Fey
  "Dryad": "Dryads are deeply connected to nature and the trees they protect. They rarely leave their forests and are fiercely protective of their territory and the creatures that live within it.",
  "Satyr": "Satyrs are often found in wild, untamed areas where they can indulge in their love of freedom and pleasure. They are excellent musicians and often use their pipes to charm and control others.",
  "Sprite": "Sprites are tiny fey creatures that live in forests and meadows. They are mischievous but generally good-natured, and often serve as messengers or scouts for more powerful fey.",
  
  // Giants
  "Hill Giant": "Hill giants are the most common and least intelligent of the giant races. They live in simple communities and often raid nearby settlements for food and treasure.",
  "Frost Giant": "Frost giants are native to cold regions and are well-adapted to freezing temperatures. They are excellent hunters and often keep giant animals as pets and mounts.",
  "Fire Giant": "Fire giants dwell in volcanic regions and are master smiths. They are known for their skill with metalworking and often create powerful magical weapons and armor.",
  "Stone Giant": "Stone giants prefer to live in mountainous regions and are deeply connected to the earth. They are excellent climbers and often build their homes in caves or on mountain peaks.",
  
  // Monstrosities
  "Owlbear": "Owlbears are believed to be the result of magical experimentation, combining the strength of a bear with the hunting instincts of an owl. They are solitary creatures that prefer dense forests.",
  "Mimic": "Mimics are often found in dungeons and ruins where they can easily blend in with the surroundings. They are patient hunters that can wait for days or weeks for the perfect opportunity to strike.",
  "Gorgon": "Gorgons are believed to be the result of ancient magical experiments. They are incredibly rare and are often found guarding ancient treasures or sacred sites.",
  
  // Aberrations
  "Beholder": "Beholders are native to the Underdark and are known for their xenophobia and paranoia. Each beholder believes it is unique and perfect, and they often war with other beholders over minor differences.",
  "Mind Flayer": "Mind flayers are native to the Underdark and often establish vast underground empires. They are excellent psions and use their mental powers to control and manipulate other creatures.",
  "Aboleth": "Aboleths are ancient creatures that have existed since before the gods. They dwell in deep underground lakes and rivers, where they plot to regain their lost empire.",
  
  // Celestials
  "Angel": "Angels serve the gods and protect the forces of good. They are often sent to the Material Plane to aid worthy mortals or to combat powerful evil.",
  "Deva": "Devas are divine servants who carry out the will of the gods. They are often sent to guide mortals or to deliver important messages.",
  "Solar": "Solars are the most powerful angels, serving as generals in the armies of good. They are rarely seen on the Material Plane, appearing only in times of great need.",
  
  // Oozes
  "Gelatinous Cube": "Gelatinous cubes are mindless creatures that slowly move through dungeons and caves, consuming everything in their path. They are often used by dungeon builders as living garbage disposals.",
  "Black Pudding": "Black puddings are highly acidic creatures that can dissolve most materials. They are often found in areas where powerful magic has corrupted the environment.",
  "Ochre Jelly": "Ochre jellies are simple creatures that feed on organic matter. They are often found in dungeons and caves where they can find a steady supply of food.",
  
  // Plants
  "Awakened Tree": "Awakened trees are ancient trees that have been given consciousness through powerful magic. They are deeply connected to the forest and often serve as guardians or advisors.",
  "Shambling Mound": "Shambling mounds are created when lightning strikes a swamp or marsh. They are composed of rotting vegetation and are often found in areas where powerful storms have occurred.",
  "Violet Fungus": "Violet fungi are dangerous plants that release toxic spores. They are often found in dark, damp areas where they can spread their spores effectively.",
  
  // Swarms
  "Swarm of Rats": "Rat swarms are common in urban areas where food is plentiful. They are dangerous in large numbers and can quickly overwhelm unprepared adventurers.",
  "Swarm of Bats": "Bat swarms are often found in caves and dark places. They are highly sensitive to sound and will attack anything that disturbs their roost.",
  "Swarm of Insects": "Insect swarms can be found in almost any environment. They are often attracted to light and can be extremely dangerous if they contain poisonous or disease-carrying insects."
};

// Function to add better backgrounds to monster data
function addBetterBackgrounds() {
  const monsterTypes = [
    'aberration', 'beast', 'celestial', 'construct', 'dragon', 
    'elemental', 'fey', 'fiend', 'giant', 'humanoid', 
    'monstrosity', 'ooze', 'plant', 'swarm', 'undead'
  ];
  
  let totalProcessed = 0;
  let totalAdded = 0;
  
  monsterTypes.forEach(type => {
    const filePath = path.join(__dirname, '..', 'src', 'data', 'monsters', `${type}.ts`);
    
    if (fs.existsSync(filePath)) {
      console.log(`Processing ${type} monsters...`);
      
      // Read the file content
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Find monsters that don't have backgrounds and add them
      Object.keys(BETTER_BACKGROUNDS).forEach(monsterName => {
        // Look for the monster in the file
        const monsterPattern = new RegExp(`"name":\\s*"${monsterName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*?}(?=\\s*,|\\s*\\])`, 'gs');
        const matches = content.match(monsterPattern);
        
        if (matches) {
          matches.forEach(match => {
            // Check if this monster already has a background
            if (!match.includes('"background"')) {
              // Add the background before the closing brace
              const newBackground = `,\n    "background": "${BETTER_BACKGROUNDS[monsterName]}"`;
              const updatedMatch = match.replace(/}(?=\s*,|\s*\])/, `${newBackground}\n  }`);
              
              // Replace the original match with the updated one
              content = content.replace(match, updatedMatch);
              totalAdded++;
              console.log(`  ✅ Added background for ${monsterName}`);
            }
          });
        }
      });
      
      // Write the updated file
      fs.writeFileSync(filePath, content, 'utf8');
      totalProcessed++;
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`Files processed: ${totalProcessed}`);
  console.log(`Backgrounds added: ${totalAdded}`);
  console.log(`\n🎉 Better backgrounds added successfully!`);
}

// Run the script
if (require.main === module) {
  console.log('🚀 Starting to add better backgrounds...\n');
  addBetterBackgrounds();
} 