"use client";

import { useState, useEffect } from "react";
import { BookOpen, Scroll, Languages, Coins, Lightbulb, Heart, Anchor, Zap } from "lucide-react";
import { useDndData } from "@/components/providers/dnd-data-provider";

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
  personalityTraits?: string[];
  ideals?: string[];
  bonds?: string[];
  flaws?: string[];
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
  title = "Select Background"
}: BackgroundSelectorProps) {
  const { backgrounds } = useDndData();
  
  // Internal state for characteristics
  const [internalCharacteristics, setInternalCharacteristics] = useState<SelectedCharacteristics>({
    personalityTraits: [],
    ideals: [],
    bonds: [],
    flaws: []
  });
  
  // Use provided characteristics or internal state
  const currentCharacteristics = selectedCharacteristics || internalCharacteristics;
  
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
  
  const handleCharacteristicChange = (category: keyof SelectedCharacteristics, value: string, index?: number) => {
    if (!onCharacteristicsChange && !selectedCharacteristics) {
      // Update internal state
      setInternalCharacteristics(prev => {
        const current = prev[category] ?? [];
        
        if (category === 'personalityTraits' && index !== undefined) {
          // For personality traits, update specific index
          const newTraits = [...current];
          newTraits[index] = value;
          return {
            ...prev,
            [category]: newTraits
          };
        } else {
          // For single selection categories, replace the array
          return {
            ...prev,
            [category]: value ? [value] : []
          };
        }
      });
    } else if (onCharacteristicsChange) {
      // Update external state
      const current = currentCharacteristics[category] ?? [];
      
      if (category === 'personalityTraits' && index !== undefined) {
        // For personality traits, update specific index
        const newTraits = [...current];
        newTraits[index] = value;
        onCharacteristicsChange({
          ...currentCharacteristics,
          [category]: newTraits
        });
      } else {
        // For single selection categories, replace the array
        onCharacteristicsChange({
          ...currentCharacteristics,
          [category]: value ? [value] : []
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
  
  if (!backgrounds.length) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
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
          
          {/* Personality Traits - Two Dropdowns */}
          <div>
            <h5 className="text-white font-medium mb-2 flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Personality Traits
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* First Personality Trait Dropdown */}
              <div>
                <label className="block text-slate-300 text-sm mb-1">
                  Trait 1
                </label>
                <select
                  value={currentCharacteristics.personalityTraits?.[0] || ""}
                  onChange={(e) => handleCharacteristicChange('personalityTraits', e.target.value, 0)}
                  className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Select a trait...</option>
                  {currentBackground.suggestedCharacteristics.personalityTraits.map((trait, index) => (
                    <option 
                      key={index} 
                      value={trait}
                      disabled={currentCharacteristics.personalityTraits?.[1] === trait}
                    >
                      {trait}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Second Personality Trait Dropdown */}
              <div>
                <label className="block text-slate-300 text-sm mb-1">
                  Trait 2
                </label>
                <select
                  value={currentCharacteristics.personalityTraits?.[1] || ""}
                  onChange={(e) => handleCharacteristicChange('personalityTraits', e.target.value, 1)}
                  className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Select a trait...</option>
                  {currentBackground.suggestedCharacteristics.personalityTraits.map((trait, index) => (
                    <option 
                      key={index} 
                      value={trait}
                      disabled={currentCharacteristics.personalityTraits?.[0] === trait}
                    >
                      {trait}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Ideals - Single Dropdown */}
          <div>
            <h5 className="text-white font-medium mb-2 flex items-center">
              <Lightbulb className="h-4 w-4 mr-2" />
              Ideals
            </h5>
            <select
              value={currentCharacteristics.ideals?.[0] || ""}
              onChange={(e) => handleCharacteristicChange('ideals', e.target.value)}
              className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="">Select an ideal...</option>
              {currentBackground.suggestedCharacteristics.ideals.map((ideal, index) => (
                <option key={index} value={ideal}>
                  {ideal}
                </option>
              ))}
            </select>
          </div>
          
          {/* Bonds - Single Dropdown */}
          <div>
            <h5 className="text-white font-medium mb-2 flex items-center">
              <Anchor className="h-4 w-4 mr-2" />
              Bonds
            </h5>
            <select
              value={currentCharacteristics.bonds?.[0] || ""}
              onChange={(e) => handleCharacteristicChange('bonds', e.target.value)}
              className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="">Select a bond...</option>
              {currentBackground.suggestedCharacteristics.bonds.map((bond, index) => (
                <option key={index} value={bond}>
                  {bond}
                </option>
              ))}
            </select>
          </div>
          
          {/* Flaws - Single Dropdown */}
          <div>
            <h5 className="text-white font-medium mb-2 flex items-center">
              <Zap className="h-4 w-4 mr-2 text-red-400" />
              Flaws
            </h5>
            <select
              value={currentCharacteristics.flaws?.[0] || ""}
              onChange={(e) => handleCharacteristicChange('flaws', e.target.value)}
              className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="">Select a flaw...</option>
              {currentBackground.suggestedCharacteristics.flaws.map((flaw, index) => (
                <option key={index} value={flaw}>
                  {flaw}
                </option>
              ))}
            </select>
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