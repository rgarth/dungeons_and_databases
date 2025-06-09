import React, { useState, useEffect } from 'react';
import { Armor } from '../../lib/dnd/types';
import { armorData } from '../../../prisma/data/armor-data';

interface ArmorSelectorProps {
  selectedArmor?: Armor[];
  onArmorSelectionChange?: (armor: Armor[]) => void;
  onClose?: () => void;
  isOpen?: boolean;
}

export function ArmorSelector({
  selectedArmor = [],
  onArmorSelectionChange,
  onClose,
  isOpen = true
}: ArmorSelectorProps) {
  const [internalSelectedArmor, setInternalSelectedArmor] = useState<Armor[]>(selectedArmor);

  useEffect(() => {
    setInternalSelectedArmor(selectedArmor);
  }, [selectedArmor]);

  const handleArmorToggle = (armor: Armor) => {
    const newSelection = internalSelectedArmor.some(a => a.name === armor.name)
      ? internalSelectedArmor.filter(a => a.name !== armor.name)
      : [...internalSelectedArmor, armor];
    
    setInternalSelectedArmor(newSelection);
    
    if (onArmorSelectionChange) {
      onArmorSelectionChange(newSelection);
    }
  };

  // Group armor by type
  const groupedArmor = armorData.reduce((groups, armor) => {
    const type = armor.type;
    if (!groups[type]) groups[type] = [];
    groups[type].push(armor);
    return groups;
  }, {} as Record<string, Armor[]>);

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
          {Object.entries(groupedArmor).map(([type, armors]) => (
            <div key={type} className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3 capitalize">{type} Armor</h3>
              <div className="space-y-2">
                {armors.map((armor) => {
                  const isSelected = internalSelectedArmor.some(a => a.name === armor.name);
                  
                  return (
                    <div
                      key={armor.name}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-slate-600 bg-slate-700 hover:border-slate-500'
                      }`}
                      onClick={() => handleArmorToggle(armor)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${isSelected ? 'text-purple-300' : 'text-white'}`}>
                              {armor.name}
                            </span>
                            {isSelected && (
                              <span className="text-xs px-2 py-1 bg-purple-500 text-white rounded">
                                Selected
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