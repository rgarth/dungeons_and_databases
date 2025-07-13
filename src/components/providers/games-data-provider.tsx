"use client";

import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Game } from '@/types/game';

// Create context
interface GamesData {
  games: Game[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const GamesDataContext = createContext<GamesData | null>(null);

// Fetch function
async function fetchGames(): Promise<Game[]> {
  const res = await fetch('/api/games');
  if (!res.ok) throw new Error('Failed to fetch games');
  const data = await res.json();
  return data;
}

// Provider component
export function GamesDataProvider({ children }: { children: React.ReactNode }) {
  const { 
    data: games = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery<Game[]>({
    queryKey: ['games'],
    queryFn: fetchGames,
    staleTime: 30000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return (
    <GamesDataContext.Provider value={{ games, isLoading, error, refetch }}>
      {children}
    </GamesDataContext.Provider>
  );
}

// Hook to use the context
export function useGamesData() {
  const context = useContext(GamesDataContext);
  if (!context) {
    throw new Error('useGamesData must be used within a GamesDataProvider');
  }
  return context;
} 