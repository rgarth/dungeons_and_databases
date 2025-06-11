"use client";

import { useState } from "react";
import { Palette, Download, RefreshCw } from "lucide-react";
import type { CharacterAvatarData } from "@/app/api/generate-avatar/route";

interface AvatarGeneratorProps {
  characterData: CharacterAvatarData;
  onAvatarGenerated?: (avatarDataUrl: string) => void;
  disabled?: boolean;
  className?: string;
}

interface GenerationResult {
  success: boolean;
  fullBodyImage?: string;
  avatarImage?: string;
  prompt?: string;
  error?: string;
}

export function AvatarGenerator({ 
  characterData, 
  onAvatarGenerated, 
  disabled = false,
  className = ""
}: AvatarGeneratorProps) {
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [showFullPrompt, setShowFullPrompt] = useState(false);

  const generateAvatar = async () => {
    if (!characterData.race || !characterData.class) {
      alert('Race and class are required for avatar generation.');
      return;
    }

    setGenerating(true);
    setResult(null);

    try {
      console.log('🎨 Generating avatar for character:', characterData);

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
        
        if (data.success && data.avatarImage && onAvatarGenerated) {
          // If the avatar and full body are the same, crop client-side
          let finalAvatar = data.avatarImage;
          if (data.avatarImage === data.fullBodyImage) {
            console.log('🖼️ Server returned uncropped image, cropping client-side...');
            finalAvatar = await cropImageClientSide(data.avatarImage);
          }
          onAvatarGenerated(finalAvatar);
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

  const downloadImage = () => {
    if (!result?.fullBodyImage) return;

    // Create download link
    const link = document.createElement('a');
    link.href = result.fullBodyImage;
    link.download = `${characterData.race}_${characterData.class}_avatar.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cropImageClientSide = async (imageDataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas for cropping
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          resolve(imageDataUrl); // Return original if can't get context
          return;
        }
        
        // Set canvas to square (192x192)
        canvas.width = 192;
        canvas.height = 192;
        
        // Draw the top portion of the image (preserving the head)
        // Source: take top 192x192 from original 192x256 image
        ctx.drawImage(img, 0, 0, 192, 192, 0, 0, 192, 192);
        
        // Convert to data URL
        const croppedDataUrl = canvas.toDataURL('image/png');
        resolve(croppedDataUrl);
      };
      
      img.onerror = () => {
        resolve(imageDataUrl); // Return original if image load fails
      };
      
      img.src = imageDataUrl;
    });
  };

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
            This may take 10-30 seconds. Using character data: {characterData.race} {characterData.class}
            {characterData.gender && ` (${characterData.gender})`}
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

      {/* Success Display */}
      {result && result.success && (
        <div className="space-y-3">
          <div className="p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
            <p className="text-green-300 text-sm font-medium">✨ Avatar Generated Successfully!</p>
            <p className="text-green-400 text-xs mt-1">
              Your personalized {characterData.race} {characterData.class} avatar is ready.
            </p>
          </div>

          {/* Avatar Preview */}
          {result.avatarImage && (
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <img
                  src={result.avatarImage}
                  alt={`${characterData.race} ${characterData.class} avatar`}
                  className="w-32 h-32 object-cover rounded-lg border-2 border-purple-500"
                />
              </div>
              
              <div className="space-y-2 flex-1 min-w-0">
                <h4 className="text-white font-medium">Your Avatar</h4>
                <p className="text-slate-400 text-sm">
                  Generated based on: {characterData.race} {characterData.class}
                  {characterData.gender && ` • ${characterData.gender}`}
                  {characterData.alignment && ` • ${characterData.alignment}`}
                </p>
                
                {/* Equipment Info */}
                {(characterData.equippedArmor?.length || characterData.equippedWeapons?.length) && (
                  <div className="text-slate-400 text-xs">
                    <span className="text-slate-500">Equipment: </span>
                    {characterData.equippedArmor?.join(', ')}
                    {characterData.equippedArmor?.length && characterData.equippedWeapons?.length && ', '}
                    {characterData.equippedWeapons?.join(', ')}
                  </div>
                )}

                {/* Personality Info */}
                {characterData.personalityTraits?.length && (
                  <div className="text-slate-400 text-xs">
                    <span className="text-slate-500">Traits: </span>
                    {characterData.personalityTraits[0]}
                    {characterData.personalityTraits.length > 1 && ` (+${characterData.personalityTraits.length - 1} more)`}
                  </div>
                )}
                
                <button
                  onClick={downloadImage}
                  className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-colors"
                >
                  <Download className="h-3 w-3" />
                  Download Full Image
                </button>
              </div>
            </div>
          )}

          {/* Prompt Debug Info */}
          {result.prompt && (
            <div className="mt-3">
              <button
                onClick={() => setShowFullPrompt(!showFullPrompt)}
                className="text-slate-400 hover:text-slate-300 text-xs underline"
              >
                {showFullPrompt ? 'Hide' : 'Show'} AI Prompt (Debug)
              </button>
              {showFullPrompt && (
                <div className="mt-2 p-2 bg-slate-800 rounded text-xs text-slate-300 font-mono">
                  {result.prompt}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Usage Note */}
      <div className="text-xs text-slate-500">
        <p>🤖 Powered by Pollinations.ai • Free AI avatar generation</p>
        <p>💡 Each generation is unique and based on your character's traits</p>
      </div>
    </div>
  );
} 