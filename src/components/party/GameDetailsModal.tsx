"use client";


import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui';
import { Users, User, BookOpen, MessageSquare, Calendar, Sword } from 'lucide-react';
import { Game } from '@/types/game';
import { Character } from '@/types/character';
import { useAvatar } from '@/hooks/use-character-mutations';
import Image from 'next/image';
import { CharacterSheet } from '@/components/character-sheet';
import ReadOnlyCharacterSheet from '@/components/character-sheet/ReadOnlyCharacterSheet';
import { useGameEvents } from '@/hooks/use-game-events';
import GameChat from './GameChat';
import EncountersTab from './EncountersTab';
import { useClientCache } from '@/hooks/use-client-cache';

// Character Avatar Component
function CharacterAvatar({ characterId, characterName }: { characterId: string; characterName: string }) {
  const { data: avatarUrl, isLoading } = useAvatar(characterId);

  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-full bg-[var(--color-card-secondary)] animate-pulse" />
    );
  }

  if (avatarUrl) {
    return (
      <div className="w-10 h-10 rounded-full overflow-hidden relative">
        <Image
          src={avatarUrl}
          alt={characterName}
          width={40}
          height={40}
          className="absolute inset-0 w-full h-full object-cover object-top scale-150 translate-y-1/4"
        />
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-text)' }}>
      {characterName.charAt(0).toUpperCase()}
    </div>
  );
}

// Confirmation Dialog Component
function ConfirmationDialog({ 
  isOpen, 
  title, 
  message, 
  confirmText, 
  cancelText, 
  onConfirm, 
  onCancel, 
  isDestructive = false 
}: {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[60]" style={{ backgroundColor: 'var(--color-overlay)' }}>
      <div className="bg-[var(--color-card)] rounded-lg w-full max-w-md mx-4 p-6">
        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
          {title}
        </h3>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          {message}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm rounded transition-colors ${
              isDestructive 
                ? 'bg-[var(--color-danger)] hover:bg-[var(--color-danger-hover)] text-white' 
                : 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

interface GameDetailsModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
  onGameUpdated?: (deletedGameId?: string) => void;
}

export default function GameDetailsModal({ game, isOpen, onClose, onGameUpdated }: GameDetailsModalProps) {
  const { data: session } = useSession();
  const { characters: cachedCharacters } = useClientCache();
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [activeTab, setActiveTab] = useState<'lobby' | 'characters' | 'notes' | 'chat' | 'encounters'>('lobby');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [showAddCharacterModal, setShowAddCharacterModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
  const [selectedCharacterId, setSelectedCharacterId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [removingCharacter, setRemovingCharacter] = useState<string | null>(null);
  const [showRemoveParticipantConfirm, setShowRemoveParticipantConfirm] = useState<string | null>(null);
  const [showDeleteGameConfirm, setShowDeleteGameConfirm] = useState(false);
  const [showCharacterSheet, setShowCharacterSheet] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Notes state
  const [gameNotes, setGameNotes] = useState('');
  const [dmNotes, setDmNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesError, setNotesError] = useState<string | null>(null);



  const isDM = currentGame?.dm.id === (session?.user as { id?: string })?.id;

  useEffect(() => {
    setCurrentGame(game);
  }, [game]);

  // SSE-based real-time updates for game state changes
  useGameEvents({
    gameId: currentGame?.id || '',
    enabled: isOpen && !!currentGame,
    onGameUpdate: (gameUpdate) => {
      // Only refresh if there are actual changes
      if (gameUpdate.hasChanges) {
        console.log('🔄 Game state changed, refreshing data...', gameUpdate);
        refreshGameData();
      } else {
        console.log('📊 Game update received but no changes detected:', gameUpdate);
      }
    },
    onError: (error: Error) => {
      console.error('❌ Game SSE error:', error);
    }
  });

  // Load notes when notes tab is active
  useEffect(() => {
    if (activeTab === 'notes' && currentGame) {
      loadNotes();
    }
  }, [activeTab, currentGame?.id]);



  const loadNotes = async () => {
    if (!currentGame) return;

    // If we already have notes from the game data, use those
    if (currentGame.gameNotes !== undefined) {
      setGameNotes(currentGame.gameNotes || '');
      if (isDM && currentGame.dmNotes !== undefined) {
        setDmNotes(currentGame.dmNotes || '');
      }
      return;
    }

    // Otherwise, fetch from the notes API
    try {
      const response = await fetch(`/api/games/${currentGame.id}/notes`);
      if (response.ok) {
        const notes = await response.json();
        setGameNotes(notes.gameNotes || '');
        if (isDM) {
          setDmNotes(notes.dmNotes || '');
        }
      }
    } catch (error) {
      console.error('Error loading notes:', error);
      setNotesError('Failed to load notes');
    }
  };

  const saveNotes = async (type: 'game' | 'dm') => {
    if (!currentGame || !isDM) return;

    try {
      setIsSavingNotes(true);
      setNotesError(null);

      const updateData = type === 'game' 
        ? { gameNotes } 
        : { dmNotes };

      const response = await fetch(`/api/games/${currentGame.id}/notes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save notes');
      }

      // Update the current game with new notes
      const updatedNotes = await response.json();
      setCurrentGame(prev => prev ? {
        ...prev,
        gameNotes: updatedNotes.gameNotes,
        dmNotes: updatedNotes.dmNotes,
      } : null);

    } catch (error) {
      console.error('Error saving notes:', error);
      setNotesError(error instanceof Error ? error.message : 'Failed to save notes');
    } finally {
      setIsSavingNotes(false);
    }
  };



  // Fetch characters when add character modal opens
  useEffect(() => {
    if (showAddCharacterModal) {
      // Use cached characters instead of fetching
      setCharacters(cachedCharacters);
      // Set the current user's participant ID
      if (currentGame && session?.user?.email) {
        const isDM = currentGame.dm.id === session.user?.id;
        
        if (isDM) {
          // DM can add characters to any participant, so we'll let them choose
          // For now, just set the first participant as default
          if (currentGame.participants.length > 0) {
            setSelectedParticipant(currentGame.participants[0].id);
          }
        } else {
          // Regular players can only add to themselves
          const currentParticipant = currentGame.participants.find(
            p => p.user.email === session.user?.email
          );
          if (currentParticipant) {
            setSelectedParticipant(currentParticipant.id);
          }
        }
      }
    }
  }, [showAddCharacterModal, currentGame, session?.user?.email, cachedCharacters]);

  const getAvailableCharacters = () => {
    if (!currentGame || !session?.user?.email) return [];
    
    // Both DMs and players should only see their own characters that aren't already in the game
    const availableCharacters = characters.filter(character => {
      // Check if character is already in the game
      const isAlreadyInGame = currentGame.participants.some(participant =>
        participant.characters.some(gameCharacter => gameCharacter.id === character.id)
      );
      
      return !isAlreadyInGame;
    });
    
    return availableCharacters;
  };

  const handleAddCharacter = async () => {
    if (!selectedCharacterId || !currentGame || !selectedParticipant) return;

    try {
      setError(null);

      const response = await fetch(`/api/games/${currentGame.id}/participants/${selectedParticipant}/character`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterId: selectedCharacterId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add character');
      }

      // Refresh the game data
      await refreshGameData();
      
      // Close modal and reset state
      setShowAddCharacterModal(false);
      setSelectedParticipant(null);
      setSelectedCharacterId('');
      
      // Also trigger parent refresh
      onGameUpdated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const refreshGameData = async () => {
    if (!currentGame) return;

    try {
      setIsRefreshing(true);
      const response = await fetch(`/api/games/${currentGame.id}`);
      if (response.ok) {
        const updatedGame = await response.json();
        setCurrentGame(updatedGame);
        // Update notes from the game data
        if (updatedGame.gameNotes !== undefined) {
          setGameNotes(updatedGame.gameNotes || '');
        }
        if (isDM && updatedGame.dmNotes !== undefined) {
          setDmNotes(updatedGame.dmNotes || '');
        }
      }
    } catch (error) {
      console.error('Error refreshing game data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const copyInviteCode = async () => {
    if (!currentGame) return;
    const code = currentGame.id.slice(0, 8).toUpperCase();
    await navigator.clipboard.writeText(code);
  };

  const copyInviteUrl = async () => {
    if (!currentGame) return;
    const url = `${window.location.origin}/invite/${currentGame.id.slice(0, 8).toUpperCase()}`;
    await navigator.clipboard.writeText(url);
  };

  const getPlayerCount = () => {
    return currentGame?.participants.length || 0;
  };

  const getCharacterCount = () => {
    return currentGame?.participants.reduce((total, p) => total + (p.characters?.length || 0), 0) || 0;
  };

  const handleRemoveParticipant = async (participantId: string) => {
    if (!currentGame) return;

    try {
      setError(null);

      const response = await fetch(`/api/games/${currentGame.id}/participants/${participantId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove participant');
      }

      // Check if the user is removing themselves
      const isRemovingSelf = currentGame.participants.find(p => p.id === participantId)?.user.email === session?.user?.email;

      // Refresh the game data immediately
      await refreshGameData();
      
      // Also trigger parent refresh
      onGameUpdated?.();

      // If the user removed themselves, close the modal
      if (isRemovingSelf) {
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setShowRemoveParticipantConfirm(null);
    }
  };

  const handleDeleteGame = async () => {
    if (!currentGame) return;

    try {
      setError(null);

      const response = await fetch(`/api/games/${currentGame.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete game');
      }

      // Close the modal and trigger parent refresh with the deleted game ID
      onClose();
      onGameUpdated?.(currentGame.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setShowDeleteGameConfirm(false);
    }
  };

  const handleCharacterClick = async (characterId: string, participantId: string) => {
    try {
      // Determine if this is the user's own character
      const isOwnCharacter = currentGame?.participants.find(p => p.id === participantId)?.user.email === session?.user?.email;
      
      // Choose the appropriate API endpoint
      let response;
      if (isOwnCharacter) {
        // User's own character - use regular character API
        response = await fetch(`/api/characters/${characterId}`);
      } else if (isDM) {
        // DM viewing other player's character - use game-specific read-only API
        response = await fetch(`/api/games/${currentGame?.id}/characters/${characterId}`);
      } else {
        // Other player viewing another player's character - use public API
        response = await fetch(`/api/games/${currentGame?.id}/characters/${characterId}/public`);
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch character data');
      }
      
      const character: Character = await response.json();
      setSelectedCharacter(character);
      
      // Set read-only mode: true if not own character (DM or non-DM viewing others), false if own character
      setIsReadOnly(!isOwnCharacter);
      
      setShowCharacterSheet(true);
    } catch (error) {
      console.error('Error fetching character:', error);
    }
  };

  const handleCloseCharacterSheet = () => {
    setShowCharacterSheet(false);
    setSelectedCharacter(null);
    setIsReadOnly(false);
  };

  const handleRemoveCharacter = async (participantId: string, characterId: string) => {
    if (!currentGame) return;

    try {
      setRemovingCharacter(participantId);
      setError(null);

      const response = await fetch(`/api/games/${currentGame.id}/participants/${participantId}/character`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove character');
      }

      // Refresh the game data immediately
      await refreshGameData();
      
      // Also trigger parent refresh
      onGameUpdated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setRemovingCharacter(null);
    }
  };

  if (!isOpen || !currentGame) return null;

  // Find the participant to be removed for confirmation dialog
  const participantToRemove = showRemoveParticipantConfirm 
    ? currentGame.participants.find(p => p.id === showRemoveParticipantConfirm)
    : null;
  const isRemovingSelf = participantToRemove?.user.email === session?.user?.email;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
        <Card className="w-full max-w-4xl mx-4 h-[90vh] flex flex-col">
          <div className="p-6 flex-1 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {currentGame.name}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={refreshGameData}
                  disabled={isRefreshing}
                  className={`px-3 py-1 text-sm bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                  title="Refresh game data"
                >
                  {isRefreshing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Refreshing...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Refresh
                    </>
                  )}
                </button>
                <button
                  onClick={copyInviteCode}
                  className="px-3 py-1 text-sm bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-[var(--color-success-text)] rounded transition-colors"
                  title="Copy invite code"
                >
                  📋 Copy Invite
                </button>
                {isDM && (
                  <button
                    onClick={() => setShowDeleteGameConfirm(true)}
                    className="text-[var(--color-danger)] hover:text-[var(--color-danger-hover)] hover:bg-[var(--color-danger-bg)] p-2 rounded transition-colors"
                    title="Delete game"
                  >
                    🗑️
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-6" style={{ borderColor: 'var(--color-border)' }}>
              <button
                onClick={() => setActiveTab('lobby')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'lobby' 
                    ? 'border-b-2' 
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
                style={{ 
                  borderColor: activeTab === 'lobby' ? 'var(--color-accent)' : 'transparent',
                  color: activeTab === 'lobby' ? 'var(--color-accent)' : undefined
                }}
              >
                <Users className="h-4 w-4 inline mr-2" />
                Lobby
              </button>
              <button
                onClick={() => setActiveTab('characters')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'characters'
                    ? 'border-b-2' 
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
                style={{ 
                  borderColor: activeTab === 'characters' ? 'var(--color-accent)' : 'transparent',
                  color: activeTab === 'characters' ? 'var(--color-accent)' : undefined
                }}
              >
                <User className="h-4 w-4 inline mr-2" />
                Characters
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'notes' 
                    ? 'border-b-2' 
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
                style={{ 
                  borderColor: activeTab === 'notes' ? 'var(--color-accent)' : 'transparent',
                  color: activeTab === 'notes' ? 'var(--color-accent)' : undefined
                }}
              >
                <BookOpen className="h-4 w-4 inline mr-2" />
                Notes
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'chat' 
                    ? 'border-b-2' 
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
                style={{ 
                  borderColor: activeTab === 'chat' ? 'var(--color-accent)' : 'transparent',
                  color: activeTab === 'chat' ? 'var(--color-accent)' : undefined
                }}
              >
                <MessageSquare className="h-4 w-4 inline mr-2" />
                Chat
              </button>
              <button
                onClick={() => setActiveTab('encounters')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'encounters' 
                    ? 'border-b-2' 
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
                style={{ 
                  borderColor: activeTab === 'encounters' ? 'var(--color-accent)' : 'transparent',
                  color: activeTab === 'encounters' ? 'var(--color-accent)' : undefined
                }}
              >
                <Sword className="h-4 w-4 inline mr-2" />
                Encounters
              </button>
            </div>

            

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--color-danger-bg)', color: 'var(--color-danger)' }}>
                {error}
              </div>
            )}

            {/* Tab Content */}
            {activeTab === 'lobby' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Stats */}
                <div className="space-y-6">
                {/* Game Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                    <Users className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                      <div className="text-center">
                        <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Players</div>
                      <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{getPlayerCount()}</div>
                    </div>
                  </div>
                    <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                    <User className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                      <div className="text-center">
                        <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Characters</div>
                      <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{getCharacterCount()}</div>
                    </div>
                  </div>
                </div>

                  {/* Description */}
                  {currentGame.description && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                        Description
                      </h3>
                      <p className="text-[var(--color-text-secondary)]">{currentGame.description}</p>
                    </div>
                  )}

                  {/* Game Info */}
                  <div className="text-xs p-3 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)', color: 'var(--color-text-muted)' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-3 w-3" />
                      Created: {new Date(currentGame.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      Last updated: {new Date(currentGame.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Right Column - Invite Players */}
                <div>
                {/* Invite Section */}
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
                    Invite Players
                  </h3>
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-xs px-4 py-3 font-mono text-xl font-bold rounded-lg text-center mb-3 border-2" style={{ backgroundColor: 'var(--color-card)', color: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}>
                      {currentGame.id.slice(0, 8).toUpperCase()}
                    </div>
                    <div className="flex gap-2 w-full max-w-xs">
                      <button
                        onClick={copyInviteCode}
                        className="flex-1 px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] rounded transition-colors font-medium"
                      >
                        Copy Code
                      </button>
                      <button
                        onClick={copyInviteUrl}
                        className="flex-1 px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] rounded transition-colors font-medium"
                      >
                        Copy URL
                      </button>
                    </div>
                  </div>
                </div>

                {/* Participants Section */}
                <div className="p-4 rounded-lg mt-6" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    Players ({currentGame.participants.length})
                  </h3>
                  <div className="space-y-3">
                    {currentGame.participants.map((participant) => {
                      const isCurrentUser = participant.user.email === session?.user?.email;
                      const isParticipantDM = participant.user.id === currentGame.dm.id;
                      
                      return (
                        <div
                          key={participant.id}
                          className="flex items-center justify-between p-3 rounded-lg"
                          style={{ backgroundColor: 'var(--color-card)' }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-text)' }}>
                              {participant.user.name?.[0] || participant.user.email[0].toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                                {participant.user.name || participant.user.email}
                                {isCurrentUser && ' (You)'}
                                {isParticipantDM && ' (DM)'}
                              </div>
                              <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                {participant.characters?.length || 0} character{(participant.characters?.length || 0) !== 1 ? 's' : ''}
                              </div>
                            </div>
                          </div>
                          
                          {/* Action buttons */}
                          <div className="flex items-center gap-2">
                            {isCurrentUser && !isParticipantDM ? (
                              // Current user (non-DM) can leave
                              <button
                                onClick={() => setShowRemoveParticipantConfirm(participant.id)}
                                className="text-xs px-3 py-1 text-[var(--color-danger)] hover:text-[var(--color-danger-hover)] hover:bg-[var(--color-danger-bg)] rounded transition-colors"
                                title="Leave game"
                              >
                                Leave
                              </button>
                            ) : isDM && !isCurrentUser ? (
                              // DM can remove other players (but not themselves)
                              <button
                                onClick={() => setShowRemoveParticipantConfirm(participant.id)}
                                className="text-xs px-3 py-1 text-[var(--color-danger)] hover:text-[var(--color-danger-hover)] hover:bg-[var(--color-danger-bg)] rounded transition-colors"
                                title="Remove player"
                              >
                                Remove
                              </button>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                    
                    {currentGame.participants.length === 0 && (
                      <div className="text-center py-4" style={{ color: 'var(--color-text-secondary)' }}>
                        No players yet. Share the invite code to get started!
                      </div>
                    )}
                  </div>
                </div>
                            </div>
                              </div>
            )}

            {activeTab === 'characters' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    Characters ({getCharacterCount()})
                  </h3>
                  <button
                    onClick={() => setShowAddCharacterModal(true)}
                    className="px-3 py-1 text-sm bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] rounded transition-colors"
                  >
                    Add Character
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Show all characters in a clean list */}
                  {currentGame.participants.flatMap(participant => 
                    (participant.characters || []).map(character => ({
                      ...character,
                      playerName: participant.user.name || participant.user.email,
                      participantId: participant.id
                    }))
                  ).map((character) => (
                    <div
                      key={`${character.participantId}-${character.id}`}
                      className="p-4 rounded-lg relative cursor-pointer hover:bg-[var(--color-card)] transition-colors"
                      style={{ backgroundColor: 'var(--color-card-secondary)' }}
                      onClick={() => handleCharacterClick(character.id, character.participantId)}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <CharacterAvatar characterId={character.id} characterName={character.name} />
                        <div className="flex-1">
                          <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                            {character.name}
                          </div>
                          <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Level {character.level} {character.race} {character.class}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                          Player: {session?.user?.email === currentGame.participants.find(p => p.id === character.participantId)?.user.email ? 'You' : character.playerName}
                        </div>
                        {/* Show remove button if this is the user's own character OR if user is DM */}
                        {(session?.user?.email === currentGame.participants.find(p => p.id === character.participantId)?.user.email || isDM) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveCharacter(character.participantId, character.id);
                            }}
                            disabled={removingCharacter === character.participantId}
                            className="text-xs px-2 py-1 text-[var(--color-danger)] hover:text-[var(--color-danger-hover)] hover:bg-[var(--color-danger-bg)] rounded transition-colors disabled:opacity-50"
                            title="Remove character from game"
                          >
                            {removingCharacter === character.participantId ? 'Removing...' : 'Remove'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Show empty state if no characters */}
                  {getCharacterCount() === 0 && (
                    <div className="col-span-full p-8 text-center" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                      <div className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                        No Characters Added
                      </div>
                      <div className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                        Add characters to start playing
                      </div>
                      <button
                        onClick={() => setShowAddCharacterModal(true)}
                        className="px-4 py-2 text-sm bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] rounded transition-colors"
                      >
                        Add Your First Character
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                  Game Notes
                </h3>
                
                {/* Game Notes - Visible to all players */}
                <div className="mb-6">
                  {isDM && (
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      Player Viewable Notes
                    </h4>
                      <button
                        onClick={() => saveNotes('game')}
                        disabled={isSavingNotes}
                        className="px-3 py-1 text-sm bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] rounded transition-colors disabled:opacity-50 flex items-center gap-2"
                        title="Save Player Viewable Notes"
                      >
                        {isSavingNotes ? (
                          <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                            Save
                          </>
                        )}
                      </button>
                  </div>
                  )}
                  <div className={`p-4 rounded-lg ${!isDM ? 'mt-3' : ''}`} style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                    {isDM ? (
                      <textarea
                        value={gameNotes}
                        onChange={(e) => setGameNotes(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 resize-vertical"
                        style={{
                          backgroundColor: 'var(--color-card)',
                          color: 'var(--color-text-primary)',
                          borderColor: 'var(--color-border)',
                          outlineColor: 'var(--color-accent)'
                        }}
                        rows={8}
                        placeholder="Enter notes here... (visible to all players)"
                      />
                    ) : (
                      <div className="whitespace-pre-wrap text-[var(--color-text-primary)] min-h-[200px]">
                        {gameNotes || 'No player viewable notes yet.'}
                      </div>
                    )}
                  </div>
                </div>

                {/* DM Notes - Only visible to DM */}
                {isDM && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-md font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        DM Only Notes
                      </h4>
                      <button
                        onClick={() => saveNotes('dm')}
                        disabled={isSavingNotes}
                        className="px-3 py-1 text-sm bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] rounded transition-colors disabled:opacity-50 flex items-center gap-2"
                        title="Save DM Only Notes"
                      >
                        {isSavingNotes ? (
                          <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                            Save
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                      <textarea
                        value={dmNotes}
                        onChange={(e) => setDmNotes(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 resize-vertical"
                        style={{
                          backgroundColor: 'var(--color-card)',
                          color: 'var(--color-text-primary)',
                          borderColor: 'var(--color-border)',
                          outlineColor: 'var(--color-accent)'
                        }}
                        rows={8}
                        placeholder="Enter notes here... (only visible to you)"
                      />
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {notesError && (
                  <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--color-danger-bg)', color: 'var(--color-danger)' }}>
                    {notesError}
                  </div>
                )}
              </div>
            )}

            {/* Chat - Always rendered but hidden when not active */}
            <div className={`h-96 ${activeTab === 'chat' ? 'block' : 'hidden'}`}>
              <GameChat 
                gameId={currentGame?.id || ''} 
                enabled={!!currentGame}
                isDM={isDM}
              />
            </div>

            {activeTab === 'encounters' && currentGame && (
              <div className="h-96">
                <EncountersTab 
                  gameId={currentGame.id}
                  isDM={isDM}
                />
              </div>
            )}

          </div>
        </Card>

        {/* Add Character Modal */}
        {showAddCharacterModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
            <div className="bg-[var(--color-card)] rounded-lg w-full max-w-md mx-4 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  Add Character to Game
                </h3>
                <button
                  onClick={() => {
                    setShowAddCharacterModal(false);
                    setSelectedParticipant(null);
                    setSelectedCharacterId('');
                    setError(null);
                  }}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* Participant selector for DMs */}
                {isDM && currentGame.participants.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                      Select Participant
                    </label>
                    <select
                      value={selectedParticipant || ''}
                      onChange={(e) => setSelectedParticipant(e.target.value)}
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: 'var(--color-card-secondary)',
                        color: 'var(--color-text-primary)',
                        borderColor: 'var(--color-border)',
                        outlineColor: 'var(--color-accent)'
                      }}
                    >
                      <option value="">Choose a participant...</option>
                      {currentGame.participants.map((participant) => (
                        <option key={participant.id} value={participant.id}>
                          {participant.user.name || participant.user.email}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Select Character
                  </label>
                  <select
                    value={selectedCharacterId}
                    onChange={(e) => setSelectedCharacterId(e.target.value)}
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: 'var(--color-card-secondary)',
                      color: 'var(--color-text-primary)',
                      borderColor: 'var(--color-border)',
                      outlineColor: 'var(--color-accent)'
                    }}
                  >
                    <option value="">Choose a character...</option>
                    {getAvailableCharacters().map((character) => (
                        <option key={character.id} value={character.id}>
                          {character.name} - Level {character.level} {character.race} {character.class}
                        </option>
                      ))}
                    {getAvailableCharacters().length === 0 && (
                      <option value="" disabled>
                        No available characters to add
                      </option>
                    )}
                  </select>
                </div>

                {error && (
                  <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--color-danger-bg)', color: 'var(--color-danger)' }}>
                    {error}
                  </div>
                )}

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => {
                      setShowAddCharacterModal(false);
                      setSelectedParticipant(null);
                      setSelectedCharacterId('');
                      setError(null);
                    }}
                    className="px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCharacter}
                    disabled={!selectedCharacterId || getAvailableCharacters().length === 0 || (isDM && !selectedParticipant)}
                    className="px-4 py-2 text-sm bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] rounded transition-colors disabled:opacity-50"
                  >
                    Add Character
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={!!showRemoveParticipantConfirm}
          title={isRemovingSelf ? "Leave Game?" : "Remove Player?"}
          message={
            isRemovingSelf 
              ? "Are you sure you want to leave this game? You can rejoin later using the invite link."
              : `Are you sure you want to remove ${participantToRemove?.user.name || participantToRemove?.user.email} from the game?`
          }
          confirmText={isRemovingSelf ? "Leave Game" : "Remove Player"}
          cancelText="Cancel"
          onConfirm={() => showRemoveParticipantConfirm && handleRemoveParticipant(showRemoveParticipantConfirm)}
          onCancel={() => setShowRemoveParticipantConfirm(null)}
          isDestructive={true}
        />

        {/* Delete Game Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={showDeleteGameConfirm}
          title="Delete Game"
          message="Are you sure you want to delete this game? This action cannot be undone and will remove all game data including participants, characters, and chat messages."
          confirmText="Delete Game"
          cancelText="Cancel"
          onConfirm={handleDeleteGame}
          onCancel={() => setShowDeleteGameConfirm(false)}
          isDestructive={true}
        />

        {/* Character Sheet Modal */}
        {showCharacterSheet && selectedCharacter && (
          isReadOnly ? (
            <ReadOnlyCharacterSheet
              character={selectedCharacter}
              isDM={isDM}
              onClose={handleCloseCharacterSheet}
            />
          ) : (
            <CharacterSheet
              character={selectedCharacter}
              onClose={handleCloseCharacterSheet}
              onCharacterDeleted={handleCloseCharacterSheet}
              onCharacterUpdated={() => {
                // Refresh game data when character is updated
                refreshGameData();
                onGameUpdated?.();
              }}
            />
          )
        )}
      </div>
    </>
  );
}