"use client";

import { useState, useEffect } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui';
import { EncounterMonster } from '@/types/encounter';
import { Monster } from '@/types/monster';
import { useClientCache } from '@/hooks/use-client-cache';

interface AddMonsterModalProps {
  encounterId: string;
  isOpen: boolean;
  onClose: () => void;
  onMonsterAdded: (monster: EncounterMonster) => void;
}

export default function AddMonsterModal({
  encounterId,
  isOpen,
  onClose,
  onMonsterAdded
}: AddMonsterModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { monsters: getMonsters, isInitialized } = useClientCache();
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState<Monster[]>([]);

  useEffect(() => {
    const loadMonsters = async () => {
      if (isInitialized) {
        try {
          const monstersData = await getMonsters;
          setMonsters(monstersData);
          setFilteredMonsters(monstersData);
        } catch (error) {
          console.error('Failed to load monsters:', error);
        }
      }
    };

    loadMonsters();
  }, [isInitialized, getMonsters]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMonsters(monsters);
    } else {
      const filtered = monsters.filter(monster =>
        monster.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        monster.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        monster.challengeRating.includes(searchTerm)
      );
      setFilteredMonsters(filtered);
    }
  }, [searchTerm, monsters]);

  const handleAddMonster = async () => {
    if (!selectedMonster) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/games/encounters/${encounterId}/monsters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          monsterName: selectedMonster.name,
          monsterData: selectedMonster,
          quantity
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add monster to encounter');
      }

      const encounterMonster = await response.json();
      onMonsterAdded(encounterMonster);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSearchTerm('');
    setSelectedMonster(null);
    setQuantity(1);
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
            Add Monster to Encounter
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
            placeholder="Search monsters by name, type, or CR..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[var(--color-border)] rounded-md bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        {/* Monster Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Monster List */}
          <div className="max-h-64 overflow-y-auto border border-[var(--color-border)] rounded-md">
            {filteredMonsters.length === 0 ? (
              <div className="p-4 text-center text-[var(--color-text-secondary)]">
                No monsters found
              </div>
            ) : (
              <div className="divide-y divide-[var(--color-border)]">
                {filteredMonsters.map((monster) => (
                  <div
                    key={monster.name}
                    className={`p-3 cursor-pointer hover:bg-[var(--color-surface)] transition-colors ${
                      selectedMonster?.name === monster.name ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]' : ''
                    }`}
                    onClick={() => setSelectedMonster(monster)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{monster.name}</span>
                      <span className="text-sm">CR {monster.challengeRating}</span>
                    </div>
                    <div className="text-sm text-[var(--color-text-secondary)]">
                      {monster.type} • HP {monster.hitPoints}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Monster Details */}
          <div className="border border-[var(--color-border)] rounded-md p-4">
            {selectedMonster ? (
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  {selectedMonster.name}
                </h3>
                <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  <div><strong>Type:</strong> {selectedMonster.type}</div>
                  <div><strong>CR:</strong> {selectedMonster.challengeRating}</div>
                  <div><strong>HP:</strong> {selectedMonster.hitPoints}</div>
                  <div><strong>AC:</strong> {selectedMonster.armorClass}</div>
                  <div><strong>Size:</strong> {selectedMonster.size}</div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center text-[var(--color-text-secondary)]">
                Select a monster to see details
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
            onClick={handleAddMonster}
            disabled={!selectedMonster || loading}
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]"
          >
            <Plus className="h-4 w-4 mr-1" />
            {loading ? 'Adding...' : 'Add Monster'}
          </Button>
        </div>
      </div>
    </div>
  );
} 