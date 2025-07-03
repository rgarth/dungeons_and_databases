'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export type Theme = 'theme-dndb-dark' | 'theme-dndb-light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_COOKIE_NAME = 'dndb-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('theme-dndb-dark');

  useEffect(() => {
    // Load theme from cookie on mount
    const savedTheme = Cookies.get(THEME_COOKIE_NAME) as Theme;
    
    // Validate theme and set default if invalid
    if (savedTheme && (savedTheme === 'theme-dndb-dark' || savedTheme === 'theme-dndb-light')) {
      setTheme(savedTheme);
    } else {
      // Set default theme and save to cookie
      const defaultTheme: Theme = 'theme-dndb-dark';
      setTheme(defaultTheme);
      Cookies.set(THEME_COOKIE_NAME, defaultTheme, { expires: 365 }); // 1 year expiry
    }
  }, []);

  useEffect(() => {
    // Apply theme to document and save to cookie
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('theme-dndb-dark', 'theme-dndb-light');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Save to cookie
    Cookies.set(THEME_COOKIE_NAME, theme, { expires: 365 }); // 1 year expiry
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