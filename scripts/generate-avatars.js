import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// D&D 5e SRD Data (matching your app)
const ALL_RACES = [
  'Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Halfling', 
  'Half-Orc', 'Human', 'Tiefling'
];

const ALL_CLASSES = [
  'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 
  'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'
];

const ALL_GENDERS = [
  'Male', 'Female'
];

// Parse command line arguments
const args = process.argv.slice(2);
const forceRegenerate = args.includes('--force');
const testMode = args.includes('--test');

// Parse provider flag
let specifiedProvider = null;
const providerIndex = args.findIndex(arg => arg.startsWith('--provider='));
if (providerIndex !== -1) {
  specifiedProvider = args[providerIndex].split('=')[1];
} else {
  const providerFlag = args.findIndex(arg => arg === '--provider');
  if (providerFlag !== -1 && args[providerFlag + 1]) {
    specifiedProvider = args[providerFlag + 1];
  }
}

// Remove flags from args for parameter parsing
const filteredArgs = args.filter(arg => 
  arg !== '--force' && 
  arg !== '--test' && 
  !arg.startsWith('--provider') && 
  arg !== specifiedProvider
);

// Parse arguments - support any combination of race, class, gender
function parseArguments(args) {
  const filters = {
    race: null,
    class: null,
    gender: null,
  };
  
  for (const arg of args) {
    const lowerArg = arg.toLowerCase();
    
    // Check race
    const matchedRace = ALL_RACES.find(race => race.toLowerCase() === lowerArg);
    if (matchedRace) {
      filters.race = matchedRace;
      continue;
    }
    
    // Check class
    const matchedClass = ALL_CLASSES.find(cls => cls.toLowerCase() === lowerArg);
    if (matchedClass) {
      filters.class = matchedClass;
      continue;
    }
    
    // Check gender
    const matchedGender = ALL_GENDERS.find(gender => gender.toLowerCase() === lowerArg);
    if (matchedGender) {
      filters.gender = matchedGender;
      continue;
    }
    
    // If no match found, show error
    console.log(`❌ Unknown parameter: ${arg}`);
    showUsage();
    process.exit(1);
  }
  
  return filters;
}

function showUsage() {
  console.log('💡 Usage: node scripts/generate-avatars.js [race] [class] [gender] [flags]');
  console.log('📝 Available options:');
  console.log(`   Races: ${ALL_RACES.join(', ')}`);
  console.log(`   Classes: ${ALL_CLASSES.join(', ')}`);
  console.log(`   Genders: ${ALL_GENDERS.join(', ')}`);
  console.log('🔧 Flags:');
  console.log('   --force                                             # Regenerate existing files');
  console.log('   --test                                              # Generate single test avatar');
  console.log('   --provider=PROVIDER                                 # Force specific AI provider');
  console.log('🎨 Available providers:');
  console.log('   deepai        # DeepAI (best quality, requires API key, ~$0.01/image)');
  console.log('   pollinations  # Pollinations.ai (free, poor prompt following)');
  console.log('   huggingface   # Hugging Face (requires API key)');
  console.log('   leonardo      # Leonardo.ai (requires API key)');
  console.log('💡 Examples:');
  console.log('   node scripts/generate-avatars.js                               # Generate all (auto provider)');
  console.log('   node scripts/generate-avatars.js --provider=deepai             # Force DeepAI for all');
  console.log('   node scripts/generate-avatars.js --test --provider=deepai      # Test with DeepAI');
  console.log('   node scripts/generate-avatars.js --test --provider=pollinations # Test with Pollinations');
  console.log('   node scripts/generate-avatars.js Dragonborn --provider=deepai  # All Dragonborn with DeepAI');
  console.log('   node scripts/generate-avatars.js Elf Ranger Female --force     # Single avatar, auto provider');
}

const filters = parseArguments(filteredArgs);

// Filter arrays based on arguments
const RACES = filters.race ? [filters.race] : ALL_RACES;
const CLASSES = filters.class ? [filters.class] : ALL_CLASSES;
const GENDERS = filters.gender ? [filters.gender] : ALL_GENDERS;

const totalCombinations = RACES.length * CLASSES.length * GENDERS.length;

// Show what we're generating
function showGenerationPlan() {
  console.log('🎯 Generation Plan:');
  if (filters.race) console.log(`   Race: ${filters.race}`);
  else console.log(`   Races: All (${RACES.length})`);
  
  if (filters.class) console.log(`   Class: ${filters.class}`);
  else console.log(`   Classes: All (${CLASSES.length})`);
  
  if (filters.gender) console.log(`   Gender: ${filters.gender}`);
  else console.log(`   Genders: All (${GENDERS.length})`);
  
  console.log(`📊 Total avatars to generate: ${totalCombinations}`);
}

showGenerationPlan();

// Configuration
const CONFIG = {
  outputDir: './public/avatars',
  progressFile: `./scripts/avatar-progress-${Date.now()}.json`,
  imageSize: '192x192',
  delayBetweenRequests: 2000, // 2 seconds between requests
  maxRetries: 3,
  
  // CONSISTENCY SETTINGS
  consistency: {
    // Use consistent seed for similar results (when API supports it)
    baseSeed: 42,
    
    // Style locking - these elements should be identical across all images
    artisticStyle: "fantasy digital art, Dungeons and Dragons official art style",
    colorPalette: "rich saturated colors, professional fantasy game art",
    renderQuality: "4K resolution, highly detailed, sharp focus",
    
    // Portrait standards
    portraitRules: {
      framing: "bust portrait, head and shoulders visible",
      pose: "facing forward, direct eye contact with viewer", 
      background: "simple gradient background, no distracting elements",
      lighting: "three-point lighting, professional portrait setup"
    }
  }
};

// Create output directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Load or create progress file
function loadProgress() {
  // Use a generic progress file for resume capability
  const genericProgressFile = './scripts/avatar-progress-current.json';
  
  if (fs.existsSync(genericProgressFile)) {
    const data = fs.readFileSync(genericProgressFile, 'utf8');
    return JSON.parse(data);
  }
  
  return {
    totalCombinations,
    completed: [],
    failed: [],
    currentIndex: 0,
    filters,
    startTime: new Date().toISOString(),
    lastUpdate: new Date().toISOString()
  };
}

// Save progress
function saveProgress(progress) {
  progress.lastUpdate = new Date().toISOString();
  const genericProgressFile = './scripts/avatar-progress-current.json';
  fs.writeFileSync(genericProgressFile, JSON.stringify(progress, null, 2));
}

// Generate all combinations based on filters
function generateAllCombinations() {
  const combinations = [];
  let index = 0;
  
  for (const race of RACES) {
    for (const characterClass of CLASSES) {
      for (const gender of GENDERS) {
          combinations.push({
            index,
            race,
            class: characterClass,
            gender,
            filename: `${race}_${characterClass}_${gender}.png`
          });
          index++;
      }
    }
  }
  
  return combinations;
}

// Create prompt for AI image generation
function createPrompt(combination) {
  const { race, class: characterClass, gender } = combination;
  
  // CONSISTENCY ANCHORS - These stay the same for ALL avatars
  const consistentStyleElements = {
    artStyle: "Digital fantasy character portrait",
    lighting: "professional portrait lighting, soft shadows",
    composition: "centered bust portrait, looking at camera",
    quality: "highly detailed, clean art style, professional illustration",
    background: "simple neutral background, fantasy RPG character portrait",
    format: "192x192 pixels, square format, avatar style"
  };
  
  // DIVERSITY ELEMENTS - Add realistic variety
  const diversityTraits = generateDiversityTraits(combination);
  
  // POSITIVE-ONLY race descriptions - no negative language that confuses AI
  const raceDescriptions = {
    'Dragonborn': (() => {
      const dragonAncestries = [
        'DRAGONBORN RACE with RED DRAGON scales covering face and body, bright red coloration, fire dragon heritage, reptilian red eyes, pronounced snout',
        'DRAGONBORN RACE with GREEN DRAGON scales covering face and body, emerald green coloration, poison dragon heritage, reptilian green eyes, pronounced snout', 
        'DRAGONBORN RACE with GOLD DRAGON scales covering face and body, golden metallic coloration, noble dragon heritage, reptilian gold eyes, pronounced snout',
        'DRAGONBORN RACE with BLUE DRAGON scales covering face and body, deep blue coloration, lightning dragon heritage, reptilian blue eyes, pronounced snout',
        'DRAGONBORN RACE with BLACK DRAGON scales covering face and body, dark black coloration, acid dragon heritage, reptilian dark eyes, pronounced snout',
        'DRAGONBORN RACE with WHITE DRAGON scales covering face and body, pale white coloration, frost dragon heritage, reptilian pale eyes, pronounced snout',
        'DRAGONBORN RACE with COPPER DRAGON scales covering face and body, copper metallic coloration, trickster dragon heritage, reptilian copper eyes, pronounced snout',
        'DRAGONBORN RACE with BRONZE DRAGON scales covering face and body, bronze metallic coloration, coastal dragon heritage, reptilian bronze eyes, pronounced snout',
        'DRAGONBORN RACE with SILVER DRAGON scales covering face and body, silver metallic coloration, good dragon heritage, reptilian silver eyes, pronounced snout',
        'DRAGONBORN RACE with BRASS DRAGON scales covering face and body, brass metallic coloration, desert dragon heritage, reptilian brass eyes, pronounced snout'
      ];
      const seed = `${race}_${characterClass}_${gender}`;
      const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return dragonAncestries[hash % dragonAncestries.length];
    })(),
    'Dwarf': gender.toLowerCase() === 'female' ? 
      // Varied female dwarf appearances - some have beards, others different styles
      (() => {
        const femaleOptions = [
          'DWARF RACE with braided sideburns, stocky muscular build, shorter stature, traditional dwarven features',
          'DWARF RACE with neat goatee, stocky muscular build, shorter stature, traditional dwarven features', 
          'DWARF RACE with full thick beard, stocky muscular build, shorter stature, traditional dwarven features',
          'DWARF RACE with mustache and chin hair, stocky muscular build, shorter stature, traditional dwarven features',
          'DWARF RACE with elaborate braided beard, stocky muscular build, shorter stature, traditional dwarven features',
          'DWARF RACE with trimmed facial hair, stocky muscular build, shorter stature, traditional dwarven features'
        ];
        const seed = `${race}_${characterClass}_${gender}`;
        const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return femaleOptions[hash % femaleOptions.length];
      })() :
      'DWARF RACE with thick prominent beard, stocky muscular build, shorter stature, traditional dwarven features',
    'Elf': 'ELF RACE with distinctively POINTED EARS, tall slender build, angular facial features, ethereal elven beauty',
    'Gnome': 'GNOME RACE with very small size, large expressive eyes, tiny delicate stature, diminutive proportions',
    'Half-Elf': 'HALF-ELF RACE with moderately pointed ears, mixed heritage features, blend of human and elven traits',
    'Halfling': 'HALFLING RACE with small size, notably curly hair, round cheerful face, hobbit-like features',
    'Half-Orc': 'HALF-ORC RACE with prominent tusks protruding from mouth, large muscular build, orcish features, intimidating presence',
    'Human': 'HUMAN RACE character with normal human proportions, ordinary human facial structure, realistic human features',
    'Tiefling': 'TIEFLING RACE with prominent curved horns on head, visible tail, otherworldly skin tone, fiendish heritage, demonic features'
  };

  // Add class-specific equipment/style - STANDARDIZED
  const classStyles = {
    'Barbarian': 'wearing fur armor, tribal tattoos, fierce expression',
    'Bard': 'holding lute, colorful noble clothes, charismatic smile',
    'Cleric': 'wearing holy symbol, white/silver robes, serene expression',
    'Druid': 'earth-toned robes, wooden staff, calm nature-connected look',
    'Fighter': 'chainmail armor, sword visible, confident warrior stance',
    'Monk': 'simple brown robes, peaceful expression, disciplined posture',
    'Paladin': 'gleaming plate armor, holy symbol, righteous bearing',
    'Ranger': 'green leather armor, bow, alert forest-wise expression',
    'Rogue': 'dark leather armor, daggers, cunning suspicious look',
    'Sorcerer': 'elegant colorful robes, magical energy effects, confident pose',
    'Warlock': 'dark ornate robes, mysterious symbols, intense gaze',
    'Wizard': 'blue robes, pointed hat, spellbook, scholarly wise look'
  };

  // STRONG GENDER REINFORCEMENT - Multiple ways to specify gender
  const genderDescriptor = gender.toLowerCase();
  const genderReinforcement = {
    male: [
      "MALE CHARACTER", "male person", "masculine gender", "man", "male adult",
      "he/him pronouns", "masculine appearance", "male features"
    ],
    female: [
      "FEMALE CHARACTER", "female person", "feminine gender", "woman", "female adult", 
      "she/her pronouns", "feminine appearance", "female features"
    ]
  };
  
  const strongGenderSpec = genderReinforcement[genderDescriptor].join(', ');

  // NEGATIVE PROMPTS - Items to exclude (for APIs that support separate negative prompt fields)
  const negativePrompts = {
    'Human': 'pointed ears, elf ears, elf-like features, fantasy ears, elvish appearance, child-like face, teenage appearance, baby features, thin pale appearance, model beauty',
    'Elf': 'rounded ears, human ears, stocky build, short height, child-like face, teenage appearance',
    'Dwarf': 'tall build, thin frame, pointed ears, smooth face, no beard, child-like face',
    'Gnome': 'tall height, intimidating build, human proportions, adult proportions, large stature',
    'Half-Elf': 'fully pointed elf ears, completely round human ears, extreme features',
    'Halfling': 'tall height, straight hair, serious expression, intimidating appearance',
    'Half-Orc': 'small build, delicate features, elf ears, weak appearance, tiny tusks',
    'Dragonborn': 'human skin, elf ears, human nose, smooth skin, mammalian features',
    'Tiefling': 'normal human appearance, elf ears, no horns, no tail, ordinary features'
  };

  // ULTRA-SIMPLIFIED PROMPT - Race dominance for humans
  const promptParts = race === 'Human' ? [
    // STRONG GENDER SPECIFICATION FIRST
    strongGenderSpec,
    
    // FOR HUMANS: Emphasize human nature without over-focusing on ears
    'HUMAN CHARACTER, HUMAN PERSON, ORDINARY HUMAN, REAL HUMAN',
    'normal human ears, typical human features',
    'HUMAN APPEARANCE, HUMAN FEATURES, TYPICAL HUMAN PERSON',
    raceDescriptions[race],
    
    // REPEAT GENDER SPECIFICATION
    `${genderDescriptor} ${race} ${characterClass}`,
    
    // Then other traits
    `${diversityTraits.appearance}`,
    
    // ULTRA-AGGRESSIVE DARK SKIN REINFORCEMENT for everyone
    `DARK SKIN, BLACK COMPLEXION, ${diversityTraits.appearance}, NOT PALE`,
    
    `${diversityTraits.age}`,
    
    // EXTRA AGE REINFORCEMENT for women
    ...(gender.toLowerCase() === 'female' ? [`AGED WOMAN, MATURE FEMALE, ${diversityTraits.age}, NOT YOUNG`] : []),
    
    `${diversityTraits.build}`,
    
    // ULTRA-AGGRESSIVE FAT REINFORCEMENT for everyone
    `FAT BODY, OVERWEIGHT BUILD, ${diversityTraits.build}, NOT THIN`,
    
    `${diversityTraits.features}`,
    
    // Character description
    classStyles[characterClass],
    `${diversityTraits.genderExpression}, ${diversityTraits.classAuthenticity}`,
    
    // FINAL GENDER REINFORCEMENT
    `${genderDescriptor} adult, ${genderDescriptor} fantasy character`,
    
    // Technical specs
    consistentStyleElements.artStyle,
    consistentStyleElements.format,
    consistentStyleElements.composition,
    consistentStyleElements.lighting,
    consistentStyleElements.background,
    consistentStyleElements.quality,
    
    // Final reinforcement
    "adult proportions, realistic age appearance, diverse ethnic features, ordinary everyday person, realistic imperfections, natural appearance, plain ugly features, fat body, old appearance"
  ] : [
    // STRONG GENDER SPECIFICATION FIRST FOR NON-HUMANS TOO
    strongGenderSpec,
    
    // FOR NON-HUMANS: Normal structure
    raceDescriptions[race],
    
    // REPEAT GENDER SPECIFICATION
    `${genderDescriptor} ${race} ${characterClass}`,
    
    `${diversityTraits.appearance}`,
    
    // ULTRA-AGGRESSIVE DARK SKIN REINFORCEMENT for everyone
    `DARK SKIN, BLACK COMPLEXION, ${diversityTraits.appearance}, NOT PALE`,
    
    `${diversityTraits.age}`,
    
    // EXTRA AGE REINFORCEMENT for women
    ...(gender.toLowerCase() === 'female' ? [`AGED WOMAN, MATURE FEMALE, ${diversityTraits.age}, NOT YOUNG`] : []),
    
    `${diversityTraits.build}`,
    
    // ULTRA-AGGRESSIVE FAT REINFORCEMENT for everyone
    `FAT BODY, OVERWEIGHT BUILD, ${diversityTraits.build}, NOT THIN`,
    
    `${diversityTraits.features}`,
    classStyles[characterClass],
    `${diversityTraits.genderExpression}, ${diversityTraits.classAuthenticity}`,
    
    // FINAL GENDER REINFORCEMENT
    `${genderDescriptor} adult, ${genderDescriptor} fantasy character`,
    
    // Technical specs
    consistentStyleElements.artStyle,
    consistentStyleElements.format,
    consistentStyleElements.composition,
    consistentStyleElements.lighting,
    consistentStyleElements.background,
    consistentStyleElements.quality,
    
    // Final reinforcement
    "adult proportions, realistic age appearance, diverse ethnic features, ordinary everyday person, realistic imperfections, natural appearance, plain ugly features, fat body, old appearance"
  ];

  // Create negative prompt for the race - ADD WRONG GENDER TO NEGATIVES
  const wrongGender = genderDescriptor === 'male' ? 'female' : 'male';
  
  // ULTRA-AGGRESSIVE ANTI-YOUTH for women specifically
  const femaleAntiYouth = gender.toLowerCase() === 'female' ? [
    "young woman, young female, teenage girl, young lady, youthful woman, girl, young face",
    "smooth skin, flawless skin, no wrinkles, baby face, youthful appearance, teenage features",
    "perfect skin, ageless, timeless beauty, fountain of youth, young looking, fresh faced"
  ].join(', ') : '';
  
  // ULTRA-AGGRESSIVE ANTI-THIN for everyone - AI heavily biased toward thin/athletic
  const antiThinNegatives = [
    "thin body, skinny frame, slender build, petite physique, lean build, athletic body",
    "muscular build, fit physique, toned body, six pack abs, defined muscles, athletic frame",
    "slim waist, narrow hips, flat stomach, thin arms, skinny legs, bony appearance",
    "model physique, fitness model, athletic build, muscular definition, cut physique"
  ].join(', ');
  
  // ULTRA-AGGRESSIVE ANTI-LIGHT-SKIN for everyone - AI heavily biased toward pale/white skin
  const antiLightSkinNegatives = [
    "pale skin, white skin, fair complexion, light skin tone, very light skin, pale complexion",
    "fair skin, porcelain skin, ivory skin, alabaster skin, milky white skin, snow white skin",
    "light colored skin, bright skin, pale white complexion, fair white skin, very fair skin",
    "caucasian pale skin, nordic pale complexion, european white skin, light pigmentation"
  ].join(', ');
  
  const negativePrompt = [
    negativePrompts[race],
    // WRONG GENDER NEGATIVES
    `${wrongGender} character, ${wrongGender} person, ${wrongGender} features, ${wrongGender} appearance`,
    // EXTRA ANTI-YOUTH for females
    ...(gender.toLowerCase() === 'female' ? [femaleAntiYouth] : []),
    // ULTRA-AGGRESSIVE ANTI-THIN for everyone
    antiThinNegatives,
    // ULTRA-AGGRESSIVE ANTI-LIGHT-SKIN for everyone
    antiLightSkinNegatives,
    // AGGRESSIVE ANTI-BIAS NEGATIVES
    "pale skin, white skin, fair complexion, light skin tone", // Fight skin tone bias
    "thin body, skinny frame, petite build, slender physique, anorexic appearance, athletic muscular body", // Fight build bias  
    "young face, teenage appearance, child-like features, baby face, youthful look, 18 years old, 20 years old, 25 years old", // Fight age bias
    "perfect beauty, model appearance, flawless skin, idealized features, gorgeous, stunning, beautiful, attractive, sexy, pretty, handsome", // Fight beauty standards
    "perfect teeth, flawless complexion, symmetrical features, magazine cover, fashion model",
    "worst quality, low quality, blurry, jpeg artifacts, bad anatomy, bad proportions, extra limbs, extra fingers, poorly drawn hands, poorly drawn face"
  ].join(', ');

  // Join positive prompt parts with consistent separator
  return {
    positive: promptParts.join(', '),
    negative: negativePrompt
  };
}

// Generate diverse appearance traits based on character combination
function generateDiversityTraits(combination) {
  const { race, class: characterClass, gender } = combination;
  
  // Create deterministic "randomness" based on character combination
  const seed = `${race}_${characterClass}_${gender}`;
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // AGGRESSIVE DIVERSITY - Strong descriptors to override AI bias toward pale/thin/young
  const skinToneOptions = [
    // ULTRA-AGGRESSIVE DARK SKIN - AI heavily biased toward pale/white skin
    "DEEP DARK BROWN SKIN, very dark complexion, BLACK SKIN TONE",
    "RICH EBONY BLACK SKIN with dark pigmentation",
    "DARK CHOCOLATE BROWN SKIN, very dark tone",
    "DEEP BROWN COMPLEXION with dark melanin",
    "VERY DARK SKIN TONE, black complexion",
    "DARK BLACK SKIN with deep pigmentation", 
    "EBONY DARK SKIN, very dark brown tone",
    "DEEP DARK SKIN COLOR, black brown complexion",
    "VERY DARK BROWN SKIN with rich pigmentation",
    "BLACK DARK SKIN TONE, deep complexion",
    "DARK MELANIN SKIN, deep brown black tone",
    "RICH DARK SKIN COLOR, ebony complexion",
    "golden bronze skin", "warm caramel skin tone", "medium brown skin", "olive-toned skin", 
    "tan Mediterranean skin", "honey-colored skin", "copper-toned complexion", "amber skin tone",
    "light brown skin", "olive complexion", "fair skin tone" // Minimal light tones
  ];
  
  // GENDER-SPECIFIC AGE OPTIONS - Women get ULTRA-AGGRESSIVE elderly descriptions
  const ageOptions = {
    female: [
      // ULTRA-AGGRESSIVE ELDERLY for women - AI heavily biased toward young women
      "ELDERLY 65-year-old GRANDMOTHER with deep WRINKLES covering entire face",
      "AGED 70-year-old SENIOR WOMAN with WHITE HAIR and liver spots", 
      "OLD 68-year-old WOMAN with SAGGING SKIN and deep age lines",
      "ELDERLY 72-year-old with WRINKLED FACE and gray thinning hair",
      "SENIOR 66-year-old WOMAN with age spots and deep crow's feet",
      "OLD 63-year-old with WEATHERED SKIN and visible aging",
      "ELDERLY 60-year-old GRANDMOTHER with white hair and wrinkles",
      "AGED 58-year-old WOMAN with gray hair and mature features",
      "MIDDLE-AGED 55-year-old with VISIBLE AGING and graying hair",
      "WEATHERED 52-year-old WOMAN with age-appropriate features",
      "MATURE 48-year-old with gray streaks and life experience",
      "ADULT 45-year-old WOMAN with weathered appearance"
    ],
    male: [
      // Regular aging for men (AI less biased)
      "elderly 60-year-old with wrinkled skin and gray hair",
      "aged 65-year-old with deep wrinkles and white hair", 
      "senior 58-year-old with weathered features and graying temples",
      "elderly 62-year-old with age spots and thinning hair",
      "aged 68-year-old with deep laugh lines and silver hair",
      "senior 55-year-old with crow's feet and graying beard",
      "middle-aged 50-year-old with graying hair and age lines",
      "middle-aged 52-year-old with weathered skin and gray streaks",
      "weathered 45-year-old veteran with adult proportions and age-appropriate features",
      "experienced 40-year-old with wisdom wrinkles and mature bone structure",
      "seasoned 35-year-old with visible life experience and maturity lines",
      "mature 30-year-old with adult facial structure and weathered features"
    ]
  };
  
  const buildOptions = [
    // ULTRA-AGGRESSIVE FAT/OVERWEIGHT - AI heavily biased toward thin/athletic
    "OBESE body with LARGE BELLY and rolls of fat",
    "VERY FAT with DOUBLE CHIN and overweight appearance", 
    "FAT ROUND BODY with substantial body mass",
    "OVERWEIGHT build with BIG BELLY and soft appearance",
    "CHUBBY FAT FIGURE with rounded overweight features",
    "HEAVYSET OBESE build with thick fat torso",
    "FAT BODY TYPE with large stomach and weight",
    "PLUMP OVERWEIGHT with visible fat and curves",
    "CHUNKY FAT BUILD with substantial weight",
    "BIG FAT BODY with overweight proportions",
    "ROUND FAT TORSO with heavy build",
    "THICK FAT FRAME with overweight appearance",
    "stocky robust frame with thick torso", 
    "full-figured body with natural curves",
    "broad thick-set build with strong frame", 
    "chubby build with rounded features",
    "average build with healthy body weight", 
    "sturdy wide-shouldered physique",
    "lean athletic build", "slim build", "frail elderly build", "skinny frame"
  ];
  
  const facialFeatureOptions = [
    // WEIGHTED HEAVILY TOWARD UGLY/PLAIN - fight AI beauty bias
    "ugly face with asymmetrical features", "plain ugly appearance", "unattractive face", 
    "homely features", "ugly crooked nose", "ugly gap-toothed smile", "ugly wrinkled face",
    "fat face with double chin", "ugly scarred face", "plain unremarkable features",
    "weathered face with deep lines", "round pudgy face", "angular sharp features", 
    "scarred and battle-worn face", "wrinkled elderly features", "ordinary appearance",
    "crooked nose", "gap-toothed smile", "bushy eyebrows", "sunken cheeks",
    "kind tired eyes", "stern serious expression", "friendly warm smile", "grumpy expression"
  ];
  
  // Gender expression variety (not just stereotypical)
  const genderExpressionOptions = {
    male: [
      "masculine appearance", "androgynous features", "soft masculine features",
      "rugged masculine look", "gentle masculine expression", "non-conforming appearance"
    ],
    female: [
      "feminine appearance", "androgynous features", "strong feminine features", 
      "athletic feminine look", "gentle feminine expression", "non-conforming appearance"
    ]
  };
  
  // Class-specific authenticity details
  const classAuthenticityDetails = {
    'Barbarian': ["battle scars", "tribal markings", "wild hair", "weathered skin"],
    'Bard': ["expressive face", "well-groomed", "charismatic smile", "artistic hands"],
    'Cleric': ["serene expression", "kind eyes", "peaceful demeanor", "wise look"],
    'Druid': ["sun-weathered skin", "natural appearance", "earth-stained hands", "wild hair"],
    'Fighter': ["battle-worn", "scars", "strong build", "alert expression"],
    'Monk': ["calm expression", "disciplined posture", "simple appearance", "focused eyes"],
    'Paladin': ["noble bearing", "determined expression", "righteous look", "clean appearance"],
    'Ranger': ["weathered face", "alert eyes", "practical appearance", "outdoor-worn"],
    'Rogue': ["suspicious look", "quick eyes", "shadowy appearance", "streetwise face"],
    'Sorcerer': ["mystical aura", "intense eyes", "otherworldly appearance", "magical marks"],
    'Warlock': ["mysterious look", "dark circles under eyes", "otherworldly features", "haunted expression"],
    'Wizard': ["scholarly appearance", "ink-stained fingers", "thoughtful expression", "aged by study"]
  };
  
  // Pick traits based on hash (deterministic but varied)
  const skinTone = skinToneOptions[hash % skinToneOptions.length];
  const genderAgeOptions = ageOptions[gender.toLowerCase()] || ageOptions.male;
  const age = genderAgeOptions[(hash + 7) % genderAgeOptions.length];
  const build = buildOptions[(hash + 13) % buildOptions.length];
  const features = facialFeatureOptions[(hash + 19) % facialFeatureOptions.length];
  const genderExpression = genderExpressionOptions[gender.toLowerCase()][(hash + 23) % genderExpressionOptions[gender.toLowerCase()].length];
  const classDetail = classAuthenticityDetails[characterClass][(hash + 29) % classAuthenticityDetails[characterClass].length];
  
  // Race-specific appearance adjustments
  let finalAppearance = skinTone;
  if (race === 'Dragonborn') {
    const scaleColors = ["bronze scales", "copper scales", "gold scales", "silver scales", "red scales", "blue scales", "green scales", "black scales", "white scales"];
    finalAppearance = scaleColors[hash % scaleColors.length];
  } else if (race === 'Tiefling') {
    const tieflingColors = ["red skin", "purple skin", "blue skin", "dark red skin", "pale gray skin", "deep purple skin"];
    finalAppearance = tieflingColors[hash % tieflingColors.length];
  }
  
  return {
    appearance: finalAppearance,
    age: age,
    build: build,
    features: features,
    genderExpression: genderExpression,
    classAuthenticity: classDetail
  };
}

// Generate avatar image (replace with actual API calls)
async function generateAvatarImage(combination, prompts) {
  console.log(`🎨 Generating: ${combination.race} ${combination.class} ${combination.gender} `);
  console.log(`📝 Positive Prompt: ${prompts.positive}`);
  console.log(`📝 Negative Prompt: ${prompts.negative}`);
  
  const outputPath = path.join(CONFIG.outputDir, combination.filename);
  
  // Always try API generation - let generateWithAPI handle provider fallback
  try {
    console.log('🔄 Attempting generation with available providers...');
    const result = await generateWithAPI(prompts, outputPath, specifiedProvider);
    console.log(`🔍 Debug: API result: ${JSON.stringify(result)}`);
    if (result.success) {
      return result;
    }
    console.log('❌ All providers failed - no file created');
    return { success: false, error: result.error || 'All API providers failed' };
  } catch (error) {
    console.log(`❌ Generation error: ${error.message} - no file created`);
    console.log(`🔍 Debug: Full error:`, error);
    return { success: false, error: error.message };
  }
}

// Real API generation with multiple provider support
async function generateWithAPI(prompts, outputPath, specifiedProvider = null) {
  try {
    console.log('🔍 Debug: Starting API generation...');
    
    // Check if fetch is available
    if (typeof fetch === 'undefined') {
      console.log('🔍 Debug: fetch not available, trying to import...');
      try {
        const { default: nodeFetch } = await import('node-fetch');
        globalThis.fetch = nodeFetch;
      } catch {
        console.log('🔍 Debug: node-fetch not available, need to install it');
        return { success: false, error: 'fetch not available - install node-fetch: npm install node-fetch' };
      }
    }
    
    // Create consistent seed based on filename for reproducible generation
    const filename = path.basename(outputPath, '.png');
    const seed = CONFIG.consistency.baseSeed + filename.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Enhanced prompts with consistency elements
    const enhancedPositivePrompt = [
      prompts.positive,
      CONFIG.consistency.artisticStyle,
      CONFIG.consistency.colorPalette,
      CONFIG.consistency.renderQuality,
      CONFIG.consistency.portraitRules.framing,
      CONFIG.consistency.portraitRules.pose,
      CONFIG.consistency.portraitRules.background,
      CONFIG.consistency.portraitRules.lighting
    ].join(', ');
    
    const enhancedPrompts = {
      positive: enhancedPositivePrompt,
      negative: prompts.negative
    };
    
    console.log(`🎨 Enhanced positive prompt: ${enhancedPrompts.positive}`);
    console.log(`🎨 Enhanced negative prompt: ${enhancedPrompts.negative}`);
    console.log(`🎲 Using seed: ${seed}`);
    
    // Define all available providers
    const allProviders = [
      {
        name: 'DeepAI',
        id: 'deepai',
        condition: () => process.env.DEEPAI_API_KEY,
        generate: () => generateWithDeepAI(enhancedPrompts, process.env.DEEPAI_API_KEY)
      },
      {
        name: 'Hugging Face',
        id: 'huggingface', 
        condition: () => process.env.HUGGINGFACE_API_KEY,
        generate: () => generateWithHuggingFace(enhancedPrompts.positive, seed, process.env.HUGGINGFACE_API_KEY)
      },
      {
        name: 'Leonardo.ai',
        id: 'leonardo',
        condition: () => process.env.LEONARDO_API_KEY,
        generate: () => generateWithLeonardo(enhancedPrompts, process.env.LEONARDO_API_KEY)
      },
      {
        name: 'Pollinations.ai',
        id: 'pollinations',
        condition: () => true,
        generate: () => generateWithPollinations(enhancedPrompts.positive, seed)
      }
    ];

    // Filter providers based on command line flag
    let providers;
    if (specifiedProvider) {
      const requestedProvider = allProviders.find(p => p.id === specifiedProvider.toLowerCase());
      if (requestedProvider) {
        console.log(`🎯 Using specified provider: ${requestedProvider.name}`);
        providers = [requestedProvider];
      } else {
        console.log(`❌ Unknown provider: ${specifiedProvider}`);
        console.log(`   Available: ${allProviders.map(p => p.id).join(', ')}`);
        return { success: false, error: `Unknown provider: ${specifiedProvider}` };
      }
    } else {
      // Use default order (best prompt following first)
      providers = [
        allProviders.find(p => p.id === 'deepai'),
        allProviders.find(p => p.id === 'huggingface'),
        allProviders.find(p => p.id === 'leonardo'),
        allProviders.find(p => p.id === 'pollinations')
      ];
    }

    // Try each provider until one works
    for (const provider of providers) {
      if (provider.condition()) {
        console.log(`🔍 Debug: Trying ${provider.name}...`);
        try {
          const result = await provider.generate();
          if (result.success) {
            // Save and resize image
            await saveAndResizeImage(result.buffer, outputPath);
            return { success: true, path: outputPath };
          }
          console.log(`❌ ${provider.name} failed: ${result.error}`);
        } catch (error) {
          console.log(`❌ ${provider.name} error: ${error.message}`);
        }
      }
    }
    
    return { success: false, error: 'All API providers failed or unavailable' };
  } catch (error) {
    console.log(`❌ Exception in generateWithAPI: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Hugging Face provider
async function generateWithHuggingFace(prompt, seed, apiKey) {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          width: 512,
          height: 512,
          num_inference_steps: 30,
          guidance_scale: 8.5,
          seed: seed,
          negative_prompt: "blurry, low quality, distorted, multiple people, full body, landscape orientation, weapons in foreground, busy background, wrong racial features, elf ears on humans, human ears on elves, mixed races, incorrect proportions for race"
        }
      })
    }
  );

  if (response.ok) {
    const buffer = await response.arrayBuffer();
    return { success: true, buffer: Buffer.from(buffer) };
  } else {
    const errorText = await response.text();
    return { success: false, error: `HTTP ${response.status}: ${errorText}` };
  }
}

// Pollinations.ai provider (FREE!)
async function generateWithPollinations(prompt, seed) {
  // Pollinations uses URL parameters
  const params = new URLSearchParams({
    prompt: prompt,
    seed: seed,
    width: 512,
    height: 512,
    model: 'flux'
  });
  
  const response = await fetch(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params}`);
  
  if (response.ok) {
    const buffer = await response.arrayBuffer();
    return { success: true, buffer: Buffer.from(buffer) };
  } else {
    return { success: false, error: `HTTP ${response.status}` };
  }
}

// DeepAI provider (has free tier)
async function generateWithDeepAI(prompts, apiKey) {
  // Since DeepAI doesn't support separate negative prompts, 
  // let's try using just the positive prompt without negative language
  const response = await fetch('https://api.deepai.org/api/text2img', {
    method: 'POST',
    headers: {
      'Api-Key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: prompts.positive,
      image_generator_version: "hd"
    })
  });

  if (response.ok) {
    const result = await response.json();
    if (result.output_url) {
      // Download the image
      const imageResponse = await fetch(result.output_url);
      const buffer = await imageResponse.arrayBuffer();
      return { success: true, buffer: Buffer.from(buffer) };
    }
  }
  
  const errorText = await response.text();
  return { success: false, error: `HTTP ${response.status}: ${errorText}` };
}

// Leonardo.ai provider (free daily tokens)
async function generateWithLeonardo(prompts, apiKey) {
  const response = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: prompts.positive,
      num_images: 1,
      width: 512,
      height: 512,
      modelId: "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3", // Leonardo Creative v1.1
      negative_prompt: prompts.negative
    })
  });

  if (response.ok) {
    // Leonardo returns a generation ID, need to poll for completion
    // This is a simplified version - in production you'd want to poll properly
    return { success: false, error: "Leonardo.ai requires polling implementation" };
  }
  
  const errorText = await response.text();
  return { success: false, error: `HTTP ${response.status}: ${errorText}` };
}

// Save and resize image utility
async function saveAndResizeImage(buffer, outputPath) {
  // Save original image
  const tempPath = outputPath.replace('.png', '_temp.png');
  fs.writeFileSync(tempPath, buffer);
  
  // Resize to 192x192 if possible
  try {
    const sharp = (await import('sharp')).default;
    await sharp(tempPath)
      .resize(192, 192, { fit: 'cover', position: 'center' })
      .png()
      .toFile(outputPath);
    
    // Clean up temp file
    fs.unlinkSync(tempPath);
  } catch {
    // If sharp not available, just use the original
    fs.renameSync(tempPath, outputPath);
  }
}

// Main generation function
async function generateAvatars(forceRegeneration = false, userFilters = {}) {
  console.log('\n🚀 Starting D&D Avatar Generation');
  console.log(`📊 Total combinations: ${totalCombinations}`);
  
  // Setup
  ensureDirectoryExists(CONFIG.outputDir);
  let progress = loadProgress();
  const combinations = generateAllCombinations();
  
  // Reset progress if force regeneration is enabled
  if (forceRegeneration) {
    console.log('🔄 Force mode enabled - resetting progress...');
    progress = {
      totalCombinations: combinations.length,
      completed: [],
      failed: [],
      currentIndex: 0,
             filters: userFilters,
      startTime: new Date().toISOString(),
      lastUpdate: new Date().toISOString()
    };
  }
  
  console.log(`📈 Progress: ${progress.completed.length}/${progress.totalCombinations} completed`);
  console.log(`❌ Failed: ${progress.failed.length}`);
  
  // Start from where we left off
  for (let i = progress.currentIndex; i < combinations.length; i++) {
    const combination = combinations[i];
    const outputPath = path.join(CONFIG.outputDir, combination.filename);
    
    console.log(`🔍 Debug: Processing combination ${i+1}/${combinations.length}: ${combination.filename}`);
    console.log(`🔍 Debug: Output path: ${outputPath}`);
    console.log(`🔍 Debug: File exists: ${fs.existsSync(outputPath)}`);
    console.log(`🔍 Debug: Force regenerate: ${forceRegeneration}`);
    
    // Skip if already exists (unless force regeneration is enabled)
    if (fs.existsSync(outputPath) && !forceRegeneration) {
      console.log(`⏭️  Skipping existing: ${combination.filename}`);
      continue;
    }
    
    // Skip if already completed (unless force regeneration is enabled)
    if (progress.completed.includes(combination.filename) && !forceRegeneration) {
      console.log(`✅ Already completed: ${combination.filename}`);
      continue;
    }
    
    try {
      const prompts = createPrompt(combination);
      const result = await generateAvatarImage(combination, prompts);
      
      if (result.success) {
        progress.completed.push(combination.filename);
        console.log(`✅ Generated: ${combination.filename} (${progress.completed.length}/${progress.totalCombinations})`);
      } else {
        progress.failed.push({
          filename: combination.filename,
          error: result.error,
          timestamp: new Date().toISOString()
        });
        console.log(`❌ Failed: ${combination.filename} - ${result.error}`);
      }
    } catch (error) {
      progress.failed.push({
        filename: combination.filename,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      console.log(`💥 Error: ${combination.filename} - ${error.message}`);
    }
    
    // Update progress
    progress.currentIndex = i + 1;
    saveProgress(progress);
    
    // Show progress every 10 items
    if ((i + 1) % 10 === 0) {
      const percentComplete = ((progress.completed.length / progress.totalCombinations) * 100).toFixed(1);
      console.log(`📊 Progress: ${percentComplete}% (${progress.completed.length}/${progress.totalCombinations})`);
    }
    
    // Add delay between requests
    if (i < combinations.length - 1) {
      await new Promise(resolve => setTimeout(resolve, CONFIG.delayBetweenRequests));
    }
  }
  
  // Final summary
  console.log('\n🎉 Avatar generation complete!');
  console.log(`✅ Successfully generated: ${progress.completed.length}`);
  console.log(`❌ Failed: ${progress.failed.length}`);
  console.log(`📁 Output directory: ${CONFIG.outputDir}`);
  
  if (progress.failed.length > 0) {
    console.log('\n❌ Failed items:');
    progress.failed.forEach(item => {
      console.log(`   - ${item.filename}: ${item.error}`);
    });
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⏸️  Gracefully stopping avatar generation...');
  console.log('💾 Progress has been saved. You can resume later by running this script again.');
  process.exit(0);
});

// Test function to generate a single avatar for consistency testing
async function testSingleAvatar(race = 'Human', characterClass = 'Fighter', gender = 'Male') {
  console.log('\n🧪 Testing single avatar generation for consistency...');
  
  const testCombination = {
    index: 0,
    race,
    class: characterClass,
    gender,
    filename: `TEST_${race}_${characterClass}_${gender}.png`
  };
  
  ensureDirectoryExists(CONFIG.outputDir);
  
  const outputPath = path.join(CONFIG.outputDir, testCombination.filename);
  
  // Check if force regeneration is enabled
  if (fs.existsSync(outputPath) && !forceRegenerate) {
    console.log(`\n⏭️  Test file already exists: ${testCombination.filename}`);
    console.log(`📁 Location: ${outputPath}`);
    console.log(`💡 Use --force to regenerate existing test files`);
    return { success: true, path: outputPath, skipped: true };
  }
  
  if (forceRegenerate && fs.existsSync(outputPath)) {
    console.log(`\n🔄 Force mode: Regenerating existing test file...`);
  }
  
  const prompts = createPrompt(testCombination);
  console.log('\n📝 Generated Prompt:');
  console.log('═'.repeat(80));
  console.log(`Positive: ${prompts.positive}`);
  console.log(`Negative: ${prompts.negative}`);
  console.log('═'.repeat(80));
  
  const result = await generateAvatarImage(testCombination, prompts);
  
  if (result.success) {
    console.log(`\n✅ Test avatar generated successfully!`);
    console.log(`📁 Location: ${path.join(CONFIG.outputDir, testCombination.filename)}`);
    console.log(`💡 Review this test image to ensure the style meets your expectations.`);
    console.log(`🔄 Run with different combinations to test consistency:`);
    console.log(`   node scripts/generate-avatars.js --test Elf Wizard Female`);
  } else {
    console.log(`\n❌ Test failed: ${result.error}`);
  }
  
  return result;
}

// Handle test mode
if (testMode) {
  // Use the same parsing logic as the main filter system
  let testRace = filters.race || 'Human';
  let testClass = filters.class || 'Fighter'; 
  let testGender = filters.gender || 'Male';
  
  testSingleAvatar(testRace, testClass, testGender).catch(console.error);
} else {
  // Run the generator normally
  if (import.meta.url === `file://${process.argv[1]}`) {
    generateAvatars(forceRegenerate, filters).catch(console.error);
  }
}

export { generateAvatars, createPrompt, generateAllCombinations, testSingleAvatar }; 