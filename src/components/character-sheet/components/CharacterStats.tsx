"use client";

import { getModifier } from "@/lib/dnd/core";
import { ABILITY_SCORES } from "@/lib/dnd/core";

interface CharacterStatsProps {
  character: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    proficiencyBonus: number;
    skills?: string[];
    skillSources?: { [skillName: string]: 'class' | 'background' | 'racial' | 'feat' | 'other' };
  };
  modifiedStats?: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
}

export function CharacterStats({ character, modifiedStats }: CharacterStatsProps) {
  const stats = modifiedStats || character;
  
  const skillModifiers = {
    'Acrobatics': getModifier(stats.dexterity),
    'Animal Handling': getModifier(stats.wisdom),
    'Arcana': getModifier(stats.intelligence),
    'Athletics': getModifier(stats.strength),
    'Deception': getModifier(stats.charisma),
    'History': getModifier(stats.intelligence),
    'Insight': getModifier(stats.wisdom),
    'Intimidation': getModifier(stats.charisma),
    'Investigation': getModifier(stats.intelligence),
    'Medicine': getModifier(stats.wisdom),
    'Nature': getModifier(stats.intelligence),
    'Perception': getModifier(stats.wisdom),
    'Performance': getModifier(stats.charisma),
    'Persuasion': getModifier(stats.charisma),
    'Religion': getModifier(stats.intelligence),
    'Sleight of Hand': getModifier(stats.dexterity),
    'Stealth': getModifier(stats.dexterity),
    'Survival': getModifier(stats.wisdom),
  };

  const getSkillModifier = (skillName: string): string => {
    const baseModifier = skillModifiers[skillName as keyof typeof skillModifiers] || 0;
    const isProficient = character.skills?.includes(skillName) || false;
    const proficiencyBonus = isProficient ? character.proficiencyBonus : 0;
    const totalModifier = baseModifier + proficiencyBonus;
    
    return totalModifier >= 0 ? `+${totalModifier}` : `${totalModifier}`;
  };

  const getSkillSource = (skillName: string) => {
    return character.skillSources?.[skillName] || 'other';
  };

  return (
    <div className="space-y-6">
      {/* Ability Scores */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {ABILITY_SCORES.map((ability) => {
          const score = stats[ability];
          const modifier = getModifier(score);
          const modifierDisplay = modifier >= 0 ? `+${modifier}` : `${modifier}`;
          
          return (
            <div key={ability} className="bg-slate-700 rounded-lg p-4 text-center" style={{ backgroundColor: 'var(--color-surface-secondary)' }}>
              <div className="text-sm text-slate-300 mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                {ability.charAt(0).toUpperCase() + ability.slice(1)}
              </div>
              <div className="text-2xl font-bold text-white mb-1" style={{ color: 'var(--color-text-primary)' }}>
                {score}
              </div>
              <div className="text-sm text-slate-400" style={{ color: 'var(--color-text-secondary)' }}>
                {modifierDisplay}
              </div>
            </div>
          );
        })}
      </div>

      {/* Skills */}
      {character.skills && character.skills.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3" style={{ color: 'var(--color-text-primary)' }}>
            Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {character.skills.map((skill) => {
              const source = getSkillSource(skill);
              const sourceColor = {
                'class': 'text-blue-400',
                'background': 'text-green-400',
                'racial': 'text-purple-400',
                'feat': 'text-orange-400',
                'other': 'text-slate-400'
              }[source] || 'text-slate-400';
              
              return (
                <div key={skill} className="flex justify-between items-center p-2 bg-slate-700 rounded" style={{ backgroundColor: 'var(--color-surface-secondary)' }}>
                  <span className="text-white" style={{ color: 'var(--color-text-primary)' }}>
                    {skill}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${sourceColor}`}>
                      {getSkillModifier(skill)}
                    </span>
                    <span className={`text-xs ${sourceColor}`}>
                      {source}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Proficiency Bonus */}
      <div className="bg-slate-700 rounded-lg p-4 text-center" style={{ backgroundColor: 'var(--color-surface-secondary)' }}>
        <div className="text-sm text-slate-300 mb-1" style={{ color: 'var(--color-text-secondary)' }}>
          Proficiency Bonus
        </div>
        <div className="text-2xl font-bold text-white" style={{ color: 'var(--color-text-primary)' }}>
          +{character.proficiencyBonus}
        </div>
      </div>
    </div>
  );
} 