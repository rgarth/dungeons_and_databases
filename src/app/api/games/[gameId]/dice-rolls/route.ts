import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Pusher from 'pusher';
import { prisma } from '@/lib/prisma';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
  useTLS: true,
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string }> }
) {
  try {
    console.log('🎲 Dice rolls API called');
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      console.log('🎲 Unauthorized - no session');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId } = await params;
    console.log('🎲 Game ID:', gameId);

    // Verify user is a participant in this game
    const participant = await prisma.gameParticipant.findUnique({
      where: {
        gameId_userId: {
          gameId,
          userId: session.user.id
        }
      }
    });
    if (!participant) {
      console.log('🎲 Not a participant in this game');
      return NextResponse.json({ error: 'Not a participant in this game' }, { status: 403 });
    }

    const { encounterId, logEntry } = await request.json();
    console.log('🎲 Request data:', { encounterId, logEntry });
    
    if (!encounterId || !logEntry) {
      return NextResponse.json({ error: 'Encounter ID and log entry are required' }, { status: 400 });
    }

    // Verify the encounter exists and belongs to this game
    const encounter = await prisma.encounter.findFirst({
      where: {
        id: encounterId,
        gameId: gameId,
      },
    });

    if (!encounter) {
      return NextResponse.json({ error: 'Encounter not found' }, { status: 404 });
    }

    // Broadcast the dice roll event to all players in the game
    console.log('🎲 Broadcasting dice roll to other players');
    await pusher.trigger(`game-${gameId}-dice-rolls`, 'dice-roll-logged', {
      encounterId,
      logEntry
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error broadcasting dice roll:', error);
    return NextResponse.json(
      { error: 'Failed to broadcast dice roll' },
      { status: 500 }
    );
  }
}

// DELETE /api/games/[gameId]/dice-rolls - Clear dice roll history for an encounter
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string }> }
) {
  try {
    console.log('🎲 Clear dice rolls API called');
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      console.log('🎲 Unauthorized - no session');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId } = await params;
    console.log('🎲 Game ID:', gameId);

    // Verify user is the DM of this game
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { dm: true }
    });

    if (!game) {
      console.log('🎲 Game not found');
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    if (game.dmId !== session.user.id) {
      console.log('🎲 Not the DM of this game');
      return NextResponse.json({ error: 'Only the DM can clear dice roll history' }, { status: 403 });
    }

    const { encounterId } = await request.json();
    console.log('🎲 Encounter ID:', encounterId);
    
    if (!encounterId) {
      return NextResponse.json({ error: 'Encounter ID is required' }, { status: 400 });
    }

    // Verify the encounter exists and belongs to this game
    const encounter = await prisma.encounter.findFirst({
      where: {
        id: encounterId,
        gameId: gameId,
      },
    });

    if (!encounter) {
      return NextResponse.json({ error: 'Encounter not found' }, { status: 404 });
    }

    // Broadcast the dice roll history cleared event to all players in the game
    await pusher.trigger(`game-${gameId}-dice-rolls`, 'dice-roll-history-cleared', {
      encounterId
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error clearing dice roll history:', error);
    return NextResponse.json(
      { error: 'Failed to clear dice roll history' },
      { status: 500 }
    );
  }
} 