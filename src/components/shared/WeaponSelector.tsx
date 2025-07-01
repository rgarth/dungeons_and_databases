"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Plus, Minus, X } from "lucide-react";
import { Weapon } from "@/lib/dnd/equipment";
import { categorizeWeaponsByProficiency } from "@/lib/dnd/proficiencies";
import { clientCache } from "@/lib/client-cache";

export interface WeaponSuggestion {
  weaponName: string;
  quantity: number;
  reason?: string | null;
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
}: WeaponSelectorProps) {
  const [selectedWeapons, setSelectedWeapons] = useState<{weapon: Weapon, quantity: number}[]>(initialSelectedWeapons);
  const [weaponSuggestions, setWeaponSuggestions] = useState<WeaponSuggestion[]>([]);
  const [weaponProficiencies, setWeaponProficiencies] = useState<{ simple: boolean; martial: boolean; specific: string[] } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Memoize cached data to avoid unnecessary re-renders
  const memoizedCachedData = useMemo(() => ({
    weaponSuggestions: cachedWeaponSuggestions,
    weaponProficiencies: cachedWeaponProficiencies
  }), [cachedWeaponSuggestions, cachedWeaponProficiencies]);

  // For new interface, manage internal state. For legacy interface, use props
  const currentSelectedWeapons = onWeaponQuantityChange ? initialSelectedWeapons : selectedWeapons;
  
  // Unified weapon quantity change handler
  const handleWeaponQuantityChange = (weapon: Weapon, quantity: number) => {
    if (onWeaponQuantityChange) {
      // Legacy interface
      onWeaponQuantityChange(weapon, quantity);
    } else {
      // New interface - manage internal state
      setSelectedWeapons(prev => {
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
      const weaponData = baseWeapons.find(w => w.name === suggestion.weaponName);
      if (weaponData) {
        suggestedWeapons.push({ weapon: weaponData, quantity: suggestion.quantity });
      }
    }

    if (onWeaponQuantityChange) {
      // Legacy interface - clear existing selections
      currentSelectedWeapons.forEach(sw => onWeaponQuantityChange(sw.weapon, 0));
      // Add suggested weapons
      suggestedWeapons.forEach(sw => onWeaponQuantityChange(sw.weapon, sw.quantity));
    } else {
      // New interface - update internal state
      setSelectedWeapons(suggestedWeapons);
    }
  };

  // Get weapons from client cache instead of static data
  const baseWeapons: Weapon[] = useMemo(() => {
    const cachedWeapons = clientCache.getWeapons();
    if (cachedWeapons.length > 0) {
      // Use cached weapons from database (includes ammunitionTypeId)
      return cachedWeapons.map((weaponData: { name: string; type: string; category: string; damage: string; damageType: string; properties: string; weight: number; cost: string; description?: string; stackable?: boolean; ammunitionTypeId?: number | null; suggestedQuantity?: number | null }) => ({
        ...weaponData,
        type: weaponData.type as 'Simple' | 'Martial',
        category: weaponData.category as 'Melee' | 'Ranged',
        properties: weaponData.properties ? weaponData.properties.split(', ').filter(Boolean) : []
      }));
    } else {
      // Fallback to static data if cache not ready
      console.warn('Weapon cache not ready, using static data');
      return [];
    }
  }, []);

  // Load proficiencies, suggestions, and phbDescription when class changes
  useEffect(() => {
    if (!characterClass) return;
    
    // If we have cached data, use it immediately
    if (memoizedCachedData.weaponSuggestions && memoizedCachedData.weaponProficiencies) {
      setWeaponSuggestions(memoizedCachedData.weaponSuggestions);
      setWeaponProficiencies(memoizedCachedData.weaponProficiencies);
      console.log('🚀 Using cached weapon data for', characterClass);
      return;
    }
    
    const loadData = async () => {
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
        console.log('📡 Fetched weapon data for', characterClass);
      } catch (error) {
        console.error('Failed to load weapon data:', error);
        setWeaponProficiencies({ simple: false, martial: false, specific: [] });
        setWeaponSuggestions([]);
      }
    };
    
    loadData();
  }, [characterClass, showSuggestions, memoizedCachedData]);

  // For legacy modal interface, check isOpen. For new interface, always render
  if (isOpen === false) return null;

  // Remove ammunition from weapon selector - ammunition should be handled separately

  // Categorize by proficiency if we have proficiency data
  let weaponCategories: Record<string, Weapon[]>;
  
  if (weaponProficiencies && baseWeapons.length > 0) {
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

  // Filter weapons based on search term and category
  const filteredWeapons = Object.entries(weaponCategories).flatMap(([category, weapons]) => {
    if (selectedCategory !== 'All' && category !== selectedCategory) return [];
    
    return weapons.filter(weapon => 
      weapon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      weapon.damage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      weapon.damageType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex">
          {/* Left panel - Categories and Search */}
          <div className="w-1/3 border-r border-slate-700 p-4">
            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search weapons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Categories */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-slate-300 mb-2">Categories</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                    selectedCategory === 'All' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  All Weapons
                </button>
                {Object.keys(weaponCategories).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                      selectedCategory === category ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {category} ({weaponCategories[category].length})
                  </button>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            {showSuggestions && weaponSuggestions.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-slate-300 mb-2">Suggestions for {characterClass}</h3>
                <div className="space-y-2">
                  {weaponSuggestions.map((suggestion, index) => (
                    <div key={index} className="text-sm text-slate-400">
                      <span className="font-medium">{suggestion.weaponName}</span>
                      {suggestion.quantity > 1 && <span className="text-slate-500"> (x{suggestion.quantity})</span>}
                      {suggestion.reason && <span className="text-slate-500"> - {suggestion.reason}</span>}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleApplySuggestion}
                  className="px-3 py-1 text-sm bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors mt-2"
                >
                  Apply Suggestions
                </button>
              </div>
            )}
          </div>

          {/* Right panel - Weapon List */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-2">
              {filteredWeapons.map((weapon, index) => {
                const selected = currentSelectedWeapons.find(sw => sw.weapon.name === weapon.name);
                const quantity = selected?.quantity || 0;
                
                return (
                  <div key={`${weapon.name}-${weapon.type}-${weapon.category}-${index}`} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-white">{weapon.name}</h4>
                        <span className="text-xs bg-slate-600 text-slate-300 px-2 py-1 rounded">
                          {weapon.type} {weapon.category}
                        </span>
                      </div>
                      <div className="text-sm text-slate-400 mt-1">
                        {weapon.damage} {weapon.damageType} • {weapon.cost} • {weapon.weight} lb
                      </div>
                      {weapon.properties.length > 0 && (
                        <div className="text-xs text-slate-500 mt-1">
                          {weapon.properties.join(', ')}
                        </div>
                      )}
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