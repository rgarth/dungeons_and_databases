"use client";

import { useState, useEffect, useRef } from 'react';
import { signOut } from 'next-auth/react';
import { LogOut, Menu, X, Users, User } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ThemeSelector } from '@/components/ThemeSelector';
import { useUserPreferences } from '@/components/providers/user-preferences-provider';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: 'characters' | 'party';
  onTabChange: (tab: 'characters' | 'party') => void;
}

export default function MainLayout({ children, activeTab, onTabChange }: MainLayoutProps) {
  const [showMenu, setShowMenu] = useState(false);
  const { updateLastUsedTab } = useUserPreferences();
  const lastActiveTab = useRef(activeTab);

  // Update last used tab when activeTab changes (but only if it actually changed)
  useEffect(() => {
    if (activeTab !== lastActiveTab.current) {
      lastActiveTab.current = activeTab;
      updateLastUsedTab(activeTab);
    }
  }, [activeTab, updateLastUsedTab]);

  const tabs = [
    {
      id: 'characters' as const,
      label: 'Characters',
      icon: User,
      href: '/characters'
    },
    {
      id: 'party' as const,
      label: 'Party',
      icon: Users,
      href: '/party'
    }
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    if (tab.id !== activeTab) {
      onTabChange(tab.id);
    }
    setShowMenu(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      {/* Header */}
      <header className="bg-[var(--color-card)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/favicon.svg"
                alt="Dungeons & Databases Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Dungeons & Databases</h1>
            </div>
            
            {/* Hamburger menu */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowMenu(!showMenu)}
                className="p-2"
              >
                {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>

              {/* Menu dropdown */}
              {showMenu && (
                <div className="absolute right-0 top-full mt-2 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg shadow-lg z-10 min-w-[200px]">
                  <div className="p-2 space-y-1">
                    <ThemeSelector onThemeChange={() => setShowMenu(false)} />
                    <button
                      onClick={() => signOut()}
                      className="hamburger-menu-item"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-[var(--color-card)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    isActive
                      ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                      : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border)]'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
} 