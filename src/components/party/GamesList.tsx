"use client";

import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Game } from '@/types/game';
interface GamesListProps {
  games: Game[];
  isLoading: boolean;
  onGameSelect: (game: Game) => void;
  onCreateGame: () => void;
}

export default function GamesList({ games, isLoading, onGameSelect, onCreateGame }: GamesListProps) {
  const { data: session } = useSession();

  const isDM = (game: Game) => {
    return game.dm.email === session?.user?.email;
  };

  const getPlayerCount = (game: Game) => {
    return game.participants.filter(p => !p.isDm).length;
  };

  const getCharacterCount = (game: Game) => {
    return game.participants.reduce((total, p) => total + (p.characters?.length || 0), 0);
  };



  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Your Games</h2>
        </div>
        <Card className="p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
            <span className="text-lg text-[var(--color-text-secondary)]">Loading your games...</span>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            Fetching your game data from the server
          </p>
        </Card>
      </div>
    );
  }



  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Your Games</h2>
      </div>

      {games.length === 0 ? (
        <Card className="p-8 text-center">
          <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">No games yet</h3>
          <p className="text-[var(--color-text-secondary)] mb-4">
            Create a new game as a DM or join an existing game with an invite code.
          </p>
          <Button onClick={onCreateGame} className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]">
            Create Your First Game
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <Card 
              key={game.id} 
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onGameSelect(game)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold truncate text-[var(--color-text-primary)]">{game.name}</h3>
                {isDM(game) && (
                  <span className="text-xs bg-[var(--color-accent)] text-[var(--color-accent-text)] px-2 py-1 rounded">
                    DM
                  </span>
                )}
              </div>
              
              {game.description && (
                <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
                  {game.description}
                </p>
              )}
              
              <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                <div className="flex justify-between">
                  <span>Players:</span>
                  <span>{getPlayerCount(game)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Characters:</span>
                  <span>{getCharacterCount(game)}</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
                <div className="text-xs text-[var(--color-text-tertiary)]">
                  Last updated: {new Date(game.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 