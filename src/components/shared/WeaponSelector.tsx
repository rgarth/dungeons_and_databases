"use client";

import { useState, useEffect } from "react";
import { Plus, Minus, X } from "lucide-react";
import { Weapon } from "@/lib/dnd/equipment";
import { weaponsData } from '../../../prisma/data/weapons-data';
import { categorizeWeaponsByProficiency } from "@/lib/dnd/proficiencies";

export interface WeaponSuggestion {
  weaponName: string;
  quantity: number;
  reason?: string | null;
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
  description: string;
  stackable?: boolean;
}

interface WeaponSelectorProps {
  title?: string;
  selectedWeapons: {weapon: Weapon, quantity: number}[];
  onConfirm: (weapons: {weapon: Weapon, quantity: number}[]) => void;
  onCancel: () => void;
  characterClass: string;
  showSuggestions?: boolean;
  
  // Cached data props for instant loading
  cachedWeaponSuggestions?: WeaponSuggestion[];
  cachedWeaponProficiencies?: { simple: boolean; martial: boolean; specific: string[] } | null;
  cachedPhbDescription?: string | null;
  
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
  showSuggestions = true,
  cachedWeaponSuggestions,
  cachedWeaponProficiencies,
  cachedPhbDescription
}: WeaponSelectorProps) {
  const [weaponProficiencies, setWeaponProficiencies] = useState<{ simple: boolean; martial: boolean; specific: string[] } | null>(cachedWeaponProficiencies || null);
  const [weaponSuggestions, setWeaponSuggestions] = useState<WeaponSuggestion[]>(cachedWeaponSuggestions || []);
  const [phbDescription, setPhbDescription] = useState<string | null>(cachedPhbDescription || null);
  
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

  // Handle applying suggestions
  const handleApplySuggestion = () => {
    const suggestedWeapons: {weapon: Weapon, quantity: number}[] = [];
    
    for (const suggestion of weaponSuggestions) {
      const weaponData = weaponsData.find(w => w.name === suggestion.weaponName);
      if (weaponData) {
        const weapon: Weapon = {
          ...weaponData,
          type: weaponData.type as 'Simple' | 'Martial',
          category: weaponData.category as 'Melee' | 'Ranged',
          properties: weaponData.properties ? weaponData.properties.split(', ').filter(Boolean) : []
        };
        suggestedWeapons.push({ weapon, quantity: suggestion.quantity });
      }
    }

    if (onWeaponQuantityChange) {
      // Legacy interface - clear existing selections
      currentSelectedWeapons.forEach(sw => onWeaponQuantityChange(sw.weapon, 0));
      // Add suggested weapons
      suggestedWeapons.forEach(sw => onWeaponQuantityChange(sw.weapon, sw.quantity));
    } else {
      // New interface - update internal state
      setInternalSelectedWeapons(suggestedWeapons);
    }
  };

  // Load proficiencies, suggestions, and phbDescription when class changes
  useEffect(() => {
    if (!characterClass) return;
    
    // If we have cached data, use it immediately
    if (cachedWeaponSuggestions && cachedWeaponProficiencies && cachedPhbDescription !== undefined) {
      setWeaponSuggestions(cachedWeaponSuggestions);
      setWeaponProficiencies(cachedWeaponProficiencies);
      setPhbDescription(cachedPhbDescription);
      console.log('🚀 Using cached weapon data for', characterClass);
      return;
    }
    
    const loadData = async () => {
      try {
        const [proficiencies, suggestions, classData] = await Promise.all([
          fetch(`/api/class-proficiencies?className=${encodeURIComponent(characterClass)}`)
            .then(res => res.ok ? res.json() : { simple: false, martial: false, specific: [] })
            .catch(() => ({ simple: false, martial: false, specific: [] })),
          showSuggestions 
            ? fetch(`/api/weapon-suggestions?className=${encodeURIComponent(characterClass)}`)
                .then(res => res.ok ? res.json() : [])
                .catch(() => [])
            : Promise.resolve([]),
          fetch(`/api/classes/${encodeURIComponent(characterClass)}`)
            .then(res => res.ok ? res.json() : null)
            .catch(() => null)
        ]);
        
        setWeaponProficiencies(proficiencies);
        setWeaponSuggestions(suggestions);
        setPhbDescription(classData?.phbDescription || null);
        console.log('📡 Fetched weapon data for', characterClass);
      } catch (error) {
        console.error('Failed to load weapon data:', error);
        setWeaponProficiencies({ simple: false, martial: false, specific: [] });
        setWeaponSuggestions([]);
        setPhbDescription(null);
      }
    };
    
    loadData();
  }, [characterClass, showSuggestions, cachedWeaponSuggestions, cachedWeaponProficiencies, cachedPhbDescription]);

  // For legacy modal interface, check isOpen. For new interface, always render
  if (isOpen === false) return null;

  // Convert weapons data to Weapon objects and add ammunition
  const baseWeapons: Weapon[] = weaponsData.map((weaponData: WeaponData) => ({
    ...weaponData,
    type: weaponData.type as 'Simple' | 'Martial',
    category: weaponData.category as 'Melee' | 'Ranged',
    properties: weaponData.properties ? weaponData.properties.split(', ').filter(Boolean) : []
  }));

  // Remove ammunition from weapon selector - ammunition should be handled separately

  // Categorize by proficiency if we have proficiency data
  let weaponCategories: Record<string, Weapon[]>;
  
  if (weaponProficiencies) {
    const { proficient, nonProficient } = categorizeWeaponsByProficiency(baseWeapons, weaponProficiencies);
    
    weaponCategories = {
      'Ammunition': proficient.filter(w => w.type === 'Simple' && w.category === 'Ranged'),
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
      'Ammunition': baseWeapons.filter(w => w.type === 'Simple' && w.category === 'Ranged'),
      'Simple Melee': baseWeapons.filter(w => w.type === 'Simple' && w.category === 'Melee'),
      'Simple Ranged': baseWeapons.filter(w => w.type === 'Simple' && w.category === 'Ranged'),
      'Martial Melee': baseWeapons.filter(w => w.type === 'Martial' && w.category === 'Melee'),
      'Martial Ranged': baseWeapons.filter(w => w.type === 'Martial' && w.category === 'Ranged'),
    };
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-sm text-slate-400 mt-1">
              Select weapons to add to your inventory.
            </p>
            {characterClass && (
              <div className="mt-2 p-3 bg-yellow-900/50 rounded-lg">
                <div className="text-xs text-yellow-200 mb-2">D&D 5e Starting Equipment:</div>
                <div className="text-xs text-yellow-100">{phbDescription}</div>
              </div>
            )}
            {showSuggestions && weaponSuggestions.length > 0 && (
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">
                    Suggested starting weapons for {characterClass}:
                  </p>
                  <button
                    onClick={handleApplySuggestion}
                    className="px-3 py-1 text-sm bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
                  >
                    Apply Suggestions
                  </button>
                </div>
                <div className="mt-1 space-y-1">
                  {weaponSuggestions.map((suggestion, index) => (
                    <div key={index} className="text-sm text-slate-300">
                      {suggestion.quantity}x {suggestion.weaponName}
                      {suggestion.reason && <span className="text-slate-400"> - {suggestion.reason}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(weaponCategories).map(([category, weapons]) => (
              <div key={category} className="space-y-2">
                <h3 className="text-lg font-semibold text-white">{category}</h3>
                <div className="space-y-2">
                  {weapons.map((weapon) => {
                    const selected = currentSelectedWeapons.find(sw => sw.weapon.name === weapon.name);
                    const quantity = selected?.quantity || 0;
                    
                    return (
                      <div key={weapon.name} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                        <div className="flex-1">
                          <div className="text-white">{weapon.name}</div>
                          <div className="text-xs text-slate-400">
                            {weapon.damage} {weapon.damageType} • {weapon.properties.join(', ')}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleWeaponQuantityChange(weapon, Math.max(0, quantity - 1))}
                            className="p-1 text-slate-400 hover:text-white transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-white w-8 text-center">{quantity}</span>
                          <button
                            onClick={() => handleWeaponQuantityChange(weapon, quantity + 1)}
                            className="p-1 text-slate-400 hover:text-white transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-slate-700 flex justify-end space-x-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
} 