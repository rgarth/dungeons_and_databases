// Equipment, weapons, and armor data and utilities
import { getModifier } from './core';

// WEAPONS
export interface Weapon {
  name: string;
  type: 'Simple' | 'Martial';
  category: 'Melee' | 'Ranged';
  damage: string;
  damageType: string;
  properties: string[];
  weight: number;
  cost: string;
  stackable?: boolean;
}

export interface MagicalWeapon extends Weapon {
  baseName: string; // Original weapon name (e.g., "Longsword")
  magicalName: string; // Custom name (e.g., "Dawnbreaker" or "+1 Longsword")
  attackBonus: number; // +1, +2, +3, etc.
  damageBonus: number; // +1, +2, +3, etc.
  magicalProperties?: string; // Special abilities description
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary' | 'Artifact';
}

// ARMOR
export interface Armor {
  name: string;
  type: 'Light' | 'Medium' | 'Heavy' | 'Shield';
  baseAC: number;
  maxDexBonus?: number; // undefined means no limit (light armor)
  minStrength?: number; // minimum strength requirement
  stealthDisadvantage?: boolean;
  weight: number;
  cost: string;
  description: string;
}

// GENERAL EQUIPMENT
export interface Equipment {
  name: string;
  type: 'Armor' | 'Adventuring Gear' | 'Tools' | 'Trade Goods' | 'Mounts' | 'Containers';
  cost: string;
  weight?: number;
  description?: string;
  stackable?: boolean; // Whether this item can be stacked in quantities
}

export interface InventoryItem {
  name: string;
  quantity: number;
}

// Common magical weapon templates
export const MAGICAL_WEAPON_TEMPLATES = [
  {
    name: "+1 Enhancement",
    attackBonus: 1,
    damageBonus: 1,
    rarity: "Uncommon" as const,
    description: "This weapon has a +1 bonus to attack and damage rolls."
  },
  {
    name: "+2 Enhancement", 
    attackBonus: 2,
    damageBonus: 2,
    rarity: "Rare" as const,
    description: "This weapon has a +2 bonus to attack and damage rolls."
  },
  {
    name: "+3 Enhancement",
    attackBonus: 3,
    damageBonus: 3,
    rarity: "Very Rare" as const,
    description: "This weapon has a +3 bonus to attack and damage rolls."
  },
  {
    name: "Flametongue",
    attackBonus: 0,
    damageBonus: 0,
    rarity: "Rare" as const,
    description: "As a bonus action, you can speak the command word to cause flames to sheath the blade. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet. While the sword is ablaze, it deals an extra 2d6 fire damage to any target it hits."
  },
  {
    name: "Frost Brand",
    attackBonus: 0,
    damageBonus: 0,
    rarity: "Very Rare" as const,
    description: "When you hit with an attack using this magic sword, the target takes an extra 1d6 cold damage. In addition, while you hold the sword, you have resistance to fire damage."
  },
  {
    name: "Vicious",
    attackBonus: 0,
    damageBonus: 0,
    rarity: "Rare" as const,
    description: "When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon's type."
  }
];

export const WEAPONS: Weapon[] = [
  // Simple Melee Weapons
  {
    name: "Dagger",
    type: "Simple",
    category: "Melee",
    damage: "1d4",
    damageType: "Piercing",
    properties: ["Finesse", "Light", "Thrown (20/60)"],
    weight: 1,
    cost: "2 gp",
    stackable: true
  },
  {
    name: "Club",
    type: "Simple", 
    category: "Melee",
    damage: "1d4",
    damageType: "Bludgeoning",
    properties: ["Light"],
    weight: 2,
    cost: "1 sp",
    stackable: false
  },
  {
    name: "Quarterstaff",
    type: "Simple",
    category: "Melee", 
    damage: "1d6",
    damageType: "Bludgeoning",
    properties: ["Versatile (1d8)"],
    weight: 4,
    cost: "2 sp",
    stackable: false
  },
  {
    name: "Javelin",
    type: "Simple",
    category: "Melee",
    damage: "1d6",
    damageType: "Piercing",
    properties: ["Thrown (30/120)"],
    weight: 2,
    cost: "5 sp",
    stackable: true
  },
  {
    name: "Dart",
    type: "Simple",
    category: "Ranged",
    damage: "1d4",
    damageType: "Piercing",
    properties: ["Finesse", "Thrown (20/60)"],
    weight: 0.25,
    cost: "5 cp",
    stackable: true
  },
  // Simple Ranged Weapons
  {
    name: "Light Crossbow",
    type: "Simple",
    category: "Ranged",
    damage: "1d8", 
    damageType: "Piercing",
    properties: ["Ammunition (80/320)", "Loading", "Two-handed"],
    weight: 5,
    cost: "25 gp",
    stackable: false
  },
  {
    name: "Shortbow",
    type: "Simple",
    category: "Ranged",
    damage: "1d6",
    damageType: "Piercing", 
    properties: ["Ammunition (80/320)", "Two-handed"],
    weight: 2,
    cost: "25 gp",
    stackable: false
  },
  // Martial Melee Weapons
  {
    name: "Longsword",
    type: "Martial",
    category: "Melee",
    damage: "1d8",
    damageType: "Slashing",
    properties: ["Versatile (1d10)"],
    weight: 3,
    cost: "15 gp",
    stackable: false
  },
  {
    name: "Rapier",
    type: "Martial",
    category: "Melee", 
    damage: "1d8",
    damageType: "Piercing",
    properties: ["Finesse"],
    weight: 2,
    cost: "25 gp",
    stackable: false
  },
  {
    name: "Greataxe",
    type: "Martial",
    category: "Melee",
    damage: "1d12",
    damageType: "Slashing",
    properties: ["Heavy", "Two-handed"],
    weight: 7,
    cost: "30 gp",
    stackable: false
  },
  // Martial Ranged Weapons
  {
    name: "Longbow",
    type: "Martial",
    category: "Ranged",
    damage: "1d8",
    damageType: "Piercing",
    properties: ["Ammunition (150/600)", "Heavy", "Two-handed"],
    weight: 2,
    cost: "50 gp",
    stackable: false
  }
];

export const ARMOR: Armor[] = [
  // Light Armor
  {
    name: "Leather Armor",
    type: "Light",
    baseAC: 11,
    weight: 10,
    cost: "10 gp",
    description: "Light armor, AC 11 + Dex modifier"
  },
  {
    name: "Studded Leather",
    type: "Light",
    baseAC: 12,
    weight: 13,
    cost: "45 gp",
    description: "Light armor, AC 12 + Dex modifier"
  },
  
  // Medium Armor
  {
    name: "Chain Shirt",
    type: "Medium",
    baseAC: 13,
    maxDexBonus: 2,
    weight: 20,
    cost: "50 gp",
    description: "Medium armor, AC 13 + Dex modifier (max 2)"
  },
  {
    name: "Scale Mail",
    type: "Medium",
    baseAC: 14,
    maxDexBonus: 2,
    stealthDisadvantage: true,
    weight: 45,
    cost: "50 gp",
    description: "Medium armor, AC 14 + Dex modifier (max 2), stealth disadvantage"
  },
  
  // Heavy Armor
  {
    name: "Chain Mail",
    type: "Heavy",
    baseAC: 16,
    maxDexBonus: 0,
    minStrength: 13,
    stealthDisadvantage: true,
    weight: 55,
    cost: "75 gp",
    description: "Heavy armor, AC 16, requires Str 13"
  },
  {
    name: "Plate Armor",
    type: "Heavy",
    baseAC: 18,
    maxDexBonus: 0,
    minStrength: 15,
    stealthDisadvantage: true,
    weight: 65,
    cost: "1500 gp",
    description: "Heavy armor, AC 18, requires Str 15"
  },
  
  // Shield
  {
    name: "Shield",
    type: "Shield",
    baseAC: 2, // +2 AC bonus
    weight: 6,
    cost: "10 gp",
    description: "+2 AC"
  }
];

// Add ammunition to equipment
const AMMUNITION_EQUIPMENT = [
  {
    name: "Arrows (20)",
    type: "Adventuring Gear" as const,
    cost: "1 gp",
    weight: 1,
    stackable: true
  },
  {
    name: "Crossbow Bolts (20)",
    type: "Adventuring Gear" as const,
    cost: "1 gp", 
    weight: 1.5,
    stackable: true
  },
  {
    name: "Sling Bullets (20)",
    type: "Adventuring Gear" as const,
    cost: "4 cp",
    weight: 1.5,
    stackable: true
  }
];

export const EQUIPMENT: Equipment[] = [
  // ARMOR
  {
    name: "Leather Armor",
    type: "Armor",
    cost: "10 gp",
    weight: 10,
    description: "Light armor, AC 11 + Dex modifier",
    stackable: false
  },
  {
    name: "Studded Leather",
    type: "Armor", 
    cost: "45 gp",
    weight: 13,
    description: "Light armor, AC 12 + Dex modifier",
    stackable: false
  },
  {
    name: "Chain Mail",
    type: "Armor",
    cost: "75 gp", 
    weight: 55,
    description: "Heavy armor, AC 16",
    stackable: false
  },
  {
    name: "Chain Shirt",
    type: "Armor",
    cost: "50 gp",
    weight: 20,
    description: "Medium armor, AC 13 + Dex modifier (max 2)",
    stackable: false
  },
  {
    name: "Shield",
    type: "Armor",
    cost: "10 gp",
    weight: 6,
    description: "+2 AC",
    stackable: false
  },

  // ADVENTURING GEAR
  {
    name: "Backpack",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 5,
    stackable: false
  },
  {
    name: "Bedroll",
    type: "Adventuring Gear", 
    cost: "5 sp",
    weight: 7,
    stackable: false
  },
  {
    name: "Blanket",
    type: "Adventuring Gear",
    cost: "5 sp",
    weight: 3,
    stackable: true
  },
  {
    name: "Rope, Hempen (50 feet)",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 10,
    stackable: true
  },
  {
    name: "Rope, Silk (50 feet)",
    type: "Adventuring Gear",
    cost: "10 gp", 
    weight: 5,
    stackable: true
  },
  {
    name: "Torch",
    type: "Adventuring Gear",
    cost: "1 cp",
    weight: 1,
    stackable: true
  },
  {
    name: "Lantern, Bullseye",
    type: "Adventuring Gear",
    cost: "10 gp",
    weight: 2,
    stackable: false
  },
  {
    name: "Lantern, Hooded",
    type: "Adventuring Gear",
    cost: "5 gp",
    weight: 2,
    stackable: false
  },
  {
    name: "Oil (1 vial)",
    type: "Adventuring Gear",
    cost: "1 sp",
    weight: 1,
    stackable: true
  },
  {
    name: "Tinderbox",
    type: "Adventuring Gear",
    cost: "5 sp",
    weight: 1,
    stackable: false
  },
  {
    name: "Rations (1 day)",
    type: "Adventuring Gear",
    cost: "2 sp",
    weight: 2,
    stackable: true
  },
  {
    name: "Waterskin",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 5,
    stackable: true
  },
  {
    name: "Grappling Hook",
    type: "Adventuring Gear",
    cost: "2 gp", 
    weight: 4,
    stackable: false
  },
  {
    name: "Crowbar",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 5,
    stackable: false
  },
  {
    name: "Hammer",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 3,
    stackable: true
  },
  {
    name: "Piton",
    type: "Adventuring Gear",
    cost: "5 cp",
    weight: 0.25,
    stackable: true
  },
  {
    name: "Caltrops (bag of 20)",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 2,
    stackable: true
  },
  {
    name: "Ball Bearings (bag of 1,000)",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 2,
    stackable: true
  },
  {
    name: "Chain (10 feet)",
    type: "Adventuring Gear",
    cost: "5 gp",
    weight: 10,
    stackable: true
  },
  {
    name: "Manacles",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 6,
    stackable: true
  },
  {
    name: "Mirror, Steel",
    type: "Adventuring Gear",
    cost: "5 gp",
    weight: 0.5,
    stackable: false
  },
  {
    name: "Potion of Healing",
    type: "Adventuring Gear",
    cost: "50 gp",
    weight: 0.5,
    description: "Restores 2d4+2 hit points",
    stackable: true
  },

  // TOOLS
  {
    name: "Thieves' Tools",
    type: "Tools",
    cost: "25 gp",
    weight: 1,
    stackable: false
  },
  {
    name: "Disguise Kit",
    type: "Tools",
    cost: "25 gp",
    weight: 3,
    stackable: false
  },
  {
    name: "Forgery Kit",
    type: "Tools",
    cost: "15 gp",
    weight: 5,
    stackable: false
  },
  {
    name: "Herbalism Kit",
    type: "Tools",
    cost: "5 gp",
    weight: 3,
    stackable: false
  },
  {
    name: "Healer's Kit",
    type: "Tools",
    cost: "5 gp",
    weight: 3,
    stackable: false
  },
  {
    name: "Poisoner's Kit",
    type: "Tools",
    cost: "50 gp",
    weight: 2,
    stackable: false
  },
  {
    name: "Alchemist's Supplies",
    type: "Tools",
    cost: "50 gp",
    weight: 8,
    stackable: false
  },
  {
    name: "Smith's Tools",
    type: "Tools",
    cost: "20 gp",
    weight: 8,
    stackable: false
  },
  {
    name: "Carpenter's Tools",
    type: "Tools",
    cost: "8 gp",
    weight: 6,
    stackable: false
  },

  // CONTAINERS
  {
    name: "Pouch",
    type: "Containers",
    cost: "5 sp",
    weight: 1,
    stackable: true
  },
  {
    name: "Chest",
    type: "Containers",
    cost: "5 gp",
    weight: 25,
    stackable: false
  },
  {
    name: "Barrel",
    type: "Containers",
    cost: "2 gp",
    weight: 70,
    stackable: false
  },
  {
    name: "Sack",
    type: "Containers",
    cost: "1 cp",
    weight: 0.5,
    stackable: true
  },

  // TRADE GOODS
  {
    name: "Candle",
    type: "Trade Goods",
    cost: "1 cp",
    weight: 0,
    stackable: true
  },
  {
    name: "Chalk (1 piece)",
    type: "Trade Goods",
    cost: "1 cp",
    weight: 0,
    stackable: true
  },
  {
    name: "Ink (1 ounce bottle)",
    type: "Trade Goods",
    cost: "10 gp",
    weight: 0,
    stackable: true
  },
  {
    name: "Paper (one sheet)",
    type: "Trade Goods",
    cost: "2 sp",
    weight: 0,
    stackable: true
  },
  {
    name: "Parchment (one sheet)",
    type: "Trade Goods",
    cost: "1 sp",
    weight: 0,
    stackable: true
  },
  {
    name: "Perfume (vial)",
    type: "Trade Goods",
    cost: "5 gp",
    weight: 0,
    stackable: true
  },
  {
    name: "Soap",
    type: "Trade Goods",
    cost: "2 cp",
    weight: 0,
    stackable: true
  },
  {
    name: "Spellbook",
    type: "Trade Goods",
    cost: "50 gp",
    weight: 3,
    stackable: false
  },
  {
    name: "Component Pouch",
    type: "Trade Goods",
    cost: "25 gp",
    weight: 2,
    stackable: false
  },
  {
    name: "Holy Symbol",
    type: "Trade Goods",
    cost: "5 gp",
    weight: 1,
    stackable: false
  },
  {
    name: "Arcane Focus",
    type: "Trade Goods",
    cost: "20 gp",
    weight: 1,
    stackable: false
  },
  ...AMMUNITION_EQUIPMENT
];

export const EQUIPMENT_CATEGORIES = ['Armor', 'Adventuring Gear', 'Tools', 'Trade Goods', 'Containers'] as const;

// UTILITY FUNCTIONS
export function createMagicalWeapon(
  baseWeapon: Weapon, 
  template: typeof MAGICAL_WEAPON_TEMPLATES[0], 
  customName?: string
): MagicalWeapon {
  const magicalName = customName || `${template.name} ${baseWeapon.name}`;
  
  return {
    ...baseWeapon,
    baseName: baseWeapon.name,
    magicalName,
    name: magicalName, // Override the display name
    attackBonus: template.attackBonus,
    damageBonus: template.damageBonus,
    magicalProperties: template.description,
    rarity: template.rarity,
    stackable: false // Magical weapons are unique
  };
}

export function getEquipmentByCategory(category: string): Equipment[] {
  return EQUIPMENT.filter(item => item.type === category);
}

export function calculateArmorClass(
  equippedArmor: Armor[], 
  dexterityScore: number
): number {
  let baseAC = 10;
  let dexBonus = getModifier(dexterityScore);
  let shieldBonus = 0;
  
  // Find body armor (non-shield)
  const bodyArmor = equippedArmor.find(armor => armor.type !== 'Shield');
  if (bodyArmor) {
    baseAC = bodyArmor.baseAC;
    
    // Apply dex bonus limits
    if (bodyArmor.maxDexBonus !== undefined) {
      dexBonus = Math.min(dexBonus, bodyArmor.maxDexBonus);
    }
  }
  
  // Check for shield
  const shield = equippedArmor.find(armor => armor.type === 'Shield');
  if (shield) {
    shieldBonus = shield.baseAC;
  }
  
  return baseAC + dexBonus + shieldBonus;
} 