'use client';

import { useTheme } from '@/lib/theme';
import { Moon, Sun, Palette, TreePine, Mountain, Crown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const themes = [
    { id: 'theme-dndb-dark', name: 'DNDB Dark', icon: Moon },
    { id: 'theme-dndb-light', name: 'DNDB Light', icon: Sun },
    { id: 'theme-enchanted-forest', name: 'Enchanted Forest', icon: TreePine },
    { id: 'theme-dungeon', name: 'Dungeon', icon: Mountain },
    { id: 'theme-nobility', name: 'Nobility', icon: Crown },
  ] as const;

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      {/* Theme Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="theme-menu-button"
        aria-label="Theme menu"
      >
        <Palette className="h-4 w-4" />
        <span>Theme</span>
      </button>

      {/* Theme Submenu */}
      {isOpen && (
        <div className="theme-submenu">
          {themes.map((themeOption) => {
            const IconComponent = themeOption.icon;
            const isActive = theme === themeOption.id;
            
            return (
              <button
                key={themeOption.id}
                onClick={() => {
                  setTheme(themeOption.id);
                  setIsOpen(false);
                }}
                className={`theme-option ${isActive ? 'theme-option-active' : ''}`}
                aria-label={`Switch to ${themeOption.name} theme`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{themeOption.name}</span>
                {isActive && <span className="theme-check">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
} 