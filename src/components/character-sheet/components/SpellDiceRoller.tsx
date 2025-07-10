"use client";

import { useState } from 'react';
import { Spell } from '@/lib/dnd/spells';
import { createSpellDiceService } from '@/services/character/spell-dice';
import { useDiceRoll } from '@/components/providers/dice-provider';

interface SpellDiceRollerProps {
  spell: Spell;
  character: {
    level: number;
    spellcastingAbility?: string;
    spellSlots?: Record<number, number>;
    usedSpellSlots?: Record<number, number>;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  onUseSpellSlot?: (level: number) => void;
  className?: string;
}

export function SpellDiceRoller({ 
  spell, 
  character, 
  onUseSpellSlot,
  className = "" 
}: SpellDiceRollerProps) {
  const [selectedSlotLevel, setSelectedSlotLevel] = useState(spell.level);
  const { rollDice } = useDiceRoll();
  
  const spellDiceService = createSpellDiceService(character);
  const availableSlots = spellDiceService.getAvailableSlotLevels(spell);
  const spellRolls = spellDiceService.calculateSpellRolls(spell, selectedSlotLevel);
  
  const handleRoll = (rollType: 'attack' | 'damage' | 'healing') => {
    let notation = '';
    
    switch (rollType) {
      case 'attack':
        if (spellRolls.attackRoll) {
          notation = spellRolls.attackRoll;
        }
        break;
      case 'damage':
        if (spellRolls.damageRoll) {
          notation = spellRolls.damageRoll;
        }
        break;
      case 'healing':
        if (spellRolls.healingRoll) {
          notation = spellRolls.healingRoll;
        }
        break;
    }
    
    if (notation) {
      // Debug logging to see the exact notation
      console.log(`🎲 Debug - ${rollType} notation: "${notation}"`);
      console.log(`🎲 Debug - spellRolls:`, spellRolls);
      
      // Always roll dice first - this should never fail
      try {
        rollDice(notation);
        console.log(`🎲 Rolling ${rollType}: ${notation}`);
      } catch (error) {
        console.error('Dice rolling failed:', error);
        // Even if dice rolling fails, don't break the component
      }
      
      // Use spell slot for attack rolls and healing rolls (casting the spell)
      // This follows D&D 5e rules: spell slots are consumed when casting the spell,
      // not when rolling damage for an already-cast spell
      // Cantrips (level 0) don't consume spell slots
      if ((rollType === 'attack' || rollType === 'healing') && spell.level > 0 && onUseSpellSlot) {
        // Use setTimeout to ensure dice rolling completes first
        setTimeout(() => {
          try {
            onUseSpellSlot(selectedSlotLevel);
          } catch (error) {
            console.error('Failed to use spell slot:', error);
            // Don't let spell slot errors break the dice rolling
          }
        }, 100);
      }
    }
  };

  // Don't render if no dice rolls are available
  if (!spellRolls.attackRoll && !spellRolls.damageRoll && !spellRolls.healingRoll && !spellRolls.saveDC) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Spell Slot Level Selector */}
      {spell.level > 0 && availableSlots.length > 1 && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-text-secondary)]">Cast at level:</span>
          <select
            value={selectedSlotLevel}
            onChange={(e) => setSelectedSlotLevel(parseInt(e.target.value))}
            className="text-xs px-2 py-1 rounded border bg-[var(--color-card)] text-[var(--color-text-primary)]"
          >
            {availableSlots.map(level => (
              <option key={level} value={level}>
                {level === spell.level ? `${level} (base)` : `${level} (upcast)`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Dice Roll Buttons */}
      <div className="flex flex-wrap gap-2">
        {/* Attack Roll */}
        {spellRolls.attackRoll && (
          <button
            onClick={() => handleRoll('attack')}
            className="px-3 py-1 text-xs rounded font-medium transition-colors hover:scale-105"
            style={{
              backgroundColor: 'var(--color-success)',
              color: 'var(--color-success-text)'
            }}
            title={`Roll spell attack: ${spellRolls.attackRoll}`}
          >
            Attack: {spellRolls.attackRoll}
          </button>
        )}

        {/* Damage Roll */}
        {spellRolls.damageRoll && (
          <button
            onClick={() => handleRoll('damage')}
            className="px-3 py-1 text-xs rounded font-medium transition-colors hover:scale-105"
            style={{
              backgroundColor: 'var(--color-danger)',
              color: 'var(--color-danger-text)'
            }}
            title={`Roll damage: ${spellRolls.damageRoll}${spellRolls.damageType ? ` (${spellRolls.damageType})` : ''}`}
          >
            Damage: {spellRolls.damageRoll}
            {spellRolls.damageType && (
              <span className="ml-1 opacity-75">({spellRolls.damageType})</span>
            )}
          </button>
        )}

        {/* Healing Roll */}
        {spellRolls.healingRoll && (
          <button
            onClick={() => handleRoll('healing')}
            className="px-3 py-1 text-xs rounded font-medium transition-colors hover:scale-105"
            style={{
              backgroundColor: 'var(--color-success)',
              color: 'var(--color-success-text)'
            }}
            title={`Roll healing: ${spellRolls.healingRoll}`}
          >
            Heal: {spellRolls.healingRoll}
          </button>
        )}

        {/* Save DC Display */}
        {spellRolls.saveDC && spellRolls.saveType && (
          <div className="px-3 py-1 text-xs rounded font-medium"
            style={{
              backgroundColor: 'var(--color-warning)',
              color: 'var(--color-warning-text)'
            }}
          >
            Save DC: {spellRolls.saveDC} ({spellRolls.saveType})
          </div>
        )}
      </div>

      {/* Additional Spell Info */}
      <div className="text-xs text-[var(--color-text-muted)] space-y-1">
        {spellRolls.areaOfEffect && (
          <div>
            Area: {spellRolls.areaOfEffect.size} {spellRolls.areaOfEffect.unit} {spellRolls.areaOfEffect.type}
          </div>
        )}
        {spellRolls.targets && (
          <div>
            Targets: {spellRolls.targets} creature{spellRolls.targets > 1 ? 's' : ''}
          </div>
        )}
        {spellRolls.attackType && spellRolls.attackType !== 'none' && (
          <div>
            Attack Type: {spellRolls.attackType.charAt(0).toUpperCase() + spellRolls.attackType.slice(1)}
          </div>
        )}
        {selectedSlotLevel > spell.level && (
          <div className="text-[var(--color-accent)] font-medium">
            Upcast to level {selectedSlotLevel}
          </div>
        )}
      </div>
    </div>
  );
} 