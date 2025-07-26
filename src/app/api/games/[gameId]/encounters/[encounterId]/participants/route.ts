import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// POST /api/games/[gameId]/encounters/[encounterId]/participants - Add participant to encounter
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
    const { characterId, characterName, characterData } = await request.json();

    if (!characterId || !characterName || !characterData) {
      return NextResponse.json(
        { error: 'Character ID, name, and data are required' },
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

    // Check if character is already in this encounter
    const existingParticipant = await prisma.encounterParticipant.findFirst({
      where: {
        encounterId,
        characterId
      }
    });

    if (existingParticipant) {
      return NextResponse.json(
        { error: 'Character is already in this encounter' },
        { status: 400 }
      );
    }

    const encounterParticipant = await prisma.encounterParticipant.create({
      data: {
        encounterId,
        characterId,
        characterName,
        characterData,
        maxHP: characterData.hitPoints || 10
      }
    });

    return NextResponse.json(encounterParticipant, { status: 201 });
  } catch (error) {
    console.error('Error adding participant to encounter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 