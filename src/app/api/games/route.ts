import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/games - List games for the current user
export async function GET() {
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

    // Get games where user is DM or participant
    const games = await prisma.game.findMany({
      where: {
        OR: [
          { dmId: user.id },
          {
            participants: {
              some: {
                userId: user.id
              }
            }
          }
        ],
        isActive: true
      },
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
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    // Fetch character data for each participant
    const gamesWithCharacters = await Promise.all(
      games.map(async (game) => {
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

        return {
          ...game,
          participants: participantsWithCharacters
        };
      })
    );

    return NextResponse.json(gamesWithCharacters);
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/games - Create a new game
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

    const { name, description } = await request.json();

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Game name is required' },
        { status: 400 }
      );
    }

    const game = await prisma.$transaction(async (tx) => {
      // Create the game
      const createdGame = await tx.game.create({
        data: {
          name: name.trim(),
          description: description?.trim() || null,
          dmId: user.id,
          participants: {
            create: {
              userId: user.id,
              isDm: true
            }
          }
        },
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
          }
        }
      });

      // Create a default invite using the first 8 characters of the game ID
      const inviteCode = createdGame.id.slice(0, 8).toUpperCase();
      await tx.gameInvite.create({
        data: {
          gameId: createdGame.id,
          inviteCode: inviteCode,
          createdBy: user.id,
          isActive: true
        }
      });

      return createdGame;
    });

    return NextResponse.json(game, { status: 201 });
  } catch (error) {
    console.error('Error creating game:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 