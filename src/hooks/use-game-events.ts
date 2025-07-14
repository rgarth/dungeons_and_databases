import { useEffect, useRef, useState } from 'react';
import { Game } from '@/types/game';

interface UseGameEventsOptions {
  gameId: string;
  enabled?: boolean;
  onGameUpdate?: (game: Game) => void;
  onError?: (error: Error) => void;
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
        const eventSource = new EventSource(`/api/games/${gameId}/events`);
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
          console.log('🔗 SSE connected for game:', gameId);
          setIsConnected(true);
          setError(null);
        };

        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'game-update' && onGameUpdate) {
              onGameUpdate(data.game);
            }
          } catch (parseError) {
            console.error('Error parsing SSE message:', parseError);
          }
        };

        eventSource.addEventListener('game-update', (event) => {
          try {
            const game = JSON.parse(event.data);
            if (onGameUpdate) {
              onGameUpdate(game);
            }
          } catch (parseError) {
            console.error('Error parsing game update:', parseError);
          }
        });

        eventSource.onerror = (event) => {
          console.error('SSE error:', event);
          const error = new Error('SSE connection failed');
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