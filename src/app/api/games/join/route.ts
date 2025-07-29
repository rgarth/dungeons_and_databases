import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
  useTLS: true,
});

// POST /api/games/join - Join a game with an invite code
export async function POST(request: NextRequest) {
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

    const { inviteCode, characterId } = await request.json();

    if (!inviteCode || typeof inviteCode !== 'string') {
      return NextResponse.json(
        { error: 'Invite code is required' },
        { status: 400 }
      );
    }

    // Find the invite
    const invite = await prisma.gameInvite.findUnique({
      where: { inviteCode: inviteCode.toUpperCase() },
      include: {
        game: {
          include: {
            participants: {
              where: { userId: user.id }
            }
          }
        }
      }
    });

    if (!invite) {
      return NextResponse.json(
        { error: 'Invalid invite code' },
        { status: 404 }
      );
    }

    if (!invite.isActive) {
      return NextResponse.json(
        { error: 'This invite is no longer active' },
        { status: 400 }
      );
    }

    if (invite.expiresAt && invite.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'This invite has expired' },
        { status: 400 }
      );
    }

    if (invite.maxUses && invite.usedCount >= invite.maxUses) {
      return NextResponse.json(
        { error: 'This invite has reached its maximum uses' },
        { status: 400 }
      );
    }

    // Check if user is already a participant in this game
    if (invite.game.participants.length > 0) {
      return NextResponse.json(
        { error: 'You are already a participant in this game' },
        { status: 400 }
      );
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

      // Check if this character is already in the game
      const existingParticipants = await prisma.gameParticipant.findMany({
        where: {
          gameId: invite.gameId
        },
        select: {
          characterIds: true
        }
      });

      const isCharacterAlreadyInGame = existingParticipants.some(participant => {
        const characterIds = participant.characterIds as string[] || [];
        return characterIds.includes(characterId);
      });

      if (isCharacterAlreadyInGame) {
        return NextResponse.json(
          { error: 'This character is already in the game' },
          { status: 400 }
        );
      }
    }

    // Use a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Create the participant record
      const participant = await tx.gameParticipant.create({
        data: {
          gameId: invite.gameId,
          userId: user.id,
          characterIds: characterId ? [characterId] : []
        },
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

      // Increment the invite usage count
      await tx.gameInvite.update({
        where: { id: invite.id },
        data: { usedCount: invite.usedCount + 1 }
      });

      // Update the game's updatedAt timestamp
      await tx.game.update({
        where: { id: invite.gameId },
        data: { updatedAt: new Date() }
      });

      return participant;
    });

    // Broadcast the participant addition via Pusher
    await pusher.trigger(`game-${invite.gameId}`, 'participant:added', {
      gameId: invite.gameId,
      participantId: result.id,
      participant: {
        id: result.id,
        userId: result.userId,
        userName: result.user.name || result.user.email
      }
    });

    // Also broadcast a general game update
    await pusher.trigger(`game-${invite.gameId}`, 'game:updated', {
      gameId: invite.gameId,
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error joining game:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 