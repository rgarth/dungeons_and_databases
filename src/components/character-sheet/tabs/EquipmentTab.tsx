"use client";

import { Sword, Package, Shield, Plus, Trash2, Zap } from "lucide-react";
import { createCharacterCalculations } from "@/services/character/calculations";
import { createCharacterEquipment } from "@/services/character/equipment";
import { MAGICAL_WEAPON_TEMPLATES } from "@/lib/dnd/equipment";
import { canPrepareSpells, getSpellsPreparedCount } from "@/lib/dnd/level-up";
import type { Weapon, MagicalWeapon, Armor } from "@/lib/dnd/equipment";
import type { Spell } from "@/lib/dnd/spells";
import { useState, useEffect } from "react";
import { clientCache } from '@/lib/client-cache';

interface DatabaseArmor {
  id: number;
  name: string;
  type: 'Light' | 'Medium' | 'Heavy' | 'Shield';
  baseArmorClass: number;
  maxDexterityBonus?: number;
  minStrength?: number;
  stealthDisadvantage: boolean;
  cost: number;
  weight: number;
  description?: string;
}

interface EquipmentTabProps {
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
    spellsKnown?: Spell[];
    spellsPrepared?: Spell[];
    spellcastingAbility?: string;
    spellSaveDC?: number;
    spellAttackBonus?: number;
  };
  equippedWeapons: (Weapon | MagicalWeapon)[];
  inventoryWeapons: (Weapon | MagicalWeapon)[];
  equippedArmor: Armor[];
  inventoryArmor: Armor[];
  onEquipWeapon: (weapon: Weapon | MagicalWeapon, fromInventoryIndex: number) => void;
  onUnequipWeapon: (weaponIndex: number) => void;
  onRemoveWeapon: (index: number, isEquipped?: boolean) => void;
  onEquipArmor: (armor: Armor, fromInventoryIndex: number) => void;
  onUnequipArmor: (armorIndex: number) => void;
  onRemoveArmor: (index: number, isEquipped?: boolean) => void;
  onAddWeapon: (weapon: Weapon | MagicalWeapon) => void;
  onAddArmor: (armor: Armor) => void;
  onOpenSpellPreparation: () => void;
  weaponLimits: { max: number; reason: string };
}

export function EquipmentTab({
  character,
  equippedWeapons,
  inventoryWeapons,
  equippedArmor,
  inventoryArmor,
  onEquipWeapon,
  onUnequipWeapon,
  onRemoveWeapon,
  onEquipArmor,
  onUnequipArmor,
  onRemoveArmor,
  onAddWeapon,
  onAddArmor,
  onOpenSpellPreparation,
  weaponLimits
}: EquipmentTabProps) {
  // Create service instances for clean calculations
  const characterData = {
    ...character,
    name: '',
    race: '',
    armorClass: 10, // Will be calculated by equipment service
    proficiencyBonus: Math.floor((character.level - 1) / 4) + 2,
    hitPoints: 1,
    maxHitPoints: 1,
    speed: 30
  };
  
  const calc = createCharacterCalculations(characterData);
  const equipment = createCharacterEquipment(characterData);

  const [showWeaponCreator, setShowWeaponCreator] = useState(false);
  const [selectedBaseWeapon, setSelectedBaseWeapon] = useState("");
  const [selectedMagicalTemplate, setSelectedMagicalTemplate] = useState("");
  const [customWeaponName, setCustomWeaponName] = useState("");
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
  const [selectedArmor, setSelectedArmor] = useState<DatabaseArmor | null>(null);
  const [armorData, setArmorData] = useState<DatabaseArmor[]>([]);

  // Load armor data from database
  useEffect(() => {
    const loadArmorData = async () => {
      try {
        const response = await fetch('/api/armor');
        if (response.ok) {
          const data = await response.json();
          setArmorData(data);
        }
      } catch (error) {
        console.error('Failed to load armor data:', error);
      }
    };

    loadArmorData();
  }, []);

  const handleCreateMagicalWeapon = () => {
    if (!selectedBaseWeapon || !selectedMagicalTemplate) return;

    const baseWeapon = clientCache.getWeapons().find(w => w.name === selectedBaseWeapon);
    const template = MAGICAL_WEAPON_TEMPLATES.find(t => t.name === selectedMagicalTemplate);

    if (!baseWeapon || !template) return;

    const magicalWeapon = {
      ...baseWeapon,
      baseName: baseWeapon.name,
      magicalName: customWeaponName || `${template.name} ${baseWeapon.name}`,
      rarity: template.rarity,
      attackBonus: template.attackBonus || 0,
      damageBonus: template.damageBonus || 0,
      magicalProperties: template.description
    };

    onAddWeapon(magicalWeapon as any);
    setShowWeaponCreator(false);
    setSelectedBaseWeapon('');
    setSelectedMagicalTemplate('');
    setCustomWeaponName('');
  };

  const handleAddWeapon = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedWeapon) {
      onAddWeapon(selectedWeapon);
      setSelectedWeapon(null);
    }
  };

  const handleAddArmor = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedArmor) {
             onAddArmor({
         name: selectedArmor.name,
         type: selectedArmor.type,
         baseAC: selectedArmor.baseArmorClass,
         maxDexBonus: selectedArmor.maxDexterityBonus,
         minStrength: selectedArmor.minStrength,
         stealthDisadvantage: selectedArmor.stealthDisadvantage,
         cost: selectedArmor.cost.toString(),
         weight: selectedArmor.weight,
         description: selectedArmor.description || ''
       });
      setSelectedArmor(null);
    }
  };

  const handleArmorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const armorName = e.target.value;
    const armor = armorData.find(a => a.name === armorName);
    setSelectedArmor(armor || null);
  };

  const handleWeaponSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const weaponName = e.target.value;
    const weapon = clientCache.getWeapons().find(w => w.name === weaponName);
    setSelectedWeapon(weapon as any || null);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Weapons */}
        <div className="space-y-6">
          {/* Equipped Weapons Section */}
          {equippedWeapons && equippedWeapons.length > 0 && (
            <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <Sword className="h-5 w-5" />
                Equipped Weapons ({equippedWeapons.length}/{weaponLimits.max})
              </h3>
              
              {/* D&D Combat Usage Information */}
              <div className="mb-4 text-sm text-[var(--color-accent)] bg-[var(--color-accent-bg)] p-3 rounded">
                <div className="font-medium mb-1">⚔️ D&D 5e Combat Rules:</div>
                <div className="text-xs space-y-1">
                  <div>• <strong>Action economy:</strong> Choose weapons based on situation each turn</div>
                  <div>• <strong>Two-handed weapons:</strong> Need both hands when attacking (longbow, greatsword)</div>
                  <div>• <strong>Dual wielding:</strong> Two light weapons for bonus action attack</div>
                  <div>• <strong>Drawing/sheathing:</strong> One weapon per turn as free interaction</div>
                  <div>• <strong>Example:</strong> Ranger can carry longbow + longsword + daggers, use what fits the situation</div>
                </div>
              </div>
              
              {/* Show shield compatibility reminder if relevant */}
              {equippedArmor.some(armor => armor.type === 'Shield') && 
               equippedWeapons.some(weapon => weapon.properties.includes('Two-handed')) && (
                <div className="mb-3 text-sm text-[var(--color-accent)] bg-[var(--color-accent-bg)] p-2 rounded">
                  💡 <strong>Combat note:</strong> Shield + two-handed weapon equipped. Choose one style per turn: shield + one-handed weapon OR two-handed weapon.
                </div>
              )}
              
              {/* Current Equipped Weapons */}
              <div className="space-y-2 mb-4">
                {equippedWeapons.map((weapon, index) => {
                  const isMagical = 'magicalName' in weapon;
                  const isProficient = equipment.canUseWeapon(weapon);
                  const isTwoHanded = weapon.properties.includes('Two-handed');
                  
                  return (
                    <div key={index} className="bg-[var(--color-card-tertiary)] p-3 rounded">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="text-[var(--color-text-primary)] font-medium">{weapon.name}</div>
                            {weapon.category === 'Ranged' && (
                              <span className="text-xs bg-[var(--color-accent-bg)] text-[var(--color-accent)] px-2 py-1 rounded">
                                Ranged
                              </span>
                            )}
                            {isTwoHanded && (
                              <span className="text-xs bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] px-2 py-1 rounded">
                                Two-handed
                              </span>
                            )}
                            {isMagical && (
                              <span className="text-xs bg-[var(--color-accent-bg)] text-[var(--color-accent)] px-2 py-1 rounded">
                                {(weapon as MagicalWeapon).rarity}
                              </span>
                            )}
                            {!isProficient && (
                              <span className="text-xs bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] px-2 py-1 rounded">
                                No Prof Bonus
                              </span>
                            )}
                          </div>
                          <div className="text-[var(--color-text-secondary)] text-sm">
                            {weapon.damage}{isMagical && (weapon as MagicalWeapon).damageBonus > 0 && `+${(weapon as MagicalWeapon).damageBonus}`} {weapon.damageType}
                            {isMagical && (weapon as MagicalWeapon).attackBonus > 0 && (
                              <span className="text-[var(--color-accent)]"> • +{(weapon as MagicalWeapon).attackBonus} to hit</span>
                            )}
                          </div>
                          {!isProficient && (
                            <div className="text-[var(--color-warning-text)] text-xs mt-1">
                              ⚠️ No proficiency - won&apos;t add proficiency bonus to attacks
                            </div>
                          )}
                          {isMagical && (weapon as MagicalWeapon).magicalProperties && (
                            <div className="text-[var(--color-accent)] text-xs mt-1 italic">
                              {(weapon as MagicalWeapon).magicalProperties}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUnequipWeapon(index)}
                            className="bg-[var(--color-card-quaternary)] hover:bg-[var(--color-card-tertiary)] text-[var(--color-text-primary)] text-xs px-2 py-1 rounded"
                          >
                            Unequip
                          </button>
                          <button
                            onClick={() => onRemoveWeapon(index, true)}
                            className="text-[var(--color-error)] hover:text-[var(--color-error-hover)] transition-colors p-1"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Weapon Inventory Section */}
          <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Weapon Storage
              <span className="text-xs bg-[var(--color-card-tertiary)] text-[var(--color-text-secondary)] px-2 py-1 rounded">
                Click &quot;Equip&quot; to use
              </span>
            </h3>
            
            {/* Add Magical Weapon Button */}
            <button
              onClick={() => setShowWeaponCreator(true)}
              className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mb-4"
            >
              <Plus className="h-4 w-4" />
              Create Magical Weapon
            </button>
            
            {/* Magical Items Notice */}
            <div className="mb-4 p-3 bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded-lg">
              <p className="text-[var(--color-text-secondary)] text-sm">
                💡 <strong>Other magical items?</strong> For wondrous items like Bag of Holding, potions, scrolls, rings, and more, check the <strong>Gear & Equipment</strong> tab!
              </p>
            </div>

            {/* Add Basic Weapon Selector */}
            <div className="mb-4">
              <div className="flex gap-2">
                <select
                  value={selectedWeapon ? selectedWeapon.name : ""}
                  onChange={handleWeaponSelect}
                  className="flex-1 bg-[var(--color-card-tertiary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] text-sm focus:border-[var(--color-accent)] focus:outline-none"
                >
                  <option value="">Select basic weapon to add...</option>
                  {clientCache.getWeapons().map(weapon => (
                    <option key={weapon.name} value={weapon.name}>
                      {weapon.name} ({weapon.damage} {weapon.damageType})
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddWeapon}
                  disabled={!selectedWeapon}
                  className="bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-button-text)] px-4 py-2 rounded text-sm font-medium"
                >
                  Add Weapon
                </button>
              </div>
            </div>
            
            {/* Weapons in Storage */}
            <div className="space-y-2">
              {inventoryWeapons && inventoryWeapons.length > 0 ? inventoryWeapons.map((weapon, index) => {
                const isMagical = 'magicalName' in weapon;
                const isProficient = equipment.canUseWeapon(weapon);
                const atLimit = equippedWeapons.length >= weaponLimits.max;
                
                return (
                  <div key={index} className="bg-[var(--color-card-tertiary)] p-3 rounded border-l-4 border-[var(--color-warning)]">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="text-[var(--color-text-primary)] font-medium">{weapon.name}</div>
                          {isMagical && (
                            <span className="text-xs bg-[var(--color-accent-bg)] text-[var(--color-accent)] px-2 py-1 rounded">
                              {(weapon as MagicalWeapon).rarity}
                            </span>
                          )}
                          {!isProficient && (
                            <span className="text-xs bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] px-2 py-1 rounded">
                              No Prof Bonus
                            </span>
                          )}
                        </div>
                        <div className="text-[var(--color-text-secondary)] text-sm">
                          {weapon.damage}{isMagical && (weapon as MagicalWeapon).damageBonus > 0 && `+${(weapon as MagicalWeapon).damageBonus}`} {weapon.damageType}
                          {isMagical && (weapon as MagicalWeapon).attackBonus > 0 && (
                            <span className="text-[var(--color-accent)]"> • +{(weapon as MagicalWeapon).attackBonus} to hit</span>
                          )}
                        </div>
                        {!isProficient && (
                          <div className="text-[var(--color-warning-text)] text-xs mt-1">
                            ⚠️ No proficiency - won&apos;t add proficiency bonus to attacks
                          </div>
                        )}
                        {isMagical && (weapon as MagicalWeapon).magicalProperties && (
                          <div className="text-[var(--color-accent)] text-xs mt-1 italic">
                            {(weapon as MagicalWeapon).magicalProperties}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEquipWeapon(weapon, index)}
                          disabled={atLimit}
                          className="bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:bg-[var(--color-card-secondary)] disabled:opacity-50 text-[var(--color-button-text)] text-sm px-3 py-1 rounded font-medium"
                          title={atLimit ? "At weapon limit" : "Equip weapon"}
                        >
                          Equip
                        </button>
                        <button
                          onClick={() => onRemoveWeapon(index, false)}
                          className="text-[var(--color-error)] hover:text-[var(--color-error-hover)] transition-colors p-1"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="text-center py-8">
                  <Sword className="h-8 w-8 text-[var(--color-text-tertiary)] mx-auto mb-2" />
                  <p className="text-[var(--color-text-tertiary)] text-sm">No weapons in storage</p>
                  <p className="text-[var(--color-text-quaternary)] text-xs">Create magical weapons above</p>
                </div>
              )}
            </div>
          </div>

          {/* Spells Section */}
          {character.spellsKnown && character.spellsKnown.length > 0 && (
            <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Spells
                </h3>
                {canPrepareSpells(character.class) && (
                  <button
                    onClick={onOpenSpellPreparation}
                    className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] text-sm px-3 py-1 rounded font-medium transition-colors"
                    title="Change prepared spells"
                  >
                    Prepare Spells
                  </button>
                )}

              </div>
              
              {character.spellSaveDC && (
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="text-[var(--color-text-secondary)]">
                    <strong>Spell Save DC:</strong> {character.spellSaveDC}
                  </div>
                  <div className="text-[var(--color-text-secondary)]">
                    <strong>Spell Attack:</strong> +{character.spellAttackBonus}
                  </div>
                </div>
              )}
              
              {/* Show preparation status for preparation-based casters */}
              {canPrepareSpells(character.class) && (
                <div className="mb-4 p-3 bg-[var(--color-accent-bg)] border border-[var(--color-accent-border)] rounded-lg">
                  <div className="text-[var(--color-accent)] text-sm">
                    <strong>Prepared Spells:</strong> {(character.spellsPrepared || []).filter(s => s.level > 0).length} / {
                      getSpellsPreparedCount(
                        character.class, 
                        character.level, 
                        calc.abilityModifiers[character.spellcastingAbility as keyof typeof calc.abilityModifiers]
                      )
                    }
                  </div>
                  <div className="text-[var(--color-accent)] text-xs mt-1">
                    You can change prepared spells during a long rest
                  </div>
                </div>
              )}
              
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {character.spellsKnown?.map((spell, index) => {
                  const isPrepared = character.spellsPrepared?.some(s => s.name === spell.name);
                  const requiresPreparation = canPrepareSpells(character.class) && spell.level > 0;
                  
                  return (
                    <div 
                      key={index} 
                      className={`bg-[var(--color-card-tertiary)] p-3 rounded ${requiresPreparation && !isPrepared ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[var(--color-text-primary)] font-medium">{spell.name}</span>
                            <span className="text-xs bg-[var(--color-accent-bg)] text-[var(--color-accent)] px-2 py-1 rounded">
                              {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}
                            </span>
                            {requiresPreparation && (
                              <span className={`text-xs px-2 py-1 rounded ${
                                isPrepared 
                                  ? 'bg-[var(--color-success-bg)] text-[var(--color-success-text)]'
                                  : 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]'
                              }`}>
                                {isPrepared ? 'Prepared' : 'Not Prepared'}
                              </span>
                            )}
                          </div>
                          <div className="text-[var(--color-text-tertiary)] text-xs mb-1">
                            {spell.school} • {spell.castingTime} • {spell.range}
                          </div>
                          <p className="text-[var(--color-text-secondary)] text-sm">{spell.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Armor */}
        <div className="space-y-6">
          {/* Armor Section */}
          <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Armor & Protection
            </h3>
            
            {/* Current Armor */}
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium text-[var(--color-text-secondary)]">Equipped</h4>
              {equippedArmor && equippedArmor.length > 0 ? equippedArmor.map((armor, index) => (
                <div key={index} className="bg-[var(--color-card-tertiary)] p-3 rounded">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-[var(--color-text-primary)] font-medium">{armor.name}</div>
                        <span className="text-xs bg-[var(--color-accent-bg)] text-[var(--color-accent)] px-2 py-1 rounded">
                          {armor.type}
                        </span>
                      </div>
                                             <div className="text-[var(--color-text-secondary)] text-sm">
                         AC {armor.type === 'Shield' ? `+${armor.baseAC}` : armor.baseAC}
                         {armor.type === 'Medium' && armor.maxDexBonus !== null && ` (Max Dex +${armor.maxDexBonus})`}
                        {armor.type === 'Light' && ` (Full Dex)`}
                        {armor.type === 'Heavy' && ` (No Dex)`}
                        {armor.minStrength && ` • Str ${armor.minStrength}`}
                        {armor.stealthDisadvantage && ` • Stealth Disadvantage`}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUnequipArmor(index)}
                        className="bg-[var(--color-card-quaternary)] hover:bg-[var(--color-card-tertiary)] text-[var(--color-text-primary)] text-xs px-2 py-1 rounded"
                      >
                        Unequip
                      </button>
                      <button
                        onClick={() => onRemoveArmor(index, true)}
                        className="text-[var(--color-error)] hover:text-[var(--color-error-hover)] transition-colors p-1"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-[var(--color-text-tertiary)] text-sm italic">No armor equipped</p>
              )}
            </div>

            {/* Armor in Storage */}
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium text-[var(--color-text-secondary)]">Storage</h4>
              {inventoryArmor && inventoryArmor.length > 0 ? inventoryArmor.map((armor, index) => {
                const canEquip = equipment.canWearArmor(armor);
                const hasStrengthReq = !armor.minStrength || character.strength >= armor.minStrength;
                
                return (
                  <div key={index} className="bg-[var(--color-card-tertiary)] p-3 rounded border-l-4 border-[var(--color-warning)]">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="text-[var(--color-text-primary)] font-medium">{armor.name}</div>
                          <span className="text-xs bg-[var(--color-accent-bg)] text-[var(--color-accent)] px-2 py-1 rounded">
                            {armor.type}
                          </span>
                          {!canEquip && (
                            <span className="text-xs bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] px-2 py-1 rounded">
                              No Proficiency
                            </span>
                          )}
                          {!hasStrengthReq && (
                            <span className="text-xs bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] px-2 py-1 rounded">
                              Str Req: {armor.minStrength}
                            </span>
                          )}
                        </div>
                        <div className="text-[var(--color-text-secondary)] text-sm">{armor.description}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEquipArmor(armor, index)}
                          disabled={!canEquip || !hasStrengthReq}
                          className="bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:bg-[var(--color-card-secondary)] disabled:opacity-50 text-[var(--color-button-text)] text-sm px-3 py-1 rounded font-medium"
                          title={!canEquip ? "Class cannot use this armor" : !hasStrengthReq ? "Insufficient strength" : "Equip armor"}
                        >
                          {!canEquip ? "Can't Use" : !hasStrengthReq ? "Too Heavy" : "Equip"}
                        </button>
                        <button
                          onClick={() => onRemoveArmor(index, false)}
                          className="text-[var(--color-error)] hover:text-[var(--color-error-hover)] transition-colors p-1"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="text-center py-4">
                  <Shield className="h-6 w-6 text-[var(--color-text-tertiary)] mx-auto mb-2" />
                  <p className="text-[var(--color-text-tertiary)] text-sm">No armor in storage</p>
                  <p className="text-[var(--color-text-quaternary)] text-xs">Add armor below to get started</p>
                </div>
              )}
            </div>

            {/* Add New Armor Section */}
            <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Armor
              </h3>
              <p className="text-[var(--color-text-tertiary)] text-sm mb-3">Add armor to your inventory from the equipment database</p>
              <form onSubmit={handleAddArmor} className="flex gap-2">
                <select
                  value={selectedArmor ? selectedArmor.name : ""}
                  onChange={handleArmorSelect}
                  className="flex-1 bg-[var(--color-card-tertiary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] text-sm focus:border-[var(--color-accent)] focus:outline-none"
                >
                  <option value="">Select armor to add...</option>
                  {armorData.map(armor => (
                    <option key={armor.id} value={armor.name}>
                      {armor.name} - {armor.cost} ({armor.type})
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={!selectedArmor}
                  className="bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-button-text)] px-4 py-2 rounded text-sm font-medium"
                >
                  Add
                </button>
              </form>
            </div>
          </div>

          {/* Enhanced AC Display */}
          <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Armor Class Calculator
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--color-accent)] mb-2">
                {equipment.calculateArmorClass(equippedArmor)}
              </div>
                             <div className="text-sm text-[var(--color-text-secondary)]">
                 Base: {equippedArmor.find(a => a.type !== 'Shield')?.baseAC || 10}
                 {equippedArmor.find(a => a.type !== 'Shield')?.type === 'Medium' && equippedArmor.find(a => a.type !== 'Shield')?.maxDexBonus !== null
                   ? ` + Dex (max +${equippedArmor.find(a => a.type !== 'Shield')?.maxDexBonus})`
                   : ` + Dex ${calc.abilityModifiers.dexterity >= 0 ? '+' : ''}${calc.abilityModifiers.dexterity}`
                 }
                 {equippedArmor.find(a => a.type === 'Shield') && ` + Shield +${equippedArmor.find(a => a.type === 'Shield')?.baseAC}`}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Magical Weapon Creator Modal */}
      {showWeaponCreator && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
          <div className="bg-[var(--color-card)] rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Create Magical Weapon</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[var(--color-text-tertiary)] mb-2">Base Weapon</label>
                <select
                  value={selectedBaseWeapon}
                  onChange={(e) => setSelectedBaseWeapon(e.target.value)}
                  className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
                >
                  <option value="">Select base weapon...</option>
                  {clientCache.getWeapons().map(weapon => (
                    <option key={weapon.name} value={weapon.name}>
                      {weapon.name} ({weapon.damage} {weapon.damageType})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-[var(--color-text-tertiary)] mb-2">Magical Enhancement</label>
                <select
                  value={selectedMagicalTemplate}
                  onChange={(e) => setSelectedMagicalTemplate(e.target.value)}
                  className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
                >
                  <option value="">Select enhancement...</option>
                  {MAGICAL_WEAPON_TEMPLATES.map(template => (
                    <option key={template.name} value={template.name}>
                      {template.name} ({template.rarity})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-[var(--color-text-tertiary)] mb-2">Custom Name (Optional)</label>
                <input
                  type="text"
                  value={customWeaponName}
                  onChange={(e) => setCustomWeaponName(e.target.value)}
                  placeholder="e.g., 'Dawnbreaker' or leave empty for default"
                  className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
                />
              </div>

              {selectedMagicalTemplate && (
                <div className="bg-[var(--color-card-secondary)] p-3 rounded">
                  <div className="text-xs text-[var(--color-text-tertiary)] mb-1">Enhancement Description:</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    {MAGICAL_WEAPON_TEMPLATES.find(t => t.name === selectedMagicalTemplate)?.description}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowWeaponCreator(false)}
                className="flex-1 bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-tertiary)] text-[var(--color-text-primary)] py-2 px-4 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateMagicalWeapon}
                disabled={!selectedBaseWeapon || !selectedMagicalTemplate}
                className="flex-1 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-accent-text)] py-2 px-4 rounded transition-colors"
              >
                Create Weapon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 