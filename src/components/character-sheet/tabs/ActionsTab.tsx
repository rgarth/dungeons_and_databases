"use client";

import { Swords, Sword, Zap, Shield, AlertTriangle, Target } from "lucide-react";
import { createCharacterCalculations } from "@/services/character/calculations";
import { createCharacterEquipment } from "@/services/character/equipment";
import { getSpellcastingType, canPrepareSpells, getSpellsPreparedCount } from "@/lib/dnd/level-up";
import { getSpellsFromMagicalItems, type EquippedMagicalItem } from "@/lib/dnd/magical-items";
import type { Weapon, MagicalWeapon, Ammunition } from "@/lib/dnd/equipment";
import type { Spell } from "@/lib/dnd/spells";
import { getClassSpells } from "@/lib/dnd/spells";
import { findSpellByName } from "@/lib/dnd/spell-data-helper";
import type { MagicalItem } from "@/lib/dnd/magical-items";
import { CONDITIONS, getCondition, type ActiveCondition } from "@/lib/dnd/conditions";
import { useEffect, useState } from "react";
import { useConditionSeverityStyles, useOpacityStyles, useBorderLeftStyles, useInteractiveButtonStyles } from "@/hooks/use-theme";
import KiPointManager from './KiPointManager';

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
    temporaryHitPoints?: number;
    speed: number;
    spellcastingAbility?: string;
    spellSaveDC?: number;
    spellAttackBonus?: number;
    spellSlots?: Record<number, number>;
    usedSpellSlots?: Record<number, number>;
    spellsKnown?: Spell[];
    spellsPrepared?: Spell[];
    actions?: { type: string; name: string }[];
    bonusActions?: { type: string; name: string }[];
    reactions?: { type: string; name: string }[];
    conditions?: ActiveCondition[];
    deathSaveSuccesses?: boolean[];
    deathSaveFailures?: boolean[];
    ammunition?: Ammunition[];
    kiPoints?: number;
    usedKiPoints?: number;
  };
  equippedWeapons: (Weapon | MagicalWeapon)[];
  equippedMagicalItems: EquippedMagicalItem[];
  inventoryMagicalItems: MagicalItem[];
  currentArmorClass: number;
  onOpenSpellPreparation: () => void;
  onUseSpellScroll?: (scrollIndex: number) => void;
  onUpdateConditions?: (conditions: ActiveCondition[]) => void;
  onUpdateDeathSaves?: (successes: boolean[], failures: boolean[]) => void;
  onUseAmmunition?: (ammunitionName: string) => void;
  onRecoverAmmunition?: (ammunitionName: string) => void;
  onUseStackableWeapon?: (weaponName: string) => void;
  onRecoverStackableWeapon?: (weaponName: string) => void;
  onUseSpellSlot?: (level: number) => void;
  onRecoverSpellSlot?: (level: number) => void;
  onUpdateHitPoints?: (hitPoints: number) => void;
  onUpdateTemporaryHitPoints?: (temporaryHitPoints: number) => void;
  onSwitchTab?: (tab: "stats" | "actions" | "gear" | "inventory" | "background") => void;
}

type InventorySpellScroll = {
  spell: Spell;
  canUse: boolean;
  reason: string;
  source: string;
  uses: string;
  scrollIndex: number;
  requiresAttunement: boolean;
  isAttuned: boolean;
};





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
  onUseAmmunition,
  onRecoverAmmunition,
  onUseStackableWeapon,
  onRecoverStackableWeapon,
  onUseSpellSlot,
  onRecoverSpellSlot,
  onUpdateHitPoints,
  onUpdateTemporaryHitPoints,
  onSwitchTab
}: ActionsTabProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _unused = onUpdateDeathSaves;
  

  
  // Theme hooks
  const conditionSeverityStyles = useConditionSeverityStyles();
  const opacityStyles = useOpacityStyles();
  const borderLeftStyles = useBorderLeftStyles();
  const interactiveButtonStyles = useInteractiveButtonStyles();
  
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
  const [inventorySpellScrolls, setInventorySpellScrolls] = useState<InventorySpellScroll[]>([]);

  useEffect(() => {
    async function fetchScrollSpells() {
      const scrolls = (inventoryMagicalItems || [])
        .filter(item => item.type === 'Scroll' && item.effects.some(effect => effect.type === 'spell_effect'));
      const results = await Promise.all(scrolls.map(async (scroll, index): Promise<InventorySpellScroll | null> => {
        const spellEffect = scroll.effects.find(effect => effect.type === 'spell_effect');
        if (!spellEffect || !spellEffect.target) return null;
        let spellName = spellEffect.target;
        if (spellName === 'fire_bolt') spellName = 'Fire Bolt';
        else if (spellName === 'magic_missile') spellName = 'Magic Missile';
        else {
          spellName = spellName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
        if (scroll.name.includes('Spell Scroll (') && scroll.name.includes(')')) {
          const match = scroll.name.match(/Spell Scroll \((.*)\)/);
          if (match) spellName = match[1];
        }
        const spell = await findSpellByName(spellName);
        if (!spell) return null;
        const canUse = true;
        let reason = '';
        const classSpells = await getClassSpells(character.class, character.level);
        if (spell.level === 0) {
          const isOnClassList = classSpells.some((s: Spell) => s.name === spell.name);
          if (!isOnClassList) {
            reason = 'Requires DC 10 + spell level ability check (not on your class spell list)';
          }
        } else {
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
      }));
      setInventorySpellScrolls(results.filter((item): item is NonNullable<typeof item> => item !== null));
    }
    fetchScrollSpells();
  }, [inventoryMagicalItems, character.class, character.level]);

  // Combine all magical item spells
  const allMagicalItemSpells = [...equippedMagicalItemSpells, ...inventorySpellScrolls];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* First Row: Combat Stats (2/3) + Conditions (1/3) - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Combat Stats Summary - 2/3 */}
          <div className="lg:col-span-2 bg-[var(--color-card)] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Combat Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center bg-[var(--color-card-secondary)] rounded p-3">
                <div className="text-2xl font-bold text-[var(--color-accent)]">{currentArmorClass}</div>
                <div className="text-xs text-[var(--color-text-muted)]">Armor Class</div>
              </div>
              
              <div className="text-center bg-[var(--color-card-secondary)] rounded p-3">
                <div className="text-2xl font-bold text-[var(--color-success)]">+{calc.proficiencyBonus}</div>
                <div className="text-xs text-[var(--color-text-muted)]">Proficiency</div>
              </div>
              
              <div className="text-center bg-[var(--color-card-secondary)] rounded p-3">
                <div className="text-2xl font-bold text-[var(--color-warning)]">{character.speed} ft</div>
                <div className="text-xs text-[var(--color-text-muted)]">Speed</div>
              </div>
              
              {character.hitPoints === 0 ? (
                <div className="text-center bg-[var(--color-card-secondary)] rounded p-3">
                  <div className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">0</div>
                  
                  {/* Check if character is permanently dead */}
                  {(character.deathSaveFailures || [false, false, false]).filter(f => f).length >= 3 ? (
                    <div className="text-lg font-bold text-[var(--color-text-primary)] mb-2">DEAD</div>
                  ) : (
                    <>
                      {/* Successes */}
                      <div className="flex justify-center gap-1 mb-2">
                        <span className="text-xs text-[var(--color-text-secondary)]">Successes:</span>
                        {[0, 1, 2].map((index) => (
                          <button
                            key={`success-${index}`}
                            onClick={() => {
                              if (onUpdateDeathSaves) {
                                const currentSuccesses = character.deathSaveSuccesses || [false, false, false];
                                const currentFailures = character.deathSaveFailures || [false, false, false];
                                
                                // Toggle this success
                                const newSuccesses = [...currentSuccesses];
                                newSuccesses[index] = !newSuccesses[index];
                                
                                // Check if we now have 3 successes - restore to 1 HP
                                const successCount = newSuccesses.filter(s => s).length;
                                if (successCount === 3 && onUpdateHitPoints) {
                                  onUpdateHitPoints(1);
                                  // Reset death saves
                                  onUpdateDeathSaves([false, false, false], [false, false, false]);
                                  return;
                                }
                                
                                onUpdateDeathSaves(newSuccesses, currentFailures);
                              }
                            }}
                            className={`w-4 h-4 rounded-full border-2 transition-colors ${
                              (character.deathSaveSuccesses || [false, false, false])[index]
                                ? 'bg-[var(--color-success)] border-[var(--color-success)]'
                                : 'border-[var(--color-success)] hover:bg-[var(--color-success)] hover:bg-opacity-20'
                            }`}
                            title={`Toggle success ${index + 1}`}
                          />
                        ))}
                      </div>
                      
                      {/* Failures */}
                      <div className="flex justify-center gap-1 mb-2">
                        <span className="text-xs text-[var(--color-text-secondary)]">Failures:</span>
                        {[0, 1, 2].map((index) => (
                          <button
                            key={`failure-${index}`}
                            onClick={() => {
                              if (onUpdateDeathSaves) {
                                const currentSuccesses = character.deathSaveSuccesses || [false, false, false];
                                const currentFailures = character.deathSaveFailures || [false, false, false];
                                
                                // Toggle this failure
                                const newFailures = [...currentFailures];
                                newFailures[index] = !newFailures[index];
                                
                                onUpdateDeathSaves(currentSuccesses, newFailures);
                              }
                            }}
                            className={`w-4 h-4 rounded-full border-2 transition-colors ${
                              (character.deathSaveFailures || [false, false, false])[index]
                                ? 'bg-[var(--color-danger)] border-[var(--color-danger)]'
                                : 'border-[var(--color-danger)] hover:bg-[var(--color-danger)] hover:bg-opacity-20'
                            }`}
                            title={`Toggle failure ${index + 1}`}
                          />
                        ))}
                      </div>
                      
                      {/* Quick Roll Button */}
                      <button
                        onClick={() => {
                          if (onUpdateDeathSaves) {
                            const currentSuccesses = character.deathSaveSuccesses || [false, false, false];
                            const currentFailures = character.deathSaveFailures || [false, false, false];
                            
                            // Roll a d20
                            const roll = Math.floor(Math.random() * 20) + 1;
                            const isSuccess = roll >= 10;
                            
                            // Find next empty slot
                            if (isSuccess) {
                              const nextEmptyIndex = currentSuccesses.findIndex(success => !success);
                              if (nextEmptyIndex !== -1) {
                                const newSuccesses = [...currentSuccesses];
                                newSuccesses[nextEmptyIndex] = true;
                                
                                // Check if we now have 3 successes - restore to 1 HP
                                const successCount = newSuccesses.filter(s => s).length;
                                if (successCount === 3 && onUpdateHitPoints) {
                                  onUpdateHitPoints(1);
                                  // Reset death saves
                                  onUpdateDeathSaves([false, false, false], [false, false, false]);
                                  alert(`Death Save: ${roll} (Success) - Character stabilized at 1 HP!`);
                                  return;
                                }
                                
                                onUpdateDeathSaves(newSuccesses, currentFailures);
                              }
                            } else {
                              const nextEmptyIndex = currentFailures.findIndex(failure => !failure);
                              if (nextEmptyIndex !== -1) {
                                const newFailures = [...currentFailures];
                                newFailures[nextEmptyIndex] = true;
                                onUpdateDeathSaves(currentSuccesses, newFailures);
                              }
                            }
                            
                            // Show roll result
                            alert(`Death Save: ${roll} (${isSuccess ? 'Success' : 'Failure'})`);
                          }
                        }}
                        className="bg-[var(--color-warning)] hover:bg-[var(--color-warning)]/80 text-[var(--color-warning-text)] px-3 py-1 rounded text-xs transition-colors"
                        title="Roll a death saving throw (d20, 10+ succeeds)"
                      >
                        Roll Death Save
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center bg-[var(--color-card-secondary)] rounded p-3">
                  <div className="text-2xl font-bold">
                    {character.temporaryHitPoints && character.temporaryHitPoints > 0 ? (
                      <>
                        <span className="text-[var(--color-accent)]">{character.hitPoints + character.temporaryHitPoints}</span>
                        <span className="text-[var(--color-danger)]">/{character.maxHitPoints}</span>
                      </>
                    ) : (
                      <span className="text-[var(--color-danger)]">{character.hitPoints}/{character.maxHitPoints}</span>
                    )}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)]">
                    {character.temporaryHitPoints && character.temporaryHitPoints > 0 ? `HP (+${character.temporaryHitPoints})` : 'Hit Points'}
                  </div>
                  {onUpdateHitPoints && onUpdateTemporaryHitPoints && (
                    <div className="flex gap-1 mt-2 justify-center">
                      <button
                        onClick={() => {
                          if (character.temporaryHitPoints && character.temporaryHitPoints > 0) {
                            // Reduce temp HP first
                            onUpdateTemporaryHitPoints(character.temporaryHitPoints - 1);
                          } else {
                            // Then reduce regular HP
                            onUpdateHitPoints(Math.max(0, character.hitPoints - 1));
                          }
                        }}
                        className="bg-[var(--color-danger)] hover:bg-[var(--color-danger-hover)] text-white px-2 py-1 rounded text-xs transition-colors"
                        title="Take 1 damage (temp HP first, then regular HP)"
                      >
                        -
                      </button>
                      <button
                        onClick={() => {
                          if (character.hitPoints < character.maxHitPoints) {
                            // Heal regular HP first
                            onUpdateHitPoints(Math.min(character.maxHitPoints, character.hitPoints + 1));
                          } else {
                            // Then add temp HP
                            onUpdateTemporaryHitPoints((character.temporaryHitPoints || 0) + 1);
                          }
                        }}
                        className="bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-white px-2 py-1 rounded text-xs transition-colors"
                        title="Heal 1 HP (regular HP first, then temp HP)"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Conditions - 1/3 */}
          <div className="bg-[var(--color-card)] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[var(--color-warning)]" />
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
                className="w-full rounded px-3 py-2 text-sm focus:outline-none"
                style={{
                  backgroundColor: 'var(--color-card-secondary)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-warning)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--color-border)';
                }}
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
              <div className="text-sm text-[var(--color-text-secondary)]">Active conditions:</div>
              <div className="flex flex-wrap gap-2">
                {(character.conditions || []).map((activeCondition, index) => {
                  const condition = getCondition(activeCondition.name);
                  if (!condition) return null;

                  const getSeverityStyles = (severity: string) => {
                    return conditionSeverityStyles.getStyles(severity);
                  };

                  return (
                    <span 
                      key={index} 
                      className="px-2 py-1 rounded-full text-xs border flex items-center gap-1"
                      style={getSeverityStyles(condition.severity)}
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
                <div className="text-[var(--color-text-muted)] text-sm italic">No active conditions</div>
              )}
              
              {/* Effects summary for active conditions */}
              {character.conditions && character.conditions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
                  <div className="text-xs text-[var(--color-text-muted)] space-y-1">
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
          <div className="bg-[var(--color-card)] rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                <Sword className="h-6 w-6" />
                Weapon Attacks
              </h3>
              {onSwitchTab && (
                <button
                  onClick={() => onSwitchTab("gear")}
                  className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] text-sm px-3 py-1 rounded font-medium transition-colors"
                  title="Manage weapons and equipment"
                >
                  Manage Weapons
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {equippedWeapons.filter(weapon => {
                // Filter out ammunition items - they shouldn't appear as weapon attacks
                const isAmmunition = weapon.properties.some(prop => prop.startsWith('Ammunition')) && weapon.damage === '—';
                return !isAmmunition;
              }).map((weapon, index) => {
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
                  <div 
                    key={index} 
                    className="bg-[var(--color-card-secondary)] p-4 rounded-lg"
                    style={borderLeftStyles.error}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[var(--color-text-primary)] font-bold text-lg">{weapon.name}</span>

                      {isMagical && (
                        <span 
                          className="text-xs px-2 py-1 rounded"
                          style={opacityStyles.accent20}
                        >
                          {(weapon as MagicalWeapon).rarity}
                        </span>
                      )}
                      {!isProficient && (
                        <span 
                          className="text-xs px-2 py-1 rounded"
                          style={opacityStyles.warning20}
                        >
                          No Proficiency
                        </span>
                      )}
                    </div>
                    
                    {/* Attack Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="text-center bg-[var(--color-card)] rounded p-2">
                        <div className="text-2xl font-bold text-[var(--color-success)]">
                          {attackBonus >= 0 ? '+' : ''}{attackBonus}
                        </div>
                        <div className="text-xs text-[var(--color-text-muted)]">Attack Bonus</div>
                      </div>
                      <div className="text-center bg-[var(--color-card)] rounded p-2">
                        <div className="text-2xl font-bold text-[var(--color-danger)]">
                          {weapon.damage}{magicalDamageBonus > 0 && `+${magicalDamageBonus}`}
                        </div>
                        <div className="text-xs text-[var(--color-text-muted)]">{weapon.damageType} Damage</div>
                      </div>
                    </div>

                    {/* Attack Breakdown */}
                    <div className="text-xs text-[var(--color-text-secondary)] space-y-1">
                      <div>To Hit: 1d20 {abilityMod >= 0 ? '+' : ''}{abilityMod} ({abilityName}) {profBonus > 0 && `+${profBonus} (Prof)`} {magicalAttackBonus > 0 && `+${magicalAttackBonus} (Magic)`}</div>
                      <div>Damage: {weapon.damage} + {damageBonus >= 0 ? '+' : ''}{damageBonus} ({abilityName}{magicalDamageBonus > 0 && ` + Magic`})</div>
                      <div className="text-[var(--color-text-muted)]">Range: {weaponRange} • {weapon.category} {weapon.type}</div>
                      
                      {/* Stackable Weapon Quantity Tracking */}
                      {weapon.stackable && weapon.quantity && weapon.quantity > 0 && (() => {
                        const hasQuantity = weapon.quantity && weapon.quantity > 0;
                        
                        return (
                          <div className="flex items-center justify-between gap-2 mt-1 p-2 bg-[var(--color-card)]/50 rounded">
                            <div className="flex items-center gap-2">
                              <span className="text-[var(--color-warning)] font-medium">Quantity:</span>
                              <span className={`font-bold ${hasQuantity ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
                                {weapon.quantity} {weapon.name}s
                              </span>
                            </div>
                            
                            {/* Stackable Weapon Use/Recover Buttons */}
                            <div className="flex gap-1">
                              {onUseStackableWeapon && (
                                <button
                                  onClick={() => onUseStackableWeapon(weapon.name)}
                                  disabled={!hasQuantity}
                                  className="px-2 py-1 text-xs disabled:opacity-50 disabled:cursor-not-allowed rounded font-medium transition-all duration-200"
                                  style={interactiveButtonStyles.error}
                                  title={hasQuantity 
                                    ? `Use ${weapon.name} (-1, ${weapon.quantity} remaining)` 
                                    : `No ${weapon.name}s to use`}
                                >
                                  Use
                                </button>
                              )}
                              {onRecoverStackableWeapon && (
                                <button
                                  onClick={() => onRecoverStackableWeapon(weapon.name)}
                                  className="px-2 py-1 text-xs rounded font-medium transition-all duration-200"
                                  style={interactiveButtonStyles.success}
                                  title={`Recover ${weapon.name} after combat (+1)`}
                                >
                                  +1
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                      
                      {/* Ammunition Tracking for Ranged Weapons */}
                      {(weapon.properties.some(prop => prop.startsWith('Ammunition'))) && (() => {
                        // Use the weapon's ammunitionTypeId to determine ammo type
                        let ammoType: string;
                        
                        if (weapon.ammunitionTypeId) {
                          // Map ammunitionTypeId to ammunition names
                          const ammoTypeMap: { [key: number]: string } = {
                            1: 'Arrows',
                            2: 'Crossbow Bolts', 
                            3: 'Sling Bullets',
                            4: 'Blowgun Needles'
                          };
                          ammoType = ammoTypeMap[weapon.ammunitionTypeId] || 'Ammunition';
                        } else if (weapon.name === 'Dart') {
                          // Special case for darts
                          ammoType = 'Darts';
                        } else {
                          // Fallback to weapon name detection for backward compatibility
                          if (weapon.name.toLowerCase().includes('crossbow')) {
                            ammoType = 'Crossbow Bolts';
                          } else if (weapon.name.toLowerCase().includes('blowgun')) {
                            ammoType = 'Blowgun Needles';
                          } else if (weapon.name.toLowerCase().includes('sling')) {
                            ammoType = 'Sling Bullets';
                          } else {
                            // Default to arrows for bows
                            ammoType = 'Arrows';
                          }
                        }
                        
                        // DEBUG: Log ammunition lookup
                        console.log('🔍 AMMUNITION DEBUG:', {
                          weaponName: weapon.name,
                          ammoType,
                          characterAmmunition: character.ammunition,
                          foundAmmo: character.ammunition?.find(a => a.name === ammoType)
                        });
                        
                        // Find ammo in character's ammunition (including 0 quantity)
                        const ammo = character.ammunition?.find(a => a.name === ammoType);
                        const hasAmmo = ammo && ammo.quantity > 0;
                        
                        return (
                          <div className="flex items-center justify-between gap-2 mt-1 p-2 bg-[var(--color-card)]/50 rounded">
                            <div className="flex items-center gap-2">
                              <span className="text-[var(--color-warning)] font-medium">Ammo:</span>
                              <span className={`font-bold ${hasAmmo ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
                                {ammo ? `${ammo.quantity} ${ammo.name}s` : `No ${ammoType}s!`}
                              </span>
                              {!hasAmmo && !ammo && (
                                <span className="text-[var(--color-danger)]/80 text-xs">
                                  (Add {ammoType}s from gear)
                                </span>
                              )}
                            </div>
                            
                            {/* Ammunition Use/Recover Buttons - Always show if ammo type exists or can be recovered */}
                            {(ammo || (onRecoverAmmunition && onUseAmmunition)) && (
                              <div className="flex gap-1">
                                {onUseAmmunition && (
                                  <button
                                    onClick={() => onUseAmmunition(ammo?.name || ammoType)}
                                    disabled={!ammo || ammo.quantity <= 0}
                                    className="px-2 py-1 text-xs disabled:opacity-50 disabled:cursor-not-allowed rounded font-medium transition-all duration-200"
                                    style={interactiveButtonStyles.error}
                                    title={ammo && ammo.quantity > 0 
                                      ? `Use ${ammo.name} (-1, ${ammo.quantity} remaining)` 
                                      : `No ${ammoType}s to use`}
                                  >
                                    Use
                                  </button>
                                )}
                                {onRecoverAmmunition && (
                                  <button
                                    onClick={() => onRecoverAmmunition(ammo?.name || ammoType)}
                                    className="px-2 py-1 text-xs rounded font-medium transition-all duration-200"
                                    style={interactiveButtonStyles.success}
                                    title={`Recover ${ammoType} after combat (+1)`}
                                  >
                                    +1
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Magical Properties */}
                    {isMagical && (weapon as MagicalWeapon).magicalProperties && (
                      <div 
                        className="mt-3 p-2 rounded"
                        style={opacityStyles.accent20}
                      >
                        <div className="text-[var(--color-accent)] text-xs font-medium mb-1">Magical Properties:</div>
                        <div className="text-[var(--color-text-secondary)] text-xs">{(weapon as MagicalWeapon).magicalProperties}</div>
                      </div>
                    )}


                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Standalone Ammunition Section */}
        {character.ammunition && character.ammunition.length > 0 && (
          <div className="bg-[var(--color-card)] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
              <Target className="h-6 w-6" />
              Ammunition
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {character.ammunition.map((ammo, index) => (
                <div 
                  key={index}
                  className="bg-[var(--color-card-secondary)] rounded-lg p-4 border border-[var(--color-border)]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-lg font-bold text-[var(--color-text-primary)]">{ammo.name}</div>
                      <div className="text-sm text-[var(--color-text-muted)]">Ammunition</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[var(--color-accent)]">{ammo.quantity}</div>
                      <div className="text-xs text-[var(--color-text-muted)]">Remaining</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {onUseAmmunition && (
                      <button
                        onClick={() => onUseAmmunition(ammo.name)}
                        disabled={ammo.quantity <= 0}
                        className="flex-1 bg-[var(--color-error)] hover:bg-[var(--color-error-hover)] text-[var(--color-error-text)] text-sm px-3 py-2 rounded font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        title={ammo.quantity > 0 ? `Use ${ammo.name} (-1, ${ammo.quantity} remaining)` : `No ${ammo.name}s to use`}
                      >
                        Use
                      </button>
                    )}
                    {onRecoverAmmunition && (
                      <button
                        onClick={() => onRecoverAmmunition(ammo.name)}
                        className="flex-1 bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-[var(--color-success-text)] text-sm px-3 py-2 rounded font-medium transition-all duration-200"
                        title={`Recover ${ammo.name} after combat (+1)`}
                      >
                        +1
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spell Slots & Spellcasting */}
        {((character.spellcastingAbility && (character.spellsKnown && character.spellsKnown.length > 0 || character.spellsPrepared && character.spellsPrepared.length > 0)) || allMagicalItemSpells.length > 0) && (
          <div className="bg-[var(--color-card)] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6" />
              Spellcasting
            </h3>
            
            {/* Spellcasting Stats */}
            {character.spellcastingAbility && calc.spellcasting && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center bg-[var(--color-card-secondary)] rounded p-3">
                  <div className="text-xl font-bold text-[var(--color-accent)]">{calc.spellcasting.spellSaveDC}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">Spell Save DC</div>
                </div>
                <div className="text-center bg-[var(--color-card-secondary)] rounded p-3">
                  <div className="text-xl font-bold text-[var(--color-success)]">+{calc.spellcasting.spellAttackBonus}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">Spell Attack</div>
                </div>
                <div className="text-center bg-[var(--color-card-secondary)] rounded p-3">
                  <div className="text-xl font-bold text-[var(--color-accent)]">{character.spellcastingAbility?.toUpperCase()}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">Casting Ability</div>
                </div>
              </div>
            )}

            {/* Spell Slot Manager */}
            {character.spellcastingAbility && character.spellSlots && Object.keys(character.spellSlots).filter(k => k && k !== 'undefined').length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Spell Slot Manager</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(character.spellSlots)
                    .filter(([level, total]) => level && level !== 'undefined' && total > 0)
                    .map(([level, total]) => {
                      const used = character.usedSpellSlots?.[parseInt(level)] || 0;
                      const available = total - used;
                      
                      return (
                        <div key={level} className="bg-[var(--color-card-secondary)] rounded-lg p-4 border border-[var(--color-border)]">
                          <div className="text-center mb-4">
                            <div className="text-lg font-bold text-[var(--color-accent)] mb-1">Level {level}</div>
                            <div className="text-2xl font-bold text-[var(--color-text-primary)]">{available}/{total}</div>
                            <div className="text-sm text-[var(--color-text-muted)]">Spell Slots</div>
                          </div>
                          
                          {/* Interactive spell slot checkboxes */}
                          <div className="flex justify-center gap-2 mb-4">
                            {Array.from({length: total}, (_, i) => {
                              const isUsed = i < used;
                              return (
                                <button
                                  key={i}
                                  onClick={() => {
                                    if (isUsed && onRecoverSpellSlot) {
                                      onRecoverSpellSlot(parseInt(level));
                                    } else if (!isUsed && onUseSpellSlot) {
                                      onUseSpellSlot(parseInt(level));
                                    }
                                  }}
                                  className={`w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                                    isUsed 
                                      ? 'border-[var(--color-text-secondary)] bg-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)]' 
                                      : 'border-[var(--color-text-secondary)] bg-transparent hover:border-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)]/10'
                                  }`}
                                  title={isUsed ? `Recover Level ${level} spell slot` : `Use Level ${level} spell slot`}
                                >
                                  {isUsed && (
                                    <div className="w-2 h-2 rounded-full bg-[var(--color-card)]" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          
                          {/* Quick action buttons */}
                          <div className="flex gap-2">
                            {onUseSpellSlot && available > 0 && (
                              <button
                                onClick={() => onUseSpellSlot(parseInt(level))}
                                className="flex-1 bg-[var(--color-error)] hover:bg-[var(--color-error-hover)] text-[var(--color-error-text)] text-sm px-3 py-2 rounded font-medium transition-all duration-200"
                                title={`Use Level ${level} spell slot`}
                              >
                                Use
                              </button>
                            )}
                            {onRecoverSpellSlot && used > 0 && (
                              <button
                                onClick={() => onRecoverSpellSlot(parseInt(level))}
                                className="flex-1 bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-[var(--color-success-text)] text-sm px-3 py-2 rounded font-medium transition-all duration-200"
                                title={`Recover Level ${level} spell slot`}
                              >
                                Recover
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  
                  {/* Cantrip Info Card */}
                  <div className="bg-[var(--color-card-secondary)] rounded-lg p-4 border border-[var(--color-border)] border-l-4 border-l-[var(--color-success)]">
                    <div className="text-center mb-3">
                      <div className="text-lg font-bold text-[var(--color-success)] mb-1">Cantrips</div>
                      <div className="text-2xl font-bold text-[var(--color-text-primary)]">∞</div>
                      <div className="text-sm text-[var(--color-text-muted)]">Unlimited Use</div>
                    </div>
                    
                    <div className="text-xs text-[var(--color-text-secondary)] text-center leading-relaxed">
                      <div className="mb-2">💡 0-level spells</div>
                      <div>Don&apos;t use spell slots</div>
                      <div>Can be cast at will</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Ki Point Manager for Monks */}
            <KiPointManager 
              character={{
                class: character.class,
                level: character.level,
                kiPoints: character.kiPoints,
                usedKiPoints: character.usedKiPoints
              }}
              onKiPointsChange={(usedKiPoints) => {
                // TODO: Implement ki points update
                console.log('Ki points changed:', usedKiPoints);
              }}
            />

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
                      <div 
                        className="mb-3 p-3 rounded-lg"
                        style={opacityStyles.success20}
                      >
                        <p className="text-sm" style={{ color: 'var(--color-success)' }}>
                          <strong>{character.class} Spellcasting:</strong> All known spells are always available to cast.
                        </p>
                      </div>
                      <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Known Spells</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                        {(character.spellsKnown || []).filter(spell => spell && spell.name && spell.level !== undefined).map((spell, index) => (
                          <div 
                            key={index} 
                            className="bg-[var(--color-card-secondary)] p-3 rounded"
                            style={borderLeftStyles.success}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[var(--color-text-primary)] font-medium">{spell.name}</span>
                              <span 
                                className="text-xs px-2 py-1 rounded"
                                style={opacityStyles.success20}
                              >
                                {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}
                              </span>
                            </div>
                            <div className="text-[var(--color-text-muted)] text-xs mb-2">
                              {spell.school} • {spell.castingTime} • {spell.range}
                            </div>
                            <div className="text-[var(--color-text-secondary)] text-xs">{spell.description}</div>
                            {spell.level === 0 && (
                              <div className="text-[var(--color-success)] text-xs mt-1 font-medium">
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
                      <div 
                        className="mb-3 p-3 rounded-lg"
                        style={opacityStyles.accent20}
                      >
                        <p className="text-sm" style={{ color: 'var(--color-accent)' }}>
                          <strong>Wizard Spellcasting:</strong> You have a spellbook containing all learned spells, but can only prepare {maxPrepared} per day.
                        </p>
                      </div>
                      
                      {/* Prepared Spells */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                            Prepared Spells ({(character.spellsPrepared || []).filter(s => s.level > 0).length}/{maxPrepared})
                          </h4>
                          <button
                            onClick={onOpenSpellPreparation}
                            className="text-sm px-3 py-1 rounded font-medium transition-colors"
                            style={{
                              backgroundColor: 'var(--color-accent)',
                              color: 'var(--color-accent-text)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                            }}
                            title="Change prepared spells"
                          >
                            Prepare Spells
                          </button>
                        </div>
                        {character.spellsPrepared && character.spellsPrepared.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            {character.spellsPrepared.filter(spell => spell && spell.name && spell.level !== undefined).map((spell, index) => (
                              <div 
                              key={index} 
                              className="bg-[var(--color-card-secondary)] p-3 rounded"
                              style={borderLeftStyles.accent}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-[var(--color-text-primary)] font-medium">{spell.name}</span>
                                  <span 
                                    className="text-xs px-2 py-1 rounded"
                                    style={opacityStyles.accent20}
                                  >
                                    {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}
                                  </span>
                                </div>
                                <div className="text-[var(--color-text-muted)] text-xs mb-2">
                                  {spell.school} • {spell.castingTime} • {spell.range}
                                </div>
                                <div className="text-[var(--color-text-secondary)] text-xs">{spell.description}</div>
                                {spell.level === 0 && (
                                  <div className="text-[var(--color-accent)] text-xs mt-1 font-medium">
                                    ✓ Unlimited Use
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-[var(--color-text-muted)] text-sm italic mb-4">No spells prepared</div>
                        )}

                        {/* All Known Spells (Spellbook) */}
                        <h5 className="text-md font-semibold text-[var(--color-text-primary)] mb-3">Spellbook ({(character.spellsKnown || []).length} spells)</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                          {(character.spellsKnown || []).filter(spell => spell && spell.name && spell.level !== undefined).map((spell, index) => (
                            <div key={index} className="bg-[var(--color-card-secondary)] p-3 rounded border-l-4 border-[var(--color-accent)]/60">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[var(--color-text-primary)] font-medium">{spell.name}</span>
                                <span className="text-xs bg-[var(--color-accent)]/10 text-[var(--color-accent)]/80 px-2 py-1 rounded">
                                  {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}
                                </span>
                              </div>
                              <div className="text-[var(--color-text-muted)] text-xs mb-2">
                                {spell.school} • {spell.castingTime} • {spell.range}
                              </div>
                              <div className="text-[var(--color-text-secondary)] text-xs">{spell.description}</div>
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
                      <div 
                        className="mb-3 p-3 rounded-lg"
                        style={opacityStyles.warning20}
                      >
                        <p className="text-sm" style={{ color: 'var(--color-warning)' }}>
                          <strong>{character.class} Spellcasting:</strong> You know all {character.class} spells and can prepare {maxPrepared} per day.
                        </p>
                      </div>
                      
                                              <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                            Prepared Spells ({(character.spellsPrepared || []).filter(s => s.level > 0).length}/{maxPrepared})
                          </h4>
                          {onSwitchTab && (
                            <button
                              onClick={() => onSwitchTab("gear")}
                              className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] text-sm px-3 py-1 rounded font-medium transition-colors"
                              title="Manage spells and equipment"
                            >
                              Manage Spells
                            </button>
                          )}
                        </div>
                      {character.spellsPrepared && character.spellsPrepared.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {character.spellsPrepared.filter(spell => spell && spell.name && spell.level !== undefined).map((spell, index) => (
                            <div 
                              key={index} 
                              className="bg-[var(--color-card-secondary)] p-3 rounded"
                              style={borderLeftStyles.warning}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[var(--color-text-primary)] font-medium">{spell.name}</span>
                                <span 
                                  className="text-xs px-2 py-1 rounded"
                                  style={opacityStyles.warning20}
                                >
                                  {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}
                                </span>
                              </div>
                              <div className="text-[var(--color-text-muted)] text-xs mb-2">
                                {spell.school} • {spell.castingTime} • {spell.range}
                              </div>
                              <div className="text-[var(--color-text-secondary)] text-xs">{spell.description}</div>
                              {spell.level === 0 && (
                                <div className="text-[var(--color-warning)] text-xs mt-1 font-medium">
                                  ✓ Unlimited Use
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-[var(--color-text-muted)] text-sm italic">No spells prepared</div>
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
                <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Magical Item Spells</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {allMagicalItemSpells.map((itemSpell, index) => (
                    <div 
                      key={index} 
                      className="bg-[var(--color-card-secondary)] p-3 rounded"
                      style={itemSpell.canUse ? borderLeftStyles.warning : { borderLeft: '4px solid var(--color-border)' }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span 
                          className="font-medium"
                          style={{ color: itemSpell.canUse ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}
                        >
                          {itemSpell.spell.name}
                        </span>
                        <span 
                          className="text-xs px-2 py-1 rounded"
                          style={itemSpell.canUse ? opacityStyles.warning20 : { backgroundColor: 'var(--color-card)', color: 'var(--color-text-muted)' }}
                        >
                          {itemSpell.spell.level === 0 ? 'Cantrip' : `Level ${itemSpell.spell.level}`}
                        </span>
                        <span 
                          className="text-xs px-2 py-1 rounded"
                          style={itemSpell.canUse ? opacityStyles.accent20 : { backgroundColor: 'var(--color-card)', color: 'var(--color-text-muted)' }}
                        >
                          {itemSpell.uses}
                        </span>
                      </div>
                      <div 
                        className="text-xs mb-2"
                        style={{ color: itemSpell.canUse ? 'var(--color-text-secondary)' : 'var(--color-text-muted)' }}
                      >
                        {itemSpell.spell.description}
                      </div>
                      <div 
                        className="text-xs"
                        style={{ color: itemSpell.canUse ? 'var(--color-warning)' : 'var(--color-text-muted)' }}
                      >
                        <strong>Source:</strong> {itemSpell.source}
                        {itemSpell.requiresAttunement && !itemSpell.isAttuned && (
                          <span className="ml-2 text-[var(--color-danger)]">(Requires Attunement)</span>
                        )}
                        {!itemSpell.canUse && itemSpell.reason && (
                          <div className="mt-1 text-[var(--color-danger)]">
                            <strong>Restriction:</strong> {itemSpell.reason}
                          </div>
                        )}
                        {itemSpell.canUse && itemSpell.reason && (
                          <div className="mt-1 text-[var(--color-warning)]">
                            <strong>Note:</strong> {itemSpell.reason}
                          </div>
                        )}
                        {onUseSpellScroll && 'scrollIndex' in itemSpell && typeof itemSpell.scrollIndex === 'number' && (
                          <div className="mt-2">
                            <button
                              onClick={() => onUseSpellScroll(itemSpell.scrollIndex as number)}
                              className="bg-[var(--color-warning)] hover:bg-[var(--color-warning)]/80 text-[var(--color-warning-text)] text-xs px-3 py-1 rounded font-medium"
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

        {/* Enhanced Combat Actions Reference */}
        <div className="bg-[var(--color-card)] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
            <Swords className="h-6 w-6" />
            Combat Actions Reference
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Standard Actions */}
            <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                <span className="bg-[var(--color-accent)] text-[var(--color-accent-text)] px-2 py-1 rounded text-xs font-bold">ACTION</span>
                Standard Actions
              </h4>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                <div className="border-l-4 border-[var(--color-accent)] pl-3">
                  <div className="text-[var(--color-text-primary)] font-medium text-sm">Attack</div>
                  <div className="text-[var(--color-text-secondary)] text-xs">Make a melee or ranged attack with a weapon</div>
                </div>
                <div className="border-l-4 border-[var(--color-accent)] pl-3">
                  <div className="text-[var(--color-text-primary)] font-medium text-sm">Cast a Spell</div>
                  <div className="text-[var(--color-text-secondary)] text-xs">Cast a spell with casting time of 1 action</div>
                </div>
                <div className="border-l-4 border-[var(--color-accent)] pl-3">
                  <div className="text-[var(--color-text-primary)] font-medium text-sm">Dash</div>
                  <div className="text-[var(--color-text-secondary)] text-xs">Double your speed for this turn</div>
                </div>
                <div className="border-l-4 border-[var(--color-accent)] pl-3">
                  <div className="text-[var(--color-text-primary)] font-medium text-sm">Disengage</div>
                  <div className="text-[var(--color-text-secondary)] text-xs">Your movement doesn&apos;t provoke opportunity attacks</div>
                </div>
                <div className="border-l-4 border-[var(--color-accent)] pl-3">
                  <div className="text-[var(--color-text-primary)] font-medium text-sm">Dodge</div>
                  <div className="text-[var(--color-text-secondary)] text-xs">Attackers have disadvantage, you have advantage on Dex saves</div>
                </div>
                <div className="border-l-4 border-[var(--color-accent)] pl-3">
                  <div className="text-[var(--color-text-primary)] font-medium text-sm">Help</div>
                  <div className="text-[var(--color-text-secondary)] text-xs">Give an ally advantage on their next ability check or attack</div>
                </div>
                <div className="border-l-4 border-[var(--color-accent)] pl-3">
                  <div className="text-[var(--color-text-primary)] font-medium text-sm">Hide</div>
                  <div className="text-[var(--color-text-secondary)] text-xs">Make a Stealth check to become hidden</div>
                </div>
                <div className="border-l-4 border-[var(--color-accent)] pl-3">
                  <div className="text-[var(--color-text-primary)] font-medium text-sm">Ready</div>
                  <div className="text-[var(--color-text-secondary)] text-xs">Prepare an action to trigger on a specific condition</div>
                </div>
                <div className="border-l-4 border-[var(--color-accent)] pl-3">
                  <div className="text-[var(--color-text-primary)] font-medium text-sm">Search</div>
                  <div className="text-[var(--color-text-secondary)] text-xs">Make a Perception or Investigation check to find something</div>
                </div>
                <div className="border-l-4 border-[var(--color-accent)] pl-3">
                  <div className="text-[var(--color-text-primary)] font-medium text-sm">Use an Object</div>
                  <div className="text-[var(--color-text-secondary)] text-xs">Interact with or use an object in your environment</div>
                </div>
                {character.actions?.filter(a => 
                  a && a.type === 'Action' && a.name &&
                  !['Attack', 'Cast a Spell', 'Dash', 'Disengage', 'Dodge', 'Help', 'Hide', 'Ready', 'Search', 'Use an Object'].includes(a.name)
                ).map((action, i) => (
                  <div key={i} className="border-l-4 border-[var(--color-warning)] pl-3">
                    <div className="text-[var(--color-warning)] font-medium text-sm">• {action.name}</div>
                    <div className="text-[var(--color-text-secondary)] text-xs">Class or feature ability</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bonus Actions & Reactions */}
            <div className="space-y-4">
              {/* Bonus Actions */}
              <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                  <span className="bg-[var(--color-warning)] text-[var(--color-warning-text)] px-2 py-1 rounded text-xs font-bold">BONUS</span>
                  Bonus Actions
                </h4>
                <div className="space-y-3 max-h-32 overflow-y-auto">
                  <div className="border-l-4 border-[var(--color-warning)] pl-3">
                    <div className="text-[var(--color-text-primary)] font-medium text-sm">Off-hand Attack</div>
                    <div className="text-[var(--color-text-secondary)] text-xs">Attack with a light weapon in your other hand</div>
                  </div>
                  <div className="border-l-4 border-[var(--color-warning)] pl-3">
                    <div className="text-[var(--color-text-primary)] font-medium text-sm">Two-Weapon Fighting</div>
                    <div className="text-[var(--color-text-secondary)] text-xs">Add ability modifier to off-hand damage</div>
                  </div>
                  {character.bonusActions?.filter(action => action && action.name).map((action, i) => (
                    <div key={i} className="border-l-4 border-[var(--color-accent)] pl-3">
                      <div className="text-[var(--color-accent)] font-medium text-sm">• {action.name}</div>
                      <div className="text-[var(--color-text-secondary)] text-xs">Class or feature ability</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reactions */}
              <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                  <span className="bg-[var(--color-danger)] text-[var(--color-danger-text)] px-2 py-1 rounded text-xs font-bold">REACTION</span>
                  Reactions
                </h4>
                <div className="space-y-3 max-h-32 overflow-y-auto">
                  <div className="border-l-4 border-[var(--color-danger)] pl-3">
                    <div className="text-[var(--color-text-primary)] font-medium text-sm">Opportunity Attack</div>
                    <div className="text-[var(--color-text-secondary)] text-xs">Attack when enemy leaves your reach</div>
                  </div>
                  {character.reactions?.filter(action => action && action.name).map((action, i) => (
                    <div key={i} className="border-l-4 border-[var(--color-accent)] pl-3">
                      <div className="text-[var(--color-accent)] font-medium text-sm">• {action.name}</div>
                      <div className="text-[var(--color-text-secondary)] text-xs">Class or feature ability</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Combat Rules */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
              <h5 className="font-semibold text-[var(--color-text-primary)] mb-2">Movement Rules</h5>
              <div className="space-y-2 text-xs text-[var(--color-text-secondary)]">
                <div>• <strong>Difficult Terrain:</strong> Costs 2 feet per 1 foot moved</div>
                <div>• <strong>Climbing/Swimming:</strong> Costs 2 feet per 1 foot moved</div>
                <div>• <strong>Standing from Prone:</strong> Costs half your speed</div>
                <div>• <strong>Mounting/Dismounting:</strong> Costs half your speed</div>
                <div>• <strong>Jumping:</strong> Long jump = Strength score, High jump = 3 + Strength modifier</div>
              </div>
            </div>
            
            <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
              <h5 className="font-semibold text-[var(--color-text-primary)] mb-2">Combat Modifiers</h5>
              <div className="space-y-2 text-xs text-[var(--color-text-secondary)]">
                <div>• <strong>Advantage:</strong> Roll 2d20, take higher</div>
                <div>• <strong>Disadvantage:</strong> Roll 2d20, take lower</div>
                <div>• <strong>Cover:</strong> +2 AC (1/2), +5 AC (3/4), +5 AC + Dex save (full)</div>
                <div>• <strong>Flanking:</strong> Advantage if ally is opposite side (optional rule)</div>
                <div>• <strong>Critical Hit:</strong> Natural 20, double damage dice</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center text-[var(--color-text-muted)] text-sm">
            Comprehensive D&D 5e combat reference - all standard actions and common rules
          </div>
        </div>

        {/* Empty State */}
        {(!equippedWeapons || equippedWeapons.length === 0) && 
         (!character.spellsKnown || character.spellsKnown.length === 0) && (
          <div className="text-center py-12">
            <Swords className="h-16 w-16 text-[var(--color-text-muted)] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[var(--color-text-secondary)] mb-2">No Combat Options</h3>
            <p className="text-[var(--color-text-muted)]">Equip weapons or learn spells to see combat actions here.</p>
          </div>
        )}
      </div>
    </div>
  );
} 