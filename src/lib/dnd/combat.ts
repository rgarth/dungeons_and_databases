// Combat actions, proficiencies, and calculations
import { getModifier } from './core';
import { Weapon, MagicalWeapon } from './equipment';
import { AbilityScore } from './core';

export interface Action {
  name: string;
  type: 'Action' | 'Bonus Action' | 'Reaction';
  description: string;
  requirements?: string;
  available: boolean;
}

export const BASIC_ACTIONS: Action[] = [
  {
    name: "Attack",
    type: "Action",
    description: "Make a melee or ranged attack with a weapon",
    available: true
  },
  {
    name: "Cast a Spell",
    type: "Action", 
    description: "Cast a spell with casting time of 1 action",
    available: true
  },
  {
    name: "Dash",
    type: "Action",
    description: "Double your speed for this turn",
    available: true
  },
  {
    name: "Disengage", 
    type: "Action",
    description: "Your movement doesn't provoke opportunity attacks",
    available: true
  },
  {
    name: "Dodge",
    type: "Action",
    description: "Attackers have disadvantage, you have advantage on Dex saves",
    available: true
  },
  {
    name: "Help",
    type: "Action", 
    description: "Give an ally advantage on their next ability check or attack",
    available: true
  },
  {
    name: "Hide",
    type: "Action",
    description: "Make a Stealth check to become hidden",
    available: true
  },
  {
    name: "Ready",
    type: "Action",
    description: "Prepare an action to trigger on a specific condition",
    available: true
  },
  {
    name: "Search",
    type: "Action", 
    description: "Make a Perception or Investigation check to find something",
    available: true
  },
  {
    name: "Use an Object",
    type: "Action",
    description: "Interact with or use an object in your environment",
    available: true
  }
];

// D&D Class Proficiencies
export const CLASS_PROFICIENCIES: Record<string, {
  armor: string[];
  weapons: string[];
  maxEquippedWeapons: number;
}> = {
  'Barbarian': {
    armor: ['Light', 'Medium', 'Shield'],
    weapons: ['Simple', 'Martial'],
    maxEquippedWeapons: 6 // Reasonable carrying capacity
  },
  'Bard': {
    armor: ['Light'],
    weapons: ['Simple', 'Longsword', 'Rapier', 'Shortsword', 'Hand Crossbow'],
    maxEquippedWeapons: 6
  },
  'Cleric': {
    armor: ['Light', 'Medium', 'Shield'],
    weapons: ['Simple'],
    maxEquippedWeapons: 6
  },
  'Druid': {
    armor: ['Light', 'Medium', 'Shield'], // Non-metal restriction applies
    weapons: ['Simple', 'Shortsword', 'Scimitar'],
    maxEquippedWeapons: 6
  },
  'Fighter': {
    armor: ['Light', 'Medium', 'Heavy', 'Shield'],
    weapons: ['Simple', 'Martial'],
    maxEquippedWeapons: 8 // Fighters are weapon masters
  },
  'Monk': {
    armor: [], // No armor proficiency
    weapons: ['Simple', 'Shortsword'],
    maxEquippedWeapons: 6
  },
  'Paladin': {
    armor: ['Light', 'Medium', 'Heavy', 'Shield'],
    weapons: ['Simple', 'Martial'],
    maxEquippedWeapons: 8
  },
  'Ranger': {
    armor: ['Light', 'Medium', 'Shield'],
    weapons: ['Simple', 'Martial'],
    maxEquippedWeapons: 8
  },
  'Rogue': {
    armor: ['Light'],
    weapons: ['Simple', 'Longsword', 'Rapier', 'Shortsword', 'Hand Crossbow'],
    maxEquippedWeapons: 6
  },
  'Sorcerer': {
    armor: [],
    weapons: ['Simple', 'Dagger', 'Dart', 'Sling', 'Quarterstaff', 'Light Crossbow'],
    maxEquippedWeapons: 4 // Less physically oriented
  },
  'Warlock': {
    armor: ['Light'],
    weapons: ['Simple'],
    maxEquippedWeapons: 4
  },
  'Wizard': {
    armor: [],
    weapons: ['Simple', 'Dagger', 'Dart', 'Sling', 'Quarterstaff', 'Light Crossbow'],
    maxEquippedWeapons: 4
  }
};

// UTILITY FUNCTIONS
export function canEquipWeapon(weapon: Weapon | MagicalWeapon, characterClass: string): boolean {
  const proficiencies = CLASS_PROFICIENCIES[characterClass];
  if (!proficiencies) return false;
  
  // Check if class can use this weapon type
  if (proficiencies.weapons.includes('Simple') && weapon.type === 'Simple') return true;
  if (proficiencies.weapons.includes('Martial') && weapon.type === 'Martial') return true;
  
  // Check for specific weapon proficiencies
  return proficiencies.weapons.includes(weapon.name);
}

export function getMaxEquippedWeapons(characterClass: string): number {
  return CLASS_PROFICIENCIES[characterClass]?.maxEquippedWeapons || 1;
}

export function canEquipArmor(armorType: string, characterClass: string): boolean {
  const proficiencies = CLASS_PROFICIENCIES[characterClass];
  if (!proficiencies) return false;
  
  return proficiencies.armor.includes(armorType);
}

export function getWeaponAttackBonus(weapon: Weapon, abilityScores: Record<AbilityScore, number>, proficiencyBonus: number): number {
  let abilityMod = 0;
  
  // Determine which ability to use
  if (weapon.category === 'Ranged' || weapon.properties.includes('Finesse')) {
    abilityMod = getModifier(abilityScores.dexterity);
  } else {
    abilityMod = getModifier(abilityScores.strength);
  }
  
  return abilityMod + proficiencyBonus;
}

export function getClassActions(characterClass: string, level: number): Action[] {
  const classActions: Record<string, Action[]> = {
    'Fighter': [
      {
        name: "Second Wind",
        type: "Bonus Action", 
        description: "Regain 1d10 + Fighter level hit points",
        available: true
      },
      {
        name: "Action Surge",
        type: "Action",
        description: "Take an additional action on your turn",
        requirements: "1/short rest",
        available: level >= 2
      }
    ],
    'Rogue': [
      {
        name: "Sneak Attack",
        type: "Action",
        description: "Deal extra damage when you have advantage or an ally is nearby", 
        available: true
      },
      {
        name: "Cunning Action",
        type: "Bonus Action",
        description: "Dash, Disengage, or Hide as a bonus action",
        available: level >= 2
      }
    ],
    'Barbarian': [
      {
        name: "Rage",
        type: "Bonus Action",
        description: "Enter rage for damage resistance and bonus damage",
        requirements: "Limited uses per long rest",
        available: true
      }
    ]
  };
  
  return classActions[characterClass] || [];
} 