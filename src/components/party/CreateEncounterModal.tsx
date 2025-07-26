"use client";

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui';
import { Encounter } from '@/types/encounter';

interface CreateEncounterModalProps {
  gameId: string;
  isOpen: boolean;
  onClose: () => void;
  onEncounterCreated: (encounter: Encounter) => void;
}

export default function CreateEncounterModal({
  gameId,
  isOpen,
  onClose,
  onEncounterCreated
}: CreateEncounterModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Encounter name is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/games/${gameId}/encounters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create encounter');
      }

      const encounter = await response.json();
      onEncounterCreated(encounter);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setError(null);
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            Create New Encounter
          </h2>
          <button
            onClick={handleClose}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
              Encounter Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              placeholder="e.g., Goblin Ambush, Dragon's Lair"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              placeholder="Brief description of the encounter..."
              disabled={loading}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-md p-2">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="bg-[var(--color-surface)] hover:bg-[var(--color-border)] text-[var(--color-text-primary)]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]"
            >
              {loading ? 'Creating...' : 'Create Encounter'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 