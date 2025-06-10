// D&D 5e Equipment Rules and Validation System
import { Weapon, MagicalWeapon, Armor } from './equipment';

export interface EquipmentConflict {
  type: 'proficiency' | 'wielding' | 'slot' | 'requirement';
  severity: 'error' | 'warning';
  message: string;
  conflictingItems?: string[];
}

export interface EquipmentValidationResult {
  canEquip: boolean;
  canAdd: boolean; // New: can always add to inventory
  conflicts: EquipmentConflict[];
  warnings: EquipmentConflict[];
}

export interface ClassProficiencies {
  armor: string[];
  weapons: {
    simple: boolean;
    martial: boolean;
    specific: string[];
  };
  savingThrows: string[];
}

// Cache for proficiencies to avoid repeated API calls
const proficiencyCache: { [className: string]: ClassProficiencies } = {};

/**
 * Core D&D 5e Equipment Rules Engine
 * Validates equipment compatibility and enforces game rules
 */
export class EquipmentRulesEngine {
  private character: {
    class: string;
    level: number;
    strength: number;
    dexterity: number;
  };

  constructor(character: { class: string; level: number; strength: number; dexterity: number }) {
    this.character = character;
  }

  /**
   * Validate if a weapon can be equipped/added given current equipment
   */
  async validateWeaponEquip(
    weaponToEquip: Weapon | MagicalWeapon,
    currentEquippedWeapons: (Weapon | MagicalWeapon)[],
    currentEquippedArmor: Armor[],
    isEquipping: boolean = true // New parameter to distinguish equipping vs adding to inventory
  ): Promise<EquipmentValidationResult> {
    const conflicts: EquipmentConflict[] = [];
    const warnings: EquipmentConflict[] = [];

    // 1. Check weapon proficiency
    const proficiencyCheck = await this.checkWeaponProficiency(weaponToEquip);
    if (!proficiencyCheck.canUse) {
      warnings.push({
        type: 'proficiency',
        severity: 'warning',
        message: `Not proficient with ${weaponToEquip.name}. You won't get proficiency bonus to attacks.`,
      });
    }

    // Only check equipping conflicts if actually equipping (not just adding to inventory)
    if (isEquipping) {
      // 2. Check hand/wielding conflicts
      const handConflicts = this.checkHandConflicts(weaponToEquip, currentEquippedWeapons, currentEquippedArmor);
      conflicts.push(...handConflicts.errors);
      warnings.push(...handConflicts.warnings);

      // 3. Check ranged weapon conflicts
      const rangedConflicts = this.checkRangedWeaponConflicts(weaponToEquip, currentEquippedWeapons);
      conflicts.push(...rangedConflicts);
    }

    return {
      canEquip: conflicts.filter(c => c.severity === 'error').length === 0,
      canAdd: true, // Can always add to inventory
      conflicts: conflicts,
      warnings: warnings
    };
  }

  /**
   * Validate if armor can be equipped/added
   */
  async validateArmorEquip(
    armorToEquip: Armor,
    currentEquippedArmor: Armor[],
    isEquipping: boolean = true
  ): Promise<EquipmentValidationResult> {
    const conflicts: EquipmentConflict[] = [];
    const warnings: EquipmentConflict[] = [];

    // 1. Check armor proficiency
    const proficiencyCheck = await this.checkArmorProficiency(armorToEquip);
    if (!proficiencyCheck.canWear) {
      if (isEquipping) {
        conflicts.push({
          type: 'proficiency',
          severity: 'error',
          message: `Not proficient with ${armorToEquip.type} armor. Cannot wear ${armorToEquip.name}.`,
        });
      } else {
        warnings.push({
          type: 'proficiency',
          severity: 'warning',
          message: `Not proficient with ${armorToEquip.type} armor. You can carry it but can't wear it effectively.`,
        });
      }
    }

    // Only check equipping conflicts if actually equipping
    if (isEquipping) {
      // 2. Check strength requirements
      if (armorToEquip.minStrength && this.character.strength < armorToEquip.minStrength) {
        conflicts.push({
          type: 'requirement',
          severity: 'error',
          message: `Requires ${armorToEquip.minStrength} Strength to wear ${armorToEquip.name} (you have ${this.character.strength}).`,
        });
      }

      // 3. Check armor slot conflicts
      const slotConflicts = this.checkArmorSlotConflicts(armorToEquip, currentEquippedArmor);
      conflicts.push(...slotConflicts);
    }

    return {
      canEquip: conflicts.filter(c => c.severity === 'error').length === 0,
      canAdd: true, // Can always add to inventory
      conflicts: conflicts,
      warnings: warnings
    };
  }

  /**
   * Check weapon proficiency using API
   */
  private async checkWeaponProficiency(weapon: Weapon | MagicalWeapon): Promise<{ canUse: boolean; reason?: string }> {
    try {
      const proficiencies = await this.getClassProficiencies();
      if (!proficiencies) {
        return { canUse: false, reason: 'Class proficiencies not found' };
      }

      // Ensure weapons proficiency structure exists
      if (!proficiencies.weapons) {
        console.error('Weapons proficiencies not found in response:', proficiencies);
        return { canUse: false, reason: 'Weapons proficiencies not available' };
      }

      // Check weapon type proficiency (Simple/Martial)
      if (weapon.type === 'Simple' && proficiencies.weapons.simple) {
        return { canUse: true };
      }
      if (weapon.type === 'Martial' && proficiencies.weapons.martial) {
        return { canUse: true };
      }

      // Check specific weapon proficiency
      if (proficiencies.weapons.specific && proficiencies.weapons.specific.includes(weapon.name)) {
        return { canUse: true };
      }

      return { canUse: false, reason: `No proficiency with ${weapon.type} weapons or ${weapon.name}` };
    } catch (error) {
      console.error('Error checking weapon proficiency:', error);
      return { canUse: false, reason: 'Error checking proficiency' };
    }
  }

  /**
   * Check armor proficiency using API
   */
  private async checkArmorProficiency(armor: Armor): Promise<{ canWear: boolean; reason?: string }> {
    try {
      const proficiencies = await this.getClassProficiencies();
      if (!proficiencies) {
        return { canWear: false, reason: 'Class proficiencies not found' };
      }

      // Ensure armor proficiency structure exists
      if (!proficiencies.armor || !Array.isArray(proficiencies.armor)) {
        console.error('Armor proficiencies not found in response:', proficiencies);
        return { canWear: false, reason: 'Armor proficiencies not available' };
      }

      const canWear = proficiencies.armor.includes(armor.type);
      return { 
        canWear, 
        reason: canWear ? undefined : `No proficiency with ${armor.type} armor` 
      };
    } catch (error) {
      console.error('Error checking armor proficiency:', error);
      return { canWear: false, reason: 'Error checking proficiency' };
    }
  }

  /**
   * Get class proficiencies via API with caching
   */
  private async getClassProficiencies(): Promise<ClassProficiencies | null> {
    // Check cache first
    if (proficiencyCache[this.character.class]) {
      return proficiencyCache[this.character.class];
    }

    try {
      const response = await fetch(`/api/class-proficiencies?className=${encodeURIComponent(this.character.class)}&includeArmor=true`);
      if (!response.ok) {
        throw new Error('Failed to fetch proficiencies');
      }
      
      const proficiencies = await response.json();
      
      // Validate the response structure
      if (!proficiencies || typeof proficiencies !== 'object') {
        console.error('Invalid proficiencies response:', proficiencies);
        return null;
      }

      // Ensure the expected structure exists
      const validProficiencies: ClassProficiencies = {
        armor: proficiencies.armor || [],
        weapons: {
          simple: proficiencies.weapons?.simple || false,
          martial: proficiencies.weapons?.martial || false,
          specific: proficiencies.weapons?.specific || []
        },
        savingThrows: proficiencies.savingThrows || []
      };
      
      // Cache the result
      proficiencyCache[this.character.class] = validProficiencies;
      
      return validProficiencies;
    } catch (error) {
      console.error('Error fetching class proficiencies:', error);
      return null;
    }
  }

  /**
   * Check hand/wielding conflicts based on D&D 5e rules
   */
  private checkHandConflicts(
    newWeapon: Weapon | MagicalWeapon,
    currentWeapons: (Weapon | MagicalWeapon)[],
    currentArmor: Armor[]
  ): { errors: EquipmentConflict[]; warnings: EquipmentConflict[] } {
    const errors: EquipmentConflict[] = [];
    const warnings: EquipmentConflict[] = [];

    const hasShield = currentArmor.some(armor => armor.type === 'Shield');
    const newWeaponIsTwoHanded = this.isTwoHanded(newWeapon);
    const currentTwoHandedWeapons = currentWeapons.filter(w => this.isTwoHanded(w));
    const currentOneHandedWeapons = currentWeapons.filter(w => !this.isTwoHanded(w));

    // Rule 1: Two-handed weapon + Shield conflict
    if (newWeaponIsTwoHanded && hasShield) {
      errors.push({
        type: 'wielding',
        severity: 'error',
        message: `Cannot use ${newWeapon.name} (two-handed) while wielding a shield. Must unequip shield first.`,
        conflictingItems: [newWeapon.name, 'Shield']
      });
    }

    // Rule 2: Two-handed weapon + any other weapon conflict
    if (newWeaponIsTwoHanded && currentWeapons.length > 0) {
      errors.push({
        type: 'wielding',
        severity: 'error',
        message: `Cannot equip ${newWeapon.name} (two-handed) while holding other weapons. Must unequip: ${currentWeapons.map(w => w.name).join(', ')}.`,
        conflictingItems: [newWeapon.name, ...currentWeapons.map(w => w.name)]
      });
    }

    // Rule 3: Adding weapon when already have two-handed weapon
    if (!newWeaponIsTwoHanded && currentTwoHandedWeapons.length > 0) {
      errors.push({
        type: 'wielding',
        severity: 'error',
        message: `Cannot equip ${newWeapon.name} while using two-handed weapon: ${currentTwoHandedWeapons.map(w => w.name).join(', ')}.`,
        conflictingItems: [newWeapon.name, ...currentTwoHandedWeapons.map(w => w.name)]
      });
    }

    // Rule 4: Hand limits (2 hands total)
    if (!newWeaponIsTwoHanded && currentOneHandedWeapons.length >= 2) {
      errors.push({
        type: 'wielding',
        severity: 'error',
        message: `Cannot equip ${newWeapon.name}. Already holding maximum weapons (2 hands occupied).`,
        conflictingItems: [newWeapon.name, ...currentOneHandedWeapons.map(w => w.name)]
      });
    }

    // Rule 5: Dual wielding warnings (should use Light weapons for bonus action)
    if (!newWeaponIsTwoHanded && currentOneHandedWeapons.length === 1) {
      const otherWeapon = currentOneHandedWeapons[0];
      if (!this.isLight(newWeapon) || !this.isLight(otherWeapon)) {
        warnings.push({
          type: 'wielding',
          severity: 'warning',
          message: `Dual wielding works best with Light weapons. For bonus action attacks, both weapons should have the Light property.`,
          conflictingItems: [newWeapon.name, otherWeapon.name]
        });
      }
    }

    return { errors, warnings };
  }

  /**
   * Check ranged weapon conflicts (can't use bow and crossbow simultaneously)
   */
  private checkRangedWeaponConflicts(
    newWeapon: Weapon | MagicalWeapon,
    currentWeapons: (Weapon | MagicalWeapon)[]
  ): EquipmentConflict[] {
    const conflicts: EquipmentConflict[] = [];
    
    const isNewWeaponRanged = newWeapon.properties?.some(prop => 
      prop.includes('Ammunition') || prop.includes('Thrown')
    );
    
    if (isNewWeaponRanged) {
      const conflictingRanged = currentWeapons.filter(weapon => 
        weapon.properties?.some(prop => 
          prop.includes('Ammunition') || prop.includes('Thrown')
        ) && weapon.name !== newWeapon.name
      );
      
      if (conflictingRanged.length > 0) {
        conflicts.push({
          type: 'wielding',
          severity: 'error',
          message: `Cannot equip multiple ranged weapons. Unequip: ${conflictingRanged.map(w => w.name).join(', ')}.`,
          conflictingItems: [newWeapon.name, ...conflictingRanged.map(w => w.name)]
        });
      }
    }
    
    return conflicts;
  }

  /**
   * Check armor slot conflicts (only one body armor, one shield)
   */
  private checkArmorSlotConflicts(
    newArmor: Armor,
    currentArmor: Armor[]
  ): EquipmentConflict[] {
    const conflicts: EquipmentConflict[] = [];
    
    if (newArmor.type === 'Shield') {
      const existingShields = currentArmor.filter(armor => armor.type === 'Shield');
      if (existingShields.length > 0) {
        conflicts.push({
          type: 'slot',
          severity: 'error',
          message: `Can only equip one shield. Unequip: ${existingShields.map(a => a.name).join(', ')}.`,
          conflictingItems: [newArmor.name, ...existingShields.map(a => a.name)]
        });
      }
    } else {
      // Body armor conflict (Light, Medium, Heavy)
      const existingBodyArmor = currentArmor.filter(armor => 
        armor.type === 'Light' || armor.type === 'Medium' || armor.type === 'Heavy'
      );
      if (existingBodyArmor.length > 0) {
        conflicts.push({
          type: 'slot',
          severity: 'error',
          message: `Can only wear one body armor. Unequip: ${existingBodyArmor.map(a => a.name).join(', ')}.`,
          conflictingItems: [newArmor.name, ...existingBodyArmor.map(a => a.name)]
        });
      }
    }
    
    return conflicts;
  }

  // Utility methods remain the same
  private isTwoHanded(weapon: Weapon | MagicalWeapon): boolean {
    return weapon.properties?.some(prop => prop.includes('Two-handed')) || false;
  }

  private isLight(weapon: Weapon | MagicalWeapon): boolean {
    return weapon.properties?.some(prop => prop === 'Light') || false;
  }

  private isVersatile(weapon: Weapon | MagicalWeapon): boolean {
    return weapon.properties?.some(prop => prop.includes('Versatile')) || false;
  }

  async getEquipmentConflictSummary(
    equippedWeapons: (Weapon | MagicalWeapon)[],
    equippedArmor: Armor[]
  ): Promise<{
    hasConflicts: boolean;
    conflictSummary: string[];
    suggestions: string[];
  }> {
    const conflictSummary: string[] = [];
    const suggestions: string[] = [];

    // Check existing equipment for conflicts
    const hasShield = equippedArmor.some(armor => armor.type === 'Shield');
    const twoHandedWeapons = equippedWeapons.filter(w => this.isTwoHanded(w));
    const oneHandedWeapons = equippedWeapons.filter(w => !this.isTwoHanded(w));

    // Two-handed + shield conflict
    if (twoHandedWeapons.length > 0 && hasShield) {
      conflictSummary.push(`Two-handed weapon ${twoHandedWeapons[0].name} conflicts with shield`);
      suggestions.push('Unequip either the shield or the two-handed weapon');
    }

    // Multiple two-handed weapons
    if (twoHandedWeapons.length > 1) {
      conflictSummary.push(`Multiple two-handed weapons: ${twoHandedWeapons.map(w => w.name).join(', ')}`);
      suggestions.push('Unequip all but one two-handed weapon');
    }

    // Too many one-handed weapons
    if (oneHandedWeapons.length > 2) {
      conflictSummary.push(`Too many weapons equipped (${oneHandedWeapons.length}). Maximum is 2 for dual wielding.`);
      suggestions.push('Unequip excess weapons to free up hands');
    }

    // Two-handed + one-handed conflict
    if (twoHandedWeapons.length > 0 && oneHandedWeapons.length > 0) {
      conflictSummary.push(`Two-handed weapon conflicts with other weapons`);
      suggestions.push('Two-handed weapons require both hands - unequip other weapons');
    }

    return {
      hasConflicts: conflictSummary.length > 0,
      conflictSummary,
      suggestions
    };
  }
}

export function createEquipmentRulesEngine(character: { 
  class: string; 
  level: number; 
  strength: number; 
  dexterity: number; 
}): EquipmentRulesEngine {
  return new EquipmentRulesEngine(character);
} 