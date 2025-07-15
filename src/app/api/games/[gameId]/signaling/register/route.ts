import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Use database for peer registrations with in-memory cache
const peerCache = new Map<string, { userId: string; userName: string; lastSeen: number }>();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId } = await params;
    const { userId, userName, timestamp } = await request.json();

    // Get the user by email to get their ID
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify the user is a participant in this game
    const participant = await prisma.gameParticipant.findFirst({
      where: {
        gameId,
        userId: user.id
      }
    });

    if (!participant) {
      return NextResponse.json({ error: 'Not a participant in this game' }, { status: 403 });
    }

    // Register the peer in database
    await prisma.peerRegistration.upsert({
      where: {
        gameId_userId: {
          gameId,
          userId: user.id
        }
      },
      update: {
        userName,
        lastSeen: new Date()
      },
      create: {
        gameId,
        userId: user.id,
        userName
      }
    });

    // Update cache
    peerCache.set(`${gameId}:${user.id}`, {
      userId: user.id,
      userName,
      lastSeen: Date.now()
    });

    // Clean up old registrations (older than 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    await prisma.peerRegistration.deleteMany({
      where: {
        gameId,
        lastSeen: {
          lt: fiveMinutesAgo
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error registering peer:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 