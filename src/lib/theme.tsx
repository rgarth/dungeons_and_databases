'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'theme-dndb-dark' | 'theme-dndb-light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('theme-dndb-dark');

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && (savedTheme === 'theme-dndb-dark' || savedTheme === 'theme-dndb-light')) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document and save to localStorage
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('theme-dndb-dark', 'theme-dndb-light');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 