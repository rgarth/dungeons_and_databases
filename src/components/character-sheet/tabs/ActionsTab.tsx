"use client";

import { Swords, Sword, Zap, Shield, AlertTriangle } from "lucide-react";
import { createCharacterCalculations } from "@/services/character/calculations";
import { createCharacterEquipment } from "@/services/character/equipment";
import { getSpellcastingType, canPrepareSpells, getSpellsPreparedCount } from "@/lib/dnd/level-up";
import { getSpellsFromMagicalItems, type EquippedMagicalItem } from "@/lib/dnd/magical-items";
import type { Weapon, MagicalWeapon } from "@/lib/dnd/equipment";
import type { Spell } from "@/lib/dnd/spells";
import { getClassSpells } from "@/lib/dnd/spells";
import { findSpellByName } from "@/lib/dnd/spell-data-helper";
import type { MagicalItem } from "@/lib/dnd/magical-items";
import { CONDITIONS, getCondition, type ActiveCondition } from "@/lib/dnd/conditions";

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
    conditions?: ActiveCondition[];
    deathSaveSuccesses?: number;
    deathSaveFailures?: number;
  };
  equippedWeapons: (Weapon | MagicalWeapon)[];
  equippedMagicalItems: EquippedMagicalItem[];
  inventoryMagicalItems: MagicalItem[];
  currentArmorClass: number;
  onOpenSpellPreparation: () => void;
  onUseSpellScroll?: (scrollIndex: number) => void;
  onUpdateConditions?: (conditions: ActiveCondition[]) => void;
  onUpdateDeathSaves?: (successes: number, failures: number) => void;
  onUseWeapon?: (weaponIndex: number) => void;
  onRecoverWeapon?: (weaponIndex: number) => void;
}

export function ActionsTab({ 
  character, 
  equippedWeapons, 
  equippedMagicalItems,
  inventoryMagicalItems,
  currentArmorClass, 
  onOpenSpellPreparation,
  onUseSpellScroll,
  onUpdateConditions,
  onUpdateDeathSaves,
  onUseWeapon,
  onRecoverWeapon
}: ActionsTabProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _unused = onUpdateDeathSaves;
  
  // Create service instances for clean calculations
  const calc = createCharacterCalculations({
    ...character,
    name: character.id, // Use ID as name fallback
    race: 'Unknown', // Fallback race
    armorClass: 10, // Will be calculated properly
    speed: character.speed || 30, // Fallback speed
  });
  const equipment = createCharacterEquipment(character);
  
  // Get spells from equipped magical items
  const equippedMagicalItemSpells = getSpellsFromMagicalItems(
    equippedMagicalItems || [], 
    character.class, 
    character.level
  );

  // Get spell scrolls from inventory - simplified logic using services
  const inventorySpellScrolls = (inventoryMagicalItems || [])
    .filter(item => item.type === 'Scroll' && item.effects.some(effect => effect.type === 'spell_effect'))
    .map((scroll, index) => {
      // Extract spell name from the scroll's effect
      const spellEffect = scroll.effects.find(effect => effect.type === 'spell_effect');
      if (!spellEffect || !spellEffect.target) return null;
      
      // Find the actual spell - handle both target formats
      let spellName = spellEffect.target;
      if (spellName === 'fire_bolt') spellName = 'Fire Bolt';
      else if (spellName === 'magic_missile') spellName = 'Magic Missile';
      else {
        // Convert snake_case back to proper case
        spellName = spellName.split('_').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
      }
      
      // For custom scrolls, extract spell name from scroll name
      if (scroll.name.includes('Spell Scroll (') && scroll.name.includes(')')) {
        const match = scroll.name.match(/Spell Scroll \((.*)\)/);
        if (match) spellName = match[1];
      }
      
      // Find the actual spell
      const spell = findSpellByName(spellName);
      
      if (!spell) return null;
      
      // Determine if character can use this scroll
      const canUse = true;
      let reason = '';
      
      if (spell.level === 0) {
        // Cantrips: Anyone can use, but need ability check if not on class list
        const classSpells = getClassSpells(character.class, character.level);
        const isOnClassList = classSpells.some((s: Spell) => s.name === spell.name);
        if (!isOnClassList) {
          reason = 'Requires DC 10 + spell level ability check (not on your class spell list)';
        }
      } else {
        // Higher level spells: Must be on class list or make ability check
        const classSpells = getClassSpells(character.class, character.level);
        const isOnClassList = classSpells.some((s: Spell) => s.name === spell.name);
        if (!isOnClassList) {
          reason = `Requires DC ${10 + spell.level} ability check (not on your class spell list)`;
        }
      }
      
      return {
        spell,
        canUse,
        reason,
        source: scroll.name,
        uses: 'Single Use',
        scrollIndex: index,
        requiresAttunement: false,
        isAttuned: true
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  // Combine all magical item spells
  const allMagicalItemSpells = [...equippedMagicalItemSpells, ...inventorySpellScrolls];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* First Row: Combat Stats (2/3) + Conditions (1/3) - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Combat Stats Summary - 2/3 */}
          <div className="lg:col-span-2 bg-slate-700 rounded-lg p-6">
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
                <div className="text-2xl font-bold text-green-400">+{calc.proficiencyBonus}</div>
                <div className="text-xs text-slate-400">Proficiency</div>
              </div>
              <div className="text-center bg-slate-600 rounded p-3">
                <div className="text-2xl font-bold text-yellow-400">{character.speed} ft</div>
                <div className="text-xs text-slate-400">Speed</div>
              </div>
            </div>
          </div>

          {/* Conditions - 1/3 */}
          <div className="bg-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              Conditions
            </h3>
            
            {/* Add Condition Dropdown */}
            <div className="mb-4">
              <select
                value=""
                onChange={(e) => {
                  if (e.target.value) {
                    const existingConditions = character.conditions || [];
                    const isAlreadyActive = existingConditions.some(c => c.name === e.target.value);
                    
                    if (!isAlreadyActive) {
                      const newCondition: ActiveCondition = {
                        name: e.target.value,
                        duration: 'Until removed',
                      };
                      onUpdateConditions?.([...existingConditions, newCondition]);
                    }
                    e.target.value = ""; // Reset selection
                  }
                }}
                className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-yellow-500 focus:outline-none"
              >
                <option value="">Add condition...</option>
                {CONDITIONS
                  .filter(condition => {
                    const activeConditions = character.conditions || [];
                    return !activeConditions.some(c => c.name === condition.name);
                  })
                  .sort((a, b) => {
                    // Sort by severity (most severe first), then name
                    const severityOrder = ['Severe', 'Major', 'Minor'];
                    const severityDiff = severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity);
                    return severityDiff !== 0 ? severityDiff : a.name.localeCompare(b.name);
                  })
                  .map(condition => (
                    <option key={condition.name} value={condition.name}>
                      {condition.name} ({condition.severity})
                    </option>
                  ))}
              </select>
            </div>

            {/* Active Conditions Pills */}
            <div className="space-y-2">
              <div className="text-sm text-slate-400">Active conditions:</div>
              <div className="flex flex-wrap gap-2">
                {(character.conditions || []).map((activeCondition, index) => {
                  const condition = getCondition(activeCondition.name);
                  if (!condition) return null;

                  const getSeverityColor = (severity: string) => {
                    switch (severity) {
                      case 'Minor': return 'bg-yellow-900/30 text-yellow-300 border-yellow-600/30';
                      case 'Major': return 'bg-orange-900/30 text-orange-300 border-orange-600/30';
                      case 'Severe': return 'bg-red-900/30 text-red-300 border-red-600/30';
                      default: return 'bg-slate-700 text-slate-300 border-slate-600/30';
                    }
                  };

                  return (
                    <span 
                      key={index} 
                      className={`px-2 py-1 rounded-full text-xs border flex items-center gap-1 ${getSeverityColor(condition.severity)}`}
                      title={condition.description}
                    >
                      {condition.name}
                      <button
                        onClick={() => {
                          const newConditions = (character.conditions || []).filter((_, i) => i !== index);
                          onUpdateConditions?.(newConditions);
                        }}
                        className="text-xs font-bold opacity-75 hover:opacity-100"
                        title="Remove condition"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
              
              {/* Empty state */}
              {(!character.conditions || character.conditions.length === 0) && (
                <div className="text-slate-400 text-sm italic">No active conditions</div>
              )}
              
              {/* Effects summary for active conditions */}
              {character.conditions && character.conditions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-600">
                  <div className="text-xs text-slate-400 space-y-1">
                    {character.conditions.some(c => getCondition(c.name)?.effects.some(e => e.toLowerCase().includes('attack') && e.toLowerCase().includes('disadvantage'))) && (
                      <div>• Disadvantage on attacks</div>
                    )}
                    {character.conditions.some(c => getCondition(c.name)?.effects.some(e => e.toLowerCase().includes('can\'t take actions'))) && (
                      <div>• Cannot take actions</div>
                    )}
                    {character.conditions.some(c => getCondition(c.name)?.effects.some(e => e.toLowerCase().includes('speed becomes 0'))) && (
                      <div>• Speed is 0</div>
                    )}
                  </div>
                </div>
              )}
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
                
                // Use equipment service for weapon calculations
                const attackBonus = equipment.getWeaponAttackBonus(weapon);
                const damageBonus = equipment.getWeaponDamageBonus(weapon);
                const isProficient = equipment.canUseWeapon(weapon);

                // Extract range from properties
                const rangeProperty = weapon.properties.find(prop => prop.includes('Ammunition') || prop.includes('Thrown'));
                const weaponRange = rangeProperty ? rangeProperty : weapon.category === 'Melee' ? '5 ft' : 'Varies';

                // Get ability modifier for display
                const abilityMod = weapon.category === 'Ranged' 
                  ? calc.getAbilityModifier('dexterity') 
                  : calc.getAbilityModifier('strength');
                const abilityName = weapon.category === 'Ranged' ? 'DEX' : 'STR';
                
                // Breakdown for display
                const profBonus = isProficient ? calc.proficiencyBonus : 0;
                const magicalAttackBonus = isMagical ? (weapon as MagicalWeapon).attackBonus || 0 : 0;
                const magicalDamageBonus = isMagical ? (weapon as MagicalWeapon).damageBonus || 0 : 0;

                return (
                  <div key={index} className="bg-slate-600 p-4 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-white font-bold text-lg">{weapon.name}</span>
                      {weapon.stackable && weapon.quantity && weapon.quantity > 1 && (
                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                          {weapon.quantity} available
                        </span>
                      )}
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
                          {attackBonus >= 0 ? '+' : ''}{attackBonus}
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
                      <div>To Hit: 1d20 {abilityMod >= 0 ? '+' : ''}{abilityMod} ({abilityName}) {profBonus > 0 && `+${profBonus} (Prof)`} {magicalAttackBonus > 0 && `+${magicalAttackBonus} (Magic)`}</div>
                      <div>Damage: {weapon.damage} + {damageBonus >= 0 ? '+' : ''}{damageBonus} ({abilityName}{magicalDamageBonus > 0 && ` + Magic`})</div>
                      <div className="text-slate-400">Range: {weaponRange} • {weapon.category} {weapon.type}</div>
                      
                      {/* Ammunition Tracking for Ranged Weapons */}
                      {weapon.properties.includes('Ammunition') && (() => {
                        // Determine ammo type based on weapon
                        let ammoType: string;
                        if (weapon.name.toLowerCase().includes('crossbow')) {
                          ammoType = 'Ammunition, Crossbow Bolts (20)';
                        } else if (weapon.name.toLowerCase().includes('blowgun')) {
                          ammoType = 'Ammunition, Blowgun Needles (50)';
                        } else if (weapon.name.toLowerCase().includes('sling')) {
                          ammoType = 'Ammunition, Sling Bullets (20)';
                        } else {
                          // Default to arrows for bows
                          ammoType = 'Ammunition, Arrows (20)';
                        }
                        
                        // Find ammo in equipped stackable weapons
                        const ammo = equippedWeapons.find(w => 
                          w.stackable && 
                          w.name === ammoType && 
                          w.quantity && w.quantity > 0
                        );
                        
                        return (
                          <div className="flex items-center gap-2 mt-1 p-2 bg-slate-800/50 rounded">
                            <span className="text-yellow-400 font-medium">Ammo:</span>
                            <span className={`font-bold ${ammo ? 'text-green-400' : 'text-red-400'}`}>
                              {ammo ? `${ammo.quantity} ${ammoType.replace('Ammunition, ', '').replace(' (20)', '').replace(' (50)', '')}s` : `No ${ammoType.replace('Ammunition, ', '')}!`}
                            </span>
                            {!ammo && (
                              <span className="text-red-300 text-xs">
                                (Add {ammoType} from gear to use this weapon)
                              </span>
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Magical Properties */}
                    {isMagical && (weapon as MagicalWeapon).magicalProperties && (
                      <div className="mt-3 p-2 bg-purple-900/20 rounded border border-purple-500/30">
                        <div className="text-purple-300 text-xs font-medium mb-1">Magical Properties:</div>
                        <div className="text-purple-200 text-xs">{(weapon as MagicalWeapon).magicalProperties}</div>
                      </div>
                    )}

                    {/* Usage Buttons for Stackable Weapons */}
                    {weapon.stackable && weapon.quantity && (onUseWeapon || onRecoverWeapon) && (
                      <div className="mt-3 space-y-2">
                        <div className="flex gap-2">
                          {onUseWeapon && (
                            <button
                              onClick={() => onUseWeapon(index)}
                              disabled={weapon.quantity <= 0}
                              className="flex-1 border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm px-3 py-2 rounded font-medium transition-all duration-200"
                              title={`Use/Throw ${weapon.name} (${weapon.quantity} remaining)`}
                            >
                              {weapon.properties.includes('Thrown') ? 'Throw' : 'Use'} {weapon.name}
                            </button>
                          )}
                          {onRecoverWeapon && (
                            <button
                              onClick={() => onRecoverWeapon(index)}
                              className="flex-1 border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white text-sm px-3 py-2 rounded font-medium transition-all duration-200"
                              title={`Recover ${weapon.name} after combat`}
                            >
                              Recover
                            </button>
                          )}
                          <div className="bg-slate-700 px-3 py-2 rounded text-xs text-slate-300 flex items-center min-w-fit">
                            {weapon.quantity} left
                          </div>
                        </div>
                        <div className="text-xs text-slate-400 italic">
                          {weapon.properties.includes('Thrown') 
                            ? 'Throw to attack at range, recover after combat'
                            : 'Use for special attacks or effects'}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Spell Slots & Spellcasting */}
        {((character.spellcastingAbility && (character.spellsKnown && character.spellsKnown.length > 0 || character.spellsPrepared && character.spellsPrepared.length > 0)) || allMagicalItemSpells.length > 0) && (
          <div className="bg-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6" />
              Spellcasting
            </h3>
            
            {/* Spellcasting Stats */}
            {character.spellcastingAbility && calc.spellcasting && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center bg-slate-600 rounded p-3">
                  <div className="text-xl font-bold text-blue-400">{calc.spellcasting.spellSaveDC}</div>
                  <div className="text-xs text-slate-400">Spell Save DC</div>
                </div>
                <div className="text-center bg-slate-600 rounded p-3">
                  <div className="text-xl font-bold text-green-400">+{calc.spellcasting.spellAttackBonus}</div>
                  <div className="text-xs text-slate-400">Spell Attack</div>
                </div>
                <div className="text-center bg-slate-600 rounded p-3">
                  <div className="text-xl font-bold text-purple-400">{character.spellcastingAbility?.toUpperCase()}</div>
                  <div className="text-xs text-slate-400">Casting Ability</div>
                </div>
              </div>
            )}

            {/* Spell Slots */}
            {character.spellcastingAbility && character.spellSlots && Object.keys(character.spellSlots).filter(k => k && k !== 'undefined').length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Spell Slots</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {Object.entries(character.spellSlots)
                    .filter(([level, total]) => level && level !== 'undefined' && total > 0)
                    .map(([level, total]) => (
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
            {character.spellcastingAbility && (() => {
              const spellcastingType = getSpellcastingType(character.class);
              // Use service for spellcasting ability modifier
              const abilityModifier = calc.spellcasting?.abilityModifier || 0;
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
                        {(character.spellsKnown || []).filter(spell => spell && spell.name && spell.level !== undefined).map((spell, index) => (
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
                          <strong>Wizard Spellcasting:</strong> You have a spellbook containing all learned spells, but can only prepare {maxPrepared} per day.
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
                            {character.spellsPrepared.filter(spell => spell && spell.name && spell.level !== undefined).map((spell, index) => (
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
                                {spell.level === 0 && (
                                  <div className="text-blue-300 text-xs mt-1 font-medium">
                                    ✓ Unlimited Use
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-slate-400 text-sm italic mb-4">No spells prepared</div>
                        )}

                        {/* All Known Spells (Spellbook) */}
                        <h5 className="text-md font-semibold text-white mb-3">Spellbook ({(character.spellsKnown || []).length} spells)</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                          {(character.spellsKnown || []).filter(spell => spell && spell.name && spell.level !== undefined).map((spell, index) => (
                            <div key={index} className="bg-slate-600 p-3 rounded border-l-4 border-indigo-500">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-white font-medium">{spell.name}</span>
                                <span className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded">
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
                          {character.spellsPrepared.filter(spell => spell && spell.name && spell.level !== undefined).map((spell, index) => (
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
                              {spell.level === 0 && (
                                <div className="text-yellow-300 text-xs mt-1 font-medium">
                                  ✓ Unlimited Use
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-slate-400 text-sm italic">No spells prepared</div>
                      )}
                    </div>
                  );
                
                default:
                  return null;
              }
            })()}

            {/* Magical Item Spells */}
            {allMagicalItemSpells.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white mb-3">Magical Item Spells</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {allMagicalItemSpells.map((itemSpell, index) => (
                    <div key={index} className={`bg-slate-600 p-3 rounded border-l-4 ${itemSpell.canUse ? 'border-orange-500' : 'border-slate-500'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`font-medium ${itemSpell.canUse ? 'text-white' : 'text-slate-400'}`}>
                          {itemSpell.spell.name}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${itemSpell.canUse ? 'bg-orange-900/50 text-orange-300' : 'bg-slate-700 text-slate-400'}`}>
                          {itemSpell.spell.level === 0 ? 'Cantrip' : `Level ${itemSpell.spell.level}`}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${itemSpell.canUse ? 'bg-purple-900/50 text-purple-300' : 'bg-slate-700 text-slate-400'}`}>
                          {itemSpell.uses}
                        </span>
                      </div>
                      <div className={`text-xs mb-2 ${itemSpell.canUse ? 'text-slate-300' : 'text-slate-500'}`}>
                        {itemSpell.spell.description}
                      </div>
                      <div className={`text-xs ${itemSpell.canUse ? 'text-orange-300' : 'text-slate-500'}`}>
                        <strong>Source:</strong> {itemSpell.source}
                        {itemSpell.requiresAttunement && !itemSpell.isAttuned && (
                          <span className="ml-2 text-red-300">(Requires Attunement)</span>
                        )}
                        {!itemSpell.canUse && itemSpell.reason && (
                          <div className="mt-1 text-red-300">
                            <strong>Restriction:</strong> {itemSpell.reason}
                          </div>
                        )}
                        {itemSpell.canUse && itemSpell.reason && (
                          <div className="mt-1 text-yellow-300">
                            <strong>Note:</strong> {itemSpell.reason}
                          </div>
                        )}
                        {onUseSpellScroll && 'scrollIndex' in itemSpell && typeof itemSpell.scrollIndex === 'number' && (
                          <div className="mt-2">
                            <button
                              onClick={() => onUseSpellScroll(itemSpell.scrollIndex as number)}
                              className="bg-orange-600 hover:bg-orange-700 text-white text-xs px-3 py-1 rounded font-medium"
                            >
                              Cast & Consume
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                  a && a.type === 'Action' && a.name &&
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
                {character.bonusActions?.filter(action => action && action.name).map((action, i) => (
                  <div key={i} className="text-yellow-300 text-sm">• {action.name}</div>
                ))}
              </div>
            </div>

            {/* Reactions */}
            <div className="bg-slate-600 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 text-center">Reactions</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                <div className="text-slate-300 text-sm">• Opportunity Attack</div>
                {character.reactions?.filter(action => action && action.name).map((action, i) => (
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