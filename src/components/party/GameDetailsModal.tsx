"use client";


import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Copy, Users, MessageSquare, Calendar, User, BookOpen, MessageCircle } from 'lucide-react';

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

interface GameDetailsModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GameDetailsModal({ game, isOpen, onClose }: GameDetailsModalProps) {
  const { data: session } = useSession();
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'lobby' | 'characters' | 'notes' | 'chat'>('lobby');

  if (!isOpen || !game) return null;

  const isDM = game.dm.email === session?.user?.email;
  const inviteCode = game.id.slice(0, 8).toUpperCase(); // Simple invite code for now

  const inviteUrl = `${window.location.origin}/invite/${inviteCode}`;

  const copyInviteCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopyFeedback('Code copied');
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch (err) {
      console.error('Failed to copy invite code:', err);
    }
  };

  const copyInviteUrl = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopyFeedback('URL copied');
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch (err) {
      console.error('Failed to copy invite URL:', err);
    }
  };

  const getPlayerCount = () => {
    return game.participants.filter(p => !p.isDm).length;
  };

  const getCharacterCount = () => {
    return game.participants.filter(p => p.character).length;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
      <Card className="w-full max-w-4xl mx-4 h-[90vh] flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                {game.name}
              </h2>
              {isDM && (
                <span className="inline-block bg-[var(--color-success)] text-[var(--color-success-text)] px-3 py-1 rounded-full text-sm font-medium">
                  You are the DM
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              ✕
            </button>
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
              <MessageCircle className="h-4 w-4 inline mr-2" />
              Chat
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'lobby' && (
            <div>
              {/* Description */}
              {game.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    Description
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">{game.description}</p>
                </div>
              )}

              {/* Game Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                  <Users className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                  <div>
                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Players</div>
                    <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{getPlayerCount()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                  <User className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                  <div>
                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Characters</div>
                    <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{getCharacterCount()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                  <MessageSquare className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                  <div>
                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Messages</div>
                    <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{game._count.chatMessages}</div>
                  </div>
                </div>
              </div>

              {/* Invite Section */}
              <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
                  Invite Players
                </h3>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Invite Code
                  </label>
                  <div className="w-full px-4 py-3 font-mono text-xl font-bold rounded-lg text-center mb-3 border-2" style={{ backgroundColor: 'var(--color-surface-tertiary)', color: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}>
                    {inviteCode}
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Button
                        onClick={copyInviteCode}
                        variant="primary"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Copy Code
                      </Button>
                      {copyFeedback === 'Code copied' && (
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
                          <div className="text-sm px-2 py-1 rounded" style={{ backgroundColor: 'var(--color-surface-tertiary)', color: 'var(--color-text-primary)' }}>
                            Copied
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 relative">
                      <Button
                        onClick={copyInviteUrl}
                        variant="primary"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Copy URL
                      </Button>
                      {copyFeedback === 'URL copied' && (
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
                          <div className="text-sm px-2 py-1 rounded" style={{ backgroundColor: 'var(--color-surface-tertiary)', color: 'var(--color-text-primary)' }}>
                            Copied
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Participants */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                  Participants ({game.participants.length})
                </h3>
                <div className="flex flex-wrap gap-3">
                  {game.participants.map((participant, index) => {
                    // Use different background colors for each player - DM gets a distinctive color, others get neutral colors
                    const playerBackgroundColors = [
                      'var(--color-surface-secondary)',
                      'var(--color-card-secondary)', 
                      'var(--color-surface-tertiary)',
                      'var(--color-card-tertiary)'
                    ];
                    const backgroundColor = participant.isDm 
                      ? 'var(--color-surface-quaternary)' 
                      : playerBackgroundColors[index % playerBackgroundColors.length];
                    
                    return (
                      <div
                        key={participant.id}
                        className="flex items-center p-3 rounded-lg"
                        style={{ backgroundColor }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ backgroundColor: 'var(--color-surface-secondary)', color: 'var(--color-text-primary)', border: '2px solid var(--color-border)' }}>
                            {participant.user.name?.[0] || participant.user.email[0].toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
                              {participant.user.name || participant.user.email}
                              {participant.isDm && (
                                <span className="ml-2 text-xs bg-[var(--color-success)] text-[var(--color-success-text)] px-2 py-1 rounded">
                                  DM
                                </span>
                              )}
                            </div>
                            {participant.character && (
                              <div className="text-sm truncate" style={{ color: 'var(--color-text-secondary)' }}>
                                {participant.character.name} - Level {participant.character.level} {participant.character.race} {participant.character.class}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Game Info */}
              <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-3 w-3" />
                  Created: {new Date(game.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  Last updated: {new Date(game.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'characters' && (
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Characters ({getCharacterCount()})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {game.participants
                  .filter(p => p.character)
                  .map((participant) => (
                    <div
                      key={participant.character!.id}
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: 'var(--color-card-secondary)' }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-text)' }}>
                          {participant.character!.name[0]}
                        </div>
                        <div>
                          <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                            {participant.character!.name}
                          </div>
                          <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Level {participant.character!.level} {participant.character!.race} {participant.character!.class}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        Player: {participant.user.name || participant.user.email}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Game Notes
              </h3>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                <p className="text-[var(--color-text-secondary)] italic">
                  Notes feature coming soon...
                </p>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Game Chat
              </h3>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                <p className="text-[var(--color-text-secondary)] italic">
                  Chat feature coming soon...
                </p>
              </div>
            </div>
          )}


        </div>
      </Card>
    </div>
  );
} 