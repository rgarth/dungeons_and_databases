# WebRTC Peer-to-Peer Chat System

## Overview

The application now uses a peer-to-peer WebRTC chat system instead of the previous server-based SSE/API chat. This provides several benefits:

- **No server storage**: Chat messages are transient and not stored in the database
- **Lower latency**: Direct peer-to-peer communication
- **Reduced server load**: No need for chat message storage or polling
- **Better privacy**: Messages go directly between participants

## Architecture

### Components

1. **WebRTC Chat Service** (`src/lib/webrtc-chat.ts`)
   - Handles WebRTC peer connections
   - Manages data channels for message exchange
   - Coordinates with signaling server

2. **Signaling Server** (`src/app/api/webrtc-signaling/route.ts`)
   - Next.js API route that handles WebSocket connections
   - Manages game rooms and peer discovery
   - Forwards signaling messages between peers

3. **React Hook** (`src/hooks/use-webrtc-chat.ts`)
   - Provides React-friendly interface to WebRTC chat
   - Manages connection state and message handling
   - Auto-connects when chat tab is active

4. **Chat Component** (`src/components/party/WebRTCChat.tsx`)
   - UI component for the chat interface
   - Displays messages, connection status, and peer count
   - Handles message input and sending

### How It Works

1. **Connection**: When a user opens the chat tab, the WebRTC hook connects to the signaling server
2. **Peer Discovery**: The signaling server notifies other peers in the same game room
3. **WebRTC Setup**: Peers establish direct connections using WebRTC data channels
4. **Message Exchange**: Messages are sent directly between peers via data channels
5. **Cleanup**: When users leave or close the chat, connections are properly closed

## Features

### Message Types
- **Text**: Regular chat messages
- **System**: Connection/disconnection notifications
- **Dice Roll**: Special messages for dice roll results (future enhancement)

### Connection Status
- Real-time connection indicator
- Peer count display
- Error handling and reconnection
- Automatic cleanup on unmount

### UI Features
- Auto-scrolling message list
- Timestamp display
- User identification
- Message type icons
- Responsive design

## Technical Details

### Signaling Protocol
The signaling server handles these message types:
- `join`: New peer joining a game room
- `peer-joined`: Notification of new peer
- `peer-left`: Notification of peer disconnection
- `offer`: WebRTC connection offer
- `answer`: WebRTC connection answer
- `ice-candidate`: ICE candidate exchange

### WebRTC Configuration
- Uses Google's public STUN servers
- Supports both local and remote connections
- Automatic ICE candidate gathering
- Data channel for reliable message delivery

### Security
- Authentication required for signaling server access
- Game room isolation (peers only see others in same game)
- No message persistence (transient only)

## Migration from SSE Chat

### Removed Components
- `GameChatMessage` database table
- Chat API routes (`/api/games/[gameId]/chat`)
- SSE chat events endpoint
- Chat polling logic
- Chat message storage and cleanup

### Updated Components
- `GameDetailsModal`: Now uses WebRTC chat component
- Game type definitions: Removed chat message references
- API routes: Removed chat message counts

## Future Enhancements

1. **Dice Roll Integration**: Send dice roll results through chat
2. **File Sharing**: Share character sheets or images
3. **Voice Chat**: Add audio communication
4. **Message History**: Optional local storage of recent messages
5. **Encryption**: End-to-end message encryption
6. **Offline Support**: Queue messages when disconnected

## Troubleshooting

### Common Issues
1. **Connection Failed**: Check if signaling server is running
2. **No Peers**: Ensure other users are in the same game and have chat open
3. **Messages Not Sending**: Check WebRTC connection status
4. **Browser Compatibility**: Ensure WebRTC is supported

### Debug Information
- Connection status is displayed in the chat header
- Peer count shows number of connected users
- Error messages appear in red at the top of chat
- Browser console shows detailed WebRTC logs 