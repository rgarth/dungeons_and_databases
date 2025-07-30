import { Encounter } from '@/types/encounter';

interface EncounterCacheEntry {
  encounters: Encounter[];
  lastUpdated: number;
  ttl: number;
}

class EncounterCache {
  private cache = new Map<string, EncounterCacheEntry>();
  private readonly DEFAULT_TTL = 10 * 60 * 1000; // 10 minutes (encounters change less frequently than chat)
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries every minute
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60 * 1000);
  }

  get(gameId: string): Encounter[] | null {
    const entry = this.cache.get(gameId);
    if (!entry) return null;

    // Check if entry has expired
    if (Date.now() - entry.lastUpdated > entry.ttl) {
      this.cache.delete(gameId);
      return null;
    }

    return entry.encounters;
  }

  set(gameId: string, encounters: Encounter[], ttl?: number): void {
    this.cache.set(gameId, {
      encounters,
      lastUpdated: Date.now(),
      ttl: ttl || this.DEFAULT_TTL
    });
  }

  addEncounter(gameId: string, encounter: Encounter): void {
    const entry = this.cache.get(gameId);
    if (entry) {
      entry.encounters.push(encounter);
      entry.lastUpdated = Date.now();
    }
  }

  updateEncounter(gameId: string, encounterId: string, updatedEncounter: Encounter): void {
    const entry = this.cache.get(gameId);
    if (entry) {
      const index = entry.encounters.findIndex(e => e.id === encounterId);
      if (index !== -1) {
        entry.encounters[index] = updatedEncounter;
        entry.lastUpdated = Date.now();
      }
    }
  }

  removeEncounter(gameId: string, encounterId: string): void {
    const entry = this.cache.get(gameId);
    if (entry) {
      entry.encounters = entry.encounters.filter(e => e.id !== encounterId);
      entry.lastUpdated = Date.now();
    }
  }

  invalidate(gameId: string): void {
    this.cache.delete(gameId);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [gameId, entry] of this.cache.entries()) {
      if (now - entry.lastUpdated > entry.ttl) {
        this.cache.delete(gameId);
      }
    }
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.cache.clear();
  }

  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Singleton instance
export const encounterCache = new EncounterCache();

// Graceful shutdown
process.on('SIGTERM', () => {
  encounterCache.destroy();
});

process.on('SIGINT', () => {
  encounterCache.destroy();
}); 