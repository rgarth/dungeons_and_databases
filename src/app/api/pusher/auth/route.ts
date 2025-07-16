import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
  useTLS: true,
});

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 Pusher auth request received');
    
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      console.log('❌ No session found for Pusher auth');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.log(`✅ Session found for user: ${session.user.email}`);

    // Pusher sends form data by default
    const formData = await request.formData();
    const socket_id = formData.get('socket_id') as string;
    const channel_name = formData.get('channel_name') as string;

    if (!socket_id || !channel_name) {
      return NextResponse.json({ error: 'Missing socket_id or channel_name' }, { status: 400 });
    }

    // Extract game ID from channel name for validation
    const gameMatch = channel_name.match(/game-([^-]+)/);
    if (!gameMatch) {
      return NextResponse.json({ error: 'Invalid channel name' }, { status: 400 });
    }

    // TODO: Verify the user is a participant in this game
    // const gameId = gameMatch[1];
    // This would typically check your database
    // For now, we'll allow the connection

    let authResponse;
    
    if (channel_name.startsWith('presence-')) {
      // Presence channel - include user info
      authResponse = pusher.authorizeChannel(socket_id, channel_name, {
        user_id: session.user.id,
        user_info: {
          name: session.user.name || session.user.email,
        },
      });
    } else {
      // Private channel
      authResponse = pusher.authorizeChannel(socket_id, channel_name);
    }

    return NextResponse.json(authResponse);
  } catch (error) {
    console.error('Pusher auth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 