"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface LoadingContextType {
  assetsLoaded: boolean;
  setAssetsLoaded: (loaded: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Reset assets loaded state when session changes (user logs out/in)
  useEffect(() => {
    if (!session) {
      setAssetsLoaded(false);
    }
  }, [session]);

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