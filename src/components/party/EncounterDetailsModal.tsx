"use client";

import { useState, useEffect } from 'react';
import { X, Plus, Users, Skull, Trash2, Edit, Save, Dice1, Sword } from 'lucide-react';
import { Button } from '@/components/ui';
import { Encounter, EncounterMonster, EncounterParticipant } from '@/types/encounter';
import AddMonsterModal from './AddMonsterModal';
import AddParticipantModal from './AddParticipantModal';
import InitiativeRoller from './InitiativeRoller';

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

  useEffect(() => {
    setCurrentEncounter(encounter);
    setName(encounter.name);
    setDescription(encounter.description || '');
  }, [encounter]);

  useEffect(() => {
    if (isOpen) {
      const pollInterval = setInterval(() => {
        fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`)
          .then(response => response.json())
          .then(updatedEncounter => {
            setCurrentEncounter(updatedEncounter);
            onEncounterUpdated(updatedEncounter);
          })
          .catch(error => console.error('Error polling encounter:', error));
      }, 1000); // Poll every 1 second
      return () => clearInterval(pollInterval);
    }
  }, [isOpen, encounter.gameId, encounter.id]);

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

  const generateInitiativeOrder = () => {
    const order: string[] = [];
    
    // Add characters
    currentEncounter.participants.forEach(participant => {
      if (participant.initiative !== undefined && participant.initiative !== null) {
        order.push(participant.id);
      }
    });

    // Add monsters - use actual instances instead of quantity
    currentEncounter.monsters.forEach(monster => {
      monster.instances?.forEach((instance) => {
        if (instance.initiative !== undefined && instance.initiative !== null) {
          order.push(`${monster.id}-${instance.instanceNumber}`);
        }
      });
    });

    // Sort by initiative (highest first), then by dex modifier as tiebreaker
    order.sort((a, b) => {
      const aParticipant = currentEncounter.participants.find(p => p.id === a);
      const bParticipant = currentEncounter.participants.find(p => p.id === b);
      
      if (aParticipant && bParticipant) {
        // Both are characters - compare initiative, then dex
        if (aParticipant.initiative !== bParticipant.initiative) {
          return (bParticipant.initiative || 0) - (aParticipant.initiative || 0);
        }
        // Same initiative, compare dex
        const aDex = aParticipant.characterData?.dexterity || 0;
        const bDex = bParticipant.characterData?.dexterity || 0;
        return bDex - aDex;
      }
      
      // One or both are monsters - compare initiative, then monster dex
      const aInitiative = aParticipant?.initiative || 
        (() => {
          const [monsterId, instanceNum] = a.split('-');
          const monster = currentEncounter.monsters.find(m => m.id === monsterId);
          const instance = monster?.instances?.find(i => i.instanceNumber === parseInt(instanceNum));
          return instance?.initiative || 0;
        })();
      
      const bInitiative = bParticipant?.initiative || 
        (() => {
          const [monsterId, instanceNum] = b.split('-');
          const monster = currentEncounter.monsters.find(m => m.id === monsterId);
          const instance = monster?.instances?.find(i => i.instanceNumber === parseInt(instanceNum));
          return instance?.initiative || 0;
        })();
      
      if (aInitiative !== bInitiative) {
        return bInitiative - aInitiative;
      }
      
      // Same initiative, compare monster dex
      const aDex = aParticipant?.characterData?.dexterity || 
        (() => {
          const [monsterId] = a.split('-');
          const monster = currentEncounter.monsters.find(m => m.id === monsterId);
          return monster?.monsterData?.dexterity || 0;
        })();
      
      const bDex = bParticipant?.characterData?.dexterity || 
        (() => {
          const [monsterId] = b.split('-');
          const monster = currentEncounter.monsters.find(m => m.id === monsterId);
          return monster?.monsterData?.dexterity || 0;
        })();
      
      return bDex - aDex;
    });

    return order;
  };

  const handleToggleActive = async () => {
    try {
      setToggleLoading(true);
      
      let turnOrder = null;
      let currentParticipantId = null;
      let round = null;
      
      if (!currentEncounter.isActive) {
        // Starting combat - generate initiative order
        turnOrder = generateInitiativeOrder();
        currentParticipantId = turnOrder.length > 0 ? turnOrder[0] : null;
        round = 1;
      }
      // If stopping combat, turnOrder, currentParticipantId, and round will be null
      
      const response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: currentEncounter.name,
          description: currentEncounter.description,
          isActive: !currentEncounter.isActive,
          turnOrder,
          currentParticipantId,
          round
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update encounter');
      }

      const updatedEncounter = await response.json();
      setCurrentEncounter(updatedEncounter);
      onEncounterUpdated(updatedEncounter);
    } catch (error) {
      console.error('Error updating encounter:', error);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                {toggleLoading ? 'Updating...' : currentEncounter.isActive ? 'Stop' : 'Start'}
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

        {/* Participants and Monsters */}
        <div className="space-y-6">
          {currentEncounter.isActive ? (
            /* Initiative Order Display */
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3 flex items-center">
                <Sword className="h-4 w-4 mr-2" />
                Initiative Order
              </h3>
              {(() => {
                const orderedParticipants = getInitiativeOrderedParticipants();
                return orderedParticipants.length === 0 ? (
                  <p className="text-[var(--color-text-secondary)] text-sm">No participants in this encounter.</p>
                ) : (
                  <div className="space-y-2">
                    {orderedParticipants.map((participant, index) => (
                      <div
                        key={participant.id}
                        className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-3 transition-all duration-300 ease-in-out"
                        style={{
                          transform: `translateY(${index * 2}px)`,
                          opacity: 0.9 + (index * 0.02)
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
                             </div>
                            {participant.initiative > 0 && (
                              <span className="text-sm text-[var(--color-accent)] font-mono ml-6">
                                Initiative: {participant.initiative}
                              </span>
                            )}
                          </div>
                          {isDM && (
                            <Button
                              onClick={() => {
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
                    ))}
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
      </div>
    </div>
  );
} 