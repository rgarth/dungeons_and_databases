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
  age?: number;
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
  const { race, class: characterClass, gender, alignment, age } = data;
  
  // Base style elements - realistic photo style
  const consistentStyle = {
    artStyle: "Photorealistic portrait photography, professional studio quality",
    lighting: "professional portrait lighting, soft shadows, natural lighting", 
    composition: "SINGLE PORTRAIT SHOT, ONE PERSON ONLY, head and shoulders only, bust shot, upper body portrait, close-up character portrait, NOT full body, looking at camera, NO MULTIPLE HEADS, NO MULTIPLE FACES, SINGLE FACE, SINGLE HEAD",
    quality: "highly detailed, photorealistic, professional photography",
    background: "simple neutral background, studio portrait photography",
    format: "realistic photography, detailed photorealism"
  };

  // Alignment-based expressions
  const alignmentExpressions = {
    'Lawful Good': 'friendly smile, determined look, confident smirk, serious expression, thoughtful gaze',
    'Neutral Good': 'friendly smile, awkward smile, shy expression, thoughtful gaze, serious expression',
    'Chaotic Good': 'mischievous grin, confident smirk, determined look, friendly smile, intense stare',
    'Lawful Neutral': 'serious expression, determined look, thoughtful gaze, confident smirk, intense stare',
    'Neutral': 'neutral expression, thoughtful gaze, serious expression, awkward smile, shy expression',
    'Chaotic Neutral': 'mischievous grin, intense stare, awkward smile, confident smirk, serious expression',
    'Lawful Evil': 'scowl, angry expression, malevolent gaze, serious expression, intense stare',
    'Neutral Evil': 'frown, angry expression, malevolent gaze, serious expression, intense stare',
    'Chaotic Evil': 'scowl, angry expression, malevolent gaze, intense stare, mischievous grin'
  };

  // Get expressions based on alignment, default to neutral if not specified
  const expressions = alignment ? alignmentExpressions[alignment as keyof typeof alignmentExpressions] : alignmentExpressions['Neutral'];

  // Age-based descriptions
  const getAgeDescription = (age?: number, gender?: string, race?: string): string => {
    if (!age) {
      // No age specified - encourage diverse age representation
      if (gender === 'Male') {
        return 'varied age from young adult to elderly, diverse age representation, some young faces, some middle-aged, some elderly';
      } else if (gender === 'Female') {
        return 'varied age from young adult to elderly, diverse age representation, some young faces, some middle-aged, some elderly';
      } else {
        return 'varied age from young adult to elderly, diverse age representation';
      }
    }
    
    // Special handling for elves - they never look over 40
    if (race === 'Elf') {
      if (age < 18) return 'teenager, youthful features, smooth skin, minimal wrinkles';
      if (age < 25) return 'young adult, early twenties, youthful features, smooth skin';
      if (age < 35) return 'young adult, twenties to early thirties, some fine lines, youthful but mature';
      if (age < 45) return 'young adult, thirties to early forties, mature features, some fine lines, youthful but mature';
      // For elves 45 and older, cap at 40s appearance
      return 'young adult, thirties to early forties, mature features, some fine lines, youthful but mature, ageless elven beauty';
    }
    
    // Age specified - provide appropriate description for other races
    if (age < 18) return 'teenager, youthful features, smooth skin, minimal wrinkles';
    if (age < 25) return 'young adult, early twenties, youthful features, smooth skin';
    if (age < 35) return 'young adult, twenties to early thirties, some fine lines, youthful but mature';
    if (age < 45) return 'middle-aged, thirties to early forties, mature features, some wrinkles';
    if (age < 55) return 'middle-aged, forties to early fifties, mature features, prominent wrinkles';
    if (age < 65) return 'older adult, fifties to early sixties, weathered features, deep wrinkles';
    if (age < 75) return 'elderly, sixties to early seventies, aged features, deeply wrinkled';
    return 'elderly, aged features, deeply wrinkled, weathered face, wise appearance';
  };

  // Diverse race descriptions with distinctive features - different for males vs females
  const getRaceDescription = (race: string, gender?: string, age?: number): string => {
    const baseDescriptions: Record<string, string> = {
      'Human': gender === 'Male' 
        ? `human character${!age ? ', varied age from young adult to elderly' : ''}, average build, some thin, some overweight, NOT muscular, NOT buff, NOT built, normal physique, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, human features, realistic imperfections like scars or blemishes, varied hair styles, varied facial features, some average, some unattractive`
        : `human character${!age ? ', varied age from young adult to elderly' : ''}, some overweight, some average build, some thin, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, human features, realistic imperfections like scars or blemishes, varied hair styles, varied facial features, some average, some unattractive`,
      'Elf': gender === 'Male'
        ? 'elf character with long pointed ears, ethereal features, angular face, high cheekbones, narrow jaw, elegant bone structure, delicate nose, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, varied hair textures, unique elven features, realistic imperfections, no facial hair, clean shaven'
        : gender === 'Female'
        ? 'elf character with long pointed ears, ethereal features, angular face, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, varied hair textures, unique elven features, realistic imperfections'
        : 'elf character with long pointed ears, ethereal features, angular face, delicate features, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, varied hair textures, unique elven features, realistic imperfections, ambiguous gender, non-binary appearance, androgynous features',
      'Dwarf': 'dwarf character with thick beard, stocky build, broad shoulders, weathered face, wrinkles, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, varied hair textures, unique dwarven features, realistic imperfections',
      'Halfling': 'halfling character, small adult stature, mature adult face with wrinkles, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, varied hair textures, unique halfling features, realistic imperfections',
      'Dragonborn': 'dragonborn character with scaled skin covering face and body, weathered scales, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark scales, brown scales, black scales, olive scales, tan scales, varied scale colors, unique draconic features, realistic imperfections',
      'Gnome': 'small adult humanoid adventurer, mature adult person 3-4 feet tall, adult face with wrinkles, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, varied hair textures, unique gnomish features, realistic imperfections',
      'Tiefling': 'tiefling character with horns, tail, infernal heritage, weathered features, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin colors, unique infernal features, diverse horn styles, realistic imperfections',
      'Half-Orc': 'half-orc character with greenish skin, prominent tusks, weathered features, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, unique orcish features, diverse facial structures, realistic imperfections',
      'Half-Elf': 'half-elf character with slightly pointed ears, human-elf hybrid features, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, varied hair textures, unique mixed heritage features, realistic imperfections',
      'Goliath': 'goliath character with stone-like skin markings, weathered features, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, unique stone patterns, diverse facial features, realistic imperfections',
      'Aasimar': 'aasimar character with celestial heritage, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, varied hair textures, unique celestial features, realistic imperfections',
      'Tabaxi': 'tabaxi character with cat-like features, weathered fur, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark fur, brown fur, black fur, olive fur, tan fur, varied fur patterns, unique feline features, diverse cat-like characteristics, realistic imperfections'
    };

    return baseDescriptions[race] || 'fantasy character';
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
    'REALISTIC PROPORTIONS, varied body types',
    'FUNCTIONAL CLOTHING, appropriate for adventure',
    'MODEST ATTIRE, practical adventuring gear',
    'REALISTIC FANTASY, grounded character design',
    'NO SEXUALIZED POSES, confident stance',
    'PRACTICAL EQUIPMENT, functional gear',
    'NO AGE BIAS, varied age representation',
    'NO BEAUTY BIAS, unique features, diverse appearances',
    'NO GENDER STEREOTYPES, practical character design',
    'NO RACIAL STEREOTYPES, unique racial features',
    'NO CULTURAL APPROPRIATION, respectful design',
    'DIVERSE SKIN TONES, varied complexions',
    'DIVERSE HAIR TEXTURES, varied styles',
    'DIVERSE FACIAL FEATURES, unique characteristics',
    'DIVERSE BODY TYPES, realistic proportions',
    'DIVERSE EXPRESSIONS, unique personality',
    'DIVERSE STYLES, varied cultural elements',
    'REALISTIC IMPERFECTIONS, scars, blemishes, wrinkles',
    'VARIED HEALTH CONDITIONS, realistic representation',
    'NO IDEALIZED BEAUTY, diverse appearances',
    'REALISTIC WEAR AND TEAR, lived-in look',
    'DIVERSE PHYSICAL CONDITIONS, varied abilities',
    'UNATTRACTIVE FEATURES, realistic flaws',
    'OBESITY, realistic body types',
    'MORBID OBESITY, extreme body types',
    'FACIAL IMPERFECTIONS, realistic flaws',
    'DENTAL ISSUES, realistic teeth',
    'NO WHITE SKIN BIAS, diverse skin tones',
    'DARK SKIN, BROWN SKIN, BLACK SKIN, OLIVE SKIN, TAN SKIN',
    'VARIED SKIN TONES, diverse complexions',
    'NO EUROPEAN BIAS, diverse ethnic features',
    'NO WESTERN BIAS, diverse cultural features'
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

  const raceDesc = getRaceDescription(race, gender, age);
  const classDesc = classDescriptions[characterClass] || 'adventurer';
  const ageDesc = getAgeDescription(age, gender, race);

  // Build prompt with strong anti-bias elements and realistic photo style
  const prompt = `SINGLE PORTRAIT SHOT, ONE PERSON ONLY, head and shoulders only, bust shot, upper body portrait, close-up character portrait, NOT full body, looking at camera, NO MULTIPLE HEADS, NO MULTIPLE FACES, SINGLE FACE, SINGLE HEAD, ${genderPrefix}${raceDesc}, ${ageDesc}, ${classDesc}, ${expressions}, ${antiBiasPrompts.join(', ')}, ${consistentStyle.artStyle}, ${consistentStyle.lighting}, ${consistentStyle.background}, ${consistentStyle.quality}, ${consistentStyle.format}`;

  return prompt;
} 