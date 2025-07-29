import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
  useTLS: true,
});

// GET /api/games/[gameId]/encounters/[encounterId] - Get encounter details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string; encounterId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId, encounterId } = await params;

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

    const encounter = await prisma.encounter.findUnique({
      where: { id: encounterId },
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
      }
    });

    if (!encounter) {
      return NextResponse.json({ error: 'Encounter not found' }, { status: 404 });
    }



    return NextResponse.json(encounter);
  } catch (error) {
    console.error('Error fetching encounter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/games/[gameId]/encounters/[encounterId] - Update encounter
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string; encounterId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId, encounterId } = await params;
    const { name, description, isActive, turnOrder, currentParticipantId, currentTurn, round } = await request.json();
    




    // Check if user is the DM of this game
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { dm: true }
    });

    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    if (game.dmId !== session.user.id) {
      return NextResponse.json({ error: 'Only the DM can update encounters' }, { status: 403 });
    }


    
    const encounter = await prisma.encounter.update({
      where: { id: encounterId },
      data: {
        name: name?.trim(),
        description: description?.trim(),
        isActive,
        turnOrder,
        currentParticipantId,
        currentTurn,
        round
      },
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
      }
    });


    return NextResponse.json(encounter);
  } catch (error) {
    console.error('Error updating encounter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/games/[gameId]/encounters/[encounterId] - Delete encounter
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string; encounterId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameId, encounterId } = await params;

    // Check if user is the DM of this game
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { dm: true }
    });

    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    if (game.dmId !== session.user.id) {
      return NextResponse.json({ error: 'Only the DM can delete encounters' }, { status: 403 });
    }

    await prisma.encounter.delete({
      where: { id: encounterId }
    });

    // Trigger real-time event for encounter deletion
    try {
      await pusher.trigger(`game-${gameId}`, 'encounter:deleted', { encounterId });
    } catch (error) {
      console.error('Error triggering encounter:deleted event:', error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting encounter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 