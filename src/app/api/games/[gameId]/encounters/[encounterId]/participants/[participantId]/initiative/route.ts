import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// PUT /api/games/[gameId]/encounters/[encounterId]/participants/[participantId]/initiative - Update participant initiative
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string; encounterId: string; participantId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId, encounterId, participantId } = await params;
    const { initiative } = await request.json();

    if (typeof initiative !== 'number' || initiative < 0) {
      return NextResponse.json(
        { error: 'Valid initiative value is required' },
        { status: 400 }
      );
    }

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

    // Verify the encounter exists and belongs to this game
    const encounter = await prisma.encounter.findUnique({
      where: { id: encounterId }
    });

    if (!encounter || encounter.gameId !== gameId) {
      return NextResponse.json({ error: 'Encounter not found' }, { status: 404 });
    }

    // Update the participant's initiative
    const updatedParticipant = await prisma.encounterParticipant.update({
      where: { id: participantId },
      data: { initiative }
    });

    return NextResponse.json(updatedParticipant);
  } catch (error) {
    console.error('Error updating participant initiative:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 