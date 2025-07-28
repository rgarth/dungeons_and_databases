"use client";

import { Heart, Shield, Zap, Skull } from "lucide-react";
import { ActiveCondition, getCondition } from "@/lib/dnd/conditions";

interface CharacterCombatProps {
  character: {
    hitPoints: number;
    maxHitPoints: number;
    temporaryHitPoints?: number;
    armorClass: number;
    speed: number;
    deathSaveSuccesses?: boolean[];
    deathSaveFailures?: boolean[];
    conditions?: ActiveCondition[];
  };
  onUpdateHitPoints?: (hitPoints: number) => void;
  onUpdateTemporaryHitPoints?: (temporaryHitPoints: number) => void;
  onUpdateDeathSaves?: (successes: boolean[], failures: boolean[]) => void;
}

export function CharacterCombat({ 
  character, 
  onUpdateHitPoints, 
  onUpdateTemporaryHitPoints, 
  onUpdateDeathSaves 
}: CharacterCombatProps) {
  
  const handleHitPointsChange = (newHitPoints: number) => {
    if (onUpdateHitPoints) {
      onUpdateHitPoints(Math.max(0, Math.min(newHitPoints, character.maxHitPoints)));
    }
  };

  const handleTemporaryHitPointsChange = (newTempHP: number) => {
    if (onUpdateTemporaryHitPoints) {
      onUpdateTemporaryHitPoints(Math.max(0, newTempHP));
    }
  };

  const handleDeathSaveToggle = (type: 'success' | 'failure', index: number) => {
    if (!onUpdateDeathSaves) return;
    
    const currentSuccesses = character.deathSaveSuccesses || [];
    const currentFailures = character.deathSaveFailures || [];
    
    if (type === 'success') {
      const newSuccesses = [...currentSuccesses];
      newSuccesses[index] = !newSuccesses[index];
      onUpdateDeathSaves(newSuccesses, currentFailures);
    } else {
      const newFailures = [...currentFailures];
      newFailures[index] = !newFailures[index];
      onUpdateDeathSaves(currentSuccesses, newFailures);
    }
  };

  const getHitPointsColor = () => {
    const percentage = character.hitPoints / character.maxHitPoints;
    if (percentage <= 0.25) return 'text-red-400';
    if (percentage <= 0.5) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      {/* Hit Points */}
      <div className="bg-slate-700 rounded-lg p-4" style={{ backgroundColor: 'var(--color-surface-secondary)' }}>
        <div className="flex items-center gap-2 mb-3">
          <Heart className="h-5 w-5 text-red-400" />
          <h3 className="text-lg font-semibold text-white" style={{ color: 'var(--color-text-primary)' }}>
            Hit Points
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current HP */}
          <div>
            <label className="block text-sm text-slate-300 mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              Current HP
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={character.hitPoints}
                onChange={(e) => handleHitPointsChange(parseInt(e.target.value) || 0)}
                className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                style={{ 
                  backgroundColor: 'var(--color-surface-primary)', 
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-primary)'
                }}
                min="0"
                max={character.maxHitPoints}
              />
              <span className="text-slate-400" style={{ color: 'var(--color-text-secondary)' }}>
                / {character.maxHitPoints}
              </span>
            </div>
          </div>

          {/* Temporary HP */}
          <div>
            <label className="block text-sm text-slate-300 mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              Temporary HP
            </label>
            <input
              type="number"
              value={character.temporaryHitPoints || 0}
              onChange={(e) => handleTemporaryHitPointsChange(parseInt(e.target.value) || 0)}
              className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
              style={{ 
                backgroundColor: 'var(--color-surface-primary)', 
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)'
              }}
              min="0"
            />
          </div>
        </div>

        {/* HP Bar */}
        <div className="mt-3">
          <div className="w-full bg-slate-600 rounded-full h-2" style={{ backgroundColor: 'var(--color-surface-primary)' }}>
            <div 
              className={`h-2 rounded-full transition-all ${getHitPointsColor()}`}
              style={{ 
                width: `${Math.max(0, Math.min(100, (character.hitPoints / character.maxHitPoints) * 100))}%`,
                backgroundColor: character.hitPoints / character.maxHitPoints <= 0.25 ? '#f87171' : 
                               character.hitPoints / character.maxHitPoints <= 0.5 ? '#fbbf24' : '#4ade80'
              }}
            />
          </div>
        </div>
      </div>

      {/* Armor Class and Speed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-700 rounded-lg p-4 text-center" style={{ backgroundColor: 'var(--color-surface-secondary)' }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white" style={{ color: 'var(--color-text-primary)' }}>
              Armor Class
            </h3>
          </div>
          <div className="text-3xl font-bold text-white" style={{ color: 'var(--color-text-primary)' }}>
            {character.armorClass}
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-4 text-center" style={{ backgroundColor: 'var(--color-surface-secondary)' }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white" style={{ color: 'var(--color-text-primary)' }}>
              Speed
            </h3>
          </div>
          <div className="text-3xl font-bold text-white" style={{ color: 'var(--color-text-primary)' }}>
            {character.speed} ft
          </div>
        </div>
      </div>

      {/* Death Saves */}
      <div className="bg-slate-700 rounded-lg p-4" style={{ backgroundColor: 'var(--color-surface-secondary)' }}>
        <div className="flex items-center gap-2 mb-3">
          <Skull className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold text-white" style={{ color: 'var(--color-text-primary)' }}>
            Death Saves
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Successes */}
          <div>
            <div className="text-sm text-slate-300 mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Successes
            </div>
            <div className="flex gap-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => handleDeathSaveToggle('success', index)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                    character.deathSaveSuccesses?.[index] 
                      ? 'bg-green-500 border-green-400 text-white' 
                      : 'border-slate-500 text-slate-400 hover:border-green-400'
                  }`}
                >
                  {character.deathSaveSuccesses?.[index] ? '✓' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Failures */}
          <div>
            <div className="text-sm text-slate-300 mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Failures
            </div>
            <div className="flex gap-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => handleDeathSaveToggle('failure', index)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                    character.deathSaveFailures?.[index] 
                      ? 'bg-red-500 border-red-400 text-white' 
                      : 'border-slate-500 text-slate-400 hover:border-red-400'
                  }`}
                >
                  {character.deathSaveFailures?.[index] ? '✗' : ''}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conditions */}
      {character.conditions && character.conditions.length > 0 && (
        <div className="bg-slate-700 rounded-lg p-4" style={{ backgroundColor: 'var(--color-surface-secondary)' }}>
          <h3 className="text-lg font-semibold text-white mb-3" style={{ color: 'var(--color-text-primary)' }}>
            Conditions
          </h3>
          <div className="flex flex-wrap gap-2">
            {character.conditions.map((condition, index) => {
              const conditionInfo = getCondition(condition.name);
              return (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded-full"
                  title={conditionInfo?.description || condition.name}
                >
                  {condition.name}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
} 