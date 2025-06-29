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
    const radius = Math.min(centerX, centerY) - 5;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw color wheel
    for (let angle = 0; angle < 360; angle++) {
      for (let saturation = 0; saturation < radius; saturation++) {
        const hue = angle;
        const sat = (saturation / radius) * 100;
        const val = 100;
        
        const color = `hsl(${hue}, ${sat}%, ${val}%)`;
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(centerX, centerY, saturation, angle * Math.PI / 180, (angle + 1) * Math.PI / 180);
        ctx.lineTo(centerX, centerY);
        ctx.fill();
      }
    }

    // Draw center circle with current color
    ctx.fillStyle = currentColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw white border around center
    ctx.strokeStyle = 'white';
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
    const radius = Math.min(centerX, centerY) - 5;
    
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
        style={{
          background: `conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)`
        }}
        onClick={() => setIsOpen(!isOpen)}
        title="Select dice color"
      />
      
      {isOpen && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-600 shadow-xl">
            <canvas
              ref={canvasRef}
              width={120}
              height={120}
              className="cursor-crosshair"
              onClick={handleCanvasClick}
              title="Click to select color"
            />
            <div className="text-center text-xs text-slate-300 mt-2">
              Click to select
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
        style={{ backgroundColor: diceColor }}
      >
        {diceType.toUpperCase()}
      </div>
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
      const container = diceContainerRef.current;
      
      if (window.DICE && typeof window.DICE.dice_box === 'function') {
        try {
          // Give the container explicit dimensions like the original working version
          container.style.width = '100%';
          container.style.height = '100%';
          container.style.minHeight = '400px';
          container.style.position = 'relative';
          
          console.log('Container dimensions:', {
            width: container.offsetWidth,
            height: container.offsetHeight,
            clientWidth: container.clientWidth,
            clientHeight: container.clientHeight
          });
          
          // Set initial dice color
          if (window.DICE.vars) {
            window.DICE.vars.dice_color = diceColor;
            window.DICE.vars.label_color = '#ffffff';
          }
          
          // Create dice box
          diceBoxRef.current = new window.DICE.dice_box(container);
          
          // Set initial dice to show something
          diceBoxRef.current.setDice('1d6');
          
          console.log('Dice box initialized successfully:', !!diceBoxRef.current);
        } catch (error) {
          console.error('Failed to initialize dice box:', error);
          setInitializationError(`Initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      } else {
        console.error('DICE library not available');
        setInitializationError('DICE library not available');
      }
    }
  }, [scriptsLoaded, diceColor]);

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
    if (!diceBoxRef.current || isRolling || getTotalDice() === 0) return;
    
    const notation = buildDiceNotation();
    if (!notation) return;
    
    setIsRolling(true);
    
    try {
      // Set the dice notation
      diceBoxRef.current.setDice(notation);
      
      // Start the roll
      diceBoxRef.current.start_throw(
        // Before roll callback
        (notation: DiceResult) => {
          console.log('Rolling dice:', notation);
          return null; // Return null to use default values
        },
        // After roll callback
        (notation: DiceResult) => {
          console.log('Roll completed:', notation);
          setLastResult(notation);
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
                      e.stopPropagation();
                      removeDice(dice.key);
                    }}
                    className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg transition-colors cursor-pointer"
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