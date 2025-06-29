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

// Real Color Wheel Component
function ColorWheel({ currentColor, onColorChange }: { 
  currentColor: string; 
  onColorChange: (color: string) => void; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the color wheel on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw color wheel
    for (let angle = 0; angle < 360; angle++) {
      for (let saturation = 0; saturation < radius; saturation++) {
        const hue = angle;
        const sat = (saturation / radius) * 100;
        const value = 100;
        
        const color = `hsl(${hue}, ${sat}%, ${value}%)`;
        ctx.fillStyle = color;
        
        const x = centerX + saturation * Math.cos(angle * Math.PI / 180);
        const y = centerY + saturation * Math.sin(angle * Math.PI / 180);
        
        ctx.fillRect(x, y, 1, 1);
      }
    }

    // Draw center circle for current color
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = currentColor;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [currentColor]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance <= radius) {
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      const hue = angle < 0 ? angle + 360 : angle;
      const saturation = Math.min((distance / radius) * 100, 100);
      const value = 100;
      
      const newColor = `hsl(${hue}, ${saturation}%, ${value}%)`;
      onColorChange(newColor);
    }
  };

  return (
    <div className="relative">
      <div 
        className="w-8 h-8 rounded-full border-2 border-slate-500 cursor-pointer shadow-lg"
        style={{ backgroundColor: currentColor }}
        onClick={() => setIsOpen(!isOpen)}
        title="Choose dice color"
      />
      
      {/* Real Color Wheel Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-slate-800 rounded-lg p-3 border border-slate-600 shadow-xl z-10">
          <canvas
            ref={canvasRef}
            width={120}
            height={120}
            className="cursor-crosshair"
            onClick={handleCanvasClick}
            title="Click to select color"
          />
          <div className="mt-2 text-center text-xs text-slate-300">
            Click to select color
          </div>
        </div>
      )}
    </div>
  );
}

// 3D Dice Preview Component
function DicePreview({ diceType, diceColor }: { 
  diceType: string; 
  diceColor: string; 
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const diceBoxRef = useRef<DiceBox | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (window.DICE && typeof window.DICE.dice_box === 'function' && containerRef.current && !isInitialized) {
      try {
        // Set dice color
        if (window.DICE.vars) {
          window.DICE.vars.dice_color = diceColor;
        }
        
        // Create a small dice box for preview
        diceBoxRef.current = new window.DICE.dice_box(containerRef.current);
        
        // Set the dice notation (e.g., "1d4", "1d6", etc.)
        diceBoxRef.current.setDice(`1${diceType}`);
        
        // Force a small render to show the dice
        setTimeout(() => {
          try {
            if (diceBoxRef.current) {
              diceBoxRef.current.start_throw();
              setIsInitialized(true);
            }
          } catch (error) {
            console.error(`Failed to render ${diceType} preview:`, error);
          }
        }, 100);
      } catch (error) {
        console.error(`Failed to create ${diceType} preview:`, error);
      }
    }
  }, [diceType, diceColor, isInitialized]);

  return (
    <div 
      ref={containerRef}
      className="w-12 h-12 bg-slate-700 rounded-lg border-2 border-slate-600 overflow-hidden"
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
      {/* Fallback if 3D dice fail to load */}
      {!isInitialized && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
            style={{ backgroundColor: diceColor }}
          >
            {diceType.toUpperCase()}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DiceRoller({ className = "" }: DiceRollerProps) {
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
  const [diceColor, setDiceColor] = useState('#202020');

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

  const addDice = (diceType: keyof typeof diceCounts) => {
    setDiceCounts(prev => {
      const currentTotal = Object.values(prev).reduce((sum, count) => sum + count, 0);
      
      // Check total limit (10 dice max)
      if (currentTotal >= 10) {
        return prev; // Don't allow adding more dice
      }
      
      return {
        ...prev,
        [diceType]: prev[diceType] + 1
      };
    });
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
    
    Object.entries(diceCounts).forEach(([die, count]) => {
      if (count > 0) {
        parts.push(`${count}${die}`);
      }
    });
    
    if (parts.length === 0) return '';
    
    return parts.join('+');
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
    setLastResult(null);
  };

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
              <button
                onClick={() => addDice(dice.key)}
                disabled={totalDice >= 10}
                className="relative w-12 h-12 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110"
                title={`Add ${dice.key.toUpperCase()}`}
              >
                <DicePreview 
                  diceType={dice.key} 
                  diceColor={diceColor} 
                />
                
                {/* Clickable Badge showing count - click to remove */}
                {diceCounts[dice.key] > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeDice(dice.key);
                    }}
                    className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg transition-colors cursor-pointer"
                    title={`Remove ${dice.key.toUpperCase()} (${diceCounts[dice.key]})`}
                  >
                    {diceCounts[dice.key]}
                  </button>
                )}
              </button>
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