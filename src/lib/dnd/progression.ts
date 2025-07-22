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

// Helper function to create standard progression entries
function createStandardProgression(className: string, level: number, hitDie: number, features: string[], choices: LevelUpChoice[] = []): ClassProgression {
  const proficiencyBonus = level <= 4 ? 2 : level <= 8 ? 3 : level <= 12 ? 4 : level <= 16 ? 5 : 6;
  return {
    class: className,
    level,
    hitDie,
    proficiencyBonus,
    features,
    choices
  };
}

// Helper function to create ASI choice
function createASIChoice(): LevelUpChoice {
  return {
    type: "abilityScoreIncrease",
    required: true,
    description: "Increase one ability score by 2, or two ability scores by 1 each, or take a feat.",
    maxSelections: 1
  };
}

// Class progression tables - core D&D 5e classes (levels 1-20)
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
    createStandardProgression("Fighter", 2, 10, ["Action Surge"]),
    createStandardProgression("Fighter", 3, 10, ["Martial Archetype"]),
    createStandardProgression("Fighter", 4, 10, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Fighter", 5, 10, ["Extra Attack"]),
    createStandardProgression("Fighter", 6, 10, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Fighter", 7, 10, ["Martial Archetype Feature"]),
    createStandardProgression("Fighter", 8, 10, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Fighter", 9, 10, ["Indomitable"]),
    createStandardProgression("Fighter", 10, 10, ["Martial Archetype Feature"]),
    createStandardProgression("Fighter", 11, 10, ["Extra Attack (2)"]),
    createStandardProgression("Fighter", 12, 10, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Fighter", 13, 10, ["Indomitable (2 uses)"]),
    createStandardProgression("Fighter", 14, 10, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Fighter", 15, 10, ["Martial Archetype Feature"]),
    createStandardProgression("Fighter", 16, 10, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Fighter", 17, 10, ["Action Surge (2 uses)", "Indomitable (3 uses)"]),
    createStandardProgression("Fighter", 18, 10, ["Martial Archetype Feature"]),
    createStandardProgression("Fighter", 19, 10, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Fighter", 20, 10, ["Extra Attack (3)"])
  ],
  
  Wizard: [
    {
      class: "Wizard",
      level: 1,
      hitDie: 6,
      proficiencyBonus: 2,
      features: ["Spellcasting", "Arcane Recovery"],
      choices: [],
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
      choices: [],
      spellsKnown: 8,
      spellSlots: { 1: 3 },
      cantripsKnown: 3
    },
    {
      class: "Wizard",
      level: 3,
      hitDie: 6,
      proficiencyBonus: 2,
      features: ["2nd-level spells"],
      choices: [],
      spellsKnown: 10,
      spellSlots: { 1: 4, 2: 2 },
      cantripsKnown: 3
    },
    {
      class: "Wizard",
      level: 4,
      hitDie: 6,
      proficiencyBonus: 2,
      features: ["Ability Score Improvement"],
      choices: [createASIChoice()],
      spellsKnown: 12,
      spellSlots: { 1: 4, 2: 3 },
      cantripsKnown: 4
    },
    {
      class: "Wizard",
      level: 5,
      hitDie: 6,
      proficiencyBonus: 3,
      features: ["3rd-level spells"],
      choices: [],
      spellsKnown: 14,
      spellSlots: { 1: 4, 2: 3, 3: 2 },
      cantripsKnown: 4
    },
    createStandardProgression("Wizard", 6, 6, ["Arcane Tradition Feature"]),
    createStandardProgression("Wizard", 7, 6, ["4th-level spells"]),
    createStandardProgression("Wizard", 8, 6, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Wizard", 9, 6, ["5th-level spells"]),
    createStandardProgression("Wizard", 10, 6, ["Arcane Tradition Feature"]),
    createStandardProgression("Wizard", 11, 6, ["6th-level spells"]),
    createStandardProgression("Wizard", 12, 6, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Wizard", 13, 6, ["7th-level spells"]),
    createStandardProgression("Wizard", 14, 6, ["Arcane Tradition Feature"]),
    createStandardProgression("Wizard", 15, 6, ["8th-level spells"]),
    createStandardProgression("Wizard", 16, 6, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Wizard", 17, 6, ["9th-level spells"]),
    createStandardProgression("Wizard", 18, 6, ["Spell Mastery"]),
    createStandardProgression("Wizard", 19, 6, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Wizard", 20, 6, ["Signature Spells"])
  ],

  Rogue: [
    createStandardProgression("Rogue", 1, 8, ["Expertise", "Sneak Attack (1d6)", "Thieves' Cant"]),
    createStandardProgression("Rogue", 2, 8, ["Cunning Action"]),
    createStandardProgression("Rogue", 3, 8, ["Sneak Attack (2d6)", "Roguish Archetype"], [{
      type: "classFeature" as const,
      required: true,
      options: ["Thief", "Assassin", "Arcane Trickster"],
      maxSelections: 1,
      description: "Choose your Roguish Archetype"
    }]),
    createStandardProgression("Rogue", 4, 8, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Rogue", 5, 8, ["Sneak Attack (3d6)", "Uncanny Dodge"]),
    createStandardProgression("Rogue", 6, 8, ["Expertise"]),
    createStandardProgression("Rogue", 7, 8, ["Sneak Attack (4d6)", "Evasion"]),
    createStandardProgression("Rogue", 8, 8, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Rogue", 9, 8, ["Sneak Attack (5d6)", "Roguish Archetype Feature"]),
    createStandardProgression("Rogue", 10, 8, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Rogue", 11, 8, ["Sneak Attack (6d6)", "Reliable Talent"]),
    createStandardProgression("Rogue", 12, 8, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Rogue", 13, 8, ["Sneak Attack (7d6)", "Roguish Archetype Feature"]),
    createStandardProgression("Rogue", 14, 8, ["Blindsense"]),
    createStandardProgression("Rogue", 15, 8, ["Sneak Attack (8d6)", "Slippery Mind"]),
    createStandardProgression("Rogue", 16, 8, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Rogue", 17, 8, ["Sneak Attack (9d6)", "Roguish Archetype Feature"]),
    createStandardProgression("Rogue", 18, 8, ["Elusive"]),
    createStandardProgression("Rogue", 19, 8, ["Sneak Attack (10d6)", "Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Rogue", 20, 8, ["Stroke of Luck"])
  ],

  Cleric: [
    createStandardProgression("Cleric", 1, 8, ["Spellcasting", "Divine Domain"]),
    createStandardProgression("Cleric", 2, 8, ["Channel Divinity", "Divine Domain Feature"]),
    createStandardProgression("Cleric", 3, 8, ["2nd-level spells"]),
    createStandardProgression("Cleric", 4, 8, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Cleric", 5, 8, ["3rd-level spells", "Destroy Undead (CR 1/2)"]),
    createStandardProgression("Cleric", 6, 8, ["Channel Divinity (2/rest)", "Divine Domain Feature"]),
    createStandardProgression("Cleric", 7, 8, ["4th-level spells"]),
    createStandardProgression("Cleric", 8, 8, ["Ability Score Improvement", "Destroy Undead (CR 1)", "Divine Domain Feature"], [createASIChoice()]),
    createStandardProgression("Cleric", 9, 8, ["5th-level spells"]),
    createStandardProgression("Cleric", 10, 8, ["Divine Intervention"]),
    createStandardProgression("Cleric", 11, 8, ["6th-level spells", "Destroy Undead (CR 2)"]),
    createStandardProgression("Cleric", 12, 8, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Cleric", 13, 8, ["7th-level spells"]),
    createStandardProgression("Cleric", 14, 8, ["Destroy Undead (CR 3)"]),
    createStandardProgression("Cleric", 15, 8, ["8th-level spells"]),
    createStandardProgression("Cleric", 16, 8, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Cleric", 17, 8, ["9th-level spells", "Destroy Undead (CR 4)", "Divine Domain Feature"]),
    createStandardProgression("Cleric", 18, 8, ["Channel Divinity (3/rest)"]),
    createStandardProgression("Cleric", 19, 8, ["Ability Score Improvement"], [createASIChoice()]),
    createStandardProgression("Cleric", 20, 8, ["Divine Intervention Improvement"])
  ],

  // Add basic progressions for other classes
  Barbarian: Array.from({length: 20}, (_, i) => {
    const level = i + 1;
    const features = level === 1 ? ["Rage", "Unarmored Defense"] :
                    level === 2 ? ["Reckless Attack", "Danger Sense"] :
                    level === 3 ? ["Primal Path"] :
                    level === 5 ? ["Extra Attack", "Fast Movement"] :
                    level === 7 ? ["Feral Instinct"] :
                    level === 9 ? ["Brutal Critical (1 die)"] :
                    level === 11 ? ["Relentless Rage"] :
                    level === 13 ? ["Brutal Critical (2 dice)"] :
                    level === 15 ? ["Persistent Rage"] :
                    level === 17 ? ["Brutal Critical (3 dice)"] :
                    level === 18 ? ["Indomitable Might"] :
                    level === 20 ? ["Primal Champion"] : 
                    [level % 2 === 0 ? "Rage uses increase" : "Path feature"];
    const choices = [4, 8, 12, 16, 19].includes(level) ? [createASIChoice()] : [];
    return createStandardProgression("Barbarian", level, 12, features, choices);
  }),

  Bard: Array.from({length: 20}, (_, i) => {
    const level = i + 1;
    const features = level === 1 ? ["Spellcasting", "Bardic Inspiration"] :
                    level === 2 ? ["Jack of All Trades", "Song of Rest"] :
                    level === 3 ? ["Bard College", "Expertise"] :
                    level === 5 ? ["Bardic Inspiration d8", "Font of Inspiration"] :
                    level === 6 ? ["Countercharm", "Bard College Feature"] :
                    level === 10 ? ["Bardic Inspiration d10", "Magical Secrets"] :
                    level === 14 ? ["Magical Secrets", "Bard College Feature"] :
                    level === 15 ? ["Bardic Inspiration d12"] :
                    level === 18 ? ["Magical Secrets"] :
                    level === 20 ? ["Superior Inspiration"] : 
                    [`Level ${level} features`];
    const choices = [4, 8, 12, 16, 19].includes(level) ? [createASIChoice()] : [];
    return createStandardProgression("Bard", level, 8, features, choices);
  }),

  Druid: Array.from({length: 20}, (_, i) => {
    const level = i + 1;
    const features = level === 1 ? ["Druidcraft", "Spellcasting"] :
                    level === 2 ? ["Wild Shape", "Druid Circle"] :
                    level === 18 ? ["Timeless Body", "Beast Spells"] :
                    level === 20 ? ["Archdruid"] : 
                    [`Level ${level} features`];
    const choices = [4, 8, 12, 16, 19].includes(level) ? [createASIChoice()] : [];
    return createStandardProgression("Druid", level, 8, features, choices);
  }),

  Monk: Array.from({length: 20}, (_, i) => {
    const level = i + 1;
    const features = level === 1 ? ["Unarmored Defense", "Martial Arts"] :
                    level === 2 ? ["Ki", "Unarmored Movement"] :
                    level === 3 ? ["Monastic Tradition", "Deflect Missiles"] :
                    level === 5 ? ["Extra Attack", "Stunning Strike"] :
                    level === 6 ? ["Ki-Empowered Strikes", "Monastic Tradition Feature"] :
                    level === 7 ? ["Evasion", "Stillness of Mind"] :
                    level === 10 ? ["Purity of Body"] :
                    level === 14 ? ["Diamond Soul"] :
                    level === 18 ? ["Empty Body"] :
                    level === 20 ? ["Perfect Self"] : 
                    [`Level ${level} features`];
    const choices = [4, 8, 12, 16, 19].includes(level) ? [createASIChoice()] : [];
    return createStandardProgression("Monk", level, 8, features, choices);
  }),

     Paladin: Array.from({length: 20}, (_, i) => {
     const level = i + 1;
     const features = level === 1 ? ["Divine Sense", "Lay on Hands"] :
                     level === 2 ? ["Fighting Style", "Spellcasting", "Divine Smite"] :
                     level === 3 ? ["Divine Health", "Sacred Oath"] :
                     level === 5 ? ["Extra Attack"] :
                     level === 6 ? ["Aura of Protection"] :
                     level === 10 ? ["Aura of Courage"] :
                     level === 11 ? ["Improved Divine Smite"] :
                     level === 14 ? ["Cleansing Touch"] :
                     level === 18 ? ["Aura improvements"] :
                     level === 20 ? ["Sacred Oath feature"] : 
                     [`Level ${level} features`];
     const choices = [4, 8, 12, 16, 19].includes(level) ? [createASIChoice()] : 
                    level === 2 ? [{
                      type: "fightingStyle" as const,
                      required: true,
                      options: ["Defense", "Dueling", "Great Weapon Fighting", "Protection"],
                      maxSelections: 1,
                      description: "Choose a fighting style."
                    }] : [];
     
     // Paladins get spells starting at level 2 (half-caster)
     const progression = createStandardProgression("Paladin", level, 10, features, choices);
     if (level >= 2) {
       progression.spellsKnown = level === 2 ? 2 : level === 3 ? 3 : level === 5 ? 4 : level === 7 ? 5 : level === 9 ? 6 : level === 11 ? 7 : level === 13 ? 8 : level === 15 ? 9 : level === 17 ? 10 : level === 19 ? 11 : 10;
       progression.spellSlots = level === 2 ? { 1: 2 } :
                                level === 3 ? { 1: 3 } :
                                level === 5 ? { 1: 4, 2: 2 } :
                                level === 7 ? { 1: 4, 2: 3 } :
                                level === 9 ? { 1: 4, 2: 3, 3: 2 } :
                                level === 11 ? { 1: 4, 2: 3, 3: 3 } :
                                level === 13 ? { 1: 4, 2: 3, 3: 3, 4: 1 } :
                                level === 15 ? { 1: 4, 2: 3, 3: 3, 4: 2 } :
                                level === 17 ? { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 } :
                                { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 };
     }
     return progression;
   }),

     Ranger: Array.from({length: 20}, (_, i) => {
     const level = i + 1;
     const features = level === 1 ? ["Favored Enemy", "Natural Explorer"] :
                     level === 2 ? ["Fighting Style", "Spellcasting"] :
                     level === 3 ? ["Ranger Archetype", "Primeval Awareness"] :
                     level === 5 ? ["Extra Attack"] :
                     level === 8 ? ["Land's Stride"] :
                     level === 10 ? ["Hide in Plain Sight"] :
                     level === 14 ? ["Vanish"] :
                     level === 18 ? ["Feral Senses"] :
                     level === 20 ? ["Foe Slayer"] : 
                     [`Level ${level} features`];
     const choices = [4, 8, 12, 16, 19].includes(level) ? [createASIChoice()] : 
                    level === 2 ? [{
                      type: "fightingStyle" as const,
                      required: true,
                      options: ["Archery", "Defense", "Dueling", "Two-Weapon Fighting"],
                      maxSelections: 1,
                      description: "Choose a fighting style."
                    }] : [];
     
     // Rangers get spells starting at level 2 (half-caster)
     const progression = createStandardProgression("Ranger", level, 10, features, choices);
     if (level >= 2) {
       progression.spellsKnown = level === 2 ? 2 : level === 3 ? 3 : level === 5 ? 4 : level === 7 ? 5 : level === 9 ? 6 : level === 11 ? 7 : level === 13 ? 8 : level === 15 ? 9 : level === 17 ? 10 : level === 19 ? 11 : 10;
       progression.spellSlots = level === 2 ? { 1: 2 } :
                                level === 3 ? { 1: 3 } :
                                level === 5 ? { 1: 4, 2: 2 } :
                                level === 7 ? { 1: 4, 2: 3 } :
                                level === 9 ? { 1: 4, 2: 3, 3: 2 } :
                                level === 11 ? { 1: 4, 2: 3, 3: 3 } :
                                level === 13 ? { 1: 4, 2: 3, 3: 3, 4: 1 } :
                                level === 15 ? { 1: 4, 2: 3, 3: 3, 4: 2 } :
                                level === 17 ? { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 } :
                                { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 };
     }
     return progression;
   }),

  Sorcerer: Array.from({length: 20}, (_, i) => {
    const level = i + 1;
    const features = level === 1 ? ["Spellcasting", "Sorcerous Origin"] :
                    level === 2 ? ["Font of Magic"] :
                    level === 3 ? ["Metamagic"] :
                    level === 20 ? ["Sorcerous Restoration"] : 
                    [`Level ${level} features`];
    const choices = [4, 8, 12, 16, 19].includes(level) ? [createASIChoice()] : [];
    return createStandardProgression("Sorcerer", level, 6, features, choices);
  }),

  Warlock: Array.from({length: 20}, (_, i) => {
    const level = i + 1;
    const features = level === 1 ? ["Otherworldly Patron", "Pact Magic"] :
                    level === 2 ? ["Eldritch Invocations"] :
                    level === 3 ? ["Pact Boon"] :
                    level === 11 ? ["Mystic Arcanum (6th level)"] :
                    level === 13 ? ["Mystic Arcanum (7th level)"] :
                    level === 15 ? ["Mystic Arcanum (8th level)"] :
                    level === 17 ? ["Mystic Arcanum (9th level)"] :
                    level === 20 ? ["Eldritch Master"] : 
                    [`Level ${level} features`];
    const choices = [4, 8, 12, 16, 19].includes(level) ? [createASIChoice()] : [];
    return createStandardProgression("Warlock", level, 8, features, choices);
  })
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