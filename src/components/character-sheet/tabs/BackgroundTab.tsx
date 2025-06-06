"use client";
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { BookOpen, Edit3, Save, X, HelpCircle, FileText, Languages } from "lucide-react";
import { AvatarSelector } from "../components/AvatarSelector";
import { LANGUAGES, getRacialLanguages } from "@/lib/dnd/languages";

interface BackgroundTabProps {
  character: {
    id: string;
    name: string;
    race: string;
    class: string;
    level: number;
    background?: string;
    alignment?: string;
    appearance?: string;
    personality?: string;
    backstory?: string;
    notes?: string;
    avatar?: string | null;
    languages?: string[];
  };
  onUpdate: (updates: { appearance?: string; personality?: string; backstory?: string; notes?: string; avatar?: string | null; languages?: string[] }) => void;
}

// D&D Character Backstory Prompts
const BACKSTORY_PROMPTS = [
  {
    question: "Where did you come from?",
    placeholder: "Describe your homeland, city, or region..."
  },
  {
    question: "What is your family like?",
    placeholder: "Parents, siblings, family status, relationships..."
  },
  {
    question: "Who was your childhood friend, mentor, or inspiration?",
    placeholder: "Someone important in your early life..."
  },
  {
    question: "What drove you to become an adventurer?",
    placeholder: "The event, need, or calling that started your journey..."
  },
  {
    question: "What is your greatest achievement before adventuring?",
    placeholder: "Something you accomplished that you\'re proud of..."
  },
  {
    question: "What is your most treasured possession and why?",
    placeholder: "An item with special meaning to your character..."
  },
  {
    question: "What is your greatest fear or weakness?",
    placeholder: "Something that troubles or challenges you..."
  },
  {
    question: "Who do you care about most in the world?",
    placeholder: "Family, friends, loved ones still in your life..."
  },
  {
    question: "What are your long-term goals or ambitions?",
    placeholder: "What do you hope to achieve through adventuring..."
  },
  {
    question: "What secret do you keep hidden from others?",
    placeholder: "Something from your past you don\'t share..."
  },
  {
    question: "How do others typically perceive you?",
    placeholder: "First impressions, reputation, how you come across..."
  },
  {
    question: "What would make you risk everything?",
    placeholder: "Causes, people, or ideals worth great sacrifice..."
  },
  {
    question: "What is your relationship with the gods or divine forces?",
    placeholder: "Your deity, religious beliefs, spiritual practices, or lack thereof..."
  }
];

// Character limits for different fields
const CHARACTER_LIMITS = {
  appearance: 1000,
  personality: 1500,
  backstory: 5000,
  notes: 3000,
  guidedAnswer: 500
} as const;

export function BackgroundTab({ character, onUpdate }: BackgroundTabProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<'freeform' | 'guided'>('freeform');
  const [editValues, setEditValues] = useState({
    appearance: character.appearance || '',
    personality: character.personality || '',
    backstory: character.backstory || '',
    notes: character.notes || ''
  });
  const [guidedAnswers, setGuidedAnswers] = useState<Record<number, string>>({});

  const handleStartEdit = (field: string) => {
    setIsEditing(field);
    setEditMode('freeform');
    setEditValues(prev => ({
      ...prev,
      [field]: character[field as keyof typeof character] || ''
    }));
    // Reset guided answers
    setGuidedAnswers({});
  };

  const handleSave = (field: string) => {
    let finalValue = editValues[field as keyof typeof editValues];
    
    // If we're in guided mode for backstory, compile the answers
    if (field === 'backstory' && editMode === 'guided') {
      finalValue = compileGuidedAnswers();
    }
    
    onUpdate({ [field]: finalValue });
    setIsEditing(null);
    setEditMode('freeform');
    setGuidedAnswers({});
  };

  const handleCancel = () => {
    setIsEditing(null);
    setEditMode('freeform');
    setGuidedAnswers({});
    setEditValues({
      appearance: character.appearance || '',
      personality: character.personality || '',
      backstory: character.backstory || '',
      notes: character.notes || ''
    });
  };

  const compileGuidedAnswers = () => {
    const answers: string[] = [];
    BACKSTORY_PROMPTS.forEach((prompt, index) => {
      const answer = guidedAnswers[index];
      if (answer && answer.trim()) {
        answers.push(`${prompt.question}\n${answer.trim()}`);
      }
    });
    return answers.join('\n\n');
  };

  const handleGuidedAnswerChange = (index: number, value: string) => {
    // Apply character limit for guided answers
    if (value.length <= CHARACTER_LIMITS.guidedAnswer) {
      setGuidedAnswers(prev => ({
        ...prev,
        [index]: value
      }));
    }
  };

  const handleFieldChange = (field: keyof typeof editValues, value: string) => {
    const limit = CHARACTER_LIMITS[field];
    if (value.length <= limit) {
      setEditValues(prev => ({ ...prev, [field]: value }));
    }
  };

  const getCharacterCount = (field: keyof typeof editValues) => {
    return editValues[field]?.length || 0;
  };

  const getCharacterCountDisplay = (field: keyof typeof editValues) => {
    const count = getCharacterCount(field);
    const limit = CHARACTER_LIMITS[field];
    const isNearLimit = count > limit * 0.8;
    return (
      <span className={`text-xs ${isNearLimit ? 'text-yellow-400' : 'text-slate-400'}`}>
        {count}/{limit}
      </span>
    );
  };

  const renderBackstoryEditor = () => {
    if (isEditing !== 'backstory') return null;

    return (
      <div className="space-y-4">
        {/* Mode Selection */}
        <div className="flex gap-2 p-1 bg-slate-800 rounded-lg">
          <button
            onClick={() => setEditMode('freeform')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              editMode === 'freeform'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="h-4 w-4 inline mr-2" />
            Free Form
          </button>
          <button
            onClick={() => setEditMode('guided')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              editMode === 'guided'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="h-4 w-4 inline mr-2" />
            Guided
          </button>
        </div>

        {/* Free Form Editor */}
        {editMode === 'freeform' && (
          <div>
            <textarea
              value={editValues.backstory}
              onChange={(e) => handleFieldChange('backstory', e.target.value)}
              placeholder="Tell your character&apos;s story - their background, history, motivations, and how they became an adventurer."
              className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none resize-vertical"
              rows={8}
            />
            <div className="flex justify-end mt-1">
              {getCharacterCountDisplay('backstory')}
            </div>
          </div>
        )}

        {/* Guided Editor */}
        {editMode === 'guided' && (
          <div className="space-y-4">
            <div className="bg-slate-800 p-3 rounded-lg">
              <p className="text-slate-300 text-sm">
                Answer any questions that interest you. Each answered question will be added to your backstory.
                <span className="text-slate-400 block mt-1">None are required - skip any you don\'t want to answer!</span>
              </p>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {BACKSTORY_PROMPTS.map((prompt, index) => (
                <div key={index} className="bg-slate-600 rounded-lg p-4">
                  <label className="block text-white font-medium mb-2">
                    {prompt.question}
                  </label>
                  <textarea
                    value={guidedAnswers[index] || ''}
                    onChange={(e) => handleGuidedAnswerChange(index, e.target.value)}
                    placeholder={prompt.placeholder}
                    className="w-full bg-slate-700 border border-slate-500 rounded px-3 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none resize-vertical"
                    rows={2}
                  />
                  <div className="flex justify-end mt-1">
                    <span className={`text-xs ${(guidedAnswers[index]?.length || 0) > CHARACTER_LIMITS.guidedAnswer * 0.8 ? 'text-yellow-400' : 'text-slate-400'}`}>
                      {guidedAnswers[index]?.length || 0}/{CHARACTER_LIMITS.guidedAnswer}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Preview */}
            {Object.keys(guidedAnswers).some(key => guidedAnswers[parseInt(key)]?.trim()) && (
              <div className="bg-slate-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Preview:</h4>
                <div className="bg-slate-700 rounded p-3 max-h-32 overflow-y-auto">
                  <pre className="text-slate-300 text-sm whitespace-pre-wrap">
                    {compileGuidedAnswers()}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderEditableSection = (
    title: string,
    field: keyof typeof editValues,
    placeholder: string,
    icon: React.ReactNode,
    extraComponent?: React.ReactNode
  ) => {
    const isCurrentlyEditing = isEditing === field;
    const value = (character[field] as string) || '';

    return (
      <div className="bg-slate-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            {icon}
            {title}
          </h3>
          {!isCurrentlyEditing ? (
            <button
              onClick={() => handleStartEdit(field)}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm"
            >
              <Edit3 className="h-4 w-4" />
              {value ? 'Edit' : 'Add'}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSave(field)}
                className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors text-sm"
              >
                <Save className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors text-sm"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Extra component (like avatar selector) */}
        {extraComponent && (
          <div className="mb-4">
            {extraComponent}
          </div>
        )}

        {isCurrentlyEditing ? (
          field === 'backstory' ? (
            renderBackstoryEditor()
          ) : (
            <div>
              <textarea
                value={editValues[field]}
                onChange={(e) => handleFieldChange(field, e.target.value)}
                placeholder={placeholder}
                className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none resize-vertical"
                rows={field === 'notes' ? 12 : 4}
              />
              <div className="flex justify-end mt-1">
                {getCharacterCountDisplay(field)}
              </div>
            </div>
          )
        ) : (
          <div className={field === 'notes' ? "min-h-[300px]" : "min-h-[60px]"}>
            {value ? (
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{value}</p>
            ) : (
              <p className="text-slate-500 italic">{placeholder}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        {/* Character Summary */}
        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-400" />
            Character Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-slate-400 text-sm">Race</div>
              <div className="text-white font-medium">{character.race}</div>
            </div>
            <div>
              <div className="text-slate-400 text-sm">Class</div>
              <div className="text-white font-medium">{character.class} {character.level}</div>
            </div>
            <div>
              <div className="text-slate-400 text-sm">Background</div>
              <div className="text-white font-medium">{character.background || 'Unknown'}</div>
            </div>
            <div>
              <div className="text-slate-400 text-sm">Alignment</div>
              <div className="text-white font-medium">{character.alignment || 'Unaligned'}</div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Left Column - Character Information */}
          <div className="space-y-4">
            {renderEditableSection(
              "Appearance",
              "appearance",
              "Describe your character\'s physical appearance, clothing, distinctive features, etc.",
              <Edit3 className="h-5 w-5 text-blue-400" />,
              <AvatarSelector
                selectedAvatar={character.avatar || undefined}
                onAvatarSelect={(avatar) => onUpdate({ avatar })}
              />
            )}

            {/* Languages Section - Compact Design */}
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Languages className="h-5 w-5 text-indigo-400" />
                Languages Known
              </h3>
              
              {/* Add Language Controls */}
              <div className="flex gap-2 mb-4">
                <select
                  value=""
                  onChange={(e) => {
                    if (e.target.value) {
                      const currentLanguages = character.languages || [];
                      const racialLanguages = getRacialLanguages(character.race);
                      const allKnown = [...racialLanguages, ...currentLanguages];
                      
                      if (!allKnown.includes(e.target.value)) {
                        const newLanguages = [...currentLanguages, e.target.value];
                        onUpdate({ languages: newLanguages });
                      }
                      e.target.value = ""; // Reset selection
                    }
                  }}
                  className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Add a language...</option>
                  {LANGUAGES
                    .filter(lang => {
                      const racialLanguages = getRacialLanguages(character.race);
                      const learnedLanguages = character.languages || [];
                      const allKnown = [...racialLanguages, ...learnedLanguages];
                      return !allKnown.includes(lang.name);
                    })
                    .sort((a, b) => {
                      // Sort by category, then by name
                      if (a.category !== b.category) {
                        const order = ['Standard', 'Exotic', 'Secret'];
                        return order.indexOf(a.category) - order.indexOf(b.category);
                      }
                      return a.name.localeCompare(b.name);
                    })
                    .map(lang => (
                      <option key={lang.name} value={lang.name}>
                        {lang.name} ({lang.category})
                      </option>
                    ))}
                </select>
              </div>

              {/* All Known Languages List */}
              <div className="space-y-2">
                <div className="text-sm text-slate-400 mb-2">Known languages:</div>
                <div className="flex flex-wrap gap-2">
                  {/* Racial Languages */}
                  {getRacialLanguages(character.race).map(lang => (
                    <span key={`racial-${lang}`} className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-600/30 flex items-center gap-2">
                      {lang}
                      <span className="text-xs opacity-75">(Racial)</span>
                    </span>
                  ))}
                  
                  {/* Learned Languages */}
                  {(character.languages || []).map(lang => (
                    <span key={`learned-${lang}`} className="bg-green-900/30 text-green-300 px-3 py-1 rounded-full text-sm border border-green-600/30 flex items-center gap-2">
                      {lang}
                      <button
                        onClick={() => {
                          const newLanguages = (character.languages || []).filter(l => l !== lang);
                          onUpdate({ languages: newLanguages });
                        }}
                        className="text-green-400 hover:text-green-200 ml-1 text-xs font-bold"
                        title="Remove language"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                
                {/* Empty state */}
                {getRacialLanguages(character.race).length === 0 && (!character.languages || character.languages.length === 0) && (
                  <div className="text-slate-500 text-sm italic">No languages known</div>
                )}
              </div>
            </div>

            {renderEditableSection(
              "Personality",
              "personality",
              "Describe your character\'s personality traits, ideals, bonds, flaws, mannerisms, etc.",
              <Edit3 className="h-5 w-5 text-green-400" />
            )}

            {renderEditableSection(
              "Backstory",
              "backstory",
              "Tell your character\'s story - their background, history, motivations, and how they became an adventurer.",
              <BookOpen className="h-5 w-5 text-orange-400" />
            )}
          </div>

          {/* Right Column - Notes */}
          <div>
            {renderEditableSection(
              "Notes",
              "notes",
              "Any additional notes, campaign information, character development, or other details.",
              <Edit3 className="h-5 w-5 text-purple-400" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 