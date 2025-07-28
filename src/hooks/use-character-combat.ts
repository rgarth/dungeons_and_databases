import { useMemo } from 'react';
import { calculateArmorClass, Armor } from '@/lib/dnd/equipment';
import { applyMagicalItemEffects } from '@/lib/dnd/magical-items';
import { EquippedMagicalItem } from '@/lib/dnd/magical-items';

interface CharacterCombatStats extends Record<string, number> {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  ac: number;
  speed: number;
}

interface UseCharacterCombatProps {
  baseStats: CharacterCombatStats;
  equippedArmor: Armor[];
  equippedMagicalItems: EquippedMagicalItem[];
}

export function useCharacterCombat({ baseStats, equippedArmor, equippedMagicalItems }: UseCharacterCombatProps) {
  const modifiedStats = useMemo(() => {
    return applyMagicalItemEffects(baseStats, equippedMagicalItems);
  }, [baseStats, equippedMagicalItems]);

  const currentArmorClass = useMemo(() => {
    // Check if any magical item sets a base AC (like Robe of the Archmagi)
    if (modifiedStats.ac_base && modifiedStats.ac_base > 0) {
      // Use magical base AC + Dex modifier
      const dexMod = Math.floor((modifiedStats.dexterity - 10) / 2);
      return modifiedStats.ac_base + dexMod;
    } else {
      // Use regular armor calculation
      return calculateArmorClass(equippedArmor, modifiedStats.dexterity);
    }
  }, [modifiedStats, equippedArmor]);

  // Add any AC bonuses from magical items
  const finalArmorClass = useMemo(() => {
    return currentArmorClass + (modifiedStats.ac - baseStats.ac);
  }, [currentArmorClass, modifiedStats.ac, baseStats.ac]);

  return {
    modifiedStats,
    currentArmorClass: finalArmorClass,
  };
} 