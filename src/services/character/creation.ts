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
  selectedArmor: Armor[];
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
    // Get spells for spellcasting classes
    const spellcastingAbility = getSpellcastingAbility(characterClass);
    let availableSpells: Spell[] = [];
    
    if (spellcastingAbility) {
      availableSpells = getClassSpells(characterClass, 1);
    }

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
      availableSpells,
      equipmentPacks,
      weaponSuggestions,
      armorSuggestions,
      spellcastingAbility
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
    console.log('Background:', data.background);
    console.log('Selected Equipment Pack ID:', data.selectedEquipmentPack);
    console.log('Available Equipment Packs:', equipmentPacks.length);
    console.log('Selected Weapons:', data.selectedWeapons);
    console.log('Selected Armor:', data.selectedArmor);

    // Get equipment pack items if a pack was selected
    let equipmentPackItems: { name: string; quantity: number }[] = [];
    if (data.selectedEquipmentPack !== undefined && equipmentPacks[data.selectedEquipmentPack]) {
      const selectedPack = equipmentPacks[data.selectedEquipmentPack];
      equipmentPackItems = selectedPack.items.map((item: any) => ({
        name: item.name,
        quantity: item.quantity
      }));
      console.log('Selected equipment pack items:', equipmentPackItems);
    }

    // Background equipment (non-weapon/armor items)
    const backgroundEquipment: Record<string, string[]> = {
      Acolyte: ['Holy Symbol', 'Prayer Book', 'Incense (5)', 'Vestments', 'Common Clothes', 'Belt Pouch'],
      Criminal: ['Crowbar', 'Dark Common Clothes', 'Hood', 'Belt Pouch'],
      'Folk Hero': ['Artisan Tools', 'Shovel', 'Iron Pot', 'Common Clothes', 'Belt Pouch'],
      Noble: ['Signet Ring', 'Scroll of Pedigree', 'Fine Clothes', 'Belt Pouch'],
      Sage: ['Ink Bottle', 'Quill', 'Small Knife', 'Letter', 'Common Clothes', 'Belt Pouch'],
      Soldier: ['Insignia of Rank', 'Trophy', 'Deck of Cards', 'Common Clothes', 'Belt Pouch']
    };
    
    const backgroundItems = backgroundEquipment[data.background] || [];
    
    // Combine equipment pack items + background items
    const generalInventory: { name: string; quantity: number }[] = [
      ...equipmentPackItems,
      ...backgroundItems.map(item => ({ name: item, quantity: 1 }))
    ];
    
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
      inventoryArmor: data.selectedArmor || [],
      
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