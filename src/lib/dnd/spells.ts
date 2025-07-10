// Spell definitions and magic system for D&D 5e
import { getModifier } from './core';
import { getSpellsByClass } from './spell-data-helper';

export interface Spell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  classes: string[];
  // Extended 5e SRD fields
  ritual?: boolean;
  concentration?: boolean;
  material?: string | null;
  somatic?: boolean;
  verbal?: boolean;
  higherLevels?: string | null;
  damageType?: string | null;
  saveType?: string | null;
  attackType?: 'melee' | 'ranged' | 'none';
  areaOfEffect?: {
    type: 'sphere' | 'cube' | 'cylinder' | 'line' | 'cone' | 'square';
    size: number;
    unit: 'feet' | 'miles';
  } | null;
  damageAtSlotLevel?: Record<number, string> | null;
  healAtSlotLevel?: Record<number, string> | null;
  atHigherLevels?: string | null;
  source?: string | null;
  page?: number | null;
}

export const SPELL_SCHOOLS = [
  'Abjuration', 'Conjuration', 'Divination', 'Enchantment', 
  'Evocation', 'Illusion', 'Necromancy', 'Transmutation'
] as const;

/**
 * @deprecated This hardcoded SPELLS array has been removed in favor of database content.
 * Use spellsData from '../../../prisma/data/spells-data' instead.
 * Database contains 396 spells vs 25 in this old array.
 * 
 * Previously contained only 25 placeholder spells, now using full D&D 5e SRD database.
 */

// UTILITY FUNCTIONS
export function getSpellcastingAbility(characterClass: string): string | null {
  const spellcasters: Record<string, string> = {
    'Bard': 'charisma',
    'Cleric': 'wisdom', 
    'Druid': 'wisdom',
    'Paladin': 'charisma',
    'Ranger': 'wisdom',
    'Sorcerer': 'charisma',
    'Warlock': 'charisma',
    'Wizard': 'intelligence'
  };
  
  return spellcasters[characterClass] || null;
}

export function calculateSpellSaveDC(spellcastingAbility: number, proficiencyBonus: number): number {
  return 8 + getModifier(spellcastingAbility) + proficiencyBonus;
}

export function calculateSpellAttackBonus(spellcastingAbility: number, proficiencyBonus: number): number {
  return getModifier(spellcastingAbility) + proficiencyBonus;
}

export function getSpellSlots(characterClass: string, level: number): Record<number, number> {
  // Simplified spell slot progression for full casters
  const fullCasterSlots: Record<number, Record<number, number>> = {
    1: { 1: 2 },
    2: { 1: 3 },
    3: { 1: 4, 2: 2 },
    4: { 1: 4, 2: 3 },
    5: { 1: 4, 2: 3, 3: 2 }
    // Add more levels as needed
  };
  
  // Full casters: Bard, Cleric, Druid, Sorcerer, Wizard
  const fullCasters = ['Bard', 'Cleric', 'Druid', 'Sorcerer', 'Wizard'];
  
  if (fullCasters.includes(characterClass)) {
    return fullCasterSlots[level] || {};
  }
  
  // Half casters start at level 2
  if (['Paladin', 'Ranger'].includes(characterClass) && level >= 2) {
    const halfCasterLevel = Math.ceil((level - 1) / 2);
    return fullCasterSlots[halfCasterLevel] || {};
  }
  
  // Warlock has unique spell slot progression
  if (characterClass === 'Warlock') {
    if (level >= 1) return { 1: level >= 2 ? 2 : 1 };
    if (level >= 3) return { 2: 2 };
    if (level >= 5) return { 3: 2 };
  }
  
  return {};
}

/**
 * Get maximum spell level available for a class at a given character level
 */
export function getMaxSpellLevel(characterClass: string, level: number): number {
  switch (characterClass) {
    case 'Wizard':
    case 'Sorcerer':
    case 'Bard':
    case 'Cleric':
    case 'Druid':
    case 'Warlock':
      // Full casters
      if (level >= 17) return 9;
      else if (level >= 15) return 8;
      else if (level >= 13) return 7;
      else if (level >= 11) return 6;
      else if (level >= 9) return 5;
      else if (level >= 7) return 4;
      else if (level >= 5) return 3;
      else if (level >= 3) return 2;
      else if (level >= 1) return 1;
      break;
    case 'Paladin':
    case 'Ranger':
      // Half-casters start at level 2
      if (level >= 17) return 5;
      else if (level >= 13) return 4;
      else if (level >= 9) return 3;
      else if (level >= 5) return 2;
      else if (level >= 2) return 1;
      break;
    case 'Fighter': // Eldritch Knight
    case 'Rogue': // Arcane Trickster
      // Third-casters start at level 3
      if (level >= 19) return 4;
      else if (level >= 13) return 3;
      else if (level >= 7) return 2;
      else if (level >= 3) return 1;
      break;
    default:
      return 0;
  }
  return 0;
}

/**
 * Get all spells available to a character class at a given level
 * Now uses database data instead of hardcoded arrays
 */
export async function getClassSpells(characterClass: string, level: number): Promise<Spell[]> {
  const maxSpellLevel = getMaxSpellLevel(characterClass, level);
  return getSpellsByClass(characterClass, maxSpellLevel);
} 