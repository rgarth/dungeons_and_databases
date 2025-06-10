import React, { useState, useEffect } from 'react';
import { Armor } from '../../lib/dnd/equipment';
import { armorData } from '../../../prisma/data/armor-data';

interface ArmorSelectorProps {
  selectedArmor?: Armor[];
  onArmorSelectionChange?: (armor: Armor[]) => void;
  onClose?: () => void;
  isOpen?: boolean;
  characterClass?: string;
  showProficiencies?: boolean;
}

export function ArmorSelector({
  selectedArmor = [],
  onArmorSelectionChange,
  onClose,
  isOpen = true,
  characterClass,
  showProficiencies = true
}: ArmorSelectorProps) {
  const [internalSelectedArmor, setInternalSelectedArmor] = useState<Armor[]>(selectedArmor);
  const [armorProficiencies, setArmorProficiencies] = useState<string[] | null>(null);
  const [loadingProficiencies, setLoadingProficiencies] = useState(false);

  useEffect(() => {
    setInternalSelectedArmor(selectedArmor);
  }, [selectedArmor]);

  // Load armor proficiencies when class changes
  useEffect(() => {
    if (!characterClass || !showProficiencies) return;
    
    const loadProficiencies = async () => {
      setLoadingProficiencies(true);
      try {
        const response = await fetch(`/api/class-proficiencies?className=${encodeURIComponent(characterClass)}&includeArmor=true`);
        if (response.ok) {
          const data = await response.json();
          // Extract armor proficiencies from the full proficiencies response
          setArmorProficiencies(data?.armor || []);
        } else {
          setArmorProficiencies([]);
        }
      } catch (error) {
        console.error('Failed to load armor proficiencies:', error);
        setArmorProficiencies([]);
      } finally {
        setLoadingProficiencies(false);
      }
    };
    
    loadProficiencies();
  }, [characterClass, showProficiencies]);

  const handleArmorToggle = (armor: Armor) => {
    const newSelection = internalSelectedArmor.some(a => a.name === armor.name)
      ? internalSelectedArmor.filter(a => a.name !== armor.name)
      : [...internalSelectedArmor, armor];
    
    setInternalSelectedArmor(newSelection);
    
    if (onArmorSelectionChange) {
      onArmorSelectionChange(newSelection);
    }
  };

  // Convert armor data to proper Armor types
  const convertedArmorData: Armor[] = armorData.map(armor => ({
    ...armor,
    type: armor.type as 'Light' | 'Medium' | 'Heavy' | 'Shield',
    maxDexBonus: armor.maxDexBonus ?? undefined,
    minStrength: armor.minStrength ?? undefined
  }));

  const isArmorProficient = (armor: Armor): boolean => {
    if (!armorProficiencies) return true; // Show all if proficiencies not loaded
    return armorProficiencies.includes(armor.type);
  };

  // Group armor by proficiency if we have proficiency data
  let armorCategories: Record<string, Armor[]>;
  
  if (armorProficiencies && showProficiencies) {
    const proficientArmor = convertedArmorData.filter(armor => isArmorProficient(armor));
    const nonProficientArmor = convertedArmorData.filter(armor => !isArmorProficient(armor));
    
    armorCategories = {
      'Proficient - Light Armor': proficientArmor.filter(a => a.type === 'Light'),
      'Proficient - Medium Armor': proficientArmor.filter(a => a.type === 'Medium'),
      'Proficient - Heavy Armor': proficientArmor.filter(a => a.type === 'Heavy'),
      'Proficient - Shields': proficientArmor.filter(a => a.type === 'Shield'),
      'Non-Proficient - Light Armor': nonProficientArmor.filter(a => a.type === 'Light'),
      'Non-Proficient - Medium Armor': nonProficientArmor.filter(a => a.type === 'Medium'),
      'Non-Proficient - Heavy Armor': nonProficientArmor.filter(a => a.type === 'Heavy'),
      'Non-Proficient - Shields': nonProficientArmor.filter(a => a.type === 'Shield'),
    };
    
    // Remove empty categories
    Object.keys(armorCategories).forEach(key => {
      if (armorCategories[key].length === 0) {
        delete armorCategories[key];
      }
    });
  } else {
    // Fallback to basic type grouping
    armorCategories = convertedArmorData.reduce((groups, armor) => {
      const type = armor.type;
      const key = `${type} Armor`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(armor);
      return groups;
    }, {} as Record<string, Armor[]>);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Select Armor</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loadingProficiencies && (
            <div className="text-center text-slate-400 mb-4">
              Loading armor proficiencies...
            </div>
          )}
          
          {Object.entries(armorCategories).map(([categoryName, armors]) => (
            <div key={categoryName} className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 capitalize ${
                categoryName.includes('Proficient -') ? 'text-green-400' :
                categoryName.includes('Non-Proficient -') ? 'text-red-400' :
                'text-white'
              }`}>
                {categoryName}
              </h3>
              <div className="space-y-2">
                {armors.map((armor) => {
                  const isSelected = internalSelectedArmor.some(a => a.name === armor.name);
                  const isProficient = isArmorProficient(armor);
                  
                  return (
                    <div
                      key={armor.name}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-purple-500 bg-purple-500/10'
                          : isProficient 
                            ? 'border-slate-600 bg-slate-700 hover:border-slate-500'
                            : 'border-red-600/50 bg-red-900/10 hover:border-red-500/50'
                      }`}
                      onClick={() => handleArmorToggle(armor)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${
                              isSelected ? 'text-purple-300' : 
                              isProficient ? 'text-white' : 'text-red-300'
                            }`}>
                              {armor.name}
                            </span>
                            {isSelected && (
                              <span className="text-xs px-2 py-1 bg-purple-500 text-white rounded">
                                Selected
                              </span>
                            )}
                            {!isProficient && showProficiencies && (
                              <span className="text-xs px-2 py-1 bg-red-600 text-white rounded">
                                Not Proficient
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 mt-1">{armor.description}</p>
                          <div className="flex gap-4 mt-2 text-xs text-slate-400">
                            <span>AC: {armor.baseAC}{armor.maxDexBonus !== null ? ` + Dex (max ${armor.maxDexBonus})` : ' + Dex'}</span>
                            <span>Weight: {armor.weight} lb</span>
                            <span>Cost: {armor.cost}</span>
                            {armor.minStrength && <span>Min Str: {armor.minStrength}</span>}
                            {armor.stealthDisadvantage && <span className="text-red-400">Stealth Disadvantage</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 