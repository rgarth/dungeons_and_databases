const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  batch: 1, // default batch size (testing)
  start: 0,  // start from this index
  list: false, // just list missing images
  help: false,
  type: null, // filter by monster type
  force: false, // force overwrite existing images
  customPrompt: null, // custom prompt to append
  replacePrompt: null, // custom prompt to replace entire prompt
  customNegativePrompt: null, // custom negative prompt to append
  monster: null // specific monster name
};

// Parse command line arguments
for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '--batch':
    case '-b':
      options.batch = parseInt(args[++i]) || 1;
      break;
    case '--start':
    case '-s':
      options.start = parseInt(args[++i]) || 0;
      break;
    case '--list':
    case '-l':
      options.list = true;
      break;
    case '--type':
    case '-t':
      options.type = args[++i];
      break;
    case '--help':
    case '-h':
      options.help = true;
      break;
    case '--force':
    case '-f':
      options.force = true;
      break;
    case '--prompt':
    case '-p':
      options.customPrompt = args[++i];
      break;
    case '--replace-prompt':
    case '-P':
      options.replacePrompt = args[++i];
      break;
    case '--negative-prompt':
    case '-n':
      options.customNegativePrompt = args[++i];
      break;
    case '--monster':
    case '-m':
      options.monster = args[++i];
      break;
  }
}

// Show help
if (options.help) {
  console.log(`
🐉 Monster Image Generator

Usage: node generate-monster-images.js [options]

Options:
  -b, --batch <number>  Number of monsters to process (default: 1)
  -s, --start <number>  Start from this monster index (default: 0)
  -t, --type <type>     Filter by monster type (e.g., dragon, humanoid, beast)
  -m, --monster <name>  Generate image for specific monster by name
  -p, --prompt <text>   Add custom prompt text to the generation
  -P, --replace-prompt <text>  Replace entire prompt with custom text
  -n, --negative-prompt <text>  Add custom negative prompt text
  -f, --force          Force overwrite existing images
  -l, --list           Just list missing images without generating
  -h, --help           Show this help message

Examples:
  node generate-monster-images.js                    # Process first monster
  node generate-monster-images.js -b 5               # Process 5 monsters
  node generate-monster-images.js -s 10 -b 5         # Process monsters 10-14
  node generate-monster-images.js -t dragon          # Process only dragons
  node generate-monster-images.js -m "Ghost"         # Generate specific monster
  node generate-monster-images.js -m "Ghost" -f      # Force regenerate Ghost
  node generate-monster-images.js -m "Ghost" -p "ethereal, translucent, floating" # Add to prompt
  node generate-monster-images.js -m "Ghost" -P "A beautiful ethereal ghost floating in a misty forest" # Replace prompt
  node generate-monster-images.js -m "Ghost" -n "blood, gore, scary" # Custom negative prompt
  node generate-monster-images.js -l                 # List missing images
`);
  process.exit(0);
}

// Load monster data from TypeScript files using tsx
function loadMonsterData() {
  try {
    console.log('📚 Loading monster data from TypeScript files...');
    
    // Create a temporary script to export monster data as JSON
    const tempScript = `
import { monstersData } from '../src/data/monsters/index';
console.log(JSON.stringify(monstersData));
`;
    
    const tempScriptPath = path.join(__dirname, 'temp-monster-loader.ts');
    fs.writeFileSync(tempScriptPath, tempScript);
    
    // Run the TypeScript script with tsx
    const output = execSync(`npx tsx ${tempScriptPath}`, { 
      cwd: __dirname,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    // Clean up temp file
    fs.unlinkSync(tempScriptPath);
    
    // Parse the JSON output
    const monsters = JSON.parse(output.trim());
    
    console.log(`✅ Loaded ${monsters.length} monsters from TypeScript files`);
    
    // Filter by type if specified
    if (options.type) {
      const filteredMonsters = monsters.filter(monster => 
        monster.type.toLowerCase() === options.type.toLowerCase()
      );
      console.log(`🔍 Filtered to ${filteredMonsters.length} ${options.type} monsters`);
      return filteredMonsters;
    }
    
    return monsters;
  } catch (error) {
    console.error('❌ Error loading monster data:', error.message);
    console.error('💡 Make sure TypeScript files are properly formatted and tsx is available');
    process.exit(1);
  }
}

// Configuration
const OUTPUT_DIR = path.join(__dirname, '../public/monster-images');
const PROMPT_PREFIX = "DND, FANTASY, PHOTO REALISTIC, MONSTER, 5e, SRD, DUNGEON AND DRAGONS ";

// Anti-bias and diversity constants (from avatar generation)
const SKIN_TONES = [
  'black skin', 'dark brown skin', 'brown skin', 'light brown skin', 
  'olive skin', 'tan skin'
];

const ETHNICITIES = [
  'African', 'African American', 'Asian', 'Chinese', 'Japanese', 'Korean', 
  'Indian', 'Middle Eastern', 'Indigenous', 'Native American', 'Pacific Islander',
  'Hispanic', 'Latino', 'Caribbean', 'Mediterranean'
];

const BODY_TYPES = [
  'average build', 'slender frame', 'compact frame',
  'average stature', 'lean build', 'average physique'
];

const GENDERS = [
  'male', 'female'
];

// Utility function to get random item from array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Function to generate contextual background for monster type
function generateContextualBackground(monsterType, monsterName) {
  // Special handling for aquatic creatures - ocean backgrounds
  if (monsterName.toLowerCase().includes('dragon turtle') || 
      monsterName.toLowerCase().includes('shark') || 
      monsterName.toLowerCase().includes('killer whale') ||
      monsterName.toLowerCase().includes('orca') ||
      monsterName.toLowerCase().includes('sea horse') ||
      monsterName.toLowerCase().includes('seahorse') ||
      monsterName.toLowerCase().includes('octopus') ||
      monsterName.toLowerCase().includes('quipper') ||
      monsterName.toLowerCase().includes('fish') ||
      monsterName.toLowerCase().includes('merfolk') ||
      monsterName.toLowerCase().includes('sahuagin')) {
    const aquaticBackgrounds = [
      'deep ocean depths with coral reefs and ancient shipwrecks',
      'underwater cavern with bioluminescent creatures and flowing currents',
      'coastal waters with crashing waves and rocky formations',
      'submerged temple ruins with seaweed and marine life',
      'abyssal trench with mysterious deep-sea creatures',
      'crystal clear ocean waters with sunlight filtering through',
      'underwater kelp forest with swaying seaweed and marine life'
    ];
    return getRandomItem(aquaticBackgrounds);
  }
  
  // Special handling for scorpions - desert backgrounds
  if (monsterName.toLowerCase().includes('scorpion')) {
    const desertBackgrounds = [
      'desert dunes with scorching sun and wind-swept sand',
      'rocky desert landscape with cacti and sparse vegetation',
      'desert oasis with palm trees and water',
      'arid wasteland with cracked earth and heat waves',
      'desert canyon with red rock formations and shadows'
    ];
    return getRandomItem(desertBackgrounds);
  }
  
  // Special handling for arctic creatures - tundra backgrounds
  if (monsterName.toLowerCase().includes('polar bear') ||
      monsterName.toLowerCase().includes('mammoth') ||
      monsterName.toLowerCase().includes('yeti') ||
      monsterName.toLowerCase().includes('frost') ||
      monsterName.toLowerCase().includes('winter wolf') ||
      monsterName.toLowerCase().includes('ice')) {
    const arcticBackgrounds = [
      'arctic tundra with snow and ice formations',
      'frozen wasteland with blowing snow and icy rocks',
      'glacier with deep crevasses and blue ice',
      'snow-covered forest with frosted trees and mist',
      'ice cave with icicles and shimmering walls'
    ];
    return getRandomItem(arcticBackgrounds);
  }
  
  // Special handling for plesiosaurus - ocean backgrounds
  if (monsterName.toLowerCase().includes('plesiosaurus')) {
    const oceanBackgrounds = [
      'deep ocean depths with coral reefs and ancient shipwrecks',
      'underwater cavern with bioluminescent creatures and flowing currents',
      'coastal waters with crashing waves and rocky formations',
      'submerged temple ruins with seaweed and marine life',
      'abyssal trench with mysterious deep-sea creatures',
      'crystal clear ocean waters with sunlight filtering through',
      'underwater kelp forest with swaying seaweed and marine life',
      'deep sea floor with volcanic vents and strange creatures',
      'underwater city ruins with stone structures and marine growth'
    ];
    return getRandomItem(oceanBackgrounds);
  }
  
  // Special handling for warhorse skeleton - battlefield/cemetery backgrounds
  if (monsterName.toLowerCase().includes('warhorse skeleton')) {
    const warhorseSkeletonBackgrounds = [
      'ancient battlefield with scattered bones and rusted weapons',
      'deserted cemetery with crumbling tombstones and fog',
      'abandoned battlefield with fallen soldiers and horses',
      'dark catacombs with bone-lined walls and eerie silence',
      'forgotten temple with ancient runes and decay',
      'shadowy graveyard with twisted trees and moonlight',
      'ancient ruins with scattered skeletons and dust',
      'cursed battlefield with spectral mists and death'
    ];
    return getRandomItem(warhorseSkeletonBackgrounds);
  }
  
  // Special handling for sahuagin - underwater backgrounds
  if (monsterName.toLowerCase().includes('sahuagin')) {
    const sahuaginBackgrounds = [
      'deep ocean depths with coral reefs and ancient shipwrecks',
      'underwater cavern with bioluminescent creatures and flowing currents',
      'submerged temple ruins with seaweed and marine life',
      'abyssal trench with mysterious deep-sea creatures',
      'crystal clear ocean waters with sunlight filtering through',
      'underwater kelp forest with swaying seaweed and marine life',
      'deep sea floor with volcanic vents and strange creatures',
      'underwater city ruins with stone structures and marine growth'
    ];
    return getRandomItem(sahuaginBackgrounds);
  }
  
  // Special handling for veterans - battlefield/military backgrounds
  if (monsterName.toLowerCase().includes('veteran')) {
    const veteranBackgrounds = [
      'battlefield with scattered weapons and armor',
      'military camp with tents and campfires',
      'fortress walls with defensive positions',
      'war-torn village with smoke and destruction',
      'training grounds with weapon racks and targets',
      'castle courtyard with military banners',
      'abandoned battlefield with fallen soldiers',
      'military outpost with watchtowers and fortifications'
    ];
    return getRandomItem(veteranBackgrounds);
  }
  
  // Special handling for were-creatures (lycanthropes) - forest/natural backgrounds
  if (monsterName.toLowerCase().includes('were')) {
    const wereBackgrounds = [
      'dark forest clearing with moonlight filtering through trees',
      'misty woodland with ancient trees and fallen logs',
      'rocky mountain pass with sparse vegetation and moonlight',
      'abandoned village outskirts with overgrown vegetation',
      'forest edge with dense undergrowth and shadowy trees',
      'moonlit meadow with tall grass and scattered rocks',
      'dark cave entrance with forest surroundings',
      'ancient ruins overgrown with vines and moss'
    ];
    return getRandomItem(wereBackgrounds);
  }
  
  // Special handling for grimlocks - Underdark backgrounds
  if (monsterName.toLowerCase().includes('grimlock')) {
    const underdarkBackgrounds = [
      'dark underground cave with stalactites and glowing fungi',
      'deep Underdark cavern with bioluminescent mushrooms and stone formations',
      'underground tunnel with dripping water and ancient stone walls',
      'dark cave system with crystal formations and underground streams',
      'Underdark chamber with massive stalagmites and eerie shadows'
    ];
    return getRandomItem(underdarkBackgrounds);
  }
  const backgrounds = {
    'dragon': [
      'ancient dragon lair with massive treasure hoard, golden coins, and scattered bones',
      'towering mountain peak with storm clouds, lightning, and jagged rocks',
      'volcanic cavern with flowing lava rivers, obsidian formations, and fire',
      'ruined castle tower with broken stone walls, shattered windows, and ancient banners',
      'dark cave with massive stalactites, glowing crystals, and underground streams',
      'cliffside perch overlooking a vast valley with mist and distant mountains',
      'ancient temple ruins with crumbling pillars and mystical energy',
      'deep ocean depths with coral reefs and ancient shipwrecks',
      'underwater cavern with bioluminescent creatures and flowing currents',
      'coastal waters with crashing waves and rocky formations'
    ],
    'humanoid': [
      'medieval tavern with wooden tables and firelight',
      'stone dungeon corridor with torch lighting',
      'forest clearing with ancient trees and dappled sunlight',
      'abandoned village with thatched roofs and cobblestone streets',
      'castle courtyard with stone walls and banners',
      'sewer tunnel with dripping water and moss-covered walls',
      'underground crypt with stone sarcophagi and flickering candles'
    ],
    'beast': [
      'dense forest with towering trees and undergrowth',
      'rocky mountainside with sparse vegetation',
      'swamp with murky water and twisted trees',
      'desert dunes with scorching sun and wind-swept sand',
      'arctic tundra with snow and ice formations',
      'cave system with stalactites and underground streams',
      'grassland plains with tall grass and scattered rocks'
    ],
    'undead': [
      'ancient cemetery with crumbling tombstones and fog',
      'underground crypt with stone coffins and cobwebs',
      'abandoned castle with rotting tapestries and dust',
      'dark catacombs with bone-lined walls and eerie silence',
      'forgotten temple with ancient runes and decay',
      'shadowy graveyard with twisted trees and moonlight'
    ],
    'fiend': [
      'hellish landscape with fire and brimstone',
      'infernal fortress with obsidian walls and lava flows',
      'corrupted temple with demonic symbols and dark energy',
      'abyssal plane with swirling chaos and nightmare creatures',
      'burning battlefield with smoke and destruction',
      'dark ritual chamber with pentagrams and candles'
    ],
    'celestial': [
      'heavenly realm with golden light and floating islands',
      'divine temple with marble columns and holy radiance',
      'cloudy sky with angelic choirs and divine light',
      'sacred grove with pure white flowers and healing energy',
      'celestial palace with crystal spires and golden gates'
    ],
    'construct': [
      'ancient workshop with magical tools and glowing runes',
      'underground laboratory with mechanical devices',
      'wizard\'s tower with arcane equipment and spell books',
      'dwarven forge with anvils and magical fires',
      'abandoned factory with rusted machinery and steam'
    ],
    'elemental': [
      'elemental plane with pure elemental energy',
      'volcanic landscape with fire and molten rock',
      'stormy sky with lightning and thunder clouds',
      'crystal cave with prismatic light and gem formations',
      'ocean depths with swirling currents and coral reefs',
      'wind-swept mountain peak with howling gales'
    ],
    'fey': [
      'enchanted forest with glowing mushrooms and fairy lights',
      'fey realm with impossible geometry and magical flora',
      'moonlit grove with silver trees and ethereal mist',
      'whimsical garden with talking flowers and floating islands',
      'ancient circle of standing stones with mystical energy'
    ],
    'giant': [
      'mountain peak with storm clouds and lightning',
      'giant stronghold with massive stone walls',
      'frozen wasteland with ice and snow',
      'volcanic landscape with fire and destruction',
      'ancient battlefield with massive weapons and ruins'
    ],
    'monstrosity': [
      'dark forest with twisted trees and shadows',
      'abandoned laboratory with failed experiments',
      'ancient ruins with forbidden knowledge',
      'corrupted landscape with unnatural features',
      'nightmare realm with impossible creatures'
    ],
    'ooze': [
      'underground cavern with dripping water and slime',
      'sewer system with flowing waste and moisture',
      'abandoned laboratory with chemical spills',
      'cave system with underground pools and algae',
      'corrupted area with unnatural growths and decay'
    ],
    'plant': [
      'dense jungle with massive trees and vines',
      'enchanted forest with sentient plants',
      'overgrown ruins with nature reclaiming stone',
      'swamp with carnivorous plants and murky water',
      'ancient grove with massive trees and magical flora'
    ],
    'aberration': [
      'alien landscape with impossible geometry',
      'cosmic void with stars and swirling energy',
      'corrupted reality with warped space and time',
      'eldritch temple with otherworldly architecture',
      'nightmare dimension with impossible creatures'
    ]
  };

  const typeBackgrounds = backgrounds[monsterType.toLowerCase()] || backgrounds['humanoid'];
  return getRandomItem(typeBackgrounds);
}

// Function to generate prompt for a monster
function generateMonsterPrompt(monster) {
  // Create a detailed description based on monster data
  // Skip monster name for gnomes to avoid garden gnome confusion
  let description = monster.name.toLowerCase().includes('gnome') ? '' : monster.name;
  
  // Add size and type information (special handling for Wyvern and Gnomes)
  if (monster.name.toLowerCase().includes('wyvern')) {
    description += `, a ${monster.size.toLowerCase()} wyvern`;
  } else if (monster.name.toLowerCase().includes('gnome')) {
    description += `A ${monster.size.toLowerCase()} ${monster.type}`;
  } else {
    description += `, a ${monster.size.toLowerCase()} ${monster.type}`;
  }
  
  // Add alignment if not unaligned
  if (monster.alignment && monster.alignment !== 'unaligned') {
    description += `, ${monster.alignment}`;
  }
  
  // Add challenge rating
  description += `, challenge rating ${monster.challengeRating}`;
  
  // Special handling for Wyvern - MUST be processed BEFORE dragon type
  if (monster.name.toLowerCase().includes('wyvern')) {
    description += `. WYVERN: Giant bat-like creature with leathery wings as front limbs, two hind legs only, long venomous stinger tail. Bat anatomy: wings replace front legs, hind legs for walking. NO front legs, NO four legs. Aggressive, bestial, dangerous, photorealistic, detailed textures`;
  }
  // Add detailed physical characteristics based on type
  else switch (monster.type.toLowerCase()) {
    case 'dragon':
      // Special handling for wyrmlings
      if (monster.name.toLowerCase().includes('wyrmling')) {
        description += `. Young dragon wyrmling, just hatched, about the size of a large wolf. Small, round features, big bright eyes, soft scales, playful and curious, gentle expression, almost cute, not yet fully grown, innocent and harmless appearance, hatchling dragon, adorable, baby dragon, photorealistic, fantasy, D&D`;
      }
      // Special handling for Dragon Turtle - emphasize dragon head and tail
      else if (monster.name.toLowerCase().includes('dragon turtle')) {
        description += `. Majestic dragon turtle with dragon-like head, long dragon tail, massive shell, detailed scales, sharp claws, and powerful presence. Dragon head with horns and fangs, long serpentine dragon tail, turtle shell body, photorealistic, detailed textures, imposing figure`;
      } else {
        description += `. Majestic dragon with detailed scales, large wings, sharp claws, and powerful presence. Single dragon in frame, photorealistic, detailed textures, imposing figure`;
      }
      break;
    case 'humanoid':
      // Special handling for sahuagin - shark people
      if (monster.name.toLowerCase().includes('sahuagin')) {
        description += `. Single sahuagin, shark-humanoid hybrid, shark-like head with sharp teeth, dorsal fin, webbed hands and feet, scaly skin, predatory features, aquatic humanoid, photorealistic, detailed textures`;
      }
      // Special handling for veterans - old and scarred
      else if (monster.name.toLowerCase().includes('veteran')) {
        const gender = getRandomItem(GENDERS);
        const skinTone = getRandomItem(SKIN_TONES);
        const ethnicity = getRandomItem(ETHNICITIES);
        const bodyType = getRandomItem(BODY_TYPES);
        
        // Determine if it's a half-dragon veteran
        const isHalfDragon = monster.name.toLowerCase().includes('dragon');
        
        if (isHalfDragon) {
          // Half-dragon veteran: old, scarred, with dragon features
          description += `. Single ${gender} half-dragon veteran, ${ethnicity} with ${skinTone}, ${bodyType}, aged and weathered appearance, numerous battle scars, dragon-like features, battered armor, experienced warrior, photorealistic, detailed textures`;
        } else {
          // Regular veteran: old, scarred, battle-hardened
          description += `. Single ${gender} veteran, ${ethnicity} with ${skinTone}, ${bodyType}, aged and weathered appearance, numerous battle scars, grizzled features, battered armor, experienced warrior, photorealistic, detailed textures`;
        }
      }
      // Special handling for were-creatures (lycanthropes)
      else if (monster.name.toLowerCase().includes('were')) {
        const gender = getRandomItem(GENDERS);
        const skinTone = getRandomItem(SKIN_TONES);
        const ethnicity = getRandomItem(ETHNICITIES);
        const bodyType = getRandomItem(BODY_TYPES);
        
        // Determine the animal type and form
        let animalType = '';
        let formType = '';
        
        if (monster.name.toLowerCase().includes('werebear')) {
          animalType = 'bear';
        } else if (monster.name.toLowerCase().includes('wereboar')) {
          animalType = 'boar';
        } else if (monster.name.toLowerCase().includes('wererat')) {
          animalType = 'rat';
        } else if (monster.name.toLowerCase().includes('weretiger')) {
          animalType = 'tiger';
        } else if (monster.name.toLowerCase().includes('werewolf')) {
          animalType = 'wolf';
        }
        
        if (monster.name.toLowerCase().includes('human form')) {
          formType = 'human';
        } else if (monster.name.toLowerCase().includes('hybrid form')) {
          formType = 'hybrid';
        } else if (monster.name.toLowerCase().includes(`${animalType} form`)) {
          formType = 'animal';
        }
        
        // Generate appropriate description based on form
        if (formType === 'human') {
          // Human form: mostly human with subtle animal features
          description += `. Single ${gender} human, ${ethnicity} with ${skinTone}, ${bodyType}, mostly human appearance with very subtle ${animalType} features, perhaps slightly pointed ears or animalistic eyes, wearing medieval fantasy clothing, realistic human proportions, detailed facial features`;
        } else if (formType === 'hybrid') {
          // Hybrid form: classic were-creature look
          description += `. Single ${gender} were-${animalType} in hybrid form, humanoid body with ${animalType} head, fur-covered body, sharp claws, fangs, muscular build, savage appearance, detailed textures, photorealistic were-creature`;
        } else if (formType === 'animal') {
          // Animal form: should look like the actual animal
          if (animalType === 'bear') {
            description += `. Single brown bear, massive furry body, powerful build, four legs, realistic bear anatomy, photorealistic wild animal`;
          } else if (animalType === 'boar') {
            description += `. Single wild boar, muscular body with bristly fur, sharp tusks, four legs, realistic boar anatomy, photorealistic wild animal`;
          } else if (animalType === 'rat') {
            description += `. Single giant rat, large rodent with long tail, sharp teeth, four legs, realistic rat anatomy, photorealistic animal`;
          } else if (animalType === 'tiger') {
            description += `. Single tiger, striped orange fur, powerful feline body, four legs, realistic tiger anatomy, photorealistic wild animal`;
          } else if (animalType === 'wolf') {
            description += `. Single wolf, grey fur, lean canine body, four legs, realistic wolf anatomy, photorealistic wild animal`;
          }
        }
      }
      // Special handling for grimlocks - primitive cavemen, no armor
      else if (monster.name.toLowerCase().includes('grimlock')) {
        const gender = getRandomItem(GENDERS);
        description += `. Single primitive ${gender} human, grey-skinned with leathery skin, caveman-like features, balding with greasy black long hair, wearing only rough loincloth or simple pants, no shirt, no armor, absolutely NO HORNS, primitive appearance`;
      } else {
        // Add ethnic diversity and anti-trope language for other humanoids
        const skinTone = getRandomItem(SKIN_TONES);
        const ethnicity = getRandomItem(ETHNICITIES);
        const bodyType = getRandomItem(BODY_TYPES);
        const gender = getRandomItem(GENDERS);
        
        // Determine appropriate clothing based on monster name/type
        let clothing = 'medieval fantasy clothing';
        if (monster.name.toLowerCase().includes('veteran')) {
          clothing = 'battered armor and worn military clothing';
        } else if (monster.name.toLowerCase().includes('mage') || monster.name.toLowerCase().includes('wizard') || monster.name.toLowerCase().includes('sorcerer')) {
          clothing = 'mystical robes and arcane clothing';
        } else if (monster.name.toLowerCase().includes('acolyte') || monster.name.toLowerCase().includes('priest') || monster.name.toLowerCase().includes('cleric')) {
          clothing = 'religious vestments and holy robes';
        } else if (monster.name.toLowerCase().includes('cult') || monster.name.toLowerCase().includes('fanatic')) {
          clothing = 'cult robes and dark ceremonial clothing';
        } else if (monster.name.toLowerCase().includes('guard') || monster.name.toLowerCase().includes('soldier') || monster.name.toLowerCase().includes('knight')) {
          clothing = 'practical armor and military clothing';
        } else if (monster.name.toLowerCase().includes('bandit') || monster.name.toLowerCase().includes('thug') || monster.name.toLowerCase().includes('brigand')) {
          clothing = 'rough leather clothing and practical gear';
        } else if (monster.name.toLowerCase().includes('noble') || monster.name.toLowerCase().includes('lord') || monster.name.toLowerCase().includes('lady')) {
          clothing = 'fine noble clothing and elegant attire';
        } else if (monster.name.toLowerCase().includes('peasant') || monster.name.toLowerCase().includes('commoner')) {
          clothing = 'simple peasant clothing and basic attire';
        }
        
        description += `. Single ${gender} humanoid character, ${ethnicity} with ${skinTone}, ${bodyType}, detailed facial features, realistic proportions, ${clothing}, weathered skin, expressive face, respectful character design, realistic medieval attire`;
      }
      break;
    case 'beast':
      // Special handling for axe beak - two-legged flightless bird
      if (monster.name.toLowerCase().includes('axe beak')) {
        description += `. Single axe beak, large flightless bird with two powerful legs, long neck, MASSIVE WIDE FLAT ORGANIC BEAK made of keratin, shaped like a hatchet blade but natural and organic, broad and flat like a weapon blade but made of bone-like material, NOT a narrow bird beak, NOT metal or shiny, beak is the primary weapon and most prominent feature, ostrich-like body, feathered body, no wings, two-legged stance, prehistoric bird, photorealistic, anatomically correct flightless bird with organic weapon-shaped beak`;
      }
      // Special handling for aquatic beasts
      else if (monster.name.toLowerCase().includes('shark')) {
        description += `. Single predatory shark, sleek streamlined body, sharp triangular teeth, powerful jaws, dark eyes, swimming in ocean waters, photorealistic marine predator`;
      } else if (monster.name.toLowerCase().includes('killer whale') || monster.name.toLowerCase().includes('orca')) {
        description += `. Single killer whale, black and white coloring, powerful streamlined body, swimming in ocean waters, photorealistic marine mammal`;
      } else if (monster.name.toLowerCase().includes('sea horse') || monster.name.toLowerCase().includes('seahorse')) {
        description += `. Single seahorse fish, elongated body with curled tail, colorful scales, seahorse head with tubular snout, underwater in ocean depths, photorealistic marine creature`;
      } else if (monster.name.toLowerCase().includes('plesiosaurus')) {
        description += `. Single plesiosaurus, long-necked marine dinosaur, massive body with four flippers, extremely long serpentine neck, small head, swimming underwater in ocean depths, prehistoric marine reptile, photorealistic, anatomically correct plesiosaur`;
      } else if (monster.name.toLowerCase().includes('scorpion')) {
        description += `. Single scorpion, segmented body, two large pincers, long segmented tail curled over back with venomous stinger at tip, armored exoskeleton, desert environment, photorealistic arachnid, anatomically correct scorpion`;
      } else if (monster.name.toLowerCase().includes('mammoth')) {
        description += `. Single mammoth, hairy elephant with thick fur, long curved tusks, four legs, trunk, mammoth anatomy, prehistoric elephant, photorealistic, anatomically correct`;
      } else if (monster.name.toLowerCase().includes('polar bear')) {
        description += `. Single polar bear, massive white bear with thick fur, powerful build, four legs, arctic predator, photorealistic, anatomically correct`;
      } else if (monster.name.toLowerCase().includes('mule')) {
        description += `. Single mule, donkey-like animal with long ears, gray or brown fur, four legs, sturdy build, pack animal, realistic equine anatomy, photorealistic`;
      } else if (monster.name.toLowerCase().includes('octopus')) {
        description += `. Single octopus, eight tentacles, bulbous head, large intelligent eyes, soft body, marine creature, underwater environment, photorealistic cephalopod`;
      } else if (monster.name.toLowerCase().includes('quipper')) {
        description += `. Single quipper fish, carnivorous piranha-like fish with sharp teeth, streamlined body, aggressive predatory fish, underwater environment, photorealistic freshwater fish`;
      } else if (monster.name.toLowerCase().includes('stirge')) {
        description += `. Single stirge, bat-mosquito hybrid with leathery wings, sharp pincers on legs, long needle-like proboscis, flying vampire creature, photorealistic flying monster`;
      } else if (monster.name.toLowerCase().includes('fish') || monster.speed?.swim) {
        description += `. Single fish, streamlined body, gills, fins, underwater creature, marine environment, photorealistic aquatic animal`;
      } else if (monster.name.toLowerCase().includes('panther')) {
        description += `. Single panther, solid black fur, melanistic big cat, no spots, sleek and muscular, large feline, photorealistic, anatomically correct, black jaguar or black leopard`;
      } else {
        description += `. Single animal creature, natural fur or scales, realistic anatomy, wild eyes, natural pose, detailed textures`;
      }
      break;
    case 'undead':
      // Special handling for warhorse skeleton - four-legged horse skeleton
      if (monster.name.toLowerCase().includes('warhorse skeleton')) {
        description += `. Single warhorse skeleton, four-legged horse skeleton, bony equine form, skeletal horse anatomy, four legs, horse skull, rib cage, spine, leg bones, undead horse, photorealistic, detailed textures`;
      } else {
        description += `. Single undead creature, pale or decayed skin, hollow eyes, tattered clothing, supernatural aura, eerie atmosphere`;
      }
      break;
    case 'fiend':
      description += `. Single demonic creature, infernal features, horns, dark skin, glowing eyes, menacing expression, hellish aura`;
      break;
    case 'celestial':
      description += `. Single angelic being, divine radiance, ethereal beauty, holy aura, wings, pure white or golden features`;
      break;
    case 'construct':
      // Special handling for specific constructs
      if (monster.name.toLowerCase().includes('rug of smothering')) {
        description += `. Single magical rug, decorative floor covering, ornate patterns, lying on floor`;
      } else if (monster.name.toLowerCase().includes('flying sword')) {
        description += `. Single magical sword, floating weapon, no wielder, no mechanical parts`;
      } else {
        description += `. Single mechanical construct, metallic surfaces, magical runes, artificial joints, glowing eyes, imposing structure`;
      }
      break;
    case 'elemental':
      description += `. Single elemental being, composed of pure elements, flowing forms, natural energy, ethereal appearance`;
      break;
    case 'fey':
      description += `. Single fey creature, ethereal beauty, magical aura, pointed features, otherworldly appearance, mystical energy`;
      break;
    case 'giant':
      description += `. Single massive giant, imposing stature, muscular build, primitive clothing, weathered features, towering presence`;
      break;
    case 'monstrosity':
      // Special handling for specific monstrosities that aren't "monstrous"
      if (monster.name.toLowerCase().includes('centaur')) {
        description += `. Single fantasy centaur, noble creature, half human half horse`;
      } else if (monster.name.toLowerCase().includes('hippogriff')) {
        description += `. Single fantasy hippogriff, eagle front half, horse back half`;
      } else if (monster.name.toLowerCase().includes('mimic')) {
        description += `. Single shapeshifting mimic, amorphous creature`;
      } else {
        description += `. Single monstrous creature, terrifying features, unnatural anatomy, menacing expression, dark aura`;
      }
      break;
    case 'ooze':
      description += `. Single amorphous ooze, gelatinous form, translucent body, fluid movement, alien appearance`;
      break;
    case 'plant':
      description += `. Single plant creature, organic features, bark-like skin, leafy appendages, natural colors, living vegetation`;
      break;
    case 'aberration':
      // Special handling for aboleth - massive fish-like amphibian with tentacles
      if (monster.name.toLowerCase().includes('aboleth')) {
        description += `. Single aboleth, massive fish-like amphibian reaching 20-40 feet in length, bizarre eel-like body with long tubular form, lamprey-like mouth with serrated jawless teeth, four long tentacles (two on top, two on underbelly), triangular head with spherical beak-like nose, three eyes stacked vertically above nose, tendrils and shorter tentacles dangling from head, orange-pink underbelly, sea-green topside, four blue-black slime-secreting orifices along body, prehistoric aquatic aberration, photorealistic, anatomically correct aboleth`;
      }
      // Special handling for chuul - large lobster-like aberration
      else if (monster.name.toLowerCase().includes('chuul')) {
        description += `. Single chuul, large lobster-like aberration, massive crustacean body with armored exoskeleton, powerful lobster claws, many tentacles surrounding mouth that can cause paralysis, aquatic aberration with hatred for surface-dwelling creatures, prehistoric lobster monster, photorealistic, anatomically correct chuul`;
      } else {
        description += `. Single alien aberration, otherworldly features, unnatural anatomy, cosmic horror, eldritch appearance`;
      }
      break;
    default:
      description += `. Single fantasy creature, unique characteristics, detailed features, realistic appearance`;
  }
  
  // Add any existing image prompt if available (but only if it's specific, not generic)
  if (monster.imagePrompt && !monster.imagePrompt.includes('beast creature with animal-like features')) {
    // Special handling for Dragon Turtle - remove wings reference
    if (monster.name.toLowerCase().includes('dragon turtle')) {
      const correctedPrompt = monster.imagePrompt.replace(/wings?/gi, 'shell');
      description += `. ${correctedPrompt}`;
    } else {
      description += `. ${monster.imagePrompt}`;
    }
  }
  
  // Add contextual background based on specific creature type
  const background = generateContextualBackground(monster.type, monster.name);
  description += `. Located in: ${background}`;
  
  // Special handling for Wyvern background
  if (monster.name.toLowerCase().includes('wyvern')) {
    description += `. Perched menacingly in the scene, hunting for prey`;
  }
  // Special handling for dragons to emphasize the background more
  else if (monster.type.toLowerCase() === 'dragon') {
    // Special handling for Dragon Turtle - they don't perch
    if (monster.name.toLowerCase().includes('dragon turtle')) {
      description += `. Swimming majestically in the scene, dominating the environment`;
    } else {
      description += `. Perched majestically in the scene, dominating the environment`;
    }
  } 
  // Special handling for aquatic creatures
  else if (monster.name.toLowerCase().includes('shark') || 
           monster.name.toLowerCase().includes('killer whale') ||
           monster.name.toLowerCase().includes('orca') ||
           monster.name.toLowerCase().includes('sea horse') || 
           monster.name.toLowerCase().includes('seahorse') ||
           monster.name.toLowerCase().includes('octopus') ||
           monster.name.toLowerCase().includes('quipper') ||
           monster.name.toLowerCase().includes('fish')) {
    description += `. Swimming gracefully in the scene, surrounded by ocean environment`;
  } 
  // Special handling for scorpions
  else if (monster.name.toLowerCase().includes('scorpion')) {
    description += `. Crawling menacingly in the scene, surrounded by desert environment`;
  } 
  // Special handling for warhorse skeleton - four-legged positioning
  else if (monster.name.toLowerCase().includes('warhorse skeleton')) {
    description += `. Standing on four legs in the scene, skeletal horse pose`;
  }
  // Special handling for sahuagin - swimming positioning
  else if (monster.name.toLowerCase().includes('sahuagin')) {
    description += `. Swimming menacingly in the scene, surrounded by ocean environment`;
  }
  // Special handling for plesiosaurus - underwater swimming with long neck
  else if (monster.name.toLowerCase().includes('plesiosaurus')) {
    description += `. Swimming gracefully underwater in the scene, long neck extended forward, surrounded by ocean environment`;
  }
  // Special handling for aboleth - massive aquatic aberration swimming
  else if (monster.name.toLowerCase().includes('aboleth')) {
    description += `. Swimming menacingly in deep ocean depths, massive eel-like body undulating, tentacles extended, surrounded by dark underwater environment`;
  }
  // Special handling for chuul - aquatic lobster-like aberration
  else if (monster.name.toLowerCase().includes('chuul')) {
    description += `. Crawling menacingly underwater in the scene, lobster-like body with claws raised, tentacles around mouth extended, surrounded by aquatic environment`;
  }
  // Special handling for veterans - battle-ready positioning
  else if (monster.name.toLowerCase().includes('veteran')) {
    description += `. Standing in a defensive stance, battle-ready and alert`;
  }
  // Special handling for axe beaks - two-legged flightless bird positioning
  else if (monster.name.toLowerCase().includes('axe beak')) {
    description += `. Standing on two powerful legs in the scene, long neck extended, prehistoric flightless bird pose`;
  }
  // Special handling for were-creatures (lycanthropes)
  else if (monster.name.toLowerCase().includes('were')) {
    // Determine the animal type and form for positioning
    let animalType = '';
    let formType = '';
    
    if (monster.name.toLowerCase().includes('werebear')) {
      animalType = 'bear';
    } else if (monster.name.toLowerCase().includes('wereboar')) {
      animalType = 'boar';
    } else if (monster.name.toLowerCase().includes('wererat')) {
      animalType = 'rat';
    } else if (monster.name.toLowerCase().includes('weretiger')) {
      animalType = 'tiger';
    } else if (monster.name.toLowerCase().includes('werewolf')) {
      animalType = 'wolf';
    }
    
    if (monster.name.toLowerCase().includes('human form')) {
      formType = 'human';
    } else if (monster.name.toLowerCase().includes('hybrid form')) {
      formType = 'hybrid';
    } else if (monster.name.toLowerCase().includes(`${animalType} form`)) {
      formType = 'animal';
    }
    
    if (formType === 'human') {
      description += `. Standing cautiously in the scene, looking around warily`;
    } else if (formType === 'hybrid') {
      description += `. Stalking menacingly in the scene, ready to attack`;
    } else if (formType === 'animal') {
      description += `. Moving naturally in the scene, wild animal behavior`;
    }
  }
  // Special handling for flying creatures
  else if (monster.speed?.fly || monster.name.toLowerCase().includes('stirge')) {
    description += `. Flying menacingly in the scene, wings spread`;
  } else {
    description += `. Standing in the scene`;
  }
  
  // Add professional photography styling
  description += `. Professional photography, single subject, centered composition, dramatic lighting, high contrast, sharp focus, 8k resolution, photorealistic, cinematic lighting, detailed textures, realistic materials`;
  
  // Append custom prompt if provided
  if (options.customPrompt) {
    description += `. ${options.customPrompt}`;
  }
  
  // If replace prompt is provided, use it instead of the generated prompt
  if (options.replacePrompt) {
    // Skip fantasy prefix for scorpions - they should look realistic
    if (monster.name.toLowerCase().includes('scorpion')) {
      return options.replacePrompt;
    }
    return `${PROMPT_PREFIX}${options.replacePrompt}`;
  }
  
  // Skip fantasy prefix for scorpions - they should look realistic
  if (monster.name.toLowerCase().includes('scorpion')) {
    return description;
  }
  
  return `${PROMPT_PREFIX}${description}`;
}

// Function to save image data to file
async function saveImage(imageData, filename) {
  const filePath = path.join(OUTPUT_DIR, filename);
  
  // Convert base64 to buffer and save
  const buffer = Buffer.from(imageData.split(',')[1], 'base64');
  fs.writeFileSync(filePath, buffer);
  console.log(`✅ Saved: ${filename}`);
}

// Function to check if image already exists
function imageExists(filename) {
  const filePath = path.join(OUTPUT_DIR, filename);
  return fs.existsSync(filePath);
}

// Function to call Replicate API directly
async function callReplicateAPI(prompt) {
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_KEY;
  
  if (!REPLICATE_API_TOKEN) {
    throw new Error('REPLICATE_API_KEY not found in environment variables');
  }
  
  // Using Flux Schnell model for high quality images (same as avatar generator)
  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: 'black-forest-labs/flux-schnell',
      input: {
        prompt: prompt,
        go_fast: true,
        megapixels: "1",
        num_outputs: 1,
        aspect_ratio: "1:1", // Square format for monsters
        output_format: "webp",
        output_quality: 80,
        num_inference_steps: 4,
        seed: Math.floor(Math.random() * 1000000), // Random seed for variety
        negative_prompt: (() => {
          const baseNegative = "blurry, low quality, distorted, deformed, ugly, bad anatomy, watermark, signature, text, logo, multiple characters, multiple people, crowd, group, background, landscape, scenery, cartoon, anime, illustration, painting, drawing, digital art, fantasy art, multiple subjects, people, humans, characters, crowd scene, busy background, cluttered, messy, low resolution, pixelated, grainy, noise, artifacts, multiple monsters, multiple creatures, offensive stereotypes, inappropriate content, revealing clothing, impractical armor, sexualized appearance, exaggerated features, caricature, racist depictions, cultural appropriation, disrespectful portrayal, overly muscular, unrealistic proportions, objectification, fetishization, harmful tropes, problematic imagery";
          
          // Special negative prompt for Wyverns to prevent 4-legged dragons
          if (options.monster && options.monster.toLowerCase().includes('wyvern')) {
            return `${baseNegative}, four legs, four-legged, dragon with four legs, four-legged dragon, quadrupedal dragon, traditional dragon, classic dragon, four limbs, four-legged creature, dragon anatomy, four-legged monster, quadrupedal monster, four-legged beast, four-legged winged creature, four-legged flying creature, four-legged reptile, four-legged scaled creature, four-legged mythical creature, four-legged fantasy creature, four-legged monster, four-legged beast, four-legged animal, four-legged winged beast, four-legged flying beast, four-legged reptile, four-legged scaled beast, four-legged mythical beast, four-legged fantasy beast`;
          }
          
          // Special negative prompt for Grimlocks to prevent horns
          if (options.monster && options.monster.toLowerCase().includes('grimlock')) {
            return `${baseNegative}, horns, horned, antlers, demonic features, monster features, armor, medieval clothing, fancy clothing, civilized appearance, modern clothing`;
          }
          
          // Special negative prompt for Axe Beaks to prevent four-legged creatures
          if (options.monster && options.monster.toLowerCase().includes('axe beak')) {
            return `${baseNegative}, four legs, four-legged, quadrupedal, four-legged creature, four-legged animal, four-legged beast, four-legged monster, four-legged bird, four-legged dinosaur, four-legged reptile, four-legged mammal, four-legged predator, four-legged prey, four-legged carnivore, four-legged herbivore, four-legged omnivore, four-legged creature anatomy, four-legged animal anatomy, four-legged beast anatomy, four-legged monster anatomy, four-legged bird anatomy, four-legged dinosaur anatomy, four-legged reptile anatomy, four-legged mammal anatomy`;
          }
          
          // Special negative prompt for Plesiosaurus to prevent land animal features
          if (options.monster && options.monster.toLowerCase().includes('plesiosaurus')) {
            return `${baseNegative}, land animal, terrestrial, walking, standing on land, legs, feet, paws, claws, land-based, ground-dwelling, terrestrial animal, land creature, walking dinosaur, land dinosaur, terrestrial dinosaur, walking reptile, land reptile, terrestrial reptile, walking beast, land beast, terrestrial beast, walking monster, land monster, terrestrial monster, walking creature, land creature, terrestrial creature, walking animal, land animal, terrestrial animal, walking predator, land predator, terrestrial predator, walking prey, land prey, terrestrial prey, walking carnivore, land carnivore, terrestrial carnivore, walking herbivore, land herbivore, terrestrial herbivore, walking omnivore, land omnivore, terrestrial omnivore`;
          }
          
          // Special negative prompt for Axe Beaks to prevent narrow bird beaks
          if (options.monster && options.monster.toLowerCase().includes('axe beak')) {
            return `${baseNegative}, narrow beak, thin beak, pointed beak, small beak, normal bird beak, typical bird beak, standard bird beak, regular bird beak, ordinary bird beak, common bird beak, usual bird beak, conventional bird beak, traditional bird beak, classic bird beak, standard avian beak, normal avian beak, typical avian beak, regular avian beak, ordinary avian beak, common avian beak, usual avian beak, conventional avian beak, traditional avian beak, classic avian beak, narrow avian beak, thin avian beak, pointed avian beak, small avian beak, normal bird bill, typical bird bill, standard bird bill, regular bird bill, ordinary bird bill, common bird bill, usual bird bill, conventional bird bill, traditional bird bill, classic bird bill, narrow bird bill, thin bird bill, pointed bird bill, small bird bill, actual axe, actual hatchet, actual weapon, axe tool, hatchet tool, weapon tool, metal axe, metal hatchet, metal weapon, wooden axe, wooden hatchet, wooden weapon, axe handle, hatchet handle, weapon handle, axe blade, hatchet blade, weapon blade, axe head, hatchet head, weapon head, axe edge, hatchet edge, weapon edge, axe sharp, hatchet sharp, weapon sharp, axe cutting, hatchet cutting, weapon cutting, axe chopping, hatchet chopping, weapon chopping, axe swinging, hatchet swinging, weapon swinging, axe throwing, hatchet throwing, weapon throwing, axe wielding, hatchet wielding, weapon wielding, axe holding, hatchet holding, weapon holding, axe carrying, hatchet carrying, weapon carrying, axe brandishing, hatchet brandishing, weapon brandishing, axe ready, hatchet ready, weapon ready, axe prepared, hatchet prepared, weapon prepared, axe drawn, hatchet drawn, weapon drawn, axe unsheathed, hatchet unsheathed, weapon unsheathed, axe unsheathed, hatchet unsheathed, weapon unsheathed, axe drawn, hatchet drawn, weapon drawn, axe ready, hatchet ready, weapon ready, axe prepared, hatchet prepared, weapon prepared, axe brandishing, hatchet brandishing, weapon brandishing, axe carrying, hatchet carrying, weapon carrying, axe holding, hatchet holding, weapon holding, axe wielding, hatchet wielding, weapon wielding, axe throwing, hatchet throwing, weapon throwing, axe swinging, hatchet swinging, weapon swinging, axe chopping, hatchet chopping, weapon chopping, axe cutting, hatchet cutting, weapon cutting, axe sharp, hatchet sharp, weapon sharp, axe edge, hatchet edge, weapon edge, axe head, hatchet head, weapon head, axe blade, hatchet blade, weapon blade, axe handle, hatchet handle, weapon handle, wooden weapon, wooden hatchet, wooden axe, metal weapon, metal hatchet, metal axe, weapon tool, hatchet tool, axe tool, actual weapon, actual hatchet, actual axe`;
          }
          
          // Special negative prompt for Aboleths to prevent land creature features
          if (options.monster && options.monster.toLowerCase().includes('aboleth')) {
            return `${baseNegative}, land creature, terrestrial, walking, standing on land, legs, feet, paws, claws, land-based, ground-dwelling, terrestrial creature, land animal, walking aberration, land aberration, terrestrial aberration, walking monster, land monster, terrestrial monster, walking beast, land beast, terrestrial beast, walking fish, land fish, terrestrial fish, walking amphibian, land amphibian, terrestrial amphibian, walking eel, land eel, terrestrial eel, walking tentacle creature, land tentacle creature, terrestrial tentacle creature, walking cephalopod, land cephalopod, terrestrial cephalopod, walking mollusk, land mollusk, terrestrial mollusk, walking invertebrate, land invertebrate, terrestrial invertebrate, walking aquatic creature, land aquatic creature, terrestrial aquatic creature, walking marine creature, land marine creature, terrestrial marine creature, walking ocean creature, land ocean creature, terrestrial ocean creature, walking sea creature, land sea creature, terrestrial sea creature, walking water creature, land water creature, terrestrial water creature, walking underwater creature, land underwater creature, terrestrial underwater creature, walking deep sea creature, land deep sea creature, terrestrial deep sea creature, walking abyssal creature, land abyssal creature, terrestrial abyssal creature, walking benthic creature, land benthic creature, terrestrial benthic creature, walking pelagic creature, land pelagic creature, terrestrial pelagic creature, walking nektonic creature, land nektonic creature, terrestrial nektonic creature, walking planktonic creature, land planktonic creature, terrestrial planktonic creature, walking benthopelagic creature, land benthopelagic creature, terrestrial benthopelagic creature, walking demersal creature, land demersal creature, terrestrial demersal creature, walking epipelagic creature, land epipelagic creature, terrestrial epipelagic creature, walking mesopelagic creature, land mesopelagic creature, terrestrial mesopelagic creature, walking bathypelagic creature, land bathypelagic creature, terrestrial bathypelagic creature, walking abyssopelagic creature, land abyssopelagic creature, terrestrial abyssopelagic creature, walking hadopelagic creature, land hadopelagic creature, terrestrial hadopelagic creature`;
          }
          
          // Special negative prompt for Chuuls to prevent demon features
          if (options.monster && options.monster.toLowerCase().includes('chuul')) {
            return `${baseNegative}, demon, demonic, devil, infernal, hellish, fiend, demonic creature, devil creature, infernal creature, hellish creature, fiend creature, demonic monster, devil monster, infernal monster, hellish monster, fiend monster, demonic aberration, devil aberration, infernal aberration, hellish aberration, fiend aberration, demonic beast, devil beast, infernal beast, hellish beast, fiend beast, demonic humanoid, devil humanoid, infernal humanoid, hellish humanoid, fiend humanoid, demonic dragon, devil dragon, infernal dragon, hellish dragon, fiend dragon, demonic undead, devil undead, infernal undead, hellish undead, fiend undead, demonic construct, devil construct, infernal construct, hellish construct, fiend construct, demonic elemental, devil elemental, infernal elemental, hellish elemental, fiend elemental, demonic fey, devil fey, infernal fey, hellish fey, fiend fey, demonic giant, devil giant, infernal giant, hellish giant, fiend giant, demonic monstrosity, devil monstrosity, infernal monstrosity, hellish monstrosity, fiend monstrosity, demonic ooze, devil ooze, infernal ooze, hellish ooze, fiend ooze, land creature, terrestrial, walking, standing on land, legs, feet, paws, claws, land-based, ground-dwelling, terrestrial creature, land animal, walking aberration, land aberration, terrestrial aberration, walking monster, land monster, terrestrial monster, walking beast, land beast, terrestrial beast, walking fish, land fish, terrestrial fish, walking amphibian, land amphibian, terrestrial amphibian, walking lobster, land lobster, terrestrial lobster, walking crustacean, land crustacean, terrestrial crustacean, walking invertebrate, land invertebrate, terrestrial invertebrate, walking aquatic creature, land aquatic creature, terrestrial aquatic creature, walking marine creature, land marine creature, terrestrial marine creature, walking ocean creature, land ocean creature, terrestrial ocean creature, walking sea creature, land sea creature, terrestrial sea creature, walking water creature, land water creature, terrestrial water creature, walking underwater creature, land underwater creature, terrestrial underwater creature, walking deep sea creature, land deep sea creature, terrestrial deep sea creature, walking abyssal creature, land abyssal creature, terrestrial abyssal creature, walking benthic creature, land benthic creature, terrestrial benthic creature, walking pelagic creature, land pelagic creature, terrestrial pelagic creature, walking nektonic creature, land nektonic creature, terrestrial nektonic creature, walking planktonic creature, land planktonic creature, terrestrial planktonic creature, walking benthopelagic creature, land benthopelagic creature, terrestrial benthopelagic creature, walking demersal creature, land demersal creature, terrestrial demersal creature, walking epipelagic creature, land epipelagic creature, terrestrial epipelagic creature, walking mesopelagic creature, land mesopelagic creature, terrestrial mesopelagic creature, walking bathypelagic creature, land bathypelagic creature, terrestrial bathypelagic creature, walking abyssopelagic creature, land abyssopelagic creature, terrestrial abyssopelagic creature, walking hadopelagic creature, land hadopelagic creature, terrestrial hadopelagic creature`;
          }
          
          // Append custom negative prompt if provided
          if (options.customNegativePrompt) {
            return `${baseNegative}, ${options.customNegativePrompt}`;
          }
          
          return baseNegative;
        })()
      }
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Replicate API error: ${response.status} - ${errorText}`);
  }
  
  const prediction = await response.json();
  return prediction.id;
}

// Function to poll for completion
async function pollForCompletion(predictionId) {
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_KEY;
  
  while (true) {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to check prediction status: ${response.status}`);
    }
    
    const prediction = await response.json();
    
    if (prediction.status === 'succeeded') {
      return prediction.output[0]; // Return the first image URL
    } else if (prediction.status === 'failed') {
      throw new Error(`Prediction failed: ${prediction.error}`);
    }
    
    // Wait 2 seconds before polling again
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

// Function to download image from URL
async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`);
  }
  
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
}

// Function to list missing images
function listMissingImages(monsters) {
  console.log('🔍 Checking for missing monster images...\n');
  
  const missing = [];
  const existing = [];
  
  monsters.forEach((monster, index) => {
    const filename = `${monster.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.png`;
    if (imageExists(filename)) {
      existing.push({ index, name: monster.name, filename, type: monster.type });
    } else {
      missing.push({ index, name: monster.name, filename, type: monster.type });
    }
  });
  
  console.log(`📊 Status Summary:`);
  console.log(`✅ Existing: ${existing.length}/${monsters.length}`);
  console.log(`❌ Missing: ${missing.length}/${monsters.length}`);
  
  if (existing.length > 0) {
    console.log(`\n✅ Existing images:`);
    existing.forEach(item => {
      console.log(`   ${item.index + 1}. ${item.name} (${item.type})`);
    });
  }
  
  if (missing.length > 0) {
    console.log(`\n❌ Missing images:`);
    missing.forEach(item => {
      console.log(`   ${item.index + 1}. ${item.name} (${item.type})`);
    });
    
    console.log(`\n💡 To generate missing images:`);
    console.log(`   node generate-monster-images.js -b ${Math.min(10, missing.length)}`);
    console.log(`   node generate-monster-images.js -s ${missing[0].index} -b ${Math.min(10, missing.length)}`);
  }
  
  return missing;
}

// Function to generate a single monster image
async function generateMonsterImage(monster) {
  const filename = `${monster.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.png`;
  
  // Check if image already exists (unless force flag is set)
  if (imageExists(filename) && !options.force) {
    console.log(`⏭️  Skipping ${monster.name} - image already exists`);
    return { success: true, skipped: true };
  }
  
  if (imageExists(filename) && options.force) {
    console.log(`🔄 Force regenerating ${monster.name} - overwriting existing image`);
  }

  try {
    console.log(`🎨 Generating image for: ${monster.name} (${monster.type})`);
    
    const prompt = generateMonsterPrompt(monster);
    console.log(`📝 Full Prompt: ${prompt}`);
    
    // Call Replicate API
    console.log(`🚀 Submitting to Replicate...`);
    const predictionId = await callReplicateAPI(prompt);
    
    // Poll for completion
    console.log(`⏳ Waiting for generation to complete...`);
    const imageUrl = await pollForCompletion(predictionId);
    
    // Download and save the image
    console.log(`📥 Downloading image...`);
    const imageBuffer = await downloadImage(imageUrl);
    fs.writeFileSync(path.join(OUTPUT_DIR, filename), imageBuffer);
    
    console.log(`✅ Saved: ${filename}`);
    return { success: true, filename };
    
  } catch (error) {
    console.error(`❌ Error generating ${monster.name}:`, error.message);
    return { success: false, error: error.message };
  }
}

// Function to process a batch of monsters
async function processBatch(monsters, batchNumber) {
  console.log(`\n🚀 Processing batch ${batchNumber} (${monsters.length} monsters)`);
  console.log('='.repeat(50));
  
  const results = [];
  
  for (const monster of monsters) {
    const result = await generateMonsterImage(monster);
    results.push({ monster: monster.name, type: monster.type, ...result });
    
    // Only add delay if we actually generated an image (not when skipping)
    if (!result.skipped) {
      // Add a small delay between requests to be respectful to the API
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  // Log batch results
  const successful = results.filter(r => r.success).length;
  const skipped = results.filter(r => r.skipped).length;
  const failed = results.filter(r => !r.success && !r.skipped).length;
  
  console.log(`\n📊 Batch ${batchNumber} Results:`);
  console.log(`✅ Successful: ${successful}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`❌ Failed: ${failed}`);
  
  return results;
}

// Main function to process monsters based on options
async function generateMonsterImages() {
  console.log('🐉 Monster Image Generator');
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`🔢 Batch size: ${options.batch}`);
  console.log(`📍 Starting from index: ${options.start}`);
  
  // Load monster data
  let monsters = loadMonsterData();
  
  // Filter by specific monster name if specified
  if (options.monster) {
    const monsterName = options.monster.toLowerCase();
    monsters = monsters.filter(monster => 
      monster.name.toLowerCase() === monsterName
    );
    if (monsters.length === 0) {
      console.log(`❌ No monsters found matching "${options.monster}"`);
      return;
    }
    console.log(`🎯 Found ${monsters.length} monster(s) matching "${options.monster}"`);
  }
  // Filter by type if specified (and no specific monster)
  else if (options.type) {
    monsters = monsters.filter(monster => 
      monster.type.toLowerCase() === options.type.toLowerCase()
    );
    console.log(`🎯 Filtered to ${monsters.length} ${options.type} monsters`);
  }
  
  if (options.list) {
    listMissingImages(monsters);
    return;
  }
  
  // Get the subset of monsters to process
  const monstersToProcess = monsters.slice(options.start, options.start + options.batch);
  
  if (monstersToProcess.length === 0) {
    console.log('❌ No monsters to process with current options');
    return;
  }
  
  console.log(`📦 Processing ${monstersToProcess.length} monsters (${options.start + 1}-${options.start + monstersToProcess.length})`);
  
  const results = await processBatch(monstersToProcess, 1);
  
  // Summary
  console.log('\n🎉 Batch processing complete!');
  console.log('='.repeat(50));
  
  const successful = results.filter(r => r.success).length;
  const skipped = results.filter(r => r.skipped).length;
  const failed = results.filter(r => !r.success && !r.skipped).length;
  
  console.log(`📊 Results:`);
  console.log(`✅ Successful: ${successful}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('\n❌ Failed monsters:');
    results
      .filter(r => !r.success && !r.skipped)
      .forEach(r => console.log(`   - ${r.monster} (${r.type}): ${r.error}`));
  }
  
  console.log(`\n📁 Images saved to: ${OUTPUT_DIR}`);
  
  // Show next batch suggestion
  const nextStart = options.start + options.batch;
  if (nextStart < monsters.length) {
    console.log(`\n💡 To process next batch:`);
    console.log(`   node generate-monster-images.js -s ${nextStart} -b ${options.batch}`);
  }
}

// Run the script
if (require.main === module) {
  generateMonsterImages().catch(console.error);
}

module.exports = {
  generateMonsterImage,
  processBatch,
  generateMonsterImages,
  listMissingImages
}; 