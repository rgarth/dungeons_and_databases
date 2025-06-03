// D&D 5e Core Mechanics and Utilities

export const ABILITY_SCORES = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as const;
export type AbilityScore = typeof ABILITY_SCORES[number];

export const RACES = [
  'Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Halfling', 
  'Half-Orc', 'Human', 'Tiefling'
] as const;

export const CLASSES = [
  'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 
  'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'
] as const;

export const BACKGROUNDS = [
  'Acolyte', 'Criminal', 'Folk Hero', 'Noble', 'Sage', 'Soldier',
  'Charlatan', 'Entertainer', 'Guild Artisan', 'Hermit', 'Outlander', 'Sailor'
] as const;

export const ALIGNMENTS = [
  'Lawful Good', 'Neutral Good', 'Chaotic Good',
  'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
  'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
] as const;

export const SKILLS = {
  Acrobatics: 'dexterity',
  'Animal Handling': 'wisdom',
  Arcana: 'intelligence',
  Athletics: 'strength',
  Deception: 'charisma',
  History: 'intelligence',
  Insight: 'wisdom',
  Intimidation: 'charisma',
  Investigation: 'intelligence',
  Medicine: 'wisdom',
  Nature: 'intelligence',
  Perception: 'wisdom',
  Performance: 'charisma',
  Persuasion: 'charisma',
  Religion: 'intelligence',
  'Sleight of Hand': 'dexterity',
  Stealth: 'dexterity',
  Survival: 'wisdom',
} as const;

// Stat Generation Methods
export type StatMethod = 'rolling' | 'standard' | 'pointbuy';

// Standard Array (official D&D 5e)
export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

// Point Buy costs (official D&D 5e)
export const POINT_BUY_COSTS: Record<number, number> = {
  8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
};

// Calculate ability modifier from score
export function getModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

// Calculate proficiency bonus based on level
export function getProficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1;
}

// Generate random ability scores using 4d6 drop lowest
export function rollAbilityScore(): number {
  const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
  rolls.sort((a, b) => b - a);
  return rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0);
}

// Generate a complete set of ability scores by method
export function generateAbilityScores(method: StatMethod = 'rolling'): Record<AbilityScore, number> {
  switch (method) {
    case 'rolling':
      return ABILITY_SCORES.reduce((scores, ability) => {
        scores[ability] = rollAbilityScore();
        return scores;
      }, {} as Record<AbilityScore, number>);
    
    case 'standard':
      return ABILITY_SCORES.reduce((scores, ability, index) => {
        scores[ability] = STANDARD_ARRAY[index] || 10;
        return scores;
      }, {} as Record<AbilityScore, number>);
    
    case 'pointbuy':
      return ABILITY_SCORES.reduce((scores, ability) => {
        scores[ability] = 8; // Start with base 8 for point buy
        return scores;
      }, {} as Record<AbilityScore, number>);
    
    default:
      return generateAbilityScores('rolling');
  }
}

// Calculate remaining points for point buy
export function calculatePointBuyRemaining(scores: Record<AbilityScore, number>): number {
  const usedPoints = Object.values(scores).reduce((total, score) => {
    return total + (POINT_BUY_COSTS[score] || 0);
  }, 0);
  return 27 - usedPoints;
}

// Calculate hit points for a character
export function calculateHitPoints(level: number, constitution: number, className: string): number {
  const hitDie = getClassHitDie(className);
  const conMod = getModifier(constitution);
  
  // First level: max hit die + con mod
  // Additional levels: average of hit die + con mod
  const baseHP = hitDie + conMod;
  const additionalHP = (level - 1) * (Math.floor(hitDie / 2) + 1 + conMod);
  
  return Math.max(1, baseHP + additionalHP);
}

function getClassHitDie(className: string): number {
  const hitDice: Record<string, number> = {
    Barbarian: 12, Bard: 8, Cleric: 8, Druid: 8, Fighter: 10, Monk: 8,
    Paladin: 10, Ranger: 10, Rogue: 8, Sorcerer: 6, Warlock: 8, Wizard: 6
  };
  return hitDice[className] || 8;
}

// Starting Equipment by Class
export function getStartingEquipment(characterClass: string, background: string): string[] {
  const classEquipment: Record<string, string[]> = {
    Barbarian: ['Greataxe', 'Handaxe (2)', 'Javelin (4)', 'Leather Armor', 'Explorers Pack'],
    Bard: ['Rapier', 'Leather Armor', 'Dagger', 'Simple Weapon', 'Lute', 'Entertainers Pack'],
    Cleric: ['Scale Mail', 'Shield', 'Warhammer', 'Light Crossbow', 'Priests Pack'],
    Druid: ['Leather Armor', 'Shield', 'Scimitar', 'Simple Weapon', 'Explorers Pack'],
    Fighter: ['Chain Mail', 'Shield', 'Martial Weapon', 'Martial Weapon', 'Light Crossbow', 'Dungeoneer Pack'],
    Monk: ['Shortsword', 'Simple Weapon', 'Dart (10)', 'Dungeoneer Pack'],
    Paladin: ['Chain Mail', 'Shield', 'Martial Weapon', 'Javelin (5)', 'Explorers Pack'],
    Ranger: ['Scale Mail', 'Shield', 'Shortsword (2)', 'Simple Weapon', 'Longbow', 'Dungeoneer Pack'],
    Rogue: ['Leather Armor', 'Shortsword (2)', 'Shortbow', 'Arrow (20)', 'Thieves Tools', 'Dungeoneer Pack'],
    Sorcerer: ['Light Crossbow', 'Simple Weapon', 'Dagger (2)', 'Dungeoneer Pack'],
    Warlock: ['Light Armor', 'Simple Weapon', 'Simple Weapon', 'Light Crossbow', 'Scholars Pack'],
    Wizard: ['Quarterstaff', 'Dagger', 'Light Crossbow', 'Scholars Pack', 'Spellbook']
  };

  const backgroundEquipment: Record<string, string[]> = {
    Acolyte: ['Holy Symbol', 'Prayer Book', 'Incense (5)', 'Vestments', 'Common Clothes', 'Belt Pouch'],
    Criminal: ['Crowbar', 'Dark Common Clothes', 'Hood', 'Belt Pouch'],
    'Folk Hero': ['Artisan Tools', 'Shovel', 'Iron Pot', 'Common Clothes', 'Belt Pouch'],
    Noble: ['Signet Ring', 'Scroll of Pedigree', 'Fine Clothes', 'Belt Pouch'],
    Sage: ['Ink Bottle', 'Quill', 'Small Knife', 'Letter', 'Common Clothes', 'Belt Pouch'],
    Soldier: ['Insignia of Rank', 'Trophy', 'Deck of Cards', 'Common Clothes', 'Belt Pouch']
  };

  return [
    ...(classEquipment[characterClass] || []),
    ...(backgroundEquipment[background] || [])
  ];
}

// Background skill proficiencies
export function getBackgroundSkills(background: string): string[] {
  const backgroundSkills: Record<string, string[]> = {
    Acolyte: ['Insight', 'Religion'],
    Criminal: ['Deception', 'Stealth'],
    'Folk Hero': ['Animal Handling', 'Survival'],
    Noble: ['History', 'Persuasion'],
    Sage: ['Arcana', 'History'],
    Soldier: ['Athletics', 'Intimidation'],
    Charlatan: ['Deception', 'Sleight of Hand'],
    Entertainer: ['Acrobatics', 'Performance'],
    'Guild Artisan': ['Insight', 'Persuasion'],
    Hermit: ['Medicine', 'Religion'],
    Outlander: ['Athletics', 'Survival'],
    Sailor: ['Athletics', 'Perception']
  };
  
  return backgroundSkills[background] || [];
}

// Fantasy Name Generator using online API
export async function generateFantasyName(race: string, gender?: string): Promise<string> {
  try {
    // Map D&D races to IronArachne API format (direct matches!)
    const raceMapping: Record<string, string> = {
      'Dragonborn': 'dragonborn',
      'Dwarf': 'dwarf',
      'Elf': 'elf', 
      'Gnome': 'gnome',
      'Half-Elf': 'half-elf',
      'Halfling': 'halfling',
      'Half-Orc': 'half-orc',
      'Human': 'human',
      'Tiefling': 'tiefling'
    };

    const apiRace = raceMapping[race];
    if (!apiRace) {
      console.log('Race not found in mapping, using fallback');
      return generateFallbackName(race);
    }

    // Determine name type based on gender
    let nameType = 'given'; // Default gender-neutral for non-binary/other
    if (gender === 'Male') {
      nameType = 'male';
    } else if (gender === 'Female') {
      nameType = 'female';
    }

    console.log(`Trying API calls for race: ${apiRace}, nameType: ${nameType}`);

    // Get first name and family name
    const [firstNameResponse, familyNameResponse] = await Promise.all([
      fetch(`https://names.ironarachne.com/race/${apiRace}/${nameType}/1`),
      fetch(`https://names.ironarachne.com/race/${apiRace}/family/1`)
    ]);

    console.log(`API responses: ${firstNameResponse.status}, ${familyNameResponse.status}`);

    if (!firstNameResponse.ok || !familyNameResponse.ok) {
      console.log(`API failed with status codes: ${firstNameResponse.status}, ${familyNameResponse.status}`);
      throw new Error(`API returned ${firstNameResponse.status} or ${familyNameResponse.status}`);
    }

    const [firstNames, familyNames] = await Promise.all([
      firstNameResponse.json(),
      familyNameResponse.json()
    ]);

    console.log('API responses:', { firstNames, familyNames });
    
    // Handle different possible response formats
    let firstName = '';
    let familyName = '';
    
    // Try to extract names from various possible formats
    if (typeof firstNames === 'object' && firstNames !== null) {
      if (Array.isArray(firstNames) && firstNames.length > 0) {
        firstName = firstNames[0];
      } else if (firstNames.names && Array.isArray(firstNames.names)) {
        firstName = firstNames.names[0];
      } else if (firstNames.name) {
        firstName = firstNames.name;
      } else if (typeof firstNames === 'string') {
        firstName = firstNames;
      } else {
        // Try to get the first property value if it's a string
        const values = Object.values(firstNames);
        if (values.length > 0 && typeof values[0] === 'string') {
          firstName = values[0];
        }
      }
    }
    
    if (typeof familyNames === 'object' && familyNames !== null) {
      if (Array.isArray(familyNames) && familyNames.length > 0) {
        familyName = familyNames[0];
      } else if (familyNames.names && Array.isArray(familyNames.names)) {
        familyName = familyNames.names[0];
      } else if (familyNames.name) {
        familyName = familyNames.name;
      } else if (typeof familyNames === 'string') {
        familyName = familyNames;
      } else {
        // Try to get the first property value if it's a string
        const values = Object.values(familyNames);
        if (values.length > 0 && typeof values[0] === 'string') {
          familyName = values[0];
        }
      }
    }
    
    if (firstName && familyName) {
      const fullName = `${firstName} ${familyName}`;
      console.log('Generated API name:', fullName);
      return fullName;
    }
    
    console.log('Could not extract names from API response, using fallback');
    console.log('firstName extracted:', firstName, 'familyName extracted:', familyName);
    // Fallback to local generation if API fails
    return generateFallbackName(race);
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

// SPELLS DATA
export interface Spell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  classes: string[];
}

export const SPELL_SCHOOLS = [
  'Abjuration', 'Conjuration', 'Divination', 'Enchantment', 
  'Evocation', 'Illusion', 'Necromancy', 'Transmutation'
] as const;

export const SPELLS: Spell[] = [
  // Cantrips (Level 0)
  {
    name: "Fire Bolt",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "A mote of fire streaks toward a creature or object. Make a ranged spell attack. On hit, deal 1d10 fire damage.",
    classes: ["Sorcerer", "Wizard"]
  },
  {
    name: "Mage Hand",
    level: 0,
    school: "Conjuration",
    castingTime: "1 action",
    range: "30 feet",
    components: "V, S",
    duration: "1 minute",
    description: "A spectral hand appears and can manipulate objects, open doors, or retrieve items up to 10 pounds.",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"]
  },
  {
    name: "Sacred Flame",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "Divine flame descends on a creature. Target makes Dex save or takes 1d8 radiant damage.",
    classes: ["Cleric"]
  },
  {
    name: "Eldritch Blast",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "A beam of crackling energy. Make a ranged spell attack for 1d10 force damage.",
    classes: ["Warlock"]
  },
  // 1st Level Spells
  {
    name: "Magic Missile",
    level: 1,
    school: "Evocation",
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "Three darts of magical force hit their target automatically for 1d4+1 force damage each.",
    classes: ["Sorcerer", "Wizard"]
  },
  {
    name: "Cure Wounds",
    level: 1,
    school: "Evocation",
    castingTime: "1 action",
    range: "Touch",
    components: "V, S",
    duration: "Instantaneous",
    description: "Touch a creature to heal 1d8 + spellcasting modifier hit points.",
    classes: ["Bard", "Cleric", "Druid", "Paladin", "Ranger"]
  },
  {
    name: "Shield",
    level: 1,
    school: "Abjuration",
    castingTime: "1 reaction",
    range: "Self",
    components: "V, S",
    duration: "1 round",
    description: "Gain +5 AC until start of your next turn. Triggers when you are hit by an attack.",
    classes: ["Sorcerer", "Wizard"]
  }
];

// WEAPONS DATA
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

// ACTIONS DATA
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

// UTILITY FUNCTIONS
export function getSpellcastingAbility(characterClass: string): string | null {
  const spellcasters: Record<string, string> = {
    'Bard': 'charisma',
    'Cleric': 'wisdom', 
    'Druid': 'wisdom',
    'Paladin': 'charisma',
    'Ranger': 'wisdom',
    'Sorcerer': 'charisma',
    'Warlock': 'charisma',
    'Wizard': 'intelligence'
  };
  
  return spellcasters[characterClass] || null;
}

export function calculateSpellSaveDC(spellcastingAbility: number, proficiencyBonus: number): number {
  return 8 + getModifier(spellcastingAbility) + proficiencyBonus;
}

export function calculateSpellAttackBonus(spellcastingAbility: number, proficiencyBonus: number): number {
  return getModifier(spellcastingAbility) + proficiencyBonus;
}

export function getSpellSlots(characterClass: string, level: number): Record<number, number> {
  // Simplified spell slot progression for full casters
  const fullCasterSlots: Record<number, Record<number, number>> = {
    1: { 1: 2 },
    2: { 1: 3 },
    3: { 1: 4, 2: 2 },
    4: { 1: 4, 2: 3 },
    5: { 1: 4, 2: 3, 3: 2 }
    // Add more levels as needed
  };
  
  // Full casters: Bard, Cleric, Druid, Sorcerer, Wizard
  const fullCasters = ['Bard', 'Cleric', 'Druid', 'Sorcerer', 'Wizard'];
  
  if (fullCasters.includes(characterClass)) {
    return fullCasterSlots[level] || {};
  }
  
  // Half casters start at level 2
  if (['Paladin', 'Ranger'].includes(characterClass) && level >= 2) {
    const halfCasterLevel = Math.ceil((level - 1) / 2);
    return fullCasterSlots[halfCasterLevel] || {};
  }
  
  // Warlock has unique spell slot progression
  if (characterClass === 'Warlock') {
    if (level >= 1) return { 1: level >= 2 ? 2 : 1 };
    if (level >= 3) return { 2: 2 };
    if (level >= 5) return { 3: 2 };
  }
  
  return {};
}

export function getClassSpells(characterClass: string, level: number): Spell[] {
  return SPELLS.filter(spell => 
    spell.classes.includes(characterClass) && 
    spell.level <= Math.ceil(level / 2) // Simplified spell level access
  );
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

// D&D EQUIPMENT DATA
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

export interface Treasure {
  name: string;
  value: number; // Value in gold pieces
  description?: string;
}

// Common D&D Treasures
export const COMMON_TREASURES = [
  { name: "Ruby", value: 500, description: "A brilliant red gemstone" },
  { name: "Emerald", value: 1000, description: "A pristine green gemstone" },
  { name: "Diamond", value: 5000, description: "A flawless clear gemstone" },
  { name: "Sapphire", value: 1000, description: "A deep blue gemstone" },
  { name: "Pearl", value: 100, description: "A lustrous white pearl" },
  { name: "Gold Ring", value: 25, description: "A simple gold band" },
  { name: "Silver Necklace", value: 50, description: "An ornate silver chain" },
  { name: "Platinum Coin", value: 10, description: "A rare platinum piece" },
  { name: "Jade Figurine", value: 150, description: "A carved jade statuette" },
  { name: "Art Object", value: 250, description: "A valuable piece of art" },
  { name: "Ancient Coin", value: 75, description: "A coin from a lost civilization" },
  { name: "Crystal Vial", value: 100, description: "A delicate crystal container" }
];

// Story-specific treasure templates for common campaign themes
export const STORY_TREASURES = [
  { name: "Bejeweled Skull", value: 750, description: "An ornate skull encrusted with gems, once belonging to an ancient ruler" },
  { name: "Dragon Scale", value: 200, description: "A shimmering scale from a defeated dragon, still warm to the touch" },
  { name: "Cursed Medallion", value: 300, description: "A dark medallion that whispers ancient secrets" },
  { name: "Royal Crown", value: 2500, description: "A golden crown set with precious stones, symbol of fallen royalty" },
  { name: "Demon Horn", value: 400, description: "A twisted horn from a defeated fiend, radiating dark energy" },
  { name: "Angel Feather", value: 600, description: "A pure white feather that glows with divine light" },
  { name: "Ancient Tome", value: 800, description: "A leather-bound book filled with forgotten knowledge" },
  { name: "Elemental Crystal", value: 450, description: "A crystal that swirls with elemental energy" },
  { name: "Pirate's Treasure Map", value: 150, description: "A weathered map leading to buried treasure" },
  { name: "Vampire's Ring", value: 350, description: "A silver ring that once belonged to an undead lord" },
  { name: "Dwarf-forged Chalice", value: 500, description: "A masterwork chalice carved from a single block of stone" },
  { name: "Elven Moonstone", value: 650, description: "A stone that captures and reflects moonlight eternally" }
];

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

export function getEquipmentByCategory(category: string): Equipment[] {
  return EQUIPMENT.filter(item => item.type === category);
}

// D&D Class Proficiencies
export const CLASS_PROFICIENCIES: Record<string, {
  armor: string[];
  weapons: string[];
  maxEquippedWeapons: number;
}> = {
  'Barbarian': {
    armor: ['Light', 'Medium', 'Shield'],
    weapons: ['Simple', 'Martial'],
    maxEquippedWeapons: 2
  },
  'Bard': {
    armor: ['Light'],
    weapons: ['Simple', 'Longsword', 'Rapier', 'Shortsword', 'Hand Crossbow'],
    maxEquippedWeapons: 2
  },
  'Cleric': {
    armor: ['Light', 'Medium', 'Shield'],
    weapons: ['Simple'],
    maxEquippedWeapons: 2
  },
  'Druid': {
    armor: ['Light', 'Medium', 'Shield'], // Non-metal restriction applies
    weapons: ['Simple', 'Shortsword', 'Scimitar'],
    maxEquippedWeapons: 2
  },
  'Fighter': {
    armor: ['Light', 'Medium', 'Heavy', 'Shield'],
    weapons: ['Simple', 'Martial'],
    maxEquippedWeapons: 2
  },
  'Monk': {
    armor: [], // No armor proficiency
    weapons: ['Simple', 'Shortsword'],
    maxEquippedWeapons: 2
  },
  'Paladin': {
    armor: ['Light', 'Medium', 'Heavy', 'Shield'],
    weapons: ['Simple', 'Martial'],
    maxEquippedWeapons: 2
  },
  'Ranger': {
    armor: ['Light', 'Medium', 'Shield'],
    weapons: ['Simple', 'Martial'],
    maxEquippedWeapons: 2
  },
  'Rogue': {
    armor: ['Light'],
    weapons: ['Simple', 'Longsword', 'Rapier', 'Shortsword', 'Hand Crossbow'],
    maxEquippedWeapons: 2
  },
  'Sorcerer': {
    armor: [],
    weapons: ['Simple', 'Dagger', 'Dart', 'Sling', 'Quarterstaff', 'Light Crossbow'],
    maxEquippedWeapons: 1
  },
  'Warlock': {
    armor: ['Light'],
    weapons: ['Simple'],
    maxEquippedWeapons: 2
  },
  'Wizard': {
    armor: [],
    weapons: ['Simple', 'Dagger', 'Dart', 'Sling', 'Quarterstaff', 'Light Crossbow'],
    maxEquippedWeapons: 1
  }
};

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