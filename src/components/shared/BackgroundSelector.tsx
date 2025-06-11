"use client";

import { useState, useEffect } from "react";
import { BookOpen, Scroll, Languages, Coins, Lightbulb, Heart, Anchor, Zap } from "lucide-react";

export interface BackgroundData {
  name: string;
  description: string;
  skillProficiencies: string[];
  languages: string[];
  equipment: string[];
  feature: string;
  featureDescription: string;
  suggestedCharacteristics?: {
    personalityTraits: string[];
    ideals: string[];
    bonds: string[];
    flaws: string[];
  };
}

export interface SelectedCharacteristics {
  personalityTraits: string[];
  ideals: string[];
  bonds: string[];
  flaws: string[];
}

interface BackgroundSelectorProps {
  // Basic props
  selectedBackground: string;
  selectedCharacteristics?: SelectedCharacteristics;
  onBackgroundChange: (background: string) => void;
  onCharacteristicsChange?: (characteristics: SelectedCharacteristics) => void;
  
  // Display options
  showCharacteristics?: boolean;
  showFullDetails?: boolean;
  compact?: boolean;
  
  // Modal props (optional)
  isModal?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  
  // Customization
  title?: string;
  maxSelections?: {
    personalityTraits: number;
    ideals: number;
    bonds: number;
    flaws: number;
  };
}

export function BackgroundSelector({
  selectedBackground,
  selectedCharacteristics,
  onBackgroundChange,
  onCharacteristicsChange,
  showCharacteristics = true,
  showFullDetails = false,
  compact = false,
  isModal = false,
  onConfirm,
  onCancel,
  title = "Select Background",
  maxSelections = {
    personalityTraits: 2,
    ideals: 1,
    bonds: 1,
    flaws: 1
  }
}: BackgroundSelectorProps) {
  const [backgrounds, setBackgrounds] = useState<BackgroundData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Internal state for characteristics
  const [internalCharacteristics, setInternalCharacteristics] = useState<SelectedCharacteristics>({
    personalityTraits: [],
    ideals: [],
    bonds: [],
    flaws: []
  });
  
  // Use provided characteristics or internal state
  const currentCharacteristics = selectedCharacteristics || internalCharacteristics;
  
  // Load backgrounds from API
  useEffect(() => {
    const loadBackgrounds = async () => {
      try {
        const response = await fetch('/api/backgrounds');
        if (!response.ok) {
          throw new Error('Failed to load backgrounds');
        }
        const data = await response.json();
        setBackgrounds(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load backgrounds');
      } finally {
        setLoading(false);
      }
    };
    
    loadBackgrounds();
  }, []);
  
  // Initialize characteristics when selectedBackground changes
  useEffect(() => {
    if (!selectedCharacteristics && selectedBackground) {
      const background = backgrounds.find(bg => bg.name === selectedBackground);
      if (background?.suggestedCharacteristics) {
        setInternalCharacteristics({
          personalityTraits: [],
          ideals: [],
          bonds: [],
          flaws: []
        });
      }
    }
  }, [selectedBackground, backgrounds, selectedCharacteristics]);
  
  const handleCharacteristicToggle = (category: keyof SelectedCharacteristics, item: string) => {
    if (!onCharacteristicsChange && !selectedCharacteristics) {
      // Update internal state
      setInternalCharacteristics(prev => {
        const current = prev[category];
        const isSelected = current.includes(item);
        const maxForCategory = maxSelections[category];
        
        if (isSelected) {
          // Remove item
          return {
            ...prev,
            [category]: current.filter(i => i !== item)
          };
        } else {
          // Add item if under limit
          if (current.length < maxForCategory) {
            return {
              ...prev,
              [category]: [...current, item]
            };
          }
          return prev;
        }
      });
    } else if (onCharacteristicsChange) {
      // Update external state
      const current = currentCharacteristics[category];
      const isSelected = current.includes(item);
      const maxForCategory = maxSelections[category];
      
      if (isSelected) {
        onCharacteristicsChange({
          ...currentCharacteristics,
          [category]: current.filter(i => i !== item)
        });
      } else if (current.length < maxForCategory) {
        onCharacteristicsChange({
          ...currentCharacteristics,
          [category]: [...current, item]
        });
      }
    }
  };
  
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };
  
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  
  const currentBackground = backgrounds.find(bg => bg.name === selectedBackground);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-red-400 p-4 bg-red-900/20 rounded-lg">
        {error}
      </div>
    );
  }
  
  const content = (
    <div className={`${compact ? 'space-y-4' : 'space-y-6'}`}>
      {/* Background Selection */}
      <div>
        <label className="block text-white font-medium mb-2">
          <BookOpen className="h-4 w-4 inline mr-2" />
          {title}
        </label>
        <select
          value={selectedBackground}
          onChange={(e) => onBackgroundChange(e.target.value)}
          className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
        >
          <option value="">Select a background...</option>
          {backgrounds.map((bg) => (
            <option key={bg.name} value={bg.name}>
              {bg.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Background Details */}
      {currentBackground && (
        <div className="bg-slate-700 rounded-lg p-4 space-y-4">
          <div>
            <h4 className="text-white font-medium mb-2">{currentBackground.name}</h4>
            <p className="text-slate-300 text-sm">{currentBackground.description}</p>
          </div>
          
          {showFullDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Skills */}
              <div>
                <h5 className="text-white font-medium mb-2 flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Skill Proficiencies
                </h5>
                <div className="space-y-1">
                  {currentBackground.skillProficiencies.map((skill) => (
                    <div key={skill} className="text-slate-300 text-sm">
                      • {skill}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Languages */}
              {currentBackground.languages.length > 0 && (
                <div>
                  <h5 className="text-white font-medium mb-2 flex items-center">
                    <Languages className="h-4 w-4 mr-2" />
                    Languages
                  </h5>
                  <div className="space-y-1">
                    {currentBackground.languages.map((lang) => (
                      <div key={lang} className="text-slate-300 text-sm">
                        • {lang}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Equipment */}
              <div>
                <h5 className="text-white font-medium mb-2 flex items-center">
                  <Coins className="h-4 w-4 mr-2" />
                  Equipment
                </h5>
                <div className="space-y-1">
                  {currentBackground.equipment.map((item) => (
                    <div key={item} className="text-slate-300 text-sm">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Feature */}
              <div>
                <h5 className="text-white font-medium mb-2 flex items-center">
                  <Scroll className="h-4 w-4 mr-2" />
                  Feature: {currentBackground.feature}
                </h5>
                <p className="text-slate-300 text-sm">
                  {currentBackground.featureDescription}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Characteristics Selection */}
      {showCharacteristics && currentBackground?.suggestedCharacteristics && (
        <div className="space-y-4">
          <h4 className="text-white font-medium">Character Traits</h4>
          
          {/* Personality Traits */}
          <div>
            <h5 className="text-white font-medium mb-2 flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Personality Traits ({currentCharacteristics.personalityTraits.length}/{maxSelections.personalityTraits})
            </h5>
            <div className="space-y-2">
              {currentBackground.suggestedCharacteristics.personalityTraits.map((trait, index) => (
                <label key={index} className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentCharacteristics.personalityTraits.includes(trait)}
                    onChange={() => handleCharacteristicToggle('personalityTraits', trait)}
                    disabled={!currentCharacteristics.personalityTraits.includes(trait) && 
                             currentCharacteristics.personalityTraits.length >= maxSelections.personalityTraits}
                    className="mt-1 rounded border-slate-500 bg-slate-600 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-slate-300 text-sm">{trait}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Ideals */}
          <div>
            <h5 className="text-white font-medium mb-2 flex items-center">
              <Lightbulb className="h-4 w-4 mr-2" />
              Ideals ({currentCharacteristics.ideals.length}/{maxSelections.ideals})
            </h5>
            <div className="space-y-2">
              {currentBackground.suggestedCharacteristics.ideals.map((ideal, index) => (
                <label key={index} className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentCharacteristics.ideals.includes(ideal)}
                    onChange={() => handleCharacteristicToggle('ideals', ideal)}
                    disabled={!currentCharacteristics.ideals.includes(ideal) && 
                             currentCharacteristics.ideals.length >= maxSelections.ideals}
                    className="mt-1 rounded border-slate-500 bg-slate-600 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-slate-300 text-sm">{ideal}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Bonds */}
          <div>
            <h5 className="text-white font-medium mb-2 flex items-center">
              <Anchor className="h-4 w-4 mr-2" />
              Bonds ({currentCharacteristics.bonds.length}/{maxSelections.bonds})
            </h5>
            <div className="space-y-2">
              {currentBackground.suggestedCharacteristics.bonds.map((bond, index) => (
                <label key={index} className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentCharacteristics.bonds.includes(bond)}
                    onChange={() => handleCharacteristicToggle('bonds', bond)}
                    disabled={!currentCharacteristics.bonds.includes(bond) && 
                             currentCharacteristics.bonds.length >= maxSelections.bonds}
                    className="mt-1 rounded border-slate-500 bg-slate-600 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-slate-300 text-sm">{bond}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Flaws */}
          <div>
            <h5 className="text-white font-medium mb-2 flex items-center">
              <Zap className="h-4 w-4 mr-2 text-red-400" />
              Flaws ({currentCharacteristics.flaws.length}/{maxSelections.flaws})
            </h5>
            <div className="space-y-2">
              {currentBackground.suggestedCharacteristics.flaws.map((flaw, index) => (
                <label key={index} className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentCharacteristics.flaws.includes(flaw)}
                    onChange={() => handleCharacteristicToggle('flaws', flaw)}
                    disabled={!currentCharacteristics.flaws.includes(flaw) && 
                             currentCharacteristics.flaws.length >= maxSelections.flaws}
                    className="mt-1 rounded border-slate-500 bg-slate-600 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-slate-300 text-sm">{flaw}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Modal buttons */}
      {isModal && (
        <div className="flex justify-end space-x-2 pt-4 border-t border-slate-600">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
  
  // Render as modal or inline
  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {content}
        </div>
      </div>
    );
  }
  
  return content;
} 