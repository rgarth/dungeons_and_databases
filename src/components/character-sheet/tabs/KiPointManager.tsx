'use client';

import { useState } from 'react';
import { KiPointService } from '@/services/character/ki-points';

interface KiPointManagerProps {
  character: {
    class: string;
    level: number;
    kiPoints?: number;
    usedKiPoints?: number;
  };
  onKiPointsChange?: (usedKiPoints: number) => void;
}

export default function KiPointManager({ character, onKiPointsChange }: KiPointManagerProps) {
  const [usedKiPoints, setUsedKiPoints] = useState(character.usedKiPoints || 0);
  
  // Only show for Monks
  if (character.class !== 'Monk') {
    return null;
  }

  const totalKiPoints = character.kiPoints || KiPointService.getTotalKiPoints(character.level);
  const availableKiPoints = Math.max(0, totalKiPoints - usedKiPoints);
  const kiState = KiPointService.getKiPointState(totalKiPoints, usedKiPoints);
  const standardAbilities = KiPointService.getStandardKiAbilities();

  const handleUseKiPoints = (kiCost: number) => {
    const newUsed = KiPointService.calculateUsedKiPoints(usedKiPoints, kiCost, totalKiPoints);
    if (newUsed !== null) {
      setUsedKiPoints(newUsed);
      onKiPointsChange?.(newUsed);
    }
  };

  const handleShortRest = () => {
    setUsedKiPoints(0);
    onKiPointsChange?.(0);
  };

  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
        Ki Point Manager
      </h4>
      
      {/* Ki Point Display */}
      <div className="bg-[var(--color-card-secondary)] rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-center">
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Total Ki Points</div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">{totalKiPoints}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Available</div>
            <div className="text-2xl font-bold text-[var(--color-accent)]">{availableKiPoints}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Used</div>
            <div className="text-2xl font-bold text-[var(--color-error)]">{usedKiPoints}</div>
          </div>
        </div>
        
        {/* Ki Point Visualization */}
        <div className="flex justify-center gap-1 mb-3">
          {Array.from({ length: totalKiPoints }, (_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                i < usedKiPoints
                  ? 'bg-[var(--color-error)] border-[var(--color-error)]'
                  : 'border-[var(--color-text-secondary)] bg-transparent'
              }`}
              title={i < usedKiPoints ? 'Used' : 'Available'}
            />
          ))}
        </div>
        
        {/* Short Rest Button */}
        <div className="flex justify-center">
          <button
            onClick={handleShortRest}
            disabled={usedKiPoints === 0}
            className="bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] disabled:bg-[var(--color-text-muted)] text-[var(--color-success-text)] disabled:text-[var(--color-text-muted)] text-sm px-4 py-2 rounded transition-all duration-200"
            title="Recover all ki points (Short Rest)"
          >
            Short Rest
          </button>
        </div>
      </div>

      {/* Ki Abilities */}
      <div className="space-y-3">
        <h5 className="text-md font-semibold text-[var(--color-text-primary)] mb-2">
          Ki Abilities
        </h5>
        {standardAbilities.map((ability) => (
          <div
            key={ability.name}
            className="bg-[var(--color-card-secondary)] rounded-lg p-3 border border-[var(--color-border)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h6 className="font-semibold text-[var(--color-text-primary)]">
                    {ability.name}
                  </h6>
                  <span className="text-xs bg-[var(--color-accent)] text-[var(--color-accent-text)] px-2 py-1 rounded">
                    {ability.type}
                  </span>
                  <span className="text-xs bg-[var(--color-warning)] text-[var(--color-warning-text)] px-2 py-1 rounded">
                    {ability.kiCost} ki
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                  {ability.description}
                </p>
                {ability.requirements && (
                  <p className="text-xs text-[var(--color-text-muted)] italic">
                    Requirements: {ability.requirements}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleUseKiPoints(ability.kiCost)}
                disabled={!KiPointService.canUseKiAbility(kiState, ability.kiCost)}
                className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] disabled:bg-[var(--color-text-muted)] text-[var(--color-accent-text)] disabled:text-[var(--color-text-muted)] text-sm px-3 py-1 rounded transition-all duration-200 ml-3"
                title={`Use ${ability.name} (${ability.kiCost} ki points)`}
              >
                Use
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Unarmed Strike Info */}
      <div className="mt-4 p-3 bg-[var(--color-card-secondary)] rounded-lg border-l-4 border-[var(--color-accent)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🥊</span>
          <h6 className="font-semibold text-[var(--color-text-primary)]">
            Unarmed Strike
          </h6>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Damage: {KiPointService.getUnarmedStrikeDamage(character.level)} bludgeoning
        </p>
        <p className="text-xs text-[var(--color-text-muted)] mt-1">
          Your martial arts training allows you to strike with deadly precision
        </p>
      </div>
    </div>
  );
} 