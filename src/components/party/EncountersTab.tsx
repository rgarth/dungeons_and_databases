"use client";

import { useState } from 'react';
import { Plus, Sword, Users, Skull, Play, Edit, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui';
import { Encounter } from '@/types/encounter';
import CreateEncounterModal from './CreateEncounterModal';
import EncounterDetailsModal from './EncounterDetailsModal';
import { useEncounterEvents } from '@/hooks/use-encounter-events';
import { useEncountersCache } from '@/hooks/use-encounters-cache';

interface EncountersTabProps {
  gameId: string;
  isDM: boolean;
}

export default function EncountersTab({ gameId, isDM }: EncountersTabProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEncounter, setSelectedEncounter] = useState<Encounter | null>(null);

  // Use the encounters cache hook
  const {
    encounters,
    loading,
    fetchEncounters,
    handleEncounterCreated,
    handleEncounterUpdated,
    handleEncounterDeleted
  } = useEncountersCache({
    gameId,
    onEncounterCreated: (encounter) => {
      console.log('📋 Encounter created:', encounter.name);
    },
    onEncounterUpdated: (encounter) => {
      console.log('📋 Encounter updated:', encounter.name);
    },
    onEncounterDeleted: (encounterId) => {
      console.log('📋 Encounter deleted:', encounterId);
    }
  });

  // Set up real-time encounter events
  useEncounterEvents({
    gameId,
    onEncounterCreated: handleEncounterCreated,
    onEncounterUpdated: handleEncounterUpdated,
    onEncounterDeleted: handleEncounterDeleted
  });

  const handleCreateEncounter = () => {
    // Don't manually add to state - the real-time event will handle it
    setShowCreateModal(false);
  };

  const handleEncounterSelect = (encounter: Encounter) => {
    setSelectedEncounter(encounter);
    setShowDetailsModal(true);
  };

  const getParticipantCount = (encounter: Encounter) => {
    const characterCount = encounter.participants.length;
    const monsterCount = encounter.monsters.reduce((total, monster) => total + monster.quantity, 0);
    return { characterCount, monsterCount };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--color-accent)' }}></div>
          <div style={{ color: 'var(--color-text-secondary)' }}>Loading encounters...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Encounters</h2>
          <p className="text-[var(--color-text-secondary)]">
            Manage combat encounters for your game
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => fetchEncounters(true)}
            disabled={loading}
            className="bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] border border-[var(--color-border)] flex items-center"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          {isDM && (
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Encounter
            </Button>
          )}
        </div>
      </div>

      {/* Encounters List */}
      {encounters.length === 0 ? (
        <div className="text-center py-12">
          <Sword className="h-12 w-12 mx-auto mb-4 text-[var(--color-text-secondary)]" />
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
            No encounters yet
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-4">
            {isDM 
              ? "Create your first encounter to get started with combat management."
              : "The DM hasn't created any encounters yet."
            }
          </p>

        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {encounters.map((encounter) => {
            const { characterCount, monsterCount } = getParticipantCount(encounter);
            return (
              <div
                key={encounter.id}
                className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-accent)] transition-colors cursor-pointer"
                onClick={() => handleEncounterSelect(encounter)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-[var(--color-text-primary)]">
                    {encounter.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    {encounter.isActive && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    )}
                    {isDM && (
                      <div className="flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEncounterSelect(encounter);
                          }}
                          className="p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
                        >
                          <Edit className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {encounter.description && (
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
                    {encounter.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{characterCount}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Skull className="h-3 w-3" />
                      <span>{monsterCount}</span>
                    </div>
                  </div>
                  <div className="text-xs">
                    {new Date(encounter.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {encounter.isActive && (
                  <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
                    <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
                      <Play className="h-3 w-3" />
                      <span>Active Combat</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {showCreateModal && (
        <CreateEncounterModal
          gameId={gameId}
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onEncounterCreated={handleCreateEncounter}
        />
      )}

      {showDetailsModal && selectedEncounter && (
        <EncounterDetailsModal
          encounter={selectedEncounter}
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedEncounter(null);
          }}
          onEncounterUpdated={handleEncounterUpdated}
          onEncounterDeleted={handleEncounterDeleted}
          isDM={isDM}
        />
      )}
    </div>
  );
} 