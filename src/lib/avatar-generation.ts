import { CharacterAvatarData } from '@/types/character';

interface AvatarResult {
  success: boolean;
  fullBodyImage?: string;
  avatarImage?: string;
  error?: string;
  service?: string;
}

// Replicate configuration
const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;
const REPLICATE_BASE_URL = 'https://api.replicate.com/v1';

export async function generateAvatar(characterData: CharacterAvatarData): Promise<AvatarResult> {
  console.log('🎨 Starting avatar generation for:', characterData);
  
  // Use Replicate with SDXL
  if (REPLICATE_API_KEY) {
    try {
      console.log('🔄 Generating with Replicate SDXL...');
      const replicateResult = await generateWithReplicateSDXL(characterData);
      if (replicateResult.success) {
        console.log('✅ Replicate SDXL successful');
        return { ...replicateResult, service: 'Replicate SDXL' };
      }
      console.log('❌ Replicate SDXL failed:', replicateResult.error);
    } catch (error) {
      console.log('❌ Replicate SDXL error:', error);
    }
  }

  console.log('❌ Avatar generation service unavailable');
  return {
    success: false,
    error: 'Avatar generation service is currently unavailable'
  };
}

async function generateWithReplicateSDXL(characterData: CharacterAvatarData): Promise<AvatarResult> {
  try {
    const { race, gender, class: characterClass } = characterData;
    
    // Use the same seed for both images to ensure consistency
    const sharedSeed = Math.floor(Math.random() * 1000000);
    
    // Create consistent character description
    const characterDescription = `${gender} ${race} ${characterClass}`;
    
    // Create photo-style prompts for SDXL with better consistency
    const fullBodyPrompt = `A professional full-body photograph of a ${characterDescription} in fantasy armor, standing in a dramatic pose, complete head visible, studio lighting, high quality, detailed, realistic, 8k resolution, professional photography, full figure from head to toe, same person as avatar`;
    
    const avatarPrompt = `A professional headshot portrait photograph of the same ${characterDescription} in fantasy armor, close-up head and shoulders, studio lighting, high quality, detailed facial features, realistic, 8k resolution, professional photography, centered composition, same person as full body`;

    // Generate full body image with taller aspect ratio
    const fullBodyResponse = await fetch(`${REPLICATE_BASE_URL}/predictions`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
        input: {
          prompt: fullBodyPrompt,
          negative_prompt: 'cartoon, anime, low quality, blurry, distorted, deformed, ugly, bad anatomy, nsfw, inappropriate, adult content, revealing clothing, skimpy armor, close-up, portrait, cropped head, head cut off, different person',
          width: 512,
          height: 896, // Much taller for full body
          num_inference_steps: 20,
          guidance_scale: 7.5,
          seed: sharedSeed
        }
      })
    });

    if (!fullBodyResponse.ok) {
      const errorText = await fullBodyResponse.text();
      console.error('Replicate SDXL full body error:', fullBodyResponse.status, errorText);
      return {
        success: false,
        error: `Replicate SDXL full body error: ${fullBodyResponse.status} - ${errorText}`
      };
    }

    const fullBodyPrediction = await fullBodyResponse.json();
    const fullBodyImage = await pollForCompletion(fullBodyPrediction.id);

    // Generate avatar image as square headshot with same seed
    const avatarResponse = await fetch(`${REPLICATE_BASE_URL}/predictions`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
        input: {
          prompt: avatarPrompt,
          negative_prompt: 'cartoon, anime, low quality, blurry, distorted, deformed, ugly, bad anatomy, nsfw, inappropriate, adult content, revealing clothing, skimpy armor, full body, wide shot, body cut off, different person',
          width: 512,
          height: 512,
          num_inference_steps: 20,
          guidance_scale: 7.5,
          seed: sharedSeed
        }
      })
    });

    if (!avatarResponse.ok) {
      const errorText = await avatarResponse.text();
      console.error('Replicate SDXL avatar error:', avatarResponse.status, errorText);
      return {
        success: false,
        error: `Replicate SDXL avatar error: ${avatarResponse.status} - ${errorText}`
      };
    }

    const avatarPrediction = await avatarResponse.json();
    const avatarImage = await pollForCompletion(avatarPrediction.id);

    if (fullBodyImage && avatarImage) {
      return {
        success: true,
        fullBodyImage,
        avatarImage,
        service: 'Replicate SDXL'
      };
    }

    return {
      success: false,
      error: 'Failed to generate both full body and avatar images'
    };

  } catch (error) {
    console.error('Replicate SDXL generation error:', error);
    return {
      success: false,
      error: `Replicate SDXL error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

async function pollForCompletion(predictionId: string): Promise<string | null> {
  let attempts = 0;
  const maxAttempts = 60; // 5 minutes max
  
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
    
    if (status.status === 'succeeded') {
      return status.output[0]; // Return the first image URL
    } else if (status.status === 'failed') {
      throw new Error(`Replicate generation failed: ${status.error}`);
    }
    
    attempts++;
  }
  
  throw new Error('Replicate generation timed out');
} 