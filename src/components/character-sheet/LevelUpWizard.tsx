"use client";

import { useState, useEffect } from "react";
import { X, Dice6, TrendingUp, Book, Sparkles, Sword, Shield } from "lucide-react";
import { createLevelUpService, type LevelUpOptions, type Character } from "@/services/character/level-up";
import { FIGHTING_STYLES, FEATS } from "@/lib/dnd/progression";

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

type WizardStep = 'overview' | 'hitPoints' | 'choices' | 'spells' | 'review';

export function LevelUpWizard({ character, onClose, onLevelUp }: LevelUpWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>('overview');
  const [levelUpOptions, setLevelUpOptions] = useState<LevelUpOptions | null>(null);
  const [selections, setSelections] = useState<Record<string, string | string[]>>({});
  const [hitPointChoice, setHitPointChoice] = useState<'fixed' | 'roll'>('fixed');
  const [rolledHitPoints, setRolledHitPoints] = useState<number | null>(null);
  const [abilityScoreAllocations, setAbilityScoreAllocations] = useState<Record<string, number>>({});
  const [selectedFeat, setSelectedFeat] = useState<string>('');
  const [selectedSpells, setSelectedSpells] = useState<string[]>([]);

  const levelUpService = createLevelUpService();

  useEffect(() => {
    try {
      const options = levelUpService.getLevelUpOptions(character);
      setLevelUpOptions(options);
    } catch (error) {
      console.error('Error getting level up options:', error);
    }
  }, [character, levelUpService]);

  const getCurrentClass = () => {
    // For Phase 1, we're only handling single class
    return character.class;
  };

  const getNewLevel = () => {
    return character.level + 1;
  };

  const rollHitPoints = () => {
    if (!levelUpOptions) return;
    const { min, max } = levelUpOptions.hitPointOptions.roll;
    const rolled = Math.floor(Math.random() * (max - min + 1)) + min;
    setRolledHitPoints(rolled);
  };

  const getSelectedHitPoints = () => {
    if (hitPointChoice === 'fixed') {
      return levelUpOptions?.hitPointOptions.fixed || 0;
    }
    return rolledHitPoints || 0;
  };

  const handleChoiceSelection = (choiceType: string, value: string | string[]) => {
    setSelections(prev => ({
      ...prev,
      [choiceType]: value
    }));
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 'overview':
        return true;
      case 'hitPoints':
        return hitPointChoice === 'fixed' || (hitPointChoice === 'roll' && rolledHitPoints !== null);
      case 'choices':
        // Check if all required choices are made
        if (!levelUpOptions) return false;
        return levelUpOptions.availableChoices
          .filter(choice => choice.required)
          .every(choice => {
            if (choice.type === 'abilityScoreIncrease') {
              // Check if either ability scores are allocated or a feat is selected
              const totalAllocated = Object.values(abilityScoreAllocations).reduce((sum, val) => sum + val, 0);
              return totalAllocated === 2 || selectedFeat;
            }
            return selections[choice.type];
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

  const getNextStep = (current: WizardStep): WizardStep => {
    const steps: WizardStep[] = ['overview', 'hitPoints', 'choices', 'spells', 'review'];
    const currentIndex = steps.indexOf(current);
    
    if (currentIndex >= steps.length - 1) {
      return current; // Already at last step
    }
    
    const nextStep = steps[currentIndex + 1];
    
    // Skip spell step if no spells to learn
    if (nextStep === 'spells' && (!levelUpOptions?.spellOptions || levelUpOptions.spellOptions.spellsToLearn === 0)) {
      return getNextStep(nextStep); // Recursively get next valid step
    }
    
    return nextStep;
  };

  const nextStep = () => {
    const next = getNextStep(currentStep);
    if (next !== currentStep) {
      setCurrentStep(next);
    }
  };

  const getPrevStep = (current: WizardStep): WizardStep => {
    const steps: WizardStep[] = ['overview', 'hitPoints', 'choices', 'spells', 'review'];
    const currentIndex = steps.indexOf(current);
    
    if (currentIndex <= 0) {
      return current; // Already at first step
    }
    
    const prevStep = steps[currentIndex - 1];
    
    // Skip spell step if coming back and no spells
    if (prevStep === 'spells' && (!levelUpOptions?.spellOptions || levelUpOptions.spellOptions.spellsToLearn === 0)) {
      return getPrevStep(prevStep); // Recursively get previous valid step
    }
    
    return prevStep;
  };

  const prevStep = () => {
    const prev = getPrevStep(currentStep);
    if (prev !== currentStep) {
      setCurrentStep(prev);
    }
  };

  const completeLevelUp = () => {
    if (!levelUpOptions) return;

    try {
      // Process ability score improvements or feat selection
      const processedSelections = { ...selections };
      
      // Handle ability score increase vs feat choice
      const asiChoice = levelUpOptions.availableChoices.find(c => c.type === 'abilityScoreIncrease');
      if (asiChoice) {
        if (selectedFeat) {
          processedSelections['feat'] = selectedFeat;
        } else {
          // Convert ability score allocations to a string representation
          processedSelections['abilityScoreIncrease'] = JSON.stringify(abilityScoreAllocations);
        }
      }

      // Add spell selections
      if (selectedSpells.length > 0) {
        processedSelections['spell'] = selectedSpells;
      }

      const result = levelUpService.processLevelUp(
        character,
        processedSelections,
        getSelectedHitPoints()
      );

      // Build update object for character
      const updates: CharacterUpdates = {
        level: getNewLevel(),
        hitPoints: character.hitPoints + result.hitPointsGained,
        maxHitPoints: character.maxHitPoints + result.hitPointsGained,
      };

      // Add multiclass fields (JSON strings for database)
      updates.classes = JSON.stringify([{
        class: getCurrentClass(),
        level: getNewLevel(),
        subclass: character.subclass,
        hitPointsGained: result.hitPointsGained
      }]);
      updates.totalLevel = getNewLevel();
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

  if (!levelUpOptions) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="text-white">Loading level up options...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Level Up!</h2>
            <p className="text-slate-300">
              {character.name} • {getCurrentClass()} {character.level} → {getNewLevel()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="mb-6">
          <div className="flex justify-between text-sm">
            {['Overview', 'Hit Points', 'Choices', 'Spells', 'Review'].map((step, index) => {
              const stepKey = step.toLowerCase().replace(' ', '') as WizardStep;
              const isActive = currentStep === stepKey;
              const isCompleted = ['overview', 'hitPoints', 'choices', 'spells', 'review'].indexOf(currentStep) > index;
              
              return (
                <div key={step} className={`flex-1 text-center ${
                  isActive ? 'text-purple-400' : isCompleted ? 'text-green-400' : 'text-slate-500'
                }`}>
                  <div className={`w-8 h-8 mx-auto rounded-full border-2 mb-1 ${
                    isActive ? 'border-purple-400 bg-purple-400' : 
                    isCompleted ? 'border-green-400 bg-green-400' : 'border-slate-500'
                  }`} />
                  {step}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">
          {currentStep === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">
                <TrendingUp className="h-6 w-6 inline mr-2 text-green-400" />
                Level {getNewLevel()} Features
              </h3>
              
              <div className="bg-slate-700 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">New Features:</h4>
                <ul className="space-y-1 text-slate-300">
                  {levelUpOptions.newFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {levelUpOptions.availableChoices.length > 0 && (
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Choices to Make:</h4>
                  <ul className="space-y-1 text-slate-300">
                    {levelUpOptions.availableChoices.map((choice, index) => (
                      <li key={index} className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-blue-400" />
                        {choice.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {currentStep === 'hitPoints' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">
                <Dice6 className="h-6 w-6 inline mr-2 text-red-400" />
                Hit Points
              </h3>
              
              <div className="space-y-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="hitPoints"
                      value="fixed"
                      checked={hitPointChoice === 'fixed'}
                      onChange={() => setHitPointChoice('fixed')}
                      className="text-purple-600"
                    />
                    <span className="text-white">
                      Take Average: <strong>+{levelUpOptions.hitPointOptions.fixed} HP</strong>
                    </span>
                  </label>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <label className="flex items-center space-x-3 mb-3">
                    <input
                      type="radio"
                      name="hitPoints"
                      value="roll"
                      checked={hitPointChoice === 'roll'}
                      onChange={() => setHitPointChoice('roll')}
                      className="text-purple-600"
                    />
                    <span className="text-white">
                      Roll for HP: {levelUpOptions.hitPointOptions.roll.min} - {levelUpOptions.hitPointOptions.roll.max}
                    </span>
                  </label>
                  
                  {hitPointChoice === 'roll' && (
                    <div className="ml-6">
                      <button
                        onClick={rollHitPoints}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded mr-3"
                      >
                        Roll Dice
                      </button>
                      {rolledHitPoints !== null && (
                        <span className="text-green-400 font-bold text-lg">
                          Rolled: +{rolledHitPoints} HP
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 'choices' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">
                <Sword className="h-6 w-6 inline mr-2 text-yellow-400" />
                Feature Choices
              </h3>
              
              {levelUpOptions.availableChoices.map((choice, index) => (
                <div key={index} className="bg-slate-700 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-3">{choice.description}</h4>
                  
                  {choice.type === 'fightingStyle' && choice.options && (
                    <div className="space-y-2">
                      {choice.options.map(option => (
                        <label key={option} className="flex items-start space-x-3">
                          <input
                            type="radio"
                            name={choice.type}
                            value={option}
                            checked={selections[choice.type] === option}
                            onChange={(e) => handleChoiceSelection(choice.type, e.target.value)}
                            className="mt-1 text-purple-600"
                          />
                          <div>
                            <div className="text-white font-medium">{option}</div>
                            <div className="text-slate-300 text-sm">{FIGHTING_STYLES[option]}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}

                  {choice.type === 'abilityScoreIncrease' && (
                    <div className="space-y-4">
                      <div className="border border-slate-600 rounded p-3">
                        <h5 className="text-white font-medium mb-2">Ability Score Increase</h5>
                        <p className="text-slate-300 text-sm mb-3">Allocate 2 points among your abilities (max 1 per ability)</p>
                        
                        <div className="grid grid-cols-3 gap-2">
                          {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(ability => (
                            <div key={ability} className="flex items-center space-x-2">
                              <span className="text-white text-sm capitalize w-16">{ability.slice(0, 3)}</span>
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
                                  // Ensure total doesn't exceed 2
                                  const total = Object.values(newAllocations).reduce((sum, val) => sum + val, 0);
                                  if (total <= 2) {
                                    setAbilityScoreAllocations(newAllocations);
                                    setSelectedFeat(''); // Clear feat if ability scores are selected
                                  }
                                }}
                                className="bg-slate-600 text-white rounded px-2 py-1 text-sm"
                              >
                                <option value={0}>+0</option>
                                <option value={1}>+1</option>
                              </select>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-center text-slate-400">— OR —</div>

                      <div className="border border-slate-600 rounded p-3">
                        <h5 className="text-white font-medium mb-2">Take a Feat</h5>
                        <select
                          value={selectedFeat}
                          onChange={(e) => {
                            setSelectedFeat(e.target.value);
                            if (e.target.value) {
                              setAbilityScoreAllocations({}); // Clear ability scores if feat is selected
                            }
                          }}
                          className="w-full bg-slate-600 text-white rounded px-3 py-2 mb-2"
                        >
                          <option value="">Choose a feat...</option>
                          {Object.keys(FEATS).map(featName => (
                            <option key={featName} value={featName}>{featName}</option>
                          ))}
                        </select>
                        {selectedFeat && (
                          <div className="text-slate-300 text-sm">
                            {FEATS[selectedFeat]?.description}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {currentStep === 'spells' && levelUpOptions.spellOptions && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">
                <Book className="h-6 w-6 inline mr-2 text-blue-400" />
                Spell Selection
              </h3>
              
              <div className="bg-slate-700 rounded-lg p-4">
                <p className="text-white mb-3">
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
                        className="text-purple-600"
                      />
                      <span className="text-white">{spell}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 'review' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">Review Changes</h3>
              
              <div className="space-y-3">
                <div className="bg-slate-700 rounded-lg p-3">
                  <span className="text-slate-300">Hit Points: </span>
                  <span className="text-green-400 font-medium">+{getSelectedHitPoints()}</span>
                </div>

                {Object.entries(abilityScoreAllocations).map(([ability, increase]) => (
                  increase > 0 && (
                    <div key={ability} className="bg-slate-700 rounded-lg p-3">
                      <span className="text-slate-300 capitalize">{ability}: </span>
                      <span className="text-blue-400 font-medium">+{increase}</span>
                    </div>
                  )
                ))}

                {selectedFeat && (
                  <div className="bg-slate-700 rounded-lg p-3">
                    <span className="text-slate-300">Feat: </span>
                    <span className="text-purple-400 font-medium">{selectedFeat}</span>
                  </div>
                )}

                {Object.entries(selections).map(([type, selection]) => (
                  type !== 'abilityScoreIncrease' && (
                    <div key={type} className="bg-slate-700 rounded-lg p-3">
                      <span className="text-slate-300 capitalize">{type.replace(/([A-Z])/g, ' $1')}: </span>
                      <span className="text-yellow-400 font-medium">
                        {Array.isArray(selection) ? selection.join(', ') : selection}
                      </span>
                    </div>
                  )
                ))}

                {selectedSpells.length > 0 && (
                  <div className="bg-slate-700 rounded-lg p-3">
                    <span className="text-slate-300">New Spells: </span>
                    <span className="text-blue-400 font-medium">{selectedSpells.join(', ')}</span>
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
            disabled={currentStep === 'overview'}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 text-white rounded"
          >
            Previous
          </button>
          
          {currentStep === 'review' ? (
            <button
              onClick={completeLevelUp}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium"
            >
              Level Up!
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!canProceedToNextStep()}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 