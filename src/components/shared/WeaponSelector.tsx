"use client";

import { useState, useEffect } from "react";
import { Plus, Minus, X } from "lucide-react";
import { Weapon } from "@/lib/dnd/equipment";
import { weaponsData } from '../../../prisma/data/weapons-data';
import { categorizeWeaponsByProficiency } from "@/lib/dnd/proficiencies";

export interface WeaponSuggestion {
  weaponName: string;
  quantity: number;
  reason?: string;
}

// Interface matching the structure of weaponsData
interface WeaponData {
  name: string;
  type: string;
  category: string;
  damage: string;
  damageType: string;
  properties: string;
  weight: number;
  cost: string;
  stackable: boolean;
}

// Interface matching the structure of weaponsData
interface WeaponData {
  name: string;
  type: string;
  category: string;
  damage: string;
  damageType: string;
  properties: string;
  weight: number;
  cost: string;
  stackable: boolean;
}

interface WeaponSelectorProps {
  // New interface (conditional rendering)
  title?: string;
  maxWeapons?: number;
  selectedWeapons: {weapon: Weapon, quantity: number}[];
  onConfirm: (weapons: {weapon: Weapon, quantity: number}[]) => void;
  onCancel: () => void;
  characterClass: string;
  showSuggestions?: boolean;
  multiSelect?: boolean;
  
  // Legacy interface (modal with isOpen)
  isOpen?: boolean;
  onClose?: () => void;
  onWeaponQuantityChange?: (weapon: Weapon, quantity: number) => void;
}

export function WeaponSelector({
  isOpen,
  onClose,
  characterClass,
  selectedWeapons: initialSelectedWeapons,
  onWeaponQuantityChange,
  onConfirm,
  onCancel,
  title = "Select Weapons",
  maxWeapons = 5,
  showSuggestions = true,
  multiSelect = true
}: WeaponSelectorProps) {
  const [weaponProficiencies, setWeaponProficiencies] = useState<{ simple: boolean; martial: boolean; specific: string[] } | null>(null);
  const [weaponSuggestions, setWeaponSuggestions] = useState<WeaponSuggestion[]>([]);
  const [loadingProficiencies, setLoadingProficiencies] = useState(false);
  
  // For new interface, manage internal state. For legacy interface, use props
  const [internalSelectedWeapons, setInternalSelectedWeapons] = useState<{weapon: Weapon, quantity: number}[]>(initialSelectedWeapons || []);
  const currentSelectedWeapons = onWeaponQuantityChange ? initialSelectedWeapons : internalSelectedWeapons;
  
  // Unified weapon quantity change handler
  const handleWeaponQuantityChange = (weapon: Weapon, quantity: number) => {
    if (onWeaponQuantityChange) {
      // Legacy interface
      onWeaponQuantityChange(weapon, quantity);
    } else {
      // New interface - manage internal state
      setInternalSelectedWeapons(prev => {
        const existing = prev.find(sw => sw.weapon.name === weapon.name);
        if (quantity <= 0) {
          return prev.filter(sw => sw.weapon.name !== weapon.name);
        } else if (existing) {
          return prev.map(sw => sw.weapon.name === weapon.name ? { ...sw, quantity } : sw);
        } else {
          return [...prev, { weapon, quantity }];
        }
      });
    }
  };
  
  // Unified close handler
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (onCancel) {
      onCancel();
    }
  };
  
  // Unified confirm handler
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(currentSelectedWeapons);
    }
  };


  // Load proficiencies and suggestions when class changes
  useEffect(() => {
    if (!characterClass) return;
    
    const loadData = async () => {
      setLoadingProficiencies(true);
      try {
        const [proficiencies, suggestions] = await Promise.all([
          fetch(`/api/class-proficiencies?className=${encodeURIComponent(characterClass)}`)
            .then(res => res.ok ? res.json() : { simple: false, martial: false, specific: [] })
            .catch(() => ({ simple: false, martial: false, specific: [] })),
          showSuggestions 
            ? fetch(`/api/weapon-suggestions?className=${encodeURIComponent(characterClass)}`)
                .then(res => res.ok ? res.json() : [])
                .catch(() => [])
            : Promise.resolve([])
        ]);
        
        setWeaponProficiencies(proficiencies);
        setWeaponSuggestions(suggestions);
      } catch (error) {
        console.error('Failed to load weapon data:', error);
        setWeaponProficiencies({ simple: false, martial: false, specific: [] });
        setWeaponSuggestions([]);
      } finally {
        setLoadingProficiencies(false);
      }
    };
    
    loadData();
  }, [characterClass, showSuggestions]);

  // For legacy modal interface, check isOpen. For new interface, always render
  if (isOpen === false) return null;

  // Convert weapons data to Weapon objects and add ammunition
  const baseWeapons: Weapon[] = weaponsData.map((weaponData: WeaponData) => ({
    ...weaponData,
    type: weaponData.type as 'Simple' | 'Martial',
    category: weaponData.category as 'Melee' | 'Ranged',
    properties: weaponData.properties ? JSON.parse(weaponData.properties) : []
  }));

  // Remove ammunition from weapon selector - ammunition should be handled separately



  // Categorize by proficiency if we have proficiency data
  let weaponCategories: Record<string, Weapon[]>;
  
  // Define ammunition items that should always be available
  const ammunitionItems: Weapon[] = [
    {
      name: 'Arrow',
      type: 'Simple',
      category: 'Ranged',
      damage: '—',
      damageType: '—',
      properties: ['Ammunition'],
      weight: 0.05,
      cost: '5 cp each',
      stackable: true,
      quantity: 20
    },
    {
      name: 'Crossbow Bolt',
      type: 'Simple', 
      category: 'Ranged',
      damage: '—',
      damageType: '—',
      properties: ['Ammunition'],
      weight: 0.075,
      cost: '5 cp each',
      stackable: true,
      quantity: 20
    },
    {
      name: 'Blowgun Needle',
      type: 'Simple',
      category: 'Ranged', 
      damage: '—',
      damageType: '—',
      properties: ['Ammunition'],
      weight: 0.02,
      cost: '2 cp each',
      stackable: true,
      quantity: 50
    },
    {
      name: 'Sling Bullet',
      type: 'Simple',
      category: 'Ranged',
      damage: '—', 
      damageType: '—',
      properties: ['Ammunition'],
      weight: 0.075,
      cost: '2 cp each',
      stackable: true,
      quantity: 20
    }
  ];
  
  if (weaponProficiencies) {
    const { proficient, nonProficient } = categorizeWeaponsByProficiency(baseWeapons, weaponProficiencies);
    
    weaponCategories = {
      'Ammunition': ammunitionItems, // Always include ammunition
      'Proficient - Simple Melee': proficient.filter(w => w.type === 'Simple' && w.category === 'Melee'),
      'Proficient - Simple Ranged': proficient.filter(w => w.type === 'Simple' && w.category === 'Ranged'),
      'Proficient - Martial Melee': proficient.filter(w => w.type === 'Martial' && w.category === 'Melee'),
      'Proficient - Martial Ranged': proficient.filter(w => w.type === 'Martial' && w.category === 'Ranged'),
      'Non-Proficient - Simple Melee': nonProficient.filter(w => w.type === 'Simple' && w.category === 'Melee'),
      'Non-Proficient - Simple Ranged': nonProficient.filter(w => w.type === 'Simple' && w.category === 'Ranged'),
      'Non-Proficient - Martial Melee': nonProficient.filter(w => w.type === 'Martial' && w.category === 'Melee'),
      'Non-Proficient - Martial Ranged': nonProficient.filter(w => w.type === 'Martial' && w.category === 'Ranged'),
    };
    
    // Remove empty categories
    Object.keys(weaponCategories).forEach(key => {
      if (weaponCategories[key].length === 0) {
        delete weaponCategories[key];
      }
    });
  } else {
    // Fallback to basic categorization
    weaponCategories = {
      'Ammunition': ammunitionItems,
      'Simple Melee': baseWeapons.filter(w => w.type === 'Simple' && w.category === 'Melee'),
      'Simple Ranged': baseWeapons.filter(w => w.type === 'Simple' && w.category === 'Ranged'),
      'Martial Melee': baseWeapons.filter(w => w.type === 'Martial' && w.category === 'Melee'),
      'Martial Ranged': baseWeapons.filter(w => w.type === 'Martial' && w.category === 'Ranged'),
    };
  }

  const totalWeapons = currentSelectedWeapons.reduce((sum, sw) => sum + sw.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 pt-8 z-50">
      <div className="bg-slate-800 rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {loadingProficiencies ? (
            <div className="text-center text-slate-400 py-8">
              Loading weapon proficiencies...
            </div>
          ) : (
            <>
              {/* Database-driven weapon suggestions */}
              {showSuggestions && weaponSuggestions.length > 0 && (
                <div className="mb-4 p-3 bg-slate-700 rounded border border-amber-500/30">
                  <h5 className="text-sm font-semibold text-amber-300 mb-2">💡 Suggested for {characterClass}</h5>
                  <div className="text-xs text-slate-400 space-y-1">
                    {weaponSuggestions.map((suggestion, index) => (
                      <div key={`suggestion-${suggestion.weaponName}-${index}`} className="flex justify-between">
                        <span>{suggestion.quantity}x {suggestion.weaponName}</span>
                        {suggestion.reason && <span className="text-slate-500">({suggestion.reason})</span>}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      // Apply weapon suggestions only
                      weaponSuggestions.forEach(suggestion => {
                        const weaponData = weaponsData.find(w => w.name === suggestion.weaponName);
                        if (weaponData) {
                          const weapon: Weapon = {
                            ...weaponData,
                            type: weaponData.type as 'Simple' | 'Martial',
                            category: weaponData.category as 'Melee' | 'Ranged',
                            properties: weaponData.properties ? JSON.parse(weaponData.properties) : []
                          };
                          handleWeaponQuantityChange(weapon, suggestion.quantity);
                        }
                        // Note: Ammunition is handled automatically in character creation
                      });
                    }}
                    className="mt-2 text-xs bg-amber-600 hover:bg-amber-700 text-white px-2 py-1 rounded transition-colors"
                  >
                    Apply Suggestions
                  </button>
                </div>
              )}

              {/* Weapon selection */}
              <div className="mb-4 p-3 bg-slate-700 rounded-lg max-h-80 overflow-y-auto">
                <div className="text-xs text-slate-400 mb-3">
                  ✓ Select up to {maxWeapons} total weapons. {multiSelect && "Use +/- for multiples (daggers, javelins, etc.)"}
                </div>
                
                {/* Organized weapon selection by category */}
                <div className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                  {Object.entries(weaponCategories).map(([categoryName, weapons]) => {
                    const isAmmunition = categoryName === 'Ammunition';
                    const isProficient = !categoryName.startsWith('Non-Proficient');
                    const headerColor = isAmmunition ? 'text-yellow-300' : isProficient ? 'text-green-300' : 'text-orange-300';
                    
                    return (
                      <div key={categoryName} className="bg-slate-800 rounded-lg p-3">
                        <h5 className={`text-xs font-semibold ${headerColor} mb-2`}>
                          {isAmmunition ? '🏹 Ammunition' : categoryName} {!isProficient && !isAmmunition && '(No Proficiency)'}
                        </h5>
                        <div className="space-y-1">
                          {weapons.map((weapon: Weapon, weaponIndex: number) => {
                            const selectedWeapon = currentSelectedWeapons.find(sw => sw.weapon.name === weapon.name);
                            const quantity = selectedWeapon?.quantity || 0;
                            const canAdd = totalWeapons < maxWeapons;
                            
                            return (
                              <div key={`${categoryName}-${weapon.name}-${weaponIndex}`} className={`flex items-center justify-between p-1.5 rounded text-xs ${
                                isProficient ? 'bg-slate-700' : 'bg-slate-600/50'
                              }`}>
                                <div className="flex-1 min-w-0">
                                  <div className={`${
                                    quantity > 0 
                                      ? 'font-medium text-white' 
                                      : isProficient 
                                        ? 'text-slate-300' 
                                        : 'text-slate-400'
                                  } truncate`}>
                                    {weapon.name}
                                    {!isProficient && ' ⚠️'}
                                  </div>
                                  {!isAmmunition && (
                                    <div className="text-slate-400 text-xs">
                                      {weapon.damage} {weapon.damageType}
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 ml-2">
                                  {multiSelect ? (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => handleWeaponQuantityChange(weapon, Math.max(0, quantity - 1))}
                                        disabled={quantity <= 0}
                                        className="w-4 h-4 bg-slate-500 hover:bg-slate-400 disabled:opacity-50 disabled:cursor-not-allowed rounded flex items-center justify-center text-white text-xs"
                                      >
                                        <Minus className="h-2.5 w-2.5" />
                                      </button>
                                      <span className="w-5 text-center text-white font-mono text-xs">{quantity}</span>
                                      <button
                                        type="button"
                                        onClick={() => handleWeaponQuantityChange(weapon, quantity + 1)}
                                        disabled={!canAdd}
                                        className="w-4 h-4 bg-slate-500 hover:bg-slate-400 disabled:opacity-50 disabled:cursor-not-allowed rounded flex items-center justify-center text-white text-xs"
                                      >
                                        <Plus className="h-2.5 w-2.5" />
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleWeaponQuantityChange(weapon, quantity > 0 ? 0 : 1)}
                                      className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                        quantity > 0 
                                          ? 'bg-green-600 hover:bg-green-700 text-white'
                                          : 'bg-slate-500 hover:bg-slate-400 text-white'
                                      }`}
                                    >
                                      {quantity > 0 ? 'Selected' : 'Select'}
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Weapons Summary */}
              {currentSelectedWeapons.length > 0 && (
                <div className="bg-slate-600 rounded-lg p-3 mb-4">
                  <h4 className="text-sm font-medium text-white mb-2">
                    Selected Weapons ({totalWeapons}/{maxWeapons})
                  </h4>
                  <div className="space-y-1">
                    {currentSelectedWeapons.map(({ weapon, quantity }, index) => {
                      const isAmmunition = weapon.properties.some(prop => prop.startsWith('Ammunition')) && weapon.damage === '—';
                      return (
                        <div key={`selected-${weapon.name}-${index}`} className="text-sm text-slate-300">
                          • {quantity}x {weapon.name}{!isAmmunition && ` (${weapon.damage} ${weapon.damageType})`}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Action buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 