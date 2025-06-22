// Character creation and utility functions
import { Weapon, MagicalWeapon, Armor, Ammunition, createMagicalWeapon, MAGICAL_WEAPON_TEMPLATES } from './equipment';
import { Spell } from './spells';
import { generateName } from './names';

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
  armor?: Armor[];
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

// Fantasy Name Generator using our internal generator
export async function generateFantasyName(race: string, gender?: string): Promise<string> {
  try {
    // Map gender to our format
    const mappedGender = gender === 'Male' ? 'male' : gender === 'Female' ? 'female' : undefined;
    
    // Generate name using our internal generator
    return generateName(race, mappedGender);
  } catch (error) {
    console.error('Failed to generate name:', error);
    throw error;
  }
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
  currentWeight += (character.armor?.length ?? 0) * 20; // Average armor weight
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
  if (character.armor) {
    character.armor.forEach(armor => {
      if (!canCharacterWearArmor(character, armor)) {
        errors.push(`Cannot wear ${armor.name} - lacks proficiency or requirements`);
      }
    });
  }
  
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

// Dwarf age characteristics and appearance logic
// Based on D&D 5e lore: Dwarves reach adulthood at 50, can live 350+ years

export interface DwarfAgeStage {
  stage: 'child' | 'adolescent' | 'young_adult' | 'adult' | 'middle_aged' | 'elderly' | 'venerable';
  ageRange: [number, number];
  appearanceDescription: string;
  beardDescription: string;
  maturityLevel: string;
}

export const DWARF_AGE_STAGES: DwarfAgeStage[] = [
  {
    stage: 'child',
    ageRange: [0, 29],
    appearanceDescription: 'youthful dwarf features, smooth skin, minimal wrinkles, child-like proportions, round face, bright eyes',
    beardDescription: 'no beard, clean-shaven, youthful appearance',
    maturityLevel: 'childhood - still learning and growing'
  },
  {
    stage: 'adolescent',
    ageRange: [30, 39],
    appearanceDescription: 'young dwarf features, some fine lines beginning, developing adult proportions, earnest expression',
    beardDescription: 'scraggly beard, patchy facial hair, adolescent growth',
    maturityLevel: 'adolescence - finding their place in society'
  },
  {
    stage: 'young_adult',
    ageRange: [40, 79],
    appearanceDescription: 'young adult dwarf, mature features, some fine lines, confident expression, strong features',
    beardDescription: 'well-groomed beard, full facial hair, traditional dwarven style',
    maturityLevel: 'young adulthood - establishing themselves'
  },
  {
    stage: 'adult',
    ageRange: [80, 149],
    appearanceDescription: 'mature adult dwarf, weathered features, prominent wrinkles, experienced expression, strong character',
    beardDescription: 'thick, well-maintained beard, traditional braids or beads, signs of care',
    maturityLevel: 'full adulthood - respected member of community'
  },
  {
    stage: 'middle_aged',
    ageRange: [150, 239],
    appearanceDescription: 'middle-aged dwarf, deeply weathered features, prominent wrinkles, wise expression, experienced',
    beardDescription: 'thick, long beard, often with elaborate braids, beads, or metalwork, well-maintained',
    maturityLevel: 'middle age - wise and experienced'
  },
  {
    stage: 'elderly',
    ageRange: [240, 299],
    appearanceDescription: 'elderly dwarf, deeply wrinkled face, wise eyes, weathered but strong features, venerable appearance',
    beardDescription: 'long, flowing beard, often white or gray, elaborate braids and decorations, sign of status',
    maturityLevel: 'elderly - highly respected and wise'
  },
  {
    stage: 'venerable',
    ageRange: [300, 400],
    appearanceDescription: 'venerable dwarf, ancient features, deeply wrinkled, wise and knowing expression, legendary appearance',
    beardDescription: 'extremely long, flowing beard, often white, elaborate decorations and braids, legendary status',
    maturityLevel: 'venerable - living legend, ancient wisdom'
  }
];

export function getDwarfAgeStage(age: number): DwarfAgeStage {
  for (const stage of DWARF_AGE_STAGES) {
    if (age >= stage.ageRange[0] && age <= stage.ageRange[1]) {
      return stage;
    }
  }
  // Default to venerable for ages beyond 400
  return DWARF_AGE_STAGES[DWARF_AGE_STAGES.length - 1];
}

export function getDwarfAppearanceDescription(age: number, gender?: string): string {
  const stage = getDwarfAgeStage(age);
  
  // Gender-specific modifications
  if (gender === 'Female') {
    // Female dwarves typically have shorter, more groomed beards or no beards
    const femaleBeardDescriptions = {
      'child': 'no facial hair, clean-shaven',
      'adolescent': 'minimal facial hair, clean-shaven',
      'young_adult': 'short, well-groomed beard or clean-shaven',
      'adult': 'short, well-maintained beard or clean-shaven',
      'middle_aged': 'moderate beard, well-groomed, traditional style',
      'elderly': 'longer beard, well-maintained, elaborate braids',
      'venerable': 'long, flowing beard, elaborate decorations, legendary status'
    };
    
    return `${stage.appearanceDescription}, ${femaleBeardDescriptions[stage.stage]}`;
  }
  
  return `${stage.appearanceDescription}, ${stage.beardDescription}`;
}

export function getDwarfAgeDescription(age: number): string {
  const stage = getDwarfAgeStage(age);
  return `${stage.maturityLevel}, ${stage.appearanceDescription}`;
}

// For avatar generation when no specific age is provided
export function getDiverseDwarfAgeDescription(gender?: string): string {
  const ageStages = [
    'young adult dwarf (40-79 years), mature features, some fine lines, confident expression',
    'adult dwarf (80-149 years), weathered features, prominent wrinkles, experienced expression',
    'middle-aged dwarf (150-239 years), deeply weathered features, prominent wrinkles, wise expression',
    'elderly dwarf (240-299 years), deeply wrinkled face, wise eyes, venerable appearance'
  ];
  
  const beardDescriptions = gender === 'Female' 
    ? ['short, well-groomed beard', 'moderate beard, well-maintained', 'longer beard, elaborate braids']
    : ['thick, well-maintained beard', 'thick, long beard with braids', 'long, flowing beard with decorations'];
  
  return `diverse dwarf ages from young adult to elderly, ${ageStages.join(', ')}, varied beard styles: ${beardDescriptions.join(', ')}, traditional dwarven features, stocky build, broad shoulders`;
}

// Human age characteristics and appearance logic
// Based on D&D 5e lore: Humans reach adulthood at 18, typically live 70-80 years

export interface HumanAgeStage {
  stage: 'child' | 'adolescent' | 'young_adult' | 'adult' | 'middle_aged' | 'elderly' | 'venerable';
  ageRange: [number, number];
  appearanceDescription: string;
  maturityLevel: string;
}

export const HUMAN_AGE_STAGES: HumanAgeStage[] = [
  {
    stage: 'child',
    ageRange: [0, 12],
    appearanceDescription: 'youthful human features, smooth skin, minimal wrinkles, child-like proportions, round face, bright eyes',
    maturityLevel: 'childhood - still learning and growing'
  },
  {
    stage: 'adolescent',
    ageRange: [13, 17],
    appearanceDescription: 'teenage human features, developing adult proportions, earnest expression, some acne or blemishes',
    maturityLevel: 'adolescence - finding their place in society'
  },
  {
    stage: 'young_adult',
    ageRange: [18, 29],
    appearanceDescription: 'young adult human, mature features, some fine lines, confident expression, strong features',
    maturityLevel: 'young adulthood - establishing themselves'
  },
  {
    stage: 'adult',
    ageRange: [30, 49],
    appearanceDescription: 'mature adult human, weathered features, prominent wrinkles, experienced expression, strong character',
    maturityLevel: 'full adulthood - respected member of community'
  },
  {
    stage: 'middle_aged',
    ageRange: [50, 64],
    appearanceDescription: 'middle-aged human, deeply weathered features, prominent wrinkles, wise expression, experienced',
    maturityLevel: 'middle age - wise and experienced'
  },
  {
    stage: 'elderly',
    ageRange: [65, 79],
    appearanceDescription: 'elderly human, deeply wrinkled face, wise eyes, weathered but strong features, venerable appearance',
    maturityLevel: 'elderly - highly respected and wise'
  },
  {
    stage: 'venerable',
    ageRange: [80, 100],
    appearanceDescription: 'venerable human, ancient features, deeply wrinkled, wise and knowing expression, legendary appearance',
    maturityLevel: 'venerable - living legend, ancient wisdom'
  }
];

export function getHumanAgeStage(age: number): HumanAgeStage {
  for (const stage of HUMAN_AGE_STAGES) {
    if (age >= stage.ageRange[0] && age <= stage.ageRange[1]) {
      return stage;
    }
  }
  // Default to venerable for ages beyond 100
  return HUMAN_AGE_STAGES[HUMAN_AGE_STAGES.length - 1];
}

export function getHumanAppearanceDescription(age: number): string {
  const stage = getHumanAgeStage(age);
  return stage.appearanceDescription;
}

export function getHumanAgeDescription(age: number): string {
  const stage = getHumanAgeStage(age);
  return `${stage.maturityLevel}, ${stage.appearanceDescription}`;
}

// For avatar generation when no specific age is provided
export function getDiverseHumanAgeDescription(): string {
  const ageStages = [
    'young adult human (18-29 years), mature features, some fine lines, confident expression',
    'adult human (30-49 years), weathered features, prominent wrinkles, experienced expression',
    'middle-aged human (50-64 years), deeply weathered features, prominent wrinkles, wise expression',
    'elderly human (65-79 years), deeply wrinkled face, wise eyes, venerable appearance'
  ];
  
  return `diverse human ages from young adult to elderly, ${ageStages.join(', ')}, varied human features, average build, varied skin tones, varied hair styles`;
}

// Elf age characteristics and appearance logic
// Based on D&D 5e lore: Elves reach adulthood at 100, can live 750+ years, never look over 40

export interface ElfAgeStage {
  stage: 'child' | 'adolescent' | 'young_adult' | 'adult' | 'middle_aged' | 'elderly' | 'venerable';
  ageRange: [number, number];
  appearanceDescription: string;
  maturityLevel: string;
}

export const ELF_AGE_STAGES: ElfAgeStage[] = [
  {
    stage: 'child',
    ageRange: [0, 99],
    appearanceDescription: 'youthful elf features, smooth skin, minimal wrinkles, child-like proportions, bright eyes, ageless elven beauty',
    maturityLevel: 'childhood - still learning and growing'
  },
  {
    stage: 'adolescent',
    ageRange: [100, 199],
    appearanceDescription: 'young elf features, developing adult proportions, earnest expression, ageless elven beauty',
    maturityLevel: 'adolescence - finding their place in society'
  },
  {
    stage: 'young_adult',
    ageRange: [200, 299],
    appearanceDescription: 'young adult elf, mature features, some fine lines, confident expression, ageless elven beauty',
    maturityLevel: 'young adulthood - establishing themselves'
  },
  {
    stage: 'adult',
    ageRange: [300, 449],
    appearanceDescription: 'mature adult elf, weathered features, prominent wrinkles, experienced expression, ageless elven beauty',
    maturityLevel: 'full adulthood - respected member of community'
  },
  {
    stage: 'middle_aged',
    ageRange: [450, 599],
    appearanceDescription: 'middle-aged elf, deeply weathered features, prominent wrinkles, wise expression, ageless elven beauty',
    maturityLevel: 'middle age - wise and experienced'
  },
  {
    stage: 'elderly',
    ageRange: [600, 749],
    appearanceDescription: 'elderly elf, deeply wrinkled face, wise eyes, weathered but strong features, ageless elven beauty',
    maturityLevel: 'elderly - highly respected and wise'
  },
  {
    stage: 'venerable',
    ageRange: [750, 1000],
    appearanceDescription: 'venerable elf, ancient features, deeply wrinkled, wise and knowing expression, ageless elven beauty',
    maturityLevel: 'venerable - living legend, ancient wisdom'
  }
];

export function getElfAgeStage(age: number): ElfAgeStage {
  for (const stage of ELF_AGE_STAGES) {
    if (age >= stage.ageRange[0] && age <= stage.ageRange[1]) {
      return stage;
    }
  }
  // Default to venerable for ages beyond 1000
  return ELF_AGE_STAGES[ELF_AGE_STAGES.length - 1];
}

export function getElfAppearanceDescription(age: number): string {
  // Elves never look over 40, so we cap their visual age
  const visualAge = Math.min(age, 40);
  
  if (visualAge < 18) return 'teenager, youthful features, smooth skin, minimal wrinkles, ageless elven beauty';
  if (visualAge < 25) return 'young adult, early twenties, youthful features, smooth skin, ageless elven beauty';
  if (visualAge < 35) return 'young adult, twenties to early thirties, some fine lines, youthful but mature, ageless elven beauty';
  if (visualAge < 45) return 'young adult, thirties to early forties, mature features, some fine lines, youthful but mature, ageless elven beauty';
  
  // For elves 45 and older, cap at 40s appearance
  return 'young adult, thirties to early forties, mature features, some fine lines, youthful but mature, ageless elven beauty';
}

export function getElfAgeDescription(age: number): string {
  const stage = getElfAgeStage(age);
  return `${stage.maturityLevel}, ageless elven beauty`;
}

// For avatar generation when no specific age is provided
export function getDiverseElfAgeDescription(): string {
  const ageStages = [
    'young adult elf, mature features, some fine lines, confident expression',
    'adult elf, weathered features, prominent wrinkles, experienced expression',
    'middle-aged elf, deeply weathered features, prominent wrinkles, wise expression',
    'elderly elf, deeply wrinkled face, wise eyes, venerable appearance'
  ];
  
  return `diverse elf ages from young adult to elderly, ${ageStages.join(', ')}, ageless elven beauty, long pointed ears, ethereal features, angular face`;
} 