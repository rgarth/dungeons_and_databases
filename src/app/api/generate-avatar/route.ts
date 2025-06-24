import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateAvatar, CharacterAvatarData } from '@/lib/avatar-generation';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const characterData: CharacterAvatarData = await request.json();
    console.log('🎨 Generating avatar for character:', characterData);

    // Generate avatar using multi-service system
    const avatarResult = await generateAvatar(characterData);
    
    if (!avatarResult.success) {
      return NextResponse.json({ 
        error: avatarResult.error || "Failed to generate avatar" 
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      fullBodyImage: avatarResult.fullBodyImage,
      avatarImage: avatarResult.avatarImage,
      service: avatarResult.service || 'Unknown'
    });

  } catch (error) {
    console.error('Avatar generation error:', error);
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 });
  }
} 