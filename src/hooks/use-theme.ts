import { useState, useEffect } from 'react';
import { getThemeColors, getStatusStyles, getButtonStyles, getInputStyles, getCardStyles, getTagStyles, getLanguageStyles, getRarityColor, getSpellLevelColor } from '@/lib/theme-utils';

// Hook to get current theme colors
export function useThemeColors() {
  const [colors, setColors] = useState(getThemeColors());

  useEffect(() => {
    const updateColors = () => {
      setColors(getThemeColors());
    };

    // Listen for theme changes
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Also update on window resize (in case of theme switching)
    window.addEventListener('resize', updateColors);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateColors);
    };
  }, []);

  return colors;
}

// Hook for status styling
export function useStatusStyles() {
  return {
    success: getStatusStyles('success'),
    warning: getStatusStyles('warning'),
    error: getStatusStyles('error'),
    info: getStatusStyles('info'),
  };
}

// Hook for button styling
export function useButtonStyles() {
  return {
    primary: getButtonStyles('primary'),
    secondary: getButtonStyles('secondary'),
    success: getButtonStyles('success'),
    danger: getButtonStyles('danger'),
    warning: getButtonStyles('warning'),
  };
}

// Hook for input styling
export function useInputStyles() {
  return getInputStyles();
}

// Hook for card styling
export function useCardStyles() {
  return {
    default: getCardStyles('default'),
    secondary: getCardStyles('secondary'),
    tertiary: getCardStyles('tertiary'),
  };
}

// Hook for tag styling
export function useTagStyles() {
  return {
    success: getTagStyles('success'),
    warning: getTagStyles('warning'),
    error: getTagStyles('error'),
    info: getTagStyles('info'),
    default: getTagStyles('default'),
  };
}

// Hook for language styling
export function useLanguageStyles() {
  return {
    getRacial: () => getLanguageStyles('', true, false),
    getClassGranted: () => getLanguageStyles('', false, true),
    getLearned: () => getLanguageStyles('', false, false),
    getCustom: (languageName: string, isRacial: boolean = false, isClassGranted: boolean = false) => 
      getLanguageStyles(languageName, isRacial, isClassGranted),
  };
}

// Hook for rarity colors
export function useRarityColors() {
  return {
    getColor: getRarityColor,
    common: getRarityColor('Common'),
    uncommon: getRarityColor('Uncommon'),
    rare: getRarityColor('Rare'),
    veryRare: getRarityColor('Very Rare'),
    legendary: getRarityColor('Legendary'),
    artifact: getRarityColor('Artifact'),
  };
}

// Hook for spell level colors
export function useSpellLevelColors() {
  return {
    getColor: getSpellLevelColor,
    cantrip: getSpellLevelColor(0),
    level1: getSpellLevelColor(1),
    level2: getSpellLevelColor(2),
    level3: getSpellLevelColor(3),
    level4: getSpellLevelColor(4),
    level5: getSpellLevelColor(5),
    level6: getSpellLevelColor(6),
    level7: getSpellLevelColor(7),
    level8: getSpellLevelColor(8),
    level9: getSpellLevelColor(9),
  };
} 