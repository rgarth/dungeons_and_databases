import { Spell } from '@/lib/dnd/spells';
import { getModifier } from '@/lib/dnd/core';

export interface SpellDiceRoll {
  attackRoll?: string;
  damageRoll?: string;
  healingRoll?: string;
  saveDC?: number;
  saveType?: string | null;
  damageType?: string | null;
  attackType?: 'melee' | 'ranged' | 'none';
  areaOfEffect?: {
    type: string;
    size: number;
    unit: string;
  };
  targets?: number;
  spellLevel: number;
  slotLevel: number;
}

export interface SpellSlotInfo {
  level: number;
  available: number;
  used: number;
}

export class SpellDiceService {
  constructor(
    private character: {
      level: number;
      spellcastingAbility?: string;
      spellSlots?: Record<number, number>;
      usedSpellSlots?: Record<number, number>;
      strength: number;
      dexterity: number;
      constitution: number;
      intelligence: number;
      wisdom: number;
      charisma: number;
    }
  ) {}

  /**
   * Get available spell slots for the character
   */
  getSpellSlots(): SpellSlotInfo[] {
    const slots: SpellSlotInfo[] = [];
    
    if (!this.character.spellSlots) return slots;

    for (let level = 1; level <= 9; level++) {
      const available = this.character.spellSlots[level] || 0;
      const used = this.character.usedSpellSlots?.[level] || 0;
      
      if (available > 0) {
        slots.push({
          level,
          available,
          used
        });
      }
    }

    return slots;
  }

  /**
   * Calculate spell attack bonus
   */
  getSpellAttackBonus(): number {
    if (!this.character.spellcastingAbility) return 0;
    
    const abilityScore = this.character[this.character.spellcastingAbility as keyof typeof this.character] as number;
    const abilityMod = getModifier(abilityScore);
    const proficiencyBonus = Math.floor((this.character.level - 1) / 4) + 2;
    
    return abilityMod + proficiencyBonus;
  }

  /**
   * Calculate spell save DC
   */
  getSpellSaveDC(): number {
    if (!this.character.spellcastingAbility) return 0;
    
    const abilityScore = this.character[this.character.spellcastingAbility as keyof typeof this.character] as number;
    const abilityMod = getModifier(abilityScore);
    const proficiencyBonus = Math.floor((this.character.level - 1) / 4) + 2;
    
    return 8 + abilityMod + proficiencyBonus;
  }

  /**
   * Get spellcasting ability modifier
   */
  getSpellcastingAbilityModifier(): number {
    if (!this.character.spellcastingAbility) return 0;
    
    const abilityScore = this.character[this.character.spellcastingAbility as keyof typeof this.character] as number;
    return getModifier(abilityScore);
  }

  /**
   * Check if a spell is an attack spell
   */
  isAttackSpell(spell: Spell): boolean {
    // Use the enhanced spell data if available
    if ('attackType' in spell && spell.attackType) {
      return spell.attackType === 'melee' || spell.attackType === 'ranged';
    }
    
    // Fallback to description parsing
    const description = spell.description.toLowerCase();
    return description.includes('make a ranged spell attack') || 
           description.includes('make a melee spell attack') ||
           description.includes('spell attack');
  }

  /**
   * Get damage dice for a spell at a specific slot level
   */
  getSpellDamage(spell: Spell, slotLevel: number): string | null {
    console.log(`🎲 Debug - getSpellDamage called for ${spell.name} at slot level ${slotLevel}`);
    console.log(`🎲 Debug - Spell has damageAtSlotLevel:`, 'damageAtSlotLevel' in spell && spell.damageAtSlotLevel);
    console.log(`🎲 Debug - Spell damageAtSlotLevel data:`, spell.damageAtSlotLevel);
    
    // Use enhanced spell data if available
    if ('damageAtSlotLevel' in spell && spell.damageAtSlotLevel) {
      const damageAtSlotLevel = spell.damageAtSlotLevel as Record<number, string>;
      // Find the highest available slot level up to the requested level
      let bestSlot = 1;
      for (let level = 1; level <= slotLevel; level++) {
        if (damageAtSlotLevel[level]) {
          bestSlot = level;
        }
      }
      const result = damageAtSlotLevel[bestSlot] || null;
      console.log(`🎲 Debug - Using damageAtSlotLevel for ${spell.name}: "${result}"`);
      
      // Validate that the result is actually a valid dice notation
      if (result) {
        const dicePattern = /^\d+d\d+(\+\d+)?$/;
        if (!dicePattern.test(result)) {
          console.error(`🎲 Error - Invalid dice notation in damageAtSlotLevel: "${result}"`);
          return null;
        }
      }
      
      return result;
    }

    // Fallback to description parsing for basic damage
    const description = spell.description;
    console.log(`🎲 Debug - Parsing description for ${spell.name}: "${description}"`);
    
    // Simple pattern to find dice notation followed by damage type
    const damagePattern = /(\d+d\d+)\s+(fire|cold|lightning|thunder|acid|poison|necrotic|radiant|force|psychic|bludgeoning|piercing|slashing)\s+damage/gi;
    let match;
    
    while ((match = damagePattern.exec(description)) !== null) {
      console.log(`🎲 Debug - Found damage match:`, match);
      if (match[1]) {
        const diceNotation = match[1].trim();
        console.log(`🎲 Debug - Dice notation: "${diceNotation}"`);
        
        // Validate that the dice notation is actually a valid dice notation
        const dicePattern = /^\d+d\d+(\+\d+)?$/;
        if (dicePattern.test(diceNotation)) {
          return diceNotation;
        } else {
          console.error(`🎲 Error - Invalid dice notation: "${diceNotation}"`);
        }
      }
    }
    
    // Try simpler pattern for just "XdY damage"
    const simplePattern = /(\d+d\d+)\s+damage/gi;
    while ((match = simplePattern.exec(description)) !== null) {
      console.log(`🎲 Debug - Found simple damage match:`, match);
      if (match[1]) {
        const diceNotation = match[1].trim();
        console.log(`🎲 Debug - Simple dice notation: "${diceNotation}"`);
        
        // Validate that the dice notation is actually a valid dice notation
        const dicePattern = /^\d+d\d+(\+\d+)?$/;
        if (dicePattern.test(diceNotation)) {
          return diceNotation;
        } else {
          console.error(`🎲 Error - Invalid simple dice notation: "${diceNotation}"`);
        }
      }
    }

    console.log(`🎲 Debug - No damage pattern found for ${spell.name}`);
    return null;
  }

  /**
   * Get healing dice for a spell at a specific slot level
   */
  getSpellHealing(spell: Spell, slotLevel: number): string | null {
    // Use enhanced spell data if available
    if ('healAtSlotLevel' in spell && spell.healAtSlotLevel) {
      const healAtSlotLevel = spell.healAtSlotLevel as Record<number, string>;
      // Find the highest available slot level up to the requested level
      let bestSlot = 1;
      for (let level = 1; level <= slotLevel; level++) {
        if (healAtSlotLevel[level]) {
          bestSlot = level;
        }
      }
      return healAtSlotLevel[bestSlot] || null;
    }

    // Fallback to description parsing for basic healing
    const description = spell.description;
    const healingPatterns = [
      /regains\s+(\d+d\d+)\s+hit\s+points/gi,
      /heals\s+(\d+d\d+)\s+hit\s+points/gi,
      /(\d+d\d+)\s+healing/gi
    ];

    for (const pattern of healingPatterns) {
      const match = description.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return null;
  }

  /**
   * Get number of targets for a spell at a specific slot level
   */
  getSpellTargets(spell: Spell, slotLevel: number): number | null {
    // Use enhanced spell data if available
    if ('targetsAtSlotLevel' in spell && spell.targetsAtSlotLevel) {
      const targetsAtSlotLevel = spell.targetsAtSlotLevel as Record<number, number>;
      // Find the highest available slot level up to the requested level
      let bestSlot = 1;
      for (let level = 1; level <= slotLevel; level++) {
        if (targetsAtSlotLevel[level]) {
          bestSlot = level;
        }
      }
      return targetsAtSlotLevel[bestSlot] || null;
    }

    return null;
  }

  /**
   * Calculate all dice rolls for a spell
   */
  calculateSpellRolls(spell: Spell, slotLevel: number = spell.level): SpellDiceRoll {
    const spellAttackBonus = this.getSpellAttackBonus();
    const spellSaveDC = this.getSpellSaveDC();
    const abilityMod = this.getSpellcastingAbilityModifier();
    
    const result: SpellDiceRoll = {
      spellLevel: spell.level,
      slotLevel
    };

    // Attack rolls for attack spells
    if (this.isAttackSpell(spell)) {
      result.attackRoll = `1d20${spellAttackBonus >= 0 ? '+' : ''}${spellAttackBonus}`;
      result.attackType = 'attackType' in spell ? spell.attackType : 'ranged';
    }

    // Save DC for save spells
    if ('saveType' in spell && spell.saveType) {
      result.saveDC = spellSaveDC;
      result.saveType = spell.saveType;
    }

    // Damage rolls
    const damageDice = this.getSpellDamage(spell, slotLevel);
    if (damageDice) {
      console.log(`🎲 Debug - Raw damageDice for ${spell.name}: "${damageDice}"`);
      console.log(`🎲 Debug - Ability modifier: ${abilityMod}`);
      
      // Check if the damage includes ability modifier
      if (damageDice.includes('+')) {
        result.damageRoll = damageDice; // Already includes modifier
        console.log(`🎲 Debug - Damage already includes modifier: "${result.damageRoll}"`);
      } else {
        result.damageRoll = `${damageDice}${abilityMod >= 0 ? '+' : ''}${abilityMod}`;
        console.log(`🎲 Debug - Added ability modifier: "${result.damageRoll}"`);
      }
      result.damageType = 'damageType' in spell ? spell.damageType : null;
    }

    // Healing rolls
    const healingDice = this.getSpellHealing(spell, slotLevel);
    if (healingDice) {
      if (healingDice.includes('+')) {
        result.healingRoll = healingDice; // Already includes modifier
      } else {
        result.healingRoll = `${healingDice}${abilityMod >= 0 ? '+' : ''}${abilityMod}`;
      }
    }

    // Area of effect
    if ('areaOfEffect' in spell && spell.areaOfEffect) {
      result.areaOfEffect = spell.areaOfEffect;
    }

    // Number of targets
    const targets = this.getSpellTargets(spell, slotLevel);
    if (targets) {
      result.targets = targets;
    }

    return result;
  }

  /**
   * Get available slot levels for a spell
   */
  getAvailableSlotLevels(spell: Spell): number[] {
    const slots = this.getSpellSlots();
    const availableLevels: number[] = [];

    // Always include the spell's base level if it's a cantrip or if we have slots
    if (spell.level === 0) {
      availableLevels.push(0);
    } else {
      // Add the base level if we have slots for it
      const baseSlot = slots.find(s => s.level === spell.level);
      if (baseSlot && baseSlot.available > baseSlot.used) {
        availableLevels.push(spell.level);
      }
    }

    // Add higher levels if the spell can be upcast and we have slots
    if (spell.level > 0) {
      for (const slot of slots) {
        if (slot.level > spell.level && slot.available > slot.used) {
          availableLevels.push(slot.level);
        }
      }
    }

    return availableLevels.sort((a, b) => a - b);
  }
}

export function createSpellDiceService(character: {
  level: number;
  spellcastingAbility?: string;
  spellSlots?: Record<number, number>;
  usedSpellSlots?: Record<number, number>;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}): SpellDiceService {
  return new SpellDiceService(character);
} 