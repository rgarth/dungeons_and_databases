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
  
  // Base style elements - more diverse and inclusive
  const consistentStyle = {
    artStyle: "Fantasy character portrait, diverse representation",
    lighting: "dramatic lighting, natural shadows, studio quality", 
    composition: "PORTRAIT SHOT, head and shoulders only, bust shot, upper body portrait, close-up character portrait, NOT full body, looking at camera",
    quality: "highly detailed, fantasy art style, professional quality",
    background: "simple neutral background, fantasy character portrait",
    format: "fantasy character art, detailed character design"
  };

  // Diverse race descriptions with distinctive features
  const raceDescriptions: Record<string, string> = {
    'Human': 'human character with diverse features, individual warrior, unique facial characteristics, varied skin tones, diverse human features',
    'Elf': 'elf character with long pointed ears, ethereal features, angular face, diverse skin tones, varied hair textures, unique elven features',
    'Dwarf': 'dwarf character with thick beard, stocky build, broad shoulders, diverse skin tones, varied hair textures, unique dwarven features',
    'Halfling': 'halfling character, small adult stature, mature adult face, adult proportions, diverse skin tones, varied hair textures, unique halfling features',
    'Dragonborn': 'dragonborn character with scaled skin covering face and body, draconic heritage, reptilian eyes, pronounced snout, varied scale colors, unique draconic features',
    'Gnome': 'small adult humanoid adventurer, mature adult person 3-4 feet tall, adult face with wrinkles and age lines, pointy ears like elf, intelligent sparkling eyes, high cheekbones, prominent nose, diverse skin tones, varied hair textures, unique gnomish features',
    'Tiefling': 'tiefling character with horns, tail, infernal heritage, varied skin colors, unique infernal features, diverse horn styles',
    'Half-Orc': 'half-orc character with greenish skin, prominent tusks, muscular build, varied skin tones, unique orcish features, diverse facial structures',
    'Half-Elf': 'half-elf character with slightly pointed ears, human-elf hybrid features, diverse skin tones, varied hair textures, unique mixed heritage features',
    'Goliath': 'goliath character with stone-like skin markings, massive build, giant heritage, varied skin tones, unique stone patterns, diverse facial features',
    'Aasimar': 'aasimar character with celestial heritage, glowing eyes, radiant features, diverse skin tones, varied hair textures, unique celestial features',
    'Tabaxi': 'tabaxi character with cat-like features, feline face, fur covering body, varied fur patterns, unique feline features, diverse cat-like characteristics'
  };

  // Practical class descriptions with diverse elements
  const classDescriptions: Record<string, string> = {
    'Fighter': 'warrior with practical armor and weapon, diverse combat style, unique warrior features',
    'Wizard': 'spellcaster with scholarly robes, diverse magical style, unique arcane features',
    'Rogue': 'stealthy character with practical leather armor, diverse stealth style, unique rogue features',
    'Cleric': 'holy warrior with practical armor and symbol, diverse religious style, unique divine features',
    'Ranger': 'forest guardian with practical gear and bow, diverse wilderness style, unique ranger features',
    'Paladin': 'holy knight with practical armor, diverse holy style, unique paladin features',
    'Barbarian': 'tribal warrior with practical gear, diverse tribal style, unique barbarian features',
    'Bard': 'performer with practical clothing, diverse performance style, unique bard features',
    'Druid': 'nature guardian with natural materials, diverse nature style, unique druid features',
    'Monk': 'martial artist with simple robes, diverse martial style, unique monk features',
    'Sorcerer': 'magical character with practical clothing, diverse magical style, unique sorcerer features',
    'Warlock': 'mystical character with practical attire, diverse mystical style, unique warlock features'
  };

  // Comprehensive anti-bias and anti-trope prompts
  const antiBiasPrompts = [
    'DIVERSE REPRESENTATION, varied features, unique characteristics',
    'PRACTICAL ARMOR, realistic protection, full coverage',
    'NO CHAINMAIL BIKINI, NO REVEALING ARMOR',
    'REALISTIC PROPORTIONS, normal body shape',
    'FUNCTIONAL CLOTHING, appropriate for adventure',
    'MODEST ATTIRE, practical adventuring gear',
    'REALISTIC FANTASY, grounded character design',
    'NO SEXUALIZED POSES, confident stance',
    'PRACTICAL EQUIPMENT, functional gear',
    'NO AGE BIAS, mature features, varied age representation',
    'NO BEAUTY BIAS, unique features, diverse appearances',
    'NO GENDER STEREOTYPES, practical character design',
    'NO RACIAL STEREOTYPES, unique racial features',
    'NO CULTURAL APPROPRIATION, respectful design',
    'DIVERSE SKIN TONES, varied complexions',
    'DIVERSE HAIR TEXTURES, varied styles',
    'DIVERSE FACIAL FEATURES, unique characteristics',
    'DIVERSE BODY TYPES, realistic proportions',
    'DIVERSE EXPRESSIONS, unique personality',
    'DIVERSE STYLES, varied cultural elements'
  ];

  // Gender-neutral handling
  let genderPrefix = '';
  if (gender === 'Male') {
    genderPrefix = 'male ';
  } else if (gender === 'Female') {
    genderPrefix = 'female ';
  } else {
    genderPrefix = 'gender-neutral ';
  }

  const raceDesc = raceDescriptions[race] || 'fantasy character';
  const classDesc = classDescriptions[characterClass] || 'adventurer';

  // Build prompt with strong anti-bias elements
  const prompt = `${genderPrefix}${raceDesc}, ${classDesc}, ${antiBiasPrompts.join(', ')}, ${consistentStyle.artStyle}, ${consistentStyle.composition}, ${consistentStyle.lighting}, ${consistentStyle.background}, ${consistentStyle.quality}, ${consistentStyle.format}`;

  return prompt;
} 