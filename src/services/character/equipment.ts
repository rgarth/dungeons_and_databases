import { getModifier, getProficiencyBonus } from '@/lib/dnd/core';
import { calculateArmorClass } from '@/lib/dnd/equipment';
import { canEquipWeapon, canEquipArmor } from '@/lib/dnd/combat';
import { Weapon, MagicalWeapon, Armor } from '@/lib/dnd/equipment';
import { getSpellsFromMagicalItems, EquippedMagicalItem, MagicalItem } from '@/lib/dnd/magical-items';

// Character interface (minimal for equipment calculations)
interface Character {
  id: string;
  class: string;
  level: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  spellcastingAbility?: string;
}

// Equipment calculations and effects service
export class CharacterEquipment {
  constructor(private character: Character) {}

  // Calculate weapon attack bonus
  getWeaponAttackBonus(weapon: Weapon | MagicalWeapon): number {
    const isProficient = canEquipWeapon(weapon, this.character.class);
    const abilityMod = weapon.category === 'Ranged' 
      ? getModifier(this.character.dexterity)
      : getModifier(this.character.strength);
    const profBonus = isProficient ? getProficiencyBonus(this.character.level) : 0;
    const magicalBonus = 'attackBonus' in weapon ? (weapon.attackBonus || 0) : 0;
    
    return abilityMod + profBonus + magicalBonus;
  }

  // Calculate weapon damage bonus
  getWeaponDamageBonus(weapon: Weapon | MagicalWeapon): number {
    const abilityMod = weapon.category === 'Ranged' 
      ? getModifier(this.character.dexterity)
      : getModifier(this.character.strength);
    const magicalBonus = 'damageBonus' in weapon ? (weapon.damageBonus || 0) : 0;
    
    return abilityMod + magicalBonus;
  }

  // Get weapon damage dice with modifiers
  getWeaponDamageString(weapon: Weapon | MagicalWeapon): string {
    const damageBonus = this.getWeaponDamageBonus(weapon);
    const bonusText = damageBonus > 0 ? `+${damageBonus}` : damageBonus < 0 ? `${damageBonus}` : '';
    return `${weapon.damage}${bonusText}`;
  }

  // Check if character can use a weapon
  canUseWeapon(weapon: Weapon | MagicalWeapon): boolean {
    return canEquipWeapon(weapon, this.character.class);
  }

  // Check if character can wear armor
  canWearArmor(armor: Armor): boolean {
    return canEquipArmor(armor.type, this.character.class);
  }

  // Calculate AC with equipped armor
  calculateArmorClass(equippedArmor: Armor[]): number {
    return calculateArmorClass(equippedArmor, this.character.dexterity);
  }

  // Get spells from equipped magical items
  getMagicalItemSpells(
    equippedMagicalItems: EquippedMagicalItem[],
    inventoryMagicalItems?: MagicalItem[]
  ) {
    // Get spells from equipped items
    const equippedSpells = getSpellsFromMagicalItems(
      equippedMagicalItems || [],
      this.character.class,
      this.character.level
    );

    // Get spell scrolls from inventory
    const scrollSpells = (inventoryMagicalItems || [])
      .filter(item => item.type === 'Scroll')
      .map((scroll, index) => {
        // Extract spell info from scroll
        const spellEffect = scroll.effects.find(effect => effect.type === 'spell_effect');
        return {
          scrollIndex: index,
          item: scroll,
          spellName: spellEffect?.target || 'Unknown Spell',
        };
      });

    return {
      equipped: equippedSpells,
      scrolls: scrollSpells,
    };
  }

  // Get weapon statistics for display
  getWeaponStats(weapon: Weapon | MagicalWeapon) {
    const attackBonus = this.getWeaponAttackBonus(weapon);
    const damageString = this.getWeaponDamageString(weapon);
    const isProficient = this.canUseWeapon(weapon);
    const isMagical = 'magicalName' in weapon;

    return {
      name: weapon.name,
      attackBonus,
      damageString,
      damageType: weapon.damageType,
      properties: weapon.properties,
      category: weapon.category,
      isProficient,
      isMagical,
      rarity: isMagical ? (weapon as MagicalWeapon).rarity : undefined,
    };
  }

  // Get armor statistics for display
  getArmorStats(armor: Armor) {
    const canWear = this.canWearArmor(armor);
    const baseAC = armor.baseAC;
    const maxDexBonus = armor.maxDexBonus;
    
    // Calculate AC contribution
    let acContribution = baseAC;
    if (maxDexBonus !== undefined) {
      acContribution += Math.min(getModifier(this.character.dexterity), maxDexBonus);
    } else {
      acContribution += getModifier(this.character.dexterity);
    }

    return {
      name: armor.name,
      type: armor.type,
      acContribution,
      baseAC,
      maxDexBonus,
      canWear,
      stealthDisadvantage: armor.stealthDisadvantage,
    };
  }

  // Get all equipped weapon stats
  getEquippedWeaponStats(equippedWeapons: (Weapon | MagicalWeapon)[]): ReturnType<typeof this.getWeaponStats>[] {
    return equippedWeapons.map(weapon => this.getWeaponStats(weapon));
  }

  // Get all equipped armor stats
  getEquippedArmorStats(equippedArmor: Armor[]): ReturnType<typeof this.getArmorStats>[] {
    return equippedArmor.map(armor => this.getArmorStats(armor));
  }

  // Calculate total weight carried (for future encumbrance rules)
  // TODO: Implement when weight/encumbrance system is added
}

// Factory function
export function createCharacterEquipment(character: Character): CharacterEquipment {
  return new CharacterEquipment(character);
}

// Utility functions for equipment
export function canCharacterUseWeapon(character: Character, weapon: Weapon | MagicalWeapon): boolean {
  const equipment = createCharacterEquipment(character);
  return equipment.canUseWeapon(weapon);
}

export function canCharacterWearArmor(character: Character, armor: Armor): boolean {
  const equipment = createCharacterEquipment(character);
  return equipment.canWearArmor(armor);
}

export function calculateCharacterAC(character: Character, equippedArmor: Armor[]): number {
  const equipment = createCharacterEquipment(character);
  return equipment.calculateArmorClass(equippedArmor);
} 