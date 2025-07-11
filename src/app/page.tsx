"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { Plus, LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import { CharacterCard } from "../components/character-card";
import { CreateCharacterModal } from "../components/create-character-modal";
import { LoadingModal } from "../components/loading-modal";
import { ThemeSelector } from "../components/ThemeSelector";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Character } from "@/types/character";
import { Button } from "../components/ui";

export default function Home() {
  const { data: session, status } = useSession();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const queryClient = useQueryClient();

  // Fetch characters using React Query
  const { data: characters = [] } = useQuery<Character[]>({
    queryKey: ['characters'],
    queryFn: async () => {
      const response = await fetch("/api/characters");
      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }
      return response.json();
    },
    enabled: !!session, // Only fetch when we have a session
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

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      {/* Header */}
      <header className="bg-[var(--color-card)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/favicon.svg"
                alt="Dungeons & Databases Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Dungeons & Databases</h1>
            </div>
            
            {/* Hamburger menu for all screen sizes */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowMenu(!showMenu)}
                className="p-2"
              >
                {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>

              {/* Menu dropdown positioned under the button */}
              {showMenu && (
                <div className="absolute right-0 top-full mt-2 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg shadow-lg z-10 min-w-[200px]">
                  <div className="p-2 space-y-1">
                    <ThemeSelector />
                    <button
                      onClick={() => signOut()}
                      className="hamburger-menu-item"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onCharacterDeleted={() => {
                // Invalidate the characters query to refetch the updated list
                queryClient.invalidateQueries({ queryKey: ['characters'] });
              }}
              onCharacterUpdated={() => {
                // Invalidate the characters query to refetch the updated list
                queryClient.invalidateQueries({ queryKey: ['characters'] });
              }}
            />
          ))}
        </div>
      </main>

      {/* Create Character Modal */}
      {showCreateModal && (
        <CreateCharacterModal 
          onClose={() => setShowCreateModal(false)} 
          onCharacterCreated={handleCharacterCreated}
        />
      )}
    </div>
  );
}
