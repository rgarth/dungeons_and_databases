import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { 
  getAppearanceDescription, 
  getDiverseAgeDescription,
  getSupportedRaces
} from "@/lib/dnd/age-system";

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
    console.log('🎨 Subrace:', characterData.subrace);

    const prompt = createDynamicAvatarPrompt(characterData);
    const seed = Math.floor(Math.random() * 1000000);

    console.log(`🎨 FULL PROMPT: ${prompt}`);
    console.log(`🎨 Prompt length: ${prompt.length} characters`);

    // Try FLUX.1 Schnell via Replicate first (faster, better for D&D content)
    const avatarResult = await generateWithFluxSchnell(prompt, seed);
    
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
    
    console.log('🔑 REPLICATE TOKEN CHECK:');
    console.log('🔑 Token exists:', !!replicateToken);
    console.log('🔑 Token length:', replicateToken?.length);
    console.log('🔑 Token starts with:', replicateToken?.substring(0, 10) + '...');
    
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

function createDynamicAvatarPrompt(data: CharacterAvatarData): string {
  const { race, subrace, class: characterClass, gender, alignment, age } = data;
  
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
      if (race && getSupportedRaces().includes(race)) {
        return getDiverseAgeDescription(race, gender, subrace);
      }
      
      if (gender === 'Male') {
        return 'varied age from young adult to elderly, diverse age representation, some young faces, some middle-aged, some elderly';
      } else if (gender === 'Female') {
        return 'varied age from young adult to elderly, diverse age representation, some young faces, some middle-aged, some elderly';
      } else {
        return 'varied age from young adult to elderly, diverse age representation';
      }
    }
    
    // Use the new age system for supported races
    if (race && getSupportedRaces().includes(race)) {
      return getAppearanceDescription(race, age, gender);
    }
    
    // Fallback for unsupported races - provide appropriate description
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
  const getRaceDescription = (race: string, subrace?: string, gender?: string, age?: number): string => {
    // Use the new age system for supported races
    if (getSupportedRaces().includes(race)) {
      if (age) {
        // For dragonborn, always include the scaled appearance regardless of age
        if (race === 'Dragonborn') {
          const ageDesc = getAppearanceDescription(race, age, gender);
          return `DRAGONBORN RACE with scaled skin covering face and body, draconic heritage, reptilian eyes, pronounced snout, ${ageDesc}, weathered scales, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark scales, brown scales, black scales, olive scales, tan scales, varied scale colors, unique draconic features, realistic imperfections`;
        }
        // For tieflings, always include horns, tail, and infernal features
        if (race === 'Tiefling') {
          const ageDesc = getAppearanceDescription(race, age, gender);
          let tieflingDesc = `tiefling character with horns, tail, infernal heritage, ${ageDesc}`;
          if (subrace) {
            tieflingDesc += `, ${subrace.toLowerCase()} heritage`;
          }
          return `${tieflingDesc}, weathered features, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin colors, unique infernal features, diverse horn styles, demonic features, realistic imperfections`;
        }
        // For half-orcs, always include greenish skin, tusks, and orcish features
        if (race === 'Half-Orc') {
          const ageDesc = getAppearanceDescription(race, age, gender);
          return `half-orc character with greenish skin, prominent tusks, ${ageDesc}, weathered features, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, unique orcish features, diverse facial structures, muscular build, realistic imperfections`;
        }
        // For gnomes, always include the descriptive features without using the word "gnome"
        if (race === 'Gnome') {
          const ageDesc = getAppearanceDescription(race, age, gender);
          let gnomeDesc = `small ADULT humanoid adventurer, mature adult person 3-4 feet tall, ADULT FACE with wrinkles and age lines, pointy ears like elf, intelligent sparkling eyes, high cheekbones, prominent nose, earth-toned skin, clean-shaven ADULT face, NO BEARD, ADULT proportions not child, weathered mature features, fantasy adventurer clothing, small ADULT person with elf-like features, humanoid ADULT not lawn ornament, NOT CHILD, NOT YOUNG FACE, mature adult character, ${ageDesc}`;
          if (subrace === 'Forest Gnome') {
            gnomeDesc += ', forest-dwelling features, natural camouflage, earthy tones';
          } else if (subrace === 'Rock Gnome') {
            gnomeDesc += ', inventive features, tinkering tools, mechanical accessories';
          }
          return `${gnomeDesc}, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, varied hair textures, realistic imperfections`;
        }
        // For aasimar and subraces, use the age system directly
        if (race === 'Aasimar' || race === 'Protector Aasimar' || race === 'Scourge Aasimar' || race === 'Fallen Aasimar') {
          const ageDesc = getAppearanceDescription(race, age, gender);
          let aasimarDesc = `${race.toLowerCase()} character with ${ageDesc}`;
          
          // Add distinctive Aasimar features
          aasimarDesc += ', celestial heritage, glowing eyes, radiant features, divine markings, otherworldly beauty, ethereal appearance, angelic features, divine aura';
          
          // Add subrace-specific features
          if (subrace === 'Protector Aasimar') {
            aasimarDesc += ', protective aura, benevolent appearance, guardian features, healing presence, golden glow';
          } else if (subrace === 'Scourge Aasimar') {
            aasimarDesc += ', justice-seeking features, determined expression, righteous appearance, punishing aura, fiery glow';
          } else if (subrace === 'Fallen Aasimar') {
            aasimarDesc += ', corrupted celestial heritage, dark aura, fallen features, corrupted appearance, necrotic presence, shadowy glow';
          }
          
          return `${aasimarDesc}, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, varied skin tones, varied hair textures, realistic imperfections`;
        }
        // For goliaths, always include stone-like skin markings and massive build
        if (race === 'Goliath') {
          const ageDesc = getAppearanceDescription(race, age, gender);
          return `goliath character with stone-like skin markings, massive build, giant heritage, towering height, ${ageDesc}, weathered features, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, unique stone patterns, diverse facial features, realistic imperfections`;
        }
        // For elves and subraces, use the age system directly
        if (race === 'Elf' || race === 'High Elf' || race === 'Wood Elf' || race === 'Drow') {
          const ageDesc = getAppearanceDescription(race, age, gender);
          return `${race.toLowerCase()} character with ${ageDesc}, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, varied skin tones, varied hair textures, realistic imperfections`;
        }
        // For dwarves and subraces, use the age system directly
        if (race === 'Dwarf' || race === 'Hill Dwarf' || race === 'Mountain Dwarf') {
          const ageDesc = getAppearanceDescription(race, age, gender);
          return `${race.toLowerCase()} character with ${ageDesc}, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, varied skin tones, varied hair textures, realistic imperfections`;
        }
        // For halflings and subraces, use the age system directly
        if (race === 'Halfling' || race === 'Lightfoot Halfling' || race === 'Stout Halfling') {
          const ageDesc = getAppearanceDescription(race, age, gender);
          return `${race.toLowerCase()} character with ${ageDesc}, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, varied skin tones, varied hair textures, realistic imperfections`;
        }
        return getAppearanceDescription(race, age, gender);
      }
      return getDiverseAgeDescription(race, gender, subrace);
    }

    // Fallback descriptions for unsupported races
    const baseDescriptions: Record<string, string> = {
      'Halfling': 'halfling character, small adult stature, mature adult face with wrinkles, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, varied hair textures, unique halfling features, realistic imperfections',
      'Dragonborn': 'dragonborn character with scaled skin covering face and body, weathered scales, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark scales, brown scales, black scales, olive scales, tan scales, varied scale colors, unique draconic features, realistic imperfections',
      'Gnome': 'small ADULT humanoid adventurer, mature adult person 3-4 feet tall, ADULT FACE with wrinkles and age lines, pointy ears like elf, intelligent sparkling eyes, high cheekbones, prominent nose, earth-toned skin, clean-shaven ADULT face, NO BEARD, ADULT proportions not child, weathered mature features, fantasy adventurer clothing, small ADULT person with elf-like features, humanoid ADULT not lawn ornament, NOT CHILD, NOT YOUNG FACE, mature adult character, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, varied hair textures, realistic imperfections',
      'Tiefling': 'tiefling character with horns, tail, infernal heritage, weathered features, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin colors, unique infernal features, diverse horn styles, realistic imperfections',
      'Half-Orc': 'half-orc character with greenish skin, prominent tusks, weathered features, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, unique orcish features, diverse facial structures, realistic imperfections',
      'Half-Elf': 'half-elf character with slightly pointed ears, human-elf hybrid features, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, varied hair textures, unique mixed heritage features, realistic imperfections',
      'Goliath': 'goliath character with stone-like skin markings, weathered features, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, unique stone patterns, diverse facial features, realistic imperfections',
      'Aasimar': 'aasimar character with celestial heritage, glowing eyes, radiant features, divine markings, otherworldly beauty, ethereal appearance, angelic features, divine aura, scars, acne, crooked teeth, missing teeth, bad teeth, double chin, fat face, obese, morbidly obese, ugly, unattractive, asymmetrical face, dark skin, brown skin, black skin, olive skin, tan skin, varied skin tones, varied hair textures, unique celestial features, realistic imperfections',
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
    'DARK SKIN, BROWN SKIN, BLACK SKIN, OLIVE SKIN, TAN SKIN',
    'NOT WHITE, NOT PALE, NOT FAIR-SKINNED, NOT CAUCASIAN',
    'NO WHITE SKIN BIAS, diverse skin tones',
    'VARIED SKIN TONES, diverse complexions',
    'NO EUROPEAN BIAS, diverse ethnic features',
    'NO WESTERN BIAS, diverse cultural features',
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
    'DENTAL ISSUES, realistic teeth'
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

  const raceDesc = getRaceDescription(subrace || race, undefined, gender, age);
  const classDesc = classDescriptions[characterClass] || 'adventurer';
  const ageDesc = getAgeDescription(age, gender, subrace || race);

  console.log('🎨 RACE DESCRIPTION:', raceDesc);
  console.log('🎨 SUBRACE:', subrace);
  console.log('🎨 RACE:', race);
  console.log('🎨 EFFECTIVE RACE FOR AVATAR:', subrace || race);

  // For Drow, exclude diversity prompts that conflict with their consistent dark appearance
  const isDrow = subrace === 'Drow';
  const promptsToUse = isDrow 
    ? antiBiasPrompts.filter(prompt => 
        !prompt.includes('DIVERSE') && 
        !prompt.includes('varied') && 
        !prompt.includes('VARIED') &&
        !prompt.includes('diverse')
      )
    : antiBiasPrompts;

  // Build prompt with strong anti-bias elements and realistic photo style
  const prompt = `${consistentStyle.composition}, ${genderPrefix}${raceDesc}, ${ageDesc}, ${classDesc}, ${expressions}, ${promptsToUse.join(', ')}, ${consistentStyle.artStyle}, ${consistentStyle.lighting}, ${consistentStyle.background}, ${consistentStyle.quality}, ${consistentStyle.format}`;

  return prompt;
} 