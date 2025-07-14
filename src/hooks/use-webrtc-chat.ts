import { useState, useEffect, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { WebRTCChat, ChatMessage, WebRTCChatConfig } from '@/lib/webrtc-chat';

export interface UseWebRTCChatOptions {
  gameId: string;
  enabled?: boolean;
}

export interface UseWebRTCChatReturn {
  messages: ChatMessage[];
  peerCount: number;
  isConnected: boolean;
  error: string | null;
  sendMessage: (message: string, type?: 'text' | 'system' | 'dice_roll') => void;
  connect: () => Promise<void>;
  disconnect: () => void;
  clearMessages: () => void;
}

export function useWebRTCChat({ gameId, enabled = true }: UseWebRTCChatOptions): UseWebRTCChatReturn {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [peerCount, setPeerCount] = useState<number>(0);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const webrtcRef = useRef<WebRTCChat | null>(null);

  const handleMessage = useCallback((message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const handlePeerConnected = useCallback(() => {
    // Peer count will be updated via periodic polling
  }, []);

  const handlePeerDisconnected = useCallback(() => {
    // Peer count will be updated via periodic polling
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
      
      const config: WebRTCChatConfig = {
        gameId,
        userId,
        userName: session.user.name || session.user.email,
        onMessage: handleMessage,
        onPeerConnected: handlePeerConnected,
        onPeerDisconnected: handlePeerDisconnected,
        onError: handleError
      };

      const webrtc = new WebRTCChat(config);
      webrtcRef.current = webrtc;
      
      await webrtc.connect();
      setIsConnected(true);
      
      // Load chat history
      const history = await webrtc.loadChatHistory();
      setMessages(history);
      
      // Get initial peer count
      const count = await webrtc.getRoomPeerCount();
      console.log(`🎯 Setting initial peer count: ${count}`);
      setPeerCount(count);
      
      // Set up periodic peer count updates
      const interval = setInterval(async () => {
        if (webrtcRef.current) {
          const count = await webrtcRef.current.getRoomPeerCount();
          console.log(`🔄 Updating peer count: ${count}`);
          setPeerCount(count);
        }
      }, 5000); // Update every 5 seconds
      
      // Store interval for cleanup
      webrtcRef.current = webrtc;
      (webrtcRef.current as WebRTCChat & { peerCountInterval?: NodeJS.Timeout }).peerCountInterval = interval;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect';
      setError(errorMessage);
      setIsConnected(false);
    }
  }, [gameId, session?.user, enabled, handleMessage, handlePeerConnected, handlePeerDisconnected, handleError]);

  const disconnect = useCallback(() => {
    if (webrtcRef.current) {
      // Clear peer count interval
      const webrtc = webrtcRef.current as WebRTCChat & { peerCountInterval?: NodeJS.Timeout };
      if (webrtc.peerCountInterval) {
        clearInterval(webrtc.peerCountInterval);
      }
      webrtcRef.current.disconnect();
      webrtcRef.current = null;
    }
    setIsConnected(false);
    setPeerCount(0);
  }, []);

  const sendMessage = useCallback((message: string, type: 'text' | 'system' | 'dice_roll' = 'text') => {
    if (webrtcRef.current && isConnected) {
      webrtcRef.current.sendMessage(message, type);
    }
  }, [isConnected]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  // Auto-connect when enabled and session is available
  useEffect(() => {
    if (enabled && session?.user?.email && !isConnected && !webrtcRef.current) {
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