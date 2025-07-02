'use client';

import { useTheme } from '@/lib/theme';
import { Moon, Sun } from 'lucide-react';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  console.log('ThemeSelector rendered, current theme:', theme);

  const toggleTheme = () => {
    console.log('Toggling theme from', theme, 'to', theme === 'theme-dndb-dark' ? 'theme-dndb-light' : 'theme-dndb-dark');
    setTheme(theme === 'theme-dndb-dark' ? 'theme-dndb-light' : 'theme-dndb-dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-[var(--color-surface-secondary)] rounded-lg border border-[var(--color-border)] bg-[var(--color-card-secondary)]"
      title={`Switch to ${theme === 'theme-dndb-dark' ? 'Light' : 'Dark'} theme`}
    >
      {theme === 'theme-dndb-dark' ? (
        <>
          <Sun className="h-4 w-4" />
          <span>Light Theme</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          <span>Dark Theme</span>
        </>
      )}
    </button>
  );
} 