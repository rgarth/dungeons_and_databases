import { ChatMessage } from './pusher-chat';

interface ChatCacheEntry {
  messages: ChatMessage[];
  lastUpdated: number;
  ttl: number;
}

class ChatCache {
  private cache = new Map<string, ChatCacheEntry>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes
  private readonly MAX_MESSAGES = 100;
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries every minute
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60 * 1000);
  }

  get(gameId: string): ChatMessage[] | null {
    const entry = this.cache.get(gameId);
    if (!entry) return null;

    // Check if entry has expired
    if (Date.now() - entry.lastUpdated > entry.ttl) {
      this.cache.delete(gameId);
      return null;
    }

    return entry.messages;
  }

  set(gameId: string, messages: ChatMessage[], ttl?: number): void {
    this.cache.set(gameId, {
      messages: messages.slice(-this.MAX_MESSAGES), // Keep only last MAX_MESSAGES
      lastUpdated: Date.now(),
      ttl: ttl || this.DEFAULT_TTL
    });
  }

  addMessage(gameId: string, message: ChatMessage): void {
    const entry = this.cache.get(gameId);
    if (entry) {
      entry.messages.push(message);
      // Keep only last MAX_MESSAGES
      if (entry.messages.length > this.MAX_MESSAGES) {
        entry.messages = entry.messages.slice(-this.MAX_MESSAGES);
      }
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
export const chatCache = new ChatCache();

// Graceful shutdown
process.on('SIGTERM', () => {
  chatCache.destroy();
});

process.on('SIGINT', () => {
  chatCache.destroy();
}); 