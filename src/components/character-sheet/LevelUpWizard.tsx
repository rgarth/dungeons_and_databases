"use client";

import { useState, useEffect, useMemo } from "react";
import { X, Dice6, TrendingUp, Book, Sparkles, Sword, Shield, ChevronRight, ChevronLeft } from "lucide-react";
import { createLevelUpService, type LevelUpOptions, type Character } from "@/services/character/level-up";
import { FIGHTING_STYLES, FEATS, type ClassLevel } from "@/lib/dnd/progression";

interface CharacterUpdates {
  level?: number;
  hitPoints?: number;
  maxHitPoints?: number;
  classes?: string; // JSON string
  totalLevel?: number;
  selectedFeatures?: string; // JSON string
  spellsKnown?: string[]; // For new spells
  [key: string]: string | number | string[] | undefined; // For ability scores and arrays
}

interface LevelUpWizardProps {
  character: Character;
  onClose: () => void;
  onLevelUp: (updates: CharacterUpdates) => void;
}

type WizardStep = 'target' | 'overview' | 'hitPoints' | 'choices' | 'spells' | 'review';

interface LevelUpTarget {
  targetLevel: number;
  targetClass: string;
  levelsToGain: number;
}

export function LevelUpWizard({ character, onClose, onLevelUp }: LevelUpWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>('target');
  const [levelUpTarget, setLevelUpTarget] = useState<LevelUpTarget>({
    targetLevel: character.level + 1,
    targetClass: character.class,
    levelsToGain: 1
  });
  const [levelUpOptions, setLevelUpOptions] = useState<LevelUpOptions | null>(null);
  const [selections, setSelections] = useState<Record<string, string | string[]>>({});
  const [hitPointChoice, setHitPointChoice] = useState<'fixed' | 'roll'>('fixed');
  const [rolledHitPoints, setRolledHitPoints] = useState<number | null>(null);
  const [diceResults, setDiceResults] = useState<number[]>([]);
  const [abilityScoreAllocations, setAbilityScoreAllocations] = useState<Record<string, number>>({});
  const [selectedFeat, setSelectedFeat] = useState<string>('');
  const [selectedSpells, setSelectedSpells] = useState<string[]>([]);
  const [availableClasses, setAvailableClasses] = useState<string[]>([]);

  const levelUpService = useMemo(() => createLevelUpService(), []);

  // Load available classes for multiclassing
  useEffect(() => {
    const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];
    setAvailableClasses(classes);
  }, []);

  // Load level up options when target changes
  useEffect(() => {
    console.log('🟡 Main options useEffect triggered:', { 
      currentStep, 
      targetClass: levelUpTarget.targetClass, 
      targetLevel: levelUpTarget.targetLevel 
    });
    
    const loadOptions = async () => {
      console.log('🟡 Loading options for:', { 
        characterClass: character.class, 
        targetClass: levelUpTarget.targetClass, 
        targetLevel: levelUpTarget.targetLevel 
      });
      
      try {
        const options = await levelUpService.getLevelUpOptions(character, levelUpTarget.targetClass, levelUpTarget.targetLevel);
        console.log('🟢 Options loaded in main useEffect:', options);
        setLevelUpOptions(options);
      } catch (error) {
        console.error('🔴 Error getting level up options in main useEffect:', error);
      }
    };
    
    if (currentStep !== 'target') {
      loadOptions();
    } else {
      console.log('🟡 Skipping options load - still on target step');
    }
  }, [character, levelUpTarget.targetClass, levelUpTarget.targetLevel, currentStep, levelUpService]);

  // Handle step transition after options are loaded
  const [pendingStepTransition, setPendingStepTransition] = useState<WizardStep | null>(null);

  useEffect(() => {
    console.log('🟡 Step transition useEffect triggered:', { 
      pendingStepTransition, 
      hasLevelUpOptions: !!levelUpOptions,
      currentStep 
    });
    
    if (pendingStepTransition) {
      console.log('🟢 Transitioning to step:', pendingStepTransition);
      setCurrentStep(pendingStepTransition);
      setPendingStepTransition(null);
      console.log('🟢 Step transition completed');
    }
  }, [pendingStepTransition]);

  const getCurrentClass = () => {
    return levelUpTarget.targetClass;
  };

  const getNewLevel = () => {
    return levelUpTarget.targetLevel;
  };

  const getHitDie = (characterClass: string): number => {
    const hitDieMap: Record<string, number> = {
      'Barbarian': 12,
      'Fighter': 10,
      'Paladin': 10,
      'Ranger': 10,
      'Bard': 8,
      'Cleric': 8,
      'Druid': 8,
      'Monk': 8,
      'Rogue': 8,
      'Warlock': 8,
      'Sorcerer': 6,
      'Wizard': 6
    };
    return hitDieMap[characterClass] || 8;
  };

  const rollHitPoints = () => {
    if (!levelUpOptions) return;
    
    // Calculate what dice we need to roll
    const levelsToGain = levelUpTarget.targetLevel - character.level;
    const constitutionModifier = Math.floor((character.constitution - 10) / 2);
    
    // Get hit die for the class
    const hitDieMap: Record<string, number> = {
      'Barbarian': 12,
      'Fighter': 10,
      'Paladin': 10,
      'Ranger': 10,
      'Bard': 8,
      'Cleric': 8,
      'Druid': 8,
      'Monk': 8,
      'Rogue': 8,
      'Warlock': 8,
      'Sorcerer': 6,
      'Wizard': 6
    };
    
    const hitDie = hitDieMap[character.class] || 8;
    
    // Roll individual dice for each level
    const diceResults: number[] = [];
    let totalRolled = 0;
    
    for (let i = 0; i < levelsToGain; i++) {
      const dieRoll = Math.floor(Math.random() * hitDie) + 1;
      diceResults.push(dieRoll);
      totalRolled += dieRoll + constitutionModifier;
    }
    
    // Store both the total and the individual dice results
    setRolledHitPoints(totalRolled);
    setDiceResults(diceResults);
  };

  const getSelectedHitPoints = () => {
    if (hitPointChoice === 'fixed') {
      return levelUpOptions?.hitPointOptions.fixed || 0;
    }
    return rolledHitPoints || 0;
  };

  const handleChoiceSelection = (choiceType: string, value: string | string[], level?: number) => {
    const choiceKey = level ? `${choiceType}_level_${level}` : choiceType;
    setSelections(prev => ({
      ...prev,
      [choiceKey]: value
    }));
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 'target':
        return levelUpTarget.targetLevel > character.level && levelUpTarget.targetLevel <= 20;
      case 'overview':
        return true;
      case 'hitPoints':
        return hitPointChoice === 'fixed' || (hitPointChoice === 'roll' && rolledHitPoints !== null);
      case 'choices':
        if (!levelUpOptions) return false;
        return levelUpOptions.availableChoices
          .filter(choice => choice.required)
          .every(choice => {
            // Extract level from description if it contains "(Level X)"
            const levelMatch = choice.description.match(/\(Level (\d+)\)/);
            const level = levelMatch ? parseInt(levelMatch[1]) : undefined;
            const choiceKey = level ? `${choice.type}_level_${level}` : choice.type;
            
            if (choice.type === 'abilityScoreIncrease') {
              const totalAllocated = Object.values(abilityScoreAllocations).reduce((sum, val) => sum + val, 0);
              return totalAllocated === 2 || selectedFeat;
            }
            return selections[choiceKey];
          });
      case 'spells':
        const spellOptions = levelUpOptions?.spellOptions;
        if (!spellOptions || spellOptions.spellsToLearn === 0) return true;
        return selectedSpells.length === spellOptions.spellsToLearn;
      case 'review':
        return true;
      default:
        return false;
    }
  };

  const getSteps = (): WizardStep[] => {
    const steps: WizardStep[] = ['target', 'overview'];
    
    if (levelUpOptions?.hitPointOptions) {
      steps.push('hitPoints');
    }
    
    if (levelUpOptions?.availableChoices && levelUpOptions.availableChoices.length > 0) {
      steps.push('choices');
    }
    
    if (levelUpOptions?.spellOptions && levelUpOptions.spellOptions.spellsToLearn > 0) {
      steps.push('spells');
    }
    
    steps.push('review');
    return steps;
  };

  const getNextStep = (current: WizardStep): WizardStep => {
    const steps = getSteps();
    const currentIndex = steps.indexOf(current);
    
    if (currentIndex >= steps.length - 1) {
      return current;
    }
    
    return steps[currentIndex + 1];
  };

  const getPrevStep = (current: WizardStep): WizardStep => {
    const steps = getSteps();
    const currentIndex = steps.indexOf(current);
    
    if (currentIndex <= 0) {
      return current;
    }
    
    return steps[currentIndex - 1];
  };

  const nextStep = () => {
    const next = getNextStep(currentStep);
    if (next !== currentStep) {
      setCurrentStep(next);
    }
  };

  const prevStep = () => {
    const prev = getPrevStep(currentStep);
    if (prev !== currentStep) {
      setCurrentStep(prev);
    }
  };

  const completeLevelUp = async () => {
    if (!levelUpOptions) return;

    try {
      const processedSelections = { ...selections };
      
      // Handle ability score increase vs feat choice
      const asiChoice = levelUpOptions.availableChoices.find(c => c.type === 'abilityScoreIncrease');
      if (asiChoice) {
        if (selectedFeat) {
          processedSelections['feat'] = selectedFeat;
        } else {
          processedSelections['abilityScoreIncrease'] = JSON.stringify(abilityScoreAllocations);
        }
      }

      // Add spell selections
      if (selectedSpells.length > 0) {
        processedSelections['spell'] = selectedSpells;
      }

              const result = await levelUpService.processLevelUp(
          character,
          processedSelections,
          getSelectedHitPoints(),
          levelUpTarget.targetClass,
          levelUpTarget.targetLevel
        );

      // Build update object for character
      const updates: CharacterUpdates = {
        level: levelUpTarget.targetLevel,
        hitPoints: character.hitPoints + result.hitPointsGained,
        maxHitPoints: character.maxHitPoints + result.hitPointsGained,
      };

      // Handle multiclass vs single class
      if (levelUpTarget.targetClass === character.class) {
        // Single class level up
        updates.classes = JSON.stringify([{
          class: getCurrentClass(),
          level: levelUpTarget.targetLevel,
          subclass: character.subclass,
          hitPointsGained: result.hitPointsGained
        }]);
        updates.totalLevel = levelUpTarget.targetLevel;
      } else {
        // Multiclass - need to merge with existing classes
        const parsedClasses = character.classes ? JSON.parse(character.classes) : null;
        const existingClasses: ClassLevel[] = parsedClasses || [{
          class: character.class,
          level: character.level,
          subclass: character.subclass
        }];
        
        const targetClassIndex = existingClasses.findIndex((c: ClassLevel) => c.class === levelUpTarget.targetClass);
        if (targetClassIndex >= 0) {
          // Increment existing class level
          existingClasses[targetClassIndex].level += 1;
        } else {
          // Add new class at level 1
          existingClasses.push({
            class: levelUpTarget.targetClass,
            level: 1,
            hitPointsGained: result.hitPointsGained
          });
        }
        
        updates.classes = JSON.stringify(existingClasses);
        // Calculate total level from all classes
        const totalLevel = existingClasses.reduce((sum: number, cls: ClassLevel) => sum + cls.level, 0);
        updates.totalLevel = totalLevel;
      }
      updates.selectedFeatures = JSON.stringify(result.selectedFeatures);

      // Update ability scores if allocated
      Object.entries(abilityScoreAllocations).forEach(([ability, increase]) => {
        if (increase > 0) {
          updates[ability] = (character[ability as keyof Character] as number) + increase;
        }
      });

      // Update spells if any were selected
      if (result.updatedSpells && result.updatedSpells.length > 0) {
        updates.spellsKnown = [...(character.spellsKnown || []), ...result.updatedSpells];
      }

      onLevelUp(updates);
      onClose();
    } catch (error) {
      console.error('Error processing level up:', error);
    }
  };

  const canMulticlass = (targetClass: string) => {
    return levelUpService.canMulticlass(character, targetClass);
  };

  if (!levelUpOptions && currentStep !== 'target') {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
        <div className="bg-[var(--color-card)] rounded-lg p-6">
          <div className="text-[var(--color-text-primary)]">Loading level up options...</div>
        </div>
      </div>
    );
  }

  const steps = getSteps();

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
      <div className="bg-[var(--color-card)] rounded-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Level Up!</h2>
            <p className="text-[var(--color-text-secondary)]">
              {character.name} • {character.class} {character.level} → {getNewLevel()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="mb-6">
          <div className="flex justify-between text-sm">
            {steps.map((step, index) => {
              const stepNames = {
                target: 'Target',
                overview: 'Overview', 
                hitPoints: 'Hit Points',
                choices: 'Choices',
                spells: 'Spells',
                review: 'Review'
              };
              
              const isActive = currentStep === step;
              const isCompleted = steps.indexOf(currentStep) > index;
              
              return (
                <div key={step} className={`flex-1 text-center ${
                  isActive ? 'text-[var(--color-accent)]' : 
                  isCompleted ? 'text-[var(--color-accent-secondary)]' : 
                  'text-[var(--color-text-tertiary)]'
                }`}>
                  <div className={`w-8 h-8 mx-auto rounded-full border-2 mb-1 flex items-center justify-center ${
                    isActive ? 'border-[var(--color-accent)] bg-[var(--color-accent)]' : 
                    isCompleted ? 'border-[var(--color-accent-secondary)] bg-[var(--color-accent-secondary)]' : 
                    'border-[var(--color-text-tertiary)]'
                  }`}>
                    {isCompleted && <ChevronRight className="h-4 w-4 text-[var(--color-card)]" />}
                  </div>
                  {stepNames[step]}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {currentStep === 'target' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                <TrendingUp className="h-6 w-6 inline mr-2 text-[var(--color-accent)]" />
                How would you like to level up?
              </h3>
              
              {/* Level Up Choice */}
              <div className="space-y-4">
                {/* Option 1: Level up current class */}
                <div className="w-full p-6 bg-[var(--color-card-secondary)] rounded-lg border-2 border-[var(--color-accent)] hover:border-[var(--color-accent-hover)] transition-colors text-left group">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                        Level Up {character.class}
                      </h4>
                      <p className="text-[var(--color-text-secondary)]">
                        Take your {character.class} to a higher level
                      </p>
                    </div>
                  </div>
                  
                  {/* Level Selection */}
                  <div className="bg-[var(--color-surface)] rounded-lg p-4 mb-4">
                    <h5 className="font-medium text-[var(--color-text-primary)] mb-3">Target Level</h5>
                    <div className="flex items-center gap-4 justify-center">
                      <button
                        onClick={() => setLevelUpTarget(prev => ({ 
                          ...prev, 
                          targetLevel: Math.max(character.level + 1, prev.targetLevel - 1),
                          levelsToGain: Math.max(1, prev.targetLevel - character.level - 1)
                        }))}
                        disabled={levelUpTarget.targetLevel <= character.level + 1}
                        className="p-2 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:opacity-50 text-[var(--color-button-text)] rounded transition-colors"
                        aria-label="Decrease level"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      
                      <span className="text-2xl font-bold text-[var(--color-text-primary)] min-w-[60px] text-center">
                        {levelUpTarget.targetLevel}
                      </span>
                      
                      <button
                        onClick={() => setLevelUpTarget(prev => ({ 
                          ...prev, 
                          targetLevel: Math.min(20, prev.targetLevel + 1),
                          levelsToGain: prev.targetLevel - character.level + 1
                        }))}
                        disabled={levelUpTarget.targetLevel >= 20}
                        className="p-2 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:opacity-50 text-[var(--color-button-text)] rounded transition-colors"
                        aria-label="Increase level"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-[var(--color-text-secondary)] text-sm mt-2 text-center">
                      Gaining {levelUpTarget.levelsToGain} level(s) (Level {character.level} → {levelUpTarget.targetLevel})
                    </p>
                  </div>
                  
                  <button
                    onClick={async () => {
                      console.log('🔵 Button clicked - starting level up process');
                      console.log('Current state:', { 
                        currentStep, 
                        targetLevel: levelUpTarget.targetLevel, 
                        targetClass: levelUpTarget.targetClass,
                        characterClass: character.class,
                        characterLevel: character.level
                      });
                      
                      setLevelUpTarget(prev => ({ 
                        ...prev, 
                        targetClass: character.class
                      }));
                      
                      console.log('🔵 About to call getLevelUpOptions');
                      
                      // Load options before proceeding
                      try {
                        const options = await levelUpService.getLevelUpOptions(
                          character, 
                          character.class, 
                          levelUpTarget.targetLevel
                        );
                        
                        console.log('🔵 Options loaded successfully:', options);
                        console.log('🔵 Setting levelUpOptions and pendingStepTransition');
                        
                        setLevelUpOptions(options);
                        setPendingStepTransition('overview');
                        
                        console.log('🔵 State updates queued');
                      } catch (error) {
                        console.error('🔴 Error loading level up options:', error);
                      }
                    }}
                    className="w-full p-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] rounded-lg font-medium transition-colors"
                  >
                    Continue to Level {levelUpTarget.targetLevel}
                  </button>
                </div>

                {/* Option 2: Multiclass */}
                <button
                  onClick={async () => {
                    // Set up for multiclassing - don't load options yet, wait for class selection
                    setLevelUpTarget(prev => ({ 
                      ...prev, 
                      targetClass: '', // Clear target class to show class selection
                      targetLevel: character.level + 1,
                      levelsToGain: 1
                    }));
                    
                    // Clear any existing options and go to overview step
                    setLevelUpOptions(null);
                    setPendingStepTransition('overview');
                  }}
                  className="w-full p-6 bg-[var(--color-card-secondary)] rounded-lg border-2 border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                        Multiclass into New Class
                      </h4>
                      <p className="text-[var(--color-text-secondary)]">
                        Add a level in a different class (requires meeting prerequisites)
                      </p>
                    </div>
                    <ChevronRight className="h-6 w-6 text-[var(--color-text-secondary)] group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>


            </div>
          )}

          {currentStep === 'overview' && (() => {
            // If we're in multiclass mode and no class is selected yet
            if (levelUpTarget.targetClass === '') {
              return (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                    <TrendingUp className="h-6 w-6 inline mr-2 text-[var(--color-accent)]" />
                    Multiclass Selection
                  </h3>
                  
                  <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
                    <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Choose Multiclass Class</h4>
                    <select
                      value={levelUpTarget.targetClass}
                      onChange={async (e) => {
                        const newClass = e.target.value;
                        setLevelUpTarget(prev => ({ ...prev, targetClass: newClass }));
                        
                        if (newClass && newClass !== character.class) {
                          // Load options for the selected multiclass
                          try {
                            const options = await levelUpService.getLevelUpOptions(
                              character, 
                              newClass, 
                              character.level + 1
                            );
                            setLevelUpOptions(options);
                          } catch (error) {
                            console.error('Error loading multiclass options:', error);
                          }
                        }
                      }}
                      className="w-full p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
                    >
                      <option value="">Select a class...</option>
                      {availableClasses
                        .filter(className => className !== character.class && canMulticlass(className))
                        .map(className => (
                          <option key={className} value={className}>
                            {className}
                          </option>
                        ))}
                    </select>
                    {levelUpTarget.targetClass && levelUpTarget.targetClass !== character.class && (
                      <p className="text-[var(--color-text-secondary)] text-sm mt-2">
                        Adding {levelUpTarget.targetClass} level 1 to your character
                      </p>
                    )}
                  </div>
                </div>
              );
            }

            // If we have level up options, show the normal overview
            if (levelUpOptions) {
              console.log('🟢 Rendering overview step with options:', levelUpOptions);
              return (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                  <TrendingUp className="h-6 w-6 inline mr-2 text-[var(--color-accent)]" />
                  Level {getNewLevel()} Features
                </h3>
                
                <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
                  <h4 className="font-medium text-[var(--color-text-primary)] mb-2">New Features:</h4>
                  <ul className="space-y-1 text-[var(--color-text-secondary)]">
                    {levelUpOptions.newFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Sparkles className="h-4 w-4 mr-2 text-[var(--color-accent)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {levelUpOptions.availableChoices.length > 0 && (
                  <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
                    <h4 className="font-medium text-[var(--color-text-primary)] mb-2">Choices to Make:</h4>
                    <ul className="space-y-1 text-[var(--color-text-secondary)]">
                      {levelUpOptions.availableChoices.map((choice, index) => (
                        <li key={index} className="flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-[var(--color-accent-secondary)]" />
                          {choice.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
            }

            // Loading state
            return (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                  <TrendingUp className="h-6 w-6 inline mr-2 text-[var(--color-accent)]" />
                  Loading...
                </h3>
                <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
                  <p className="text-[var(--color-text-secondary)]">Loading level up options...</p>
                </div>
              </div>
            );
          })()}

          {currentStep === 'hitPoints' && levelUpOptions && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                <Dice6 className="h-6 w-6 inline mr-2 text-[var(--color-accent)]" />
                Hit Points
              </h3>
              
              <div className="space-y-4">
                <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="hitPoints"
                      value="fixed"
                      checked={hitPointChoice === 'fixed'}
                      onChange={() => setHitPointChoice('fixed')}
                      className="text-[var(--color-accent)]"
                    />
                    <span className="text-[var(--color-text-primary)]">
                      Take Average: <strong>+{levelUpOptions.hitPointOptions.fixed} HP</strong>
                    </span>
                  </label>
                </div>

                <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
                  <label className="flex items-center space-x-3 mb-3">
                    <input
                      type="radio"
                      name="hitPoints"
                      value="roll"
                      checked={hitPointChoice === 'roll'}
                      onChange={() => setHitPointChoice('roll')}
                      className="text-[var(--color-accent)]"
                    />
                    <span className="text-[var(--color-text-primary)]">
                      Roll for HP: {levelUpOptions.hitPointOptions.roll.min} - {levelUpOptions.hitPointOptions.roll.max}
                    </span>
                  </label>
                  
                  {hitPointChoice === 'roll' && (
                    <div className="ml-6">
                      <button
                        onClick={rollHitPoints}
                        className="bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] px-4 py-2 rounded mr-3 transition-colors"
                      >
                        Roll Dice
                      </button>
                      {rolledHitPoints !== null && (
                        <div>
                          <span className="text-[var(--color-accent)] font-bold text-lg">
                            Rolled: +{rolledHitPoints} HP
                          </span>
                          {diceResults.length > 0 && (
                            <div className="mt-2 text-sm text-[var(--color-text-secondary)]">
                              <div>Dice rolled: {diceResults.length}d{getHitDie(character.class)}</div>
                              <div>Results: {diceResults.join(', ')}</div>
                              <div>Constitution modifier: +{Math.floor((character.constitution - 10) / 2)} per level</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 'choices' && levelUpOptions && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                <Sword className="h-6 w-6 inline mr-2 text-[var(--color-accent)]" />
                Feature Choices
              </h3>
              
              {levelUpOptions.availableChoices.map((choice, index) => {
                // Extract level from description if it contains "(Level X)"
                const levelMatch = choice.description.match(/\(Level (\d+)\)/);
                const level = levelMatch ? parseInt(levelMatch[1]) : undefined;
                const choiceKey = level ? `${choice.type}_level_${level}` : choice.type;
                
                return (
                  <div key={index} className="bg-[var(--color-card-secondary)] rounded-lg p-4">
                    <h4 className="font-medium text-[var(--color-text-primary)] mb-3">{choice.description}</h4>
                  
                  {choice.type === 'fightingStyle' && choice.options && (
                    <div className="space-y-2">
                      {choice.options.map(option => (
                        <label key={option} className="flex items-start space-x-3">
                          <input
                            type="radio"
                            name={choiceKey}
                            value={option}
                            checked={selections[choiceKey] === option}
                            onChange={(e) => handleChoiceSelection(choice.type, e.target.value, level)}
                            className="mt-1 text-[var(--color-accent)]"
                          />
                          <div>
                            <div className="text-[var(--color-text-primary)] font-medium">{option}</div>
                            <div className="text-[var(--color-text-secondary)] text-sm">{FIGHTING_STYLES[option]}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}

                  {choice.type === 'classFeature' && choice.options && (
                    <div className="space-y-2">
                      {choice.options.map(option => (
                        <label key={option} className="flex items-start space-x-3">
                          <input
                            type="radio"
                            name={choiceKey}
                            value={option}
                            checked={selections[choiceKey] === option}
                            onChange={(e) => handleChoiceSelection(choice.type, e.target.value, level)}
                            className="mt-1 text-[var(--color-accent)]"
                          />
                          <div>
                            <div className="text-[var(--color-text-primary)] font-medium">{option}</div>
                            <div className="text-[var(--color-text-secondary)] text-sm">
                              {choice.description === "Choose your Roguish Archetype" ? 
                                "Specialized rogue abilities and features" : 
                                "Class-specific feature choice"
                              }
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}

                  {choice.type === 'abilityScoreIncrease' && (
                    <div className="space-y-4">
                      <div className="border border-[var(--color-border)] rounded p-3">
                        <h5 className="text-[var(--color-text-primary)] font-medium mb-2">Ability Score Increase</h5>
                        <p className="text-[var(--color-text-secondary)] text-sm mb-3">Allocate 2 points among your abilities (max 1 per ability)</p>
                        
                        <div className="grid grid-cols-3 gap-2">
                          {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(ability => (
                            <div key={ability} className="flex items-center space-x-2">
                              <span className="text-[var(--color-text-primary)] text-sm capitalize w-16">{ability.slice(0, 3)}</span>
                              <select
                                value={abilityScoreAllocations[ability] || 0}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  const newAllocations = { ...abilityScoreAllocations };
                                  if (value === 0) {
                                    delete newAllocations[ability];
                                  } else {
                                    newAllocations[ability] = value;
                                  }
                                  const total = Object.values(newAllocations).reduce((sum, val) => sum + val, 0);
                                  if (total <= 2) {
                                    setAbilityScoreAllocations(newAllocations);
                                    // Clear feat selection when choosing ability scores
                                    setSelectedFeat('');
                                  }
                                }}
                                disabled={selectedFeat !== ''}
                                className="bg-[var(--color-input)] text-[var(--color-text-primary)] rounded px-2 py-1 text-sm disabled:opacity-50"
                              >
                                <option value={0}>+0</option>
                                <option value={1}>+1</option>
                              </select>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-center text-[var(--color-text-secondary)]">— OR —</div>

                      <div className="border border-[var(--color-border)] rounded p-3">
                        <h5 className="text-[var(--color-text-primary)] font-medium mb-2">Take a Feat</h5>
                        <select
                          value={selectedFeat}
                          onChange={(e) => {
                            setSelectedFeat(e.target.value);
                            if (e.target.value) {
                              // Clear ability score allocations when choosing a feat
                              setAbilityScoreAllocations({});
                            }
                          }}
                          disabled={Object.values(abilityScoreAllocations).reduce((sum, val) => sum + val, 0) > 0}
                          className="w-full bg-[var(--color-input)] text-[var(--color-text-primary)] rounded px-3 py-2 mb-2 disabled:opacity-50"
                        >
                          <option value="">Choose a feat...</option>
                          {Object.keys(FEATS).map(featName => (
                            <option key={featName} value={featName}>{featName}</option>
                          ))}
                        </select>
                        {selectedFeat && (
                          <div className="text-[var(--color-text-secondary)] text-sm">
                            {FEATS[selectedFeat]?.description}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            </div>
          )}

          {currentStep === 'spells' && levelUpOptions?.spellOptions && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                <Book className="h-6 w-6 inline mr-2 text-[var(--color-accent)]" />
                Spell Selection
              </h3>
              
              <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
                <p className="text-[var(--color-text-primary)] mb-3">
                  Choose {levelUpOptions.spellOptions.spellsToLearn} spell(s):
                </p>
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {levelUpOptions.spellOptions.availableSpells.map(spell => (
                    <label key={spell} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedSpells.includes(spell)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (selectedSpells.length < levelUpOptions.spellOptions!.spellsToLearn) {
                              setSelectedSpells([...selectedSpells, spell]);
                            }
                          } else {
                            setSelectedSpells(selectedSpells.filter(s => s !== spell));
                          }
                        }}
                        disabled={!selectedSpells.includes(spell) && selectedSpells.length >= (levelUpOptions.spellOptions?.spellsToLearn || 0)}
                        className="text-[var(--color-accent)]"
                      />
                      <span className="text-[var(--color-text-primary)]">{spell}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 'review' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">Review Changes</h3>
              
              <div className="space-y-3">
                <div className="bg-[var(--color-card-secondary)] rounded-lg p-3">
                  <span className="text-[var(--color-text-secondary)]">Hit Points: </span>
                  <span className="text-[var(--color-accent)] font-medium">+{getSelectedHitPoints()}</span>
                </div>

                {Object.entries(abilityScoreAllocations).map(([ability, increase]) => (
                  increase > 0 && (
                    <div key={ability} className="bg-[var(--color-card-secondary)] rounded-lg p-3">
                      <span className="text-[var(--color-text-secondary)] capitalize">{ability}: </span>
                      <span className="text-[var(--color-accent-secondary)] font-medium">+{increase}</span>
                    </div>
                  )
                ))}

                {selectedFeat && (
                  <div className="bg-[var(--color-card-secondary)] rounded-lg p-3">
                    <span className="text-[var(--color-text-secondary)]">Feat: </span>
                    <span className="text-[var(--color-accent)] font-medium">{selectedFeat}</span>
                  </div>
                )}

                {Object.entries(selections).map(([type, selection]) => (
                  type !== 'abilityScoreIncrease' && (
                    <div key={type} className="bg-[var(--color-card-secondary)] rounded-lg p-3">
                      <span className="text-[var(--color-text-secondary)] capitalize">{type.replace(/([A-Z])/g, ' $1')}: </span>
                      <span className="text-[var(--color-accent-secondary)] font-medium">
                        {Array.isArray(selection) ? selection.join(', ') : selection}
                      </span>
                    </div>
                  )
                ))}

                {selectedSpells.length > 0 && (
                  <div className="bg-[var(--color-card-secondary)] rounded-lg p-3">
                    <span className="text-[var(--color-text-secondary)]">New Spells: </span>
                    <span className="text-[var(--color-accent-secondary)] font-medium">{selectedSpells.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={currentStep === steps[0]}
            className="px-4 py-2 bg-[var(--color-button-secondary)] hover:bg-[var(--color-button-secondary-hover)] disabled:opacity-50 text-[var(--color-button-text)] rounded transition-colors"
          >
            <ChevronLeft className="h-4 w-4 inline mr-2" />
            Previous
          </button>
          
          {currentStep === 'review' ? (
            <button
              onClick={completeLevelUp}
              className="px-6 py-2 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] rounded font-medium transition-colors"
            >
              Level Up!
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!canProceedToNextStep()}
              className="px-4 py-2 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:opacity-50 text-[var(--color-button-text)] rounded transition-colors"
            >
              Next
              <ChevronRight className="h-4 w-4 inline ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 