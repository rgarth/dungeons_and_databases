import React from 'react';
import { 
  useStatusStyles, 
  useTagStyles, 
  useCardStyles, 
  useButtonStyles,
  useInputStyles,
  useLanguageStyles,
  useRarityColors,
  useSpellLevelColors
} from '@/hooks/use-theme';

// Theme-aware status message component
interface StatusMessageProps {
  type: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function StatusMessage({ type, title, children, className = '' }: StatusMessageProps) {
  const statusStyles = useStatusStyles();
  const styles = statusStyles[type];
  
  const icons = {
    success: '✅',
    warning: '⚠️',
    error: '❌',
    info: 'ℹ️',
  };

  return (
    <div 
      className={`p-3 rounded-lg border ${className}`}
      style={{
        backgroundColor: styles.backgroundColor,
        borderColor: styles.borderColor,
        border: styles.border,
      }}
    >
      {title && (
        <div className="flex items-center gap-2 mb-2" style={{ color: styles.color }}>
          <span>{icons[type]}</span>
          <span className="text-sm font-medium">{title}</span>
        </div>
      )}
      <div style={{ color: styles.textColor }}>
        {children}
      </div>
    </div>
  );
}

// Theme-aware tag component
interface TagProps {
  type: 'success' | 'warning' | 'error' | 'info' | 'default';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Tag({ type, children, className = '', onClick }: TagProps) {
  const tagStyles = useTagStyles();
  const styles = tagStyles[type];
  
  return (
    <span 
      className={`px-2 py-1 rounded text-xs font-medium ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        border: styles.border,
      }}
      onClick={onClick}
    >
      {children}
    </span>
  );
}

// Theme-aware card component
interface CardProps {
  variant?: 'default' | 'secondary' | 'tertiary';
  children: React.ReactNode;
  className?: string;
}

export function Card({ variant = 'default', children, className = '' }: CardProps) {
  const cardStyles = useCardStyles();
  const styles = cardStyles[variant];
  
  return (
    <div 
      className={`rounded-lg p-4 ${className}`}
      style={{
        backgroundColor: styles.backgroundColor,
        border: styles.border,
      }}
    >
      {children}
    </div>
  );
}

// Theme-aware button component (simplified version)
interface ThemeButtonProps {
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function ThemeButton({ 
  variant, 
  children, 
  className = '', 
  onClick, 
  disabled = false,
  type = 'button'
}: ThemeButtonProps) {
  const buttonStyles = useButtonStyles();
  const styles = buttonStyles[variant];
  
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        border: styles.border,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// Theme-aware input component
interface ThemeInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  type?: string;
  disabled?: boolean;
  id?: string;
  required?: boolean;
}

export function ThemeInput({ 
  value, 
  onChange, 
  placeholder, 
  className = '', 
  type = 'text',
  disabled = false,
  id,
  required = false
}: ThemeInputProps) {
  const inputStyles = useInputStyles();
  
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className={`w-full rounded-lg px-3 py-2 focus:outline-none transition-colors ${className}`}
      style={{
        backgroundColor: inputStyles.backgroundColor,
        color: inputStyles.color,
        border: inputStyles.border,
      }}
      onFocus={(e) => {
        e.target.style.borderColor = inputStyles.focusBorder;
      }}
      onBlur={(e) => {
        e.target.style.borderColor = inputStyles.border.split(' ')[2];
      }}
    />
  );
}

// Theme-aware language tag component
interface LanguageTagProps {
  language: string;
  isRacial?: boolean;
  isClassGranted?: boolean;
  onClick?: () => void;
  className?: string;
}

export function LanguageTag({ 
  language, 
  isRacial = false, 
  isClassGranted = false, 
  onClick, 
  className = '' 
}: LanguageTagProps) {
  const languageStyles = useLanguageStyles();
  const styles = languageStyles.getCustom(language, isRacial, isClassGranted);
  
  return (
    <span 
      className={`px-2 py-1 rounded text-xs font-medium ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        border: styles.border,
      }}
      onClick={onClick}
    >
      {language}
    </span>
  );
}

// Theme-aware skill tag component
interface SkillTagProps {
  skill: string;
  onClick?: () => void;
  className?: string;
}

export function SkillTag({ skill, onClick, className = '' }: SkillTagProps) {
  const tagStyles = useTagStyles();
  const styles = tagStyles.success; // Skills are typically success-colored
  
  return (
    <span 
      className={`px-2 py-1 rounded text-xs font-medium ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        border: styles.border,
      }}
      onClick={onClick}
    >
      {skill}
    </span>
  );
}

// Theme-aware rarity badge component
interface RarityBadgeProps {
  rarity: string;
  className?: string;
}

export function RarityBadge({ rarity, className = '' }: RarityBadgeProps) {
  const rarityColors = useRarityColors();
  const color = rarityColors.getColor(rarity);
  
  return (
    <span 
      className={`px-2 py-1 rounded text-xs font-medium ${className}`}
      style={{ color }}
    >
      {rarity}
    </span>
  );
}

// Theme-aware spell level badge component
interface SpellLevelBadgeProps {
  level: number;
  className?: string;
}

export function SpellLevelBadge({ level, className = '' }: SpellLevelBadgeProps) {
  const spellLevelColors = useSpellLevelColors();
  const color = spellLevelColors.getColor(level);
  
  const levelText = level === 0 ? 'Cantrip' : `Level ${level}`;
  
  return (
    <span 
      className={`px-2 py-1 rounded text-xs font-medium ${className}`}
      style={{ color }}
    >
      {levelText}
    </span>
  );
} 