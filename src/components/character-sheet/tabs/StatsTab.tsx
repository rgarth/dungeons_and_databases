"use client";

import { Shield, BookOpen } from "lucide-react";
import { getProficiencyBonus } from "@/lib/dnd/core";
import { calculateArmorClass } from "@/lib/dnd/equipment";
import { HitPointsDisplay } from "../sections/HitPointsDisplay";
import type { Armor } from "@/lib/dnd/equipment";
import type { Spell } from "@/lib/dnd/spells";

interface StatsTabProps {
  character: {
    id: string;
    name: string;
    race: string;
    class: string;
    level: number;
    background?: string;
    alignment?: string;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    hitPoints: number;
    maxHitPoints: number;
    temporaryHitPoints?: number;
    armorClass: number;
    speed: number;
    skills?: string[];
    appearance?: string;
    personality?: string;
    backstory?: string;
    notes?: string;
  };
  equippedArmor: Armor[];
  onUpdate: (updates: { hitPoints?: number; temporaryHitPoints?: number; spellsPrepared?: Spell[] }) => void;
}

export function StatsTab({ character, equippedArmor, onUpdate }: StatsTabProps) {
  const proficiencyBonus = getProficiencyBonus(character.level);
  const currentArmorClass = calculateArmorClass(equippedArmor, character.dexterity);

  return (
    <div className="space-y-6">
      {/* Combat Stats */}
      <div className="bg-slate-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-400" />
          Combat Stats
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hit Points */}
          <HitPointsDisplay 
            character={{
              id: character.id,
              class: character.class,
              hitPoints: character.hitPoints,
              maxHitPoints: character.maxHitPoints,
              temporaryHitPoints: character.temporaryHitPoints,
              constitution: character.constitution,
            }}
            onUpdate={onUpdate}
          />

          {/* Other Combat Stats */}
          <div className="space-y-4">
            {/* Armor Class */}
            <div className="flex justify-between items-center">
              <span className="text-slate-300 flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                Armor Class
              </span>
              <span className="text-white font-semibold text-xl">{currentArmorClass}</span>
            </div>

            {/* Speed */}
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Speed</span>
              <span className="text-white font-semibold">{character.speed} ft</span>
            </div>

            {/* Proficiency Bonus */}
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Proficiency Bonus</span>
              <span className="text-white font-semibold">+{proficiencyBonus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      {character.skills && character.skills.length > 0 && (
        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Skill Proficiencies
          </h3>
          <div className="flex flex-wrap gap-2">
            {character.skills.map((skill) => (
              <span
                key={skill}
                className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-lg text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Character Details */}
      <div className="bg-slate-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Character Details</h3>
        <div className="space-y-3">
          <div>
            <span className="text-slate-400 text-sm">Race:</span>
            <p className="text-white">{character.race}</p>
          </div>
          <div>
            <span className="text-slate-400 text-sm">Class:</span>
            <p className="text-white">{character.class}</p>
          </div>
          <div>
            <span className="text-slate-400 text-sm">Level:</span>
            <p className="text-white">{character.level}</p>
          </div>
          {character.background && (
            <div>
              <span className="text-slate-400 text-sm">Background:</span>
              <p className="text-white">{character.background}</p>
            </div>
          )}
          {character.alignment && (
            <div>
              <span className="text-slate-400 text-sm">Alignment:</span>
              <p className="text-white">{character.alignment}</p>
            </div>
          )}
        </div>
      </div>

      {/* Character Descriptions */}
      {(character.appearance || character.personality || character.backstory || character.notes) && (
        <div className="space-y-4">
          {character.appearance && (
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Appearance</h3>
              <p className="text-slate-300 leading-relaxed">{character.appearance}</p>
            </div>
          )}

          {character.personality && (
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Personality</h3>
              <p className="text-slate-300 leading-relaxed">{character.personality}</p>
            </div>
          )}

          {character.backstory && (
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Backstory</h3>
              <p className="text-slate-300 leading-relaxed">{character.backstory}</p>
            </div>
          )}

          {character.notes && (
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Notes</h3>
              <p className="text-slate-300 leading-relaxed">{character.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 