import { CharacterAvatarData } from '@/types/character';
import { getDiverseAgeDescription } from './dnd/age-system';

interface AvatarResult {
  success: boolean;
  fullBodyImage?: string;
  avatarImage?: string;
  error?: string;
  service?: string;
}

// Clear skin tone descriptions with ethnic diversity
const SKIN_TONES = [
  'black skin', 'dark brown skin', 'brown skin', 'light brown skin', 
  'olive skin', 'tan skin'
];

// Ethnic diversity descriptions
const ETHNICITIES = [
  'African', 'African American', 'Asian', 'Chinese', 'Japanese', 'Korean', 
  'Indian', 'Middle Eastern', 'Indigenous', 'Native American', 'Pacific Islander',
  'Hispanic', 'Latino', 'Caribbean', 'Mediterranean'
];

// Anti-bias body type descriptions (avoiding problematic terms)
const BODY_TYPES = [
  'average build', 'slender frame', 'compact frame',
  'average stature', 'lean build', 'average physique'
];

// Class-appropriate clothing descriptions
const CLASS_CLOTHING = {
  'Rogue': 'medieval leather armor and dark hooded cloak',
  'Fighter': 'medieval chain mail armor with tabard',
  'Wizard': 'medieval flowing scholarly robes with arcane symbols',
  'Cleric': 'medieval religious vestments with holy symbols',
  'Ranger': 'medieval leather armor with green cloak and hood',
  'Paladin': 'medieval plate armor with holy tabard',
  'Bard': 'medieval colorful silk clothing with musical instruments',
  'Druid': 'medieval natural robes made of leaves and bark',
  'Monk': 'medieval simple robes with rope belt',
  'Sorcerer': 'medieval ancient flowing robes with magical aura',
  'Warlock': 'medieval dark robes with occult symbols',
  'Barbarian': 'medieval fur and leather clothing with tribal markings',
  'Artificer': 'medieval blacksmith apron with tool belt and goggles'
};

// Races that need skin tone diversity
const SKIN_TONE_RACES = ['Human', 'Elf', 'Half-Elf', 'Gnome', 'Halfling', 'Tabaxi'];

// Single source of truth: Dragonborn subrace to scale color mapping
const DRAGONBORN_SCALE_COLORS: Record<string, string> = {
  'Black Dragonborn': 'black scales',
  'Blue Dragonborn': 'blue scales',
  'Brass Dragonborn': 'brass scales',
  'Bronze Dragonborn': 'bronze scales',
  'Copper Dragonborn': 'copper scales',
  'Gold Dragonborn': 'gold scales',
  'Green Dragonborn': 'green scales',
  'Red Dragonborn': 'red scales',
  'Silver Dragonborn': 'silver scales',
  'White Dragonborn': 'white scales',
};

// Single source of truth: Aasimar subrace to celestial features mapping
const AASIMAR_CELESTIAL_FEATURES: Record<string, string> = {
  'Protector Aasimar': 'golden halo, protective aura, benevolent glow, healing light, guardian features, divine radiance, celestial wings, golden eyes',
  'Scourge Aasimar': 'fiery halo, punishing aura, righteous glow, justice-seeking features, determined expression, divine wrath, celestial wings, burning eyes',
  'Fallen Aasimar': 'shadowy halo, corrupted aura, dark glow, fallen features, corrupted appearance, necrotic presence, tainted wings, shadowy eyes',
};

// Single source of truth: Tiefling subrace to infernal features mapping
const TIEFLING_INFERNAL_FEATURES: Record<string, string> = {
  'Asmodeus Tiefling': 'red skin, prominent horns, long tail, infernal heritage, demonic features, asmodeus bloodline',
  'Baalzebul Tiefling': 'green skin, prominent horns, long tail, infernal heritage, insect-like features, baalzebul bloodline',
  'Mephistopheles Tiefling': 'red skin, prominent horns, long tail, infernal heritage, demonic features, mephistopheles bloodline',
};

// Tabaxi fur patterns and colors (based on real cat breeds and patterns)
const TABAXI_FUR_PATTERNS = [
  // Solid colors
  'solid orange fur', 'solid black fur', 'solid white fur', 'solid gray fur', 'solid brown fur', 'solid cream fur',
  
  // Tabby patterns
  'orange tabby fur with dark stripes', 'brown tabby fur with black stripes', 'gray tabby fur with dark stripes', 'cream tabby fur with brown stripes',
  
  // Calico patterns
  'calico fur with patches of orange, black, and white', 'dilute calico fur with patches of cream, gray, and white',
  
  // Tortoiseshell patterns
  'tortoiseshell fur with mottled orange and black', 'dilute tortoiseshell fur with mottled cream and gray',
  
  // Tuxedo patterns
  'black and white tuxedo fur', 'gray and white tuxedo fur',
  
  // Bicolor patterns
  'orange and white bicolor fur', 'black and white bicolor fur', 'gray and white bicolor fur',
  
  // Pointed patterns (like Siamese)
  'cream fur with darker points on ears, face, paws, and tail', 'white fur with gray points on ears, face, paws, and tail',
  
  // Special patterns
  'ginger fur with white chest and paws', 'black fur with white paws and chest', 'gray fur with white paws and chest',
  'orange fur with white belly and paws', 'brown fur with lighter underbelly', 'cream fur with darker face mask'
];

// Utility function to get random item from array
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Server-side prompt generation with anti-bias measures
function generateServerPrompt(characterData: CharacterAvatarData): string {
  const { race, gender, class: characterClass, appearance, age, subrace } = characterData;
  
  // Build appearance description
  let appearanceDescription = '';
  let cameraAngle = '';
  const ageDesc = age ? `${age}-year-old` : 'adult';
  
  // Always generate race-specific features first
  let raceDescription = '';
  switch (race) {
    case 'Gnome':
      raceDescription = 'small fey humanoid, 3-4 feet tall, pointed ears, intelligent eyes, prominent nose, earth-toned skin, mature features';
      break;
    case 'Halfling':
      raceDescription = 'small humanoid with curly hair and hobbit features';
      break;
    case 'Dwarf':
      // Check if this is a Duergar subrace
      if (subrace === 'Duergar') {
        // Use the age system for duergar to get the correct appearance features
        const duergarAgeDescription = getDiverseAgeDescription('Duergar', gender);
        raceDescription = 'gray dwarf with gray skin, big bushy beard, traditional dwarven features, stocky build, broad shoulders, underdark heritage, duergar appearance';
        // Use the age system description for duergar
        appearanceDescription = `, A ${ageDesc} ${raceDescription} with ${duergarAgeDescription}`;
        
        // Add body type diversity for duergar
        const bodyType = getRandomItem(BODY_TYPES);
        appearanceDescription += `, ${bodyType}`;
        
        // Add custom appearance if provided
        if (appearance && appearance.trim()) {
          appearanceDescription += `, ${appearance.trim()}`;
        }
        
        // Create the full prompt for duergar
        const clothing = CLASS_CLOTHING[characterClass as keyof typeof CLASS_CLOTHING] || 'appropriate clothing';
        const fullBodyPrompt = `A professional full-body photograph of a ${gender || 'Person'} ${characterClass}${appearanceDescription} in ${clothing}, standing in a dramatic pose, complete head visible, studio lighting, high quality, detailed, realistic, 8k resolution, professional photography, full figure from head to toe, clear facial features for cropping${cameraAngle || ''}`;
        
        return fullBodyPrompt;
      } else {
        // Use the age system for regular dwarves to get the correct appearance features
        const dwarfAgeDescription = getDiverseAgeDescription('Dwarf', gender);
        raceDescription = 'dwarf with stocky build, broad shoulders, thick muscular frame, 4-5 feet tall, traditional dwarven features, big bushy beard, thick hair, stout appearance, NOT tall or skinny, clearly dwarven proportions';
        // Use the age system description for dwarves
        appearanceDescription = `, A ${ageDesc} ${raceDescription} with ${dwarfAgeDescription}`;
        
        // Add body type diversity for dwarves
        const bodyType = getRandomItem(BODY_TYPES);
        appearanceDescription += `, ${bodyType}`;
        
        // Add custom appearance if provided
        if (appearance && appearance.trim()) {
          appearanceDescription += `, ${appearance.trim()}`;
        }
        
        // Create the full prompt for regular dwarves
        const clothing = CLASS_CLOTHING[characterClass as keyof typeof CLASS_CLOTHING] || 'appropriate clothing';
        const fullBodyPrompt = `A professional full-body photograph of a ${gender || 'Person'} ${characterClass}${appearanceDescription} in ${clothing}, standing in a dramatic pose, complete head visible, studio lighting, high quality, detailed, realistic, 8k resolution, professional photography, full figure from head to toe, clear facial features for cropping${cameraAngle || ''}`;
        
        return fullBodyPrompt;
      }
      break;
    case 'Elf':
      // Check if this is a Drow subrace
      if (subrace === 'Drow') {
        // Use the age system for drow to get the correct appearance features
        const drowAgeDescription = getDiverseAgeDescription('Elf', gender, 'Drow');
        raceDescription = 'dark elf with black skin, white hair, red eyes, pointed ears, graceful features, underdark heritage, drow appearance';
        // Use the age system description for drow
        appearanceDescription = `, A ${ageDesc} ${raceDescription} with ${drowAgeDescription}`;
        
        // Add body type diversity for drow
        const bodyType = getRandomItem(BODY_TYPES);
        appearanceDescription += `, ${bodyType}`;
        
        // Add custom appearance if provided
        if (appearance && appearance.trim()) {
          appearanceDescription += `, ${appearance.trim()}`;
        }
        
        // Create the full prompt for drow
        const clothing = CLASS_CLOTHING[characterClass as keyof typeof CLASS_CLOTHING] || 'appropriate clothing';
        const fullBodyPrompt = `A professional full-body photograph of a ${gender || 'Person'} ${characterClass}${appearanceDescription} in ${clothing}, standing in a dramatic pose, complete head visible, studio lighting, high quality, detailed, realistic, 8k resolution, professional photography, full figure from head to toe, clear facial features for cropping${cameraAngle || ''}`;
        
        return fullBodyPrompt;
      } else {
        raceDescription = 'tall humanoid with pointed ears and graceful features';
      }
      break;
    case 'Human':
      raceDescription = 'human';
      break;
    case 'Half-Elf':
      raceDescription = 'half-elf with pointed ears, graceful features, mixed heritage, elven grace, human adaptability, otherworldly beauty, hybrid appearance';
      break;
    case 'Half-Orc':
      raceDescription = 'half-orc with prominent tusks, greenish-gray skin, broad features, muscular build, orc heritage, intimidating appearance, strong jawline, orcish features';
      break;
    case 'Tiefling':
      // Check if this is a specific Tiefling subrace
      if (subrace && TIEFLING_INFERNAL_FEATURES[subrace]) {
        raceDescription = TIEFLING_INFERNAL_FEATURES[subrace];
      } else {
        raceDescription = 'demon-blooded humanoid with prominent horns, red skin, glowing eyes, and a long tail';
      }
      break;
    case 'Dragonborn': {
      // Inject scale color for Dragonborn subraces
      let scaleColor = '';
      if (subrace && DRAGONBORN_SCALE_COLORS[subrace]) {
        scaleColor = DRAGONBORN_SCALE_COLORS[subrace];
      }
      raceDescription = `reptilian beings, anthropomorphic dragon with scaled skin${scaleColor ? ', ' + scaleColor : ''}, dragon snout, no ears, reptilian features, NOT human, clearly reptilian appearance`;
      break;
    }
    case 'Aasimar': {
      // Inject celestial features for Aasimar subraces
      let celestialFeatures = '';
      if (subrace && AASIMAR_CELESTIAL_FEATURES[subrace]) {
        celestialFeatures = AASIMAR_CELESTIAL_FEATURES[subrace];
      } else {
        celestialFeatures = 'celestial humanoid with glowing features, angelic appearance, divine radiance, golden halo, celestial wings, otherworldly beauty';
      }
      raceDescription = celestialFeatures;
      break;
    }
    case 'Goliath':
      raceDescription = 'giant humanoid with massive frame, stone gray skin with purple markings, bald head, imposing stature, 7-8 feet tall';
      cameraAngle = ', camera positioned low looking up at the character, dramatic low angle shot to emphasize towering height and imposing presence';
      break;
    case 'Tabaxi': {
      const furPattern = getRandomItem(TABAXI_FUR_PATTERNS);
      raceDescription = `anthropomorphised cat, feline humanoid with cat-like features, ${furPattern}, pointed ears, whiskers, cat eyes, agile build, tabaxi appearance, cat-humanoid hybrid, NOT human with cat makeup, clearly feline features`;
      break;
    }
    default:
      raceDescription = race.toLowerCase();
  }
  
  // Build the base appearance description with race features
  appearanceDescription = `, A ${ageDesc} ${raceDescription} with age-appropriate features`;
  
  // Add skin tone diversity for races that need it (but NOT for drow)
  if (SKIN_TONE_RACES.includes(race) && subrace !== 'Drow') {
    const skinTone = getRandomItem(SKIN_TONES);
    const ethnicity = getRandomItem(ETHNICITIES);
    appearanceDescription += `, ${ethnicity} with ${skinTone}`;
  }
  
  // Add body type diversity for all races (with special handling for Half-orc)
  let bodyType = getRandomItem(BODY_TYPES);
  if (race === 'Half-Orc') {
    bodyType = 'muscular build, strong physique, imposing stature';
  }
  appearanceDescription += `, ${bodyType}`;
  
  // Add custom appearance if provided (in addition to race features)
  if (appearance && appearance.trim()) {
    appearanceDescription += `, ${appearance.trim()}`;
  }
  
  // Create the full prompt - use descriptive terms instead of race names
  const clothing = CLASS_CLOTHING[characterClass as keyof typeof CLASS_CLOTHING] || 'appropriate clothing';
  const fullBodyPrompt = `A professional full-body photograph of a ${gender || 'Person'} ${characterClass}${appearanceDescription} in ${clothing}, standing in a dramatic pose, complete head visible, studio lighting, high quality, detailed, realistic, 8k resolution, professional photography, full figure from head to toe, clear facial features for cropping${cameraAngle || ''}`;
  
  return fullBodyPrompt;
}

// Replicate configuration
const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;
const REPLICATE_BASE_URL = 'https://api.replicate.com/v1';

export async function generateAvatar(characterData: CharacterAvatarData): Promise<AvatarResult> {
  console.log('🎨 Starting avatar generation for:', characterData);
  
  // Check if API key is available
  if (!REPLICATE_API_KEY) {
    console.error('❌ REPLICATE_API_KEY not found in environment variables');
    return {
      success: false,
      error: 'Avatar generation service not configured (missing API key)'
    };
  }
  
  console.log('✅ REPLICATE_API_KEY found, attempting generation...');
  
  // Use Replicate with Flux.schnell for faster generation
  try {
    console.log('🔄 Generating with Replicate Flux.schnell...');
    const replicateResult = await generateWithReplicateFluxSchnell(characterData);
    if (replicateResult.success) {
      console.log('✅ Replicate Flux.schnell successful');
      return { ...replicateResult, service: 'Replicate Flux.schnell' };
    }
    console.log('❌ Replicate Flux.schnell failed:', replicateResult.error);
    return replicateResult;
  } catch (error) {
    console.error('❌ Replicate Flux.schnell error:', error);
    return {
      success: false,
      error: `Avatar generation error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

async function generateWithReplicateFluxSchnell(characterData: CharacterAvatarData): Promise<AvatarResult> {
  try {
    // Use a single seed for consistency
    const sharedSeed = Math.floor(Math.random() * 1000000);
    
    // Generate server-side prompt with anti-bias measures
    const fullBodyPrompt = generateServerPrompt(characterData);

    // Log the exact prompt being sent
    console.log('🎨 FULL PROMPT BEING SENT TO AI:');
    console.log('='.repeat(80));
    console.log(fullBodyPrompt);
    console.log('='.repeat(80));
    console.log('🎨 CHARACTER DATA SENT:');
    console.log(JSON.stringify(characterData, null, 2));
    console.log('='.repeat(80));

    // Full body prompt generated
    console.log('🔑 Using API key:', REPLICATE_API_KEY ? 'Present' : 'Missing');

    // Generate full body image with correct Flux.schnell parameters
    const requestBody = {
      version: 'black-forest-labs/flux-schnell',
      input: {
        prompt: fullBodyPrompt,
        go_fast: true,
        megapixels: "1",
        num_outputs: 1,
        aspect_ratio: "9:16", // Taller for full body
        output_format: "webp",
        output_quality: 80,
        num_inference_steps: 4,
        seed: sharedSeed
      }
    };

    console.log('📤 Sending request to Replicate');

    const fullBodyResponse = await fetch(`${REPLICATE_BASE_URL}/predictions`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('📥 Replicate response status:', fullBodyResponse.status);

    if (!fullBodyResponse.ok) {
      const errorText = await fullBodyResponse.text();
      console.error('Replicate Flux.schnell full body error:', fullBodyResponse.status, errorText);
      return {
        success: false,
        error: `Replicate Flux.schnell full body error: ${fullBodyResponse.status} - ${errorText}`
      };
    }

    const fullBodyPrediction = await fullBodyResponse.json();
    // Replicate prediction created
    
    const fullBodyImage = await pollForCompletion(fullBodyPrediction.id);

    if (fullBodyImage) {
      console.log('✅ Full body image generated successfully');
      // Return only the full body image - client will crop it for avatar
      return {
        success: true,
        fullBodyImage,
        avatarImage: fullBodyImage, // Same image - client will crop
        service: 'Replicate Flux.schnell (cropped)'
      };
    }

    return {
      success: false,
      error: 'Failed to generate full body image'
    };

  } catch (error) {
    console.error('Replicate Flux.schnell generation error:', error);
    return {
      success: false,
      error: `Replicate Flux.schnell error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

async function pollForCompletion(predictionId: string): Promise<string | null> {
  let attempts = 0;
  const maxAttempts = 30; // 2.5 minutes max (faster for Flux.schnell)
  
  while (attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
    
    const statusResponse = await fetch(`${REPLICATE_BASE_URL}/predictions/${predictionId}`, {
      headers: {
        'Authorization': `Token ${REPLICATE_API_KEY}`,
      }
    });
    
    if (!statusResponse.ok) {
      throw new Error(`Replicate status check failed: ${statusResponse.status}`);
    }

    const status = await statusResponse.json();
    console.log('Flux.schnell status:', status.status, 'output:', status.output);
    
    if (status.status === 'succeeded') {
      // Flux.schnell returns an array of file objects, get the URL from the first one
      if (status.output && Array.isArray(status.output) && status.output.length > 0) {
        return status.output[0]; // This should be the image URL
      } else {
        throw new Error('No output received from Flux.schnell');
      }
    } else if (status.status === 'failed') {
      throw new Error(`Replicate generation failed: ${status.error}`);
    }
    
    attempts++;
  }
  
  throw new Error('Replicate generation timed out');
} 