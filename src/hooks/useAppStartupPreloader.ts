import { useEffect, useState } from 'react';
import { imageCache } from './useIndexedDBImageCache';

interface AvatarData {
  avatars: Array<{
    filename: string;
    race: string;
    class: string;
    gender: string;
    displayName: string;
    avatarNumber: number | null;
  }>;
  races: string[];
  classes: string[];
  genders: string[];
}

// Cache keys for persistent storage (bump version to clear old TEMP race data)
const AVATAR_DATA_CACHE_KEY = 'dd_avatar_data_v2';
const AVATAR_CACHE_TIMESTAMP_KEY = 'dd_avatar_cache_timestamp_v2';


// 30 days cache (images rarely change)
const CACHE_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000;

// Global in-memory cache for images (survives until page reload)
const globalImageCache = new Map<string, HTMLImageElement>();

// Global state for preloading progress
let globalPreloadState = {
  isPreloading: false,
  progress: { loaded: 0, total: 0 },
  completed: false
};

export function useAppStartupPreloader() {
  const [preloadProgress, setPreloadProgress] = useState(globalPreloadState.progress);
  const [isPreloading, setIsPreloading] = useState(globalPreloadState.isPreloading);
  const [preloadCompleted, setPreloadCompleted] = useState(globalPreloadState.completed);

  // Check if cache is valid
  const isCacheValid = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    const timestamp = localStorage.getItem(AVATAR_CACHE_TIMESTAMP_KEY);
    const cachedData = localStorage.getItem(AVATAR_DATA_CACHE_KEY);
    
    if (!timestamp || !cachedData) return false;
    
    const age = Date.now() - parseInt(timestamp);
    return age < CACHE_EXPIRY_MS;
  };

  // Get cached avatar data
  const getCachedAvatarData = (): AvatarData | null => {
    if (!isCacheValid()) return null;
    
    try {
      const cached = localStorage.getItem(AVATAR_DATA_CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  };

  // Cache avatar data with timestamp
  const cacheAvatarData = (data: AvatarData) => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(AVATAR_DATA_CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(AVATAR_CACHE_TIMESTAMP_KEY, Date.now().toString());
  };

  // Note: Removed localStorage filename tracking to avoid confusion
  // Only rely on actual IndexedDB storage and memory cache

  // Check if image is already preloaded (only in memory)
  const isImagePreloaded = (filename: string): boolean => {
    return globalImageCache.has(filename);
  };

  // Check if image exists in IndexedDB
  const isImageInIndexedDB = async (filename: string): Promise<boolean> => {
    try {
      return await imageCache.hasImage(filename);
    } catch {
      return false;
    }
  };

  // Preload all avatar images
  const preloadAvatarImages = async (avatarData: AvatarData) => {
    // Don't start if already preloading or completed
    if (globalPreloadState.isPreloading || globalPreloadState.completed) {
      return;
    }

    console.log('🎨 Starting app-wide avatar preloading...');
    
    globalPreloadState.isPreloading = true;
    globalPreloadState.progress = { loaded: 0, total: avatarData.avatars.length };
    
    setIsPreloading(true);
    setPreloadProgress(globalPreloadState.progress);

    // Check which images need to be loaded (not in memory or IndexedDB)
    const imagesToLoad = [];
    for (const avatar of avatarData.avatars) {
      const inMemory = isImagePreloaded(avatar.filename);
      const inIndexedDB = await isImageInIndexedDB(avatar.filename);
      
      if (!inMemory && !inIndexedDB) {
        imagesToLoad.push(avatar);
              } else if (!inMemory && inIndexedDB) {
          // Load from IndexedDB to memory
          try {
            const blob = await imageCache.getImage(avatar.filename);
            if (blob) {
              const img = new Image();
              img.src = URL.createObjectURL(blob);
              globalImageCache.set(avatar.filename, img);
            }
          } catch (error) {
            console.warn(`Failed to load ${avatar.filename} from IndexedDB:`, error);
            imagesToLoad.push(avatar);
          }
        }
    }

    console.log(`📊 Need to load ${imagesToLoad.length} of ${avatarData.avatars.length} images`);

    if (imagesToLoad.length === 0) {
      globalPreloadState.completed = true;
      globalPreloadState.isPreloading = false;
      setPreloadCompleted(true);
      setIsPreloading(false);
      return;
    }

    // Load in smaller batches for better UX
    const batchSize = 8;
    let loadedCount = globalPreloadState.progress.loaded;

    for (let i = 0; i < imagesToLoad.length; i += batchSize) {
      const batch = imagesToLoad.slice(i, i + batchSize);
      
      await Promise.allSettled(
        batch.map(avatar => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            
            img.onload = async () => {
              // Store in memory cache
              globalImageCache.set(avatar.filename, img);
              
              // Also store in IndexedDB for persistence
              try {
                const response = await fetch(img.src);
                const blob = await response.blob();
                await imageCache.storeImage(avatar.filename, blob);
                console.log(`💾 Stored ${avatar.filename} in IndexedDB`);
              } catch (error) {
                console.warn(`Failed to store ${avatar.filename} in IndexedDB:`, error);
              }
              
              loadedCount++;
              globalPreloadState.progress.loaded = loadedCount;
              setPreloadProgress({ ...globalPreloadState.progress });
              
              resolve();
            };
            
            img.onerror = () => {
              console.warn(`⚠️ Failed to preload: ${avatar.filename}`);
              loadedCount++;
              globalPreloadState.progress.loaded = loadedCount;
              setPreloadProgress({ ...globalPreloadState.progress });
              resolve();
            };
            
            img.src = `/avatars/${avatar.filename}`;
          });
        })
      );

      // Small delay between batches to keep UI responsive
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    globalPreloadState.completed = true;
    globalPreloadState.isPreloading = false;
    setPreloadCompleted(true);
    setIsPreloading(false);
    
    console.log('✅ Avatar preloading completed!');
  };

  // Start preloading process
  const startPreloading = async () => {
    try {
      // Get avatar data from cache or API
      let avatarData: AvatarData;
      
      const cachedData = getCachedAvatarData();
      if (cachedData) {
        console.log('⚡ Using cached avatar data');
        avatarData = cachedData;
      } else {
        console.log('🔄 Fetching fresh avatar data...');
        const response = await fetch('/api/avatars');
        if (!response.ok) throw new Error('Failed to fetch avatar data');
        
        avatarData = await response.json();
        cacheAvatarData(avatarData);
        console.log('💾 Avatar data cached for 30 days');
      }

      // Start preloading images
      await preloadAvatarImages(avatarData);
      
    } catch (error) {
      console.error('❌ Avatar preloading failed:', error);
      globalPreloadState.isPreloading = false;
      setIsPreloading(false);
    }
  };

  // Auto-start preloading when hook is used
  useEffect(() => {
    // Small delay to let app finish initial render
    const timer = setTimeout(startPreloading, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Expose functions for manual control
  return {
    isPreloading,
    preloadProgress,
    preloadCompleted,
    isImagePreloaded,
    getCachedAvatarData,
    startPreloading: () => {
      if (!globalPreloadState.isPreloading && !globalPreloadState.completed) {
        startPreloading();
      }
    },
    clearCache: () => {
      localStorage.removeItem(AVATAR_DATA_CACHE_KEY);
      localStorage.removeItem(AVATAR_CACHE_TIMESTAMP_KEY);
      globalImageCache.clear();
      // Also clear IndexedDB
      imageCache.clearCache().catch(console.error);
      globalPreloadState = { isPreloading: false, progress: { loaded: 0, total: 0 }, completed: false };
    }
  };
} 