"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import GamesList from '@/components/party/GamesList';
import CreateGameModal from '@/components/party/CreateGameModal';
import JoinGameModal from '@/components/party/JoinGameModal';
import { Button } from '@/components/ui/Button';
import GameDetailsModal from '@/components/party/GameDetailsModal';
import { Game } from '@/types/game';
import { useClientCache } from '@/hooks/use-client-cache';
import { clientCache } from '@/lib/client-cache';
import { LoadingModal } from '@/components/loading-modal';
import { useLoading } from '@/components/providers/loading-provider';

export default function PartyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { games, isInitialized } = useClientCache();
  const { assetsLoaded, setAssetsLoaded } = useLoading();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showGameDetails, setShowGameDetails] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const addGame = () => {
    // Note: This would need to be handled by updating the client cache
    // For now, we'll just refetch to get the updated data
    refetch();
  };

  const removeGame = () => {
    // Note: This would need to be handled by updating the client cache
    // For now, we'll just refetch to get the updated data
    refetch();
  };

  const refetch = async () => {
    try {
      // Re-initialize the client cache to get fresh data
      await clientCache.initialize();
    } catch (error) {
      console.error('Failed to refetch games:', error);
    }
  };

  // Check for openGame query parameter and automatically open the game modal
  useEffect(() => {
    const openGameId = searchParams?.get('openGame');
    if (openGameId) {
      // Fetch the game details and open the modal
      fetchGameDetails(openGameId);
      // Clear the query parameter
      router.replace('/party');
    }
  }, [searchParams, router]);

  const fetchGameDetails = async (gameId: string) => {
    try {
      const response = await fetch(`/api/games/${gameId}`);
      if (response.ok) {
        const game = await response.json();
        setSelectedGame(game);
        setShowGameDetails(true);
      }
    } catch (error) {
      console.error('Failed to fetch game details:', error);
    }
  };

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setShowGameDetails(true);
  };

  const handleGameCreated = (game: Game) => {
    // Add the new game to the cache immediately
    addGame();
    console.log('Created game:', game);
    // Optionally open the game details modal
    setSelectedGame(game);
    setShowGameDetails(true);
  };

  const handleGameJoined = () => {
    // Refresh the games list to show the newly joined game
    refetch();
    console.log('Joined game');
  };

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

  // Show loading modal while auth is loading OR while we have a session but haven't loaded all assets yet
  if (status === "loading" || (session && !assetsLoaded)) {
    return (
      <LoadingModal onComplete={() => setAssetsLoaded(true)} />
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <div className="bg-[var(--color-card)] p-8 rounded-lg shadow-xl max-w-md w-full border border-[var(--color-border)]">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 text-center">Dungeons & Databases</h1>
          <Button
            onClick={() => router.push('/api/auth/signin')}
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
    <MainLayout activeTab="party" onTabChange={handleTabChange}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Party Management</h1>
        <p className="text-[var(--color-text-secondary)]">
          Create games as a DM or join existing games with invite codes.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <Button 
          onClick={() => setShowJoinModal(true)}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-primary-text)]"
        >
          Join Game
        </Button>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]"
        >
          Create New Game
        </Button>
      </div>

      <GamesList 
        games={games}
        isLoading={!isInitialized}
        onGameSelect={handleGameSelect}
        onCreateGame={() => setShowCreateModal(true)}
      />

      <CreateGameModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onGameCreated={handleGameCreated}
      />

      <JoinGameModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onGameJoined={handleGameJoined}
      />

      <GameDetailsModal
        game={selectedGame}
        isOpen={showGameDetails}
        onClose={() => {
          setShowGameDetails(false);
          setSelectedGame(null);
        }}
        onGameUpdated={(deletedGameId?: string) => {
          // If a game was deleted, remove it from the cache and close the modal
          if (deletedGameId) {
            removeGame();
            setSelectedGame(null);
            setShowGameDetails(false);
          } else {
            // Otherwise, refresh the games list
            refetch();
          }
        }}
      />
    </MainLayout>
  );
} 