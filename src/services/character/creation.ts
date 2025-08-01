import {
  AbilityScore,
  generateAbilityScores,
  generateRandomScoreArray,
  calculatePointBuyRemaining,
  getModifier,
  calculateHitPoints,
  getProficiencyBonus,
  ABILITY_SCORES
} from '@/lib/dnd/core';
import { getEquipmentPacksFromDatabase } from '@/lib/dnd/character';
import { 
  getSpellcastingAbility, 
  getClassSpells, 
  getSpellSlots, 
  calculateSpellSaveDC, 
  calculateSpellAttackBonus
} from '@/lib/dnd/spells';
import { getSpellcastingType } from '@/lib/dnd/level-up';
import { BASIC_ACTIONS, getClassActions } from '@/lib/dnd/combat';
import { Spell } from '@/lib/dnd/spells';
import { Weapon, MagicalWeapon, Armor, Ammunition } from '@/lib/dnd/equipment';
import { RacialFeaturesService, type RacialTrait } from './racial-features';
import { getSubclassesForClass, choosesSubclassAtCreation } from '@/lib/dnd/subclasses';
import { getRacialLanguages, getClassLanguages } from '@/lib/dnd/languages';
import { KiPointService } from './ki-points';


export type StatMethod = 'rolling-assign' | 'standard' | 'pointbuy';

export interface CharacterCreationData {
  // Basic Info
  name: string;
  race: string;
  subrace?: string;
  class: string;
  subclass?: string;
  background: string;
  alignment: string;
  gender?: string;

  // Ability Scores
  statMethod: StatMethod;
  abilityScores: Record<AbilityScore, number>;
  randomScoreArray?: number[]; // For rolling method

  // Equipment & Spells
  selectedEquipmentPack: number;
  selectedWeapons: { weapon: Weapon; quantity: number }[];
  selectedArmor: Armor[];
  selectedAmmunition: Ammunition[];
  selectedSpells: Spell[];

  // Background characteristics
  backgroundCharacteristics?: {
    personalityTraits: string[];
    ideals: string[];
    bonds: string[];
    flaws: string[];
  };

  languages?: string[];
}

export interface CharacterCreationResult {
  // All the data needed to create a character in the database
  name: string;
  race: string;
  class: string;
  subclass?: string;
  level: number;
  alignment: string;
  background: string;
  
  // Ability scores
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  
  // Combat stats
  hitPoints: number;
  maxHitPoints: number;
  armorClass: number;
  
  // Equipment
  inventory: { name: string; quantity: number }[];
  skills: string[];
  skillSources?: { [skillName: string]: 'class' | 'background' | 'racial' | 'feat' | 'other'; };
  languageSources?: { [languageName: string]: 'background' | 'racial' | 'class' | 'feat' | 'other' };
  weapons: (Weapon | MagicalWeapon)[]; // All weapons with equipped boolean
  armor: Armor[];
  ammunition: Ammunition[];
  
  // Spellcasting
  spellsKnown?: Spell[] | null;
  spellsPrepared?: Spell[] | null;
  spellSlots?: Record<number, number>;
  spellcastingAbility?: string;
  spellSaveDC?: number;
  spellAttackBonus?: number;
  
  // Actions
  actions: { type: string; name: string; description?: string; available: boolean }[];
  bonusActions: { type: string; name: string; description?: string; available: boolean }[];
  reactions: { type: string; name: string; description?: string; available: boolean }[];
  
  // Currency
  copperPieces: number;
  silverPieces: number;
  goldPieces: number;
  goldRollDetails?: string;

  // Ki points (for Monks)
  kiPoints?: number;
  usedKiPoints?: number;

  // Background characteristics
  backgroundCharacteristics: {
    personalityTraits: string[];
    ideals: string[];
    bonds: string[];
    flaws: string[];
  };

  // Racial traits
  racialTraits: RacialTrait[];
}

export class CharacterCreationService {
  private static instance: CharacterCreationService;
  private creationOptionsCache: Map<string, {
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
    subclasses: { name: string; description?: string }[];
    needsSubclassAtCreation: boolean;
    spellcasting: {
      ability: string | null;
      canCastAtLevel1: boolean;
      availableSpells: Spell[];
      spellSlots: Record<number, number>;
    };
  }> = new Map();

  private constructor() {}

  public static getInstance(): CharacterCreationService {
    if (!CharacterCreationService.instance) {
      CharacterCreationService.instance = new CharacterCreationService();
    }
    return CharacterCreationService.instance;
  }

  // Generate ability scores based on method
  generateAbilityScores(method: StatMethod): { scores: Record<AbilityScore, number>; randomArray?: number[] } {
    if (method === 'rolling-assign') {
      const randomArray = generateRandomScoreArray();
      const scores = ABILITY_SCORES.reduce((acc, ability, index) => {
        acc[ability] = randomArray[index] || 10;
        return acc;
      }, {} as Record<AbilityScore, number>);
      return { scores, randomArray };
    } else {
      const scores = generateAbilityScores(method);
      return { scores };
    }
  }

  // Validate point buy scores
  validatePointBuy(scores: Record<AbilityScore, number>): { isValid: boolean; remaining: number } {
    const remaining = calculatePointBuyRemaining(scores);
    return { isValid: remaining === 0, remaining };
  }

  // Apply point buy change to ability score
  applyPointBuyChange(
    scores: Record<AbilityScore, number>, 
    ability: AbilityScore, 
    change: number
  ): Record<AbilityScore, number> | null {
    const newScore = scores[ability] + change;
    if (newScore < 8 || newScore > 15) return null;
    
    const newScores = { ...scores, [ability]: newScore };
    const remaining = calculatePointBuyRemaining(newScores);
    
    if (remaining >= 0) {
      return newScores;
    }
    return null;
  }

  // Swap ability scores (for drag & drop in rolling/standard methods)
  swapAbilityScores(
    scores: Record<AbilityScore, number>,
    fromAbility: AbilityScore,
    toAbility: AbilityScore
  ): Record<AbilityScore, number> {
    return {
      ...scores,
      [fromAbility]: scores[toAbility],
      [toAbility]: scores[fromAbility]
    };
  }

  // Get character creation options with caching
  async getCreationOptions(characterClass: string) {
    // Check cache first
    if (this.creationOptionsCache.has(characterClass)) {
      console.log('⚡ Using cached creation options for', characterClass);
      return this.creationOptionsCache.get(characterClass);
    }

    console.log('📡 Fetching creation options for', characterClass);
    
    // Get spells for spellcasting classes
    const spellcastingAbility = getSpellcastingAbility(characterClass);
    let availableSpells: Spell[] = [];
    let canCastAtLevel1 = false;
    
    if (spellcastingAbility) {
      availableSpells = await getClassSpells(characterClass, 1);
      canCastAtLevel1 = availableSpells.length > 0;
    }

    // Get subclasses from hardcoded data (until we move to database)
    const subclasses = getSubclassesForClass(characterClass);
    const needsSubclassAtCreation = choosesSubclassAtCreation(characterClass);

    // Get equipment packs from database and transform to expected format
    let equipmentPacks = [];
    try {
      const rawEquipmentPacks = await getEquipmentPacksFromDatabase();
      // Transform equipment pack data to match expected interface
      equipmentPacks = rawEquipmentPacks.map((pack: { name: string; description: string; cost: string; items: Array<{ equipmentName: string; quantity: number }> }) => ({
        ...pack,
        items: pack.items.map((item: { equipmentName: string; quantity: number }) => ({
          name: item.equipmentName, // Transform equipmentName to name
          quantity: item.quantity,
          type: '', // Will be populated from equipment data if needed
          cost: '', // Will be populated from equipment data if needed
          weight: 0, // Will be populated from equipment data if needed
          description: null // Will be populated from equipment data if needed
        }))
      }));
    } catch (error) {
      console.warn('Error fetching equipment packs:', error);
      equipmentPacks = [];
    }

    // All suggestions now come from database, not hardcoded functions
    const weaponSuggestions: Weapon[] = []; // Will be populated from database
    const armorSuggestions: Armor[] = []; // Will be populated from database

    const options = {
      equipmentPacks,
      weaponSuggestions,
      armorSuggestions,
      subclasses,
      needsSubclassAtCreation,
      spellcasting: {
        ability: spellcastingAbility,
        canCastAtLevel1,
        availableSpells,
        spellSlots: spellcastingAbility ? getSpellSlots(characterClass, 1) : {}
      }
    };

    // Cache the result
    this.creationOptionsCache.set(characterClass, options);
    console.log('✅ Cached creation options for', characterClass);

    return options;
  }

  // Calculate spellcasting stats
  calculateSpellcastingStats(
    characterClass: string,
    abilityScores: Record<AbilityScore, number>
  ): { spellSaveDC?: number; spellAttackBonus?: number } | null {
    const spellcastingAbility = getSpellcastingAbility(characterClass);
    if (!spellcastingAbility) return null;

    const proficiencyBonus = getProficiencyBonus(1);
    const abilityScore = abilityScores[spellcastingAbility as AbilityScore];
    
    return {
      spellSaveDC: calculateSpellSaveDC(abilityScore, proficiencyBonus),
      spellAttackBonus: calculateSpellAttackBonus(abilityScore, proficiencyBonus)
    };
  }

  // Determine spell preparation based on class type
  determineSpellPreparation(
    characterClass: string,
    selectedSpells: Spell[]
  ): { spellsKnown: Spell[] | null; spellsPrepared: Spell[] | null } {
    if (!selectedSpells || selectedSpells.length === 0) {
      return { spellsKnown: null, spellsPrepared: null };
    }

    const spellcastingType = getSpellcastingType(characterClass);
    
    switch (spellcastingType) {
      case 'known':
        // Bards, Sorcerers, Warlocks, Rangers, EKs, ATs - always have their spells "prepared"
        return {
          spellsKnown: selectedSpells,
          spellsPrepared: selectedSpells
        };
        
      case 'prepared':
        // Clerics, Druids, Paladins - know all class spells, only cantrips are selected during creation
        const selectedCantrips = selectedSpells.filter(spell => spell.level === 0);
        return {
          spellsKnown: null, // They know all class spells, not specific ones
          spellsPrepared: selectedCantrips // Only cantrips are prepared initially - player will choose other spells later
        };
        
      case 'spellbook':
        // Wizards - have a spellbook with selected spells, but prepare from it
        return {
          spellsKnown: selectedSpells, // These go in the spellbook
          spellsPrepared: selectedSpells.filter(spell => spell.level === 0) // Only cantrips are prepared initially
        };
        
      default:
        return { spellsKnown: null, spellsPrepared: null };
    }
  }

  // Validate spell selection limits
  validateSpellSelection(characterClass: string, selectedSpells: Spell[]): { isValid: boolean; maxSpells: number } {
    const maxSpells = characterClass === 'Wizard' ? 6 : 4; // Simplified limit
    return {
      isValid: selectedSpells.length <= maxSpells,
      maxSpells
    };
  }

  // Create final character data
  async createCharacter(
    data: CharacterCreationData, 
    equipmentPackItems: { name: string; quantity: number }[] = []
  ): Promise<CharacterCreationResult> {
    const { abilityScores, class: characterClass, race, subrace } = data;
    
    // Apply racial ability score increases
    // eslint-disable-next-line prefer-const
    let finalAbilityScores: Record<AbilityScore, number> = { ...(await RacialFeaturesService.applyRacialAbilityScores(abilityScores, race)) } as Record<AbilityScore, number>;
    
    // Apply subrace ability score increases if subrace is selected
    if (subrace) {
      try {
        const subraceResponse = await fetch(`/api/subraces?race=${encodeURIComponent(race)}`);
        if (subraceResponse.ok) {
          const subraces = await subraceResponse.json();
          const subraceData = subraces.find((s: { name: string }) => s.name === subrace);
          if (subraceData) {
            // Get subrace traits from the new traits API
            try {
              const traitsResponse = await fetch(`/api/traits?subrace=${encodeURIComponent(subrace)}`);
              if (traitsResponse.ok) {
                const traits = await traitsResponse.json();
                traits.forEach((trait: { name: string; description: string; type: string }) => {
                  racialTraits.push({
                    name: trait.name,
                    description: trait.description,
                    type: trait.type as 'passive' | 'active'
                  });
                });
              }
            } catch (error) {
              console.warn('Failed to fetch subrace traits from traits API:', error);
            }
          }
        }
      } catch (error) {
        console.warn('Failed to fetch subrace data:', error);
      }
    }
    
    // Get racial traits (including subrace traits)
    const racialTraits = await RacialFeaturesService.getRacialTraits(race);
    
    // Get hit die from database - no fallback, this must succeed
    const classResponse = await fetch('/api/classes');
    if (!classResponse.ok) {
      throw new Error('Failed to fetch class data for character creation');
    }
    const classData = await classResponse.json();
    const foundClass = classData.find((c: { name: string; hitDie: number }) => c.name === characterClass);
    if (!foundClass) {
      throw new Error(`Class "${characterClass}" not found in database`);
    }
    const hitDie = foundClass.hitDie;
    
    // Calculate basic stats using final ability scores
    const maxHitPoints = calculateHitPoints(1, finalAbilityScores.constitution, hitDie);
    const armorClass = 10 + getModifier(finalAbilityScores.dexterity);
    
    // Fetch equipment packs to get selected pack items
    let equipmentPacks = [];
    try {
      equipmentPacks = await getEquipmentPacksFromDatabase();
    } catch (error) {
      console.warn('Error fetching equipment packs during character creation:', error);
      equipmentPacks = [];
    }
    
    console.log('=== CHARACTER CREATION DEBUG ===');
    console.log('Character Class:', characterClass);
    console.log('Character Race:', data.race);
    console.log('Background:', data.background);
    console.log('Selected Equipment Pack ID:', data.selectedEquipmentPack);
    console.log('Available Equipment Packs:', equipmentPacks.length);
    console.log('Selected Weapons:', data.selectedWeapons);
    console.log('Selected Armor:', data.selectedArmor);

    // Get equipment pack items if a pack was selected (use passed parameter or fetch from pack)
    let packItems: { name: string; quantity: number }[] = [];
    if (equipmentPackItems.length === 0 && data.selectedEquipmentPack !== undefined && data.selectedEquipmentPack >= 0 && equipmentPacks[data.selectedEquipmentPack]) {
      const selectedPack = equipmentPacks[data.selectedEquipmentPack];
      packItems = selectedPack.items.map((item: { equipmentName: string; quantity: number }) => ({
        name: item.equipmentName,
        quantity: item.quantity
      }));
      console.log('Selected equipment pack items:', packItems);
    } else if (data.selectedEquipmentPack === -1) {
      console.log('No equipment pack selected - using starting gold only');
    } else {
      packItems = equipmentPackItems;
    }

    // Get race equipment from database (most races don't have starting equipment)
    let raceItems: string[] = [];
    try {
      const raceResponse = await fetch('/api/races');
      if (raceResponse.ok) {
        const races = await raceResponse.json();
        const raceData = races.find((race: { name: string; equipment?: string[] }) => race.name === data.race);
        raceItems = raceData?.equipment || [];
        if (raceItems.length > 0) {
          console.log(`Race ${data.race} provides equipment:`, raceItems);
        }
      }
    } catch (error) {
      console.warn('Failed to fetch race equipment, using empty array:', error);
    }

    // Get background skills and languages from database
    let backgroundSkills: string[] = [];
    let backgroundData: { name: string; skillProficiencies: string[]; languages?: string[] } | undefined = undefined;
    try {
      const backgroundResponse = await fetch('/api/backgrounds');
      if (backgroundResponse.ok) {
        const backgrounds = await backgroundResponse.json();
        backgroundData = backgrounds.find((bg: { name: string; skillProficiencies: string[] }) => bg.name === data.background);
        backgroundSkills = backgroundData?.skillProficiencies || [];
      }
    } catch (error) {
      console.warn('Failed to fetch background skills, using empty array:', error);
    }
    
    // Combine all equipment sources with duplicate prevention
    const allEquipmentSources = [
      ...packItems,
      ...raceItems.map(item => ({ name: item, quantity: 1 })),
      ...backgroundSkills.map(skill => ({ name: skill, quantity: 1 }))
    ];
    
    // Merge duplicates by combining quantities
    const equipmentMap = new Map<string, number>();
    allEquipmentSources.forEach(item => {
      const currentQuantity = equipmentMap.get(item.name) || 0;
      equipmentMap.set(item.name, currentQuantity + item.quantity);
    });
    
    // Convert back to array format
    const generalInventory: { name: string; quantity: number }[] = Array.from(equipmentMap.entries()).map(([name, quantity]) => ({
      name,
      quantity
    }));
    
    console.log('=== EQUIPMENT COMBINATION SUMMARY ===');
    console.log('Equipment Pack items:', packItems.length);
    console.log('Race equipment items:', raceItems.length);
    console.log('Background equipment items:', backgroundSkills.length);
    console.log('Final combined inventory (duplicates merged):', generalInventory.length);
    
    // Spellcasting
    const spellcastingAbility = getSpellcastingAbility(characterClass);
    const spellcastingStats = this.calculateSpellcastingStats(characterClass, finalAbilityScores);
    const { spellsKnown, spellsPrepared } = this.determineSpellPreparation(
      characterClass, 
      data.selectedSpells
    );
    const spellSlots = spellcastingAbility ? getSpellSlots(characterClass, 1) : undefined;
    
    // Actions
    const classActions = getClassActions(characterClass, 1);
    const allActions = [...BASIC_ACTIONS, ...classActions];
    
    // Add extra gold if no equipment pack was selected (D&D 5e rules)
    let startingGold = 0;
    let goldRollDetails: string | undefined = undefined;
    
    if (data.selectedEquipmentPack === -1) {
      // No equipment pack selected - roll dice for starting gold using CLASS startingGoldFormula
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
              for (let i = 0; i < numDice; i++) {
                const roll = Math.floor(Math.random() * dieSize) + 1;
                rolls.push(roll);
                startingGold += roll;
              }
              startingGold *= multiplier;
              goldRollDetails = `${characterClass} ${numDice}d${dieSize}${multiplier > 1 ? `×${multiplier}` : ''} [${rolls.join(', ')}] = ${startingGold} gp`;
            }
          }
        }
      } catch (error) {
        console.warn('Failed to fetch class starting gold formula:', error);
      }
      
      console.log(`No equipment pack selected - ${goldRollDetails} (total: ${startingGold} gp)`);
    } else {
      // Equipment pack selected - use background starting gold (fixed amount)
      try {
        const backgroundResponse = await fetch('/api/backgrounds');
        if (backgroundResponse.ok) {
          const backgrounds = await backgroundResponse.json();
          const backgroundData = backgrounds.find((bg: { name: string; startingGold?: number }) => bg.name === data.background);
          if (backgroundData?.startingGold) {
            startingGold = backgroundData.startingGold;
            console.log(`Equipment pack selected - using background starting gold: ${startingGold} gp`);
          } else {
            console.warn(`No starting gold found for background: ${data.background}`);
          }
        }
      } catch (error) {
        console.warn('Failed to fetch background starting gold:', error);
      }
    }
    
    console.log('=== CLIENT-SIDE EQUIPMENT ===');
    console.log('General inventory (server will separate armor):', generalInventory);
    
    // Create skillSources mapping for background skills
    const skillSources: { [skillName: string]: 'class' | 'background' | 'racial' | 'feat' | 'other' } = {};
    backgroundSkills.forEach(skill => {
      skillSources[skill] = 'background';
    });

    // Create languageSources mapping for background and racial languages
    const languageSources: { [languageName: string]: 'background' | 'racial' | 'class' | 'feat' | 'other' } = {};
    // Background language requirements
    if (backgroundData && backgroundData.languages) {
      for (const lang of backgroundData.languages) {
        if (lang.includes('of your choice')) {
          // For now, just mark all non-automatic languages as background (UI should refine this)
          (data.languages || []).forEach(language => {
            if (!getRacialLanguages(data.race).includes(language) && !getClassLanguages(data.class).includes(language)) {
              languageSources[language] = 'background';
            }
          });
        }
      }
    }
    // Racial language bonuses
    const racialBonus = getRacialLanguageBonus(data.race);
    if (racialBonus) {
      (data.languages || []).forEach(language => {
        if (!languageSources[language] && !getClassLanguages(data.class).includes(language)) {
          languageSources[language] = 'racial';
        }
      });
    }

    return {
      name: data.name.trim(),
      race: data.race,
      class: characterClass,
      subclass: data.subclass || undefined,
      level: 1,
      alignment: data.alignment,
      background: data.background,
      
      // Ability scores with racial increases applied
      strength: finalAbilityScores.strength,
      dexterity: finalAbilityScores.dexterity,
      constitution: finalAbilityScores.constitution,
      intelligence: finalAbilityScores.intelligence,
      wisdom: finalAbilityScores.wisdom,
      charisma: finalAbilityScores.charisma,
      
      // Combat stats
      hitPoints: maxHitPoints,
      maxHitPoints,
      armorClass,
      
      // Equipment - server will handle armor separation
      inventory: generalInventory,
      skills: backgroundSkills,
      skillSources: skillSources,
      languageSources: languageSources,
      weapons: (data.selectedWeapons || []).flatMap(w => 
        Array(w.quantity).fill({ ...w.weapon, equipped: false })
      ), // All weapons start unequipped
      armor: (data.selectedArmor || []).map(armor => ({ ...armor, equipped: false })),
      ammunition: data.selectedAmmunition || [],
      
      // Spellcasting
      spellsKnown: spellsKnown || undefined,
      spellsPrepared: spellsPrepared || undefined,
      spellSlots,
      spellcastingAbility: spellcastingAbility || undefined,
      spellSaveDC: spellcastingStats?.spellSaveDC || undefined,
      spellAttackBonus: spellcastingStats?.spellAttackBonus || undefined,
      
      // Actions
      actions: allActions.filter(action => action.type === 'Action'),
      bonusActions: allActions.filter(action => action.type === 'Bonus Action'),
      reactions: allActions.filter(action => action.type === 'Reaction'),
      
      // Currency
      copperPieces: 0,
      silverPieces: 0,
      goldPieces: startingGold,
      goldRollDetails,

      // Ki points (for Monks)
      kiPoints: characterClass === 'Monk' ? KiPointService.getTotalKiPoints(1) : 0,
      usedKiPoints: 0,

      // Background characteristics
      backgroundCharacteristics: data.backgroundCharacteristics || {
        personalityTraits: [],
        ideals: [],
        bonds: [],
        flaws: []
      },

      // Racial traits
      racialTraits
    };
  }
}

// Export a singleton instance
export const characterCreationService = CharacterCreationService.getInstance();

// Helper function to get racial language bonuses (copy from BackgroundTab)
function getRacialLanguageBonus(race: string) {
  const racialBonuses: Record<string, { count: number; description: string }> = {
    'Human': { count: 1, description: 'One language of your choice' },
    'Half-Elf': { count: 1, description: 'One language of your choice' },
    // Add other races with language bonuses as needed
  };
  return racialBonuses[race] || null;
} 