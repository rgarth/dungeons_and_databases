import { 
  ClassLevel, 
  SelectedFeature, 
  LevelUpChoice, 
  ClassProgression, 
  CLASS_PROGRESSION,
  MULTICLASS_PREREQUISITES,
  FIGHTING_STYLES,
  FEATS
} from '@/lib/dnd/progression';
import { getMaxSpellLevel } from '@/lib/dnd/spells';
import { getSpellsByClass } from '@/lib/dnd/spell-data-helper';

export interface LevelUpOptions {
  availableChoices: LevelUpChoice[];
  newFeatures: string[];
  hitPointOptions: {
    fixed: number; // taking average
    roll: { min: number; max: number }; // rolling the die
  };
  spellOptions?: {
    availableSpells: string[];
    cantripsAvailable: string[];
    spellsToLearn: number;
    cantripsToLearn: number;
    autoLearnSpells?: string[];
  };
}

export interface LevelUpResult {
  newClassLevel: ClassLevel;
  selectedFeatures: SelectedFeature[];
  hitPointsGained: number;
  updatedSpells?: string[];
  updatedCantrips?: string[];
}

export interface Character {
  id: string;
  name: string;
  race: string;
  // Legacy fields (for backward compatibility)
  class: string;
  level: number;
  subclass?: string;
  // New multiclass fields
  classes?: ClassLevel[];
  totalLevel?: number;
  selectedFeatures?: SelectedFeature[];
  // Other fields
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  hitPoints: number;
  maxHitPoints: number;
  spellsKnown?: string[];
  spellsPrepared?: string[];
}

export class LevelUpService {
  
  // Spellcasting classes in D&D 5e
  private readonly SPELLCASTING_CLASSES = [
    'Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard'
  ];
  
  /**
   * Check if a class can cast spells
   */
  private canClassCastSpells(className: string): boolean {
    return this.SPELLCASTING_CLASSES.includes(className);
  }
  
  /**
   * Get available level-up options for a character (supports multiple level jumps)
   */
  async getLevelUpOptions(character: Character, targetClass?: string, targetLevel?: number): Promise<LevelUpOptions> {
    const classes = this.getCharacterClasses(character);
    
    // Determine which class is leveling up
    const levelingClass = targetClass || classes[0]?.class || character.class;
    const currentClassLevel = classes.find(c => c.class === levelingClass)?.level || 0;
    const newClassLevel = targetLevel || currentClassLevel + 1;
    
    // Validate target level
    if (newClassLevel <= currentClassLevel) {
      throw new Error(`Target level ${newClassLevel} must be greater than current level ${currentClassLevel}`);
    }
    
    if (newClassLevel > 20) {
      throw new Error(`Target level ${newClassLevel} cannot exceed 20`);
    }
    
    // For multiple level jumps, aggregate all levels in the range
    const levelsToProcess = [];
    for (let level = currentClassLevel + 1; level <= newClassLevel; level++) {
      levelsToProcess.push(level);
    }
    
    // Aggregate all choices and features from each level
    const allChoices: LevelUpChoice[] = [];
    const allFeatures: string[] = [];
    let totalHitPoints = 0;
    let totalSpellsToLearn = 0;
    let totalCantripsToLearn = 0;
    const allAvailableSpells: string[] = [];
    const allAvailableCantrips: string[] = [];
    
    for (const level of levelsToProcess) {
      const progression = this.getClassProgression(levelingClass, level);
      if (!progression) {
        throw new Error(`No progression data found for ${levelingClass} level ${level}`);
      }
      
      // Add features for this level
      allFeatures.push(...progression.features.map(feature => `${feature} (Level ${level})`));
      
      // Add choices for this level
      allChoices.push(...progression.choices.map(choice => ({
        ...choice,
        description: `${choice.description} (Level ${level})`
      })));
      
      // Calculate hit points for this level
      const constitutionModifier = Math.floor((character.constitution - 10) / 2);
      const levelHitPoints = Math.floor(progression.hitDie / 2) + 1 + constitutionModifier;
      totalHitPoints += levelHitPoints;
      
      // Get spell options for this level
      const levelSpellOptions = await this.getSpellOptions(character, levelingClass, level, progression);
      if (levelSpellOptions) {
        totalSpellsToLearn += levelSpellOptions.spellsToLearn;
        totalCantripsToLearn += levelSpellOptions.cantripsToLearn;
        allAvailableSpells.push(...levelSpellOptions.availableSpells);
        allAvailableCantrips.push(...levelSpellOptions.cantripsAvailable);
      }
    }
    
    // Calculate hit point options (total for all levels)
    const constitutionModifier = Math.floor((character.constitution - 10) / 2);
    const hitDie = this.getClassProgression(levelingClass, currentClassLevel + 1)?.hitDie || 6;
    const hitPointOptions = {
      fixed: totalHitPoints,
      roll: { 
        min: levelsToProcess.length + constitutionModifier, 
        max: (levelsToProcess.length * hitDie) + constitutionModifier 
      }
    };
    
    // Create aggregated spell options
    const spellOptions = allAvailableSpells.length > 0 || allAvailableCantrips.length > 0 ? {
      availableSpells: [...new Set(allAvailableSpells)], // Remove duplicates
      cantripsAvailable: [...new Set(allAvailableCantrips)], // Remove duplicates
      spellsToLearn: totalSpellsToLearn,
      cantripsToLearn: totalCantripsToLearn,
    } : undefined;
    
    return {
      availableChoices: allChoices,
      newFeatures: allFeatures,
      hitPointOptions,
      spellOptions
    };
  }
  
  /**
   * Process a level-up with selected choices (supports multiple level jumps)
   */
  async processLevelUp(
    character: Character, 
    choices: Record<string, string | string[]>,
    hitPointsGained: number,
    targetClass?: string,
    targetLevel?: number
  ): Promise<LevelUpResult> {
    // Determine which class is leveling up
    const classes = this.getCharacterClasses(character);
    const levelingClass = targetClass || classes[0]?.class || character.class;
    const currentClassLevel = classes.find(c => c.class === levelingClass)?.level || 0;
    const newClassLevel = targetLevel || currentClassLevel + 1;
    const newTotalLevel = this.getTotalLevel(character) + (newClassLevel - currentClassLevel);
    
    // Create new class level data
    const newClassLevelData: ClassLevel = {
      class: levelingClass,
      level: newClassLevel,
      subclass: character.subclass
    };
    
    // Process selected features
    const selectedFeatures: SelectedFeature[] = [];
    let featureId = 1;
    
    // For multiple level jumps, we need to process each level's choices
    const levelsToProcess = [];
    for (let level = currentClassLevel + 1; level <= newClassLevel; level++) {
      levelsToProcess.push(level);
    }
    
    // Process choices for each level
    for (const level of levelsToProcess) {
      const levelProgression = this.getClassProgression(levelingClass, level);
      if (!levelProgression) continue;
      
      // Process choices specific to this level
      levelProgression.choices.forEach(choice => {
        const choiceKey = `${choice.type}_level_${level}`;
        const selection = choices[choiceKey];
        
        if (selection) {
          switch (choice.type) {
            case 'fightingStyle':
              selectedFeatures.push({
                id: `${character.id}-${newTotalLevel}-${featureId++}`,
                classSource: levelingClass,
                classLevel: level,
                characterLevel: newTotalLevel,
                featureType: 'fightingStyle',
                name: 'Fighting Style',
                selection: selection as string,
                description: FIGHTING_STYLES[selection as string]
              });
              break;
              
            case 'abilityScoreIncrease':
              selectedFeatures.push({
                id: `${character.id}-${newTotalLevel}-${featureId++}`,
                classSource: levelingClass,
                classLevel: level,
                characterLevel: newTotalLevel,
                featureType: 'abilityScoreIncrease',
                name: 'Ability Score Improvement',
                selection: selection,
                description: 'Increase ability scores or take a feat'
              });
              break;
              
            case 'feat':
              const feat = FEATS[selection as string];
              if (feat) {
                selectedFeatures.push({
                  id: `${character.id}-${newTotalLevel}-${featureId++}`,
                  classSource: levelingClass,
                  classLevel: level,
                  characterLevel: newTotalLevel,
                  featureType: 'feat',
                  name: feat.name,
                  selection: selection as string,
                  description: feat.description
                });
              }
              break;
          }
        }
      });
    }
    
    // Process spell selections (aggregated across all levels)
    if (choices['spell'] && Array.isArray(choices['spell'])) {
      (choices['spell'] as string[]).forEach(spellName => {
        selectedFeatures.push({
          id: `${character.id}-${newTotalLevel}-${featureId++}`,
          classSource: levelingClass,
          classLevel: newClassLevel,
          characterLevel: newTotalLevel,
          featureType: 'spell',
          name: 'Spell Learned',
          selection: spellName,
          description: `Learned spell: ${spellName}`
        });
      });
    }
    
    return {
      newClassLevel: newClassLevelData,
      selectedFeatures,
      hitPointsGained,
      updatedSpells: this.extractSelectedSpells(selectedFeatures),
      updatedCantrips: this.extractSelectedCantrips()
    };
  }
  
  /**
   * Check if a character can multiclass into a given class
   */
  canMulticlass(character: Character, targetClass: string): boolean {
    const prerequisites = MULTICLASS_PREREQUISITES[targetClass];
    if (!prerequisites) return false;
    
    // Check if character meets ability score requirements
    return Object.entries(prerequisites.minimumAbilityScores).every(([ability, minScore]) => {
      const characterScore = character[ability as keyof Character] as number;
      return characterScore >= minScore;
    });
  }
  
  /**
   * Get character's classes (handles both legacy and new format)
   */
  private getCharacterClasses(character: Character): ClassLevel[] {
    // Handle new multiclass format
    if (character.classes && Array.isArray(character.classes) && character.classes.length > 0) {
      return character.classes;
    }
    
    // Legacy format or null classes field - convert to new format
    return [{
      class: character.class,
      level: character.level,
      subclass: character.subclass
    }];
  }
  
  /**
   * Get character's total level
   */
  private getTotalLevel(character: Character): number {
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
   * Get progression data for a specific class and level
   */
  private getClassProgression(className: string, level: number): ClassProgression | null {
    const classProgressions = CLASS_PROGRESSION[className];
    if (!classProgressions) return null;
    
    return classProgressions.find(p => p.level === level) || null;
  }
  
  /**
   * Get spell learning options for spellcasting classes
   */
  private async getSpellOptions(
    character: Character, 
    className: string, 
    newLevel: number, 
    progression: ClassProgression
  ): Promise<LevelUpOptions['spellOptions']> {
    // Check if this class can cast spells using application logic
    if (!this.canClassCastSpells(className)) {
      return undefined; // Not a spellcasting class
    }
    
    // Get available spells for this class that the character doesn't already know
    const currentSpells = character.spellsKnown || [];
    const maxSpellLevel = getMaxSpellLevel(className, newLevel);
    
    // Use the helper function that properly handles class parsing
    const availableSpells = (await getSpellsByClass(className, maxSpellLevel))
      .filter(spell => spell.level > 0) // Exclude cantrips from main spell learning
      .filter(spell => !currentSpells.includes(spell.name)) // Exclude already known spells
      .map(spell => spell.name);
    
    const cantripsAvailable = (await getSpellsByClass(className, 0)) // Get cantrips (level 0)
      .filter(spell => !currentSpells.includes(spell.name)) // Exclude already known cantrips
      .map(spell => spell.name);
    
    // Calculate how many spells to learn
    const targetSpellsKnown = progression.spellsKnown || 0;
    const spellsToLearn = Math.max(0, targetSpellsKnown - currentSpells.length);
    
    // If there are no choices to be made (available spells <= spells to learn), return 0 to skip the step
    const actualSpellsToLearn = availableSpells.length <= spellsToLearn ? 0 : spellsToLearn;
    
    return {
      availableSpells,
      cantripsAvailable,
      spellsToLearn: actualSpellsToLearn,
      cantripsToLearn: 0, // Will implement cantrip progression later
      autoLearnSpells: availableSpells.length <= spellsToLearn ? availableSpells.slice(0, spellsToLearn) : []
    };
  }
  
  /**
   * Extract spell names from selected features
   */
  private extractSelectedSpells(features: SelectedFeature[]): string[] {
    return features
      .filter(f => f.featureType === 'spell')
      .map(f => f.selection as string)
      .filter(Boolean);
  }
  
  /**
   * Extract cantrip names from selected features
   */
  private extractSelectedCantrips(): string[] {
    // Will implement when we add cantrip selection
    return [];
  }
}

// Export singleton instance
export const createLevelUpService = () => new LevelUpService(); 