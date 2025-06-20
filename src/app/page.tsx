"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { Plus, LogOut } from "lucide-react";
import { CharacterCard } from "../components/character-card";
import { CreateCharacterModal } from "../components/create-character-modal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Character } from "@/types/character";

export default function Home() {
  const { data: session, status } = useSession();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const queryClient = useQueryClient();

  // Fetch characters using React Query
  const { data: characters = [], isLoading } = useQuery<Character[]>({
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

  // Show spinner while auth is loading OR while we have a session but haven't loaded characters yet
  if (status === "loading" || (session && isLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!session) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="bg-slate-800 p-8 rounded-lg shadow-xl max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Dungeons & Databases</h1>
          <button
            onClick={() => signIn('google')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-white text-center">Dungeons & Databases</h1>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                New Character
              </button>
              <button
                onClick={() => signOut()}
                className="text-slate-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onCharacterDeleted={() => {
                // React Query will automatically refetch the characters
              }}
              onCharacterUpdated={() => {
                // React Query will automatically refetch the characters
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
