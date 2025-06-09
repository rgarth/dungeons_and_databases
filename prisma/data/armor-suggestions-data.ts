export interface ArmorSuggestionData {
  armorName: string;
  reason?: string;
}

export interface ClassArmorSuggestionsData {
  className: string;
  suggestions: ArmorSuggestionData[];
}

export const classArmorSuggestionsData: ClassArmorSuggestionsData[] = [
  {
    className: "Barbarian",
    suggestions: [
      { armorName: "Leather Armor", reason: "Light armor for unarmored defense" }
    ]
  },
  {
    className: "Bard",
    suggestions: [
      { armorName: "Leather Armor", reason: "Light armor for performance" }
    ]
  },
  {
    className: "Cleric",
    suggestions: [
      { armorName: "Scale Mail", reason: "Starting medium armor" },
      { armorName: "Shield", reason: "Divine protection" }
    ]
  },
  {
    className: "Druid",
    suggestions: [
      { armorName: "Leather Armor", reason: "Natural armor material" },
      { armorName: "Shield", reason: "Nature's protection" }
    ]
  },
  {
    className: "Fighter",
    suggestions: [
      { armorName: "Chain Mail", reason: "Starting heavy armor" },
      { armorName: "Shield", reason: "Protection bonus" }
    ]
  },
  {
    className: "Monk",
    suggestions: [
      // Monks typically don't use armor due to Unarmored Defense
    ]
  },
  {
    className: "Paladin",
    suggestions: [
      { armorName: "Chain Mail", reason: "Starting heavy armor" },
      { armorName: "Shield", reason: "Divine protection" }
    ]
  },
  {
    className: "Ranger",
    suggestions: [
      { armorName: "Studded Leather", reason: "Starting light armor" },
      { armorName: "Shield", reason: "Backup protection" }
    ]
  },
  {
    className: "Rogue",
    suggestions: [
      { armorName: "Leather Armor", reason: "Light armor for stealth" }
    ]
  },
  {
    className: "Sorcerer",
    suggestions: [
      { armorName: "Leather Armor", reason: "Basic protection for spellcaster" }
    ]
  },
  {
    className: "Warlock",
    suggestions: [
      { armorName: "Leather Armor", reason: "Light armor for mobility" }
    ]
  },
  {
    className: "Wizard",
    suggestions: [
      { armorName: "Leather Armor", reason: "Basic protection for spellcaster" }
    ]
  }
]; 