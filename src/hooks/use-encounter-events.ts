import { useEffect, useRef } from 'react';
import { Encounter, EncounterMonster, EncounterParticipant } from '@/types/encounter';

interface UseEncounterEventsOptions {
  gameId: string;
  onEncounterCreated?: (encounter: Encounter) => void;
  onEncounterUpdated?: (encounter: Encounter) => void;
  onEncounterDeleted?: (encounterId: string) => void;
  onMonsterAdded?: (encounterId: string, monster: EncounterMonster) => void;
  onParticipantAdded?: (encounterId: string, participant: EncounterParticipant) => void;
  onInitiativeUpdated?: (encounterId: string, entityId: string, initiative: number) => void;
}

export function useEncounterEvents({
  gameId,
  onEncounterCreated,
  onEncounterUpdated,
  onEncounterDeleted,
  onMonsterAdded,
  onParticipantAdded,
  onInitiativeUpdated
}: UseEncounterEventsOptions) {
  const pusherRef = useRef<{ unsubscribe: (channel: string) => void; disconnect: () => void; connection: { state: string } } | null>(null);
  const channelRef = useRef<{ bind: (event: string, callback: (...args: unknown[]) => void) => void; unbind_all: () => void } | null>(null);
  const isConnectedRef = useRef(false);
  const isConnectingRef = useRef(false);
  const cleanupRef = useRef(false);

  useEffect(() => {
    if (!gameId) return;

    // Set cleanup flag to false for this effect run
    cleanupRef.current = false;

    // Don't create a new connection if we're already connecting
    if (isConnectingRef.current) {
      return;
    }

    // Import Pusher dynamically to avoid SSR issues
    import('pusher-js').then((Pusher) => {
      // Check if we should abort this connection attempt
      if (cleanupRef.current) {
        return;
      }

      // Set connecting flag
      isConnectingRef.current = true;

      // Clean up any existing connection
      if (pusherRef.current && isConnectedRef.current) {
        try {
          if (channelRef.current) {
            channelRef.current.unbind_all();
          }
          pusherRef.current.unsubscribe(`game-${gameId}`);
          pusherRef.current.disconnect();
        } catch (error) {
          console.warn('Error cleaning up previous Pusher connection:', error);
        }
      }

      // Check again if we should abort
      if (cleanupRef.current) {
        isConnectingRef.current = false;
        return;
      }

      const pusher = new Pusher.default(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      });

      const channel = pusher.subscribe(`game-${gameId}`);
      
      // Listen for encounter events
      if (onEncounterCreated) {
        channel.bind('encounter:created', onEncounterCreated);
      }

      if (onEncounterUpdated) {
        channel.bind('encounter:updated', onEncounterUpdated);
      }

      if (onEncounterDeleted) {
        channel.bind('encounter:deleted', onEncounterDeleted);
      }

      if (onMonsterAdded) {
        channel.bind('encounter:monster:added', onMonsterAdded);
      }

      if (onParticipantAdded) {
        channel.bind('encounter:participant:added', onParticipantAdded);
      }

      if (onInitiativeUpdated) {
        channel.bind('encounter:initiative:updated', onInitiativeUpdated);
      }

      // Final check before setting refs
      if (cleanupRef.current) {
        try {
          channel.unbind_all();
          pusher.unsubscribe(`game-${gameId}`);
          pusher.disconnect();
        } catch (error) {
          console.warn('Error cleaning up aborted connection:', error);
        }
        isConnectingRef.current = false;
        return;
      }

      pusherRef.current = pusher;
      channelRef.current = channel;
      isConnectedRef.current = true;
      isConnectingRef.current = false;
    });

    // Cleanup function
    return () => {
      // Set cleanup flag to prevent new connections
      cleanupRef.current = true;
      isConnectingRef.current = false;

      if (pusherRef.current && isConnectedRef.current) {
        try {
          // Check if the connection is still active before attempting to unsubscribe
          if (pusherRef.current.connection.state === 'connected' || 
              pusherRef.current.connection.state === 'connecting') {
            if (channelRef.current) {
              channelRef.current.unbind_all();
            }
            pusherRef.current.unsubscribe(`game-${gameId}`);
            pusherRef.current.disconnect();
          }
        } catch (error) {
          console.warn('Error during Pusher cleanup:', error);
        } finally {
          isConnectedRef.current = false;
          pusherRef.current = null;
          channelRef.current = null;
        }
      }
    };
  }, [
    gameId,
    onEncounterCreated,
    onEncounterUpdated,
    onEncounterDeleted,
    onMonsterAdded,
    onParticipantAdded,
    onInitiativeUpdated
  ]);
} 