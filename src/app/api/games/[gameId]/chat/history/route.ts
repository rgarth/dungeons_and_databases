import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// In-memory storage for chat messages (in production, use Redis or similar)
const chatHistory = new Map<string, Array<{
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: number;
  type: 'text' | 'system' | 'dice_roll';
}>>();

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

    // Return chat history for this game
    const messages = chatHistory.get(gameId) || [];
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error loading chat history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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
    const { id, userId, userName, message, timestamp, type } = await request.json();

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

    // Store the message
    const chatMessage = {
      id,
      userId,
      userName,
      message,
      timestamp,
      type
    };

    if (!chatHistory.has(gameId)) {
      chatHistory.set(gameId, []);
    }

    const messages = chatHistory.get(gameId)!;
    messages.push(chatMessage);

    // Keep only the last 100 messages to prevent memory issues
    if (messages.length > 100) {
      messages.splice(0, messages.length - 100);
    }

    console.log(`💾 Stored message for game ${gameId}, history now has ${messages.length} messages`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing chat message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 