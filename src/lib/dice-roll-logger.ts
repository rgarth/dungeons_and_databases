import { DiceRollLogEntry } from '@/types/encounter';
import { diceRollCache } from './dice-roll-cache';

interface CachedSession {
  userName: string;
  userId: string;
  gameId?: string;
  isDM?: boolean;
  lastUpdated: number;
}

class DiceRollLogger {
  private sessionCache: CachedSession | null = null;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  private isCacheValid(): boolean {
    if (!this.sessionCache) return false;
    return Date.now() - this.sessionCache.lastUpdated < this.CACHE_TTL;
  }

  private async getCachedSession(): Promise<CachedSession | null> {
    if (this.isCacheValid()) {
      return this.sessionCache;
    }

    try {
      // Get user session
      const sessionResponse = await fetch('/api/auth/session');
      if (!sessionResponse.ok) {
        console.warn('🎲 Failed to get session for dice roll logging');
        return null;
      }

      const session = await sessionResponse.json();
      const userName = session?.user?.name || 'Unknown Player';
      const userId = session?.user?.id;

      if (!userId) {
        console.warn('🎲 No user ID in session for dice roll logging');
        return null;
      }

      // Get game ID from client cache
      let gameId: string | undefined;
      let isDM = false;

      try {
        const { clientCache } = await import('@/lib/client-cache');
        const games = clientCache.getGames();
        
        if (games.length > 0) {
          gameId = games[0].id;
          
          // Check if user is DM for this game
          try {
            const gameResponse = await fetch(`/api/games/${gameId}`);
            if (gameResponse.ok) {
              const game = await gameResponse.json();
              isDM = game.dmId === userId;
            }
          } catch (error) {
            console.warn('🎲 Failed to check DM status:', error);
          }
        }
      } catch (error) {
        console.warn('🎲 Failed to get games from cache:', error);
      }

      this.sessionCache = {
        userName,
        userId,
        gameId,
        isDM,
        lastUpdated: Date.now()
      };

      return this.sessionCache;
    } catch (error) {
      console.warn('🎲 Error getting cached session:', error);
      return null;
    }
  }

  async logDiceRoll(notation: string, result: string): Promise<void> {
    try {
      const session = await this.getCachedSession();
      if (!session?.gameId) {
        console.log('🎲 No active game found for dice roll logging');
        return;
      }

      // Get active encounter
      const encountersResponse = await fetch(`/api/games/${session.gameId}/encounters`);
      if (!encountersResponse.ok) {
        console.warn('🎲 Failed to fetch encounters for dice roll logging');
        return;
      }

      const encounters = await encountersResponse.json();
      const activeEncounter = encounters.find((enc: { isActive: boolean }) => enc.isActive);
      
      if (!activeEncounter) {
        console.log('🎲 No active encounter found - dice roll not logged');
        return;
      }

      // Create log entry
      const logEntry: DiceRollLogEntry = {
        id: `roll-${Date.now()}`,
        timestamp: new Date().toISOString(),
        playerName: session.userName,
        playerId: session.userId,
        notation,
        result,
        isDM: session.isDM || false,
        isHidden: session.isDM || false // DM rolls are hidden by default
      };

      // Add to client-side cache immediately
      diceRollCache.addRoll(activeEncounter.id, logEntry);

      // Broadcast the dice roll (non-blocking)
      fetch(`/api/games/${session.gameId}/dice-rolls`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          encounterId: activeEncounter.id,
          logEntry
        })
      }).then(response => {
        if (response.ok) {
          console.log('🎲 Dice roll broadcast successfully:', logEntry);
        } else {
          console.warn('🎲 Failed to broadcast dice roll:', response.status);
        }
      }).catch(error => {
        console.warn('🎲 Error broadcasting dice roll:', error);
      });

    } catch (error) {
      console.warn('🎲 Error in dice roll logging:', error);
    }
  }

  // Clear cache when user changes
  clearCache(): void {
    this.sessionCache = null;
  }
}

// Singleton instance
export const diceRollLogger = new DiceRollLogger(); 