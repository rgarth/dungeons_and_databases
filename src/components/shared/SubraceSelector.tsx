"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Subrace {
  id: string;
  name: string;
  description: string;
  abilityScoreIncrease: string;
  traits: string[];
  languages?: string[];
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
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!race) {
      setSubraces([]);
      return;
    }

    setLoading(true);
    fetch(`/api/subraces?race=${encodeURIComponent(race)}`)
      .then(res => res.json())
      .then(data => {
        setSubraces(data);
        if (data.length === 0) {
          onSubraceChange(null);
        }
      })
      .catch(error => {
        console.error('Error loading subraces:', error);
        setSubraces([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [race, onSubraceChange]);

  const handleSubraceSelect = (subrace: Subrace) => {
    onSubraceChange(subrace.name);
    setIsOpen(false);
  };

  const handleClear = () => {
    onSubraceChange(null);
    setIsOpen(false);
  };

  const selectedSubraceData = subraces.find(s => s.name === selectedSubrace);

  if (subraces.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
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
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }
          `}
        >
          <div className="flex items-center justify-between">
            <span className={selectedSubrace ? 'text-gray-900' : 'text-gray-500'}>
              {loading ? 'Loading...' : selectedSubrace || 'Select a subrace'}
            </span>
            {!disabled && !loading && (
              isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </button>

        {isOpen && !disabled && !loading && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="py-1">
              {subraces.map((subrace) => (
                <button
                  key={subrace.id}
                  type="button"
                  onClick={() => handleSubraceSelect(subrace)}
                  className={`
                    w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                    ${selectedSubrace === subrace.name ? 'bg-blue-50 text-blue-900' : 'text-gray-900'}
                  `}
                >
                  <div className="font-medium">{subrace.name}</div>
                  <div className="text-sm text-gray-600">{subrace.description}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {subrace.abilityScoreIncrease}
                  </div>
                </button>
              ))}
              
              {selectedSubrace && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 focus:bg-red-50 focus:outline-none border-t"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedSubraceData && (
        <div className="mt-2 p-3 bg-gray-50 rounded-md">
          <h4 className="font-medium text-sm text-gray-900 mb-1">
            {selectedSubraceData.name}
          </h4>
          <p className="text-sm text-gray-600 mb-2">
            {selectedSubraceData.description}
          </p>
          <div className="text-xs text-gray-500">
            <div><strong>Ability Score Increase:</strong> {selectedSubraceData.abilityScoreIncrease}</div>
            <div><strong>Traits:</strong> {selectedSubraceData.traits.join(', ')}</div>
            {selectedSubraceData.languages && (
              <div><strong>Languages:</strong> {selectedSubraceData.languages.join(', ')}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 