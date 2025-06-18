import { useQuery } from '@tanstack/react-query';

interface DndData {
  races: { id: string; name: string }[];
  classes: { id: string; name: string }[];
  backgrounds: { id: string; name: string; description: string }[];
  alignments: { id: string; name: string }[];
}

// Cache object
const cache: Partial<DndData> = {};

// Fetch functions
async function fetchRaces(): Promise<{ id: string; name: string }[]> {
  if (cache.races) return cache.races;
  const response = await fetch('/api/races');
  const data = await response.json();
  cache.races = data;
  return data;
}

async function fetchClasses(): Promise<{ id: string; name: string }[]> {
  if (cache.classes) return cache.classes;
  const response = await fetch('/api/classes');
  const data = await response.json();
  cache.classes = data;
  return data;
}

async function fetchBackgrounds(): Promise<{ id: string; name: string; description: string }[]> {
  if (cache.backgrounds) return cache.backgrounds;
  const response = await fetch('/api/backgrounds');
  const data = await response.json();
  cache.backgrounds = data;
  return data;
}

async function fetchAlignments(): Promise<{ id: string; name: string }[]> {
  if (cache.alignments) return cache.alignments;
  const response = await fetch('/api/alignments');
  const data = await response.json();
  cache.alignments = data;
  return data;
}

export function useDndData() {
  const { data: races, isLoading: isLoadingRaces } = useQuery({
    queryKey: ['races'],
    queryFn: fetchRaces
  });

  const { data: classes, isLoading: isLoadingClasses } = useQuery({
    queryKey: ['classes'],
    queryFn: fetchClasses
  });

  const { data: backgrounds, isLoading: isLoadingBackgrounds } = useQuery({
    queryKey: ['backgrounds'],
    queryFn: fetchBackgrounds
  });

  const { data: alignments, isLoading: isLoadingAlignments } = useQuery({
    queryKey: ['alignments'],
    queryFn: fetchAlignments
  });

  return {
    data: {
      races: races || [],
      classes: classes || [],
      backgrounds: backgrounds || [],
      alignments: alignments || []
    },
    isLoading: isLoadingRaces || isLoadingClasses || isLoadingBackgrounds || isLoadingAlignments
  };
} 