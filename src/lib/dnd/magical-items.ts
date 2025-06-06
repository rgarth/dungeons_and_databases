// Magical Items system for D&D 5e
import type { Spell } from './spells';

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

export const MAGICAL_ITEMS: MagicalItem[] = [
  // COMMON ITEMS
  {
    id: 'potion-healing',
    name: 'Potion of Healing',
    type: 'Potion',
    rarity: 'Common',
    requiresAttunement: false,
    description: 'You regain 2d4 + 2 hit points when you drink this potion. The potion\'s red liquid glimmers when agitated.',
    weight: 0.5,
    cost: '50 gp',
    effects: [
      { type: 'special', description: 'Restores 2d4 + 2 hit points when consumed' }
    ],
    stackable: true,
    consumable: true
  },
  {
    id: 'spell-scroll-cantrip',
    name: 'Spell Scroll (Cantrip)',
    type: 'Scroll',
    rarity: 'Common',
    requiresAttunement: false,
    description: 'A spell scroll bears the words of a single spell, written in a mystical cipher. If the spell is on your class\'s spell list, you can read the scroll and cast its spell without providing any material components.',
    weight: 0,
    cost: '25 gp',
    effects: [
      { type: 'spell_effect', target: 'fire_bolt', description: 'Contains Fire Bolt cantrip (can be cast once)' }
    ],
    stackable: true,
    consumable: true
  },
  {
    id: 'spell-scroll-1st',
    name: 'Spell Scroll (1st Level)',
    type: 'Scroll',
    rarity: 'Common',
    requiresAttunement: false,
    description: 'A spell scroll bears the words of a single spell, written in a mystical cipher.',
    weight: 0,
    cost: '75 gp',
    effects: [
      { type: 'spell_effect', target: 'magic_missile', description: 'Contains Magic Missile (1st level, can be cast once)' }
    ],
    stackable: true,
    consumable: true
  },
  {
    id: 'spell-scroll-2nd',
    name: 'Spell Scroll (2nd Level)',
    type: 'Scroll',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'A spell scroll bears the words of a single spell, written in a mystical cipher.',
    weight: 0,
    cost: '150 gp',
    effects: [
      { type: 'spell_effect', target: 'misty_step', description: 'Contains Misty Step (2nd level, can be cast once)' }
    ],
    stackable: true,
    consumable: true
  },
  {
    id: 'spell-scroll-3rd',
    name: 'Spell Scroll (3rd Level)',
    type: 'Scroll',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'A spell scroll bears the words of a single spell, written in a mystical cipher.',
    weight: 0,
    cost: '300 gp',
    effects: [
      { type: 'spell_effect', target: 'fireball', description: 'Contains Fireball (3rd level, can be cast once)' }
    ],
    stackable: true,
    consumable: true
  },
  {
    id: 'torch-everburning',
    name: 'Everburning Torch',
    type: 'Wondrous Item',
    rarity: 'Common',
    requiresAttunement: false,
    description: 'This torch sheds bright light in a 20-foot radius and dim light for an additional 20 feet. It burns forever and is never consumed.',
    weight: 1,
    cost: '50 gp',
    effects: [
      { type: 'special', description: 'Provides permanent light without fuel' }
    ],
    stackable: false
  },

  // UNCOMMON ITEMS
  {
    id: 'bag-holding',
    name: 'Bag of Holding',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet.',
    weight: 15,
    cost: '4000 gp',
    effects: [
      { type: 'special', description: 'Can hold 500 lbs in 64 cubic feet of space' }
    ],
    stackable: false,
    slot: 'held'
  },
  {
    id: 'boots-elvenkind',
    name: 'Boots of Elvenkind',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While you wear these boots, your steps make no sound, regardless of the surface you are moving across. You also have advantage on Dexterity (Stealth) checks that rely on moving silently.',
    weight: 1,
    cost: '2500 gp',
    effects: [
      { type: 'advantage', target: 'stealth', description: 'Advantage on Stealth checks for silent movement' },
      { type: 'special', description: 'Your steps make no sound' }
    ],
    stackable: false,
    slot: 'feet'
  },
  {
    id: 'cloak-elvenkind',
    name: 'Cloak of Elvenkind',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While you wear this cloak with its hood up, Wisdom (Perception) checks made to see you have disadvantage, and you have advantage on Dexterity (Stealth) checks made to hide.',
    weight: 1,
    cost: '5000 gp',
    effects: [
      { type: 'advantage', target: 'stealth', description: 'Advantage on Stealth checks to hide when hood is up' },
      { type: 'special', description: 'Perception checks to see you have disadvantage when hood is up' }
    ],
    stackable: false,
    slot: 'chest'
  },
  {
    id: 'gauntlets-ogre-power',
    name: 'Gauntlets of Ogre Power',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'Your Strength score is 19 while you wear these gauntlets. They have no effect on you if your Strength is already 19 or higher.',
    weight: 2,
    cost: '8000 gp',
    effects: [
      { type: 'stat_set', target: 'strength', value: 19, description: 'Sets Strength to 19 (if lower)' }
    ],
    stackable: false,
    slot: 'hands'
  },
  {
    id: 'headband-intellect',
    name: 'Headband of Intellect',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'Your Intelligence score is 19 while you wear this headband. It has no effect on you if your Intelligence is already 19 or higher.',
    weight: 1,
    cost: '8000 gp',
    effects: [
      { type: 'stat_set', target: 'intelligence', value: 19, description: 'Sets Intelligence to 19 (if lower)' }
    ],
    stackable: false,
    slot: 'head'
  },
  {
    id: 'amulet-health',
    name: 'Amulet of Health',
    type: 'Wondrous Item',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'Your Constitution score is 19 while you wear this amulet. It has no effect on you if your Constitution is already 19 or higher.',
    weight: 1,
    cost: '8000 gp',
    effects: [
      { type: 'stat_set', target: 'constitution', value: 19, description: 'Sets Constitution to 19 (if lower)' }
    ],
    stackable: false,
    slot: 'neck'
  },
  {
    id: 'ring-protection',
    name: 'Ring of Protection',
    type: 'Ring',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'You gain a +1 bonus to AC and saving throws while wearing this ring.',
    weight: 0,
    cost: '3500 gp',
    effects: [
      { type: 'stat_bonus', target: 'ac', value: 1, description: '+1 bonus to AC' },
      { type: 'stat_bonus', target: 'saving_throws', value: 1, description: '+1 bonus to all saving throws' }
    ],
    stackable: false,
    slot: 'ring'
  },
  {
    id: 'wand-magic-missiles',
    name: 'Wand of Magic Missiles',
    type: 'Wand',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast Magic Missile from it. For 1 charge, you cast the 1st-level version of the spell. You can increase the spell slot level by one for each additional charge you expend.',
    weight: 1,
    cost: '8000 gp',
    effects: [
      { type: 'spell_effect', target: 'magic_missile', description: 'Cast Magic Missile (7 charges, 1+ charges per cast)' }
    ],
    stackable: false,
    slot: 'held'
  },
  {
    id: 'wand-cure-wounds',
    name: 'Wand of Cure Wounds',
    type: 'Wand',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'This wand has 7 charges. While holding it, you can use an action to expend 1 charge to cast Cure Wounds (1st level) from it.',
    weight: 1,
    cost: '6000 gp',
    effects: [
      { type: 'spell_effect', target: 'cure_wounds', description: 'Cast Cure Wounds (7 charges, 1 charge per cast)' }
    ],
    stackable: false,
    slot: 'held'
  },

  // RARE ITEMS
  {
    id: 'boots-speed',
    name: 'Boots of Speed',
    type: 'Wondrous Item',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'While you wear these boots, you can use a bonus action and click the boots\' heels together. If you do, the boots double your walking speed, and any creature that makes an opportunity attack against you has disadvantage on the attack roll. If you click your heels together again, you end the effect. (This is an activated ability, not a permanent speed increase.)',
    weight: 1,
    cost: '4000 gp',
    effects: [
      { type: 'special', description: 'Can double walking speed as bonus action, opportunity attacks have disadvantage' }
    ],
    stackable: false,
    slot: 'feet'
  },
  {
    id: 'cloak-displacement',
    name: 'Cloak of Displacement',
    type: 'Wondrous Item',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'While you wear this cloak, it projects an illusion that makes you appear to be standing in a place near your actual location, causing any creature to have disadvantage on attack rolls against you.',
    weight: 1,
    cost: '60000 gp',
    effects: [
      { type: 'special', description: 'Attack rolls against you have disadvantage until you take damage' }
    ],
    stackable: false,
    slot: 'chest'
  },
  {
    id: 'bracers-defense',
    name: 'Bracers of Defense',
    type: 'Wondrous Item',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'While wearing these bracers, you gain a +2 bonus to AC if you are wearing no armor and using no shield.',
    weight: 2,
    cost: '6000 gp',
    effects: [
      { type: 'stat_bonus', target: 'ac', value: 2, description: '+2 AC when wearing no armor or shield' }
    ],
    stackable: false,
    slot: 'hands'
  },
  {
    id: 'winged-boots',
    name: 'Winged Boots',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While you wear these boots, you have a flying speed equal to your walking speed. You can use the boots to fly for up to 4 hours, all at once or in several shorter flights, each one using a minimum of 1 minute from the duration.',
    weight: 1,
    cost: '8000 gp',
    effects: [
      { type: 'special', description: 'Grants flying speed equal to walking speed (4 hours per day)' }
    ],
    stackable: false,
    slot: 'feet'
  },
  {
    id: 'belt-giant-strength',
    name: 'Belt of Giant Strength (Hill)',
    type: 'Wondrous Item',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'While wearing this belt, your Strength score changes to 21. The item has no effect on you if your Strength is already equal to or greater than 21.',
    weight: 2,
    cost: '8000 gp',
    effects: [
      { type: 'stat_set', target: 'strength', value: 21, description: 'Sets Strength to 21 (if lower)' }
    ],
    stackable: false,
    slot: 'chest'
  },

  // VERY RARE ITEMS
  {
    id: 'manual-bodily-health',
    name: 'Manual of Bodily Health',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: false,
    description: 'This book contains health and diet tips, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book\'s contents and practicing its guidelines, your Constitution score increases by 2, as does your maximum for that score.',
    weight: 5,
    cost: '125000 gp',
    effects: [
      { type: 'special', description: 'Permanently increases Constitution by 2 (once per character)' }
    ],
    stackable: false
  },
  {
    id: 'ioun-stone-leadership',
    name: 'Ioun Stone (Leadership)',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: true,
    description: 'An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. This marbled pink and green sphere orbits your head. Your Charisma score increases by 2, to a maximum of 20.',
    weight: 0,
    cost: '80000 gp',
    effects: [
      { type: 'stat_bonus', target: 'charisma', value: 2, description: '+2 bonus to Charisma (max 20)' }
    ],
    stackable: false,
    slot: 'head'
  },

  // LEGENDARY ITEMS
  {
    id: 'rod-lordly-might',
    name: 'Rod of Lordly Might',
    type: 'Rod',
    rarity: 'Legendary',
    requiresAttunement: true,
    description: 'This rod has a flanged head, and it functions as a magic mace that grants a +3 bonus to attack and damage rolls made with it. The rod has properties associated with six different buttons that are set in a row along the haft.',
    weight: 2,
    cost: '200000 gp',
    effects: [
      { type: 'special', description: 'Functions as +3 mace with multiple magical forms and abilities' }
    ],
    stackable: false,
    slot: 'held'
  },
  {
    id: 'deck-many-things',
    name: 'Deck of Many Things',
    type: 'Wondrous Item',
    rarity: 'Legendary',
    requiresAttunement: false,
    description: 'Usually found in a box or pouch, this deck contains a number of cards made of ivory or vellum. Most (75 percent) of these decks have only thirteen cards, but the rest have twenty-two.',
    weight: 1,
    cost: '50000 gp',
    effects: [
      { type: 'special', description: 'Drawing cards causes powerful random magical effects' }
    ],
    stackable: false
  }
];

// Helper functions for magical item effects
export function applyMagicalItemEffects(baseStats: Record<string, number>, equippedItems: EquippedMagicalItem[]): Record<string, number> {
  const modifiedStats = { ...baseStats };
  
  for (const item of equippedItems) {
    // Only apply effects if item doesn't require attunement OR is attuned
    if (!item.requiresAttunement || item.isAttuned) {
      for (const effect of item.effects) {
        switch (effect.type) {
          case 'stat_bonus':
            if (effect.target && typeof effect.value === 'number') {
              modifiedStats[effect.target] = (modifiedStats[effect.target] || 0) + effect.value;
            }
            break;
          case 'stat_set':
            if (effect.target && typeof effect.value === 'number') {
              // Only set if current value is lower (for items like Gauntlets of Ogre Power)
              if (modifiedStats[effect.target] < effect.value) {
                modifiedStats[effect.target] = effect.value;
              }
            }
            break;
          // Add more effect types as needed
        }
      }
    }
  }
  
  return modifiedStats;
}

export function canAttuneMagicalItem(currentAttunedItems: string[], itemName: string): boolean {
  return currentAttunedItems.length < 3 && !currentAttunedItems.includes(itemName);
}

export function getMagicalItemsByRarity(rarity: MagicalItemRarity): MagicalItem[] {
  return MAGICAL_ITEMS.filter(item => item.rarity === rarity);
}

export function getMagicalItemsByType(type: MagicalItemType): MagicalItem[] {
  return MAGICAL_ITEMS.filter(item => item.type === type);
}

export function findMagicalItem(name: string): MagicalItem | undefined {
  return MAGICAL_ITEMS.find(item => item.name === name);
}

// Slot-based equipment system
export const EQUIPMENT_SLOTS = {
  head: 'Head',
  neck: 'Neck', 
  chest: 'Chest/Back',
  hands: 'Hands/Arms',
  feet: 'Feet',
  ring: 'Ring (2 slots)',
  held: 'Held (2 hands max)'
} as const;

export function canEquipInSlot(item: MagicalItem, equippedItems: EquippedMagicalItem[]): boolean {
  if (!item.slot) return true; // No slot restriction
  
  const sameSlotItems = equippedItems.filter(equipped => equipped.slot === item.slot);
  
  // Ring slot allows 2 items
  if (item.slot === 'ring') {
    return sameSlotItems.length < 2;
  }
  
      // All other slots allow only 1 item
    return sameSlotItems.length === 0;
  }

// New function to extract spells from magical items with class validation
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
  const spellEffects: Array<{
    spell: Spell;
    source: string;
    uses: string;
    requiresAttunement: boolean;
    isAttuned: boolean;
    canUse: boolean;
    reason?: string;
  }> = [];

  equippedItems.forEach(item => {
    // Only include items that are properly attuned if they require attunement
    if (item.requiresAttunement && !item.isAttuned) {
      return;
    }

    item.effects.forEach(effect => {
      if (effect.type === 'spell_effect' && effect.target) {
        // Map spell targets to actual spell data
        const spell = getSpellFromTarget(effect.target);
        if (spell) {
          const validation = validateSpellScrollUsage(item, spell, characterClass, characterLevel);
          
          spellEffects.push({
            spell,
            source: item.name,
            uses: getUsesFromDescription(effect.description),
            requiresAttunement: item.requiresAttunement,
            isAttuned: item.isAttuned || false,
            canUse: validation.canUse,
            reason: validation.reason
          });
        }
      }
    });
  });

  return spellEffects;
}

// Helper function to validate if a character can use a spell scroll/item
function validateSpellScrollUsage(
  item: EquippedMagicalItem, 
  spell: Spell, 
  characterClass: string,
  characterLevel: number
): { canUse: boolean; reason?: string } {
  // For non-scroll items (wands, staves), just check attunement
  if (item.type !== 'Scroll') {
    return { canUse: true };
  }

  // Spell scrolls have specific rules
  
  // 1. Check if spell is on character's class list
  const isOnClassList = spell.classes.includes(characterClass);
  
  if (!isOnClassList) {
    // Special case: Anyone can use cantrip scrolls with a DC 10 Arcana check
    if (spell.level === 0) {
      return { 
        canUse: true, 
        reason: 'Requires DC 10 Arcana check (cantrip scroll)' 
      };
    }
    
    return { 
      canUse: false, 
      reason: `${spell.name} is not on ${characterClass} spell list` 
    };
  }

  // 2. Check if character can cast spells of this level
  const canCastLevel = getMaxSpellLevel(characterClass, characterLevel);
  
  if (spell.level > canCastLevel) {
    return { 
      canUse: false, 
      reason: `Requires ability to cast ${spell.level}${getOrdinalSuffix(spell.level)} level spells` 
    };
  }

  // 3. Higher level scrolls may require ability checks
  if (spell.level > canCastLevel) {
    const dc = 10 + spell.level;
    return { 
      canUse: true, 
      reason: `Requires DC ${dc} spellcasting ability check` 
    };
  }

  return { canUse: true };
}

// Helper function to get max spell level a character can cast
function getMaxSpellLevel(characterClass: string, level: number): number {
  const fullCasters = ['Wizard', 'Sorcerer', 'Bard', 'Cleric', 'Druid', 'Warlock'];
  const halfCasters = ['Paladin', 'Ranger'];
  const thirdCasters = ['Fighter', 'Rogue']; // Eldritch Knight, Arcane Trickster

  if (fullCasters.includes(characterClass)) {
    if (level >= 17) return 9;
    if (level >= 15) return 8;
    if (level >= 13) return 7;
    if (level >= 11) return 6;
    if (level >= 9) return 5;
    if (level >= 7) return 4;
    if (level >= 5) return 3;
    if (level >= 3) return 2;
    if (level >= 1) return 1;
  } else if (halfCasters.includes(characterClass)) {
    if (level >= 17) return 5;
    if (level >= 13) return 4;
    if (level >= 9) return 3;
    if (level >= 5) return 2;
    if (level >= 2) return 1;
  } else if (thirdCasters.includes(characterClass)) {
    if (level >= 19) return 4;
    if (level >= 13) return 3;
    if (level >= 7) return 2;
    if (level >= 3) return 1;
  }
  
  return 0; // Non-spellcaster
}

// Helper function for ordinal suffixes
function getOrdinalSuffix(num: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = num % 100;
  return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
}

// Helper function to map spell targets to actual spell objects
function getSpellFromTarget(target: string): Spell | null {
  // We'll need to import SPELLS dynamically or pass it as parameter
  // For now, return a mock spell object to avoid circular imports
  const spellMap: Record<string, Spell> = {
    'fire_bolt': {
      name: 'Fire Bolt',
      level: 0,
      school: 'Evocation',
      castingTime: '1 action',
      range: '120 feet',
      components: 'V, S',
      duration: 'Instantaneous',
      description: 'A mote of fire streaks toward a creature or object. Make a ranged spell attack. On hit, deal 1d10 fire damage.',
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
      description: 'Three darts of magical force hit their target automatically for 1d4+1 force damage each.',
      classes: ['Sorcerer', 'Wizard']
    },
    'cure_wounds': {
      name: 'Cure Wounds',
      level: 1,
      school: 'Evocation',
      castingTime: '1 action',
      range: 'Touch',
      components: 'V, S',
      duration: 'Instantaneous',
      description: 'Touch a creature to heal 1d8 + spellcasting modifier hit points.',
      classes: ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger']
    },
    'misty_step': {
      name: 'Misty Step',
      level: 2,
      school: 'Conjuration',
      castingTime: '1 bonus action',
      range: 'Self',
      components: 'V',
      duration: 'Instantaneous',
      description: 'Teleport up to 30 feet to an unoccupied space you can see.',
      classes: ['Sorcerer', 'Warlock', 'Wizard']
    },
    'fireball': {
      name: 'Fireball',
      level: 3,
      school: 'Evocation',
      castingTime: '1 action',
      range: '150 feet',
      components: 'V, S, M',
      duration: 'Instantaneous',
      description: '20-foot radius explosion. Each creature makes Dex save or takes 8d6 fire damage (half on success).',
      classes: ['Sorcerer', 'Wizard']
    }
  };

  return spellMap[target] || null;
}

// Helper function to extract usage information from effect description
function getUsesFromDescription(description: string): string {
  if (description.includes('once per day')) return '1/day';
  if (description.includes('3 times per day')) return '3/day';
  if (description.includes('can be cast once')) return '1 use';
  if (description.includes('7 charges')) return '7 charges';
  if (description.includes('charges')) return 'charges';
  return 'unlimited';
} 