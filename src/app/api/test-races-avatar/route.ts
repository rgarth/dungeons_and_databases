import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// Test character data for each race
const testCharacterData = {
  class: 'Fighter',
  gender: 'Male',
  alignment: 'True Neutral',
  background: 'Soldier',
  personalityTraits: ['I face problems head-on.'],
  ideals: ['Responsibility. I do what I must and obey just authority.'],
  bonds: ['I fight for those who cannot fight for themselves.'],
  flaws: ['I have trouble trusting in my allies.'],
  appearance: 'A seasoned warrior with battle scars and practical gear.',
  equippedWeapons: ['Longsword'],
  equippedArmor: ['Chain Mail']
};

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
          num_inference_steps: 4,
          guidance_scale: 3.5,
          output_format: "jpg",
          output_quality: 85
        }
      }
    );

    if (!output || !Array.isArray(output) || output.length === 0) {
      throw new Error('No output from FLUX.1 Schnell');
    }

    const imageUrl = output[0];
    console.log('✅ FLUX.1 Schnell generation successful');
    
    // Convert to base64 data URL for immediate display
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch generated image');
    }
    
    const imageBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64}`;
    
    return dataUrl;
  } catch (error) {
    console.error('FLUX.1 Schnell error:', error);
    throw error;
  }
}

function buildPrompt(race: string, characterData: typeof testCharacterData): string {
  // Race descriptions for FLUX.1 Schnell
  const raceDescriptions: Record<string, string> = {
    'Aasimar': 'AASIMAR RACE with celestial heritage, glowing eyes, radiant features, divine markings',
    'Dragonborn': 'DRAGONBORN RACE with scaled skin covering face and body, draconic heritage, reptilian eyes, pronounced snout',
    'Dwarf': 'DWARF RACE with short stature, broad build, thick beard, sturdy frame',
    'Elf': 'ELF RACE with pointed ears, graceful features, ethereal beauty, tall and slender',
    'Gnome': 'small ADULT humanoid adventurer, mature adult person 3-4 feet tall, ADULT FACE with wrinkles and age lines, pointy ears like elf, intelligent sparkling eyes, high cheekbones, prominent nose, earth-toned skin, clean-shaven ADULT face, NO BEARD, ADULT proportions not child, weathered mature features, fantasy adventurer clothing, small ADULT person with elf-like features, humanoid ADULT not lawn ornament, NOT CHILD, NOT YOUNG FACE, mature adult character',
    'Goliath': 'GOLIATH RACE with stone-like skin markings, massive build, giant heritage, towering height',
    'Half-Elf': 'HALF-ELF RACE with slightly pointed ears, human-elf hybrid features, graceful but sturdy',
    'Halfling': 'HALFLING RACE with small adult stature, mature adult face, adult proportions, hobbit-like build, NOT child, NOT young, adult halfling person',
    'Half-Orc': 'HALF-ORC RACE with greenish skin, prominent tusks, muscular build, orcish features',
    'Human': 'HUMAN RACE single character, one person only, individual human warrior, solo character with varied skin tones, normal human proportions',
    'Tabaxi': 'TABAXI RACE with cat-like features, feline face, fur covering body, cat ears and tail',
    'Tiefling': 'TIEFLING RACE with horns, tail, infernal heritage, unusual skin color, demonic features'
  };

  const raceDesc = raceDescriptions[race] || `${race.toUpperCase()} RACE with distinctive racial features`;
  
  const prompt = `${raceDesc}, ${characterData.class.toLowerCase()} warrior, practical armor and weapons, confident stance, battle-ready appearance, REALISTIC FANTASY, grounded character design, PRACTICAL EQUIPMENT, functional gear, Photorealistic portrait photography, full body character portrait, standing pose, looking at camera, professional portrait lighting, soft shadows, natural lighting, simple neutral background, studio portrait photography, highly detailed, photorealistic, professional photography, realistic photography, detailed photorealism`;

  return prompt;
}

export async function GET() {
  // Only allow in development environment
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  // Add CORS headers for local file access
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    // Skip authentication for this development tool
    // const session = await getServerSession(authOptions);
    // if (!session?.user?.email) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // Fetch all races from database
    const racesResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/races`);
    if (!racesResponse.ok) {
      throw new Error('Failed to fetch races');
    }
    const races = await racesResponse.json();
    
    console.log(`🎨 Testing FLUX.1 Schnell with ${races.length} races...`);
    
    const results = [];
    
    for (const race of races) {
      const startTime = Date.now();
      try {
        console.log(`\n🎭 Generating avatar for ${race.name}...`);
        
        const prompt = buildPrompt(race.name, testCharacterData);
        const seed = Math.floor(Math.random() * 1000000);
        
        console.log(`🎨 Prompt: ${prompt.substring(0, 100)}...`);
        
        const imageUrl = await generateWithFluxSchnell(prompt, seed);
        const generationTime = Date.now() - startTime;
        
        results.push({
          race: race.name,
          success: true,
          imageUrl: imageUrl,
          prompt: prompt,
          seed: seed,
          generationTime: generationTime
        });
        
        console.log(`✅ ${race.name} - Success`);
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        const generationTime = Date.now() - startTime;
        console.error(`❌ ${race.name} - Failed:`, error);
        results.push({
          race: race.name,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          prompt: buildPrompt(race.name, testCharacterData),
          generationTime: generationTime
        });
      }
    }
    
    const successCount = results.filter(r => r.success).length;
    console.log(`\n🎉 Race avatar test completed: ${successCount}/${races.length} successful`);
    
    return NextResponse.json({
      message: `Generated avatars for ${successCount}/${races.length} races`,
      results: results,
      summary: {
        total: races.length,
        successful: successCount,
        failed: races.length - successCount
      }
    }, { headers });

  } catch (error) {
    console.error('Race avatar test error:', error);
    return NextResponse.json(
      { error: "Failed to test race avatars", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers }
    );
  }
} 