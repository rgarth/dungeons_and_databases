import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';



// PUT /api/games/[gameId]/encounters/[encounterId]/monsters/[monsterId]/instances/[instanceId]/initiative - Update monster instance initiative
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string; encounterId: string; monsterId: string; instanceId: string }> }
) {
  const requestId = `initiative-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  console.log(`🎯 [${requestId}] Monster initiative update request started`);
  
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      console.log(`🎯 [${requestId}] Unauthorized - no session`);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId, encounterId, monsterId, instanceId } = await params;
    const { initiative } = await request.json();

    console.log(`🎯 [${requestId}] Request details:`, {
      gameId,
      encounterId,
      monsterId,
      instanceId,
      initiative,
      userId: session.user.id
    });

    if (typeof initiative !== 'number' || initiative < 0) {
      console.log(`🎯 [${requestId}] Invalid initiative value:`, initiative);
      return NextResponse.json(
        { error: 'Valid initiative value is required' },
        { status: 400 }
      );
    }

    // Check if user is the DM of this game
    console.log(`🎯 [${requestId}] Checking game permissions`);
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { dm: true }
    });

    if (!game) {
      console.log(`🎯 [${requestId}] Game not found:`, gameId);
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    if (game.dmId !== session.user.id) {
      console.log(`🎯 [${requestId}] User is not DM:`, {
        userId: session.user.id,
        dmId: game.dmId
      });
      return NextResponse.json({ error: 'Only the DM can update monster initiative' }, { status: 403 });
    }

    console.log(`🎯 [${requestId}] User is DM, proceeding with update`);

    // Verify the encounter and monster instance in a single query
    console.log(`🎯 [${requestId}] Verifying encounter and monster instance`);
    const monsterInstance = await prisma.encounterMonsterInstance.findFirst({
      where: { 
        id: instanceId,
        encounterMonster: {
          encounterId: encounterId,
          encounter: {
            gameId: gameId
          }
        }
      },
      include: {
        encounterMonster: {
          include: {
            encounter: true
          }
        }
      }
    });

    console.log(`🎯 [${requestId}] Monster instance lookup result:`, {
      found: !!monsterInstance,
      instanceId,
      currentInitiative: monsterInstance?.initiative,
      instanceNumber: monsterInstance?.instanceNumber
    });

    if (!monsterInstance) {
      console.log(`🎯 [${requestId}] Monster instance not found:`, instanceId);
      return NextResponse.json({ error: 'Monster instance not found' }, { status: 404 });
    }

    // Update the monster instance's initiative
    console.log(`🎯 [${requestId}] Updating monster instance initiative:`, {
      instanceId,
      oldInitiative: monsterInstance.initiative,
      newInitiative: initiative
    });

    const updatedInstance = await prisma.encounterMonsterInstance.update({
      where: { id: instanceId },
      data: { initiative }
    });

    console.log(`🎯 [${requestId}] Successfully updated monster instance:`, {
      instanceId: updatedInstance.id,
      newInitiative: updatedInstance.initiative,
      instanceNumber: updatedInstance.instanceNumber
    });

    return NextResponse.json(updatedInstance);
  } catch (error) {
    console.error(`🎯 [${requestId}] Error updating monster instance initiative:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 