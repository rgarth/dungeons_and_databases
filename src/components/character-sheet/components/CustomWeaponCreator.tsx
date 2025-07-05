"use client";

import { useState, useEffect, useMemo } from "react";
import { X, Plus, Star, Zap, Sparkles } from "lucide-react";
import { Weapon } from "@/lib/dnd/equipment";
import { generateMagicWeaponName } from "@/lib/dnd/magic-weapon-names";

interface CustomWeapon {
  id: string;
  name: string;
  customName?: string;
  description?: string;
  modifier: number;
  baseWeapon: Weapon;
  enhancedDamage: string;
  enhancedToHit: string;
  type: string;
  category: string;
  damageType: string;
  properties: string[];
  weight: number;
  cost: string;
  createdAt: string;
}

interface CustomWeaponCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onWeaponCreated: (weapon: CustomWeapon) => void;
}

export function CustomWeaponCreator({ isOpen, onClose, onWeaponCreated }: CustomWeaponCreatorProps) {
  const [baseWeaponId, setBaseWeaponId] = useState<string>('');
  const [modifier, setModifier] = useState(1);
  const [customName, setCustomName] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [customWeapons, setCustomWeapons] = useState<CustomWeapon[]>([]);
  const [loadingCustomWeapons, setLoadingCustomWeapons] = useState(false);
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loadingWeapons, setLoadingWeapons] = useState(false);

  // Load weapons from the database
  useEffect(() => {
    const loadWeapons = async () => {
      setLoadingWeapons(true);
      try {
        const response = await fetch('/api/weapons');
        if (response.ok) {
          const data = await response.json();
          setWeapons(data);
        } else {
          console.error('Failed to load weapons');
        }
      } catch (error) {
        console.error('Error loading weapons:', error);
      } finally {
        setLoadingWeapons(false);
      }
    };

    loadWeapons();
  }, []);

  // Create a map of weapon IDs to their full data
  const weaponsMap = useMemo(() => {
    const map = new Map<string, Weapon>();
    weapons.forEach(weapon => {
      if (weapon.id) {
        map.set(weapon.id, weapon);
      }
    });
    return map;
  }, [weapons]);

  // Load existing custom weapons when component opens
  useEffect(() => {
    if (isOpen) {
      loadCustomWeapons();
    }
  }, [isOpen]);

  const loadCustomWeapons = async () => {
    setLoadingCustomWeapons(true);
    try {
      const response = await fetch('/api/custom-weapons');
      if (response.ok) {
        const weapons = await response.json();
        setCustomWeapons(weapons);
      } else {
        console.error('Failed to load custom weapons:', response.statusText);
      }
    } catch (error) {
      console.error('Error loading custom weapons:', error);
    } finally {
      setLoadingCustomWeapons(false);
    }
  };

  const selectedBaseWeapon = weaponsMap.get(baseWeaponId);
  
  const generateWeaponName = () => {
    if (!selectedBaseWeapon) return '';
    return modifier > 0 ? `+${modifier} ${selectedBaseWeapon.name}` : selectedBaseWeapon.name;
  };

  const finalWeaponName = customName.trim() || generateWeaponName();

  const handleCreate = async () => {
    if (!baseWeaponId || !selectedBaseWeapon) {
      alert('Please select a base weapon');
      return;
    }

    setIsCreating(true);
    try {
      const response = await fetch('/api/custom-weapons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          baseWeaponId,
          modifier,
          customName: customName.trim() || null,
          description: description.trim() || null
        })
      });

      if (response.ok) {
        const newWeapon = await response.json();
        setCustomWeapons(prev => [newWeapon, ...prev]);
        onWeaponCreated(newWeapon);
        
        // Reset form
        setBaseWeaponId('');
        setModifier(1);
        setCustomName('');
        setDescription('');
        
        alert('Magical weapon created successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to create weapon');
      }
    } catch (error) {
      console.error('Error creating custom weapon:', error);
      alert('Failed to create weapon');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (weaponId: string) => {
    if (!confirm('Are you sure you want to delete this custom weapon?')) {
      return;
    }

    try {
      const response = await fetch(`/api/custom-weapons?id=${weaponId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setCustomWeapons(prev => prev.filter(w => w.id !== weaponId));
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete weapon');
      }
    } catch (error) {
      console.error('Error deleting custom weapon:', error);
      alert('Failed to delete weapon');
    }
  };

  const handleAddToInventory = (weapon: CustomWeapon) => {
    onWeaponCreated(weapon);
    alert(`${weapon.name} added to inventory!`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center p-4 pt-8 z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
      <div className="bg-[var(--color-card)] rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-3">
            <Star className="h-6 w-6" style={{ color: 'var(--color-accent)' }} />
            <h2 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Custom Magical Weapons</h2>
          </div>
          <button
            onClick={onClose}
            className="transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Creation Form */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                <Zap className="h-5 w-5" style={{ color: 'var(--color-warning)' }} />
                Create New Magical Weapon
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Base Weapon *
                  </label>
                  <select
                    value={baseWeaponId}
                    onChange={(e) => setBaseWeaponId(e.target.value)}
                    className="w-full rounded-lg px-3 py-2 focus:outline-none"
                    style={{
                      backgroundColor: 'var(--color-card-secondary)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                    disabled={loadingWeapons}
                  >
                    <option value="">Select base weapon...</option>
                    {weapons.map(weapon => (
                      <option key={weapon.id} value={weapon.id}>
                        {weapon.name} ({weapon.damage} {weapon.damageType}, {weapon.type})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Magical Bonus
                  </label>
                  <select
                    value={modifier}
                    onChange={(e) => setModifier(Number(e.target.value))}
                    className="w-full rounded-lg px-3 py-2 focus:outline-none"
                    style={{
                      backgroundColor: 'var(--color-card-secondary)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                  >
                    <option value={0}>No bonus (Masterwork)</option>
                    <option value={1}>+1 (Uncommon)</option>
                    <option value={2}>+2 (Rare)</option>
                    <option value={3}>+3 (Very Rare)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Custom Name (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder={generateWeaponName() || "e.g., Flamberge of Doom"}
                      className="flex-1 rounded-lg px-3 py-2 focus:outline-none"
                      style={{
                        backgroundColor: 'var(--color-card-secondary)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-primary)'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                    />
                    <button
                      type="button"
                      onClick={() => setCustomName(generateMagicWeaponName())}
                      className="px-3 py-2 rounded-lg transition-all flex items-center gap-1 whitespace-nowrap"
                      style={{
                        background: 'linear-gradient(to right, var(--color-accent), var(--color-accent-hover))',
                        color: 'var(--color-accent-text)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(to right, var(--color-accent-hover), var(--color-accent))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(to right, var(--color-accent), var(--color-accent-hover))';
                      }}
                      title="Generate random magic weapon name"
                    >
                      <Sparkles className="h-4 w-4" />
                      Generate
                    </button>
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
                    Leave blank to use: {generateWeaponName()}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Description (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe any special properties or lore..."
                    rows={3}
                    className="w-full rounded-lg px-3 py-2 focus:outline-none resize-none"
                    style={{
                      backgroundColor: 'var(--color-card-secondary)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                  />
                </div>

                {/* Preview */}
                {selectedBaseWeapon && (
                  <div className="rounded-lg p-4 border" style={{
                    backgroundColor: 'var(--color-card-secondary)',
                    borderColor: 'var(--color-accent)',
                    opacity: 0.3
                  }}>
                    <h4 className="text-sm font-medium mb-2" style={{ color: 'var(--color-accent)' }}>Preview</h4>
                    <div className="space-y-1 text-sm">
                      <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{finalWeaponName}</div>
                      <div style={{ color: 'var(--color-text-secondary)' }}>
                        Damage: {selectedBaseWeapon.damage}{modifier > 0 ? ` + ${modifier}` : ''} {selectedBaseWeapon.damageType}
                      </div>
                      <div style={{ color: 'var(--color-text-secondary)' }}>
                        Attack Bonus: {modifier > 0 ? `+${modifier}` : '+0'}
                      </div>
                      <div style={{ color: 'var(--color-text-tertiary)' }}>
                        Type: {selectedBaseWeapon.type} {selectedBaseWeapon.category}
                      </div>
                      <div style={{ color: 'var(--color-text-tertiary)' }}>
                        Properties: {selectedBaseWeapon.properties.join(', ')}
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleCreate}
                  disabled={!baseWeaponId || isCreating}
                  className="w-full px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(to right, var(--color-accent), var(--color-accent-hover))',
                    color: 'var(--color-accent-text)'
                  }}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.background = 'linear-gradient(to right, var(--color-accent-hover), var(--color-accent))';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, var(--color-accent), var(--color-accent-hover))';
                  }}
                >
                  {isCreating ? (
                    <>Creating...</>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Create Magical Weapon
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Existing Custom Weapons */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Your Custom Weapons</h3>
              
              {loadingCustomWeapons ? (
                <div className="text-center py-8" style={{ color: 'var(--color-text-tertiary)' }}>
                  Loading your weapons...
                </div>
              ) : customWeapons.length === 0 ? (
                <div className="rounded-lg p-6 text-center" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                  <Star className="h-12 w-12 mx-auto mb-3" style={{ color: 'var(--color-text-quaternary)' }} />
                  <div style={{ color: 'var(--color-text-tertiary)' }}>No custom weapons yet</div>
                  <div className="text-sm mt-1" style={{ color: 'var(--color-text-quaternary)' }}>
                    Create your first magical weapon!
                  </div>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {customWeapons.map((weapon) => (
                    <div key={weapon.id} className="rounded-lg p-4 border" style={{
                      backgroundColor: 'var(--color-card-secondary)',
                      borderColor: 'var(--color-border)'
                    }}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{weapon.name}</h4>
                          {weapon.customName && weapon.customName !== weapon.name && (
                            <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                              Based on: {weapon.baseWeapon.name}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddToInventory(weapon)}
                            className="px-3 py-1 rounded text-xs transition-colors"
                            style={{
                              backgroundColor: 'var(--color-success)',
                              color: 'var(--color-success-text)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-success-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-success)'}
                          >
                            Add to Inventory
                          </button>
                          <button
                            onClick={() => handleDelete(weapon.id)}
                            className="px-3 py-1 rounded text-xs transition-colors"
                            style={{
                              backgroundColor: 'var(--color-danger)',
                              color: 'var(--color-danger-text)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-danger-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-danger)'}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div style={{ color: 'var(--color-text-secondary)' }}>
                            Damage: {weapon.enhancedDamage} {weapon.baseWeapon.damageType}
                          </div>
                          <div style={{ color: 'var(--color-text-secondary)' }}>
                            Attack: {weapon.enhancedToHit}
                          </div>
                        </div>
                        <div>
                          <div style={{ color: 'var(--color-text-tertiary)' }}>
                            Type: {weapon.type} {weapon.category}
                          </div>
                          <div style={{ color: 'var(--color-text-tertiary)' }}>
                            Weight: {weapon.weight} lbs
                          </div>
                        </div>
                      </div>
                      
                      {weapon.description && (
                        <div className="mt-3 text-sm italic" style={{ color: 'var(--color-text-secondary)' }}>
                          &ldquo;{weapon.description}&rdquo;
                        </div>
                      )}
                      
                      <div className="mt-2 text-xs" style={{ color: 'var(--color-text-quaternary)' }}>
                        Created: {new Date(weapon.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 