import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// In-memory tracking of game state changes
const gameStateChanges = new Map<string, {
  lastUpdate: number;
  participants: Set<string>;
  characters: Set<string>;
}>();

// SSE endpoint for real-time game updates
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
        let updateInterval: NodeJS.Timeout | null = null;
        
        const sendEvent = (event: string, data: unknown) => {
          if (isClosed) return;
          try {
            const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
            controller.enqueue(new TextEncoder().encode(message));
          } catch (error) {
            console.error('Error sending SSE event:', error);
            isClosed = true;
          }
        };

        // Send initial game state
        const sendGameUpdate = async () => {
          if (isClosed) return;
          
          try {
            // Only fetch basic game info, not full details
            const game = await prisma.game.findUnique({
              where: { id: gameId },
              select: {
                id: true,
                name: true,
                updatedAt: true,
                participants: {
                  select: {
                    id: true,
                    userId: true,
                    characterIds: true
                  }
                }
              }
            });

            if (game && !isClosed) {
              // Check for state changes
              const currentParticipants = new Set(game.participants.map(p => p.userId));
              const currentCharacters = new Set(
                game.participants.flatMap(p => (p.characterIds as string[]) || [])
              );

              const previousState = gameStateChanges.get(gameId);
              let hasChanges = false;

              if (!previousState) {
                // First time, initialize state
                gameStateChanges.set(gameId, {
                  lastUpdate: Date.now(),
                  participants: currentParticipants,
                  characters: currentCharacters
                });
                hasChanges = true;
              } else {
                // Check for changes
                const participantChanged = 
                  previousState.participants.size !== currentParticipants.size ||
                  [...previousState.participants].some(p => !currentParticipants.has(p)) ||
                  [...currentParticipants].some(p => !previousState.participants.has(p));

                const characterChanged = 
                  previousState.characters.size !== currentCharacters.size ||
                  [...previousState.characters].some(c => !currentCharacters.has(c)) ||
                  [...currentCharacters].some(c => !previousState.characters.has(c));

                if (participantChanged || characterChanged) {
                  hasChanges = true;
                  // Update state
                  gameStateChanges.set(gameId, {
                    lastUpdate: Date.now(),
                    participants: currentParticipants,
                    characters: currentCharacters
                  });
                }
              }

              // Only send update if there are changes or it's been more than 5 minutes
              const timeSinceLastUpdate = Date.now() - (previousState?.lastUpdate || 0);
              if (hasChanges || timeSinceLastUpdate > 5 * 60 * 1000) {
                sendEvent('game-update', {
                  id: game.id,
                  name: game.name,
                  updatedAt: game.updatedAt,
                  participantCount: currentParticipants.size,
                  characterCount: currentCharacters.size,
                  hasChanges
                });
              }
            }
          } catch (error) {
            console.error('Error sending game update:', error);
            // Don't close the connection on error, just log it
          }
        };

        // Send initial state
        sendGameUpdate();

        // Set up periodic updates (much less frequent to reduce database load)
        updateInterval = setInterval(sendGameUpdate, 30000); // Every 30 seconds instead of 5 minutes

        // Clean up on disconnect
        const cleanup = () => {
          isClosed = true;
          if (updateInterval) {
            clearInterval(updateInterval);
            updateInterval = null;
          }
          try {
            controller.close();
          } catch (error) {
            console.error('Error closing SSE controller:', error);
          }
        };

        // Listen for client disconnect
        request.signal.addEventListener('abort', cleanup);
        
        // Also set up a timeout to close the connection after 30 minutes to prevent hanging connections
        const timeoutId = setTimeout(cleanup, 30 * 60 * 1000); // 30 minutes
        
        // Clear timeout if connection is closed early
        request.signal.addEventListener('abort', () => {
          clearTimeout(timeoutId);
        });
      }
    });

    return new Response(stream, { headers });
  } catch (error) {
    console.error('Error in SSE endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 