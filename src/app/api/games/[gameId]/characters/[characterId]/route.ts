import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/games/[gameId]/characters/[characterId] - Get character in read-only mode for DM
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string; characterId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { gameId, characterId } = await params;
    
    // Find user by email since session.user.id might not be available
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

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

    // Get the character data
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    return NextResponse.json(character);
  } catch (error) {
    console.error("Error fetching character:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 