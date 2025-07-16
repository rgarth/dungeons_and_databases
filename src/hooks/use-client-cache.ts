import { useMemo } from 'react';
import { clientCache } from '@/lib/client-cache';

export function useClientCache() {
  const isInitialized = clientCache.isInitialized();

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