"use client";

import { useState, useEffect } from 'react';
import { X, Dice1, Users, Skull, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui';
import { Encounter, InitiativeOrder } from '@/types/encounter';
import { getModifier } from '@/lib/dnd/core';

interface InitiativeRollerProps {
  encounter: Encounter;
  isOpen: boolean;
  onClose: () => void;
  onInitiativeUpdated: (encounter: Encounter) => void;
  isDM: boolean;
}

export default function InitiativeRoller({
  encounter,
  isOpen,
  onClose,
  onInitiativeUpdated,
  isDM
}: InitiativeRollerProps) {
  const [initiativeOrder, setInitiativeOrder] = useState<InitiativeOrder[]>([]);
  const [rolling, setRolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      buildInitiativeOrder();
    }
  }, [isOpen, encounter]);

  const buildInitiativeOrder = () => {
    const order: InitiativeOrder[] = [];

    // Add characters
    encounter.participants.forEach(participant => {
      order.push({
        id: participant.id,
        name: participant.characterName,
        type: 'character' as const,
        initiative: participant.initiative || 0,
        currentHP: participant.currentHP,
        maxHP: participant.maxHP,
        isActive: participant.isActive
      });
    });

    // Add monsters
    encounter.monsters.forEach(monster => {
      for (let i = 0; i < monster.quantity; i++) {
        order.push({
          id: `${monster.id}-${i}`,
          name: `${monster.monsterName} ${monster.quantity > 1 ? `#${i + 1}` : ''}`,
          type: 'monster' as const,
          initiative: monster.initiative || 0,
          currentHP: monster.currentHP,
          maxHP: monster.maxHP,
          isActive: monster.isActive
        });
      }
    });

    setInitiativeOrder(order);
  };

  const rollInitiativeForMonsters = () => {
    const updatedOrder = initiativeOrder.map(participant => {
      if (participant.type === 'monster' && participant.initiative === 0) {
        // Roll d20 + monster's dexterity modifier
        const monsterData = encounter.monsters.find(m => 
          participant.id.startsWith(m.id)
        );
        if (monsterData) {
          const dexMod = getModifier(monsterData.monsterData.dexterity);
          const roll = Math.floor(Math.random() * 20) + 1;
          const initiative = roll + dexMod;
          return { ...participant, initiative };
        }
      }
      return participant;
    });
    setInitiativeOrder(updatedOrder);
  };

  const rollInitiativeForCharacter = (participantId: string) => {
    const participant = encounter.participants.find(p => p.id === participantId);
    if (!participant) return;

    const dexMod = getModifier(participant.characterData.dexterity);
    const roll = Math.floor(Math.random() * 20) + 1;
    const initiative = roll + dexMod;

    const updatedOrder = initiativeOrder.map(p => 
      p.id === participantId ? { ...p, initiative } : p
    );
    setInitiativeOrder(updatedOrder);
  };

  const saveInitiativeOrder = async () => {
    try {
      setRolling(true);
      setError(null);

      // Update all participants and monsters with their initiative values
      const updates = [];

      // Update participants
      for (const participant of encounter.participants) {
        const initiativeData = initiativeOrder.find(p => p.id === participant.id);
        if (initiativeData && initiativeData.initiative > 0) {
          updates.push(
            fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}/participants/${participant.id}/initiative`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ initiative: initiativeData.initiative })
            })
          );
        }
      }

      // Update monsters
      for (const monster of encounter.monsters) {
        const monsterInitiative = initiativeOrder.find(p => 
          p.id.startsWith(monster.id) && p.initiative > 0
        );
        if (monsterInitiative) {
          updates.push(
            fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}/monsters/${monster.id}/initiative`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ initiative: monsterInitiative.initiative })
            })
          );
        }
      }

      await Promise.all(updates);

      // Fetch updated encounter
      const response = await fetch(`/api/games/${encounter.gameId}/encounters/${encounter.id}`);
      if (response.ok) {
        const updatedEncounter = await response.json();
        onInitiativeUpdated(updatedEncounter);
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save initiative');
    } finally {
      setRolling(false);
    }
  };

  const sortedInitiativeOrder = [...initiativeOrder].sort((a, b) => {
    if (a.initiative === 0 && b.initiative === 0) return 0;
    if (a.initiative === 0) return 1;
    if (b.initiative === 0) return -1;
    return b.initiative - a.initiative;
  });

  const allRolled = initiativeOrder.every(p => p.initiative > 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            Roll Initiative
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm bg-red-50 border border-red-200 rounded-md p-2">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          {isDM && (
            <Button
              onClick={rollInitiativeForMonsters}
              className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]"
            >
              <Dice1 className="h-4 w-4 mr-1" />
              Roll Monster Initiative
            </Button>
          )}
          <Button
            onClick={saveInitiativeOrder}
            disabled={!allRolled || rolling}
            className="bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-[var(--color-success-text)]"
          >
            <ArrowUpDown className="h-4 w-4 mr-1" />
            {rolling ? 'Saving...' : 'Save Initiative Order'}
          </Button>
        </div>

        {/* Initiative Order */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
            Initiative Order
          </h3>
          
          {sortedInitiativeOrder.length === 0 ? (
            <p className="text-[var(--color-text-secondary)] text-center py-4">
              No participants in this encounter
            </p>
          ) : (
                         <div className="space-y-2">
               {sortedInitiativeOrder.map((participant) => (
                <div
                  key={participant.id}
                  className={`flex items-center justify-between p-3 rounded-md border ${
                    participant.initiative > 0 
                      ? 'bg-[var(--color-surface)] border-[var(--color-border)]' 
                      : 'bg-[var(--color-surface)] border-[var(--color-border)] opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {participant.type === 'character' ? (
                        <Users className="h-4 w-4 text-blue-500" />
                      ) : (
                        <Skull className="h-4 w-4 text-red-500" />
                      )}
                      <span className="font-medium text-[var(--color-text-primary)]">
                        {participant.name}
                      </span>
                    </div>
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {participant.type === 'character' ? 'Character' : 'Monster'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {participant.initiative > 0 ? (
                      <span className="font-mono text-lg font-bold text-[var(--color-accent)]">
                        {participant.initiative}
                      </span>
                    ) : (
                      <span className="text-sm text-[var(--color-text-secondary)]">
                        Not rolled
                      </span>
                    )}
                    
                                         {participant.type === 'character' && participant.initiative === 0 && (
                       <Button
                         onClick={() => rollInitiativeForCharacter(participant.id)}
                         size="sm"
                         className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]"
                       >
                         <Dice1 className="h-3 w-3 mr-1" />
                         Roll
                       </Button>
                     )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!allRolled && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              {isDM 
                ? "Roll initiative for all participants before saving the order."
                : "The DM needs to roll initiative for all participants."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 