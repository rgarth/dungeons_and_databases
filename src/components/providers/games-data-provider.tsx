"use client";

import { createContext, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Game } from '@/types/game';

// Create context
interface GamesDataContextType {
  games: Game[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  updateGame: (gameId: string, updates: Partial<Game>) => void;
  addGame: (game: Game) => void;
  removeGame: (gameId: string) => void;
}

const GamesDataContext = createContext<GamesDataContextType | undefined>(undefined);

// Hook to use games data
export function useGamesData() {
  const context = useContext(GamesDataContext);
  if (context === undefined) {
    throw new Error('useGamesData must be used within a GamesDataProvider');
  }
  return context;
}

// Fetch games function
async function fetchGames(): Promise<Game[]> {
  const response = await fetch('/api/games');
  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }
  return response.json();
}

// Provider component
export function GamesDataProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  
  const { 
    data: games = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery<Game[]>({
    queryKey: ['games'],
    queryFn: fetchGames,
    staleTime: 30 * 1000, // 30 seconds - much more responsive
    gcTime: 5 * 60 * 1000, // 5 minutes garbage collection
    refetchOnWindowFocus: false,
    refetchOnMount: false, // Don't refetch on mount if we have cached data
  });

  // Optimistic update functions
  const updateGame = (gameId: string, updates: Partial<Game>) => {
    queryClient.setQueryData(['games'], (oldData: Game[] | undefined) => {
      if (!oldData) return oldData;
      return oldData.map(game => 
        game.id === gameId ? { ...game, ...updates } : game
      );
    });
  };

  const addGame = (game: Game) => {
    queryClient.setQueryData(['games'], (oldData: Game[] | undefined) => {
      if (!oldData) return [game];
      return [game, ...oldData];
    });
  };

  const removeGame = (gameId: string) => {
    queryClient.setQueryData(['games'], (oldData: Game[] | undefined) => {
      if (!oldData) return oldData;
      return oldData.filter(game => game.id !== gameId);
    });
  };

  return (
    <GamesDataContext.Provider value={{ 
      games, 
      isLoading, 
      error, 
      refetch,
      updateGame,
      addGame,
      removeGame
    }}>
      {children}
    </GamesDataContext.Provider>
  );
} 