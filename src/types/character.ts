import { Weapon, MagicalWeapon, Armor, InventoryItem } from '@/lib/dnd/equipment';
import { Spell } from '@/lib/dnd/spells';
import { Action } from '@/lib/dnd/combat';
import { Treasure } from '@/lib/dnd/data';

export interface Character {
  id: string;
  name: string;
  race: string;
  subrace?: string;
  class: string;
  subclass?: string;
  level: number;
  hitPoints: number;
  maxHitPoints: number;
  temporaryHitPoints?: number;
  armorClass: number;
  background: string;
  alignment: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  speed: number;
  proficiencyBonus: number;
  skills: string[];
  skillSources?: {
    [skillName: string]: 'class' | 'background' | 'racial' | 'feat' | 'other';
  };
  inventory: InventoryItem[];
  weapons: (Weapon | MagicalWeapon)[];
  armor?: Armor[];
  spellsKnown: Spell[];
  spellsPrepared: Spell[];
  spellSlots: Record<number, number>;
  usedSpellSlots?: Record<number, number>;
  spellcastingAbility: string;
  spellSaveDC: number;
  spellAttackBonus: number;
  actions: Action[];
  bonusActions: Action[];
  reactions: Action[];
  appearance: string;
  personality: string;
  backstory: string;
  avatar: string;
  fullBodyAvatar: string;
  backgroundCharacteristics: {
    personalityTraits: string[];
    ideals: string[];
    bonds: string[];
    flaws: string[];
  };
  createdAt: string;
  updatedAt: string;
  userId: string;
  isOptimistic?: boolean; // Flag to indicate if this is an optimistic update
  deathSaveSuccesses?: number;
  deathSaveFailures?: number;
  equippedWeapons?: (Weapon | MagicalWeapon)[];
  inventoryWeapons?: (Weapon | MagicalWeapon)[];
  inventoryArmor?: Armor[];
  copperPieces?: number;
  silverPieces?: number;
  goldPieces?: number;
  treasures?: Treasure[];
}

export interface SpellSlot {
  level: number;
  total: number;
  used: number;
}

export interface CharacterAvatarData {
  race: string;
  subrace?: string;
  class: string;
  gender?: string;
  alignment?: string;
  background?: string;
  personalityTraits?: string[];
  ideals?: string[];
  bonds?: string[];
  flaws?: string[];
  appearance?: string;
  equippedWeapons?: string[];
  equippedArmor?: string[];
  selectedWeapons?: string[];
  selectedArmor?: string[];
  age?: number;
} 