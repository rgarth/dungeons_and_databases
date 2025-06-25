import { CharacterAvatarData } from '@/types/character';

interface AvatarResult {
  success: boolean;
  fullBodyImage?: string;
  avatarImage?: string;
  error?: string;
  service?: string;
}

// Anti-bias skin tone descriptions (avoiding problematic terms)
const SKIN_TONES = [
  'warm golden', 'rich amber', 'deep mahogany', 'soft caramel', 
  'warm bronze', 'deep copper', 'rich honey', 'warm chestnut',
  'soft olive', 'warm tan', 'deep walnut', 'rich mocha'
];

// Anti-bias body type descriptions (avoiding problematic terms)
const BODY_TYPES = [
  'average build', 'slender frame', 'sturdy build', 'compact frame',
  'average stature', 'lean build', 'solid build', 'average physique'
];

// Races that need skin tone diversity
const SKIN_TONE_RACES = ['Human', 'Elf', 'Half-Elf', 'Gnome', 'Halfling', 'Goliath'];

// Utility function to get random item from array
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Server-side prompt generation with anti-bias measures
function generateServerPrompt(characterData: CharacterAvatarData): string {
  const { race, gender, class: characterClass, appearance, age } = characterData;
  
  // Start with basic character description
  const characterDescription = `${gender || 'Person'} ${race} ${characterClass}`;
  
  // Build appearance description
  let appearanceDescription = '';
  
  if (appearance && appearance.trim()) {
    // Use user-provided appearance
    appearanceDescription = `, ${appearance.trim()}`;
  } else {
    // Generate anti-bias appearance automatically
    const ageDesc = age ? `${age}-year-old` : 'adult';
    appearanceDescription = `, A ${ageDesc} ${race.toLowerCase()} with age-appropriate features`;
    
    // Add skin tone diversity for races that need it
    if (SKIN_TONE_RACES.includes(race)) {
      const skinTone = getRandomItem(SKIN_TONES);
      appearanceDescription += `, ${skinTone} skin`;
    }
    
    // Add body type diversity for all races
    const bodyType = getRandomItem(BODY_TYPES);
    appearanceDescription += `, ${bodyType}`;
  }
  
  // Create the full prompt
  const fullBodyPrompt = `A professional full-body photograph of a ${characterDescription}${appearanceDescription} in fantasy armor, standing in a dramatic pose, complete head visible, studio lighting, high quality, detailed, realistic, 8k resolution, professional photography, full figure from head to toe, clear facial features for cropping`;
  
  return fullBodyPrompt;
}

// Replicate configuration
const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;
const REPLICATE_BASE_URL = 'https://api.replicate.com/v1';

export async function generateAvatar(characterData: CharacterAvatarData): Promise<AvatarResult> {
  console.log('🎨 Starting avatar generation for:', characterData);
  
  // Use Replicate with Flux.schnell for faster generation
  if (REPLICATE_API_KEY) {
    try {
      console.log('🔄 Generating with Replicate Flux.schnell...');
      const replicateResult = await generateWithReplicateFluxSchnell(characterData);
      if (replicateResult.success) {
        console.log('✅ Replicate Flux.schnell successful');
        return { ...replicateResult, service: 'Replicate Flux.schnell' };
      }
      console.log('❌ Replicate Flux.schnell failed:', replicateResult.error);
    } catch (error) {
      console.log('❌ Replicate Flux.schnell error:', error);
    }
  }

  console.log('❌ Avatar generation service unavailable');
  return {
    success: false,
    error: 'Avatar generation service is currently unavailable'
  };
}

async function generateWithReplicateFluxSchnell(characterData: CharacterAvatarData): Promise<AvatarResult> {
  try {
    // Use a single seed for consistency
    const sharedSeed = Math.floor(Math.random() * 1000000);
    
    // Generate server-side prompt with anti-bias measures
    const fullBodyPrompt = generateServerPrompt(characterData);

    console.log('🎨 Full Body Prompt:', fullBodyPrompt);

    // Generate full body image with correct Flux.schnell parameters
    const fullBodyResponse = await fetch(`${REPLICATE_BASE_URL}/predictions`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
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
      })
    });

    if (!fullBodyResponse.ok) {
      const errorText = await fullBodyResponse.text();
      console.error('Replicate Flux.schnell full body error:', fullBodyResponse.status, errorText);
      return {
        success: false,
        error: `Replicate Flux.schnell full body error: ${fullBodyResponse.status} - ${errorText}`
      };
    }

    const fullBodyPrediction = await fullBodyResponse.json();
    const fullBodyImage = await pollForCompletion(fullBodyPrediction.id);

    if (fullBodyImage) {
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