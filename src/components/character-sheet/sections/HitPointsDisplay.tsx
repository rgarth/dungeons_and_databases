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
    deathSaveSuccesses?: boolean[];
    deathSaveFailures?: boolean[];
    spellsPrepared?: Spell[];
  };
  onUpdate: (updates: { 
    hitPoints?: number; 
    temporaryHitPoints?: number; 
    spellsPrepared?: Spell[];
    deathSaveSuccesses?: boolean[];
    deathSaveFailures?: boolean[];
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
        deathSaveSuccesses?: boolean[]; 
        deathSaveFailures?: boolean[]; 
      } = { hitPoints: result.newHitPoints };
      
      // Reset death saves if healed from 0 HP
      if (result.deathSaveResets) {
        updates.deathSaveSuccesses = [false, false, false];
        updates.deathSaveFailures = [false, false, false];
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
    
    // Handle spell preparation clearing for prepared spellcasters
    if (result.spellsPrepared !== undefined) {
      // For prepared spellcasters, we need to preserve cantrips (level 0)
      // Only clear leveled spells (1st level and higher)
      const currentSpellsPrepared = character.spellsPrepared || [];
      const cantrips = currentSpellsPrepared.filter((spell: Spell) => spell.level === 0);
      
      // Set prepared spells to only cantrips (leveled spells are cleared)
      updates.spellsPrepared = cantrips;
    }
    
    onUpdate(updates);
    alert(result.message);
  };

  // Helper to count true values
  function countTrue(arr: boolean[] = []) {
    return arr.filter(Boolean).length;
  }

  const deathSaveSuccesses = character.deathSaveSuccesses || [false, false, false];
  const deathSaveFailures = character.deathSaveFailures || [false, false, false];

  const handleDeathSaveToggle = (type: 'success' | 'failure', idx: number) => {
    const newSuccesses = [...deathSaveSuccesses];
    const newFailures = [...deathSaveFailures];
    if (type === 'success') {
      newSuccesses[idx] = !newSuccesses[idx];
    } else {
      newFailures[idx] = !newFailures[idx];
    }
    onUpdate({
      deathSaveSuccesses: newSuccesses,
      deathSaveFailures: newFailures,
    });
    // Auto-stabilize or death
    if (countTrue(newSuccesses) >= 3) {
      setTimeout(() => {
        onUpdate({
          hitPoints: 1,
          deathSaveSuccesses: [false, false, false],
          deathSaveFailures: [false, false, false],
        });
      }, 1000);
    }
    if (countTrue(newFailures) >= 3) {
      // Optionally handle death
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
          <div className="text-xs text-muted-foreground mb-3">
            💡 Click any circle to mark that saving throw. Click a filled circle to remove it and any after it.
          </div>
        </div>
        
        <div className="flex justify-center gap-8 mb-4">
          {/* Successes */}
          <div className="text-center">
            <div className="text-sm font-medium text-[var(--color-success)] mb-2">Successes</div>
            <div className="flex gap-2">
              {[0, 1, 2].map(i => {
                return (
                  <button
                    key={`success-${i}`}
                    onClick={() => handleDeathSaveToggle('success', i)}
                    className={`w-8 h-8 rounded-full border-2 transition-colors ${
                      deathSaveSuccesses[i]
                        ? 'bg-[var(--color-success)] border-[var(--color-success)]'
                        : 'border-[var(--color-success)] hover:bg-[var(--color-success)]/20'
                    }`}
                    title={deathSaveSuccesses[i] ? `Unmark success ${i+1}` : `Mark success ${i+1}`}
                  />
                );
              })}
            </div>
          </div>
          
          {/* Failures */}
          <div className="text-center">
            <div className="text-sm font-medium text-[var(--color-error)] mb-2">Failures</div>
            <div className="flex gap-2">
              {[0, 1, 2].map(i => {
                return (
                  <button
                    key={`failure-${i}`}
                    onClick={() => handleDeathSaveToggle('failure', i)}
                    className={`w-8 h-8 rounded-full border-2 transition-colors ${
                      deathSaveFailures[i]
                        ? 'bg-[var(--color-error)] border-[var(--color-error)]'
                        : 'border-[var(--color-error)] hover:bg-[var(--color-error)]/20'
                    }`}
                    title={deathSaveFailures[i] ? `Unmark failure ${i+1}` : `Mark failure ${i+1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Status */}
        <div className="text-center mb-4">
          {(countTrue(deathSaveSuccesses) >= 3) && (
            <div className="text-[var(--color-success)] font-medium">Stabilized - gaining 1 HP!</div>
          )}
          {(countTrue(deathSaveFailures) >= 3) && (
            <div className="text-[var(--color-error)] font-medium">DEAD</div>
          )}
        </div>
        
        {/* Emergency Healing Button */}
        <div className="text-center">
          <button
            onClick={() => onUpdate({ hitPoints: 1, deathSaveSuccesses: [false, false, false], deathSaveFailures: [false, false, false] })}
            className="bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-[var(--color-success-text)] text-sm px-4 py-2 rounded font-medium"
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
          <Heart className="h-4 w-4 text-[var(--color-error)]" />
          Hit Points
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleHitPointChange(-1)}
            disabled={character.hitPoints <= 0 && tempHp <= 0}
            className="w-6 h-6 bg-[var(--color-error)] hover:bg-[var(--color-error-hover)] disabled:opacity-50 disabled:cursor-not-allowed rounded text-[var(--color-error-text)] text-xs flex items-center justify-center"
            title={tempHp > 0 ? "Take 1 damage (removes temp HP first)" : "Take 1 damage"}
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="text-foreground font-semibold text-lg min-w-[90px] text-center">
            {character.hitPoints}
            {tempHp > 0 && <span className="text-[var(--color-accent)] font-medium">+{tempHp}</span>}
            /{character.maxHitPoints}
          </span>
          <button
            onClick={() => handleHitPointChange(1)}
            disabled={character.hitPoints >= character.maxHitPoints}
            className="w-6 h-6 bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] disabled:opacity-50 disabled:cursor-not-allowed rounded text-[var(--color-success-text)] text-xs flex items-center justify-center"
            title="Heal 1 HP"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
      
      <div className="w-full bg-muted rounded-full h-4 mb-3">
        <div
          className="h-4 rounded-full transition-all duration-300 relative"
          style={{ 
            width: `${effectiveHpPercentage}%`,
            background: (
              effectiveHpPercentage >= 80 ? 'var(--color-hp-healthy)' :
              effectiveHpPercentage >= 25 ? 'var(--color-hp-warning)' :
              'var(--color-hp-danger)'
            )
          }}
        >
          {tempHp > 0 && (
            <div 
              className="absolute top-0 left-full h-4 rounded-r-full shadow-lg"
              style={{ 
                width: `${Math.min(100 - effectiveHpPercentage, (tempHp / character.maxHitPoints) * 100)}%`,
                maxWidth: `${100 - effectiveHpPercentage}%`,
                backgroundColor: 'var(--color-accent)',
                borderLeft: '1px solid rgba(var(--color-accent), 0.5)'
              }}
              title={`${tempHp} temporary HP - absorbed first when taking damage`}
            />
          )}
        </div>
      </div>
      
      {/* Damage Flow Explanation */}
      {tempHp > 0 && (
        <div className="text-xs text-muted-foreground mb-2 text-center">
          💡 Damage removes <span className="text-[var(--color-accent)] font-medium">{tempHp} temp HP</span> first, then regular HP
        </div>
      )}
      
      {/* Large HP Adjustment Buttons */}
      <div className="flex justify-center gap-2 mb-3">
        <button
          onClick={() => handleHitPointChange(-5)}
          disabled={character.hitPoints <= 0 && tempHp <= 0}
          className="bg-[var(--color-error)] hover:bg-[var(--color-error-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-error-text)] text-xs px-2 py-1 rounded"
          title={tempHp > 0 ? "Take 5 damage (removes temp HP first)" : "Take 5 damage"}
        >
          -5
        </button>
        <button
          onClick={() => handleHitPointChange(-10)}
          disabled={character.hitPoints <= 0 && tempHp <= 0}
          className="bg-[var(--color-error)] hover:bg-[var(--color-error-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-error-text)] text-xs px-2 py-1 rounded"
          title={tempHp > 0 ? "Take 10 damage (removes temp HP first)" : "Take 10 damage"}
        >
          -10
        </button>
        <button
          onClick={() => handleHitPointChange(5)}
          disabled={character.hitPoints >= character.maxHitPoints}
          className="bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-success-text)] text-xs px-2 py-1 rounded"
          title="Heal 5 HP"
        >
          +5
        </button>
        <button
          onClick={() => handleHitPointChange(10)}
          disabled={character.hitPoints >= character.maxHitPoints}
          className="bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-success-text)] text-xs px-2 py-1 rounded"
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
              className="w-16 px-2 py-1 text-xs bg-background text-foreground rounded border border-border focus:border-[var(--color-accent)] focus:outline-none"
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
              className="bg-[var(--color-error)] hover:bg-[var(--color-error-hover)] text-[var(--color-error-text)] text-xs px-2 py-1 rounded"
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
              className="bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-[var(--color-success-text)] text-xs px-2 py-1 rounded"
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
      <div className="pt-3 border-t border-[var(--color-border)]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-muted-foreground text-sm">Temp HP</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleTemporaryHitPointChange(-1)}
              disabled={tempHp <= 0}
              className="w-5 h-5 bg-[var(--color-accent)]/80 hover:bg-[var(--color-accent)] disabled:opacity-50 disabled:cursor-not-allowed rounded text-[var(--color-accent-text)] text-xs flex items-center justify-center"
              title="Remove 1 temp HP"
            >
              <Minus className="h-2 w-2" />
            </button>
            <span className="text-[var(--color-accent)] font-medium text-sm min-w-[30px] text-center">
              {tempHp}
            </span>
            <button
              onClick={() => handleTemporaryHitPointChange(1)}
              className="w-5 h-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded text-[var(--color-accent-text)] text-xs flex items-center justify-center"
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
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-accent-text)] text-xs px-2 py-1 rounded"
            title="Remove 5 temp HP"
          >
            -5
          </button>
          <button
            onClick={() => handleTemporaryHitPointChange(5)}
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] text-xs px-2 py-1 rounded"
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
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-button-text)] text-sm px-3 py-2 rounded font-medium transition-colors flex items-center justify-center gap-1"
          title="Take a short rest (1 hour) - recover some HP using Hit Dice"
        >
          <Heart className="h-4 w-4" />
          Short Rest
        </button>
        <button
          onClick={handleLongRest}
          className="bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-[var(--color-success-text)] text-sm px-3 py-2 rounded font-medium transition-colors flex items-center justify-center gap-1"
          title="Take a long rest (8 hours) - fully restore HP and spell slots"
        >
          <Shield className="h-4 w-4" />
          Long Rest
        </button>
      </div>
    </div>
  );
} 