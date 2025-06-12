import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export interface CharacterAvatarData {
  race: string;
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
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const characterData: CharacterAvatarData = await request.json();
    console.log('🎨 Generating avatar for character:', characterData);

    const prompt = createDynamicAvatarPrompt(characterData);
    const seed = Math.floor(Math.random() * 1000000);

    console.log(`🎨 Generating avatar with prompt: ${prompt.substring(0, 100)}...`);

    // Try FLUX.1 Schnell via Replicate first (faster, better for D&D content)
    let avatarResult = await generateWithFluxSchnell(prompt, seed);
    
    // Fallback to Pollinations if FLUX.1 Schnell fails
    if (!avatarResult.success) {
      console.log('⚠️ FLUX.1 Schnell failed, falling back to Pollinations:', avatarResult.error);
      avatarResult = await generateWithPollinations(prompt, seed);
    }

    if (!avatarResult.success) {
      return NextResponse.json({ 
        error: avatarResult.error || "Failed to generate avatar" 
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      fullBodyImage: avatarResult.fullBodyImage,
      avatarImage: avatarResult.avatarImage,
      prompt: prompt,
      service: avatarResult.service
    });

  } catch (error) {
    console.error('Avatar generation error:', error);
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 });
  }
}

async function generateWithFluxSchnell(prompt: string, seed: number) {
  try {
    const replicateToken = process.env.REPLICATE_API_TOKEN;
    
    if (!replicateToken) {
      throw new Error('Replicate API token not configured');
    }

    console.log('🚀 Trying FLUX.1 Schnell via Replicate...');

    // Import Replicate dynamically
    const Replicate = (await import('replicate')).default;
    const replicate = new Replicate({
      auth: replicateToken,
    });

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: prompt,
          aspect_ratio: "2:3", // Portrait orientation for better character framing
          num_outputs: 1,
          seed: seed,
          num_inference_steps: 4, // Fast generation with Schnell
          output_format: "jpg",
          output_quality: 90
        }
      }
    );

    // Handle output - FLUX.1 Schnell returns an array of URLs
    const imageUrl = Array.isArray(output) ? output[0] : output;
    
    if (!imageUrl) {
      throw new Error('No image URL returned from FLUX.1 Schnell');
    }
    
    // Convert to base64 and resize for efficiency
    const imageResponse = await fetch(imageUrl);
    const originalBuffer = await imageResponse.arrayBuffer();
    
    // Debug: Log original image size
    console.log(`📏 FLUX.1 Schnell original size: ${originalBuffer.byteLength} bytes`);
    
    // Resize image to reasonable dimensions for avatars using Sharp
    const sharp = (await import('sharp')).default;
    
    // Keep original aspect ratio for full body, just resize to reasonable dimensions
    const resizedFullBody = await sharp(Buffer.from(originalBuffer))
      .resize(512, 768, { 
        fit: 'inside', // Keep aspect ratio, don't crop
        withoutEnlargement: true
      })
      .jpeg({ quality: 85 })
      .toBuffer();
    
    // Only crop for the square avatar
    const resizedAvatar = await sharp(Buffer.from(originalBuffer))
      .resize(192, 192, { 
        fit: 'cover',
        position: 'top' // Focus on head/upper body
      })
      .jpeg({ quality: 85 })
      .toBuffer();
    
    const fullBodyBase64 = `data:image/jpeg;base64,${resizedFullBody.toString('base64')}`;
    const avatarBase64 = `data:image/jpeg;base64,${resizedAvatar.toString('base64')}`;
    
    console.log(`📏 Resized full body: ${resizedFullBody.byteLength} bytes, avatar: ${resizedAvatar.byteLength} bytes`);
    console.log('✅ FLUX.1 Schnell generation successful');
    return {
      success: true,
      fullBodyImage: fullBodyBase64,
      avatarImage: avatarBase64,
      service: '🚀 FLUX.1 Schnell (Replicate)'
    };

  } catch (error) {
    console.error('FLUX.1 Schnell error:', error);
    return {
      success: false,
      error: `FLUX.1 Schnell generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

async function generateWithPollinations(prompt: string, seed: number) {
  try {
    console.log('🌐 Using Pollinations fallback...');
    
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${seed}&width=192&height=256&model=flux`;
    console.log('🌐 Pollinations URL:', pollinationsUrl);

    const response = await fetch(pollinationsUrl);
    
    if (!response.ok) {
      throw new Error(`Pollinations API error: ${response.status}`);
    }

    const imageBuffer = await response.arrayBuffer();
    const base64Image = `data:image/jpeg;base64,${Buffer.from(imageBuffer).toString('base64')}`;
    
    console.log('✅ Pollinations generation successful');
    return {
      success: true,
      fullBodyImage: base64Image,
      avatarImage: base64Image,
      service: '🌐 Pollinations (Free)'
    };

  } catch (error) {
    console.error('Pollinations error:', error);
    return {
      success: false,
      error: `Pollinations generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

function createDynamicAvatarPrompt(data: CharacterAvatarData): string {
  const { race, class: characterClass, gender } = data;
  
  // Base style elements
  const consistentStyle = {
    artStyle: "Photorealistic portrait photography",
    lighting: "professional portrait lighting, soft shadows, natural lighting", 
    composition: "PORTRAIT SHOT, head and shoulders only, bust shot, upper body portrait, close-up character portrait, NOT full body, looking at camera",
    quality: "highly detailed, photorealistic, professional photography",
    background: "simple neutral background, studio portrait photography",
    format: "realistic photography, detailed photorealism"
  };

  // Strong race descriptions with distinctive features
  const raceDescriptions: Record<string, string> = {
    'Human': 'single human character, one person only, individual human warrior, solo character with human facial features',
    'Elf': 'elf character with long pointed ears, ethereal features, angular face',
    'Dwarf': 'dwarf character with thick beard, stocky build, broad shoulders',
    'Halfling': 'halfling character, small adult stature, mature adult face, adult proportions, NOT child, NOT young, adult halfling person',
    'Dragonborn': 'DRAGONBORN RACE with scaled skin covering face and body, draconic heritage, reptilian eyes, pronounced snout',
    'Gnome': 'small ADULT humanoid adventurer, mature adult person 3-4 feet tall, ADULT FACE with wrinkles and age lines, pointy ears like elf, intelligent sparkling eyes, high cheekbones, prominent nose, earth-toned skin, clean-shaven ADULT face, NO BEARD, ADULT proportions not child, weathered mature features, fantasy adventurer clothing, small ADULT person with elf-like features, humanoid ADULT not lawn ornament, NOT CHILD, NOT YOUNG FACE, mature adult character',
    'Tiefling': 'tiefling character with horns, tail, infernal heritage, unusual skin color',
    'Half-Orc': 'half-orc character with greenish skin, prominent tusks, muscular build',
    'Half-Elf': 'half-elf character with slightly pointed ears, human-elf hybrid features',
    'Goliath': 'goliath character with stone-like skin markings, massive build, giant heritage',
    'Aasimar': 'aasimar character with celestial heritage, glowing eyes, radiant features',
    'Tabaxi': 'tabaxi character with cat-like features, feline face, fur covering body'
  };

  // Practical class descriptions
  const classDescriptions: Record<string, string> = {
    'Fighter': 'warrior with practical armor and weapon',
    'Wizard': 'spellcaster with scholarly robes',
    'Rogue': 'stealthy character with practical leather armor',
    'Cleric': 'holy warrior with practical armor and symbol',
    'Ranger': 'forest guardian with practical gear and bow',
    'Paladin': 'holy knight with practical armor',
    'Barbarian': 'tribal warrior with practical gear',
    'Bard': 'performer with practical clothing',
    'Druid': 'nature guardian with natural materials',
    'Monk': 'martial artist with simple robes',
    'Sorcerer': 'magical character with practical clothing',
    'Warlock': 'mystical character with practical attire'
  };

  // Anti-trope prompts - VERY IMPORTANT
  const antiTropePrompts = [
    'PRACTICAL ARMOR, realistic protection, full coverage',
    'NO CHAINMAIL BIKINI, NO REVEALING ARMOR',
    'REALISTIC PROPORTIONS, normal body shape',
    'FUNCTIONAL CLOTHING, appropriate for adventure',
    'MODEST ATTIRE, practical adventuring gear',
    'REALISTIC FANTASY, grounded character design',
    'NO SEXUALIZED POSES, confident stance',
    'PRACTICAL EQUIPMENT, functional gear'
  ];

  // Simple gender handling
  let genderPrefix = '';
  if (gender === 'Male') {
    genderPrefix = 'male ';
  } else if (gender === 'Female') {
    genderPrefix = 'female ';
  }

  const raceDesc = raceDescriptions[race] || 'fantasy character';
  const classDesc = classDescriptions[characterClass] || 'adventurer';

  // Build prompt with strong anti-trope elements
  const prompt = `${genderPrefix}${raceDesc}, ${classDesc}, ${antiTropePrompts.join(', ')}, ${consistentStyle.artStyle}, ${consistentStyle.composition}, ${consistentStyle.lighting}, ${consistentStyle.background}, ${consistentStyle.quality}, ${consistentStyle.format}`;

  return prompt;
} 