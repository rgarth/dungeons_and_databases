import { getModifier } from '@/lib/dnd/core';
import { getHitDie, canPrepareSpells } from '@/lib/dnd/level-up';
import type { Spell } from '@/lib/dnd/spells';

// Centralized character damage/healing interface
interface CharacterHPData {
  id: string;
  class: string;
  hitPoints: number;
  maxHitPoints: number;
  temporaryHitPoints?: number;
  constitution: number;
  deathSaveSuccesses?: boolean[];
  deathSaveFailures?: boolean[];
}

// Damage/healing result
interface DamageResult {
  newHitPoints: number;
  newTemporaryHitPoints: number;
  damageToHP: number;
  damageToTempHP: number;
  deathSaveResets?: boolean;
}

interface HealingResult {
  newHitPoints: number;
  healingApplied: number;
  deathSaveResets?: boolean;
}

interface RestResult {
  newHitPoints: number;
  hitPointsGained: number;
  spellsPrepared?: Spell[];
  message: string;
}

interface DeathSaveResult {
  newSuccesses: boolean[];
  newFailures: boolean[];
  autoStabilize?: {
    newHitPoints: number;
    newSuccesses: boolean[];
    newFailures: boolean[];
  };
}

export class CharacterDamageService {
  constructor(private character: CharacterHPData) {}

  /**
   * Apply damage following D&D 5e rules:
   * 1. Temporary HP is consumed first
   * 2. Remaining damage goes to regular HP
   * 3. Death saves are reset if healed above 0 HP
   */
  takeDamage(amount: number): DamageResult {
    if (amount <= 0) {
      return {
        newHitPoints: this.character.hitPoints,
        newTemporaryHitPoints: this.character.temporaryHitPoints || 0,
        damageToHP: 0,
        damageToTempHP: 0,
      };
    }

    let tempHP = this.character.temporaryHitPoints || 0;
    let currentHP = this.character.hitPoints;
    let remainingDamage = amount;

    // Damage temp HP first (D&D 5e rule)
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

  /**
   * Apply healing following D&D 5e rules:
   * 1. Healing goes directly to regular HP (not temp HP)
   * 2. Cannot exceed max HP
   * 3. Any healing above 0 HP resets death saves
   */
  heal(amount: number): HealingResult {
    if (amount <= 0) {
      return {
        newHitPoints: this.character.hitPoints,
        healingApplied: 0,
      };
    }

    const maxPossibleHealing = this.character.maxHitPoints - this.character.hitPoints;
    const actualHealing = Math.min(amount, maxPossibleHealing);
    const newHP = this.character.hitPoints + actualHealing;

    // If character was at 0 HP and is now healed, reset death saves
    const deathSaveResets = this.character.hitPoints === 0 && newHP > 0;

    return {
      newHitPoints: newHP,
      healingApplied: actualHealing,
      deathSaveResets,
    };
  }

  /**
   * Handle temporary HP changes
   * Temp HP doesn't stack - new value replaces old if higher
   */
  setTemporaryHP(amount: number): number {
    const currentTempHP = this.character.temporaryHitPoints || 0;
    return Math.max(currentTempHP, Math.max(0, amount));
  }

  /**
   * Adjust temporary HP by a delta amount
   */
  adjustTemporaryHP(change: number): number {
    const currentTempHP = this.character.temporaryHitPoints || 0;
    return Math.max(0, currentTempHP + change);
  }

  /**
   * Handle death save changes with auto-stabilization
   */
  updateDeathSaves(
    type: 'success' | 'failure',
    index: number
  ): DeathSaveResult {
    const currentSuccesses = this.character.deathSaveSuccesses || [false, false, false];
    const currentFailures = this.character.deathSaveFailures || [false, false, false];

    if (type === 'success') {
      const newSuccesses = [...currentSuccesses];
      newSuccesses[index] = !newSuccesses[index];
      
      // Auto-stabilize at 3 successes
      if (newSuccesses.filter(Boolean).length >= 3) {
        return {
          newSuccesses,
          newFailures: currentFailures,
          autoStabilize: {
            newHitPoints: 1,
            newSuccesses: [false, false, false],
            newFailures: [false, false, false],
          },
        };
      }

      return {
        newSuccesses,
        newFailures: currentFailures,
      };
    } else {
      const newFailures = [...currentFailures];
      newFailures[index] = !newFailures[index];
      
      return {
        newSuccesses: currentSuccesses,
        newFailures,
      };
    }
  }

  /**
   * Short rest recovery (D&D 5e rules)
   */
  shortRest(): RestResult {
    const currentHp = this.character.hitPoints;
    const maxHp = this.character.maxHitPoints;
    
    if (currentHp >= maxHp) {
      return {
        newHitPoints: currentHp,
        hitPointsGained: 0,
        message: "You're already at full health!",
      };
    }
    
    // Calculate potential HP recovery (using average of hit die + CON modifier)
    const hitDie = getHitDie(this.character.class);
    const conModifier = getModifier(this.character.constitution);
    const averageRecovery = Math.floor(hitDie / 2) + 1 + conModifier;
    const maxRecovery = Math.floor(maxHp / 2); // Can't exceed half max HP from short rest
    const actualRecovery = Math.min(averageRecovery, maxRecovery, maxHp - currentHp);
    
    const newHp = Math.min(maxHp, currentHp + actualRecovery);
    
    return {
      newHitPoints: newHp,
      hitPointsGained: actualRecovery,
      message: `Short Rest completed! Recovered ${actualRecovery} hit points.`,
    };
  }

  /**
   * Long rest recovery (D&D 5e rules)
   */
  longRest(): RestResult {
    // For classes that prepare spells daily, clear prepared spells so they can choose new ones
    const needsSpellPrep = canPrepareSpells(this.character.class);
    const spellsPrepared = needsSpellPrep ? [] : undefined;
    
    // Show appropriate message based on whether they need to prepare spells
    const message = needsSpellPrep 
      ? "Long Rest completed! Hit points fully restored and prepared spells cleared. Choose your spells for the new day!"
      : "Long Rest completed! Hit points and spell slots fully restored.";
    
    return {
      newHitPoints: this.character.maxHitPoints,
      hitPointsGained: this.character.maxHitPoints - this.character.hitPoints,
      spellsPrepared,
      message,
    };
  }

  /**
   * Check if character is unconscious (0 HP)
   */
  get isUnconscious(): boolean {
    return this.character.hitPoints === 0;
  }

  /**
   * Check if character is dead (3 death save failures)
   */
  get isDead(): boolean {
    const failures = this.character.deathSaveFailures || [false, false, false];
    return failures.filter(Boolean).length >= 3;
  }

  /**
   * Check if character is stabilized (3 death save successes)
   */
  get isStabilized(): boolean {
    const successes = this.character.deathSaveSuccesses || [false, false, false];
    return successes.filter(Boolean).length >= 3;
  }

  /**
   * Get effective HP (including temporary)
   */
  get effectiveHP(): number {
    return this.character.hitPoints + (this.character.temporaryHitPoints || 0);
  }
}

// Factory function for easy use
export function createDamageService(character: CharacterHPData): CharacterDamageService {
  return new CharacterDamageService(character);
}

// Utility functions for components
export function applyDamage(character: CharacterHPData, amount: number): DamageResult {
  return createDamageService(character).takeDamage(amount);
}

export function applyHealing(character: CharacterHPData, amount: number): HealingResult {
  return createDamageService(character).heal(amount);
} 