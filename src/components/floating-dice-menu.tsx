"use client";

import { useState, useRef, useEffect } from 'react';
import FullscreenDiceOverlay from './fullscreen-dice-overlay';



interface FloatingDiceMenuProps {
  className?: string;
}

// Helper functions for color conversion
const hexToHsl = (hex: string) => {
  if (!hex || !hex.startsWith('#') || hex.length !== 7) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    throw new Error(`Invalid hex color values: ${hex}`);
  }
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  
  let h = 0;
  if (diff === 0) h = 0;
  else if (max === r) h = ((g - b) / diff) % 6;
  else if (max === g) h = (b - r) / diff + 2;
  else if (max === b) h = (r - g) / diff + 4;
  
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  
  const l = (max + min) / 2;
  const s = max === 0 ? 0 : diff / (1 - Math.abs(2 * l - 1));
  
  return { h, s: s * 100, l: l * 100 };
};

const hslToHex = (h: number, s: number, l: number) => {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }
  
  const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');
  
  return `#${rHex}${gHex}${bHex}`;
};

// Custom Color Picker Component
function ColorWheel({ currentColor, onColorChange }: { 
  currentColor: string; 
  onColorChange: (color: string) => void; 
}) {
  // Reset dice color to theme default
  const resetToThemeDefault = () => {
    try {
      // Get the computed value of the CSS variable for default dice color
      const defaultColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-dice-default')
        .trim();
      
      const colorToUse = defaultColor || '#dc2626'; // Fallback to red if CSS variable not found
      onColorChange(colorToUse);
    } catch {
      // Fallback to red if there's any error
      onColorChange('#dc2626');
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleColorSelect = (color: string) => {
    onColorChange(color);
  };

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const brightness = parseInt(e.target.value);
    try {
      const hslColor = hexToHsl(currentColor);
      const newHslColor = { ...hslColor, l: brightness };
      const newHexColor = hslToHex(newHslColor.h, newHslColor.s, newHslColor.l);
      onColorChange(newHexColor);
    } catch (error) {
      console.warn('Failed to adjust brightness for color:', currentColor, error);
    }
  };

  const getCurrentLightness = () => {
    try {
      const hsl = hexToHsl(currentColor);
      return hsl.l;
    } catch {
      return 50;
    }
  };

  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      let top = rect.top - 320;
      let left = rect.left - 75;
      
      if (top < 10) top = 10;
      if (left < 20) left = 20;
      if (left + 150 > viewportWidth - 20) left = viewportWidth - 170;
      
      setPickerPosition({ top, left });
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && 
          pickerRef.current && 
          !pickerRef.current.contains(event.target as Node) &&
          buttonRef.current && 
          !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
        style={{ 
          backgroundColor: currentColor,
          borderColor: 'var(--color-border)'
        }}
        title="Choose dice color"
      >
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: currentColor }}></div>
      </button>
      
      {isOpen && (
        <div 
          ref={pickerRef}
          className="fixed z-50 rounded-lg p-4 shadow-lg"
          style={{ 
            top: pickerPosition.top,
            left: pickerPosition.left,
            minWidth: '180px',
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)'
          }}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 transition-colors p-1 rounded"
            style={{ color: 'var(--color-text-secondary)' }}
            title="Close color picker"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          
          <div className="mb-4">
            <div className="flex items-center justify-center mb-3 gap-2">
              <button
                onClick={resetToThemeDefault}
                className="w-5 h-5 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{
                  backgroundColor: 'var(--color-card-secondary)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)'
                }}
                title="Reset to theme default"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
              </button>
              <h3 className="text-sm text-center" style={{ color: 'var(--color-text-secondary)' }}>Choose Color</h3>
            </div>
            <div className="flex justify-center">
              <div 
                className="relative rounded-full border-2 cursor-pointer"
                style={{ 
                  width: '120px', 
                  height: '120px',
                  background: 'conic-gradient(from 0deg, #ff0000 0deg, #ff8000 30deg, #ffff00 60deg, #80ff00 90deg, #00ff00 120deg, #00ff80 150deg, #00ffff 180deg, #0080ff 210deg, #0000ff 240deg, #8000ff 270deg, #ff00ff 300deg, #ff0080 330deg, #ff0000 360deg)',
                  padding: '8px',
                  borderColor: 'var(--color-border)'
                }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const x = e.clientX - rect.left - centerX;
                  const y = e.clientY - rect.top - centerY;
                  
                  const angle = Math.atan2(x, -y) * 180 / Math.PI;
                  const normalizedAngle = (angle + 360) % 360;
                  const hue = normalizedAngle;
                  
                  const hexColor = hslToHex(hue, 100, 50);
                  handleColorSelect(hexColor);
                }}
                title="Click to select color"
              >
                <div 
                  className="absolute inset-8 rounded-full border-2 flex items-center justify-center"
                  style={{ 
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-text-primary)'
                  }}
                >
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: currentColor }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Brightness</label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={getCurrentLightness()}
                onChange={handleBrightnessChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #000, ${currentColor}, #fff)`
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple dice selector component for floating menu
function SimpleDiceSelector({ 
  onRoll, 
  diceColor, 
  setDiceColor 
}: { 
  onRoll: (notation: string, color: string) => void;
  diceColor: string;
  setDiceColor: (color: string) => void;
}) {
  const [diceCounts, setDiceCounts] = useState({
    d4: 0,
    d6: 0,
    d8: 0,
    d10: 0,
    d12: 0,
    d20: 0,
  });

  // Save user's die color preference to cookie when it changes
  const saveUserPreference = (color: string) => {
    try {
      // Set cookie to expire in 1 year
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      document.cookie = `diceColor=${color}; expires=${expires.toUTCString()}; path=/`;
      document.cookie = `diceColorCustomized=true; expires=${expires.toUTCString()}; path=/`;
    } catch {
      // Continue even if cookie saving fails
    }
  };

  // Update dice color and save to cookie
  const updateDiceColor = (color: string) => {
    setDiceColor(color);
    saveUserPreference(color);
  };

  const diceTypes = [
    { key: 'd4' as const, sides: 4 },
    { key: 'd6' as const, sides: 6 },
    { key: 'd8' as const, sides: 8 },
    { key: 'd10' as const, sides: 10 },
    { key: 'd12' as const, sides: 12 },
    { key: 'd20' as const, sides: 20 },
  ];

  const addDice = (diceType: keyof typeof diceCounts) => {
    const total = getTotalDice();
    if (total < 10) {
      setDiceCounts(prev => ({
        ...prev,
        [diceType]: prev[diceType] + 1
      }));
    }
  };

  const removeDice = (diceType: keyof typeof diceCounts) => {
    setDiceCounts(prev => ({
      ...prev,
      [diceType]: Math.max(0, prev[diceType] - 1)
    }));
  };

  const getTotalDice = () => {
    return Object.values(diceCounts).reduce((sum, count) => sum + count, 0);
  };

  const buildDiceNotation = () => {
    const parts: string[] = [];
    diceTypes.forEach(dice => {
      const count = diceCounts[dice.key];
      if (count > 0) {
        parts.push(`${count}${dice.key}`);
      }
    });
    return parts.join(' + ');
  };

  const clearAll = () => {
    setDiceCounts({
      d4: 0,
      d6: 0,
      d8: 0,
      d10: 0,
      d12: 0,
      d20: 0,
    });
  };

  const totalDice = getTotalDice();
  const notation = buildDiceNotation();

  return (
    <div className="flex flex-col items-center py-4 space-y-4">
      {/* Dice Selector */}
      <div className="flex flex-col space-y-3">
        {diceTypes.map(dice => (
          <div key={dice.key} className="flex flex-col items-center">
            <div className="relative">
              <button
                onClick={() => addDice(dice.key)}
                disabled={totalDice >= 10}
                className="w-12 h-12 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
                title={`Add ${dice.key.toUpperCase()}`}
              >
                <div 
                  className="w-12 h-12 rounded-lg border-2 overflow-hidden flex items-center justify-center"
                  style={{ 
                    backgroundColor: 'var(--color-card)', 
                    borderColor: 'var(--color-border)',
                    minHeight: '48px',
                    width: '48px',
                    height: '48px',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '8px'
                  }}
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-lg"
                    style={{ 
                      backgroundColor: diceColor,
                      width: '32px',
                      height: '32px',
                      fontSize: '10px',
                      lineHeight: '1',
                      color: (() => {
                        const hex = diceColor.replace('#', '');
                        const r = parseInt(hex.substr(0, 2), 16) / 255;
                        const g = parseInt(hex.substr(2, 2), 16) / 255;
                        const b = parseInt(hex.substr(4, 2), 16) / 255;
                        const max = Math.max(r, g, b);
                        const min = Math.min(r, g, b);
                        const lightness = (max + min) / 2;
                        return lightness < 0.5 ? '#ffffff' : '#000000';
                      })()
                    }}
                    data-dice-color={diceColor}
                  >
                    {dice.key.toUpperCase()}
                  </div>
                </div>
              </button>
              
              {/* Count badge */}
              {diceCounts[dice.key] > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeDice(dice.key);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="absolute -top-1 -right-1 text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-lg transition-colors cursor-pointer z-10"
                  style={{ 
                    backgroundColor: 'var(--color-danger)',
                    color: 'var(--color-danger-text)'
                  }}
                  title={`Remove ${dice.key.toUpperCase()} (${diceCounts[dice.key]})`}
                >
                  {diceCounts[dice.key]}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Color Wheel */}
      <div className="flex flex-col items-center space-y-2">
        <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>Color</span>
        <ColorWheel currentColor={diceColor} onColorChange={updateDiceColor} />
      </div>

      {/* Roll and Clear Buttons */}
      <div className="flex flex-col space-y-2 mt-auto">
        <button
          onClick={() => onRoll(notation, diceColor)}
          disabled={totalDice === 0}
          className="w-12 h-12 rounded-lg font-bold text-lg transition-colors shadow-lg"
          style={{
            backgroundColor: totalDice === 0
              ? 'var(--color-card-secondary)' 
              : 'var(--color-accent)',
            color: totalDice === 0
              ? 'var(--color-text-muted)' 
              : 'var(--color-accent-text)'
          }}
          title="Roll dice fullscreen"
        >
          🎲
        </button>
        
        <button
          onClick={clearAll}
          disabled={totalDice === 0}
          className="w-12 h-8 rounded-lg transition-colors text-xs shadow-lg"
          style={{
            backgroundColor: 'var(--color-card-secondary)',
            color: 'var(--color-text-primary)'
          }}
          title="Clear all"
        >
          Clear
        </button>
      </div>

      {/* Total Dice Counter */}
      <div className="text-xs text-center" style={{ color: 'var(--color-text-secondary)' }}>
        {totalDice}/10
      </div>
    </div>
  );
}

export default function FloatingDiceMenu({ className = "" }: FloatingDiceMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [diceColor, setDiceColor] = useState('#dc2626');
  const [lastRollResult, setLastRollResult] = useState<string | null>(null);
  const [showFullscreenRoll, setShowFullscreenRoll] = useState(false);
  const [fullscreenDiceNotation, setFullscreenDiceNotation] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Simple rolling state - no queue
  const [isRolling, setIsRolling] = useState(false);
  
  // Roll history system
  const [rollHistory, setRollHistory] = useState<Array<{result: string, notation: string, timestamp: number}>>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // Mobile detection and mobile-specific state
  const [isMobile, setIsMobile] = useState(false);
  const [showHistoryOnMobile, setShowHistoryOnMobile] = useState(false);
  const autoHideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Get initial dice color from cookie or theme default
  const getInitialDiceColor = () => {
    try {
      // Check for saved color preference in cookie
      const savedColor = document.cookie
        .split('; ')
        .find(row => row.startsWith('diceColor='))
        ?.split('=')[1];
      
      if (savedColor) {
        return savedColor;
      }
      
      // Get the computed value of the CSS variable for default dice color
      const defaultColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-dice-default')
        .trim();
      
      return defaultColor || '#dc2626'; // Fallback to red if CSS variable not found
    } catch {
      return '#dc2626'; // Fallback to red
    }
  };

  // Initialize with cookie value or theme default
  useEffect(() => {
    const initialColor = getInitialDiceColor();
    setDiceColor(initialColor);
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-hide timer for roll history only (not the last result)
  useEffect(() => {
    if (rollHistory.length > 1 && (showHistory || showHistoryOnMobile)) {
      // Clear any existing timer
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
      }
      
      // Set new timer to hide roll history after 3 seconds
      autoHideTimerRef.current = setTimeout(() => {
        setShowHistory(false);
        setShowHistoryOnMobile(false);
      }, 3000);
    }

    return () => {
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
      }
    };
  }, [rollHistory.length, showHistory, showHistoryOnMobile]);

  // Handle click outside to collapse
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  // Listen for dice roll triggers from other components
  useEffect(() => {
    const handleTriggerDiceRoll = (event: CustomEvent) => {
      const { notation, requestResults } = event.detail;
      if (notation && !isRolling) {
        // Only start a new roll if not currently rolling
        setFullscreenDiceNotation(notation);
        setShowFullscreenRoll(true);
        setIsRolling(true);
        
        // Store requestResults for use in the dice roll
        if (requestResults) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).requestedDiceResults = requestResults;
          console.log('🎲 Set requestedDiceResults:', requestResults);
        }
      }
    };

    window.addEventListener('triggerDiceRoll', handleTriggerDiceRoll as EventListener);

    return () => {
      window.removeEventListener('triggerDiceRoll', handleTriggerDiceRoll as EventListener);
    };
  }, [isRolling]);

  // Debug functions for testing dice rolls globally
  useEffect(() => {
    // Add global function for simulating any dice roll
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).simulateDiceRoll = (diceNotation: string, diceResults: number | number[], modifier?: number) => {
      // Parse the dice notation (e.g., "2d20", "3d6", "1d8")
      const match = diceNotation.match(/^(\d+)d(\d+)$/);
      if (!match) {
        console.error('Invalid dice notation. Use format like "2d20", "3d6", "1d8"');
        return 'Error: Invalid dice notation';
      }
      
      const [, diceCount, diceType] = match;
      const numDice = parseInt(diceCount);
      const diceSize = parseInt(diceType);
      
      // Validate dice results
      let results: number[];
      if (Array.isArray(diceResults)) {
        // Multiple results provided
        if (diceResults.length !== numDice) {
          console.error(`Expected ${numDice} results, got ${diceResults.length}`);
          return `Error: Expected ${numDice} results, got ${diceResults.length}`;
        }
        results = diceResults.map(result => {
          if (result < 1 || result > diceSize) {
            console.warn(`Result ${result} is outside valid range for d${diceSize}`);
            return Math.min(Math.max(result, 1), diceSize);
          }
          return result;
        });
      } else {
        // Single result - apply to all dice
        if (diceResults < 1 || diceResults > diceSize) {
          console.warn(`Result ${diceResults} is outside valid range for d${diceSize}`);
          diceResults = Math.min(Math.max(diceResults, 1), diceSize);
        }
        results = Array(numDice).fill(diceResults);
      }
      
      const modifierStr = modifier !== undefined && modifier !== null ? (modifier >= 0 ? '+' : '') + modifier : '';
      const notation = `${diceNotation}${modifierStr}`;
      
      // Instead of manually updating history, trigger a real dice roll with specific results
      // This will use the complete flow and update both histories properly
      const event = new CustomEvent('triggerDiceRoll', { 
        detail: { 
          notation: notation,
          requestResults: results // Set the specific dice results
        } 
      });
      window.dispatchEvent(event);
      
      const resultsStr = results.length === 1 ? results[0] : `[${results.join(', ')}]`;
      console.log(`🎲 Triggering dice roll: ${notation} with results ${resultsStr}`);
      return `Dice roll triggered! ${notation} will result in ${resultsStr}`;
    };



    // Add global function to check current roll history
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).checkRollHistory = () => {
      console.log('📊 Current roll history:', rollHistory);
      return rollHistory;
    };

    // Add global function to clear roll history
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).clearRollHistory = () => {
      setRollHistory([]);
      console.log('🗑️ Roll history cleared');
      return 'Roll history cleared';
    };

    // Add global function to clear requested dice results
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).clearRequestedDiceResults = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).requestedDiceResults) {
        console.log('🎲 Clearing requestedDiceResults via global function');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).requestedDiceResults;
        return 'Requested dice results cleared';
      }
      return 'No requested dice results to clear';
    };

    // Add global function to reset dice library
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).resetDiceLibrary = () => {
      console.log('🎲 Manually resetting dice library');
      if (window.DICE && window.DICE.clearMaterialCache) {
        window.DICE.clearMaterialCache();
        console.log('🎲 Cleared dice material cache');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).requestedDiceResults) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).requestedDiceResults;
        console.log('🎲 Cleared requested dice results');
      }
      return 'Dice library reset complete';
    };

    // Cleanup on unmount
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).simulateDiceRoll;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).checkRollHistory;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).clearRollHistory;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).clearRequestedDiceResults;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).resetDiceLibrary;
      // Clear any requested results to prevent them from affecting future rolls
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).requestedDiceResults) {
        console.log('🎲 Clearing requestedDiceResults on unmount');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).requestedDiceResults;
      }
    };
  }, [rollHistory]);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  const handleRollFullscreen = (notation: string, color: string) => {
    // Only start a new roll if not currently rolling
    if (!isRolling) {
      setFullscreenDiceNotation(notation);
      setDiceColor(color);
      setShowFullscreenRoll(true);
      setIsRolling(true);
    }
  };

  const handleRollComplete = (result: { resultString?: string; resultTotal?: number }) => {
    // Clear any requested results to prevent them from affecting future rolls
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).requestedDiceResults) {
      console.log('🎲 Clearing requestedDiceResults in handleRollComplete');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).requestedDiceResults;
    }
    
    // Validate the result - check for invalid values like -1
    if (result && result.resultString) {
      // Check if this is an error result - just ignore it, component will reload
      if (result.resultString.startsWith('ERROR:')) {
        console.log('🎲 Dice roll failed, component will reload');
        setIsRolling(false);
        setIsExpanded(false);
        return;
      }
      
      // Check if the result contains invalid values
      const hasInvalidValues = result.resultString.includes('-1') || 
                              result.resultString.includes(' -') ||
                              (result.resultTotal !== undefined && result.resultTotal <= 0);
      
      if (hasInvalidValues) {
        console.warn('🎲 Invalid dice result detected in handleRollComplete:', result.resultString);
        console.log('🎲 Rejecting invalid result - not storing or displaying');
        // Don't store or display invalid results
        setIsRolling(false);
        setIsExpanded(false);
        return;
      }
      
      setLastRollResult(result.resultString);
      
      // Add to roll history
      setRollHistory(prev => {
        const newHistory = [
          {
            result: result.resultString!,
            notation: fullscreenDiceNotation,
            timestamp: Date.now()
          },
          ...prev
        ];
        // Keep only the last 5 rolls
        return newHistory.slice(0, 5);
      });
      

      
      // Dispatch global event for other components to listen to
      const globalEvent = new CustomEvent('diceRollCompleted', {
        detail: {
          notation: fullscreenDiceNotation,
          result: result.resultString,
          resultTotal: result.resultTotal
        }
      });
      window.dispatchEvent(globalEvent);
    }
    
    // Simple completion - just stop rolling
    setIsRolling(false);
    
    // Auto-collapse the menu after a roll
    setIsExpanded(false);
  };

  // Mobile interaction handlers
  const handleDiceClick = () => {
    if (isMobile) {
      // On mobile, clicking the dice opens the dice menu
      handleExpand();
    } else {
      // On desktop, clicking the dice opens the dice menu
      handleExpand();
    }
  };

  const handleResultsClick = () => {
    if (isMobile) {
      // On mobile, clicking the results area shows history
      setShowHistoryOnMobile(!showHistoryOnMobile);
      setShowHistory(false); // Hide desktop hover history
    }
  };

  const handleCloseFullscreen = () => {
    setShowFullscreenRoll(false);
    setIsRolling(false);
    
    // Auto-collapse the menu when closing fullscreen
    setIsExpanded(false);
  };

  return (
    <>
      <div 
        ref={menuRef}
        className={`fixed bottom-4 left-4 z-50 transition-all duration-300 ease-in-out ${className}`}
        style={{
          height: isExpanded ? 'min(600px, calc(100vh - 2rem))' : '64px'
        }}
      >
        {/* Collapsed state - dice button with optional result pill */}
        {!isExpanded && (
          <div className="flex items-center">
            {lastRollResult ? (
              // Pill design with result
              <div className="relative">
                {isMobile ? (
                  // Mobile: Separate clickable areas
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-full transition-all shadow-lg border-2"
                    style={{ 
                      backgroundColor: 'var(--color-card)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-primary)'
                    }}
                  >
                    {/* Dice icon in circle - clickable for dice menu */}
                    <button
                      onClick={handleDiceClick}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-all hover:scale-105"
                      style={{ 
                        backgroundColor: 'var(--color-accent)',
                        color: 'var(--color-accent-text)'
                      }}
                      title="Open Dice Menu"
                    >
                      🎲
                    </button>
                    {/* Roll result - clickable for history */}
                    <button
                      onClick={handleResultsClick}
                      className="text-sm font-medium whitespace-nowrap transition-all hover:scale-105"
                      title="View Roll History"
                    >
                      {lastRollResult}
                    </button>
                  </div>
                ) : (
                  // Desktop: Hover behavior
                  <button
                    onClick={handleExpand}
                    onMouseEnter={() => setShowHistory(true)}
                    onMouseLeave={() => setShowHistory(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-full transition-all hover:scale-105 shadow-lg border-2"
                    style={{ 
                      backgroundColor: 'var(--color-card)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-primary)'
                    }}
                    title="Open Dice Menu"
                  >
                    {/* Dice icon in circle */}
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold"
                      style={{ 
                        backgroundColor: 'var(--color-accent)',
                        color: 'var(--color-accent-text)'
                      }}
                    >
                      🎲
                    </div>
                    {/* Roll result */}
                    <span className="text-sm font-medium whitespace-nowrap">
                      {lastRollResult}
                    </span>
                  </button>
                )}
                
                {/* Desktop Roll History Tooltip */}
                {showHistory && !isMobile && rollHistory.length > 1 && (
                  <div 
                    className="absolute bottom-full left-0 mb-2 p-3 rounded-lg shadow-xl border-2 z-50 min-w-[200px]"
                    style={{
                      backgroundColor: 'var(--color-card)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-primary)'
                    }}
                  >
                    <div className="text-xs font-semibold mb-2 text-[var(--color-text-secondary)]">
                      Recent Rolls
                    </div>
                    {rollHistory.map((roll) => (
                      <div key={roll.timestamp} className="flex justify-between items-center py-1">
                        <span className="text-xs text-[var(--color-text-secondary)]">
                          {roll.notation}
                        </span>
                        <span className="text-sm font-bold">
                          {roll.result}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Mobile Roll History Popup */}
                {showHistoryOnMobile && isMobile && rollHistory.length > 1 && (
                  <div 
                    className="absolute bottom-full left-0 mb-2 p-3 rounded-lg shadow-xl border-2 z-50 min-w-[200px]"
                    style={{
                      backgroundColor: 'var(--color-card)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-primary)'
                    }}
                  >
                    <div className="text-xs font-semibold mb-2 text-[var(--color-text-secondary)]">
                      Recent Rolls
                    </div>
                    {rollHistory.map((roll) => (
                      <div key={roll.timestamp} className="flex justify-between items-center py-1">
                        <span className="text-xs text-[var(--color-text-secondary)]">
                          {roll.notation}
                        </span>
                        <span className="text-sm font-bold">
                          {roll.result}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Regular circle button when no result
              <button
                onClick={handleExpand}
                className="w-16 h-16 rounded-full transition-all hover:scale-110 shadow-lg flex items-center justify-center text-2xl font-bold relative"
                style={{ 
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-accent-text)'
                }}
                title="Open Dice Menu"
              >
                🎲
              </button>
            )}
          </div>
        )}

        {/* Expanded state - compact dice selector */}
        {isExpanded && (
          <div 
            className="w-24 h-full rounded-lg shadow-2xl"
            style={{ 
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)'
            }}
          >
            {/* Close button */}
            <button
              onClick={handleCollapse}
              className="absolute top-2 right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center z-10 transition-colors hover:opacity-80"
              style={{
                backgroundColor: 'var(--color-card-secondary)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)'
              }}
              title="Close menu"
            >
              ×
            </button>

            {/* Dice selector */}
            <div className="h-full w-full">
              <div 
                className="w-full h-full flex flex-col items-center py-4 space-y-4"
                style={{ 
                  backgroundColor: 'var(--color-card)'
                }}
              >

                
                <SimpleDiceSelector 
                  onRoll={handleRollFullscreen} 
                  diceColor={diceColor}
                  setDiceColor={setDiceColor}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Dice Overlay */}
      <FullscreenDiceOverlay
        key={`dice-roll-${fullscreenDiceNotation}`}
        isVisible={showFullscreenRoll}
        diceNotation={fullscreenDiceNotation}
        diceColor={diceColor}
        onRollComplete={handleRollComplete}
        onClose={handleCloseFullscreen}
      />
    </>
  );
} 