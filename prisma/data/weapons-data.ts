// Complete D&D 5e SRD Weapons Database
// Source: System Reference Document 5.1 by Wizards of the Coast LLC
// Licensed under Creative Commons Attribution 4.0 International License
// https://dnd.wizards.com/resources/systems-reference-document

export const weaponsData = [
  // Simple Melee Weapons
  {
    name: "Club",
    type: "Simple",
    category: "Melee",
    cost: "1 sp",
    damage: "1d4",
    damageType: "Bludgeoning",
    weight: 2,
    properties: "Light",
    description: "A simple wooden club."
  },
  {
    name: "Dagger",
    type: "Simple",
    category: "Melee",
    cost: "2 gp",
    damage: "1d4",
    damageType: "Piercing",
    weight: 1,
    properties: "Finesse, Light, Thrown (range 20/60)",
    description: "A small, sharp blade that can be used for stabbing or throwing."
  },
  {
    name: "Greatclub",
    type: "Simple",
    category: "Melee",
    cost: "2 sp",
    damage: "1d8",
    damageType: "Bludgeoning",
    weight: 10,
    properties: "Two-Handed",
    description: "A large, heavy club that requires two hands to wield effectively."
  },
  {
    name: "Handaxe",
    type: "Simple",
    category: "Melee",
    cost: "5 gp",
    damage: "1d6",
    damageType: "Slashing",
    weight: 2,
    properties: "Light, Thrown (range 20/60)",
    description: "A small axe designed for one-handed use."
  },
  {
    name: "Javelin",
    type: "Simple",
    category: "Melee",
    cost: "5 sp",
    damage: "1d6",
    damageType: "Piercing",
    weight: 2,
    properties: "Thrown (range 30/120)",
    description: "A light spear designed for throwing."
  },
  {
    name: "Light Hammer",
    type: "Simple",
    category: "Melee",
    cost: "2 gp",
    damage: "1d4",
    damageType: "Bludgeoning",
    weight: 2,
    properties: "Light, Thrown (range 20/60)",
    description: "A small hammer that can be used for melee combat or throwing."
  },
  {
    name: "Mace",
    type: "Simple",
    category: "Melee",
    cost: "5 gp",
    damage: "1d6",
    damageType: "Bludgeoning",
    weight: 4,
    properties: "",
    description: "A heavy club with a metal head."
  },
  {
    name: "Quarterstaff",
    type: "Simple",
    category: "Melee",
    cost: "2 sp",
    damage: "1d6",
    damageType: "Bludgeoning",
    weight: 4,
    properties: "Versatile (1d8)",
    description: "A long wooden staff that can be wielded with one or two hands."
  },
  {
    name: "Sickle",
    type: "Simple",
    category: "Melee",
    cost: "1 gp",
    damage: "1d4",
    damageType: "Slashing",
    weight: 2,
    properties: "Light",
    description: "A curved blade attached to a short handle."
  },
  {
    name: "Spear",
    type: "Simple",
    category: "Melee",
    cost: "1 gp",
    damage: "1d6",
    damageType: "Piercing",
    weight: 3,
    properties: "Thrown (range 20/60), Versatile (1d8)",
    description: "A long wooden shaft with a sharp metal point."
  },

  // Simple Ranged Weapons
  {
    name: "Crossbow, Light",
    type: "Simple",
    category: "Ranged",
    cost: "25 gp",
    damage: "1d8",
    damageType: "Piercing",
    weight: 5,
    properties: "Ammunition (range 80/320), Loading, Two-Handed",
    description: "A small crossbow that fires bolts.",
    ammunitionTypeId: 2,
    suggestedQuantity: 20
  },
  {
    name: "Dart",
    type: "Simple",
    category: "Ranged",
    cost: "5 cp",
    damage: "1d4",
    damageType: "Piercing",
    weight: 0.25,
    properties: "Finesse, Thrown (range 20/60)",
    description: "A small, pointed missile designed for throwing.",
    ammunitionTypeId: null,
    suggestedQuantity: null
  },
  {
    name: "Shortbow",
    type: "Simple",
    category: "Ranged",
    cost: "25 gp",
    damage: "1d6",
    damageType: "Piercing",
    weight: 2,
    properties: "Ammunition (range 80/320), Two-Handed",
    description: "A small bow designed for quick shots.",
    ammunitionTypeId: 1,
    suggestedQuantity: 20
  },
  {
    name: "Sling",
    type: "Simple",
    category: "Ranged",
    cost: "1 sp",
    damage: "1d4",
    damageType: "Bludgeoning",
    weight: 0,
    properties: "Ammunition (range 30/120)",
    description: "A leather strap used to hurl small stones or bullets.",
    ammunitionTypeId: 3,
    suggestedQuantity: 20
  },

  // Martial Melee Weapons
  {
    name: "Battleaxe",
    type: "Martial",
    category: "Melee",
    cost: "10 gp",
    damage: "1d8",
    damageType: "Slashing",
    weight: 4,
    properties: "Versatile (1d10)",
    description: "A heavy axe designed for combat."
  },
  {
    name: "Flail",
    type: "Martial",
    category: "Melee",
    cost: "10 gp",
    damage: "1d8",
    damageType: "Bludgeoning",
    weight: 2,
    properties: "",
    description: "A weapon consisting of a handle and a heavy striking head connected by a chain."
  },
  {
    name: "Glaive",
    type: "Martial",
    category: "Melee",
    cost: "20 gp",
    damage: "1d10",
    damageType: "Slashing",
    weight: 6,
    properties: "Heavy, Reach, Two-Handed",
    description: "A polearm with a long blade on the end."
  },
  {
    name: "Greataxe",
    type: "Martial",
    category: "Melee",
    cost: "30 gp",
    damage: "1d12",
    damageType: "Slashing",
    weight: 7,
    properties: "Heavy, Two-Handed",
    description: "A massive axe that requires two hands to wield."
  },
  {
    name: "Greatsword",
    type: "Martial",
    category: "Melee",
    cost: "50 gp",
    damage: "2d6",
    damageType: "Slashing",
    weight: 6,
    properties: "Heavy, Two-Handed",
    description: "A massive sword that requires two hands to wield."
  },
  {
    name: "Halberd",
    type: "Martial",
    category: "Melee",
    cost: "20 gp",
    damage: "1d10",
    damageType: "Slashing",
    weight: 6,
    properties: "Heavy, Reach, Two-Handed",
    description: "A polearm with an axe blade and a spear point."
  },
  {
    name: "Lance",
    type: "Martial",
    category: "Melee",
    cost: "10 gp",
    damage: "1d12",
    damageType: "Piercing",
    weight: 6,
    properties: "Reach, Special",
    description: "A long spear designed for mounted combat."
  },
  {
    name: "Longsword",
    type: "Martial",
    category: "Melee",
    cost: "15 gp",
    damage: "1d8",
    damageType: "Slashing",
    weight: 3,
    properties: "Versatile (1d10)",
    description: "A versatile sword that can be wielded with one or two hands."
  },
  {
    name: "Maul",
    type: "Martial",
    category: "Melee",
    cost: "10 gp",
    damage: "2d6",
    damageType: "Bludgeoning",
    weight: 10,
    properties: "Heavy, Two-Handed",
    description: "A massive hammer that requires two hands to wield."
  },
  {
    name: "Morningstar",
    type: "Martial",
    category: "Melee",
    cost: "15 gp",
    damage: "1d8",
    damageType: "Piercing",
    weight: 4,
    properties: "",
    description: "A spiked ball attached to a handle by a chain."
  },
  {
    name: "Pike",
    type: "Martial",
    category: "Melee",
    cost: "5 gp",
    damage: "1d10",
    damageType: "Piercing",
    weight: 18,
    properties: "Heavy, Reach, Two-Handed",
    description: "A very long spear designed for formation fighting."
  },
  {
    name: "Rapier",
    type: "Martial",
    category: "Melee",
    cost: "25 gp",
    damage: "1d8",
    damageType: "Piercing",
    weight: 2,
    properties: "Finesse",
    description: "A slender, sharply pointed sword designed for thrusting."
  },
  {
    name: "Scimitar",
    type: "Martial",
    category: "Melee",
    cost: "25 gp",
    damage: "1d6",
    damageType: "Slashing",
    weight: 3,
    properties: "Finesse, Light",
    description: "A curved sword with a single edge."
  },
  {
    name: "Shortsword",
    type: "Martial",
    category: "Melee",
    cost: "10 gp",
    damage: "1d6",
    damageType: "Piercing",
    weight: 2,
    properties: "Finesse, Light",
    description: "A short, light sword designed for quick strikes."
  },
  {
    name: "Trident",
    type: "Martial",
    category: "Melee",
    cost: "5 gp",
    damage: "1d6",
    damageType: "Piercing",
    weight: 4,
    properties: "Thrown (range 20/60), Versatile (1d8)",
    description: "A three-pronged spear."
  },
  {
    name: "War Pick",
    type: "Martial",
    category: "Melee",
    cost: "5 gp",
    damage: "1d8",
    damageType: "Piercing",
    weight: 2,
    properties: "",
    description: "A pick designed for combat."
  },
  {
    name: "Warhammer",
    type: "Martial",
    category: "Melee",
    cost: "15 gp",
    damage: "1d8",
    damageType: "Bludgeoning",
    weight: 2,
    properties: "Versatile (1d10)",
    description: "A hammer designed for combat."
  },
  {
    name: "Whip",
    type: "Martial",
    category: "Melee",
    cost: "2 gp",
    damage: "1d4",
    damageType: "Slashing",
    weight: 3,
    properties: "Finesse, Reach",
    description: "A flexible length of leather or rope with a handle."
  },

  // Martial Ranged Weapons
  {
    name: "Blowgun",
    type: "Martial",
    category: "Ranged",
    cost: "10 gp",
    damage: "1",
    damageType: "Piercing",
    weight: 1,
    properties: "Ammunition (range 25/100), Loading",
    description: "A long tube used to blow small darts.",
    ammunitionTypeId: 4,
    suggestedQuantity: 50
  },
  {
    name: "Crossbow, Hand",
    type: "Martial",
    category: "Ranged",
    cost: "75 gp",
    damage: "1d6",
    damageType: "Piercing",
    weight: 3,
    properties: "Ammunition (range 30/120), Light, Loading",
    description: "A small crossbow that can be used with one hand.",
    ammunitionTypeId: 2,
    suggestedQuantity: 20
  },
  {
    name: "Crossbow, Heavy",
    type: "Martial",
    category: "Ranged",
    cost: "50 gp",
    damage: "1d10",
    damageType: "Piercing",
    weight: 18,
    properties: "Ammunition (range 100/400), Heavy, Loading, Two-Handed",
    description: "A large crossbow that fires heavy bolts.",
    ammunitionTypeId: 2,
    suggestedQuantity: 20
  },
  {
    name: "Longbow",
    type: "Martial",
    category: "Ranged",
    cost: "50 gp",
    damage: "1d8",
    damageType: "Piercing",
    weight: 2,
    properties: "Ammunition (range 150/600), Heavy, Two-Handed",
    description: "A large bow designed for long-range shots.",
    ammunitionTypeId: 1,
    suggestedQuantity: 20
  },
  {
    name: "Net",
    type: "Martial",
    category: "Ranged",
    cost: "1 gp",
    damage: "0",
    damageType: "",
    weight: 3,
    properties: "Special, Thrown (range 5/15)",
    description: "A net designed to entangle targets.",
    ammunitionTypeId: null,
    suggestedQuantity: null
  }
] 