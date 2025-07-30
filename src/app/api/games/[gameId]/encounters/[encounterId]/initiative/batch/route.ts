import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface InitiativeUpdate {
  participantId?: string;
  monsterInstanceId?: string;
  initiative: number;
}

// PUT /api/games/[gameId]/encounters/[encounterId]/initiative/batch - Batch update initiative values
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string; encounterId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId, encounterId } = await params;
    const { updates }: { updates: InitiativeUpdate[] } = await request.json();

    if (!Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json({ error: 'Valid updates array is required' }, { status: 400 });
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
      return NextResponse.json({ error: 'Only the DM can batch update initiative' }, { status: 403 });
    }

    // Verify the encounter exists and belongs to this game
    const encounter = await prisma.encounter.findFirst({
      where: { 
        id: encounterId,
        gameId: gameId
      }
    });

    if (!encounter) {
      return NextResponse.json({ error: 'Encounter not found' }, { status: 404 });
    }

    // Validate all updates
    for (const update of updates) {
      if (typeof update.initiative !== 'number' || update.initiative < 0) {
        return NextResponse.json(
          { error: 'Valid initiative value is required for all updates' },
          { status: 400 }
        );
      }
      
      if (!update.participantId && !update.monsterInstanceId) {
        return NextResponse.json(
          { error: 'Either participantId or monsterInstanceId is required for each update' },
          { status: 400 }
        );
      }
    }

    // Perform batch updates using Prisma transactions
    const results = await prisma.$transaction(async (tx) => {
      const participantUpdates = [];
      const monsterUpdates = [];

      for (const update of updates) {
        if (update.participantId) {
          participantUpdates.push(
            tx.encounterParticipant.update({
              where: { 
                id: update.participantId,
                encounterId: encounterId
              },
              data: { initiative: update.initiative }
            })
          );
        } else if (update.monsterInstanceId) {
          monsterUpdates.push(
            tx.encounterMonsterInstance.update({
              where: { 
                id: update.monsterInstanceId,
                encounterMonster: {
                  encounterId: encounterId
                }
              },
              data: { initiative: update.initiative }
            })
          );
        }
      }

      const [participantResults, monsterResults] = await Promise.all([
        Promise.all(participantUpdates),
        Promise.all(monsterUpdates)
      ]);

      return {
        participants: participantResults,
        monsters: monsterResults
      };
    });

    return NextResponse.json({
      success: true,
      updatedParticipants: results.participants.length,
      updatedMonsters: results.monsters.length
    });
  } catch (error) {
    console.error('Error batch updating initiative:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 