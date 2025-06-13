"use client";

import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

// Create context
interface ApiResponse {
  id: string;
  name: string;
}

interface DndData {
  races: ApiResponse[];
  classes: ApiResponse[];
  backgrounds: ApiResponse[];
  alignments: ApiResponse[];
}

const DndDataContext = createContext<DndData | null>(null);

// Fetch functions
async function fetchRaces() {
  const res = await fetch('/api/races');
  if (!res.ok) throw new Error('Failed to fetch races');
  const data = await res.json() as ApiResponse[];
  return data;
}

async function fetchClasses() {
  const res = await fetch('/api/classes');
  if (!res.ok) throw new Error('Failed to fetch classes');
  const data = await res.json() as ApiResponse[];
  return data;
}

async function fetchBackgrounds() {
  const res = await fetch('/api/backgrounds');
  if (!res.ok) throw new Error('Failed to fetch backgrounds');
  const data = await res.json() as ApiResponse[];
  return data;
}

async function fetchAlignments() {
  const res = await fetch('/api/alignments');
  if (!res.ok) throw new Error('Failed to fetch alignments');
  const data = await res.json() as ApiResponse[];
  return data;
}

// Provider component
export function DndDataProvider({ children }: { children: React.ReactNode }) {
  const { data: races = [] } = useQuery<ApiResponse[]>({
    queryKey: ['races'],
    queryFn: fetchRaces,
    staleTime: Infinity,
    gcTime: Infinity
  });

  const { data: classes = [] } = useQuery<ApiResponse[]>({
    queryKey: ['classes'],
    queryFn: fetchClasses,
    staleTime: Infinity,
    gcTime: Infinity
  });

  const { data: backgrounds = [] } = useQuery<ApiResponse[]>({
    queryKey: ['backgrounds'],
    queryFn: fetchBackgrounds,
    staleTime: Infinity,
    gcTime: Infinity
  });

  const { data: alignments = [] } = useQuery<ApiResponse[]>({
    queryKey: ['alignments'],
    queryFn: fetchAlignments,
    staleTime: Infinity,
    gcTime: Infinity
  });

  return (
    <DndDataContext.Provider value={{ races, classes, backgrounds, alignments }}>
      {children}
    </DndDataContext.Provider>
  );
}

// Hook to use the context
export function useDndData() {
  const context = useContext(DndDataContext);
  if (!context) {
    throw new Error('useDndData must be used within a DndDataProvider');
  }
  return context;
} 