import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// PUT /api/games/[gameId]/participants/[participantId]/character - Add character to a participant
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string; participantId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId, participantId } = await params;
    const { characterId } = await request.json();

    if (!gameId || !participantId || !characterId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get the game and check permissions
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        dm: true,
        participants: {
          include: {
            user: true
          }
        }
      }
    });

    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    // Get the current user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find the participant
    const participant = game.participants.find(p => p.id === participantId);
    
    if (!participant) {
      return NextResponse.json({ error: 'Participant not found' }, { status: 404 });
    }

    // Check permissions:
    // 1. DM can assign characters to anyone
    // 2. Players can only assign characters to themselves
    const isDm = game.dmId === user.id;
    const isAssigningToSelf = participant.userId === user.id;

    if (!isDm && !isAssigningToSelf) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Verify the character belongs to the participant's user
    const character = await prisma.character.findFirst({
      where: {
        id: characterId,
        userId: participant.userId
      }
    });

    if (!character) {
      return NextResponse.json({ error: 'Character not found or does not belong to participant' }, { status: 404 });
    }

    // Check if character is already assigned to this participant in this game
    const currentCharacterIds = participant.characterIds as string[] || [];
    
    if (currentCharacterIds.includes(characterId)) {
      return NextResponse.json({ error: 'Character is already assigned to this participant in this game' }, { status: 400 });
    }

    // Add the character to the participant's character list
    const updatedCharacterIds = [...currentCharacterIds, characterId];
    
    const updatedParticipant = await prisma.gameParticipant.update({
      where: { id: participantId },
      data: { characterIds: updatedCharacterIds },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json(updatedParticipant);

  } catch (error) {
    console.error('Error adding character to participant:', error);
    return NextResponse.json({ error: 'Failed to add character to participant' }, { status: 500 });
  }
}

// DELETE /api/games/[gameId]/participants/[participantId]/character - Remove character from participant
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string; participantId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId, participantId } = await params;
    const { characterId } = await request.json();

    if (!gameId || !participantId || !characterId) {
      return NextResponse.json({ error: 'Missing gameId, participantId, or characterId' }, { status: 400 });
    }

    // Get the game and check permissions
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        dm: true,
        participants: {
          include: {
            user: true
          }
        }
      }
    });

    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    // Get the current user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find the participant
    const participant = game.participants.find(p => p.id === participantId);
    
    if (!participant) {
      return NextResponse.json({ error: 'Participant not found' }, { status: 404 });
    }

    // Check permissions:
    // 1. DM can remove characters from anyone
    // 2. Players can only remove characters from themselves
    const isDm = game.dmId === user.id;
    const isRemovingFromSelf = participant.userId === user.id;

    if (!isDm && !isRemovingFromSelf) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Remove the character from the participant's character list
    const currentCharacterIds = participant.characterIds as string[] || [];
    const updatedCharacterIds = currentCharacterIds.filter(id => id !== characterId);
    
    const updatedParticipant = await prisma.gameParticipant.update({
      where: { id: participantId },
      data: { characterIds: updatedCharacterIds },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json({ 
      message: 'Character removed successfully',
      participant: updatedParticipant
    });

  } catch (error) {
    console.error('Error removing character from participant:', error);
    return NextResponse.json({ error: 'Failed to remove character from participant' }, { status: 500 });
  }
} 