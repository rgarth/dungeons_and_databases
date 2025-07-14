import { useState, useEffect, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { WebRTCChat, ChatMessage, WebRTCChatConfig } from '@/lib/webrtc-chat';

export interface UseWebRTCChatOptions {
  gameId: string;
  enabled?: boolean;
}

export interface UseWebRTCChatReturn {
  messages: ChatMessage[];
  connectedPeers: string[];
  isConnected: boolean;
  error: string | null;
  sendMessage: (message: string, type?: 'text' | 'system' | 'dice_roll') => void;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export function useWebRTCChat({ gameId, enabled = true }: UseWebRTCChatOptions): UseWebRTCChatReturn {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connectedPeers, setConnectedPeers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const webrtcRef = useRef<WebRTCChat | null>(null);

  const handleMessage = useCallback((message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const handlePeerConnected = useCallback((peerId: string) => {
    setConnectedPeers(prev => [...prev, peerId]);
  }, []);

  const handlePeerDisconnected = useCallback((peerId: string) => {
    setConnectedPeers(prev => prev.filter(id => id !== peerId));
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
    setIsConnected(false);
  }, []);

  const connect = useCallback(async () => {
    if (!session?.user?.email || !enabled) return;

    try {
      setError(null);
      
      const config: WebRTCChatConfig = {
        gameId,
        userId: session.user.email,
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
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect';
      setError(errorMessage);
      setIsConnected(false);
    }
  }, [gameId, session?.user, enabled, handleMessage, handlePeerConnected, handlePeerDisconnected, handleError]);

  const disconnect = useCallback(() => {
    if (webrtcRef.current) {
      webrtcRef.current.disconnect();
      webrtcRef.current = null;
    }
    setIsConnected(false);
    setConnectedPeers([]);
  }, []);

  const sendMessage = useCallback((message: string, type: 'text' | 'system' | 'dice_roll' = 'text') => {
    if (webrtcRef.current && isConnected) {
      webrtcRef.current.sendMessage(message, type);
    }
  }, [isConnected]);

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
    connectedPeers,
    isConnected,
    error,
    sendMessage,
    connect,
    disconnect
  };
} 