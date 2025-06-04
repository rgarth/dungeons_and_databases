"use client";

import { Swords, Sword, Zap, Shield } from "lucide-react";
import { getModifier, getProficiencyBonus } from "@/lib/dnd/core";
import { canEquipWeapon } from "@/lib/dnd/combat";
import { getSpellcastingType, canPrepareSpells, getSpellsPreparedCount } from "@/lib/dnd/level-up";
import type { Weapon, MagicalWeapon } from "@/lib/dnd/equipment";
import type { Spell } from "@/lib/dnd/spells";

interface ActionsTabProps {
  character: {
    id: string;
    class: string;
    level: number;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    hitPoints: number;
    maxHitPoints: number;
    speed: number;
    spellcastingAbility?: string;
    spellSaveDC?: number;
    spellAttackBonus?: number;
    spellSlots?: Record<number, number>;
    spellsKnown?: Spell[];
    spellsPrepared?: Spell[];
    actions?: { type: string; name: string }[];
    bonusActions?: { type: string; name: string }[];
    reactions?: { type: string; name: string }[];
  };
  equippedWeapons: (Weapon | MagicalWeapon)[];
  currentArmorClass: number;
  onOpenSpellPreparation: () => void;
}

export function ActionsTab({ 
  character, 
  equippedWeapons, 
  currentArmorClass, 
  onOpenSpellPreparation 
}: ActionsTabProps) {
  const proficiencyBonus = getProficiencyBonus(character.level);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Combat Stats Summary */}
        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Combat Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center bg-slate-600 rounded p-3">
              <div className="text-2xl font-bold text-blue-400">{currentArmorClass}</div>
              <div className="text-xs text-slate-400">Armor Class</div>
            </div>
            <div className="text-center bg-slate-600 rounded p-3">
              <div className="text-2xl font-bold text-red-400">{character.hitPoints}/{character.maxHitPoints}</div>
              <div className="text-xs text-slate-400">Hit Points</div>
            </div>
            <div className="text-center bg-slate-600 rounded p-3">
              <div className="text-2xl font-bold text-green-400">+{getProficiencyBonus(character.level)}</div>
              <div className="text-xs text-slate-400">Proficiency</div>
            </div>
            <div className="text-center bg-slate-600 rounded p-3">
              <div className="text-2xl font-bold text-yellow-400">{character.speed} ft</div>
              <div className="text-xs text-slate-400">Speed</div>
            </div>
          </div>
        </div>
        
        {/* Weapon Attacks */}
        {equippedWeapons && equippedWeapons.length > 0 && (
          <div className="bg-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Sword className="h-6 w-6" />
              Weapon Attacks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {equippedWeapons.map((weapon, index) => {
                const isMagical = 'magicalName' in weapon;
                const isProficient = canEquipWeapon(weapon, character.class);
                const abilityMod = weapon.category === 'Ranged' ? getModifier(character.dexterity) : getModifier(character.strength);
                const profBonus = isProficient ? proficiencyBonus : 0;
                const magicalAttackBonus = isMagical ? (weapon as MagicalWeapon).attackBonus || 0 : 0;
                const magicalDamageBonus = isMagical ? (weapon as MagicalWeapon).damageBonus || 0 : 0;
                const totalAttackBonus = abilityMod + profBonus + magicalAttackBonus;

                // Extract range from properties
                const rangeProperty = weapon.properties.find(prop => prop.includes('Ammunition') || prop.includes('Thrown'));
                const weaponRange = rangeProperty ? rangeProperty : weapon.category === 'Melee' ? '5 ft' : 'Varies';

                return (
                  <div key={index} className="bg-slate-600 p-4 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-white font-bold text-lg">{weapon.name}</span>
                      {isMagical && (
                        <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
                          {(weapon as MagicalWeapon).rarity}
                        </span>
                      )}
                      {!isProficient && (
                        <span className="text-xs bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded">
                          No Proficiency
                        </span>
                      )}
                    </div>
                    
                    {/* Attack Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="text-center bg-slate-700 rounded p-2">
                        <div className="text-2xl font-bold text-green-400">
                          {totalAttackBonus >= 0 ? '+' : ''}{totalAttackBonus}
                        </div>
                        <div className="text-xs text-slate-400">Attack Bonus</div>
                      </div>
                      <div className="text-center bg-slate-700 rounded p-2">
                        <div className="text-2xl font-bold text-red-400">
                          {weapon.damage}{magicalDamageBonus > 0 && `+${magicalDamageBonus}`}
                        </div>
                        <div className="text-xs text-slate-400">{weapon.damageType} Damage</div>
                      </div>
                    </div>

                    {/* Attack Breakdown */}
                    <div className="text-xs text-slate-300 space-y-1">
                      <div>To Hit: 1d20 {abilityMod >= 0 ? '+' : ''}{abilityMod} ({weapon.category === 'Ranged' ? 'DEX' : 'STR'}) {profBonus > 0 && `+${profBonus} (Prof)`} {magicalAttackBonus > 0 && `+${magicalAttackBonus} (Magic)`}</div>
                      <div>Damage: {weapon.damage} + {abilityMod >= 0 ? '+' : ''}{abilityMod} ({weapon.category === 'Ranged' ? 'DEX' : 'STR'}) {magicalDamageBonus > 0 && `+${magicalDamageBonus} (Magic)`}</div>
                      <div className="text-slate-400">Range: {weaponRange} • {weapon.category} {weapon.type}</div>
                    </div>

                    {/* Magical Properties */}
                    {isMagical && (weapon as MagicalWeapon).magicalProperties && (
                      <div className="mt-3 p-2 bg-purple-900/20 rounded border border-purple-500/30">
                        <div className="text-purple-300 text-xs font-medium mb-1">Magical Properties:</div>
                        <div className="text-purple-200 text-xs">{(weapon as MagicalWeapon).magicalProperties}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Spell Slots & Spellcasting */}
        {character.spellcastingAbility && (character.spellsKnown && character.spellsKnown.length > 0 || character.spellsPrepared && character.spellsPrepared.length > 0) && (
          <div className="bg-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6" />
              Spellcasting
            </h3>
            
            {/* Spellcasting Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center bg-slate-600 rounded p-3">
                <div className="text-xl font-bold text-blue-400">{character.spellSaveDC}</div>
                <div className="text-xs text-slate-400">Spell Save DC</div>
              </div>
              <div className="text-center bg-slate-600 rounded p-3">
                <div className="text-xl font-bold text-green-400">+{character.spellAttackBonus}</div>
                <div className="text-xs text-slate-400">Spell Attack</div>
              </div>
              <div className="text-center bg-slate-600 rounded p-3">
                <div className="text-xl font-bold text-purple-400">{character.spellcastingAbility?.toUpperCase()}</div>
                <div className="text-xs text-slate-400">Casting Ability</div>
              </div>
            </div>

            {/* Spell Slots */}
            {character.spellSlots && Object.keys(character.spellSlots).length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Spell Slots</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {Object.entries(character.spellSlots).map(([level, total]) => (
                    <div key={level} className="bg-slate-600 rounded p-3">
                      <div className="text-center">
                        <div className="text-sm text-slate-400 mb-1">Level {level}</div>
                        <div className="text-lg font-bold text-white">{total}</div>
                        <div className="text-xs text-slate-400">Available</div>
                      </div>
                      {/* Spell slot dots for visual tracking */}
                      <div className="flex justify-center gap-1 mt-2">
                        {Array.from({length: total}, (_, i) => (
                          <div key={i} className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Spell Management Based on Class Type */}
            {(() => {
              const spellcastingType = getSpellcastingType(character.class);
              const abilityModifier = getModifier(character[character.spellcastingAbility as keyof typeof character] as number);
              const maxPrepared = canPrepareSpells(character.class) ? getSpellsPreparedCount(character.class, character.level, abilityModifier) : 0;
              
              switch (spellcastingType) {
                case 'known':
                  // Bards, Sorcerers, Warlocks, Rangers, EKs, ATs - their known spells are always prepared
                  return (
                    <div>
                      <div className="mb-3 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
                        <p className="text-green-300 text-sm">
                          <strong>{character.class} Spellcasting:</strong> All known spells are always available to cast.
                        </p>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-3">Known Spells</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                        {(character.spellsKnown || []).map((spell, index) => (
                          <div key={index} className="bg-slate-600 p-3 rounded border-l-4 border-green-500">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-white font-medium">{spell.name}</span>
                              <span className="text-xs bg-green-900/50 text-green-300 px-2 py-1 rounded">
                                {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}
                              </span>
                            </div>
                            <div className="text-slate-400 text-xs mb-2">
                              {spell.school} • {spell.castingTime} • {spell.range}
                            </div>
                            <div className="text-slate-300 text-xs">{spell.description}</div>
                            {spell.level === 0 && (
                              <div className="text-green-300 text-xs mt-1 font-medium">
                                ✓ Unlimited Use
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                
                case 'spellbook':
                  // Wizards - have spellbook + daily preparation
                  return (
                    <div className="space-y-6">
                      <div className="mb-3 p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
                        <p className="text-blue-300 text-sm">
                          <strong>Wizard Spellcasting:</strong> You have a spellbook containing all learned spells, but can only prepare {maxPrepared} spells per day.
                        </p>
                      </div>
                      
                      {/* Prepared Spells */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-semibold text-white">
                            Prepared Spells ({(character.spellsPrepared || []).filter(s => s.level > 0).length}/{maxPrepared})
                          </h4>
                          <button
                            onClick={onOpenSpellPreparation}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded font-medium transition-colors"
                            title="Change prepared spells"
                          >
                            Prepare Spells
                          </button>
                        </div>
                        {character.spellsPrepared && character.spellsPrepared.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            {character.spellsPrepared.map((spell, index) => (
                              <div key={index} className="bg-slate-600 p-3 rounded border-l-4 border-blue-500">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-white font-medium">{spell.name}</span>
                                  <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">
                                    {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}
                                  </span>
                                </div>
                                <div className="text-slate-400 text-xs mb-2">
                                  {spell.school} • {spell.castingTime} • {spell.range}
                                </div>
                                <div className="text-slate-300 text-xs">{spell.description}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-400 text-sm mb-4">No spells currently prepared. You can prepare spells during a long rest.</p>
                        )}
                      </div>
                      
                      {/* Spellbook */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Spellbook</h4>
                        {character.spellsKnown && character.spellsKnown.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                            {character.spellsKnown.map((spell, index) => (
                              <div key={index} className="bg-slate-600 p-3 rounded border-l-4 border-purple-500">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-white font-medium">{spell.name}</span>
                                  <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
                                    {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}
                                  </span>
                                </div>
                                <div className="text-slate-400 text-xs mb-2">
                                  {spell.school} • {spell.castingTime} • {spell.range}
                                </div>
                                <div className="text-slate-300 text-xs">{spell.description}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-400 text-sm">Your spellbook is empty. Learn spells during level-up or find them during adventures.</p>
                        )}
                      </div>
                    </div>
                  );
                
                case 'prepared':
                  // Clerics, Druids, Paladins - know all class spells, prepare daily
                  return (
                    <div>
                      <div className="mb-3 p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                        <p className="text-yellow-300 text-sm">
                          <strong>{character.class} Spellcasting:</strong> You know all {character.class} spells and can prepare {maxPrepared} per day.
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-white">
                          Prepared Spells ({(character.spellsPrepared || []).filter(s => s.level > 0).length}/{maxPrepared})
                        </h4>
                        <button
                          onClick={onOpenSpellPreparation}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded font-medium transition-colors"
                          title="Change prepared spells"
                        >
                          Prepare Spells
                        </button>
                      </div>
                      {character.spellsPrepared && character.spellsPrepared.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {character.spellsPrepared.map((spell, index) => (
                            <div key={index} className="bg-slate-600 p-3 rounded border-l-4 border-yellow-500">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-white font-medium">{spell.name}</span>
                                <span className="text-xs bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded">
                                  {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}
                                </span>
                              </div>
                              <div className="text-slate-400 text-xs mb-2">
                                {spell.school} • {spell.castingTime} • {spell.range}
                              </div>
                              <div className="text-slate-300 text-xs">{spell.description}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-400 text-sm">No spells currently prepared. You can prepare spells during a long rest from the entire {character.class} spell list.</p>
                      )}
                    </div>
                  );
                
                default:
                  return null;
              }
            })()}
          </div>
        )}

        {/* Combat Actions Reference */}
        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Swords className="h-6 w-6" />
            Combat Actions Reference
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Actions */}
            <div className="bg-slate-600 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 text-center">Actions</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                <div className="text-slate-300 text-sm">• Attack</div>
                <div className="text-slate-300 text-sm">• Cast a Spell</div>
                <div className="text-slate-300 text-sm">• Dash</div>
                <div className="text-slate-300 text-sm">• Disengage</div>
                <div className="text-slate-300 text-sm">• Dodge</div>
                <div className="text-slate-300 text-sm">• Help</div>
                <div className="text-slate-300 text-sm">• Hide</div>
                <div className="text-slate-300 text-sm">• Ready</div>
                <div className="text-slate-300 text-sm">• Search</div>
                <div className="text-slate-300 text-sm">• Use an Object</div>
                {character.actions?.filter(a => 
                  a.type === 'Action' && 
                  !['Attack', 'Cast a Spell', 'Dash', 'Disengage', 'Dodge', 'Help', 'Hide', 'Ready', 'Search', 'Use an Object'].includes(a.name)
                ).map((action, i) => (
                  <div key={i} className="text-purple-300 text-sm">• {action.name}</div>
                ))}
              </div>
            </div>

            {/* Bonus Actions */}
            <div className="bg-slate-600 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 text-center">Bonus Actions</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                <div className="text-slate-300 text-sm">• Off-hand Attack</div>
                <div className="text-slate-300 text-sm">• Two-Weapon Fighting</div>
                {character.bonusActions?.map((action, i) => (
                  <div key={i} className="text-yellow-300 text-sm">• {action.name}</div>
                ))}
              </div>
            </div>

            {/* Reactions */}
            <div className="bg-slate-600 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 text-center">Reactions</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                <div className="text-slate-300 text-sm">• Opportunity Attack</div>
                {character.reactions?.map((action, i) => (
                  <div key={i} className="text-blue-300 text-sm">• {action.name}</div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center text-slate-400 text-sm">
            Quick reference for available combat actions - no dice rolling here!
          </div>
        </div>

        {/* Empty State */}
        {(!equippedWeapons || equippedWeapons.length === 0) && 
         (!character.spellsKnown || character.spellsKnown.length === 0) && (
          <div className="text-center py-12">
            <Swords className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No Combat Options</h3>
            <p className="text-slate-500">Equip weapons or learn spells to see combat actions here.</p>
          </div>
        )}
      </div>
    </div>
  );
} 