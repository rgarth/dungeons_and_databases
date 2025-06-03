// Spells and spellcasting utilities
import { getModifier } from './core';

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
}

export const SPELL_SCHOOLS = [
  'Abjuration', 'Conjuration', 'Divination', 'Enchantment', 
  'Evocation', 'Illusion', 'Necromancy', 'Transmutation'
] as const;

export const SPELLS: Spell[] = [
  // Cantrips (Level 0)
  {
    name: "Fire Bolt",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "A mote of fire streaks toward a creature or object. Make a ranged spell attack. On hit, deal 1d10 fire damage.",
    classes: ["Sorcerer", "Wizard"]
  },
  {
    name: "Mage Hand",
    level: 0,
    school: "Conjuration",
    castingTime: "1 action",
    range: "30 feet",
    components: "V, S",
    duration: "1 minute",
    description: "A spectral hand appears and can manipulate objects, open doors, or retrieve items up to 10 pounds.",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"]
  },
  {
    name: "Sacred Flame",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "Divine flame descends on a creature. Target makes Dex save or takes 1d8 radiant damage.",
    classes: ["Cleric"]
  },
  {
    name: "Eldritch Blast",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "A beam of crackling energy. Make a ranged spell attack for 1d10 force damage.",
    classes: ["Warlock"]
  },
  // 1st Level Spells
  {
    name: "Magic Missile",
    level: 1,
    school: "Evocation",
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "Three darts of magical force hit their target automatically for 1d4+1 force damage each.",
    classes: ["Sorcerer", "Wizard"]
  },
  {
    name: "Cure Wounds",
    level: 1,
    school: "Evocation",
    castingTime: "1 action",
    range: "Touch",
    components: "V, S",
    duration: "Instantaneous",
    description: "Touch a creature to heal 1d8 + spellcasting modifier hit points.",
    classes: ["Bard", "Cleric", "Druid", "Paladin", "Ranger"]
  },
  {
    name: "Shield",
    level: 1,
    school: "Abjuration",
    castingTime: "1 reaction",
    range: "Self",
    components: "V, S",
    duration: "1 round",
    description: "Gain +5 AC until start of your next turn. Triggers when you are hit by an attack.",
    classes: ["Sorcerer", "Wizard"]
  }
];

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

export function getClassSpells(characterClass: string, level: number): Spell[] {
  return SPELLS.filter(spell => 
    spell.classes.includes(characterClass) && 
    spell.level <= Math.ceil(level / 2) // Simplified spell level access
  );
} 