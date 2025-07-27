import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/games/[gameId]/characters - Get all characters in a game
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId } = await params;

    // Check if user is a participant in this game
    const participant = await prisma.gameParticipant.findFirst({
      where: {
        gameId: gameId,
        userId: session.user.id
      }
    });

    if (!participant) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Get the game to find all participants
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        participants: {
          include: {
            user: true
          }
        }
      }
    });

    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    // Collect all character IDs from all participants
    const allCharacterIds: string[] = [];
    game.participants.forEach(participant => {
      if (participant.characterIds && Array.isArray(participant.characterIds)) {
        allCharacterIds.push(...(participant.characterIds as string[]));
      }
    });

    // Get all characters
    const characters = await prisma.character.findMany({
      where: {
        id: {
          in: allCharacterIds
        }
      },
      select: {
        id: true,
        name: true,
        race: true,
        class: true,
        level: true,
        hitPoints: true,
        maxHitPoints: true,
        userId: true, // Include userId for ownership checks
        // Add other fields as needed for encounter setup
      }
    });

    return NextResponse.json(characters);
  } catch (error) {
    console.error('Error fetching game characters:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 