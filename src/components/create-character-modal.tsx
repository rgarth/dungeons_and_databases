"use client";

import { useState, useEffect } from "react";
import { X, Dice6, Plus, Minus, RefreshCw } from "lucide-react";
import { ABILITY_SCORES, AbilityScore } from "@/lib/dnd/core";
import { Spell } from "@/lib/dnd/spells";
import { Weapon, Armor, Ammunition } from "@/lib/dnd/equipment";
import { WeaponSuggestion } from "@/lib/dnd/weapon-suggestions";
import { ArmorSuggestion } from "@/lib/dnd/armor-suggestions";
import { WeaponSelector } from "./shared/WeaponSelector";
import { ArmorSelector } from "./shared/ArmorSelector";
import { BackgroundSelector, type SelectedCharacteristics } from "./shared/BackgroundSelector";
import { AvatarGenerator } from './shared/AvatarGenerator';
import { weaponsData } from '../../prisma/data/weapons-data';
import { armorData } from '../../prisma/data/armor-data';
import { generateFantasyName } from "@/lib/dnd/character";

import { 
  type StatMethod, 
  type CharacterCreationData,
  CharacterCreationService
} from "@/services/character/creation";

import type { CharacterAvatarData } from '@/app/api/generate-avatar/route';
import { dndDataService } from '@/services/character/dnd-data';

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

  // Creation step state
  const [currentStep, setCurrentStep] = useState<'basic' | 'background'>('basic');

  // Database data with React Query
  const { data: races = [] } = dndDataService.useRaces();
  const { data: classes = [] } = dndDataService.useClasses();
  const { data: backgrounds = [] } = dndDataService.useBackgrounds();
  const { data: alignments = [] } = dndDataService.useAlignments();

  // Basic character info
  const [name, setName] = useState("");
  const [race, setRace] = useState<string>("");
  const [characterClass, setCharacterClass] = useState<string>("");
  const [subclass, setSubclass] = useState<string>("");
  const [background, setBackground] = useState<string>("");
  const [backgroundCharacteristics, setBackgroundCharacteristics] = useState<SelectedCharacteristics>({
    personalityTraits: [],
    ideals: [],
    bonds: [],
    flaws: []
  });
  const [alignment, setAlignment] = useState<string>("");
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<number | ''>('');
  
  // Ability scores
  const [statMethod, setStatMethod] = useState<StatMethod>('rolling-assign');
  const [abilityScores, setAbilityScores] = useState({} as Record<AbilityScore, number>);
  const [randomScoreArray, setRandomScoreArray] = useState<number[]>([]);
  
  // Equipment and spells
  const [selectedSpells, setSelectedSpells] = useState<Spell[]>([]);
  const [selectedWeapons, setSelectedWeapons] = useState<{weapon: Weapon, quantity: number}[]>([]);
  const [selectedAmmunition, setSelectedAmmunition] = useState<Ammunition[]>([]);
  const [selectedEquipmentPack, setSelectedEquipmentPack] = useState<number>(0);
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [generatingName, setGeneratingName] = useState(false);
  const [creationOptions, setCreationOptions] = useState<CreationOptions | null>(null);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const [weaponSuggestions, setWeaponSuggestions] = useState<WeaponSuggestion[]>([]);
  const [armorSuggestions, setArmorSuggestions] = useState<ArmorSuggestion[]>([]);

  const [selectedArmor, setSelectedArmor] = useState<Armor[]>([]);
  const [showWeaponSelector, setShowWeaponSelector] = useState(false);
  const [showArmorSelector, setShowArmorSelector] = useState(false);

  // Appearance field
  const [appearance, setAppearance] = useState<string>('');
  
  // Avatar state
  const [generatedAvatar, setGeneratedAvatar] = useState<string>('');
  const [generatedFullBodyAvatar, setGeneratedFullBodyAvatar] = useState<string>('');

  // Set default values when data is loaded
  useEffect(() => {
    if (races.length > 0 && !race) setRace(races[0]);
    if (classes.length > 0 && !characterClass) setCharacterClass(classes[0]);
    if (backgrounds.length > 0 && !background) setBackground(backgrounds[0]);
    if (alignments.length > 0 && !alignment) setAlignment(alignments[0]);
  }, [races, classes, backgrounds, alignments]);

  // Load creation options and proficiencies when class changes
  useEffect(() => {
    const loadCreationOptions = async () => {
      if (!characterClass) return; // Don't load if no class selected
      
      setLoadingOptions(true);
      try {
        const [options, weaponSuggestions, armorSuggestions] = await Promise.all([
          characterCreationService.getCreationOptions(characterClass),
          fetch(`/api/weapon-suggestions?className=${encodeURIComponent(characterClass)}`)
            .then(res => res.ok ? res.json() : [])
            .catch(() => []),
          fetch(`/api/armor-suggestions?className=${encodeURIComponent(characterClass)}`)
            .then(res => res.ok ? res.json() : [])
            .catch(() => [])
        ]);
        
        setCreationOptions({
          ...options,
          subclasses: (options as Partial<CreationOptions>).subclasses || [],
          needsSubclassAtCreation: (options as Partial<CreationOptions>).needsSubclassAtCreation || false,
          spellcasting: (options as Partial<CreationOptions>).spellcasting || { 
            ability: null, 
            canCastAtLevel1: false, 
            availableSpells: [], 
            spellSlots: {} 
          }
        });
        
        setWeaponSuggestions(weaponSuggestions);
        setArmorSuggestions(armorSuggestions);
        
        console.log('✅ SET STATE - Weapon suggestions for', characterClass, ':', weaponSuggestions);
        console.log('✅ SET STATE - Armor suggestions for', characterClass, ':', armorSuggestions);
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

        setWeaponSuggestions([]);
        setArmorSuggestions([]);
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
    console.log('🔫 WEAPON SUGGESTIONS EFFECT:', weaponSuggestions.length, 'suggestions');
    if (weaponSuggestions.length > 0) {
      console.log('Processing weapon suggestions:', weaponSuggestions);
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
            properties: weaponData.properties ? weaponData.properties.split(',').map(p => p.trim()).filter(Boolean) : []
          };
          suggestedWeapons.push({ weapon, quantity: suggestion.quantity });
        }
      }
      
      console.log('Final suggestedWeapons:', suggestedWeapons);
      setSelectedWeapons(suggestedWeapons);
      console.log('✅ Set selectedWeapons');
    } else {
      console.log('No weapon suggestions to process');
    }
  }, [weaponSuggestions]);

  // Apply armor suggestions when they're loaded
  useEffect(() => {
    console.log('=== ARMOR SUGGESTIONS EFFECT ===');
    console.log('armorSuggestions:', armorSuggestions);
    console.log('armorSuggestions.length:', armorSuggestions.length);
    
    const suggestedArmor: Armor[] = [];
    
    if (armorSuggestions && armorSuggestions.length > 0) {
      console.log('Processing armor suggestions...');
      
      armorSuggestions.forEach((suggestion, index) => {
        console.log(`Processing suggestion ${index}:`, suggestion);
        const armor = armorData.find(a => a.name === suggestion.armorName);
        console.log('Found armor:', armor);
        
        if (armor) {
          const processedArmor = {
            ...armor,
            type: armor.type as 'Light' | 'Medium' | 'Heavy' | 'Shield',
            maxDexBonus: armor.maxDexBonus ?? undefined,
            minStrength: armor.minStrength ?? undefined
          };
          suggestedArmor.push(processedArmor);
          console.log('Added armor:', processedArmor.name);
        }
      });
    } else {
      console.log('No armor suggestions to process - clearing armor');
    }
    
    console.log('Setting selectedArmor to:', suggestedArmor);
    setSelectedArmor(suggestedArmor);
  }, [armorSuggestions]);

  // Automatically add ammunition for ranged weapons
  useEffect(() => {
    console.log('🏹 AUTO-AMMUNITION EFFECT: Processing', selectedWeapons.length, 'selected weapons');
    
    const autoAmmunition: Ammunition[] = [];
    const processedAmmoTypes = new Set<string>();
    
    // Process each selected weapon to find ammunition needs
    for (const weaponSelection of selectedWeapons) {
      const weapon = weaponSelection.weapon;
      
      // Check if weapon needs ammunition
      // Check if weapon needs ammunition (look for properties that start with "Ammunition")
      const hasAmmunitionProperty = weapon.properties.some(prop => prop.startsWith('Ammunition'));
      
      console.log(`🔍 AMMO CHECK: ${weapon.name} - properties: ${JSON.stringify(weapon.properties)}, hasAmmunition: ${hasAmmunitionProperty}`);
      
      if (hasAmmunitionProperty) {
        let ammoType: string;
        let quantity = 20; // Default D&D 5e starting quantity
        
        // Determine ammunition type based on weapon name
        if (weapon.name.toLowerCase().includes('crossbow')) {
          ammoType = 'Crossbow Bolt';
        } else if (weapon.name.toLowerCase().includes('blowgun')) {
          ammoType = 'Blowgun Needle';
          quantity = 50; // Blowgun needles come in packs of 50
        } else if (weapon.name.toLowerCase().includes('sling')) {
          ammoType = 'Sling Bullet';
        } else {
          // Default to arrows for bows
          ammoType = 'Arrow';
        }
        
        // Only add each ammo type once
        if (!processedAmmoTypes.has(ammoType)) {
          processedAmmoTypes.add(ammoType);
          
          const ammo: Ammunition = {
            name: ammoType,
            quantity: quantity,
            compatibleWeapons: ammoType === 'Arrow' ? ['Longbow', 'Shortbow'] :
                             ammoType === 'Crossbow Bolt' ? ['Light Crossbow', 'Heavy Crossbow', 'Hand Crossbow'] :
                             ammoType === 'Blowgun Needle' ? ['Blowgun'] :
                             ammoType === 'Sling Bullet' ? ['Sling'] : [],
            weight: ammoType === 'Arrow' ? 0.05 : 
                   ammoType === 'Crossbow Bolt' ? 0.075 :
                   ammoType === 'Blowgun Needle' ? 0.02 : 0.075,
            cost: ammoType === 'Blowgun Needle' || ammoType === 'Sling Bullet' ? '2 cp each' : '5 cp each'
          };
          
          autoAmmunition.push(ammo);
          console.log(`✅ Auto-added ${quantity} ${ammoType}s for ${weapon.name}`);
        }
      }
    }
    
    console.log('Final auto-ammunition:', autoAmmunition);
    setSelectedAmmunition(autoAmmunition);
    
    if (autoAmmunition.length > 0) {
      console.log('✅ Set selectedAmmunition with auto-generated ammunition');
    } else {
      console.log('No ranged weapons need ammunition');
    }
  }, [selectedWeapons]);

  // Reset weapon and armor selections when class changes
  useEffect(() => {
    // Reset selections when class changes (suggestions will be applied by the above effects)
    setSelectedWeapons([]);
    setSelectedAmmunition([]);
    // Don't clear armor here - let armor suggestions effect handle it
    setSubclass("");
    console.log('RESET: Cleared weapons, ammunition and subclass for class change to:', characterClass);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only create character if we're on the background step
    if (currentStep !== 'background') {
      return;
    }
    
    if (!name.trim()) return;

    // Validate required subclass selection
    if (needsSubclassAtCreation && !subclass) {
      alert(`Please select a ${characterClass} subclass.`);
      return;
    }

    setLoading(true);
    try {
      console.log('🚀 CREATING CHARACTER WITH DATA:');
      console.log('selectedWeapons:', selectedWeapons);
      console.log('selectedArmor:', selectedArmor);
      console.log('selectedAmmunition:', selectedAmmunition);
      
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
        selectedArmor,
        selectedAmmunition,
        selectedSpells
      };

      const characterData = await characterCreationService.createCharacter(creationData);
      
      // Add background characteristics, avatar, gender and age to the character data
      const characterDataWithBackground = {
        ...characterData,
        backgroundCharacteristics,
        avatar: generatedAvatar || undefined,
        fullBodyAvatar: generatedFullBodyAvatar || undefined,
        gender: gender.trim() || undefined,
        age: age.toString().trim() ? parseInt(age.toString().trim()) : undefined
      };
      
      const response = await fetch("/api/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(characterDataWithBackground),
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

  // Ensure age is handled correctly without trimming
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAge(value === '' ? '' : Number(value));
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
          {/* Step indicator */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 'basic' ? 'bg-purple-600 text-white' : 'bg-slate-600 text-slate-300'}`}>
                1
              </div>
              <div className="w-16 h-1 bg-slate-600 rounded"></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 'background' ? 'bg-purple-600 text-white' : 'bg-slate-600 text-slate-300'}`}>
                2
              </div>
            </div>
          </div>

          {currentStep === 'basic' && (
            <>
              {/* First row: Name and Age */}
              <div className="flex items-end gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                      placeholder="Character Name"
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
                <div style={{ minWidth: 60 }}>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={handleAgeChange}
                    className="w-20 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                    placeholder="Age"
                  />
                </div>
              </div>

              {/* Second row: Race | Class */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Race</label>
                  <select
                    value={race}
                    onChange={(e) => setRace(e.target.value as typeof races[number])}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-base text-white focus:border-purple-500 focus:outline-none appearance-none"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                  >
                    {races.map((r: string) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Class</label>
                  <select
                    value={characterClass}
                    onChange={(e) => setCharacterClass(e.target.value as typeof classes[number])}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-base text-white focus:border-purple-500 focus:outline-none appearance-none"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                  >
                    {classes.map((c: string) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Third row: Alignment | Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Alignment</label>
                  <select
                    value={alignment}
                    onChange={(e) => setAlignment(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-base text-white focus:border-purple-500 focus:outline-none appearance-none"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                  >
                    {alignments.map((a: string) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Gender (for name generation)</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-base text-white focus:border-purple-500 focus:outline-none appearance-none"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                  >
                    <option value="">Not specified</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Ability Scores */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <h3 className="text-lg font-semibold text-white">Ability Scores</h3>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                      value={statMethod}
                      onChange={(e) => handleStatMethodChange(e.target.value as StatMethod)}
                      className="flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm focus:border-purple-500 focus:outline-none"
                    >
                      <option value="rolling-assign">Roll & Assign</option>
                      <option value="standard">Standard Array</option>
                      <option value="pointbuy">Point Buy</option>
                    </select>
                    <button
                      type="button"
                      onClick={handleGenerateStats}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors whitespace-nowrap"
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

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {ABILITY_SCORES.map((ability) => (
                    <div
                      key={ability}
                      className="bg-slate-700 rounded-lg p-3 flex flex-col items-center"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, ability)}
                    >
                      <div className="text-sm font-medium text-slate-300 mb-2">{ability}</div>
                      <div className="text-2xl font-bold text-white mb-2">{abilityScores[ability] || 10}</div>
                      
                      {statMethod === 'pointbuy' && (
                        <div className="flex items-center justify-center gap-2 mt-auto">
                          <button
                            type="button"
                            onClick={() => handlePointBuyChange(ability, -1)}
                            className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded-full flex items-center justify-center text-white text-sm"
                            disabled={(abilityScores[ability] || 10) <= 8}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePointBuyChange(ability, 1)}
                            className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded-full flex items-center justify-center text-white text-sm"
                            disabled={(abilityScores[ability] || 10) >= 15}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      )}

                      {(statMethod === 'rolling-assign' || statMethod === 'standard') && (
                        <div
                          draggable
                          onDragStart={(e) => handleDragStart(e, ability)}
                          className="w-full text-center py-2 mt-auto text-xs text-slate-400 cursor-move bg-slate-600 rounded hover:bg-slate-500 transition-colors"
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
                  
                  <button
                    type="button"
                    onClick={() => setShowWeaponSelector(true)}
                    className="w-full p-3 bg-slate-700 hover:bg-slate-600 rounded-lg border border-slate-600 text-left transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-white mb-1">Select Weapons</div>
                        <div className="text-xs text-slate-400">
                          {selectedWeapons.length > 0 
                            ? `${selectedWeapons.reduce((sum, sw) => sum + sw.quantity, 0)} weapons selected`
                            : 'Click to choose starting weapons'
                          }
                        </div>
                      </div>
                      <div className="text-slate-400">→</div>
                    </div>
                  </button>

                  {/* Selected Weapons Summary */}
                  {selectedWeapons.length > 0 && (
                    <div className="mt-3 bg-slate-600 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-white mb-2">
                        Selected Weapons ({selectedWeapons.reduce((sum, sw) => sum + sw.quantity, 0)})
                      </h4>
                      <div className="space-y-1">
                        {selectedWeapons.map(({ weapon, quantity }) => (
                          <div key={weapon.name} className="text-sm text-slate-300">
                            • {quantity}x {weapon.name} ({weapon.damage} {weapon.damageType})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Starting Armor
                  </label>
                  
                  <button
                    type="button"
                    onClick={() => setShowArmorSelector(true)}
                    className="w-full p-3 bg-slate-700 hover:bg-slate-600 rounded-lg border border-slate-600 text-left transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-white mb-1">Select Armor</div>
                        <div className="text-xs text-slate-400">
                          {selectedArmor.length > 0 
                            ? `${selectedArmor.length} armor pieces selected`
                            : 'Click to choose starting armor'
                          }
                        </div>
                      </div>
                      <div className="text-slate-400">→</div>
                    </div>
                  </button>

                  {/* Selected Armor Summary */}
                  {selectedArmor.length > 0 && (
                    <div className="mt-3 bg-slate-600 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-white mb-2">
                        Selected Armor ({selectedArmor.length})
                      </h4>
                      <div className="space-y-1">
                        {selectedArmor.map((armor) => (
                          <div key={armor.name} className="text-sm text-slate-300">
                            • {armor.name} (AC {armor.baseAC}{armor.maxDexBonus !== null ? ` + Dex (max ${armor.maxDexBonus})` : ' + Dex'})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {currentStep === 'background' && (
            <>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Select Your Background</h3>
                  <BackgroundSelector
                    selectedBackground={background}
                    selectedCharacteristics={backgroundCharacteristics}
                    onBackgroundChange={setBackground}
                    onCharacteristicsChange={setBackgroundCharacteristics}
                    showCharacteristics={true}
                    showFullDetails={true}
                    compact={false}
                    title="Background"
                  />
                </div>

                {/* Avatar Generator */}
                <div className="border-t border-slate-700 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Generate Avatar (Optional)</h3>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <p className="text-slate-300 text-sm mb-4">
                      Create a personalized AI-generated avatar based on your character&apos;s traits, equipment, and background.
                      <br />
                      <span className="text-slate-400 text-xs">
                        💡 Add custom appearance below, or leave blank for diverse, realistic features (fights AI bias toward young/white/thin).
                      </span>
                    </p>
                    
                    {/* Appearance Field */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Appearance (Optional)
                      </label>
                      <textarea
                        placeholder="Describe physical features, scars, distinctive marks, etc. Leave blank for AI to create diverse, realistic appearance."
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none text-sm"
                        rows={2}
                        value={appearance || ''}
                        onChange={(e) => setAppearance(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left: Avatar Preview */}
                      <div className="space-y-3">
                        <h4 className="text-white font-medium">Avatar Preview</h4>
                        {generatedFullBodyAvatar ? (
                          <div className="space-y-3">
                            <img
                              src={generatedFullBodyAvatar}
                              alt="Generated character avatar"
                              className="w-48 h-60 mx-auto rounded-lg border-2 border-purple-500 object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <div className="text-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setGeneratedAvatar('');
                                  setGeneratedFullBodyAvatar('');
                                }}
                                className="text-red-400 hover:text-red-300 text-sm transition-colors"
                              >
                                Remove Avatar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-48 h-60 mx-auto rounded-lg border-2 border-dashed border-slate-500 flex flex-col items-center justify-center text-slate-400">
                            <div className="text-4xl mb-2">🎨</div>
                            <span className="text-sm text-center">No avatar generated<br />Click generate below</span>
                          </div>
                        )}
                      </div>

                      {/* Right: Avatar Generation */}
                      <div className="space-y-4">
                        <h4 className="text-white font-medium">Generate AI Avatar</h4>
                        <AvatarGenerator
                          characterData={{
                            race,
                            class: characterClass,
                            gender: gender || 'Male', // Use selected gender or default
                            alignment,
                            background,
                            personalityTraits: backgroundCharacteristics?.personalityTraits || [],
                            ideals: backgroundCharacteristics?.ideals || [],
                            bonds: backgroundCharacteristics?.bonds || [],
                            flaws: backgroundCharacteristics?.flaws || [],
                            appearance: appearance || '',
                            equippedWeapons: selectedWeapons.map(sw => sw.weapon.name),
                            equippedArmor: selectedArmor.map(armor => armor.name)
                          } as CharacterAvatarData}
                          onAvatarGenerated={(avatarDataUrl, fullBodyDataUrl) => {
                            // Store the generated avatar for character creation
                            setGeneratedAvatar(avatarDataUrl);
                            setGeneratedFullBodyAvatar(fullBodyDataUrl || avatarDataUrl);
                            console.log('🎨 Avatar generated and stored for character creation');
                          }}
                          disabled={!race || !characterClass || !background}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Submit */}
          <div className="flex justify-end gap-4 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={currentStep === 'basic' ? onClose : () => setCurrentStep('basic')}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              {currentStep === 'basic' ? 'Cancel' : 'Back'}
            </button>
            {currentStep === 'basic' ? (
              <button
                type="button"
                onClick={() => {
                  console.log('🎯 NEXT BUTTON CLICKED - Moving to background step');
                  setCurrentStep('background');
                }}
                disabled={!name.trim() || (needsSubclassAtCreation && !subclass) || (statMethod === 'pointbuy' && !pointBuyValidation.isValid)}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !background}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
              >
                {loading ? 'Creating...' : 'Create Character'}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Weapon Selector Modal */}
      {showWeaponSelector && (
        <WeaponSelector
          title="Select Starting Weapons"
          maxWeapons={5}
          selectedWeapons={selectedWeapons.map(sw => ({ weapon: sw.weapon, quantity: sw.quantity }))}
          onConfirm={(weapons) => {
            setSelectedWeapons(weapons);
            setShowWeaponSelector(false);
          }}
          onCancel={() => setShowWeaponSelector(false)}
          characterClass={characterClass}
          showSuggestions={true}
          multiSelect={true}
        />
      )}

      {/* Armor Selector Modal */}
      {showArmorSelector && (
        <ArmorSelector
          selectedArmor={selectedArmor}
          onArmorSelectionChange={(armor) => setSelectedArmor(armor)}
          onClose={() => setShowArmorSelector(false)}
          isOpen={showArmorSelector}
          characterClass={characterClass}
          showProficiencies={true}
        />
      )}
    </div>
  );
} 