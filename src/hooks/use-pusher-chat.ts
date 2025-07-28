import { useState, useCallback, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { PusherChat, PusherChatConfig, ChatMessage } from '@/lib/pusher-chat';

interface UsePusherChatOptions {
  gameId: string;
  enabled?: boolean;
}

interface UsePusherChatReturn {
  messages: ChatMessage[];
  peerCount: number;
  isConnected: boolean;
  error: string | null;
  sendMessage: (message: string, type?: 'text' | 'system' | 'dice_roll') => Promise<void>;
  connect: () => Promise<void>;
  disconnect: () => void;
  clearMessages: () => void;
}

export function usePusherChat({ gameId, enabled = true }: UsePusherChatOptions): UsePusherChatReturn {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [peerCount, setPeerCount] = useState<number>(0);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const pusherRef = useRef<PusherChat | null>(null);

  const handleMessage = useCallback((message: ChatMessage) => {
    // Handle special clear message
    if (message.id === 'clear-all-messages' && message.message === 'CLEAR_ALL_MESSAGES') {
      console.log(`🗑️ Clearing all messages from UI state`);
      setMessages([]);
      return;
    }
    
    setMessages(prev => [...prev, message]);
  }, []);

  const handlePeerConnected = useCallback(() => {
    // Peer count will be updated via presence events
  }, []);

  const handlePeerDisconnected = useCallback(() => {
    // Peer count will be updated via presence events
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
    setIsConnected(false);
  }, []);

  const connect = useCallback(async () => {
    if (!session?.user?.email || !enabled) return;

    try {
      setError(null);
      
      // Get user ID from session
      const userId = session.user.id;
      
      const config: PusherChatConfig = {
        gameId,
        userId,
        userName: session.user.name || session.user.email,
        onMessage: handleMessage,
        onPeerConnected: handlePeerConnected,
        onPeerDisconnected: handlePeerDisconnected,
        onError: handleError
      };

      const pusher = new PusherChat(config);
      pusherRef.current = pusher;
      
      await pusher.connect();
      setIsConnected(true);
      
      // Load chat history from server
      try {
        const response = await fetch(`/api/games/${gameId}/chat`);
        if (response.ok) {
          const data = await response.json();
          if (data.messages && Array.isArray(data.messages)) {
            console.log(`📚 Loaded ${data.messages.length} chat messages from server`);
            setMessages(data.messages);
          }
        } else {
          console.warn('Failed to load chat history from server:', response.statusText);
        }
      } catch (historyError) {
        console.warn('Error loading chat history from server:', historyError);
        // Don't fail the connection if history loading fails
      }
      
      // Get initial peer count
      const count = await pusher.getRoomPeerCount();
      console.log(`🎯 Setting initial peer count: ${count}`);
      setPeerCount(count);
      
      // Set up periodic peer count updates
      const interval = setInterval(async () => {
        if (pusherRef.current) {
          const count = await pusherRef.current.getRoomPeerCount();
          console.log(`🔄 Updating peer count: ${count}`);
          setPeerCount(count);
        }
      }, 10000); // Update every 10 seconds
      
      // Store interval for cleanup
      (pusherRef.current as PusherChat & { peerCountInterval?: NodeJS.Timeout }).peerCountInterval = interval;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect';
      setError(errorMessage);
      setIsConnected(false);
    }
  }, [gameId, session?.user, enabled, handleMessage, handlePeerConnected, handlePeerDisconnected, handleError]);

  const disconnect = useCallback(() => {
    if (pusherRef.current) {
      // Clear peer count interval
      const pusher = pusherRef.current as PusherChat & { peerCountInterval?: NodeJS.Timeout };
      if (pusher.peerCountInterval) {
        clearInterval(pusher.peerCountInterval);
      }
      pusherRef.current.disconnect();
      pusherRef.current = null;
    }
    setIsConnected(false);
    setPeerCount(0);
  }, []);

  const sendMessage = useCallback(async (message: string, type: 'text' | 'system' | 'dice_roll' = 'text') => {
    if (pusherRef.current && isConnected) {
      await pusherRef.current.sendMessage(message, type);
    }
  }, [isConnected]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  // Auto-connect when enabled and session is available
  useEffect(() => {
    if (enabled && session?.user?.email && !isConnected && !pusherRef.current) {
      connect();
    }
  }, [enabled, session?.user?.email, isConnected, connect]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    messages,
    peerCount,
    isConnected,
    error,
    sendMessage,
    connect,
    disconnect,
    clearMessages
  };
} 