// Level up system for D&D 5e
import { Spell } from './spells';
import { ClassFeature, getClassFeatures } from './class-features';

// Experience point thresholds for each level
export const EXPERIENCE_THRESHOLDS = [
  0,      // Level 1
  300,    // Level 2
  900,    // Level 3
  2700,   // Level 4
  6500,   // Level 5
  14000,  // Level 6
  23000,  // Level 7
  34000,  // Level 8
  48000,  // Level 9
  64000,  // Level 10
  85000,  // Level 11
  100000, // Level 12
  120000, // Level 13
  140000, // Level 14
  165000, // Level 15
  195000, // Level 16
  225000, // Level 17
  265000, // Level 18
  305000, // Level 19
  355000  // Level 20
];

// Proficiency bonus progression
export function getProficiencyBonusForLevel(level: number): number {
  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9) return 4;
  if (level >= 5) return 3;
  return 2;
}

// Check if level grants an Ability Score Improvement
export function hasAbilityScoreImprovement(characterClass: string, level: number): boolean {
  const standardASILevels = [4, 8, 12, 16, 19];
  
  // Special cases
  if (characterClass === 'Fighter') {
    return [4, 6, 8, 12, 14, 16, 19].includes(level);
  }
  if (characterClass === 'Rogue') {
    return [4, 8, 10, 12, 16, 19].includes(level);
  }
  
  return standardASILevels.includes(level);
}

// Get hit die for class
export function getHitDie(characterClass: string): number {
  const hitDice: Record<string, number> = {
    'Barbarian': 12,
    'Fighter': 10,
    'Paladin': 10,
    'Ranger': 10,
    'Bard': 8,
    'Cleric': 8,
    'Druid': 8,
    'Monk': 8,
    'Rogue': 8,
    'Warlock': 8,
    'Sorcerer': 6,
    'Wizard': 6
  };
  
  return hitDice[characterClass] || 8;
}

// Calculate hit point gain options for leveling up
export function getHitPointGainOptions(characterClass: string, constitutionModifier: number): {
  roll: number;
  average: number;
} {
  const hitDie = getHitDie(characterClass);
  const average = Math.floor(hitDie / 2) + 1; // Average of hit die (rounded up)
  
  return {
    roll: hitDie,
    average: average + constitutionModifier
  };
}

// Spell progression for full casters
export const FULL_CASTER_SPELL_SLOTS = [
  [], // Level 0 (not used)
  [2], // Level 1: 2x 1st
  [3], // Level 2: 3x 1st
  [4, 2], // Level 3: 4x 1st, 2x 2nd
  [4, 3], // Level 4: 4x 1st, 3x 2nd
  [4, 3, 2], // Level 5: 4x 1st, 3x 2nd, 2x 3rd
  [4, 3, 3], // Level 6
  [4, 3, 3, 1], // Level 7
  [4, 3, 3, 2], // Level 8
  [4, 3, 3, 3, 1], // Level 9
  [4, 3, 3, 3, 2], // Level 10
  [4, 3, 3, 3, 2, 1], // Level 11
  [4, 3, 3, 3, 2, 1], // Level 12
  [4, 3, 3, 3, 2, 1, 1], // Level 13
  [4, 3, 3, 3, 2, 1, 1], // Level 14
  [4, 3, 3, 3, 2, 1, 1, 1], // Level 15
  [4, 3, 3, 3, 2, 1, 1, 1], // Level 16
  [4, 3, 3, 3, 2, 1, 1, 1, 1], // Level 17
  [4, 3, 3, 3, 3, 1, 1, 1, 1], // Level 18
  [4, 3, 3, 3, 3, 2, 1, 1, 1], // Level 19
  [4, 3, 3, 3, 3, 2, 2, 1, 1] // Level 20
];

// Half-caster spell progression (Paladin, Ranger)
export const HALF_CASTER_SPELL_SLOTS = [
  [], [], // Levels 0-1 (no spells)
  [2], // Level 2: 2x 1st
  [3], // Level 3: 3x 1st
  [3], // Level 4: 3x 1st
  [4, 2], // Level 5: 4x 1st, 2x 2nd
  [4, 2], // Level 6
  [4, 3], // Level 7
  [4, 3], // Level 8
  [4, 3, 2], // Level 9
  [4, 3, 2], // Level 10
  [4, 3, 3], // Level 11
  [4, 3, 3], // Level 12
  [4, 3, 3, 1], // Level 13
  [4, 3, 3, 1], // Level 14
  [4, 3, 3, 2], // Level 15
  [4, 3, 3, 2], // Level 16
  [4, 3, 3, 3, 1], // Level 17
  [4, 3, 3, 3, 1], // Level 18
  [4, 3, 3, 3, 2], // Level 19
  [4, 3, 3, 3, 2] // Level 20
];

// Third-caster spell progression (Eldritch Knight, Arcane Trickster)
export const THIRD_CASTER_SPELL_SLOTS = [
  [], [], [], // Levels 0-2 (no spells)
  [2], // Level 3: 2x 1st
  [3], // Level 4: 3x 1st
  [3], // Level 5: 3x 1st
  [3], // Level 6: 3x 1st
  [4, 2], // Level 7: 4x 1st, 2x 2nd
  [4, 2], // Level 8
  [4, 2], // Level 9
  [4, 3], // Level 10
  [4, 3], // Level 11
  [4, 3], // Level 12
  [4, 3, 2], // Level 13
  [4, 3, 2], // Level 14
  [4, 3, 2], // Level 15
  [4, 3, 3], // Level 16
  [4, 3, 3], // Level 17
  [4, 3, 3], // Level 18
  [4, 3, 3, 1], // Level 19
  [4, 3, 3, 1] // Level 20
];

// Warlock spell progression (unique - short rest based)
export const WARLOCK_SPELL_SLOTS = [
  [1], // Level 1: 1x 1st
  [2], // Level 2: 2x 1st
  [2], // Level 3: 2x 2nd
  [2], // Level 4: 2x 2nd
  [2], // Level 5: 2x 3rd
  [2], // Level 6: 2x 3rd
  [2], // Level 7: 2x 4th
  [2], // Level 8: 2x 4th
  [2], // Level 9: 2x 5th
  [2], // Level 10: 2x 5th
  [3], // Level 11: 3x 5th
  [3], // Level 12: 3x 5th
  [3], // Level 13: 3x 5th
  [3], // Level 14: 3x 5th
  [3], // Level 15: 3x 5th
  [3], // Level 16: 3x 5th
  [4], // Level 17: 4x 5th
  [4], // Level 18: 4x 5th
  [4], // Level 19: 4x 5th
  [4]  // Level 20: 4x 5th
];

// Get spell slots for a class at a given level
export function getSpellSlotsForLevel(characterClass: string, level: number): number[] {
  if (level <= 0) return [];
  
  switch (characterClass) {
    case 'Wizard':
    case 'Sorcerer':
    case 'Bard':
    case 'Cleric':
    case 'Druid':
      return FULL_CASTER_SPELL_SLOTS[level] || [];
    case 'Paladin':
    case 'Ranger':
      return HALF_CASTER_SPELL_SLOTS[level] || [];
    case 'Warlock':
      return WARLOCK_SPELL_SLOTS[level - 1] || [];
    case 'Fighter': // Eldritch Knight
    case 'Rogue': // Arcane Trickster  
      return THIRD_CASTER_SPELL_SLOTS[level] || [];
    default:
      return [];
  }
}

// Interface for level up choices
export interface LevelUpChoices {
  hitPointGain: number; // HP to add (either rolled or average)
  abilityScoreImprovements?: {
    [ability: string]: number; // ability name -> points to add
  };
  featChoice?: string; // feat name instead of ASI
  spellsLearned?: Spell[]; // new spells learned
  spellsReplaced?: {
    oldSpell: Spell;
    newSpell: Spell;
  }[]; // spells to replace
  cantripsLearned?: Spell[]; // new cantrips
  cantripsReplaced?: {
    oldCantrip: Spell;
    newCantrip: Spell;
  }[]; // cantrips to replace
  subclassChoice?: string; // subclass selection (usually level 3)
  classFeatureChoices?: {
    [featureName: string]: string; // feature name -> choice made
  };
}

// Interface for level up result
export interface LevelUpResult {
  newLevel: number;
  hitPointGain: number;
  newMaxHitPoints: number;
  newProficiencyBonus: number;
  newFeatures: ClassFeature[];
  newSpellSlots?: Record<number, number>;
  newSpells?: Spell[];
  abilityScoreChanges?: {
    [ability: string]: number;
  };
  requiresChoices: {
    needsAbilityScoreImprovement: boolean;
    needsSpellSelection: boolean;
    needsCantripsSelection: boolean;
    needsSubclassSelection: boolean;
    needsFeatureChoices: string[]; // list of features that need choices
  };
}

// Main level up function
export function levelUpCharacter(
  character: {
    class: string;
    level: number;
    maxHitPoints: number;
    constitution: number;
    strength: number;
    dexterity: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    spellSlots?: Record<number, number>;
  },
  choices: LevelUpChoices
): LevelUpResult {
  const newLevel = character.level + 1;
  
  // Calculate new hit points
  const newMaxHitPoints = character.maxHitPoints + choices.hitPointGain;
  
  // Calculate new proficiency bonus
  const newProficiencyBonus = getProficiencyBonusForLevel(newLevel);
  
  // Get new class features for this level
  const newFeatures = getClassFeatures(character.class, newLevel);
  
  // Calculate new spell slots if applicable
  let newSpellSlots: Record<number, number> | undefined;
  if (isSpellcaster(character.class)) {
    const spellSlotArray = getSpellSlotsForLevel(character.class, newLevel);
    newSpellSlots = {};
    spellSlotArray.forEach((slots, index) => {
      if (slots > 0) {
        newSpellSlots![index + 1] = slots;
      }
    });
  }
  
  // Determine what choices are still needed
  const requiresChoices = {
    needsAbilityScoreImprovement: hasAbilityScoreImprovement(character.class, newLevel) && !choices.abilityScoreImprovements && !choices.featChoice,
    needsSpellSelection: isSpellcaster(character.class) && needsSpellSelection(character.class, newLevel) && !choices.spellsLearned,
    needsCantripsSelection: isSpellcaster(character.class) && needsCantripsSelection(character.class, newLevel) && !choices.cantripsLearned,
    needsSubclassSelection: newLevel === 3 && !choices.subclassChoice, // Most classes choose subclass at level 3
    needsFeatureChoices: [] as string[] // TODO: Implement feature choices detection
  };
  
  return {
    newLevel,
    hitPointGain: choices.hitPointGain,
    newMaxHitPoints,
    newProficiencyBonus,
    newFeatures,
    newSpellSlots,
    newSpells: choices.spellsLearned,
    abilityScoreChanges: choices.abilityScoreImprovements,
    requiresChoices
  };
}

// Helper functions
export function isSpellcaster(characterClass: string): boolean {
  const spellcasters = ['Wizard', 'Sorcerer', 'Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Warlock'];
  return spellcasters.includes(characterClass);
}

export function needsSpellSelection(characterClass: string, level: number): boolean {
  // Different classes learn spells at different levels
  switch (characterClass) {
    case 'Wizard':
      return level >= 1; // Wizards learn spells every level
    case 'Sorcerer':
    case 'Bard':
    case 'Warlock':
      return level >= 1 && (level === 1 || level % 2 === 1 || level === 2); // Learn spells most levels
    case 'Cleric':
    case 'Druid':
      return false; // Prepare spells, don't learn new ones
    case 'Paladin':
    case 'Ranger':
      return level >= 2; // Half-casters start at level 2
    case 'Fighter': // Eldritch Knight
    case 'Rogue': // Arcane Trickster
      return level >= 3 && (level === 3 || level % 3 === 1); // Third-casters learn infrequently
    default:
      return false;
  }
}

export function needsCantripsSelection(characterClass: string, level: number): boolean {
  // Classes that learn new cantrips at certain levels
  switch (characterClass) {
    case 'Wizard':
    case 'Sorcerer':
    case 'Bard':
    case 'Cleric':
    case 'Druid':
    case 'Warlock':
      return level === 1 || level === 4 || level === 10; // Common cantrip progression
    case 'Fighter': // Eldritch Knight
    case 'Rogue': // Arcane Trickster
      return level === 3 || level === 10; // Third-casters get fewer cantrips
    default:
      return false;
  }
}

// Get number of spells known for a class at a given level
export function getSpellsKnownCount(characterClass: string, level: number): number {
  switch (characterClass) {
    case 'Bard':
      if (level >= 17) return 22;
      if (level >= 15) return 20;
      if (level >= 13) return 18;
      if (level >= 11) return 16;
      if (level >= 10) return 14;
      if (level >= 9) return 13;
      if (level >= 8) return 12;
      if (level >= 7) return 11;
      if (level >= 6) return 10;
      if (level >= 5) return 8;
      if (level >= 4) return 7;
      if (level >= 3) return 6;
      if (level >= 2) return 5;
      if (level >= 1) return 4;
      return 0;
    case 'Sorcerer':
      if (level >= 17) return 15;
      if (level >= 15) return 14;
      if (level >= 13) return 13;
      if (level >= 11) return 12;
      if (level >= 9) return 11;
      if (level >= 7) return 10;
      if (level >= 5) return 9;
      if (level >= 4) return 8;
      if (level >= 3) return 7;
      if (level >= 2) return 6;
      if (level >= 1) return 5;
      return 0;
    case 'Warlock':
      if (level >= 17) return 11;
      if (level >= 15) return 10;
      if (level >= 13) return 9;
      if (level >= 11) return 8;
      if (level >= 9) return 7;
      if (level >= 7) return 6;
      if (level >= 5) return 5;
      if (level >= 3) return 4;
      if (level >= 2) return 3;
      if (level >= 1) return 2;
      return 0;
    case 'Ranger':
    case 'Paladin':
      if (level >= 17) return 11;
      if (level >= 15) return 10;
      if (level >= 13) return 9;
      if (level >= 11) return 8;
      if (level >= 9) return 7;
      if (level >= 7) return 6;
      if (level >= 5) return 5;
      if (level >= 3) return 4;
      if (level >= 2) return 3;
      return 0;
    case 'Fighter': // Eldritch Knight
    case 'Rogue': // Arcane Trickster
      if (level >= 19) return 13;
      if (level >= 16) return 12;
      if (level >= 13) return 11;
      if (level >= 10) return 9;
      if (level >= 8) return 8;
      if (level >= 7) return 7;
      if (level >= 4) return 4;
      if (level >= 3) return 3;
      return 0;
    default:
      return 0;
  }
}

// Calculate max hit points after level up
export function calculateNewMaxHitPoints(
  currentMax: number,
  characterClass: string,
  constitutionModifier: number,
  useAverage: boolean = false
): number {
  const hitDie = getHitDie(characterClass);
  const hitPointGain = useAverage 
    ? Math.floor(hitDie / 2) + 1 + constitutionModifier
    : hitDie + constitutionModifier; // This would be the max possible, actual rolling happens in UI
  
  return currentMax + hitPointGain;
} 