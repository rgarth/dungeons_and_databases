"use client";

import { useState, useEffect } from "react";
import { Info, ChevronUp } from "lucide-react";

interface RaceData {
  name: string;
  description: string;
  abilityScoreIncrease: string;
  size: string;
  speed: number;
  languages: string[];
  traits: string[];
}

interface Trait {
  name: string;
  description: string;
  type: string;
}

interface RaceTraitsCollapsibleProps {
  race: string;
  disabled?: boolean;
  onRaceChange?: (race: string) => void;
  races?: Array<{ name: string }>;
}

export function RaceTraitsCollapsible({ race, disabled = false, onRaceChange, races }: RaceTraitsCollapsibleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [raceData, setRaceData] = useState<RaceData | null>(null);
  const [traits, setTraits] = useState<Trait[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!race || disabled) {
      setRaceData(null);
      setTraits([]);
      return;
    }

    const loadRaceData = async () => {
      setLoading(true);
      try {
        // Load race data
        const raceResponse = await fetch(`/api/races/${encodeURIComponent(race)}`);
        if (raceResponse.ok) {
          const raceInfo = await raceResponse.json();
          setRaceData(raceInfo);
        }

        // Load traits
        const traitsResponse = await fetch(`/api/traits?race=${encodeURIComponent(race)}`);
        if (traitsResponse.ok) {
          const traitsData = await traitsResponse.json();
          setTraits(traitsData);
        }
      } catch (error) {
        console.error('Error loading race data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRaceData();
  }, [race, disabled]);

  if (disabled || !races) {
    return null;
  }

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Race</label>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="transition-colors"
          style={{ color: 'var(--color-text-tertiary)' }}
          title="View racial traits"
        >
          <Info className="h-4 w-4" />
        </button>
      </div>

      {/* Collapsible traits section */}
      {isExpanded && raceData && (
        <div className="mb-3 p-3 rounded-lg border" style={{ 
          backgroundColor: 'var(--color-card-secondary)', 
          borderColor: 'var(--color-border)' 
        }}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{race} Traits</h4>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>

          {loading ? (
            <div className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>Loading traits...</div>
          ) : (
            <div className="space-y-3">
              {/* Race description */}
              <div>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{raceData.description}</p>
              </div>

              {/* Basic race info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span style={{ color: 'var(--color-text-tertiary)' }}>Size:</span>
                  <span className="ml-1" style={{ color: 'var(--color-text-primary)' }}>{raceData.size}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-tertiary)' }}>Speed:</span>
                  <span className="ml-1" style={{ color: 'var(--color-text-primary)' }}>{raceData.speed} ft.</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-tertiary)' }}>Ability Score Increase:</span>
                  <span className="ml-1" style={{ color: 'var(--color-text-primary)' }}>{raceData.abilityScoreIncrease}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-tertiary)' }}>Languages:</span>
                  <span className="ml-1" style={{ color: 'var(--color-text-primary)' }}>{raceData.languages.join(', ')}</span>
                </div>
              </div>

              {/* Traits */}
              {traits.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>Racial Traits</h5>
                  <div className="space-y-2">
                    {traits.map((trait, index) => (
                      <div key={`${trait.name}-${index}`} className="border-l-2 pl-3" style={{ borderColor: 'var(--color-accent)' }}>
                        <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{trait.name}</div>
                        <div className="text-xs mt-1" style={{ color: 'var(--color-text-tertiary)' }}>{trait.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Race selector */}
      <select
        value={race}
        onChange={(e) => onRaceChange?.(e.target.value)}
        className="w-full rounded px-3 py-2 text-base focus:outline-none appearance-none"
        style={{ 
          WebkitAppearance: 'none', 
          MozAppearance: 'none',
          backgroundColor: 'var(--color-surface-secondary)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border)'
        }}
      >
        <option value="" disabled>Select a race</option>
        {races?.map((r) => (
          <option key={r.name} value={r.name}>{r.name}</option>
        ))}
      </select>
    </div>
  );
} 