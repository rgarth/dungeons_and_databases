"use client";

import { useState } from "react";
import { Palette, RefreshCw } from "lucide-react";
import type { CharacterAvatarData } from "@/types/character";

interface AvatarGeneratorProps {
  characterData: CharacterAvatarData;
  onAvatarGenerated?: (avatarDataUrl: string, fullBodyDataUrl?: string) => void;
  disabled?: boolean;
  className?: string;
}

interface GenerationResult {
  success: boolean;
  fullBodyImage?: string;
  avatarImage?: string;
  prompt?: string;
  error?: string;
  service?: string;
}

// Anti-bias skin tone descriptions (avoiding problematic terms)
const SKIN_TONES = [
  'warm golden', 'rich amber', 'deep mahogany', 'soft caramel', 
  'warm bronze', 'deep copper', 'rich honey', 'warm chestnut',
  'soft olive', 'warm tan', 'deep walnut', 'rich mocha'
];

// Anti-bias body type descriptions (avoiding problematic terms)
const BODY_TYPES = [
  'average build', 'slender frame', 'sturdy build', 'compact frame',
  'average stature', 'lean build', 'solid build', 'average physique'
];

// Races that need skin tone diversity
const SKIN_TONE_RACES = ['Human', 'Elf', 'Half-Elf', 'Gnome', 'Halfling', 'Goliath'];

// Utility function to get random item from array
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Utility function to generate anti-bias appearance
function generateAntiBiasAppearance(characterData: CharacterAvatarData): string {
  const { race, age } = characterData;
  let appearance = `A ${age || 'adult'}-year-old ${race.toLowerCase()} with age-appropriate features`;
  
  // Add skin tone diversity for races that need it
  if (SKIN_TONE_RACES.includes(race)) {
    const skinTone = getRandomItem(SKIN_TONES);
    appearance += `, ${skinTone} skin`;
  }
  
  // Add body type diversity for all races
  const bodyType = getRandomItem(BODY_TYPES);
  appearance += `, ${bodyType}`;
  
  return appearance;
}

// Utility function to crop full body image to create avatar
async function cropToAvatar(fullBodyImageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      // Set canvas size for square avatar
      const avatarSize = Math.min(img.width, img.height);
      canvas.width = avatarSize;
      canvas.height = avatarSize;
      
      // Calculate crop area - focus on upper portion for head/shoulders
      const cropX = (img.width - avatarSize) / 2;
      const cropY = Math.max(0, img.height * 0.05); // Start from 5% down (was 10%) for 15% more zoom
      
      // Draw the cropped portion
      ctx.drawImage(
        img,
        cropX, cropY, avatarSize, avatarSize, // Source rectangle
        0, 0, avatarSize, avatarSize // Destination rectangle
      );
      
      // Convert to data URL
      const avatarDataUrl = canvas.toDataURL('image/webp', 0.8);
      resolve(avatarDataUrl);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image for cropping'));
    };
    
    img.src = fullBodyImageUrl;
  });
}

export function AvatarGenerator({ 
  characterData, 
  onAvatarGenerated, 
  disabled = false,
  className = ""
}: AvatarGeneratorProps) {
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  // const [showFullPrompt, setShowFullPrompt] = useState(false); // Removed - no longer showing prompt debug

  const generateAvatar = async () => {
    if (!characterData.race || !characterData.class) {
      alert('Race and class are required for avatar generation.');
      return;
    }

    setGenerating(true);
    setResult(null);

    try {
      console.log('🎨 Generating avatar for character:', characterData);
      console.log('🎨 SUBRACE being sent:', characterData.subrace);
      console.log('🎨 RACE being sent:', characterData.race);

      // Apply anti-bias measures if no appearance is provided
      const enhancedCharacterData = {
        ...characterData,
        appearance: characterData.appearance || generateAntiBiasAppearance(characterData)
      };

      console.log('🎨 Enhanced character data with anti-bias:', enhancedCharacterData);

      const response = await fetch('/api/generate-avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enhancedCharacterData),
      });

      if (response.ok) {
        const data: GenerationResult = await response.json();
        setResult(data);
        
        if (data.success && data.fullBodyImage && onAvatarGenerated) {
          console.log('🖼️ Server provided full body image, cropping for avatar...');
          
          try {
            // Crop the full body image to create a consistent avatar
            const avatarDataUrl = await cropToAvatar(data.fullBodyImage);
            onAvatarGenerated(avatarDataUrl, data.fullBodyImage);
            console.log('✅ Avatar cropped successfully from full body image');
          } catch (cropError) {
            console.error('❌ Cropping failed, using full body image as avatar:', cropError);
            // Fallback to using full body image as avatar
            onAvatarGenerated(data.fullBodyImage, data.fullBodyImage);
          }
        }
      } else {
        const errorData = await response.json();
        setResult({
          success: false,
          error: errorData.error || 'Failed to generate avatar'
        });
      }
    } catch (error) {
      console.error('Avatar generation error:', error);
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setGenerating(false);
    }
  };

  // Client-side cropping removed - now handled server-side with Sharp for better performance

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Generate Button */}
      <button
        onClick={generateAvatar}
        disabled={generating || disabled}
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
      >
        {generating ? (
          <RefreshCw className="h-4 w-4 animate-spin" />
        ) : (
          <Palette className="h-4 w-4" />
        )}
        {generating ? 'Generating Avatar...' : 'Generate Avatar'}
      </button>

      {/* Generation Status */}
      {generating && (
        <div className="p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
          <p className="text-blue-300 text-sm">
            🎨 Creating your personalized avatar using AI...
          </p>
          <p className="text-blue-400 text-xs mt-1">
            Using Replicate Realistic Vision v5.1 for high-quality D&D character generation.
          </p>
          <p className="text-green-400 text-xs mt-1">
            ✅ Anti-trope protection: Realistic armor, practical clothing, respectful character design
          </p>
          <p className="text-blue-400 text-xs">
            Character: {characterData.race} {characterData.class} ({characterData.gender || 'Unspecified'})
          </p>
        </div>
      )}

      {/* Success Message */}
      {result && result.success && (
        <div className="p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
          <p className="text-green-300 text-sm">
            ✅ Avatar generated successfully!
          </p>
          {result.service && (
            <p className="text-green-400 text-xs mt-1">
              Generated using: {result.service}
            </p>
          )}
          <p className="text-green-400 text-xs">
            🛡️ Respectful fantasy design with practical armor and realistic proportions
          </p>
          <p className="text-green-400 text-xs">
            ✂️ Avatar cropped from full body image for perfect consistency
          </p>
        </div>
      )}

      {/* Error Display */}
      {result && !result.success && (
        <div className="p-3 bg-red-900/20 border border-red-600/30 rounded-lg">
          <p className="text-red-300 text-sm font-medium">Avatar Generation Failed</p>
          <p className="text-red-400 text-xs mt-1">{result.error}</p>
          <p className="text-red-400 text-xs mt-2">
            💡 Try again - sometimes the AI service is busy. Each generation is unique!
          </p>
        </div>
      )}

      {/* Usage Note */}
      <div className="text-xs text-slate-500">
        <p>💡 Each generation is unique and based on your character&apos;s traits</p>
        <p>🎮 Uses Replicate Realistic Vision v5.1 for high-quality D&D character generation</p>
        <p>✂️ Avatar automatically cropped from full body image for perfect consistency</p>
      </div>
    </div>
  );
} 