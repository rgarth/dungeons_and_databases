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
import { spellsData } from '../../../prisma/data/spells-data';

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
   * Get available level-up options for a character
   */
  getLevelUpOptions(character: Character, targetClass?: string): LevelUpOptions {
    const classes = this.getCharacterClasses(character);
    
    // Determine which class is leveling up
    const levelingClass = targetClass || classes[0]?.class || character.class;
    const currentClassLevel = classes.find(c => c.class === levelingClass)?.level || 0;
    const newClassLevel = currentClassLevel + 1;
    
    // Get progression data for this class level
    const progression = this.getClassProgression(levelingClass, newClassLevel);
    if (!progression) {
      throw new Error(`No progression data found for ${levelingClass} level ${newClassLevel}`);
    }
    
    // Calculate hit point options
    const constitutionModifier = Math.floor((character.constitution - 10) / 2);
    const hitPointOptions = {
      fixed: Math.floor(progression.hitDie / 2) + 1 + constitutionModifier,
      roll: { 
        min: 1 + constitutionModifier, 
        max: progression.hitDie + constitutionModifier 
      }
    };
    
    // Get spell options if this is a spellcasting class
    const spellOptions = this.getSpellOptions(character, levelingClass, newClassLevel, progression);
    
    return {
      availableChoices: progression.choices,
      newFeatures: progression.features,
      hitPointOptions,
      spellOptions
    };
  }
  
  /**
   * Process a level-up with selected choices
   */
  processLevelUp(
    character: Character, 
    choices: Record<string, string | string[]>,
    hitPointsGained: number,
    targetClass?: string
  ): LevelUpResult {
    const classes = this.getCharacterClasses(character);
    const currentTotalLevel = this.getTotalLevel(character);
    
    // Determine which class is leveling up
    const levelingClass = targetClass || classes[0]?.class || character.class;
    const currentClassLevel = classes.find(c => c.class === levelingClass)?.level || 0;
    const newClassLevel = currentClassLevel + 1;
    const newTotalLevel = currentTotalLevel + 1;
    
    // Get progression data to check for auto-learned spells
    const progression = this.getClassProgression(levelingClass, newClassLevel);
    const spellOptions = progression ? this.getSpellOptions(character, levelingClass, newClassLevel, progression) : undefined;
    
    // Create the new class level
    const newClassLevelData: ClassLevel = {
      class: levelingClass,
      level: newClassLevel,
      hitPointsGained,
      // Keep existing subclass if any
      subclass: classes.find(c => c.class === levelingClass)?.subclass || character.subclass
    };
    
    // Process selected features
    const selectedFeatures: SelectedFeature[] = [];
    let featureId = 1;
    
    // Auto-learn spells if there were no choices to make
    if (spellOptions?.autoLearnSpells && spellOptions.autoLearnSpells.length > 0) {
      spellOptions.autoLearnSpells.forEach(spellName => {
        selectedFeatures.push({
          id: `${character.id}-${newTotalLevel}-${featureId++}`,
          classSource: levelingClass,
          classLevel: newClassLevel,
          characterLevel: newTotalLevel,
          featureType: 'spell',
          name: 'Spell Learned (Auto)',
          selection: spellName,
          description: `Automatically learned spell: ${spellName}`
        });
      });
    }
    
    Object.entries(choices).forEach(([choiceType, selection]) => {
      switch (choiceType) {
        case 'fightingStyle':
          selectedFeatures.push({
            id: `${character.id}-${newTotalLevel}-${featureId++}`,
            classSource: levelingClass,
            classLevel: newClassLevel,
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
            classLevel: newClassLevel,
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
              classLevel: newClassLevel,
              characterLevel: newTotalLevel,
              featureType: 'feat',
              name: feat.name,
              selection: selection as string,
              description: feat.description
            });
          }
          break;
          
        case 'spell':
          if (Array.isArray(selection)) {
            selection.forEach(spellName => {
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
          break;
      }
    });
    
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
  private getSpellOptions(
    character: Character, 
    className: string, 
    newLevel: number, 
    progression: ClassProgression
  ): LevelUpOptions['spellOptions'] {
    // Check if this class can cast spells using application logic
    if (!this.canClassCastSpells(className)) {
      return undefined; // Not a spellcasting class
    }
    
    // Get available spells for this class that the character doesn't already know
    const currentSpells = character.spellsKnown || [];
    const maxSpellLevel = getMaxSpellLevel(className, newLevel);
    
    const availableSpells = spellsData
      .filter(spell => {
        // Parse classes array (it's stored as JSON string in database format)
        let spellClasses: string[] = [];
        try {
          spellClasses = typeof spell.classes === 'string' ? JSON.parse(spell.classes) : spell.classes;
        } catch {
          spellClasses = [];
        }
        return spellClasses.includes(className);
      })
      .filter(spell => spell.level <= maxSpellLevel)
      .filter(spell => spell.level > 0) // Exclude cantrips from main spell learning
      .filter(spell => !currentSpells.includes(spell.name)) // Exclude already known spells
      .map(spell => spell.name);
    
    const cantripsAvailable = spellsData
      .filter(spell => {
        let spellClasses: string[] = [];
        try {
          spellClasses = typeof spell.classes === 'string' ? JSON.parse(spell.classes) : spell.classes;
        } catch {
          spellClasses = [];
        }
        return spellClasses.includes(className) && spell.level === 0;
      })
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