import { NextResponse } from "next/server";

export async function POST(request: Request) {
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
    const { race } = await request.json();
    
    if (!race) {
      return NextResponse.json(
        { error: "Race is required" },
        { status: 400, headers }
      );
    }

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

    const raceDesc = raceDescriptions[race];
    if (!raceDesc) {
      return NextResponse.json(
        { error: `Unknown race: ${race}` },
        { status: 400, headers }
      );
    }

    console.log(`🎭 Generating avatar for ${race}...`);

    const prompt = `${raceDesc}, fighter warrior, practical armor and weapons, confident stance, battle-ready appearance, REALISTIC FANTASY, grounded character design, PRACTICAL EQUIPMENT, functional gear, Photorealistic portrait photography, full body character portrait, standing pose, looking at camera, professional portrait lighting, soft shadows, natural lighting, simple neutral background, studio portrait photography, highly detailed, photorealistic, realistic photography, detailed photorealism`;

    console.log(`🎨 Prompt: ${prompt.substring(0, 100)}...`);

    const startTime = Date.now();

    // Try FLUX.1 Schnell via Replicate using the SDK
    console.log('🚀 Trying FLUX.1 Schnell via Replicate...');
    
    const replicateToken = process.env.REPLICATE_API_TOKEN;
    
    if (!replicateToken) {
      throw new Error('Replicate API token not configured');
    }

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
          seed: Math.floor(Math.random() * 1000000),
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

    // Convert to base64 for display
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;

    const generationTime = Date.now() - startTime;

    console.log(`✅ ${race} - Success`);

    return NextResponse.json({
      success: true,
      race: race,
      imageUrl: dataUrl,
      generationTime: generationTime
    }, { headers });

  } catch (error) {
    console.error('Single race test error:', error);
    return NextResponse.json(
      { error: "Failed to test race avatar", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 