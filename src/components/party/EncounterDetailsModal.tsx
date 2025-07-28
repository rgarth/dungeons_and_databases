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
  const [showAddMonster, setShowAddMonster] = useState(false);
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [showInitiativeRoller, setShowInitiativeRoller] = useState(false);

  useEffect(() => {
    setCurrentEncounter(encounter);
    setName(encounter.name);
    setDescription(encounter.description || '');
  }, [encounter]);

  const handleSave = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this encounter? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  const handleToggleActive = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: currentEncounter.name,
          description: currentEncounter.description,
          isActive: !currentEncounter.isActive
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
      setLoading(false);
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
      setLoading(true);
      
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
      setLoading(false);
    }
  };

  const characterCount = currentEncounter.participants.length;
  const monsterCount = currentEncounter.monsters.reduce((total, monster) => total + monster.quantity, 0);

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
                disabled={loading}
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
                  disabled={loading}
                  className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]"
                >
                  <Save className="h-4 w-4 mr-1" />
                  {loading ? 'Saving...' : 'Save'}
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
              onClick={() => setShowInitiativeRoller(true)}
              className="bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-[var(--color-success-text)]"
            >
              <Dice1 className="h-4 w-4 mr-1" />
              Roll Initiative
            </Button>
          )}
          {isDM && (
            <Button
              onClick={handleToggleActive}
              disabled={loading}
              className={`${
                currentEncounter.isActive
                  ? 'bg-[var(--color-warning)] hover:bg-[var(--color-warning-hover)] text-[var(--color-warning-text)]'
                  : 'bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-[var(--color-success-text)]'
              }`}
            >
              {loading ? 'Updating...' : currentEncounter.isActive ? 'Deactivate' : (
                <>
                  <Sword className="h-4 w-4 mr-1" />
                  Start
                </>
              )}
            </Button>
          )}
          {isDM && (
            <Button
              onClick={handleDelete}
              disabled={loading}
              className="bg-[var(--color-danger)] hover:bg-[var(--color-danger-hover)] text-[var(--color-danger-text)]"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          )}
        </div>

        {/* Participants and Monsters */}
        <div className="space-y-6">
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