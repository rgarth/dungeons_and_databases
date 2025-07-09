"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

interface DiceRollContextType {
  rollDice: (notation: string) => void;
  isRolling: boolean;
}

const DiceRollContext = createContext<DiceRollContextType | undefined>(undefined);

export function DiceRollProvider({ children }: { children: React.ReactNode }) {
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = useCallback((notation: string) => {
    // This will be called by the floating dice menu
    // For now, we'll use a custom event to communicate with the floating dice menu
    const event = new CustomEvent('triggerDiceRoll', { 
      detail: { notation } 
    });
    window.dispatchEvent(event);
    setIsRolling(true);
    
    // Reset rolling state after a delay
    setTimeout(() => setIsRolling(false), 5000);
  }, []);

  return (
    <DiceRollContext.Provider value={{ rollDice, isRolling }}>
      {children}
    </DiceRollContext.Provider>
  );
}

export function useDiceRoll() {
  const context = useContext(DiceRollContext);
  if (context === undefined) {
    throw new Error('useDiceRoll must be used within a DiceRollProvider');
  }
  return context;
} 