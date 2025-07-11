import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/games/invite/[code] - Get game details by invite code
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { code } = params;

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Invalid invite code' }, { status: 400 });
    }

    // Find game by the first 8 characters of the ID (case insensitive)
    const game = await prisma.game.findFirst({
      where: {
        id: {
          startsWith: code.toUpperCase(),
          mode: 'insensitive'
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

    return NextResponse.json(game);
  } catch (error) {
    console.error('Error fetching game by invite code:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 