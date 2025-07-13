import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/games/[gameId]/notes - Get notes for a game
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { gameId } = await params;

    // Check if user is a participant in this game
    const participant = await prisma.gameParticipant.findFirst({
      where: {
        gameId: gameId,
        userId: user.id
      }
    });

    if (!participant) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Check if user is DM of this game
    const game = await prisma.game.findFirst({
      where: {
        id: gameId,
        dmId: user.id
      }
    });

    const isDM = !!game;

    // Get the game with notes
    const gameWithNotes = await prisma.game.findUnique({
      where: { id: gameId },
      select: {
        gameNotes: true,
        dmNotes: isDM ? true : false, // Only include dmNotes if user is DM
      }
    });

    if (!gameWithNotes) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json({
      gameNotes: gameWithNotes.gameNotes || '',
      dmNotes: isDM ? (gameWithNotes.dmNotes || '') : undefined
    });
  } catch (error) {
    console.error('Error fetching game notes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/games/[gameId]/notes - Update notes for a game
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { gameId } = await params;

    // Check if user is DM of this game
    const game = await prisma.game.findFirst({
      where: {
        id: gameId,
        dmId: user.id
      }
    });

    if (!game) {
      return NextResponse.json({ error: 'Only the DM can update notes' }, { status: 403 });
    }

    const { gameNotes, dmNotes } = await request.json();

    // Validate input
    if (gameNotes !== undefined && typeof gameNotes !== 'string') {
      return NextResponse.json(
        { error: 'gameNotes must be a string' },
        { status: 400 }
      );
    }

    if (dmNotes !== undefined && typeof dmNotes !== 'string') {
      return NextResponse.json(
        { error: 'dmNotes must be a string' },
        { status: 400 }
      );
    }

    // Update the game notes
    const updatedGame = await prisma.game.update({
      where: { id: gameId },
      data: {
        gameNotes: gameNotes !== undefined ? gameNotes : undefined,
        dmNotes: dmNotes !== undefined ? dmNotes : undefined,
      },
      select: {
        gameNotes: true,
        dmNotes: true,
      }
    });

    return NextResponse.json(updatedGame);
  } catch (error) {
    console.error('Error updating game notes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 