"use client";

import { getModifier } from "@/lib/dnd/core";

interface AbilityScoresProps {
  character: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
}

export function AbilityScores({ character }: AbilityScoresProps) {
  const abilities = [
    { name: 'Strength', short: 'STR', value: character.strength },
    { name: 'Dexterity', short: 'DEX', value: character.dexterity },
    { name: 'Constitution', short: 'CON', value: character.constitution },
    { name: 'Intelligence', short: 'INT', value: character.intelligence },
    { name: 'Wisdom', short: 'WIS', value: character.wisdom },
    { name: 'Charisma', short: 'CHA', value: character.charisma },
  ];

  return (
    <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Ability Scores</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {abilities.map((ability) => (
          <div key={ability.name} className="bg-[var(--color-card-tertiary)] rounded-lg p-3 text-center">
            <div className="text-xs text-[var(--color-text-tertiary)] mb-1 font-medium">{ability.short}</div>
            <div className="text-xl font-bold text-[var(--color-text-primary)] mb-1">{ability.value}</div>
            <div className="text-sm text-[var(--color-text-secondary)]">
              {getModifier(ability.value) >= 0 ? '+' : ''}{getModifier(ability.value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 