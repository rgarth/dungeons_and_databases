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
  const [baseWeaponId, setBaseWeaponId] = useState('');
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
      map.set(weapon.id, weapon);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 pt-8 z-50">
      <div className="bg-slate-800 rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <Star className="h-6 w-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Custom Magical Weapons</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Creation Form */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Create New Magical Weapon
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Base Weapon *
                  </label>
                  <select
                    value={baseWeaponId}
                    onChange={(e) => setBaseWeaponId(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
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
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Magical Bonus
                  </label>
                  <select
                    value={modifier}
                    onChange={(e) => setModifier(Number(e.target.value))}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value={0}>No bonus (Masterwork)</option>
                    <option value={1}>+1 (Uncommon)</option>
                    <option value={2}>+2 (Rare)</option>
                    <option value={3}>+3 (Very Rare)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Custom Name (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder={generateWeaponName() || "e.g., Flamberge of Doom"}
                      className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setCustomName(generateMagicWeaponName())}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-3 py-2 rounded-lg transition-all flex items-center gap-1 whitespace-nowrap"
                      title="Generate random magic weapon name"
                    >
                      <Sparkles className="h-4 w-4" />
                      Generate
                    </button>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Leave blank to use: {generateWeaponName()}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe any special properties or lore..."
                    rows={3}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Preview */}
                {selectedBaseWeapon && (
                  <div className="bg-slate-700 rounded-lg p-4 border border-purple-500/30">
                    <h4 className="text-sm font-medium text-purple-300 mb-2">Preview</h4>
                    <div className="space-y-1 text-sm">
                      <div className="text-white font-medium">{finalWeaponName}</div>
                      <div className="text-slate-300">
                        Damage: {selectedBaseWeapon.damage}{modifier > 0 ? ` + ${modifier}` : ''} {selectedBaseWeapon.damageType}
                      </div>
                      <div className="text-slate-300">
                        Attack Bonus: {modifier > 0 ? `+${modifier}` : '+0'}
                      </div>
                      <div className="text-slate-400">
                        Type: {selectedBaseWeapon.type} {selectedBaseWeapon.category}
                      </div>
                      <div className="text-slate-400">
                        Properties: {selectedBaseWeapon.properties.join(', ')}
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleCreate}
                  disabled={!baseWeaponId || isCreating}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
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
              <h3 className="text-lg font-semibold text-white mb-4">Your Custom Weapons</h3>
              
              {loadingCustomWeapons ? (
                <div className="text-center text-slate-400 py-8">
                  Loading your weapons...
                </div>
              ) : customWeapons.length === 0 ? (
                <div className="bg-slate-700 rounded-lg p-6 text-center">
                  <Star className="h-12 w-12 text-slate-500 mx-auto mb-3" />
                  <div className="text-slate-400">No custom weapons yet</div>
                  <div className="text-sm text-slate-500 mt-1">
                    Create your first magical weapon!
                  </div>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {customWeapons.map((weapon) => (
                    <div key={weapon.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-medium">{weapon.name}</h4>
                          {weapon.customName && weapon.customName !== weapon.name && (
                            <div className="text-xs text-slate-400">
                              Based on: {weapon.baseWeapon.name}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddToInventory(weapon)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Add to Inventory
                          </button>
                          <button
                            onClick={() => handleDelete(weapon.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-slate-300">
                            Damage: {weapon.enhancedDamage} {weapon.baseWeapon.damageType}
                          </div>
                          <div className="text-slate-300">
                            Attack: {weapon.enhancedToHit}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-400">
                            Type: {weapon.type} {weapon.category}
                          </div>
                          <div className="text-slate-400">
                            Weight: {weapon.weight} lbs
                          </div>
                        </div>
                      </div>
                      
                                             {weapon.description && (
                         <div className="mt-3 text-sm text-slate-300 italic">
                           &ldquo;{weapon.description}&rdquo;
                         </div>
                       )}
                      
                      <div className="mt-2 text-xs text-slate-500">
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