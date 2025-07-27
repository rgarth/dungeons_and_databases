import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// PUT /api/games/[gameId]/encounters/[encounterId]/monsters/[monsterId]/instances/[instanceId]/initiative - Update monster instance initiative
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string; encounterId: string; monsterId: string; instanceId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId, encounterId, monsterId, instanceId } = await params;
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

    // Verify the encounter exists and belongs to this game
    const encounter = await (prisma as any).encounter.findUnique({
      where: { id: encounterId }
    });

    if (!encounter || encounter.gameId !== gameId) {
      return NextResponse.json({ error: 'Encounter not found' }, { status: 404 });
    }

    // Verify the monster instance exists and belongs to this encounter
    const monsterInstance = await (prisma as any).encounterMonsterInstance.findFirst({
      where: { 
        id: instanceId,
        encounterMonster: {
          encounterId: encounterId
        }
      },
      include: {
        encounterMonster: true
      }
    });

    if (!monsterInstance) {
      return NextResponse.json({ error: 'Monster instance not found' }, { status: 404 });
    }

    // Update the monster instance's initiative
    const updatedInstance = await (prisma as any).encounterMonsterInstance.update({
      where: { id: instanceId },
      data: { initiative }
    });

    return NextResponse.json(updatedInstance);
  } catch (error) {
    console.error('Error updating monster instance initiative:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 