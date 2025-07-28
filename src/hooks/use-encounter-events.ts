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
  const pusherRef = useRef<{ disconnect: () => void } | null>(null);
  const channelRef = useRef<{ bind: (event: string, callback: (...args: unknown[]) => void) => void; unbind_all: () => void } | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    if (!gameId) return;

    mountedRef.current = true;

    // Import Pusher dynamically to avoid SSR issues
    import('pusher-js').then((Pusher) => {
      // Check if component is still mounted
      if (!mountedRef.current) return;

      // Clean up any existing connection
      if (pusherRef.current) {
        try {
          if (channelRef.current) {
            channelRef.current.unbind_all();
          }
          pusherRef.current.disconnect();
        } catch {
          // Ignore cleanup errors
        }
      }

      // Check if component is still mounted after cleanup
      if (!mountedRef.current) return;

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

      // Only set refs if still mounted
      if (mountedRef.current) {
        pusherRef.current = pusher;
        channelRef.current = channel;
      } else {
        // Component unmounted during setup, clean up immediately
        try {
          channel.unbind_all();
          pusher.disconnect();
        } catch {
          // Ignore cleanup errors
        }
      }
    });

    // Cleanup function
    return () => {
      mountedRef.current = false;

      if (pusherRef.current) {
        try {
          if (channelRef.current) {
            channelRef.current.unbind_all();
          }
          pusherRef.current.disconnect();
        } catch {
          // Ignore cleanup errors - they're expected when connection is already closed
        } finally {
          pusherRef.current = null;
          channelRef.current = null;
        }
      }
    };
  }, [gameId, onEncounterCreated, onEncounterUpdated, onEncounterDeleted, onMonsterAdded, onParticipantAdded, onInitiativeUpdated]); // Include all callback dependencies
} 