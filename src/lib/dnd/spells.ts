// Spells and spellcasting utilities
import { getModifier } from './core';

export interface Spell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  classes: string[];
}

export const SPELL_SCHOOLS = [
  'Abjuration', 'Conjuration', 'Divination', 'Enchantment', 
  'Evocation', 'Illusion', 'Necromancy', 'Transmutation'
] as const;

export const SPELLS: Spell[] = [
  // Cantrips (Level 0)
  {
    name: "Fire Bolt",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "A mote of fire streaks toward a creature or object. Make a ranged spell attack. On hit, deal 1d10 fire damage.",
    classes: ["Sorcerer", "Wizard"]
  },
  {
    name: "Mage Hand",
    level: 0,
    school: "Conjuration",
    castingTime: "1 action",
    range: "30 feet",
    components: "V, S",
    duration: "1 minute",
    description: "A spectral hand appears and can manipulate objects, open doors, or retrieve items up to 10 pounds.",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"]
  },
  {
    name: "Sacred Flame",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "Divine flame descends on a creature. Target makes Dex save or takes 1d8 radiant damage.",
    classes: ["Cleric"]
  },
  {
    name: "Eldritch Blast",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "A beam of crackling energy. Make a ranged spell attack for 1d10 force damage.",
    classes: ["Warlock"]
  },
  {
    name: "Prestidigitation",
    level: 0,
    school: "Transmutation",
    castingTime: "1 action",
    range: "10 feet",
    components: "V, S",
    duration: "1 hour",
    description: "A minor magical trick: light a candle, clean an object, chill/warm food, etc.",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"]
  },
  {
    name: "Light",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "Touch",
    components: "V, M",
    duration: "1 hour",
    description: "Touch an object to make it shed bright light in 20-foot radius and dim light 20 feet beyond.",
    classes: ["Bard", "Cleric", "Sorcerer", "Wizard"]
  },
  {
    name: "Minor Illusion",
    level: 0,
    school: "Illusion",
    castingTime: "1 action",
    range: "30 feet",
    components: "S, M",
    duration: "1 minute",
    description: "Create a sound or image of an object for 1 minute.",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"]
  },
  {
    name: "Vicious Mockery",
    level: 0,
    school: "Enchantment",
    castingTime: "1 action",
    range: "60 feet",
    components: "V",
    duration: "Instantaneous",
    description: "Unleash string of insults. Target makes Wis save or takes 1d4 psychic damage and has disadvantage on next attack.",
    classes: ["Bard"]
  },
  {
    name: "Guidance",
    level: 0,
    school: "Divination",
    castingTime: "1 action",
    range: "Touch",
    components: "V, S",
    duration: "1 minute",
    description: "Touch a willing creature. Once before the spell ends, it can roll 1d4 and add result to one ability check.",
    classes: ["Cleric", "Druid"]
  },
  {
    name: "Druidcraft",
    level: 0,
    school: "Transmutation",
    castingTime: "1 action",
    range: "30 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "Create small nature effects: predict weather, bloom flowers, create sensory effects.",
    classes: ["Druid"]
  },
  {
    name: "Thaumaturgy",
    level: 0,
    school: "Transmutation",
    castingTime: "1 action",
    range: "30 feet",
    components: "V",
    duration: "1 minute",
    description: "Manifest minor wonder: amplify voice, flicker flames, open/close doors, etc.",
    classes: ["Cleric"]
  },
  {
    name: "Ray of Frost",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "Ranged spell attack deals 1d8 cold damage and reduces target's speed by 10 feet until end of its next turn.",
    classes: ["Sorcerer", "Wizard"]
  },

  // 1st Level Spells
  {
    name: "Magic Missile",
    level: 1,
    school: "Evocation",
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "Three darts of magical force hit their target automatically for 1d4+1 force damage each.",
    classes: ["Sorcerer", "Wizard"]
  },
  {
    name: "Cure Wounds",
    level: 1,
    school: "Evocation",
    castingTime: "1 action",
    range: "Touch",
    components: "V, S",
    duration: "Instantaneous",
    description: "Touch a creature to heal 1d8 + spellcasting modifier hit points.",
    classes: ["Bard", "Cleric", "Druid", "Paladin", "Ranger"]
  },
  {
    name: "Shield",
    level: 1,
    school: "Abjuration",
    castingTime: "1 reaction",
    range: "Self",
    components: "V, S",
    duration: "1 round",
    description: "Gain +5 AC until start of your next turn. Triggers when you are hit by an attack.",
    classes: ["Sorcerer", "Wizard"]
  },
  {
    name: "Healing Word",
    level: 1,
    school: "Evocation",
    castingTime: "1 bonus action",
    range: "60 feet",
    components: "V",
    duration: "Instantaneous",
    description: "Heal a creature for 1d4 + spellcasting modifier hit points.",
    classes: ["Bard", "Cleric", "Druid"]
  },
  {
    name: "Thunderwave",
    level: 1,
    school: "Evocation",
    castingTime: "1 action",
    range: "Self (15-foot cube)",
    components: "V, S",
    duration: "Instantaneous",
    description: "Thunder booms from you. Each creature in range makes Con save or takes 2d8 thunder damage and is pushed 10 feet away.",
    classes: ["Bard", "Druid", "Sorcerer", "Wizard"]
  },
  {
    name: "Burning Hands",
    level: 1,
    school: "Evocation",
    castingTime: "1 action",
    range: "Self (15-foot cone)",
    components: "V, S",
    duration: "Instantaneous",
    description: "Flames shoot from your fingertips. Each creature in cone makes Dex save or takes 3d6 fire damage.",
    classes: ["Sorcerer", "Wizard"]
  },
  {
    name: "Sleep",
    level: 1,
    school: "Enchantment",
    castingTime: "1 action",
    range: "90 feet",
    components: "V, S, M",
    duration: "1 minute",
    description: "Roll 5d8. Creatures within 20 feet of a point fall unconscious until they take this much damage total.",
    classes: ["Bard", "Sorcerer", "Wizard"]
  },
  {
    name: "Charm Person",
    level: 1,
    school: "Enchantment",
    castingTime: "1 action",
    range: "30 feet",
    components: "V, S",
    duration: "1 hour",
    description: "Target humanoid makes Wis save or is charmed by you for the duration.",
    classes: ["Bard", "Druid", "Sorcerer", "Warlock", "Wizard"]
  },
  {
    name: "Detect Magic",
    level: 1,
    school: "Divination",
    castingTime: "1 action",
    range: "Self",
    components: "V, S",
    duration: "10 minutes",
    description: "Sense magic within 30 feet and learn its school of magic.",
    classes: ["Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer", "Wizard"]
  },
  {
    name: "Identify",
    level: 1,
    school: "Divination",
    castingTime: "1 minute",
    range: "Touch",
    components: "V, S, M",
    duration: "Instantaneous",
    description: "Learn the properties of a magical object or creature.",
    classes: ["Bard", "Wizard"]
  },
  {
    name: "Faerie Fire",
    level: 1,
    school: "Evocation",
    castingTime: "1 action",
    range: "60 feet",
    components: "V",
    duration: "1 minute",
    description: "Objects in 20-foot cube outlined in light. Affected creatures have disadvantage on Dex saves and attackers have advantage.",
    classes: ["Bard", "Druid"]
  },
  {
    name: "Bless",
    level: 1,
    school: "Enchantment",
    castingTime: "1 action",
    range: "30 feet",
    components: "V, S, M",
    duration: "1 minute",
    description: "Up to 3 creatures add 1d4 to attack rolls and saving throws.",
    classes: ["Cleric", "Paladin"]
  },
  {
    name: "Command",
    level: 1,
    school: "Enchantment",
    castingTime: "1 action",
    range: "60 feet",
    components: "V",
    duration: "1 round",
    description: "Speak one-word command to a creature. It must obey if it fails Wis save.",
    classes: ["Cleric", "Paladin"]
  },
  {
    name: "Sanctuary",
    level: 1,
    school: "Abjuration",
    castingTime: "1 bonus action",
    range: "30 feet",
    components: "V, S, M",
    duration: "1 minute",
    description: "Protect a creature. Attackers must make Wis save or choose a different target.",
    classes: ["Cleric"]
  },

  // 2nd Level Spells
  {
    name: "Fireball",
    level: 3,
    school: "Evocation",
    castingTime: "1 action",
    range: "150 feet",
    components: "V, S, M",
    duration: "Instantaneous",
    description: "20-foot radius explosion. Each creature makes Dex save or takes 8d6 fire damage (half on success).",
    classes: ["Sorcerer", "Wizard"]
  },
  {
    name: "Lightning Bolt",
    level: 3,
    school: "Evocation",
    castingTime: "1 action",
    range: "Self (100-foot line)",
    components: "V, S, M",
    duration: "Instantaneous",
    description: "100-foot line, 5 feet wide. Each creature makes Dex save or takes 8d6 lightning damage.",
    classes: ["Sorcerer", "Wizard"]
  },
  {
    name: "Counterspell",
    level: 3,
    school: "Abjuration",
    castingTime: "1 reaction",
    range: "60 feet",
    components: "S",
    duration: "Instantaneous",
    description: "Interrupt a creature casting a spell. Make ability check to stop the spell.",
    classes: ["Sorcerer", "Warlock", "Wizard"]
  },
  {
    name: "Hold Person",
    level: 2,
    school: "Enchantment",
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S, M",
    duration: "1 minute",
    description: "Paralyze a humanoid. Target makes Wis save or is paralyzed for duration.",
    classes: ["Bard", "Cleric", "Druid", "Sorcerer", "Warlock", "Wizard"]
  },
  {
    name: "Invisibility",
    level: 2,
    school: "Illusion",
    castingTime: "1 action",
    range: "Touch",
    components: "V, S, M",
    duration: "1 hour",
    description: "Creature becomes invisible until it attacks or casts a spell.",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"]
  },
  {
    name: "Misty Step",
    level: 2,
    school: "Conjuration",
    castingTime: "1 bonus action",
    range: "Self",
    components: "V",
    duration: "Instantaneous",
    description: "Teleport up to 30 feet to an unoccupied space you can see.",
    classes: ["Sorcerer", "Warlock", "Wizard"]
  },
  {
    name: "Spiritual Weapon",
    level: 2,
    school: "Evocation",
    castingTime: "1 bonus action",
    range: "60 feet",
    components: "V, S",
    duration: "1 minute",
    description: "Create floating weapon that attacks as bonus action for 1d8+spellcasting modifier force damage.",
    classes: ["Cleric"]
  },
  {
    name: "Suggestion",
    level: 2,
    school: "Enchantment",
    castingTime: "1 action",
    range: "30 feet",
    components: "V, M",
    duration: "8 hours",
    description: "Suggest a course of activity. Target follows suggestion if it fails Wis save.",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"]
  },
  {
    name: "Mirror Image",
    level: 2,
    school: "Illusion",
    castingTime: "1 action",
    range: "Self",
    components: "V, S",
    duration: "1 minute",
    description: "Create 3 duplicate images of yourself. Attacks against you have chance to hit duplicates instead.",
    classes: ["Sorcerer", "Warlock", "Wizard"]
  },
  {
    name: "Web",
    level: 2,
    school: "Conjuration",
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S, M",
    duration: "1 hour",
    description: "Fill 20-foot cube with sticky webbing. Creatures are restrained and must break free.",
    classes: ["Sorcerer", "Wizard"]
  },
  {
    name: "Scorching Ray",
    level: 2,
    school: "Evocation",
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "Create 3 rays of fire. Make ranged spell attack for each ray, dealing 2d6 fire damage on hit.",
    classes: ["Sorcerer", "Wizard"]
  },

  // Higher Level Spells (3rd-9th)
  {
    name: "Dispel Magic",
    level: 3,
    school: "Abjuration",
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "End magical effects on creature or object.",
    classes: ["Bard", "Cleric", "Druid", "Paladin", "Sorcerer", "Warlock", "Wizard"]
  },
  {
    name: "Haste",
    level: 3,
    school: "Transmutation",
    castingTime: "1 action",
    range: "30 feet",
    components: "V, S, M",
    duration: "1 minute",
    description: "Target's speed doubles, +2 AC, advantage on Dex saves, extra action each turn.",
    classes: ["Sorcerer", "Wizard"]
  },
  {
    name: "Revivify",
    level: 3,
    school: "Necromancy",
    castingTime: "1 action",
    range: "Touch",
    components: "V, S, M",
    duration: "Instantaneous",
    description: "Return a creature that died within 1 minute to life with 1 hit point.",
    classes: ["Cleric", "Paladin"]
  },
  {
    name: "Polymorph",
    level: 4,
    school: "Transmutation",
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S, M",
    duration: "1 hour",
    description: "Transform creature into beast with CR equal to or less than target's level.",
    classes: ["Bard", "Druid", "Sorcerer", "Wizard"]
  },
  {
    name: "Greater Invisibility",
    level: 4,
    school: "Illusion",
    castingTime: "1 action",
    range: "Touch",
    components: "V, S",
    duration: "1 minute",
    description: "Target becomes invisible for 1 minute. Doesn't end when attacking or casting spells.",
    classes: ["Bard", "Sorcerer", "Wizard"]
  },
  {
    name: "Dimension Door",
    level: 4,
    school: "Conjuration",
    castingTime: "1 action",
    range: "500 feet",
    components: "V",
    duration: "Instantaneous",
    description: "Teleport yourself and willing creature to a location within range.",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"]
  },
  {
    name: "Wall of Fire",
    level: 4,
    school: "Evocation",
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S, M",
    duration: "1 minute",
    description: "Create wall of fire that deals 5d8 fire damage to creatures passing through.",
    classes: ["Druid", "Sorcerer", "Wizard"]
  },
  {
    name: "Cone of Cold",
    level: 5,
    school: "Evocation",
    castingTime: "1 action",
    range: "Self (60-foot cone)",
    components: "V, S, M",
    duration: "Instantaneous",
    description: "60-foot cone of cold. Each creature makes Con save or takes 8d8 cold damage.",
    classes: ["Sorcerer", "Wizard"]
  },
  {
    name: "Teleportation Circle",
    level: 5,
    school: "Conjuration",
    castingTime: "1 minute",
    range: "10 feet",
    components: "V, M",
    duration: "1 round",
    description: "Create circle that teleports creatures to permanent teleportation circle you know.",
    classes: ["Bard", "Sorcerer", "Wizard"]
  },
  {
    name: "Mass Suggestion",
    level: 6,
    school: "Enchantment",
    castingTime: "1 action",
    range: "60 feet",
    components: "V, M",
    duration: "24 hours",
    description: "Suggest activity to up to 12 creatures. Targets follow suggestion if they fail Wis save.",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"]
  },
  {
    name: "Disintegrate",
    level: 6,
    school: "Transmutation",
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S, M",
    duration: "Instantaneous",
    description: "Target makes Dex save or takes 10d6+40 force damage. If reduced to 0 HP, disintegrated.",
    classes: ["Sorcerer", "Wizard"]
  },
  {
    name: "Plane Shift",
    level: 7,
    school: "Conjuration",
    castingTime: "1 action",
    range: "Touch",
    components: "V, S, M",
    duration: "Instantaneous",
    description: "Transport yourself and up to 8 willing creatures to different plane of existence.",
    classes: ["Cleric", "Druid", "Sorcerer", "Warlock", "Wizard"]
  },
  {
    name: "Power Word Kill",
    level: 9,
    school: "Enchantment",
    castingTime: "1 action",
    range: "60 feet",
    components: "V",
    duration: "Instantaneous",
    description: "Instantly kill creature with 100 hit points or fewer.",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"]
  },
  {
    name: "Wish",
    level: 9,
    school: "Conjuration",
    castingTime: "1 action",
    range: "Self",
    components: "V",
    duration: "Instantaneous",
    description: "The most powerful spell. Duplicate any spell of 8th level or lower, or create other magical effects.",
    classes: ["Sorcerer", "Wizard"]
  }
];

// UTILITY FUNCTIONS
export function getSpellcastingAbility(characterClass: string): string | null {
  const spellcasters: Record<string, string> = {
    'Bard': 'charisma',
    'Cleric': 'wisdom', 
    'Druid': 'wisdom',
    'Paladin': 'charisma',
    'Ranger': 'wisdom',
    'Sorcerer': 'charisma',
    'Warlock': 'charisma',
    'Wizard': 'intelligence'
  };
  
  return spellcasters[characterClass] || null;
}

export function calculateSpellSaveDC(spellcastingAbility: number, proficiencyBonus: number): number {
  return 8 + getModifier(spellcastingAbility) + proficiencyBonus;
}

export function calculateSpellAttackBonus(spellcastingAbility: number, proficiencyBonus: number): number {
  return getModifier(spellcastingAbility) + proficiencyBonus;
}

export function getSpellSlots(characterClass: string, level: number): Record<number, number> {
  // Simplified spell slot progression for full casters
  const fullCasterSlots: Record<number, Record<number, number>> = {
    1: { 1: 2 },
    2: { 1: 3 },
    3: { 1: 4, 2: 2 },
    4: { 1: 4, 2: 3 },
    5: { 1: 4, 2: 3, 3: 2 }
    // Add more levels as needed
  };
  
  // Full casters: Bard, Cleric, Druid, Sorcerer, Wizard
  const fullCasters = ['Bard', 'Cleric', 'Druid', 'Sorcerer', 'Wizard'];
  
  if (fullCasters.includes(characterClass)) {
    return fullCasterSlots[level] || {};
  }
  
  // Half casters start at level 2
  if (['Paladin', 'Ranger'].includes(characterClass) && level >= 2) {
    const halfCasterLevel = Math.ceil((level - 1) / 2);
    return fullCasterSlots[halfCasterLevel] || {};
  }
  
  // Warlock has unique spell slot progression
  if (characterClass === 'Warlock') {
    if (level >= 1) return { 1: level >= 2 ? 2 : 1 };
    if (level >= 3) return { 2: 2 };
    if (level >= 5) return { 3: 2 };
  }
  
  return {};
}

export function getClassSpells(characterClass: string, level: number): Spell[] {
  // Determine maximum spell level this character can access
  let maxSpellLevel = 0;
  
  switch (characterClass) {
    case 'Wizard':
    case 'Sorcerer':
    case 'Bard':
    case 'Cleric':
    case 'Druid':
    case 'Warlock':
      // Full casters
      if (level >= 17) maxSpellLevel = 9;
      else if (level >= 15) maxSpellLevel = 8;
      else if (level >= 13) maxSpellLevel = 7;
      else if (level >= 11) maxSpellLevel = 6;
      else if (level >= 9) maxSpellLevel = 5;
      else if (level >= 7) maxSpellLevel = 4;
      else if (level >= 5) maxSpellLevel = 3;
      else if (level >= 3) maxSpellLevel = 2;
      else if (level >= 1) maxSpellLevel = 1;
      break;
    case 'Paladin':
    case 'Ranger':
      // Half-casters start at level 2
      if (level >= 17) maxSpellLevel = 5;
      else if (level >= 13) maxSpellLevel = 4;
      else if (level >= 9) maxSpellLevel = 3;
      else if (level >= 5) maxSpellLevel = 2;
      else if (level >= 2) maxSpellLevel = 1;
      break;
    case 'Fighter': // Eldritch Knight
    case 'Rogue': // Arcane Trickster
      // Third-casters start at level 3
      if (level >= 19) maxSpellLevel = 4;
      else if (level >= 13) maxSpellLevel = 3;
      else if (level >= 7) maxSpellLevel = 2;
      else if (level >= 3) maxSpellLevel = 1;
      break;
    default:
      maxSpellLevel = 0;
  }
  
  return SPELLS.filter(spell => 
    spell.classes.includes(characterClass) && 
    spell.level <= maxSpellLevel
  );
} 