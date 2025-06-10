export interface WeaponSuggestionData {
  weaponName: string;
  quantity: number;
  reason?: string;
}

export interface ClassWeaponSuggestionsData {
  className: string;
  suggestions: WeaponSuggestionData[];
}

export const classWeaponSuggestionsData: ClassWeaponSuggestionsData[] = [
  {
    className: "Barbarian",
    suggestions: [
      { weaponName: "Greataxe", quantity: 1, reason: "Primary two-handed weapon" },
      { weaponName: "Handaxe", quantity: 2, reason: "Throwing weapons" }
    ]
  },
  {
    className: "Bard",
    suggestions: [
      { weaponName: "Rapier", quantity: 1, reason: "Elegant finesse weapon" },
      { weaponName: "Dagger", quantity: 1, reason: "Backup option" }
    ]
  },
  {
    className: "Cleric",
    suggestions: [
      { weaponName: "Mace", quantity: 1, reason: "Traditional cleric weapon" },
      { weaponName: "Shield", quantity: 1, reason: "Defense boost" }
    ]
  },
  {
    className: "Druid",
    suggestions: [
      { weaponName: "Scimitar", quantity: 1, reason: "Metal-free weapon" },
      { weaponName: "Shield", quantity: 1, reason: "Natural materials" }
    ]
  },
  {
    className: "Fighter",
    suggestions: [
      { weaponName: "Longsword", quantity: 1, reason: "Versatile primary weapon" },
      { weaponName: "Shield", quantity: 1, reason: "Classic sword and board" },
      { weaponName: "Light Crossbow", quantity: 1, reason: "Ranged backup option" },
      { weaponName: "Ammunition, Crossbow Bolts (20)", quantity: 1, reason: "Bolts for crossbow" }
    ]
  },
  {
    className: "Monk",
    suggestions: [
      { weaponName: "Shortsword", quantity: 1, reason: "Monk weapon" },
      { weaponName: "Dart", quantity: 10, reason: "Monk ranged weapon" }
    ]
  },
  {
    className: "Paladin",
    suggestions: [
      { weaponName: "Longsword", quantity: 1, reason: "Classic paladin weapon" },
      { weaponName: "Shield", quantity: 1, reason: "Divine protection" }
    ]
  },
  {
    className: "Ranger",
    suggestions: [
      { weaponName: "Longsword", quantity: 1, reason: "Versatile melee weapon" },
      { weaponName: "Longbow", quantity: 1, reason: "Classic ranger weapon" },
      { weaponName: "Ammunition, Arrows (20)", quantity: 1, reason: "Arrows for longbow" }
    ]
  },
  {
    className: "Rogue",
    suggestions: [
      { weaponName: "Rapier", quantity: 1, reason: "Finesse sneak attack weapon" },
      { weaponName: "Dagger", quantity: 2, reason: "Thrown sneak attack option" },
      { weaponName: "Shortbow", quantity: 1, reason: "Stealth ranged weapon" },
      { weaponName: "Ammunition, Arrows (20)", quantity: 1, reason: "Arrows for shortbow" }
    ]
  },
  {
    className: "Sorcerer",
    suggestions: [
      { weaponName: "Dagger", quantity: 1, reason: "Emergency backup weapon" }
    ]
  },
  {
    className: "Warlock",
    suggestions: [
      { weaponName: "Dagger", quantity: 1, reason: "Light backup weapon" }
    ]
  },
  {
    className: "Wizard",
    suggestions: [
      { weaponName: "Dagger", quantity: 1, reason: "Emergency weapon" },
      { weaponName: "Quarterstaff", quantity: 1, reason: "Traditional wizard weapon" }
    ]
  }
]; 