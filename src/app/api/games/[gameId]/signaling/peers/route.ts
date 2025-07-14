import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// In-memory storage for peer registrations (in production, use Redis or similar)
const peerRegistrations = new Map<string, { userId: string; userName: string; timestamp: number }>();

export async function GET(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId } = params;

    // Verify the user is a participant in this game
    const participant = await prisma.gameParticipant.findFirst({
      where: {
        gameId,
        userId: session.user.email
      }
    });

    if (!participant) {
      return NextResponse.json({ error: 'Not a participant in this game' }, { status: 403 });
    }

    // Count active peers for this game
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    let count = 0;
    
    for (const [key, registration] of peerRegistrations.entries()) {
      if (key.startsWith(`${gameId}:`) && registration.timestamp > fiveMinutesAgo) {
        count++;
      }
    }

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error getting peer count:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 