"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { clientCache } from '@/lib/client-cache';

interface LoadingContextType {
  assetsLoaded: boolean;
  setAssetsLoaded: (loaded: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Initialize client cache when user is authenticated
  useEffect(() => {
    if (session && !assetsLoaded) {
      console.log('🔄 Initializing client cache for authenticated user...');
      clientCache.initialize()
        .then(() => {
          console.log('✅ Client cache initialized successfully');
          setAssetsLoaded(true);
        })
        .catch((error) => {
          console.error('❌ Failed to initialize client cache:', error);
          // Still set assets as loaded to prevent infinite loading
          setAssetsLoaded(true);
        });
    } else if (!session) {
      setAssetsLoaded(false);
    }
  }, [session, assetsLoaded]);

  return (
    <LoadingContext.Provider value={{ assetsLoaded, setAssetsLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
} 