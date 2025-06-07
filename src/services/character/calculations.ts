import { getModifier, getProficiencyBonus, SKILLS } from '@/lib/dnd/core';
import { getSavingThrowProficiencies } from '@/lib/dnd/combat';

// Character interface (extracted from components)
interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  subclass?: string;
  level: number;
  hitPoints: number;
  maxHitPoints: number;
  armorClass: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  speed: number;
  skills?: string[];
  spellcastingAbility?: string;
  deathSaveSuccesses?: number;
  deathSaveFailures?: number;
}

// Core character calculations service
export class CharacterCalculations {
  constructor(private character: Character) {}

  // Ability score modifiers
  get abilityModifiers() {
    return {
      strength: getModifier(this.character.strength),
      dexterity: getModifier(this.character.dexterity),
      constitution: getModifier(this.character.constitution),
      intelligence: getModifier(this.character.intelligence),
      wisdom: getModifier(this.character.wisdom),
      charisma: getModifier(this.character.charisma),
    };
  }

  // Proficiency bonus
  get proficiencyBonus(): number {
    return getProficiencyBonus(this.character.level);
  }

  // Saving throw bonuses
  get savingThrows() {
    const proficiencies = getSavingThrowProficiencies(this.character.class);
    const profBonus = this.proficiencyBonus;
    const mods = this.abilityModifiers;
    
    return {
      strength: mods.strength + (proficiencies.includes('Strength') ? profBonus : 0),
      dexterity: mods.dexterity + (proficiencies.includes('Dexterity') ? profBonus : 0),
      constitution: mods.constitution + (proficiencies.includes('Constitution') ? profBonus : 0),
      intelligence: mods.intelligence + (proficiencies.includes('Intelligence') ? profBonus : 0),
      wisdom: mods.wisdom + (proficiencies.includes('Wisdom') ? profBonus : 0),
      charisma: mods.charisma + (proficiencies.includes('Charisma') ? profBonus : 0),
    };
  }

  // Skill bonuses
  get skillBonuses() {
    const proficiencies = this.character.skills || [];
    const profBonus = this.proficiencyBonus;
    const mods = this.abilityModifiers;
    
    const skills: Record<string, number> = {};
    
    Object.entries(SKILLS).forEach(([skillName, abilityName]) => {
      const abilityMod = mods[abilityName as keyof typeof mods];
      const isProficient = proficiencies.includes(skillName);
      skills[skillName] = abilityMod + (isProficient ? profBonus : 0);
    });
    
    return skills;
  }

  // Spellcasting calculations
  get spellcasting() {
    if (!this.character.spellcastingAbility) {
      return null;
    }
    
    const abilityMod = this.abilityModifiers[this.character.spellcastingAbility as keyof typeof this.abilityModifiers];
    const profBonus = this.proficiencyBonus;
    
    return {
      spellSaveDC: 8 + abilityMod + profBonus,
      spellAttackBonus: abilityMod + profBonus,
      abilityModifier: abilityMod,
    };
  }

  // Get ability modifier by ability name (for dynamic lookups)
  getAbilityModifier(abilityName: string): number {
    const abilityScore = this.character[abilityName as keyof Character] as number;
    return getModifier(abilityScore);
  }

  // Get skill bonus by skill name
  getSkillBonus(skillName: string): number {
    return this.skillBonuses[skillName] || 0;
  }

  // Get saving throw bonus by ability name
  getSavingThrowBonus(abilityName: string): number {
    return this.savingThrows[abilityName as keyof typeof this.savingThrows] || 0;
  }

  // Check if proficient in a skill
  isSkillProficient(skillName: string): boolean {
    return (this.character.skills || []).includes(skillName);
  }

  // Check if proficient in a saving throw
  isSavingThrowProficient(abilityName: string): boolean {
    const proficiencies = getSavingThrowProficiencies(this.character.class);
    return proficiencies.includes(abilityName);
  }

  // Get all skills for a specific ability
  getSkillsForAbility(abilityName: string): string[] {
    return Object.entries(SKILLS)
      .filter(([, ability]) => ability === abilityName)
      .map(([skill]) => skill);
  }
}

// Factory function for easier usage
export function createCharacterCalculations(character: Character): CharacterCalculations {
  return new CharacterCalculations(character);
}

// Utility functions for specific calculations
export function calculateSavingThrowBonus(
  abilityScore: number, 
  isProficient: boolean, 
  proficiencyBonus: number
): number {
  return getModifier(abilityScore) + (isProficient ? proficiencyBonus : 0);
}

export function calculateSkillBonus(
  abilityScore: number,
  isProficient: boolean,
  proficiencyBonus: number
): number {
  return getModifier(abilityScore) + (isProficient ? proficiencyBonus : 0);
} 