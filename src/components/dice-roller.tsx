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

export function DiceRoller({ className = "" }: DiceRollerProps) {
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
  
  const [modifier, setModifier] = useState(0);
  
  // Dice color state
  const [diceColor, setDiceColor] = useState('#202020');

  // Predefined color options
  const colorOptions = [
    { name: 'Dark Gray', value: '#202020', primary: '#202020' },
    { name: 'Royal Blue', value: '#1e40af', primary: '#3b82f6' },
    { name: 'Emerald', value: '#059669', primary: '#10b981' },
    { name: 'Ruby Red', value: '#dc2626', primary: '#ef4444' },
    { name: 'Purple', value: '#7c3aed', primary: '#8b5cf6' },
    { name: 'Orange', value: '#ea580c', primary: '#f97316' },
    { name: 'Rose Gold', value: '#be185d', primary: '#ec4899' },
    { name: 'Teal', value: '#0891b2', primary: '#06b6d4' },
    { name: 'Black', value: '#000000', primary: '#374151' },
    { name: 'Cream', value: '#fffdd0', primary: '#e5e7eb' },
  ];

  // Function to update dice color in the dice.js vars
  const updateDiceColor = (color: string) => {
    setDiceColor(color);
    
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

  // Load the required scripts
  useEffect(() => {
    const loadScriptAndWait = (src: string, globalCheck: () => boolean): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Check if already loaded and available
        if (globalCheck()) {
          console.log(`${src} already available`);
          resolve();
          return;
        }

        // Check if script tag already exists
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          // Script exists but global not available yet, wait for it
          const checkInterval = setInterval(() => {
            if (globalCheck()) {
              clearInterval(checkInterval);
              console.log(`${src} became available`);
              resolve();
            }
          }, 100);
          
          // Timeout after 10 seconds
          setTimeout(() => {
            clearInterval(checkInterval);
            reject(new Error(`Timeout waiting for ${src} to become available`));
          }, 10000);
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          console.log(`Script loaded: ${src}`);
          // Wait for the global to be available
          const checkInterval = setInterval(() => {
            if (globalCheck()) {
              clearInterval(checkInterval);
              console.log(`${src} global available`);
              resolve();
            }
          }, 10);
          
          // Timeout after 5 seconds
          setTimeout(() => {
            clearInterval(checkInterval);
            reject(new Error(`${src} loaded but global not available`));
          }, 5000);
        };
        script.onerror = () => {
          console.error(`Failed to load script: ${src}`);
          reject(new Error(`Failed to load script: ${src}`));
        };
        document.head.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        console.log('Starting to load dice scripts...');
        
        // Load THREE.js and wait for window.THREE
        await loadScriptAndWait('/three.min.js', () => !!window.THREE);
        console.log('THREE.js loaded and available:', !!window.THREE);
        
        // Load Cannon.js and wait for window.CANNON
        await loadScriptAndWait('/cannon.min.js', () => !!window.CANNON);
        console.log('Cannon.js loaded and available:', !!window.CANNON);
        
        // Load dice.js and wait for window.DICE
        await loadScriptAndWait('/dice.js', () => !!window.DICE);
        console.log('Dice.js loaded and available:', !!window.DICE);
        
        setScriptsLoaded(true);
        console.log('All dice scripts loaded successfully');
      } catch (error) {
        console.error('Failed to load dice scripts:', error);
        setInitializationError(`Failed to load scripts: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    loadScripts();
  }, []);

  // Initialize dice box when scripts are loaded
  useEffect(() => {
    if (scriptsLoaded && diceContainerRef.current && !diceBoxRef.current) {
      console.log('Attempting to initialize dice box...');
      
      // Check for required dependencies
      if (!window.THREE) {
        setInitializationError('THREE.js not loaded');
        return;
      }
      
      if (!window.CANNON) {
        setInitializationError('Cannon.js not loaded');
        return;
      }
      
      if (!window.DICE) {
        setInitializationError('DICE library not loaded');
        return;
      }
      
      console.log('All dependencies available, initializing dice box...');
      
      // Add a delay to ensure DOM is ready and container has proper dimensions
      setTimeout(() => {
        if (diceContainerRef.current && window.DICE) {
          try {
            const container = diceContainerRef.current;
            
            // Ensure container has explicit dimensions
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.minHeight = '480px';
            container.style.position = 'relative';
            container.style.display = 'block';
            
                         // Force a layout recalculation
            void container.offsetHeight;
            
            console.log('Container dimensions:', {
              width: container.offsetWidth,
              height: container.offsetHeight,
              clientWidth: container.clientWidth,
              clientHeight: container.clientHeight
            });
            
            // Check if container has proper dimensions
            if (container.clientWidth === 0 || container.clientHeight === 0) {
              console.error('Container has zero dimensions');
              setInitializationError('Container has zero dimensions');
              return;
            }
            
            if (typeof window.DICE.dice_box === 'function') {
              console.log('Creating dice box instance...');
              diceBoxRef.current = new window.DICE.dice_box(container);
              console.log('Dice box initialized successfully:', !!diceBoxRef.current);
              setInitializationError(null);
            } else {
              console.error('window.DICE.dice_box is not a constructor:', typeof window.DICE.dice_box);
              setInitializationError('DICE.dice_box is not a constructor');
            }
          } catch (error) {
            console.error('Failed to initialize dice box:', error);
            setInitializationError(`Initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
        }
      }, 100);
    }
  }, [scriptsLoaded]);

  const updateDiceCount = (diceType: keyof typeof diceCounts, change: number) => {
    setDiceCounts(prev => {
      const newCount = Math.max(0, prev[diceType] + change);
      const currentTotal = Object.values(prev).reduce((sum, count) => sum + count, 0);
      
      // If adding dice, check total limit (10 dice max)
      if (change > 0 && currentTotal >= 10) {
        return prev; // Don't allow adding more dice
      }
      
      return {
        ...prev,
        [diceType]: newCount
      };
    });
  };

  const getTotalDice = () => {
    return Object.values(diceCounts).reduce((sum, count) => sum + count, 0);
  };

  const buildDiceNotation = () => {
    const parts: string[] = [];
    
    Object.entries(diceCounts).forEach(([die, count]) => {
      if (count > 0) {
        parts.push(`${count}${die}`);
      }
    });
    
    if (parts.length === 0) return '';
    
    let notation = parts.join('+');
    
    if (modifier !== 0) {
      notation += modifier > 0 ? `+${modifier}` : `${modifier}`;
    }
    
    return notation;
  };

  const rollDice = () => {
    if (!diceBoxRef.current || isRolling || getTotalDice() === 0) {
      console.log('Cannot roll dice:', {
        diceBoxExists: !!diceBoxRef.current,
        isRolling,
        totalDice: getTotalDice()
      });
      return;
    }

    const notation = buildDiceNotation();
    console.log('Rolling dice with notation:', notation);

    setIsRolling(true);
    setLastResult(null);

    try {
      diceBoxRef.current.setDice(notation);
      diceBoxRef.current.start_throw(
        undefined, // beforeRoll callback
        (result: DiceResult) => {
          console.log('Roll completed:', result);
          setLastResult(result);
          setIsRolling(false);
        }
      );
    } catch (error) {
      console.error('Failed to roll dice:', error);
      setIsRolling(false);
      setInitializationError(`Roll failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
    setModifier(0);
    setLastResult(null);
  };

  const diceTypes = [
    { key: 'd4' as const, label: 'D4', color: 'text-red-400' },
    { key: 'd6' as const, label: 'D6', color: 'text-blue-400' },
    { key: 'd8' as const, label: 'D8', color: 'text-green-400' },
    { key: 'd10' as const, label: 'D10', color: 'text-yellow-400' },
    { key: 'd12' as const, label: 'D12', color: 'text-purple-400' },
    { key: 'd20' as const, label: 'D20', color: 'text-pink-400' },
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
    <div className={`h-full flex flex-col ${className}`}>
      {/* Top Controls Bar - Tile Layout */}
      <div className="bg-slate-800 border-b border-slate-600 p-4">
        {/* Dice Tiles Grid - Responsive: 3 cols on mobile, 6 on desktop */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-4">
          {diceTypes.map(dice => (
            <div key={dice.key} className="bg-slate-700 rounded-lg p-2 md:p-3 text-center border border-slate-600">
              {/* Dice Label */}
              <div className={`font-bold text-sm md:text-lg ${dice.color} mb-1 md:mb-2`}>
                {dice.label}
              </div>
              
              {/* Count Display */}
              <div className="text-white font-mono text-lg md:text-xl mb-2 md:mb-3">
                {diceCounts[dice.key]}
              </div>
              
              {/* Control Buttons */}
              <div className="flex gap-1">
                <button
                  onClick={() => updateDiceCount(dice.key, -1)}
                  disabled={diceCounts[dice.key] === 0}
                  className="flex-1 h-7 md:h-8 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded text-xs md:text-sm font-bold transition-colors"
                >
                  −
                </button>
                <button
                  onClick={() => updateDiceCount(dice.key, 1)}
                  disabled={totalDice >= 10}
                  className="flex-1 h-7 md:h-8 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded text-xs md:text-sm font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Color Selector */}
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <span className="text-slate-300 text-sm font-medium">Dice Color:</span>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => updateDiceColor(color.value)}
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-2 transition-all hover:scale-110 ${
                    diceColor === color.value 
                      ? 'border-white shadow-lg ring-2 ring-blue-400' 
                      : 'border-slate-500 hover:border-slate-300'
                  }`}
                  style={{ backgroundColor: color.primary }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Controls - Stack on mobile */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Modifier */}
          <div className="flex items-center gap-2">
            <span className="text-slate-300 text-sm font-medium">Modifier:</span>
            <button
              onClick={() => setModifier(prev => Math.max(-99, prev - 1))}
              className="w-8 h-8 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm font-bold transition-colors"
            >
              −
            </button>
            <span className="w-12 text-center text-white font-mono text-lg bg-slate-700 rounded px-2 py-1">
              {modifier >= 0 ? `+${modifier}` : modifier}
            </span>
            <button
              onClick={() => setModifier(prev => Math.min(99, prev + 1))}
              className="w-8 h-8 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm font-bold transition-colors"
            >
              +
            </button>
          </div>
          
          {/* Status Display */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {/* Total Dice Counter */}
            <span className={`text-sm font-medium px-3 py-2 rounded ${
              totalDice >= 10 ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'
            }`}>
              {totalDice}/10 dice
            </span>
            
            {/* Notation Preview */}
            {notation && (
              <span className="text-slate-300 text-sm font-mono bg-slate-700 px-3 py-2 rounded break-all">
                {notation}
              </span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={rollDice}
              disabled={isRolling || totalDice === 0 || !diceBoxRef.current}
              className={`py-2 md:py-3 px-4 md:px-8 rounded-lg font-bold text-sm md:text-lg transition-colors flex-1 sm:flex-none ${
                isRolling || totalDice === 0 || !diceBoxRef.current
                  ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
              }`}
            >
              {isRolling ? 'Rolling...' : totalDice === 0 ? 'Select Dice' : !diceBoxRef.current ? 'Loading...' : '🎲 ROLL'}
            </button>
            
            <button
              onClick={clearAll}
              disabled={totalDice === 0 && modifier === 0}
              className="py-2 md:py-3 px-3 md:px-4 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm md:text-base"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* 3D Dice Container - Clean Tabletop */}
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
                {lastResult.constant !== 0 && ` (${lastResult.constant >= 0 ? '+' : ''}${lastResult.constant})`}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 