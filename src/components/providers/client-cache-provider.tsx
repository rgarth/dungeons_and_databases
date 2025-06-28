"use client";

import { useEffect } from 'react';
import { clientCache } from '@/lib/client-cache';

export function ClientCacheProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize client cache on first load
    clientCache.initialize().catch(console.error);
  }, []);

  return <>{children}</>;
} 