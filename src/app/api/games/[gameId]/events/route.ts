import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
          try {
            // Optimized single query with all includes
            const game = await prisma.game.findUnique({
              where: { id: gameId },
              include: {
                dm: {
                  select: {
                    id: true,
                    name: true,
                    email: true
                  }
                },
                participants: {
                  include: {
                    user: {
                      select: {
                        id: true,
                        name: true,
                        email: true
                      }
                    }
                  }
                },
                _count: {
                  select: {
                    participants: true
                  }
                }
              }
            });

            if (game) {
              // Get all character IDs from all participants
              const allCharacterIds = game.participants.flatMap(
                participant => (participant.characterIds as string[]) || []
              );

              // Single query for all characters
              const allCharacters = allCharacterIds.length > 0 ? await prisma.character.findMany({
                where: {
                  id: { in: allCharacterIds }
                },
                select: {
                  id: true,
                  name: true,
                  class: true,
                  level: true,
                  race: true,
                  avatarUrl: true
                }
              }) : [];

              // Create a map for quick lookup
              const characterMap = new Map(allCharacters.map(char => [char.id, char]));

              // Attach characters to participants
              const participantsWithCharacters = game.participants.map(participant => {
                const characterIds = (participant.characterIds as string[]) || [];
                const characters = characterIds.map(id => characterMap.get(id)).filter(Boolean);
                
                return {
                  ...participant,
                  characters
                };
              });

              const gameWithCharacters = {
                ...game,
                participants: participantsWithCharacters
              };

              sendEvent('game-update', gameWithCharacters);
            }
          } catch (error) {
            console.error('Error sending game update:', error);
          }
        };

        // Send initial state
        sendGameUpdate();

        // Set up periodic updates (much less frequent than polling)
        const interval = setInterval(sendGameUpdate, 60000); // Every 60 seconds

        // Clean up on disconnect
        request.signal.addEventListener('abort', () => {
          isClosed = true;
          clearInterval(interval);
          try {
            controller.close();
          } catch (error) {
            console.error('Error closing SSE controller:', error);
          }
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