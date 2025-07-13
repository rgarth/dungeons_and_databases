import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/games/[gameId] - Get game details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId } = await params;

    if (!gameId) {
      return NextResponse.json({ error: 'Game ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get the game with participants
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        dm: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        },
        _count: {
          select: {
            participants: true,
            chatMessages: true
          }
        }
      }
    });

    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    // Check if user is a participant or DM
    const isParticipant = game.participants.some(p => p.userId === user.id);
    const isDm = game.dmId === user.id;

    if (!isParticipant && !isDm) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Fetch character data for each participant
    const participantsWithCharacters = await Promise.all(
      game.participants.map(async (participant) => {
        const characterIds = (participant.characterIds as string[]) || [];
        const characters = characterIds.length > 0 
          ? await prisma.character.findMany({
              where: { id: { in: characterIds } },
              select: {
                id: true,
                name: true,
                class: true,
                level: true,
                race: true,
                avatarUrl: true
              }
            })
          : [];
        
        return {
          ...participant,
          characters
        };
      })
    );

    const gameWithCharacters = {
      ...game,
      participants: participantsWithCharacters
    };

    return NextResponse.json(gameWithCharacters);
  } catch (error) {
    console.error('Error fetching game:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 