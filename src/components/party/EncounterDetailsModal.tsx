"use client";

import { useState, useEffect, useMemo } from 'react';
import { X, Plus, Users, Skull, Trash2, Edit, Save, Dice1, Sword } from 'lucide-react';
import { Button } from '@/components/ui';
import { Encounter, EncounterMonster, EncounterParticipant, DiceRollLogEntry } from '@/types/encounter';
import { useSession } from 'next-auth/react';
import AddMonsterModal from './AddMonsterModal';
import AddParticipantModal from './AddParticipantModal';
import InitiativeRoller from './InitiativeRoller';
import Pusher from 'pusher-js';
import { diceRollCache } from '@/lib/dice-roll-cache';
import ReadOnlyCharacterSheet from '@/components/character-sheet/ReadOnlyCharacterSheet';
import { CharacterSheet } from '@/components/character-sheet';
import MonsterDetailModal from '@/components/monster-detail-modal';

interface EncounterDetailsModalProps {
  encounter: Encounter;
  isOpen: boolean;
  onClose: () => void;
  onEncounterUpdated: (encounter: Encounter) => void;
  onEncounterDeleted: (encounterId: string) => void;
  isDM: boolean;
}

export default function EncounterDetailsModal({
  encounter,
  isOpen,
  onClose,
  onEncounterUpdated,
  onEncounterDeleted,
  isDM
}: EncounterDetailsModalProps) {
  const { data: session } = useSession();
  const [currentEncounter, setCurrentEncounter] = useState<Encounter>(encounter);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(encounter.name);
  const [description, setDescription] = useState(encounter.description || '');
  const [loading, setLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [addPartyLoading, setAddPartyLoading] = useState(false);
  const [showAddMonster, setShowAddMonster] = useState(false);
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [showInitiativeRoller, setShowInitiativeRoller] = useState(false);
  const [showDMRolls, setShowDMRolls] = useState(currentEncounter?.showDMRolls || false);
  const [clearHistoryLoading, setClearHistoryLoading] = useState(false);
  const [nextTurnLoading, setNextTurnLoading] = useState(false);
  const [diceRollsVersion, setDiceRollsVersion] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState<EncounterParticipant | null>(null);
  const [selectedMonster, setSelectedMonster] = useState<EncounterMonster | null>(null);
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [showMonsterModal, setShowMonsterModal] = useState(false);
  const [isAnimatingInitiative, setIsAnimatingInitiative] = useState(false);

  useEffect(() => {
    setCurrentEncounter(encounter);
    setName(encounter.name);
    setDescription(encounter.description || '');
    setShowDMRolls(encounter.showDMRolls || false);
  }, [encounter]);

  useEffect(() => {
    if (!isOpen) return;

    let pusher: Pusher | null = null;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 3;

    const initializePusher = () => {
      try {
        // Initialize Pusher for real-time dice roll updates
        pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || 'your-pusher-key', {
          cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
          authEndpoint: `/api/pusher/auth`,
          enabledTransports: ['ws', 'wss'],
          forceTLS: true,
        });

        // Subscribe to dice roll events for this game
        const diceRollChannel = pusher.subscribe(`game-${encounter.gameId}-dice-rolls`);

        // Listen for dice roll events
        diceRollChannel.bind('dice-roll-logged', (data: { encounterId: string; logEntry: DiceRollLogEntry }) => {
          console.log('🎲 Received dice roll event:', data);
          if (data.encounterId === encounter.id) {
            console.log('🎲 Adding dice roll to client cache');
            // Add to client-side cache
            diceRollCache.addRoll(data.encounterId, data.logEntry);
            // Force re-render by updating a state variable
            setCurrentEncounter(prev => ({ ...prev }));
            setDiceRollsVersion(prev => prev + 1);
          } else {
            console.log('🎲 Dice roll event for different encounter:', data.encounterId, 'vs', encounter.id);
          }
        });

        // Listen for dice roll history cleared events
        diceRollChannel.bind('dice-roll-history-cleared', (data: { encounterId: string }) => {
          console.log('🎲 Received dice roll history cleared event:', data);
          console.log('🎲 Current encounter ID:', encounter.id);
          console.log('🎲 Event encounter ID:', data.encounterId);
          if (data.encounterId === encounter.id) {
            console.log('🎲 Clearing dice roll history from client cache');
            diceRollCache.clearRolls(data.encounterId);
            // Force re-render by updating a state variable
            setCurrentEncounter(prev => ({ ...prev }));
          } else {
            console.log('🎲 Event for different encounter, ignoring');
          }
        });

        // Listen for DM rolls toggle changes
        diceRollChannel.bind('dm-rolls-toggle-changed', (data: { encounterId: string; showDMRolls: boolean }) => {
          console.log('🎲 Received DM rolls toggle change:', data);
          if (data.encounterId === encounter.id) {
            console.log('🎲 Updating showDMRolls state:', data.showDMRolls);
            setShowDMRolls(data.showDMRolls);
            setCurrentEncounter(prev => ({
              ...prev,
              showDMRolls: data.showDMRolls
            }));
          }
        });

        // Listen for encounter updates (like start/stop)
        const gameChannel = pusher.subscribe(`game-${encounter.gameId}`);
        gameChannel.bind('encounter:updated', (data: { 
          encounterId: string; 
          isActive: boolean;
          name: string;
          currentTurn?: number;
          currentParticipantId?: string;
          round?: number;
          turnOrder?: string[];
        }) => {
          console.log('🎯 Received encounter update:', data);
          if (data.encounterId === encounter.id) {
            console.log('🎯 Updating encounter state:', data.isActive ? 'ACTIVE' : 'STOPPED');
            setCurrentEncounter(prev => ({
              ...prev,
              isActive: data.isActive,
              name: data.name,
              currentTurn: data.currentTurn,
              currentParticipantId: data.currentParticipantId,
              round: data.round,
              turnOrder: data.turnOrder
            }));
            // Also update the parent component
            onEncounterUpdated({
              ...currentEncounter,
              isActive: data.isActive,
              name: data.name,
              currentTurn: data.currentTurn,
              currentParticipantId: data.currentParticipantId,
              round: data.round,
              turnOrder: data.turnOrder
            });
          }
        });

        // Handle connection events
        pusher.connection.bind('connected', () => {
          console.log('🎲 Pusher connected successfully');
          reconnectAttempts = 0; // Reset reconnect attempts on successful connection
        });

        pusher.connection.bind('disconnected', () => {
          console.log('🎲 Pusher disconnected');
        });

        pusher.connection.bind('error', (error: unknown) => {
          console.error('🎲 Pusher connection error:', error);
          if (reconnectAttempts < maxReconnectAttempts) {
            reconnectAttempts++;
            console.log(`🎲 Attempting to reconnect (${reconnectAttempts}/${maxReconnectAttempts})...`);
            setTimeout(() => {
              if (pusher) {
                pusher.disconnect();
                initializePusher();
              }
            }, 2000 * reconnectAttempts); // Exponential backoff
          } else {
            console.error('🎲 Max reconnection attempts reached');
          }
        });

      } catch (error) {
        console.error('🎲 Failed to initialize Pusher:', error);
      }
    };

    initializePusher();

    // Cleanup function
    return () => {
      if (pusher) {
        console.log('🎲 Disconnecting Pusher');
        pusher.disconnect();
      }
    };
  }, [isOpen, encounter.gameId, encounter.id, currentEncounter, onEncounterUpdated]);

  // Memoize the filtered and sorted dice roll history for performance
  const memoizedDiceRollHistory = useMemo(() => {
    const rolls = diceRollCache.getRolls(currentEncounter.id);
    if (rolls.length === 0) {
      return [];
    }

    return rolls
      .filter(entry => {
        // Show all non-DM rolls to everyone
        if (!entry.isDM) return true;
        // Show DM rolls to DM always, and to others only if DM has toggle on
        const shouldShow = isDM || showDMRolls;
        return shouldShow;
      })
      .map(entry => ({
        ...entry,
        displayName: entry.playerId === session?.user?.id ? 'You' : entry.playerName,
        formattedTime: new Date(entry.timestamp).toLocaleTimeString()
      }));
  }, [currentEncounter.id, isDM, showDMRolls, session?.user?.id, diceRollsVersion]);

  const handleSave = async () => {
    try {
      setSaveLoading(true);
      const response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          isActive: currentEncounter.isActive
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update encounter');
      }

      const updatedEncounter = await response.json();
      setCurrentEncounter(updatedEncounter);
      onEncounterUpdated(updatedEncounter);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating encounter:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this encounter? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleteLoading(true);
      const response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete encounter');
      }

      onEncounterDeleted(encounter.id);
      onClose();
    } catch (error) {
      console.error('Error deleting encounter:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleClearDiceHistory = async () => {

    try {
      setClearHistoryLoading(true);
      const response = await fetch(`/api/games/${encounter.gameId}/dice-rolls`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          encounterId: encounter.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to clear dice roll history');
      }

      console.log('🎲 Dice roll history cleared successfully');
      
      // Clear from client-side cache immediately
      diceRollCache.clearRolls(encounter.id);
      
      // Force re-render
      setCurrentEncounter(prev => ({ ...prev }));
      setDiceRollsVersion(prev => prev + 1);
    } catch (error) {
      console.error('Error clearing dice roll history:', error);
    } finally {
      setClearHistoryLoading(false);
    }
  };

  const handleToggleDMRolls = async () => {
    try {
      const newShowDMRolls = !showDMRolls;
      const response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          showDMRolls: newShowDMRolls
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update DM rolls toggle');
      }
      console.log('🎲 DM rolls toggle updated successfully');
      // Local state will be updated via Pusher event
    } catch (error) {
      console.error('Error updating DM rolls toggle:', error);
    }
  };

  const generateInitiativeOrder = () => {
    // Create a map of all participants with their initiative and dex data
    const participantsMap = new Map<string, { initiative: number; dex: number; name: string }>();
    
    // Add characters to the map
    currentEncounter.participants.forEach(participant => {
      const initiative = participant.initiative || 0;
      const dex = participant.characterData?.dexterity || 0;
      participantsMap.set(participant.id, { initiative, dex, name: participant.characterName || 'Unknown' });
    });

    // Add monsters to the map
    currentEncounter.monsters.forEach(monster => {
      monster.instances?.forEach((instance) => {
        const monsterId = `${monster.id}-${instance.instanceNumber}`;
        const initiative = instance.initiative || 0;
        const dex = monster.monsterData?.dexterity || 0;
        participantsMap.set(monsterId, { initiative, dex, name: `${monster.monsterName} #${instance.instanceNumber}` });
      });
    });

    // Create the order array from the map keys
    const order = Array.from(participantsMap.keys());

    // Sort by initiative (highest first), then by dex modifier as tiebreaker
    order.sort((a, b) => {
      const aData = participantsMap.get(a);
      const bData = participantsMap.get(b);
      
      if (!aData || !bData) {
        return 0;
      }
      
      // Compare initiative first
      if (aData.initiative !== bData.initiative) {
        return bData.initiative - aData.initiative;
      }
      
      // Same initiative, compare dex
      return bData.dex - aData.dex;
    });

    return order;
  };

  const handleToggleActive = async () => {
    try {
      setToggleLoading(true);
      
      let turnOrder = null;
      let currentParticipantId = null;
      let round = null;
      let currentTurn = null;
      
      if (!currentEncounter.isActive) {
        // Starting combat - generate initiative order
        turnOrder = generateInitiativeOrder();
        currentParticipantId = turnOrder.length > 0 ? turnOrder[0] : null;
        round = 1;
        currentTurn = 1;

        // Add animation delay for initiative order
        setIsAnimatingInitiative(true);
        await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 second delay
        setIsAnimatingInitiative(false);

      } else {
        // Stopping combat - clear turn order

        turnOrder = null;
        currentParticipantId = null;
        round = null;
        currentTurn = null;
      }
      
      const requestBody = {
        name: currentEncounter.name,
        description: currentEncounter.description,
        isActive: !currentEncounter.isActive,
        turnOrder,
        currentParticipantId,
        currentTurn,
        round
      };
      

      
      const response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to update encounter');
      }

      const updatedEncounter = await response.json();
      setCurrentEncounter(updatedEncounter);
      onEncounterUpdated(updatedEncounter);
    } catch (error) {
      console.error('🎯 Error updating encounter:', error);
    } finally {
      setToggleLoading(false);
    }
  };

  const handleMonsterAdded = (monster: EncounterMonster) => {
    setCurrentEncounter(prev => ({
      ...prev,
      monsters: [...prev.monsters, monster]
    }));
    onEncounterUpdated(currentEncounter);
  };

  const handleParticipantAdded = (participant: EncounterParticipant) => {
    setCurrentEncounter(prev => ({
      ...prev,
      participants: [...prev.participants, participant]
    }));
    onEncounterUpdated(currentEncounter);
  };

  const handleRemoveMonster = async (monsterId: string) => {
    if (!confirm('Are you sure you want to remove this monster from the encounter?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}/monsters/${monsterId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove monster');
      }

      // Remove from local state
      setCurrentEncounter(prev => ({
        ...prev,
        monsters: prev.monsters.filter(m => m.id !== monsterId)
      }));

      // Fetch updated encounter to ensure consistency
      const encounterResponse = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`);
      if (encounterResponse.ok) {
        const updatedEncounter = await encounterResponse.json();
        onEncounterUpdated(updatedEncounter);
      }
    } catch (error) {
      console.error('Error removing monster:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveParticipant = async (participantId: string) => {
    if (!confirm('Are you sure you want to remove this character from the encounter?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}/participants/${participantId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove participant');
      }

      // Remove from local state
      setCurrentEncounter(prev => ({
        ...prev,
        participants: prev.participants.filter(p => p.id !== participantId)
      }));

      // Fetch updated encounter to ensure consistency
      const encounterResponse = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`);
      if (encounterResponse.ok) {
        const updatedEncounter = await encounterResponse.json();
        onEncounterUpdated(updatedEncounter);
      }
    } catch (error) {
      console.error('Error removing participant:', error);
    } finally {
      setLoading(false);
    }
  };

    const handleAddParty = async () => {
    try {
      setAddPartyLoading(true);

      // Fetch all characters in the game
      const charactersResponse = await fetch(`/api/characters?gameId=${encounter.gameId}`);
      if (!charactersResponse.ok) {
        throw new Error('Failed to fetch characters');
      }

      const characters = await charactersResponse.json();

      // Add each character to the encounter
      const addPromises = characters.map(async (character: { id: string; name: string }) => {
        const response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}/participants`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            characterId: character.id,
            characterName: character.name,
            characterData: character
          }),
        });

        if (!response.ok) {
          console.error(`Failed to add character ${character.name} to encounter`);
          return null;
        }

        return response.json();
      });

      const results = await Promise.all(addPromises);
      const successfulAdds = results.filter(result => result !== null);

      if (successfulAdds.length > 0) {
        // Refresh encounter data
        const encounterResponse = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`);
        if (encounterResponse.ok) {
          const updatedEncounter = await encounterResponse.json();
          setCurrentEncounter(updatedEncounter);
          onEncounterUpdated(updatedEncounter);
        }
      }

      console.log(`Added ${successfulAdds.length} characters to encounter`);
    } catch (error) {
      console.error('Error adding party to encounter:', error);
    } finally {
      setAddPartyLoading(false);
    }
  };

  // Check if all participants have initiative rolled
  const allParticipantsHaveInitiative = () => {
    // Check characters
    const charactersHaveInitiative = currentEncounter.participants.every(
      participant => participant.initiative !== undefined && participant.initiative !== null
    );

    // Check monsters
    const monstersHaveInitiative = currentEncounter.monsters.every(monster =>
      monster.instances?.every(instance => 
        instance.initiative !== undefined && instance.initiative !== null
      )
    );

    return charactersHaveInitiative && monstersHaveInitiative;
  };

  const characterCount = currentEncounter.participants.length;
  const monsterCount = currentEncounter.monsters.reduce((total, monster) => total + monster.quantity, 0);

  const getModifier = (abilityScore: number) => {
    return Math.floor((abilityScore - 10) / 2);
  };

  const getInitiativeOrderedParticipants = () => {
    const allParticipants: Array<{
      id: string;
      name: string;
      type: 'character' | 'monster';
      initiative: number;
      currentHP: number;
      maxHP: number;
      participant?: EncounterParticipant;
      monster?: EncounterMonster;
      instance?: { id: string; instanceNumber: number; initiative?: number; currentHP?: number };
    }> = [];

    // Add characters
    currentEncounter.participants.forEach(participant => {
      allParticipants.push({
        id: participant.id,
        name: participant.characterName,
        type: 'character',
        initiative: participant.initiative || 0,
        currentHP: participant.currentHP || participant.maxHP,
        maxHP: participant.maxHP,
        participant
      });
    });

    // Add monsters
    currentEncounter.monsters.forEach(monster => {
      monster.instances?.forEach((instance) => {
        allParticipants.push({
          id: `${monster.id}-${instance.instanceNumber}`,
          name: `${monster.monsterName} #${instance.instanceNumber}`,
          type: 'monster',
          initiative: instance.initiative || 0,
          currentHP: instance.currentHP || monster.maxHP,
          maxHP: monster.maxHP,
          monster,
          instance
        });
      });
    });

    // Sort by initiative (highest first), then by dex modifier as tiebreaker
    allParticipants.sort((a, b) => {
      if (a.initiative !== b.initiative) {
        return b.initiative - a.initiative;
      }
      
      // If initiative is the same, sort by dex modifier
      let aDexMod = 0;
      let bDexMod = 0;
      
      if (a.type === 'character' && a.participant?.characterData?.dexterity) {
        aDexMod = getModifier(a.participant.characterData.dexterity);
      } else if (a.type === 'monster' && a.monster?.monsterData?.dexterity) {
        aDexMod = getModifier(a.monster.monsterData.dexterity);
      }
      
      if (b.type === 'character' && b.participant?.characterData?.dexterity) {
        bDexMod = getModifier(b.participant.characterData.dexterity);
      } else if (b.type === 'monster' && b.monster?.monsterData?.dexterity) {
        bDexMod = getModifier(b.monster.monsterData.dexterity);
      }
      
      return bDexMod - aDexMod;
    });

    return allParticipants;
  };

  const getCurrentParticipant = () => {
    if (!currentEncounter.isActive || !currentEncounter.turnOrder || currentEncounter.turnOrder.length === 0) {
      return null;
    }

    const currentId = currentEncounter.currentParticipantId;
    if (!currentId) {
      // If no current participant is set, default to the first one (highest initiative)
      return currentEncounter.turnOrder[0];
    }

    return currentId;
  };

  const advanceTurn = async () => {
    if (!currentEncounter.isActive || !currentEncounter.turnOrder || currentEncounter.turnOrder.length === 0) {
      return;
    }

    const currentId = getCurrentParticipant();
    if (!currentId) {
      return;
    }

    // Set loading state immediately for visual feedback
    setNextTurnLoading(true);

    const currentIndex = currentEncounter.turnOrder.indexOf(currentId);
    const nextIndex = (currentIndex + 1) % currentEncounter.turnOrder.length;
    const nextParticipantId = currentEncounter.turnOrder[nextIndex];
    
    // Calculate new turn and round
    let newTurn = (currentEncounter.currentTurn || 1);
    let newRound = currentEncounter.round || 1;
    
    if (nextIndex === 0) {
      // We've completed a round
      newRound += 1;
    } else {
      newTurn += 1;
    }

    // Immediately update the UI for instant feedback
    setCurrentEncounter(prev => ({
      ...prev,
      currentParticipantId: nextParticipantId,
      currentTurn: newTurn,
      round: newRound
    }));

    try {
      const response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: currentEncounter.name,
          description: currentEncounter.description,
          isActive: currentEncounter.isActive,
          turnOrder: currentEncounter.turnOrder,
          currentParticipantId: nextParticipantId,
          currentTurn: newTurn,
          round: newRound
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to advance turn');
      }

      const updatedEncounter = await response.json();

      setCurrentEncounter(updatedEncounter);
      onEncounterUpdated(updatedEncounter);
    } catch (error) {
      console.error('🎯 Error advancing turn:', error);
    } finally {
      setNextTurnLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            {isEditing ? 'Edit Encounter' : 'Encounter Details'}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Encounter Info */}
        <div className="mb-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                {currentEncounter.name}
              </h3>
              {currentEncounter.description && (
                <p className="text-[var(--color-text-secondary)] mb-2">
                  {currentEncounter.description}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                <span>Status: {currentEncounter.isActive ? 'Active' : 'Inactive'}</span>
                <span>Characters: {characterCount}</span>
                <span>Monsters: {monsterCount}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          {isDM && (
            <>
              <Button
                onClick={() => setShowAddMonster(true)}
                className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Monster
              </Button>
              <Button
                onClick={() => setShowAddParticipant(true)}
                className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]"
              >
                <Users className="h-4 w-4 mr-1" />
                Add Character
              </Button>
              <Button
                onClick={handleAddParty}
                disabled={addPartyLoading}
                className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]"
              >
                <Users className="h-4 w-4 mr-1" />
                Add Party
              </Button>
            </>
          )}
          {isDM && (
            <>
              {isEditing ? (
                <Button
                  onClick={handleSave}
                  disabled={saveLoading}
                  className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]"
                >
                  <Save className="h-4 w-4 mr-1" />
                  {saveLoading ? 'Saving...' : 'Save'}
                </Button>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
            </>
          )}
          {(characterCount > 0 || monsterCount > 0) && (
            <Button
              onClick={() => {
                console.log('🎲 Roll Initiative button clicked');
                console.log('Current encounter:', currentEncounter);
                console.log('Character count:', characterCount);
                console.log('Monster count:', monsterCount);
                console.log('Monsters:', currentEncounter.monsters);
                setShowInitiativeRoller(true);
              }}
              className="bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-[var(--color-success-text)]"
            >
              <Dice1 className="h-4 w-4 mr-1" />
              Roll Initiative
            </Button>
          )}
          {isDM && (
            <Button
              onClick={handleToggleActive}
              disabled={toggleLoading || (!currentEncounter.isActive && !allParticipantsHaveInitiative())}
              className={`${
                currentEncounter.isActive
                  ? 'bg-[var(--color-danger)] hover:bg-[var(--color-danger-hover)] text-[var(--color-danger-text)]'
                  : 'bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-[var(--color-success-text)]'
              }`}
            >
              <>
                <Sword className="h-4 w-4 mr-1" />
                {toggleLoading ? (isAnimatingInitiative ? 'Arranging Initiative...' : 'Updating...') : currentEncounter.isActive ? 'Stop' : 'Start'}
              </>
            </Button>
          )}
          {isDM && (
            <Button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="bg-[var(--color-danger)] hover:bg-[var(--color-danger-hover)] text-[var(--color-danger-text)]"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </Button>
          )}
        </div>

        {/* Main Content - Participants and Log */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Participants and Monsters - Takes 2/3 of the space */}
          <div className="lg:col-span-2 space-y-6">
          {currentEncounter.isActive ? (
            /* Initiative Order Display */
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center">
                  <Sword className="h-4 w-4 mr-2" />
                  Initiative Order
                </h3>
                {currentEncounter.isActive && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      Round {currentEncounter.round || 1} • Turn {currentEncounter.currentTurn || 1}
                    </span>
                    {isDM && (
                      <Button
                        onClick={() => {
                          advanceTurn();
                        }}
                        disabled={nextTurnLoading}
                        size="sm"
                        className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]"
                      >
                        {nextTurnLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                            Advancing...
                          </>
                        ) : (
                          'Next Turn'
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </div>
              {(() => {
                const orderedParticipants = getInitiativeOrderedParticipants();
                const currentParticipantId = getCurrentParticipant();
                return orderedParticipants.length === 0 ? (
                  <p className="text-[var(--color-text-secondary)] text-sm">No participants in this encounter.</p>
                ) : (
                  <div className="space-y-2">
                                      {orderedParticipants.map((participant, index) => {
                    const isCurrentTurn = participant.id === currentParticipantId;
                    return (
                        <div
                          key={participant.id}
                          className={`border rounded-md p-3 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[var(--color-surface-hover)] ${
                            isCurrentTurn 
                              ? 'bg-[var(--color-surface)] border-l-4 border-l-[var(--color-accent)] border-[var(--color-border)]' 
                              : 'bg-[var(--color-surface)] border-[var(--color-border)]'
                          }`}
                          style={{
                            transform: `translateY(${index * 2}px)`,
                            opacity: isCurrentTurn ? 1 : 0.9 + (index * 0.02)
                          }}
                          onClick={() => {
                            if (participant.type === 'character' && participant.participant) {
                              setSelectedCharacter(participant.participant);
                              setShowCharacterModal(true);
                            } else if (participant.type === 'monster' && participant.monster) {
                              setSelectedMonster(participant.monster);
                              setShowMonsterModal(true);
                            }
                          }}
                        >
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                                                         <div className="flex items-center space-x-2">
                               {participant.type === 'character' ? (
                                 <Users className="h-4 w-4 text-blue-500" />
                               ) : (
                                 <Skull className="h-4 w-4 text-red-500" />
                               )}
                               <span className="font-medium text-[var(--color-text-primary)]">
                                 {participant.name}
                               </span>
                               {isCurrentTurn && (
                                 <span className="text-xs bg-[var(--color-accent)] text-[var(--color-accent-text)] px-2 py-1 rounded-full ml-2">
                                   CURRENT TURN
                                 </span>
                               )}
                             </div>
                            {participant.initiative > 0 && (
                              <span className="text-sm text-[var(--color-accent)] font-mono ml-6">
                                Initiative: {participant.initiative}
                              </span>
                            )}
                          </div>
                          {isDM && (
                            <Button
                              onClick={(e) => {
                                e?.stopPropagation(); // Prevent triggering the tile click
                                if (participant.type === 'character' && participant.participant) {
                                  handleRemoveParticipant(participant.participant.id);
                                } else if (participant.type === 'monster' && participant.monster) {
                                  handleRemoveMonster(participant.monster.id);
                                }
                              }}
                              disabled={loading}
                              size="sm"
                              className="bg-[var(--color-danger)] hover:bg-[var(--color-danger-hover)] text-[var(--color-danger-text)] ml-2"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        <div className="text-sm text-[var(--color-text-secondary)] mt-1 ml-6">
                          HP: {participant.currentHP}/{participant.maxHP}
                        </div>
                      </div>
                    );
                  })}
                  </div>
                );
              })()}
            </div>
          ) : (
            /* Default Layout */
            <>
              {/* Characters */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Characters ({characterCount})
                </h3>
                {currentEncounter.participants.length === 0 ? (
                  <p className="text-[var(--color-text-secondary)] text-sm">No characters added yet.</p>
                ) : (
                  <div className="space-y-2">
                    {currentEncounter.participants.map((participant) => (
                      <div
                        key={participant.id}
                        className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-3"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <span className="font-medium text-[var(--color-text-primary)]">
                              {participant.characterName}
                            </span>
                            {participant.initiative !== undefined && (
                              <span className="text-sm text-[var(--color-accent)] font-mono ml-2">
                                Initiative: {participant.initiative}
                              </span>
                            )}
                          </div>
                          {isDM && (
                            <Button
                              onClick={() => handleRemoveParticipant(participant.id)}
                              disabled={loading}
                              size="sm"
                              className="bg-[var(--color-danger)] hover:bg-[var(--color-danger-hover)] text-[var(--color-danger-text)] ml-2"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        <div className="text-sm text-[var(--color-text-secondary)] mt-1">
                          HP: {participant.currentHP ?? participant.maxHP}/{participant.maxHP}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Monsters */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3 flex items-center">
                  <Skull className="h-4 w-4 mr-2" />
                  Monsters ({monsterCount})
                </h3>
                {currentEncounter.monsters.length === 0 ? (
                  <p className="text-[var(--color-text-secondary)] text-sm">No monsters added yet.</p>
                ) : (
                  <div className="space-y-2">
                    {currentEncounter.monsters.flatMap((monster) => 
                      monster.instances?.map((instance) => (
                        <div
                          key={`${monster.id}-${instance.id}`}
                          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-3"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <span className="font-medium text-[var(--color-text-primary)]">
                                {monster.monsterName} #{instance.instanceNumber}
                              </span>
                              {instance.initiative !== undefined && (
                                <span className="text-sm text-[var(--color-accent)] font-mono ml-2">
                                  Initiative: {instance.initiative}
                                </span>
                              )}
                            </div>
                            {isDM && (
                              <Button
                                onClick={() => handleRemoveMonster(monster.id)}
                                disabled={loading}
                                size="sm"
                                className="bg-[var(--color-danger)] hover:bg-[var(--color-danger-hover)] text-[var(--color-danger-text)] ml-2"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                          <div className="text-sm text-[var(--color-text-secondary)] mt-1">
                            HP: {instance.currentHP ?? monster.maxHP}/{monster.maxHP}
                          </div>
                        </div>
                      )) || []
                    )}
                  </div>
                )}
              </div>
            </>
          )}
          </div>

          {/* Roll History - Takes 1/3 of the space */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-4 h-full">
              <div className="mb-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Roll History
                  </h3>
                  {isDM && currentEncounter.diceRollLog && currentEncounter.diceRollLog.length > 0 && (
                    <button
                      onClick={handleClearDiceHistory}
                      disabled={clearHistoryLoading}
                      className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded transition-colors"
                    >
                      {clearHistoryLoading ? 'Clearing...' : 'Clear History'}
                    </button>
                  )}
                </div>
                {isDM && (
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id="show-dm-rolls"
                      checked={showDMRolls}
                      onChange={handleToggleDMRolls}
                      className="mr-2"
                    />
                    <label htmlFor="show-dm-rolls" className="text-sm text-[var(--color-text-secondary)]">
                      Show DM rolls
                    </label>
                  </div>
                )}
              </div>
              
              <div className="max-h-96 overflow-y-auto font-mono text-sm">
                {memoizedDiceRollHistory.length > 0 ? (
                  memoizedDiceRollHistory.map((entry) => (
                    <div key={entry.id} className="py-1 border-b border-[var(--color-border)] last:border-b-0">
                      <span className="text-[var(--color-text-primary)]">
                        {entry.displayName}
                        {entry.isDM && ' (DM)'}
                      </span>
                      <span className="text-[var(--color-text-secondary)] ml-2">
                        {entry.notation} = {entry.result}
                      </span>
                      <span className="text-[var(--color-text-secondary)] ml-2 text-xs">
                        {entry.formattedTime}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-[var(--color-text-secondary)] text-sm text-center py-4">
                    No dice rolls logged yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showAddMonster && (
          <AddMonsterModal
            gameId={encounter.gameId}
            encounterId={encounter.id}
            isOpen={showAddMonster}
            onClose={() => setShowAddMonster(false)}
            onMonsterAdded={handleMonsterAdded}
          />
        )}

        {showAddParticipant && (
          <AddParticipantModal
            encounterId={encounter.id}
            gameId={encounter.gameId}
            isOpen={showAddParticipant}
            onClose={() => setShowAddParticipant(false)}
            onParticipantAdded={handleParticipantAdded}
          />
        )}

        {showInitiativeRoller && (
          <InitiativeRoller
            encounter={currentEncounter}
            isOpen={showInitiativeRoller}
            onClose={() => setShowInitiativeRoller(false)}
            onInitiativeUpdated={(updatedEncounter: Encounter) => {
              setCurrentEncounter(updatedEncounter);
              onEncounterUpdated(updatedEncounter);
            }}
            isDM={isDM}
          />
        )}

        {/* Character Sheet Modal */}
        {showCharacterModal && selectedCharacter && (
          selectedCharacter.characterData.userId === session?.user?.id ? (
            <CharacterSheet
              character={selectedCharacter.characterData}
              onClose={() => {
                setShowCharacterModal(false);
                setSelectedCharacter(null);
              }}
            />
          ) : (
            <ReadOnlyCharacterSheet
              character={selectedCharacter.characterData}
              isDM={isDM}
              onClose={() => {
                setShowCharacterModal(false);
                setSelectedCharacter(null);
              }}
            />
          )
        )}

        {/* Monster Detail Modal */}
        {showMonsterModal && selectedMonster && (
          <MonsterDetailModal
            monster={selectedMonster.monsterData}
            isOpen={showMonsterModal}
            initialTab="combat"
            onClose={() => {
              setShowMonsterModal(false);
              setSelectedMonster(null);
            }}
          />
        )}
      </div>
    </div>
  );
} 