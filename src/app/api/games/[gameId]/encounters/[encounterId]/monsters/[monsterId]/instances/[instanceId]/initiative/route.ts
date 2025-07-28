import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface Encounter {
  id: string;
  gameId: string;
}

interface EncounterMonsterInstance {
  id: string;
  encounterMonsterId: string;
  instanceNumber: number;
  initiative?: number;
  encounterMonster?: {
    encounterId: string;
  };
}

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

    // Verify the encounter exists and belongs to this game
    console.log(`🎯 [${requestId}] Verifying encounter`);
    const encounter = await (prisma as unknown as { encounter: { findUnique: (args: { where: { id: string } }) => Promise<Encounter | null> } }).encounter.findUnique({
      where: { id: encounterId }
    });

    if (!encounter || encounter.gameId !== gameId) {
      console.log(`🎯 [${requestId}] Encounter not found or doesn't belong to game:`, {
        encounterFound: !!encounter,
        encounterGameId: encounter?.gameId,
        requestedGameId: gameId
      });
      return NextResponse.json({ error: 'Encounter not found' }, { status: 404 });
    }

    // Verify the monster instance exists and belongs to this encounter
    console.log(`🎯 [${requestId}] Looking for monster instance:`, instanceId);
    const monsterInstance = await (prisma as unknown as { encounterMonsterInstance: { findFirst: (args: { where: { id: string; encounterMonster: { encounterId: string } }; include: { encounterMonster: boolean } }) => Promise<EncounterMonsterInstance | null> } }).encounterMonsterInstance.findFirst({
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

    const updatedInstance = await (prisma as unknown as { encounterMonsterInstance: { update: (args: { where: { id: string }; data: { initiative: number } }) => Promise<EncounterMonsterInstance> } }).encounterMonsterInstance.update({
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