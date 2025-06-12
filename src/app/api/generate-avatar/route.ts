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
    console.log('🎨 Generating avatar for character:', characterData);

    const prompt = createDynamicAvatarPrompt(characterData);
    const seed = Math.floor(Math.random() * 1000000);

    console.log(`🎨 Generating avatar with prompt: ${prompt.substring(0, 100)}...`);

    // Try Leonardo AI first, fallback to Pollinations
    let avatarResult = await generateWithLeonardoAI(prompt, seed);
    
    if (!avatarResult.success) {
      console.log('⚠️ Leonardo AI failed, falling back to Pollinations:', avatarResult.error);
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

async function generateWithLeonardoAI(prompt: string, seed: number) {
  try {
    const leonardoApiKey = process.env.LEONARDO_API_KEY;
    
    if (!leonardoApiKey) {
      throw new Error('Leonardo AI API key not configured');
    }

    console.log('🎨 Trying Leonardo AI...');

    const response = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${leonardoApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        modelId: "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3", // Leonardo Anime XL
        width: 512,
        height: 768,
        num_images: 1,
        guidance_scale: 7,
        seed: seed,
        presetStyle: "DYNAMIC",
        scheduler: "DPM_SOLVER",
        public: false,
        promptMagic: true
      }),
    });

    if (!response.ok) {
      throw new Error(`Leonardo AI API error: ${response.status}`);
    }

    const data = await response.json();
    const generationId = data.sdGenerationJob.generationId;

    // Poll for completion
    let attempts = 0;
    const maxAttempts = 30;
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const statusResponse = await fetch(`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`, {
        headers: {
          'Authorization': `Bearer ${leonardoApiKey}`,
        },
      });

      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        
        if (statusData.generations_by_pk?.status === 'COMPLETE' && statusData.generations_by_pk?.generated_images?.length > 0) {
          const imageUrl = statusData.generations_by_pk.generated_images[0].url;
          
          // Convert to base64
          const imageResponse = await fetch(imageUrl);
          const imageBuffer = await imageResponse.arrayBuffer();
          const base64Image = `data:image/jpeg;base64,${Buffer.from(imageBuffer).toString('base64')}`;
          
          console.log('✅ Leonardo AI generation successful');
          return {
            success: true,
            fullBodyImage: base64Image,
            avatarImage: base64Image,
            service: '🎨 Leonardo AI (Premium)'
          };
        }
      }
      
      attempts++;
    }

    throw new Error('Leonardo AI generation timeout');

  } catch (error) {
    console.error('Leonardo AI error:', error);
    return {
      success: false,
      error: `Leonardo AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
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
    artStyle: "Digital fantasy character portrait",
    lighting: "professional portrait lighting, soft shadows", 
    composition: "full body character portrait, standing pose, looking at camera",
    quality: "highly detailed, clean art style, professional illustration",
    background: "simple neutral background, fantasy RPG character portrait",
    format: "fantasy character art, detailed illustration"
  };

  // Conservative race descriptions
  const raceDescriptions: Record<string, string> = {
    'Human': 'human character',
    'Elf': 'elf character with pointed ears',
    'Dwarf': 'dwarf character with beard',
    'Halfling': 'halfling character, small stature',
    'Dragonborn': 'dragonborn character with draconic features',
    'Gnome': 'gnome character, small build',
    'Half-Elf': 'half-elf character',
    'Half-Orc': 'half-orc character',
    'Tiefling': 'tiefling character with horns'
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