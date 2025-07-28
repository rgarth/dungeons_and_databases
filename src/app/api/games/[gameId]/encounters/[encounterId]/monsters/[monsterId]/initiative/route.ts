import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// PUT /api/games/[gameId]/encounters/[encounterId]/monsters/[monsterId]/initiative - Update monster initiative
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string; encounterId: string; monsterId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId, encounterId, monsterId } = await params;
    const { initiative } = await request.json();

    if (typeof initiative !== 'number' || initiative < 0) {
      return NextResponse.json(
        { error: 'Valid initiative value is required' },
        { status: 400 }
      );
    }

    // Check if user is the DM of this game
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { dm: true }
    });

    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    if (game.dmId !== session.user.id) {
      return NextResponse.json({ error: 'Only the DM can update monster initiative' }, { status: 403 });
    }

interface Encounter {
  id: string;
  gameId: string;
}

interface EncounterMonster {
  id: string;
  encounterId: string;
  monsterName: string;
  initiative?: number;
}

    // Verify the encounter exists and belongs to this game
    const encounter = await (prisma as unknown as { encounter: { findUnique: (args: { where: { id: string } }) => Promise<Encounter | null> } }).encounter.findUnique({
      where: { id: encounterId }
    });

    if (!encounter || encounter.gameId !== gameId) {
      return NextResponse.json({ error: 'Encounter not found' }, { status: 404 });
    }

    // Update the monster's initiative
    const updatedMonster = await (prisma as unknown as { encounterMonster: { update: (args: { where: { id: string }; data: { initiative: number } }) => Promise<EncounterMonster> } }).encounterMonster.update({
      where: { id: monsterId },
      data: { initiative }
    });

    return NextResponse.json(updatedMonster);
  } catch (error) {
    console.error('Error updating monster initiative:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 