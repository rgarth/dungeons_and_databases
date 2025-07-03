// Theme-aware utility functions to replace hardcoded CSS custom properties
// This ensures all colors properly adapt to theme changes

export interface ThemeColors {
  // Background colors
  surface: string;
  surfaceSecondary: string;
  surfaceTertiary: string;
  surfaceQuaternary: string;
  card: string;
  cardSecondary: string;
  cardTertiary: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textQuaternary: string;
  textMuted: string;
  
  // Primary colors
  primary: string;
  primaryHover: string;
  
  // Accent colors
  accent: string;
  accentHover: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  
  // Button colors
  button: string;
  buttonHover: string;
  buttonText: string;
  
  // Status colors
  success: string;
  successText: string;
  successHover: string;
  successBg: string;
  successBorder: string;
  
  warning: string;
  warningText: string;
  warningBg: string;
  warningBorder: string;
  
  error: string;
  errorText: string;
  errorHover: string;
  errorBg: string;
  errorBorder: string;
  
  // Border colors
  border: string;
  borderLight: string;
  
  // Special colors
  overlay: string;
  errorTextLight: string;
  diceDefault: string;
  diceCanvasBg: string;
}

// Get current theme colors from CSS custom properties
export function getThemeColors(): ThemeColors {
  return {
    // Background colors
    surface: getComputedStyle(document.documentElement).getPropertyValue('--color-surface'),
    surfaceSecondary: getComputedStyle(document.documentElement).getPropertyValue('--color-surface-secondary'),
    surfaceTertiary: getComputedStyle(document.documentElement).getPropertyValue('--color-surface-tertiary'),
    surfaceQuaternary: getComputedStyle(document.documentElement).getPropertyValue('--color-surface-quaternary'),
    card: getComputedStyle(document.documentElement).getPropertyValue('--color-card'),
    cardSecondary: getComputedStyle(document.documentElement).getPropertyValue('--color-card-secondary'),
    cardTertiary: getComputedStyle(document.documentElement).getPropertyValue('--color-card-tertiary'),
    
    // Text colors
    textPrimary: getComputedStyle(document.documentElement).getPropertyValue('--color-text-primary'),
    textSecondary: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary'),
    textTertiary: getComputedStyle(document.documentElement).getPropertyValue('--color-text-tertiary'),
    textQuaternary: getComputedStyle(document.documentElement).getPropertyValue('--color-text-quaternary'),
    textMuted: getComputedStyle(document.documentElement).getPropertyValue('--color-text-muted'),
    
    // Primary colors
    primary: getComputedStyle(document.documentElement).getPropertyValue('--color-primary'),
    primaryHover: getComputedStyle(document.documentElement).getPropertyValue('--color-primary-hover'),
    
    // Accent colors
    accent: getComputedStyle(document.documentElement).getPropertyValue('--color-accent'),
    accentHover: getComputedStyle(document.documentElement).getPropertyValue('--color-accent-hover'),
    accentText: getComputedStyle(document.documentElement).getPropertyValue('--color-accent-text'),
    accentBg: getComputedStyle(document.documentElement).getPropertyValue('--color-accent-bg'),
    accentBorder: getComputedStyle(document.documentElement).getPropertyValue('--color-accent-border'),
    
    // Button colors
    button: getComputedStyle(document.documentElement).getPropertyValue('--color-button'),
    buttonHover: getComputedStyle(document.documentElement).getPropertyValue('--color-button-hover'),
    buttonText: getComputedStyle(document.documentElement).getPropertyValue('--color-button-text'),
    
    // Status colors
    success: getComputedStyle(document.documentElement).getPropertyValue('--color-success'),
    successText: getComputedStyle(document.documentElement).getPropertyValue('--color-success-text'),
    successHover: getComputedStyle(document.documentElement).getPropertyValue('--color-success-hover'),
    successBg: getComputedStyle(document.documentElement).getPropertyValue('--color-success-bg'),
    successBorder: getComputedStyle(document.documentElement).getPropertyValue('--color-success-border'),
    
    warning: getComputedStyle(document.documentElement).getPropertyValue('--color-warning'),
    warningText: getComputedStyle(document.documentElement).getPropertyValue('--color-warning-text'),
    warningBg: getComputedStyle(document.documentElement).getPropertyValue('--color-warning-bg'),
    warningBorder: getComputedStyle(document.documentElement).getPropertyValue('--color-warning-border'),
    
    error: getComputedStyle(document.documentElement).getPropertyValue('--color-error'),
    errorText: getComputedStyle(document.documentElement).getPropertyValue('--color-error-text'),
    errorHover: getComputedStyle(document.documentElement).getPropertyValue('--color-error-hover'),
    errorBg: getComputedStyle(document.documentElement).getPropertyValue('--color-error-bg'),
    errorBorder: getComputedStyle(document.documentElement).getPropertyValue('--color-error-border'),
    
    // Border colors
    border: getComputedStyle(document.documentElement).getPropertyValue('--color-border'),
    borderLight: getComputedStyle(document.documentElement).getPropertyValue('--color-border-light'),
    
    // Special colors
    overlay: getComputedStyle(document.documentElement).getPropertyValue('--color-overlay'),
    errorTextLight: getComputedStyle(document.documentElement).getPropertyValue('--color-error-text-light'),
    diceDefault: getComputedStyle(document.documentElement).getPropertyValue('--color-dice-default'),
    diceCanvasBg: getComputedStyle(document.documentElement).getPropertyValue('--color-dice-canvas-bg'),
  };
}

// Theme-aware styling functions
export function getStatusStyles(type: 'success' | 'warning' | 'error' | 'info') {
  const colors = getThemeColors();
  
  switch (type) {
    case 'success':
      return {
        backgroundColor: colors.surfaceSecondary,
        borderColor: colors.success,
        border: `1px solid ${colors.success}`,
        color: colors.success,
        textColor: colors.textSecondary,
      };
    case 'warning':
      return {
        backgroundColor: colors.surfaceSecondary,
        borderColor: colors.warning,
        border: `1px solid ${colors.warning}`,
        color: colors.warning,
        textColor: colors.textSecondary,
      };
    case 'error':
      return {
        backgroundColor: colors.surfaceSecondary,
        borderColor: colors.error,
        border: `1px solid ${colors.error}`,
        color: colors.error,
        textColor: colors.textSecondary,
      };
    case 'info':
      return {
        backgroundColor: colors.surfaceSecondary,
        borderColor: colors.accent,
        border: `1px solid ${colors.accent}`,
        color: colors.accent,
        textColor: colors.textSecondary,
      };
  }
}

// Theme-aware button styles
export function getButtonStyles(variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning') {
  const colors = getThemeColors();
  
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: colors.button,
        color: colors.buttonText,
        border: 'none',
        hoverBackground: colors.buttonHover,
      };
    case 'secondary':
      return {
        backgroundColor: colors.cardSecondary,
        color: colors.textPrimary,
        border: `1px solid ${colors.border}`,
        hoverBackground: colors.cardTertiary,
      };
    case 'success':
      return {
        backgroundColor: colors.success,
        color: colors.successText,
        border: 'none',
        hoverBackground: colors.successHover,
      };
    case 'danger':
      return {
        backgroundColor: colors.error,
        color: colors.errorText,
        border: 'none',
        hoverBackground: colors.errorHover,
      };
    case 'warning':
      return {
        backgroundColor: colors.warning,
        color: colors.warningText,
        border: 'none',
        hoverBackground: colors.warning,
      };
  }
}

// Theme-aware input styles
export function getInputStyles() {
  const colors = getThemeColors();
  
  return {
    backgroundColor: colors.cardSecondary,
    color: colors.textPrimary,
    border: `1px solid ${colors.border}`,
    focusBorder: colors.accent,
    placeholderColor: colors.textMuted,
  };
}

// Theme-aware card styles
export function getCardStyles(variant: 'default' | 'secondary' | 'tertiary' = 'default') {
  const colors = getThemeColors();
  
  switch (variant) {
    case 'default':
      return {
        backgroundColor: colors.card,
        border: `1px solid ${colors.border}`,
      };
    case 'secondary':
      return {
        backgroundColor: colors.cardSecondary,
        border: `1px solid ${colors.border}`,
      };
    case 'tertiary':
      return {
        backgroundColor: colors.cardTertiary,
        border: `1px solid ${colors.border}`,
      };
  }
}

// Theme-aware tag styles
export function getTagStyles(type: 'success' | 'warning' | 'error' | 'info' | 'default') {
  const colors = getThemeColors();
  
  switch (type) {
    case 'success':
      return {
        backgroundColor: colors.surfaceSecondary,
        color: colors.success,
        border: `1px solid ${colors.success}`,
      };
    case 'warning':
      return {
        backgroundColor: colors.surfaceSecondary,
        color: colors.warning,
        border: `1px solid ${colors.warning}`,
      };
    case 'error':
      return {
        backgroundColor: colors.surfaceSecondary,
        color: colors.error,
        border: `1px solid ${colors.error}`,
      };
    case 'info':
      return {
        backgroundColor: colors.surfaceSecondary,
        color: colors.accent,
        border: `1px solid ${colors.accent}`,
      };
    case 'default':
      return {
        backgroundColor: colors.cardSecondary,
        color: colors.textSecondary,
        border: `1px solid ${colors.border}`,
      };
  }
}

// Theme-aware language styling (replaces getLanguageStyling)
export function getLanguageStyles(languageName: string, isRacial: boolean = false, isClassGranted: boolean = false) {
  const colors = getThemeColors();
  
  if (isRacial) {
    return {
      backgroundColor: colors.surfaceSecondary,
      color: colors.accent,
      border: `1px solid ${colors.accent}`,
      hoverColor: colors.accentHover,
    };
  }
  
  if (isClassGranted) {
    return {
      backgroundColor: colors.surfaceSecondary,
      color: colors.primary,
      border: `1px solid ${colors.primary}`,
      hoverColor: colors.primaryHover,
    };
  }
  
  // Default for learned languages
  return {
    backgroundColor: colors.surfaceSecondary,
    color: colors.success,
    border: `1px solid ${colors.success}`,
    hoverColor: colors.successHover,
  };
}

// Theme-aware magical item rarity colors
export function getRarityColor(rarity: string) {
  const colors = getThemeColors();
  
  switch (rarity) {
    case 'Common': return colors.textMuted;
    case 'Uncommon': return colors.success;
    case 'Rare': return colors.accent;
    case 'Very Rare': return colors.cardTertiary;
    case 'Legendary': return colors.warning;
    case 'Artifact': return colors.error;
    default: return colors.textMuted;
  }
}

// Theme-aware spell level colors
export function getSpellLevelColor(level: number) {
  const colors = getThemeColors();
  
  switch (level) {
    case 0: return colors.textMuted;
    case 1: return colors.success;
    case 2: return colors.accent;
    case 3: return colors.cardTertiary;
    case 4: return colors.warning;
    case 5: return colors.error;
    case 6: return colors.success;
    case 7: return colors.accent;
    case 8: return colors.cardTertiary;
    case 9: return colors.warning;
    default: return colors.textMuted;
  }
} 