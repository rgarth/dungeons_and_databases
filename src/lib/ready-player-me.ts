// Avatar Generation API Configuration
export const AVATAR_GENERATION_CONFIG = {
  // Hugging Face - Free Stable Diffusion with better diversity
  huggingface: {
    url: 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1',
    apiKey: process.env.HUGGINGFACE_API_KEY || '',
  }
};

// Character data interface for avatar generation
export interface CharacterAvatarData {
  race: string;
  subrace?: string;
  class: string;
  gender?: string;
  alignment?: string;
  background?: string;
  personalityTraits?: string[];
  ideals?: string[];
  bonds?: string[];
  flaws?: string[];
  appearance?: string;
  equippedWeapons?: string[];
  equippedArmor?: string[];
  selectedWeapons?: string[];
  selectedArmor?: string[];
  age?: number;
}

// Avatar generation response interface
export interface AvatarGenerationResponse {
  success: boolean;
  avatarUrl?: string;
  fullBodyUrl?: string;
  avatarImage?: string;
  fullBodyImage?: string;
  error?: string;
  service?: string;
  prompt?: string;
}

/**
 * Get random adult age for a race
 */
function getRandomAdultAge(race: string): number {
  const ageRanges: { [key: string]: { min: number; max: number } } = {
    'Human': { min: 18, max: 80 },
    'Elf': { min: 100, max: 750 },
    'Dwarf': { min: 50, max: 350 },
    'Halfling': { min: 20, max: 150 },
    'Dragonborn': { min: 15, max: 80 },
    'Small Fey Humanoid': { min: 40, max: 500 }, // Formerly Gnome
    'Half-Elf': { min: 20, max: 180 },
    'Half-Orc': { min: 14, max: 75 },
    'Tiefling': { min: 18, max: 100 },
    'Aasimar': { min: 18, max: 160 },
    'Goliath': { min: 18, max: 80 },
    'Tabaxi': { min: 18, max: 80 }
  };

  const range = ageRanges[race] || ageRanges['Human'];
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
}

/**
 * Get diversity modifiers for character appearance - STRONG anti-bias
 */
function getDiversityModifiers(): string {
  const skinTones = ['dark brown', 'black', 'deep brown', 'mahogany', 'ebony', 'chocolate', 'espresso', 'caramel', 'golden', 'bronze', 'copper', 'honey', 'amber', 'cinnamon', 'mocha', 'tan', 'olive', 'light brown', 'medium brown'];
  const bodyTypes = ['average build', 'athletic build', 'stocky build', 'slender build'];
  const features = ['small scar on cheek', 'scar on forehead', 'clean shaven', 'bearded', 'weathered appearance', 'distinctive features'];
  
  const skinTone = skinTones[Math.floor(Math.random() * skinTones.length)];
  const bodyType = bodyTypes[Math.floor(Math.random() * bodyTypes.length)];
  const feature = features[Math.floor(Math.random() * features.length)];
  
  return `${skinTone}, ${bodyType}, ${feature}`;
}

/**
 * Get age category for prompt generation (race-appropriate)
 */
function getAgeCategory(age: number, race: string): string {
  switch (race.toLowerCase()) {
    case 'elf':
      if (age < 100) return 'young adult';
      if (age < 300) return 'adult';
      if (age < 500) return 'middle-aged';
      return 'elderly';
    
    case 'dwarf':
      if (age < 50) return 'young adult';
      if (age < 150) return 'adult';
      if (age < 250) return 'middle-aged';
      return 'elderly';
    
    case 'small fey humanoid': // Formerly Gnome
      if (age < 40) return 'young adult';
      if (age < 120) return 'adult';
      if (age < 200) return 'middle-aged';
      return 'elderly';
    
    case 'halfling':
      if (age < 20) return 'young adult';
      if (age < 60) return 'adult';
      if (age < 100) return 'middle-aged';
      return 'elderly';
    
    case 'aasimar':
      if (age < 20) return 'young adult';
      if (age < 60) return 'adult';
      if (age < 100) return 'middle-aged';
      return 'elderly';
    
    default: // Human, Dragonborn, Half-Elf, Half-Orc, Tiefling, etc.
      if (age < 25) return 'young adult';
      if (age < 40) return 'adult';
      if (age < 60) return 'middle-aged';
      return 'elderly';
  }
}

/**
 * Get alignment expression for prompt generation
 */
function getAlignmentExpression(alignment: string): string {
  if (alignment.includes('Good')) return 'kind expression';
  if (alignment.includes('Evil')) return 'stern expression';
  return 'neutral expression';
}

/**
 * Create D&D 5e style prompt from character data with STRONG anti-bias
 */
function createDndPrompt(data: CharacterAvatarData): string {
  const { race, class: characterClass, gender, alignment, background, age } = data;
  
  // Use provided age or generate random adult age
  const characterAge = age || getRandomAdultAge(race);
  
  // Build the prompt with race-specific features
  let prompt = `A D&D 5e fantasy character portrait: ${race} ${characterClass}`;
  
  if (gender) {
    prompt += `, ${gender.toLowerCase()}`;
  }
  
  // Add age context
  const ageCategory = getAgeCategory(characterAge, race);
  prompt += `, ${ageCategory}`;
  
  // Add race-specific features
  switch (race.toLowerCase()) {
    case 'dragonborn':
      prompt += ', scaled skin, draconic features, reptilian eyes, horns';
      break;
    case 'elf':
      prompt += ', pointed ears, ageless beauty, ethereal features';
      break;
    case 'dwarf':
      prompt += ', stocky build, prominent beard, weathered features';
      break;
    case 'halfling':
      prompt += ', small stature, adult proportions, cheerful features';
      break;
    case 'tiefling':
      prompt += ', horns, tail, infernal heritage, unusual skin colors';
      break;
    case 'small fey humanoid': // Formerly Gnome - describe 5e gnome characteristics
      prompt += ', small stature, bright eyes, cheerful features, fey ancestry, magical aura, childlike wonder, oversized head, expressive face';
      break;
    case 'half-orc':
      prompt += ', orcish features, tusks, strong build';
      break;
    case 'aasimar':
      prompt += ', celestial features, divine aura, ethereal beauty';
      break;
    case 'goliath':
      prompt += ', large build, stone-like skin, tribal features';
      break;
    case 'tabaxi':
      prompt += ', feline features, fur, cat-like eyes';
      break;
    default: // Human, Half-Elf
      prompt += ', human features';
  }
  
  // Add alignment expression
  if (alignment) {
    const expression = getAlignmentExpression(alignment);
    prompt += `, ${expression}`;
  }
  
  // Add background context
  if (background) {
    prompt += `, ${background.toLowerCase()} background`;
  }
  
  // Add diversity modifiers (make skin tone prominent and diverse)
  const diversity = getDiversityModifiers();
  prompt += `, ${diversity}`;
  
  // Add equipment context
  if (data.equippedWeapons?.length) {
    prompt += `, armed with ${data.equippedWeapons.join(' and ')}`;
  } else if (data.selectedWeapons?.length) {
    prompt += `, armed with ${data.selectedWeapons.join(' and ')}`;
  }
  
  if (data.equippedArmor?.length) {
    prompt += `, wearing ${data.equippedArmor.join(' and ')}`;
  } else if (data.selectedArmor?.length) {
    prompt += `, wearing ${data.selectedArmor.join(' and ')}`;
  }
  
  // Add portrait specifications with STRONG anti-bias
  prompt += `, single character portrait, digital art style, fantasy RPG character portrait, detailed but clean, suitable for character avatar use, professional illustration, diverse representation, realistic proportions, practical armor, respectful character design, no sexualization, no stereotypes, inclusive design`;
  
  return prompt;
}

/**
 * Generate avatar using Hugging Face Stable Diffusion
 */
async function generateWithHuggingFace(prompt: string): Promise<AvatarGenerationResponse> {
  try {
    if (!AVATAR_GENERATION_CONFIG.huggingface.apiKey) {
      throw new Error('Hugging Face API key not configured');
    }

    const response = await fetch(AVATAR_GENERATION_CONFIG.huggingface.url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AVATAR_GENERATION_CONFIG.huggingface.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          width: 512,
          height: 512,
          guidance_scale: 7.5,
          num_inference_steps: 20
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
    }

    const imageBuffer = await response.arrayBuffer();
    const base64Image = `data:image/png;base64,${Buffer.from(imageBuffer).toString('base64')}`;

    return {
      success: true,
      avatarImage: base64Image,
      fullBodyImage: base64Image,
      service: 'Hugging Face Stable Diffusion',
      prompt: prompt
    };

  } catch (error) {
    console.error('Hugging Face generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      service: 'Hugging Face Stable Diffusion'
    };
  }
}

/**
 * Generate avatar using Hugging Face Stable Diffusion
 */
export async function generateAvatar(data: CharacterAvatarData): Promise<AvatarGenerationResponse> {
  try {
    const prompt = createDndPrompt(data);
    console.log('🎨 Hugging Face prompt:', prompt);

    // Generate with Hugging Face
    const result = await generateWithHuggingFace(prompt);
    
    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Failed to generate avatar with Hugging Face',
        service: 'Hugging Face Stable Diffusion'
      };
    }

    return result;
  } catch (error) {
    console.error('Avatar generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      service: 'Hugging Face Stable Diffusion'
    };
  }
} 