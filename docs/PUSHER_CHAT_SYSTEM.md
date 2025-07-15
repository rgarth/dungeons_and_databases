# Pusher Chat System

## Overview

The Pusher Chat System is a serverless real-time chat solution that replaces the previous WebRTC-based approach. It solves the fundamental problem where the chat would break if the host user tabs away or disconnects.

## Key Benefits

- **No Host Dependency**: Chat works regardless of which user is online
- **Serverless Compatible**: Works perfectly with Vercel and other serverless platforms
- **Automatic Reconnection**: Handles network issues gracefully
- **Real-time Presence**: Shows who's currently online
- **Local History**: Messages stored locally for 7 days
- **Scalable**: Can handle many concurrent users

## Architecture

### Components

1. **PusherChat Class** (`src/lib/pusher-chat.ts`)
   - Core chat functionality
   - Handles Pusher connections and events
   - Manages message storage and retrieval

2. **usePusherChat Hook** (`src/hooks/use-pusher-chat.ts`)
   - React hook for easy integration
   - Manages connection state and messages
   - Provides clean API for components

3. **PusherChat Component** (`src/components/party/PusherChat.tsx`)
   - UI component for chat interface
   - Real-time message display
   - Connection status indicators

4. **Authentication Endpoint** (`src/app/api/pusher/auth/route.ts`)
   - Handles Pusher channel authentication
   - Verifies user permissions

## Setup

### 1. Pusher Account Setup

1. Sign up at [pusher.com](https://pusher.com)
2. Create a new Channels app
3. Note your app credentials:
   - App ID
   - Key
   - Secret
   - Cluster

### 2. Environment Variables

Add these to your `.env.local`:

```env
# Pusher Configuration
NEXT_PUBLIC_PUSHER_KEY="your-pusher-key-here"
NEXT_PUBLIC_PUSHER_CLUSTER="us2"
PUSHER_APP_ID="your-pusher-app-id-here"
PUSHER_SECRET="your-pusher-secret-here"
```

### 3. Usage

```tsx
import { usePusherChat } from '@/hooks/use-pusher-chat';
import { PusherChat } from '@/components/party/PusherChat';

// In your component
function GamePage({ gameId }: { gameId: string }) {
  return (
    <div>
      <PusherChat gameId={gameId} />
    </div>
  );
}

// Or use the hook directly
function CustomChat({ gameId }: { gameId: string }) {
  const { messages, sendMessage, isConnected } = usePusherChat({ gameId });
  
  // Your custom chat UI
}
```

## How It Works

### Channel Structure

- **Chat Channel**: `game-{gameId}-chat`
  - Private channel for game messages
  - Requires authentication

- **Presence Channel**: `presence-game-{gameId}`
  - Tracks who's online
  - Automatically updates when users join/leave

### Message Flow

1. User connects to Pusher
2. Authenticates with the server
3. Subscribes to game channels
4. Sends/receives messages in real-time
5. Messages stored locally for persistence

### Authentication

The system uses NextAuth session data to authenticate users with Pusher. The authentication endpoint verifies:
- User is logged in
- User has permission to access the game
- Channel name is valid

## Features

### Message Types

- `text`: Regular chat messages
- `system`: System notifications
- `dice_roll`: Dice roll results

### Local Storage

- Messages stored in localStorage
- 7-day retention period
- Maximum 200 messages per game
- Automatic cleanup of old messages

### Presence Tracking

- Real-time user count
- Automatic updates when users join/leave
- Visual indicators for connection status

## Testing

Visit `/test-pusher-chat` to test the system:

1. Open multiple browser tabs
2. Use the same Game ID
3. Connect to chat
4. Send messages between tabs
5. Test disconnection scenarios

## Migration from WebRTC

The old WebRTC system had these issues:
- Host dependency (chat breaks if host tabs away)
- Complex peer-to-peer setup
- No serverless compatibility
- Difficult to debug

The new Pusher system solves all these problems while providing a better user experience.

## Cost Considerations

Pusher has a generous free tier:
- 200,000 messages/day
- 100 concurrent connections
- Perfect for small to medium games

For larger scale, consider:
- Ably (alternative to Pusher)
- Socket.IO with serverless adapter
- Custom WebSocket solution

## Security

- All channels are private and require authentication
- User permissions verified on server
- No sensitive data in messages
- Local storage only contains chat history 