import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// SSE endpoint for real-time chat updates
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

    // Set up SSE headers
    const headers = {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    };

    const stream = new ReadableStream({
      start(controller) {
        let isClosed = false;
        
        const sendEvent = (event: string, data: unknown) => {
          if (isClosed) return;
          try {
            const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
            controller.enqueue(new TextEncoder().encode(message));
          } catch (error) {
            console.error('Error sending chat SSE event:', error);
            isClosed = true;
          }
        };

        let lastMessageId: string | null = null;

        // Send initial chat messages
        const sendChatUpdate = async () => {
          try {
            const messages = await prisma.gameChatMessage.findMany({
              where: { gameId: gameId },
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true
                  }
                }
              },
              orderBy: { createdAt: 'desc' },
              take: 50
            });

            if (messages.length > 0) {
              const latestMessageId = messages[0].id;
              if (latestMessageId !== lastMessageId) {
                sendEvent('chat-update', { messages: messages.reverse() });
                lastMessageId = latestMessageId;
              }
            }
          } catch (error) {
            console.error('Error sending chat update:', error);
          }
        };

        // Send initial state
        sendChatUpdate();

        // Set up periodic updates (much less frequent than polling)
        const interval = setInterval(sendChatUpdate, 10000); // Every 10 seconds

        // Clean up on disconnect
        request.signal.addEventListener('abort', () => {
          isClosed = true;
          clearInterval(interval);
          try {
            controller.close();
          } catch (error) {
            console.error('Error closing chat SSE controller:', error);
          }
        });
      }
    });

    return new Response(stream, { headers });
  } catch (error) {
    console.error('Error in chat SSE endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 