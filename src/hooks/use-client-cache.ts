import { useMemo, useState, useEffect } from 'react';
import { clientCache } from '@/lib/client-cache';

export function useClientCache() {
  const [isInitialized, setIsInitialized] = useState(false);

  // Check initialization status periodically until it's true
  useEffect(() => {
    const checkInitialization = () => {
      const initialized = clientCache.isInitialized();
      if (initialized !== isInitialized) {
        setIsInitialized(initialized);
      }
    };

    // Check immediately
    checkInitialization();

    // If not initialized, check periodically
    if (!isInitialized) {
      const interval = setInterval(checkInitialization, 100);
      return () => clearInterval(interval);
    }
  }, [isInitialized]);

  const data = useMemo(() => ({
    // Character creation data
    races: clientCache.getRaces(),
    classes: clientCache.getClasses(),
    backgrounds: clientCache.getBackgrounds(),
    alignments: clientCache.getAlignments(),
    equipmentPacks: clientCache.getEquipmentPacks(),
    armor: clientCache.getArmor(),
    weapons: clientCache.getWeapons(),
    magicalItems: clientCache.getMagicalItems(),
    treasures: clientCache.getTreasures(),
    subraces: clientCache.getSubraces(),
    languages: clientCache.getLanguages(),
    spells: clientCache.getSpells(),
    
    // Game and monster data
    games: clientCache.getGames(),
    monsters: clientCache.getMonsters(),
    
    // Suggestions and limits
    weaponSuggestions: clientCache.getWeaponSuggestions.bind(clientCache),
    armorSuggestions: clientCache.getArmorSuggestions.bind(clientCache),
    spellLimits: clientCache.getSpellLimits.bind(clientCache),
    
    // Utility
    isInitialized
  }), [isInitialized]);

  return data;
} 