import { Game } from '@/types/game';

interface GameCacheEntry {
  game: Game;
  participantCount: number;
  characterCount: number;
  lastUpdated: number;
  ttl: number;
}

class GameCache {
  private cache = new Map<string, GameCacheEntry>();
  private readonly DEFAULT_TTL = 30 * 1000; // 30 seconds (longer than encounter cache for less frequent updates)
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries every minute
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60 * 1000);
  }

  get(gameId: string): GameCacheEntry | null {
    const entry = this.cache.get(gameId);
    if (!entry) return null;

    // Check if entry has expired
    if (Date.now() - entry.lastUpdated > entry.ttl) {
      this.cache.delete(gameId);
      return null;
    }

    return entry;
  }

  set(gameId: string, game: Game, participantCount: number, characterCount: number, ttl?: number): void {
    this.cache.set(gameId, {
      game,
      participantCount,
      characterCount,
      lastUpdated: Date.now(),
      ttl: ttl || this.DEFAULT_TTL
    });
  }

  updateGame(gameId: string, updates: Partial<Game>): void {
    const entry = this.cache.get(gameId);
    if (entry) {
      entry.game = { ...entry.game, ...updates };
      entry.lastUpdated = Date.now();
    }
  }

  updateStats(gameId: string, participantCount: number, characterCount: number): void {
    const entry = this.cache.get(gameId);
    if (entry) {
      entry.participantCount = participantCount;
      entry.characterCount = characterCount;
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
export const gameCache = new GameCache();

// Graceful shutdown
process.on('SIGTERM', () => {
  gameCache.destroy();
});

process.on('SIGINT', () => {
  gameCache.destroy();
}); 