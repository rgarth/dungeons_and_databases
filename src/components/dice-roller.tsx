"use client";

import { useState, useEffect, useRef } from 'react';

// Declare global objects for TypeScript
declare global {
  interface Window {
    DICE: {
      dice_box: new (element: HTMLElement) => {
        setDice: (notation: string) => void;
        start_throw: (beforeRoll?: ((notation: DiceResult) => number[] | null), afterRoll?: (notation: DiceResult) => void) => void;
        bind_swipe: (element: HTMLElement, beforeRoll?: ((notation: DiceResult) => number[] | null), afterRoll?: (notation: DiceResult) => void) => void;
      };
      vars?: {
        dice_color: string;
        label_color: string;
      };
      clearMaterialCache?: () => void;
    };
    THREE: Record<string, unknown>;
    CANNON: Record<string, unknown>;
  }
}

interface DiceRollerProps {
  className?: string;
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
        className="w-8 h-8 rounded-full border-2 border-slate-600 flex items-center justify-center"
        style={{ backgroundColor: currentColor }}
        title="Choose dice color"
      >
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: currentColor }}></div>
      </button>
      
      {isOpen && (
        <div 
          ref={pickerRef}
          className="fixed z-50 bg-slate-800 border border-slate-600 rounded-lg p-4 shadow-lg"
          style={{ 
            top: pickerPosition.top,
            left: pickerPosition.left,
            minWidth: '180px'
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-white transition-colors p-1 rounded"
            title="Close color picker"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          
          {/* Reset button */}
          <button
            onClick={() => handleColorSelect('#7c3aed')}
            className="absolute top-2 left-2 text-slate-400 hover:text-purple-400 transition-colors p-1 rounded"
            title="Reset to DNDB purple"
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
            <h3 className="text-sm text-slate-300 mb-3 text-center">Choose Color</h3>
            <div className="flex justify-center">
              <div 
                className="relative rounded-full border-2 border-slate-600 cursor-pointer"
                style={{ 
                  width: '120px', 
                  height: '120px',
                  background: 'conic-gradient(from 0deg, #ff0000 0deg, #ff8000 30deg, #ffff00 60deg, #80ff00 90deg, #00ff00 120deg, #00ff80 150deg, #00ffff 180deg, #0080ff 210deg, #0000ff 240deg, #8000ff 270deg, #ff00ff 300deg, #ff0080 330deg, #ff0000 360deg)',
                  padding: '8px'
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
                  className="absolute inset-8 rounded-full border-2 border-white bg-slate-800 flex items-center justify-center"
                  style={{ backgroundColor: currentColor }}
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: currentColor }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Brightness Slider */}
          <div className="mb-3">
            <label className="text-sm text-slate-300">Brightness</label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={getCurrentLightness()}
                onChange={handleBrightnessChange}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #000, ${getBaseColor(currentColor)}, #fff)`
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
  return (
    <div 
      className="w-12 h-12 bg-slate-700 rounded-lg border-2 border-slate-600 overflow-hidden flex items-center justify-center"
      style={{ 
        minHeight: '48px',
        width: '48px',
        height: '48px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
        backgroundColor: '#1e293b'
      }}
    >
      {/* Simple colored square with dice type label */}
      <div 
        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg"
        style={{ 
          backgroundColor: diceColor,
          width: '32px',
          height: '32px',
          fontSize: '10px',
          lineHeight: '1'
        }}
      >
        {diceType.toUpperCase()}
      </div>
    </div>
  );
}

export default function DiceRoller({ className = "" }: DiceRollerProps) {
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
  
  // Get initial dice color from cookie or default to purple-600
  const getInitialDiceColor = () => {
    try {
      const savedColor = document.cookie
        .split('; ')
        .find(row => row.startsWith('diceColor='))
        ?.split('=')[1];
      
      return savedColor || '#9333ea'; // Purple-600 default
    } catch (error) {
      console.warn('Failed to load dice color preference from cookie:', error);
      return '#9333ea'; // Purple-600 default
    }
  };

  // Dice color state - initialize with cookie value or default
  const [diceColor, setDiceColor] = useState(getInitialDiceColor());

  // Save user's die color preference to cookie when it changes
  const saveUserPreference = (color: string) => {
    try {
      // Set cookie to expire in 1 year
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      document.cookie = `diceColor=${color}; expires=${expires.toUTCString()}; path=/`;
    } catch (error) {
      console.warn('Failed to save dice color preference to cookie:', error);
      // Continue even if cookie saving fails
    }
  };

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

    const handleResize = () => {
      if (diceBoxRef.current && diceContainerRef.current) {
        // Reinitialize dice box on resize
        try {
          console.log('🎲 Reinitializing dice box on resize...');
          diceBoxRef.current = new window.DICE.dice_box(diceContainerRef.current);
          
          // Set current dice color
          if (window.DICE && window.DICE.vars) {
            window.DICE.vars.dice_color = diceColor;
            const isDark = isColorDark(diceColor);
            window.DICE.vars.label_color = isDark ? '#ffffff' : '#000000';
          }
        } catch (error) {
          console.error('Failed to initialize dice box:', error);
          setInitializationError('Failed to initialize 3D dice');
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
    };
  }, [scriptsLoaded]); // Remove diceColor dependency to prevent reinitialization

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
  };

  const updateDiceColor = (color: string) => {
    setDiceColor(color);
    
    // Save the color preference to the database
    saveUserPreference(color);
    
    // Update the global dice.js color variables if they exist
    if (typeof window !== 'undefined' && window.DICE && window.DICE.vars) {
      window.DICE.vars.dice_color = color;
      // Optionally adjust label color for contrast
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
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
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
        <div className="text-slate-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-2" style={{ borderColor: 'var(--color-accent)' }}></div>
          <div>Loading dice roller...</div>
        </div>
      </div>
    );
  }

  if (initializationError) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="text-red-400 text-center">
          <div className="text-lg mb-2">⚠️</div>
          <div>Dice roller failed to initialize</div>
          <div className="text-xs mt-2 text-slate-400">{initializationError}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
      {/* Thin Vertical Dice Selector */}
      <div className="w-20 bg-slate-800 border-r border-slate-600 flex flex-col items-center py-4 space-y-4 flex-shrink-0">
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
                    className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg transition-colors cursor-pointer z-10"
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
          <span className="text-slate-300 text-xs font-medium">Color</span>
          <ColorWheel currentColor={diceColor} onColorChange={updateDiceColor} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2 mt-auto">
          <button
            onClick={rollDice}
            disabled={isRolling || totalDice === 0 || !diceBoxRef.current}
            className={`w-12 h-12 rounded-lg font-bold text-lg transition-colors shadow-lg ${
              isRolling || totalDice === 0 || !diceBoxRef.current
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
            title="Roll dice"
          >
            {isRolling ? '...' : '🎲'}
          </button>
          
          <button
            onClick={clearAll}
            disabled={totalDice === 0}
            className="w-12 h-8 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-xs shadow-lg"
            title="Clear all"
          >
            Clear
          </button>
        </div>

        {/* Total Dice Counter */}
        <div className="text-slate-300 text-xs text-center">
          {totalDice}/10
        </div>
      </div>

      {/* 3D Dice Container */}
      <div className="relative flex-1 bg-slate-900 min-h-0">
        <div 
          ref={diceContainerRef}
          className="absolute inset-0 w-full h-full"
          style={{ 
            background: diceBoxRef.current ? 'transparent' : '#1e293b'
          }}
        >
          {/* Fallback content when dice box not loaded */}
          {!diceBoxRef.current && !initializationError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-slate-400 text-center">
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
          <div className="absolute bottom-4 right-4 bg-slate-800/95 rounded-lg p-4 backdrop-blur-sm border border-slate-600 max-w-xs">
            <div className="text-slate-300 text-sm font-medium mb-1">Results:</div>
            <div className="text-white">
              <div className="text-xl font-bold text-green-400 mb-1">
                Total: {lastResult.resultTotal}
              </div>
              <div className="text-sm text-slate-300">{lastResult.resultString}</div>
              <div className="text-xs text-slate-400 mt-1">
                Dice: {lastResult.set.join(', ')}
              </div>
            </div>
          </div>
        )}

        {/* Notation Display - Top Left */}
        {notation && (
          <div className="absolute top-4 left-4 bg-slate-800/95 rounded-lg p-3 backdrop-blur-sm border border-slate-600">
            <div className="text-slate-300 text-sm font-mono">
              {notation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 