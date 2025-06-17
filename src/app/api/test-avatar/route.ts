import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { POST as generateAvatar } from '@/app/api/generate-avatar/route';

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('Not available in production', { status: 404 });
  }

  // Check authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['race', 'class', 'gender', 'alignment', 'background', 'personalityTraits', 'ideals', 'bonds', 'flaws', 'appearance'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return new NextResponse(`Missing required fields: ${missingFields.join(', ')}`, { status: 400 });
    }

    // Log the full request data for debugging
    console.log('Test Avatar Request:', {
      race: data.race,
      class: data.class,
      gender: data.gender,
      alignment: data.alignment,
      background: data.background,
      personalityTraits: data.personalityTraits,
      ideals: data.ideals,
      bonds: data.bonds,
      flaws: data.flaws,
      appearance: data.appearance
    });

    try {
      // Create a new request with the same data
      const newRequest = new NextRequest(request.url, {
        method: 'POST',
        headers: request.headers,
        body: JSON.stringify(data)
      });
      
      const result = await generateAvatar(newRequest);
      return result;
    } catch (error) {
      console.error('Error in generateAvatar:', error);
      return new NextResponse(
        `Error generating avatar: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in test avatar endpoint:', error);
    return new NextResponse(
      `Error processing request: ${error instanceof Error ? error.message : 'Unknown error'}`,
      { status: 500 }
    );
  }
} 