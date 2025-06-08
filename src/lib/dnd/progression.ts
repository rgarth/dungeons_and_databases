// Character progression interfaces - designed for multiclass support from the start

export interface ClassLevel {
  class: string;
  level: number;
  subclass?: string;
  hitPointsGained?: number; // track HP gains per level for each class
}

export interface SelectedFeature {
  id: string; // unique identifier
  classSource: string; // which class granted this feature
  classLevel: number; // at what class level was this gained
  characterLevel: number; // total character level when gained
  featureType: 'spell' | 'feat' | 'fightingStyle' | 'abilityScoreIncrease' | 'classFeature' | 'spellSelection';
  name: string;
  selection?: string | string[]; // specific choices made (spell names, feat name, etc.)
  description?: string;
  replacedFeatureId?: string; // for features that replace others
}

export interface LevelUpChoice {
  type: 'abilityScoreIncrease' | 'feat' | 'spell' | 'fightingStyle' | 'classFeature';
  required: boolean;
  options?: string[]; // available options to choose from
  maxSelections?: number; // how many can be selected
  description: string;
  prerequisites?: string[]; // requirements to select this option
}

export interface ClassProgression {
  class: string;
  level: number;
  hitDie: number; // d6, d8, d10, d12
  proficiencyBonus: number;
  features: string[]; // features gained at this level
  choices: LevelUpChoice[]; // choices that need to be made
  spellsKnown?: number; // for spellcasters
  spellSlots?: Record<number, number>; // spell slots by level
  cantripsKnown?: number;
}

// Multiclass prerequisites
export interface MulticlassPrerequisites {
  [className: string]: {
    minimumAbilityScores: Record<string, number>; // e.g., { strength: 13, charisma: 13 }
    description: string;
  };
}

export const MULTICLASS_PREREQUISITES: MulticlassPrerequisites = {
  Barbarian: {
    minimumAbilityScores: { strength: 13 },
    description: "Strength 13 or higher"
  },
  Bard: {
    minimumAbilityScores: { charisma: 13 },
    description: "Charisma 13 or higher"
  },
  Cleric: {
    minimumAbilityScores: { wisdom: 13 },
    description: "Wisdom 13 or higher"
  },
  Druid: {
    minimumAbilityScores: { wisdom: 13 },
    description: "Wisdom 13 or higher"
  },
  Fighter: {
    minimumAbilityScores: { strength: 13, dexterity: 13 },
    description: "Strength 13 or Dexterity 13 or higher"
  },
  Monk: {
    minimumAbilityScores: { dexterity: 13, wisdom: 13 },
    description: "Dexterity 13 and Wisdom 13 or higher"
  },
  Paladin: {
    minimumAbilityScores: { strength: 13, charisma: 13 },
    description: "Strength 13 and Charisma 13 or higher"
  },
  Ranger: {
    minimumAbilityScores: { dexterity: 13, wisdom: 13 },
    description: "Dexterity 13 and Wisdom 13 or higher"
  },
  Rogue: {
    minimumAbilityScores: { dexterity: 13 },
    description: "Dexterity 13 or higher"
  },
  Sorcerer: {
    minimumAbilityScores: { charisma: 13 },
    description: "Charisma 13 or higher"
  },
  Warlock: {
    minimumAbilityScores: { charisma: 13 },
    description: "Charisma 13 or higher"
  },
  Wizard: {
    minimumAbilityScores: { intelligence: 13 },
    description: "Intelligence 13 or higher"
  }
};

// Class progression tables - sample for key classes
export const CLASS_PROGRESSION: Record<string, ClassProgression[]> = {
  Fighter: [
    {
      class: "Fighter",
      level: 1,
      hitDie: 10,
      proficiencyBonus: 2,
      features: ["Fighting Style", "Second Wind"],
      choices: [
        {
          type: "fightingStyle",
          required: true,
          options: ["Archery", "Defense", "Dueling", "Great Weapon Fighting", "Protection", "Two-Weapon Fighting"],
          maxSelections: 1,
          description: "Choose a fighting style to represent your specialized combat training."
        }
      ]
    },
    {
      class: "Fighter",
      level: 2,
      hitDie: 10,
      proficiencyBonus: 2,
      features: ["Action Surge"],
      choices: []
    },
    {
      class: "Fighter",
      level: 3,
      hitDie: 10,
      proficiencyBonus: 2,
      features: ["Martial Archetype"],
      choices: []
    },
    {
      class: "Fighter",
      level: 4,
      hitDie: 10,
      proficiencyBonus: 2,
      features: ["Ability Score Improvement"],
      choices: [
        {
          type: "abilityScoreIncrease",
          required: true,
          description: "Increase one ability score by 2, or two ability scores by 1 each, or take a feat.",
          maxSelections: 1
        }
      ]
    }
  ],
  Wizard: [
    {
      class: "Wizard",
      level: 1,
      hitDie: 6,
      proficiencyBonus: 2,
      features: ["Spellcasting", "Arcane Recovery"],
      choices: [
        {
          type: "spell",
          required: true,
          description: "Choose 6 1st-level wizard spells for your spellbook.",
          maxSelections: 6
        }
      ],
      spellsKnown: 6,
      spellSlots: { 1: 2 },
      cantripsKnown: 3
    },
    {
      class: "Wizard",
      level: 2,
      hitDie: 6,
      proficiencyBonus: 2,
      features: ["Arcane Tradition"],
      choices: [
        {
          type: "spell",
          required: true,
          description: "Add 2 1st-level wizard spells to your spellbook.",
          maxSelections: 2
        }
      ],
      spellsKnown: 8,
      spellSlots: { 1: 3 },
      cantripsKnown: 3
    }
  ]
};

// Fighting styles definitions
export const FIGHTING_STYLES: Record<string, string> = {
  "Archery": "You gain a +2 bonus to attack rolls you make with ranged weapons.",
  "Defense": "While you are wearing armor, you gain a +1 bonus to AC.",
  "Dueling": "When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.",
  "Great Weapon Fighting": "When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll.",
  "Protection": "When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.",
  "Two-Weapon Fighting": "When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack."
};

// Common feats (subset for initial implementation)
export const FEATS: Record<string, {
  name: string;
  description: string;
  prerequisites?: string[];
  abilityScoreIncrease?: Record<string, number>;
}> = {
  "Alert": {
    name: "Alert",
    description: "Always on the lookout for danger, you gain a +5 bonus to initiative, can't be surprised while conscious, and other creatures don't gain advantage on attack rolls against you as a result of being unseen by you."
  },
  "Lucky": {
    name: "Lucky",
    description: "You have inexplicable luck that seems to kick in at just the right moment. You have 3 luck points. Whenever you make an attack roll, ability check, or saving throw, you can spend one luck point to roll an additional d20."
  },
  "Magic Initiate": {
    name: "Magic Initiate",
    description: "Choose a class: bard, cleric, druid, sorcerer, warlock, or wizard. You learn two cantrips of your choice from that class's spell list. You also learn one 1st-level spell of your choice from that same list."
  },
  "Sharpshooter": {
    name: "Sharpshooter",
    description: "You have mastered ranged weapons and can make shots that others find impossible. You can attack at long range without disadvantage, your ranged weapon attacks ignore half and three-quarters cover, and before making a ranged attack, you can choose to take a -5 penalty to gain +10 damage if you hit."
  },
  "Great Weapon Master": {
    name: "Great Weapon Master",
    description: "You've learned to put the weight of a weapon to your advantage. On your turn, when you score a critical hit or reduce a creature to 0 hit points with a melee weapon attack, you can make one melee weapon attack as a bonus action. Before making a melee attack with a heavy weapon, you can choose to take a -5 penalty to gain +10 damage if you hit."
  }
}; 