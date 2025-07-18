"use client";

import React, { useState, useEffect } from "react";
import { Monster } from "@/types/monster";
import { Button } from "@/components/ui";
import { X, Shield, Sword, BookOpen, Zap, Crown, Eye, Users, Leaf, Flame, Skull, Droplets, Mountain, Sparkles } from "lucide-react";
import { useDiceRoll } from './providers/dice-provider';
import { MonsterImage } from './monster-image';

interface MonsterDetailModalProps {
  monster: Monster | null;
  isOpen: boolean;
  onClose: () => void;
}

// Monster category icons mapping
const MONSTER_TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "humanoid": Users,
  "beast": Leaf,
  "dragon": Flame,
  "undead": Skull,
  "fiend": Flame,
  "celestial": Crown,
  "construct": Shield,
  "elemental": Droplets,
  "fey": Sparkles,
  "giant": Mountain,
  "monstrosity": Zap,
  "ooze": Droplets,
  "plant": Leaf,
  "aberration": Eye,
  "swarm of Tiny beasts": Users
};

export default function MonsterDetailModal({ monster, isOpen, onClose }: MonsterDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'combat' | 'abilities' | 'spells'>('overview');
  const { rollDice } = useDiceRoll();

  // Determine available tabs
  const availableTabs = [
    { id: 'overview', label: 'Overview', icon: Eye, hasContent: true },
    { 
      id: 'combat', 
      label: 'Combat', 
      icon: Sword, 
      hasContent: (monster?.traits && monster.traits.length > 0) || (monster?.actions && monster.actions.length > 0) || (monster?.legendaryActions && monster.legendaryActions.length > 0)
    },
    { 
      id: 'abilities', 
      label: 'Abilities', 
      icon: Zap, 
      hasContent: (monster?.traits && monster.traits.length > 0) || (monster?.legendaryActions && monster.legendaryActions.length > 0)
    },
    { 
      id: 'spells', 
      label: 'Spells', 
      icon: BookOpen, 
      hasContent: monster?.spellcasting !== undefined
    }
  ].filter(tab => tab.hasContent);

  // Set default tab to first available if current tab is not available
  useEffect(() => {
    if (monster && availableTabs.length > 0 && !availableTabs.find(tab => tab.id === activeTab)) {
      setActiveTab(availableTabs[0].id as 'overview' | 'combat' | 'abilities' | 'spells');
    }
  }, [monster, activeTab, availableTabs]);

  if (!isOpen || !monster) return null;

  const TypeIcon = MONSTER_TYPE_ICONS[monster.type.toLowerCase()] || Eye;

  // Helper function to get CR as number for comparison
  const getCRAsNumber = (cr: string): number => {
    if (cr === "0") return 0;
    if (cr.includes("/")) {
      const [numerator, denominator] = cr.split("/").map(Number);
      return numerator / denominator;
    }
    return Number(cr) || 0;
  };

  // Helper function to get CR difficulty background color from theme variables
  const getCRDifficultyBg = (cr: string): string => {
    const crNumber = getCRAsNumber(cr);
    if (crNumber <= 1) return "var(--color-success)"; // Easy
    if (crNumber <= 3) return "var(--color-warning)"; // Medium
    if (crNumber <= 7) return "var(--color-accent)"; // Hard
    if (crNumber <= 12) return "var(--color-error)"; // Deadly
    if (crNumber <= 20) return "var(--color-error-hover)"; // Very Deadly
    return "var(--color-monster-monstrosity)"; // Legendary
  };

  // Helper function to get CR difficulty text color from theme variables
  const getCRDifficultyTextColor = (cr: string): string => {
    const crNumber = getCRAsNumber(cr);
    if (crNumber <= 1) return "var(--color-success-text)"; // Easy
    if (crNumber <= 3) return "var(--color-warning-text)"; // Medium
    if (crNumber <= 7) return "var(--color-accent-text)"; // Hard
    if (crNumber <= 12) return "var(--color-error-text)"; // Deadly
    if (crNumber <= 20) return "var(--color-error-text)"; // Very Deadly
    return "var(--color-accent-text)"; // Legendary
  };

  const getAbilityModifier = (score: number): string => {
    const modifier = Math.floor((score - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  };

  const formatSpeed = (speed: Monster['speed']): string => {
    const parts: string[] = [];
    if (speed.walk) parts.push(`${speed.walk} ft.`);
    if (speed.fly) parts.push(`${speed.fly} ft. fly`);
    if (speed.swim) parts.push(`${speed.swim} ft. swim`);
    if (speed.climb) parts.push(`${speed.climb} ft. climb`);
    if (speed.burrow) parts.push(`${speed.burrow} ft. burrow`);
    if (speed.hover) parts.push("hover");
    return parts.join(", ") || "0 ft.";
  };

  const formatArmorClass = (): string => {
    if (monster.armorType) {
      return `${monster.armorClass} (${monster.armorType})`;
    }
    return `${monster.armorClass}`;
  };

  // Simple function to strip markdown formatting
  const stripMarkdown = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/`(.*?)`/g, '$1') // Remove inline code
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
      .replace(/^#+\s+/gm, '') // Remove headers
      .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
      .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
      .replace(/\n{3,}/g, '\n\n') // Normalize multiple newlines
      .trim();
  };



  const renderSavingThrows = () => {
    if (!monster.savingThrows) return null;
    
    const throws = Object.entries(monster.savingThrows)
      .filter(([, bonus]) => bonus !== undefined)
      .map(([ability, bonus]) => ({
        ability: ability.charAt(0).toUpperCase() + ability.slice(1),
        bonus
      }));

    if (throws.length === 0) return null;

    return (
      <div className="mb-4">
        <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Saving Throws</h4>
        <div className="flex flex-wrap gap-2">
          {throws.map(({ ability, bonus }) => (
            <span 
              key={ability} 
              className="px-2 py-1 rounded text-sm"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-accent-text)"
              }}
            >
              {ability} {bonus >= 0 ? `+${bonus}` : bonus}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderSkills = () => {
    if (!monster.skills || Object.keys(monster.skills).length === 0) return null;

    return (
      <div className="mb-4">
        <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(monster.skills).map(([skill, bonus]) => (
            <span 
              key={skill} 
              className="px-2 py-1 rounded text-sm"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-accent-text)"
              }}
            >
              {skill} {bonus >= 0 ? `+${bonus}` : bonus}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderDamageResistances = () => {
    if (!monster.damageResistances || monster.damageResistances.length === 0) return null;

    return (
      <div className="mb-4">
        <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Damage Resistances</h4>
        <div className="flex flex-wrap gap-2">
          {monster.damageResistances.map((resistance) => (
            <span 
              key={String(resistance)} 
              className="px-2 py-1 rounded text-sm"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-accent-text)"
              }}
            >
              {String(resistance)}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderDamageImmunities = () => {
    if (!monster.damageImmunities || monster.damageImmunities.length === 0) return null;

    return (
      <div className="mb-4">
        <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Damage Immunities</h4>
        <div className="flex flex-wrap gap-2">
          {monster.damageImmunities.map((immunity) => (
            <span 
              key={String(immunity)} 
              className="px-2 py-1 rounded text-sm"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-accent-text)"
              }}
            >
              {String(immunity)}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderConditionImmunities = () => {
    if (!monster.conditionImmunities || monster.conditionImmunities.length === 0) return null;

    // Handle both string and object condition immunities
    const immunityStrings = monster.conditionImmunities.map(immunity => {
      if (typeof immunity === 'string') {
        return immunity;
      } else if (typeof immunity === 'object' && immunity && 'name' in immunity) {
        return (immunity as { name: string }).name;
      } else {
        return String(immunity);
      }
    });

    return (
      <div className="mb-4">
        <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Condition Immunities</h4>
        <div className="flex flex-wrap gap-2">
          {immunityStrings.map((immunity, index) => (
            <span 
              key={`${immunity}-${index}`} 
              className="px-2 py-1 rounded text-sm"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-accent-text)"
              }}
            >
              {immunity}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderSenses = () => {
    const senses = [];
    if (monster.senses.darkvision) senses.push(`Darkvision ${monster.senses.darkvision} ft.`);
    if (monster.senses.blindsight) senses.push(`Blindsight ${monster.senses.blindsight} ft.`);
    if (monster.senses.tremorsense) senses.push(`Tremorsense ${monster.senses.tremorsense} ft.`);
    if (monster.senses.truesight) senses.push(`Truesight ${monster.senses.truesight} ft.`);
    senses.push(`Passive Perception ${monster.senses.passivePerception}`);

    return (
      <div className="mb-4">
        <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Senses</h4>
        <p className="text-[var(--color-text-secondary)] text-sm">{senses.join(", ")}</p>
      </div>
    );
  };

  const renderLanguages = () => {
    if (!monster.languages || monster.languages.length === 0) return null;

    // Ensure languages is an array of strings
    const languageStrings = monster.languages.map(lang => 
      typeof lang === 'string' ? lang : String(lang)
    );

    return (
      <div className="mb-4">
        <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Languages</h4>
        <p className="text-[var(--color-text-secondary)] text-sm">
          {languageStrings.join(", ")}
          {monster.telepathy && `, telepathy ${monster.telepathy} ft.`}
        </p>
      </div>
    );
  };

  const renderTraits = () => {
    if (!monster.traits || monster.traits.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Traits</h3>
        <div className="space-y-4">
          {monster.traits.map((trait, index) => (
            <div key={index} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-4">
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">{trait.name}</h4>
              <p className="text-[var(--color-text-secondary)] text-sm whitespace-pre-wrap">{stripMarkdown(trait.description)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderActions = () => {
    if (!monster.actions || monster.actions.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Actions</h3>
        <div className="space-y-4">
          {monster.actions.map((action, index) => (
            <div key={index} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-4">
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">{action.name}</h4>
              <p className="text-[var(--color-text-secondary)] text-sm whitespace-pre-wrap mb-2">{stripMarkdown(action.description)}</p>
              
              {/* Attack and Damage Dice Rollers */}
              <div className="flex gap-2 mb-3">
                {action.attackBonus !== undefined && (
                  <button
                    onClick={() => rollDice(`1d20${action.attackBonus! >= 0 ? '+' : ''}${action.attackBonus!}`)}
                    className="text-center bg-[var(--color-card-secondary)] rounded p-2 hover:bg-[var(--color-card-tertiary)] transition-colors cursor-pointer group"
                    title={`Roll attack: 1d20${action.attackBonus! >= 0 ? '+' : ''}${action.attackBonus!}`}
                  >
                    <div className="text-lg font-bold text-[var(--color-success)] group-hover:scale-105 transition-transform">
                      {action.attackBonus! >= 0 ? '+' : ''}{action.attackBonus!}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">Attack</div>
                  </button>
                )}
                
                {action.damage && action.damage.roll && (
                  <button
                    onClick={() => rollDice(action.damage!.roll)}
                    className="text-center bg-[var(--color-card-secondary)] rounded p-2 hover:bg-[var(--color-card-tertiary)] transition-colors cursor-pointer group"
                    title={`Roll damage: ${action.damage.roll} ${action.damage.type}`}
                  >
                    <div className="text-lg font-bold text-[var(--color-danger)] group-hover:scale-105 transition-transform">
                      {action.damage.roll}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">{action.damage.type} Damage</div>
                  </button>
                )}
              </div>
              
              {/* Action Details */}
              <div className="space-y-1">
                {action.attackBonus && (
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    <span className="font-medium">Attack Bonus:</span> {action.attackBonus >= 0 ? `+${action.attackBonus}` : action.attackBonus}
                  </p>
                )}
                
                {action.damage && (
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    <span className="font-medium">Damage:</span> {action.damage.roll} {action.damage.type}
                    {action.damage.average && ` (average ${action.damage.average})`}
                  </p>
                )}
                
                {action.reach && (
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    <span className="font-medium">Reach:</span> {action.reach}
                  </p>
                )}
                
                {action.target && (
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    <span className="font-medium">Target:</span> {action.target}
                  </p>
                )}
                
                {action.savingThrow && (
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    <span className="font-medium">Saving Throw:</span> {action.savingThrow.ability.toUpperCase()} DC {action.savingThrow.dc} ({action.savingThrow.effect})
                  </p>
                )}
                
                {action.recharge && (
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    <span className="font-medium">Recharge:</span> {action.recharge}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLegendaryActions = () => {
    if (!monster.legendaryActions || monster.legendaryActions.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Legendary Actions</h3>
        <p className="text-[var(--color-text-secondary)] text-sm mb-4">
          The {monster.name} can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature&apos;s turn. The {monster.name} regains spent legendary actions at the start of its turn.
        </p>
        <div className="space-y-4">
          {monster.legendaryActions.map((action, index) => (
            <div key={index} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-[var(--color-text-primary)]">{action.name}</h4>
                <span className="bg-[var(--color-accent)] text-[var(--color-accent-text)] px-2 py-1 rounded text-xs">
                  {action.cost || 1} action{(action.cost || 1) > 1 ? 's' : ''}
                </span>
              </div>
              <p className="text-[var(--color-text-secondary)] text-sm whitespace-pre-wrap">{stripMarkdown(action.description)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSpellcasting = () => {
    if (!monster.spellcasting) return null;

    const { level, spellcastingAbility, spellSaveDc, spellAttackBonus, spells } = monster.spellcasting;

    return (
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Spellcasting</h3>
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-4 mb-4">
          <p className="text-[var(--color-text-secondary)] text-sm mb-2">
            The {monster.name} is a {level}-level spellcaster. Its spellcasting ability is {spellcastingAbility} (spell save DC {spellSaveDc}, {spellAttackBonus >= 0 ? `+${spellAttackBonus}` : spellAttackBonus} to hit with spell attacks).
          </p>
        </div>
        
        <div className="space-y-4">
          {Object.entries(spells).map(([level, spellList]) => {
            if (!spellList || spellList.length === 0) return null;
            
            return (
              <div key={level} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-4">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  {level === 'cantrips' ? 'Cantrips' : `${level} Level`} ({spellList.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {spellList.map((spell) => (
                    <span 
                      key={String(spell)} 
                      className="px-2 py-1 rounded text-sm"
                      style={{
                        background: "var(--color-accent)",
                        color: "var(--color-accent-text)"
                      }}
                    >
                      {String(spell)}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-[var(--color-overlay)] flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-surface)] rounded-lg shadow-xl max-w-4xl w-full h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)] flex-shrink-0">
          <div className="flex items-center gap-3">
            <TypeIcon className="h-6 w-6 text-[var(--color-accent)]" />
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{monster.name}</h2>
              <p className="text-[var(--color-text-secondary)] text-sm">
                {monster.size} {monster.type}
                {monster.subtype && <span> ({monster.subtype})</span>}
              </p>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--color-border)] flex-shrink-0">
          {availableTabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as 'overview' | 'combat' | 'abilities' | 'spells')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === id
                  ? "border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Hero Section: Image and Key Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Key Stats (Mobile: below image, Desktop: left side) */}
                <div className="space-y-4 order-2 lg:order-1">
                  {/* Basic Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-4">
                      <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Challenge Rating</h4>
                      <p 
                        className="text-2xl font-bold"
                        style={{
                          background: getCRDifficultyBg(monster.challengeRating),
                          color: getCRDifficultyTextColor(monster.challengeRating),
                          padding: "0.25rem 0.5rem",
                          borderRadius: "0.375rem",
                          display: "inline-block"
                        }}
                      >
                        CR {monster.challengeRating}
                      </p>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-2">{monster.xp.toLocaleString()} XP</p>
                    </div>
                    
                    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-4">
                      <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Armor Class</h4>
                      <p className="text-2xl font-bold text-[var(--color-accent)]">{formatArmorClass()}</p>
                    </div>
                    
                    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-4">
                      <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Hit Points</h4>
                      <p className="text-2xl font-bold text-[var(--color-accent)]">{monster.hitPoints}</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{monster.hitDice}</p>
                    </div>
                    
                    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-4">
                      <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Speed</h4>
                      <p className="text-lg font-semibold text-[var(--color-accent)]">{formatSpeed(monster.speed)}</p>
                    </div>
                  </div>

                  {/* Ability Scores */}
                  <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-4">
                    <h4 className="font-semibold text-[var(--color-text-primary)] mb-4">Ability Scores</h4>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                      {[
                        { name: 'STR', score: monster.strength },
                        { name: 'DEX', score: monster.dexterity },
                        { name: 'CON', score: monster.constitution },
                        { name: 'INT', score: monster.intelligence },
                        { name: 'WIS', score: monster.wisdom },
                        { name: 'CHA', score: monster.charisma }
                      ].map(({ name, score }) => (
                        <div key={name} className="text-center">
                          <p className="text-sm text-[var(--color-text-secondary)]">{name}</p>
                          <p className="text-lg font-bold text-[var(--color-text-primary)]">{score}</p>
                          <p className="text-sm text-[var(--color-accent)]">{getAbilityModifier(score)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                                {/* Right Column: Monster Image (Mobile: top, Desktop: right side) */}
                <div className="flex justify-center items-start order-1 lg:order-2">
                  <div className="bg-gradient-to-br from-[var(--color-card)] to-[var(--color-surface)] p-4 rounded-lg shadow-lg border border-[var(--color-border)]">
                    <MonsterImage 
                      monsterName={monster.name}
                      width={400}
                      height={400}
                      className="max-w-full h-auto rounded-lg"
                      priority={true}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Stats */}
              <div className="space-y-4">
                {renderSavingThrows()}
                {renderSkills()}
                {renderDamageResistances()}
                {renderDamageImmunities()}
                {renderConditionImmunities()}
                {renderSenses()}
                {renderLanguages()}
              </div>

              {/* Description and Background */}
              {monster.description && (
                <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-4">
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Description</h4>
                  <p className="text-[var(--color-text-secondary)] text-sm whitespace-pre-wrap">{stripMarkdown(monster.description)}</p>
                </div>
              )}

              {monster.background && (
                <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-4">
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Background</h4>
                  <p className="text-[var(--color-text-secondary)] text-sm whitespace-pre-wrap">{stripMarkdown(monster.background)}</p>
                </div>
              )}


            </div>
          )}

          {activeTab === 'combat' && (
            <div className="space-y-6">
              {renderTraits()}
              {renderActions()}
              {renderLegendaryActions()}
            </div>
          )}

          {activeTab === 'abilities' && (
            <div className="space-y-6">
              {renderTraits()}
              {renderLegendaryActions()}
            </div>
          )}

          {activeTab === 'spells' && (
            <div className="space-y-6">
              {renderSpellcasting()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 