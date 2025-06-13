import { useQuery } from '@tanstack/react-query';

interface DndData {
  races: string[];
  classes: string[];
  backgrounds: string[];
  alignments: string[];
}

// Cache object
const cache: Partial<DndData> = {};

// Fetch functions
async function fetchRaces(): Promise<string[]> {
  if (cache.races) return cache.races;
  const response = await fetch('/api/races');
  const data = await response.json();
  const races = data.map((race: { name: string }) => race.name);
  cache.races = races;
  return races;
}

async function fetchClasses(): Promise<string[]> {
  if (cache.classes) return cache.classes;
  const response = await fetch('/api/classes');
  const data = await response.json();
  const classes = data.map((cls: { name: string }) => cls.name);
  cache.classes = classes;
  return classes;
}

async function fetchBackgrounds(): Promise<string[]> {
  if (cache.backgrounds) return cache.backgrounds;
  const response = await fetch('/api/backgrounds');
  const data = await response.json();
  const backgrounds = data.map((bg: { name: string }) => bg.name);
  cache.backgrounds = backgrounds;
  return backgrounds;
}

async function fetchAlignments(): Promise<string[]> {
  if (cache.alignments) return cache.alignments;
  const response = await fetch('/api/alignments');
  const data = await response.json();
  const alignments = data.map((align: { name: string }) => align.name);
  cache.alignments = alignments;
  return alignments;
}

// React Query hooks
export function useRaces() {
  return useQuery({
    queryKey: ['races'],
    queryFn: fetchRaces,
    staleTime: Infinity,
    gcTime: Infinity
  });
}

export function useClasses() {
  return useQuery({
    queryKey: ['classes'],
    queryFn: fetchClasses,
    staleTime: Infinity,
    gcTime: Infinity
  });
}

export function useBackgrounds() {
  return useQuery({
    queryKey: ['backgrounds'],
    queryFn: fetchBackgrounds,
    staleTime: Infinity,
    gcTime: Infinity
  });
}

export function useAlignments() {
  return useQuery({
    queryKey: ['alignments'],
    queryFn: fetchAlignments,
    staleTime: Infinity,
    gcTime: Infinity
  });
} 