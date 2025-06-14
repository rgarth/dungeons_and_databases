export interface Weapon {
  name: string;
  damage: string;
  damageType: string;
  properties: string[];
}

export interface MagicalWeapon extends Weapon {
  rarity: string;
  attunement: boolean;
  magicalProperties: string[];
}

export interface Armor {
  name: string;
  type: string;
  ac: number;
}

export interface InventoryItem {
  name: string;
  quantity: number;
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
}

export interface Action {
  name: string;
  description: string;
  type: 'action' | 'bonus' | 'reaction';
} 