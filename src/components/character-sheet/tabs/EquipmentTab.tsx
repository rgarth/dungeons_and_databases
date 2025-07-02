"use client";

import { Sword, Package, Shield, Plus, Trash2, Zap } from "lucide-react";
import { createCharacterCalculations } from "@/services/character/calculations";
import { createCharacterEquipment } from "@/services/character/equipment";
import { MAGICAL_WEAPON_TEMPLATES, createMagicalWeapon } from "@/lib/dnd/equipment";
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
  const [selectedArmor, setSelectedArmor] = useState<Armor | null>(null);
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
        console.error('Error loading armor data:', error);
      }
    };
    loadArmorData();
  }, []);

  const handleCreateMagicalWeapon = () => {
    if (selectedBaseWeapon && selectedMagicalTemplate) {
      const weaponData = clientCache.getWeapons().find(w => w.name === selectedBaseWeapon);
      const baseWeapon = weaponData ? {
        ...weaponData,
        type: weaponData.type as 'Simple' | 'Martial',
        category: weaponData.category as 'Melee' | 'Ranged',
        properties: weaponData.properties ? weaponData.properties.split(',').map((p: string) => p.trim()).filter(Boolean) : []
      } as Weapon : null;
      const template = MAGICAL_WEAPON_TEMPLATES.find(t => t.name === selectedMagicalTemplate);
      
      if (baseWeapon && template) {
        const magicalWeapon = createMagicalWeapon(baseWeapon, template, customWeaponName.trim() || undefined);
        onAddWeapon(magicalWeapon);
        
        // Reset form
        setSelectedBaseWeapon("");
        setSelectedMagicalTemplate("");
        setCustomWeaponName("");
        setShowWeaponCreator(false);
      }
    }
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
      onAddArmor(selectedArmor);
      setSelectedArmor(null);
    }
  };

  const handleArmorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const armorData_item = armorData.find(a => a.name === e.target.value);
    if (armorData_item) {
      const armor: Armor = {
        name: armorData_item.name,
        type: armorData_item.type,
        baseAC: armorData_item.baseArmorClass,
        maxDexBonus: armorData_item.maxDexterityBonus,
        minStrength: armorData_item.minStrength,
        stealthDisadvantage: armorData_item.stealthDisadvantage,
        cost: armorData_item.cost.toString(),
        weight: armorData_item.weight,
        description: armorData_item.description || ''
      };
      setSelectedArmor(armor);
    }
  };

  const handleWeaponSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const weaponData = clientCache.getWeapons().find(w => w.name === e.target.value);
    if (weaponData) {
      const weapon: Weapon = {
        ...weaponData,
        type: weaponData.type as 'Simple' | 'Martial',
        category: weaponData.category as 'Melee' | 'Ranged',
        properties: weaponData.properties ? weaponData.properties.split(',').map((p: string) => p.trim()).filter(Boolean) : []
      };
      setSelectedWeapon(weapon);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Weapons */}
        <div className="space-y-6">
          {/* Equipped Weapons Section */}
          {equippedWeapons && equippedWeapons.length > 0 && (
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Sword className="h-5 w-5" />
                Equipped Weapons ({equippedWeapons.length}/{weaponLimits.max})
              </h3>
              
              {/* D&D Combat Usage Information */}
              <div className="mb-4 text-sm text-blue-300 bg-blue-900/20 p-3 rounded">
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
                <div className="mb-3 text-sm text-blue-300 bg-blue-900/20 p-2 rounded">
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
                    <div key={index} className="bg-slate-600 p-3 rounded">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="text-white font-medium">{weapon.name}</div>
                            {weapon.category === 'Ranged' && (
                              <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">
                                Ranged
                              </span>
                            )}
                            {isTwoHanded && (
                              <span className="text-xs bg-orange-900/50 text-orange-300 px-2 py-1 rounded">
                                Two-handed
                              </span>
                            )}
                            {isMagical && (
                              <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
                                {(weapon as MagicalWeapon).rarity}
                              </span>
                            )}
                            {!isProficient && (
                              <span className="text-xs bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded">
                                No Prof Bonus
                              </span>
                            )}
                          </div>
                          <div className="text-slate-300 text-sm">
                            {weapon.damage}{isMagical && (weapon as MagicalWeapon).damageBonus > 0 && `+${(weapon as MagicalWeapon).damageBonus}`} {weapon.damageType}
                            {isMagical && (weapon as MagicalWeapon).attackBonus > 0 && (
                              <span className="text-purple-300"> • +{(weapon as MagicalWeapon).attackBonus} to hit</span>
                            )}
                          </div>
                          {!isProficient && (
                            <div className="text-yellow-300 text-xs mt-1">
                              ⚠️ No proficiency - won&apos;t add proficiency bonus to attacks
                            </div>
                          )}
                          {isMagical && (weapon as MagicalWeapon).magicalProperties && (
                            <div className="text-purple-300 text-xs mt-1 italic">
                              {(weapon as MagicalWeapon).magicalProperties}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUnequipWeapon(index)}
                            className="bg-slate-500 hover:bg-slate-400 text-white text-xs px-2 py-1 rounded"
                          >
                            Unequip
                          </button>
                          <button
                            onClick={() => onRemoveWeapon(index, true)}
                            className="text-red-400 hover:text-red-300 transition-colors p-1"
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
          <div className="bg-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Weapon Storage
              <span className="text-xs bg-slate-600 text-slate-300 px-2 py-1 rounded">
                Click &quot;Equip&quot; to use
              </span>
            </h3>
            
            {/* Add Magical Weapon Button */}
            <button
              onClick={() => setShowWeaponCreator(true)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mb-4"
            >
              <Plus className="h-4 w-4" />
              Create Magical Weapon
            </button>

            {/* Add Basic Weapon Selector */}
            <div className="mb-4">
              <div className="flex gap-2">
                <select
                  value={selectedWeapon ? selectedWeapon.name : ""}
                  onChange={handleWeaponSelect}
                  className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
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
                  <div key={index} className="bg-slate-600 p-3 rounded border-l-4 border-orange-500">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="text-white font-medium">{weapon.name}</div>
                          {isMagical && (
                            <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
                              {(weapon as MagicalWeapon).rarity}
                            </span>
                          )}
                          {!isProficient && (
                            <span className="text-xs bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded">
                              No Prof Bonus
                            </span>
                          )}
                        </div>
                        <div className="text-slate-300 text-sm">
                          {weapon.damage}{isMagical && (weapon as MagicalWeapon).damageBonus > 0 && `+${(weapon as MagicalWeapon).damageBonus}`} {weapon.damageType}
                          {isMagical && (weapon as MagicalWeapon).attackBonus > 0 && (
                            <span className="text-purple-300"> • +{(weapon as MagicalWeapon).attackBonus} to hit</span>
                          )}
                        </div>
                        {!isProficient && (
                          <div className="text-yellow-300 text-xs mt-1">
                            ⚠️ No proficiency - won&apos;t add proficiency bonus to attacks
                          </div>
                        )}
                        {isMagical && (weapon as MagicalWeapon).magicalProperties && (
                          <div className="text-purple-300 text-xs mt-1 italic">
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
                          {atLimit ? "Limit Reached" : "Equip"}
                        </button>
                        <button
                          onClick={() => onRemoveWeapon(index, false)}
                          className="text-red-400 hover:text-red-300 transition-colors p-1"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="text-center py-6 border-2 border-dashed border-slate-600 rounded-lg">
                  <Sword className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">No weapons in storage</p>
                  <p className="text-slate-600 text-xs">Create magical weapons above</p>
                </div>
              )}
            </div>
          </div>

          {/* Spells Section */}
          {character.spellsKnown && character.spellsKnown.length > 0 && (
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Spells
                </h3>
                {canPrepareSpells(character.class) && (
                  <button
                    onClick={onOpenSpellPreparation}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded font-medium transition-colors"
                    title="Change prepared spells"
                  >
                    Prepare Spells
                  </button>
                )}
              </div>
              
              {character.spellSaveDC && (
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="text-slate-300">
                    <strong>Spell Save DC:</strong> {character.spellSaveDC}
                  </div>
                  <div className="text-slate-300">
                    <strong>Spell Attack:</strong> +{character.spellAttackBonus}
                  </div>
                </div>
              )}
              
              {/* Show preparation status for preparation-based casters */}
              {canPrepareSpells(character.class) && (
                <div className="mb-4 p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
                  <div className="text-blue-300 text-sm">
                    <strong>Prepared Spells:</strong> {(character.spellsPrepared || []).filter(s => s.level > 0).length} / {
                      getSpellsPreparedCount(
                        character.class, 
                        character.level, 
                        calc.abilityModifiers[character.spellcastingAbility as keyof typeof calc.abilityModifiers]
                      )
                    }
                  </div>
                  <div className="text-blue-200 text-xs mt-1">
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
                      className={`bg-slate-600 p-3 rounded ${requiresPreparation && !isPrepared ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium">{spell.name}</span>
                        <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">
                          {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}
                        </span>
                        {requiresPreparation && (
                          <span className={`text-xs px-2 py-1 rounded ${
                            isPrepared 
                              ? 'bg-green-900/50 text-green-300' 
                              : 'bg-gray-900/50 text-gray-400'
                          }`}>
                            {isPrepared ? 'Prepared' : 'Not Prepared'}
                          </span>
                        )}
                      </div>
                      <div className="text-slate-400 text-xs mb-1">
                        {spell.school} • {spell.castingTime} • {spell.range}
                      </div>
                      <p className="text-slate-300 text-sm">{spell.description}</p>
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
          <div className="bg-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Armor & Protection
            </h3>
            
            {/* Current Armor */}
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium text-slate-300">Equipped</h4>
              {equippedArmor && equippedArmor.length > 0 ? equippedArmor.map((armor, index) => (
                <div key={index} className="bg-slate-600 p-3 rounded">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-white font-medium">{armor.name}</div>
                        <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">
                          {armor.type}
                        </span>
                      </div>
                      <div className="text-slate-300 text-sm">
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
                        className="bg-slate-500 hover:bg-slate-400 text-white text-xs px-2 py-1 rounded"
                      >
                        Unequip
                      </button>
                      <button
                        onClick={() => onRemoveArmor(index, true)}
                        className="text-red-400 hover:text-red-300 transition-colors p-1"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-slate-500 text-sm italic">No armor equipped</p>
              )}
            </div>

            {/* Armor in Storage */}
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium text-slate-300">Storage</h4>
              {inventoryArmor && inventoryArmor.length > 0 ? inventoryArmor.map((armor, index) => {
                const canEquip = equipment.canWearArmor(armor);
                const hasStrengthReq = !armor.minStrength || character.strength >= armor.minStrength;
                
                return (
                  <div key={index} className="bg-slate-600 p-3 rounded border-l-4 border-orange-500">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="text-white font-medium">{armor.name}</div>
                          <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">
                            {armor.type}
                          </span>
                          {!canEquip && (
                            <span className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded">
                              No Proficiency
                            </span>
                          )}
                          {!hasStrengthReq && (
                            <span className="text-xs bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded">
                              Str Req: {armor.minStrength}
                            </span>
                          )}
                        </div>
                        <div className="text-slate-300 text-sm">{armor.description}</div>
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
                          className="text-red-400 hover:text-red-300 transition-colors p-1"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="text-center py-4 border-2 border-dashed border-slate-600 rounded-lg">
                  <Shield className="h-6 w-6 text-slate-500 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">No armor in storage</p>
                  <p className="text-slate-600 text-xs">Add armor below to get started</p>
                </div>
              )}
            </div>

            {/* Add New Armor Section */}
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Armor
              </h3>
              <p className="text-slate-400 text-sm mb-3">Add armor to your inventory from the equipment database</p>
              <div className="flex gap-2">
                <select
                  onChange={handleArmorSelect}
                  className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Select armor to add to inventory...</option>
                  {armorData.map(armor => (
                    <option key={armor.name} value={armor.name}>
                      {armor.name} - {armor.cost} ({armor.type})
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddArmor}
                  disabled={!selectedArmor}
                  className="bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-button-text)] px-4 py-2 rounded text-sm font-medium"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced AC Display */}
          <div className="bg-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Armor Class Calculator
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {equipment.calculateArmorClass(equippedArmor)}
              </div>
              <div className="text-sm text-slate-400">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 pt-8 z-50">
          <div className="bg-slate-800 rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Create Magical Weapon</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Base Weapon</label>
                <select
                  value={selectedBaseWeapon}
                  onChange={(e) => setSelectedBaseWeapon(e.target.value)}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
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
                <label className="block text-sm text-slate-400 mb-2">Magical Enhancement</label>
                <select
                  value={selectedMagicalTemplate}
                  onChange={(e) => setSelectedMagicalTemplate(e.target.value)}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
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
                <label className="block text-sm text-slate-400 mb-2">Custom Name (Optional)</label>
                <input
                  type="text"
                  value={customWeaponName}
                  onChange={(e) => setCustomWeaponName(e.target.value)}
                  placeholder="e.g., 'Dawnbreaker' or leave empty for default"
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              {selectedMagicalTemplate && (
                <div className="bg-slate-700 p-3 rounded">
                  <div className="text-xs text-slate-400 mb-1">Enhancement Description:</div>
                  <div className="text-sm text-slate-300">
                    {MAGICAL_WEAPON_TEMPLATES.find(t => t.name === selectedMagicalTemplate)?.description}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowWeaponCreator(false)}
                className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateMagicalWeapon}
                disabled={!selectedBaseWeapon || !selectedMagicalTemplate}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 px-4 rounded transition-colors"
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