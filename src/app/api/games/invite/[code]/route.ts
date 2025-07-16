import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/games/invite/[code] - Get game details by invite code
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { code } = await params;

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Invalid invite code' }, { status: 400 });
    }

    // Find the invite and get the associated game
    const invite = await prisma.gameInvite.findUnique({
      where: { inviteCode: code.toUpperCase() },
      include: {
        game: {
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
            participants: true
              }
            }
          }
        }
      }
    });

    if (!invite) {
      return NextResponse.json({ error: 'Invalid invite code' }, { status: 404 });
    }

    if (!invite.isActive) {
      return NextResponse.json({ error: 'This invite is no longer active' }, { status: 400 });
    }

    if (invite.expiresAt && invite.expiresAt < new Date()) {
      return NextResponse.json({ error: 'This invite has expired' }, { status: 400 });
    }

    if (invite.maxUses && invite.usedCount >= invite.maxUses) {
      return NextResponse.json({ error: 'This invite has reached its maximum uses' }, { status: 400 });
    }

    // Fetch characters for each participant
    const participantsWithCharacters = await Promise.all(
      invite.game.participants.map(async (participant) => {
        const characterIds = participant.characterIds as string[] || [];
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
      ...invite.game,
      participants: participantsWithCharacters
    };

    return NextResponse.json(gameWithCharacters);
  } catch (error) {
    console.error('Error fetching game by invite code:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 