import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// POST /api/games/[gameId]/chat/cleanup - Clean up old messages
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

    // Count total messages for this game
    const messageCount = await prisma.gameChatMessage.count({
      where: { gameId: gameId }
    });

    // If we have more than 100 messages, delete the oldest ones
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

      return NextResponse.json({ 
        message: `Cleaned up ${messagesToDelete} old messages`,
        deletedCount: messagesToDelete
      });
    }

    return NextResponse.json({ 
      message: 'No cleanup needed',
      deletedCount: 0
    });
  } catch (error) {
    console.error('Error cleaning up chat messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 