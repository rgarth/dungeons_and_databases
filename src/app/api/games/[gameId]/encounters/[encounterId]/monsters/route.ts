import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// POST /api/games/[gameId]/encounters/[encounterId]/monsters - Add monster to encounter
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string; encounterId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId, encounterId } = await params;
    const { monsterName, monsterData, quantity } = await request.json();

    if (!monsterName || !monsterData || !quantity || quantity < 1) {
      return NextResponse.json(
        { error: 'Monster name, data, and quantity are required' },
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
      return NextResponse.json({ error: 'Only the DM can add monsters to encounters' }, { status: 403 });
    }

interface Encounter {
  id: string;
  gameId: string;
}

interface EncounterMonster {
  id: string;
  encounterId: string;
  monsterName: string;
  monsterData: unknown;
  quantity: number;
  maxHP: number;
}

interface EncounterMonsterInstance {
  id: string;
  encounterMonsterId: string;
  instanceNumber: number;
  initiative?: number;
  currentHP?: number;
  isActive: boolean;
  createdAt: string;
}

    // Verify the encounter exists and belongs to this game
    const encounter = await (prisma as unknown as { encounter: { findUnique: (args: { where: { id: string } }) => Promise<Encounter | null> } }).encounter.findUnique({
      where: { id: encounterId }
    });

    if (!encounter || encounter.gameId !== gameId) {
      return NextResponse.json({ error: 'Encounter not found' }, { status: 404 });
    }

    // Create the encounter monster
    const encounterMonster = await (prisma as unknown as { encounterMonster: { create: (args: { data: { encounterId: string; monsterName: string; monsterData: unknown; quantity: number; maxHP: number } }) => Promise<EncounterMonster> } }).encounterMonster.create({
      data: {
        encounterId,
        monsterName,
        monsterData,
        quantity,
        maxHP: monsterData.hitPoints || 10
      }
    });

    // Create individual monster instances for each monster in the quantity
    const monsterInstances = [];
    for (let i = 1; i <= quantity; i++) {
      const instance = await (prisma as unknown as { encounterMonsterInstance: { create: (args: { data: { encounterMonsterId: string; instanceNumber: number; currentHP: number; isActive: boolean } }) => Promise<EncounterMonsterInstance> } }).encounterMonsterInstance.create({
        data: {
          encounterMonsterId: encounterMonster.id,
          instanceNumber: i,
          currentHP: monsterData.hitPoints || 10,
          isActive: true
        }
      });
      monsterInstances.push(instance);
    }

    // Return the encounter monster with its instances
    const result = {
      ...encounterMonster,
      instances: monsterInstances
    };

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error adding monster to encounter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 