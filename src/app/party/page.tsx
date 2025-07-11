"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import GamesList from '@/components/party/GamesList';
import CreateGameModal from '@/components/party/CreateGameModal';
import JoinGameModal from '@/components/party/JoinGameModal';
import { Button } from '@/components/ui/Button';

interface Game {
  id: string;
  name: string;
  description?: string;
  dm: {
    id: string;
    name?: string;
    email: string;
  };
  participants: Array<{
    id: string;
    user: {
      id: string;
      name?: string;
      email: string;
    };
    character?: {
      id: string;
      name: string;
      class: string;
      level: number;
      race: string;
      avatarUrl?: string;
    };
    isDm: boolean;
  }>;
  _count: {
    participants: number;
    chatMessages: number;
  };
  createdAt: string;
  updatedAt: string;
}

export default function PartyPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Add refresh trigger

  const handleGameSelect = (game: Game) => {
    // TODO: Navigate to game room or show game interface
    console.log('Selected game:', game);
  };

  const handleGameCreated = (game: Game) => {
    // TODO: Navigate to game room or show game interface
    console.log('Created game:', game);
    // Trigger a refresh of the games list
    setRefreshTrigger(prev => prev + 1);
  };

  const handleGameJoined = () => {
    // TODO: Navigate to game room
    console.log('Joined game');
    // Trigger a refresh of the games list
    setRefreshTrigger(prev => prev + 1);
  };

  const handleTabChange = (tab: 'characters' | 'party') => {
    switch (tab) {
      case 'characters':
        router.push('/');
        break;
      case 'party':
        router.push('/party');
        break;
    }
  };

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
        onGameSelect={handleGameSelect}
        onCreateGame={() => setShowCreateModal(true)}
        refreshTrigger={refreshTrigger}
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
    </MainLayout>
  );
} 