import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

let io: SocketIOServer | null = null;

export function initializeSocketServer(server: HTTPServer) {
  if (io) return io;

  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? process.env.NEXT_PUBLIC_APP_URL 
        : "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  // Game rooms for WebRTC signaling
  const gameRooms = new Map<string, Set<string>>();

  io.on('connection', (socket) => {
    console.log('🔌 Socket connected:', socket.id);

    // Join game room
    socket.on('join-game', (data: { gameId: string; userId: string; userName: string }) => {
      const { gameId, userId, userName } = data;
      
      socket.join(gameId);
      
      // Track user in game room
      if (!gameRooms.has(gameId)) {
        gameRooms.set(gameId, new Set());
      }
      gameRooms.get(gameId)!.add(socket.id);

      // Notify other users in the room
      socket.to(gameId).emit('peer-joined', {
        peerId: userId,
        userName: userName,
        socketId: socket.id
      });

      console.log(`👤 User ${userName} (${userId}) joined game ${gameId}`);
    });

    // WebRTC signaling
    socket.on('webrtc-signal', (data: {
      targetSocketId: string;
      signal: RTCSessionDescriptionInit | RTCIceCandidateInit;
      type: 'offer' | 'answer' | 'ice-candidate';
    }) => {
      const { targetSocketId, signal, type } = data;
      
      // Forward signal to target peer
      io?.to(targetSocketId).emit('webrtc-signal', {
        fromSocketId: socket.id,
        signal,
        type
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('🔌 Socket disconnected:', socket.id);
      
      // Find which game room this socket was in
      for (const [gameId, sockets] of gameRooms.entries()) {
        if (sockets.has(socket.id)) {
          sockets.delete(socket.id);
          
          // Notify other users in the room
          socket.to(gameId).emit('peer-left', {
            socketId: socket.id
          });
          
          // Clean up empty rooms
          if (sockets.size === 0) {
            gameRooms.delete(gameId);
          }
          break;
        }
      }
    });
  });

  return io;
}

export function getSocketServer() {
  return io;
} 