import fs from 'fs';

// Example API integrations for avatar generation
// Replace the placeholder function in generate-avatars.js with these

// Option 1: OpenAI DALL-E 3 (Free tier with rate limits)
export async function generateWithOpenAI(prompt, filename, apiKey) {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024', // Will need to resize to 192x192
        quality: 'standard',
        response_format: 'url'
      })
    });

    const data = await response.json();
    
    if (data.data && data.data[0]) {
      const imageUrl = data.data[0].url;
      
      // Download and save the image
      const imageResponse = await fetch(imageUrl);
      const buffer = await imageResponse.buffer();
      
      // TODO: Resize to 192x192 using sharp or canvas
      fs.writeFileSync(filename, buffer);
      
      return { success: true, path: filename };
    }
    
    return { success: false, error: 'No image generated' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Option 2: Google Gemini (Free tier)
export async function generateWithGemini(prompt, filename, apiKey) {
  try {
    // Note: Google's Imagen API might have different endpoints
    // This is a placeholder for when it becomes available
    
    // TODO: Implement when Google's Imagen API becomes available
    // const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/imagen:generateImage?key=${apiKey}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     prompt: prompt,
    //     outputFormat: 'png',
    //     aspectRatio: '1:1' // Square for avatars
    //   })
    // });

    // const data = await response.json();
    
    // Handle response and save image
    // Implementation depends on Google's actual API structure
    
    return { success: false, error: 'Gemini image API not yet available' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Option 3: Stable Diffusion (Hugging Face free tier)
export async function generateWithHuggingFace(prompt, filename, apiKey) {
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1',
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
            guidance_scale: 7.5,
            num_inference_steps: 20
          }
        })
      }
    );

    if (response.ok) {
      const buffer = await response.buffer();
      
      // TODO: Resize to 192x192
      fs.writeFileSync(filename, buffer);
      
      return { success: true, path: filename };
    }
    
    return { success: false, error: `HTTP ${response.status}` };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Option 4: Free alternatives (may have limitations)
export async function generateWithFreeService(prompt, filename) {
  try {
    // Example with free services like:
    // - DeepAI (free tier)
    // - Craiyon (formerly DALL-E mini)
    // - Various other free image generation APIs
    
    // DeepAI example:
    const response = await fetch('https://api.deepai.org/api/text2img', {
      method: 'POST',
      headers: {
        'Api-Key': 'your-free-api-key-here', // Free tier available
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `text=${encodeURIComponent(prompt)}`
    });

    const data = await response.json();
    
    if (data.output_url) {
      const imageResponse = await fetch(data.output_url);
      const buffer = await imageResponse.buffer();
      
      fs.writeFileSync(filename, buffer);
      return { success: true, path: filename };
    }
    
    return { success: false, error: 'No image URL returned' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Image resizing utility (requires sharp package)
export async function resizeImage(inputPath, outputPath, width = 192, height = 192) {
  try {
    // You'll need to install sharp: npm install sharp
    const sharp = (await import('sharp')).default;
    
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(outputPath);
      
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Rate limiting utility for free tiers
export class RateLimiter {
  constructor(requestsPerMinute = 10) {
    this.requestsPerMinute = requestsPerMinute;
    this.requests = [];
  }
  
  async waitIfNeeded() {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    
    // Remove requests older than 1 minute
    this.requests = this.requests.filter(timestamp => timestamp > oneMinuteAgo);
    
    // If we're at the limit, wait
    if (this.requests.length >= this.requestsPerMinute) {
      const oldestRequest = this.requests[0];
      const waitTime = 60000 - (now - oldestRequest);
      
      if (waitTime > 0) {
        console.log(`⏳ Rate limit reached. Waiting ${Math.ceil(waitTime / 1000)} seconds...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    
    // Record this request
    this.requests.push(now);
  }
}

// Configuration for different services
export const API_CONFIGS = {
  openai: {
    name: 'OpenAI DALL-E 3',
    rateLimit: 5, // requests per minute for free tier
    generator: generateWithOpenAI,
    requiresKey: true
  },
  huggingface: {
    name: 'Hugging Face Stable Diffusion',
    rateLimit: 10, // requests per minute for free tier
    generator: generateWithHuggingFace,
    requiresKey: true
  },
  deepai: {
    name: 'DeepAI Text2Img',
    rateLimit: 5, // requests per minute for free tier
    generator: generateWithFreeService,
    requiresKey: true
  },
  // Add more services as they become available
};

export default { 
  generateWithOpenAI, 
  generateWithGemini, 
  generateWithHuggingFace, 
  generateWithFreeService,
  resizeImage,
  RateLimiter,
  API_CONFIGS
}; 