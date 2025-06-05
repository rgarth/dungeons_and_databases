// IndexedDB cache for persistent image storage
const DB_NAME = 'dd_avatar_cache';
const DB_VERSION = 1;
const STORE_NAME = 'images';

interface ImageCacheDB {
  filename: string;
  blob: Blob;
  timestamp: number;
}

class IndexedDBImageCache {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    if (this.db) return;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'filename' });
          store.createIndex('timestamp', 'timestamp');
        }
      };
    });
  }

  async storeImage(filename: string, blob: Blob): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const imageData: ImageCacheDB = {
        filename,
        blob,
        timestamp: Date.now()
      };

      const request = store.put(imageData);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getImage(filename: string): Promise<Blob | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(filename);

      request.onsuccess = () => {
        const result = request.result as ImageCacheDB | undefined;
        
        // Check if image is older than 30 days
        if (result && (Date.now() - result.timestamp) < (30 * 24 * 60 * 60 * 1000)) {
          resolve(result.blob);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  async hasImage(filename: string): Promise<boolean> {
    const blob = await this.getImage(filename);
    return blob !== null;
  }

  async clearCache(): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getCacheSize(): Promise<{ count: number; sizeEstimate: string }> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const results = request.result as ImageCacheDB[];
        const totalSize = results.reduce((sum, item) => sum + item.blob.size, 0);
        const sizeMB = (totalSize / (1024 * 1024)).toFixed(1);
        
        resolve({
          count: results.length,
          sizeEstimate: `${sizeMB}MB`
        });
      };
      request.onerror = () => reject(request.error);
    });
  }
}

export const imageCache = new IndexedDBImageCache(); 