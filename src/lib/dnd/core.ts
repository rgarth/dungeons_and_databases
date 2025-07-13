// Core D&D 5e mechanics and basic types

export const ABILITY_SCORES = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as const;
export type AbilityScore = typeof ABILITY_SCORES[number];

// Note: RACES, CLASSES, BACKGROUNDS, and ALIGNMENTS are now stored in the database
// Use the respective API endpoints to fetch this data:
// - /api/races
// - /api/classes  
// - /api/backgrounds
// - /api/alignments

export const SKILLS = {
  Acrobatics: 'dexterity',
  'Animal Handling': 'wisdom',
  Arcana: 'intelligence',
  Athletics: 'strength',
  Deception: 'charisma',
  History: 'intelligence',
  Insight: 'wisdom',
  Intimidation: 'charisma',
  Investigation: 'intelligence',
  Medicine: 'wisdom',
  Nature: 'intelligence',
  Perception: 'wisdom',
  Performance: 'charisma',
  Persuasion: 'charisma',
  Religion: 'intelligence',
  'Sleight of Hand': 'dexterity',
  Stealth: 'dexterity',
  Survival: 'wisdom',
} as const;

// Stat Generation Methods
export type StatMethod = 'rolling-assign' | 'standard' | 'pointbuy';

// Standard Array (official D&D 5e)
export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

// Point Buy costs (official D&D 5e)
export const POINT_BUY_COSTS: Record<number, number> = {
  8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
};

// Calculate ability modifier from score
export function getModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

// Calculate proficiency bonus based on level (D&D 5e formula)
export function getProficiencyBonus(level: number): number {
  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9) return 4;
  if (level >= 5) return 3;
  return 2;
}

// Generate random ability scores using 4d6 drop lowest
export function rollAbilityScore(): number {
  const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
  rolls.sort((a, b) => b - a);
  return rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0);
}

// Generate 6 random ability scores for assignment
export function generateRandomScoreArray(): number[] {
  return Array.from({ length: 6 }, () => rollAbilityScore());
}

// Generate a complete set of ability scores by method
export function generateAbilityScores(method: StatMethod = 'rolling-assign'): Record<AbilityScore, number> {
  switch (method) {
    case 'rolling-assign':
      // Generate 6 random scores and assign them in order initially
      const randomScores = generateRandomScoreArray();
      return ABILITY_SCORES.reduce((scores, ability, index) => {
        scores[ability] = randomScores[index] || 10;
        return scores;
      }, {} as Record<AbilityScore, number>);
    
    case 'standard':
      return ABILITY_SCORES.reduce((scores, ability, index) => {
        scores[ability] = STANDARD_ARRAY[index] || 10;
        return scores;
      }, {} as Record<AbilityScore, number>);
    
    case 'pointbuy':
      return ABILITY_SCORES.reduce((scores, ability) => {
        scores[ability] = 8; // Start with base 8 for point buy
        return scores;
      }, {} as Record<AbilityScore, number>);
    
    default:
      return generateAbilityScores('rolling-assign');
  }
}

// Calculate remaining points for point buy
export function calculatePointBuyRemaining(scores: Record<AbilityScore, number>): number {
  const usedPoints = Object.values(scores).reduce((total, score) => {
    return total + (POINT_BUY_COSTS[score] || 0);
  }, 0);
  return 27 - usedPoints;
}

// Calculate hit points for a character
// Note: hitDie should now be fetched from the database via /api/classes
export function calculateHitPoints(level: number, constitution: number, hitDie: number): number {
  const conMod = getModifier(constitution);
  
  // First level: max hit die + con mod
  // Additional levels: average of hit die + con mod
  const baseHP = hitDie + conMod;
  const additionalHP = (level - 1) * (Math.floor(hitDie / 2) + 1 + conMod);
  
  return Math.max(1, baseHP + additionalHP);
} 