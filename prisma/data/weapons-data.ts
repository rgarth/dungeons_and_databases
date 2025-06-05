// Complete D&D 5e SRD Weapons Data
// Source: System Reference Document 5.1 by Wizards of the Coast LLC
// Licensed under Creative Commons Attribution 4.0 International License
// https://dnd.wizards.com/resources/systems-reference-document
export const weaponsData = [
  // Simple Melee Weapons
  {
    name: "Club",
    type: "Simple",
    category: "Melee",
    damage: "1d4",
    damageType: "Bludgeoning",
    properties: JSON.stringify(["Light"]),
    weight: 2,
    cost: "1 sp",
    stackable: false
  },
  {
    name: "Dagger",
    type: "Simple",
    category: "Melee",
    damage: "1d4",
    damageType: "Piercing",
    properties: JSON.stringify(["Finesse", "Light", "Thrown (20/60)"]),
    weight: 1,
    cost: "2 gp",
    stackable: true
  },
  {
    name: "Greatclub",
    type: "Simple",
    category: "Melee",
    damage: "1d8",
    damageType: "Bludgeoning",
    properties: JSON.stringify(["Two-handed"]),
    weight: 10,
    cost: "2 sp",
    stackable: false
  },
  {
    name: "Handaxe",
    type: "Simple",
    category: "Melee",
    damage: "1d6",
    damageType: "Slashing",
    properties: JSON.stringify(["Light", "Thrown (20/60)"]),
    weight: 2,
    cost: "5 gp",
    stackable: true
  },
  {
    name: "Javelin",
    type: "Simple",
    category: "Melee",
    damage: "1d6",
    damageType: "Piercing",
    properties: JSON.stringify(["Thrown (30/120)"]),
    weight: 2,
    cost: "5 sp",
    stackable: true
  },
  {
    name: "Light Hammer",
    type: "Simple",
    category: "Melee",
    damage: "1d4",
    damageType: "Bludgeoning",
    properties: JSON.stringify(["Light", "Thrown (20/60)"]),
    weight: 2,
    cost: "2 gp",
    stackable: true
  },
  {
    name: "Mace",
    type: "Simple",
    category: "Melee",
    damage: "1d6",
    damageType: "Bludgeoning",
    properties: JSON.stringify([]),
    weight: 4,
    cost: "5 gp",
    stackable: false
  },
  {
    name: "Quarterstaff",
    type: "Simple",
    category: "Melee",
    damage: "1d6",
    damageType: "Bludgeoning",
    properties: JSON.stringify(["Versatile (1d8)"]),
    weight: 4,
    cost: "2 sp",
    stackable: false
  },
  {
    name: "Sickle",
    type: "Simple",
    category: "Melee",
    damage: "1d4",
    damageType: "Slashing",
    properties: JSON.stringify(["Light"]),
    weight: 2,
    cost: "1 gp",
    stackable: false
  },
  {
    name: "Spear",
    type: "Simple",
    category: "Melee",
    damage: "1d6",
    damageType: "Piercing",
    properties: JSON.stringify(["Thrown (20/60)", "Versatile (1d8)"]),
    weight: 3,
    cost: "1 gp",
    stackable: false
  },

  // Simple Ranged Weapons
  {
    name: "Light Crossbow",
    type: "Simple",
    category: "Ranged",
    damage: "1d8",
    damageType: "Piercing",
    properties: JSON.stringify(["Ammunition (80/320)", "Loading", "Two-handed"]),
    weight: 5,
    cost: "25 gp",
    stackable: false
  },
  {
    name: "Dart",
    type: "Simple",
    category: "Ranged",
    damage: "1d4",
    damageType: "Piercing",
    properties: JSON.stringify(["Finesse", "Thrown (20/60)"]),
    weight: 0.25,
    cost: "5 cp",
    stackable: true
  },
  {
    name: "Shortbow",
    type: "Simple",
    category: "Ranged",
    damage: "1d6",
    damageType: "Piercing",
    properties: JSON.stringify(["Ammunition (80/320)", "Two-handed"]),
    weight: 2,
    cost: "25 gp",
    stackable: false
  },
  {
    name: "Sling",
    type: "Simple",
    category: "Ranged",
    damage: "1d4",
    damageType: "Bludgeoning",
    properties: JSON.stringify(["Ammunition (30/120)"]),
    weight: 0,
    cost: "1 sp",
    stackable: false
  },

  // Martial Melee Weapons
  {
    name: "Battleaxe",
    type: "Martial",
    category: "Melee",
    damage: "1d8",
    damageType: "Slashing",
    properties: JSON.stringify(["Versatile (1d10)"]),
    weight: 4,
    cost: "10 gp",
    stackable: false
  },
  {
    name: "Flail",
    type: "Martial",
    category: "Melee",
    damage: "1d8",
    damageType: "Bludgeoning",
    properties: JSON.stringify([]),
    weight: 2,
    cost: "10 gp",
    stackable: false
  },
  {
    name: "Glaive",
    type: "Martial",
    category: "Melee",
    damage: "1d10",
    damageType: "Slashing",
    properties: JSON.stringify(["Heavy", "Reach", "Two-handed"]),
    weight: 6,
    cost: "20 gp",
    stackable: false
  },
  {
    name: "Greataxe",
    type: "Martial",
    category: "Melee",
    damage: "1d12",
    damageType: "Slashing",
    properties: JSON.stringify(["Heavy", "Two-handed"]),
    weight: 7,
    cost: "30 gp",
    stackable: false
  },
  {
    name: "Greatsword",
    type: "Martial",
    category: "Melee",
    damage: "2d6",
    damageType: "Slashing",
    properties: JSON.stringify(["Heavy", "Two-handed"]),
    weight: 6,
    cost: "50 gp",
    stackable: false
  },
  {
    name: "Halberd",
    type: "Martial",
    category: "Melee",
    damage: "1d10",
    damageType: "Slashing",
    properties: JSON.stringify(["Heavy", "Reach", "Two-handed"]),
    weight: 6,
    cost: "20 gp",
    stackable: false
  },
  {
    name: "Lance",
    type: "Martial",
    category: "Melee",
    damage: "1d12",
    damageType: "Piercing",
    properties: JSON.stringify(["Reach", "Special"]),
    weight: 6,
    cost: "10 gp",
    stackable: false
  },
  {
    name: "Longsword",
    type: "Martial",
    category: "Melee",
    damage: "1d8",
    damageType: "Slashing",
    properties: JSON.stringify(["Versatile (1d10)"]),
    weight: 3,
    cost: "15 gp",
    stackable: false
  },
  {
    name: "Maul",
    type: "Martial",
    category: "Melee",
    damage: "2d6",
    damageType: "Bludgeoning",
    properties: JSON.stringify(["Heavy", "Two-handed"]),
    weight: 10,
    cost: "10 gp",
    stackable: false
  },
  {
    name: "Morningstar",
    type: "Martial",
    category: "Melee",
    damage: "1d8",
    damageType: "Piercing",
    properties: JSON.stringify([]),
    weight: 4,
    cost: "15 gp",
    stackable: false
  },
  {
    name: "Pike",
    type: "Martial",
    category: "Melee",
    damage: "1d10",
    damageType: "Piercing",
    properties: JSON.stringify(["Heavy", "Reach", "Two-handed"]),
    weight: 18,
    cost: "5 gp",
    stackable: false
  },
  {
    name: "Rapier",
    type: "Martial",
    category: "Melee",
    damage: "1d8",
    damageType: "Piercing",
    properties: JSON.stringify(["Finesse"]),
    weight: 2,
    cost: "25 gp",
    stackable: false
  },
  {
    name: "Scimitar",
    type: "Martial",
    category: "Melee",
    damage: "1d6",
    damageType: "Slashing",
    properties: JSON.stringify(["Finesse", "Light"]),
    weight: 3,
    cost: "25 gp",
    stackable: false
  },
  {
    name: "Shortsword",
    type: "Martial",
    category: "Melee",
    damage: "1d6",
    damageType: "Piercing",
    properties: JSON.stringify(["Finesse", "Light"]),
    weight: 2,
    cost: "10 gp",
    stackable: false
  },
  {
    name: "Trident",
    type: "Martial",
    category: "Melee",
    damage: "1d6",
    damageType: "Piercing",
    properties: JSON.stringify(["Thrown (20/60)", "Versatile (1d8)"]),
    weight: 4,
    cost: "5 gp",
    stackable: false
  },
  {
    name: "War Pick",
    type: "Martial",
    category: "Melee",
    damage: "1d8",
    damageType: "Piercing",
    properties: JSON.stringify([]),
    weight: 2,
    cost: "5 gp",
    stackable: false
  },
  {
    name: "Warhammer",
    type: "Martial",
    category: "Melee",
    damage: "1d8",
    damageType: "Bludgeoning",
    properties: JSON.stringify(["Versatile (1d10)"]),
    weight: 2,
    cost: "15 gp",
    stackable: false
  },
  {
    name: "Whip",
    type: "Martial",
    category: "Melee",
    damage: "1d4",
    damageType: "Slashing",
    properties: JSON.stringify(["Finesse", "Reach"]),
    weight: 3,
    cost: "2 gp",
    stackable: false
  },

  // Martial Ranged Weapons
  {
    name: "Blowgun",
    type: "Martial",
    category: "Ranged",
    damage: "1",
    damageType: "Piercing",
    properties: JSON.stringify(["Ammunition (25/100)", "Loading"]),
    weight: 1,
    cost: "10 gp",
    stackable: false
  },
  {
    name: "Hand Crossbow",
    type: "Martial",
    category: "Ranged",
    damage: "1d6",
    damageType: "Piercing",
    properties: JSON.stringify(["Ammunition (30/120)", "Light", "Loading"]),
    weight: 3,
    cost: "75 gp",
    stackable: false
  },
  {
    name: "Heavy Crossbow",
    type: "Martial",
    category: "Ranged",
    damage: "1d10",
    damageType: "Piercing",
    properties: JSON.stringify(["Ammunition (100/400)", "Heavy", "Loading", "Two-handed"]),
    weight: 18,
    cost: "50 gp",
    stackable: false
  },
  {
    name: "Longbow",
    type: "Martial",
    category: "Ranged",
    damage: "1d8",
    damageType: "Piercing",
    properties: JSON.stringify(["Ammunition (150/600)", "Heavy", "Two-handed"]),
    weight: 2,
    cost: "50 gp",
    stackable: false
  },
  {
    name: "Net",
    type: "Martial",
    category: "Ranged",
    damage: "—",
    damageType: "—",
    properties: JSON.stringify(["Special", "Thrown (5/15)"]),
    weight: 3,
    cost: "1 gp",
    stackable: false
  }
] 