import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// DELETE /api/games/[gameId]/encounters/[encounterId]/monsters/[monsterId] - Remove monster from encounter
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string; encounterId: string; monsterId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId, encounterId, monsterId } = await params;

    // Check if user is the DM of this game
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { dm: true }
    });

    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    if (game.dmId !== session.user.id) {
      return NextResponse.json({ error: 'Only the DM can remove monsters from encounters' }, { status: 403 });
    }

interface Encounter {
  id: string;
  gameId: string;
}

interface EncounterMonster {
  id: string;
  encounterId: string;
}

    // Verify the encounter exists and belongs to this game
    const encounter = await (prisma as unknown as { encounter: { findUnique: (args: { where: { id: string } }) => Promise<Encounter | null> } }).encounter.findUnique({
      where: { id: encounterId }
    });

    if (!encounter || encounter.gameId !== gameId) {
      return NextResponse.json({ error: 'Encounter not found' }, { status: 404 });
    }

    // Verify the monster exists and belongs to this encounter
    const monster = await (prisma as unknown as { encounterMonster: { findFirst: (args: { where: { id: string; encounterId: string } }) => Promise<EncounterMonster | null> } }).encounterMonster.findFirst({
      where: { 
        id: monsterId,
        encounterId: encounterId
      }
    });

    if (!monster) {
      return NextResponse.json({ error: 'Monster not found' }, { status: 404 });
    }

    // Delete the monster (this will cascade delete all instances)
    await (prisma as unknown as { encounterMonster: { delete: (args: { where: { id: string } }) => Promise<EncounterMonster> } }).encounterMonster.delete({
      where: { id: monsterId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing monster from encounter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 