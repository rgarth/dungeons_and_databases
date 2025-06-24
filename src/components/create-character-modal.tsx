"use client";

import { useState, useEffect, useRef } from "react";
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
import { SubraceSelector } from "@/components/shared/SubraceSelector";
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
  const [cachedPhbDescription, setCachedPhbDescription] = useState<string | null>(null);
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
  const [backgroundStartingGold, setBackgroundStartingGold] = useState<number>(0);
  const [classStartingGoldFormula, setClassStartingGoldFormula] = useState<string>('');
  const [calculatedGold, setCalculatedGold] = useState<number>(0);
  const [goldRollDetails, setGoldRollDetails] = useState<string>('');

  // Cache for class starting gold formulas
  const classFormulaCache = useRef<Map<string, { formula: string; timestamp: number }>>(new Map());
  const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  // Handler to clear subrace when race changes
  const handleRaceChange = (newRace: string) => {
    setRace(newRace);
    setSubrace(null); // Clear subrace when race changes
  };

  // Handler to clear subclass when class changes
  const handleClassChange = (newClass: string) => {
    setCharacterClass(newClass);
    setSubclass(""); // Clear subclass when class changes
    setSelectedSpells([]); // Clear selected spells when class changes
    
    // Auto-select all 1st-level spells for prepared spellcasters
    setTimeout(() => {
      const limits = getCachedSpellLimits(newClass, 1);
      if (limits?.spellcastingType === 'prepared' && limits.spellsKnown === 0 && spellcasting?.availableSpells) {
        const firstLevelSpells = spellcasting.availableSpells.filter(spell => spell.level === 1);
        setSelectedSpells(firstLevelSpells);
      }
    }, 100); // Small delay to ensure spellcasting data is loaded
  };

  // Fetch class starting gold formula when class changes
  useEffect(() => {
    const fetchClassFormula = async () => {
      if (!characterClass) return;
      
      // Check cache first
      const cached = classFormulaCache.current.get(characterClass);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        setClassStartingGoldFormula(cached.formula);
        return;
      }
      
      try {
        const classResponse = await fetch(`/api/classes/${encodeURIComponent(characterClass)}`);
        if (classResponse.ok) {
          const classData = await classResponse.json();
          if (classData.startingGoldFormula) {
            // Update cache
            classFormulaCache.current.set(characterClass, {
              formula: classData.startingGoldFormula,
              timestamp: Date.now()
            });
            setClassStartingGoldFormula(classData.startingGoldFormula);
          }
        }
      } catch (error) {
        console.warn('Error fetching class starting gold formula:', error);
      }
    };

    fetchClassFormula();
  }, [characterClass]);

  // Fetch and cache spell limits when class changes
  useEffect(() => {
    const fetchSpellLimits = async () => {
      if (!characterClass) return;
      
      // Cache key for level 1 spell limits
      const cacheKey = `${characterClass}-1`;
      
      // Check if already cached
      if (cachedSpellLimits[cacheKey]) {
        console.log('⚡ Using cached spell limits for', characterClass);
        return;
      }
      
      try {
        console.log('📡 Fetching spell limits for', characterClass);
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
  }, [characterClass, cachedSpellLimits]);

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

  // Calculate gold when first entering background step
  useEffect(() => {
    if (currentStep === 'background' && background && characterClass) {
      // Trigger initial gold calculation
      setTimeout(() => {
        const calculateGold = async () => {
          try {
            // Get background data (starting gold and formula)
            const backgroundResponse = await fetch('/api/backgrounds');
            if (backgroundResponse.ok) {
              const backgrounds = await backgroundResponse.json();
              const backgroundData = backgrounds.find((bg: { name: string; startingGold?: number; startingGoldFormula?: string }) => bg.name === background);
              if (backgroundData?.startingGold) {
                setBackgroundStartingGold(backgroundData.startingGold);
              }
            }

            // Use cached class formula if available, otherwise fetch it
            let classFormula = classStartingGoldFormula;
            if (!classFormula) {
              const cached = classFormulaCache.current.get(characterClass);
              if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
                classFormula = cached.formula;
              } else {
                // Fetch and cache if not available
                const classResponse = await fetch(`/api/classes/${encodeURIComponent(characterClass)}`);
                if (classResponse.ok) {
                  const classData = await classResponse.json();
                  if (classData.startingGoldFormula) {
                    classFormula = classData.startingGoldFormula;
                    classFormulaCache.current.set(characterClass, {
                      formula: classData.startingGoldFormula,
                      timestamp: Date.now()
                    });
                    setClassStartingGoldFormula(classData.startingGoldFormula);
                  }
                }
              }
            }
                  
            // Calculate gold based on equipment pack selection
            if (selectedEquipmentPack === -1) {
              // No equipment pack - roll class gold + background fixed gold + background rolled gold
              let classGold = 0;
              let backgroundFixedGold = 0;
              let backgroundRolledGold = 0;
              let classRollDetails = '';
              let backgroundRollDetails = '';
              
              // Roll class gold
              if (classFormula) {
                const match = classFormula.match(/(\d+)d(\d+)(\*\d+)?/);
                if (match) {
                  const numDice = parseInt(match[1], 10);
                  const dieSize = parseInt(match[2], 10);
                  const multiplier = match[3] ? parseInt(match[3].substring(1), 10) : 1;
                  
                  // Actually roll the dice
                  const rolls: number[] = [];
                  let totalRoll = 0;
                  for (let i = 0; i < numDice; i++) {
                    const roll = Math.floor(Math.random() * dieSize) + 1;
                    rolls.push(roll);
                    totalRoll += roll;
                  }
                  classGold = totalRoll * multiplier;
                  classRollDetails = `${numDice}d${dieSize}${multiplier > 1 ? `×${multiplier}` : ''} [${rolls.join(', ')}] = ${classGold} gp`;
                }
              }
              
              // Get background data (fixed gold and formula)
              const backgroundResponse = await fetch('/api/backgrounds');
              if (backgroundResponse.ok) {
                const backgrounds = await backgroundResponse.json();
                const backgroundData = backgrounds.find((bg: { name: string; startingGold?: number; startingGoldFormula?: string }) => bg.name === background);
                
                // Add fixed background gold (like Noble's 25 gp)
                if (backgroundData?.startingGold) {
                  backgroundFixedGold = backgroundData.startingGold;
                }
                
                // Roll background gold (if background has a formula)
                if (backgroundData?.startingGoldFormula) {
                  const match = backgroundData.startingGoldFormula.match(/(\d+)d(\d+)(\*\d+)?/);
                  if (match) {
                    const numDice = parseInt(match[1], 10);
                    const dieSize = parseInt(match[2], 10);
                    const multiplier = match[3] ? parseInt(match[3].substring(1), 10) : 1;
                    
                    // Actually roll the dice
                    const rolls: number[] = [];
                    let totalRoll = 0;
                    for (let i = 0; i < numDice; i++) {
                      const roll = Math.floor(Math.random() * dieSize) + 1;
                      rolls.push(roll);
                      totalRoll += roll;
                    }
                    backgroundRolledGold = totalRoll * multiplier;
                    backgroundRollDetails = `${numDice}d${dieSize}${multiplier > 1 ? `×${multiplier}` : ''} [${rolls.join(', ')}] = ${backgroundRolledGold} gp`;
                  }
                }
              }
              
              const totalGold = classGold + backgroundFixedGold + backgroundRolledGold;
              setCalculatedGold(totalGold);
              
              // Build the roll details string
              let rollDetails = `Class: ${classRollDetails}`;
              if (backgroundFixedGold > 0) {
                rollDetails += `, Background: ${backgroundFixedGold} gp`;
              }
              if (backgroundRollDetails) {
                rollDetails += `, Background Roll: ${backgroundRollDetails}`;
              }
              rollDetails += ` (Total: ${totalGold} gp)`;
              
              setGoldRollDetails(rollDetails);
              
              // Show toast
              toast.success(`Starting Gold: ${totalGold} gp (Class + Background)`, {
                duration: 3000,
                icon: '💰'
              });
            } else {
              // Equipment pack selected - use background starting gold
              setCalculatedGold(backgroundStartingGold);
              setGoldRollDetails('');
              
              // Show toast
              toast.success(`Starting Gold: ${backgroundStartingGold} gp (${background} background)`, {
                duration: 3000,
                icon: '💰'
              });
            }
          } catch (error) {
            console.warn('Error calculating initial gold:', error);
          }
        };

        calculateGold();
      }, 100); // Small delay to ensure state is updated
    }
  }, [currentStep, background, characterClass, selectedEquipmentPack, classStartingGoldFormula, backgroundStartingGold]);

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
      
      // Check if we have cached spells for this class
      const cachedSpellsForClass = cachedSpells[characterClass];
      
      console.log('📡 Making API calls for creation options...');
      setLoadingOptions(true);
      try {
        console.log('📡 Making API calls for creation options...');
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
        
        console.log('📦 Raw options from characterCreationService:', options);
        
        // Use cached spells if available, otherwise use from API
        const spellcastingData = (options as Partial<CreationOptions>).spellcasting;
        const availableSpells = cachedSpellsForClass || spellcastingData?.availableSpells || [];
        
        if (cachedSpellsForClass) {
          console.log('⚡ Using cached spells for', characterClass, ':', cachedSpellsForClass.length, 'spells');
        } else {
          console.log('📡 Loading spells from API for', characterClass, ':', spellcastingData?.availableSpells?.length || 0, 'spells');
        }
        
        setCreationOptions({
          ...options,
          subclasses: (options as Partial<CreationOptions>).subclasses || [],
          needsSubclassAtCreation: (options as Partial<CreationOptions>).needsSubclassAtCreation || false,
          spellcasting: {
            ability: spellcastingData?.ability || null,
            canCastAtLevel1: spellcastingData?.canCastAtLevel1 || false,
            availableSpells,
            spellSlots: spellcastingData?.spellSlots || {}
          }
        });
        
        console.log('🔍 DEBUG - Creation options for', characterClass, ':', {
          subclasses: (options as Partial<CreationOptions>).subclasses || [],
          needsSubclassAtCreation: (options as Partial<CreationOptions>).needsSubclassAtCreation || false,
          spellcasting: (options as Partial<CreationOptions>).spellcasting
        });
        
        setWeaponSuggestions(weaponSuggestions);
        setArmorSuggestions(armorSuggestions);
        
        // Cache all the data for instant loading in modals
        setCachedWeaponSuggestions(weaponSuggestions);
        setCachedWeaponProficiencies(weaponProficiencies);
        setCachedArmorProficiencies(armorProficiencies.armor || []);
        setCachedPhbDescription(classData?.phbDescription || null);
        
        // Cache spells for this class
        if ((options as Partial<CreationOptions>).spellcasting?.availableSpells) {
          setCachedSpells(prev => ({
            ...prev,
            [characterClass]: (options as Partial<CreationOptions>).spellcasting!.availableSpells
          }));
        }
        
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
        // Flatten ability scores to individual properties
        strength: abilityScores.strength,
        dexterity: abilityScores.dexterity,
        constitution: abilityScores.constitution,
        intelligence: abilityScores.intelligence,
        wisdom: abilityScores.wisdom,
        charisma: abilityScores.charisma,
        // Background characteristics
        backgroundCharacteristics,
        spellsKnown: selectedSpells,
        spellsPrepared: selectedSpells, // For level 1, known = prepared
        spellSlots: creationOptions?.spellcasting?.spellSlots || {},
        spellcastingAbility: creationOptions?.spellcasting?.ability || null,
        inventory: selectedPackItems, // Send equipment pack items
        weapons: selectedWeapons,
        armor: selectedArmor,
        ammunition: selectedAmmunition,
        // Send calculated gold
        goldPieces: calculatedGold,
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

  // Custom handler for background changes that triggers gold calculation
  const handleBackgroundChange = (newBackground: string) => {
    setBackground(newBackground);
    // Trigger gold calculation immediately
    setTimeout(() => {
      const calculateGold = async () => {
        if (!newBackground || !characterClass) return;

        try {
          // Get background data (starting gold and formula)
          const backgroundResponse = await fetch('/api/backgrounds');
          if (backgroundResponse.ok) {
            const backgrounds = await backgroundResponse.json();
            const backgroundData = backgrounds.find((bg: { name: string; startingGold?: number; startingGoldFormula?: string }) => bg.name === newBackground);
            if (backgroundData?.startingGold) {
              setBackgroundStartingGold(backgroundData.startingGold);
            }
          }

          // Use cached class formula if available, otherwise fetch it
          let classFormula = classStartingGoldFormula;
          if (!classFormula) {
            const cached = classFormulaCache.current.get(characterClass);
            if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
              classFormula = cached.formula;
            } else {
              // Fetch and cache if not available
              const classResponse = await fetch(`/api/classes/${encodeURIComponent(characterClass)}`);
              if (classResponse.ok) {
                const classData = await classResponse.json();
                if (classData.startingGoldFormula) {
                  classFormula = classData.startingGoldFormula;
                  classFormulaCache.current.set(characterClass, {
                    formula: classData.startingGoldFormula,
                    timestamp: Date.now()
                  });
                  setClassStartingGoldFormula(classData.startingGoldFormula);
                }
              }
            }
          }
                
          // Calculate gold based on equipment pack selection
          if (selectedEquipmentPack === -1) {
            // No equipment pack - roll class gold + background fixed gold + background rolled gold
            let classGold = 0;
            let backgroundFixedGold = 0;
            let backgroundRolledGold = 0;
            let classRollDetails = '';
            let backgroundRollDetails = '';
            
            // Roll class gold
            if (classFormula) {
              const match = classFormula.match(/(\d+)d(\d+)(\*\d+)?/);
              if (match) {
                const numDice = parseInt(match[1], 10);
                const dieSize = parseInt(match[2], 10);
                const multiplier = match[3] ? parseInt(match[3].substring(1), 10) : 1;
                
                // Actually roll the dice
                const rolls: number[] = [];
                let totalRoll = 0;
                for (let i = 0; i < numDice; i++) {
                  const roll = Math.floor(Math.random() * dieSize) + 1;
                  rolls.push(roll);
                  totalRoll += roll;
                }
                classGold = totalRoll * multiplier;
                classRollDetails = `${numDice}d${dieSize}${multiplier > 1 ? `×${multiplier}` : ''} [${rolls.join(', ')}] = ${classGold} gp`;
              }
            }
            
            // Get background data (fixed gold and formula)
            const backgroundResponse = await fetch('/api/backgrounds');
            if (backgroundResponse.ok) {
              const backgrounds = await backgroundResponse.json();
              const backgroundData = backgrounds.find((bg: { name: string; startingGold?: number; startingGoldFormula?: string }) => bg.name === newBackground);
              
              // Add fixed background gold (like Noble's 25 gp)
              if (backgroundData?.startingGold) {
                backgroundFixedGold = backgroundData.startingGold;
              }
              
              // Roll background gold (if background has a formula)
              if (backgroundData?.startingGoldFormula) {
                const match = backgroundData.startingGoldFormula.match(/(\d+)d(\d+)(\*\d+)?/);
                if (match) {
                  const numDice = parseInt(match[1], 10);
                  const dieSize = parseInt(match[2], 10);
                  const multiplier = match[3] ? parseInt(match[3].substring(1), 10) : 1;
                  
                  // Actually roll the dice
                  const rolls: number[] = [];
                  let totalRoll = 0;
                  for (let i = 0; i < numDice; i++) {
                    const roll = Math.floor(Math.random() * dieSize) + 1;
                    rolls.push(roll);
                    totalRoll += roll;
                  }
                  backgroundRolledGold = totalRoll * multiplier;
                  backgroundRollDetails = `${numDice}d${dieSize}${multiplier > 1 ? `×${multiplier}` : ''} [${rolls.join(', ')}] = ${backgroundRolledGold} gp`;
                }
              }
            }
            
            const totalGold = classGold + backgroundFixedGold + backgroundRolledGold;
            setCalculatedGold(totalGold);
            
            // Build the roll details string
            let rollDetails = `Class: ${classRollDetails}`;
            if (backgroundFixedGold > 0) {
              rollDetails += `, Background: ${backgroundFixedGold} gp`;
            }
            if (backgroundRollDetails) {
              rollDetails += `, Background Roll: ${backgroundRollDetails}`;
            }
            rollDetails += ` (Total: ${totalGold} gp)`;
            
            setGoldRollDetails(rollDetails);
            
            // Show toast
            toast.success(`Starting Gold: ${totalGold} gp (Class + Background)`, {
              duration: 3000,
              icon: '💰'
            });
          } else {
            // Equipment pack selected - use background starting gold
            setCalculatedGold(backgroundStartingGold);
            setGoldRollDetails('');
            
            // Show toast
            toast.success(`Starting Gold: ${backgroundStartingGold} gp (${newBackground} background)`, {
              duration: 3000,
              icon: '💰'
            });
          }
        } catch (error) {
          console.warn('Error calculating gold:', error);
        }
      };

      calculateGold();
    }, 100); // Small delay to ensure state is updated
  };

  // Custom handler for equipment pack changes
  const handleEquipmentPackChange = (newPackIndex: number) => {
    setSelectedEquipmentPack(newPackIndex);
    // Trigger gold calculation immediately
    setTimeout(() => {
      const calculateGold = async () => {
        if (!background || !characterClass) return;

        try {
          // Get background data (starting gold and formula)
          const backgroundResponse = await fetch('/api/backgrounds');
          if (backgroundResponse.ok) {
            const backgrounds = await backgroundResponse.json();
            const backgroundData = backgrounds.find((bg: { name: string; startingGold?: number; startingGoldFormula?: string }) => bg.name === background);
            if (backgroundData?.startingGold) {
              setBackgroundStartingGold(backgroundData.startingGold);
            }
          }

          // Use cached class formula if available, otherwise fetch it
          let classFormula = classStartingGoldFormula;
          if (!classFormula) {
            const cached = classFormulaCache.current.get(characterClass);
            if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
              classFormula = cached.formula;
            } else {
              // Fetch and cache if not available
              const classResponse = await fetch(`/api/classes/${encodeURIComponent(characterClass)}`);
              if (classResponse.ok) {
                const classData = await classResponse.json();
                if (classData.startingGoldFormula) {
                  classFormula = classData.startingGoldFormula;
                  classFormulaCache.current.set(characterClass, {
                    formula: classFormula,
                    timestamp: Date.now()
                  });
                }
              }
            }
          }

          // Calculate total starting gold
          let totalGold = 0;
          
          // Add background starting gold
          if (backgroundStartingGold) {
            totalGold += backgroundStartingGold;
          }
          
          // Add class starting gold
          if (classFormula) {
            try {
              // Parse and evaluate the formula
              const formula = classFormula.replace(/d(\d+)/g, (match, sides) => {
                const roll = Math.floor(Math.random() * parseInt(sides)) + 1;
                return roll.toString();
              });
              const classGold = eval(formula);
              totalGold += classGold;
            } catch (error) {
              console.error('Error evaluating class gold formula:', error);
            }
          }
          
          // Subtract equipment pack cost if one is selected
          if (newPackIndex >= 0 && creationOptions?.equipmentPacks?.[newPackIndex]) {
            const packCost = creationOptions.equipmentPacks[newPackIndex].cost;
            const costValue = parseInt(packCost.replace(/\D/g, ''), 10);
            if (!isNaN(costValue)) {
              totalGold -= costValue;
            }
          }
          
          setCalculatedGold(Math.max(0, totalGold));
        } catch (error) {
          console.error('Error calculating gold:', error);
        }
      };
      calculateGold();
    }, 100); // Small delay to ensure state is updated
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

              {/* Race selector */}
              <div className="mb-4">
                <div>
                  <label htmlFor="race-select" className="block text-sm font-medium text-slate-300 mb-2">Race</label>
                  <select
                    id="race-select"
                    value={race}
                    onChange={(e) => handleRaceChange(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-base text-white focus:border-purple-500 focus:outline-none appearance-none"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                  >
                    {races?.map((r) => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subrace selector - only show if race has subraces */}
              <div className="mb-4">
                <SubraceSelector
                  race={race}
                  selectedSubrace={subrace}
                  onSubraceChange={setSubrace}
                  disabled={!race}
                />
              </div>

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
                      <option key={cls.id} value={cls.name}>{cls.name}</option>
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
                              <span>{selectedSpellsCount}/{maxSpells} Spells</span>
                              {selectedSpellsCount >= maxSpells && <span>✓</span>}
                            </div>
                          </div>
                          {(cantripsNeeded > 0 || spellsNeeded > 0) && (
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
                            <option key={String(pack.id)} value={index}>
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
                                .map(item => `${item.quantity}x ${item.name}`)
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