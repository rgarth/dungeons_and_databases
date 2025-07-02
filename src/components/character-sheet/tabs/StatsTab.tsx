"use client";

import { useState, useEffect } from "react";
import { Shield, HelpCircle, Star, Sparkles, Sword } from "lucide-react";
import { createCharacterCalculations } from "@/services/character/calculations";
import { HitPointsDisplay } from "../sections/HitPointsDisplay";
import { RacialFeaturesService, type RacialTrait } from "@/services/character/racial-features";
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
    subrace?: string;
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

export function StatsTab({ character, equippedArmor, currentArmorClass: passedArmorClass, onUpdate }: StatsTabProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [racialTraits, setRacialTraits] = useState<RacialTrait[]>([]);
  const [classFeatures] = useState<string[]>([]);

  // Load racial traits when character changes
  useEffect(() => {
    const loadTraits = async () => {
      try {
        const traits = await RacialFeaturesService.getRacialTraits(character.race, character.subrace);
        setRacialTraits(traits);
      } catch (error) {
        console.warn('Failed to load racial traits:', error);
        setRacialTraits([]);
      }
    };

    if (character.race) {
      loadTraits();
    }
  }, [character.race, character.subrace]);

  // Handle clicking outside tooltips to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeTooltip && !(event.target as Element).closest('[data-tooltip]')) {
        setActiveTooltip(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeTooltip]);

  // Create service instances for clean calculations
  const characterData = {
    ...character,
    armorClass: passedArmorClass || character.armorClass,
    proficiencyBonus: Math.floor((character.level - 1) / 4) + 2,
    hitPoints: character.hitPoints,
    maxHitPoints: character.maxHitPoints,
    speed: character.speed,
    intelligence: character.intelligence,
    wisdom: character.wisdom,
    charisma: character.charisma
  };
  
  // Service instances for calculations (memoized to prevent re-creation)
  const [calc] = useState(() => createCharacterCalculations(characterData));
  
  // Get effective stats (base + equipment modifiers)
  const effectiveStats = {
    strength: character.strength,
    dexterity: character.dexterity,
    constitution: character.constitution,
    intelligence: character.intelligence,
    wisdom: character.wisdom,
    charisma: character.charisma,
    speed: character.speed
  };
  const currentArmorClass = passedArmorClass || character.armorClass;

  const toggleTooltip = (tooltipId: string) => {
    setActiveTooltip(activeTooltip === tooltipId ? null : tooltipId);
  };

  // Helper function to get common uses for each saving throw
  const getSavingThrowUses = (abilityName: string): string => {
    switch (abilityName) {
      case 'Strength':
        return 'Grappling, shoving, breaking free from restraints';
      case 'Dexterity':
        return 'Dodging spells, avoiding traps, acrobatic feats';
      case 'Constitution':
        return 'Resisting poison, disease, extreme conditions';
      case 'Intelligence':
        return 'Resisting psychic damage, illusions, mind control';
      case 'Wisdom':
        return 'Resisting charm, fear, deception, perception checks';
      case 'Charisma':
        return 'Resisting banishment, possession, social manipulation';
      default:
        return 'Various magical and physical effects';
    }
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        {/* First Row - Ability Scores (2 columns) + HP Management (1 column) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Ability Scores - 2/3 */}
          <div className="lg:col-span-2 bg-[var(--color-card)] rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Ability Scores</h3>

            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { name: 'Strength', short: 'STR', value: effectiveStats.strength, baseValue: character.strength },
                { name: 'Dexterity', short: 'DEX', value: effectiveStats.dexterity, baseValue: character.dexterity },
                { name: 'Constitution', short: 'CON', value: effectiveStats.constitution, baseValue: character.constitution },
                { name: 'Intelligence', short: 'INT', value: effectiveStats.intelligence, baseValue: character.intelligence },
                { name: 'Wisdom', short: 'WIS', value: effectiveStats.wisdom, baseValue: character.wisdom },
                { name: 'Charisma', short: 'CHA', value: effectiveStats.charisma, baseValue: character.charisma },
              ].map((ability) => {
                const modifier = calc.getAbilityModifier(ability.name.toLowerCase());
                const modifierText = modifier >= 0 ? `+${modifier}` : `${modifier}`;
                const skills = calc.getSkillsForAbility(ability.name.toLowerCase());
                const proficientSkills = skills.filter(skill => calc.isSkillProficient(skill));
                
                return (
                  <div key={ability.name} className="text-center bg-[var(--color-card-secondary)] rounded-lg p-3">
                    <div className="text-sm text-[var(--color-text-secondary)] mb-1">{ability.short}</div>
                    <div className={`text-2xl font-bold ${effectiveStats[ability.name.toLowerCase() as keyof typeof effectiveStats] !== ability.baseValue ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]'}`}>
                      {effectiveStats[ability.name.toLowerCase() as keyof typeof effectiveStats]}
                      {effectiveStats[ability.name.toLowerCase() as keyof typeof effectiveStats] !== ability.baseValue && (
                        <span className="text-xs text-[var(--color-text-muted)] ml-1">
                          (was {ability.baseValue})
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <span className="text-sm text-[var(--color-accent)]">{modifierText}</span>
                      <button 
                        onClick={() => toggleTooltip(`ability-${ability.name.toLowerCase()}`)}
                        className="cursor-pointer hover:bg-[var(--color-card-tertiary)] rounded p-0.5 inline-flex items-center gap-1 text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
                      >
                        <HelpCircle className="h-3 w-3" />
                      </button>
                    </div>
                    
                    {/* Ability Score Modifier Tooltip */}
                    <div className="relative">
                      {activeTooltip === `ability-${ability.name.toLowerCase()}` && (
                        <div className="absolute z-20 mt-1 p-3 bg-[var(--color-card)] rounded text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)] w-64 left-1/2 transform -translate-x-1/2 shadow-lg">
                          <strong className="text-[var(--color-accent)]">{ability.name} Modifier Breakdown:</strong><br/>
                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between">
                              <span>Base Score:</span>
                              <span className="text-[var(--color-text-muted)]">{ability.baseValue}</span>
                            </div>
                            {effectiveStats[ability.name.toLowerCase() as keyof typeof effectiveStats] !== ability.baseValue && (
                              <div className="flex justify-between">
                                <span>Racial Bonus:</span>
                                <span className="text-[var(--color-success)]">+{effectiveStats[ability.name.toLowerCase() as keyof typeof effectiveStats] - ability.baseValue}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span>Modifier Formula:</span>
                              <span className="text-[var(--color-text-muted)]">({effectiveStats[ability.name.toLowerCase() as keyof typeof effectiveStats]} - 10) ÷ 2</span>
                            </div>
                            <div className="border-t border-[var(--color-border)] pt-1 mt-1">
                              <div className="flex justify-between font-semibold">
                                <span>Total Modifier:</span>
                                <span className="text-[var(--color-accent)]">{modifierText}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-[var(--color-text-muted)]">
                            <strong>Used for:</strong> {ability.name} checks, saves, and related skills
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Skills for this ability */}
                    {proficientSkills.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {proficientSkills.map((skill) => {
                          // Use service to get skill bonus
                          const skillBonus = calc.getSkillBonus(skill);
                          const modifierText = skillBonus >= 0 ? `+${skillBonus}` : `${skillBonus}`;
                          
                          return (
                            <div key={skill} className="relative">
                              <div className="bg-[var(--color-accent)]/20 text-[var(--color-accent)] px-2 py-1 rounded text-xs font-medium inline-flex items-center gap-1">
                                <span>{skill} {modifierText}</span>
                                <button 
                                  onClick={() => toggleTooltip(`skill-${ability.name}-${skill}`)}
                                  className="cursor-pointer hover:bg-[var(--color-accent)]/30 rounded p-0.5"
                                >
                                  <HelpCircle className="h-2.5 w-2.5 text-[var(--color-accent)] opacity-60" />
                                </button>
                              </div>
                              {activeTooltip === `skill-${ability.name}-${skill}` && (
                                <div className="absolute z-10 mt-1 p-2 bg-[var(--color-card)] rounded text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)] w-48 left-1/2 transform -translate-x-1/2">
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

          {/* Hit Points - 1/3 */}
          <div className="bg-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Hit Points</h3>
            <HitPointsDisplay character={character} onUpdate={onUpdate} />
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
                  <button 
                    onClick={() => toggleTooltip('ac-breakdown')}
                    className="cursor-pointer hover:bg-slate-500 rounded p-0.5 ml-1"
                  >
                    <HelpCircle className="h-3 w-3 text-slate-400 hover:text-slate-300" />
                  </button>
                </div>
                <span className="text-white font-bold text-2xl">{currentArmorClass}</span>
                
                {activeTooltip === 'ac-breakdown' && (
                  <div className="absolute z-20 mt-1 p-3 bg-slate-800 rounded text-xs text-slate-300 border border-slate-600 w-80 left-1/2 transform -translate-x-1/2 shadow-lg">
                    <strong className="text-blue-300">Armor Class Breakdown:</strong><br/>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between">
                        <span>Base AC:</span>
                        <span className="text-slate-400">10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dexterity Modifier:</span>
                        <span className="text-slate-400">{calc.getAbilityModifier('dexterity') >= 0 ? '+' : ''}{calc.getAbilityModifier('dexterity')}</span>
                      </div>
                      {equippedArmor.find(a => a.type !== 'Shield') && (
                        <div className="flex justify-between">
                          <span>Armor Bonus:</span>
                          <span className="text-slate-400">+{equippedArmor.find(a => a.type !== 'Shield')!.baseAC - 10}</span>
                        </div>
                      )}
                      {equippedArmor.find(a => a.type === 'Shield') && (
                        <div className="flex justify-between">
                          <span>Shield Bonus:</span>
                          <span className="text-slate-400">+{equippedArmor.find(a => a.type === 'Shield')!.baseAC}</span>
                        </div>
                      )}
                      <div className="border-t border-slate-600 pt-1 mt-1">
                        <div className="flex justify-between font-semibold">
                          <span>Total AC:</span>
                          <span className="text-blue-300">{currentArmorClass}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-slate-400">
                      <strong>How it works:</strong> Base 10 + Dex modifier + Armor + Shield
                    </div>
                  </div>
                )}
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
                  className={`text-center p-3 rounded-lg border-2 transition-colors relative ${
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
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className="text-xs text-yellow-300">
                      {calc.getAbilityModifier(ability.name.toLowerCase())}{isProficient ? ` + ${calc.proficiencyBonus}` : ''}
                    </span>
                    <button 
                      onClick={() => toggleTooltip(`saving-throw-${ability.name.toLowerCase()}`)}
                      className="cursor-pointer hover:bg-slate-500 rounded p-0.5"
                    >
                      <HelpCircle className="h-3 w-3 text-yellow-300" />
                    </button>
                  </div>
                  
                  {/* Tooltip */}
                  {activeTooltip === `saving-throw-${ability.name.toLowerCase()}` && (
                    <div className="absolute z-50 top-full left-1/2 transform -translate-x-1/2 mt-2 p-3 bg-slate-800 rounded text-xs text-slate-300 border border-slate-600 w-64 shadow-lg">
                      <strong className="text-green-300">{ability.name} Saving Throw:</strong><br/>
                      <strong>Formula:</strong> 1d20 {modifierText}<br/>
                      <strong>Breakdown:</strong> {ability.name} modifier ({calc.getAbilityModifier(ability.name.toLowerCase()) >= 0 ? '+' : ''}{calc.getAbilityModifier(ability.name.toLowerCase())}){isProficient ? ` + Proficiency (+${calc.proficiencyBonus})` : ''}<br/>
                      <strong>Common uses:</strong> {getSavingThrowUses(ability.name)}<br/>
                      <strong>Proficiency:</strong> {isProficient ? 'Yes - from your class' : 'No - only ability modifier'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Racial and Class Traits Section */}
        {(racialTraits.length > 0 || classFeatures.length > 0) && (
          <div className="bg-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              Racial & Class Features
            </h3>
            
            {/* Racial Traits */}
            {racialTraits.length > 0 && (
              <div className="mb-6">
                <h4 className="text-md font-medium text-purple-300 mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Racial Traits
                </h4>
                <div className="flex flex-wrap gap-2">
                  {racialTraits.map((trait, index) => (
                    <div key={index} className="relative flex items-center gap-2">
                      <span className="bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                        {trait.name}
                      </span>
                      <button
                        onClick={() => toggleTooltip(`racial-${index}`)}
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                        data-tooltip
                      >
                        <HelpCircle className="h-4 w-4" />
                      </button>
                      {activeTooltip === `racial-${index}` && (
                        <div className="absolute z-50 top-full left-0 mt-2 p-3 bg-slate-800 rounded text-sm text-slate-300 border border-slate-600 w-80 shadow-lg" data-tooltip>
                          <strong className="text-purple-300">{trait.name}</strong><br/>
                          {trait.description}<br/>
                          <span className="text-xs text-slate-400 mt-1 block">
                            Type: {trait.type === 'active' ? 'Action Required' : 'Always Active'}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Class Features */}
            {classFeatures.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-blue-300 mb-3 flex items-center gap-2">
                  <Sword className="h-4 w-4" />
                  Class Features
                </h4>
                <div className="space-y-2">
                  {classFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                        {feature}
                      </span>
                      <button
                        onClick={() => toggleTooltip(`class-${index}`)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </button>
                      {activeTooltip === `class-${index}` && (
                        <div className="absolute z-10 mt-1 p-3 bg-slate-800 rounded text-sm text-slate-300 border border-slate-600 w-80 left-1/2 transform -translate-x-1/2 shadow-lg">
                          <strong className="text-blue-300">{feature}</strong><br/>
                          Class feature description will be added here.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

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