// Complete D&D 5e SRD Classes Data
// Source: System Reference Document 5.1 by Wizards of the Coast LLC
// Licensed under Creative Commons Attribution 4.0 International License
// https://dnd.wizards.com/resources/systems-reference-document

export const classesData = [
  {
    name: "Barbarian",
    description: "A fierce warrior of primitive background who can enter a battle rage",
    startingGoldFormula: "2d4*10",
    hitDie: 12,
    primaryAbility: "Strength",
    savingThrows: ["Strength", "Constitution"],
    skillChoices: {
      available: ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"],
      choose: 2
    }
  },
  {
    name: "Bard", 
    description: "A master of song, speech, and the magic they contain",
    startingGoldFormula: "5d4*10",
    hitDie: 8,
    primaryAbility: "Charisma",
    savingThrows: ["Dexterity", "Charisma"],
    skillChoices: {
      available: ["Any"], // Bards can choose any 3 skills
      choose: 3
    }
  },
  {
    name: "Cleric",
    description: "A priestly champion who wields divine magic in service of a higher power",
    startingGoldFormula: "5d4*10",
    hitDie: 8,
    primaryAbility: "Wisdom",
    savingThrows: ["Wisdom", "Charisma"],
    skillChoices: {
      available: ["History", "Insight", "Medicine", "Persuasion", "Religion"],
      choose: 2
    }
  },
  {
    name: "Druid",
    description: "A priest of the Old Faith, wielding elemental forces and transforming into beasts",
    startingGoldFormula: "2d4*10",
    hitDie: 8,
    primaryAbility: "Wisdom",
    savingThrows: ["Intelligence", "Wisdom"],
    skillChoices: {
      available: ["Arcana", "Animal Handling", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"],
      choose: 2
    }
  },
  {
    name: "Fighter",
    description: "A master of martial combat, skilled with a variety of weapons and armor",
    startingGoldFormula: "5d4*10",
    hitDie: 10,
    primaryAbility: "Strength or Dexterity",
    savingThrows: ["Strength", "Constitution"],
    skillChoices: {
      available: ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"],
      choose: 2
    }
  },
  {
    name: "Monk",
    description: "A master of martial arts, harnessing inner power through discipline and practice",
    startingGoldFormula: "5d4",
    hitDie: 8,
    primaryAbility: "Dexterity & Wisdom",
    savingThrows: ["Strength", "Dexterity"],
    skillChoices: {
      available: ["Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"],
      choose: 2
    }
  },
  {
    name: "Paladin",
    description: "A holy warrior bound to a sacred oath",
    startingGoldFormula: "5d4*10",
    hitDie: 10,
    primaryAbility: "Strength & Charisma",
    savingThrows: ["Wisdom", "Charisma"],
    skillChoices: {
      available: ["Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"],
      choose: 2
    }
  },
  {
    name: "Ranger",
    description: "A warrior of the wilderness, skilled in tracking, survival, and combat",
    startingGoldFormula: "5d4*10",
    hitDie: 10,
    primaryAbility: "Dexterity & Wisdom",
    savingThrows: ["Strength", "Dexterity"],
    skillChoices: {
      available: ["Animal Handling", "Athletics", "Insight", "Investigation", "Nature", "Perception", "Stealth", "Survival"],
      choose: 3
    }
  },
  {
    name: "Rogue",
    description: "A scoundrel who uses stealth and trickery to achieve their goals",
    startingGoldFormula: "4d4*10",
    hitDie: 8,
    primaryAbility: "Dexterity",
    savingThrows: ["Dexterity", "Intelligence"],
    skillChoices: {
      available: ["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth"],
      choose: 4
    }
  },
  {
    name: "Sorcerer",
    description: "A spellcaster who draws on inherent magic from a gift or bloodline",
    startingGoldFormula: "3d4*10",
    hitDie: 6,
    primaryAbility: "Charisma",
    savingThrows: ["Constitution", "Charisma"],
    skillChoices: {
      available: ["Arcana", "Deception", "Insight", "Intimidation", "Persuasion", "Religion"],
      choose: 2
    }
  },
  {
    name: "Warlock",
    description: "A wielder of magic derived from a bargain with an extraplanar entity",
    startingGoldFormula: "4d4*10",
    hitDie: 8,
    primaryAbility: "Charisma",
    savingThrows: ["Wisdom", "Charisma"],
    skillChoices: {
      available: ["Arcana", "Deception", "History", "Intimidation", "Investigation", "Nature", "Religion"],
      choose: 2
    }
  },
  {
    name: "Wizard",
    description: "A scholarly magic-user capable of manipulating the structures of spells",
    startingGoldFormula: "4d4*10",
    hitDie: 6,
    primaryAbility: "Intelligence",
    savingThrows: ["Intelligence", "Wisdom"],
    skillChoices: {
      available: ["Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"],
      choose: 2
    }
  }
];

export const classArmorProficiencies = [
  // Barbarian
  { className: "Barbarian", armorType: "Light" },
  { className: "Barbarian", armorType: "Medium" },
  { className: "Barbarian", armorType: "Shield" },

  // Bard
  { className: "Bard", armorType: "Light" },

  // Cleric
  { className: "Cleric", armorType: "Light" },
  { className: "Cleric", armorType: "Medium" },
  { className: "Cleric", armorType: "Shield" },

  // Druid (non-metal restriction applies)
  { className: "Druid", armorType: "Light" },
  { className: "Druid", armorType: "Medium" },
  { className: "Druid", armorType: "Shield" },

  // Fighter
  { className: "Fighter", armorType: "Light" },
  { className: "Fighter", armorType: "Medium" },
  { className: "Fighter", armorType: "Heavy" },
  { className: "Fighter", armorType: "Shield" },

  // Monk (no armor proficiencies)

  // Paladin
  { className: "Paladin", armorType: "Light" },
  { className: "Paladin", armorType: "Medium" },
  { className: "Paladin", armorType: "Heavy" },
  { className: "Paladin", armorType: "Shield" },

  // Ranger
  { className: "Ranger", armorType: "Light" },
  { className: "Ranger", armorType: "Medium" },
  { className: "Ranger", armorType: "Shield" },

  // Rogue
  { className: "Rogue", armorType: "Light" },

  // Sorcerer (no armor proficiencies)

  // Warlock
  { className: "Warlock", armorType: "Light" },

  // Wizard (no armor proficiencies)
];

export const classWeaponProficiencies = [
  // Barbarian - Simple + Martial
  { className: "Barbarian", proficiencyType: "Simple", weaponName: null },
  { className: "Barbarian", proficiencyType: "Martial", weaponName: null },

  // Bard - Simple + specific weapons
  { className: "Bard", proficiencyType: "Simple", weaponName: null },
  { className: "Bard", proficiencyType: "Specific", weaponName: "Longsword" },
  { className: "Bard", proficiencyType: "Specific", weaponName: "Rapier" },
  { className: "Bard", proficiencyType: "Specific", weaponName: "Shortsword" },
  { className: "Bard", proficiencyType: "Specific", weaponName: "Hand Crossbow" },

  // Cleric - Simple weapons only
  { className: "Cleric", proficiencyType: "Simple", weaponName: null },

  // Druid - Specific weapons only (no metal weapons)
  { className: "Druid", proficiencyType: "Specific", weaponName: "Club" },
  { className: "Druid", proficiencyType: "Specific", weaponName: "Dagger" },
  { className: "Druid", proficiencyType: "Specific", weaponName: "Dart" },
  { className: "Druid", proficiencyType: "Specific", weaponName: "Javelin" },
  { className: "Druid", proficiencyType: "Specific", weaponName: "Mace" },
  { className: "Druid", proficiencyType: "Specific", weaponName: "Quarterstaff" },
  { className: "Druid", proficiencyType: "Specific", weaponName: "Scimitar" },
  { className: "Druid", proficiencyType: "Specific", weaponName: "Sickle" },
  { className: "Druid", proficiencyType: "Specific", weaponName: "Sling" },
  { className: "Druid", proficiencyType: "Specific", weaponName: "Spear" },

  // Fighter - Simple + Martial
  { className: "Fighter", proficiencyType: "Simple", weaponName: null },
  { className: "Fighter", proficiencyType: "Martial", weaponName: null },

  // Monk - Simple + Shortsword
  { className: "Monk", proficiencyType: "Simple", weaponName: null },
  { className: "Monk", proficiencyType: "Specific", weaponName: "Shortsword" },

  // Paladin - Simple + Martial
  { className: "Paladin", proficiencyType: "Simple", weaponName: null },
  { className: "Paladin", proficiencyType: "Martial", weaponName: null },

  // Ranger - Simple + Martial
  { className: "Ranger", proficiencyType: "Simple", weaponName: null },
  { className: "Ranger", proficiencyType: "Martial", weaponName: null },

  // Rogue - Simple + specific weapons
  { className: "Rogue", proficiencyType: "Simple", weaponName: null },
  { className: "Rogue", proficiencyType: "Specific", weaponName: "Longsword" },
  { className: "Rogue", proficiencyType: "Specific", weaponName: "Rapier" },
  { className: "Rogue", proficiencyType: "Specific", weaponName: "Shortsword" },
  { className: "Rogue", proficiencyType: "Specific", weaponName: "Hand Crossbow" },

  // Sorcerer - Specific weapons only
  { className: "Sorcerer", proficiencyType: "Specific", weaponName: "Dagger" },
  { className: "Sorcerer", proficiencyType: "Specific", weaponName: "Dart" },
  { className: "Sorcerer", proficiencyType: "Specific", weaponName: "Sling" },
  { className: "Sorcerer", proficiencyType: "Specific", weaponName: "Quarterstaff" },
  { className: "Sorcerer", proficiencyType: "Specific", weaponName: "Light Crossbow" },

  // Warlock - Simple weapons only
  { className: "Warlock", proficiencyType: "Simple", weaponName: null },

  // Wizard - Specific weapons only
  { className: "Wizard", proficiencyType: "Specific", weaponName: "Dagger" },
  { className: "Wizard", proficiencyType: "Specific", weaponName: "Dart" },
  { className: "Wizard", proficiencyType: "Specific", weaponName: "Sling" },
  { className: "Wizard", proficiencyType: "Specific", weaponName: "Quarterstaff" },
  { className: "Wizard", proficiencyType: "Specific", weaponName: "Light Crossbow" },
]; 