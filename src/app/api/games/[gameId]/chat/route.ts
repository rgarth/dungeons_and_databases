import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/games/[gameId]/chat - Get chat messages for a game
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string }> }
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

    const { gameId } = await params;

    // Check if user is a participant in this game
    const participant = await prisma.gameParticipant.findFirst({
      where: {
        gameId: gameId,
        userId: user.id
      }
    });

    if (!participant) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const before = searchParams.get('before');

    const messages = await prisma.gameChatMessage.findMany({
      where: {
        gameId: gameId,
        ...(before && { createdAt: { lt: new Date(before) } })
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: Math.min(limit, 100) // Cap at 100 messages
    });

    return NextResponse.json(messages.reverse()); // Return in chronological order
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/games/[gameId]/chat - Send a chat message
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string }> }
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

    const { gameId } = await params;

    // Check if user is a participant in this game
    const participant = await prisma.gameParticipant.findFirst({
      where: {
        gameId: gameId,
        userId: user.id
      }
    });

    if (!participant) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const { message, messageType = 'text' } = await request.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (message.trim().length > 1000) {
      return NextResponse.json(
        { error: 'Message too long (max 1000 characters)' },
        { status: 400 }
      );
    }

    const chatMessage = await prisma.gameChatMessage.create({
      data: {
        gameId: gameId,
        userId: user.id,
        message: message.trim(),
        messageType
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    // Trigger cleanup to keep message count under 100
    try {
      const messageCount = await prisma.gameChatMessage.count({
        where: { gameId: gameId }
      });

      if (messageCount > 100) {
        const messagesToDelete = messageCount - 100;
        
        // Get the IDs of the oldest messages to delete
        const oldestMessages = await prisma.gameChatMessage.findMany({
          where: { gameId: gameId },
          select: { id: true },
          orderBy: { createdAt: 'asc' },
          take: messagesToDelete
        });

        const messageIdsToDelete = oldestMessages.map(msg => msg.id);

        // Delete the oldest messages
        await prisma.gameChatMessage.deleteMany({
          where: {
            id: { in: messageIdsToDelete }
          }
        });
      }
    } catch (cleanupError) {
      console.error('Error during chat cleanup:', cleanupError);
      // Don't fail the message send if cleanup fails
    }

    return NextResponse.json(chatMessage, { status: 201 });
  } catch (error) {
    console.error('Error sending chat message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 