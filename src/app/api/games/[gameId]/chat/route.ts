import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Pusher from 'pusher';
import { prisma } from '@/lib/prisma';
import { chatCache } from '@/lib/chat-cache';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
  useTLS: true,
});

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

    // Verify user is a participant in this game
    const participant = await prisma.gameParticipant.findUnique({
      where: {
        gameId_userId: {
          gameId,
          userId: session.user.id
        }
      }
    });
    if (!participant) {
      return NextResponse.json({ error: 'Not a participant in this game' }, { status: 403 });
    }

    // Try cache first
    let chatMessages = chatCache.get(gameId);
    if (!chatMessages) {
      // Fetch from DB
    const messages = await prisma.gameChatMessage.findMany({
        where: { gameId },
        orderBy: { createdAt: 'desc' },
        take: 100,
      });
      chatMessages = messages.reverse().map(msg => ({
        id: msg.id,
        userId: msg.userId,
        userName: msg.userName,
        message: msg.message,
        timestamp: msg.createdAt.getTime(),
        type: msg.type as 'text' | 'system' | 'dice_roll',
      }));
      chatCache.set(gameId, chatMessages);
    }
    return NextResponse.json({ messages: chatMessages });
  } catch (error) {
    console.error('Chat history error:', error);
    return NextResponse.json({ error: 'Failed to load chat history' }, { status: 500 });
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

    // Verify user is a participant in this game
    const participant = await prisma.gameParticipant.findUnique({
      where: {
        gameId_userId: {
          gameId,
          userId: session.user.id
        }
      }
    });
    if (!participant) {
      return NextResponse.json({ error: 'Not a participant in this game' }, { status: 403 });
    }
    const { message, type = 'text' } = await request.json();
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    // Store message in database
    const dbMessage = await prisma.gameChatMessage.create({
      data: {
        gameId,
        userId: session.user.id,
        userName: session.user.name || session.user.email,
        message,
        type
      }
    });
    const chatMessage = {
      id: dbMessage.id,
      userId: dbMessage.userId,
      userName: dbMessage.userName,
      message: dbMessage.message,
      timestamp: dbMessage.createdAt.getTime(),
      type: dbMessage.type as 'text' | 'system' | 'dice_roll',
    };
    // Update cache
    const cached = chatCache.get(gameId) || [];
    cached.push(chatMessage);
    chatCache.set(gameId, cached);
    // Send message to Pusher channel
    await pusher.trigger(`game-${gameId}-chat`, 'chat-message', chatMessage);
    return NextResponse.json({ success: true, message: chatMessage });
  } catch (error) {
    console.error('Chat message error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { gameId } = await params;
    
    // Only DM can clear chat
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      select: { dmId: true }
    });
    if (!game || game.dmId !== session.user.id) {
      return NextResponse.json({ error: 'Only the DM can clear chat' }, { status: 403 });
    }
    // Delete all chat messages for this game
    await prisma.gameChatMessage.deleteMany({ where: { gameId: gameId } });
    chatCache.invalidate(gameId);
    
    // Broadcast a system message that chat was cleared
    const clearMessage = {
      id: `system-${Date.now()}`,
      userId: 'system',
      userName: 'System',
      message: 'The DM has cleared the chat history.',
      timestamp: Date.now(),
      type: 'system',
    };
    
    console.log(`🗑️ DM clearing chat for game ${gameId}, broadcasting system message:`, clearMessage);
    await pusher.trigger(`game-${gameId}-chat`, 'chat-message', clearMessage);
    console.log(`✅ System message broadcasted successfully`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Chat clear error:', error);
    return NextResponse.json({ error: 'Failed to clear chat history' }, { status: 500 });
  }
} 