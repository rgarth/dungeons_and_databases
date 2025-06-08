"use client";

import { useState, useEffect, useRef } from 'react';


// Declare global DICE object for TypeScript
declare global {
  interface Window {
    DICE: {
      dice_box: new (element: HTMLElement) => {
        setDice: (notation: string) => void;
        start_throw: (beforeRoll?: ((notation: DiceResult) => number[] | null), afterRoll?: (notation: DiceResult) => void) => void;
        bind_swipe: (element: HTMLElement, beforeRoll?: ((notation: DiceResult) => number[] | null), afterRoll?: (notation: DiceResult) => void) => void;
      };
    };
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

  // Load the required scripts
  useEffect(() => {
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        // Load dependencies in order
        await loadScript('/three.min.js');
        await loadScript('/cannon.min.js');
        await loadScript('/dice.js');
        
        setScriptsLoaded(true);
        console.log('Dice scripts loaded successfully');
      } catch (error) {
        console.error('Failed to load dice scripts:', error);
      }
    };

    loadScripts();
  }, []);

  // Initialize dice box when scripts are loaded
  useEffect(() => {
    if (scriptsLoaded && diceContainerRef.current && !diceBoxRef.current) {
      console.log('Attempting to initialize dice box...');
      console.log('window.DICE available:', !!window.DICE);
      console.log('Container element:', diceContainerRef.current);
      
      // Add a delay to ensure DOM is ready
      setTimeout(() => {
        if (window.DICE && diceContainerRef.current) {
          try {
            // Give the container explicit dimensions
            const container = diceContainerRef.current;
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
            
            if (typeof window.DICE.dice_box === 'function') {
              diceBoxRef.current = new window.DICE.dice_box(container);
            } else {
              console.error('window.DICE.dice_box is not a constructor:', typeof window.DICE.dice_box);
            }
            console.log('Dice box initialized successfully:', diceBoxRef.current);
            
            // Force a re-render to update the fallback display
            setLastResult(null);
          } catch (error) {
            console.error('Failed to initialize dice box:', error);
            console.error('Error details:', error);
          }
        } else {
          console.error('DICE library not found on window object after delay');
        }
      }, 500);
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
    if (!diceBoxRef.current || isRolling || getTotalDice() === 0) return;

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
        <div className="text-slate-400">Loading dice roller...</div>
      </div>
    );
  }

  const totalDice = getTotalDice();
  const notation = buildDiceNotation();

  return (
    <div className={`h-full flex flex-col ${className}`}>
      {/* Top Controls Bar - Tile Layout */}
      <div className="bg-slate-800 border-b border-slate-600 p-4">
        {/* Dice Tiles Grid */}
        <div className="grid grid-cols-6 gap-3 mb-4">
          {diceTypes.map(dice => (
            <div key={dice.key} className="bg-slate-700 rounded-lg p-3 text-center border border-slate-600">
              {/* Dice Label */}
              <div className={`font-bold text-lg ${dice.color} mb-2`}>
                {dice.label}
              </div>
              
              {/* Count Display */}
              <div className="text-white font-mono text-xl mb-3">
                {diceCounts[dice.key]}
              </div>
              
              {/* Control Buttons */}
              <div className="flex gap-1">
                <button
                  onClick={() => updateDiceCount(dice.key, -1)}
                  disabled={diceCounts[dice.key] === 0}
                  className="flex-1 h-8 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded text-sm font-bold transition-colors"
                >
                  −
                </button>
                <button
                  onClick={() => updateDiceCount(dice.key, 1)}
                  disabled={totalDice >= 10}
                  className="flex-1 h-8 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded text-sm font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Controls Row */}
        <div className="flex items-center justify-between gap-4">
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
          <div className="flex items-center gap-3">
            {/* Total Dice Counter */}
            <span className={`text-sm font-medium px-3 py-2 rounded ${
              totalDice >= 10 ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'
            }`}>
              {totalDice}/10 dice
            </span>
            
            {/* Notation Preview */}
            {notation && (
              <span className="text-slate-300 text-sm font-mono bg-slate-700 px-3 py-2 rounded">
                {notation}
              </span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={rollDice}
              disabled={isRolling || totalDice === 0}
              className={`py-3 px-8 rounded-lg font-bold text-lg transition-colors ${
                isRolling || totalDice === 0
                  ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
              }`}
            >
              {isRolling ? 'Rolling...' : totalDice === 0 ? 'Select Dice' : '🎲 ROLL'}
            </button>
            
            <button
              onClick={clearAll}
              disabled={totalDice === 0 && modifier === 0}
              className="py-3 px-4 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
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
            minHeight: '400px',
            background: diceBoxRef.current ? 'transparent' : '#1e293b'
          }}
        >
          {/* Fallback content when dice box not loaded */}
          {!diceBoxRef.current && scriptsLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-slate-400 text-center">
                <div className="text-lg mb-2">🎲</div>
                <div>3D Dice Loading...</div>
                <div className="text-xs mt-2">Check browser console for details</div>
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