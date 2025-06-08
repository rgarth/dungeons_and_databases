import { createCharacterStoryService, type CharacterLimits } from '../character/character-story';
import { SUBCLASSES, type Subclass } from '@/lib/dnd/subclasses';

// Character creation data interface
export interface CharacterCreationData {
  name: string;
  race: string;
  class: string;
  subclass?: string;
  level?: number;
  alignment?: string;
  background?: string;
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
  hitPoints?: number;
  maxHitPoints?: number;
  armorClass?: number;
  appearance?: string;
  personality?: string;
  backstory?: string;
  notes?: string;
}

// Character update data interface
export interface CharacterUpdateData {
  level?: number;
  subclass?: string;
  appearance?: string;
  personality?: string;
  backstory?: string;
  notes?: string;
}

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

export class CharacterValidationService {
  private storyService = createCharacterStoryService();

  /**
   * Validate character creation data
   */
  validateCharacterCreation(data: CharacterCreationData): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic required field validation
    if (!data.name?.trim()) {
      errors.push('Character name is required');
    }

    if (!data.race?.trim()) {
      errors.push('Character race is required');
    }

    if (!data.class?.trim()) {
      errors.push('Character class is required');
    }

    // Validate level
    const level = data.level || 1;
    if (level < 1 || level > 20) {
      errors.push('Character level must be between 1 and 20');
    }

    // Validate subclass if provided
    if (data.subclass && data.class) {
      const subclassValidation = this.validateSubclass(data.class, data.subclass, level);
      if (!subclassValidation.isValid) {
        errors.push(...subclassValidation.errors);
      }
      if (subclassValidation.warnings) {
        warnings.push(...subclassValidation.warnings);
      }
    }

    // Validate ability scores
    const abilityScoreValidation = this.validateAbilityScores({
      strength: data.strength || 10,
      dexterity: data.dexterity || 10,
      constitution: data.constitution || 10,
      intelligence: data.intelligence || 10,
      wisdom: data.wisdom || 10,
      charisma: data.charisma || 10,
    });
    if (!abilityScoreValidation.isValid) {
      errors.push(...abilityScoreValidation.errors);
    }

    // Validate hit points
    if (data.hitPoints !== undefined) {
      if (data.hitPoints < 1) {
        errors.push('Hit points must be at least 1');
      }
      if (data.maxHitPoints !== undefined && data.hitPoints > data.maxHitPoints) {
        errors.push('Current hit points cannot exceed maximum hit points');
      }
    }

    // Validate text fields using story service
    const textFieldValidation = this.validateTextFields({
      appearance: data.appearance,
      personality: data.personality,
      backstory: data.backstory,
      notes: data.notes,
    });
    if (!textFieldValidation.isValid) {
      errors.push(...textFieldValidation.errors);
    }

    // Validate name length
    if (data.name && data.name.length > 100) {
      errors.push('Character name must be 100 characters or less');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  }

  /**
   * Validate character update data
   */
  validateCharacterUpdate(data: CharacterUpdateData, currentData?: { class: string; level: number }): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate level update
    if (data.level !== undefined) {
      if (data.level < 1 || data.level > 20) {
        errors.push('Character level must be between 1 and 20');
      }
    }

    // Validate subclass update
    if (data.subclass && currentData) {
      const level = data.level || currentData.level;
      const subclassValidation = this.validateSubclass(currentData.class, data.subclass, level);
      if (!subclassValidation.isValid) {
        errors.push(...subclassValidation.errors);
      }
      if (subclassValidation.warnings) {
        warnings.push(...subclassValidation.warnings);
      }
    }

    // Validate text fields
    const textFieldValidation = this.validateTextFields({
      appearance: data.appearance,
      personality: data.personality,
      backstory: data.backstory,
      notes: data.notes,
    });
    if (!textFieldValidation.isValid) {
      errors.push(...textFieldValidation.errors);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  }

  /**
   * Validate subclass for a given class and level
   */
  private validateSubclass(characterClass: string, subclass: string, level: number): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check if the class exists in our subclass definitions
    const classSubclasses = SUBCLASSES[characterClass];
    if (!classSubclasses) {
      warnings.push(`Unknown class: ${characterClass}. Subclass validation skipped.`);
      return { isValid: true, errors, warnings };
    }

    // Check if the subclass exists for this class
    const subclassData = classSubclasses.find((sc: Subclass) => sc.name === subclass);
    if (!subclassData) {
      errors.push(`Invalid subclass "${subclass}" for class ${characterClass}`);
      return { isValid: false, errors };
    }

    // Check if the character level is high enough for this subclass
    if (level < subclassData.chosenAtLevel) {
      errors.push(`Subclass "${subclass}" requires level ${subclassData.chosenAtLevel} or higher (current level: ${level})`);
      return { isValid: false, errors };
    }

    return { isValid: true, errors, warnings };
  }

  /**
   * Validate ability scores
   */
  private validateAbilityScores(scores: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  }): ValidationResult {
    const errors: string[] = [];

    // Check each ability score is within valid range
    Object.entries(scores).forEach(([ability, score]) => {
      if (score < 1 || score > 30) {
        errors.push(`${ability.charAt(0).toUpperCase() + ability.slice(1)} score must be between 1 and 30`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate text fields using character story service
   */
  private validateTextFields(fields: {
    appearance?: string;
    personality?: string;
    backstory?: string;
    notes?: string;
  }): ValidationResult {
    const errors: string[] = [];

    // Validate each text field against its character limit
    Object.entries(fields).forEach(([fieldName, text]) => {
      if (text !== undefined && text !== null) {
        const field = fieldName as keyof CharacterLimits;
        if (!this.storyService.isWithinLimit(text, field)) {
          const limit = this.storyService.getFieldLimit(field);
          errors.push(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be ${limit} characters or less (current: ${text.length})`);
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

// Export singleton instance
export const createCharacterValidationService = () => new CharacterValidationService(); 