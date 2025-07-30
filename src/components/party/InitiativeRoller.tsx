"use client";

import { useState, useEffect } from 'react';
import { X, Dice1, Users, Skull } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui';
import { Encounter, InitiativeOrder, EncounterMonster } from '@/types/encounter';
import { Character } from '@/types/character';
import { getModifier } from '@/lib/dnd/core';

interface InitiativeRollerProps {
  encounter: Encounter;
  isOpen: boolean;
  onClose: () => void;
  onInitiativeUpdated: (encounter: Encounter) => void;
  isDM: boolean;
}

export default function InitiativeRoller({
  encounter,
  isOpen,
  onClose,
  onInitiativeUpdated,
  isDM
}: InitiativeRollerProps) {
  const { data: session } = useSession();
  const [initiativeOrder, setInitiativeOrder] = useState<InitiativeOrder[]>([]);
  const [rolling, setRolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      buildInitiativeOrder();
    }
  }, [isOpen, encounter]);

  // Add polling to refresh encounter data when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const refreshEncounter = async () => {
      try {
        const response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`);
        if (response.ok) {
          const updatedEncounter = await response.json();
          onInitiativeUpdated(updatedEncounter);
        }
      } catch (error) {
        console.error('Failed to refresh encounter:', error);
      }
    };

    // Refresh every 5 seconds when modal is open (reduced from 2 seconds)
    const interval = setInterval(refreshEncounter, 5000);

    return () => clearInterval(interval);
  }, [isOpen, encounter.gameId, encounter.id, onInitiativeUpdated]);

  const buildInitiativeOrder = () => {
    const order: InitiativeOrder[] = [];

    // Add characters
    encounter.participants.forEach(participant => {
      order.push({
        id: participant.id,
        name: participant.characterName,
        type: 'character' as const,
        initiative: participant.initiative || 0,
        currentHP: participant.currentHP,
        maxHP: participant.maxHP,
        isActive: participant.isActive,
        characterData: participant.characterData
      });
    });

    // Add monsters - use actual instances instead of quantity
    encounter.monsters.forEach(monster => {
      monster.instances?.forEach((instance, index) => {
        order.push({
          id: `${monster.id}-${index}`, // Use 0-based index for participant ID
          name: `${monster.monsterName} #${instance.instanceNumber}`,
          type: 'monster' as const,
          initiative: instance.initiative || 0,
          currentHP: instance.currentHP || monster.maxHP,
          maxHP: monster.maxHP,
          isActive: instance.isActive
        });
      });
    });

    // Sort by initiative (highest first)
    order.sort((a, b) => b.initiative - a.initiative);

    setInitiativeOrder(order);
  };

    const rollInitiativeForMonsters = async () => {
    try {
      setRolling(true);
      setError(null);

      // Get all monsters from the encounter
      const allMonsters = encounter.monsters.flatMap(monster => 
        monster.instances?.map((instance) => ({
          monsterId: monster.id,
          instanceId: instance.id,
          instanceNumber: instance.instanceNumber,
          name: `${monster.monsterName} #${instance.instanceNumber}`,
          dexMod: getModifier(monster.monsterData.dexterity)
        })) || []
      );

      if (allMonsters.length === 0) {
        setError('No monsters found');
        return;
      }

      // Roll initiative for each monster instance
      const batchUpdates: Array<{ monsterInstanceId: string; initiative: number }> = [];
      const newInitiativeOrder = [...initiativeOrder];

      for (const monster of allMonsters) {
        const roll = Math.floor(Math.random() * 20) + 1;
        const initiative = roll + monster.dexMod;

        // Update local state
        const participantIndex = newInitiativeOrder.findIndex(p => 
          p.name === monster.name
        );
        if (participantIndex !== -1) {
          newInitiativeOrder[participantIndex] = { 
            ...newInitiativeOrder[participantIndex], 
            initiative 
          };
        }

        // Queue batch update
        batchUpdates.push({
          monsterInstanceId: monster.instanceId,
          initiative
        });
      }

      // Update local state
      setInitiativeOrder(newInitiativeOrder);

      // Use batch API for better performance
      const response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}/initiative/batch`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates: batchUpdates })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to roll monster initiative: ${response.status} ${errorText}`);
      }

      // Refresh encounter data
      const encounterResponse = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`);
      if (encounterResponse.ok) {
        const updatedEncounter = await encounterResponse.json();
        onInitiativeUpdated(updatedEncounter);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to roll monster initiative');
    } finally {
      setRolling(false);
    }
  };

  const resetAllInitiative = async () => {
    try {
      setRolling(true);
      setError(null);

      // Reset all initiative to 0 in local state
      const updatedOrder = initiativeOrder.map(participant => ({
        ...participant,
        initiative: 0
      }));
      setInitiativeOrder(updatedOrder);

      // Prepare batch updates
      const updates: Array<{ participantId?: string; monsterInstanceId?: string; initiative: number }> = [];

      // Add participant updates
      encounter.participants.forEach(participant => {
        updates.push({
          participantId: participant.id,
          initiative: 0
        });
      });

      // Add monster instance updates
      encounter.monsters.forEach(monster => {
        monster.instances?.forEach(instance => {
          updates.push({
            monsterInstanceId: instance.id,
            initiative: 0
          });
        });
      });

      // Use batch API for better performance
      const response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}/initiative/batch`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to reset initiative: ${response.status} ${errorText}`);
      }

      // Fetch updated encounter
      const encounterResponse = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`);
      if (encounterResponse.ok) {
        const updatedEncounter = await encounterResponse.json();
        onInitiativeUpdated(updatedEncounter);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset initiative');
    } finally {
      setRolling(false);
    }
  };

  const canRollForCharacter = (characterData: Character) => {
    if (!session?.user?.id) return false;
    return characterData.userId === session.user.id;
  };

  const handleMonsterRollClick = (participantId: string) => {
    console.log('🎲 handleMonsterRollClick called for participant:', participantId);
    
    const participant = initiativeOrder.find(p => p.id === participantId);
    if (!participant || participant.type !== 'monster') {
      console.log('🎲 Invalid participant or not a monster:', participant);
      return;
    }

    // Find the monster data
    const monsterData = encounter.monsters.find(m => participant.id.startsWith(m.id));
    if (!monsterData) {
      console.log('🎲 Monster data not found for participant:', participantId);
      return;
    }

    console.log('🎲 Found monster data:', { 
      monsterId: monsterData.id, 
      monsterName: monsterData.monsterName,
      participantId,
      participant 
    });

    // Create a unique identifier for this roll
    const rollId = `monster-${participantId}-${Date.now()}`;
    console.log('🎲 Created unique roll ID:', rollId);

    // Use the proper dice system like combat
    const event = new CustomEvent('triggerDiceRoll', {
      detail: { notation: '1d20' }
    });
    window.dispatchEvent(event);
    
    // Listen for the dice roll completion
    const handleDiceRollCompleted = (event: CustomEvent) => {
      const { notation, resultTotal } = event.detail;
      console.log('🎲 Monster initiative dice roll completed:', { 
        rollId, 
        notation, 
        resultTotal,
        participantId 
      });
      
      // Only process if this is our initiative roll (1d20)
      if (notation === '1d20' && resultTotal !== undefined) {
        console.log('🎲 Processing monster initiative roll result:', { 
          rollId, 
          resultTotal, 
          participantId 
        });
        handleMonsterDiceRollResult(resultTotal, participantId, monsterData, rollId);
        
        // Remove the event listener
        window.removeEventListener('diceRollCompleted', handleDiceRollCompleted as EventListener);
        console.log('🎲 Removed dice roll event listener for:', rollId);
      } else {
        console.log('🎲 Ignoring dice roll - not our monster initiative roll:', { 
          rollId, 
          notation, 
          resultTotal 
        });
      }
    };
    
    // Add event listener for dice roll completion
    window.addEventListener('diceRollCompleted', handleDiceRollCompleted as EventListener);
    console.log('🎲 Added dice roll event listener for:', rollId);
    
    // Cleanup listener after 10 seconds to prevent memory leaks
    setTimeout(() => {
      window.removeEventListener('diceRollCompleted', handleDiceRollCompleted as EventListener);
      console.log('🎲 Cleanup: Removed dice roll event listener for:', rollId);
    }, 10000);
  };

  const handleMonsterDiceRollResult = async (result: number, participantId: string, monsterData: EncounterMonster, rollId: string) => {
    console.log('🎲 handleMonsterDiceRollResult called with:', { 
      result, 
      participantId, 
      rollId,
      monsterId: monsterData.id,
      monsterName: monsterData.monsterName
    });
    
    const participant = initiativeOrder.find(p => p.id === participantId);
    console.log('🎲 Found monster participant:', participant);
    
    if (!participant || participant.type !== 'monster') {
      console.log('🎲 Invalid monster participant, returning');
      return;
    }

    try {
      setRolling(true);
      setError(null);

      // Find the specific monster instance for this participant
      const instanceIndex = parseInt(participantId.split('-')[1]) || 0;
      const monsterInstance = monsterData.instances?.[instanceIndex]; // Use direct array index
      
      console.log('🎲 Looking for monster instance:', { 
        participantId,
        instanceIndex,
        totalInstances: monsterData.instances?.length,
        foundInstance: monsterInstance 
      });
      
      if (!monsterInstance) {
        console.log('🎲 Monster instance not found, returning');
        return;
      }

      const dexMod = getModifier(monsterData.monsterData.dexterity);
      const initiative = result + dexMod;
      console.log('🎲 Calculated monster initiative:', { 
        rollId,
        result, 
        dexMod, 
        initiative,
        instanceId: monsterInstance.id 
      });

      // Update local state
      const updatedOrder = initiativeOrder.map(p => 
        p.id === participantId ? { ...p, initiative } : p
      );
      setInitiativeOrder(updatedOrder);
      console.log('🎲 Updated local initiative order for:', participantId);

      // Auto-save monster initiative
      const apiUrl = `/api/games/${encounter.gameId}/encounters/${encounter.id}/monsters/${monsterData.id}/instances/${monsterInstance.id}/initiative`;
      console.log('🎲 Saving monster initiative to API:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initiative })
      });

      console.log('🎲 API response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('🎲 Monster API Error:', { 
          rollId, 
          status: response.status, 
          error: errorText 
        });
        throw new Error(`Failed to save monster initiative: ${response.status} ${errorText}`);
      }

      const savedData = await response.json();
      console.log('🎲 Successfully saved monster initiative:', { 
        rollId, 
        savedData,
        participantId 
      });

      // Fetch updated encounter
      console.log('🎲 Fetching updated encounter data');
      const encounterResponse = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`);
      if (encounterResponse.ok) {
        const updatedEncounter = await encounterResponse.json();
        console.log('🎲 Updated encounter data received:', { 
          rollId, 
          encounterId: updatedEncounter.id,
          monsterCount: updatedEncounter.monsters.length 
        });
        onInitiativeUpdated(updatedEncounter);
      } else {
        console.error('🎲 Failed to fetch updated encounter:', encounterResponse.status);
      }
    } catch (err) {
      console.error('🎲 Error in handleMonsterDiceRollResult:', { 
        rollId, 
        error: err 
      });
      setError(err instanceof Error ? err.message : 'Failed to save monster initiative');
    } finally {
      setRolling(false);
      console.log('🎲 Completed monster initiative roll for:', { rollId, participantId });
    }
  };

  const handleCharacterRollClick = (participantId: string) => {
    const participant = initiativeOrder.find(p => p.id === participantId);
    if (!participant || participant.type !== 'character' || !participant.characterData) return;

    if (!canRollForCharacter(participant.characterData)) {
      setError('You can only roll initiative for your own characters');
      return;
    }


    
    // Use the proper dice system like combat
    const event = new CustomEvent('triggerDiceRoll', {
      detail: { notation: '1d20' }
    });
    window.dispatchEvent(event);
    
    // Listen for the dice roll completion
    const handleDiceRollCompleted = (event: CustomEvent) => {
      const { notation, resultTotal } = event.detail;
      console.log('🎲 Initiative dice roll completed:', { notation, resultTotal });
      
      // Only process if this is our initiative roll (1d20)
      if (notation === '1d20' && resultTotal !== undefined) {
        console.log('🎲 Processing initiative roll result:', resultTotal);
        handleDiceRollResult(resultTotal, participantId);
        
        // Remove the event listener
        window.removeEventListener('diceRollCompleted', handleDiceRollCompleted as EventListener);
      } else {
        console.log('🎲 Ignoring dice roll - not our initiative roll:', { notation, resultTotal });
      }
    };
    
    // Add event listener for dice roll completion
    window.addEventListener('diceRollCompleted', handleDiceRollCompleted as EventListener);
    
    // Cleanup listener after 10 seconds to prevent memory leaks
    setTimeout(() => {
      window.removeEventListener('diceRollCompleted', handleDiceRollCompleted as EventListener);
    }, 10000);
  };

  const handleManualInitiative = async (participantId: string, initiative: number) => {
    console.log('🎲 handleManualInitiative called with:', initiative, 'for participant:', participantId);
    
    const participant = initiativeOrder.find(p => p.id === participantId);
    console.log('🎲 Found participant:', participant);
    
    if (!participant) {
      console.log('🎲 Invalid participant, returning');
      return;
    }

    // Check ownership for characters (unless DM)
    if (participant.type === 'character') {
      if (!isDM && (!participant.characterData || !canRollForCharacter(participant.characterData))) {
        console.log('🎲 Access denied: Character ownership check failed');
        setError('You can only set initiative for your own characters');
        return;
      }
    }
    
    // Check DM permissions for monsters
    if (participant.type === 'monster' && !isDM) {
      console.log('🎲 Access denied: DM permissions required for monsters');
      setError('Only the DM can set monster initiative');
      return;
    }

    try {
      setRolling(true);
      setError(null);

      console.log('🎲 Setting manual initiative:', initiative);

      // Update local state
      const updatedOrder = initiativeOrder.map(p => 
        p.id === participantId ? { ...p, initiative } : p
      );
      setInitiativeOrder(updatedOrder);

      // Auto-save initiative
      let response;
      if (participant.type === 'character') {
        response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}/participants/${participantId}/initiative`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ initiative })
        });
      } else if (participant.type === 'monster') {
        // Find the monster data and instance for this participant
        const monsterData = encounter.monsters.find(m => participantId.startsWith(m.id));
        if (!monsterData) {
          throw new Error('Monster data not found');
        }
        
        const instanceNumber = parseInt(participantId.split('-')[1]) || 1;
        const monsterInstance = monsterData.instances?.find(inst => inst.instanceNumber === instanceNumber);
        
        if (!monsterInstance) {
          throw new Error('Monster instance not found');
        }
        
        response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}/monsters/${monsterData.id}/instances/${monsterInstance.id}/initiative`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ initiative })
        });
      } else {
        throw new Error('Invalid participant type');
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🎲 API Error:', response.status, errorText);
        throw new Error(`Failed to save initiative: ${response.status} ${errorText}`);
      }

      // Fetch updated encounter
      const encounterResponse = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`);
      if (encounterResponse.ok) {
        const updatedEncounter = await encounterResponse.json();
        onInitiativeUpdated(updatedEncounter);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save initiative');
    } finally {
      setRolling(false);
    }
  };

  const handleDiceRollResult = async (result: number, participantId: string) => {
    console.log('🎲 handleDiceRollResult called with:', result, 'for participant:', participantId);
    
    const participant = initiativeOrder.find(p => p.id === participantId);
    console.log('🎲 Found participant:', participant);
    console.log('🎲 Participant character data:', participant?.characterData);
    
    if (!participant || participant.type !== 'character' || !participant.characterData) {
      console.log('🎲 Invalid participant, returning');
      return;
    }

    // If character data is missing ability scores, try to fetch fresh data
    if (participant.characterData && (participant.characterData.dexterity === undefined || participant.characterData.dexterity === null)) {
      console.log('🎲 Character data missing ability scores, fetching fresh data...');
      try {
        const characterId = participant.characterData.id;
        if (characterId) {
          // Try to fetch from the character API first
          let characterResponse = await fetch(`/api/characters/${characterId}`);
          if (!characterResponse.ok) {
                      // Fallback to game-specific characters endpoint
          characterResponse = await fetch(`/api/characters?gameId=${encounter.gameId}`);
          if (characterResponse.ok) {
            const gameCharacters = await characterResponse.json();
            const freshCharacterData = gameCharacters.find((char: { id: string }) => char.id === characterId);
              if (freshCharacterData) {
                console.log('🎲 Fresh character data from game endpoint:', freshCharacterData);
                
                // Update the participant's character data
                const updatedOrder = initiativeOrder.map(p => 
                  p.id === participantId 
                    ? { ...p, characterData: freshCharacterData }
                    : p
                );
                setInitiativeOrder(updatedOrder);
                
                // Update the participant reference with proper type checking
                const updatedParticipant = updatedOrder.find(p => p.id === participantId);
                if (updatedParticipant && updatedParticipant.characterData) {
                  updatedParticipant.characterData = freshCharacterData;
                }
              }
            }
          } else {
            const freshCharacterData = await characterResponse.json();
            console.log('🎲 Fresh character data from character endpoint:', freshCharacterData);
            
            // Update the participant's character data
            const updatedOrder = initiativeOrder.map(p => 
              p.id === participantId 
                ? { ...p, characterData: freshCharacterData }
                : p
            );
            setInitiativeOrder(updatedOrder);
            
            // Update the participant reference with proper type checking
            const updatedParticipant = updatedOrder.find(p => p.id === participantId);
            if (updatedParticipant && updatedParticipant.characterData) {
              updatedParticipant.characterData = freshCharacterData;
            }
          }
        }
      } catch (error) {
        console.error('🎲 Failed to fetch fresh character data:', error);
      }
    }

    try {
      setRolling(true);
      setError(null);

      // Handle missing character data gracefully
      let dexMod = 0;
      console.log('🎲 Character dexterity value:', participant.characterData.dexterity);
      
      // Try to get dexterity from character data
      const dexValue = participant.characterData.dexterity;
      if (dexValue !== undefined && dexValue !== null) {
        const numericDex = Number(dexValue);
        if (!isNaN(numericDex)) {
          dexMod = getModifier(numericDex);
          console.log('🎲 Calculated dex modifier:', dexMod);
        } else {
          console.log('🎲 Invalid dexterity value, using 0 modifier');
        }
      } else {
        console.log('🎲 No dexterity data found, using 0 modifier');
      }
      const initiative = result + dexMod;
      console.log('🎲 Calculated initiative:', { result, dexMod, initiative });

      // Update local state
      const updatedOrder = initiativeOrder.map(p => 
        p.id === participantId ? { ...p, initiative } : p
      );
      setInitiativeOrder(updatedOrder);

      // Auto-save character initiative
      const response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}/participants/${participantId}/initiative`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initiative })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🎲 API Error:', response.status, errorText);
        throw new Error(`Failed to save initiative: ${response.status} ${errorText}`);
      }

      // Fetch updated encounter
      const encounterResponse = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`);
      if (encounterResponse.ok) {
        const updatedEncounter = await encounterResponse.json();
        onInitiativeUpdated(updatedEncounter);
      }


    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save initiative');
    } finally {
      setRolling(false);
    }
  };

  const sortedInitiativeOrder = [...initiativeOrder].sort((a, b) => {
    if (a.initiative === 0 && b.initiative === 0) return 0;
    if (a.initiative === 0) return 1;
    if (b.initiative === 0) return -1;
    return b.initiative - a.initiative;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            Roll Initiative
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm bg-red-50 border border-red-200 rounded-md p-2">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          {isDM && (
            <>
              <Button
                onClick={rollInitiativeForMonsters}
                disabled={rolling}
                className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]"
              >
                <Dice1 className="h-4 w-4 mr-1" />
                {rolling ? 'Rolling...' : 'Roll Monster Initiative'}
              </Button>
              
              <Button
                onClick={resetAllInitiative}
                disabled={rolling}
                className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 bg-white"
              >
                <X className="h-4 w-4 mr-1" />
                {rolling ? 'Resetting...' : 'Reset All Initiative'}
              </Button>
            </>
          )}
          
          <Button
            onClick={async () => {
              try {
                const response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`);
                if (response.ok) {
                  const updatedEncounter = await response.json();
                  onInitiativeUpdated(updatedEncounter);
                }
              } catch (error) {
                console.error('Failed to refresh:', error);
              }
            }}
            variant="ghost"
            size="sm"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </Button>
        </div>

        {/* Initiative Order */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
            Initiative Order
          </h3>
          
          {sortedInitiativeOrder.length === 0 ? (
            <p className="text-[var(--color-text-secondary)] text-center py-4">
              No participants in this encounter
            </p>
          ) : (
            <div className="space-y-2">
              {sortedInitiativeOrder.map((participant) => (
                <div
                  key={participant.id}
                  className={`flex items-center justify-between p-3 rounded-md border ${
                    participant.initiative > 0 
                      ? 'bg-[var(--color-surface)] border-[var(--color-border)]' 
                      : 'bg-[var(--color-surface)] border-[var(--color-border)] opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {participant.type === 'character' ? (
                        <Users className="h-4 w-4 text-blue-500" />
                      ) : (
                        <Skull className="h-4 w-4 text-red-500" />
                      )}
                      <span className="font-medium text-[var(--color-text-primary)]">
                        {participant.name}
                      </span>
                    </div>
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {participant.type === 'character' ? 'Character' : 'Monster'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {participant.initiative > 0 ? (
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-lg font-bold text-[var(--color-accent)]">
                          {participant.initiative}
                        </span>
                        {participant.type === 'character' && participant.characterData && (() => {
                          // Handle undefined/null dexterity values
                          const dexValue = participant.characterData.dexterity;
                          let dexMod = 0;
                          if (dexValue !== undefined && dexValue !== null) {
                            const numericDex = Number(dexValue);
                            if (!isNaN(numericDex)) {
                              dexMod = getModifier(numericDex);
                            }
                          }
                          return (
                            <span className="text-xs text-[var(--color-text-secondary)]">
                              (1d20 {dexMod >= 0 ? '+' : ''}{dexMod} DEX)
                            </span>
                          );
                        })()}
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-[var(--color-text-secondary)]">
                          Not rolled
                        </span>
                        {participant.type === 'character' && participant.characterData && (() => {
                          const dexValue = Number(participant.characterData.dexterity);
                          const dexMod = !isNaN(dexValue) ? getModifier(dexValue) : 0;
                          return (
                            <span className="text-xs text-[var(--color-text-secondary)]">
                              ({dexMod >= 0 ? '+' : ''}{dexMod} DEX)
                            </span>
                          );
                        })()}
                      </div>
                    )}
                    
                    {participant.initiative === 0 && (
                      <div className="flex items-center space-x-2">
                        {participant.type === 'character' && (
                          <Button
                            onClick={() => handleCharacterRollClick(participant.id)}
                            size="sm"
                            disabled={!participant.characterData || !canRollForCharacter(participant.characterData) || rolling}
                            className={`${
                              participant.characterData && canRollForCharacter(participant.characterData)
                                ? 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            <Dice1 className="h-3 w-3 mr-1" />
                            {participant.characterData && canRollForCharacter(participant.characterData) ? 'Roll' : 'Not Yours'}
                          </Button>
                        )}
                        
                        {participant.type === 'monster' && isDM && (
                          <Button
                            onClick={() => handleMonsterRollClick(participant.id)}
                            size="sm"
                            disabled={rolling}
                            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]"
                          >
                            <Dice1 className="h-3 w-3 mr-1" />
                            Roll
                          </Button>
                        )}
                        
                        {/* Manual initiative entry - only for owned characters or DM for any participant */}
                        {(participant.type === 'character' && (participant.characterData && canRollForCharacter(participant.characterData) || isDM)) || 
                         (participant.type === 'monster' && isDM) ? (
                          <div className="flex items-center space-x-1">
                            <input
                              type="number"
                              placeholder="Manual"
                              className="w-16 px-2 py-1 text-sm border border-[var(--color-border)] rounded bg-[var(--color-surface)] text-[var(--color-text-primary)]"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  const value = parseInt(e.currentTarget.value);
                                  if (!isNaN(value)) {
                                    handleManualInitiative(participant.id, value);
                                    e.currentTarget.value = '';
                                  }
                                }
                              }}
                            />
                            <button
                              onClick={(e) => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                if (input && input.type === 'number') {
                                  const value = parseInt(input.value);
                                  if (!isNaN(value)) {
                                    handleManualInitiative(participant.id, value);
                                    input.value = '';
                                  }
                                }
                              }}
                              className="px-2 py-1 text-xs bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] rounded transition-colors"
                            >
                              Set
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-[var(--color-text-secondary)]">
                            {participant.type === 'character' ? 'Not yours' : 'DM only'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


      </div>
    </div>
  );
} 