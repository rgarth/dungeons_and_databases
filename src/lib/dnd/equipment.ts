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

// Magical weapon enhancement templates (these are templates, not actual items)
export const MAGICAL_WEAPON_TEMPLATES = [
  {
    name: "+1 Weapon",
    attackBonus: 1,
    damageBonus: 1,
    rarity: "Uncommon" as const,
    description: "A +1 magical weapon with enhanced attack and damage."
  },
  {
    name: "+2 Weapon", 
    attackBonus: 2,
    damageBonus: 2,
    rarity: "Rare" as const,
    description: "A +2 magical weapon with enhanced attack and damage."
  },
  {
    name: "+3 Weapon",
    attackBonus: 3,
    damageBonus: 3,
    rarity: "Very Rare" as const,
    description: "A +3 magical weapon with enhanced attack and damage."
  },
  {
    name: "Flame Tongue",
    attackBonus: 0,
    damageBonus: 0,
    rarity: "Rare" as const,
    description: "You can use a bonus action to speak this magic sword's command word, causing flames to erupt from the blade. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet. While the sword is ablaze, it deals an extra 2d6 fire damage to any target it hits."
  },
  {
    name: "Frost Brand",
    attackBonus: 0,
    damageBonus: 0,
    rarity: "Very Rare" as const,
    description: "When you hit with an attack using this magic sword, the target takes an extra 1d6 cold damage. In addition, while you hold the sword, you have resistance to fire damage."
  },
  {
    name: "Vorpal",
    attackBonus: 0,
    damageBonus: 0,
    rarity: "Legendary" as const,
    description: "When you attack a creature that has at least one head with this weapon and roll a 20 on the attack roll, you cut off one of the creature's heads. The creature dies if it can't survive without the lost head."
  },
  {
    name: "Vicious",
    attackBonus: 0,
    damageBonus: 0,
    rarity: "Rare" as const,
    description: "When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon's type."
  }
];

export const EQUIPMENT_CATEGORIES = ['Armor', 'Adventuring Gear', 'Tools', 'Trade Goods', 'Containers'] as const;

/**
 * Note: These functions now require database access.
 * Use API calls or import database data instead of hardcoded arrays.
 * 
 * @deprecated Use database-based filtering instead
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getWeaponByName(_name: string): Weapon | undefined {
  console.warn('getWeaponByName() is deprecated - use database-based weapon lookup instead');
  return undefined;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getArmorByName(_name: string): Armor | undefined {
  console.warn('getArmorByName() is deprecated - use database-based armor lookup instead');
  return undefined;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getEquipmentByName(_name: string): Equipment | undefined {
  console.warn('getEquipmentByName() is deprecated - use database-based equipment lookup instead');
  return undefined;
}

export function createMagicalWeapon(
  baseWeapon: Weapon, 
  template: typeof MAGICAL_WEAPON_TEMPLATES[0], 
  customName?: string
): MagicalWeapon {
  return {
    ...baseWeapon,
    baseName: baseWeapon.name,
    magicalName: customName || `${template.name} ${baseWeapon.name}`,
    attackBonus: template.attackBonus,
    damageBonus: template.damageBonus,
    magicalProperties: template.description,
    rarity: template.rarity
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getEquipmentByCategory(_category: string): Equipment[] {
  console.warn('getEquipmentByCategory() is deprecated - use database-based equipment filtering instead');
  return [];
}

export function calculateArmorClass(
  equippedArmor: Armor[], 
  dexterityScore: number
): number {
  if (equippedArmor.length === 0) {
    // No armor: 10 + Dex modifier
    return 10 + getModifier(dexterityScore);
  }
  
  // Find the primary armor (non-shield)
  const primaryArmor = equippedArmor.find(armor => armor.type !== 'Shield');
  const shield = equippedArmor.find(armor => armor.type === 'Shield');
  
  let ac = 10 + getModifier(dexterityScore); // Default unarmored AC
  
  if (primaryArmor) {
    ac = primaryArmor.baseAC;
    
    // Apply Dex modifier based on armor type
    const dexModifier = getModifier(dexterityScore);
    if (primaryArmor.type === 'Light') {
      ac += dexModifier; // Light armor: full Dex bonus
    } else if (primaryArmor.type === 'Medium') {
      ac += Math.min(dexModifier, primaryArmor.maxDexBonus || 2); // Medium armor: max +2 Dex
    }
    // Heavy armor: no Dex bonus
  }
  
  // Add shield bonus
  if (shield) {
    ac += 2; // Standard shield bonus
  }
  
  return ac;
} 