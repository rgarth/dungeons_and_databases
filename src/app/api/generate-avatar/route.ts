import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export interface CharacterAvatarData {
  race: string;
  class: string;
  gender?: string;
  alignment?: string;
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
    
    // Validate required fields
    if (!characterData.race || !characterData.class) {
      return NextResponse.json({ error: "Race and class are required" }, { status: 400 });
    }

    // Generate avatar prompt based on character data
    const prompt = createDynamicAvatarPrompt(characterData);
    
    // Generate seed based on character data for consistency
    const seed = generateCharacterSeed(characterData);
    
    console.log('🎨 Generating avatar with prompt:', prompt.slice(0, 200) + '...');
    
    // Generate avatar using Pollinations
    const avatarResult = await generateWithPollinations(prompt, seed);
    
    if (avatarResult.success && avatarResult.buffer) {
      // Process the image - create both full body and cropped versions
      const processedImages = await processAvatarImages(avatarResult.buffer);
      
      return NextResponse.json({
        success: true,
        fullBodyImage: processedImages.fullBody,
        avatarImage: processedImages.avatar,
        prompt: prompt.slice(0, 500) // Return partial prompt for debugging
      });
    } else {
      console.error('Avatar generation failed:', avatarResult.error);
      return NextResponse.json({ 
        error: "Failed to generate avatar", 
        details: avatarResult.error 
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error("Error generating avatar:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function createDynamicAvatarPrompt(data: CharacterAvatarData): string {
  const { race, class: characterClass, gender, alignment, personalityTraits, appearance, equippedWeapons, equippedArmor } = data;
  
  // Base style elements (from your script)
  const consistentStyle = {
    artStyle: "Digital fantasy character portrait",
    lighting: "professional portrait lighting, soft shadows", 
    composition: "full body character portrait, standing pose, looking at camera",
    quality: "highly detailed, clean art style, professional illustration",
    background: "simple neutral background, fantasy RPG character portrait",
    format: "fantasy character art, detailed illustration"
  };

  // Race descriptions (adapted from your script)
  const raceDescriptions: Record<string, string> = {
    'Dragonborn': 'DRAGONBORN RACE with scaled skin covering face and body, draconic heritage, reptilian eyes, pronounced snout',
    'Dwarf': gender?.toLowerCase() === 'female' ? 
      'DWARF RACE with braided hair, stocky muscular build, shorter stature, traditional dwarven features' :
      'DWARF RACE with thick prominent beard, stocky muscular build, shorter stature, traditional dwarven features',
    'Elf': 'ELF RACE with distinctively POINTED EARS, tall slender build, angular facial features, ethereal elven beauty',
    'Gnome': 'GNOME RACE with very small size, large expressive eyes, tiny delicate stature, diminutive proportions',
    'Half-Elf': 'HALF-ELF RACE with moderately pointed ears, mixed heritage features, blend of human and elven traits',
    'Halfling': 'HALFLING RACE with small size, notably curly hair, round cheerful face, hobbit-like features',
    'Half-Orc': 'HALF-ORC RACE with prominent tusks protruding from mouth, large muscular build, orcish features',
    'Human': 'HUMAN RACE character with normal human proportions, ordinary human facial structure, realistic human features',
    'Tiefling': 'TIEFLING RACE with prominent curved horns on head, visible tail, otherworldly skin tone, fiendish heritage'
  };

  // Class styles (adapted from your script)
  const classStyles: Record<string, string> = {
    'Barbarian': 'wearing fur armor, tribal tattoos, fierce expression, primal warrior aesthetic',
    'Bard': 'holding musical instrument, colorful noble clothes, charismatic smile, artistic flair',
    'Cleric': 'wearing holy symbol, white and silver robes, serene expression, divine blessing aura',
    'Druid': 'earth-toned robes, wooden staff, calm nature-connected look, natural materials',
    'Fighter': 'chainmail armor, sword visible, confident warrior stance, battle-ready appearance',
    'Monk': 'simple brown robes, peaceful expression, disciplined posture, martial arts stance',
    'Paladin': 'gleaming plate armor, holy symbol prominent, righteous bearing, divine radiance',
    'Ranger': 'green leather armor, bow visible, alert forest-wise expression, outdoor gear',
    'Rogue': 'dark leather armor, daggers visible, cunning suspicious look, stealthy appearance',
    'Sorcerer': 'elegant colorful robes, magical energy effects, confident pose, arcane symbols',
    'Warlock': 'dark ornate robes, mysterious symbols, intense gaze, otherworldly aura',
    'Wizard': 'blue robes, pointed hat, spellbook, scholarly wise look, magical implements'
  };

  // Equipment integration
  let equipmentDesc = '';
  if (equippedArmor && equippedArmor.length > 0) {
    equipmentDesc += `wearing ${equippedArmor.join(' and ')}, `;
  }
  if (equippedWeapons && equippedWeapons.length > 0) {
    equipmentDesc += `wielding ${equippedWeapons.join(' and ')}, `;
  }

  // Personality integration
  let personalityDesc = '';
  if (personalityTraits && personalityTraits.length > 0) {
    const trait = personalityTraits[0]; // Use first trait for visual cues
    if (trait.includes('confident') || trait.includes('optimistic')) {
      personalityDesc += 'confident expression, upright posture, ';
    } else if (trait.includes('suspicious') || trait.includes('cautious')) {
      personalityDesc += 'wary expression, alert stance, ';
    } else if (trait.includes('calm') || trait.includes('serene')) {
      personalityDesc += 'peaceful expression, relaxed posture, ';
    } else if (trait.includes('fierce') || trait.includes('aggressive')) {
      personalityDesc += 'intense expression, powerful stance, ';
    }
  }

  // Alignment influence on expression/posture
  let alignmentDesc = '';
  if (alignment) {
    if (alignment.includes('Good')) {
      alignmentDesc += 'noble bearing, kind eyes, ';
    } else if (alignment.includes('Evil')) {
      alignmentDesc += 'sinister aura, calculating gaze, ';
    }
    if (alignment.includes('Lawful')) {
      alignmentDesc += 'disciplined posture, orderly appearance, ';
    } else if (alignment.includes('Chaotic')) {
      alignmentDesc += 'dynamic pose, unpredictable energy, ';
    }
  }

  // Gender specification
  const genderSpec = gender ? `${gender.toUpperCase()} CHARACTER, ${gender.toLowerCase()} person, ` : '';

  // Custom appearance integration vs anti-bias prompts
  let appearancePrompts = '';
  if (appearance && appearance.trim()) {
    // Use custom appearance if provided
    appearancePrompts = `${appearance}, `;
  } else {
    // Fight AI biases with explicit diversity prompts when no appearance specified
    appearancePrompts = generateAntiBiasPrompts(gender);
  }

  // Build the complete prompt
  const promptParts = [
    // Gender and race first
    genderSpec,
    raceDescriptions[race] || race,
    
    // Class and equipment
    classStyles[characterClass] || characterClass,
    equipmentDesc,
    
    // Personality and alignment
    personalityDesc,
    alignmentDesc,
    
    // Appearance (custom or anti-bias)
    appearancePrompts,
    
    // Technical specifications
    consistentStyle.artStyle,
    consistentStyle.composition,
    consistentStyle.lighting,
    consistentStyle.background,
    consistentStyle.quality,
    
    // Final touches
    'adult proportions, fantasy character design, detailed illustration, professional fantasy art'
  ];

  return promptParts.filter(Boolean).join(', ');
}

function generateAntiBiasPrompts(gender?: string): string {
  // Strong anti-bias prompts to fight AI stereotypes
  const skinToneOptions = [
    'DARK BROWN SKIN, deep melanin rich complexion',
    'BLACK SKIN TONE, very dark pigmentation', 
    'MEDIUM BROWN SKIN, rich ethnic features',
    'TAN OLIVE SKIN, Mediterranean complexion',
    'BRONZE SKIN TONE, warm dark coloring'
  ];
  
  const bodyTypeOptions = [
    'AVERAGE BODY TYPE, normal proportions, not thin',
    'OVERWEIGHT BUILD, fuller figure, heavier set',
    'STOCKY PHYSIQUE, broad build, solid frame',
    'ROUND BODY SHAPE, soft curves, larger size',
    'THICK BUILD, substantial frame, not skinny'
  ];
  
  const realisticFeatures = [
    'weathered face with wrinkles',
    'battle scars and marks',
    'imperfect teeth',
    'aged appearance',
    'rugged features', 
    'worn hands',
    'realistic imperfections',
    'lived-in face'
  ];
  
  // Extra anti-youth bias for female characters
  const femaleAgingPrompts = gender?.toLowerCase() === 'female' ? [
    'MIDDLE-AGED WOMAN, mature female',
    'NOT YOUNG, aged woman',
    'experienced older woman',
    'weathered mature features'
  ] : [];
  
  // Pick random options for variety
  const skinTone = skinToneOptions[Math.floor(Math.random() * skinToneOptions.length)];
  const bodyType = bodyTypeOptions[Math.floor(Math.random() * bodyTypeOptions.length)];
  const features = realisticFeatures.slice(0, 2 + Math.floor(Math.random() * 2)).join(', ');
  
  const antiBiasPrompts = [
    skinTone,
    bodyType,
    features,
    ...femaleAgingPrompts,
    'NOT WHITE SKIN, NOT PALE COMPLEXION',
    'NOT THIN BODY, NOT SKINNY FRAME', 
    'NOT YOUNG FACE, NOT PERFECT BEAUTY',
    'ordinary everyday person, realistic diversity'
  ];
  
  return antiBiasPrompts.join(', ') + ', ';
}

function generateCharacterSeed(data: CharacterAvatarData): number {
  // Create deterministic seed based on character data
  const seedString = [
    data.race,
    data.class,
    data.gender || '',
    data.alignment || '',
    (data.personalityTraits || []).join(''),
    data.appearance || ''
  ].join('_');
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    const char = seedString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash);
}

async function generateWithPollinations(prompt: string, seed: number) {
  try {
    // Pollinations API - generate 192px wide image for better cropping
    const params = new URLSearchParams({
      seed: seed.toString(),
      width: '192',
      height: '256', // Taller for full body, we'll crop to square later
      model: 'flux'
    });
    
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params}`;
    console.log('🌐 Pollinations URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'DungeonsAndDatabases/1.0'
      }
    });
    
    if (response.ok) {
      const buffer = await response.arrayBuffer();
      return { success: true, buffer: Buffer.from(buffer) };
    } else {
      return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
    }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

async function processAvatarImages(buffer: Buffer) {
  try {
    // Convert to base64 for easier handling
    const base64Full = buffer.toString('base64');
    const dataUrlFull = `data:image/png;base64,${base64Full}`;
    
    // Create a cropped avatar (192x192) by cutting off the bottom 64 pixels
    // This preserves the head which is at the top of the image
    const croppedAvatar = await cropImageFromTop(buffer);
    
    return {
      fullBody: dataUrlFull,  // 192x256 full body
      avatar: croppedAvatar   // 192x192 cropped from top
    };
  } catch (error) {
    console.error('Error processing avatar images:', error);
    throw new Error('Failed to process avatar images');
  }
}

async function cropImageFromTop(buffer: Buffer): Promise<string> {
  try {
    // Try to use sharp if available
    const sharp = (await import('sharp')).default;
    const croppedBuffer = await sharp(buffer)
      .extract({ left: 0, top: 0, width: 192, height: 192 }) // Take top 192x192 pixels
      .png()
      .toBuffer();
    
    const base64Cropped = croppedBuffer.toString('base64');
    return `data:image/png;base64,${base64Cropped}`;
  } catch {
    console.log('Sharp not available, returning original image');
    // Fallback: return original image
    const base64 = buffer.toString('base64');
    return `data:image/png;base64,${base64}`;
  }
} 