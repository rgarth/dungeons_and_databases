"use client";

import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Monster } from '@/types/monster';

// Create context
interface MonstersDataContextType {
  monsters: Monster[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const MonstersDataContext = createContext<MonstersDataContextType | undefined>(undefined);

// Hook to use monsters data
export function useMonstersData() {
  const context = useContext(MonstersDataContext);
  if (context === undefined) {
    throw new Error('useMonstersData must be used within a MonstersDataProvider');
  }
  return context;
}

// Fetch monsters function
async function fetchMonsters(): Promise<Monster[]> {
  const response = await fetch('/api/monsters');
  if (!response.ok) {
    throw new Error('Failed to fetch monsters');
  }
  return response.json();
}

// Provider component
export function MonstersDataProvider({ children }: { children: React.ReactNode }) {
  const { 
    data: monsters = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery<Monster[]>({
    queryKey: ['monsters'],
    queryFn: fetchMonsters,
    staleTime: Infinity, // Never stale - monsters don't change
    gcTime: Infinity, // Never garbage collect
    refetchOnWindowFocus: false,
    refetchOnMount: false, // Don't refetch on mount if we have cached data
  });

  return (
    <MonstersDataContext.Provider value={{ 
      monsters, 
      isLoading, 
      error, 
      refetch
    }}>
      {children}
    </MonstersDataContext.Provider>
  );
} 