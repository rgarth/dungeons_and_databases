import { useEffect } from 'react';
import { useImagePreloader } from './useImagePreloader';

// Global avatar preloader that runs once when app starts
export function useGlobalAvatarPreloader() {
  const { 
    preloadAvatarImages, 
    getCachedAvatarData,
    cacheAvatarData,
    preloadProgress 
  } = useImagePreloader();

  useEffect(() => {
    const startPreloading = async () => {
      try {
        // Get avatar data from cache or fetch fresh
        let avatarData = getCachedAvatarData();
        
        if (!avatarData) {
          console.log('Fetching avatar data for preloading...');
          const response = await fetch('/api/avatars');
          avatarData = await response.json();
          cacheAvatarData(avatarData);
        }

        // Start preloading images in background
        console.log('Starting avatar image preloading...');
        preloadAvatarImages(avatarData).then(() => {
          console.log('Avatar preloading completed!');
        }).catch(console.error);
        
      } catch (error) {
        console.error('Failed to start avatar preloading:', error);
      }
    };

    // Start preloading after a short delay to not block initial render
    const timer = setTimeout(startPreloading, 1000);
    
    return () => clearTimeout(timer);
  }, []); // Only run once when component mounts

  return { preloadProgress };
} 