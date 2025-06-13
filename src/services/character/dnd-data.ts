import { useQuery } from '@tanstack/react-query';

interface DndData {
  races: string[];
  classes: string[];
  backgrounds: string[];
  alignments: string[];
}

class DndDataService {
  private static instance: DndDataService;
  private cache: Partial<DndData> = {};

  private constructor() {}

  static getInstance(): DndDataService {
    if (!DndDataService.instance) {
      DndDataService.instance = new DndDataService();
    }
    return DndDataService.instance;
  }

  async fetchRaces(): Promise<string[]> {
    if (this.cache.races) return this.cache.races;
    const response = await fetch('/api/races');
    const data = await response.json();
    const races = data.map((race: { name: string }) => race.name);
    this.cache.races = races;
    return races;
  }

  async fetchClasses(): Promise<string[]> {
    if (this.cache.classes) return this.cache.classes;
    const response = await fetch('/api/classes');
    const data = await response.json();
    const classes = data.map((cls: { name: string }) => cls.name);
    this.cache.classes = classes;
    return classes;
  }

  async fetchBackgrounds(): Promise<string[]> {
    if (this.cache.backgrounds) return this.cache.backgrounds;
    const response = await fetch('/api/backgrounds');
    const data = await response.json();
    const backgrounds = data.map((bg: { name: string }) => bg.name);
    this.cache.backgrounds = backgrounds;
    return backgrounds;
  }

  async fetchAlignments(): Promise<string[]> {
    if (this.cache.alignments) return this.cache.alignments;
    const response = await fetch('/api/alignments');
    const data = await response.json();
    const alignments = data.map((align: { name: string }) => align.name);
    this.cache.alignments = alignments;
    return alignments;
  }

  // React Query hooks
  useRaces() {
    return useQuery({
      queryKey: ['races'],
      queryFn: () => this.fetchRaces(),
      staleTime: Infinity, // This data never goes stale
      cacheTime: Infinity // Keep in cache forever
    });
  }

  useClasses() {
    return useQuery({
      queryKey: ['classes'],
      queryFn: () => this.fetchClasses(),
      staleTime: Infinity,
      cacheTime: Infinity
    });
  }

  useBackgrounds() {
    return useQuery({
      queryKey: ['backgrounds'],
      queryFn: () => this.fetchBackgrounds(),
      staleTime: Infinity,
      cacheTime: Infinity
    });
  }

  useAlignments() {
    return useQuery({
      queryKey: ['alignments'],
      queryFn: () => this.fetchAlignments(),
      staleTime: Infinity,
      cacheTime: Infinity
    });
  }
}

export const dndDataService = DndDataService.getInstance(); 