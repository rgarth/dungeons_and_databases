"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface Character {
  id: string;
  name: string;
  class: string;
  level: number;
  race: string;
  avatarUrl?: string;
}

interface JoinGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGameJoined: () => void;
}

export default function JoinGameModal({ isOpen, onClose, onGameJoined }: JoinGameModalProps) {
  const { data: session } = useSession();
  const [inviteCode, setInviteCode] = useState('');
  const [characterId, setCharacterId] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && session) {
      fetchCharacters();
    }
  }, [isOpen, session]);

  const fetchCharacters = async () => {
    try {
      const response = await fetch('/api/characters');
      if (response.ok) {
        const data = await response.json();
        setCharacters(data);
      }
    } catch (err) {
      console.error('Failed to fetch characters:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteCode.trim()) {
      setError('Invite code is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/games/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inviteCode: inviteCode.trim().toUpperCase(),
          characterId: characterId || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to join game');
      }

      onGameJoined();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setInviteCode('');
    setCharacterId('');
    setError(null);
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Join Game</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="inviteCode" className="block text-sm font-medium mb-1">
                Invite Code *
              </label>
              <input
                type="text"
                id="inviteCode"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter invite code"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="character" className="block text-sm font-medium mb-1">
                Character (Optional)
              </label>
              <select
                id="character"
                value={characterId}
                onChange={(e) => setCharacterId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="">No character (join as spectator)</option>
                {characters.map((character) => (
                  <option key={character.id} value={character.id}>
                    {character.name} - Level {character.level} {character.race} {character.class}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                You can add a character later or join as a spectator first.
              </p>
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
                              <Button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="bg-[var(--color-muted)] hover:bg-[var(--color-muted-hover)]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-[var(--color-success-text)]"
                >
                  {loading ? 'Joining...' : 'Join Game'}
                </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
} 