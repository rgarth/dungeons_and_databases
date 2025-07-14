"use client";

import { createContext, useContext, useState, useEffect } from 'react';

interface UserPreferences {
  lastUsedTab: 'characters' | 'party' | 'monsters';
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updateLastUsedTab: (tab: 'characters' | 'party' | 'monsters') => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | null>(null);

const defaultPreferences: UserPreferences = {
  lastUsedTab: 'characters'
};

export function UserPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences({ ...defaultPreferences, ...parsed });
      } catch (error) {
        console.error('Failed to parse user preferences:', error);
      }
    }
  }, []);

  const updateLastUsedTab = (tab: 'characters' | 'party' | 'monsters') => {
    const newPreferences = { ...preferences, lastUsedTab: tab };
    setPreferences(newPreferences);
    
    // Save to localStorage
    try {
      localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
    } catch (error) {
      console.error('Failed to save user preferences:', error);
    }
  };

  return (
    <UserPreferencesContext.Provider value={{ preferences, updateLastUsedTab }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
} 