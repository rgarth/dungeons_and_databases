"use client";

import { useState } from "react";
import { Shield, HelpCircle, Star } from "lucide-react";
import { HitPointsDisplay } from "../sections/HitPointsDisplay";
import { createCharacterCalculations } from "@/services/character/calculations";
import { createCharacterEquipment } from "@/services/character/equipment";
// Service layer now handles these calculations
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
    inspiration?: boolean;
    deathSaveSuccesses?: number;
    deathSaveFailures?: number;
  };
  equippedArmor: Armor[];
  modifiedStats?: Record<string, number>;
  currentArmorClass?: number;
  onUpdate: (updates: { 
    hitPoints?: number; 
    temporaryHitPoints?: number; 
    spellsPrepared?: Spell[]; 
    inspiration?: boolean;
    deathSaveSuccesses?: number;
    deathSaveFailures?: number;
  }) => void;
}

export function StatsTab({ character, equippedArmor, modifiedStats, currentArmorClass: passedArmorClass, onUpdate }: StatsTabProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  
  // Create service instances for clean calculations
  const calc = createCharacterCalculations(character);
  const equipment = createCharacterEquipment(character);
  
  // Use equipment service for AC calculation
  const currentArmorClass = passedArmorClass ?? equipment.calculateArmorClass(equippedArmor);
  
  // Use modified stats if provided, otherwise use base character stats
  const effectiveStats = modifiedStats ? {
    strength: modifiedStats.strength ?? character.strength,
    dexterity: modifiedStats.dexterity ?? character.dexterity,
    constitution: modifiedStats.constitution ?? character.constitution,
    intelligence: modifiedStats.intelligence ?? character.intelligence,
    wisdom: modifiedStats.wisdom ?? character.wisdom,
    charisma: modifiedStats.charisma ?? character.charisma,
    speed: modifiedStats.speed ?? character.speed,
  } : {
    strength: character.strength,
    dexterity: character.dexterity,
    constitution: character.constitution,
    intelligence: character.intelligence,
    wisdom: character.wisdom,
    charisma: character.charisma,
    speed: character.speed,
  };

  const toggleTooltip = (tooltipId: string) => {
    setActiveTooltip(activeTooltip === tooltipId ? null : tooltipId);
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        {/* First Row - Ability Scores (2 columns) + HP Management (1 column) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Ability Scores - 2/3 */}
          <div className="lg:col-span-2 bg-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Ability Scores</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { name: 'Strength', short: 'STR', value: effectiveStats.strength, baseValue: character.strength },
                { name: 'Dexterity', short: 'DEX', value: effectiveStats.dexterity, baseValue: character.dexterity },
                { name: 'Constitution', short: 'CON', value: effectiveStats.constitution, baseValue: character.constitution },
                { name: 'Intelligence', short: 'INT', value: effectiveStats.intelligence, baseValue: character.intelligence },
                { name: 'Wisdom', short: 'WIS', value: effectiveStats.wisdom, baseValue: character.wisdom },
                { name: 'Charisma', short: 'CHA', value: effectiveStats.charisma, baseValue: character.charisma },
              ].map((ability) => {
                // Use service to get skills for this ability
                const skillsForAbility = calc.getSkillsForAbility(ability.name.toLowerCase());
                const modifier = calc.getAbilityModifier(ability.name.toLowerCase());
                
                return (
                  <div key={ability.name} className="bg-slate-600 rounded-lg p-3 text-center relative">
                    <div className="text-xs text-slate-400 mb-1 font-medium">{ability.short}</div>
                    <div className={`text-xl font-bold mb-1 ${ability.value !== ability.baseValue ? 'text-purple-300' : 'text-white'}`}>
                      {ability.value}
                      {ability.value !== ability.baseValue && (
                        <span className="text-xs text-slate-400 ml-1">
                          (was {ability.baseValue})
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-slate-300 mb-2 relative">
                      <div className="flex items-center justify-center gap-1">
                        <span>Mod: {modifier >= 0 ? '+' : ''}{modifier}</span>
                        <button 
                          onClick={() => toggleTooltip(`ability-${ability.name}`)}
                          className="cursor-pointer hover:bg-slate-500 rounded p-0.5"
                        >
                          <HelpCircle className="h-3 w-3 text-slate-400 hover:text-slate-300" />
                        </button>
                      </div>
                      {activeTooltip === `ability-${ability.name}` && (
                        <div className="absolute z-20 mt-1 p-3 bg-slate-800 rounded text-xs text-slate-300 border border-slate-600 w-56 left-1/2 transform -translate-x-1/2 shadow-lg">
                          <strong>Ability Modifier:</strong> Add this to d20 rolls using {ability.name}.<br/>
                          <strong>Calculation:</strong> ({ability.value} - 10) ÷ 2 = {modifier}<br/>
                          <strong>Used for:</strong> Basic {ability.name} checks and saving throws.
                        </div>
                      )}
                    </div>
                    
                    {/* Skill Proficiency Badges */}
                    {skillsForAbility.length > 0 && (
                      <div className="flex flex-wrap gap-1 justify-center">
                        {skillsForAbility.map((skill) => {
                          // Use service to get skill bonus
                          const skillBonus = calc.getSkillBonus(skill);
                          const modifierText = skillBonus >= 0 ? `+${skillBonus}` : `${skillBonus}`;
                          
                          return (
                            <div key={skill} className="relative">
                              <div className="bg-purple-900/40 text-purple-300 px-2 py-1 rounded text-xs font-medium inline-flex items-center gap-1">
                                <span>{skill} {modifierText}</span>
                                <button 
                                  onClick={() => toggleTooltip(`skill-${ability.name}-${skill}`)}
                                  className="cursor-pointer hover:bg-purple-800/40 rounded p-0.5"
                                >
                                  <HelpCircle className="h-2.5 w-2.5 text-purple-200 opacity-60" />
                                </button>
                              </div>
                              {activeTooltip === `skill-${ability.name}-${skill}` && (
                                <div className="absolute z-10 mt-1 p-2 bg-slate-800 rounded text-xs text-slate-300 border border-slate-600 w-48 left-1/2 transform -translate-x-1/2">
                                  <strong>{skill} Check:</strong> Roll 1d20 {modifierText}<br/>
                                  <strong>Breakdown:</strong> {ability.name} modifier ({modifier >= 0 ? '+' : ''}{modifier}) + Proficiency (+{calc.proficiencyBonus})<br/>
                                  <strong>Why:</strong> You&apos;re trained in this skill!
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* HP Management - 1/3 */}
          <div className="bg-slate-700 rounded-lg p-4">
            <HitPointsDisplay 
              character={{
                id: character.id,
                class: character.class,
                hitPoints: character.hitPoints,
                maxHitPoints: character.maxHitPoints,
                temporaryHitPoints: character.temporaryHitPoints,
                constitution: character.constitution,
                deathSaveSuccesses: character.deathSaveSuccesses,
                deathSaveFailures: character.deathSaveFailures,
              }}
              onUpdate={onUpdate}
            />
          </div>
        </div>

        {/* Second Row - Combat Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          {/* Combat Stats */}
          <div className="bg-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-400" />
              Combat Stats
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {/* Armor Class */}
              <div className="text-center">
                <div className="flex justify-center items-center mb-2">
                  <Shield className="h-4 w-4 text-blue-400 mr-2" />
                  <span className="text-slate-300 text-sm">AC</span>
                </div>
                <span className="text-white font-bold text-2xl">{currentArmorClass}</span>
              </div>

              {/* Speed */}
              <div className="text-center">
                <div className="text-slate-300 text-sm mb-2">Speed</div>
                <span className={`font-bold text-2xl ${effectiveStats.speed !== character.speed ? 'text-purple-300' : 'text-white'}`}>
                  {effectiveStats.speed}
                  {effectiveStats.speed !== character.speed && (
                    <span className="text-xs text-slate-400 ml-1">
                      (was {character.speed})
                    </span>
                  )}
                </span>
                <div className="text-slate-400 text-xs">ft</div>
              </div>

              {/* Proficiency Bonus */}
              <div className="text-center">
                <div className="text-slate-300 text-sm mb-2">Prof</div>
                <span className="text-white font-bold text-2xl">+{calc.proficiencyBonus}</span>
              </div>

              {/* Inspiration */}
              <div className="text-center relative">
                <div className="flex justify-center items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-400 mr-2" />
                  <span className="text-slate-300 text-sm">Inspiration</span>
                  <button 
                    onClick={() => toggleTooltip('inspiration')}
                    className="cursor-pointer hover:bg-slate-500 rounded p-0.5 ml-1"
                  >
                    <HelpCircle className="h-3 w-3 text-slate-400 hover:text-slate-300" />
                  </button>
                </div>
                <button
                  onClick={() => onUpdate({ inspiration: !character.inspiration })}
                  className={`transition-all ${
                    character.inspiration 
                      ? 'text-yellow-400' 
                      : 'text-slate-400 hover:text-yellow-400'
                  }`}
                  title={character.inspiration ? 'Click to use inspiration' : 'No inspiration (DM awards this)'}
                >
                  <Star className={`h-8 w-8 mx-auto ${character.inspiration ? 'fill-current' : ''}`} />
                </button>
                <div className="text-slate-400 text-xs mt-1">
                  {character.inspiration ? 'Available' : 'None'}
                </div>
                
                {activeTooltip === 'inspiration' && (
                  <div className="absolute z-20 mt-1 p-3 bg-slate-800 rounded text-xs text-slate-300 border border-slate-600 w-64 left-1/2 transform -translate-x-1/2 shadow-lg">
                    <strong>Inspiration:</strong> Spend to gain advantage on any attack roll, saving throw, or ability check.<br/>
                    <strong>Advantage:</strong> Roll 2d20, take the higher result.<br/>
                    <strong>How to get:</strong> DM awards for great roleplay, heroic acts, or creative solutions.<br/>
                                         <strong>Limit:</strong> You either have it or you don&apos;t (can&apos;t stack multiple).
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Saving Throws Section */}
        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-400" />
            Saving Throws
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'Strength', value: effectiveStats.strength },
              { name: 'Dexterity', value: effectiveStats.dexterity },
              { name: 'Constitution', value: effectiveStats.constitution },
              { name: 'Intelligence', value: effectiveStats.intelligence },
              { name: 'Wisdom', value: effectiveStats.wisdom },
              { name: 'Charisma', value: effectiveStats.charisma }
            ].map((ability) => {
              const isProficient = calc.isSavingThrowProficient(ability.name.toLowerCase());
              const bonus = calc.getSavingThrowBonus(ability.name.toLowerCase());
              const modifierText = bonus >= 0 ? `+${bonus}` : `${bonus}`;
              
              return (
                <div 
                  key={ability.name} 
                  className={`text-center p-3 rounded-lg border-2 transition-colors ${
                    isProficient 
                      ? 'bg-green-900/20 border-green-600/30' 
                      : 'bg-slate-600 border-slate-500'
                  }`}
                >
                  <div className="text-sm text-slate-300 mb-1">{ability.name}</div>
                  <div className={`text-2xl font-bold ${isProficient ? 'text-green-400' : 'text-white'}`}>
                    {modifierText}
                  </div>
                  {isProficient && (
                    <div className="text-xs text-green-300 mt-1">Proficient</div>
                  )}
                  <div className="text-xs text-slate-400 mt-1">
                    {calc.getAbilityModifier(ability.name.toLowerCase())}{isProficient ? ` + ${calc.proficiencyBonus}` : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Character Descriptions */}
        {(character.appearance || character.personality || character.backstory || character.notes) && (
          <div className="space-y-4">
            {character.appearance && (
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Appearance</h3>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{character.appearance}</p>
              </div>
            )}

            {character.personality && (
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Personality</h3>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{character.personality}</p>
              </div>
            )}

            {character.backstory && (
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Backstory</h3>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{character.backstory}</p>
              </div>
            )}

            {character.notes && (
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Notes</h3>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{character.notes}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 