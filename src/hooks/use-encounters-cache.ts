import { useState, useEffect, useCallback } from 'react';
import { Encounter } from '@/types/encounter';

interface UseEncountersCacheOptions {
  gameId: string;
  onEncounterCreated?: (encounter: Encounter) => void;
  onEncounterUpdated?: (encounter: Encounter) => void;
  onEncounterDeleted?: (encounterId: string) => void;
}

interface CacheEntry {
  encounters: Encounter[];
  lastFetched: number;
  ttl: number;
}

// Client-side cache for encounters
const clientCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function useEncountersCache({
  gameId,
  onEncounterCreated,
  onEncounterUpdated,
  onEncounterDeleted
}: UseEncountersCacheOptions) {
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEncounters = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first (unless forcing refresh)
      if (!forceRefresh) {
        const cached = clientCache.get(gameId);
        if (cached && Date.now() - cached.lastFetched < cached.ttl) {
          console.log('📋 Using cached encounters for game:', gameId);
          setEncounters(cached.encounters);
          setLoading(false);
          return;
        }
      }

      console.log('📋 Fetching encounters from API for game:', gameId);
      const response = await fetch(`/api/games/${gameId}/encounters`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch encounters: ${response.status}`);
      }

      const data = await response.json();
      
      // Update cache
      clientCache.set(gameId, {
        encounters: data,
        lastFetched: Date.now(),
        ttl: CACHE_TTL
      });

      setEncounters(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch encounters';
      console.error('Error fetching encounters:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [gameId]);

  // Initial load
  useEffect(() => {
    fetchEncounters();
  }, [fetchEncounters]);

  // Cache invalidation handlers
  const invalidateCache = useCallback(() => {
    console.log('📋 Invalidating encounter cache for game:', gameId);
    clientCache.delete(gameId);
  }, [gameId]);

  const updateCache = useCallback((updatedEncounter: Encounter) => {
    const cached = clientCache.get(gameId);
    if (cached) {
      const index = cached.encounters.findIndex(e => e.id === updatedEncounter.id);
      if (index !== -1) {
        cached.encounters[index] = updatedEncounter;
        cached.lastFetched = Date.now();
      }
    }
  }, [gameId]);

  const addToCache = useCallback((newEncounter: Encounter) => {
    const cached = clientCache.get(gameId);
    if (cached) {
      cached.encounters.unshift(newEncounter); // Add to beginning
      cached.lastFetched = Date.now();
    }
  }, [gameId]);

  const removeFromCache = useCallback((encounterId: string) => {
    const cached = clientCache.get(gameId);
    if (cached) {
      cached.encounters = cached.encounters.filter(e => e.id !== encounterId);
      cached.lastFetched = Date.now();
    }
  }, [gameId]);

  // Event handlers that update cache
  const handleEncounterCreated = useCallback((encounter: Encounter) => {
    addToCache(encounter);
    setEncounters(prev => [encounter, ...prev]);
    onEncounterCreated?.(encounter);
  }, [addToCache, onEncounterCreated]);

  const handleEncounterUpdated = useCallback((updatedEncounter: Encounter) => {
    updateCache(updatedEncounter);
    setEncounters(prev => 
      prev.map(enc => enc.id === updatedEncounter.id ? updatedEncounter : enc)
    );
    onEncounterUpdated?.(updatedEncounter);
  }, [updateCache, onEncounterUpdated]);

  const handleEncounterDeleted = useCallback((encounterId: string) => {
    removeFromCache(encounterId);
    setEncounters(prev => prev.filter(enc => enc.id !== encounterId));
    onEncounterDeleted?.(encounterId);
  }, [removeFromCache, onEncounterDeleted]);

  return {
    encounters,
    loading,
    error,
    fetchEncounters,
    invalidateCache,
    handleEncounterCreated,
    handleEncounterUpdated,
    handleEncounterDeleted
  };
} 