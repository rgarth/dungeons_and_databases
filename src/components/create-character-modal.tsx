"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { X, Dice6, RefreshCw } from "lucide-react";
import { toast } from 'react-hot-toast';
import { AbilityScore, ABILITY_SCORES, POINT_BUY_COSTS } from "@/lib/dnd/core";
import { generateFantasyName } from "@/lib/dnd/character";
import { Spell } from "@/lib/dnd/spells";
import { Weapon, Armor, Ammunition } from "@/lib/dnd/equipment";
import { WeaponSuggestion } from "@/lib/dnd/weapon-suggestions";
import { ArmorSuggestion } from "@/lib/dnd/armor-suggestions";
import { WeaponSelector } from "@/components/shared/WeaponSelector";
import { ArmorSelector } from "@/components/shared/ArmorSelector";
import { RaceTraitsCollapsible } from "@/components/shared/RaceTraitsCollapsible";
import { SubraceTraitsCollapsible } from "@/components/shared/SubraceTraitsCollapsible";
import { Character } from "@/types/character";






import { 
  type StatMethod,
  CharacterCreationService
} from "@/services/character/creation";

import type { CharacterAvatarData } from '@/types/character';
import Image from 'next/image';
import { useDndData } from '@/components/providers/dnd-data-provider';
import { BackgroundSelector, SelectedCharacteristics as BackgroundCharacteristics } from '@/components/shared/BackgroundSelector';
import { AvatarGenerator } from '@/components/shared/AvatarGenerator';
import { clientCache } from "@/lib/client-cache";
import { useCharacterMutations } from '@/hooks/use-character-mutations';

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
  
  // Get weapons and armor from client cache
  const [allWeapons, setAllWeapons] = useState<Weapon[]>([]);
  const [allArmor, setAllArmor] = useState<Armor[]>([]);
  
  // Type for client cache

  // Load weapons and armor from client cache on component mount
  useEffect(() => {
    const loadWeaponsAndArmor = async () => {
      try {
        await clientCache.initialize();
        const weapons = clientCache.getWeapons();
        const armor = clientCache.getArmor();
        console.log('🔧 Loading weapons and armor from client cache:', {
          weaponsLength: weapons.length,
          armorLength: armor.length
        });
        setAllWeapons(weapons);
        setAllArmor(armor);
      } catch (error) {
        console.error('❌ Failed to load weapons and armor from client cache:', error);
      }
    };

    loadWeaponsAndArmor();
  }, []);

  const characterCreationService = CharacterCreationService.getInstance();

  // Basic character info
  const [name, setName] = useState("");
  const [race, setRace] = useState<string>("");
  const [subrace, setSubrace] = useState<string | null>("");
  const [characterClass, setCharacterClass] = useState<string>("");
  const [subclass, setSubclass] = useState<string>("");
  const [background, setBackground] = useState<string>("");
  const [alignment, setAlignment] = useState<string>("");
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<number | undefined>(undefined);
  
  // Ability scores
  const [statMethod, setStatMethod] = useState<StatMethod>('rolling-assign');
  const [abilityScores, setAbilityScores] = useState({} as Record<AbilityScore, number>);
  const [randomScoreArray, setRandomScoreArray] = useState<number[]>([]);
  const [racialAbilityIncreases, setRacialAbilityIncreases] = useState<Record<string, number>>({});
  const [subraces, setSubraces] = useState<{ name: string }[]>([]);

  
  // Equipment and spells
  const [selectedSpells, setSelectedSpells] = useState<Spell[]>([]);
  const [selectedWeapons, setSelectedWeapons] = useState<{weapon: Weapon, quantity: number}[]>([]);
  const [selectedAmmunition, setSelectedAmmunition] = useState<Ammunition[]>([]);
  const [selectedEquipmentPack, setSelectedEquipmentPack] = useState<number>(-1); // Default to no pack
  
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
  const [cachedArmorProficiencies, setCachedArmorProficiencies] = useState<string[]>([]);
  const [cachedSpells, setCachedSpells] = useState<Record<string, Spell[]>>({});
  const [cachedSpellLimits, setCachedSpellLimits] = useState<Record<string, {
    cantripsKnown: number;
    spellsKnown: number;
    spellcastingType: string;
    maxSpellLevel: number;
    spellLevelLimits: Record<string, number>;
  }>>({});

  // Creation step state
  const [currentStep, setCurrentStep] = useState<'basic' | 'background'>('basic');

  // Remove unused state
  const [tappedAbility, setTappedAbility] = useState<AbilityScore | undefined>(undefined);

  // Appearance field
  const [appearance, setAppearance] = useState<string>('');
  
  // Avatar state
  const [generatedFullBodyAvatar, setGeneratedFullBodyAvatar] = useState<string>('');

  // Gold calculation state
  const [calculatedGold, setCalculatedGold] = useState<number>(0);
  const [goldRollDetails, setGoldRollDetails] = useState<string>('');

  // Avatar mutations
  const { updateAvatar } = useCharacterMutations();

  // Cache for class starting gold formulas
  // const classFormulaCache = useRef<Map<string, { formula: string; timestamp: number }>>(new Map());
  // const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  // Cache all class data at modal load for instant class switching
  const [allClassData, setAllClassData] = useState<Record<string, {
    weaponSuggestions: WeaponSuggestion[];
    armorSuggestions: ArmorSuggestion[];
    weaponProficiencies: { simple: boolean; martial: boolean; specific: string[] };
    armorProficiencies: string[];
    spellLimits: {
      cantripsKnown: number;
      spellsKnown: number;
      spellcastingType: string;
      maxSpellLevel: number;
      spellLevelLimits: Record<string, number>;
    } | null;
    // Add background data caching
    backgroundData?: {
      startingGold: number;
      startingGoldFormula?: string | null;
    };
  }>>({});
  const [isLoadingAllClassData, setIsLoadingAllClassData] = useState(false);

  // Cache all subrace data at modal load for instant race switching
  // const [allSubraceData, setAllSubraceData] = useState<Record<string, Subrace[]>>({});
  // const [isLoadingAllSubraceData, setIsLoadingAllSubraceData] = useState(false);

  // Use the cached gold calculation
  // const { data: goldData } = useGoldCalculation(characterClass, background, selectedEquipmentPack);

  // Handler to clear subrace when race changes
  const handleRaceChange = (newRace: string) => {
    setRace(newRace);
    setSubrace(null); // Clear subrace when race changes
    setRacialAbilityIncreases({}); // Clear racial ability increases when race changes
    
    // Load subraces for the new race
    const loadSubraces = async () => {
      try {
        const response = await fetch(`/api/subraces?race=${encodeURIComponent(newRace)}`);
        if (response.ok) {
          const data = await response.json();
          setSubraces(data);
        } else {
          setSubraces([]);
        }
      } catch (error) {
        console.error('Error loading subraces:', error);
        setSubraces([]);
      }
    };
    
    loadSubraces();
  };

  // Handler to clear subclass when class changes
  const handleClassChange = (newClass: string) => {
    setCharacterClass(newClass);
    setSubclass(""); // Clear subclass when class changes
    setSelectedSpells([]); // Clear selected spells when class changes

    
    // Auto-select all 1st-level spells for prepared spellcasters
    setTimeout(() => {
      const limits = getCachedSpellLimits(newClass, 1);
      if (limits?.spellcastingType === 'prepared' && limits.spellsKnown === 0 && creationOptions?.spellcasting?.availableSpells) {
        const firstLevelSpells = creationOptions.spellcasting.availableSpells.filter(spell => spell.level === 1);
        setSelectedSpells(firstLevelSpells);
      }
    }, 100); // Small delay to ensure spellcasting data is loaded
  };

  // Add debug logging for re-renders
  console.log('🔄 CreateCharacterModal RENDER - characterClass:', characterClass, 'currentStep:', currentStep);

  // Fetch class starting gold formula when class changes
  useEffect(() => {
    console.log('🟢 useEffect: Checking cached class data for', characterClass);
    
    // Check if we already have the class data in cache
    if (allClassData[characterClass]) {
      console.log('⚡ Using cached class data for', characterClass);
      return;
    }
    
    // Only fetch if we don't have it cached and we're not already loading all class data
    if (characterClass && !isLoadingAllClassData) {
      console.log('📡 Fetching individual class data for', characterClass);
      const fetchClassFormula = async () => {
        try {
          const classResponse = await fetch(`/api/classes/${encodeURIComponent(characterClass)}`);
          if (classResponse.ok) {
            const classData = await classResponse.json();
            if (classData.startingGoldFormula) {
              // Store in allClassData cache for instant access
              setAllClassData(prev => ({
                ...prev,
                [characterClass]: {
                  ...prev[characterClass],
                  startingGoldFormula: classData.startingGoldFormula
                }
              }));
            }
          }
        } catch (error) {
          console.warn('Error fetching class starting gold formula:', error);
        }
      };

      fetchClassFormula();
    }
  }, [characterClass, allClassData, isLoadingAllClassData]);

  // Fetch and cache spell limits when class changes
  useEffect(() => {
    console.log('🟢 useEffect: Checking cached spell limits for', characterClass);
    
    // Check if we already have the spell limits in cache
    if (allClassData[characterClass]?.spellLimits) {
      console.log('⚡ Using cached spell limits for', characterClass);
      return;
    }
    
    // Cache key for level 1 spell limits
    const cacheKey = `${characterClass}-1`;
    
    // Check if already cached in spell limits cache
    if (cachedSpellLimits[cacheKey]) {
      console.log('⚡ Using cached spell limits for', characterClass);
      return;
    }

    // Try to get spell limits from client cache first
    // (remove loadWeaponsAndArmor definition from here)
    // Only fetch if we don't have it cached and we're not already loading all class data
    if (characterClass && !isLoadingAllClassData) {
      console.log('📡 Fetching individual spell limits for', characterClass);
      const fetchSpellLimits = async () => {
        try {
          const response = await fetch(`/api/classes/${encodeURIComponent(characterClass)}/spell-limits?level=1`);
          if (response.ok) {
            const limits = await response.json();
            setCachedSpellLimits(prev => ({
              ...prev,
              [cacheKey]: limits
            }));
            console.log('✅ Cached spell limits for', characterClass, ':', limits);
          }
        } catch (error) {
          console.warn('Error fetching spell limits:', error);
        }
      };

      fetchSpellLimits();
    }
  }, [characterClass, allClassData, cachedSpellLimits, isLoadingAllClassData]); // Added dependencies to prevent unnecessary fetches

  // Helper function to get cached spell limits
  // Available for use in spell selection validation and UI display
  // Example usage: const limits = getCachedSpellLimits('Wizard', 1);
  const getCachedSpellLimits = (className: string, level: number = 1) => {
    const cacheKey = `${className}-${level}`;
    const limits = cachedSpellLimits[cacheKey];
    if (limits) {
      console.log('⚡ Retrieved cached spell limits for', className, 'level', level, ':', limits);
    }
    return limits;
  };

  // Log when spell limits cache is updated
  useEffect(() => {
    if (Object.keys(cachedSpellLimits).length > 0) {
      console.log('📊 Spell limits cache updated:', Object.keys(cachedSpellLimits));
    }
  }, [cachedSpellLimits]);

  // Update gold calculation to use cached data
  useEffect(() => {
    if (!characterClass || !background) return;

    const calculateGold = async () => {
      try {
        // Get background data from backgrounds API
        let backgroundData = null;
        const backgroundResponse = await fetch('/api/backgrounds');
        if (backgroundResponse.ok) {
          const backgrounds = await backgroundResponse.json();
          backgroundData = backgrounds.find((bg: { name: string; startingGold?: number; startingGoldFormula?: string }) => bg.name === background);
        }

        // Calculate gold based on equipment pack selection
        let totalGold = 0;
        let rollDetails = '';
        
        if (selectedEquipmentPack === -1) {
          // No equipment pack selected - roll for gold using CLASS startingGoldFormula
          try {
            const classResponse = await fetch(`/api/classes/${encodeURIComponent(characterClass)}`);
            if (classResponse.ok) {
              const classData = await classResponse.json();
              if (classData?.startingGoldFormula) {
                const match = classData.startingGoldFormula.match(/(\d+)d(\d+)(\*\d+)?/);
                if (match) {
                  const numDice = parseInt(match[1], 10);
                  const dieSize = parseInt(match[2], 10);
                  const multiplier = match[3] ? parseInt(match[3].substring(1), 10) : 1;
                  
                  const rolls: number[] = [];
                  let totalRoll = 0;
                  for (let i = 0; i < numDice; i++) {
                    const roll = Math.floor(Math.random() * dieSize) + 1;
                    rolls.push(roll);
                    totalRoll += roll;
                  }
                  totalGold = totalRoll * multiplier;
                  rollDetails = `${characterClass} ${numDice}d${dieSize}${multiplier > 1 ? `×${multiplier}` : ''} [${rolls.join(', ')}] = ${totalGold} gp`;
                }
              }
            }
          } catch (error) {
            console.warn('Failed to fetch class starting gold formula:', error);
          }
          
          // Fallback to background gold if class formula not available
          if (totalGold === 0) {
            totalGold = backgroundData?.startingGold || 0;
            rollDetails = `Fallback to background: ${totalGold} gp`;
          }
        } else {
          // Equipment pack selected - use background's startingGold (not the pack's cost)
          // The equipment pack items are provided for free, but you still get the background's gold
          totalGold = backgroundData?.startingGold || 0;
          rollDetails = `Background gold: ${totalGold} gp (equipment pack items included)`;
        }

        console.log(`💰 Gold calculation: ${rollDetails} (total: ${totalGold} gp)`);
        setCalculatedGold(totalGold);
        setGoldRollDetails(rollDetails);
      } catch (error) {
        console.error('Error calculating gold:', error);
      }
    };

    calculateGold();
  }, [characterClass, background, selectedEquipmentPack]);

  // Set default values when data is loaded
  useEffect(() => {
    if (races?.length > 0 && !race) handleRaceChange(races[0].name);
    if (backgrounds?.length > 0 && !background) {
      const folkHero = backgrounds.find(b => b.name === 'Folk Hero');
      setBackground(folkHero ? folkHero.name : backgrounds[0].name);
    }
    if (alignments?.length > 0 && !alignment) setAlignment('True Neutral');
  }, [races, backgrounds, alignments, race, background, alignment]);

  // Load creation options when class changes
  useEffect(() => {
    console.log('🎯 useEffect triggered for characterClass:', characterClass);
    
    const loadCreationOptions = async () => {
      if (!characterClass) return; // Don't load if no class selected
      
      // Check if we have all class data cached
      const cachedClassData = allClassData[characterClass];
      
      if (cachedClassData) {
        console.log('⚡ Using cached class data for', characterClass);
        
        // Use cached data for instant loading
        setWeaponSuggestions(cachedClassData.weaponSuggestions);
        setArmorSuggestions(cachedClassData.armorSuggestions);
        setCachedWeaponSuggestions(cachedClassData.weaponSuggestions);
        setCachedWeaponProficiencies(cachedClassData.weaponProficiencies);
        setCachedArmorProficiencies(cachedClassData.armorProficiencies);
        
        // Update spell limits cache
        if (cachedClassData.spellLimits) {
          setCachedSpellLimits(prev => ({
            ...prev,
            [`${characterClass}-1`]: cachedClassData.spellLimits!
          }));
        }
        
        // Still need to get creation options (equipment packs, subclasses, etc.)
        setLoadingOptions(true);
        try {
          const options = await characterCreationService.getCreationOptions(characterClass);
          const cachedSpellsForClass = cachedSpells[characterClass];
          const spellcastingData = (options as Partial<CreationOptions>).spellcasting;
          const availableSpells = cachedSpellsForClass || spellcastingData?.availableSpells || [];
          
          setCreationOptions({
            equipmentPacks: (options as Partial<CreationOptions>).equipmentPacks || [],
            weaponSuggestions: (options as Partial<CreationOptions>).weaponSuggestions || [],
            armorSuggestions: (options as Partial<CreationOptions>).armorSuggestions || [],
            subclasses: (options as Partial<CreationOptions>).subclasses || [],
            needsSubclassAtCreation: (options as Partial<CreationOptions>).needsSubclassAtCreation || false,
            spellcasting: {
              ability: spellcastingData?.ability || null,
              canCastAtLevel1: spellcastingData?.canCastAtLevel1 || false,
              availableSpells,
              spellSlots: spellcastingData?.spellSlots || {}
            }
          });
          
          // Cache spells for this class if not already cached
          if ((options as Partial<CreationOptions>).spellcasting?.availableSpells && !cachedSpellsForClass) {
            setCachedSpells(prev => ({
              ...prev,
              [characterClass]: (options as Partial<CreationOptions>).spellcasting!.availableSpells
            }));
          }
          
          console.log('✅ SET STATE - Weapon suggestions for', characterClass, ':', cachedClassData.weaponSuggestions);
          console.log('✅ SET STATE - Armor suggestions for', characterClass, ':', cachedClassData.armorSuggestions);
          console.log('⚡ INSTANT - Class switching using cached data');
        } catch (error) {
          console.error('Error loading creation options:', error);
        } finally {
          setLoadingOptions(false);
        }
      } else {
        // Try to get suggestions from client cache first
        
        // Fallback to API calls if cache not ready
        console.log('📡 Making API calls for creation options (cache not ready)...');
        
        // Don't make API calls if we're still loading all class data
        if (isLoadingAllClassData) {
          console.log('⏳ Waiting for all class data to load before making fallback API calls...');
          return;
        }
        
        setLoadingOptions(true);
        try {
          const [options, weaponSuggestions, armorSuggestions, weaponProficiencies, armorProficiencies] = await Promise.all([
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
              .catch(() => ({ armor: [] }))
          ]);
          
          const cachedSpellsForClass = cachedSpells[characterClass];
          const spellcastingData = (options as Partial<CreationOptions>).spellcasting;
          const availableSpells = cachedSpellsForClass || spellcastingData?.availableSpells || [];
          
          setCreationOptions({
            equipmentPacks: (options as Partial<CreationOptions>).equipmentPacks || [],
            weaponSuggestions: (options as Partial<CreationOptions>).weaponSuggestions || [],
            armorSuggestions: (options as Partial<CreationOptions>).armorSuggestions || [],
            subclasses: (options as Partial<CreationOptions>).subclasses || [],
            needsSubclassAtCreation: (options as Partial<CreationOptions>).needsSubclassAtCreation || false,
            spellcasting: {
              ability: spellcastingData?.ability || null,
              canCastAtLevel1: spellcastingData?.canCastAtLevel1 || false,
              availableSpells,
              spellSlots: spellcastingData?.spellSlots || {}
            }
          });
          
          setWeaponSuggestions(weaponSuggestions);
          setArmorSuggestions(armorSuggestions);
          setCachedWeaponSuggestions(weaponSuggestions);
          setCachedWeaponProficiencies(weaponProficiencies);
          setCachedArmorProficiencies(armorProficiencies.armor || []);
          
          if ((options as Partial<CreationOptions>).spellcasting?.availableSpells) {
            setCachedSpells(prev => ({
              ...prev,
              [characterClass]: (options as Partial<CreationOptions>).spellcasting!.availableSpells
            }));
          }
          
          console.log('✅ SET STATE - Weapon suggestions for', characterClass, ':', weaponSuggestions);
          console.log('✅ SET STATE - Armor suggestions for', characterClass, ':', armorSuggestions);
        } catch (error) {
          console.error('Error loading creation options:', error);
        } finally {
          setLoadingOptions(false);
        }
      }
    };

    // Only load if we have a character class and either cached data is available or we're not loading all class data
    if (characterClass && (allClassData[characterClass] || !isLoadingAllClassData)) {
      loadCreationOptions();
    }
  }, [characterClass, allClassData, isLoadingAllClassData, cachedSpells]); // Wait for all class data to be loaded

  // Get creation options from state (with fallback)
  const { needsSubclassAtCreation = false, spellcasting = { ability: null, canCastAtLevel1: false, availableSpells: [], spellSlots: {} } } = creationOptions || {};

  // Initialize ability scores on mount
  useEffect(() => {
    const { scores, randomArray } = characterCreationService.generateAbilityScores(statMethod);
    setAbilityScores(scores);
    if (randomArray) {
      setRandomScoreArray(randomArray);
    }
  }, [statMethod]); // Removed characterCreationService from dependencies since it's a singleton

  // Add a ref to track if weapon suggestions have been processed
  const processedWeaponSuggestionsRef = useRef<string>('');

  // Apply weapon suggestions when they're loaded
  useEffect(() => {
    // Early return if weaponSuggestions is undefined or null
    if (!weaponSuggestions) {
      console.log('🔫 WEAPON SUGGESTIONS EFFECT: No suggestions available');
      return;
    }

    // Early return if allWeapons is undefined or null
    if (!allWeapons) {
      console.log('🔫 WEAPON SUGGESTIONS EFFECT: No weapons data available yet');
      return;
    }

    console.log('🔫 WEAPON SUGGESTIONS EFFECT: allWeapons length:', allWeapons.length);
    console.log('🔫 WEAPON SUGGESTIONS EFFECT: allWeapons sample:', allWeapons.slice(0, 3).map(w => w.name));

    // Create a hash of the current weapon suggestions to check if we've already processed them
    const suggestionsHash = weaponSuggestions.map(s => `${s.weaponName}-${s.quantity}`).join('|');
    
    // Skip if we've already processed these exact suggestions
    if (processedWeaponSuggestionsRef.current === suggestionsHash) {
      console.log('🔫 WEAPON SUGGESTIONS EFFECT: Skipping - already processed these suggestions');
      return;
    }
    
    console.log('🔫 WEAPON SUGGESTIONS EFFECT:', weaponSuggestions.length, 'suggestions');
    
    if (weaponSuggestions.length > 0) {
      console.log('Processing weapon suggestions...');
      
      const suggestedWeapons: {weapon: Weapon, quantity: number}[] = [];
      
      weaponSuggestions.forEach((suggestion, index) => {
        console.log(`Processing weapon suggestion ${index}:`, suggestion);
        // Find the weapon in the weapons data from cache
        const weaponData = allWeapons.find((w: Weapon) => w.name === suggestion.weaponName);
        console.log(`Looking for weapon "${suggestion.weaponName}" in ${allWeapons.length} weapons`);
        console.log(`Found weapon data:`, weaponData);
        if (weaponData) {
          const weapon: Weapon = {
            ...weaponData,
            type: weaponData.type as 'Simple' | 'Martial',
            category: weaponData.category as 'Melee' | 'Ranged',
            properties: Array.isArray(weaponData.properties)
              ? weaponData.properties
              : typeof weaponData.properties === 'string'
                ? (weaponData.properties as string).split(', ').filter(Boolean)
                : []
          };
          suggestedWeapons.push({ weapon, quantity: suggestion.quantity });
          console.log('Added weapon:', weapon.name, 'quantity:', suggestion.quantity);
        } else {
          console.log(`❌ Weapon "${suggestion.weaponName}" not found in allWeapons`);
        }
      });
      
      console.log('Setting selectedWeapons to:', suggestedWeapons);
      setSelectedWeapons(suggestedWeapons);
    } else {
      console.log('No weapon suggestions to process - clearing weapons');
      setSelectedWeapons([]);
    }
    
    // Mark these suggestions as processed
    processedWeaponSuggestionsRef.current = suggestionsHash;
  }, [weaponSuggestions, allWeapons]);

  // Apply armor suggestions when they're loaded
  useEffect(() => {
    console.log('=== ARMOR SUGGESTIONS EFFECT ===');
    console.log('armorSuggestions:', armorSuggestions);
    
    // Early return if armorSuggestions is undefined or null
    if (!armorSuggestions) {
      console.log('armorSuggestions.length: 0 (undefined)');
      console.log('No armor suggestions to process - clearing armor');
      setSelectedArmor([]);
      return;
    }
    
    // Early return if allArmor is undefined or null
    if (!allArmor) {
      console.log('=== ARMOR SUGGESTIONS EFFECT: No armor data available yet');
      return;
    }
    
    console.log('armorSuggestions.length:', armorSuggestions.length);
    
    const suggestedArmor: Armor[] = [];
    
    if (armorSuggestions.length > 0) {
      console.log('Processing armor suggestions...');
      
      armorSuggestions.forEach((suggestion, index) => {
        console.log(`Processing suggestion ${index}:`, suggestion);
        const armorItem = allArmor.find((a: Armor) => a.name === suggestion.armorName);
        console.log('Found armor:', armorItem);
        if (armorItem) {
          const processedArmor = {
            ...armorItem,
            type: armorItem.type as 'Light' | 'Medium' | 'Heavy' | 'Shield',
            maxDexBonus: armorItem.maxDexBonus ?? undefined,
            minStrength: armorItem.minStrength ?? undefined
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
  }, [armorSuggestions, allArmor]);

  // Add a ref to track if ammunition has been processed for current weapons
  const processedAmmunitionRef = useRef<string>('');

  // Automatically add ammunition for ranged weapons
  useEffect(() => {
    const processAmmunition = async () => {
      // Create a hash of the current weapons to check if we've already processed them
      const weaponsHash = selectedWeapons.map(w => `${w.weapon.name}-${w.quantity}`).join('|');
      
      // Skip if we've already processed these exact weapons
      if (processedAmmunitionRef.current === weaponsHash) {
        console.log('🏹 AUTO-AMMUNITION EFFECT: Skipping - already processed these weapons');
        return;
      }
      
      console.log('🏹 AUTO-AMMUNITION EFFECT: Processing', selectedWeapons.length, 'selected weapons');
      
      const autoAmmunition: Ammunition[] = [];
      const processedAmmoTypes = new Set<number>();
      
      // Process each selected weapon to find ammunition needs
      for (const weaponSelection of selectedWeapons) {
        const weapon = weaponSelection.weapon;
        
        // Check if weapon needs ammunition
        // Check if weapon needs ammunition (look for properties that start with "Ammunition")
        const hasAmmunitionProperty = weapon.properties.some(prop => prop.startsWith('Ammunition'));
        
        console.log(`🔍 AMMO CHECK: ${weapon.name} - properties: ${JSON.stringify(weapon.properties)}, hasAmmunition: ${hasAmmunitionProperty}`);
        
        if (hasAmmunitionProperty) {
          // Use the weapon's ammunition data if available
          if (weapon.ammunitionTypeId && weapon.suggestedQuantity && !processedAmmoTypes.has(weapon.ammunitionTypeId)) {
            processedAmmoTypes.add(weapon.ammunitionTypeId);
            
            // Fetch ammunition data from the database
            try {
              const response = await fetch('/api/ammunition-suggestions');
              if (response.ok) {
                const ammunitionSuggestions: { id: number; name: string }[] = await response.json();
                const ammoData: { id: number; name: string } | undefined = ammunitionSuggestions.find((a) => a.id === weapon.ammunitionTypeId);
                
                if (ammoData) {
                  const ammo: Ammunition = {
                    name: ammoData.name,
                    quantity: weapon.suggestedQuantity,
                    compatibleWeapons: [weapon.name],
                    weight: 0.05, // Default weight - could be enhanced with more data
                    cost: '5 cp each' // Default cost - could be enhanced with more data
                  };
                  
                  autoAmmunition.push(ammo);
                  console.log(`✅ Auto-added ${ammo.quantity} ${ammo.name}s for ${weapon.name}`);
                }
              }
            } catch (error) {
              console.error('Failed to fetch ammunition data:', error);
            }
          } else if (!weapon.ammunitionTypeId) {
            // Fallback for weapons without ammunition data
            console.warn(`⚠️ Weapon ${weapon.name} has Ammunition property but no ammunitionTypeId defined`);
          }
        }
      }
      
      console.log('Final auto-ammunition:', autoAmmunition);
      setSelectedAmmunition(autoAmmunition);
      
      // Mark these weapons as processed
      processedAmmunitionRef.current = weaponsHash;
      
      if (autoAmmunition.length > 0) {
        console.log('✅ Set selectedAmmunition with auto-generated ammunition');
      } else {
        console.log('No ranged weapons need ammunition');
      }
    };
    
    processAmmunition();
  }, [selectedWeapons, allWeapons]);

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

  const handlePointBuyChange = (ability: AbilityScore, change: number) => {
    const newScores = characterCreationService.applyPointBuyChange(abilityScores, ability, change);
    if (newScores) {
      setAbilityScores(newScores);
    }
  };

  const handleSpellToggle = (spell: Spell) => {
    // Get cached spell limits for validation
    const spellLimits = getCachedSpellLimits(characterClass, 1);
    
    setSelectedSpells(prev => {
      const isSelected = prev.some(s => s.name === spell.name);
      if (isSelected) {
        return prev.filter(s => s.name !== spell.name);
      } else {
        // Validate based on spell type (cantrip vs spell)
        const isCantrip = spell.level === 0;
        const currentCantrips = prev.filter(s => s.level === 0).length;
        const currentSpells = prev.filter(s => s.level > 0).length;
        
        if (isCantrip) {
          // Check cantrip limit
          const maxCantrips = spellLimits?.cantripsKnown || 0;
          if (currentCantrips < maxCantrips) {
          return [...prev, spell];
        }
        } else {
          // Check spell limit
          const maxSpells = spellLimits?.spellsKnown || 0;
          if (currentSpells < maxSpells) {
            return [...prev, spell];
          }
        }
        return prev; // Return previous state if validation fails
      }
    });
  };

  const handleCreateCharacter = async () => {
    if (isSubmitting) return; // Prevent multiple submissions
    
    setIsSubmitting(true);
    
    try {
      // Get equipment items from the selected pack
      const selectedPackItems = creationOptions?.equipmentPacks?.[selectedEquipmentPack]?.items || [];
      
      // Apply racial ability score increases
      const finalAbilityScores = {
        strength: abilityScores.strength + (racialAbilityIncreases.strength || 0),
        dexterity: abilityScores.dexterity + (racialAbilityIncreases.dexterity || 0),
        constitution: abilityScores.constitution + (racialAbilityIncreases.constitution || 0),
        intelligence: abilityScores.intelligence + (racialAbilityIncreases.intelligence || 0),
        wisdom: abilityScores.wisdom + (racialAbilityIncreases.wisdom || 0),
        charisma: abilityScores.charisma + (racialAbilityIncreases.charisma || 0),
      };

      // Create character
      const characterData = {
        name,
        race,
        subrace,
        class: characterClass,
        subclass,
        background,
        alignment,
        gender,
        age,
        // Flatten ability scores to individual properties with racial increases applied
        strength: finalAbilityScores.strength,
        dexterity: finalAbilityScores.dexterity,
        constitution: finalAbilityScores.constitution,
        intelligence: finalAbilityScores.intelligence,
        wisdom: finalAbilityScores.wisdom,
        charisma: finalAbilityScores.charisma,
        // Background characteristics
        backgroundCharacteristics,
        // Character appearance
        appearance,

        spellsKnown: selectedSpells,
        spellsPrepared: selectedSpells, // For level 1, known = prepared
        spellSlots: creationOptions?.spellcasting?.spellSlots || {},
        spellcastingAbility: creationOptions?.spellcasting?.ability || null,
        inventory: selectedPackItems, // Send equipment pack items
        weapons: selectedWeapons,
        armor: selectedArmor,
        ammunition: selectedAmmunition,
        // Send calculated gold
        goldPieces: calculatedGold
        // Currency will be calculated by the service based on equipment pack cost
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
      
      // Save avatar to our storage system if one was generated
      if (generatedFullBodyAvatar) {
        try {
          // Fetch the image from Replicate and convert to base64
          const response = await fetch(generatedFullBodyAvatar);
          const blob = await response.blob();
          const reader = new FileReader();
          
          reader.onloadend = async () => {
            const base64Data = reader.result as string;
            
            // Use the mutation to save avatar and invalidate cache
            updateAvatar.mutate({
              characterId: createdCharacter.id,
              imageData: base64Data
            });
          };
          
          reader.readAsDataURL(blob);
        } catch (error) {
          console.error('Error saving avatar after character creation:', error);
        }
      }
      
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

  // Custom handler for background changes that triggers gold calculation
  const handleBackgroundChange = (newBackground: string) => {
    setBackground(newBackground);
    // The gold calculation will automatically refetch due to query key changes
  };

  // Custom handler for equipment pack changes
  const handleEquipmentPackChange = (newPackIndex: number) => {
    setSelectedEquipmentPack(newPackIndex);
    // The gold calculation will automatically refetch due to query key changes
  };

  // Auto-select all 1st-level spells for prepared spellcasters when class changes
  useEffect(() => {
    if (characterClass && spellcasting?.availableSpells) {
      const limits = getCachedSpellLimits(characterClass, 1);
      if (limits?.spellcastingType === 'prepared' && limits.spellsKnown === 0) {
        // For prepared spellcasters, auto-select all 1st-level spells
        const firstLevelSpells = spellcasting.availableSpells.filter(spell => spell.level === 1);
        setSelectedSpells(prev => {
          // Keep existing cantrips, add all 1st-level spells
          const existingCantrips = prev.filter(spell => spell.level === 0);
          return [...existingCantrips, ...firstLevelSpells];
        });
      }
    }
  }, [characterClass, spellcasting?.availableSpells]);

  // Add a ref to track if all class data has been loaded
  const hasLoadedAllClassData = useRef(false);

  // Move loadAllClassData outside useEffect and use useCallback with no dependencies
  const loadAllClassData = useCallback(async () => {
    if (isLoadingAllClassData || hasLoadedAllClassData.current) return;
    
    console.log('🚀 Loading all class data for instant switching...');
    setIsLoadingAllClassData(true);
    
    try {
      const allClasses = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];
      const spellcastingClasses = ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard'];
      
      const classDataPromises = allClasses.map(async (className) => {
        try {
          const isSpellcastingClass = spellcastingClasses.includes(className);
          
          const [weaponSuggestions, armorSuggestions, weaponProficiencies, armorProficiencies, /* classData */] = await Promise.all([
            fetch(`/api/weapon-suggestions?className=${encodeURIComponent(className)}`)
              .then(res => res.ok ? res.json() : [])
              .catch(() => []),
            fetch(`/api/armor-suggestions?className=${encodeURIComponent(className)}`)
              .then(res => res.ok ? res.json() : [])
              .catch(() => []),
            fetch(`/api/class-proficiencies?className=${encodeURIComponent(className)}`)
              .then(res => res.ok ? res.json() : { simple: false, martial: false, specific: [] })
              .catch(() => ({ simple: false, martial: false, specific: [] })),
            fetch(`/api/class-proficiencies?className=${encodeURIComponent(className)}&includeArmor=true`)
              .then(res => res.ok ? res.json() : { armor: [] })
              .catch(() => ({ armor: [] })),
            fetch(`/api/classes/${encodeURIComponent(className)}`)
              .then(res => res.ok ? res.json() : null)
              .catch(() => null)
          ]);
          
          // Only fetch spell limits for spellcasting classes
          let spellLimits = null;
          if (isSpellcastingClass) {
            try {
              const spellLimitsResponse = await fetch(`/api/classes/${encodeURIComponent(className)}/spell-limits?level=1`);
              if (spellLimitsResponse.ok) {
                spellLimits = await spellLimitsResponse.json();
              }
            } catch (error) {
              console.warn(`Failed to load spell limits for ${className}:`, error);
            }
          }
          
          return {
            className,
            data: {
              weaponSuggestions,
              armorSuggestions,
              weaponProficiencies,
              armorProficiencies: armorProficiencies.armor || [],
              spellLimits
            }
          };
        } catch (error) {
          console.warn(`Failed to load data for ${className}:`, error);
          return {
            className,
            data: {
              weaponSuggestions: [],
              armorSuggestions: [],
              weaponProficiencies: { simple: false, martial: false, specific: [] },
              armorProficiencies: [],
              spellLimits: null
            }
          };
        }
      });
      
      const results = await Promise.all(classDataPromises);
      const cache: Record<string, {
        weaponSuggestions: WeaponSuggestion[];
        armorSuggestions: ArmorSuggestion[];
        weaponProficiencies: { simple: boolean; martial: boolean; specific: string[] };
        armorProficiencies: string[];
        spellLimits: {
          cantripsKnown: number;
          spellsKnown: number;
          spellcastingType: string;
          maxSpellLevel: number;
          spellLevelLimits: Record<string, number>;
        } | null;
      }> = {};
      
      results.forEach(({ className, data }) => {
        cache[className] = data;
      });
      
      // Only update state if we haven't already loaded the data
      if (!hasLoadedAllClassData.current) {
        setAllClassData(cache);
        hasLoadedAllClassData.current = true;
        console.log('✅ All class data loaded and cached:', Object.keys(cache));
        
        // Also update the individual caches for backward compatibility
        setCachedSpellLimits(prev => {
          const newCache = { ...prev };
          results.forEach(({ className, data }) => {
            if (data.spellLimits) {
              newCache[`${className}-1`] = data.spellLimits;
            }
          });
          return newCache;
        });
      }
      
    } catch (error) {
      console.error('Failed to load all class data:', error);
    } finally {
      setIsLoadingAllClassData(false);
    }
  }, []); // No dependencies - function will never be recreated

  // Load all class data at modal startup for instant class switching
  useEffect(() => {
    // Only load if not already loaded and not currently loading
    if (!hasLoadedAllClassData.current && !isLoadingAllClassData) {
      loadAllClassData();
    }
  }, []); // Remove loadAllClassData dependency - it's stable with useCallback

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
                  <label htmlFor="character-name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                  <div className="relative">
                    <input
                      id="character-name"
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                      placeholder="Character Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-slate-400 hover:text-purple-400 transition-colors disabled:opacity-50"
                      title="Generate fantasy name"
                      type="button"
                      onClick={handleGenerateName}
                    >
                      <RefreshCw className={`h-4 w-4 ${generatingName ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>
                <div className="w-32">
                  <label htmlFor="character-age" className="block text-sm font-medium text-slate-300 mb-2">Age (Optional)</label>
                  <input
                    id="character-age"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                    max={1000}
                    min={1}
                    placeholder="Age"
                    type="number"
                    value={age || ''}
                    onChange={(e) => setAge(e.target.value ? parseInt(e.target.value, 10) : undefined)}
                  />
                </div>
              </div>

              {/* Race selector with collapsible traits */}
              <RaceTraitsCollapsible
                race={race}
                disabled={!races}
                onRaceChange={handleRaceChange}
                races={races}
              />

              {/* Subrace selector with collapsible traits */}
              <SubraceTraitsCollapsible
                race={race}
                subrace={subrace}
                disabled={!race}
                onSubraceChange={setSubrace}
                subraces={subraces}
              />

              {/* Racial ability score increases are handled in the background tab */}

              {/* Class selector */}
              <div className="mb-4">
                <div>
                  <label htmlFor="class-select" className="block text-sm font-medium text-slate-300 mb-2">Class</label>
                  <select
                    id="class-select"
                    value={characterClass || ''}
                    onChange={(e) => handleClassChange(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-base text-white focus:border-purple-500 focus:outline-none appearance-none"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                  >
                    <option value="" disabled>Select a class</option>
                    {classes?.map((cls) => (
                      <option key={cls.name} value={cls.name}>{cls.name}</option>
                    ))}
                  </select>
                </div>
              </div>



              {/* Subclass selector - only show if needed at creation */}
              {(() => {
                console.log('🎯 RENDER DEBUG - Subclass selector values:', {
                  needsSubclassAtCreation,
                  characterClass,
                  hasCreationOptions: !!creationOptions,
                  subclassesLength: creationOptions?.subclasses?.length || 0,
                  subclasses: creationOptions?.subclasses || []
                });
                return needsSubclassAtCreation && (
                  <div className="mb-4">
                    <label htmlFor="subclass-select" className="block text-sm font-medium text-slate-300 mb-2">
                      Subclass *
                    </label>
                    <select
                      id="subclass-select"
                      value={subclass}
                      onChange={(e) => setSubclass(e.target.value)}
                      className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-base text-white focus:border-purple-500 focus:outline-none appearance-none"
                    >
                      <option value="">Choose subclass...</option>
                      {creationOptions?.subclasses?.map((s) => (
                        <option key={s.name} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                    {subclass && creationOptions?.subclasses?.find((s) => s.name === subclass)?.description && (
                      <p className="text-slate-400 mt-2">
                        {creationOptions.subclasses.find((s) => s.name === subclass)?.description}
                      </p>
                    )}
                  </div>
                );
              })()}

              {/* Third row: Alignment | Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="alignment-select" className="block text-sm font-medium text-slate-300 mb-2">Alignment</label>
                  <select
                    id="alignment-select"
                    value={alignment}
                    onChange={(e) => setAlignment(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-base text-white focus:border-purple-500 focus:outline-none appearance-none"
                  >
                    {alignments?.map((a) => (
                      <option key={a.name} value={a.name}>{a.name}</option>
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
                    <p className="text-sm text-slate-300 mb-2">
                      Points remaining: <span className={`font-bold ${pointBuyValidation.remaining === 0 ? 'text-green-400' : pointBuyValidation.remaining < 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                        {pointBuyValidation.remaining}
                      </span>
                      {pointBuyValidation.remaining === 0 && <span className="text-green-400 ml-2">✓ Valid</span>}
                      {pointBuyValidation.remaining < 0 && <span className="text-red-400 ml-2">⚠️ Too many points used</span>}
                    </p>
                    <div className="text-xs text-slate-400">
                      <p>Point costs: 8=0, 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9</p>
                    </div>
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
                      
                      {/* Point Buy Cost Display */}
                      {statMethod === 'pointbuy' && (
                        <div className="text-xs text-slate-500 mt-1">
                          Cost: {POINT_BUY_COSTS[abilityScores[ability] as keyof typeof POINT_BUY_COSTS] || 0}
                        </div>
                      )}
                      
                      {/* Point Buy Controls */}
                      {statMethod === 'pointbuy' && (
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => handlePointBuyChange(ability, -1)}
                            disabled={abilityScores[ability] <= 8}
                            className="w-6 h-6 bg-slate-600 hover:bg-slate-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded flex items-center justify-center text-sm font-bold transition-colors"
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePointBuyChange(ability, 1)}
                            disabled={abilityScores[ability] >= 15}
                            className="w-6 h-6 bg-slate-600 hover:bg-slate-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded flex items-center justify-center text-sm font-bold transition-colors"
                          >
                            +
                          </button>
                        </div>
                      )}
                      
                      {/* Rolling/Standard Array Controls */}
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
                    
                    {/* Spell selection guidance */}
                    {(() => {
                      const spellLimits = getCachedSpellLimits(characterClass, 1);
                      const selectedCantrips = selectedSpells.filter(s => s.level === 0).length;
                      const selectedSpellsCount = selectedSpells.filter(s => s.level > 0).length;
                      const maxCantrips = spellLimits?.cantripsKnown || 0;
                      const maxSpells = spellLimits?.spellsKnown || 0;
                      
                      const cantripsNeeded = Math.max(0, maxCantrips - selectedCantrips);
                      const spellsNeeded = Math.max(0, maxSpells - selectedSpellsCount);
                      
                      return (
                        <div className="mt-3 pt-3 border-t border-slate-600">
                          <div className="text-sm text-slate-300 mb-2">
                            <span className="font-medium">Spell Selection Requirements:</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div className={`flex items-center gap-2 ${selectedCantrips >= maxCantrips ? 'text-green-400' : 'text-yellow-400'}`}>
                              <span>{selectedCantrips}/{maxCantrips} Cantrips</span>
                              {selectedCantrips >= maxCantrips && <span>✓</span>}
                            </div>
                            <div className={`flex items-center gap-2 ${selectedSpellsCount >= maxSpells ? 'text-green-400' : 'text-yellow-400'}`}>
                              <span>
                                {spellLimits?.spellcastingType === 'prepared' && maxSpells === 0 
                                  ? `All Spells (${selectedSpellsCount} selected)`
                                  : `${selectedSpellsCount}/${maxSpells} Spells`
                                }
                              </span>
                              {selectedSpellsCount >= maxSpells && <span>✓</span>}
                            </div>
                          </div>
                          {(cantripsNeeded > 0 || (spellsNeeded > 0 && spellLimits?.spellcastingType !== 'prepared')) && (
                            <div className="mt-2 text-xs text-yellow-400">
                              ⚠️ Please select {cantripsNeeded} more cantrip{cantripsNeeded !== 1 ? 's' : ''} and {spellsNeeded} more spell{spellsNeeded !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      );
                    })()}
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
                {/* Equipment Pack Selection - MOVED ABOVE BACKGROUND */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Starting Equipment Choice</h3>
                  
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
                          onChange={(e) => handleEquipmentPackChange(Number(e.target.value))}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                        >
                          <option value={-1}>No Pack - Roll for Starting Gold</option>
                          {creationOptions?.equipmentPacks?.map((pack, index) => (
                            <option key={`pack-${index}`} value={index}>
                              {pack.name} ({pack.cost})
                            </option>
                          )) || []}
                        </select>
                        
                        {/* Show selected pack details */}
                        {selectedEquipmentPack === -1 ? (
                          <div className="mt-2 p-3 bg-slate-700 rounded-lg">
                            <div className="text-sm text-slate-300 mb-2">
                              You will roll for starting gold based on your class instead of taking an equipment pack.
                            </div>
                            {goldRollDetails ? (
                              <div className="text-xs text-yellow-400 mt-1">
                                <strong>Starting Gold:</strong> {calculatedGold} gp <span className="block">({goldRollDetails})</span>
                              </div>
                            ) : (
                              <div className="text-xs text-slate-400 mt-1">
                                <em>Roll to see your starting gold!</em>
                              </div>
                            )}
                          </div>
                        ) : creationOptions?.equipmentPacks?.[selectedEquipmentPack] && (
                          <div className="mt-2 p-3 bg-slate-700 rounded-lg">
                            <div className="text-sm text-slate-300 mb-2">
                              {creationOptions.equipmentPacks[selectedEquipmentPack].description}
                            </div>
                            <div className="text-xs text-slate-400">
                              <strong>Contains:</strong>{' '}
                              {creationOptions.equipmentPacks[selectedEquipmentPack].items
                                .map(item => `${item.name} (${item.quantity})`)
                                .join(', ')}
                            </div>
                            {calculatedGold > 0 && (
                              <div className="text-xs text-yellow-400 mt-1">
                                <strong>Starting Gold:</strong> {calculatedGold} gp (from {background} background)
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Select Your Background</h3>
                  <BackgroundSelector
                    selectedBackground={background}
                    selectedCharacteristics={backgroundCharacteristics}
                    onBackgroundChange={handleBackgroundChange}
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
                              width={192}
                              height={336}
                              className="w-48 mx-auto rounded-lg border-2 border-purple-500 object-cover"
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
                          <div className="w-48 h-80 mx-auto rounded-lg border-2 border-dashed border-slate-500 flex flex-col items-center justify-center text-slate-400">
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
                            subrace,
                            class: characterClass,
                            gender: gender || 'Male', // Use selected gender or default
                            alignment,
                            background,
                            age, // Add age support
                            personalityTraits: backgroundCharacteristics?.personalityTraits || [],
                            ideals: backgroundCharacteristics?.ideals || [],
                            bonds: backgroundCharacteristics?.bonds || [],
                            flaws: backgroundCharacteristics?.flaws || [],
                            appearance: appearance || '',
                            selectedWeapons: selectedWeapons.map(sw => sw.weapon.name),
                            selectedArmor: selectedArmor.map(armor => armor.name)
                          } as CharacterAvatarData}
                          onAvatarGenerated={(avatarDataUrl, fullBodyDataUrl) => {
                            // Store both the cropped avatar and full body image
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
                disabled={!characterClass || (needsSubclassAtCreation && !subclass) || (statMethod === 'pointbuy' && !pointBuyValidation.isValid)}
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