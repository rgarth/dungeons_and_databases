"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { clientCache } from "@/lib/client-cache";

interface Subrace {
  id: string;
  name: string;
  description: string;
  abilityScoreIncrease: string;
  traits: string[];
  languages?: string[] | null;
}

interface Trait {
  id: string;
  name: string;
  description: string;
  type: string;
}

interface SubraceSelectorProps {
  race: string;
  selectedSubrace?: string | null;
  onSubraceChange: (subrace: string | null) => void;
  disabled?: boolean;
}

export function SubraceSelector({ 
  race, 
  selectedSubrace, 
  onSubraceChange, 
  disabled = false
}: SubraceSelectorProps) {
  const [subraces, setSubraces] = useState<Subrace[]>([]);
  const [selectedSubraceTraits, setSelectedSubraceTraits] = useState<Trait[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingTraits, setLoadingTraits] = useState(false);
  const onSubraceChangeRef = useRef(onSubraceChange);

  // Update ref when onSubraceChange changes
  useEffect(() => {
    onSubraceChangeRef.current = onSubraceChange;
  }, [onSubraceChange]);

  useEffect(() => {
    if (!race) {
      setSubraces([]);
      return;
    }

    const loadSubraces = async () => {
      setLoading(true);
      
      try {
        // Try client cache first
        if (clientCache.isInitialized()) {
          const cachedSubraces = clientCache.getSubraces(race);
          console.log('⚡ Using client cache for subraces:', race, cachedSubraces.length);
          setSubraces(cachedSubraces);
          if (cachedSubraces.length === 0) {
            onSubraceChangeRef.current(null);
          }
          return;
        }

        // Fallback to API call if client cache not ready
        console.log('🔄 Loading subraces from API for:', race);
        const response = await fetch(`/api/subraces?race=${encodeURIComponent(race)}`);
        const data = await response.json();
        setSubraces(data);
        if (data.length === 0) {
          onSubraceChangeRef.current(null);
        }
      } catch (error) {
        console.error('Error loading subraces:', error);
        setSubraces([]);
      } finally {
        setLoading(false);
      }
    };

    loadSubraces();
  }, [race]);

  // Load traits when subrace is selected
  useEffect(() => {
    if (!selectedSubrace) {
      setSelectedSubraceTraits([]);
      return;
    }

    const loadTraits = async () => {
      setLoadingTraits(true);
      try {
        const response = await fetch(`/api/traits?subrace=${encodeURIComponent(selectedSubrace)}`);
        if (response.ok) {
          const traits = await response.json();
          setSelectedSubraceTraits(traits);
        } else {
          setSelectedSubraceTraits([]);
        }
      } catch (error) {
        console.error('Error loading subrace traits:', error);
        setSelectedSubraceTraits([]);
      } finally {
        setLoadingTraits(false);
      }
    };

    loadTraits();
  }, [selectedSubrace]);

  const handleSubraceSelect = (subrace: Subrace) => {
    onSubraceChangeRef.current(subrace.name);
    setIsOpen(false);
  };

  const handleClear = () => {
    onSubraceChangeRef.current(null);
    setIsOpen(false);
  };

  const selectedSubraceData = subraces.find(s => s.name === selectedSubrace);

  // Use useEffect to clear subrace when it matches the race (for races without meaningful subraces)
  useEffect(() => {
    if (subraces.length === 1 && subraces[0].name === race && selectedSubrace === race) {
      onSubraceChangeRef.current(null);
    }
  }, [subraces, race, selectedSubrace]);

  // Hide subrace selector if:
  // 1. No subraces exist, OR
  // 2. Only one subrace exists and it has the same name as the race (e.g., Human -> Human)
  if (subraces.length === 0 || (subraces.length === 1 && subraces[0].name === race)) {
    return null;
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
        Subrace
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled || loading}
          className={`
            w-full px-3 py-2 text-left border rounded-md shadow-sm
            ${disabled || loading 
              ? 'cursor-not-allowed' 
              : 'focus:outline-none focus:ring-2'
            }
          `}
          style={{
            backgroundColor: disabled || loading ? 'var(--color-surface-tertiary)' : 'var(--color-surface-secondary)',
            borderColor: 'var(--color-border)',
            color: disabled || loading ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
            '--tw-ring-color': 'var(--color-accent)'
          } as React.CSSProperties}
        >
          <div className="flex items-center justify-between">
            <span style={{ color: selectedSubrace ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' }}>
              {loading ? 'Loading...' : selectedSubrace || 'Select a subrace'}
            </span>
            {!disabled && !loading && (
              isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </button>

        {isOpen && !disabled && !loading && (
          <div className="absolute z-10 w-full mt-1 border rounded-md shadow-lg max-h-60 overflow-auto" style={{
            backgroundColor: 'var(--color-surface-secondary)',
            borderColor: 'var(--color-border)',
            border: '1px solid var(--color-border)'
          }}>
            <div className="py-1">
              {subraces.map((subrace) => (
                <button
                  key={subrace.name}
                  type="button"
                  onClick={() => handleSubraceSelect(subrace)}
                  className={`
                    w-full px-4 py-2 text-left focus:outline-none
                    ${selectedSubrace === subrace.name ? '' : ''}
                  `}
                  style={{
                    backgroundColor: selectedSubrace === subrace.name ? 'var(--color-accent)' : 'transparent',
                    color: selectedSubrace === subrace.name ? 'var(--color-accent-text)' : 'var(--color-text-primary)',
                    '--tw-hover-bg': 'var(--color-surface-tertiary)'
                  } as React.CSSProperties}
                >
                  <div className="font-medium">{subrace.name}</div>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{subrace.description}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
                    {subrace.abilityScoreIncrease}
                  </div>
                </button>
              ))}
              
              {selectedSubrace && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full px-4 py-2 text-left focus:outline-none border-t"
                  style={{
                    color: 'var(--color-error)',
                    borderColor: 'var(--color-border)',
                    '--tw-hover-bg': 'var(--color-error-bg)'
                  } as React.CSSProperties}
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedSubraceData && (
        <div className="mt-2 p-3 rounded-md border" style={{
          backgroundColor: 'var(--color-surface-secondary)',
          borderColor: 'var(--color-border)',
          border: '1px solid var(--color-border)'
        }}>
          <h4 className="font-medium text-sm mb-1" style={{ color: 'var(--color-text-primary)' }}>
            {selectedSubraceData.name}
          </h4>
          <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
            {selectedSubraceData.description}
          </p>
          <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
            <div><strong>Ability Score Increase:</strong> {selectedSubraceData.abilityScoreIncrease}</div>
            <div><strong>Traits:</strong> {
              loadingTraits 
                ? 'Loading...' 
                : selectedSubraceTraits.length > 0 
                  ? selectedSubraceTraits.map(trait => trait.name).join(', ')
                  : 'None'
            }</div>
            {selectedSubraceData.languages && selectedSubraceData.languages.length > 0 && (
              <div><strong>Languages:</strong> {selectedSubraceData.languages.join(', ')}</div>
            )}
          </div>
          
          {/* Show trait details if available */}
          {selectedSubraceTraits.length > 0 && (
            <div className="mt-2 pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <div className="text-xs mb-1" style={{ color: 'var(--color-text-tertiary)' }}><strong>Trait Details:</strong></div>
              {selectedSubraceTraits.map((trait, index) => (
                <div key={`${trait.name}-${trait.type}-${index}`} className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                  <span className="font-medium">{trait.name}</span>
                  <span className="ml-1" style={{ color: 'var(--color-text-quaternary)' }}>({trait.type})</span>
                  <div className="ml-2" style={{ color: 'var(--color-text-tertiary)' }}>{trait.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 