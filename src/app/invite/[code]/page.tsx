"use client";

import { useState, useEffect, use } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Users, MessageSquare, Calendar, User } from 'lucide-react';

import { Game } from '@/types/game';

interface Character {
  id: string;
  name: string;
  class: string;
  level: number;
  race: string;
  avatarUrl?: string;
}

interface InvitePageProps {
  params: Promise<{
    code: string;
  }>;
}

export default function InvitePage({ params }: InvitePageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [game, setGame] = useState<Game | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Unwrap params for Next.js 15 compatibility
  const unwrappedParams = use(params);
  const inviteCode = unwrappedParams.code;

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      // Redirect to sign in with return URL
      router.push(`/api/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`);
      return;
    }

    fetchGameDetails();
    fetchCharacters();
  }, [session, status, inviteCode]);

  const fetchGameDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/games/invite/${inviteCode}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Invalid invite code. Please check the URL and try again.');
        } else {
          setError('Failed to load game details.');
        }
        return;
      }
      
      const gameData = await response.json();
      setGame(gameData);
    } catch {
      setError('Failed to load game details.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCharacters = async () => {
    try {
      const response = await fetch('/api/characters');
      if (response.ok) {
        const data = await response.json();
        setCharacters(data);
      }
    } catch {
      // Silently handle character fetch errors
    }
  };

  const handleJoinGame = async () => {
    if (!game) return;

    try {
      setJoining(true);
      setError(null);

      const response = await fetch('/api/games/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inviteCode: inviteCode.toUpperCase(),
          characterId: selectedCharacterId || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to join game');
      }

      // Redirect to the party page and open the game modal
      router.push(`/party?openGame=${game.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setJoining(false);
    }
  };

  const isAlreadyParticipant = () => {
    if (!game || !session?.user?.email) return false;
    return game.participants.some(p => p.user.email === session.user!.email);
  };

  const getPlayerCount = () => {
    return game?.participants.filter(p => !p.isDm).length || 0;
  };

  const getCharacterCount = () => {
    return game?.participants.reduce((total, p) => total + p.characters.length, 0) || 0;
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--color-accent)' }}></div>
          <div style={{ color: 'var(--color-text-secondary)' }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--color-accent)' }}></div>
          <div style={{ color: 'var(--color-text-secondary)' }}>Loading game details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <div className="p-6 text-center">
            <div className="text-lg mb-4" style={{ color: 'var(--color-error)' }}>⚠️</div>
            <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Invalid Invite</h1>
            <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>{error}</p>
            <Button onClick={() => router.push('/party')} variant="primary">
              Back to Party
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!game) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            You&apos;re invited to join
          </h1>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-accent)' }}>
            {game.name}
          </h2>
          {game.description && (
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
              {game.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Game Details */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Game Details
            </h3>
            
            {/* Game Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                <Users className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                <div>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Players</div>
                  <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{getPlayerCount()}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                <User className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                <div>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Characters</div>
                  <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{getCharacterCount()}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                <MessageSquare className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                <div>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Messages</div>
                  <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{game._count.chatMessages}</div>
                </div>
              </div>
            </div>

            {/* DM Info */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Dungeon Master</h4>
              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-text)' }}>
                  {game.dm.name?.[0] || game.dm.email[0].toUpperCase()}
                </div>
                <div>
                  <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {game.dm.name || game.dm.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Game Info */}
            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-3 w-3" />
                Created: {new Date(game.createdAt).toLocaleDateString()}
              </div>
            </div>
          </Card>

          {/* Join Form */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Join the Adventure
            </h3>

            {isAlreadyParticipant() ? (
              <div className="text-center py-8">
                <div className="text-lg mb-4" style={{ color: 'var(--color-success)' }}>✅</div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                  You&apos;re already in this game!
                </h4>
                <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  You can access this game from your party page.
                </p>
                <Button onClick={() => router.push('/party')} variant="primary">
                  Go to Party
                </Button>
              </div>
            ) : (
              <>
                {/* Character Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Select Character (Optional)
                  </label>
                  <select
                    value={selectedCharacterId}
                    onChange={(e) => setSelectedCharacterId(e.target.value)}
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: 'var(--color-card-secondary)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      '--tw-focus-ring-color': 'var(--color-accent)'
                    } as React.CSSProperties}
                  >
                    <option value="">No character (join as spectator)</option>
                    {characters.map((character) => (
                      <option key={character.id} value={character.id}>
                        {character.name} - Level {character.level} {character.race} {character.class}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    You can add a character later or join as a spectator first.
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--color-error-bg)', color: 'var(--color-error)' }}>
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleJoinGame}
                  disabled={joining}
                  variant="primary"
                  className="w-full"
                  size="lg"
                >
                  {joining ? 'Joining...' : 'Join Game'}
                </Button>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
} 