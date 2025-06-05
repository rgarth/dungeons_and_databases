import { useState } from 'react';

interface AvatarData {
  avatars: Array<{
    filename: string;
    race: string;
    class: string;
    gender: string;
    displayName: string;
  }>;
  races: string[];
  classes: string[];
  genders: string[];
}

// In-memory cache for loaded images
const imageCache = new Map<string, HTMLImageElement>();

// Cache keys for localStorage
const AVATAR_DATA_CACHE_KEY = 'dd_avatar_data';
const AVATAR_CACHE_TIMESTAMP_KEY = 'dd_avatar_cache_timestamp';
const PRELOADED_IMAGES_KEY = 'dd_preloaded_images';

// Cache expiry time (24 hours)
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000;

export function useImagePreloader() {
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(PRELOADED_IMAGES_KEY);
      if (cached) {
        try {
          return new Set(JSON.parse(cached));
        } catch {
          return new Set();
        }
      }
    }
    return new Set();
  });
  const [preloadProgress, setPreloadProgress] = useState({ loaded: 0, total: 0 });

  // Get cached avatar data
  const getCachedAvatarData = (): AvatarData | null => {
    if (typeof window === 'undefined') return null;
    
    const cached = localStorage.getItem(AVATAR_DATA_CACHE_KEY);
    const timestamp = localStorage.getItem(AVATAR_CACHE_TIMESTAMP_KEY);
    
    if (cached && timestamp) {
      const age = Date.now() - parseInt(timestamp);
      if (age < CACHE_EXPIRY_MS) {
        try {
          return JSON.parse(cached);
        } catch {
          return null;
        }
      }
    }
    return null;
  };

  // Cache avatar data
  const cacheAvatarData = (data: AvatarData) => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(AVATAR_DATA_CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(AVATAR_CACHE_TIMESTAMP_KEY, Date.now().toString());
  };

  const preloadAvatarImages = async (avatarData: AvatarData) => {
    const imagesToLoad = avatarData.avatars.map(avatar => avatar.filename);
    setPreloadProgress({ loaded: 0, total: imagesToLoad.length });

    // Load images in batches to avoid overwhelming the browser
    const batchSize = 10;
    let loadedCount = 0;

    for (let i = 0; i < imagesToLoad.length; i += batchSize) {
      const batch = imagesToLoad.slice(i, i + batchSize);
      
      await Promise.allSettled(
        batch.map(async (filename) => {
          // Skip if already cached
          if (imageCache.has(filename)) {
            loadedCount++;
            setPreloadProgress(prev => ({ ...prev, loaded: loadedCount }));
            return;
          }

          return new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              imageCache.set(filename, img);
              setPreloadedImages(prev => {
                const newSet = new Set(prev).add(filename);
                // Persist to localStorage
                if (typeof window !== 'undefined') {
                  localStorage.setItem(PRELOADED_IMAGES_KEY, JSON.stringify([...newSet]));
                }
                return newSet;
              });
              loadedCount++;
              setPreloadProgress(prev => ({ ...prev, loaded: loadedCount }));
              resolve();
            };
            img.onerror = () => {
              console.warn(`Failed to preload image: ${filename}`);
              loadedCount++;
              setPreloadProgress(prev => ({ ...prev, loaded: loadedCount }));
              resolve();
            };
            img.src = `/avatars/${filename}`;
          });
        })
      );

      // Small delay between batches to keep UI responsive
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  };

  const isImagePreloaded = (filename: string) => {
    return imageCache.has(filename);
  };

  const getPreloadedImage = (filename: string) => {
    return imageCache.get(filename);
  };

  // Clear cache when needed (for memory management)
  const clearImageCache = () => {
    imageCache.clear();
    setPreloadedImages(new Set());
    setPreloadProgress({ loaded: 0, total: 0 });
  };

  return {
    preloadAvatarImages,
    isImagePreloaded,
    getPreloadedImage,
    clearImageCache,
    preloadedImages,
    preloadProgress,
    getCachedAvatarData,
    cacheAvatarData
  };
} 