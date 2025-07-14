import { io, Socket } from 'socket.io-client';

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: number;
  type: 'text' | 'system' | 'dice_roll';
}

export interface PeerConnection {
  peerId: string;
  connection: RTCPeerConnection;
  dataChannel?: RTCDataChannel;
  socketId: string;
}

export interface WebRTCChatConfig {
  gameId: string;
  userId: string;
  userName: string;
  onMessage: (message: ChatMessage) => void;
  onPeerConnected: (peerId: string) => void;
  onPeerDisconnected: (peerId: string) => void;
  onError: (error: string) => void;
}

export class WebRTCChat {
  private config: WebRTCChatConfig;
  private peerConnections: Map<string, PeerConnection> = new Map();
  private localPeerId: string;
  private socket: Socket | null = null;
  private isHost: boolean = false;

  constructor(config: WebRTCChatConfig) {
    this.config = config;
    this.localPeerId = config.userId;
  }

  async connect(): Promise<void> {
    try {
      // Connect to Socket.IO server
      await this.connectToSignalingServer();
      
      // If no other peers exist, become the host
      if (this.peerConnections.size === 0) {
        this.isHost = true;
      }
    } catch (error) {
      this.config.onError(`Failed to connect: ${error}`);
    }
  }

  private async connectToSignalingServer(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Connect to Socket.IO server
      this.socket = io();
      
      this.socket.on('connect', () => {
        console.log('🔗 Connected to Socket.IO server');
        
        // Join the game room
        this.socket?.emit('join-game', {
          gameId: this.config.gameId,
          userId: this.config.userId,
          userName: this.config.userName
        });
        
        resolve();
      });

      this.socket.on('peer-joined', (data: { peerId: string; userName: string; socketId: string }) => {
        this.handlePeerJoined(data.peerId, data.userName, data.socketId);
      });

      this.socket.on('peer-left', (data: { socketId: string }) => {
        this.handlePeerLeft(data.socketId);
      });

      this.socket.on('webrtc-signal', (data: { fromSocketId: string; signal: RTCSessionDescriptionInit | RTCIceCandidateInit; type: string }) => {
        this.handleWebRTCSignal(data.fromSocketId, data.signal, data.type);
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket.IO connection error:', error);
        reject(error);
      });

      this.socket.on('disconnect', () => {
        console.log('Socket.IO connection closed');
        this.config.onError('Lost connection to signaling server');
      });
    });
  }

  private async handlePeerJoined(peerId: string, userName: string, socketId: string): Promise<void> {
    console.log(`Peer joined: ${peerId} (${userName})`);
    
    if (peerId === this.localPeerId) return;

    const peerConnection = await this.createPeerConnection(peerId, socketId);
    this.peerConnections.set(peerId, peerConnection);

    if (this.isHost) {
      // Host creates and sends offer
      const offer = await peerConnection.connection.createOffer();
      await peerConnection.connection.setLocalDescription(offer);
      this.socket?.emit('webrtc-signal', {
        targetSocketId: socketId,
        signal: offer,
        type: 'offer'
      });
    }

    this.config.onPeerConnected(peerId);
  }

  private handlePeerLeft(socketId: string): void {
    console.log(`Peer left: ${socketId}`);
    // Find and remove the peer connection
    for (const [peerId, peerConnection] of this.peerConnections.entries()) {
      if (peerConnection.socketId === socketId) {
        peerConnection.connection.close();
        this.peerConnections.delete(peerId);
        this.config.onPeerDisconnected(peerId);
        break;
      }
    }
  }

  private async handleWebRTCSignal(fromSocketId: string, signal: RTCSessionDescriptionInit | RTCIceCandidateInit, type: string): Promise<void> {
    // Find the peer connection by socket ID
    let targetPeerConnection: PeerConnection | undefined;
    for (const peerConnection of this.peerConnections.values()) {
      if (peerConnection.socketId === fromSocketId) {
        targetPeerConnection = peerConnection;
        break;
      }
    }

    if (!targetPeerConnection) {
      // Create new peer connection if it doesn't exist
      const peerId = `peer-${fromSocketId}`;
      targetPeerConnection = await this.createPeerConnection(peerId, fromSocketId);
      this.peerConnections.set(peerId, targetPeerConnection);
    }

    switch (type) {
      case 'offer':
        await targetPeerConnection.connection.setRemoteDescription(signal as RTCSessionDescriptionInit);
        const answer = await targetPeerConnection.connection.createAnswer();
        await targetPeerConnection.connection.setLocalDescription(answer);
        this.socket?.emit('webrtc-signal', {
          targetSocketId: fromSocketId,
          signal: answer,
          type: 'answer'
        });
        break;
      case 'answer':
        await targetPeerConnection.connection.setRemoteDescription(signal as RTCSessionDescriptionInit);
        break;
      case 'ice-candidate':
        await targetPeerConnection.connection.addIceCandidate(signal as RTCIceCandidateInit);
        break;
    }
  }

  private async createPeerConnection(peerId: string, socketId: string): Promise<PeerConnection> {
    const configuration: RTCConfiguration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    };

    const connection = new RTCPeerConnection(configuration);

    // Handle ICE candidates
    connection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket?.emit('webrtc-signal', {
          targetSocketId: socketId,
          signal: event.candidate,
          type: 'ice-candidate'
        });
      }
    };

    // Handle data channel
    connection.ondatachannel = (event) => {
      this.setupDataChannel(event.channel, peerId);
    };

    // Create data channel if we're the initiator
    if (this.isHost) {
      const dataChannel = connection.createDataChannel('chat');
      this.setupDataChannel(dataChannel, peerId);
    }

    return { peerId, connection, socketId };
  }

  private setupDataChannel(dataChannel: RTCDataChannel, peerId: string): void {
    const peerConnection = this.peerConnections.get(peerId);
    if (peerConnection) {
      peerConnection.dataChannel = dataChannel;
    }

    dataChannel.onopen = () => {
      console.log(`Data channel opened with ${peerId}`);
    };

    dataChannel.onmessage = (event) => {
      try {
        const message: ChatMessage = JSON.parse(event.data);
        this.config.onMessage(message);
      } catch (error) {
        console.error('Error parsing chat message:', error);
      }
    };

    dataChannel.onclose = () => {
      console.log(`Data channel closed with ${peerId}`);
    };

    dataChannel.onerror = (error) => {
      console.error(`Data channel error with ${peerId}:`, error);
    };
  }

  sendMessage(message: string, type: 'text' | 'system' | 'dice_roll' = 'text'): void {
    const chatMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random()}`,
      userId: this.config.userId,
      userName: this.config.userName,
      message,
      timestamp: Date.now(),
      type
    };

    // Send to all peers
    this.peerConnections.forEach((peerConnection) => {
      if (peerConnection.dataChannel?.readyState === 'open') {
        peerConnection.dataChannel.send(JSON.stringify(chatMessage));
      }
    });

    // Also trigger local message callback
    this.config.onMessage(chatMessage);
  }

  disconnect(): void {
    // Close all peer connections
    this.peerConnections.forEach((peerConnection) => {
      peerConnection.connection.close();
    });
    this.peerConnections.clear();

    // Close Socket.IO connection
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  getConnectedPeers(): string[] {
    return Array.from(this.peerConnections.keys());
  }
} 