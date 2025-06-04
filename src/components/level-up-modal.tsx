"use client";

import { useState, useEffect } from "react";
import { X, Dice6, Plus, Minus, Zap, BookOpen, Star, TrendingUp } from "lucide-react";
import { 
  levelUpCharacter, 
  hasAbilityScoreImprovement, 
  getHitPointGainOptions, 
  getHitDie,
  needsSpellSelection,
  needsCantripsSelection,
  getNewSpellsCount,
  getNewCantripsCount,
  getSpellcastingType,
  LevelUpChoices
} from "@/lib/dnd/level-up";
import { getModifier } from "@/lib/dnd/core";
import { getClassSpells, Spell } from "@/lib/dnd/spells";
import { getClassFeatures, ClassFeature } from "@/lib/dnd/class-features";

interface LevelUpModalProps {
  character: {
    id: string;
    name: string;
    race: string;
    class: string;
    level: number;
    background?: string;
    alignment?: string;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    hitPoints: number;
    maxHitPoints: number;
    armorClass: number;
    speed: number;
    proficiencyBonus: number;
    skills?: string[];
    spellsKnown?: Spell[];
    spellsPrepared?: Spell[];
    spellSlots?: Record<number, number>;
    spellcastingAbility?: string;
    spellSaveDC?: number;
    spellAttackBonus?: number;
  };
  onClose: () => void;
  onLevelUp: (updates: Record<string, unknown>) => void;
}

const ABILITY_NAMES = [
  'strength', 'dexterity', 'constitution', 
  'intelligence', 'wisdom', 'charisma'
] as const;

const ABILITY_DISPLAY_NAMES: Record<string, string> = {
  strength: 'Strength',
  dexterity: 'Dexterity', 
  constitution: 'Constitution',
  intelligence: 'Intelligence',
  wisdom: 'Wisdom',
  charisma: 'Charisma'
};

export function LevelUpModal({ character, onClose, onLevelUp }: LevelUpModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [choices, setChoices] = useState<LevelUpChoices>({
    hitPointGain: 0
  });
  
  // Hit point selection
  const [hitPointMethod, setHitPointMethod] = useState<'roll' | 'average'>('average');
  const [rolledHP, setRolledHP] = useState<number>(0);
  
  // Ability Score Improvement
  const [asiMethod, setAsiMethod] = useState<'asi' | 'feat'>('asi');
  const [abilityImprovements, setAbilityImprovements] = useState<Record<string, number>>({});
  const [availableASIPoints, setAvailableASIPoints] = useState(2);
  
  // Spells
  const [selectedSpells, setSelectedSpells] = useState<Spell[]>([]);
  const [selectedCantrips, setSelectedCantrips] = useState<Spell[]>([]);
  const [availableSpells, setAvailableSpells] = useState<Spell[]>([]);
  const [availableCantrips, setAvailableCantrips] = useState<Spell[]>([]);
  
  // Features
  const [newFeatures, setNewFeatures] = useState<ClassFeature[]>([]);
  
  const newLevel = character.level + 1;
  const constitutionModifier = getModifier(character.constitution);
  const hitPointOptions = getHitPointGainOptions(character.class, constitutionModifier);
  const spellcastingType = getSpellcastingType(character.class);
  
  // Determine what steps are needed
  const needsHitPoints = true;
  const needsASI = hasAbilityScoreImprovement(character.class, newLevel);
  const needsSpells = needsSpellSelection(character.class, newLevel);
  const needsCantrips = needsCantripsSelection(character.class, newLevel);
  const needsSubclass = newLevel === 3;
  
  const steps = [
    ...(needsHitPoints ? ['hitpoints'] : []),
    ...(needsASI ? ['asi'] : []),
    ...(needsSpells ? ['spells'] : []),
    ...(needsCantrips ? ['cantrips'] : []),
    ...(needsSubclass ? ['subclass'] : []),
    'features',
    'confirm'
  ];
  
  const currentStepName = steps[currentStep];
  
  useEffect(() => {
    // Load class features for new level
    const features = getClassFeatures(character.class, newLevel);
    setNewFeatures(features);
    
    // Load available spells if needed
    if (needsSpells || needsCantrips) {
      const classSpells = getClassSpells(character.class, newLevel);
      
      if (needsCantrips) {
        setAvailableCantrips(classSpells.filter(spell => spell.level === 0));
      }
      
      if (needsSpells) {
        // For "known spell" classes and wizards, filter out already known spells
        // For "prepared" classes, this doesn't apply (they have access to all spells)
        if (spellcastingType === 'known' || spellcastingType === 'spellbook') {
          setAvailableSpells(
            classSpells.filter(spell => 
              spell.level > 0 && 
              !character.spellsKnown?.some(s => s.name === spell.name)
            )
          );
        } else {
          // Clerics/Druids/Paladins don't "learn" spells during level up
          setAvailableSpells([]);
        }
      }
    }
    
    // Set initial hit point gain
    if (hitPointMethod === 'average') {
      setChoices(prev => ({ ...prev, hitPointGain: hitPointOptions.average }));
    }
  }, [character.class, newLevel, hitPointMethod, hitPointOptions.average, needsSpells, needsCantrips, spellcastingType, character.spellsKnown]);
  
  const rollHitPoints = () => {
    const roll = Math.floor(Math.random() * hitPointOptions.roll) + 1;
    setRolledHP(roll);
    const totalGain = roll + constitutionModifier;
    setChoices(prev => ({ ...prev, hitPointGain: totalGain }));
  };
  
  const handleASIChange = (ability: string, change: number) => {
    const currentValue = abilityImprovements[ability] || 0;
    const characterCurrentValue = character[ability as keyof typeof character] as number;
    const newValue = Math.max(0, Math.min(2, currentValue + change));
    
    // Can't increase ability score above 20
    if (characterCurrentValue + newValue > 20 && change > 0) return;
    
    const pointDifference = newValue - currentValue;
    
    if (availableASIPoints >= pointDifference) {
      setAbilityImprovements(prev => ({
        ...prev,
        [ability]: newValue
      }));
      setAvailableASIPoints(prev => prev - pointDifference);
    }
  };
  
  const handleSpellToggle = (spell: Spell) => {
    const isSelected = selectedSpells.some(s => s.name === spell.name);
    if (isSelected) {
      setSelectedSpells(prev => prev.filter(s => s.name !== spell.name));
    } else {
      const maxNewSpells = getNewSpellsCount(character.class, newLevel);
      if (selectedSpells.length < maxNewSpells) {
        setSelectedSpells(prev => [...prev, spell]);
      }
    }
  };
  
  const handleCantripToggle = (cantrip: Spell) => {
    const isSelected = selectedCantrips.some(c => c.name === cantrip.name);
    if (isSelected) {
      setSelectedCantrips(prev => prev.filter(c => c.name !== cantrip.name));
    } else {
      const maxNewCantrips = getNewCantripsCount(character.class, newLevel);
      if (selectedCantrips.length < maxNewCantrips) {
        setSelectedCantrips(prev => [...prev, cantrip]);
      }
    }
  };
  
  const canProceed = () => {
    switch (currentStepName) {
      case 'hitpoints':
        return choices.hitPointGain > 0;
      case 'asi':
        return availableASIPoints === 0 || asiMethod === 'feat';
      case 'spells':
        // Allow proceeding without selecting spells (can learn them later)
        return true;
      case 'cantrips':
        // Allow proceeding without selecting cantrips (can learn them later)
        return true;
      default:
        return true;
    }
  };
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleConfirm = () => {
    // Prepare final choices
    const finalChoices: LevelUpChoices = {
      hitPointGain: choices.hitPointGain,
      ...(needsASI && asiMethod === 'asi' && { abilityScoreImprovements: abilityImprovements }),
      ...(needsSpells && { spellsLearned: selectedSpells }),
      ...(needsCantrips && { cantripsLearned: selectedCantrips })
    };
    
    // Calculate level up result
    const result = levelUpCharacter(character, finalChoices);
    
    // Prepare character updates
    const updates: Record<string, unknown> = {
      level: result.newLevel,
      maxHitPoints: result.newMaxHitPoints,
      hitPoints: Math.min(character.hitPoints + result.hitPointGain, result.newMaxHitPoints),
      proficiencyBonus: result.newProficiencyBonus
    };
    
    // Apply ability score improvements
    if (result.abilityScoreChanges) {
      Object.entries(result.abilityScoreChanges).forEach(([ability, change]) => {
        updates[ability] = character[ability as keyof typeof character] as number + change;
      });
    }
    
    // Update spell slots
    if (result.newSpellSlots) {
      updates.spellSlots = result.newSpellSlots;
    }
    
    // Add new spells (for "known spell" classes and wizards adding to spellbook)
    if (result.newSpells && result.newSpells.length > 0) {
      updates.spellsKnown = [...(character.spellsKnown || []), ...result.newSpells];
    }
    
    // Add new cantrips
    if (result.newCantrips && result.newCantrips.length > 0) {
      const currentSpells = character.spellsKnown || [];
      const allNewSpells = [...(result.newSpells || []), ...result.newCantrips];
      updates.spellsKnown = [...currentSpells, ...allNewSpells];
    }
    
    onLevelUp(updates);
    onClose();
  };

  // Get explanation text for spell selection based on class type
  const getSpellSelectionExplanation = () => {
    const maxNewSpells = getNewSpellsCount(character.class, newLevel);
    
    switch (spellcastingType) {
      case 'spellbook':
        return `As a Wizard, you automatically add ${maxNewSpells} spell(s) to your spellbook when you level up. Select them now or learn them later.`;
      case 'known':
        return `You can learn ${maxNewSpells} new spell(s), or skip and learn them later during your adventures.`;
      case 'prepared':
        return `${character.class}s prepare spells from their entire spell list rather than learning specific spells. No spell selection needed.`;
      default:
        return "No spells available for this class.";
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-600">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-green-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Level Up!</h2>
              <p className="text-slate-400">
                {character.name} • {character.class} {character.level} → {newLevel}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>
        
        {/* Progress */}
        <div className="p-4 border-b border-slate-600">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-slate-400">Step {currentStep + 1} of {steps.length}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {currentStepName === 'hitpoints' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Hit Points</h3>
                <p className="text-slate-400 mb-4">
                  Choose how to determine your hit point increase for level {newLevel}.
                </p>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 border border-slate-600 rounded-lg cursor-pointer hover:border-green-400 transition-colors">
                  <input
                    type="radio"
                    checked={hitPointMethod === 'average'}
                    onChange={() => setHitPointMethod('average')}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <div className="flex-1">
                    <div className="text-white font-medium">Take Average</div>
                    <div className="text-slate-400 text-sm">
                      Gain {hitPointOptions.average} hit points ({Math.floor(getHitDie(character.class) / 2) + 1} + {constitutionModifier} Con modifier)
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-4 border border-slate-600 rounded-lg cursor-pointer hover:border-green-400 transition-colors">
                  <input
                    type="radio"
                    checked={hitPointMethod === 'roll'}
                    onChange={() => setHitPointMethod('roll')}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <div className="flex-1">
                    <div className="text-white font-medium">Roll for Hit Points</div>
                    <div className="text-slate-400 text-sm">
                      Roll 1d{getHitDie(character.class)} + {constitutionModifier} Con modifier
                    </div>
                  </div>
                </label>
                
                {hitPointMethod === 'roll' && (
                  <div className="ml-8 space-y-3">
                    <button
                      onClick={rollHitPoints}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <Dice6 className="h-4 w-4" />
                      Roll 1d{getHitDie(character.class)}
                    </button>
                    
                    {rolledHP > 0 && (
                      <div className="p-3 bg-slate-700 rounded-lg">
                        <div className="text-white">You rolled: {rolledHP}</div>
                        <div className="text-slate-400 text-sm">
                          Total HP gain: {rolledHP + constitutionModifier} ({rolledHP} + {constitutionModifier} Con)
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {currentStepName === 'asi' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Ability Score Improvement</h3>
                <p className="text-slate-400 mb-4">
                  You can increase your ability scores or choose a feat.
                </p>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 border border-slate-600 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
                  <input
                    type="radio"
                    checked={asiMethod === 'asi'}
                    onChange={() => setAsiMethod('asi')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="text-white font-medium">Improve Ability Scores</div>
                    <div className="text-slate-400 text-sm">Increase one score by 2, or two scores by 1 each</div>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-4 border border-slate-600 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
                  <input
                    type="radio"
                    checked={asiMethod === 'feat'}
                    onChange={() => setAsiMethod('feat')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="text-white font-medium">Choose a Feat</div>
                    <div className="text-slate-400 text-sm">Gain a special ability or feature</div>
                  </div>
                </label>
              </div>
              
              {asiMethod === 'asi' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">Ability Score Improvements</span>
                    <span className="text-slate-400">Points remaining: {availableASIPoints}</span>
                  </div>
                  
                  <div className="space-y-3">
                    {ABILITY_NAMES.map(ability => {
                      const currentScore = character[ability];
                      const improvement = abilityImprovements[ability] || 0;
                      const newScore = currentScore + improvement;
                      
                      return (
                        <div key={ability} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-white font-medium w-24">
                              {ABILITY_DISPLAY_NAMES[ability]}
                            </span>
                            <span className="text-slate-400">
                              {currentScore} → {newScore}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleASIChange(ability, -1)}
                              disabled={improvement === 0}
                              className="p-1 rounded bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="h-4 w-4 text-white" />
                            </button>
                            
                            <span className="text-white w-8 text-center">{improvement}</span>
                            
                            <button
                              onClick={() => handleASIChange(ability, 1)}
                              disabled={availableASIPoints === 0 || improvement === 2 || newScore >= 20}
                              className="p-1 rounded bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="h-4 w-4 text-white" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {asiMethod === 'feat' && (
                <div className="p-4 bg-slate-700 rounded-lg">
                  <p className="text-slate-400">
                    Feat selection will be implemented in a future update. For now, you can choose ability score improvements.
                  </p>
                </div>
              )}
            </div>
          )}
          
          {currentStepName === 'spells' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {spellcastingType === 'spellbook' ? 'Add Spells to Spellbook' : 'Learn New Spells'}
                </h3>
                <p className="text-slate-400 mb-4">
                  {getSpellSelectionExplanation()}
                </p>
              </div>
              
              {(spellcastingType === 'known' || spellcastingType === 'spellbook') && availableSpells.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {availableSpells.map(spell => {
                    const isSelected = selectedSpells.some(s => s.name === spell.name);
                    return (
                      <div
                        key={spell.name}
                        onClick={() => handleSpellToggle(spell)}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          isSelected 
                            ? 'border-purple-500 bg-purple-900/20' 
                            : 'border-slate-600 hover:border-purple-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="text-white font-medium">{spell.name}</h4>
                            <span className="text-xs bg-slate-600 px-2 py-1 rounded">
                              Level {spell.level}
                            </span>
                          </div>
                          {isSelected && <Zap className="h-5 w-5 text-purple-400" />}
                        </div>
                        <p className="text-slate-400 text-sm">{spell.description}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 bg-slate-700 rounded-lg text-center">
                  <BookOpen className="h-12 w-12 text-slate-500 mx-auto mb-3" />
                  <h4 className="text-white font-medium mb-2">
                    {spellcastingType === 'prepared' ? 'No Spell Selection Needed' : 'No New Spells Available'}
                  </h4>
                  <p className="text-slate-400 text-sm mb-4">
                    {spellcastingType === 'prepared' 
                      ? `${character.class}s prepare spells from their entire spell list rather than learning specific spells.`
                      : 'You may have already learned all available spells for your level, or your class doesn&apos;t learn spells at this level.'
                    }
                  </p>
                  <p className="text-blue-300 text-sm">
                    {spellcastingType === 'prepared' 
                      ? 'You can change your prepared spells during a long rest!'
                      : 'You can always learn spells later during your adventures!'
                    }
                  </p>
                </div>
              )}
              
              {(spellcastingType === 'known' || spellcastingType === 'spellbook') && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">
                    Selected: {selectedSpells.length} / {getNewSpellsCount(character.class, newLevel)} (optional)
                  </span>
                  {selectedSpells.length > 0 && (
                    <button
                      onClick={() => setSelectedSpells([])}
                      className="text-purple-400 hover:text-purple-300 text-sm"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
          
          {currentStepName === 'cantrips' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Learn New Cantrips</h3>
                <p className="text-slate-400 mb-4">
                  You can learn {getNewCantripsCount(character.class, newLevel)} new cantrip(s), or skip and learn them later.
                </p>
              </div>
              
              {availableCantrips.filter(cantrip => !character.spellsKnown?.some(s => s.name === cantrip.name)).length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {availableCantrips
                    .filter(cantrip => !character.spellsKnown?.some(s => s.name === cantrip.name))
                    .map(cantrip => {
                      const isSelected = selectedCantrips.some(c => c.name === cantrip.name);
                      return (
                        <div
                          key={cantrip.name}
                          onClick={() => handleCantripToggle(cantrip)}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            isSelected 
                              ? 'border-purple-500 bg-purple-900/20' 
                              : 'border-slate-600 hover:border-purple-400'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="text-white font-medium">{cantrip.name}</h4>
                              <span className="text-xs bg-slate-600 px-2 py-1 rounded">
                                Cantrip
                              </span>
                            </div>
                            {isSelected && <Star className="h-5 w-5 text-yellow-400" />}
                          </div>
                          <p className="text-slate-400 text-sm">{cantrip.description}</p>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="p-6 bg-slate-700 rounded-lg text-center">
                  <Star className="h-12 w-12 text-slate-500 mx-auto mb-3" />
                  <h4 className="text-white font-medium mb-2">No New Cantrips Available</h4>
                  <p className="text-slate-400 text-sm mb-4">
                    You may have already learned all available cantrips, or your class doesn&apos;t learn cantrips at level {newLevel}.
                  </p>
                  <p className="text-blue-300 text-sm">
                    You can always learn cantrips later during your adventures!
                  </p>
                </div>
              )}
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  Selected: {selectedCantrips.length} / {getNewCantripsCount(character.class, newLevel)} (optional)
                </span>
                {selectedCantrips.length > 0 && (
                  <button
                    onClick={() => setSelectedCantrips([])}
                    className="text-purple-400 hover:text-purple-300 text-sm"
                  >
                    Clear Selection
                  </button>
                )}
              </div>
            </div>
          )}
          
          {currentStepName === 'features' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">New Class Features</h3>
                <p className="text-slate-400 mb-4">
                  You gain the following features at level {newLevel}:
                </p>
              </div>
              
              {newFeatures.length > 0 ? (
                <div className="space-y-4">
                  {newFeatures.map((feature, index) => (
                    <div key={index} className="p-4 bg-slate-700 rounded-lg">
                      <h4 className="text-white font-medium mb-2">{feature.name}</h4>
                      <p className="text-slate-400 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-slate-700 rounded-lg text-center">
                  <TrendingUp className="h-12 w-12 text-slate-500 mx-auto mb-3" />
                  <h4 className="text-white font-medium mb-2">No New Features This Level</h4>
                  <p className="text-slate-400 text-sm">
                    You don&apos;t gain any new class features at level {newLevel}, but you still get stronger!
                  </p>
                </div>
              )}
            </div>
          )}
          
          {currentStepName === 'confirm' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Confirm Level Up</h3>
                <p className="text-slate-400 mb-4">
                  Review your choices and confirm your level up.
                </p>
              </div>
              
              <div className="space-y-4">
                {/* Hit Points */}
                <div className="p-4 bg-slate-700 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Hit Points</h4>
                  <p className="text-slate-400">
                    +{choices.hitPointGain} HP ({character.maxHitPoints} → {character.maxHitPoints + choices.hitPointGain})
                  </p>
                </div>
                
                {/* Ability Scores */}
                {Object.keys(abilityImprovements).length > 0 && (
                  <div className="p-4 bg-slate-700 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Ability Score Improvements</h4>
                    {Object.entries(abilityImprovements).map(([ability, improvement]) => (
                      improvement > 0 && (
                        <p key={ability} className="text-slate-400">
                          {ABILITY_DISPLAY_NAMES[ability]}: {character[ability as keyof typeof character] as number} → {(character[ability as keyof typeof character] as number) + improvement}
                        </p>
                      )
                    ))}
                  </div>
                )}
                
                {/* Spells */}
                {selectedSpells.length > 0 && (
                  <div className="p-4 bg-slate-700 rounded-lg">
                    <h4 className="text-white font-medium mb-2">
                      {spellcastingType === 'spellbook' ? 'Spells Added to Spellbook' : 'New Spells Learned'}
                    </h4>
                    {selectedSpells.map(spell => (
                      <p key={spell.name} className="text-slate-400">
                        {spell.name} (Level {spell.level})
                      </p>
                    ))}
                  </div>
                )}
                
                {/* Cantrips */}
                {selectedCantrips.length > 0 && (
                  <div className="p-4 bg-slate-700 rounded-lg">
                    <h4 className="text-white font-medium mb-2">New Cantrips</h4>
                    {selectedCantrips.map(cantrip => (
                      <p key={cantrip.name} className="text-slate-400">
                        {cantrip.name}
                      </p>
                    ))}
                  </div>
                )}
                
                {/* Features */}
                {newFeatures.length > 0 && (
                  <div className="p-4 bg-slate-700 rounded-lg">
                    <h4 className="text-white font-medium mb-2">New Features</h4>
                    {newFeatures.map((feature, index) => (
                      <p key={index} className="text-slate-400">
                        {feature.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-600">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-4 py-2 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-3">
            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleConfirm}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Level Up!
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 