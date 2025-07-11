"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface Game {
  id: string;
  name: string;
  description?: string;
  dm: {
    id: string;
    name?: string;
    email: string;
  };
  participants: Array<{
    id: string;
    user: {
      id: string;
      name?: string;
      email: string;
    };
    character?: {
      id: string;
      name: string;
      class: string;
      level: number;
      race: string;
      avatarUrl?: string;
    };
    isDm: boolean;
  }>;
  _count: {
    participants: number;
    chatMessages: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGameCreated: (game: Game) => void;
}

export default function CreateGameModal({ isOpen, onClose, onGameCreated }: CreateGameModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Game name is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/games', {
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
        throw new Error(errorData.error || 'Failed to create game');
      }

      const game = await response.json();
      onGameCreated(game);
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
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
      <Card className="w-full max-w-md mx-4">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Create New Game</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                Game Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--color-card-secondary)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                  '--tw-focus-ring-color': 'var(--color-accent)'
                } as React.CSSProperties}
                placeholder="Enter game name"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--color-card-secondary)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                  '--tw-focus-ring-color': 'var(--color-accent)'
                } as React.CSSProperties}
                placeholder="Optional game description"
                rows={3}
                disabled={loading}
              />
            </div>

            {error && (
              <div className="text-sm" style={{ color: 'var(--color-error)' }}>{error}</div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                onClick={handleClose}
                disabled={loading}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                variant="primary"
              >
                {loading ? 'Creating...' : 'Create Game'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
} 