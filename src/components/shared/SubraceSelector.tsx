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
      <label className="block text-sm font-medium text-slate-300 mb-2">
        Subrace
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled || loading}
          className={`
            w-full px-3 py-2 text-left border border-slate-600 rounded-md shadow-sm
            ${disabled || loading 
              ? 'bg-slate-600 text-slate-400 cursor-not-allowed' 
              : 'bg-slate-700 text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500'
            }
          `}
        >
          <div className="flex items-center justify-between">
            <span className={selectedSubrace ? 'text-white' : 'text-slate-400'}>
              {loading ? 'Loading...' : selectedSubrace || 'Select a subrace'}
            </span>
            {!disabled && !loading && (
              isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </button>

        {isOpen && !disabled && !loading && (
          <div className="absolute z-10 w-full mt-1 bg-slate-700 border border-slate-600 rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="py-1">
              {subraces.map((subrace) => (
                <button
                  key={subrace.name}
                  type="button"
                  onClick={() => handleSubraceSelect(subrace)}
                  className={`
                    w-full px-4 py-2 text-left hover:bg-slate-600 focus:bg-slate-600 focus:outline-none
                    ${selectedSubrace === subrace.name ? 'bg-purple-600 text-white' : 'text-white'}
                  `}
                >
                  <div className="font-medium">{subrace.name}</div>
                  <div className="text-sm text-slate-300">{subrace.description}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {subrace.abilityScoreIncrease}
                  </div>
                </button>
              ))}
              
              {selectedSubrace && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-900 focus:bg-red-900 focus:outline-none border-t border-slate-600"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedSubraceData && (
        <div className="mt-2 p-3 bg-slate-700 rounded-md border border-slate-600">
          <h4 className="font-medium text-sm text-white mb-1">
            {selectedSubraceData.name}
          </h4>
          <p className="text-sm text-slate-300 mb-2">
            {selectedSubraceData.description}
          </p>
          <div className="text-xs text-slate-400">
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
            <div className="mt-2 pt-2 border-t border-slate-600">
              <div className="text-xs text-slate-400 mb-1"><strong>Trait Details:</strong></div>
              {selectedSubraceTraits.map((trait, index) => (
                <div key={`${trait.name}-${trait.type}-${index}`} className="text-xs text-slate-300 mb-1">
                  <span className="font-medium">{trait.name}</span>
                  <span className="text-slate-500 ml-1">({trait.type})</span>
                  <div className="text-slate-400 ml-2">{trait.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 