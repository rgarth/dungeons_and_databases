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
  private isHost: boolean = false;
  private signalingInterval: NodeJS.Timeout | null = null;
  private lastSignalingCheck: number = 0;
  private connectedPeers: Set<string> = new Set();

  constructor(config: WebRTCChatConfig) {
    this.config = config;
    this.localPeerId = config.userId;
  }

  async connect(): Promise<void> {
    try {
      // Start HTTP-based signaling
      await this.startSignaling();
      
      // If no other peers exist, become the host
      if (this.peerConnections.size === 0) {
        this.isHost = true;
      }
    } catch (error) {
      this.config.onError(`Failed to connect: ${error}`);
    }
  }

  private async startSignaling(): Promise<void> {
    // Register this peer with the signaling server
    await this.registerPeer();
    
    // Start polling for signaling messages
    this.signalingInterval = setInterval(async () => {
      await this.pollSignalingMessages();
    }, 1000); // Poll every second
  }

  private async registerPeer(): Promise<void> {
    try {
      const response = await fetch(`/api/games/${this.config.gameId}/signaling/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: this.config.userId,
          userName: this.config.userName,
          timestamp: Date.now()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to register peer');
      }
    } catch (error) {
      console.error('Failed to register peer:', error);
      throw error;
    }
  }

  private async pollSignalingMessages(): Promise<void> {
    try {
      const response = await fetch(`/api/games/${this.config.gameId}/signaling/messages?userId=${this.config.userId}&since=${this.lastSignalingCheck}`);
      
      if (!response.ok) {
        return;
      }

      const messages = await response.json();
      
      for (const message of messages) {
        await this.handleSignalingMessage(message);
        this.lastSignalingCheck = Math.max(this.lastSignalingCheck, message.timestamp);
      }
    } catch (error) {
      console.error('Failed to poll signaling messages:', error);
    }
  }

  private async handleSignalingMessage(message: {
    type: string;
    peerId?: string;
    userName?: string;
    socketId?: string;
    fromSocketId?: string;
    signal?: RTCSessionDescriptionInit | RTCIceCandidateInit;
    signalType?: string;
  }): Promise<void> {
          switch (message.type) {
        case 'peer-joined':
          if (message.peerId && message.userName && message.socketId) {
            await this.handlePeerJoined(message.peerId, message.userName, message.socketId);
          }
          break;
        case 'peer-left':
          if (message.socketId) {
            this.handlePeerLeft(message.socketId);
          }
          break;
        case 'webrtc-signal':
          if (message.fromSocketId && message.signal && message.signalType) {
            await this.handleWebRTCSignal(message.fromSocketId, message.signal, message.signalType);
          }
          break;
      }
  }

  private async handlePeerJoined(peerId: string, userName: string, socketId: string): Promise<void> {
    console.log(`Peer joined: ${peerId} (${userName})`);
    
    if (peerId === this.localPeerId) return;

    const peerConnection = await this.createPeerConnection(peerId, socketId);
    this.peerConnections.set(peerId, peerConnection);
    this.connectedPeers.add(peerId);

    if (this.isHost) {
      // Host creates and sends offer
      const offer = await peerConnection.connection.createOffer();
      await peerConnection.connection.setLocalDescription(offer);
      await this.sendSignalingMessage({
        type: 'webrtc-signal',
        targetUserId: peerId,
        signal: offer,
        signalType: 'offer'
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
        this.connectedPeers.delete(peerId);
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
      this.connectedPeers.add(peerId);
    }

    switch (type) {
      case 'offer':
        await targetPeerConnection.connection.setRemoteDescription(signal as RTCSessionDescriptionInit);
        const answer = await targetPeerConnection.connection.createAnswer();
        await targetPeerConnection.connection.setLocalDescription(answer);
        await this.sendSignalingMessage({
          type: 'webrtc-signal',
          targetUserId: targetPeerConnection.peerId,
          signal: answer,
          signalType: 'answer'
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

  private async sendSignalingMessage(message: {
    type: string;
    targetUserId?: string;
    signal?: RTCSessionDescriptionInit | RTCIceCandidateInit;
    signalType?: string;
  }): Promise<void> {
    try {
      await fetch(`/api/games/${this.config.gameId}/signaling/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...message,
          fromUserId: this.config.userId,
          timestamp: Date.now()
        })
      });
    } catch (error) {
      console.error('Failed to send signaling message:', error);
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
    connection.onicecandidate = async (event) => {
      if (event.candidate) {
        await this.sendSignalingMessage({
          type: 'webrtc-signal',
          targetUserId: peerId,
          signal: event.candidate,
          signalType: 'ice-candidate'
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

    return {
      peerId,
      connection,
      socketId
    };
  }

  private setupDataChannel(dataChannel: RTCDataChannel, peerId: string): void {
    dataChannel.onopen = () => {
      console.log(`Data channel opened with peer: ${peerId}`);
    };

    dataChannel.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'chat-message') {
          const message: ChatMessage = {
            id: data.id,
            userId: data.userId,
            userName: data.userName,
            message: data.message,
            timestamp: data.timestamp,
            type: data.messageType
          };
          this.config.onMessage(message);
        }
      } catch (error) {
        console.error('Failed to parse data channel message:', error);
      }
    };

    dataChannel.onclose = () => {
      console.log(`Data channel closed with peer: ${peerId}`);
    };

    dataChannel.onerror = (error) => {
      console.error(`Data channel error with peer ${peerId}:`, error);
    };

    // Store the data channel in the peer connection
    const peerConnection = this.peerConnections.get(peerId);
    if (peerConnection) {
      peerConnection.dataChannel = dataChannel;
    }
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

    // Send to all connected peers via data channels
    for (const peerConnection of this.peerConnections.values()) {
      if (peerConnection.dataChannel && peerConnection.dataChannel.readyState === 'open') {
        peerConnection.dataChannel.send(JSON.stringify({
          messageType: 'chat-message',
          ...chatMessage
        }));
      }
    }

    // Also send to self for immediate display
    this.config.onMessage(chatMessage);
  }

  async loadChatHistory(): Promise<ChatMessage[]> {
    try {
      const response = await fetch(`/api/games/${this.config.gameId}/chat/history`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
    return [];
  }

  disconnect(): void {
    // Clear signaling interval
    if (this.signalingInterval) {
      clearInterval(this.signalingInterval);
      this.signalingInterval = null;
    }

    // Close all peer connections
    for (const peerConnection of this.peerConnections.values()) {
      peerConnection.connection.close();
    }
    this.peerConnections.clear();
    this.connectedPeers.clear();
  }

  getConnectedPeers(): string[] {
    return Array.from(this.connectedPeers);
  }

  async getRoomPeerCount(): Promise<number> {
    try {
      const response = await fetch(`/api/games/${this.config.gameId}/signaling/peers`);
      if (response.ok) {
        const data = await response.json();
        return data.count || 0;
      }
    } catch (error) {
      console.error('Failed to get peer count:', error);
    }
    return this.connectedPeers.size;
  }
} 