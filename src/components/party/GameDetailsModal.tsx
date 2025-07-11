"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Copy, Users, MessageSquare, Calendar, User } from 'lucide-react';

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
  const [copied, setCopied] = useState(false);

  if (!isOpen || !game) return null;

  const isDM = game.dm.email === session?.user?.email;
  const inviteCode = game.id.slice(0, 8).toUpperCase(); // Simple invite code for now

  const copyInviteCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy invite code:', err);
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
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                {game.name}
              </h2>
              {isDM && (
                <span className="inline-block bg-[var(--color-accent)] text-[var(--color-accent-text)] px-3 py-1 rounded-full text-sm font-medium">
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
          <div className="mb-6 p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card-secondary)' }}>
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Invite Players
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>Invite Code</div>
                <div className="font-mono text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  {inviteCode}
                </div>
              </div>
              <Button
                onClick={copyInviteCode}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
              Share this code with players to invite them to your game.
            </p>
          </div>

          {/* Participants */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Participants ({game.participants.length})
            </h3>
            <div className="space-y-2">
              {game.participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--color-card-secondary)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-text)' }}>
                      {participant.user.name?.[0] || participant.user.email[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        {participant.user.name || participant.user.email}
                        {participant.isDm && (
                          <span className="ml-2 text-xs bg-[var(--color-accent)] text-[var(--color-accent-text)] px-2 py-1 rounded">
                            DM
                          </span>
                        )}
                      </div>
                      {participant.character && (
                        <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                          {participant.character.name} - Level {participant.character.level} {participant.character.race} {participant.character.class}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary">
              Enter Game
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 