// Full API-compliant damage structures
export interface MonsterDamageType {
  index: string;
  name: string;
  url: string;
}

export interface MonsterDamageOption {
  option_type: "damage";
  damage_type: MonsterDamageType;
  damage_dice: string;
  notes?: string;
}

export interface MonsterDamageChoice {
  choose: number;
  type: "damage";
  from: {
    option_set_type: "options_array";
    options: MonsterDamageOption[];
  };
}

export interface MonsterDamageSimple {
  damage_type: MonsterDamageType;
  damage_dice: string;
  dc?: {
    dc_type: {
      index: string;
      name: string;
      url: string;
    };
    dc_value: number;
    success_type: string;
  };
}

// Full API-compliant multiattack structures
export interface MonsterMultiattackOption {
  option_type: "action" | "multiple";
  action_name?: string;
  count?: number;
  type?: "melee" | "ranged" | "magic" | "ability";
  desc?: string;
  items?: {
    option_type: "action";
    action_name: string;
    count: number;
    type: "melee" | "ranged" | "magic" | "ability";
    desc?: string;
  }[];
}

export interface MonsterActionOptions {
  choose: number;
  type: "action";
  from: {
    option_set_type: "options_array";
    options: MonsterMultiattackOption[];
  };
}

export interface MonsterAction {
  name: string;
  desc: string; // Keep original API field name
  attack_bonus?: number; // Keep original API field name
  damage?: (MonsterDamageSimple | MonsterDamageChoice)[]; // Full API structure
  multiattack_type?: string;
  action_options?: MonsterActionOptions; // Full API structure
  actions?: unknown[]; // Keep original API field
}

export interface MonsterSpellcasting {
  level: number;
  spellcastingAbility: string;
  spellSaveDc: number;
  spellAttackBonus: number;
  spells: {
    cantrips?: string[];
    1?: string[];
    2?: string[];
    3?: string[];
    4?: string[];
    5?: string[];
    6?: string[];
    7?: string[];
    8?: string[];
    9?: string[];
  };
}

export interface MonsterTrait {
  name: string;
  description: string;
}

export interface MonsterLegendaryAction {
  name: string;
  cost?: number; // 1, 2, or 3 (optional since API doesn't provide it)
  description: string;
}

export interface MonsterLairAction {
  name: string;
  description: string;
  initiative?: number;
}

export interface MonsterRegionalEffect {
  description: string;
}

export interface Monster {
  // Basic Information
  name: string;
  size: 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';
  type: string; // e.g., "dragon", "humanoid", "beast"
  subtype?: string; // e.g., "elf", "goblinoid"
  alignment: string;
  challengeRating: string; // e.g., "1/4", "1", "2", "21"
  xp: number;
  
  // Ability Scores
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  
  // Combat Stats
  armorClass: number;
  armorType?: string; // e.g., "natural armor", "chain mail"
  hitPoints: number;
  hitDice: string; // e.g., "15d10+75"
  speed: {
    walk?: number;
    fly?: number;
    swim?: number;
    climb?: number;
    burrow?: number;
    hover?: boolean;
  };
  
  // Proficiencies
  savingThrows?: {
    strength?: number;
    dexterity?: number;
    constitution?: number;
    intelligence?: number;
    wisdom?: number;
    charisma?: number;
  };
  skills?: Record<string, number>; // e.g., { "Perception": 6, "Stealth": 4 }
  damageResistances?: string[];
  damageImmunities?: string[];
  conditionImmunities?: Array<{
    index: string;
    name: string;
    url: string;
  }>;
  damageVulnerabilities?: string[];
  
  // Senses
  senses: {
    darkvision?: number;
    blindsight?: number;
    tremorsense?: number;
    truesight?: number;
    passivePerception: number;
  };
  
  // Languages
  languages: string[];
  telepathy?: number;
  
  // Challenge Rating Details
  proficiencyBonus: number;
  
  // Actions and Abilities
  traits?: MonsterTrait[];
  actions?: MonsterAction[];
  legendaryActions?: MonsterLegendaryAction[];
  lairActions?: MonsterLairAction[];
  regionalEffects?: MonsterRegionalEffect[];
  
  // Spellcasting
  spellcasting?: MonsterSpellcasting;
  
  // Description and Lore
  description?: string;
  background?: string;
  
  // Image Generation
  imagePrompt?: string; // For AI image generation
  imageStyle?: string; // e.g., "dark fantasy", "realistic", "cartoon"
  
  // Metadata
  source: string; // "SRD", "MM", etc.
  page?: number;
  tags?: string[]; // For filtering/searching
  environment?: string[]; // e.g., ["ocean", "underwater"], ["forest", "mountain"], ["urban", "underground"]
}

export interface MonsterFilter {
  name?: string;
  type?: string;
  size?: string;
  challengeRating?: string;
  tags?: string[];
} 