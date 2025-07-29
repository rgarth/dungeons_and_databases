import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Pusher from 'pusher';
import { prisma } from '@/lib/prisma';
import { DiceRollLogEntry } from '@/types/encounter';

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
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId } = await params;

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
      return NextResponse.json({ error: 'Not a participant in this game' }, { status: 403 });
    }

    const { encounterId, logEntry } = await request.json();
    
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

    // Get current dice roll log or initialize empty array
    const currentLog = encounter.diceRollLog as DiceRollLogEntry[] || [];

    // Add new log entry
    const updatedLog = [...currentLog, logEntry];

    // Update the encounter with the new log
    const updatedEncounter = await prisma.encounter.update({
      where: { id: encounterId },
      data: {
        diceRollLog: updatedLog,
      },
    });

    // Broadcast the dice roll event to all players in the game
    await pusher.trigger(`game-${gameId}-dice-rolls`, 'dice-roll-logged', {
      encounterId,
      logEntry,
      updatedLog
    });

    return NextResponse.json({ success: true, encounter: updatedEncounter });
  } catch (error) {
    console.error('Error logging dice roll:', error);
    return NextResponse.json(
      { error: 'Failed to log dice roll' },
      { status: 500 }
    );
  }
} 