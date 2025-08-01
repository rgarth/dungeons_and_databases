"use client";
/* eslint-disable react/no-unescaped-entities */

import React, { useState, useEffect } from 'react';
import { 
  Edit3, 
  Save, 
  X, 
  FileText, 
  HelpCircle, 
  Languages, 
  AlertCircle, 
  Info,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { createCharacterStoryService } from "@/services/character/character-story";
import type { CharacterLimits } from "@/services/character/character-story";
import { BackgroundSelector, type SelectedCharacteristics, type BackgroundData } from "../../shared/BackgroundSelector";
// AvatarSelector removed - now using inline avatar display
import { AvatarGenerator } from '../../shared/AvatarGenerator';
import { SubraceSelector } from '../../shared/SubraceSelector';
import type { CharacterAvatarData } from '@/types/character';
import { getRacialLanguages, getLanguages, getLanguageStyling, type Language, getClassLanguages, getAutomaticLanguages } from "@/lib/dnd/languages";
import { SKILLS } from "@/lib/dnd/core";
import Image from 'next/image';
import { RacialFeaturesService, type RacialTrait } from '@/services/character/racial-features';
import { useCharacterMutations, useAvatar } from '@/hooks/use-character-mutations';

interface BackgroundTabProps {
  character: {
    id: string;
    name: string;
    race: string;
    subrace?: string;
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
    languageSources?: { [languageName: string]: 'background' | 'racial' | 'class' | 'feat' | 'other' };
    skills?: string[];
    skillSources?: { [skillName: string]: 'class' | 'background' | 'racial' | 'feat' | 'other'; };
    backgroundCharacteristics?: SelectedCharacteristics;
  };
  onUpdate: (updates: { 
    name?: string;
    gender?: string;
    age?: number;
    alignment?: string;
    subrace?: string;
    appearance?: string; 
    personality?: string; 
    backstory?: string; 
    notes?: string; 
    languages?: string[];
    languageSources?: { [languageName: string]: 'background' | 'racial' | 'class' | 'feat' | 'other' };
    skills?: string[];
    skillSources?: { [skillName: string]: 'class' | 'background' | 'racial' | 'feat' | 'other'; };
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
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isLoadingLanguages, setIsLoadingLanguages] = useState(true);
  const [backgroundData, setBackgroundData] = useState<BackgroundData | null>(null);
  
  // Character summary edit state
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [summaryEditValues, setSummaryEditValues] = useState({
    name: character.name,
    gender: character.gender || '',
    age: character.age?.toString() || '',
    alignment: character.alignment || '',
    subrace: character.subrace || ''
  });

  const [racialTraits, setRacialTraits] = useState<RacialTrait[]>([]);
  const [traitsError, setTraitsError] = useState<string | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Use React Query for avatar fetching
  const { data: avatarUrl } = useAvatar(character.id);
  const { updateAvatar, deleteAvatar } = useCharacterMutations();

  // Load languages from database
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const languagesData = await getLanguages();
        setLanguages(languagesData);
      } catch (error) {
        console.error('Failed to load languages:', error);
        // Set empty array as fallback to prevent component crashes
        setLanguages([]);
      } finally {
        setIsLoadingLanguages(false);
      }
    };

    loadLanguages();
  }, []);

  // Load background data to check language requirements
  useEffect(() => {
    const loadBackgroundData = async () => {
      if (!character.background) return;
      
      try {
        const response = await fetch('/api/backgrounds');
        if (response.ok) {
          const backgrounds = await response.json();
          const background = backgrounds.find((bg: BackgroundData) => bg.name === character.background);
          setBackgroundData(background);
        }
      } catch (error) {
        console.error('Failed to load background data:', error);
      }
    };

    loadBackgroundData();
  }, [character.background]);

  useEffect(() => {
    const loadTraits = async () => {
      try {
        const traits = await RacialFeaturesService.getRacialTraits(character.race, character.subrace);
        setRacialTraits(traits);
        setTraitsError(null);
      } catch {
        setTraitsError('Error loading racial traits.');
        setRacialTraits([]);
      }
    };
    if (character.race) {
      loadTraits();
    }
  }, [character.race, character.subrace]);

  // Handle clicking outside tooltips to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeTooltip && !(event.target as Element).closest('[data-tooltip]')) {
        setActiveTooltip(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeTooltip]);

  const toggleTooltip = (tooltipId: string) => {
    setActiveTooltip(activeTooltip === tooltipId ? null : tooltipId);
  };

  const getLanguageRequirements = () => {
    const requirements = [];
    
    // Get language sources from character (similar to skillSources)
    const languageSources = character.languageSources || {};
    const learnedLanguages = character.languages || [];
    // const racialLanguages = getRacialLanguages(character.race);
    // const classLanguages = getClassLanguages(character.class);
    
    // Check background language requirements
    if (backgroundData && backgroundData.languages) {
      const backgroundLanguages = backgroundData.languages;
      
      // Check for "X of your choice" patterns
      for (const lang of backgroundLanguages) {
        if (lang.includes('of your choice')) {
          // Handle both numeric and word representations
          let match = lang.match(/(\d+)\s+of\s+your\s+choice/i);
          if (!match) {
            // Try word representations
            match = lang.match(/(one|two|three|four|five)\s+of\s+your\s+choice/i);
          }
          if (match) {
            let required: number;
            if (match[1].match(/\d+/)) {
              required = parseInt(match[1]);
            } else {
              // Convert word to number
              const wordToNumber: Record<string, number> = {
                'one': 1,
                'two': 2,
                'three': 3,
                'four': 4,
                'five': 5
              };
              required = wordToNumber[match[1].toLowerCase()] || 0;
            }
            
            // Count languages specifically chosen for background
            const backgroundChosenLanguages = learnedLanguages.filter(lang => 
              languageSources[lang] === 'background'
            );
            const current = backgroundChosenLanguages.length;
            const remaining = required - current;
            
            requirements.push({
              type: 'background',
              required,
              current,
              remaining,
              description: lang,
              source: character.background
            });
          }
        }
      }
    }
    
    // Check racial language bonuses
    const racialLanguageBonus = getRacialLanguageBonus(character.race);
    if (racialLanguageBonus) {
      // Count languages specifically chosen for racial bonus
      const racialChosenLanguages = learnedLanguages.filter(lang => 
        languageSources[lang] === 'racial'
      );
      const current = racialChosenLanguages.length;
      const remaining = racialLanguageBonus.count - current;
      
      requirements.push({
        type: 'racial',
        required: racialLanguageBonus.count,
        current,
        remaining,
        description: racialLanguageBonus.description,
        source: character.race
      });
    }
    
    return requirements;
  };

  // Helper function to get racial language bonuses
  const getRacialLanguageBonus = (race: string) => {
    const racialBonuses: Record<string, { count: number; description: string }> = {
      'Human': { 
        count: 1, 
        description: 'One language of your choice' 
      },
      'Half-Elf': { 
        count: 1, 
        description: 'One language of your choice' 
      },
      // Add other races with language bonuses as needed
    };
    
    return racialBonuses[race] || null;
  };

  const languageRequirements = getLanguageRequirements();

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
      alignment: character.alignment || '',
      subrace: character.subrace || ''
    });
  };

  const handleSaveSummary = () => {
    const updates: {
      name: string;
      gender?: string;
      age?: number;
      alignment?: string;
      subrace?: string;
    } = {
      name: summaryEditValues.name.trim(),
      gender: summaryEditValues.gender.trim() || undefined,
      alignment: summaryEditValues.alignment.trim() || undefined,
      subrace: summaryEditValues.subrace.trim() || undefined
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
      alignment: character.alignment || '',
      subrace: character.subrace || ''
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

  // Helper functions for skill source tracking
  const getRacialSkills = () => {
    const skillSources = character.skillSources || {};
    return (character.skills || []).filter(skill => skillSources[skill] === 'racial');
  };

  const getClassSkills = () => {
    const skillSources = character.skillSources || {};
    return (character.skills || []).filter(skill => skillSources[skill] === 'class');
  };

  const addSkillWithSource = (skill: string, source: 'class' | 'background' | 'racial' | 'feat' | 'other') => {
    const currentSkills = character.skills || [];
    const currentSources = character.skillSources || {};
    
    if (!currentSkills.includes(skill)) {
      const newSkills = [...currentSkills, skill];
      const newSources = { ...currentSources, [skill]: source };
      onUpdate({ skills: newSkills, skillSources: newSources });
    }
  };

  const removeSkillWithSource = (skill: string) => {
    const currentSkills = character.skills || [];
    const currentSources = character.skillSources || {};
    
    const newSkills = currentSkills.filter(s => s !== skill);
    const newSources = { ...currentSources };
    delete newSources[skill];
    
    onUpdate({ skills: newSkills, skillSources: newSources });
  };

  // Helper functions for language source tracking
  const addLanguageWithSource = (language: string, source: 'background' | 'racial' | 'class' | 'feat' | 'other') => {
    const currentLanguages = character.languages || [];
    const languageSources = character.languageSources || {};
    
    if (!currentLanguages.includes(language)) {
      const newLanguages = [...currentLanguages, language];
      const newSources = { ...languageSources, [language]: source };
      onUpdate({ languages: newLanguages, languageSources: newSources });
    }
  };

  const removeLanguageWithSource = (language: string) => {
    const languageSources = character.languageSources || {};
    const newSources = { ...languageSources };
    delete newSources[language];
    
    const newLanguages = (character.languages || []).filter(l => l !== language);
    onUpdate({ languages: newLanguages, languageSources: newSources });
  };

  const renderBackstoryEditor = () => {
    if (isEditing !== 'backstory') return null;

    return (
      <div className="space-y-4">
        {/* Mode Selection */}
        <div className="flex gap-2 p-1 bg-[var(--color-card-secondary)] rounded-lg">
          <button
            onClick={() => setEditMode('freeform')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              editMode === 'freeform'
                ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            <FileText className="h-4 w-4 inline mr-2" />
            Free Form
          </button>
          <button
            onClick={() => setEditMode('guided')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              editMode === 'guided'
                ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
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
              className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none resize-vertical"
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
            <div className="bg-[var(--color-card-secondary)] p-3 rounded-lg">
              <p className="text-[var(--color-text-primary)] text-sm">
                Answer any questions that interest you. Each answered question will be added to your backstory.
                <span className="text-[var(--color-text-secondary)] block mt-1">None are required - skip any you don\'t want to answer!</span>
              </p>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {storyService.getBackstoryPrompts().map((prompt, index) => (
                <div key={index} className="bg-[var(--color-card-secondary)] rounded-lg p-4">
                  <label className="block text-[var(--color-text-primary)] font-medium mb-2">
                    {prompt.question}
                  </label>
                  <textarea
                    value={guidedAnswers[index] || ''}
                    onChange={(e) => handleGuidedAnswerChange(index, e.target.value)}
                    placeholder={prompt.placeholder}
                    className="w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none resize-vertical"
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
              <div className="bg-[var(--color-card-secondary)] rounded-lg p-4">
                <h4 className="text-[var(--color-text-primary)] font-medium mb-2">Preview:</h4>
                <div className="bg-[var(--color-card)] rounded p-3 max-h-32 overflow-y-auto">
                  <pre className="text-[var(--color-text-primary)] text-sm whitespace-pre-wrap">
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
      <div className="bg-[var(--color-card)] rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
            {icon}
            {title}
          </h3>
          {!isCurrentlyEditing ? (
            <button
              onClick={() => handleStartEdit(field)}
              className="flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm"
            >
              <Edit3 className="h-4 w-4" />
              {value ? 'Edit' : 'Add'}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSave(field)}
                className="flex items-center gap-1 text-[var(--color-success)] hover:text-[var(--color-success-hover)] transition-colors text-sm"
              >
                <Save className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 text-[var(--color-danger)] hover:text-[var(--color-danger-hover)] transition-colors text-sm"
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
                className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none resize-vertical"
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
              <p className="text-[var(--color-text-primary)] leading-relaxed whitespace-pre-wrap">{value}</p>
            ) : (
              <p className="text-[var(--color-text-muted)] italic">{placeholder}</p>
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
        <div className="bg-[var(--color-card)] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[var(--color-accent)]" />
              Character Summary
            </h3>
            {!isEditingSummary && (
              <button
                onClick={handleStartSummaryEdit}
                className="bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] px-3 py-1 rounded-lg transition-colors flex items-center gap-2 text-sm"
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
                  <label className="block text-[var(--color-text-secondary)] text-sm mb-1">Name</label>
                  <input
                    type="text"
                    value={summaryEditValues.name}
                    onChange={(e) => setSummaryEditValues(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-text-secondary)] text-sm mb-1">Gender</label>
                  <select
                    value={summaryEditValues.gender}
                    onChange={(e) => setSummaryEditValues(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
                  >
                    <option value="">Not specified</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[var(--color-text-secondary)] text-sm mb-1">Age</label>
                  <input
                    type="number"
                    value={summaryEditValues.age}
                    onChange={(e) => setSummaryEditValues(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="Unknown"
                    min="1"
                    className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-text-secondary)] text-sm mb-1">Alignment</label>
                  <input
                    type="text"
                    value={summaryEditValues.alignment}
                    onChange={(e) => setSummaryEditValues(prev => ({ ...prev, alignment: e.target.value }))}
                    placeholder="Unaligned"
                    className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-text-secondary)] text-sm mb-1">Subrace</label>
                  <SubraceSelector
                    race={character.race}
                    selectedSubrace={summaryEditValues.subrace}
                    onSubraceChange={(subrace) => setSummaryEditValues(prev => ({ ...prev, subrace: subrace || '' }))}
                    disabled={false}
                  />
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleCancelSummary}
                  className="bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-tertiary)] text-[var(--color-text-primary)] px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSaveSummary}
                  className="bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-[var(--color-success-text)] px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
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
                <div className="text-[var(--color-text-secondary)] text-sm">Name</div>
                <div className="text-[var(--color-text-primary)] font-medium">{character.name}</div>
              </div>
              <div>
                <div className="text-[var(--color-text-secondary)] text-sm">{character.subrace ? 'Subrace' : 'Race'}</div>
                <div className="text-[var(--color-text-primary)] font-medium">{character.subrace ? character.subrace : character.race}</div>
              </div>
              <div>
                <div className="text-[var(--color-text-secondary)] text-sm">Class</div>
                <div className="text-[var(--color-text-primary)] font-medium">{character.class} {character.level}</div>
              </div>
              <div>
                <div className="text-[var(--color-text-secondary)] text-sm">Gender</div>
                <div className="text-[var(--color-text-primary)] font-medium">{character.gender || 'Unknown'}</div>
              </div>
              <div>
                <div className="text-[var(--color-text-secondary)] text-sm">Age</div>
                <div className="text-[var(--color-text-primary)] font-medium">{character.age || 'Unknown'}</div>
              </div>
              <div>
                <div className="text-[var(--color-text-secondary)] text-sm">Alignment</div>
                <div className="text-[var(--color-text-primary)] font-medium">{character.alignment || 'Unaligned'}                </div>
              </div>
              
              {/* Display selected draconic ancestry effects - only if there's content to show */}
              {character.subrace && (() => {
                const hasBreathWeapon = character.subrace.includes('Black') || character.subrace.includes('Copper') || 
                                       character.subrace.includes('Blue') || character.subrace.includes('Bronze') || 
                                       character.subrace.includes('Brass') || character.subrace.includes('Gold') || 
                                       character.subrace.includes('Red') || character.subrace.includes('Green') || 
                                       character.subrace.includes('Silver') || character.subrace.includes('White');
                
                if (!hasBreathWeapon) return null;
                
                return (
                  <div className="mt-3 p-3 bg-[var(--color-card-tertiary)]/30 rounded-lg">
                    <div className="text-[var(--color-text-primary)] text-sm space-y-1">
                      <div className="font-medium text-[var(--color-text-primary)]">{character.subrace}</div>
                      {character.subrace.includes('Black') || character.subrace.includes('Copper') ? (
                        <div>• Breath Weapon: 5 by 30 ft. line (Dex save) - Acid damage</div>
                      ) : character.subrace.includes('Blue') || character.subrace.includes('Bronze') ? (
                        <div>• Breath Weapon: 5 by 30 ft. line (Dex save) - Lightning damage</div>
                      ) : character.subrace.includes('Brass') || character.subrace.includes('Gold') || character.subrace.includes('Red') ? (
                        <div>• Breath Weapon: 15 ft. cone (Dex save) - Fire damage</div>
                      ) : character.subrace.includes('Green') ? (
                        <div>• Breath Weapon: 15 ft. cone (Con save) - Poison damage</div>
                      ) : character.subrace.includes('Silver') || character.subrace.includes('White') ? (
                        <div>• Breath Weapon: 15 ft. cone (Con save) - Cold damage</div>
                      ) : null}
                      
                      {character.subrace.includes('Black') || character.subrace.includes('Copper') ? (
                        <div>• Damage Resistance: Acid</div>
                      ) : character.subrace.includes('Blue') || character.subrace.includes('Bronze') ? (
                        <div>• Damage Resistance: Lightning</div>
                      ) : character.subrace.includes('Brass') || character.subrace.includes('Gold') || character.subrace.includes('Red') ? (
                        <div>• Damage Resistance: Fire</div>
                      ) : character.subrace.includes('Green') ? (
                        <div>• Damage Resistance: Poison</div>
                      ) : character.subrace.includes('Silver') || character.subrace.includes('White') ? (
                        <div>• Damage Resistance: Cold</div>
                      ) : null}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Racial Traits Section */}
        <div className="bg-[var(--color-card)] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[var(--color-accent)]" />
            Racial Traits
          </h3>
          {traitsError ? (
            <div className="text-[var(--color-danger)]">{traitsError}</div>
          ) : racialTraits.length === 0 ? (
            <div className="text-[var(--color-text-secondary)]">No racial traits found.</div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {racialTraits.map((trait, index) => (
                <div key={index} className="relative flex items-center gap-2">
                  <span className="bg-[var(--color-racial-trait-bg)] text-[var(--color-racial-trait-text)] px-3 py-1 rounded-full text-sm font-medium">
                    {trait.name}
                  </span>
                  <button
                    onClick={() => toggleTooltip(`racial-${index}`)}
                    className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
                    data-tooltip
                  >
                    <HelpCircle className="h-4 w-4" />
                  </button>
                  {activeTooltip === `racial-${index}` && (
                    <div className="absolute z-50 top-full left-0 mt-2 p-3 bg-[var(--color-card-secondary)] rounded text-sm text-[var(--color-text-primary)] border border-[var(--color-border)] w-80 shadow-lg" data-tooltip>
                      <strong className="text-[var(--color-accent)]">{trait.name}</strong><br/>
                      {trait.description}<br/>
                      <span className="text-xs text-[var(--color-text-secondary)] mt-1 block">
                        Type: {trait.type === 'active' ? 'Action Required' : 'Always Active'}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Background Features Section */}
        {backgroundData && (
                  <div className="bg-[var(--color-card)] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[var(--color-accent)]" />
            Background Features
          </h3>
            <div className="space-y-3">
              {/* Background Feature */}
              <div className="flex flex-wrap gap-2">
                <div className="relative flex items-center gap-2">
                  <span className="bg-[var(--color-racial-trait-bg)] text-[var(--color-racial-trait-text)] px-3 py-1 rounded-full text-sm font-medium">
                    {backgroundData.feature}
                  </span>
                  <button
                    onClick={() => toggleTooltip('background-feature')}
                    className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
                    data-tooltip
                  >
                    <HelpCircle className="h-4 w-4" />
                  </button>
                  {activeTooltip === 'background-feature' && (
                    <div className="absolute z-50 top-full left-0 mt-2 p-3 bg-[var(--color-card-secondary)] rounded text-sm text-[var(--color-text-primary)] border border-[var(--color-border)] w-80 shadow-lg" data-tooltip>
                      <strong className="text-[var(--color-accent)]">{backgroundData.feature}</strong><br/>
                      {backgroundData.featureDescription}<br/>
                      <span className="text-xs text-[var(--color-text-secondary)] mt-1 block">
                        Type: Background Feature
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Background Skill Proficiencies */}
              {backgroundData.skillProficiencies && backgroundData.skillProficiencies.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-2">Skill Proficiencies Granted:</h4>
                  <div className="flex flex-wrap gap-2">
                    {backgroundData.skillProficiencies.map((skill, index) => (
                      <span key={index} className="px-2 py-1 rounded text-xs font-medium" style={{
                        backgroundColor: 'var(--color-surface-secondary)',
                        color: 'var(--color-success)',
                        border: '1px solid var(--color-success)'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              

            </div>
          </div>
        )}

        {/* Racial Choices Section */}
        <div className="bg-[var(--color-card)] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[var(--color-accent)]" />
            Racial Choices
          </h3>
          
          {/* Human Extra Skill */}
          {character.race === 'Human' && (
            <div className="mb-4 p-3 bg-[var(--color-card-secondary)] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[var(--color-text-primary)] font-medium">Extra Skill</h4>
                <span className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-card)] px-2 py-1 rounded">Human Trait</span>
              </div>
              <p className="text-[var(--color-text-primary)] text-sm mb-3">
                You gain proficiency in one skill of your choice.
              </p>
              <div className="space-y-2">
                {/* Show currently selected human skill */}
                {getRacialSkills().length > 0 && (
                  <div className="flex items-center gap-2 p-2 bg-[var(--color-card)] rounded border border-[var(--color-border)]">
                    <span className="text-[var(--color-success)] text-sm">✓</span>
                    <span className="text-[var(--color-text-primary)] text-sm">{getRacialSkills()[0]}</span>
                    <button
                      onClick={() => {
                        removeSkillWithSource(getRacialSkills()[0]);
                      }}
                      className="ml-auto text-[var(--color-danger)] hover:text-[var(--color-danger-hover)] text-xs"
                    >
                      Change
                    </button>
                  </div>
                )}
                
                {/* Skill selector (only show if no racial skill selected) */}
                {getRacialSkills().length === 0 && (
                  <select
                    value=""
                    onChange={(e) => {
                      if (e.target.value) {
                        addSkillWithSource(e.target.value, 'racial');
                        e.target.value = "";
                      }
                    }}
                    className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] text-sm focus:border-[var(--color-accent)] focus:outline-none"
                  >
                    <option value="">Choose a skill...</option>
                    {Object.keys(SKILLS).filter(skill => !(character.skills || []).includes(skill)).map(skill => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          )}



          {/* Half-Elf Two Skills */}
          {character.race === 'Half-Elf' && (
            <div className="mb-4 p-3 bg-[var(--color-card-secondary)] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[var(--color-text-primary)] font-medium">Two Skills</h4>
                <span className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-card)] px-2 py-1 rounded">Half-Elf Trait</span>
              </div>
              <p className="text-[var(--color-text-primary)] text-sm mb-3">
                You gain proficiency in two skills of your choice.
              </p>
              <div className="space-y-2">
                {/* Show currently selected Half-Elf skills */}
                {getRacialSkills().length > 0 && (
                  <div className="space-y-2">
                    {getRacialSkills().map((skill, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-[var(--color-card)] rounded border border-[var(--color-border)]">
                        <span className="text-[var(--color-success)] text-sm">✓</span>
                        <span className="text-[var(--color-text-primary)] text-sm">{skill}</span>
                        <button
                          onClick={() => {
                            removeSkillWithSource(skill);
                          }}
                          className="ml-auto text-[var(--color-danger)] hover:text-[var(--color-danger-hover)] text-xs"
                        >
                          Change
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Skill selectors (only show if less than 2 racial skills selected) */}
                {getRacialSkills().length < 2 && (
                  <select
                    value=""
                    onChange={(e) => {
                      if (e.target.value) {
                        addSkillWithSource(e.target.value, 'racial');
                        e.target.value = "";
                      }
                    }}
                    className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] text-sm focus:border-[var(--color-accent)] focus:outline-none"
                  >
                    <option value="">Choose {getRacialSkills().length === 0 ? 'first' : 'second'} skill...</option>
                    {Object.keys(SKILLS).filter(skill => !(character.skills || []).includes(skill)).map(skill => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          )}

          {/* Dragonborn Draconic Ancestry */}
          {character.race === 'Dragonborn' && (
            <div className="mb-4 p-3 bg-[var(--color-card-secondary)] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[var(--color-text-primary)] font-medium">Draconic Ancestry</h4>
                <span className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-card)] px-2 py-1 rounded">Dragonborn Trait</span>
              </div>
              <p className="text-[var(--color-text-primary)] text-sm mb-3">
                Choose one type of dragon from the Draconic Ancestry table.
              </p>
              <div className="flex gap-2">
                <select
                  value={character.subrace || ""}
                  onChange={(e) => {
                    if (e.target.value) {
                      onUpdate({ subrace: e.target.value });
                    }
                  }}
                  className="flex-1 bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] text-sm focus:border-[var(--color-accent)] focus:outline-none"
                >
                  <option value="">Choose draconic ancestry...</option>
                  <option value="Black Dragonborn">Black Dragonborn</option>
                  <option value="Blue Dragonborn">Blue Dragonborn</option>
                  <option value="Brass Dragonborn">Brass Dragonborn</option>
                  <option value="Bronze Dragonborn">Bronze Dragonborn</option>
                  <option value="Copper Dragonborn">Copper Dragonborn</option>
                  <option value="Gold Dragonborn">Gold Dragonborn</option>
                  <option value="Green Dragonborn">Green Dragonborn</option>
                  <option value="Red Dragonborn">Red Dragonborn</option>
                  <option value="Silver Dragonborn">Silver Dragonborn</option>
                  <option value="White Dragonborn">White Dragonborn</option>
                </select>
              </div>
              
              {/* Display selected draconic ancestry effects - only if there's content to show */}
              {character.subrace && (() => {
                const hasBreathWeapon = character.subrace.includes('Black') || character.subrace.includes('Copper') || 
                                       character.subrace.includes('Blue') || character.subrace.includes('Bronze') || 
                                       character.subrace.includes('Brass') || character.subrace.includes('Gold') || 
                                       character.subrace.includes('Red') || character.subrace.includes('Green') || 
                                       character.subrace.includes('Silver') || character.subrace.includes('White');
                
                if (!hasBreathWeapon) return null;
                
                return (
                  <div className="mt-3 p-3 bg-[var(--color-card-secondary)] rounded-lg">
                    <div className="text-[var(--color-text-primary)] text-sm space-y-1">
                      <div className="font-medium text-[var(--color-text-primary)]">{character.subrace}</div>
                      {character.subrace.includes('Black') || character.subrace.includes('Copper') ? (
                        <div>• Breath Weapon: 5 by 30 ft. line (Dex save) - Acid damage</div>
                      ) : character.subrace.includes('Blue') || character.subrace.includes('Bronze') ? (
                        <div>• Breath Weapon: 5 by 30 ft. line (Dex save) - Lightning damage</div>
                      ) : character.subrace.includes('Brass') || character.subrace.includes('Gold') || character.subrace.includes('Red') ? (
                        <div>• Breath Weapon: 15 ft. cone (Dex save) - Fire damage</div>
                      ) : character.subrace.includes('Green') ? (
                        <div>• Breath Weapon: 15 ft. cone (Con save) - Poison damage</div>
                      ) : character.subrace.includes('Silver') || character.subrace.includes('White') ? (
                        <div>• Breath Weapon: 15 ft. cone (Con save) - Cold damage</div>
                      ) : null}
                      
                      {character.subrace.includes('Black') || character.subrace.includes('Copper') ? (
                        <div>• Damage Resistance: Acid</div>
                      ) : character.subrace.includes('Blue') || character.subrace.includes('Bronze') ? (
                        <div>• Damage Resistance: Lightning</div>
                      ) : character.subrace.includes('Brass') || character.subrace.includes('Gold') || character.subrace.includes('Red') ? (
                        <div>• Damage Resistance: Fire</div>
                      ) : character.subrace.includes('Green') ? (
                        <div>• Damage Resistance: Poison</div>
                      ) : character.subrace.includes('Silver') || character.subrace.includes('White') ? (
                        <div>• Damage Resistance: Cold</div>
                      ) : null}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* No racial choices available */}
          {!['Human', 'Half-Elf', 'Dragonborn'].includes(character.race) && (
            <div className="text-[var(--color-text-secondary)] text-sm italic">
              No racial choices available for {character.race}.
            </div>
          )}
        </div>

                  {/* Skill Proficiencies Display */}
          <div className="bg-[var(--color-card)] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[var(--color-success)]" />
            Skill Proficiencies
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Background Skills */}
            <div>
              <div className="text-[var(--color-text-secondary)] text-sm mb-2">Background Skills</div>
              <div className="space-y-1">
                {backgroundData?.skillProficiencies?.map((skill, index) => (
                  <div key={index} className="text-[var(--color-text-primary)] text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--color-success)] rounded-full"></span>
                    {skill}
                  </div>
                )) || (
                  <div className="text-[var(--color-text-muted)] text-sm">No background skills</div>
                )}
              </div>
            </div>

            {/* Class Skills */}
            <div>
              <div className="text-[var(--color-text-secondary)] text-sm mb-2">Class Skills</div>
              <div className="space-y-1">
                {getClassSkills().length > 0 ? (
                  getClassSkills().map((skill, index) => (
                    <div key={index} className="text-[var(--color-text-primary)] text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full"></span>
                      {skill}
                    </div>
                  ))
                ) : (
                  <div className="text-[var(--color-text-muted)] text-sm">No class skills selected</div>
                )}
              </div>
            </div>

            {/* Racial Skills */}
            <div>
              <div className="text-[var(--color-text-secondary)] text-sm mb-2">Racial Skills</div>
              <div className="space-y-1">
                {getRacialSkills().length > 0 ? (
                  getRacialSkills().map((skill, index) => (
                    <div key={index} className="text-[var(--color-text-primary)] text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--color-card-tertiary)] rounded-full"></span>
                      {skill}
                    </div>
                  ))
                ) : (
                  <div className="text-[var(--color-text-muted)] text-sm">No racial skills selected</div>
                )}
              </div>
            </div>

            {/* Other Skills */}
            <div>
              <div className="text-[var(--color-text-secondary)] text-sm mb-2">Other Skills</div>
              <div className="space-y-1">
                {(character.skills || []).filter(skill => {
                  const skillSources = character.skillSources || {};
                  return !skillSources[skill] || skillSources[skill] === 'other';
                }).length > 0 ? (
                  (character.skills || []).filter(skill => {
                    const skillSources = character.skillSources || {};
                    return !skillSources[skill] || skillSources[skill] === 'other';
                  }).map((skill, index) => (
                    <div key={index} className="text-[var(--color-text-primary)] text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--color-warning)] rounded-full"></span>
                      {skill}
                    </div>
                  ))
                ) : (
                  <div className="text-[var(--color-text-muted)] text-sm">No other skills</div>
                )}
              </div>
            </div>
          </div>

          {/* Total Skills Summary */}
          <div className="mt-4 pt-3 border-t border-[var(--color-border)]">
            <div className="text-[var(--color-text-secondary)] text-sm mb-2">Total Skill Proficiencies</div>
            <div className="text-[var(--color-text-primary)] font-medium">
              {((backgroundData?.skillProficiencies?.length || 0) + (character.skills?.length || 0))} skills
            </div>
          </div>
        </div>

        

        {/* Languages Section - Compact Design */}
        <div className="bg-[var(--color-card)] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
            <Languages className="h-5 w-5 text-[var(--color-accent)]" />
            Languages Known
          </h3>
          
          {/* Language Requirements Tooltip */}
          {languageRequirements && languageRequirements.length > 0 && languageRequirements.some(req => req.remaining > 0) && (
            <div className="mb-4 p-3 rounded-lg border" style={{
              backgroundColor: 'var(--color-surface-secondary)',
              borderColor: 'var(--color-warning)',
              border: '1px solid var(--color-warning)'
            }}>
              <div className="flex items-center gap-2" style={{ color: 'var(--color-warning)' }}>
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Language Requirements
                </span>
              </div>
              <div className="text-sm mt-1 space-y-1" style={{ color: 'var(--color-text-secondary)' }}>
                {languageRequirements.filter(req => req.remaining > 0).map((req, index) => (
                  <p key={index}>
                    <strong>{req.source}</strong>: {req.description}. 
                    You have selected {req.current} of {req.required}.
                  </p>
                ))}
              </div>
              <p className="text-xs mt-2" style={{ color: 'var(--color-warning)' }}>
                You need to select {languageRequirements.reduce((total, req) => total + req.remaining, 0)} more language{languageRequirements.reduce((total, req) => total + req.remaining, 0) !== 1 ? 's' : ''} below.
              </p>
            </div>
          )}
          
          {/* Language Requirements Met */}
          {languageRequirements && languageRequirements.length > 0 && languageRequirements.every(req => req.remaining === 0) && (
            <div className="mb-4 p-3 rounded-lg border" style={{
              backgroundColor: 'var(--color-surface-secondary)',
              borderColor: 'var(--color-success)',
              border: '1px solid var(--color-success)'
            }}>
              <div className="flex items-center gap-2" style={{ color: 'var(--color-success)' }}>
                <Info className="h-4 w-4" />
                <span className="text-sm font-medium">
                  All Language Requirements Met
                </span>
              </div>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                All language requirements have been satisfied:
              </p>
              <div className="text-sm mt-1 space-y-1" style={{ color: 'var(--color-text-secondary)' }}>
                {languageRequirements.map((req, index) => (
                  <p key={index}>
                    <strong>{req.source}</strong>: {req.description} ✓
                  </p>
                ))}
              </div>
            </div>
          )}
          
          {/* Add Language Controls */}
          <div className="flex gap-2 mb-4">
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) {
                  // Determine which requirement this language should satisfy
                  const languageRequirements = getLanguageRequirements();
                  const unmetRequirements = languageRequirements.filter(req => req.remaining > 0);
                  
                  if (unmetRequirements.length > 0) {
                    // If there are unmet requirements, assign to the first one
                    const source = unmetRequirements[0].type as 'background' | 'racial';
                    addLanguageWithSource(e.target.value, source);
                  } else {
                    // If all requirements are met, assign as 'other'
                    addLanguageWithSource(e.target.value, 'other');
                  }
                  e.target.value = ""; // Reset selection
                }
              }}
              className="flex-1 bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] text-sm focus:border-[var(--color-accent)] focus:outline-none"
              disabled={isLoadingLanguages}
            >
              <option value="">{isLoadingLanguages ? "Loading languages..." : "Add a language..."}</option>
              {languages
                .filter(lang => {
                  const learnedLanguages = character.languages || [];
                  return !learnedLanguages.includes(lang.name);
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
            <div className="text-sm text-[var(--color-text-secondary)] mb-2">Known languages:</div>
            <div className="flex flex-wrap gap-2">
              {/* Racial Languages */}
              {getRacialLanguages(character.race).map(lang => {
                const styling = getLanguageStyling(lang, true, false, languages);
                const language = languages.find(l => l.name === lang);
                return (
                  <span 
                    key={`racial-${lang}`} 
                    className={`${styling.bg} ${styling.text} px-3 py-1 rounded-full text-sm border ${styling.border} flex items-center gap-2 group relative`}
                    title={language?.description ? `${lang}: ${language.description}` : lang}
                  >
                  {lang}
                  <span className="text-xs opacity-75">(Racial)</span>
                    {language?.description && (
                      <Info className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                    )}
                </span>
                  );
              })}
              
              {/* Class-Granted Languages */}
              {getClassLanguages(character.class).map(lang => {
                const styling = getLanguageStyling(lang, false, true, languages);
                const language = languages.find(l => l.name === lang);
                return (
                  <span 
                    key={`class-${lang}`} 
                    className={`${styling.bg} ${styling.text} px-3 py-1 rounded-full text-sm border ${styling.border} flex items-center gap-2 group relative`}
                    title={language?.description ? `${lang}: ${language.description}` : lang}
                  >
                    {lang}
                    <span className="text-xs opacity-75">(Class)</span>
                    {language?.description && (
                      <Info className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                    )}
                  </span>
                  );
              })}
              
              {/* Learned Languages - Only show languages not already granted by race or class */}
              {(character.languages || []).filter(lang => {
                const racialLanguages = getRacialLanguages(character.race);
                const classLanguages = getClassLanguages(character.class);
                return !racialLanguages.includes(lang) && !classLanguages.includes(lang);
              }).map(lang => {
                const styling = getLanguageStyling(lang, false, false, languages);
                const language = languages.find(l => l.name === lang);
                const languageSources = character.languageSources || {};
                const source = languageSources[lang];
                const sourceLabels = {
                  'background': 'Background',
                  'racial': 'Racial',
                  'class': 'Class',
                  'feat': 'Feat',
                  'other': 'Other'
                };
                return (
                  <span 
                    key={`learned-${lang}`} 
                    className={`${styling.bg} ${styling.text} px-3 py-1 rounded-full text-sm border ${styling.border} flex items-center gap-2 group relative`}
                    title={language?.description ? `${lang}: ${language.description}` : lang}
                  >
                  {lang}
                  <span className="text-xs opacity-75">({sourceLabels[source] || 'Other'})</span>
                    {language?.description && (
                      <Info className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                    )}
                  <button
                    onClick={() => {
                      removeLanguageWithSource(lang);
                    }}
                      className={`${styling.hover} ml-1 text-xs font-bold transition-colors`}
                    title="Remove language"
                  >
                    ×
                  </button>
                </span>
                  );
              })}
            </div>
            
            {/* Empty state */}
            {getAutomaticLanguages(character.race, character.class).length === 0 && (!character.languages || character.languages.length === 0) && (
              <div className="text-[var(--color-text-muted)] text-sm italic">No languages known</div>
            )}
          </div>
        </div>

        {/* Background Summary with Edit Button */}
        <div className="bg-[var(--color-card)] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[var(--color-accent)]" />
              Background & Traits
            </h3>
            <button
              onClick={() => setShowBackgroundModal(true)}
              className="bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Edit3 className="h-4 w-4" />
              Edit Background
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-[var(--color-text-secondary)] text-sm mb-1">Background</div>
              <div className="text-[var(--color-text-primary)] font-medium">{character.background || 'No background selected'}</div>
              {languageRequirements && languageRequirements.length > 0 && languageRequirements.some(req => req.remaining > 0) && (
                <div className="mt-2 text-xs space-y-1">
                  {languageRequirements.filter(req => req.remaining > 0).map((req, index) => (
                    <div key={index}>
                      <span className="text-[var(--color-warning)] flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {req.type === 'background' ? 'Background' : 'Racial'} language: {req.remaining} needed
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {character.backgroundCharacteristics && (
              <>
                <div>
                  <div className="text-[var(--color-text-secondary)] text-sm mb-1">Personality Traits</div>
                  <div className="text-[var(--color-text-primary)] text-sm space-y-1">
                    {((character.backgroundCharacteristics?.personalityTraits ?? []).length > 0) 
                      ? (character.backgroundCharacteristics?.personalityTraits ?? []).map((trait, index) => (
                          <div key={index}>• {trait}</div>
                        ))
                      : <div className="text-[var(--color-text-muted)]">None selected</div>
                    }
                  </div>
                </div>
                <div>
                  <div className="text-[var(--color-text-secondary)] text-sm mb-1">Ideals</div>
                  <div className="text-[var(--color-text-primary)] text-sm space-y-1">
                    {((character.backgroundCharacteristics?.ideals ?? []).length > 0) 
                      ? (character.backgroundCharacteristics?.ideals ?? []).map((ideal, index) => (
                          <div key={index}>• {ideal}</div>
                        ))
                      : <div className="text-[var(--color-text-muted)]">None selected</div>
                    }
                  </div>
                </div>
                <div>
                  <div className="text-[var(--color-text-secondary)] text-sm mb-1">Bonds</div>
                  <div className="text-[var(--color-text-primary)] text-sm space-y-1">
                    {((character.backgroundCharacteristics?.bonds ?? []).length > 0) 
                      ? (character.backgroundCharacteristics?.bonds ?? []).map((bond, index) => (
                          <div key={index}>• {bond}</div>
                        ))
                      : <div className="text-[var(--color-text-muted)]">None selected</div>
                    }
                  </div>
                </div>
                <div>
                  <div className="text-[var(--color-text-secondary)] text-sm mb-1">Flaws</div>
                  <div className="text-[var(--color-text-primary)] text-sm space-y-1">
                    {((character.backgroundCharacteristics?.flaws ?? []).length > 0) 
                      ? (character.backgroundCharacteristics?.flaws ?? []).map((flaw, index) => (
                          <div key={index}>• {flaw}</div>
                        ))
                      : <div className="text-[var(--color-text-muted)]">None selected</div>
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
            {/* Avatar Section - Only show if there's an avatar */}
            {(avatarUrl || character.avatar) && (
              <div className="bg-[var(--color-card)] rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                    <Edit3 className="h-5 w-5 text-[var(--color-accent)]" />
                    Character Portrait
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Current Avatar Display */}
                  <div className="space-y-3">
                    <Image 
                      src={avatarUrl || character.avatar || '/default-avatar.png'} 
                      alt={`${character.name}'s full body portrait`}
                      width={192}
                      height={336}
                      className="w-48 h-84 mx-auto rounded-lg object-contain bg-[var(--color-background)] border border-[var(--color-border)]"
                    />
                    <div className="text-center">
                      <button
                        onClick={() => {
                          deleteAvatar.mutate(character.id);
                        }}
                        className="text-[var(--color-danger)] hover:text-[var(--color-danger-hover)] text-sm transition-colors"
                      >
                        Remove Avatar
                      </button>
                    </div>
                  </div>

                  {/* AI Provider Credit */}
                  <div className="text-xs text-[var(--color-text-muted)] text-center">
                    <p>🤖 AI avatars by <span className="text-[var(--color-text-secondary)]">Replicate Flux.schnell</span></p>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Section - Inline editing with avatar generation */}
            <div className="bg-[var(--color-card)] rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[var(--color-accent)]" />
                  Physical Description
                  <div className="relative flex items-center gap-2">
                    <button
                      onClick={() => toggleTooltip('appearance-hint')}
                      className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                      data-tooltip
                    >
                      <HelpCircle className="h-4 w-4" />
                    </button>
                    {activeTooltip === 'appearance-hint' && (
                      <div className="absolute z-50 top-full left-0 mt-2 p-3 bg-[var(--color-card-secondary)] rounded text-sm text-[var(--color-text-primary)] border border-[var(--color-border)] w-80 shadow-lg whitespace-normal" data-tooltip>
                        We already know your race and class. Focus on distinctive features, scars, clothing style, or unique characteristics that make your character special.
                      </div>
                    )}
                  </div>
                </h3>
                {isEditing === 'appearance' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSave('appearance')}
                      className="flex items-center gap-1 text-[var(--color-success)] hover:text-[var(--color-success-hover)] transition-colors text-sm"
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-1 text-[var(--color-danger)] hover:text-[var(--color-danger-hover)] transition-colors text-sm"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleStartEdit('appearance')}
                    className="flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm"
                  >
                    <Edit3 className="h-4 w-4" />
                    {character.appearance ? 'Edit' : 'Add'}
                  </button>
                )}
              </div>

              {isEditing === 'appearance' ? (
                <div className="space-y-3">
                  <textarea
                    value={editValues.appearance}
                    onChange={(e) => handleFieldChange('appearance', e.target.value)}
                    placeholder="Describe your character's distinctive features, scars, clothing style, or unique characteristics that make them special."
                    className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none resize-vertical"
                    rows={6}
                  />
                  <div className="flex justify-end">
                    {getCharacterCountDisplay('appearance')}
                  </div>
                </div>
              ) : (
                <div className="min-h-[120px] rounded-lg p-3 border border-[var(--color-border)]">
                  {character.appearance ? (
                    <p className="text-[var(--color-text-primary)] leading-relaxed whitespace-pre-wrap">{character.appearance}</p>
                  ) : (
                    <p className="text-[var(--color-text-muted)] italic">Describe your character&apos;s distinctive features, scars, clothing style, or unique characteristics.</p>
                  )}
                </div>
              )}

              {/* Avatar Generation - Always visible in Physical Description section */}
              <div className="border-t border-[var(--color-border)] pt-4 mt-4">
                <h4 className="text-[var(--color-text-primary)] font-medium mb-3">Generate AI Avatar</h4>
                <p className="text-[var(--color-text-secondary)] text-sm mb-3">
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
                  onAvatarGenerated={async (avatarDataUrl, fullBodyDataUrl) => {
                    // Get the image URL from Replicate
                    const imageUrl = fullBodyDataUrl || avatarDataUrl;
                    if (!imageUrl) return;
                    
                    try {
                      // Fetch the image from Replicate and convert to base64
                      const response = await fetch(imageUrl);
                      const blob = await response.blob();
                      const reader = new FileReader();
                      
                      reader.onloadend = async () => {
                        const base64Data = reader.result as string;
                        
                        // Use the mutation to save avatar and invalidate cache
                        updateAvatar.mutate({
                          characterId: character.id,
                          imageData: base64Data
                        });
                      };
                      
                      reader.readAsDataURL(blob);
                    } catch (error) {
                      console.error('Error processing avatar image:', error);
                    }
                  }}
                  disabled={updateAvatar.isPending}
                  className="w-full"
                />

                {/* AI Provider Credit */}
                <div className="text-xs text-[var(--color-text-muted)] text-center mt-3">
                  <p>🤖 AI avatars by <span className="text-[var(--color-text-secondary)]">Replicate Flux.schnell</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Notes */}
          <div>
            {renderEditableSection(
              "Notes",
              "notes",
              "Any additional notes, campaign information, character development, or other details.",
              <Edit3 className="h-5 w-5 text-[var(--color-accent)]" />
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