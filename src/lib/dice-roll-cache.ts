import { DiceRollLogEntry } from '@/types/encounter';

interface DiceRollCache {
  [encounterId: string]: {
    rolls: DiceRollLogEntry[];
    lastUpdated: number;
  };
}

class DiceRollHistoryCache {
  private cache: DiceRollCache = {};
  private readonly MAX_ROLLS_PER_ENCOUNTER = 50; // Keep last 50 rolls per encounter
  private readonly CACHE_KEY = 'dice-roll-history';

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      // Only access localStorage on the client side
      if (typeof window === 'undefined') {
        return;
      }
      
      const stored = localStorage.getItem(this.CACHE_KEY);
      if (stored) {
        this.cache = JSON.parse(stored);
        // Clean up old entries (older than 24 hours)
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        Object.keys(this.cache).forEach(encounterId => {
          if (now - this.cache[encounterId].lastUpdated > oneDay) {
            delete this.cache[encounterId];
          }
        });
      }
    } catch (error) {
      console.warn('Failed to load dice roll history from storage:', error);
      this.cache = {};
    }
  }

  private saveToStorage(): void {
    try {
      // Only access localStorage on the client side
      if (typeof window === 'undefined') {
        return;
      }
      
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(this.cache));
    } catch (error) {
      console.warn('Failed to save dice roll history to storage:', error);
    }
  }

  getRolls(encounterId: string): DiceRollLogEntry[] {
    const rolls = this.cache[encounterId]?.rolls || [];
    // Sort by timestamp, newest first
    return rolls.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  addRoll(encounterId: string, roll: DiceRollLogEntry): void {
    if (!this.cache[encounterId]) {
      this.cache[encounterId] = { rolls: [], lastUpdated: Date.now() };
    }

    // Check if this roll already exists to prevent duplicates
    const existingRollIndex = this.cache[encounterId].rolls.findIndex(r => r.id === roll.id);
    if (existingRollIndex !== -1) {
      console.log('🎲 Roll already exists in cache, skipping duplicate:', roll.id);
      return;
    }

    this.cache[encounterId].rolls.push(roll);
    this.cache[encounterId].lastUpdated = Date.now();

    // Keep only the most recent rolls
    if (this.cache[encounterId].rolls.length > this.MAX_ROLLS_PER_ENCOUNTER) {
      this.cache[encounterId].rolls = this.cache[encounterId].rolls.slice(-this.MAX_ROLLS_PER_ENCOUNTER);
    }

    this.saveToStorage();
  }

  clearRolls(encounterId: string): void {
    if (this.cache[encounterId]) {
      this.cache[encounterId].rolls = [];
      this.cache[encounterId].lastUpdated = Date.now();
      this.saveToStorage();
    }
  }

  // Get all rolls (useful for switching between encounters)
  getAllRolls(): DiceRollLogEntry[] {
    const allRolls: DiceRollLogEntry[] = [];
    Object.values(this.cache).forEach(encounterCache => {
      allRolls.push(...encounterCache.rolls);
    });
    return allRolls.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }
}

// Singleton instance
export const diceRollCache = new DiceRollHistoryCache(); 