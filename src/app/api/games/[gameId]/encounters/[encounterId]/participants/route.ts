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
    const { characterId, characterName } = await request.json();

    // Fetch the latest character data from the database
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 });
    }

    // Use the full character object as the snapshot
    const characterData = character;

    // Debug: Log what we're about to store
    console.log('🔍 API DEBUG: Storing character data in encounter:', {
      encounterId,
      characterId,
      characterName,
      characterData,
      maxHP: characterData.hitPoints || 10
    });
    console.log('🔍 API DEBUG: Character data ability scores:', {
      strength: characterData?.strength,
      dexterity: characterData?.dexterity,
      constitution: characterData?.constitution,
      intelligence: characterData?.intelligence,
      wisdom: characterData?.wisdom,
      charisma: characterData?.charisma
    });
    console.log('🔍 API DEBUG: Full character data object:', characterData);
    console.log('🔍 API DEBUG: Character data type:', typeof characterData);
    console.log('🔍 API DEBUG: Character data keys:', Object.keys(characterData || {}));
    console.log('🔍 API DEBUG: Character data has dexterity:', 'dexterity' in (characterData || {}));
    console.log('🔍 API DEBUG: Character money data:', {
      copperPieces: characterData?.copperPieces,
      silverPieces: characterData?.silverPieces,
      goldPieces: characterData?.goldPieces
    });

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

interface Encounter {
  id: string;
  gameId: string;
}

interface EncounterParticipant {
  id: string;
  encounterId: string;
  characterId: string;
  characterName: string;
  characterData: unknown;
  maxHP: number;
}

    // Verify the encounter exists and belongs to this game
    const encounter = await (prisma as unknown as { encounter: { findUnique: (args: { where: { id: string } }) => Promise<Encounter | null> } }).encounter.findUnique({
      where: { id: encounterId }
    });

    if (!encounter || encounter.gameId !== gameId) {
      return NextResponse.json({ error: 'Encounter not found' }, { status: 404 });
    }

    // Check if character is already in this encounter
    const existingParticipant = await (prisma as unknown as { encounterParticipant: { findFirst: (args: { where: { encounterId: string; characterId: string } }) => Promise<EncounterParticipant | null> } }).encounterParticipant.findFirst({
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



    const encounterParticipant = await (prisma as unknown as { encounterParticipant: { create: (args: { data: { encounterId: string; characterId: string; characterName: string; characterData: unknown; maxHP: number } }) => Promise<EncounterParticipant> } }).encounterParticipant.create({
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