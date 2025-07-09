"use client";

import { useState, useEffect, useRef } from 'react';

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

interface FullscreenDiceOverlayProps {
  isVisible: boolean;
  diceNotation: string;
  diceColor?: string;
  onRollComplete: (result: DiceResult) => void;
  onClose: () => void;
}

// Add window interface for DICE library
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

export default function FullscreenDiceOverlay({ 
  isVisible, 
  diceNotation, 
  diceColor,
  onRollComplete, 
  onClose 
}: FullscreenDiceOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const diceBoxRef = useRef<DiceBox | null>(null);



  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  // Load DICE library scripts
  useEffect(() => {
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
        // Load scripts sequentially to ensure dependencies are met
        await loadScriptAndWait('/three.min.js', () => typeof window !== 'undefined' && !!window.THREE);
        await loadScriptAndWait('/cannon.min.js', () => typeof window !== 'undefined' && !!window.CANNON);
        await loadScriptAndWait('/dice.js', () => typeof window !== 'undefined' && !!window.DICE);
        setScriptsLoaded(true);
      } catch (error) {
        console.error('Failed to load dice scripts for fullscreen overlay:', error);
      }
    };

    loadScripts();
  }, []);

  // Reset state when overlay becomes visible
  useEffect(() => {
    if (isVisible) {
      diceBoxRef.current = null; // Clear any existing dice box
    }
  }, [isVisible]);

  // Initialize dice box when component mounts or becomes visible
  useEffect(() => {
    if (!isVisible || !containerRef.current || !diceNotation || !scriptsLoaded) return;

    // Prevent multiple initializations
    if (diceBoxRef.current) return;

    const initializeDiceBox = async () => {
      try {
        // Wait for DICE library to be available
        let attempts = 0;
        while (!window.DICE && attempts < 50) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }

        if (!window.DICE || !containerRef.current) {
          console.error('DICE library not available or container not found');
          return;
        }

        // Configure for complete transparency BEFORE creating dice box
        if (window.DICE.vars) {
          window.DICE.vars.desk_opacity = 0;
          window.DICE.vars.desk_color = '#000000'; // Use black instead of 'transparent'
          
          // Use provided color or theme default
          const colorToUse = diceColor || getComputedStyle(document.documentElement)
            .getPropertyValue('--color-dice-default')
            .trim();
            
          window.DICE.vars.dice_color = colorToUse;
          // Set label color based on dice color brightness
          const isDark = parseInt(colorToUse.slice(1), 16) < 0x808080;
          window.DICE.vars.label_color = isDark ? '#ffffff' : '#000000';
        }
        
        // Clear material cache to ensure new color is applied
        if (window.DICE.clearMaterialCache) {
          window.DICE.clearMaterialCache();
        }
        
        // Create new dice box
        diceBoxRef.current = new window.DICE.dice_box(containerRef.current);
        
        // Set the dice notation
        diceBoxRef.current.setDice(diceNotation);
        
        // Start the roll
        diceBoxRef.current.start_throw(
          // beforeRoll callback
          () => {
            return null; // Let the library handle the roll
          },
          // afterRoll callback
          (notation: DiceResult) => {
            onRollComplete(notation);
            
            // Auto-close after a longer delay to show results
            setTimeout(() => {
              onClose();
            }, 4000); // 4 seconds for results visibility
          }
        );
      } catch (error) {
        console.error('Failed to initialize dice box:', error);
        onClose();
      }
    };

    initializeDiceBox();
  }, [isVisible, diceNotation, diceColor, scriptsLoaded]);

  // Cleanup dice box when component unmounts or becomes invisible
  useEffect(() => {
    return () => {
      if (diceBoxRef.current) {
        // Clean up any resources if needed
        diceBoxRef.current = null;
      }
    };
  }, []);

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Dice container - completely transparent and non-interactive */}
      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ 
          background: 'transparent',
          zIndex: 1
        }}
      />
      



      

    </div>
  );
} 