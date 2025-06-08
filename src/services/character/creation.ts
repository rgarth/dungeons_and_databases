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
import { getBackgroundSkills, getEquipmentPacksFromDatabase } from '@/lib/dnd/character';
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
import { Weapon, Armor } from '@/lib/dnd/equipment';
import { getSubclassesForClass, choosesSubclassAtCreation } from '@/lib/dnd/subclasses';
import { getStartingEquipment } from '@/lib/dnd/character';

export type StatMethod = 'rolling-assign' | 'standard' | 'pointbuy';

export interface CharacterCreationData {
  // Basic Info
  name: string;
  race: string;
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
  weapons: never[]; // No weapons equipped initially
  inventoryWeapons: Weapon[];
  inventoryArmor: Armor[];
  
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
    // Fetch equipment packs from database
    let equipmentPacks = [];
    try {
      equipmentPacks = await getEquipmentPacksFromDatabase();
    } catch (error) {
      console.warn('Error fetching equipment packs:', error);
      // Provide minimal fallback
      equipmentPacks = [{
        id: 'fallback',
        name: 'Basic Adventurer Pack',
        description: 'Basic starting equipment',
        cost: '15 gp',
        items: [
          { name: 'Backpack', quantity: 1, type: 'Gear', cost: '2 gp', weight: 5, description: 'A backpack' },
          { name: 'Rope', quantity: 1, type: 'Gear', cost: '2 gp', weight: 10, description: 'Hemp rope' }
        ]
      }];
    }
    
    // Provide basic weapon suggestions instead of calling deprecated functions
    const weaponSuggestions = this.getBasicWeaponSuggestions(characterClass);
    const armorSuggestions = this.getBasicArmorSuggestions(characterClass);
    
    // Subclass info
    const subclasses = getSubclassesForClass(characterClass);
    const needsSubclassAtCreation = choosesSubclassAtCreation(characterClass);
    
    // Spellcasting info
    const spellcastingAbility = getSpellcastingAbility(characterClass);
    const canCastSpellsAtLevel1 = spellcastingAbility && getClassSpells(characterClass, 1).length > 0;
    const availableSpells = canCastSpellsAtLevel1 ? getClassSpells(characterClass, 1) : [];
    const spellSlots = canCastSpellsAtLevel1 ? getSpellSlots(characterClass, 1) : {};
    
    return {
      equipmentPacks,
      weaponSuggestions,
      armorSuggestions,
      subclasses,
      needsSubclassAtCreation,
      spellcasting: {
        ability: spellcastingAbility,
        canCastAtLevel1: canCastSpellsAtLevel1,
        availableSpells,
        spellSlots
      }
    };
  }

  // Basic weapon suggestions (will be enhanced with database lookups later)
  private getBasicWeaponSuggestions(characterClass: string): Weapon[] {
    // For now, return common weapons that each class would use
    // TODO: Replace with database lookups when weapon database is available
    const basicWeapons: Record<string, Partial<Weapon>[]> = {
      Barbarian: [
        { name: 'Greataxe', type: 'Martial', category: 'Melee', damage: '1d12', damageType: 'slashing' },
        { name: 'Handaxe', type: 'Simple', category: 'Melee', damage: '1d6', damageType: 'slashing' }
      ],
      Fighter: [
        { name: 'Longsword', type: 'Martial', category: 'Melee', damage: '1d8', damageType: 'slashing' },
        { name: 'Light Crossbow', type: 'Simple', category: 'Ranged', damage: '1d8', damageType: 'piercing' }
      ],
      Ranger: [
        { name: 'Shortsword', type: 'Martial', category: 'Melee', damage: '1d6', damageType: 'piercing' },
        { name: 'Longbow', type: 'Martial', category: 'Ranged', damage: '1d8', damageType: 'piercing' }
      ],
      Rogue: [
        { name: 'Shortsword', type: 'Martial', category: 'Melee', damage: '1d6', damageType: 'piercing' },
        { name: 'Shortbow', type: 'Martial', category: 'Ranged', damage: '1d6', damageType: 'piercing' }
      ],
      Cleric: [
        { name: 'Warhammer', type: 'Martial', category: 'Melee', damage: '1d8', damageType: 'bludgeoning' },
        { name: 'Light Crossbow', type: 'Simple', category: 'Ranged', damage: '1d8', damageType: 'piercing' }
      ],
      Wizard: [
        { name: 'Quarterstaff', type: 'Simple', category: 'Melee', damage: '1d6', damageType: 'bludgeoning' },
        { name: 'Dagger', type: 'Simple', category: 'Melee', damage: '1d4', damageType: 'piercing' }
      ]
    };

    const suggestions = basicWeapons[characterClass] || basicWeapons.Fighter;
    return suggestions.map(weapon => ({
      name: weapon.name || 'Unknown',
      type: weapon.type || 'Simple',
      category: weapon.category || 'Melee',
      damage: weapon.damage || '1d4',
      damageType: weapon.damageType || 'bludgeoning',
      properties: [],
      weight: 2,
      cost: '10 gp',
      stackable: false
    }));
  }

  // Basic armor suggestions (will be enhanced with database lookups later)
  private getBasicArmorSuggestions(characterClass: string): Armor[] {
    // For now, return armor that each class can typically use
    // TODO: Replace with database lookups when armor database is available
    const basicArmor: Record<string, Partial<Armor>[]> = {
      Barbarian: [
        { name: 'Leather', type: 'Light', baseAC: 11, stealthDisadvantage: false }
      ],
      Fighter: [
        { name: 'Chain Mail', type: 'Heavy', baseAC: 16, minStrength: 13, stealthDisadvantage: true },
        { name: 'Shield', type: 'Shield', baseAC: 2 }
      ],
      Ranger: [
        { name: 'Scale Mail', type: 'Medium', baseAC: 14, maxDexBonus: 2, stealthDisadvantage: true },
        { name: 'Shield', type: 'Shield', baseAC: 2 }
      ],
      Rogue: [
        { name: 'Leather', type: 'Light', baseAC: 11, stealthDisadvantage: false },
        { name: 'Studded Leather', type: 'Light', baseAC: 12, stealthDisadvantage: false }
      ],
      Cleric: [
        { name: 'Scale Mail', type: 'Medium', baseAC: 14, maxDexBonus: 2, stealthDisadvantage: true },
        { name: 'Shield', type: 'Shield', baseAC: 2 }
      ],
      Wizard: [], // Wizards typically don't wear armor
      Sorcerer: [], // Sorcerers typically don't wear armor
      Monk: [] // Monks don't wear armor
    };

    const suggestions = basicArmor[characterClass] || [];
    return suggestions.map(armor => ({
      name: armor.name || 'Leather',
      type: armor.type || 'Light',
      baseAC: armor.baseAC || 11,
      maxDexBonus: armor.maxDexBonus,
      minStrength: armor.minStrength,
      stealthDisadvantage: armor.stealthDisadvantage || false,
      weight: 10,
      cost: '10 gp',
      description: `Basic ${armor.type} armor for ${characterClass} class.`
    }));
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
    if (selectedSpells.length === 0) {
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
  async createCharacter(data: CharacterCreationData): Promise<CharacterCreationResult> {
    const { abilityScores, class: characterClass } = data;
    
    // Calculate basic stats
    const maxHitPoints = calculateHitPoints(1, abilityScores.constitution, characterClass);
    const armorClass = 10 + getModifier(abilityScores.dexterity);
    
    // Get starting equipment from the existing function
    const startingEquipmentList = getStartingEquipment(characterClass, data.background);
    console.log('=== CHARACTER CREATION DEBUG ===');
    console.log('Character Class:', characterClass);
    console.log('Background:', data.background);
    console.log('Starting equipment list:', startingEquipmentList);

    // The server-side API will handle armor separation and database lookups
    // Here we just pass the equipment list as general inventory
    const generalInventory: { name: string; quantity: number }[] = startingEquipmentList.map(item => ({
      name: item,
      quantity: 1
    }));
    
    const backgroundSkills = getBackgroundSkills(data.background);
    
    // Spellcasting
    const spellcastingAbility = getSpellcastingAbility(characterClass);
    const spellcastingStats = this.calculateSpellcastingStats(characterClass, abilityScores);
    const { spellsKnown, spellsPrepared } = this.determineSpellPreparation(
      characterClass, 
      data.selectedSpells, 
      abilityScores
    );
    const spellSlots = spellcastingAbility ? getSpellSlots(characterClass, 1) : undefined;
    
    // Actions
    const classActions = getClassActions(characterClass, 1);
    const allActions = [...BASIC_ACTIONS, ...classActions];
    
    // Starting gold based on background
    const startingGold = data.background === 'Noble' ? 25 : 15;
    
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
      
      // Ability scores
      strength: abilityScores.strength,
      dexterity: abilityScores.dexterity,
      constitution: abilityScores.constitution,
      intelligence: abilityScores.intelligence,
      wisdom: abilityScores.wisdom,
      charisma: abilityScores.charisma,
      
      // Combat stats
      hitPoints: maxHitPoints,
      maxHitPoints,
      armorClass,
      
      // Equipment - server will handle armor separation
      inventory: generalInventory,
      skills: backgroundSkills,
      weapons: [], // No weapons equipped initially
      inventoryWeapons: data.selectedWeapons.flatMap(w => Array(w.quantity).fill(w.weapon)),
      inventoryArmor: [], // Server will populate this from inventory
      
      // Spellcasting
      spellsKnown: spellsKnown || undefined,
      spellsPrepared: spellsPrepared || undefined,
      spellSlots,
      spellcastingAbility: spellcastingAbility || undefined,
      spellSaveDC: spellcastingStats?.spellSaveDC,
      spellAttackBonus: spellcastingStats?.spellAttackBonus,
      
      // Actions
      actions: allActions.filter(action => action.available),
      bonusActions: allActions.filter(action => action.type === 'Bonus Action' && action.available),
      reactions: allActions.filter(action => action.type === 'Reaction' && action.available),
      
      // Currency
      copperPieces: 0,
      silverPieces: 0,
      goldPieces: startingGold
    };
  }
}

// Export a singleton instance
export const characterCreationService = CharacterCreationService.getInstance(); 