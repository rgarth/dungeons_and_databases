import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: characterId } = await params;
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');
    
    // Find user by email since session.user.id might not be available
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let character;

    if (gameId) {
      // Check if user is DM of this game
      const game = await prisma.game.findFirst({
        where: {
          id: gameId,
          dmId: user.id,
        },
      });

      if (!game) {
        return NextResponse.json({ error: "Game not found or access denied" }, { status: 404 });
      }

      // Get the character data (DM can view any character in their game)
      character = await prisma.character.findUnique({
        where: { id: characterId },
      });

      if (!character) {
        return NextResponse.json({ error: "Character not found" }, { status: 404 });
      }
    } else {
      // Only allow users to access their own characters
      character = await prisma.character.findFirst({
        where: {
          id: characterId,
          userId: user.id,
        },
      });

      if (!character) {
        return NextResponse.json({ error: "Character not found" }, { status: 404 });
      }
    }

    return NextResponse.json(character);
  } catch (error) {
    console.error("Error fetching character:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 