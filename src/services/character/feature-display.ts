import { SelectedFeature, ClassLevel } from '@/lib/dnd/progression';

export interface CharacterWithFeatures {
  id: string;
  name: string;
  class: string;
  level: number;
  subclass?: string;
  // New multiclass fields
  classes?: ClassLevel[];
  totalLevel?: number;
  selectedFeatures?: SelectedFeature[];
}

export class FeatureDisplayService {
  
  /**
   * Get character's selected features organized by type
   */
  getFeaturesByType(character: CharacterWithFeatures): Record<string, SelectedFeature[]> {
    const features = character.selectedFeatures || [];
    
    const organized: Record<string, SelectedFeature[]> = {
      fightingStyle: [],
      feat: [],
      spell: [],
      abilityScoreIncrease: [],
      classFeature: [],
      spellSelection: []
    };
    
    features.forEach(feature => {
      if (organized[feature.featureType]) {
        organized[feature.featureType].push(feature);
      }
    });
    
    return organized;
  }
  
  /**
   * Get features gained at specific character levels
   */
  getFeaturesByLevel(character: CharacterWithFeatures): Record<number, SelectedFeature[]> {
    const features = character.selectedFeatures || [];
    const byLevel: Record<number, SelectedFeature[]> = {};
    
    features.forEach(feature => {
      if (!byLevel[feature.characterLevel]) {
        byLevel[feature.characterLevel] = [];
      }
      byLevel[feature.characterLevel].push(feature);
    });
    
    return byLevel;
  }
  
  /**
   * Get features from a specific class
   */
  getFeaturesByClass(character: CharacterWithFeatures, className: string): SelectedFeature[] {
    const features = character.selectedFeatures || [];
    return features.filter(f => f.classSource === className);
  }
  
  /**
   * Format feature description for display
   */
  formatFeatureDescription(feature: SelectedFeature): string {
    switch (feature.featureType) {
      case 'fightingStyle':
        return `Fighting Style: ${feature.selection} - ${feature.description}`;
      
      case 'feat':
        return `Feat: ${feature.selection} - ${feature.description}`;
      
      case 'spell':
        return `Spell Learned: ${feature.selection}`;
      
      case 'abilityScoreIncrease':
        if (typeof feature.selection === 'object' && !Array.isArray(feature.selection)) {
          const increases = Object.entries(feature.selection as Record<string, number>)
            .map(([ability, increase]) => `${ability} +${increase}`)
            .join(', ');
          return `Ability Score Improvement: ${increases}`;
        }
        return `Ability Score Improvement: ${feature.selection}`;
      
      case 'classFeature':
        return `Class Feature: ${feature.name} - ${feature.description || ''}`;
      
      default:
        return `${feature.name}: ${feature.description || feature.selection || ''}`;
    }
  }
  
  /**
   * Get character progression summary
   */
  getProgressionSummary(character: CharacterWithFeatures): {
    totalLevel: number;
    classes: Array<{ class: string; level: number; subclass?: string }>;
    featuresCount: number;
    availableForLevelUp: boolean;
  } {
    const classes = this.getCharacterClasses(character);
    const totalLevel = this.getTotalLevel(character);
    const featuresCount = character.selectedFeatures?.length || 0;
    
    // For Phase 1, we can level up if character is under level 20
    const availableForLevelUp = totalLevel < 20;
    
    return {
      totalLevel,
      classes: classes.map(c => ({
        class: c.class,
        level: c.level,
        subclass: c.subclass
      })),
      featuresCount,
      availableForLevelUp
    };
  }
  
  /**
   * Get character's classes (handles both legacy and new format)
   */
  private getCharacterClasses(character: CharacterWithFeatures): ClassLevel[] {
    if (character.classes && character.classes.length > 0) {
      return character.classes;
    }
    
    // Legacy format - convert to new format
    return [{
      class: character.class,
      level: character.level,
      subclass: character.subclass
    }];
  }
  
  /**
   * Get character's total level
   */
  private getTotalLevel(character: CharacterWithFeatures): number {
    if (character.totalLevel !== undefined) {
      return character.totalLevel;
    }
    
    // Calculate from classes
    if (character.classes) {
      return character.classes.reduce((total, classLevel) => total + classLevel.level, 0);
    }
    
    // Legacy format
    return character.level;
  }
  
  /**
   * Check if feature was replaced by another feature
   */
  isFeatureReplaced(feature: SelectedFeature, allFeatures: SelectedFeature[]): boolean {
    return allFeatures.some(f => f.replacedFeatureId === feature.id);
  }
  
  /**
   * Get active features (excluding replaced ones)
   */
  getActiveFeatures(character: CharacterWithFeatures): SelectedFeature[] {
    const allFeatures = character.selectedFeatures || [];
    return allFeatures.filter(feature => !this.isFeatureReplaced(feature, allFeatures));
  }
}

// Export singleton instance
export const createFeatureDisplayService = () => new FeatureDisplayService(); 