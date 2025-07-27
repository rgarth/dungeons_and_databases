"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { CharacterCard } from "@/components/character-card";
import { CreateCharacterModal } from "@/components/create-character-modal";
import { LoadingModal } from "@/components/loading-modal";
import { useQueryClient } from "@tanstack/react-query";
import { Character } from "@/types/character";
import { Button } from "@/components/ui";
import { useLoading } from "@/components/providers/loading-provider";
import { useClientCache } from '@/hooks/use-client-cache';

export default function CharactersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { assetsLoaded, setAssetsLoaded } = useLoading();
  const queryClient = useQueryClient();
  const { characters } = useClientCache();

  // Use cached characters instead of React Query
  const charactersData = characters || [];

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
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <div className="bg-[var(--color-card)] p-8 rounded-lg shadow-xl max-w-md w-full border border-[var(--color-border)]">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 text-center">Dungeons & Databases</h1>
          <Button
            onClick={() => signIn('google')}
            className="w-full"
            size="lg"
          >
            Sign In with Google
          </Button>
        </div>
      </div>
    );
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charactersData.map((character) => (
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
        ))}
      </div>

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