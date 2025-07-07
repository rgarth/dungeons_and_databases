// Ki Point Management Service for Monks
// Based on D&D 5e Monk class mechanics

export interface KiPointState {
  total: number;    // Total ki points (equal to monk level)
  used: number;     // Ki points spent this short rest
  available: number; // Remaining ki points
}

export interface KiAbility {
  name: string;
  description: string;
  kiCost: number;
  type: 'bonus-action' | 'free-action' | 'reaction';
  requirements?: string;
}

export class KiPointService {
  /**
   * Calculate total ki points for a monk (equal to monk level)
   */
  static getTotalKiPoints(monkLevel: number): number {
    return monkLevel;
  }

  /**
   * Get current ki point state
   */
  static getKiPointState(total: number, used: number): KiPointState {
    return {
      total,
      used,
      available: Math.max(0, total - used)
    };
  }

  /**
   * Check if a ki ability can be used
   */
  static canUseKiAbility(state: KiPointState, kiCost: number): boolean {
    return state.available >= kiCost;
  }

  /**
   * Calculate new used ki points after using an ability
   */
  static calculateUsedKiPoints(currentUsed: number, kiCost: number, totalKi: number): number | null {
    const newUsed = currentUsed + kiCost;
    if (newUsed > totalKi) {
      return null; // Not enough ki points
    }
    return newUsed;
  }

  /**
   * Recover ki points (on short rest)
   */
  static recoverKiPoints(): number {
    return 0; // Reset to 0 on short rest
  }

  /**
   * Get standard monk ki abilities
   */
  static getStandardKiAbilities(): KiAbility[] {
    return [
      {
        name: "Flurry of Blows",
        description: "Make 2 unarmed strikes as a bonus action",
        kiCost: 1,
        type: 'bonus-action',
        requirements: "Must take the Attack action on your turn"
      },
      {
        name: "Patient Defense",
        description: "Take the Dodge action as a bonus action",
        kiCost: 1,
        type: 'bonus-action'
      },
      {
        name: "Step of the Wind",
        description: "Take the Dash or Disengage action as a bonus action",
        kiCost: 1,
        type: 'bonus-action'
      },
      {
        name: "Stunning Strike",
        description: "When you hit with a melee weapon attack, force target to make CON save or be stunned until end of your next turn",
        kiCost: 1,
        type: 'free-action',
        requirements: "Must hit with a melee weapon attack"
      }
    ];
  }

  /**
   * Get unarmed strike damage die based on monk level
   */
  static getUnarmedStrikeDamage(monkLevel: number): string {
    if (monkLevel >= 17) return "1d10";
    if (monkLevel >= 11) return "1d8";
    if (monkLevel >= 5) return "1d6";
    return "1d4";
  }

  /**
   * Get unarmed strike weapon data
   */
  static getUnarmedStrikeWeapon(monkLevel: number) {
    return {
      name: "Unarmed Strike",
      type: "Melee",
      category: "Simple",
      damage: this.getUnarmedStrikeDamage(monkLevel),
      damageType: "Bludgeoning",
      properties: ["Light"],
      weight: 0,
      cost: "0 gp",
      description: "Your martial arts training allows you to strike with deadly precision"
    };
  }
} 