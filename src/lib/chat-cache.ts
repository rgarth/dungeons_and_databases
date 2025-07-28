import { ChatMessage } from './pusher-chat';

interface ChatCacheEntry {
  messages: ChatMessage[];
  lastUpdated: number;
  ttl: number;
}

class ChatCache {
  private cache = new Map<string, ChatCacheEntry>();
  private readonly DEFAULT_TTL = Infinity; // Never expire - only message count limit applies
  private readonly MAX_MESSAGES = 1000; // Increased from 100 to 1000

  constructor() {
    // No cleanup interval needed since chat never expires
  }

  get(gameId: string): ChatMessage[] | null {
    const entry = this.cache.get(gameId);
    if (!entry) return null;

    // No TTL check - chat never expires, only message count limit applies
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

  destroy(): void {
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