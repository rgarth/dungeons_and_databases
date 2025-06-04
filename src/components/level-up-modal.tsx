"use client";

import { useState, useEffect } from "react";
import { X, Dice6, Plus, Minus, Zap, BookOpen, Star, TrendingUp } from "lucide-react";
import { 
  levelUpCharacter, 
  hasAbilityScoreImprovement, 
  getHitPointGainOptions, 
  getHitDie,
  isSpellcaster,
  needsSpellSelection,
  needsCantripsSelection,
  getSpellsKnownCount,
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
    spells?: Spell[];
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
  
  // Determine what steps are needed
  const needsHitPoints = true;
  const needsASI = hasAbilityScoreImprovement(character.class, newLevel);
  const needsSpells = isSpellcaster(character.class) && needsSpellSelection(character.class, newLevel);
  const needsCantrips = isSpellcaster(character.class) && needsCantripsSelection(character.class, newLevel);
  const needsSubclass = newLevel === 3; // Most classes choose subclass at level 3
  
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
        // Filter spells by level that character can learn
        const maxSpellLevel = Math.min(Math.ceil(newLevel / 2), 9);
        setAvailableSpells(classSpells.filter(spell => 
          spell.level > 0 && spell.level <= maxSpellLevel
        ));
      }
    }
    
    // Set initial hit point gain
    if (hitPointMethod === 'average') {
      setChoices(prev => ({ ...prev, hitPointGain: hitPointOptions.average }));
    }
  }, [character.class, newLevel, hitPointMethod, hitPointOptions.average, needsSpells, needsCantrips]);
  
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
      const spellsKnown = getSpellsKnownCount(character.class, character.level);
      const newSpellsKnown = getSpellsKnownCount(character.class, newLevel);
      const canLearnMore = selectedSpells.length < (newSpellsKnown - spellsKnown);
      
      if (canLearnMore) {
        setSelectedSpells(prev => [...prev, spell]);
      }
    }
  };
  
  const handleCantripToggle = (cantrip: Spell) => {
    const isSelected = selectedCantrips.some(c => c.name === cantrip.name);
    if (isSelected) {
      setSelectedCantrips(prev => prev.filter(c => c.name !== cantrip.name));
    } else {
      // Most classes gain 1 cantrip at levels where they gain cantrips
      if (selectedCantrips.length < 1) {
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
    
    // Add new spells
    if (result.newSpells && result.newSpells.length > 0) {
      updates.spells = [...(character.spells || []), ...result.newSpells];
    }
    
    onLevelUp(updates);
    onClose();
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
                <h3 className="text-lg font-semibold text-white mb-2">Hit Point Increase</h3>
                <p className="text-slate-400 mb-4">
                  Choose how to determine your hit point increase for this level.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="flex items-center gap-3 p-4 border border-slate-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors flex-1">
                    <input
                      type="radio"
                      name="hitpoint-method"
                      value="average"
                      checked={hitPointMethod === 'average'}
                      onChange={(e) => setHitPointMethod(e.target.value as 'roll' | 'average')}
                      className="text-purple-500"
                    />
                    <div>
                      <div className="text-white font-medium">Take Average</div>
                      <div className="text-slate-400 text-sm">
                        Gain {hitPointOptions.average} HP (safe choice)
                      </div>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border border-slate-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors flex-1">
                    <input
                      type="radio"
                      name="hitpoint-method"
                      value="roll"
                      checked={hitPointMethod === 'roll'}
                      onChange={(e) => setHitPointMethod(e.target.value as 'roll' | 'average')}
                      className="text-purple-500"
                    />
                    <div>
                      <div className="text-white font-medium">Roll Dice</div>
                      <div className="text-slate-400 text-sm">
                        Roll 1d{getHitDie(character.class)} + {constitutionModifier} (risky)
                      </div>
                    </div>
                  </label>
                </div>
                
                {hitPointMethod === 'roll' && (
                  <div className="p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <button
                        onClick={rollHitPoints}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                      >
                        <Dice6 className="h-4 w-4" />
                        Roll 1d{getHitDie(character.class)}
                      </button>
                      {rolledHP > 0 && (
                        <div className="text-white">
                          Rolled: {rolledHP} + {constitutionModifier} = <strong>{rolledHP + constitutionModifier} HP</strong>
                        </div>
                      )}
                    </div>
                    {rolledHP === 0 && (
                      <p className="text-slate-400 text-sm">Click to roll for your hit point increase!</p>
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
                  You can increase ability scores or choose a feat.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="flex items-center gap-3 p-4 border border-slate-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors flex-1">
                    <input
                      type="radio"
                      name="asi-method"
                      value="asi"
                      checked={asiMethod === 'asi'}
                      onChange={(e) => setAsiMethod(e.target.value as 'asi' | 'feat')}
                      className="text-purple-500"
                    />
                    <div>
                      <div className="text-white font-medium">Ability Score Improvement</div>
                      <div className="text-slate-400 text-sm">
                        Increase abilities by 2 points total
                      </div>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border border-slate-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors flex-1">
                    <input
                      type="radio"
                      name="asi-method"
                      value="feat"
                      checked={asiMethod === 'feat'}
                      onChange={(e) => setAsiMethod(e.target.value as 'asi' | 'feat')}
                      className="text-purple-500"
                    />
                    <div>
                      <div className="text-white font-medium">Feat</div>
                      <div className="text-slate-400 text-sm">
                        Choose a special ability (not implemented yet)
                      </div>
                    </div>
                  </label>
                </div>
                
                {asiMethod === 'asi' && (
                  <div className="space-y-3">
                    <div className="text-sm text-slate-400 mb-3">
                      Points remaining: {availableASIPoints}
                    </div>
                    {ABILITY_NAMES.map(ability => {
                      const currentValue = character[ability];
                      const improvement = abilityImprovements[ability] || 0;
                      const newValue = currentValue + improvement;
                      
                      return (
                        <div key={ability} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-white font-medium w-20">
                              {ABILITY_DISPLAY_NAMES[ability]}
                            </span>
                            <span className="text-slate-400">
                              {currentValue} → {newValue} ({getModifier(newValue) >= 0 ? '+' : ''}{getModifier(newValue)})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleASIChange(ability, -1)}
                              disabled={improvement <= 0}
                              className="p-1 hover:bg-slate-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="h-4 w-4 text-slate-400" />
                            </button>
                            <span className="text-white w-8 text-center">{improvement}</span>
                            <button
                              onClick={() => handleASIChange(ability, 1)}
                              disabled={improvement >= 2 || newValue >= 20 || availableASIPoints <= 0}
                              className="p-1 hover:bg-slate-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="h-4 w-4 text-slate-400" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {asiMethod === 'feat' && (
                  <div className="p-4 bg-slate-700 rounded-lg">
                    <p className="text-slate-400">Feat selection is not yet implemented. This will allow you to choose special abilities like Great Weapon Master, Sharpshooter, etc.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {currentStepName === 'spells' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Learn New Spells</h3>
                <p className="text-slate-400 mb-4">
                  You can learn {getSpellsKnownCount(character.class, newLevel) - getSpellsKnownCount(character.class, character.level)} new spell(s), or skip and learn them later.
                </p>
              </div>
              
              {availableSpells.filter(spell => !character.spells?.some(s => s.name === spell.name)).length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {availableSpells
                    .filter(spell => !character.spells?.some(s => s.name === spell.name))
                    .map(spell => {
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
                  <h4 className="text-white font-medium mb-2">No New Spells Available</h4>
                  <p className="text-slate-400 text-sm mb-4">
                    {character.class === 'Cleric' || character.class === 'Druid' 
                      ? `${character.class}s prepare spells from their entire spell list rather than learning specific spells.`
                      : `You may have already learned all available spells for your level, or your class doesn&apos;t learn spells at level ${newLevel}.`
                    }
                  </p>
                  <p className="text-blue-300 text-sm">
                    You can always learn spells later during your adventures!
                  </p>
                </div>
              )}
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  Selected: {selectedSpells.length} / {getSpellsKnownCount(character.class, newLevel) - getSpellsKnownCount(character.class, character.level)} (optional)
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
            </div>
          )}
          
          {currentStepName === 'cantrips' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Learn New Cantrips</h3>
                <p className="text-slate-400 mb-4">
                  You can learn 1 new cantrip, or skip and learn it later.
                </p>
              </div>
              
              {availableCantrips.filter(cantrip => !character.spells?.some(s => s.name === cantrip.name)).length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {availableCantrips
                    .filter(cantrip => !character.spells?.some(s => s.name === cantrip.name))
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
                  Selected: {selectedCantrips.length} / 1 (optional)
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
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-5 w-5 text-blue-400" />
                        <h4 className="text-white font-medium">{feature.name}</h4>
                        <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                          {feature.type}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm">{feature.description}</p>
                      {feature.usageType && feature.usageType !== 'passive' && (
                        <p className="text-blue-300 text-xs mt-2">
                          Usage: {feature.usageType}
                          {feature.usesPerRest && ` (${feature.usesPerRest} uses)`}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-slate-700 rounded-lg">
                  <p className="text-slate-400">No new class features at this level.</p>
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
                    <h4 className="text-white font-medium mb-2">New Spells</h4>
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
            className="px-4 py-2 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            Previous
          </button>
          
          <div className="text-sm text-slate-400">
            {currentStep + 1} of {steps.length}
          </div>
          
          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-medium"
            >
              Level Up!
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 