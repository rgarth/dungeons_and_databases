"use client";

import { Heart, Shield, Plus, Minus, Zap } from "lucide-react";
import { createDamageService } from "@/services/character/damage";
import type { Spell } from "@/lib/dnd/spells";
import { useState } from "react";

interface HitPointsDisplayProps {
  character: {
    id: string;
    class: string;
    hitPoints: number;
    maxHitPoints: number;
    temporaryHitPoints?: number;
    constitution: number;
    deathSaveSuccesses?: number;
    deathSaveFailures?: number;
  };
  onUpdate: (updates: { 
    hitPoints?: number; 
    temporaryHitPoints?: number; 
    spellsPrepared?: Spell[];
    deathSaveSuccesses?: number;
    deathSaveFailures?: number;
  }) => void;
}

export function HitPointsDisplay({ character, onUpdate }: HitPointsDisplayProps) {
  const damageService = createDamageService(character);
  const tempHp = character.temporaryHitPoints || 0;
  const hpPercentage = (character.hitPoints / character.maxHitPoints) * 100;
  const effectiveHpPercentage = tempHp > 0 
    ? Math.min(100, (character.hitPoints / character.maxHitPoints) * 100)
    : hpPercentage;
  
  const [customDamage, setCustomDamage] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleHitPointChange = (change: number) => {
    if (change < 0) {
      // Taking damage - use centralized service
      const result = damageService.takeDamage(Math.abs(change));
      onUpdate({ 
        hitPoints: result.newHitPoints, 
        temporaryHitPoints: result.newTemporaryHitPoints 
      });
    } else {
      // Healing - use centralized service
      const result = damageService.heal(change);
      const updates: { 
        hitPoints: number; 
        deathSaveSuccesses?: number; 
        deathSaveFailures?: number; 
      } = { hitPoints: result.newHitPoints };
      
      // Reset death saves if healed from 0 HP
      if (result.deathSaveResets) {
        updates.deathSaveSuccesses = 0;
        updates.deathSaveFailures = 0;
      }
      
      onUpdate(updates);
    }
  };

  const handleTemporaryHitPointChange = (change: number) => {
    const newTempHp = damageService.adjustTemporaryHP(change);
    onUpdate({ temporaryHitPoints: newTempHp });
  };

  const handleShortRest = async () => {
    const result = damageService.shortRest();
    
    if (result.hitPointsGained === 0) {
      alert(result.message);
      return;
    }
    
    onUpdate({ hitPoints: result.newHitPoints });
    alert(result.message);
  };

  const handleLongRest = async () => {
    const result = damageService.longRest();
    
    const updates: { 
      hitPoints: number; 
      spellsPrepared?: Spell[]; 
    } = { hitPoints: result.newHitPoints };
    if (result.spellsPrepared !== undefined) {
      updates.spellsPrepared = result.spellsPrepared;
    }
    
    onUpdate(updates);
    alert(result.message);
  };

  const handleDeathSaveChange = (type: 'success' | 'failure', count: number) => {
    const result = damageService.updateDeathSaves(type, count);
    
    // Update death saves
    onUpdate({ 
      deathSaveSuccesses: result.newSuccesses,
      deathSaveFailures: result.newFailures 
    });
    
    // Auto-stabilize if needed
    if (result.autoStabilize) {
      setTimeout(() => {
        onUpdate({ 
          hitPoints: result.autoStabilize!.newHitPoints,
          deathSaveSuccesses: result.autoStabilize!.newSuccesses,
          deathSaveFailures: result.autoStabilize!.newFailures 
        });
      }, 1000);
    }
  };

  // Death Saves Mode when HP ≤ 0
  if (character.hitPoints <= 0) {
    return (
      <div>
        <div className="text-center mb-4">
          <div className="text-xl font-bold text-destructive mb-2">Death Saving Throws</div>
          <div className="text-sm text-muted-foreground mb-3">
            Roll d20: 10+ = Success, 1-9 = Failure
          </div>
        </div>
        
        <div className="flex justify-center gap-8 mb-4">
          {/* Successes */}
          <div className="text-center">
            <div className="text-sm font-medium text-green-600 mb-2">Successes</div>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <button
                  key={`success-${i}`}
                  onClick={() => handleDeathSaveChange('success', i)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors ${
                    (character.deathSaveSuccesses || 0) >= i
                      ? 'bg-green-600 border-green-600'
                      : 'border-green-600 hover:bg-green-600/20'
                  }`}
                  title={`Mark ${i} success${i > 1 ? 'es' : ''}`}
                />
              ))}
            </div>
          </div>
          
          {/* Failures */}
          <div className="text-center">
            <div className="text-sm font-medium text-red-600 mb-2">Failures</div>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <button
                  key={`failure-${i}`}
                  onClick={() => handleDeathSaveChange('failure', i)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors ${
                    (character.deathSaveFailures || 0) >= i
                      ? 'bg-red-600 border-red-600'
                      : 'border-red-600 hover:bg-red-600/20'
                  }`}
                  title={`Mark ${i} failure${i > 1 ? 's' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Status */}
        <div className="text-center mb-4">
          {(character.deathSaveSuccesses || 0) >= 3 && (
            <div className="text-green-600 font-medium">Stabilized - gaining 1 HP!</div>
          )}
          {(character.deathSaveFailures || 0) >= 3 && (
            <div className="text-red-600 font-medium">DEAD</div>
          )}
        </div>
        
        {/* Emergency Healing Button */}
        <div className="text-center">
          <button
            onClick={() => onUpdate({ hitPoints: 1, deathSaveSuccesses: 0, deathSaveFailures: 0 })}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded font-medium"
          >
            Heal to 1 HP
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-muted-foreground flex items-center gap-2">
          <Heart className="h-4 w-4 text-red-600" />
          Hit Points
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleHitPointChange(-1)}
            disabled={character.hitPoints <= 0 && tempHp <= 0}
            className="w-6 h-6 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded text-white text-xs flex items-center justify-center"
            title={tempHp > 0 ? "Take 1 damage (removes temp HP first)" : "Take 1 damage"}
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="text-foreground font-semibold text-lg min-w-[90px] text-center">
            {character.hitPoints}
            {tempHp > 0 && <span className="text-blue-600 font-medium">+{tempHp}</span>}
            /{character.maxHitPoints}
          </span>
          <button
            onClick={() => handleHitPointChange(1)}
            disabled={character.hitPoints >= character.maxHitPoints}
            className="w-6 h-6 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded text-white text-xs flex items-center justify-center"
            title="Heal 1 HP"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
      
      <div className="w-full bg-muted rounded-full h-4 mb-3">
        <div
          className="bg-gradient-to-r from-red-600 to-green-600 h-4 rounded-full transition-all duration-300 relative"
          style={{ width: `${effectiveHpPercentage}%` }}
        >
          {tempHp > 0 && (
            <div 
              className="absolute top-0 left-full h-4 bg-blue-600 rounded-r-full shadow-lg border-l border-blue-600/50"
              style={{ 
                width: `${Math.min(100 - effectiveHpPercentage, (tempHp / character.maxHitPoints) * 100)}%`,
                maxWidth: `${100 - effectiveHpPercentage}%`
              }}
              title={`${tempHp} temporary HP - absorbed first when taking damage`}
            />
          )}
        </div>
      </div>
      
      {/* Damage Flow Explanation */}
      {tempHp > 0 && (
        <div className="text-xs text-muted-foreground mb-2 text-center">
          💡 Damage removes <span className="text-blue-600 font-medium">{tempHp} temp HP</span> first, then regular HP
        </div>
      )}
      
      {/* Large HP Adjustment Buttons */}
      <div className="flex justify-center gap-2 mb-3">
        <button
          onClick={() => handleHitPointChange(-5)}
          disabled={character.hitPoints <= 0 && tempHp <= 0}
          className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs px-2 py-1 rounded"
          title={tempHp > 0 ? "Take 5 damage (removes temp HP first)" : "Take 5 damage"}
        >
          -5
        </button>
        <button
          onClick={() => handleHitPointChange(-10)}
          disabled={character.hitPoints <= 0 && tempHp <= 0}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs px-2 py-1 rounded"
          title={tempHp > 0 ? "Take 10 damage (removes temp HP first)" : "Take 10 damage"}
        >
          -10
        </button>
        <button
          onClick={() => handleHitPointChange(5)}
          disabled={character.hitPoints >= character.maxHitPoints}
          className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs px-2 py-1 rounded"
          title="Heal 5 HP"
        >
          +5
        </button>
        <button
          onClick={() => handleHitPointChange(10)}
          disabled={character.hitPoints >= character.maxHitPoints}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs px-2 py-1 rounded"
          title="Heal 10 HP"
        >
          +10
        </button>
      </div>
      
      {/* Custom Damage/Healing Input */}
      <div className="flex justify-center mb-3">
        {!showCustomInput ? (
          <button
            onClick={() => setShowCustomInput(true)}
            className="bg-muted hover:bg-muted/80 text-muted-foreground text-xs px-3 py-1 rounded flex items-center gap-1"
            title="Enter custom damage/healing amount"
          >
            <Zap className="h-3 w-3" />
            Custom
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={customDamage}
              onChange={(e) => setCustomDamage(e.target.value)}
              placeholder="Amount"
              className="w-16 px-2 py-1 text-xs bg-background text-foreground rounded border border-border focus:border-blue-600 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const amount = parseInt(customDamage);
                  if (!isNaN(amount) && amount !== 0) {
                    handleHitPointChange(amount);
                    setCustomDamage("");
                    setShowCustomInput(false);
                  }
                }
              }}
            />
            <button
              onClick={() => {
                const amount = parseInt(customDamage);
                if (!isNaN(amount) && amount !== 0) {
                  handleHitPointChange(-Math.abs(amount));
                  setCustomDamage("");
                  setShowCustomInput(false);
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
              title="Apply as damage"
            >
              Dmg
            </button>
            <button
              onClick={() => {
                const amount = parseInt(customDamage);
                if (!isNaN(amount) && amount !== 0) {
                  handleHitPointChange(Math.abs(amount));
                  setCustomDamage("");
                  setShowCustomInput(false);
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded"
              title="Apply as healing"
            >
              Heal
            </button>
            <button
              onClick={() => {
                setCustomDamage("");
                setShowCustomInput(false);
              }}
              className="bg-muted hover:bg-muted/80 text-foreground text-xs px-2 py-1 rounded"
              title="Cancel"
            >
              ✕
            </button>
          </div>
        )}
      </div>
      
      {/* Temporary Hit Points Section */}
      <div className="pt-3 border-t border-border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-muted-foreground text-sm">Temp HP</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleTemporaryHitPointChange(-1)}
              disabled={tempHp <= 0}
              className="w-5 h-5 bg-blue-600/80 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded text-white text-xs flex items-center justify-center"
              title="Remove 1 temp HP"
            >
              <Minus className="h-2 w-2" />
            </button>
            <span className="text-blue-600 font-medium text-sm min-w-[30px] text-center">
              {tempHp}
            </span>
            <button
              onClick={() => handleTemporaryHitPointChange(1)}
              className="w-5 h-5 bg-blue-600 hover:bg-blue-700 rounded text-white text-xs flex items-center justify-center"
              title="Add 1 temp HP"
            >
              <Plus className="h-2 w-2" />
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-1">
          <button
            onClick={() => handleTemporaryHitPointChange(-5)}
            disabled={tempHp <= 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs px-2 py-1 rounded"
            title="Remove 5 temp HP"
          >
            -5
          </button>
          <button
            onClick={() => handleTemporaryHitPointChange(5)}
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
            title="Add 5 temp HP"
          >
            +5
          </button>
          {tempHp > 0 && (
            <button
              onClick={() => handleTemporaryHitPointChange(-tempHp)}
              className="bg-muted hover:bg-muted/80 text-foreground text-xs px-2 py-1 rounded"
              title="Clear all temp HP"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      {/* Rest Buttons */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={handleShortRest}
          className="bg-primary hover:bg-primary/80 text-primary-foreground text-sm px-3 py-2 rounded font-medium transition-colors flex items-center justify-center gap-1"
          title="Take a short rest (1 hour) - recover some HP using Hit Dice"
        >
          <Heart className="h-4 w-4" />
          Short Rest
        </button>
        <button
          onClick={handleLongRest}
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded font-medium transition-colors flex items-center justify-center gap-1"
          title="Take a long rest (8 hours) - fully restore HP and spell slots"
        >
          <Shield className="h-4 w-4" />
          Long Rest
        </button>
      </div>
    </div>
  );
} 