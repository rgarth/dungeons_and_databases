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
  const pusherRef = useRef<{ unsubscribe: (channel: string) => void; disconnect: () => void } | null>(null);

  useEffect(() => {
    if (!gameId) return;

    // Import Pusher dynamically to avoid SSR issues
    import('pusher-js').then((Pusher) => {
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

      return () => {
        if (pusherRef.current) {
          pusherRef.current.unsubscribe(`game-${gameId}`);
          pusherRef.current.disconnect();
        }
      };
    });

    return () => {
      if (pusherRef.current) {
        pusherRef.current.unsubscribe(`game-${gameId}`);
        pusherRef.current.disconnect();
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