import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// PUT /api/games/[gameId]/encounters/[encounterId]/participants/[participantId]/initiative - Update participant initiative
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string; encounterId: string; participantId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId, encounterId, participantId } = await params;
    const body = await request.json();
    const { initiative } = body;
    
    console.log('🔍 API DEBUG: Received initiative update request');
    console.log('Request body:', body);
    console.log('Initiative value:', initiative);
    console.log('Initiative type:', typeof initiative);
    console.log('Initiative >= 0:', initiative >= 0);

    if (typeof initiative !== 'number' || initiative < 0) {
      console.log('❌ Validation failed: Invalid initiative value');
      return NextResponse.json(
        { error: 'Valid initiative value is required' },
        { status: 400 }
      );
    }

    // Check if user is a participant in this game
    const gameParticipant = await prisma.gameParticipant.findFirst({
      where: {
        gameId: gameId,
        userId: session.user.id
      }
    });

    if (!gameParticipant) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Check if user is the DM
    const isDM = gameParticipant.isDm;

    // Verify the encounter exists and belongs to this game
    const encounter = await (prisma as any).encounter.findUnique({
      where: { id: encounterId }
    });

    if (!encounter || encounter.gameId !== gameId) {
      return NextResponse.json({ error: 'Encounter not found' }, { status: 404 });
    }

    // Get the encounter participant and verify character ownership
    const encounterParticipant = await (prisma as any).encounterParticipant.findUnique({
      where: { id: participantId }
    });

    if (!encounterParticipant) {
      return NextResponse.json({ error: 'Encounter participant not found' }, { status: 404 });
    }

    // Parse the character data to check ownership
    const characterData = encounterParticipant.characterData as { userId?: string };
    console.log('🔍 API DEBUG: Checking character ownership');
    console.log('Session user ID:', session.user.id);
    console.log('Is DM:', isDM);
    console.log('Character data from DB:', encounterParticipant.characterData);
    console.log('Parsed character data:', characterData);
    console.log('Character user ID:', characterData?.userId);
    console.log('Ownership check result:', characterData?.userId === session.user.id);
    
    // Allow DMs to modify any character's initiative
    if (isDM) {
      console.log('✅ Access granted: DM can modify any character initiative');
    }
    // For non-DMs, check character ownership
    else if (characterData && characterData.userId && characterData.userId !== session.user.id) {
      console.log('❌ Access denied: Character ownership mismatch');
      return NextResponse.json({ error: 'You can only roll initiative for your own characters' }, { status: 403 });
    }
    else {
      console.log('✅ Access granted: Character ownership verified or missing userId (old data)');
    }

    // Update the participant's initiative
    const updatedParticipant = await (prisma as any).encounterParticipant.update({
      where: { id: participantId },
      data: { initiative }
    });

    return NextResponse.json(updatedParticipant);
  } catch (error) {
    console.error('Error updating participant initiative:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 