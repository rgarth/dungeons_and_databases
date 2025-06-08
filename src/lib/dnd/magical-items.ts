// Magical Items system for D&D 5e
import { Spell } from './spells';

export type MagicalItemRarity = 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary' | 'Artifact';
export type MagicalItemType = 'Wondrous Item' | 'Ring' | 'Potion' | 'Scroll' | 'Wand' | 'Rod' | 'Staff' | 'Armor' | 'Weapon' | 'Shield';

export interface MagicalItemEffect {
  type: 'stat_bonus' | 'stat_set' | 'advantage' | 'resistance' | 'immunity' | 'spell_effect' | 'special';
  target?: string; // ability score, AC, speed, etc.
  value?: number | string;
  description: string;
}

export interface MagicalItem {
  id: string;
  name: string;
  type: MagicalItemType;
  rarity: MagicalItemRarity;
  requiresAttunement: boolean;
  description: string;
  weight?: number;
  cost?: string;
  effects: MagicalItemEffect[];
  stackable: boolean;
  slot?: string; // 'head', 'neck', 'chest', 'hands', 'feet', 'ring', 'held', etc.
  consumable?: boolean; // True for potions, scrolls, etc.
}

export interface EquippedMagicalItem extends MagicalItem {
  isAttuned?: boolean;
}

/**
 * Note: These functions now require database access.
 * Use API calls or import database data instead of hardcoded arrays.
 * 
 * @deprecated Use database-based filtering instead
 */

export function applyMagicalItemEffects(baseStats: Record<string, number>, equippedItems: EquippedMagicalItem[]): Record<string, number> {
  const modifiedStats = { ...baseStats };
  
  equippedItems.forEach(item => {
    // Skip items requiring attunement if not attuned
    if (item.requiresAttunement && !item.isAttuned) {
      return;
    }
    
    item.effects.forEach(effect => {
      if (effect.type === 'stat_bonus' && effect.target && typeof effect.value === 'number') {
        modifiedStats[effect.target] = (modifiedStats[effect.target] || 0) + effect.value;
      } else if (effect.type === 'stat_set' && effect.target && typeof effect.value === 'number') {
        // Only set if current value is lower
        if ((modifiedStats[effect.target] || 0) < effect.value) {
          modifiedStats[effect.target] = effect.value;
        }
      }
    });
  });
  
  return modifiedStats;
}

export function canAttuneMagicalItem(currentAttunedItems: string[], itemName: string): boolean {
  return currentAttunedItems.length < 3 && !currentAttunedItems.includes(itemName);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getMagicalItemsByRarity(_rarity: MagicalItemRarity): MagicalItem[] {
  console.warn('getMagicalItemsByRarity() is deprecated - use database-based filtering instead');
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getMagicalItemsByType(_type: MagicalItemType): MagicalItem[] {
  console.warn('getMagicalItemsByType() is deprecated - use database-based filtering instead');
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function findMagicalItem(_name: string): MagicalItem | undefined {
  console.warn('findMagicalItem() is deprecated - use database-based lookup instead');
  return undefined;
}

export function canEquipInSlot(item: MagicalItem, equippedItems: EquippedMagicalItem[]): boolean {
  if (!item.slot) return true; // Items without slots can always be equipped
  
  // Check if slot is already occupied
  const slotOccupied = equippedItems.some(equippedItem => 
    equippedItem.slot === item.slot && equippedItem.id !== item.id
  );
  
  // Special case for rings - can equip up to 2
  if (item.slot === 'ring') {
    const ringsEquipped = equippedItems.filter(equippedItem => equippedItem.slot === 'ring').length;
    return ringsEquipped < 2;
  }
  
  return !slotOccupied;
}

export function getSpellsFromMagicalItems(
  equippedItems: EquippedMagicalItem[], 
  characterClass: string,
  characterLevel: number = 1
): Array<{
  spell: Spell;
  source: string;
  uses: string;
  requiresAttunement: boolean;
  isAttuned: boolean;
  canUse: boolean;
  reason?: string;
}> {
  const spells: Array<{
    spell: Spell;
    source: string;
    uses: string;
    requiresAttunement: boolean;
    isAttuned: boolean;
    canUse: boolean;
    reason?: string;
  }> = [];

  equippedItems.forEach(item => {
    item.effects.forEach(effect => {
      if (effect.type === 'spell_effect' && effect.target) {
        const spell = getSpellFromTarget(effect.target);
        if (spell) {
          const usageInfo = validateSpellScrollUsage(item, spell, characterClass, characterLevel);
          spells.push({
            spell,
            source: item.name,
            uses: getUsesFromDescription(effect.description),
            requiresAttunement: item.requiresAttunement,
            isAttuned: item.isAttuned || false,
            canUse: usageInfo.canUse,
            reason: usageInfo.reason
          });
        }
      }
    });
  });

  return spells;
}

function validateSpellScrollUsage(
  item: EquippedMagicalItem, 
  spell: Spell, 
  characterClass: string,
  characterLevel: number
): { canUse: boolean; reason?: string } {
  // Spell scrolls have special usage rules
  if (item.type === 'Scroll') {
    // Check if spell is on character's class spell list
    if (!spell.classes.includes(characterClass)) {
      return { 
        canUse: false, 
        reason: `${spell.name} is not on the ${characterClass} spell list` 
      };
    }
    
    // Check if character can cast spells of this level
    const maxSpellLevel = getMaxSpellLevel(characterClass, characterLevel);
    if (spell.level > maxSpellLevel) {
      return { 
        canUse: false, 
        reason: `You cannot cast ${getOrdinalSuffix(spell.level)} level spells yet` 
      };
    }
    
    return { canUse: true };
  }
  
  // For other magical items, check if requires attunement
  if (item.requiresAttunement && !item.isAttuned) {
    return { 
      canUse: false, 
      reason: `${item.name} requires attunement` 
    };
  }
  
  return { canUse: true };
}

function getMaxSpellLevel(characterClass: string, level: number): number {
  switch (characterClass) {
    case 'Wizard':
    case 'Sorcerer':
    case 'Bard':
    case 'Cleric':
    case 'Druid':
    case 'Warlock':
      // Full casters
      if (level >= 17) return 9;
      else if (level >= 15) return 8;
      else if (level >= 13) return 7;
      else if (level >= 11) return 6;
      else if (level >= 9) return 5;
      else if (level >= 7) return 4;
      else if (level >= 5) return 3;
      else if (level >= 3) return 2;
      else if (level >= 1) return 1;
      break;
    case 'Paladin':
    case 'Ranger':
      // Half-casters start at level 2
      if (level >= 17) return 5;
      else if (level >= 13) return 4;
      else if (level >= 9) return 3;
      else if (level >= 5) return 2;
      else if (level >= 2) return 1;
      break;
    case 'Fighter': // Eldritch Knight
    case 'Rogue': // Arcane Trickster
      // Third-casters start at level 3
      if (level >= 19) return 4;
      else if (level >= 13) return 3;
      else if (level >= 7) return 2;
      else if (level >= 3) return 1;
      break;
    default:
      return 0;
  }
  return 0;
}

function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return num + "st";
  if (j === 2 && k !== 12) return num + "nd";
  if (j === 3 && k !== 13) return num + "rd";
  return num + "th";
}

function getSpellFromTarget(target: string): Spell | null {
  // This would need to be replaced with database lookup
  // For now, return a basic spell structure
  const spellMap: Record<string, Spell> = {
    'fire_bolt': {
      name: 'Fire Bolt',
      level: 0,
      school: 'Evocation',
      castingTime: '1 action',
      range: '120 feet',
      components: 'V, S',
      duration: 'Instantaneous',
      description: 'A mote of fire streaks toward a creature or object.',
      classes: ['Sorcerer', 'Wizard']
    },
    'magic_missile': {
      name: 'Magic Missile',
      level: 1,
      school: 'Evocation',
      castingTime: '1 action',
      range: '120 feet',
      components: 'V, S',
      duration: 'Instantaneous',
      description: 'Three darts of magical force hit their target.',
      classes: ['Sorcerer', 'Wizard']
    },
    'misty_step': {
      name: 'Misty Step',
      level: 2,
      school: 'Conjuration',
      castingTime: '1 bonus action',
      range: 'Self',
      components: 'V',
      duration: 'Instantaneous',
      description: 'Briefly surrounded by silvery mist, you teleport.',
      classes: ['Sorcerer', 'Wizard', 'Warlock']
    },
    'fireball': {
      name: 'Fireball',
      level: 3,
      school: 'Evocation',
      castingTime: '1 action',
      range: '150 feet',
      components: 'V, S, M',
      duration: 'Instantaneous',
      description: 'A bright streak flashes from your pointing finger.',
      classes: ['Sorcerer', 'Wizard']
    }
  };
  
  return spellMap[target] || null;
}

function getUsesFromDescription(description: string): string {
  // Extract usage information from description
  if (description.includes('once')) return '1/day';
  if (description.includes('three times')) return '3/day';
  if (description.includes('can be cast once')) return '1 use';
  return 'Unknown';
} 