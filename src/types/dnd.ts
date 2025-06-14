export interface Race {
  name: string;
  speed: number;
  abilityScoreIncrease: Record<string, number>;
  traits: string[];
  languages: string[];
  subraces?: string[];
}

export interface Class {
  name: string;
  hitDie: number;
  primaryAbility: string[];
  savingThrows: string[];
  spellcastingAbility?: string;
  features: string[];
  proficiencies: {
    armor: string[];
    weapons: string[];
    tools: string[];
    skills: string[];
  };
}

export interface Armor {
  name: string;
  type: 'light' | 'medium' | 'heavy' | 'shield';
  baseArmorClass: number;
  strengthRequirement?: number;
  stealthDisadvantage: boolean;
  cost: {
    quantity: number;
    unit: 'cp' | 'sp' | 'gp' | 'pp';
  };
  weight: number;
}

export interface Weapon {
  name: string;
  type: 'simple' | 'martial';
  category: 'melee' | 'ranged';
  damage: {
    dice: string;
    type: string;
  };
  properties: string[];
  cost: {
    quantity: number;
    unit: 'cp' | 'sp' | 'gp' | 'pp';
  };
  weight: number;
}

export interface MagicalWeapon extends Weapon {
  rarity: 'common' | 'uncommon' | 'rare' | 'very rare' | 'legendary';
  magicalProperties: string[];
}

export interface Spell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string[];
  duration: string;
  description: string;
  higherLevel?: string;
  classes: string[];
}

export interface Action {
  name: string;
  type: 'action' | 'bonus action' | 'reaction';
  description: string;
  range?: string;
  target?: string;
  damage?: {
    dice: string;
    type: string;
  };
  savingThrow?: {
    ability: string;
    dc: number;
  };
}

export interface Treasure {
  name: string;
  type: 'gem' | 'art' | 'magic item';
  value: {
    quantity: number;
    unit: 'cp' | 'sp' | 'gp' | 'pp';
  };
  description: string;
  rarity?: 'common' | 'uncommon' | 'rare' | 'very rare' | 'legendary';
} 