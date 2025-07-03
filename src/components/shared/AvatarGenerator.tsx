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

      const response = await fetch('/api/generate-avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characterData),
      });

      if (response.ok) {
        const data: GenerationResult = await response.json();
        setResult(data);
        
        if (data.success && data.fullBodyImage && onAvatarGenerated) {
          // Server provided full body image
          
          // Use the full body image directly - CSS will handle the framing
          onAvatarGenerated(data.fullBodyImage, data.fullBodyImage);
                      // Full body image set for avatar display
        }
      } else {
        const errorData = await response.json();
        let errorMessage = errorData.error || 'Failed to generate avatar';
        
        // Provide more helpful error messages
        if (response.status === 401) {
          errorMessage = 'Please sign in to generate avatars. Your session may have expired.';
        } else if (response.status === 500) {
          errorMessage = 'Avatar generation service is temporarily unavailable. Please try again.';
        }
        
        setResult({
          success: false,
          error: errorMessage
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
        className="flex items-center gap-2 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:bg-[var(--color-card-secondary)] disabled:cursor-not-allowed text-[var(--color-button-text)] px-4 py-2 rounded-lg transition-colors"
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
        <div className="p-3 rounded-lg border" style={{
          backgroundColor: 'var(--color-surface-secondary)',
          borderColor: 'var(--color-accent)',
          border: '1px solid var(--color-accent)'
        }}>
          <p className="text-sm" style={{ color: 'var(--color-accent)' }}>
            🎨 Creating your personalized avatar using AI...
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Using Replicate Realistic Vision v5.1 for high-quality D&D character generation.
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--color-success)' }}>
            ✅ Anti-trope protection: Realistic armor, practical clothing, respectful character design
          </p>
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            Character: {characterData.race} {characterData.class} ({characterData.gender || 'Unspecified'})
          </p>
        </div>
      )}

      {/* Success Message */}
      {result && result.success && (
        <div className="p-3 rounded-lg border" style={{
          backgroundColor: 'var(--color-surface-secondary)',
          borderColor: 'var(--color-success)',
          border: '1px solid var(--color-success)'
        }}>
          <p className="text-sm" style={{ color: 'var(--color-success)' }}>
            ✅ Avatar generated successfully!
          </p>
          {result.service && (
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
              Generated using: {result.service}
            </p>
          )}
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            🛡️ Respectful fantasy design with practical armor and realistic proportions
          </p>
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            ✂️ Avatar cropped from full body image for perfect consistency
          </p>
        </div>
      )}

      {/* Error Display */}
      {result && !result.success && (
        <div className="p-3 rounded-lg border" style={{
          backgroundColor: 'var(--color-surface-secondary)',
          borderColor: 'var(--color-error)',
          border: '1px solid var(--color-error)'
        }}>
          <p className="text-sm font-medium" style={{ color: 'var(--color-error)' }}>Avatar Generation Failed</p>
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{result.error}</p>
          <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
            💡 Try again - sometimes the AI service is busy. Each generation is unique!
          </p>
        </div>
      )}

      {/* Usage Note */}
      <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
        <p>💡 Each generation is unique and based on your character&apos;s traits</p>
        <p>🎮 Uses Replicate Realistic Vision v5.1 for high-quality D&D character generation</p>
        <p>✂️ Avatar automatically cropped from full body image for perfect consistency</p>
      </div>
    </div>
  );
} 