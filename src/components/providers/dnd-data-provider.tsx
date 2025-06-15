"use client";

import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

// Create context
interface BackgroundData {
  name: string;
  description: string;
  skillProficiencies: string[];
  languages: string[];
  equipment: string[];
  feature: string;
  featureDescription: string;
  suggestedCharacteristics?: {
    personalityTraits: string[];
    ideals: string[];
    bonds: string[];
    flaws: string[];
  };
}

interface DndData {
  races: { id: string; name: string }[];
  classes: { id: string; name: string }[];
  backgrounds: BackgroundData[];
  alignments: { id: string; name: string }[];
}

const DndDataContext = createContext<DndData | null>(null);

// Fetch functions
async function fetchRaces() {
  const res = await fetch('/api/races');
  if (!res.ok) throw new Error('Failed to fetch races');
  const data = await res.json();
  return data;
}

async function fetchClasses() {
  const res = await fetch('/api/classes');
  if (!res.ok) throw new Error('Failed to fetch classes');
  const data = await res.json();
  return data;
}

async function fetchBackgrounds() {
  const res = await fetch('/api/backgrounds');
  if (!res.ok) throw new Error('Failed to fetch backgrounds');
  const data = await res.json();
  return data;
}

async function fetchAlignments() {
  const res = await fetch('/api/alignments');
  if (!res.ok) throw new Error('Failed to fetch alignments');
  const data = await res.json();
  return data;
}

// Provider component
export function DndDataProvider({ children }: { children: React.ReactNode }) {
  const { data: races = [] } = useQuery<{ id: string; name: string }[]>({
    queryKey: ['races'],
    queryFn: fetchRaces,
    staleTime: Infinity,
    gcTime: Infinity
  });

  const { data: classes = [] } = useQuery<{ id: string; name: string }[]>({
    queryKey: ['classes'],
    queryFn: fetchClasses,
    staleTime: Infinity,
    gcTime: Infinity
  });

  const { data: backgrounds = [] } = useQuery<BackgroundData[]>({
    queryKey: ['backgrounds'],
    queryFn: fetchBackgrounds,
    staleTime: Infinity,
    gcTime: Infinity
  });

  const { data: alignments = [] } = useQuery<{ id: string; name: string }[]>({
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