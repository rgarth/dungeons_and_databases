import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// In-memory storage for signaling messages (in production, use Redis or similar)
const signalingMessages = new Map<string, Array<{
  id: string;
  type: string;
  fromUserId: string;
  targetUserId?: string;
  signal?: any;
  signalType?: string;
  peerId?: string;
  userName?: string;
  socketId?: string;
  timestamp: number;
}>>();

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
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const since = parseInt(searchParams.get('since') || '0');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }

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

    // Get messages for this game
    const gameMessages = signalingMessages.get(gameId) || [];
    
    // Filter messages for this user (either sent to them or broadcast)
    const userMessages = gameMessages.filter(message => 
      message.timestamp > since && 
      (message.targetUserId === userId || !message.targetUserId)
    );

    // Clean up old messages (older than 1 minute)
    const oneMinuteAgo = Date.now() - 60 * 1000;
    const filteredMessages = gameMessages.filter(message => message.timestamp > oneMinuteAgo);
    signalingMessages.set(gameId, filteredMessages);

    return NextResponse.json(userMessages);
  } catch (error) {
    console.error('Error getting signaling messages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 