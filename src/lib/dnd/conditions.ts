// D&D 5e Conditions
export interface Condition {
  name: string;
  description: string;
  effects: string[];
  category: 'Debuff' | 'Control' | 'Damage' | 'Movement';
  severity: 'Minor' | 'Major' | 'Severe';
}

export const CONDITIONS: Condition[] = [
  {
    name: 'Blinded',
    description: 'A blinded creature can\'t see and automatically fails any ability check that requires sight.',
    effects: [
      'Attack rolls have disadvantage',
      'Attack rolls against you have advantage'
    ],
    category: 'Debuff',
    severity: 'Major'
  },
  {
    name: 'Charmed',
    description: 'A charmed creature can\'t attack the charmer or target the charmer with harmful abilities or magical effects.',
    effects: [
      'Can\'t attack the charmer',
      'Can\'t target charmer with harmful abilities',
      'Charmer has advantage on social interactions'
    ],
    category: 'Control',
    severity: 'Major'
  },
  {
    name: 'Deafened',
    description: 'A deafened creature can\'t hear and automatically fails any ability check that requires hearing.',
    effects: [
      'Can\'t hear',
      'Automatically fails hearing-based ability checks'
    ],
    category: 'Debuff',
    severity: 'Minor'
  },
  {
    name: 'Frightened',
    description: 'A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.',
    effects: [
      'Disadvantage on ability checks and attack rolls',
      'Can\'t willingly move closer to the source of fear'
    ],
    category: 'Debuff',
    severity: 'Major'
  },
  {
    name: 'Grappled',
    description: 'A grappled creature\'s speed becomes 0, and it can\'t benefit from any bonus to its speed.',
    effects: [
      'Speed becomes 0',
      'Can\'t benefit from bonuses to speed',
      'Condition ends if grappler is incapacitated'
    ],
    category: 'Movement',
    severity: 'Major'
  },
  {
    name: 'Incapacitated',
    description: 'An incapacitated creature can\'t take actions or reactions.',
    effects: [
      'Can\'t take actions',
      'Can\'t take reactions'
    ],
    category: 'Control',
    severity: 'Severe'
  },
  {
    name: 'Invisible',
    description: 'An invisible creature is impossible to see without the aid of magic or a special sense.',
    effects: [
      'Attack rolls have advantage',
      'Attack rolls against you have disadvantage',
      'Can hide even when being observed'
    ],
    category: 'Debuff',
    severity: 'Major'
  },
  {
    name: 'Paralyzed',
    description: 'A paralyzed creature is incapacitated and can\'t move or speak.',
    effects: [
      'Incapacitated (can\'t take actions or reactions)',
      'Can\'t move or speak',
      'Automatically fails Strength and Dexterity saving throws',
      'Attack rolls against you have advantage',
      'Hits within 5 feet are automatic critical hits'
    ],
    category: 'Control',
    severity: 'Severe'
  },
  {
    name: 'Petrified',
    description: 'A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance.',
    effects: [
      'Incapacitated (can\'t take actions or reactions)',
      'Can\'t move or speak',
      'Unaware of surroundings',
      'Attack rolls against you have advantage',
      'Automatically fails Strength and Dexterity saving throws',
      'Resistant to all damage',
      'Immune to poison and disease'
    ],
    category: 'Control',
    severity: 'Severe'
  },
  {
    name: 'Poisoned',
    description: 'A poisoned creature has disadvantage on attack rolls and ability checks.',
    effects: [
      'Disadvantage on attack rolls',
      'Disadvantage on ability checks'
    ],
    category: 'Debuff',
    severity: 'Major'
  },
  {
    name: 'Prone',
    description: 'A prone creature\'s only movement option is to crawl, unless it stands up and thereby ends the condition.',
    effects: [
      'Disadvantage on attack rolls',
      'Attack rolls against you have advantage if within 5 feet',
      'Attack rolls against you have disadvantage if beyond 5 feet',
      'Can only crawl (costs extra movement) or stand up'
    ],
    category: 'Movement',
    severity: 'Minor'
  },
  {
    name: 'Restrained',
    description: 'A restrained creature\'s speed becomes 0, and it can\'t benefit from any bonus to its speed.',
    effects: [
      'Speed becomes 0',
      'Can\'t benefit from bonuses to speed',
      'Disadvantage on attack rolls',
      'Disadvantage on Dexterity saving throws',
      'Attack rolls against you have advantage'
    ],
    category: 'Control',
    severity: 'Major'
  },
  {
    name: 'Stunned',
    description: 'A stunned creature is incapacitated, can\'t move, and can speak only falteringly.',
    effects: [
      'Incapacitated (can\'t take actions or reactions)',
      'Can\'t move',
      'Can speak only falteringly',
      'Automatically fails Strength and Dexterity saving throws',
      'Attack rolls against you have advantage'
    ],
    category: 'Control',
    severity: 'Severe'
  },
  {
    name: 'Unconscious',
    description: 'An unconscious creature is incapacitated, can\'t move or speak, and is unaware of its surroundings.',
    effects: [
      'Incapacitated (can\'t take actions or reactions)',
      'Can\'t move or speak',
      'Unaware of surroundings',
      'Drops whatever it\'s holding and falls prone',
      'Automatically fails Strength and Dexterity saving throws',
      'Attack rolls against you have advantage',
      'Hits within 5 feet are automatic critical hits'
    ],
    category: 'Control',
    severity: 'Severe'
  }
];

// Active condition tracking
export interface ActiveCondition {
  name: string;
  duration?: string; // "Until end of next turn", "1 minute", "Until dispelled", etc.
  source?: string; // What caused the condition
  notes?: string; // Additional notes
}

// Get condition by name
export function getCondition(name: string): Condition | undefined {
  return CONDITIONS.find(condition => condition.name === name);
}

// Get conditions by category
export function getConditionsByCategory(category: Condition['category']): Condition[] {
  return CONDITIONS.filter(condition => condition.category === category);
}

// Get conditions by severity
export function getConditionsBySeverity(severity: Condition['severity']): Condition[] {
  return CONDITIONS.filter(condition => condition.severity === severity);
}

// Check if a condition affects attack rolls
export function affectsAttackRolls(conditionName: string): boolean {
  const condition = getCondition(conditionName);
  if (!condition) return false;
  
  return condition.effects.some(effect => 
    effect.toLowerCase().includes('attack') && 
    (effect.toLowerCase().includes('disadvantage') || effect.toLowerCase().includes('advantage'))
  );
}

// Check if a condition affects ability checks
export function affectsAbilityChecks(conditionName: string): boolean {
  const condition = getCondition(conditionName);
  if (!condition) return false;
  
  return condition.effects.some(effect => 
    effect.toLowerCase().includes('ability check') && 
    effect.toLowerCase().includes('disadvantage')
  );
}

// Check if a condition prevents actions
export function preventsActions(conditionName: string): boolean {
  const condition = getCondition(conditionName);
  if (!condition) return false;
  
  return condition.effects.some(effect => 
    effect.toLowerCase().includes('can\'t take actions') ||
    effect.toLowerCase().includes('incapacitated')
  );
} 