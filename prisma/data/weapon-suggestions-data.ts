export interface WeaponSuggestionData {
  weaponName: string;
  quantity: number;
  reason?: string;
}

export interface AmmunitionSuggestionData {
  ammunitionName: string;
  quantity: number;
  reason?: string;
}

export interface ClassWeaponSuggestionsData {
  className: string;
  suggestions: WeaponSuggestionData[];
  ammunition?: AmmunitionSuggestionData[];
  phbDescription: string;
}

export const classWeaponSuggestionsData: ClassWeaponSuggestionsData[] = [
  {
    className: "Barbarian",
    suggestions: [
      { weaponName: "Greataxe", quantity: 1, reason: "Primary two-handed weapon" },
      { weaponName: "Handaxe", quantity: 2, reason: "Throwing weapons" }
    ],
    phbDescription: "(a) a greataxe or (b) any martial melee weapon, (a) two handaxes or (b) any simple weapon"
  },
  {
    className: "Bard",
    suggestions: [
      { weaponName: "Rapier", quantity: 1, reason: "Elegant finesse weapon" }
    ],
    phbDescription: "(a) a rapier, (b) a longsword, or (c) any simple weapon, (a) a diplomat's pack or (b) an entertainer's pack, (a) a lute or (b) any other musical instrument"
  },
  {
    className: "Cleric",
    suggestions: [
      { weaponName: "Mace", quantity: 1, reason: "Traditional cleric weapon" },
      { weaponName: "Light Crossbow", quantity: 1, reason: "Ranged option" }
    ],
    ammunition: [
      { ammunitionName: "Crossbow Bolt", quantity: 20, reason: "For light crossbow" }
    ],
    phbDescription: "(a) a mace or (b) a warhammer, (a) scale mail, (b) leather armor, or (c) chain mail, (a) a light crossbow and 20 bolts or (b) any simple weapon, (a) a priest's pack or (b) an explorer's pack, A shield and a holy symbol"
  },
  {
    className: "Druid",
    suggestions: [
      { weaponName: "Wooden Shield", quantity: 1, reason: "Natural protection" },
      { weaponName: "Scimitar", quantity: 1, reason: "Metal-free weapon" }
    ],
    phbDescription: "(a) a wooden shield or (b) any simple weapon, (a) a scimitar or (b) any simple melee weapon, Leather armor, an explorer's pack, and a druidic focus"
  },
  {
    className: "Fighter",
    suggestions: [
      { weaponName: "Longsword", quantity: 1, reason: "Versatile primary weapon" },
      { weaponName: "Shield", quantity: 1, reason: "Classic sword and board" },
      { weaponName: "Light Crossbow", quantity: 1, reason: "Ranged backup option" },
      { weaponName: "Handaxe", quantity: 2, reason: "Throwing weapons" }
    ],
    ammunition: [
      { ammunitionName: "Crossbow Bolts", quantity: 20, reason: "For light crossbow" }
    ],
    phbDescription: "(a) chain mail or (b) leather armor, longbow, and 20 arrows, (a) a martial weapon and a shield or (b) two martial weapons, (a) a light crossbow and 20 bolts or (b) two handaxes, (a) a dungeoneer's pack or (b) an explorer's pack"
  },
  {
    className: "Monk",
    suggestions: [
      { weaponName: "Shortsword", quantity: 1, reason: "Monk weapon" },
      { weaponName: "Dart", quantity: 10, reason: "Throwing weapons" }
    ],
    phbDescription: "(a) a shortsword or (b) any simple weapon, (a) a dungeoneer's pack or (b) an explorer's pack, 10 darts"
  },
  {
    className: "Paladin",
    suggestions: [
      { weaponName: "Longsword", quantity: 1, reason: "Classic paladin weapon" },
      { weaponName: "Shield", quantity: 1, reason: "Divine protection" },
      { weaponName: "Javelin", quantity: 2, reason: "Throwing weapons" }
    ],
    phbDescription: "(a) a martial weapon and a shield or (b) two martial weapons, (a) five javelins or (b) any simple melee weapon, (a) a priest's pack or (b) an explorer's pack, Chain mail and a holy symbol"
  },
  {
    className: "Ranger",
    suggestions: [
      { weaponName: "Shortsword", quantity: 2, reason: "Dual-wielding option" },
      { weaponName: "Longbow", quantity: 1, reason: "Classic ranger weapon" }
    ],
    ammunition: [
      { ammunitionName: "Arrow", quantity: 20, reason: "For longbow" }
    ],
    phbDescription: "(a) scale mail or (b) leather armor, (a) two shortswords or (b) two simple melee weapons, (a) a dungeoneer's pack or (b) an explorer's pack, A longbow and a quiver of 20 arrows"
  },
  {
    className: "Rogue",
    suggestions: [
      { weaponName: "Rapier", quantity: 1, reason: "Primary weapon" },
      { weaponName: "Shortbow", quantity: 1, reason: "Ranged option" }
    ],
    ammunition: [
      { ammunitionName: "Arrow", quantity: 20, reason: "For shortbow" }
    ],
    phbDescription: "(a) a rapier or (b) a shortsword, (a) a shortbow and quiver of 20 arrows or (b) a shortsword, (a) a burglar's pack, (b) a dungeoneer's pack, or (c) an explorer's pack, Leather armor, two daggers, and thieves' tools"
  },
  {
    className: "Sorcerer",
    suggestions: [
      { weaponName: "Light Crossbow", quantity: 1, reason: "Ranged option" },
      { weaponName: "Dagger", quantity: 2, reason: "Backup weapons" }
    ],
    ammunition: [
      { ammunitionName: "Crossbow Bolt", quantity: 20, reason: "For light crossbow" }
    ],
    phbDescription: "(a) a light crossbow and 20 bolts or (b) any simple weapon, (a) a component pouch or (b) an arcane focus, (a) a dungeoneer's pack or (b) an explorer's pack, Two daggers"
  },
  {
    className: "Warlock",
    suggestions: [
      { weaponName: "Light Crossbow", quantity: 1, reason: "Ranged option" },
      { weaponName: "Dagger", quantity: 2, reason: "Backup weapons" }
    ],
    ammunition: [
      { ammunitionName: "Crossbow Bolt", quantity: 20, reason: "For light crossbow" }
    ],
    phbDescription: "(a) a light crossbow and 20 bolts or (b) any simple weapon, (a) a component pouch or (b) an arcane focus, (a) a scholar's pack or (b) a dungeoneer's pack, Leather armor, any simple weapon, and two daggers"
  },
  {
    className: "Wizard",
    suggestions: [
      { weaponName: "Quarterstaff", quantity: 1, reason: "Traditional wizard weapon" }
    ],
    phbDescription: "(a) a spellbook, (a) a quarterstaff or (b) a dagger, (a) a component pouch or (b) an arcane focus, (a) a scholar's pack or (b) an explorer's pack"
  }
]; 