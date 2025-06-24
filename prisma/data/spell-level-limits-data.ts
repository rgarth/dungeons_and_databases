// D&D 5e Spell Level Limits Data
// Based on Player's Handbook spell progression tables
// This includes maximum spell level and spell level limits for each class at each level

export const spellLevelLimitsData = [
  // Bard - Known spellcaster
  {
    className: "Bard",
    level: 1,
    cantripsKnown: 2,
    spellsKnown: 4,
    spellcastingType: "known",
    maxSpellLevel: 1,
    spellLevelLimits: { "1": 4 }
  },
  {
    className: "Bard",
    level: 2,
    cantripsKnown: 2,
    spellsKnown: 5,
    spellcastingType: "known",
    maxSpellLevel: 1,
    spellLevelLimits: { "1": 5 }
  },
  {
    className: "Bard",
    level: 3,
    cantripsKnown: 2,
    spellsKnown: 6,
    spellcastingType: "known",
    maxSpellLevel: 2,
    spellLevelLimits: { "1": 4, "2": 2 }
  },
  {
    className: "Bard",
    level: 4,
    cantripsKnown: 3,
    spellsKnown: 7,
    spellcastingType: "known",
    maxSpellLevel: 2,
    spellLevelLimits: { "1": 4, "2": 3 }
  },
  {
    className: "Bard",
    level: 5,
    cantripsKnown: 3,
    spellsKnown: 8,
    spellcastingType: "known",
    maxSpellLevel: 3,
    spellLevelLimits: { "1": 4, "2": 3, "3": 1 }
  },
  {
    className: "Bard",
    level: 6,
    cantripsKnown: 3,
    spellsKnown: 9,
    spellcastingType: "known",
    maxSpellLevel: 3,
    spellLevelLimits: { "1": 4, "2": 3, "3": 2 }
  },
  {
    className: "Bard",
    level: 7,
    cantripsKnown: 3,
    spellsKnown: 10,
    spellcastingType: "known",
    maxSpellLevel: 4,
    spellLevelLimits: { "1": 4, "2": 3, "3": 2, "4": 1 }
  },
  {
    className: "Bard",
    level: 8,
    cantripsKnown: 3,
    spellsKnown: 11,
    spellcastingType: "known",
    maxSpellLevel: 4,
    spellLevelLimits: { "1": 4, "2": 3, "3": 2, "4": 2 }
  },
  {
    className: "Bard",
    level: 9,
    cantripsKnown: 3,
    spellsKnown: 12,
    spellcastingType: "known",
    maxSpellLevel: 5,
    spellLevelLimits: { "1": 4, "2": 3, "3": 2, "4": 2, "5": 1 }
  },
  {
    className: "Bard",
    level: 10,
    cantripsKnown: 4,
    spellsKnown: 14,
    spellcastingType: "known",
    maxSpellLevel: 5,
    spellLevelLimits: { "1": 4, "2": 3, "3": 2, "4": 2, "5": 3 }
  },
  {
    className: "Bard",
    level: 11,
    cantripsKnown: 4,
    spellsKnown: 15,
    spellcastingType: "known",
    maxSpellLevel: 6,
    spellLevelLimits: { "1": 4, "2": 3, "3": 2, "4": 2, "5": 3, "6": 1 }
  },
  {
    className: "Bard",
    level: 12,
    cantripsKnown: 4,
    spellsKnown: 15,
    spellcastingType: "known",
    maxSpellLevel: 6,
    spellLevelLimits: { "1": 4, "2": 3, "3": 2, "4": 2, "5": 3, "6": 1 }
  },
  {
    className: "Bard",
    level: 13,
    cantripsKnown: 4,
    spellsKnown: 16,
    spellcastingType: "known",
    maxSpellLevel: 7,
    spellLevelLimits: { "1": 4, "2": 3, "3": 2, "4": 2, "5": 3, "6": 1, "7": 1 }
  },
  {
    className: "Bard",
    level: 14,
    cantripsKnown: 4,
    spellsKnown: 18,
    spellcastingType: "known",
    maxSpellLevel: 7,
    spellLevelLimits: { "1": 4, "2": 3, "3": 2, "4": 2, "5": 3, "6": 1, "7": 3 }
  },
  {
    className: "Bard",
    level: 15,
    cantripsKnown: 4,
    spellsKnown: 19,
    spellcastingType: "known",
    maxSpellLevel: 8,
    spellLevelLimits: { "1": 4, "2": 3, "3": 2, "4": 2, "5": 3, "6": 1, "7": 3, "8": 1 }
  },
  {
    className: "Bard",
    level: 16,
    cantripsKnown: 4,
    spellsKnown: 19,
    spellcastingType: "known",
    maxSpellLevel: 8,
    spellLevelLimits: { "1": 4, "2": 3, "3": 2, "4": 2, "5": 3, "6": 1, "7": 3, "8": 1 }
  },
  {
    className: "Bard",
    level: 17,
    cantripsKnown: 4,
    spellsKnown: 20,
    spellcastingType: "known",
    maxSpellLevel: 9,
    spellLevelLimits: { "1": 4, "2": 3, "3": 2, "4": 2, "5": 3, "6": 1, "7": 3, "8": 1, "9": 1 }
  },
  {
    className: "Bard",
    level: 18,
    cantripsKnown: 4,
    spellsKnown: 22,
    spellcastingType: "known",
    maxSpellLevel: 9,
    spellLevelLimits: { "1": 4, "2": 3, "3": 2, "4": 2, "5": 3, "6": 1, "7": 3, "8": 1, "9": 3 }
  },
  {
    className: "Bard",
    level: 19,
    cantripsKnown: 4,
    spellsKnown: 22,
    spellcastingType: "known",
    maxSpellLevel: 9,
    spellLevelLimits: { "1": 4, "2": 3, "3": 2, "4": 2, "5": 3, "6": 1, "7": 3, "8": 1, "9": 3 }
  },
  {
    className: "Bard",
    level: 20,
    cantripsKnown: 4,
    spellsKnown: 22,
    spellcastingType: "known",
    maxSpellLevel: 9,
    spellLevelLimits: { "1": 4, "2": 3, "3": 2, "4": 2, "5": 3, "6": 1, "7": 3, "8": 1, "9": 3 }
  },

  // Cleric - Prepared spellcaster
  {
    className: "Cleric",
    level: 1,
    cantripsKnown: 3,
    spellsKnown: 0, // Clerics know all spells of levels they can cast
    spellcastingType: "prepared",
    maxSpellLevel: 1,
    spellLevelLimits: { "1": 0 } // No limit - they know all 1st level spells
  },
  {
    className: "Cleric",
    level: 2,
    cantripsKnown: 3,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 1,
    spellLevelLimits: { "1": 0 }
  },
  {
    className: "Cleric",
    level: 3,
    cantripsKnown: 3,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 2,
    spellLevelLimits: { "1": 0, "2": 0 }
  },
  {
    className: "Cleric",
    level: 4,
    cantripsKnown: 4,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 2,
    spellLevelLimits: { "1": 0, "2": 0 }
  },
  {
    className: "Cleric",
    level: 5,
    cantripsKnown: 4,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 3,
    spellLevelLimits: { "1": 0, "2": 0, "3": 0 }
  },
  {
    className: "Cleric",
    level: 6,
    cantripsKnown: 4,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 3,
    spellLevelLimits: { "1": 0, "2": 0, "3": 0 }
  },
  {
    className: "Cleric",
    level: 7,
    cantripsKnown: 4,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 4,
    spellLevelLimits: { "1": 0, "2": 0, "3": 0, "4": 0 }
  },
  {
    className: "Cleric",
    level: 8,
    cantripsKnown: 4,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 4,
    spellLevelLimits: { "1": 0, "2": 0, "3": 0, "4": 0 }
  },
  {
    className: "Cleric",
    level: 9,
    cantripsKnown: 4,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 5,
    spellLevelLimits: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
  },
  {
    className: "Cleric",
    level: 10,
    cantripsKnown: 5,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 5,
    spellLevelLimits: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
  },
  {
    className: "Cleric",
    level: 11,
    cantripsKnown: 5,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 6,
    spellLevelLimits: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0 }
  },
  {
    className: "Cleric",
    level: 12,
    cantripsKnown: 5,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 6,
    spellLevelLimits: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0 }
  },
  {
    className: "Cleric",
    level: 13,
    cantripsKnown: 5,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 7,
    spellLevelLimits: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0 }
  },
  {
    className: "Cleric",
    level: 14,
    cantripsKnown: 5,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 7,
    spellLevelLimits: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0 }
  },
  {
    className: "Cleric",
    level: 15,
    cantripsKnown: 5,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 8,
    spellLevelLimits: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0 }
  },
  {
    className: "Cleric",
    level: 16,
    cantripsKnown: 5,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 8,
    spellLevelLimits: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0 }
  },
  {
    className: "Cleric",
    level: 17,
    cantripsKnown: 5,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 9,
    spellLevelLimits: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 }
  },
  {
    className: "Cleric",
    level: 18,
    cantripsKnown: 5,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 9,
    spellLevelLimits: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 }
  },
  {
    className: "Cleric",
    level: 19,
    cantripsKnown: 5,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 9,
    spellLevelLimits: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 }
  },
  {
    className: "Cleric",
    level: 20,
    cantripsKnown: 5,
    spellsKnown: 0,
    spellcastingType: "prepared",
    maxSpellLevel: 9,
    spellLevelLimits: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 }
  },

  // Wizard - Spellbook spellcaster
  {
    className: "Wizard",
    level: 1,
    cantripsKnown: 3,
    spellsKnown: 6, // 6 spells in spellbook
    spellcastingType: "spellbook",
    maxSpellLevel: 1,
    spellLevelLimits: { "1": 6 }
  },
  {
    className: "Wizard",
    level: 2,
    cantripsKnown: 3,
    spellsKnown: 8,
    spellcastingType: "spellbook",
    maxSpellLevel: 1,
    spellLevelLimits: { "1": 8 }
  },
  {
    className: "Wizard",
    level: 3,
    cantripsKnown: 3,
    spellsKnown: 10,
    spellcastingType: "spellbook",
    maxSpellLevel: 2,
    spellLevelLimits: { "1": 6, "2": 4 }
  },
  {
    className: "Wizard",
    level: 4,
    cantripsKnown: 4,
    spellsKnown: 12,
    spellcastingType: "spellbook",
    maxSpellLevel: 2,
    spellLevelLimits: { "1": 6, "2": 6 }
  },
  {
    className: "Wizard",
    level: 5,
    cantripsKnown: 4,
    spellsKnown: 14,
    spellcastingType: "spellbook",
    maxSpellLevel: 3,
    spellLevelLimits: { "1": 6, "2": 6, "3": 2 }
  },
  {
    className: "Wizard",
    level: 6,
    cantripsKnown: 4,
    spellsKnown: 16,
    spellcastingType: "spellbook",
    maxSpellLevel: 3,
    spellLevelLimits: { "1": 6, "2": 6, "3": 4 }
  },
  {
    className: "Wizard",
    level: 7,
    cantripsKnown: 4,
    spellsKnown: 18,
    spellcastingType: "spellbook",
    maxSpellLevel: 4,
    spellLevelLimits: { "1": 6, "2": 6, "3": 4, "4": 2 }
  },
  {
    className: "Wizard",
    level: 8,
    cantripsKnown: 4,
    spellsKnown: 20,
    spellcastingType: "spellbook",
    maxSpellLevel: 4,
    spellLevelLimits: { "1": 6, "2": 6, "3": 4, "4": 4 }
  },
  {
    className: "Wizard",
    level: 9,
    cantripsKnown: 4,
    spellsKnown: 22,
    spellcastingType: "spellbook",
    maxSpellLevel: 5,
    spellLevelLimits: { "1": 6, "2": 6, "3": 4, "4": 4, "5": 2 }
  },
  {
    className: "Wizard",
    level: 10,
    cantripsKnown: 5,
    spellsKnown: 24,
    spellcastingType: "spellbook",
    maxSpellLevel: 5,
    spellLevelLimits: { "1": 6, "2": 6, "3": 4, "4": 4, "5": 4 }
  },
  {
    className: "Wizard",
    level: 11,
    cantripsKnown: 5,
    spellsKnown: 26,
    spellcastingType: "spellbook",
    maxSpellLevel: 6,
    spellLevelLimits: { "1": 6, "2": 6, "3": 4, "4": 4, "5": 4, "6": 2 }
  },
  {
    className: "Wizard",
    level: 12,
    cantripsKnown: 5,
    spellsKnown: 28,
    spellcastingType: "spellbook",
    maxSpellLevel: 6,
    spellLevelLimits: { "1": 6, "2": 6, "3": 4, "4": 4, "5": 4, "6": 4 }
  },
  {
    className: "Wizard",
    level: 13,
    cantripsKnown: 5,
    spellsKnown: 30,
    spellcastingType: "spellbook",
    maxSpellLevel: 7,
    spellLevelLimits: { "1": 6, "2": 6, "3": 4, "4": 4, "5": 4, "6": 4, "7": 2 }
  },
  {
    className: "Wizard",
    level: 14,
    cantripsKnown: 5,
    spellsKnown: 32,
    spellcastingType: "spellbook",
    maxSpellLevel: 7,
    spellLevelLimits: { "1": 6, "2": 6, "3": 4, "4": 4, "5": 4, "6": 4, "7": 4 }
  },
  {
    className: "Wizard",
    level: 15,
    cantripsKnown: 5,
    spellsKnown: 34,
    spellcastingType: "spellbook",
    maxSpellLevel: 8,
    spellLevelLimits: { "1": 6, "2": 6, "3": 4, "4": 4, "5": 4, "6": 4, "7": 4, "8": 2 }
  },
  {
    className: "Wizard",
    level: 16,
    cantripsKnown: 5,
    spellsKnown: 36,
    spellcastingType: "spellbook",
    maxSpellLevel: 8,
    spellLevelLimits: { "1": 6, "2": 6, "3": 4, "4": 4, "5": 4, "6": 4, "7": 4, "8": 4 }
  },
  {
    className: "Wizard",
    level: 17,
    cantripsKnown: 5,
    spellsKnown: 38,
    spellcastingType: "spellbook",
    maxSpellLevel: 9,
    spellLevelLimits: { "1": 6, "2": 6, "3": 4, "4": 4, "5": 4, "6": 4, "7": 4, "8": 4, "9": 2 }
  },
  {
    className: "Wizard",
    level: 18,
    cantripsKnown: 5,
    spellsKnown: 40,
    spellcastingType: "spellbook",
    maxSpellLevel: 9,
    spellLevelLimits: { "1": 6, "2": 6, "3": 4, "4": 4, "5": 4, "6": 4, "7": 4, "8": 4, "9": 4 }
  },
  {
    className: "Wizard",
    level: 19,
    cantripsKnown: 5,
    spellsKnown: 42,
    spellcastingType: "spellbook",
    maxSpellLevel: 9,
    spellLevelLimits: { "1": 6, "2": 6, "3": 4, "4": 4, "5": 4, "6": 4, "7": 4, "8": 4, "9": 6 }
  },
  {
    className: "Wizard",
    level: 20,
    cantripsKnown: 5,
    spellsKnown: 44,
    spellcastingType: "spellbook",
    maxSpellLevel: 9,
    spellLevelLimits: { "1": 6, "2": 6, "3": 4, "4": 4, "5": 4, "6": 4, "7": 4, "8": 4, "9": 8 }
  }
]; 