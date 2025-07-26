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

    // Verify the encounter exists and belongs to this game
    const encounter = await prisma.encounter.findUnique({
      where: { id: encounterId }
    });

    if (!encounter || encounter.gameId !== gameId) {
      return NextResponse.json({ error: 'Encounter not found' }, { status: 404 });
    }

    const encounterMonster = await prisma.encounterMonster.create({
      data: {
        encounterId,
        monsterName,
        monsterData,
        quantity,
        maxHP: monsterData.hitPoints || 10
      }
    });

    return NextResponse.json(encounterMonster, { status: 201 });
  } catch (error) {
    console.error('Error adding monster to encounter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 