"use client";

import { User, X, Shield, Heart, BarChart3 } from "lucide-react";
import { useState, useMemo } from "react";
import { getModifier } from "@/lib/dnd/core";
import { useAvatar } from "@/hooks/use-character-mutations";
import Image from 'next/image';
import { Character } from "@/types/character";

interface ReadOnlyCharacterSheetProps {
  character: Character;
  onClose: () => void;
  isDM?: boolean;
}

export function ReadOnlyCharacterSheet({ character, onClose }: ReadOnlyCharacterSheetProps) {
  const { data: avatarUrl } = useAvatar(character.id);
  const [activeTab, setActiveTab] = useState<"stats" | "actions" | "gear" | "inventory" | "background">("stats");

  // Calculate stats
  const stats = useMemo(() => ({
    strength: character.strength,
    dexterity: character.dexterity,
    constitution: character.constitution,
    intelligence: character.intelligence,
    wisdom: character.wisdom,
    charisma: character.charisma,
  }), [character]);

  // Format class information
  const formatClassInfo = () => {
    if (character.classes && Array.isArray(character.classes) && character.classes.length > 0) {
      return character.classes.map(cls => `${cls.class} ${cls.level}`).join(', ');
    }
    return `${character.class} ${character.level}`;
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center p-4 pt-8 z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
      <div className="bg-[var(--color-card)] rounded-lg w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Avatar */}
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
              ) : (
                <User className="h-6 w-6 sm:h-7 sm:w-7 text-[var(--color-accent)] flex-shrink-0" />
              )}
              
              {/* Character info */}
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>
                  {character.name}
                </h2>
                <p className="text-sm sm:text-base truncate" style={{ color: 'var(--color-text-secondary)' }}>
                  {character.subrace || character.race} • {formatClassInfo()}
                </p>
                {character.background && (
                  <p className="text-xs sm:text-sm truncate" style={{ color: 'var(--color-text-muted)' }}>
                    {character.background}
                  </p>
                )}
              </div>
            </div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-[var(--color-card-secondary)] rounded-lg transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[var(--color-border)]">
          {[
            { id: "stats", label: "Stats", icon: BarChart3 },
            { id: "actions", label: "Actions", icon: Shield },
            { id: "gear", label: "Gear", icon: Shield },
            { id: "inventory", label: "Inventory", icon: Shield },
            { id: "background", label: "Background", icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                                 onClick={() => setActiveTab(tab.id as "stats" | "actions" | "gear" | "inventory" | "background")}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "stats" && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                  <Heart className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                  <div>
                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Hit Points</div>
                    <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {character.hitPoints}/{character.maxHitPoints}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                  <Shield className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                  <div>
                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Armor Class</div>
                    <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{character.armorClass}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                  <BarChart3 className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                  <div>
                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Speed</div>
                    <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{character.speed} ft</div>
                  </div>
                </div>
              </div>

              {/* Ability Scores */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                  Ability Scores
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Object.entries(stats).map(([ability, score]) => (
                    <div
                      key={ability}
                      className="p-3 rounded-lg text-center"
                      style={{ backgroundColor: 'var(--color-card-secondary)' }}
                    >
                      <div className="text-sm font-medium capitalize" style={{ color: 'var(--color-text-secondary)' }}>
                        {ability}
                      </div>
                      <div className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                        {score}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        {getModifier(score) >= 0 ? '+' : ''}{getModifier(score)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              {character.skills && character.skills.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    Skills
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {character.skills.map((skill) => (
                      <div
                        key={skill}
                        className="px-3 py-2 rounded text-sm"
                        style={{ backgroundColor: 'var(--color-card-secondary)', color: 'var(--color-text-primary)' }}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}


            </div>
          )}

          {activeTab === "actions" && (
            <div className="text-center py-8">
              <p className="text-[var(--color-text-secondary)]">
                Actions view coming soon...
              </p>
            </div>
          )}

          {activeTab === "gear" && (
            <div className="text-center py-8">
              <p className="text-[var(--color-text-secondary)]">
                Gear view coming soon...
              </p>
            </div>
          )}

          {activeTab === "inventory" && (
            <div className="text-center py-8">
              <p className="text-[var(--color-text-secondary)]">
                Inventory view coming soon...
              </p>
            </div>
          )}

          {activeTab === "background" && (
            <div className="space-y-6">
              {character.appearance && (
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    Appearance
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">{character.appearance}</p>
                </div>
              )}

              {character.personality && (
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    Personality
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">{character.personality}</p>
                </div>
              )}

              {character.backstory && (
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    Backstory
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">{character.backstory}</p>
                </div>
              )}

              {!character.appearance && !character.personality && !character.backstory && (
                <div className="text-center py-8">
                  <p className="text-[var(--color-text-secondary)]">
                    No background information available.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 