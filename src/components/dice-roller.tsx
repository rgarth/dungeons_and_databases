"use client";

import { useState, useEffect, useRef } from 'react';
import iro from '@jaames/iro';

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

// Real Color Wheel Component using iro.js
function ColorWheel({ currentColor, onColorChange }: { 
  currentColor: string; 
  onColorChange: (color: string) => void; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const colorPickerInstanceRef = useRef<ReturnType<typeof iro.ColorPicker> | null>(null);

  useEffect(() => {
    if (isOpen && colorPickerRef.current && !colorPickerInstanceRef.current) {
      // Initialize iro.js color picker
      colorPickerInstanceRef.current = iro.ColorPicker(colorPickerRef.current, {
        width: 150,
        color: currentColor,
        borderWidth: 1,
        borderColor: "#333",
        layout: [
          { 
            component: iro.ui.Wheel,
            options: {}
          },
          { 
            component: iro.ui.Slider,
            options: {
              sliderType: 'value'
            }
          }
        ]
      });

      // Listen for color changes
      colorPickerInstanceRef.current.on('color:change', (color: { hexString: string }) => {
        onColorChange(color.hexString);
      });
    }

    // Cleanup
    return () => {
      if (colorPickerInstanceRef.current) {
        try {
          // Safely remove the color picker element from DOM
          if (colorPickerInstanceRef.current.el && colorPickerInstanceRef.current.el.parentNode) {
            colorPickerInstanceRef.current.el.parentNode.removeChild(colorPickerInstanceRef.current.el);
          }
        } catch (error) {
          // Element might already be removed, ignore the error
          console.warn('Color picker cleanup warning:', error);
        } finally {
          colorPickerInstanceRef.current = null;
        }
      }
    };
  }, [isOpen, currentColor, onColorChange]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
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
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full border-2 border-slate-600 flex items-center justify-center"
        style={{ backgroundColor: currentColor }}
        title="Choose dice color"
      >
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: currentColor }}></div>
      </button>
      
      {isOpen && (
        <div 
          className="fixed z-50 bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg"
          style={{ 
            bottom: '100%', 
            left: '50%', 
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            minWidth: '170px'
          }}
        >
          <div ref={colorPickerRef} className="flex justify-center"></div>
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
  
  // Dice color state
  const [diceColor, setDiceColor] = useState('#9333ea'); // Purple-600 to match app theme

  // Load user's die color preference on component mount
  useEffect(() => {
    const loadUserPreference = async () => {
      try {
        const response = await fetch('/api/user-preferences');
        if (response.ok) {
          const preferences = await response.json();
          if (preferences.dieColor) {
            setDiceColor(preferences.dieColor);
          }
        }
      } catch (error) {
        console.warn('Failed to load user preference:', error);
        // Continue with default color if preference loading fails
      }
    };

    loadUserPreference();
  }, []);

  // Save user's die color preference when it changes
  const saveUserPreference = async (color: string) => {
    try {
      await fetch('/api/user-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dieColor: color }),
      });
    } catch (error) {
      console.warn('Failed to save user preference:', error);
      // Continue even if saving fails
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
        // Load scripts in parallel
        await Promise.all([
          loadScriptAndWait('/three.min.js', () => typeof window !== 'undefined' && !!window.THREE),
          loadScriptAndWait('/cannon.min.js', () => typeof window !== 'undefined' && !!window.CANNON),
          loadScriptAndWait('/dice.js', () => typeof window !== 'undefined' && !!window.DICE)
        ]);
        
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
          
          // Set initial dice color
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
  }, [scriptsLoaded, diceColor]);

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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-2"></div>
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
      <div className="w-20 bg-slate-800 border-r border-slate-600 flex flex-col items-center py-4 space-y-4">
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
      <div className="relative flex-1 bg-slate-900">
        <div 
          ref={diceContainerRef}
          className="absolute inset-0 w-full h-full"
          style={{ 
            minHeight: '480px',
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