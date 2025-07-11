import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/games/[gameId]/invites - Get invites for a game
export async function GET(
  request: NextRequest,
  { params }: { params: { gameId: string } }
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

    // Check if user is DM of this game
    const game = await prisma.game.findFirst({
      where: {
        id: params.gameId,
        dmId: user.id
      }
    });

    if (!game) {
      return NextResponse.json({ error: 'Game not found or access denied' }, { status: 404 });
    }

    const invites = await prisma.gameInvite.findMany({
      where: {
        gameId: params.gameId,
        isActive: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(invites);
  } catch (error) {
    console.error('Error fetching game invites:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/games/[gameId]/invites - Create a new invite
export async function POST(
  request: NextRequest,
  { params }: { params: { gameId: string } }
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

    // Check if user is DM of this game
    const game = await prisma.game.findFirst({
      where: {
        id: params.gameId,
        dmId: user.id
      }
    });

    if (!game) {
      return NextResponse.json({ error: 'Game not found or access denied' }, { status: 404 });
    }

    const { maxUses, expiresAt } = await request.json();

    // Generate unique invite code
    const generateInviteCode = () => {
      return Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    let inviteCode;
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 10) {
      inviteCode = generateInviteCode();
      const existing = await prisma.gameInvite.findUnique({
        where: { inviteCode }
      });
      if (!existing) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      return NextResponse.json(
        { error: 'Failed to generate unique invite code' },
        { status: 500 }
      );
    }

    const invite = await prisma.gameInvite.create({
      data: {
        gameId: params.gameId,
        inviteCode: inviteCode!,
        createdBy: user.id,
        maxUses: maxUses || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null
      }
    });

    return NextResponse.json(invite, { status: 201 });
  } catch (error) {
    console.error('Error creating game invite:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 