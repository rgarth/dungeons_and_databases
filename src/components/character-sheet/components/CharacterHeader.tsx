"use client";

import { User } from "lucide-react";
import Image from 'next/image';
import { ClassLevel } from "@/lib/dnd/progression";

interface CharacterHeaderProps {
  character: {
    id: string;
    name: string;
    race: string;
    class: string;
    subclass?: string;
    level: number;
    classes?: ClassLevel[];
    totalLevel?: number;
    background?: string;
    avatar?: string | null;
    subrace?: string;
  };
  onLevelUp: () => void;
  onClose: () => void;
}

export function CharacterHeader({ character, onLevelUp, onClose }: CharacterHeaderProps) {
  const avatarUrl = character.avatar;

  return (
    <div className="p-4 border-b border-[var(--color-border)]">
      {/* Main header row */}
      <div className="flex items-center justify-between">
        {/* Avatar and basic info - always visible */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Avatar or default icon */}
          {avatarUrl ? (
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image 
                src={avatarUrl} 
                alt={`${character.name}'s avatar`}
                width={96}
                height={96}
                className="w-full h-full object-cover object-top scale-150 translate-y-1/4"
              />
            </div>
          ) : null}
          <User className={`h-6 w-6 sm:h-7 sm:w-7 text-[var(--color-accent)] flex-shrink-0 ${avatarUrl ? 'hidden' : ''}`} />
          
          {/* Character info */}
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] truncate">{character.name}</h1>
            <p className="text-[var(--color-text-secondary)] text-sm sm:text-base truncate">
              {(() => {
                // Format class information for multiclass support
                let classText = character.class;
                let levelText = `Level ${character.level}`;
                
                if (character.classes) {
                  let classes: ClassLevel[] = [];
                  
                  if (Array.isArray(character.classes)) {
                    classes = character.classes;
                  } else if (typeof character.classes === 'string') {
                    try {
                      classes = JSON.parse(character.classes);
                    } catch (e) {
                      console.warn('Failed to parse classes JSON:', e);
                    }
                  }
                  
                  if (classes.length > 0) {
                    classText = classes.map(cls => `${cls.class} ${cls.level}`).join(', ');
                    const totalLevel = character.totalLevel || classes.reduce((sum, cls) => sum + cls.level, 0);
                    levelText = `Level ${totalLevel}`;
                  }
                }
                
                return `${levelText} ${character.subrace || character.race} ${classText}`;
              })()}
              {character.background && (
                <span className="hidden sm:inline"> • {character.background}</span>
              )}
            </p>
          </div>
        </div>

        {/* Actions - Desktop: buttons, Mobile: hamburger menu */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Level Up button */}
          <button
            onClick={onLevelUp}
            className="flex items-center gap-2 px-3 py-2 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] rounded-lg transition-colors text-sm"
            title="Level Up"
          >
            <span>Level Up</span>
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
            style={{ color: 'var(--color-text-secondary)', '--tw-hover-color': 'var(--color-text-primary)' } as React.CSSProperties}
            title="Close"
          >
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
} 