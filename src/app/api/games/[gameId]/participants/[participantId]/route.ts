import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// DELETE /api/games/[gameId]/participants/[participantId] - Remove a participant from the game
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

    if (!gameId || !participantId) {
      return NextResponse.json({ error: 'Missing gameId or participantId' }, { status: 400 });
    }

    // Get the game and check if the user is the DM
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

    // Find the participant to be removed
    const participantToRemove = game.participants.find(p => p.id === participantId);
    
    if (!participantToRemove) {
      return NextResponse.json({ error: 'Participant not found' }, { status: 404 });
    }

    // Check permissions:
    // 1. DM can remove anyone
    // 2. Players can only remove themselves
    const isDm = game.dmId === user.id;
    const isRemovingSelf = participantToRemove.userId === user.id;

    if (!isDm && !isRemovingSelf) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Prevent DM from removing themselves (they should delete the game instead)
    if (isDm && isRemovingSelf) {
      return NextResponse.json({ error: 'DM cannot remove themselves. Delete the game instead.' }, { status: 400 });
    }

    // Remove the participant and all their characters
    await prisma.$transaction(async (tx) => {
      // Remove the participant (this will cascade to remove their character assignment)
      await tx.gameParticipant.delete({
        where: { id: participantId }
      });

      // Update the game's updatedAt timestamp to trigger SSE updates
      await tx.game.update({
        where: { id: gameId },
        data: { updatedAt: new Date() }
      });

      // Note: The character itself is not deleted, just the assignment to this game
      // Characters belong to users, not games
    });

    return NextResponse.json({ 
      message: 'Participant removed successfully',
      removedParticipant: {
        id: participantToRemove.id,
        userId: participantToRemove.userId,
        userName: participantToRemove.user.name || participantToRemove.user.email
      }
    });

  } catch (error) {
    console.error('Error removing participant:', error);
    return NextResponse.json({ error: 'Failed to remove participant' }, { status: 500 });
  }
} 