import Pusher from 'pusher-js';

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: number;
  type: 'text' | 'system' | 'dice_roll';
}

export interface PusherChatConfig {
  gameId: string;
  userId: string;
  userName: string;
  onMessage: (message: ChatMessage) => void;
  onPeerConnected: (userId: string) => void;
  onPeerDisconnected: (userId: string) => void;
  onError: (error: string) => void;
}

interface PusherMember {
  id: string;
  info?: {
    name: string;
  };
}

interface PusherMembers {
  members: { [userId: string]: PusherMember };
  count: number;
  myID: string;
  me: PusherMember;
}

export class PusherChat {
  private config: PusherChatConfig;
  private pusher: Pusher | null = null;
  private channel: ReturnType<Pusher['subscribe']> | null = null;
  private presenceChannel: ReturnType<Pusher['subscribe']> | null = null;
  private connectedPeers: Set<string> = new Set();

  constructor(config: PusherChatConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    console.log(`🚀 Connecting to Pusher chat for game ${this.config.gameId}`);
    console.log(`👤 Local user: ${this.config.userName} (${this.config.userId})`);

    try {
      // Initialize Pusher
      this.pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || 'your-pusher-key', {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
        authEndpoint: `/api/pusher/auth`,
        // Enable client events for real-time messaging
        enabledTransports: ['ws', 'wss'],
      });

      // Subscribe to the game's chat channel
      this.channel = this.pusher.subscribe(`game-${this.config.gameId}-chat`);

      // Subscribe to presence channel for user tracking
      this.presenceChannel = this.pusher.subscribe(`presence-game-${this.config.gameId}`);

      // Set up event handlers
      this.setupEventHandlers();

      console.log(`✅ Pusher chat connected`);
    } catch (error) {
      console.error('Failed to connect to Pusher:', error);
      this.config.onError(`Failed to connect: ${error}`);
    }
  }

  private setupEventHandlers(): void {
    if (!this.channel || !this.pusher || !this.presenceChannel) return;

    // Handle chat messages
    this.channel.bind('chat-message', (data: ChatMessage) => {
      console.log(`📨 Received chat message:`, data);
      
      // If this is a system message about clearing chat, trigger message clear
      if (data.type === 'system' && data.message === 'The DM has cleared the chat history.') {
        console.log(`🗑️ Received chat clear message, clearing messages`);
        // Trigger a special clear event that will clear the UI state
        this.config.onMessage({
          id: 'clear-all-messages',
          userId: 'system',
          userName: 'System',
          message: 'CLEAR_ALL_MESSAGES',
          timestamp: Date.now(),
          type: 'system'
        });
        // Also send the original clear message so players see it
        this.config.onMessage(data);
        return; // Don't process this message further
      }
      
      // Debug: Log all system messages to see what we're receiving
      if (data.type === 'system') {
        console.log(`🔍 System message received: "${data.message}"`);
      }
      
      // Pass message to UI (no local storage)
      if (data.userId !== this.config.userId) {
        this.config.onMessage(data);
      }
    });

    // Handle presence events
    this.presenceChannel.bind('pusher:subscription_succeeded', (members: PusherMembers) => {
      console.log(`👥 Presence subscription succeeded. Members:`, members);
      this.updatePeerList(members);
    });

    this.presenceChannel.bind('pusher:member_added', (member: PusherMember) => {
      console.log(`👤 Member added:`, member);
      this.connectedPeers.add(member.id);
      this.config.onPeerConnected(member.id);
    });

    this.presenceChannel.bind('pusher:member_removed', (member: PusherMember) => {
      console.log(`👤 Member removed:`, member);
      this.connectedPeers.delete(member.id);
      this.config.onPeerDisconnected(member.id);
    });

    // Handle connection events
    this.pusher.connection.bind('connected', () => {
      console.log(`🔗 Pusher connected`);
    });

    this.pusher.connection.bind('connecting', () => {
      console.log(`🔄 Pusher connecting...`);
    });

    this.pusher.connection.bind('disconnected', () => {
      console.log(`🔌 Pusher disconnected`);
      this.config.onError('Connection lost. Trying to reconnect...');
    });

    this.pusher.connection.bind('state_change', (states: { previous: string; current: string }) => {
      console.log(`🔄 Pusher state change:`, states);
    });

    this.pusher.connection.bind('error', (error: Error) => {
      console.error(`❌ Pusher connection error:`, error);
      console.error(`🔍 Pusher config:`, {
        key: process.env.NEXT_PUBLIC_PUSHER_KEY ? 'SET' : 'MISSING',
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'NOT_SET',
        authEndpoint: `/api/pusher/auth`
      });
      this.config.onError(`Connection error: ${error.message}`);
    });
  }

  private updatePeerList(members: PusherMembers): void {
    this.connectedPeers.clear();
    // Pusher members object has user IDs as keys in the 'members' property
    if (members.members) {
      Object.keys(members.members).forEach(userId => {
        this.connectedPeers.add(userId);
        this.config.onPeerConnected(userId);
      });
    }
    console.log(`📊 Updated peer list:`, Array.from(this.connectedPeers));
  }

  async sendMessage(message: string, type: 'text' | 'system' | 'dice_roll' = 'text'): Promise<void> {
    const chatMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random()}`,
      userId: this.config.userId,
      userName: this.config.userName,
      message,
      timestamp: Date.now(),
      type
    };

    console.log(`📤 Sending message:`, chatMessage);

    // Send to self for immediate display
    this.config.onMessage(chatMessage);

    // Send to server endpoint which will broadcast to Pusher
    try {
      const response = await fetch(`/api/games/${this.config.gameId}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, type }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      this.config.onError(`Failed to send message: ${error}`);
    }
  }



  disconnect(): void {
    console.log(`🔌 Disconnecting Pusher chat for game ${this.config.gameId}`);
    
    if (this.pusher) {
      this.pusher.disconnect();
      this.pusher = null;
    }
    
    this.channel = null;
    this.presenceChannel = null;
    this.connectedPeers.clear();
    
    console.log(`✅ Pusher chat disconnected`);
  }

  getConnectedPeers(): string[] {
    return Array.from(this.connectedPeers);
  }

  async getRoomPeerCount(): Promise<number> {
    // Return the total number of connected users (including self)
    return this.connectedPeers.size;
  }

}