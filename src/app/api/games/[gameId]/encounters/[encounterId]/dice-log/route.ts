import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { DiceRollLogEntry } from '@/types/encounter';

export async function POST(
  request: NextRequest,
  { params }: { params: { gameId: string; encounterId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId, encounterId } = params;
    const logEntry: DiceRollLogEntry = await request.json();

    // Validate the encounter exists and belongs to the game
    const encounter = await prisma.encounter.findFirst({
      where: {
        id: encounterId,
        gameId: gameId,
      },
    });

    if (!encounter) {
      return NextResponse.json({ error: 'Encounter not found' }, { status: 404 });
    }

    // Get current dice roll log or initialize empty array
    const currentLog = encounter.diceRollLog as DiceRollLogEntry[] || [];

    // Add new log entry
    const updatedLog = [...currentLog, logEntry];

    // Update the encounter with the new log
    const updatedEncounter = await prisma.encounter.update({
      where: { id: encounterId },
      data: {
        diceRollLog: updatedLog,
      },
    });

    return NextResponse.json(updatedEncounter);
  } catch (error) {
    console.error('Error logging dice roll:', error);
    return NextResponse.json(
      { error: 'Failed to log dice roll' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { gameId: string; encounterId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId, encounterId } = params;

    // Get the encounter with its dice roll log
    const encounter = await prisma.encounter.findFirst({
      where: {
        id: encounterId,
        gameId: gameId,
      },
    });

    if (!encounter) {
      return NextResponse.json({ error: 'Encounter not found' }, { status: 404 });
    }

    const diceRollLog = encounter.diceRollLog as DiceRollLogEntry[] || [];
    return NextResponse.json(diceRollLog);
  } catch (error) {
    console.error('Error fetching dice roll log:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dice roll log' },
      { status: 500 }
    );
  }
} 