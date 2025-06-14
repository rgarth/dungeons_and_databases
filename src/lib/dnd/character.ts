// Character creation and utility functions
import { Weapon, MagicalWeapon, Armor, Ammunition, createMagicalWeapon, MAGICAL_WEAPON_TEMPLATES } from './equipment';
import { Spell } from './spells';

// Character interfaces
export interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  background: string;
  alignment?: string;
  
  // Ability Scores
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  
  // Core Stats
  hitPoints: number;
  maxHitPoints: number;
  temporaryHitPoints?: number;
  armorClass: number;
  speed: number;
  proficiencyBonus: number;
  
  // Skills and Proficiencies
  skills: string[];
  
  // Equipment
  inventory: string[];
  equipment: string[];
  weapons: (Weapon | MagicalWeapon)[];
  inventoryWeapons: (Weapon | MagicalWeapon)[];
  armor: Armor[];
  inventoryArmor: Armor[];
  ammunition: Ammunition[];
  
  // Spellcasting
  spellsKnown: Spell[];
  spellsPrepared: Spell[];
  spellSlots: Record<number, number>;
  spellcastingAbility?: string;
  spellSaveDC?: number;
  spellAttackBonus?: number;
  
  // Combat
  actions: string[];
  bonusActions: string[];
  reactions: string[];
  
  // Wealth
  copperPieces: number;
  silverPieces: number;
  goldPieces: number;
  platinumPieces?: number;
  
  // Character Details
  appearance?: string;
  personality?: string;
  backstory?: string;
  notes?: string;
  avatar?: string;
  
  // Combat State
  deathSaveSuccesses?: number;
  deathSaveFailures?: number;
}

export interface CharacterCreationData {
  name: string;
  race: string;
  class: string;
  level: number;
  background: string;
  alignment?: string;
  abilities: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  appearance?: string;
  personality?: string;
  backstory?: string;
}

export interface StartingEquipment {
  weapons: Weapon[];
  armor: Armor[];
  equipment: string[];
  money: {
    copper: number;
    silver: number;
    gold: number;
  };
}

// Equipment pack options are now database-driven via /api/equipment-packs
// This function has been removed - use the API route instead

// Database-driven equipment pack retrieval (implemented via API)
export async function getEquipmentPacksFromDatabase() {
  try {
    const response = await fetch('/api/equipment-packs');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch equipment packs from database:', error);
    throw error;
  }
}

// Background skills are now fetched from the database via /api/backgrounds

// Fantasy Name Generator using fantasy-names npm package
export async function generateFantasyName(race: string, gender?: string): Promise<string> {
  try {
    const fantasyNames = require('fantasy-names');
    const nameType = gender === 'Male' ? 'male' : gender === 'Female' ? 'female' : 'given';
    const generatedName = fantasyNames('dungeon and dragons', race.toLowerCase(), 1)[0];
    console.log('Generated name:', generatedName);
    return generatedName;
  } catch (error) {
    console.error('Error generating fantasy name:', error);
    return generateFallbackName(race);
  }
}

// Fallback name generator if API fails - now generates full names too
function generateFallbackName(race: string): string {
  console.log('Using fallback name generation for race:', race);
  
  const firstNamePrefixes = ['Aer', 'Bel', 'Cel', 'Dar', 'Eld', 'Fel', 'Gar', 'Hal', 'Ith', 'Jor', 'Kel', 'Lor', 'Mor', 'Nal', 'Ord', 'Pel', 'Quin', 'Ral', 'Sel', 'Tar', 'Ul', 'Vel', 'Wil', 'Xar', 'Yor', 'Zel'];
  const firstNameSuffixes = ['ahn', 'ath', 'dar', 'eth', 'ian', 'iel', 'ith', 'lyn', 'mir', 'nal', 'orn', 'ric', 'tar', 'wen', 'wyn'];
  
  const lastNamePrefixes = ['Iron', 'Gold', 'Stone', 'Fire', 'Storm', 'Night', 'Moon', 'Star', 'Wind', 'Frost', 'Shadow', 'Light', 'Dark', 'Silver', 'Bronze'];
  const lastNameSuffixes = ['forge', 'hammer', 'blade', 'heart', 'soul', 'ward', 'guard', 'shield', 'crown', 'throne', 'bane', 'song', 'walker', 'rider', 'born'];
  
  // Customize prefixes slightly based on race
  let raceSpecificFirstPrefixes = firstNamePrefixes;
  let raceSpecificLastPrefixes = lastNamePrefixes;
  
  if (race === 'Elf' || race === 'Half-Elf') {
    raceSpecificFirstPrefixes = ['Aer', 'Cel', 'Eld', 'Ith', 'Kel', 'Lor', 'Pel', 'Sel', 'Vel'];
    raceSpecificLastPrefixes = ['Moon', 'Star', 'Wind', 'Light', 'Silver', 'Song', 'Walker'];
  } else if (race === 'Dwarf') {
    raceSpecificFirstPrefixes = ['Bel', 'Dar', 'Gar', 'Mor', 'Ord', 'Tar', 'Ul'];
    raceSpecificLastPrefixes = ['Iron', 'Stone', 'Fire', 'Frost', 'Bronze', 'Hammer', 'Forge'];
  } else if (race === 'Dragonborn') {
    raceSpecificFirstPrefixes = ['Dar', 'Gar', 'Mor', 'Xar', 'Yor', 'Zel'];
    raceSpecificLastPrefixes = ['Fire', 'Storm', 'Crown', 'Throne', 'Bane', 'Born'];
  }
  
  const firstName = raceSpecificFirstPrefixes[Math.floor(Math.random() * raceSpecificFirstPrefixes.length)] + 
                   firstNameSuffixes[Math.floor(Math.random() * firstNameSuffixes.length)];
  
  const lastName = raceSpecificLastPrefixes[Math.floor(Math.random() * raceSpecificLastPrefixes.length)] + 
                  lastNameSuffixes[Math.floor(Math.random() * lastNameSuffixes.length)];
  
  const fullName = `${firstName} ${lastName}`;
  console.log('Generated fallback name:', fullName);
  return fullName;
}

export function calculateCarryingCapacity(strengthScore: number): {
  capacity: number;
  pushDragLift: number;
  encumbered: number;
  heavilyEncumbered: number;
} {
  const capacity = strengthScore * 15; // Base carrying capacity
  
  return {
    capacity,
    pushDragLift: capacity * 2,
    encumbered: capacity / 3,
    heavilyEncumbered: (capacity * 2) / 3
  };
}

export function calculateEncumbrance(character: Character, additionalWeight: number = 0): {
  currentWeight: number;
  capacity: number;
  isEncumbered: boolean;
  isHeavilyEncumbered: boolean;
  status: 'Normal' | 'Encumbered' | 'Heavily Encumbered' | 'Overloaded';
} {
  const carrying = calculateCarryingCapacity(character.strength);
  
  // Calculate current weight (this would need to sum up actual item weights from database)
  let currentWeight = additionalWeight;
  
  // Add equipment weight (placeholder - would need to look up actual weights)
  currentWeight += character.weapons.length * 3; // Average weapon weight
  currentWeight += character.armor.length * 20; // Average armor weight
  currentWeight += character.inventory.length * 1; // Average item weight
  
  const isEncumbered = currentWeight > carrying.encumbered;
  const isHeavilyEncumbered = currentWeight > carrying.heavilyEncumbered;
  const isOverloaded = currentWeight > carrying.capacity;
  
  let status: 'Normal' | 'Encumbered' | 'Heavily Encumbered' | 'Overloaded';
  if (isOverloaded) status = 'Overloaded';
  else if (isHeavilyEncumbered) status = 'Heavily Encumbered';
  else if (isEncumbered) status = 'Encumbered';
  else status = 'Normal';
  
  return {
    currentWeight,
    capacity: carrying.capacity,
    isEncumbered,
    isHeavilyEncumbered,
    status
  };
}

export function canCharacterUseWeapon(character: Character, weapon: Weapon): boolean {
  // Basic proficiency check (simplified)
  const simpleWeaponClasses = ['Fighter', 'Barbarian', 'Paladin', 'Ranger', 'Rogue', 'Bard', 'Cleric', 'Druid', 'Monk', 'Warlock'];
  const martialWeaponClasses = ['Fighter', 'Barbarian', 'Paladin', 'Ranger'];
  
  if (weapon.type === 'Simple') {
    return simpleWeaponClasses.includes(character.class);
  } else if (weapon.type === 'Martial') {
    return martialWeaponClasses.includes(character.class);
  }
  
  return false;
}

export function canCharacterWearArmor(character: Character, armor: Armor): boolean {
  // Basic proficiency check (simplified)
  const lightArmorClasses = ['Fighter', 'Barbarian', 'Paladin', 'Ranger', 'Rogue', 'Bard', 'Cleric', 'Druid', 'Monk', 'Warlock', 'Sorcerer', 'Wizard'];
  const mediumArmorClasses = ['Fighter', 'Barbarian', 'Paladin', 'Ranger', 'Cleric', 'Druid'];
  const heavyArmorClasses = ['Fighter', 'Paladin', 'Cleric'];
  
  switch (armor.type) {
    case 'Light':
      return lightArmorClasses.includes(character.class);
    case 'Medium':
      return mediumArmorClasses.includes(character.class);
    case 'Heavy':
      return heavyArmorClasses.includes(character.class) && 
             character.strength >= (armor.minStrength || 0);
    case 'Shield':
      return ['Fighter', 'Barbarian', 'Paladin', 'Ranger', 'Cleric', 'Druid'].includes(character.class);
    default:
      return false;
  }
}

export function createMagicalWeaponForCharacter(
  character: Character,
  baseWeaponName: string,
  templateName: string,
  customName?: string
): MagicalWeapon | null {
  // This would need to look up the base weapon from database
  console.warn('createMagicalWeaponForCharacter() requires database lookup for base weapon');
  
  const template = MAGICAL_WEAPON_TEMPLATES.find(t => t.name === templateName);
  if (!template) {
    return null;
  }
  
  // For now, create a basic weapon structure
  const baseWeapon: Weapon = {
    name: baseWeaponName,
    type: 'Martial',
    category: 'Melee',
    damage: '1d8',
    damageType: 'Slashing',
    properties: [],
    weight: 3,
    cost: '15 gp'
  };
  
  return createMagicalWeapon(baseWeapon, template, customName);
}

export function validateCharacterEquipment(character: Character): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check weapon proficiencies
  character.weapons.forEach(weapon => {
    if (!canCharacterUseWeapon(character, weapon)) {
      warnings.push(`Not proficient with ${weapon.name}`);
    }
  });
  
  // Check armor proficiencies
  character.armor.forEach(armor => {
    if (!canCharacterWearArmor(character, armor)) {
      errors.push(`Cannot wear ${armor.name} - lacks proficiency or requirements`);
    }
  });
  
  // Check encumbrance
  const encumbrance = calculateEncumbrance(character);
  if (encumbrance.status === 'Overloaded') {
    errors.push('Character is overloaded and cannot move');
  } else if (encumbrance.status === 'Heavily Encumbered') {
    warnings.push('Character is heavily encumbered (speed -20 ft, disadvantage on ability checks)');
  } else if (encumbrance.status === 'Encumbered') {
    warnings.push('Character is encumbered (speed -10 ft)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
} 