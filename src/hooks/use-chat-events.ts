import { useEffect, useRef, useState } from 'react';
import { ChatMessage } from '@/types/game';

interface UseChatEventsOptions {
  gameId: string;
  enabled?: boolean;
  onChatUpdate?: (messages: ChatMessage[]) => void;
  onError?: (error: Error) => void;
}

export function useChatEvents({ 
  gameId, 
  enabled = true, 
  onChatUpdate, 
  onError 
}: UseChatEventsOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!enabled || !gameId) {
      return;
    }

    // Prevent multiple connections
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    const connect = () => {
      try {
        const eventSource = new EventSource(`/api/games/${gameId}/chat/events`);
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
          console.log('🔗 Chat SSE connected for game:', gameId);
          setIsConnected(true);
          setError(null);
        };

        eventSource.addEventListener('chat-update', (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.messages && onChatUpdate) {
              onChatUpdate(data.messages);
            }
          } catch (parseError) {
            console.error('Error parsing chat update:', parseError);
          }
        });

        eventSource.onerror = (event) => {
          console.error('Chat SSE error:', event);
          const error = new Error('Chat SSE connection failed');
          setError(error);
          setIsConnected(false);
          if (onError) {
            onError(error);
          }
        };

        // Cleanup function
        return () => {
          if (eventSource) {
            eventSource.close();
            setIsConnected(false);
          }
        };
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to connect to chat SSE');
        setError(error);
        setIsConnected(false);
        if (onError) {
          onError(error);
        }
      }
    };

    const cleanup = connect();

    return cleanup;
  }, [gameId, enabled, onChatUpdate, onError]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
        setIsConnected(false);
      }
    };
  }, []);

  return {
    isConnected,
    error,
    disconnect: () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
        setIsConnected(false);
      }
    }
  };
} 