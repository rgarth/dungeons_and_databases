"use client";

import { useState, useEffect } from "react";
import { X, Dice6, RefreshCw } from "lucide-react";
import { toast } from 'react-hot-toast';
import { AbilityScore } from "@/lib/dnd/core";
import { generateFantasyName } from "@/lib/dnd/character";
import { Spell } from "@/lib/dnd/spells";
import { Weapon, Armor, Ammunition } from "@/lib/dnd/equipment";
import { WeaponSuggestion } from "@/lib/dnd/weapon-suggestions";
import { ArmorSuggestion } from "@/lib/dnd/armor-suggestions";
import { WeaponSelector } from "@/components/shared/WeaponSelector";
import { ArmorSelector } from "@/components/shared/ArmorSelector";
import { armorData } from '../../prisma/data/armor-data';
import { weaponsData } from '../../prisma/data/weapons-data';
import { Character } from "@/types/character";

import { 
  type StatMethod,
  CharacterCreationService
} from "@/services/character/creation";

import type { CharacterAvatarData } from '@/app/api/generate-avatar/route';
import Image from 'next/image';
import { useDndData } from '@/components/providers/dnd-data-provider';
import { BackgroundSelector, SelectedCharacteristics as BackgroundCharacteristics } from '@/components/shared/BackgroundSelector';
import { AvatarGenerator } from '@/components/shared/AvatarGenerator';
import { ABILITY_SCORES } from "@/lib/dnd/core";

interface CreateCharacterModalProps {
  onClose: () => void;
  onCharacterCreated?: (character: Character) => void;
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

interface Subclass {
  name: string;
  description?: string;
}

export function CreateCharacterModal({ onClose, onCharacterCreated }: CreateCharacterModalProps) {
  // Add missing state variables
  const [showWeaponSelector, setShowWeaponSelector] = useState(false);
  const [showArmorSelector, setShowArmorSelector] = useState(false);
  
  const [backgroundCharacteristics, setBackgroundCharacteristics] = useState<BackgroundCharacteristics>({
    personalityTraits: [],
    ideals: [],
    bonds: [],
    flaws: []
  });

  const { races, classes, backgrounds, alignments } = useDndData();
  const characterCreationService = CharacterCreationService.getInstance();

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
  const [generatingName, setGeneratingName] = useState(false);
  const [creationOptions, setCreationOptions] = useState<CreationOptions | null>(null);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [weaponSuggestions, setWeaponSuggestions] = useState<WeaponSuggestion[]>([]);
  const [armorSuggestions, setArmorSuggestions] = useState<ArmorSuggestion[]>([]);
  const [selectedArmor, setSelectedArmor] = useState<Armor[]>([]);

  // Cached suggestions for instant loading in modals
  const [cachedWeaponSuggestions, setCachedWeaponSuggestions] = useState<WeaponSuggestion[]>([]);
  const [cachedWeaponProficiencies, setCachedWeaponProficiencies] = useState<{ simple: boolean; martial: boolean; specific: string[] } | null>(null);
  const [cachedArmorProficiencies, setCachedArmorProficiencies] = useState<string[] | null>(null);
  const [cachedPhbDescription, setCachedPhbDescription] = useState<string | null>(null);

  // Creation step state
  const [currentStep, setCurrentStep] = useState<'basic' | 'background'>('basic');

  // Remove unused state
  const [tappedAbility, setTappedAbility] = useState<AbilityScore | undefined>(undefined);

  // Appearance field
  const [appearance, setAppearance] = useState<string>('');
  
  // Avatar state
  const [generatedFullBodyAvatar, setGeneratedFullBodyAvatar] = useState<string>('');

  // Set default values when data is loaded
  useEffect(() => {
    if (races?.length > 0 && !race) setRace(races[0].name);
    if (classes?.length > 0 && !characterClass) setCharacterClass(classes[0].name);
    if (backgrounds?.length > 0 && !background) {
      const folkHero = backgrounds.find(b => b.name === 'Folk Hero');
      setBackground(folkHero ? folkHero.name : backgrounds[0].name);
    }
    if (alignments?.length > 0 && !alignment) setAlignment('True Neutral');
    if (creationOptions && creationOptions.equipmentPacks && creationOptions.equipmentPacks.length > 0 && !selectedEquipmentPack) {
      const explorerPackIndex = creationOptions.equipmentPacks.findIndex(p => p.name === "Explorer's Pack");
      setSelectedEquipmentPack(explorerPackIndex >= 0 ? explorerPackIndex : 0);
    }
  }, [races, classes, backgrounds, alignments, creationOptions, race, characterClass, background, alignment, selectedEquipmentPack]);

  // Clear cached data when class changes
  useEffect(() => {
    setCachedWeaponSuggestions([]);
    setCachedWeaponProficiencies(null);
    setCachedArmorProficiencies(null);
    setCachedPhbDescription(null);
  }, [characterClass]);

  // Load creation options and proficiencies when class changes
  useEffect(() => {
    const loadCreationOptions = async () => {
      if (!characterClass) return; // Don't load if no class selected
      
      setLoadingOptions(true);
      try {
        const [options, weaponSuggestions, armorSuggestions, weaponProficiencies, armorProficiencies, classData] = await Promise.all([
          characterCreationService.getCreationOptions(characterClass),
          fetch(`/api/weapon-suggestions?className=${encodeURIComponent(characterClass)}`)
            .then(res => res.ok ? res.json() : [])
            .catch(() => []),
          fetch(`/api/armor-suggestions?className=${encodeURIComponent(characterClass)}`)
            .then(res => res.ok ? res.json() : [])
            .catch(() => []),
          fetch(`/api/class-proficiencies?className=${encodeURIComponent(characterClass)}`)
            .then(res => res.ok ? res.json() : { simple: false, martial: false, specific: [] })
            .catch(() => ({ simple: false, martial: false, specific: [] })),
          fetch(`/api/class-proficiencies?className=${encodeURIComponent(characterClass)}&includeArmor=true`)
            .then(res => res.ok ? res.json() : { armor: [] })
            .catch(() => ({ armor: [] })),
          fetch(`/api/classes/${encodeURIComponent(characterClass)}`)
            .then(res => res.ok ? res.json() : null)
            .catch(() => null)
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
        
        // Cache all the data for instant loading in modals
        setCachedWeaponSuggestions(weaponSuggestions);
        setCachedWeaponProficiencies(weaponProficiencies);
        setCachedArmorProficiencies(armorProficiencies.armor || []);
        setCachedPhbDescription(classData?.phbDescription || null);
        
        console.log('✅ SET STATE - Weapon suggestions for', characterClass, ':', weaponSuggestions);
        console.log('✅ SET STATE - Armor suggestions for', characterClass, ':', armorSuggestions);
        console.log('✅ CACHED - All suggestions and proficiencies for', characterClass);
      } catch (error) {
        console.error('Error loading creation options:', error);
      } finally {
        setLoadingOptions(false);
      }
    };

    loadCreationOptions();
  }, [characterClass, characterCreationService]);

  // Get creation options from state (with fallback)
  const { needsSubclassAtCreation = false, spellcasting = { ability: null, canCastAtLevel1: false, availableSpells: [], spellSlots: {} } } = creationOptions || {};

  // Initialize ability scores on mount
  useEffect(() => {
    const { scores, randomArray } = characterCreationService.generateAbilityScores(statMethod);
    setAbilityScores(scores);
    if (randomArray) {
      setRandomScoreArray(randomArray);
    }
  }, [characterCreationService, statMethod]);

  // Apply weapon suggestions when they're loaded
  useEffect(() => {
    console.log('🔫 WEAPON SUGGESTIONS EFFECT:', weaponSuggestions.length, 'suggestions');
    
    if (weaponSuggestions && weaponSuggestions.length > 0) {
      console.log('Processing weapon suggestions...');
      
      const suggestedWeapons: {weapon: Weapon, quantity: number}[] = [];
      
      weaponSuggestions.forEach((suggestion, index) => {
        console.log(`Processing weapon suggestion ${index}:`, suggestion);
        // Find the weapon in the weapons data
        const weaponData = weaponsData.find(w => w.name === suggestion.weaponName);
        if (weaponData) {
          const weapon: Weapon = {
            ...weaponData,
            type: weaponData.type as 'Simple' | 'Martial',
            category: weaponData.category as 'Melee' | 'Ranged',
            properties: weaponData.properties ? weaponData.properties.split(', ').filter(Boolean) : []
          };
          suggestedWeapons.push({ weapon, quantity: suggestion.quantity });
          console.log('Added weapon:', weapon.name, 'quantity:', suggestion.quantity);
        }
      });
      
      console.log('Setting selectedWeapons to:', suggestedWeapons);
      setSelectedWeapons(suggestedWeapons);
    } else {
      console.log('No weapon suggestions to process - clearing weapons');
      setSelectedWeapons([]);
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
    // Don't clear armor here - let armor suggestions effect handle it
    setSubclass("");
    console.log('RESET: Cleared weapons and subclass for class change to:', characterClass);
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

  const handleTap = (ability: AbilityScore) => {
    if (!tappedAbility) {
      // First tap - store the ability
      setTappedAbility(ability);
    } else if (tappedAbility !== ability) {
      // Second tap on different ability - swap them
      const newScores = characterCreationService.swapAbilityScores(abilityScores, tappedAbility, ability);
      setAbilityScores(newScores);
      setTappedAbility(undefined);
    } else {
      // Second tap on same ability - clear selection
      setTappedAbility(undefined);
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

  const handleCreateCharacter = async () => {
    if (isSubmitting) return; // Prevent multiple submissions
    
    setIsSubmitting(true);
    
    try {
      // Get equipment items from the selected pack
      const selectedPackItems = creationOptions?.equipmentPacks?.[selectedEquipmentPack]?.items || [];
      
      // Create character
      const characterData = {
        name,
        race,
        class: characterClass,
        subclass,
        background,
        alignment,
        gender,
        // Flatten ability scores to individual properties
        strength: abilityScores.strength,
        dexterity: abilityScores.dexterity,
        constitution: abilityScores.constitution,
        intelligence: abilityScores.intelligence,
        wisdom: abilityScores.wisdom,
        charisma: abilityScores.charisma,
        spellsKnown: selectedSpells,
        spellsPrepared: selectedSpells, // For level 1, known = prepared
        spellSlots: creationOptions?.spellcasting?.spellSlots || {},
        spellcastingAbility: creationOptions?.spellcasting?.ability || null,
        inventory: selectedPackItems, // Send equipment pack items
        weapons: selectedWeapons,
        armor: selectedArmor,
        ammunition: selectedAmmunition,
        // Currency will be calculated by the service based on equipment pack cost
        avatar: generatedFullBodyAvatar || undefined
      };

      console.log('🎯 CREATING CHARACTER WITH EQUIPMENT:');
      console.log('Selected Weapons:', selectedWeapons);
      console.log('Selected Armor:', selectedArmor);
      console.log('Selected Ammunition:', selectedAmmunition);
      console.log('Equipment Pack Items:', selectedPackItems);
      console.log('✅ Character creation data prepared successfully');

      const response = await fetch('/api/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(characterData)
      });

      if (!response.ok) {
        throw new Error('Failed to create character');
      }

      const createdCharacter = await response.json();
      
      // Show toast with gold roll details if "No Pack" was selected
      if (selectedEquipmentPack === -1 && createdCharacter.goldRollDetails) {
        toast.success(`🎲 Starting Gold Roll: ${createdCharacter.goldRollDetails}`, {
          duration: 6000,
          style: {
            background: '#1e293b',
            color: '#e2e8f0',
            border: '1px solid #475569'
          }
        });
      }
      
      // Notify parent component with the created character
      onCharacterCreated?.(createdCharacter);
      
      // Close modal after successful creation
      onClose();
    } catch (error) {
      console.error('Error creating character:', error);
      // Don't close modal on error - let user try again
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate derived values
  const pointBuyValidation = characterCreationService.validatePointBuy(abilityScores);
  const spellcastingStats = characterCreationService.calculateSpellcastingStats(characterClass, abilityScores);

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

  const handleNext = async () => {
    if (currentStep === 'basic') {
      // If no name is provided, generate one
      if (!name.trim()) {
        setGeneratingName(true);
        try {
          const generatedName = await generateFantasyName(race, gender || undefined);
          setName(generatedName);
        } catch (error) {
          console.error('Failed to generate name:', error);
        } finally {
          setGeneratingName(false);
        }
      }
      
      setCurrentStep('background');
      // Scroll the modal content to top
      const modalContent = document.querySelector('.modal-content');
      if (modalContent) {
        modalContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Restore getModifier function
  const getModifier = (score: number): string => {
    const modifier = Math.floor((score - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 pt-8 z-50">
      <div className="bg-slate-800 rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto modal-content">
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

        <form 
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // Only submit if we're on the background step and the submit button was clicked
            const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
            if (currentStep === 'background' && submitter?.getAttribute('type') === 'submit') {
              handleCreateCharacter();
            }
          }} 
          className="p-6 space-y-6"
        >
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
              </div>

              {/* Second row: Race | Class */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Race</label>
                  <select
                    value={race}
                    onChange={(e) => setRace(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-base text-white focus:border-purple-500 focus:outline-none appearance-none"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                  >
                    {races?.map((r) => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Class</label>
                  <select
                    value={characterClass}
                    onChange={(e) => setCharacterClass(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-base text-white focus:border-purple-500 focus:outline-none appearance-none"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                  >
                    {classes?.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
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
                    {alignments?.map((a) => (
                      <option key={a.id} value={a.name}>{a.name}</option>
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
                    >
                      <div className="text-sm font-medium text-slate-300 mb-2">{ability}</div>
                      <div className="text-2xl font-bold text-white">
                        {abilityScores[ability]}
                      </div>
                      <div className="text-xs text-slate-400">
                        {getModifier(abilityScores[ability])}
                      </div>
                      {(statMethod === 'rolling-assign' || statMethod === 'standard') && (
                        <div
                          onClick={() => handleTap(ability)}
                          className={`w-full text-center py-2 mt-auto text-xs text-slate-400 cursor-pointer bg-slate-600 rounded hover:bg-slate-500 transition-colors ${
                            tappedAbility === ability ? 'bg-slate-400' : ''
                          }`}
                        >
                          {tappedAbility === ability ? 'Tap another to swap' : 'Tap to select'}
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
                        key={String(spell.name)}
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
                        <option value={-1}>No Pack - Starting Gold</option>
                        {creationOptions?.equipmentPacks?.map((pack, index) => (
                          <option key={String(pack.id)} value={index}>
                            {pack.name} ({pack.cost})
                          </option>
                        )) || []}
                      </select>
                      
                      {/* Show selected pack details */}
                      {selectedEquipmentPack === -1 ? (
                        <div className="mt-2 p-3 bg-slate-700 rounded-lg">
                          <div className="text-sm text-slate-300 mb-2">
                            You will receive starting gold based on your background instead of an equipment pack.
                          </div>
                          <div className="text-xs text-slate-400">
                            <strong>Starting Gold:</strong> Varies by background (Noble: 25 gp, Hermit: 5 gp, etc.)
                          </div>
                        </div>
                      ) : creationOptions?.equipmentPacks?.[selectedEquipmentPack] && (
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
                        {selectedWeapons.map(({ weapon, quantity }: { weapon: Weapon; quantity: number }, index: number) => (
                          <div key={`${String(weapon.name)}-${index}`} className="text-sm text-slate-300">
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
                        {selectedArmor.map((armor: Armor, index: number) => (
                          <div key={`${armor.name}-${index}`} className="text-sm text-slate-300">
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
                            <Image
                              src={generatedFullBodyAvatar}
                              alt="Generated character avatar"
                              width={200}
                              height={200}
                              className="w-48 h-60 mx-auto rounded-lg border-2 border-purple-500 object-cover"
                              priority
                            />
                            <div className="text-center">
                              <button
                                type="button"
                                onClick={() => {
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
                onClick={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
                disabled={(needsSubclassAtCreation && !subclass) || (statMethod === 'pointbuy' && !pointBuyValidation.isValid)}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || !background}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isSubmitting
                    ? 'bg-slate-600 cursor-not-allowed'
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Character...
                  </div>
                ) : (
                  'Create Character'
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Weapon Selector Modal */}
      {showWeaponSelector && (
        <WeaponSelector
          title="Select Starting Weapons"
          selectedWeapons={selectedWeapons.map(sw => ({ weapon: sw.weapon, quantity: sw.quantity }))}
          onConfirm={(weapons) => {
            setSelectedWeapons(weapons);
            setShowWeaponSelector(false);
          }}
          onCancel={() => setShowWeaponSelector(false)}
          characterClass={characterClass}
          showSuggestions={true}
          cachedWeaponSuggestions={cachedWeaponSuggestions}
          cachedWeaponProficiencies={cachedWeaponProficiencies}
          cachedPhbDescription={cachedPhbDescription}
        />
      )}

      {/* Armor Selector Modal */}
      {showArmorSelector && (
        <ArmorSelector
          selectedArmor={selectedArmor}
          onConfirm={(armor) => {
            setSelectedArmor(armor);
            setShowArmorSelector(false);
          }}
          onCancel={() => setShowArmorSelector(false)}
          isOpen={showArmorSelector}
          characterClass={characterClass}
          showProficiencies={true}
          cachedArmorProficiencies={cachedArmorProficiencies}
        />
      )}
    </div>
  );
} 