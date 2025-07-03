import { MagicalItem } from '@/lib/dnd/magical-items';

// Potion effect data
export interface PotionEffect {
  dice?: string;
  bonus?: number;
  value?: number;
  description: string;
  type: 'healing' | 'stat' | 'resistance' | 'special';
}

// Dice roll result
export interface DiceRoll {
  roll: number;
  total: number;
}

// Magical item service for business logic
export class MagicalItemService {
  
  // Roll dice with specified sides and count
  rollDice(sides: number, count: number = 1): number[] {
    return Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);
  }

  // Get potion effects and dice based on name
  getPotionEffects(potion: MagicalItem): PotionEffect {
    const name = potion.name.toLowerCase();
    
    if (name.includes('healing')) {
      if (name.includes('greater')) {
        return { dice: '4d4', bonus: 4, description: 'Regain hit points', type: 'healing' };
      } else if (name.includes('superior')) {
        return { dice: '8d4', bonus: 8, description: 'Regain hit points', type: 'healing' };
      } else if (name.includes('supreme')) {
        return { dice: '10d4', bonus: 20, description: 'Regain hit points', type: 'healing' };
      } else {
        return { dice: '2d4', bonus: 2, description: 'Regain hit points', type: 'healing' };
      }
    } else if (name.includes('giant strength')) {
      if (name.includes('hill')) {
        return { value: 21, description: 'Strength becomes 21 for 1 hour', type: 'stat' };
      } else if (name.includes('stone') || name.includes('frost')) {
        return { value: 23, description: 'Strength becomes 23 for 1 hour', type: 'stat' };
      } else if (name.includes('fire')) {
        return { value: 25, description: 'Strength becomes 25 for 1 hour', type: 'stat' };
      } else if (name.includes('cloud')) {
        return { value: 27, description: 'Strength becomes 27 for 1 hour', type: 'stat' };
      } else if (name.includes('storm')) {
        return { value: 29, description: 'Strength becomes 29 for 1 hour', type: 'stat' };
      }
    } else if (name.includes('resistance')) {
      const damageType = name.includes('fire') ? 'fire' : 
                        name.includes('cold') ? 'cold' :
                        name.includes('acid') ? 'acid' :
                        name.includes('lightning') ? 'lightning' :
                        name.includes('thunder') ? 'thunder' : 'unknown';
      return { description: `Gain resistance to ${damageType} damage for 1 hour`, type: 'resistance' };
    }
    
    return { description: potion.description, type: 'special' };
  }

  // Roll for potion effects
  rollPotionEffects(potion: MagicalItem): DiceRoll | null {
    const effects = this.getPotionEffects(potion);
    
    if (!effects.dice) return null;
    
    const [count, sides] = effects.dice.split('d').map(Number);
    const rolls = this.rollDice(sides, count);
    const rollTotal = rolls.reduce((sum, roll) => sum + roll, 0);
    const total = rollTotal + (effects.bonus || 0);
    
    return { roll: rollTotal, total };
  }

  // Check if an item is consumable (single use)
  isConsumable(item: MagicalItem): boolean {
    const consumableTypes = ['Potion', 'Scroll', 'Consumable'];
    return consumableTypes.includes(item.type) || 
           item.name.toLowerCase().includes('potion') ||
           item.name.toLowerCase().includes('scroll');
  }

  // Get rarity color for display
  // DEPRECATED: Use getRarityColor from @/lib/theme-utils instead
  getRarityColor(rarity: string): string {
    switch (rarity) {
      case 'Common': return 'text-[var(--color-text-muted)]';
      case 'Uncommon': return 'text-[var(--color-success)]';
      case 'Rare': return 'text-[var(--color-accent)]';
      case 'Very Rare': return 'text-[var(--color-card-tertiary)]';
      case 'Legendary': return 'text-[var(--color-warning)]';
      case 'Artifact': return 'text-[var(--color-danger)]';
      default: return 'text-[var(--color-text-muted)]';
    }
  }

  // Get ordinal suffix for numbers (1st, 2nd, 3rd, etc.)
  getOrdinalSuffix(num: number): string {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return 'th';
    }
    
    switch (lastDigit) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  // Get spell scroll level color
  // DEPRECATED: Use getSpellLevelColor from @/lib/theme-utils instead
  getSpellLevelColor(level: number): string {
    switch (level) {
      case 0: return 'text-[var(--color-text-muted)]';
      case 1: return 'text-[var(--color-success)]';
      case 2: return 'text-[var(--color-accent)]';
      case 3: return 'text-[var(--color-card-tertiary)]';
      case 4: return 'text-[var(--color-warning)]';
      case 5: return 'text-[var(--color-danger)]';
      case 6: return 'text-[var(--color-success)]';
      case 7: return 'text-[var(--color-accent)]';
      case 8: return 'text-[var(--color-card-tertiary)]';
      case 9: return 'text-[var(--color-warning)]';
      default: return 'text-[var(--color-text-muted)]';
    }
  }

  // Validate item limits (for UI enforcement)
  validateItemLimits(
    currentCount: number, 
    maxCount: number, 
    itemType: string
  ): { canAdd: boolean; reason?: string } {
    if (currentCount >= maxCount) {
      return { 
        canAdd: false, 
        reason: `Maximum ${itemType} limit reached (${maxCount})` 
      };
    }
    return { canAdd: true };
  }
}

// Factory function
export function createMagicalItemService(): MagicalItemService {
  return new MagicalItemService();
} 