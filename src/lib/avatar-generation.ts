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
    const { race, gender, class: characterClass, appearance } = characterData;
    
    // Use a single seed for consistency
    const sharedSeed = Math.floor(Math.random() * 1000000);
    
    // Create consistent character description with appearance details
    const characterDescription = `${gender} ${race} ${characterClass}`;
    
    // Include appearance details in the prompt for anti-bias measures
    const appearanceDetails = appearance ? `, ${appearance}` : '';
    
    // Generate only the full body image - we'll crop it for the avatar
    const fullBodyPrompt = `A professional full-body photograph of a ${characterDescription}${appearanceDetails} in fantasy armor, standing in a dramatic pose, complete head visible, studio lighting, high quality, detailed, realistic, 8k resolution, professional photography, full figure from head to toe, clear facial features for cropping`;

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