import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { encounterCache } from '@/lib/encounter-cache';
import { Encounter } from '@/types/encounter';
import Pusher from 'pusher';

interface CreatedEncounter {
  id: string;
  gameId: string;
  name: string;
  description: string | null;
  monsters: unknown[];
  participants: unknown[];
}

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
  useTLS: true,
});

// GET /api/games/[gameId]/encounters - Get all encounters for a game
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

    // Check if user is a participant in this game
    const participant = await prisma.gameParticipant.findFirst({
      where: {
        gameId: gameId,
        userId: session.user.id
      }
    });

    if (!participant) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Try cache first
    let encounters = encounterCache.get(gameId);
    if (!encounters) {
      // Fetch from DB - using type assertion since Prisma client types may not be updated yet
      const dbEncounters = await (prisma as unknown as { encounter: { findMany: (args: { where: { gameId: string }; include: { monsters: { orderBy: { createdAt: string }; include: { instances: { orderBy: { instanceNumber: string } } } }; participants: { orderBy: { createdAt: string } } }; orderBy: { createdAt: string } }) => Promise<unknown[]> } }).encounter.findMany({
        where: { gameId },
        include: {
          monsters: {
            orderBy: { createdAt: 'asc' },
            include: {
              instances: {
                orderBy: { instanceNumber: 'asc' }
              }
            }
          },
          participants: {
            orderBy: { createdAt: 'asc' }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
      
      // Transform Prisma result to match our Encounter type
      const transformedEncounters = dbEncounters.map((enc: unknown) => {
        const encounter = enc as Record<string, unknown>;
        return {
          ...encounter,
          description: encounter.description || undefined // Convert null to undefined
        } as Encounter;
      });
      
      // Cache the result
      encounterCache.set(gameId, transformedEncounters);
      encounters = transformedEncounters;
    }

    return NextResponse.json(encounters);
  } catch (error) {
    console.error('Error fetching encounters:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/games/[gameId]/encounters - Create a new encounter
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
    const { name, description } = await request.json();

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Encounter name is required' },
        { status: 400 }
      );
    }

    // Check if user is the DM of this game
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { dm: true }
    });

    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    if (game.dmId !== session.user.id) {
      return NextResponse.json({ error: 'Only the DM can create encounters' }, { status: 403 });
    }

    const encounter = await (prisma as unknown as { encounter: { create: (args: { data: { gameId: string; name: string; description: string | null }; include: { monsters: boolean; participants: boolean } }) => Promise<CreatedEncounter> } }).encounter.create({
      data: {
        gameId,
        name: name.trim(),
        description: description?.trim() || null
      },
      include: {
        monsters: true,
        participants: true
      }
    });

    // Transform to match our Encounter type
    const transformedEncounter = {
      ...encounter,
      description: encounter.description || undefined
    } as Encounter;

    // Update cache
    encounterCache.addEncounter(gameId, transformedEncounter);

    // Broadcast real-time update
    await pusher.trigger(`game-${gameId}`, 'encounter:created', transformedEncounter);

    return NextResponse.json(transformedEncounter, { status: 201 });
  } catch (error) {
    console.error('Error creating encounter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 