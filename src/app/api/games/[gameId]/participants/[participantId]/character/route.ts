import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT /api/games/[gameId]/participants/[participantId]/character - Add or change character for a participant
export async function PUT(
  request: NextRequest,
  { params }: { params: { gameId: string; participantId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { characterId } = await request.json();

    // Verify the participant exists and belongs to the current user
    const participant = await prisma.gameParticipant.findFirst({
      where: {
        id: params.participantId,
        gameId: params.gameId,
        userId: user.id
      }
    });

    if (!participant) {
      return NextResponse.json({ error: 'Participant not found or access denied' }, { status: 404 });
    }

    // If characterId is provided, verify it belongs to the user
    if (characterId) {
      const character = await prisma.character.findFirst({
        where: {
          id: characterId,
          userId: user.id
        }
      });

      if (!character) {
        return NextResponse.json(
          { error: 'Character not found or does not belong to you' },
          { status: 404 }
        );
      }

      // Check if this character is already in the game by another participant
      const existingCharacter = await prisma.gameParticipant.findFirst({
        where: {
          gameId: params.gameId,
          characterId: characterId,
          id: { not: params.participantId } // Exclude current participant
        }
      });

      if (existingCharacter) {
        return NextResponse.json(
          { error: 'This character is already in the game' },
          { status: 400 }
        );
      }
    }

    // Update the participant's character
    const updatedParticipant = await prisma.gameParticipant.update({
      where: { id: params.participantId },
      data: { characterId: characterId || null },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        character: {
          select: {
            id: true,
            name: true,
            class: true,
            level: true,
            race: true,
            avatarUrl: true
          }
        }
      }
    });

    return NextResponse.json(updatedParticipant);
  } catch (error) {
    console.error('Error updating participant character:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/games/[gameId]/participants/[participantId]/character - Remove character from participant
export async function DELETE(
  request: NextRequest,
  { params }: { params: { gameId: string; participantId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify the participant exists and belongs to the current user
    const participant = await prisma.gameParticipant.findFirst({
      where: {
        id: params.participantId,
        gameId: params.gameId,
        userId: user.id
      }
    });

    if (!participant) {
      return NextResponse.json({ error: 'Participant not found or access denied' }, { status: 404 });
    }

    // Remove the character from the participant
    const updatedParticipant = await prisma.gameParticipant.update({
      where: { id: params.participantId },
      data: { characterId: null },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        character: {
          select: {
            id: true,
            name: true,
            class: true,
            level: true,
            race: true,
            avatarUrl: true
          }
        }
      }
    });

    return NextResponse.json(updatedParticipant);
  } catch (error) {
    console.error('Error removing participant character:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 