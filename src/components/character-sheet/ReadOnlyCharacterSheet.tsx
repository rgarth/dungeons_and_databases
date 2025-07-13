import React from 'react';
import { Character } from '@/types/character';
import { Card } from '@/components/ui';
import { useAvatar } from '@/hooks/use-character-mutations';
import Image from 'next/image';
import { getProficiencyBonus } from '@/lib/dnd/core';

interface ReadOnlyCharacterSheetProps {
  character: Character;
  isDM?: boolean; // If true, show full details. If false, show limited details for other players
  onClose: () => void;
}

export default function ReadOnlyCharacterSheet({ 
  character, 
  isDM = false, 
  onClose 
}: ReadOnlyCharacterSheetProps) {
  const showFullDetails = isDM;
  const { data: avatarUrl } = useAvatar(character.id);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
      <Card className="w-full max-w-4xl mx-4 h-[90vh] flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              {avatarUrl ? (
                <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image 
                    src={avatarUrl} 
                    alt={`${character.name}'s avatar`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover object-top scale-150 translate-y-1/4"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                  <span className="text-2xl">👤</span>
                </div>
              )}
              
              <div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                  {character.name}
                </h2>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <span>{character.race}</span>
                  {character.subrace && <span>({character.subrace})</span>}
                  <span>•</span>
                  <span>{character.class}</span>
                  <span>•</span>
                  <span>Level {character.level}</span>
                  {showFullDetails && (
                    <>
                      <span>•</span>
                      <span>{character.background}</span>
                      <span>•</span>
                      <span>{character.alignment}</span>
                    </>
                  )}
                </div>
                {!showFullDetails && (
                  <div className="mt-2 p-2 rounded text-sm" style={{ backgroundColor: 'var(--color-info-bg)', color: 'var(--color-info)' }}>
                    <strong>Read-only view:</strong> You can view this character&apos;s basic information.
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors p-2 rounded hover:bg-[var(--color-card-secondary)]"
            >
              ✕
            </button>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Core Stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                Core Stats
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Hit Points</div>
                  <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{character.hitPoints}/{character.maxHitPoints}</div>
                </div>
                <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Armor Class</div>
                  <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{character.armorClass}</div>
                </div>
                <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Speed</div>
                  <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{character.speed} ft.</div>
                </div>
                <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Proficiency Bonus</div>
                  <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>+{getProficiencyBonus(character.level)}</div>
                </div>
              </div>
            </div>

            {/* Ability Scores */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                Ability Scores
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'STR', value: character.strength },
                  { name: 'DEX', value: character.dexterity },
                  { name: 'CON', value: character.constitution },
                  { name: 'INT', value: character.intelligence },
                  { name: 'WIS', value: character.wisdom },
                  { name: 'CHA', value: character.charisma },
                ].map((ability) => (
                  <div key={ability.name} className="p-3 rounded text-center" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{ability.name}</div>
                    <div className="font-medium text-lg" style={{ color: 'var(--color-text-primary)' }}>{ability.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Character Details */}
            {showFullDetails && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  Details
                </h3>
                <div className="space-y-3">
                  <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Background</div>
                    <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{character.background}</div>
                  </div>
                  <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Alignment</div>
                    <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{character.alignment}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Equipment and Combat */}
          {showFullDetails && (
            <>
              {/* Weapons */}
              {character.weapons && character.weapons.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    Weapons
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {character.weapons.map((weapon, index) => (
                      <div key={index} className="p-3 rounded border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card-secondary)' }}>
                        <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{weapon.name}</div>
                        <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                          {weapon.damage} {weapon.damageType}
                        </div>
                        {weapon.properties && weapon.properties.length > 0 && (
                          <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                            {weapon.properties.join(', ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Armor */}
              {character.armor && character.armor.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    Armor
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {character.armor.map((armor, index) => (
                      <div key={index} className="p-3 rounded border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card-secondary)' }}>
                        <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{armor.name}</div>
                        <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                          AC {armor.baseAC}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Money */}
              {((character.copperPieces && character.copperPieces > 0) || 
                (character.silverPieces && character.silverPieces > 0) || 
                (character.goldPieces && character.goldPieces > 0)) && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    Money
                  </h3>
                  <div className="flex gap-4">
                    {character.copperPieces && character.copperPieces > 0 && (
                      <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                        <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Copper</div>
                        <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{character.copperPieces} cp</div>
                      </div>
                    )}
                    {character.silverPieces && character.silverPieces > 0 && (
                      <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                        <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Silver</div>
                        <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{character.silverPieces} sp</div>
                      </div>
                    )}
                    {character.goldPieces && character.goldPieces > 0 && (
                      <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                        <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Gold</div>
                        <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{character.goldPieces} gp</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Character Background */}
              {(character.personality || character.backstory || character.appearance) && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    Character Background
                  </h3>
                  <div className="space-y-4">
                    {character.appearance && (
                      <div>
                        <div className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                          Appearance
                        </div>
                        <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                          <div style={{ color: 'var(--color-text-primary)' }}>{character.appearance}</div>
                        </div>
                      </div>
                    )}
                    {character.personality && (
                      <div>
                        <div className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                          Personality
                        </div>
                        <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                          <div style={{ color: 'var(--color-text-primary)' }}>{character.personality}</div>
                        </div>
                      </div>
                    )}
                    {character.backstory && (
                      <div>
                        <div className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                          Backstory
                        </div>
                        <div className="p-3 rounded" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
                          <div style={{ color: 'var(--color-text-primary)' }}>{character.backstory}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
} 