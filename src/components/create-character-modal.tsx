"use client";

import { useState, useEffect } from "react";
import { X, Dice6, RefreshCw, Plus, Minus } from "lucide-react";
import { ABILITY_SCORES, AbilityScore } from "@/lib/dnd/core";
import { generateFantasyName } from "@/lib/dnd/character";
import { Spell } from "@/lib/dnd/spells";
import { Weapon, Armor, Ammunition } from "@/lib/dnd/equipment";
import { WeaponSuggestion } from "@/lib/dnd/weapon-suggestions";
import { ArmorSuggestion } from "@/lib/dnd/armor-suggestions";
import { WeaponSelector } from "./shared/WeaponSelector";
import { ArmorSelector } from "./shared/ArmorSelector";
import { weaponsData } from '../../prisma/data/weapons-data';
import { armorData } from '../../prisma/data/armor-data';

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

  // Database data
  const [races, setRaces] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [backgrounds, setBackgrounds] = useState<string[]>([]);
  const [alignments, setAlignments] = useState<string[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Basic character info
  const [name, setName] = useState("");
  const [race, setRace] = useState<string>("");
  const [characterClass, setCharacterClass] = useState<string>("");
  const [subclass, setSubclass] = useState<string>("");
  const [background, setBackground] = useState<string>("");
  const [alignment, setAlignment] = useState<string>("");
  const [gender, setGender] = useState<string>('');
  
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

  // Load D&D data from database on component mount
  useEffect(() => {
    const loadDndData = async () => {
      try {
        const [racesRes, classesRes, backgroundsRes, alignmentsRes] = await Promise.all([
          fetch('/api/races'),
          fetch('/api/classes'),
          fetch('/api/backgrounds'),
          fetch('/api/alignments')
        ]);

        const [racesData, classesData, backgroundsData, alignmentsData] = await Promise.all([
          racesRes.json(),
          classesRes.json(),
          backgroundsRes.json(),
          alignmentsRes.json()
        ]);

        const raceNames = racesData.map((race: any) => race.name);
        const classNames = classesData.map((cls: any) => cls.name);
        const backgroundNames = backgroundsData.map((bg: any) => bg.name);
        const alignmentNames = alignmentsData.map((align: any) => align.name);

        setRaces(raceNames);
        setClasses(classNames);
        setBackgrounds(backgroundNames);
        setAlignments(alignmentNames);

        // Set default values to first item from each array
        if (raceNames.length > 0 && !race) setRace(raceNames[0]);
        if (classNames.length > 0 && !characterClass) setCharacterClass(classNames[0]);
        if (backgroundNames.length > 0 && !background) setBackground(backgroundNames[0]);
        if (alignmentNames.length > 0 && !alignment) setAlignment(alignmentNames[0]);

        console.log('✅ Loaded D&D data from database:');
        console.log('- Races:', raceNames.length);
        console.log('- Classes:', classNames.length);
        console.log('- Backgrounds:', backgroundNames.length);
        console.log('- Alignments:', alignmentNames.length);

      } catch (error) {
        console.error('Failed to load D&D data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    loadDndData();
  }, []);

  // Load creation options and proficiencies when class changes
  useEffect(() => {
    const loadCreationOptions = async () => {
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
        console.log('🔥 RAW API RESPONSES:');
        console.log('weaponSuggestions response:', weaponSuggestions);
        console.log('armorSuggestions response:', armorSuggestions);
        
        setWeaponSuggestions(weaponSuggestions);
        setArmorSuggestions(armorSuggestions);
        
        console.log('✅ SET STATE - Weapon suggestions for', characterClass, ':', weaponSuggestions);
        console.log('✅ SET STATE - Armor suggestions for', characterClass, ':', armorSuggestions);
        
        // Temporary debug: Manually test armor suggestions for Ranger
        if (characterClass === 'Ranger') {
          console.log('RANGER DEBUG: Setting manual armor suggestions');
          const manualArmorSuggestions = [
            { armorName: 'Shield', reason: 'Backup protection' },
            { armorName: 'Studded Leather', reason: 'Starting light armor' }
          ];
          setArmorSuggestions(manualArmorSuggestions);
          console.log('RANGER DEBUG: Set manual armor suggestions:', manualArmorSuggestions);
        }
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
            properties: weaponData.properties ? JSON.parse(weaponData.properties) : []
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
                onChange={(e) => setRace(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {races.map((r) => (
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
                onChange={(e) => setCharacterClass(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {classes.map((c) => (
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
                onChange={(e) => setBackground(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {backgrounds.map((b) => (
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
                onChange={(e) => setAlignment(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {alignments.map((a) => (
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