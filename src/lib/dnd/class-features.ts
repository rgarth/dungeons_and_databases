// Core class features for D&D 5e classes

export interface ClassFeature {
  name: string;
  description: string;
  level: number;
  type: 'combat' | 'utility' | 'spellcasting' | 'social' | 'exploration';
  usageType?: 'at-will' | 'short-rest' | 'long-rest' | 'limited-uses' | 'passive';
  usesPerRest?: number;
}

// Core class features by class (level 1-5 to start)
export function getClassFeatures(characterClass: string, level: number): ClassFeature[] {
  const classFeatures: Record<string, ClassFeature[]> = {
    
    Barbarian: [
      {
        name: "Rage",
        description: "Enter a rage as a bonus action. While raging: advantage on Strength checks and saves, +2 melee damage with Strength weapons, resistance to bludgeoning/piercing/slashing damage. Lasts 1 minute.",
        level: 1,
        type: 'combat',
        usageType: 'long-rest',
        usesPerRest: 2
      },
      {
        name: "Unarmored Defense",
        description: "While not wearing armor, your AC equals 10 + Dex modifier + Con modifier. You can use a shield.",
        level: 1,
        type: 'combat',
        usageType: 'passive'
      },
      {
        name: "Reckless Attack",
        description: "When you make your first attack on your turn, you can attack recklessly. Gain advantage on melee weapon attack rolls using Strength, but attack rolls against you have advantage until your next turn.",
        level: 2,
        type: 'combat',
        usageType: 'at-will'
      },
      {
        name: "Danger Sense",
        description: "Advantage on Dexterity saving throws against effects you can see, such as traps and spells. You can't be blinded, deafened, or incapacitated.",
        level: 2,
        type: 'utility',
        usageType: 'passive'
      }
    ],

    Fighter: [
      {
        name: "Fighting Style",
        description: "Choose a fighting style: Archery (+2 to ranged attacks), Defense (+1 AC with armor), Dueling (+2 damage with one-handed weapons), Great Weapon Fighting (reroll 1s and 2s on damage), Protection (use reaction and shield to impose disadvantage), or Two-Weapon Fighting (+ability modifier to off-hand damage).",
        level: 1,
        type: 'combat',
        usageType: 'passive'
      },
      {
        name: "Second Wind",
        description: "As a bonus action, regain 1d10 + fighter level hit points.",
        level: 1,
        type: 'utility',
        usageType: 'short-rest',
        usesPerRest: 1
      },
      {
        name: "Action Surge",
        description: "Take an additional action on your turn. Can be used once per short/long rest.",
        level: 2,
        type: 'combat',
        usageType: 'short-rest',
        usesPerRest: 1
      }
    ],

    Cleric: [
      {
        name: "Spellcasting",
        description: "Cast cleric spells using Wisdom as spellcasting ability. Know all cleric spells, prepare Wisdom modifier + cleric level spells daily.",
        level: 1,
        type: 'spellcasting',
        usageType: 'long-rest'
      },
      {
        name: "Divine Domain",
        description: "Choose a divine domain (Life, Light, Knowledge, Nature, Tempest, Trickery, War). Gain domain spells and features.",
        level: 1,
        type: 'spellcasting',
        usageType: 'passive'
      },
      {
        name: "Channel Divinity",
        description: "Supernatural effect from your divine domain. Turn Undead: force undead within 30 feet to make Wisdom save or be turned for 1 minute.",
        level: 2,
        type: 'utility',
        usageType: 'short-rest',
        usesPerRest: 1
      }
    ],

    Wizard: [
      {
        name: "Spellcasting",
        description: "Cast wizard spells using Intelligence as spellcasting ability. Learn spells by finding them or leveling up. Prepare Intelligence modifier + wizard level spells daily.",
        level: 1,
        type: 'spellcasting',
        usageType: 'long-rest'
      },
      {
        name: "Spellbook",
        description: "Contains your known spells. Start with 6 1st-level spells. Learn 2 new spells each level. Can copy spells from scrolls and other spellbooks.",
        level: 1,
        type: 'spellcasting',
        usageType: 'passive'
      },
      {
        name: "Arcane Recovery",
        description: "Once per day during a short rest, recover expended spell slots with combined level equal to or less than half your wizard level (minimum 1).",
        level: 1,
        type: 'spellcasting',
        usageType: 'short-rest',
        usesPerRest: 1
      }
    ],

    Rogue: [
      {
        name: "Expertise",
        description: "Choose two skills you're proficient in. Double your proficiency bonus for those skills.",
        level: 1,
        type: 'utility',
        usageType: 'passive'
      },
      {
        name: "Sneak Attack",
        description: "Once per turn, deal extra 1d6 damage to one creature you hit with an attack with advantage, or if another enemy is within 5 feet of the target.",
        level: 1,
        type: 'combat',
        usageType: 'at-will'
      },
      {
        name: "Thieves' Cant",
        description: "Secret language of rogues. Can hide messages in seemingly normal conversation.",
        level: 1,
        type: 'social',
        usageType: 'passive'
      },
      {
        name: "Cunning Action",
        description: "Use bonus action to Dash, Disengage, or Hide.",
        level: 2,
        type: 'combat',
        usageType: 'at-will'
      }
    ],

    Ranger: [
      {
        name: "Favored Enemy",
        description: "Choose a type of creature. Advantage on Wisdom (Survival) checks to track and Intelligence checks to recall information about them.",
        level: 1,
        type: 'exploration',
        usageType: 'passive'
      },
      {
        name: "Natural Explorer",
        description: "Choose a favored terrain. Double proficiency bonus on Wisdom (Survival) checks, remain alert while tracking/foraging/navigating, move stealthily at normal pace.",
        level: 1,
        type: 'exploration',
        usageType: 'passive'
      },
      {
        name: "Fighting Style",
        description: "Choose Archery (+2 ranged attacks), Defense (+1 AC with armor), Dueling (+2 damage with one-handed weapons), or Two-Weapon Fighting (+ability modifier to off-hand damage).",
        level: 2,
        type: 'combat',
        usageType: 'passive'
      },
      {
        name: "Spellcasting",
        description: "Cast ranger spells using Wisdom as spellcasting ability. Learn spells from ranger list.",
        level: 2,
        type: 'spellcasting',
        usageType: 'long-rest'
      }
    ],

    Paladin: [
      {
        name: "Divine Sense",
        description: "As an action, detect celestials, fiends, and undead within 60 feet, unless behind total cover. Can use 1 + Charisma modifier times per long rest.",
        level: 1,
        type: 'utility',
        usageType: 'long-rest',
        usesPerRest: 2
      },
      {
        name: "Lay on Hands",
        description: "Healing pool of hit points equal to 5 × paladin level. As an action, touch a creature to heal them or cure a disease.",
        level: 1,
        type: 'utility',
        usageType: 'long-rest'
      },
      {
        name: "Fighting Style",
        description: "Choose Defense (+1 AC with armor), Dueling (+2 damage with one-handed weapons), Great Weapon Fighting (reroll 1s and 2s on damage), or Protection (reaction to impose disadvantage).",
        level: 2,
        type: 'combat',
        usageType: 'passive'
      },
      {
        name: "Spellcasting",
        description: "Cast paladin spells using Charisma as spellcasting ability. Prepare Charisma modifier + half paladin level spells daily.",
        level: 2,
        type: 'spellcasting',
        usageType: 'long-rest'
      }
    ],

    Bard: [
      {
        name: "Spellcasting",
        description: "Cast bard spells using Charisma as spellcasting ability. Know a number of spells from the bard list.",
        level: 1,
        type: 'spellcasting',
        usageType: 'long-rest'
      },
      {
        name: "Bardic Inspiration",
        description: "As a bonus action, give an ally within 60 feet a d6 to add to one attack roll, ability check, or saving throw. Can use Charisma modifier times per short/long rest.",
        level: 1,
        type: 'utility',
        usageType: 'short-rest',
        usesPerRest: 3
      },
      {
        name: "Jack of All Trades",
        description: "Add half proficiency bonus (rounded down) to any ability check that doesn't use proficiency.",
        level: 2,
        type: 'utility',
        usageType: 'passive'
      },
      {
        name: "Song of Rest",
        description: "During a short rest, you and allies regain extra hit points equal to a d6 + your Charisma modifier.",
        level: 2,
        type: 'utility',
        usageType: 'short-rest'
      }
    ],

    Warlock: [
      {
        name: "Otherworldly Patron",
        description: "Choose a patron (Archfey, Fiend, Great Old One). Gain expanded spell list and patron features.",
        level: 1,
        type: 'spellcasting',
        usageType: 'passive'
      },
      {
        name: "Pact Magic",
        description: "Cast warlock spells using Charisma. Spell slots recharge on short rest. Higher level slots as you level.",
        level: 1,
        type: 'spellcasting',
        usageType: 'short-rest'
      },
      {
        name: "Eldritch Invocations",
        description: "Choose invocations that grant special abilities. Gain more as you level.",
        level: 2,
        type: 'utility',
        usageType: 'passive'
      }
    ],

    Sorcerer: [
      {
        name: "Spellcasting",
        description: "Cast sorcerer spells using Charisma as spellcasting ability. Know a limited number of spells.",
        level: 1,
        type: 'spellcasting',
        usageType: 'long-rest'
      },
      {
        name: "Sorcerous Origin",
        description: "Choose your origin (Draconic Bloodline, Wild Magic). Gain origin spells and features.",
        level: 1,
        type: 'spellcasting',
        usageType: 'passive'
      },
      {
        name: "Font of Magic",
        description: "Gain sorcery points equal to sorcerer level. Convert between sorcery points and spell slots.",
        level: 2,
        type: 'spellcasting',
        usageType: 'long-rest'
      },
      {
        name: "Metamagic",
        description: "Choose 2 metamagic options to modify spells (Careful, Distant, Empowered, Extended, Heightened, Quickened, Subtle, Twinned).",
        level: 3,
        type: 'spellcasting',
        usageType: 'at-will'
      }
    ],

    Druid: [
      {
        name: "Druidcraft",
        description: "Know the Druidcraft cantrip. Can't wear or use metal armor or shields.",
        level: 1,
        type: 'utility',
        usageType: 'at-will'
      },
      {
        name: "Spellcasting",
        description: "Cast druid spells using Wisdom as spellcasting ability. Know all druid spells, prepare Wisdom modifier + druid level spells daily.",
        level: 1,
        type: 'spellcasting',
        usageType: 'long-rest'
      },
      {
        name: "Wild Shape",
        description: "Transform into a beast you've seen before for a number of hours equal to half druid level. Can use twice per short/long rest.",
        level: 2,
        type: 'utility',
        usageType: 'short-rest',
        usesPerRest: 2
      }
    ],

    Monk: [
      {
        name: "Unarmored Defense",
        description: "While not wearing armor or wielding a shield, AC equals 10 + Dex modifier + Wis modifier.",
        level: 1,
        type: 'combat',
        usageType: 'passive'
      },
      {
        name: "Martial Arts",
        description: "Use Dex instead of Str for unarmed strikes and monk weapons. Unarmed strikes deal 1d4 damage. When you attack with unarmed strike or monk weapon, bonus action for unarmed strike.",
        level: 1,
        type: 'combat',
        usageType: 'at-will'
      },
      {
        name: "Ki",
        description: "Gain ki points equal to monk level. Spend ki for Flurry of Blows (1 ki, 2 unarmed strikes as bonus action), Patient Defense (1 ki, Dodge as bonus action), Step of the Wind (1 ki, Dash or Disengage as bonus action).",
        level: 2,
        type: 'combat',
        usageType: 'short-rest'
      },
      {
        name: "Unarmored Movement",
        description: "Speed increases by 10 feet while not wearing armor or wielding a shield.",
        level: 2,
        type: 'utility',
        usageType: 'passive'
      }
    ]
  };

  const features = classFeatures[characterClass] || [];
  return features.filter(feature => feature.level <= level);
}

// Get weapon proficiencies by class
export function getClassWeaponProficiencies(characterClass: string): {
  simple: boolean;
  martial: boolean;
  specific: string[];
} {
  const proficiencies: Record<string, {simple: boolean; martial: boolean; specific: string[]}> = {
    Barbarian: { simple: true, martial: true, specific: [] },
    Fighter: { simple: true, martial: true, specific: [] },
    Paladin: { simple: true, martial: true, specific: [] },
    Ranger: { simple: true, martial: true, specific: [] },
    
    Bard: { simple: true, martial: false, specific: ['Longsword', 'Rapier', 'Shortsword', 'Hand Crossbow'] },
    Cleric: { simple: true, martial: false, specific: [] },
    Druid: { simple: false, martial: false, specific: ['Club', 'Dagger', 'Dart', 'Javelin', 'Mace', 'Quarterstaff', 'Scimitar', 'Sickle', 'Sling', 'Spear'] },
    Monk: { simple: true, martial: false, specific: ['Shortsword'] },
    Rogue: { simple: true, martial: false, specific: ['Longsword', 'Rapier', 'Shortsword', 'Hand Crossbow'] },
    Sorcerer: { simple: false, martial: false, specific: ['Dagger', 'Dart', 'Sling', 'Quarterstaff', 'Light Crossbow'] },
    Warlock: { simple: true, martial: false, specific: [] },
    Wizard: { simple: false, martial: false, specific: ['Dagger', 'Dart', 'Sling', 'Quarterstaff', 'Light Crossbow'] }
  };

  return proficiencies[characterClass] || { simple: false, martial: false, specific: [] };
}

// Get armor proficiencies by class
export function getClassArmorProficiencies(characterClass: string): {
  light: boolean;
  medium: boolean;
  heavy: boolean;
  shields: boolean;
} {
  const proficiencies: Record<string, {light: boolean; medium: boolean; heavy: boolean; shields: boolean}> = {
    Barbarian: { light: true, medium: true, heavy: false, shields: true },
    Fighter: { light: true, medium: true, heavy: true, shields: true },
    Paladin: { light: true, medium: true, heavy: true, shields: true },
    Ranger: { light: true, medium: true, heavy: false, shields: true },
    Cleric: { light: true, medium: true, heavy: false, shields: true },
    
    Bard: { light: true, medium: false, heavy: false, shields: false },
    Druid: { light: true, medium: true, heavy: false, shields: true }, // Non-metal only
    Monk: { light: false, medium: false, heavy: false, shields: false },
    Rogue: { light: true, medium: false, heavy: false, shields: false },
    Sorcerer: { light: false, medium: false, heavy: false, shields: false },
    Warlock: { light: true, medium: false, heavy: false, shields: false },
    Wizard: { light: false, medium: false, heavy: false, shields: false }
  };

  return proficiencies[characterClass] || { light: false, medium: false, heavy: false, shields: false };
} 