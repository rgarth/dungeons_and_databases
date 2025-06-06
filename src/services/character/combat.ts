import { getModifier } from '@/lib/dnd/core';
import { calculateArmorClass } from '@/lib/dnd/equipment';
import { ActiveCondition, getCondition } from '@/lib/dnd/conditions';
import { Armor } from '@/lib/dnd/equipment';

// Character interface (should match the main one)
interface Character {
  id: string;
  class: string;
  level: number;
  hitPoints: number;
  maxHitPoints: number;
  temporaryHitPoints?: number;
  constitution: number;
  dexterity: number;
  armorClass: number;
  conditions?: ActiveCondition[];
  deathSaveSuccesses?: number;
  deathSaveFailures?: number;
}

// Combat state and calculations service
export class CharacterCombat {
  constructor(private character: Character) {}

  // Current hit points (including temporary)
  get effectiveHitPoints(): number {
    return this.character.hitPoints + (this.character.temporaryHitPoints || 0);
  }

  // HP as percentage of max
  get hitPointPercentage(): number {
    return (this.character.hitPoints / this.character.maxHitPoints) * 100;
  }

  // Is character unconscious (0 HP)
  get isUnconscious(): boolean {
    return this.character.hitPoints <= 0;
  }

  // Is character dead (3 death save failures)
  get isDead(): boolean {
    return (this.character.deathSaveFailures || 0) >= 3;
  }

  // Is character stabilized (3 death save successes)
  get isStabilized(): boolean {
    return (this.character.deathSaveSuccesses || 0) >= 3;
  }

  // Death save status when unconscious
  get deathSaveStatus(): { successes: number; failures: number; status: 'dying' | 'stabilized' | 'dead' } {
    const successes = this.character.deathSaveSuccesses || 0;
    const failures = this.character.deathSaveFailures || 0;
    
    let status: 'dying' | 'stabilized' | 'dead' = 'dying';
    if (failures >= 3) status = 'dead';
    else if (successes >= 3) status = 'stabilized';
    
    return { successes, failures, status };
  }

  // Active conditions
  get activeConditions(): ActiveCondition[] {
    return this.character.conditions || [];
  }

  // Check if character has a specific condition
  hasCondition(conditionName: string): boolean {
    return this.activeConditions.some(c => c.name === conditionName);
  }

  // Get condition effects summary
  get conditionEffects(): {
    attackDisadvantage: boolean;
    cannotTakeActions: boolean;
    speedReduced: boolean;
    otherEffects: string[];
  } {
    const effects = {
      attackDisadvantage: false,
      cannotTakeActions: false,
      speedReduced: false,
      otherEffects: [] as string[],
    };

    this.activeConditions.forEach(activeCondition => {
      const condition = getCondition(activeCondition.name);
      if (!condition) return;

      condition.effects.forEach(effect => {
        const lowerEffect = effect.toLowerCase();
        if (lowerEffect.includes('attack') && lowerEffect.includes('disadvantage')) {
          effects.attackDisadvantage = true;
        } else if (lowerEffect.includes("can't take actions")) {
          effects.cannotTakeActions = true;
        } else if (lowerEffect.includes('speed becomes 0') || lowerEffect.includes('speed is 0')) {
          effects.speedReduced = true;
        } else {
          effects.otherEffects.push(effect);
        }
      });
    });

    return effects;
  }

  // Calculate AC with equipment
  calculateArmorClass(equippedArmor: Armor[]): number {
    if (equippedArmor.length === 0) {
      // No armor: 10 + Dex modifier
      return 10 + getModifier(this.character.dexterity);
    }
    
    return calculateArmorClass(equippedArmor, this.character.dexterity);
  }

  // Take damage (handles temporary HP)
  takeDamage(amount: number): { 
    newHitPoints: number; 
    newTemporaryHitPoints: number; 
    damageToHP: number; 
    damageToTempHP: number;
  } {
    let tempHP = this.character.temporaryHitPoints || 0;
    let currentHP = this.character.hitPoints;
    let remainingDamage = amount;

    // Damage temp HP first
    const damageToTempHP = Math.min(remainingDamage, tempHP);
    tempHP -= damageToTempHP;
    remainingDamage -= damageToTempHP;

    // Then damage regular HP
    const damageToHP = Math.min(remainingDamage, currentHP);
    currentHP -= damageToHP;

    return {
      newHitPoints: Math.max(0, currentHP),
      newTemporaryHitPoints: tempHP,
      damageToHP,
      damageToTempHP,
    };
  }

  // Heal damage
  heal(amount: number): number {
    const newHP = Math.min(this.character.maxHitPoints, this.character.hitPoints + amount);
    return newHP;
  }

  // Rest recovery
  shortRest(): { hitPointsGained: number; newHitPoints: number } {
    // For now, simple recovery - could be enhanced with hit dice later
    const hitDie = this.getClassHitDie();
    const conMod = getModifier(this.character.constitution);
    const averageRecovery = Math.floor(hitDie / 2) + 1 + conMod;
    
    const maxRecovery = Math.floor(this.character.maxHitPoints / 2);
    const actualRecovery = Math.min(averageRecovery, maxRecovery, this.character.maxHitPoints - this.character.hitPoints);
    
    return {
      hitPointsGained: actualRecovery,
      newHitPoints: this.character.hitPoints + actualRecovery,
    };
  }

  longRest(): { newHitPoints: number; clearedConditions: string[] } {
    // Full HP recovery and most conditions cleared
    const conditionsToRemove = this.activeConditions
      .filter(c => !['Curse', 'Disease'].includes(getCondition(c.name)?.severity || ''))
      .map(c => c.name);

    return {
      newHitPoints: this.character.maxHitPoints,
      clearedConditions: conditionsToRemove,
    };
  }

  private getClassHitDie(): number {
    const hitDice: Record<string, number> = {
      Barbarian: 12, Bard: 8, Cleric: 8, Druid: 8, Fighter: 10, Monk: 8,
      Paladin: 10, Ranger: 10, Rogue: 8, Sorcerer: 6, Warlock: 8, Wizard: 6
    };
    return hitDice[this.character.class] || 8;
  }
}

// Factory function
export function createCharacterCombat(character: Character): CharacterCombat {
  return new CharacterCombat(character);
}

// Utility functions for combat calculations
export function calculateDamageReduction(character: Character, damageAmount: number) {
  const combat = createCharacterCombat(character);
  return combat.takeDamage(damageAmount);
}

export function canTakeActions(character: Character): boolean {
  const combat = createCharacterCombat(character);
  return !combat.isUnconscious && !combat.conditionEffects.cannotTakeActions;
}

export function getMovementSpeed(character: Character, baseSpeed: number): number {
  const combat = createCharacterCombat(character);
  if (combat.conditionEffects.speedReduced) {
    return 0;
  }
  
  // Could add other speed modifications here (conditions, spells, etc.)
  return baseSpeed;
} 