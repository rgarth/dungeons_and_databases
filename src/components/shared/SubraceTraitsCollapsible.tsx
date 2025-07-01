"use client";

import React, { useState, useEffect } from 'react';
import { Info, ChevronUp } from 'lucide-react';

interface SubraceTraitsCollapsibleProps {
  race: string;
  subrace?: string | null;
  disabled?: boolean;
  onSubraceChange?: (subrace: string | null) => void;
  subraces?: { name: string }[];
}

export function SubraceTraitsCollapsible({ 
  race, 
  subrace, 
  disabled = false, 
  onSubraceChange,
  subraces 
}: SubraceTraitsCollapsibleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [subraceData, setSubraceData] = useState<{ description: string; abilityScoreIncrease: string; languages?: string[] } | null>(null);
  const [traits, setTraits] = useState<{ name: string; type: string; description: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!subrace || disabled) {
      setSubraceData(null);
      setTraits([]);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      try {
        // Load subrace data
        const subraceResponse = await fetch(`/api/subraces?race=${encodeURIComponent(race)}`);
        if (subraceResponse.ok) {
          const subraces = await subraceResponse.json();
          const subraceInfo = subraces.find((s: { name: string }) => s.name === subrace);
          setSubraceData(subraceInfo);
        }

        // Load traits
        const traitsResponse = await fetch(`/api/traits?subrace=${encodeURIComponent(subrace)}`);
        if (traitsResponse.ok) {
          const traitsData = await traitsResponse.json();
          setTraits(traitsData);
        }
      } catch (error) {
        console.error('Error loading subrace data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [race, subrace, disabled]);

  if (disabled || !subraces || subraces.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      {/* Subrace selector with info icon */}
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-medium text-slate-300">Subrace</label>
        {subraceData && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-slate-200 transition-colors"
            title="View subrace details"
          >
            <Info className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Subrace selector */}
      <select
        value={subrace || ''}
        onChange={(e) => onSubraceChange?.(e.target.value || null)}
        className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-base text-white focus:border-purple-500 focus:outline-none appearance-none"
        style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
      >
        <option value="" disabled>Select a subrace</option>
        {subraces?.map((s) => (
          <option key={s.name} value={s.name}>{s.name}</option>
        ))}
      </select>

      {/* Collapsible traits section */}
      {isExpanded && (
        <div className="mb-3 p-3 bg-slate-800 border border-slate-600 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-white">{subrace} Traits</h4>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-slate-200"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>

          {loading ? (
            <div className="text-sm text-slate-400">Loading traits...</div>
          ) : (
            <div className="space-y-3">
              {/* Subrace description */}
              <div>
                <p className="text-sm text-slate-300">{subraceData?.description}</p>
              </div>

              {/* Ability score increase */}
              {subraceData?.abilityScoreIncrease && (
                <div>
                  <h5 className="text-xs font-medium text-slate-400 mb-1">Ability Score Increase</h5>
                  <p className="text-sm text-slate-300">{subraceData.abilityScoreIncrease}</p>
                </div>
              )}

              {/* Languages */}
              {subraceData?.languages && subraceData.languages.length > 0 && (
                <div>
                  <h5 className="text-xs font-medium text-slate-400 mb-1">Languages</h5>
                  <p className="text-sm text-slate-300">{subraceData.languages.join(', ')}</p>
                </div>
              )}

              {/* Traits */}
              {traits.length > 0 && (
                <div>
                  <h5 className="text-xs font-medium text-slate-400 mb-1">Traits</h5>
                  <div className="space-y-2">
                    {traits.map((trait, index) => (
                      <div key={index} className="text-sm">
                        <div className="font-medium text-slate-300">{trait.name}</div>
                        <div className="text-slate-400 text-xs mb-1">Type: {trait.type}</div>
                        <div className="text-slate-300 text-xs">{trait.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 