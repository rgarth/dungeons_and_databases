"use client";
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { BookOpen, Edit3, Save, X, FileText, HelpCircle, Languages } from "lucide-react";
import { createCharacterStoryService } from "@/services/character/character-story";
import type { CharacterLimits } from "@/services/character/character-story";
import { BackgroundSelector, type SelectedCharacteristics } from "../../shared/BackgroundSelector";
// AvatarSelector removed - now using inline avatar display
import { AvatarGenerator } from '../../shared/AvatarGenerator';
import type { CharacterAvatarData } from '@/app/api/generate-avatar/route';
import { getRacialLanguages } from "@/lib/dnd/languages";
import { LANGUAGES } from "@/lib/dnd/languages";
import Image from 'next/image';

interface BackgroundTabProps {
  character: {
    id: string;
    name: string;
    race: string;
    class: string;
    level: number;
    background?: string;
    alignment?: string;
    gender?: string;
    age?: number;
    appearance?: string;
    personality?: string;
    backstory?: string;
    notes?: string;
    avatar?: string | null;
    fullBodyAvatar?: string | null;
    languages?: string[];
    backgroundCharacteristics?: SelectedCharacteristics;
  };
  onUpdate: (updates: { 
    name?: string;
    gender?: string;
    age?: number;
    alignment?: string;
    appearance?: string; 
    personality?: string; 
    backstory?: string; 
    notes?: string; 
    languages?: string[];
    avatar?: string;
    fullBodyAvatar?: string;
    background?: string;
    backgroundCharacteristics?: SelectedCharacteristics;
  }) => void;
}

// Initialize character story service
const storyService = createCharacterStoryService();

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
  const [showBackgroundModal, setShowBackgroundModal] = useState(false);
  
  // Character summary edit state
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [summaryEditValues, setSummaryEditValues] = useState({
    name: character.name,
    gender: character.gender || '',
    age: character.age?.toString() || '',
    alignment: character.alignment || ''
  });

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

  // Character summary edit handlers
  const handleStartSummaryEdit = () => {
    setIsEditingSummary(true);
    setSummaryEditValues({
      name: character.name,
      gender: character.gender || '',
      age: character.age?.toString() || '',
      alignment: character.alignment || ''
    });
  };

  const handleSaveSummary = () => {
    const updates: {
      name: string;
      gender?: string;
      age?: number;
      alignment?: string;
    } = {
      name: summaryEditValues.name.trim(),
      gender: summaryEditValues.gender.trim() || undefined,
      alignment: summaryEditValues.alignment.trim() || undefined
    };
    
    // Convert age to number if provided
    if (summaryEditValues.age.trim()) {
      const ageNum = parseInt(summaryEditValues.age.trim());
      if (!isNaN(ageNum) && ageNum > 0) {
        updates.age = ageNum;
      }
    } else {
      updates.age = undefined;
    }
    
    onUpdate(updates);
    setIsEditingSummary(false);
  };

  const handleCancelSummary = () => {
    setIsEditingSummary(false);
    setSummaryEditValues({
      name: character.name,
      gender: character.gender || '',
      age: character.age?.toString() || '',
      alignment: character.alignment || ''
    });
  };

  const compileGuidedAnswers = () => {
    return storyService.compileGuidedAnswers(guidedAnswers);
  };

  const handleGuidedAnswerChange = (index: number, value: string) => {
    // Apply character limit for guided answers using service
    if (storyService.validateGuidedAnswer(value)) {
      setGuidedAnswers(prev => ({
        ...prev,
        [index]: value
      }));
    }
  };

  const handleFieldChange = (field: keyof typeof editValues, value: string) => {
    // Use service to validate character limits
    if (storyService.isWithinLimit(value, field as keyof CharacterLimits)) {
      setEditValues(prev => ({ ...prev, [field]: value }));
    }
  };

  const getCharacterCountDisplay = (field: keyof typeof editValues) => {
    const text = editValues[field] || '';
    const info = storyService.getCharacterCountInfo(text, field as keyof CharacterLimits);
    return (
      <span className={`text-xs ${info.displayClass}`}>
        {info.count}/{info.limit}
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
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="bg-slate-800 p-3 rounded-lg">
              <p className="text-slate-300 text-sm">
                Answer any questions that interest you. Each answered question will be added to your backstory.
                <span className="text-slate-400 block mt-1">None are required - skip any you don\'t want to answer!</span>
              </p>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {storyService.getBackstoryPrompts().map((prompt, index) => (
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
                    {(() => {
                      const text = guidedAnswers[index] || '';
                      const info = storyService.getGuidedAnswerCountInfo(text);
                      return (
                        <span className={`text-xs ${info.displayClass}`}>
                          {info.count}/{info.limit}
                        </span>
                      );
                    })()}
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
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-400" />
              Character Summary
            </h3>
            {!isEditingSummary && (
              <button
                onClick={handleStartSummaryEdit}
                className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-lg transition-colors flex items-center gap-2 text-sm"
              >
                <Edit3 className="h-4 w-4" />
                Edit
              </button>
            )}
          </div>
          
          {isEditingSummary ? (
            /* Edit Mode */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Name</label>
                  <input
                    type="text"
                    value={summaryEditValues.name}
                    onChange={(e) => setSummaryEditValues(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Gender</label>
                  <select
                    value={summaryEditValues.gender}
                    onChange={(e) => setSummaryEditValues(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">Not specified</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Age</label>
                  <input
                    type="number"
                    value={summaryEditValues.age}
                    onChange={(e) => setSummaryEditValues(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="Unknown"
                    min="1"
                    className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Alignment</label>
                  <input
                    type="text"
                    value={summaryEditValues.alignment}
                    onChange={(e) => setSummaryEditValues(prev => ({ ...prev, alignment: e.target.value }))}
                    placeholder="Unaligned"
                    className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleCancelSummary}
                  className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSaveSummary}
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save
                </button>
              </div>
            </div>
          ) : (
            /* Display Mode */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
              <div>
                <div className="text-slate-400 text-sm">Name</div>
                <div className="text-white font-medium">{character.name}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Race</div>
                <div className="text-white font-medium">{character.race}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Class</div>
                <div className="text-white font-medium">{character.class} {character.level}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Gender</div>
                <div className="text-white font-medium">{character.gender || 'Unknown'}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Age</div>
                <div className="text-white font-medium">{character.age || 'Unknown'}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Alignment</div>
                <div className="text-white font-medium">{character.alignment || 'Unaligned'}</div>
              </div>
            </div>
          )}
        </div>

        {/* Background Summary with Edit Button */}
        <div className="bg-slate-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-400" />
              Background & Traits
            </h3>
            <button
              onClick={() => setShowBackgroundModal(true)}
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Edit3 className="h-4 w-4" />
              Edit Background
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-slate-400 text-sm mb-1">Background</div>
              <div className="text-white font-medium">{character.background || 'No background selected'}</div>
            </div>
            
            {character.backgroundCharacteristics && (
              <>
                <div>
                  <div className="text-slate-400 text-sm mb-1">Personality Traits</div>
                  <div className="text-white text-sm space-y-1">
                    {((character.backgroundCharacteristics?.personalityTraits ?? []).length > 0) 
                      ? (character.backgroundCharacteristics?.personalityTraits ?? []).map((trait, index) => (
                          <div key={index}>• {trait}</div>
                        ))
                      : <div className="text-slate-500">None selected</div>
                    }
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1">Ideals</div>
                  <div className="text-white text-sm space-y-1">
                    {((character.backgroundCharacteristics?.ideals ?? []).length > 0) 
                      ? (character.backgroundCharacteristics?.ideals ?? []).map((ideal, index) => (
                          <div key={index}>• {ideal}</div>
                        ))
                      : <div className="text-slate-500">None selected</div>
                    }
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1">Bonds</div>
                  <div className="text-white text-sm space-y-1">
                    {((character.backgroundCharacteristics?.bonds ?? []).length > 0) 
                      ? (character.backgroundCharacteristics?.bonds ?? []).map((bond, index) => (
                          <div key={index}>• {bond}</div>
                        ))
                      : <div className="text-slate-500">None selected</div>
                    }
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1">Flaws</div>
                  <div className="text-white text-sm space-y-1">
                    {((character.backgroundCharacteristics?.flaws ?? []).length > 0) 
                      ? (character.backgroundCharacteristics?.flaws ?? []).map((flaw, index) => (
                          <div key={index}>• {flaw}</div>
                        ))
                      : <div className="text-slate-500">None selected</div>
                    }
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Left Column - Character Information */}
          <div className="space-y-4">
            {/* Combined Appearance & Avatar Section */}
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-blue-400" />
                Appearance & Avatar
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Avatar Display */}
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Character Portrait</h4>
                  
                  {/* Current Avatar Display */}
                  {(character.fullBodyAvatar || character.avatar) ? (
                    <div className="space-y-3">
                      <Image 
                        src={character.fullBodyAvatar || character.avatar || '/default-avatar.png'} 
                        alt={`${character.name}'s avatar`}
                        width={192}
                        height={192}
                        className="w-48 h-48 rounded-lg object-cover"
                      />
                      <div className="text-center">
                        <button
                          onClick={() => onUpdate({ avatar: undefined, fullBodyAvatar: undefined })}
                          className="text-red-400 hover:text-red-300 text-sm transition-colors"
                        >
                          Remove Avatar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-48 h-60 mx-auto rounded-lg border-2 border-dashed border-slate-500 flex flex-col items-center justify-center text-slate-400">
                      <Edit3 className="h-12 w-12 mb-2" />
                      <span className="text-sm text-center">No avatar set<br />Generate one below</span>
                    </div>
                  )}

                  {/* AI Provider Credit */}
                  <div className="text-xs text-slate-500 text-center">
                    <p>🤖 AI avatars by <span className="text-slate-400">Pollinations.ai</span></p>
                  </div>
                </div>

                {/* Right: Appearance Text & Avatar Generation */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Physical Description</h4>
                    {isEditing === 'appearance' ? (
                      <div className="space-y-3">
                        <textarea
                          value={editValues.appearance}
                          onChange={(e) => handleFieldChange('appearance', e.target.value)}
                          placeholder="Describe your character's physical appearance, clothing, distinctive features, scars, etc."
                          className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none resize-vertical"
                          rows={6}
                        />
                        <div className="flex justify-between items-center">
                          <div className="flex justify-end">
                            {getCharacterCountDisplay('appearance')}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handleCancel}
                              className="bg-slate-600 hover:bg-slate-500 text-white px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
                            >
                              <X className="h-3 w-3" />
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSave('appearance')}
                              className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
                            >
                              <Save className="h-3 w-3" />
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={() => handleStartEdit('appearance')}
                        className="min-h-[120px] cursor-pointer hover:bg-slate-600 rounded-lg p-3 border border-slate-600 hover:border-slate-500 transition-colors"
                      >
                        {character.appearance ? (
                          <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{character.appearance}</p>
                        ) : (
                          <p className="text-slate-500 italic">Click to describe your character&apos;s physical appearance, clothing, distinctive features, etc.</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Avatar Generation */}
                  <div className="border-t border-slate-600 pt-4">
                    <h4 className="text-white font-medium mb-3">Generate AI Avatar</h4>
                    <p className="text-slate-400 text-sm mb-3">
                      Create a personalized portrait based on your character&apos;s traits and description.
                    </p>
                    
                    <AvatarGenerator
                      characterData={{
                        race: character.race,
                        class: character.class,
                        gender: character.gender || 'Male',
                        alignment: character.alignment,
                        background: character.background,
                        personalityTraits: character.backgroundCharacteristics?.personalityTraits || [],
                        ideals: character.backgroundCharacteristics?.ideals || [],
                        bonds: character.backgroundCharacteristics?.bonds || [],
                        flaws: character.backgroundCharacteristics?.flaws || [],
                        appearance: character.appearance || '',
                        equippedWeapons: [],
                        equippedArmor: []
                      } as CharacterAvatarData}
                      onAvatarGenerated={(avatarDataUrl, fullBodyDataUrl) => {
                        onUpdate({ 
                          avatar: avatarDataUrl,
                          fullBodyAvatar: fullBodyDataUrl
                        });
                      }}
                      disabled={false}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

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
      
      {/* Background Modal */}
      {showBackgroundModal && (
        <BackgroundSelector
          selectedBackground={character.background || ""}
          selectedCharacteristics={character.backgroundCharacteristics}
          onBackgroundChange={(background) => onUpdate({ background })}
          onCharacteristicsChange={(backgroundCharacteristics) => onUpdate({ backgroundCharacteristics })}
          showCharacteristics={true}
          showFullDetails={true}
          isModal={true}
          title="Edit Background & Traits"
          onConfirm={() => setShowBackgroundModal(false)}
          onCancel={() => setShowBackgroundModal(false)}
        />
      )}
    </div>
  );
} 