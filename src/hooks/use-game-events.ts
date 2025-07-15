import { useEffect, useRef, useState } from 'react';

interface UseGameEventsOptions {
  gameId: string;
  enabled?: boolean;
  onGameUpdate?: (gameUpdate: GameUpdate) => void;
  onError?: (error: Error) => void;
}

interface GameUpdate {
  id: string;
  name: string;
  updatedAt: string;
  participantCount: number;
  characterCount: number;
  hasChanges: boolean;
}

export function useGameEvents({ 
  gameId, 
  enabled = true, 
  onGameUpdate, 
  onError 
}: UseGameEventsOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    if (!enabled || !gameId) {
      return;
    }

    // Prevent multiple connections
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    // Clear any existing reconnect timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    const connect = () => {
      try {
        const eventSource = new EventSource(`/api/games/${gameId}/events`);
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
          console.log('🔗 SSE connected for game:', gameId);
          setIsConnected(true);
          setError(null);
          reconnectAttemptsRef.current = 0; // Reset reconnect attempts on successful connection
        };

        eventSource.addEventListener('game-update', (event) => {
          try {
            const gameUpdate: GameUpdate = JSON.parse(event.data);
            if (onGameUpdate) {
              onGameUpdate(gameUpdate);
            }
          } catch (parseError) {
            console.error('Error parsing game update:', parseError);
          }
        });

        eventSource.onerror = (event) => {
          console.error('SSE error:', event);
          setIsConnected(false);
          
          // Only attempt reconnection if we haven't exceeded max attempts
          if (reconnectAttemptsRef.current < maxReconnectAttempts) {
            const backoffDelay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000); // Max 30 seconds
            console.log(`🔄 SSE reconnecting in ${backoffDelay}ms (attempt ${reconnectAttemptsRef.current + 1}/${maxReconnectAttempts})`);
            
            reconnectTimeoutRef.current = setTimeout(() => {
              reconnectAttemptsRef.current++;
              connect();
            }, backoffDelay);
          } else {
            const error = new Error('SSE connection failed after maximum retry attempts');
            setError(error);
            if (onError) {
              onError(error);
            }
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
        const error = err instanceof Error ? err : new Error('Failed to connect to SSE');
        setError(error);
        setIsConnected(false);
        if (onError) {
          onError(error);
        }
      }
    };

    const cleanup = connect();

    return cleanup;
  }, [gameId, enabled, onGameUpdate, onError]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
        setIsConnected(false);
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
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
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      reconnectAttemptsRef.current = 0;
    }
  };
} 