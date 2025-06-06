// D&D 5e Languages
export interface Language {
  name: string;
  script: string;
  category: 'Standard' | 'Exotic' | 'Secret';
  description?: string;
}

export const LANGUAGES: Language[] = [
  // Standard Languages
  { name: 'Common', script: 'Common', category: 'Standard', description: 'The most widely spoken language' },
  { name: 'Dwarvish', script: 'Dwarvish', category: 'Standard', description: 'Language of dwarves' },
  { name: 'Elvish', script: 'Elvish', category: 'Standard', description: 'Language of elves' },
  { name: 'Giant', script: 'Dwarvish', category: 'Standard', description: 'Language of giants and ogres' },
  { name: 'Gnomish', script: 'Dwarvish', category: 'Standard', description: 'Language of gnomes' },
  { name: 'Goblin', script: 'Dwarvish', category: 'Standard', description: 'Language of goblinoids' },
  { name: 'Halfling', script: 'Common', category: 'Standard', description: 'Language of halflings' },
  { name: 'Orc', script: 'Dwarvish', category: 'Standard', description: 'Language of orcs' },

  // Exotic Languages
  { name: 'Abyssal', script: 'Infernal', category: 'Exotic', description: 'Language of demons' },
  { name: 'Celestial', script: 'Celestial', category: 'Exotic', description: 'Language of celestials' },
  { name: 'Draconic', script: 'Draconic', category: 'Exotic', description: 'Language of dragons and magic' },
  { name: 'Deep Speech', script: '—', category: 'Exotic', description: 'Language of aberrations' },
  { name: 'Infernal', script: 'Infernal', category: 'Exotic', description: 'Language of devils' },
  { name: 'Primordial', script: 'Dwarvish', category: 'Exotic', description: 'Language of elementals' },
  { name: 'Sylvan', script: 'Elvish', category: 'Exotic', description: 'Language of fey creatures' },
  { name: 'Undercommon', script: 'Elvish', category: 'Exotic', description: 'Trade language of the Underdark' },

  // Primordial Dialects (subset of Primordial)
  { name: 'Aquan', script: 'Dwarvish', category: 'Exotic', description: 'Water elemental dialect' },
  { name: 'Auran', script: 'Dwarvish', category: 'Exotic', description: 'Air elemental dialect' },
  { name: 'Ignan', script: 'Dwarvish', category: 'Exotic', description: 'Fire elemental dialect' },
  { name: 'Terran', script: 'Dwarvish', category: 'Exotic', description: 'Earth elemental dialect' },

  // Secret Languages
  { name: 'Druidic', script: 'Druidic', category: 'Secret', description: 'Secret language of druids' },
  { name: "Thieves' Cant", script: '—', category: 'Secret', description: 'Secret language of rogues' },
];

// Get languages by category
export function getLanguagesByCategory(category: Language['category']): Language[] {
  return LANGUAGES.filter(lang => lang.category === category);
}

// Get racial starting languages
export function getRacialLanguages(race: string): string[] {
  const racialLanguages: Record<string, string[]> = {
    'Human': ['Common'],
    'Dwarf': ['Common', 'Dwarvish'],
    'Elf': ['Common', 'Elvish'],
    'Halfling': ['Common', 'Halfling'],
    'Dragonborn': ['Common', 'Draconic'],
    'Gnome': ['Common', 'Gnomish'],
    'Half-Elf': ['Common', 'Elvish'],
    'Half-Orc': ['Common', 'Orc'],
    'Tiefling': ['Common', 'Infernal'],
  };

  return racialLanguages[race] || ['Common'];
} 