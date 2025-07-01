// Complete D&D 5e SRD Languages Data
// Source: System Reference Document 5.1 by Wizards of the Coast LLC
// Licensed under Creative Commons Attribution 4.0 International License
// https://dnd.wizards.com/resources/systems-reference-document

export interface LanguageData {
  name: string;
  script: string;
  category: 'Standard' | 'Exotic' | 'Secret';
  description: string;
}

export const languagesData: LanguageData[] = [
  // Standard Languages
  {
    name: "Common",
    script: "Common",
    category: "Standard",
    description: "The most widely spoken language"
  },
  {
    name: "Dwarvish",
    script: "Dwarvish",
    category: "Standard",
    description: "Language of dwarves"
  },
  {
    name: "Elvish",
    script: "Elvish",
    category: "Standard",
    description: "Language of elves"
  },
  {
    name: "Giant",
    script: "Dwarvish",
    category: "Standard",
    description: "Language of giants and ogres"
  },
  {
    name: "Gnomish",
    script: "Dwarvish",
    category: "Standard",
    description: "Language of gnomes"
  },
  {
    name: "Goblin",
    script: "Dwarvish",
    category: "Standard",
    description: "Language of goblinoids"
  },
  {
    name: "Halfling",
    script: "Common",
    category: "Standard",
    description: "Language of halflings"
  },
  {
    name: "Orc",
    script: "Dwarvish",
    category: "Standard",
    description: "Language of orcs"
  },

  // Exotic Languages
  {
    name: "Abyssal",
    script: "Infernal",
    category: "Exotic",
    description: "Language of demons"
  },
  {
    name: "Celestial",
    script: "Celestial",
    category: "Exotic",
    description: "Language of celestials"
  },
  {
    name: "Draconic",
    script: "Draconic",
    category: "Exotic",
    description: "Language of dragons and magic"
  },
  {
    name: "Deep Speech",
    script: "—",
    category: "Exotic",
    description: "Language of aberrations"
  },
  {
    name: "Infernal",
    script: "Infernal",
    category: "Exotic",
    description: "Language of devils"
  },
  {
    name: "Primordial",
    script: "Dwarvish",
    category: "Exotic",
    description: "Language of elementals"
  },
  {
    name: "Sylvan",
    script: "Elvish",
    category: "Exotic",
    description: "Language of fey creatures"
  },
  {
    name: "Undercommon",
    script: "Elvish",
    category: "Exotic",
    description: "Trade language of the Underdark"
  },

  // Primordial Dialects
  {
    name: "Aquan",
    script: "Dwarvish",
    category: "Exotic",
    description: "Water elemental dialect"
  },
  {
    name: "Auran",
    script: "Dwarvish",
    category: "Exotic",
    description: "Air elemental dialect"
  },
  {
    name: "Ignan",
    script: "Dwarvish",
    category: "Exotic",
    description: "Fire elemental dialect"
  },
  {
    name: "Terran",
    script: "Dwarvish",
    category: "Exotic",
    description: "Earth elemental dialect"
  },

  // Secret Languages
  {
    name: "Druidic",
    script: "Druidic",
    category: "Secret",
    description: "Secret language of druids"
  },
  {
    name: "Thieves' Cant",
    script: "—",
    category: "Secret",
    description: "Secret language of rogues"
  }
]; 