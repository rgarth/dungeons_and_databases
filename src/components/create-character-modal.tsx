"use client";

import { useState, useEffect } from "react";
import { X, Dice6, RefreshCw, Plus, Minus } from "lucide-react";
import { RACES, CLASSES, BACKGROUNDS, ALIGNMENTS, ABILITY_SCORES } from "@/lib/dnd/core";
import { AbilityScore } from "@/lib/dnd/core";
import { generateFantasyName } from "@/lib/dnd/character";
import { Spell } from "@/lib/dnd/spells";
import { Weapon, Armor } from "@/lib/dnd/equipment";
import { weaponsData } from '../../prisma/data/weapons-data';
import { categorizeWeaponsByProficiency } from "@/lib/dnd/proficiencies";
import { WeaponSuggestion } from "@/lib/dnd/weapon-suggestions";

import { 
  type StatMethod, 
  type CharacterCreationData,
  CharacterCreationService
} from "@/services/character/creation";

interface CreateCharacterModalProps {
  onClose: () => void;
  onCharacterCreated: () => void;
}

interface Subclass {
  name: string;
  description?: string;
}

interface CreationOptions {
  equipmentPacks: Array<{
    id: string;
    name: string;
    description: string;
    cost: string;
    items: Array<{
      name: string;
      quantity: number;
      type: string;
      cost: string;
      weight: number;
      description: string | null;
    }>;
  }>;
  weaponSuggestions: Weapon[];
  armorSuggestions: Armor[];
  subclasses: Subclass[];
  needsSubclassAtCreation: boolean;
  spellcasting: {
    ability: string | null;
    canCastAtLevel1: boolean | string | null;
    availableSpells: Spell[];
    spellSlots: Record<number, number>;
  };
}

export function CreateCharacterModal({ onClose, onCharacterCreated }: CreateCharacterModalProps) {
  const characterCreationService = CharacterCreationService.getInstance();

  // Basic character info
  const [name, setName] = useState("");
  const [race, setRace] = useState<typeof RACES[number]>(RACES[0]);
  const [characterClass, setCharacterClass] = useState<typeof CLASSES[number]>(CLASSES[0]);
  const [subclass, setSubclass] = useState<string>("");
  const [background, setBackground] = useState<typeof BACKGROUNDS[number]>(BACKGROUNDS[0]);
  const [alignment, setAlignment] = useState<typeof ALIGNMENTS[number]>(ALIGNMENTS[4]); // True Neutral
  const [gender, setGender] = useState<string>('');
  
  // Ability scores
  const [statMethod, setStatMethod] = useState<StatMethod>('rolling-assign');
  const [abilityScores, setAbilityScores] = useState({} as Record<AbilityScore, number>);
  const [randomScoreArray, setRandomScoreArray] = useState<number[]>([]);
  
  // Equipment and spells
  const [selectedSpells, setSelectedSpells] = useState<Spell[]>([]);
  const [selectedWeapons, setSelectedWeapons] = useState<{weapon: Weapon, quantity: number}[]>([]);
  const [selectedEquipmentPack, setSelectedEquipmentPack] = useState<number>(0);
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [generatingName, setGeneratingName] = useState(false);
  const [creationOptions, setCreationOptions] = useState<CreationOptions | null>(null);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [weaponProficiencies, setWeaponProficiencies] = useState<{ simple: boolean; martial: boolean; specific: string[] } | null>(null);
  const [weaponSuggestions, setWeaponSuggestions] = useState<WeaponSuggestion[]>([]);
  


  // Load creation options and proficiencies when class changes
  useEffect(() => {
    const loadCreationOptions = async () => {
      setLoadingOptions(true);
      try {
        const [options, proficiencies, suggestions] = await Promise.all([
          characterCreationService.getCreationOptions(characterClass),
          fetch(`/api/class-proficiencies?className=${encodeURIComponent(characterClass)}`)
            .then(res => res.ok ? res.json() : { simple: false, martial: false, specific: [] })
            .catch(() => ({ simple: false, martial: false, specific: [] })),
          fetch(`/api/weapon-suggestions?className=${encodeURIComponent(characterClass)}`)
            .then(res => res.ok ? res.json() : [])
            .catch(() => [])
        ]);
        
        setCreationOptions(options);
        setWeaponProficiencies(proficiencies);
        setWeaponSuggestions(suggestions);
        
        console.log('Loaded proficiencies for', characterClass, ':', proficiencies);
      } catch (error) {
        console.error('Failed to load creation options:', error);
        // Fallback to basic options
        setCreationOptions({
          equipmentPacks: [],
          weaponSuggestions: [],
          armorSuggestions: [],
          subclasses: [],
          needsSubclassAtCreation: false,
          spellcasting: { ability: null, canCastAtLevel1: false, availableSpells: [], spellSlots: {} }
        });
        setWeaponProficiencies({ simple: false, martial: false, specific: [] });
        setWeaponSuggestions([]);
      } finally {
        setLoadingOptions(false);
      }
    };
    
    loadCreationOptions();
  }, [characterClass]);

  // Get creation options from state (with fallback)
  const { subclasses = [], needsSubclassAtCreation = false, spellcasting = { ability: null, canCastAtLevel1: false, availableSpells: [], spellSlots: {} } } = creationOptions || {};

  // Initialize ability scores on mount
  useEffect(() => {
    const { scores, randomArray } = characterCreationService.generateAbilityScores(statMethod);
    setAbilityScores(scores);
    if (randomArray) {
      setRandomScoreArray(randomArray);
    }
  }, []);

  // Apply weapon suggestions when they're loaded
  useEffect(() => {
    if (weaponSuggestions.length > 0) {
      // Convert weapon suggestions to selected weapons
      const suggestedWeapons: {weapon: Weapon, quantity: number}[] = [];
      
      for (const suggestion of weaponSuggestions) {
        // Find the weapon in the weapons data
        const weaponData = weaponsData.find(w => w.name === suggestion.weaponName);
        if (weaponData) {
          const weapon: Weapon = {
            ...weaponData,
            type: weaponData.type as 'Simple' | 'Martial',
            category: weaponData.category as 'Melee' | 'Ranged',
            properties: weaponData.properties ? JSON.parse(weaponData.properties) : []
          };
          suggestedWeapons.push({ weapon, quantity: suggestion.quantity });
        }
      }
      
      setSelectedWeapons(suggestedWeapons);
    }
  }, [weaponSuggestions]);

  // Reset weapon selections when class changes
  useEffect(() => {
    // Reset selections when class changes (suggestions will be applied by the above effect)
    setSelectedWeapons([]);
    setSubclass("");
  }, [characterClass]);

  const handleStatMethodChange = (method: StatMethod) => {
    setStatMethod(method);
    const { scores, randomArray } = characterCreationService.generateAbilityScores(method);
    setAbilityScores(scores);
    if (randomArray) {
      setRandomScoreArray(randomArray);
    }
  };

  const handleGenerateStats = () => {
    const { scores, randomArray } = characterCreationService.generateAbilityScores(statMethod);
    setAbilityScores(scores);
    if (randomArray) {
      setRandomScoreArray(randomArray);
    }
  };

  const handleGenerateName = async () => {
    setGeneratingName(true);
    try {
      const generatedName = await generateFantasyName(race, gender || undefined);
      setName(generatedName);
    } catch (error) {
      console.error('Failed to generate name:', error);
    } finally {
      setGeneratingName(false);
    }
  };

  const handlePointBuyChange = (ability: AbilityScore, change: number) => {
    if (statMethod !== 'pointbuy') return;
    
    const newScores = characterCreationService.applyPointBuyChange(abilityScores, ability, change);
    if (newScores) {
      setAbilityScores(newScores);
    }
  };

  const handleDragStart = (e: React.DragEvent, fromAbility: AbilityScore) => {
    e.dataTransfer.setData('text/plain', fromAbility);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, toAbility: AbilityScore) => {
    e.preventDefault();
    const fromAbility = e.dataTransfer.getData('text/plain') as AbilityScore;
    
    if (fromAbility && fromAbility !== toAbility) {
      const newScores = characterCreationService.swapAbilityScores(abilityScores, fromAbility, toAbility);
      setAbilityScores(newScores);
    }
  };

  const handleSpellToggle = (spell: Spell) => {
    setSelectedSpells(prev => {
      const isSelected = prev.some(s => s.name === spell.name);
      if (isSelected) {
        return prev.filter(s => s.name !== spell.name);
      } else {
        const { maxSpells } = characterCreationService.validateSpellSelection(characterClass, prev);
        if (prev.length < maxSpells) {
          return [...prev, spell];
        }
        return prev;
      }
    });
  };

  const handleWeaponQuantityChange = (weapon: Weapon, quantity: number) => {
    setSelectedWeapons(prev => {
      const existingIndex = prev.findIndex(w => w.weapon.name === weapon.name);
      if (quantity === 0) {
        return prev.filter(w => w.weapon.name !== weapon.name);
      } else if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { weapon, quantity };
        return updated;
      } else {
        return [...prev, { weapon, quantity }];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Validate required subclass selection
    if (needsSubclassAtCreation && !subclass) {
      alert(`Please select a ${characterClass} subclass.`);
      return;
    }

    setLoading(true);
    try {
      const creationData: CharacterCreationData = {
        name,
        race,
        class: characterClass,
        subclass: subclass || undefined,
        background,
        alignment,
        gender,
        statMethod,
        abilityScores,
        randomScoreArray,
        selectedEquipmentPack,
        selectedWeapons,
        selectedSpells
      };

      const characterData = await characterCreationService.createCharacter(creationData);
      
      const response = await fetch("/api/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(characterData),
      });

      if (response.ok) {
        onCharacterCreated();
      }
    } catch (error) {
      console.error("Failed to create character:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate derived values
  const pointBuyValidation = characterCreationService.validatePointBuy(abilityScores);
  const spellcastingStats = characterCreationService.calculateSpellcastingStats(characterClass, abilityScores);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 pt-8 z-50">
      <div className="bg-slate-800 rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Create New Character</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Character Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 pr-12 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Enter character name"
                  required
                />
                <button
                  type="button"
                  onClick={handleGenerateName}
                  disabled={generatingName}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-slate-400 hover:text-purple-400 transition-colors disabled:opacity-50"
                  title="Generate fantasy name"
                >
                  <RefreshCw className={`h-4 w-4 ${generatingName ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Gender (for name generation)
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="">Not specified</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Race
              </label>
              <select
                value={race}
                onChange={(e) => setRace(e.target.value as typeof RACES[number])}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {RACES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Class
              </label>
              <select
                value={characterClass}
                onChange={(e) => setCharacterClass(e.target.value as typeof CLASSES[number])}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {CLASSES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {needsSubclassAtCreation && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Subclass *
                </label>
                <select
                  value={subclass}
                  onChange={(e) => setSubclass(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  required={needsSubclassAtCreation}
                >
                  <option value="">Choose subclass...</option>
                  {subclasses.map((sub) => (
                    <option key={sub.name} value={sub.name}>{sub.name}</option>
                  ))}
                </select>
                {subclass && (
                  <p className="text-xs text-slate-400 mt-1">
                    {subclasses.find(s => s.name === subclass)?.description}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Background
              </label>
              <select
                value={background}
                onChange={(e) => setBackground(e.target.value as typeof BACKGROUNDS[number])}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {BACKGROUNDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Alignment
              </label>
              <select
                value={alignment}
                onChange={(e) => setAlignment(e.target.value as typeof ALIGNMENTS[number])}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {ALIGNMENTS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ability Scores */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Ability Scores</h3>
              <div className="flex items-center gap-2">
                <select
                  value={statMethod}
                  onChange={(e) => handleStatMethodChange(e.target.value as StatMethod)}
                  className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm focus:border-purple-500 focus:outline-none"
                >
                  <option value="rolling-assign">Roll & Assign</option>
                  <option value="standard">Standard Array</option>
                  <option value="pointbuy">Point Buy</option>
                </select>
                <button
                  type="button"
                  onClick={handleGenerateStats}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors"
                >
                  <Dice6 className="h-4 w-4" />
                  {statMethod === 'rolling-assign' ? 'Reroll' : 'Regenerate'}
                </button>
              </div>
            </div>

            {statMethod === 'rolling-assign' && randomScoreArray.length > 0 && (
              <div className="mb-4 p-3 bg-slate-700 rounded-lg">
                <p className="text-sm text-slate-300 mb-2">Rolled scores (drag to assign):</p>
                <div className="flex gap-2">
                  {randomScoreArray.map((score, index) => (
                    <div key={index} className="bg-slate-600 px-2 py-1 rounded text-center text-white font-mono">
                      {score}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {statMethod === 'pointbuy' && (
              <div className="mb-4 p-3 bg-slate-700 rounded-lg">
                <p className="text-sm text-slate-300">
                  Points remaining: <span className={`font-bold ${pointBuyValidation.remaining === 0 ? 'text-green-400' : pointBuyValidation.remaining < 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                    {pointBuyValidation.remaining}
                  </span>
                </p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              {ABILITY_SCORES.map((ability) => (
                <div
                  key={ability}
                  className="bg-slate-700 rounded-lg p-3"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, ability)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-300">{ability}</span>
                    <span className="text-lg font-bold text-white">{abilityScores[ability] || 10}</span>
                  </div>
                  
                  {statMethod === 'pointbuy' && (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handlePointBuyChange(ability, -1)}
                        className="w-6 h-6 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center text-white text-sm"
                        disabled={(abilityScores[ability] || 10) <= 8}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePointBuyChange(ability, 1)}
                        className="w-6 h-6 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center text-white text-sm"
                        disabled={(abilityScores[ability] || 10) >= 15}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  )}

                  {(statMethod === 'rolling-assign' || statMethod === 'standard') && (
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, ability)}
                      className="w-full text-center py-1 text-xs text-slate-400 cursor-move"
                    >
                      Drag to swap
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Spellcasting */}
          {spellcasting.canCastAtLevel1 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Spellcasting</h3>
              <div className="mb-4 p-3 bg-slate-700 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                  <div>Spellcasting Ability: <span className="text-white">{spellcasting.ability}</span></div>
                  <div>Spell Save DC: <span className="text-white">{spellcastingStats?.spellSaveDC || '--'}</span></div>
                  <div>Spell Attack Bonus: <span className="text-white">+{spellcastingStats?.spellAttackBonus || '--'}</span></div>
                  <div>Selected Spells: <span className="text-white">{selectedSpells.length}</span></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {spellcasting.availableSpells.map((spell) => (
                  <label
                    key={spell.name}
                    className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                      selectedSpells.some(s => s.name === spell.name)
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSpells.some(s => s.name === spell.name)}
                      onChange={() => handleSpellToggle(spell)}
                      className="sr-only"
                    />
                    <div>
                      <div className="font-medium text-sm">{spell.name}</div>
                      <div className="text-xs opacity-75">{spell.school} {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Equipment */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Starting Equipment</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Equipment Pack
              </label>
              {loadingOptions ? (
                <div className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-400">
                  Loading equipment packs...
                </div>
              ) : (
                <div>
                  <select
                    value={selectedEquipmentPack}
                    onChange={(e) => setSelectedEquipmentPack(Number(e.target.value))}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  >
                    {creationOptions?.equipmentPacks?.map((pack, index) => (
                      <option key={pack.id || index} value={index}>
                        {pack.name} ({pack.cost})
                      </option>
                    )) || []}
                  </select>
                  
                  {/* Show selected pack details */}
                  {creationOptions?.equipmentPacks?.[selectedEquipmentPack] && (
                    <div className="mt-2 p-3 bg-slate-700 rounded-lg">
                      <div className="text-sm text-slate-300 mb-2">
                        {creationOptions.equipmentPacks[selectedEquipmentPack].description}
                      </div>
                      <div className="text-xs text-slate-400">
                        <strong>Contains:</strong>{' '}
                        {creationOptions.equipmentPacks[selectedEquipmentPack].items
                          .map(item => `${item.quantity}x ${item.name}`)
                          .join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Starting Weapons
              </label>
              
              {/* Weapon Selection with Quantities organized by type */}
              <div className="mb-3 p-3 bg-slate-700 rounded-lg max-h-80 overflow-y-auto">
                <div className="text-xs text-slate-400 mb-3">
                  ✓ Select up to 5 total weapons for character creation. Use +/- for multiples (daggers, javelins, etc.)
                </div>
                
                {/* Organized weapon selection by category */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">Weapon Selection</h4>
                  <div className="text-xs text-slate-400 mb-3">Choose any weapons from the D&D 5e database</div>
                  
                  {/* Organize weapons by proficiency and category */}
                  {(() => {
                    // Convert weapons data to Weapon objects
                    const allWeapons: Weapon[] = weaponsData.map((weaponData: any) => ({
                      ...weaponData,
                      type: weaponData.type as 'Simple' | 'Martial',
                      category: weaponData.category as 'Melee' | 'Ranged',
                      properties: weaponData.properties ? JSON.parse(weaponData.properties) : []
                    }));

                    // Categorize by proficiency if we have proficiency data
                    let weaponCategories: Record<string, Weapon[]>;
                    
                    if (weaponProficiencies) {
                      const { proficient, nonProficient } = categorizeWeaponsByProficiency(allWeapons, weaponProficiencies);
                      
                      weaponCategories = {
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
                        'Simple Melee': allWeapons.filter(w => w.type === 'Simple' && w.category === 'Melee'),
                        'Simple Ranged': allWeapons.filter(w => w.type === 'Simple' && w.category === 'Ranged'),
                        'Martial Melee': allWeapons.filter(w => w.type === 'Martial' && w.category === 'Melee'),
                        'Martial Ranged': allWeapons.filter(w => w.type === 'Martial' && w.category === 'Ranged'),
                      };
                    }

                    return (
                      <div className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                        {Object.entries(weaponCategories).map(([categoryName, weapons]) => {
                          const isProficient = !categoryName.startsWith('Non-Proficient');
                          const headerColor = isProficient ? 'text-green-300' : 'text-orange-300';
                          
                          return (
                            <div key={categoryName} className="bg-slate-800 rounded-lg p-3">
                              <h5 className={`text-xs font-semibold ${headerColor} mb-2`}>
                                {categoryName} {!isProficient && '(No Proficiency)'}
                              </h5>
                              <div className="space-y-1">
                                {weapons.map((weapon: Weapon) => {
                                
                                const selectedWeapon = selectedWeapons.find(sw => sw.weapon.name === weapon.name);
                                const quantity = selectedWeapon?.quantity || 0;
                                const totalWeapons = selectedWeapons.reduce((sum, sw) => sum + sw.quantity, 0);
                                const canAdd = totalWeapons < 5;
                                
                                return (
                                  <div key={weapon.name} className={`flex items-center justify-between p-1.5 rounded text-xs ${
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
                                      <div className="text-slate-400 text-xs">
                                        {weapon.damage} {weapon.damageType}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1 ml-2">
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
                                    </div>
                                  </div>
                                );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>

                {/* Show database-driven weapon suggestions */}
                {weaponSuggestions.length > 0 && (
                  <div className="mb-4 p-2 bg-slate-800 rounded border border-amber-500/30">
                    <h5 className="text-xs font-semibold text-amber-300 mb-1">💡 Suggested for {characterClass}</h5>
                    <div className="text-xs text-slate-400 space-y-1">
                      {weaponSuggestions.map(suggestion => (
                        <div key={suggestion.weaponName} className="flex justify-between">
                          <span>{suggestion.quantity}x {suggestion.weaponName}</span>
                          {suggestion.reason && <span className="text-slate-500">({suggestion.reason})</span>}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-amber-400">
                        ✓ These weapons are automatically pre-selected but can be changed
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          // Re-apply suggestions
                          const suggestedWeapons: {weapon: Weapon, quantity: number}[] = [];
                          
                          for (const suggestion of weaponSuggestions) {
                            const weaponData = weaponsData.find(w => w.name === suggestion.weaponName);
                            if (weaponData) {
                              const weapon: Weapon = {
                                ...weaponData,
                                type: weaponData.type as 'Simple' | 'Martial',
                                category: weaponData.category as 'Melee' | 'Ranged',
                                properties: weaponData.properties ? JSON.parse(weaponData.properties) : []
                              };
                              suggestedWeapons.push({ weapon, quantity: suggestion.quantity });
                            }
                          }
                          
                          setSelectedWeapons(suggestedWeapons);
                        }}
                        className="text-xs bg-amber-600 hover:bg-amber-700 text-white px-2 py-1 rounded transition-colors"
                      >
                        Reset to Suggestions
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Selected Weapons Summary */}
              {selectedWeapons.length > 0 && (
                <div className="bg-slate-600 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-white mb-2">
                    Selected Weapons ({selectedWeapons.reduce((sum, sw) => sum + sw.quantity, 0)}/3)
                  </h4>
                  <div className="space-y-1">
                    {selectedWeapons.map(({ weapon }) => (
                      <div key={weapon.name} className="text-sm text-slate-300">
                        • {weapon.name} ({weapon.damage} {weapon.damageType})
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim() || (needsSubclassAtCreation && !subclass) || (statMethod === 'pointbuy' && !pointBuyValidation.isValid)}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
            >
              {loading ? 'Creating...' : 'Create Character'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 