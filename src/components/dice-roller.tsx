"use client";

import { useState, useEffect, useRef } from 'react';

// Declare global objects for TypeScript
declare global {
  interface Window {
    DICE: {
      dice_box: new (element: HTMLElement) => DiceBox;
      vars?: {
        dice_color: string;
        label_color: string;
        desk_opacity?: number;
        desk_color?: string;
      };
      clearMaterialCache?: () => void;
    };
    THREE: Record<string, unknown>;
    CANNON: Record<string, unknown>;
  }
}

interface DiceRollerProps {
  className?: string;
  onFullscreenRoll?: (notation: string) => void;
  hideCanvas?: boolean;
}

interface DiceResult {
  set: string[];
  constant: number;
  result: number[];
  resultTotal: number;
  resultString: string;
  error: boolean;
}

interface DiceBox {
  setDice: (notation: string) => void;
  start_throw: (beforeRoll?: ((notation: DiceResult) => number[] | null), afterRoll?: (notation: DiceResult) => void) => void;
  bind_swipe: (element: HTMLElement, beforeRoll?: ((notation: DiceResult) => number[] | null), afterRoll?: (notation: DiceResult) => void) => void;
  reinit: (container: HTMLElement) => void;
}

// Custom Color Picker Component - Hexagonal Style
function ColorWheel({ currentColor, onColorChange }: { 
  currentColor: string; 
  onColorChange: (color: string) => void; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Get current color (simplified to just use hex)
  const getBaseColor = (color: string) => {
    return color;
  };

  // Handle color selection
  const handleColorSelect = (color: string) => {
    console.log('handleColorSelect called with:', color);
    onColorChange(color);
  };

  // Handle brightness/lightness change
  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const brightness = parseInt(e.target.value);
    try {
      // Convert current color to HSL, change lightness, convert back to hex
      const hslColor = hexToHsl(currentColor);
      const newHslColor = { ...hslColor, l: brightness };
      const newHexColor = hslToHex(newHslColor.h, newHslColor.s, newHslColor.l);
      onColorChange(newHexColor);
    } catch (error) {
      console.warn('Failed to adjust brightness for color:', currentColor, error);
    }
  };

  // Convert hex to HSL
  const hexToHsl = (hex: string) => {
    // Ensure hex is valid
    if (!hex || !hex.startsWith('#') || hex.length !== 7) {
      throw new Error(`Invalid hex color: ${hex}`);
    }
    
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    // Check for invalid values
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

  // Convert HSL to hex
  const hslToHex = (h: number, s: number, l: number) => {
    // Normalize hue to 0-360 range
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

  // Get current lightness value for brightness slider
  const getCurrentLightness = () => {
    try {
      const hsl = hexToHsl(currentColor);
      return hsl.l;
    } catch (error) {
      console.warn('Failed to parse color for lightness:', currentColor, error);
      return 50; // Default to 50% lightness
    }
  };

  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      // Calculate position above the button
      let top = rect.top - 320; // Larger for enhanced picker
      let left = rect.left - 75; // Center horizontally
      
      // Ensure picker doesn't go off-screen
      if (top < 10) {
        top = 10;
      }
      if (left < 20) {
        left = 20;
      }
      if (left + 150 > viewportWidth - 20) {
        left = viewportWidth - 170;
      }
      
      setPickerPosition({ top, left });
    }
    setIsOpen(!isOpen);
  };

  // Handle click outside to close picker
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
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 transition-colors p-1 rounded"
            style={{ 
              color: 'var(--color-text-secondary)'
            }}
            title="Close color picker"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          
          {/* Reset button */}
          <button
            onClick={() => {
              const defaultColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--color-dice-default')
                .trim();
              handleColorSelect(defaultColor || '#dc2626');
            }}
            className="absolute top-2 left-2 transition-colors p-1 rounded"
            style={{ 
              color: 'var(--color-text-secondary)'
            }}
            title="Reset to default red"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
          </button>
          
          {/* Gradient Color Wheel */}
          <div className="mb-4">
            <h3 className="text-sm mb-3 text-center" style={{ color: 'var(--color-text-secondary)' }}>Choose Color</h3>
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
                  
                  // Calculate angle from top (0°) clockwise to match the gradient
                  // The gradient starts at 0° (red) at the top and goes clockwise
                  const angle = Math.atan2(x, -y) * 180 / Math.PI;
                  const normalizedAngle = (angle + 360) % 360;
                  const hue = normalizedAngle;
                  
                  console.log('Color wheel click:', { x, y, angle, normalizedAngle, hue });
                  
                  // Convert directly to hex using the hslToHex function
                  const hexColor = hslToHex(hue, 100, 50);
                  console.log('Selected color:', hexColor);
                  console.log('Expected colors for reference:');
                  console.log('  Red (0°):', hslToHex(0, 100, 50));
                  console.log('  Green (120°):', hslToHex(120, 100, 50));
                  console.log('  Blue (240°):', hslToHex(240, 100, 50));
                  handleColorSelect(hexColor);
                }}
                title="Click to select color"
              >
                {/* Center indicator */}
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

          {/* Brightness Slider */}
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
                  background: `linear-gradient(to right, #000, ${getBaseColor(currentColor)}, #fff)`,
                  backgroundColor: 'var(--color-card-secondary)'
                }}
              />
            </div>
          </div>
          

        </div>
      )}
    </div>
  );
}

// 3D Dice Preview Component - Simplified to avoid tiny dice issues
function DicePreview({ diceType, diceColor }: { 
  diceType: string; 
  diceColor: string; 
}) {
  // Determine text color based on dice color lightness (HSL)
  const isColorDark = (color: string): boolean => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const lightness = (max + min) / 2;
    
    // Switch to white text when lightness is below 50%
    return lightness < 0.5;
  };

  const textColor = isColorDark(diceColor) ? '#ffffff' : '#000000';

  return (
    <div 
      className="w-12 h-12 rounded-lg border-2 overflow-hidden flex items-center justify-center"
      style={{ 
        minHeight: '48px',
        width: '48px',
        height: '48px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
        backgroundColor: 'var(--color-card)',
        borderColor: 'var(--color-border)'
      }}
    >
      {/* Simple colored square with dice type label */}
      <div 
        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-lg"
        style={{ 
          backgroundColor: diceColor,
          width: '32px',
          height: '32px',
          fontSize: '10px',
          lineHeight: '1',
          color: textColor
        }}
      >
        {diceType.toUpperCase()}
      </div>
    </div>
  );
}

export default function DiceRoller({ className = "", onFullscreenRoll, hideCanvas }: DiceRollerProps) {
  console.log('🎲 DiceRoller component rendered');
  
  const diceContainerRef = useRef<HTMLDivElement>(null);
  const diceBoxRef = useRef<DiceBox | null>(null);
  const [lastResult, setLastResult] = useState<DiceResult | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [initializationError, setInitializationError] = useState<string | null>(null);
  
  // Individual dice counts (max 6 each)
  const [diceCounts, setDiceCounts] = useState({
    d4: 0,
    d6: 0,
    d8: 0,
    d10: 0,
    d12: 0,
    d20: 0,
  });
  
  // Get initial dice color from cookie or default to theme red
  const getInitialDiceColor = () => {
    try {
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
    } catch (error) {
      console.warn('Failed to load dice color preference from cookie:', error);
      return '#dc2626'; // Fallback to red
    }
  };

  // Dice color state - initialize with cookie value or default
  const [diceColor, setDiceColor] = useState(getInitialDiceColor());
  const [userHasCustomizedColor, setUserHasCustomizedColor] = useState(false);

  // Save user's die color preference to cookie when it changes
  const saveUserPreference = (color: string) => {
    try {
      // Set cookie to expire in 1 year
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      document.cookie = `diceColor=${color}; expires=${expires.toUTCString()}; path=/`;
      document.cookie = `diceColorCustomized=true; expires=${expires.toUTCString()}; path=/`;
      setUserHasCustomizedColor(true);
    } catch (error) {
      console.warn('Failed to save dice color preference to cookie:', error);
      // Continue even if cookie saving fails
    }
  };

  // Check if user has customized dice color
  useEffect(() => {
    try {
      const hasCustomized = document.cookie
        .split('; ')
        .find(row => row.startsWith('diceColorCustomized='))
        ?.split('=')[1];
      
      setUserHasCustomizedColor(hasCustomized === 'true');
    } catch (error) {
      console.warn('Failed to check dice color customization status:', error);
    }
  }, []);

  // Listen for theme changes and update dice color if user hasn't customized
  useEffect(() => {
    const handleThemeChange = () => {
      if (!userHasCustomizedColor) {
        // Get the current theme's default dice color
        const defaultColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--color-dice-default')
          .trim();
        
        if (defaultColor && defaultColor !== diceColor) {
          console.log('🎲 Theme changed, updating dice color to:', defaultColor);
          setDiceColor(defaultColor);
        }
      }
    };

    // Listen for theme class changes on the document element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          handleThemeChange();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [userHasCustomizedColor, diceColor]);

  // Load 3D dice scripts
  useEffect(() => {
    console.log('🎲 useEffect triggered - about to load scripts');
    
    const loadScriptAndWait = (src: string, globalCheck: () => boolean): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Check if already loaded
        if (globalCheck()) {
          resolve();
          return;
        }

        // Check if script is already being loaded
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          // Wait for existing script to load
          const checkInterval = setInterval(() => {
            if (globalCheck()) {
              clearInterval(checkInterval);
              resolve();
            }
          }, 100);
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        
        script.onload = () => {
          // Wait a bit for the global object to be available
          const checkInterval = setInterval(() => {
            if (globalCheck()) {
              clearInterval(checkInterval);
              resolve();
            }
          }, 100);
          
          // Timeout after 5 seconds
          setTimeout(() => {
            clearInterval(checkInterval);
            reject(new Error(`Timeout waiting for ${src} to initialize`));
          }, 5000);
        };
        
        script.onerror = (error) => {
          console.error(`🎲 Script loading error for ${src}:`, error);
          reject(new Error(`Failed to load ${src}`));
        };
        
        document.head.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        console.log('🎲 Starting to load dice scripts...');
        // Load scripts sequentially to ensure dependencies are met
        console.log('🎲 Loading THREE.js...');
        await loadScriptAndWait('/three.min.js', () => typeof window !== 'undefined' && !!window.THREE);
        
        console.log('🎲 Loading CANNON.js...');
        await loadScriptAndWait('/cannon.min.js', () => typeof window !== 'undefined' && !!window.CANNON);
        
        console.log('🎲 Loading DICE.js...');
        await loadScriptAndWait('/dice.js', () => typeof window !== 'undefined' && !!window.DICE);
        
        console.log('🎲 All dice scripts loaded successfully');
        console.log('🎲 THREE.js available:', typeof window !== 'undefined' && !!window.THREE);
        console.log('🎲 CANNON.js available:', typeof window !== 'undefined' && !!window.CANNON);
        console.log('🎲 DICE.js available:', typeof window !== 'undefined' && !!window.DICE);
        
        setScriptsLoaded(true);
      } catch (error) {
        console.error('Failed to load dice scripts:', error);
        setInitializationError(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    loadScripts();
  }, []);

  // Initialize 3D dice box
  useEffect(() => {
    if (!scriptsLoaded || !diceContainerRef.current) {
      console.log('🎲 Waiting for scripts or container:', { scriptsLoaded, hasContainer: !!diceContainerRef.current });
      return;
    }

    console.log('🎲 Initializing 3D dice box...');

    // Don't initialize if canvas is hidden
    if (hideCanvas) {
      console.log('🎲 Canvas hidden, skipping dice box initialization');
      return;
    }

    const handleResize = () => {
      if (diceBoxRef.current && diceContainerRef.current) {
        // Use the existing dice box's reinit method instead of creating a new instance
        try {
          console.log('🎲 Reinitializing dice box on resize...');
          diceBoxRef.current.reinit(diceContainerRef.current);
        } catch (error) {
          console.error('Failed to reinitialize dice box:', error);
          // If reinit fails, try to create a new instance as fallback
          try {
            console.log('🎲 Fallback: Creating new dice box instance...');
          diceBoxRef.current = new window.DICE.dice_box(diceContainerRef.current);
          
          // Set current dice color
          if (window.DICE && window.DICE.vars) {
            window.DICE.vars.dice_color = diceColor;
            const isDark = isColorDark(diceColor);
            window.DICE.vars.label_color = isDark ? '#ffffff' : '#000000';
          }
          } catch (fallbackError) {
            console.error('Failed to create new dice box instance:', fallbackError);
          setInitializationError('Failed to initialize 3D dice');
          }
        }
      }
    };

    // Initialize dice box
    try {
      console.log('🎲 Creating new dice box instance...');
      diceBoxRef.current = new window.DICE.dice_box(diceContainerRef.current);
      
      // Set initial dice color
      if (window.DICE && window.DICE.vars) {
        window.DICE.vars.dice_color = diceColor;
        const isDark = isColorDark(diceColor);
        window.DICE.vars.label_color = isDark ? '#ffffff' : '#000000';
      }
      
      console.log('🎲 Dice box initialized successfully');
    } catch (error) {
      console.error('Failed to initialize dice box:', error);
      setInitializationError('Failed to initialize 3D dice');
    }

    // Handle window resize
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      // Clean up dice box reference
      diceBoxRef.current = null;
    };
  }, [scriptsLoaded, hideCanvas, diceColor]); // Add diceColor dependency

  // Reset state when component mounts
  useEffect(() => {
    resetState();
  }, []);

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      // Reset state when component unmounts
      setLastResult(null);
      setIsRolling(false);
      diceBoxRef.current = null;
    };
  }, []);

  // Update dice color without reinitializing
  useEffect(() => {
    if (diceBoxRef.current && window.DICE && window.DICE.vars) {
      console.log('🎲 Updating dice color to:', diceColor);
      window.DICE.vars.dice_color = diceColor;
      const isDark = isColorDark(diceColor);
      window.DICE.vars.label_color = isDark ? '#ffffff' : '#000000';
    }
  }, [diceColor]);

  const addDice = (diceType: keyof typeof diceCounts) => {
    if (getTotalDice() >= 10) return;
    setDiceCounts(prev => ({
      ...prev,
      [diceType]: Math.min(prev[diceType] + 1, 6)
    }));
  };

  const removeDice = (diceType: keyof typeof diceCounts) => {
    setDiceCounts(prev => ({
      ...prev,
      [diceType]: Math.max(prev[diceType] - 1, 0)
    }));
  };

  const getTotalDice = () => {
    return Object.values(diceCounts).reduce((sum, count) => sum + count, 0);
  };

  const buildDiceNotation = () => {
    const parts: string[] = [];
    diceTypes.forEach(dice => {
      if (diceCounts[dice.key] > 0) {
        parts.push(`${diceCounts[dice.key]}${dice.key}`);
      }
    });
    return parts.join(' + ');
  };

  const rollDice = () => {
    if (!diceBoxRef.current || isRolling || getTotalDice() === 0) return;

    const notation = buildDiceNotation();
    if (!notation) return;

    setIsRolling(true);
    setLastResult(null);

    try {
      diceBoxRef.current.setDice(notation);
      diceBoxRef.current.start_throw(
        undefined, // beforeRoll
        (result: DiceResult) => {
          setLastResult(result);
          setIsRolling(false);
        }
      );
    } catch (error) {
      console.error('Error rolling dice:', error);
      setIsRolling(false);
    }
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
    setLastResult(null);
    setIsRolling(false);
  };

  // Reset function to clear all state
  const resetState = () => {
    setDiceCounts({
      d4: 0,
      d6: 0,
      d8: 0,
      d10: 0,
      d12: 0,
      d20: 0,
    });
    setLastResult(null);
    setIsRolling(false);
    setInitializationError(null);
  };

  const updateDiceColor = (color: string) => {
    setDiceColor(color);
    
    // Save the color preference to the database
    saveUserPreference(color);
    
    // Update the global dice.js color variables if they exist
    if (typeof window !== 'undefined' && window.DICE && window.DICE.vars) {
      window.DICE.vars.dice_color = color;
      const isDark = isColorDark(color);
      window.DICE.vars.label_color = isDark ? '#ffffff' : '#000000';
      
      // Clear material cache so new dice use the updated colors
      if (window.DICE.clearMaterialCache) {
        window.DICE.clearMaterialCache();
      }
    }
  };

  // Helper function to determine if a color is dark
  const isColorDark = (color: string): boolean => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const lightness = (max + min) / 2;
    
    // Switch to white text when lightness is below 50%
    return lightness < 0.5;
  };

  const diceTypes = [
    { key: 'd4' as const, sides: 4 },
    { key: 'd6' as const, sides: 6 },
    { key: 'd8' as const, sides: 8 },
    { key: 'd10' as const, sides: 10 },
    { key: 'd12' as const, sides: 12 },
    { key: 'd20' as const, sides: 20 },
  ];

  if (!scriptsLoaded) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div style={{ color: 'var(--color-text-secondary)' }}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-2" style={{ borderColor: 'var(--color-accent)' }}></div>
          <div>Loading dice roller...</div>
        </div>
      </div>
    );
  }

  if (initializationError) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="text-center" style={{ color: 'var(--color-error)' }}>
          <div className="text-lg mb-2">⚠️</div>
          <div>Dice roller failed to initialize</div>
          <div className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>{initializationError}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 rounded"
            style={{ 
              backgroundColor: 'var(--color-error)',
              color: 'var(--color-error-text)'
            }}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  const totalDice = getTotalDice();
  const notation = buildDiceNotation();

  return (
    <div className={`h-full flex ${className}`}>
            {/* Vertical Dice Selector */}
      <div className="w-20 flex flex-col items-center py-4 space-y-4 flex-shrink-0" style={{ backgroundColor: 'var(--color-card)', borderRight: '1px solid var(--color-border)' }}>
        {/* Dice Selector */}
        <div className="flex flex-col space-y-3">
          {diceTypes.map(dice => (
            <div key={dice.key} className="flex flex-col items-center">
              {/* 3D Dice Preview with Clickable Badge */}
              <div className="relative">
                <button
                  onClick={() => addDice(dice.key)}
                  disabled={totalDice >= 10}
                  className="w-12 h-12 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110"
                  title={`Add ${dice.key.toUpperCase()}`}
                >
                  <DicePreview 
                    diceType={dice.key} 
                    diceColor={diceColor} 
                  />
                </button>
                
                {/* Clickable Badge showing count - click to remove */}
                {diceCounts[dice.key] > 0 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Double-check that the dice count is still valid before removing
                      if (diceCounts[dice.key] > 0) {
                        removeDice(dice.key);
                      }
                    }}
                    onMouseDown={(e) => {
                      // Prevent the parent button from being triggered
                      e.stopPropagation();
                    }}
                    className="absolute -top-1 -right-1 text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-lg transition-colors cursor-pointer z-10"
                    style={{ 
                      backgroundColor: 'var(--color-danger)',
                      color: 'var(--color-danger-text)'
                    }}
                    title={`Remove ${dice.key.toUpperCase()} (${diceCounts[dice.key]})`}
                    disabled={diceCounts[dice.key] <= 0}
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

        {/* Single Roll Button - Always Fullscreen */}
        <div className="flex flex-col space-y-2 mt-auto">
          <button
            onClick={() => onFullscreenRoll ? onFullscreenRoll(notation) : rollDice()}
            disabled={isRolling || totalDice === 0}
            className="w-12 h-12 rounded-lg font-bold text-lg transition-colors shadow-lg"
            style={{
              backgroundColor: isRolling || totalDice === 0
                ? 'var(--color-card-secondary)' 
                : 'var(--color-accent)',
              color: isRolling || totalDice === 0
                ? 'var(--color-text-muted)' 
                : 'var(--color-accent-text)'
            }}
            title="Roll dice fullscreen"
          >
            {isRolling ? '...' : '🎲'}
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

      {/* 3D Dice Container - Only show if not hidden */}
      {!hideCanvas && (
        <div className="relative flex-1 min-h-0" style={{ 
          background: 'var(--color-dice-canvas-bg)'
        }}>
          <div 
            ref={diceContainerRef}
            className="absolute inset-0 w-full h-full"
            style={{ 
              background: diceBoxRef.current ? 'transparent' : 'var(--color-card)'
            }}
          >
            {/* Fallback content when dice box not loaded */}
            {!diceBoxRef.current && !initializationError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center" style={{ color: 'var(--color-text-secondary)' }}>
                  <div className="text-lg mb-2">🎲</div>
                  <div>3D Dice Initializing...</div>
                  <div className="text-xs mt-2">
                    Dependencies: {window.THREE ? '✓' : '✗'} THREE.js, {window.CANNON ? '✓' : '✗'} Cannon.js, {window.DICE ? '✓' : '✗'} Dice.js
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Results Display - Bottom Right Corner */}
          {lastResult && (
            <div className="absolute bottom-4 right-4 rounded-lg p-4 backdrop-blur-sm max-w-xs" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
              <div className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>Results:</div>
              <div style={{ color: 'var(--color-text-primary)' }}>
                <div className="text-xl font-bold mb-1" style={{ color: 'var(--color-success)' }}>
                  Total: {lastResult.resultTotal}
                </div>
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{lastResult.resultString}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  Dice: {lastResult.set.join(', ')}
                </div>
              </div>
            </div>
          )}

          {/* Notation Display - Top Left */}
          {notation && (
            <div className="absolute top-4 left-4 rounded-lg p-3 backdrop-blur-sm" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
              <div className="text-sm font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                {notation}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results and Notation Display when canvas is hidden */}
      {hideCanvas && (
        <div className="flex-1 p-4 space-y-4">
          {/* Notation Display */}
          {notation && (
            <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
              <div className="text-sm font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                {notation}
              </div>
            </div>
          )}
          
          {/* Results Display */}
          {lastResult && (
            <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
              <div className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>Results:</div>
              <div style={{ color: 'var(--color-text-primary)' }}>
                <div className="text-xl font-bold mb-1" style={{ color: 'var(--color-success)' }}>
                  Total: {lastResult.resultTotal}
                </div>
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{lastResult.resultString}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  Dice: {lastResult.set.join(', ')}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 