"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { CharacterCard } from "@/components/character-card";
import { CreateCharacterModal } from "@/components/create-character-modal";
import { LoadingModal } from "@/components/loading-modal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Character } from "@/types/character";
import { Button } from "@/components/ui";
import { useLoading } from "@/components/providers/loading-provider";
import { PasswordSetupBanner } from "@/components/password-setup-banner";

export default function CharactersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { assetsLoaded, setAssetsLoaded } = useLoading();
  const queryClient = useQueryClient();

  // Fetch characters using React Query
  const { data: characters = [], isLoading, error, isError } = useQuery<Character[]>({
    queryKey: ['characters'],
    queryFn: async () => {
      const response = await fetch("/api/characters");
      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }
      return response.json();
    },
    enabled: !!session, // Only fetch when we have a session
    retry: 2, // Retry twice on failure
    retryDelay: 1000, // Wait 1 second between retries
  });

  // Handle character creation
  const handleCharacterCreated = (newCharacter: Character) => {
    // Optimistically add the new character to the list with syncing state
    const optimisticCharacter = {
      ...newCharacter,
      isOptimistic: true
    };
    
    queryClient.setQueryData(['characters'], (oldData: Character[] | undefined) => {
      if (!oldData) return [optimisticCharacter];
      return [...oldData, optimisticCharacter];
    });
    
    // Close the modal
    setShowCreateModal(false);
    
    // Refetch the characters after a short delay to get the final state from the database
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    }, 2000);
  };

  // Show loading modal while auth is loading OR while we have a session but haven't loaded all assets yet
  if (status === "loading" || (session && !assetsLoaded)) {
    return (
      <LoadingModal onComplete={() => setAssetsLoaded(true)} />
    );
  }

  // Show login screen if not authenticated
  if (!session) {
    router.replace('/');
    return null;
  }

  const handleTabChange = (tab: 'characters' | 'party' | 'monsters') => {
    switch (tab) {
      case 'characters':
        router.push('/characters');
        break;
      case 'party':
        router.push('/party');
        break;
      case 'monsters':
        router.push('/monsters');
        break;
    }
  };

  return (
    <MainLayout activeTab="characters" onTabChange={handleTabChange}>
      <PasswordSetupBanner />
      
      {/* New Character Button */}
      <div className="mb-8">
        <Button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] px-6 py-3 text-lg font-semibold"
        >
          <Plus className="h-6 w-6" />
          New Character
        </Button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[var(--color-text-secondary)]">Loading your characters...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="bg-[var(--color-card)] border border-[var(--color-danger)] rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-[var(--color-danger)] mb-2">
            Failed to load characters
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-4">
            {error instanceof Error ? error.message : 'An error occurred while loading your characters. This might be due to a slow connection or server issue.'}
          </p>
          <Button
            onClick={() => queryClient.invalidateQueries({ queryKey: ['characters'] })}
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Characters grid */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-[var(--color-text-secondary)] text-lg mb-4">
                You don&apos;t have any characters yet.
              </p>
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]"
              >
                Create Your First Character
              </Button>
            </div>
          ) : (
            characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onCharacterDeleted={() => {
                  queryClient.invalidateQueries({ queryKey: ['characters'] });
                }}
                onCharacterUpdated={() => {
                  queryClient.invalidateQueries({ queryKey: ['characters'] });
                }}
              />
            ))
          )}
        </div>
      )}

      {/* Create Character Modal */}
      {showCreateModal && (
        <CreateCharacterModal 
          onClose={() => setShowCreateModal(false)} 
          onCharacterCreated={handleCharacterCreated}
        />
      )}
    </MainLayout>
  );
} 