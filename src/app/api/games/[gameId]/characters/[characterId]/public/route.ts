import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/games/[gameId]/characters/[characterId]/public - Get limited character info for other players
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

    // Check if user is a participant in this game
    const participant = await prisma.gameParticipant.findFirst({
      where: {
        gameId: gameId,
        userId: user.id,
      },
    });

    if (!participant) {
      return NextResponse.json({ error: "Not a participant in this game" }, { status: 403 });
    }

    // Get the character data
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    // Return limited character information for other players
    const publicCharacterInfo = {
      id: character.id,
      name: character.name,
      race: character.race,
      subrace: character.subrace,
      class: character.class,
      level: character.level,
      hitPoints: character.hitPoints,
      maxHitPoints: character.maxHitPoints,
      armorClass: character.armorClass,
      speed: character.speed,
      // Basic ability scores (no modifiers)
      strength: character.strength,
      dexterity: character.dexterity,
      constitution: character.constitution,
      intelligence: character.intelligence,
      wisdom: character.wisdom,
      charisma: character.charisma,
      // No sensitive information like money, inventory, spells, etc.
    };

    return NextResponse.json(publicCharacterInfo);
  } catch (error) {
    console.error("Error fetching public character info:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 