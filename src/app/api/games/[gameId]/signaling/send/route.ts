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
  signal?: RTCSessionDescriptionInit | RTCIceCandidateInit;
  signalType?: string;
  peerId?: string;
  userName?: string;
  socketId?: string;
  timestamp: number;
}>>();

export async function POST(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId } = params;
    const { type, targetUserId, signal, signalType, fromUserId, timestamp } = await request.json();

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

    // Create the signaling message
    const message = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      fromUserId,
      targetUserId,
      signal,
      signalType,
      timestamp
    };

    // Store the message
    const gameMessages = signalingMessages.get(gameId) || [];
    gameMessages.push(message);
    signalingMessages.set(gameId, gameMessages);

    // If this is a peer-joined message, broadcast to all other peers
    if (type === 'peer-joined') {
      const broadcastMessage = {
        ...message,
        id: `${Date.now()}-${Math.random()}`,
        targetUserId: undefined // Broadcast to all
      };
      gameMessages.push(broadcastMessage);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending signaling message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 