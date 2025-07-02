"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Card } from './ui';

interface LoadingItem {
  id: string;
  name: string;
  status: 'pending' | 'loading' | 'success' | 'error';
  error?: string;
}

interface LoadingModalProps {
  onComplete: () => void;
}

export function LoadingModal({ onComplete }: LoadingModalProps) {
  const { data: session, status: authStatus } = useSession();
  const [loadingItems, setLoadingItems] = useState<LoadingItem[]>([
    { id: 'auth', name: 'Authentication', status: 'pending' },
    { id: 'characters', name: 'Character Data', status: 'pending' },
    { id: 'races', name: 'Races', status: 'pending' },
    { id: 'classes', name: 'Classes', status: 'pending' },
    { id: 'backgrounds', name: 'Backgrounds', status: 'pending' },
    { id: 'alignments', name: 'Alignments', status: 'pending' },
    { id: 'equipment-packs', name: 'Equipment Packs', status: 'pending' },
    { id: 'weapons', name: 'Weapons', status: 'pending' },
    { id: 'armor', name: 'Armor', status: 'pending' },
    { id: 'magical-items', name: 'Magical Items', status: 'pending' },
    { id: 'languages', name: 'Languages', status: 'pending' },
    { id: 'subraces', name: 'Subraces', status: 'pending' },
    { id: 'treasures', name: 'Treasures', status: 'pending' },
  ]);

  // Timeout fallback - complete after 30 seconds regardless
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('Loading modal timeout - forcing completion');
      onComplete();
    }, 30000);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  // Update auth status
  useEffect(() => {
    if (authStatus === 'loading') {
      setLoadingItems(prev => 
        prev.map(item => 
          item.id === 'auth' ? { ...item, status: 'loading' as const } : item
        )
      );
    } else if (authStatus === 'authenticated') {
      setLoadingItems(prev => 
        prev.map(item => 
          item.id === 'auth' ? { ...item, status: 'success' as const } : item
        )
      );
    } else if (authStatus === 'unauthenticated') {
      setLoadingItems(prev => 
        prev.map(item => 
          item.id === 'auth' ? { ...item, status: 'error' as const, error: 'Authentication failed' } : item
        )
      );
    }
  }, [authStatus]);

  // Characters query
  const { isLoading: charactersLoading, error: charactersError } = useQuery({
    queryKey: ['characters'],
    queryFn: async () => {
      const response = await fetch("/api/characters");
      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }
      return response.json();
    },
    enabled: !!session,
  });

  // Update characters status
  useEffect(() => {
    if (!session) return;
    
    if (charactersLoading) {
      setLoadingItems(prev => 
        prev.map(item => 
          item.id === 'characters' ? { ...item, status: 'loading' as const } : item
        )
      );
    } else if (charactersError) {
      setLoadingItems(prev => 
        prev.map(item => 
          item.id === 'characters' ? { ...item, status: 'error' as const, error: charactersError.message } : item
        )
      );
    } else {
      setLoadingItems(prev => 
        prev.map(item => 
          item.id === 'characters' ? { ...item, status: 'success' as const } : item
        )
      );
    }
  }, [session, charactersLoading, charactersError]);

  // Core D&D data queries
  const { isLoading: racesLoading, error: racesError } = useQuery({
    queryKey: ['races'],
    queryFn: async () => {
      const res = await fetch('/api/races');
      if (!res.ok) throw new Error('Failed to fetch races');
      return res.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { isLoading: classesLoading, error: classesError } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await fetch('/api/classes');
      if (!res.ok) throw new Error('Failed to fetch classes');
      return res.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { isLoading: backgroundsLoading, error: backgroundsError } = useQuery({
    queryKey: ['backgrounds'],
    queryFn: async () => {
      const res = await fetch('/api/backgrounds');
      if (!res.ok) throw new Error('Failed to fetch backgrounds');
      return res.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { isLoading: alignmentsLoading, error: alignmentsError } = useQuery({
    queryKey: ['alignments'],
    queryFn: async () => {
      const res = await fetch('/api/alignments');
      if (!res.ok) throw new Error('Failed to fetch alignments');
      return res.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  // Equipment data queries
  const { isLoading: equipmentPacksLoading, error: equipmentPacksError } = useQuery({
    queryKey: ['equipment-packs'],
    queryFn: async () => {
      const res = await fetch('/api/equipment-packs');
      if (!res.ok) throw new Error('Failed to fetch equipment packs');
      return res.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { isLoading: weaponsLoading, error: weaponsError } = useQuery({
    queryKey: ['weapons'],
    queryFn: async () => {
      const res = await fetch('/api/weapons');
      if (!res.ok) throw new Error('Failed to fetch weapons');
      return res.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { isLoading: armorLoading, error: armorError } = useQuery({
    queryKey: ['armor'],
    queryFn: async () => {
      const res = await fetch('/api/armor');
      if (!res.ok) throw new Error('Failed to fetch armor');
      return res.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { isLoading: magicalItemsLoading, error: magicalItemsError } = useQuery({
    queryKey: ['magical-items'],
    queryFn: async () => {
      const res = await fetch('/api/magical-items');
      if (!res.ok) throw new Error('Failed to fetch magical items');
      return res.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  // Additional data queries
  const { isLoading: languagesLoading, error: languagesError } = useQuery({
    queryKey: ['languages'],
    queryFn: async () => {
      const res = await fetch('/api/languages');
      if (!res.ok) throw new Error('Failed to fetch languages');
      return res.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { isLoading: subracesLoading, error: subracesError } = useQuery({
    queryKey: ['subraces'],
    queryFn: async () => {
      const res = await fetch('/api/subraces');
      if (!res.ok) throw new Error('Failed to fetch subraces');
      return res.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { isLoading: treasuresLoading, error: treasuresError } = useQuery({
    queryKey: ['treasures'],
    queryFn: async () => {
      const res = await fetch('/api/treasures');
      if (!res.ok) throw new Error('Failed to fetch treasures');
      return res.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  // Update status for all queries
  useEffect(() => {
    const updates = [
      { id: 'races', loading: racesLoading, error: racesError },
      { id: 'classes', loading: classesLoading, error: classesError },
      { id: 'backgrounds', loading: backgroundsLoading, error: backgroundsError },
      { id: 'alignments', loading: alignmentsLoading, error: alignmentsError },
      { id: 'equipment-packs', loading: equipmentPacksLoading, error: equipmentPacksError },
      { id: 'weapons', loading: weaponsLoading, error: weaponsError },
      { id: 'armor', loading: armorLoading, error: armorError },
      { id: 'magical-items', loading: magicalItemsLoading, error: magicalItemsError },
      { id: 'languages', loading: languagesLoading, error: languagesError },
      { id: 'subraces', loading: subracesLoading, error: subracesError },
      { id: 'treasures', loading: treasuresLoading, error: treasuresError },
    ];

    setLoadingItems(prev => 
      prev.map(item => {
        const update = updates.find(u => u.id === item.id);
        if (!update) return item;

        if (update.loading) {
          return { ...item, status: 'loading' as const };
        } else if (update.error) {
          return { ...item, status: 'error' as const, error: update.error.message };
        } else {
          return { ...item, status: 'success' as const };
        }
      })
    );
  }, [
    racesLoading, racesError,
    classesLoading, classesError,
    backgroundsLoading, backgroundsError,
    alignmentsLoading, alignmentsError,
    equipmentPacksLoading, equipmentPacksError,
    weaponsLoading, weaponsError,
    armorLoading, armorError,
    magicalItemsLoading, magicalItemsError,
    languagesLoading, languagesError,
    subracesLoading, subracesError,
    treasuresLoading, treasuresError,
  ]);

  // Check if all items are loaded
  useEffect(() => {
    const allLoaded = loadingItems.every(item => item.status === 'success');
    const hasErrors = loadingItems.some(item => item.status === 'error');
    const allAttempted = loadingItems.every(item => item.status !== 'pending');
    
    console.log('Loading modal status:', {
      allLoaded,
      hasErrors,
      allAttempted,
      items: loadingItems.map(item => ({ id: item.id, status: item.status }))
    });
    
    // Only complete if ALL items are successfully loaded
    // Don't complete if there are any errors or pending items
    if (allLoaded) {
      console.log('Loading modal completing...');
      // Small delay to show completion
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  }, [loadingItems, onComplete]);

  const completedCount = loadingItems.filter(item => item.status === 'success').length;
  const totalCount = loadingItems.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'var(--color-surface)', opacity: 0.95 }}>
      <Card className="shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Dungeons & Databases</h1>
          <p className="text-[var(--color-text-secondary)]">Loading your adventure...</p>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-[var(--color-text-secondary)] mb-2">
            <span>Loading assets...</span>
            <span>{completedCount}/{totalCount}</span>
          </div>
          <div className="w-full bg-[var(--color-card-secondary)] rounded-full h-2">
            <div 
              className="bg-[var(--color-primary)] h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Loading items list */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {loadingItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-2 rounded bg-[var(--color-card-secondary)]">
              <span className="text-sm text-[var(--color-text-primary)]">{item.name}</span>
              <div className="flex items-center">
                {item.status === 'pending' && (
                  <div className="w-4 h-4 border-2 border-[var(--color-text-tertiary)] rounded-full" />
                )}
                {item.status === 'loading' && (
                  <Loader2 className="w-4 h-4 text-[var(--color-accent)] animate-spin" />
                )}
                {item.status === 'success' && (
                  <CheckCircle className="w-4 h-4 text-[var(--color-success)]" />
                )}
                {item.status === 'error' && (
                  <div className="relative group">
                    <XCircle className="w-4 h-4 text-[var(--color-error)]" />
                    {item.error && (
                      <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-[var(--color-error)] text-[var(--color-error-text)] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {item.error}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Error summary */}
        {loadingItems.some(item => item.status === 'error') && (
          <div className="mt-4 p-3 bg-[var(--color-error)] bg-opacity-50 border border-[var(--color-error-border)] rounded text-sm text-[var(--color-error-text)]">
            <p className="font-semibold mb-1">Some assets failed to load:</p>
            <ul className="space-y-1">
              {loadingItems
                .filter(item => item.status === 'error')
                .map(item => (
                  <li key={item.id} className="flex items-center gap-2">
                    <span>• {item.name}:</span>
                    <span className="text-[var(--color-error-text-light)]">{item.error}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
} 