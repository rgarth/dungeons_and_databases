import { Monster, MonsterAction } from '@/types/monster';

// Calculate the average damage for a damage roll
export const calculateAverageDamage = (roll: string): number => {
  // Parse dice notation like "2d6+3" or "1d8"
  const match = roll.match(/^(\d+)d(\d+)([+-]\d+)?$/);
  if (!match) return 0;
  
  const [, numDice, diceSize, modifier] = match;
  const dice = parseInt(numDice);
  const size = parseInt(diceSize);
  const mod = modifier ? parseInt(modifier) : 0;
  
  // Average of a dX is (X+1)/2
  const averagePerDie = (size + 1) / 2;
  return Math.floor(dice * averagePerDie + mod);
};

// Calculate the attack bonus for an action
export const calculateAttackBonus = (monster: Monster, action: MonsterAction): number => {
  if (action.attack_bonus !== undefined) {
    return action.attack_bonus;
  }
  
  // Default calculation based on action type
  if (action.name.toLowerCase().includes('melee')) {
    return monster.proficiencyBonus + Math.floor((monster.strength - 10) / 2);
  } else if (action.name.toLowerCase().includes('ranged')) {
    return monster.proficiencyBonus + Math.floor((monster.dexterity - 10) / 2);
  }
  
  return monster.proficiencyBonus;
};

// Calculate saving throw DC
export const calculateSaveDC = (monster: Monster, ability: string): number => {
  const abilityModifier = Math.floor((monster[ability.toLowerCase() as keyof Monster] as number - 10) / 2);
  return 8 + monster.proficiencyBonus + abilityModifier;
};

// Get monster by name (case-insensitive)
export const getMonsterByName = (name: string, monsters: Monster[]): Monster | undefined => {
  return monsters.find(monster => 
    monster.name.toLowerCase() === name.toLowerCase()
  );
};

// Filter monsters by various criteria
export const filterMonsters = (monsters: Monster[], filters: {
  type?: string;
  size?: string;
  challengeRating?: string;
  tags?: string[];
}): Monster[] => {
  return monsters.filter(monster => {
    if (filters.type && monster.type.toLowerCase() !== filters.type.toLowerCase()) {
      return false;
    }
    if (filters.size && monster.size.toLowerCase() !== filters.size.toLowerCase()) {
      return false;
    }
    if (filters.challengeRating && monster.challengeRating !== filters.challengeRating) {
      return false;
    }
    if (filters.tags && filters.tags.length > 0 && !filters.tags.some(tag => 
      monster.tags?.some(monsterTag => monsterTag.toLowerCase() === tag.toLowerCase())
    )) {
      return false;
    }
    return true;
  });
};

// Search monsters by name, type, or tags
export const searchMonsters = (monsters: Monster[], query: string): Monster[] => {
  const lowerQuery = query.toLowerCase();
  return monsters.filter(monster => 
    monster.name.toLowerCase().includes(lowerQuery) ||
    monster.type.toLowerCase().includes(lowerQuery) ||
    monster.subtype?.toLowerCase().includes(lowerQuery) ||
    monster.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    monster.description?.toLowerCase().includes(lowerQuery)
  );
};

// Get unique values for filters
export const getUniqueTypes = (monsters: Monster[]): string[] => {
  return [...new Set(monsters.map(m => m.type))].sort();
};

export const getUniqueSizes = (monsters: Monster[]): string[] => {
  return [...new Set(monsters.map(m => m.size))].sort();
};

export const getUniqueChallengeRatings = (monsters: Monster[]): string[] => {
  return [...new Set(monsters.map(m => m.challengeRating))].sort((a, b) => {
    // Sort by numeric value, handling fractions
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    return aNum - bNum;
  });
};



export const getUniqueTags = (monsters: Monster[]): string[] => {
  const tags = monsters.flatMap(m => m.tags || []);
  return [...new Set(tags)].sort();
};

// Format challenge rating for display
export const formatChallengeRating = (cr: string): string => {
  if (cr === '0') return '0 (10 XP)';
  if (cr === '1/8') return '1/8 (25 XP)';
  if (cr === '1/4') return '1/4 (50 XP)';
  if (cr === '1/2') return '1/2 (100 XP)';
  return `${cr} (${getXPForCR(cr)} XP)`;
};

// Get XP for challenge rating
export const getXPForCR = (cr: string): number => {
  const xpTable: Record<string, number> = {
    '0': 10,
    '1/8': 25,
    '1/4': 50,
    '1/2': 100,
    '1': 200,
    '2': 450,
    '3': 700,
    '4': 1100,
    '5': 1800,
    '6': 2300,
    '7': 2900,
    '8': 3900,
    '9': 5000,
    '10': 5900,
    '11': 7200,
    '12': 8400,
    '13': 10000,
    '14': 11500,
    '15': 13000,
    '16': 15000,
    '17': 18000,
    '18': 20000,
    '19': 22000,
    '20': 25000,
    '21': 33000,
    '22': 41000,
    '23': 50000,
    '24': 62000,
    '25': 75000,
    '26': 90000,
    '27': 105000,
    '28': 120000,
    '29': 135000,
    '30': 155000
  };
  return xpTable[cr] || 0;
}; 