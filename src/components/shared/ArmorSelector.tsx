import React, { useState, useEffect } from 'react';
import { Armor } from '../../lib/dnd/equipment';

interface ArmorSelectorProps {
  selectedArmor?: Armor[];
  onArmorSelectionChange?: (armor: Armor[]) => void;
  onClose?: () => void;
  isOpen?: boolean;
  characterClass?: string;
  showProficiencies?: boolean;
  onConfirm?: (armor: Armor[]) => void;
  onCancel?: () => void;
  
  // Cached data props for instant loading
  cachedArmorProficiencies?: string[] | null;
}

export function ArmorSelector({
  selectedArmor = [],
  onArmorSelectionChange,
  onClose,
  isOpen = true,
  characterClass,
  showProficiencies = true,
  onConfirm,
  onCancel,
  cachedArmorProficiencies
}: ArmorSelectorProps) {
  const [internalSelectedArmor, setInternalSelectedArmor] = useState<Armor[]>(selectedArmor);
  const [armorProficiencies, setArmorProficiencies] = useState<string[] | null>(null);
  const [loadingProficiencies, setLoadingProficiencies] = useState(false);
  const [armorData, setArmorData] = useState<Armor[]>([]);
  const [loadingArmor, setLoadingArmor] = useState(true);

  useEffect(() => {
    setInternalSelectedArmor(selectedArmor);
  }, [selectedArmor]);

  // Load armor data from database
  useEffect(() => {
    const loadArmor = async () => {
      setLoadingArmor(true);
      try {
        const response = await fetch('/api/armor');
        if (response.ok) {
          const data = await response.json();
          setArmorData(data);
        } else {
          console.error('Failed to load armor data');
          setArmorData([]);
        }
      } catch (error) {
        console.error('Failed to load armor data:', error);
        setArmorData([]);
      } finally {
        setLoadingArmor(false);
      }
    };
    
    loadArmor();
  }, []);

  // Load armor proficiencies when class changes
  useEffect(() => {
    if (!characterClass || !showProficiencies) return;
    
    // If we have cached data, use it immediately
    if (cachedArmorProficiencies !== undefined) {
      setArmorProficiencies(cachedArmorProficiencies);
      console.log('🚀 Using cached armor proficiencies for', characterClass);
      return;
    }
    
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
        console.log('📡 Fetched armor proficiencies for', characterClass);
      } catch (error) {
        console.error('Failed to load armor proficiencies:', error);
        setArmorProficiencies([]);
      } finally {
        setLoadingProficiencies(false);
      }
    };
    
    loadProficiencies();
  }, [characterClass, showProficiencies, cachedArmorProficiencies]);

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
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{
      backgroundColor: 'var(--color-overlay)'
    }}>
      <div className="rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col border shadow-lg" style={{
        backgroundColor: 'var(--color-card)',
        borderColor: 'var(--color-border)',
        border: '1px solid var(--color-border)'
      }}>
        <div className="flex justify-between items-center p-4 md:p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <h2 className="text-lg md:text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Select Armor</h2>
          <button
            onClick={onClose || onCancel}
            className="transition-colors"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {loadingArmor && (
            <div className="text-center mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
              Loading armor data...
            </div>
          )}
          
          {loadingProficiencies && (
            <div className="text-center mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
              Loading armor proficiencies...
            </div>
          )}
          
          {!loadingArmor && Object.entries(armorCategories).map(([categoryName, armors]) => (
            <div key={categoryName} className="mb-6">
              <h3 className={`text-base md:text-lg font-semibold mb-3 capitalize ${
                categoryName.includes('Proficient -') ? '' :
                categoryName.includes('Non-Proficient -') ? '' :
                ''
              }`} style={{
                color: categoryName.includes('Proficient -') ? 'var(--color-success)' :
                       categoryName.includes('Non-Proficient -') ? 'var(--color-error)' :
                       'var(--color-text-primary)'
              }}>
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
                        isSelected ? '' : ''
                      }`}
                      style={{
                        borderColor: isSelected ? 'var(--color-accent)' :
                                    isProficient ? 'var(--color-border)' : 'var(--color-error)',
                        backgroundColor: isSelected ? 'var(--color-accent-bg)' :
                                         isProficient ? 'var(--color-surface-secondary)' : 'var(--color-error-bg)',
                        opacity: isProficient ? 1 : 0.5
                      }}
                      onClick={() => handleArmorToggle(armor)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-sm md:text-base" style={{
                              color: isSelected ? 'var(--color-accent-text)' : 
                                     isProficient ? 'var(--color-text-primary)' : 'var(--color-error-text)'
                            }}>
                              {armor.name}
                            </span>
                            {isSelected && (
                              <span className="text-xs px-2 py-1 rounded" style={{
                                backgroundColor: 'var(--color-accent)',
                                color: 'var(--color-accent-text)'
                              }}>
                                Selected
                              </span>
                            )}
                            {!isProficient && showProficiencies && (
                              <span className="text-xs px-2 py-1 rounded" style={{
                                backgroundColor: 'var(--color-error)',
                                color: 'var(--color-error-text)'
                              }}>
                                Not Proficient
                              </span>
                            )}
                          </div>
                          <p className="text-xs md:text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>{armor.description}</p>
                          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-2 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                            <span>AC: {armor.baseAC}{armor.maxDexBonus !== null ? ` + Dex (max ${armor.maxDexBonus})` : ' + Dex'}</span>
                            <span>Weight: {armor.weight} lb</span>
                            <span>Cost: {armor.cost}</span>
                            {armor.minStrength && <span>Min Str: {armor.minStrength}</span>}
                            {armor.stealthDisadvantage && <span style={{ color: 'var(--color-error)' }}>Stealth Disadvantage</span>}
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

        <div className="p-4 md:p-6 border-t flex justify-end gap-3" style={{ borderColor: 'var(--color-border)' }}>
          <button
            onClick={onCancel || onClose}
            className="px-3 md:px-4 py-2 text-sm md:text-base transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm?.(internalSelectedArmor)}
            className="px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text-primary)',
              '--tw-hover-bg': 'var(--color-primary-hover)'
            } as React.CSSProperties}
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
} 