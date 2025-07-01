// Complete D&D 5e SRD Racial Traits Database
// Source: System Reference Document 5.1 by Wizards of the Coast LLC
// Licensed under Creative Commons Attribution 4.0 International License
// https://dnd.wizards.com/resources/systems-reference-document

export const traitsData = [
  // Dwarf Traits
  {
    name: "Darkvision",
    description: "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
    type: "passive"
  },
  {
    name: "Dwarven Resilience",
    description: "You have advantage on saving throws against poison, and you have resistance against poison damage.",
    type: "passive"
  },
  {
    name: "Dwarven Combat Training",
    description: "You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.",
    type: "passive"
  },
  {
    name: "Tool Proficiency",
    description: "You gain proficiency with the artisan's tools of your choice: smith's tools, brewer's supplies, or mason's tools.",
    type: "passive"
  },
  {
    name: "Stonecunning",
    description: "Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.",
    type: "passive"
  },
  {
    name: "Dwarven Toughness",
    description: "Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.",
    type: "passive"
  },

  // Elf Traits
  {
    name: "Keen Senses",
    description: "You have proficiency in the Perception skill.",
    type: "passive"
  },
  {
    name: "Fey Ancestry",
    description: "You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
    type: "passive"
  },
  {
    name: "Trance",
    description: "Elves don't need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is \"trance.\") While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.",
    type: "passive"
  },
  {
    name: "Elf Weapon Training",
    description: "You have proficiency with the longsword, shortsword, shortbow, and longbow.",
    type: "passive"
  },
  {
    name: "Cantrip",
    description: "You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it.",
    type: "passive"
  },
  {
    name: "Extra Language",
    description: "You can speak, read, and write one extra language of your choice.",
    type: "passive"
  },

  // Halfling Traits
  {
    name: "Lucky",
    description: "When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.",
    type: "passive"
  },
  {
    name: "Brave",
    description: "You have advantage on saving throws against being frightened.",
    type: "passive"
  },
  {
    name: "Halfling Nimbleness",
    description: "You can move through the space of any creature that is of a size larger than yours.",
    type: "passive"
  },
  {
    name: "Naturally Stealthy",
    description: "You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.",
    type: "passive"
  },



  // Dragonborn Traits
  {
    name: "Draconic Ancestry",
    description: "You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type, as shown in the table.",
    type: "passive"
  },
  {
    name: "Breath Weapon",
    description: "You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level. After you use your breath weapon, you can't use it again until you complete a short or long rest.",
    type: "active"
  },
  {
    name: "Damage Resistance",
    description: "You have resistance to the damage type associated with your draconic ancestry.",
    type: "passive"
  },

  // Gnome Traits
  {
    name: "Gnome Cunning",
    description: "You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.",
    type: "passive"
  },
  {
    name: "Natural Illusionist",
    description: "You know the minor illusion cantrip. Intelligence is your spellcasting ability for it.",
    type: "passive"
  },
  {
    name: "Speak with Small Beasts",
    description: "Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts. Forest gnomes love animals and often keep squirrels, badgers, rabbits, moles, woodpeckers, and other creatures as beloved pets.",
    type: "passive"
  },
  {
    name: "Artificer's Lore",
    description: "Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.",
    type: "passive"
  },
  {
    name: "Tinker",
    description: "You have proficiency with artisan's tools (tinker's tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device functioning), or when you use your action to dismantle it; at that time, you can reclaim the materials used to create it. You can have up to three such devices active at a time. When you create a device, choose one of the following options: Clockwork Toy, Fire Starter, Music Box, or Tiny Clockwork Device.",
    type: "active"
  },


  {
    name: "Skill Versatility",
    description: "You gain proficiency in two skills of your choice.",
    type: "passive"
  },

  // Half-Orc Traits
  {
    name: "Menacing",
    description: "You gain proficiency in the Intimidation skill.",
    type: "passive"
  },
  {
    name: "Relentless Endurance",
    description: "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can't use this feature again until you finish a long rest.",
    type: "passive"
  },
  {
    name: "Savage Attacks",
    description: "When you score a critical hit with a melee weapon attack, you can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit.",
    type: "passive"
  },

  // Tiefling Traits
  {
    name: "Hellish Resistance",
    description: "You have resistance to fire damage.",
    type: "passive"
  },
  {
    name: "Infernal Legacy",
    description: "You know the thaumaturgy cantrip. When you reach 3rd level, you can cast the hellish rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.",
    type: "passive"
  },

  // Subrace Traits
  {
    name: "Dwarven Armor Training",
    description: "You have proficiency with light and medium armor.",
    type: "passive"
  },
  {
    name: "Dwarven Weapon Training",
    description: "You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.",
    type: "passive"
  },
  {
    name: "Duergar Magic",
    description: "When you reach 3rd level, you can cast the enlarge/reduce spell on yourself once with this trait, using only the spell's enlarge option. When you reach 5th level, you can cast the invisibility spell on yourself once with this trait. You don't need material components for either spell, and you can't cast them while you're in direct sunlight, although sunlight has no effect on them once cast. You regain the ability to cast these spells with this trait when you finish a long rest. Intelligence is your spellcasting ability for these spells.",
    type: "active"
  },

  // Missing Traits from Races Data
  {
    name: "Extra Skill",
    description: "You gain proficiency in one skill of your choice.",
    type: "passive"
  },
  {
    name: "Two Skills",
    description: "You gain proficiency in two skills of your choice.",
    type: "passive"
  },
  {
    name: "Celestial Resistance",
    description: "You have resistance to necrotic and radiant damage.",
    type: "passive"
  },
  {
    name: "Healing Hands",
    description: "As an action, you can touch a creature and cause it to regain a number of hit points equal to your level. Once you use this trait, you can't use it again until you finish a long rest.",
    type: "active"
  },
  {
    name: "Natural Athlete",
    description: "You have proficiency in the Athletics skill.",
    type: "passive"
  },
  {
    name: "Stone's Endurance",
    description: "You can focus yourself to occasionally shrug off injury. When you take damage, you can use your reaction to roll a d12. Add your Constitution modifier to the number rolled and reduce the damage by that total. After you use this trait, you can't use it again until you finish a short or long rest.",
    type: "active"
  },
  {
    name: "Powerful Build",
    description: "You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",
    type: "passive"
  },
  {
    name: "Feline Agility",
    description: "Your reflexes and agility allow you to move with a burst of speed. When you move on your turn in combat, you can double your speed until the end of the turn. Once you use this trait, you can't use it again until you move 0 feet on one of your turns.",
    type: "active"
  },
  {
    name: "Cat's Claws",
    description: "Because of your claws, you have a climbing speed of 20 feet. In addition, your claws are natural weapons, which you can use to make unarmed strikes. If you hit with them, you deal slashing damage equal to 1d4 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.",
    type: "passive"
  },
  {
    name: "Cat's Talents",
    description: "You have proficiency in the Perception and Stealth skills.",
    type: "passive"
  },
  {
    name: "Sunlight Sensitivity",
    description: "You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.",
    type: "passive"
  },
  {
    name: "Superior Darkvision",
    description: "Your darkvision has a radius of 120 feet.",
    type: "passive"
  },
  {
    name: "High Elf Cantrip",
    description: "You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it.",
    type: "passive"
  },
  {
    name: "Wood Elf Fleet of Foot",
    description: "Your base walking speed increases to 35 feet.",
    type: "passive"
  },
  {
    name: "Wood Elf Mask of the Wild",
    description: "You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.",
    type: "passive"
  },
  {
    name: "Drow Magic",
    description: "You know the dancing lights cantrip. When you reach 3rd level, you can cast the faerie fire spell once per day. When you reach 5th level, you can also cast the darkness spell once per day. Charisma is your spellcasting ability for these spells.",
    type: "active"
  },
  {
    name: "Drow Weapon Training",
    description: "You have proficiency with rapiers, shortswords, and hand crossbows.",
    type: "passive"
  },
  {
    name: "Forest Gnome Natural Illusionist",
    description: "You know the minor illusion cantrip. Intelligence is your spellcasting ability for it.",
    type: "passive"
  },
  {
    name: "Rock Gnome Artificer's Lore",
    description: "Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.",
    type: "passive"
  },
  {
    name: "Rock Gnome Tinker",
    description: "You have proficiency with artisan's tools (tinker's tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device functioning), or when you use your action to dismantle it; at that time, you can reclaim the materials used to create it. You can have up to three such devices active at a time. When you create a device, choose one of the following options: Clockwork Toy, Fire Starter, Music Box, or Tiny Clockwork Device.",
    type: "active"
  }
]; 