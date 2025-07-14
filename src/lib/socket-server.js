import { Server as SocketIOServer } from 'socket.io';

let io = null;

export function initializeSocketServer(server) {
  if (io) return io;

  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? process.env.NEXT_PUBLIC_APP_URL 
        : "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  // Game rooms for WebRTC signaling - track by userId instead of socketId
  const gameRooms = new Map(); // gameId -> Set of userIds
  const socketToUser = new Map(); // socketId -> { gameId, userId, userName }
  const chatHistory = new Map(); // gameId -> Array of messages (last 100 messages)

  io.on('connection', (socket) => {
    console.log('🔌 Socket connected:', socket.id);

    // Join game room
    socket.on('join-game', (data) => {
      const { gameId, userId, userName } = data;
      
      socket.join(gameId);
      
      // Track user in game room by userId
      if (!gameRooms.has(gameId)) {
        gameRooms.set(gameId, new Set());
      }
      gameRooms.get(gameId).add(userId);
      
      // Track socket to user mapping
      socketToUser.set(socket.id, { gameId, userId, userName });

      // Notify other users in the room
      socket.to(gameId).emit('peer-joined', {
        peerId: userId,
        userName: userName,
        socketId: socket.id
      });

      console.log(`👤 User ${userName} (${userId}) joined game ${gameId}`);
      console.log(`📊 Room ${gameId} now has ${gameRooms.get(gameId).size} users`);
    });

    // WebRTC signaling
    socket.on('webrtc-signal', (data) => {
      const { targetSocketId, signal, type } = data;
      
      // Forward signal to target peer
      io?.to(targetSocketId).emit('webrtc-signal', {
        fromSocketId: socket.id,
        signal,
        type
      });
    });

    // Get room peer count
    socket.on('get-room-peer-count', (data, callback) => {
      const { gameId } = data;
      const room = gameRooms.get(gameId);
      const count = room ? room.size : 0;
      console.log(`📊 Room ${gameId} has ${count} users`);
      callback(count);
    });

    // Get chat history
    socket.on('get-chat-history', (data, callback) => {
      const { gameId } = data;
      const history = chatHistory.get(gameId) || [];
      console.log(`📜 Sending ${history.length} messages for game ${gameId}`);
      callback(history);
    });

    // Store chat message (for history)
    socket.on('store-chat-message', (data) => {
      const { gameId, message } = data;
      
      if (!chatHistory.has(gameId)) {
        chatHistory.set(gameId, []);
      }
      
      const history = chatHistory.get(gameId);
      history.push(message);
      
      // Keep only last 100 messages
      if (history.length > 100) {
        history.splice(0, history.length - 100);
      }
      
      console.log(`💾 Stored message for game ${gameId}, history now has ${history.length} messages`);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('🔌 Socket disconnected:', socket.id);
      
      const userInfo = socketToUser.get(socket.id);
      if (userInfo) {
        const { gameId, userId } = userInfo;
        
        // Remove from game room
        const room = gameRooms.get(gameId);
        if (room) {
          room.delete(userId);
          
          // Notify other users in the room
          socket.to(gameId).emit('peer-left', {
            socketId: socket.id
          });
          
          // Clean up empty rooms
          if (room.size === 0) {
            gameRooms.delete(gameId);
            chatHistory.delete(gameId); // Clean up chat history for empty rooms
          }
          
          console.log(`📊 Room ${gameId} now has ${room.size} users`);
        }
        
        // Remove socket mapping
        socketToUser.delete(socket.id);
      }
    });
  });

  return io;
}

export function getSocketServer() {
  return io;
} 