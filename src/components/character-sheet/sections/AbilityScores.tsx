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
    <div className="w-64 bg-slate-800 p-6 border-r border-slate-700 overflow-y-auto">
      <h3 className="text-lg font-semibold text-white mb-4">Ability Scores</h3>
      <div className="space-y-4">
        {abilities.map((ability) => (
          <div key={ability.name} className="bg-slate-700 rounded-lg p-4 text-center">
            <div className="text-xs text-slate-400 mb-1">{ability.short}</div>
            <div className="text-2xl font-bold text-white mb-1">{ability.value}</div>
            <div className="text-sm text-slate-300">
              {getModifier(ability.value) >= 0 ? '+' : ''}{getModifier(ability.value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 