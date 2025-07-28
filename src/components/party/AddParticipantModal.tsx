"use client";

import { useState, useEffect, useCallback } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui';
import { EncounterParticipant } from '@/types/encounter';
import { Character } from '@/types/character';

interface AddParticipantModalProps {
  encounterId: string;
  gameId: string;
  isOpen: boolean;
  onClose: () => void;
  onParticipantAdded: (participant: EncounterParticipant) => void;
}

export default function AddParticipantModal({
  encounterId,
  gameId,
  isOpen,
  onClose,
  onParticipantAdded
}: AddParticipantModalProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = useCallback(async () => {
    try {
      console.log('🔍 DEBUG: Fetching characters for game:', gameId);
      const response = await fetch(`/api/characters?gameId=${gameId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('🔍 DEBUG: Characters fetched:', data);
        setCharacters(data);
        setFilteredCharacters(data);
      }
    } catch (error) {
      console.error('Failed to fetch characters:', error);
    }
  }, [gameId]);

  useEffect(() => {
    if (isOpen) {
      fetchCharacters();
    }
  }, [isOpen, fetchCharacters]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCharacters(characters);
    } else {
      const filtered = characters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.race.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCharacters(filtered);
    }
  }, [searchTerm, characters]);



  const handleAddParticipant = async () => {
    if (!selectedCharacter) return;

    try {
      setLoading(true);
      setError(null);





      // Debug: Log the character data being sent
      console.log('🔍 DEBUG: Character data being sent to encounter:', selectedCharacter);
      console.log('🔍 DEBUG: Dexterity value:', selectedCharacter.dexterity, 'type:', typeof selectedCharacter.dexterity);
      console.log('🔍 DEBUG: All ability scores:', {
        strength: selectedCharacter.strength,
        dexterity: selectedCharacter.dexterity,
        constitution: selectedCharacter.constitution,
        intelligence: selectedCharacter.intelligence,
        wisdom: selectedCharacter.wisdom,
        charisma: selectedCharacter.charisma
      });

      const response = await fetch(`/api/games/${gameId}/encounters/${encounterId}/participants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterId: selectedCharacter.id,
          characterName: selectedCharacter.name,
          characterData: selectedCharacter
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add character to encounter');
      }

      const encounterParticipant = await response.json();
      onParticipantAdded(encounterParticipant);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSearchTerm('');
    setSelectedCharacter(null);
    setError(null);
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            Add Character to Encounter
          </h2>
          <button
            onClick={handleClose}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)] h-4 w-4" />
          <input
            type="text"
            placeholder="Search characters by name, class, or race..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[var(--color-border)] rounded-md bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        {/* Character Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Character List */}
          <div className="max-h-64 overflow-y-auto border border-[var(--color-border)] rounded-md">
            {filteredCharacters.length === 0 ? (
              <div className="p-4 text-center text-[var(--color-text-secondary)]">
                No characters found
              </div>
            ) : (
              <div className="divide-y divide-[var(--color-border)]">
                {filteredCharacters.map((character) => (
                  <div
                    key={character.id}
                    className={`p-3 cursor-pointer hover:bg-[var(--color-surface)] transition-colors ${
                      selectedCharacter?.id === character.id ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]' : ''
                    }`}
                    onClick={() => setSelectedCharacter(character)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{character.name}</span>
                      <span className="text-sm">Level {character.level}</span>
                    </div>
                    <div className="text-sm text-[var(--color-text-secondary)]">
                      {character.race} {character.class}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Character Details */}
          <div className="border border-[var(--color-border)] rounded-md p-4">
            {selectedCharacter ? (
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  {selectedCharacter.name}
                </h3>
                <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  <div><strong>Race:</strong> {selectedCharacter.race}</div>
                  <div><strong>Class:</strong> {selectedCharacter.class}</div>
                  <div><strong>Level:</strong> {selectedCharacter.level}</div>
                  <div><strong>HP:</strong> {selectedCharacter.hitPoints}/{selectedCharacter.maxHitPoints}</div>
                  <div><strong>AC:</strong> {selectedCharacter.armorClass}</div>
                </div>
              </div>
            ) : (
              <div className="text-center text-[var(--color-text-secondary)]">
                Select a character to see details
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm bg-red-50 border border-red-200 rounded-md p-2">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <Button
            onClick={handleClose}
            disabled={loading}
            className="bg-[var(--color-surface)] hover:bg-[var(--color-border)] text-[var(--color-text-primary)]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddParticipant}
            disabled={!selectedCharacter || loading}
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]"
          >
            <Plus className="h-4 w-4 mr-1" />
            {loading ? 'Adding...' : 'Add Character'}
          </Button>
        </div>
      </div>
    </div>
  );
} 