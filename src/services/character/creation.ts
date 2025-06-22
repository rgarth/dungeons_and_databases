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

  // Racial traits
  racialTraits: RacialTrait[];
}

export class CharacterCreationService {
  private static instance: CharacterCreationService;

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

  // Get character creation options
  async getCreationOptions(characterClass: string) {
    // Get spells for spellcasting classes
    const spellcastingAbility = getSpellcastingAbility(characterClass);
    let availableSpells: Spell[] = [];
    let canCastAtLevel1 = false;
    
    if (spellcastingAbility) {
      availableSpells = getClassSpells(characterClass, 1);
      canCastAtLevel1 = availableSpells.length > 0;
    }

    // Get subclasses from hardcoded data (until we move to database)
    const { getSubclassesForClass, choosesSubclassAtCreation } = await import('@/lib/dnd/subclasses');
    const subclasses = getSubclassesForClass(characterClass);
    const needsSubclassAtCreation = choosesSubclassAtCreation(characterClass);

    // Get equipment packs from database
    let equipmentPacks = [];
    try {
      equipmentPacks = await getEquipmentPacksFromDatabase();
    } catch (error) {
      console.warn('Error fetching equipment packs:', error);
      equipmentPacks = [];
    }

    // All suggestions now come from database, not hardcoded functions
    const weaponSuggestions: Weapon[] = []; // Will be populated from database
    const armorSuggestions: Armor[] = []; // Will be populated from database

    return {
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
    selectedSpells: Spell[],
    abilityScores: Record<AbilityScore, number>
  ): { spellsKnown: Spell[] | null; spellsPrepared: Spell[] | null } {
    if (!selectedSpells || selectedSpells.length === 0) {
      return { spellsKnown: null, spellsPrepared: null };
    }

    const spellcastingAbility = getSpellcastingAbility(characterClass);
    if (!spellcastingAbility) {
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
        
      case 'spellbook':
        // Wizards - spells go in spellbook, prepare subset daily
        const maxPreparedWizard = 1 + getModifier(abilityScores.intelligence);
        return {
          spellsKnown: selectedSpells,
          spellsPrepared: selectedSpells.slice(0, maxPreparedWizard)
        };
        
      case 'prepared':
        // Clerics, Druids, Paladins - have access to all class spells, prepare subset
        return {
          spellsKnown: null, // They know all class spells
          spellsPrepared: selectedSpells
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
  async createCharacter(data: CharacterCreationData, equipmentPackItems: { name: string; quantity: number }[] = []): Promise<CharacterCreationResult> {
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
          const subraceData = subraces.find((s: { name: string; abilityScoreIncrease: string }) => s.name === subrace);
          if (subraceData) {
            // Parse subrace ability score increase (e.g., "Intelligence +1")
            const abilityMatch = subraceData.abilityScoreIncrease.match(/(\w+)\s+\+(\d+)/);
            if (abilityMatch) {
              const ability = abilityMatch[1].toLowerCase() as AbilityScore;
              const bonus = parseInt(abilityMatch[2], 10);
              finalAbilityScores[ability] += bonus;
            }
          }
        }
      } catch (error) {
        console.warn('Failed to fetch subrace data:', error);
      }
    }
    
    // Get racial traits (including subrace traits)
    const racialTraits = await RacialFeaturesService.getRacialTraits(race);
    
    // Add subrace traits if subrace is selected
    if (subrace) {
      try {
        const subraceResponse = await fetch(`/api/subraces?race=${encodeURIComponent(race)}`);
        if (subraceResponse.ok) {
          const subraces = await subraceResponse.json();
          const subraceData = subraces.find((s: { name: string; traits: string[] }) => s.name === subrace);
          if (subraceData) {
            // Add subrace traits to racial traits
            subraceData.traits.forEach((traitName: string) => {
              racialTraits.push({
                name: traitName,
                description: `${subrace} racial trait`,
                type: 'passive'
              });
            });
          }
        }
      } catch (error) {
        console.warn('Failed to fetch subrace traits:', error);
      }
    }
    
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
      packItems = selectedPack.items.map((item: { name: string; quantity: number }) => ({
        name: item.name,
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

    // Get background equipment from database
    let backgroundItems: string[] = [];
    try {
      const backgroundResponse = await fetch('/api/backgrounds');
      if (backgroundResponse.ok) {
        const backgrounds = await backgroundResponse.json();
        const backgroundData = backgrounds.find((bg: { name: string; equipment: string[] }) => bg.name === data.background);
        backgroundItems = backgroundData?.equipment || [];
        if (backgroundItems.length > 0) {
          console.log(`Background ${data.background} provides equipment:`, backgroundItems);
        }
      }
    } catch (error) {
      console.warn('Failed to fetch background equipment, using empty array:', error);
    }
    
    // Combine all equipment sources with duplicate prevention
    const allEquipmentSources = [
      ...packItems,
      ...raceItems.map(item => ({ name: item, quantity: 1 })),
      ...backgroundItems.map(item => ({ name: item, quantity: 1 }))
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
    console.log('Background equipment items:', backgroundItems.length);
    console.log('Final combined inventory (duplicates merged):', generalInventory.length);
    
    // Get background skills from database
    let backgroundSkills: string[] = [];
    try {
      const backgroundResponse = await fetch('/api/backgrounds');
      if (backgroundResponse.ok) {
        const backgrounds = await backgroundResponse.json();
        const backgroundData = backgrounds.find((bg: { name: string; skillProficiencies: string[] }) => bg.name === data.background);
        backgroundSkills = backgroundData?.skillProficiencies || [];
      }
    } catch (error) {
      console.warn('Failed to fetch background skills, using empty array:', error);
    }
    
    // Spellcasting
    const spellcastingAbility = getSpellcastingAbility(characterClass);
    const spellcastingStats = this.calculateSpellcastingStats(characterClass, finalAbilityScores);
    const { spellsKnown, spellsPrepared } = this.determineSpellPreparation(
      characterClass, 
      data.selectedSpells, 
      finalAbilityScores
    );
    const spellSlots = spellcastingAbility ? getSpellSlots(characterClass, 1) : undefined;
    
    // Actions
    const classActions = getClassActions(characterClass, 1);
    const allActions = [...BASIC_ACTIONS, ...classActions];
    
    // Add extra gold if no equipment pack was selected (D&D 5e rules)
    let startingGold = 0;
    let goldRollDetails: string | undefined = undefined;
    
    if (data.selectedEquipmentPack === -1) {
      // No equipment pack selected - roll dice for starting gold
      // Get class starting gold formula from database
      let classGold = 0;
      let classRoll = '';
      try {
        const classResponse = await fetch(`/api/classes/${encodeURIComponent(characterClass)}`);
        if (classResponse.ok) {
          const classData = await classResponse.json();
          if (classData.startingGoldFormula) {
            // Parse and roll the dice formula (e.g., '5d4*10')
            const match = classData.startingGoldFormula.match(/(\d+)d(\d+)(\*\d+)?/);
            if (match) {
              const numDice = parseInt(match[1], 10);
              const dieSize = parseInt(match[2], 10);
              const multiplier = match[3] ? parseInt(match[3].substring(1), 10) : 1;
              const rolls: number[] = [];
              for (let i = 0; i < numDice; i++) {
                const roll = Math.floor(Math.random() * dieSize) + 1;
                rolls.push(roll);
                classGold += roll;
              }
              classGold *= multiplier;
              classRoll = `${numDice}d${dieSize}${multiplier > 1 ? `×${multiplier}` : ''} [${rolls.join(', ')}] = ${classGold} gp`;
            }
          }
        }
      } catch (error) {
        console.warn('Failed to fetch class starting gold formula:', error);
      }
      
      // Get background starting gold formula from database
      let backgroundGold = 0;
      let backgroundRoll = '';
      try {
        const backgroundResponse = await fetch('/api/backgrounds');
        if (backgroundResponse.ok) {
          const backgrounds = await backgroundResponse.json();
          const backgroundData = backgrounds.find((bg: { name: string; startingGoldFormula?: string | null }) => bg.name === data.background);
          if (backgroundData?.startingGoldFormula) {
            const match = backgroundData.startingGoldFormula.match(/(\d+)d(\d+)(\*\d+)?/);
            if (match) {
              const numDice = parseInt(match[1], 10);
              const dieSize = parseInt(match[2], 10);
              const multiplier = match[3] ? parseInt(match[3].substring(1), 10) : 1;
              const rolls: number[] = [];
              for (let i = 0; i < numDice; i++) {
                const roll = Math.floor(Math.random() * dieSize) + 1;
                rolls.push(roll);
                backgroundGold += roll;
              }
              backgroundGold *= multiplier;
              backgroundRoll = `${numDice}d${dieSize}${multiplier > 1 ? `×${multiplier}` : ''} [${rolls.join(', ')}] = ${backgroundGold} gp`;
            }
          }
        }
      } catch (error) {
        console.warn('Failed to fetch background starting gold formula:', error);
      }
      
      startingGold = classGold + backgroundGold;
      goldRollDetails = `Class: ${characterClass} ${classRoll}${backgroundRoll ? `, Background: ${data.background} ${backgroundRoll}` : ''}`;
      console.log(`No equipment pack selected - ${goldRollDetails} (total: ${startingGold} gp)`);
    } else {
      // Equipment pack selected - use background starting gold
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

      // Racial traits
      racialTraits
    };
  }
}

// Export a singleton instance
export const characterCreationService = CharacterCreationService.getInstance(); 