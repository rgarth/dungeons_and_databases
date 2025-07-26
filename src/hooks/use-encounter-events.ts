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

  useEffect(() => {
    if (!gameId) return;

    // Import Pusher dynamically to avoid SSR issues
    import('pusher-js').then((Pusher) => {
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

      pusherRef.current = pusher;
      channelRef.current = channel;
      isConnectedRef.current = true;
    });

    // Cleanup function
    return () => {
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