export interface SelectedCharacteristics {
  race: string;
  class: string;
  background: string;
  alignment: string;
  personalityTraits?: string[];
  ideals?: string[];
  bonds?: string[];
  flaws?: string[];
}

export interface CharacterCreationData {
  name: string;
  race: string;
  subrace?: string | null;
  class: string;
  subclass?: string | null;
  level: number;
  background: string;
  alignment: string;
  hitPoints: number;
  maxHitPoints: number;
  armorClass: number;
  abilityScores: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  selectedWeapons: string[];
  selectedArmor: string[];
  selectedSpells: string[];
  backgroundCharacteristics: {
    personalityTraits: string[];
    ideals: string[];
    bonds: string[];
    flaws: string[];
  };
  avatarUrl?: string;
  fullBodyUrl?: string;
} 