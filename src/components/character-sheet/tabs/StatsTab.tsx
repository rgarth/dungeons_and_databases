"use client";

import { Shield, BookOpen } from "lucide-react";
import { getProficiencyBonus, getModifier } from "@/lib/dnd/core";
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
    <div className="p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* First Row - Stats 2/3 + HP 1/3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ability Scores - 2/3 */}
          <div className="lg:col-span-2 bg-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Ability Scores</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { name: 'Strength', short: 'STR', value: character.strength },
                { name: 'Dexterity', short: 'DEX', value: character.dexterity },
                { name: 'Constitution', short: 'CON', value: character.constitution },
                { name: 'Intelligence', short: 'INT', value: character.intelligence },
                { name: 'Wisdom', short: 'WIS', value: character.wisdom },
                { name: 'Charisma', short: 'CHA', value: character.charisma },
              ].map((ability) => (
                <div key={ability.name} className="bg-slate-600 rounded-lg p-3 text-center">
                  <div className="text-xs text-slate-400 mb-1 font-medium">{ability.short}</div>
                  <div className="text-xl font-bold text-white mb-1">{ability.value}</div>
                  <div className="text-sm text-slate-300">
                    {getModifier(ability.value) >= 0 ? '+' : ''}{getModifier(ability.value)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hit Points - 1/3 */}
          <div className="bg-slate-700 rounded-lg p-4">
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
          </div>
        </div>

        {/* Second Row - Combat Stats 1/2 + Proficiencies 1/2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Combat Stats - 1/2 */}
          <div className="bg-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-400" />
              Combat Stats
            </h3>
            <div className="space-y-4">
              {/* Armor Class */}
              <div className="text-center">
                <div className="flex justify-center items-center mb-2">
                  <Shield className="h-4 w-4 text-blue-400 mr-2" />
                  <span className="text-slate-300 text-sm">Armor Class</span>
                </div>
                <span className="text-white font-bold text-2xl">{currentArmorClass}</span>
              </div>

              {/* Speed */}
              <div className="text-center">
                <div className="text-slate-300 text-sm mb-2">Speed</div>
                <span className="text-white font-bold text-2xl">{character.speed} ft</span>
              </div>

              {/* Proficiency Bonus */}
              <div className="text-center">
                <div className="text-slate-300 text-sm mb-2">Proficiency Bonus</div>
                <span className="text-white font-bold text-2xl">+{proficiencyBonus}</span>
              </div>
            </div>
          </div>

          {/* Skills - 1/2 */}
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
        </div>

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
    </div>
  );
} 