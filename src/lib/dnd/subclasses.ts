// D&D 5e Subclasses - chosen at specific levels (usually level 1 or 3)

export interface Subclass {
  name: string;
  class: string;
  description: string;
  chosenAtLevel: number; // When this subclass is selected
  features: string[]; // Key features this subclass provides
}

export const SUBCLASSES: Record<string, Subclass[]> = {
  Barbarian: [
    {
      name: "Path of the Berserker",
      class: "Barbarian",
      description: "Channel your rage into devastating fury. Embrace the primal violence within.",
      chosenAtLevel: 3,
      features: ["Frenzy (extra attack while raging)", "Mindless Rage (immune to charm/frighten)", "Intimidating Presence"]
    },
    {
      name: "Path of the Totem Warrior",
      class: "Barbarian", 
      description: "Draw power from animal spirits. Choose totem animals for guidance and strength.",
      chosenAtLevel: 3,
      features: ["Totem Spirit (bear/eagle/wolf)", "Aspect of the Beast", "Totemic Attunement"]
    },
    {
      name: "Path of the Wild Soul",
      class: "Barbarian",
      description: "Your rage is infused with chaotic magic, creating unpredictable effects.",
      chosenAtLevel: 3,
      features: ["Wild Surge", "Magic Reserves", "Arcane Rebuke"]
    }
  ],

  Bard: [
    {
      name: "College of Lore",
      class: "Bard",
      description: "Master of knowledge and secrets. Learn spells from any class and cutting words.",
      chosenAtLevel: 3,
      features: ["Cutting Words", "Additional Magical Secrets", "Versatile knowledge"]
    },
    {
      name: "College of Valor", 
      class: "Bard",
      description: "Warrior-poet who inspires allies in battle. Gain armor and weapon proficiencies.",
      chosenAtLevel: 3,
      features: ["Combat Inspiration", "Extra Attack", "Medium armor & shield proficiency"]
    },
    {
      name: "College of Glamour",
      class: "Bard",
      description: "Tap into the fey realm's magic. Entrance enemies and rally allies with supernatural charisma.",
      chosenAtLevel: 3,
      features: ["Mantle of Inspiration", "Enthralling Performance", "Mantle of Majesty"]
    }
  ],

  Cleric: [
    {
      name: "Life Domain",
      class: "Cleric",
      description: "Master of healing and protection. Channel divine energy to preserve life.",
      chosenAtLevel: 1,
      features: ["Disciple of Life", "Preserve Life", "Blessed Healer", "Divine Strike"]
    },
    {
      name: "Light Domain",
      class: "Cleric", 
      description: "Wield radiant magic and fire. Burn away darkness and protect the innocent.",
      chosenAtLevel: 1,
      features: ["Warding Flare", "Radiance of the Dawn", "Improved Flare", "Corona of Light"]
    },
    {
      name: "War Domain",
      class: "Cleric",
      description: "Divine warrior blessed with martial prowess. Lead the faithful into battle.",
      chosenAtLevel: 1,
      features: ["War Priest", "Guided Strike", "War Domain spells", "Avatar of Battle"]
    },
    {
      name: "Tempest Domain",
      class: "Cleric",
      description: "Command lightning and thunder. Channel the fury of storms.",
      chosenAtLevel: 1,
      features: ["Wrath of the Storm", "Destructive Wrath", "Thunderbolt Strike", "Stormborn"]
    }
  ],

  Druid: [
    {
      name: "Circle of the Land",
      class: "Druid",
      description: "Mystic of the natural world. Gain additional spells based on your chosen terrain.",
      chosenAtLevel: 2,
      features: ["Natural Recovery", "Circle Spells", "Land's Stride", "Nature's Sanctuary"]
    },
    {
      name: "Circle of the Moon",
      class: "Druid",
      description: "Master shapeshifter. Transform into powerful beasts and fight in wild form.",
      chosenAtLevel: 2,
      features: ["Combat Wild Shape", "Circle Forms", "Primal Strike", "Elemental Wild Shape"]
    },
    {
      name: "Circle of Stars",
      class: "Druid",
      description: "Draw power from constellations. Use starry forms and cosmic magic.",
      chosenAtLevel: 2,
      features: ["Star Map", "Starry Form", "Cosmic Omen", "Twinkling Constellations"]
    }
  ],

  Fighter: [
    {
      name: "Champion",
      class: "Fighter",
      description: "Master of weapons and athletics. Excel at straightforward combat.",
      chosenAtLevel: 3,
      features: ["Improved Critical", "Remarkable Athlete", "Additional Fighting Style", "Superior Critical"]
    },
    {
      name: "Battle Master",
      class: "Fighter", 
      description: "Tactical combatant who uses maneuvers. Control the battlefield with technique.",
      chosenAtLevel: 3,
      features: ["Combat Superiority", "Maneuvers", "Know Your Enemy", "Improved Combat Superiority"]
    },
    {
      name: "Eldritch Knight",
      class: "Fighter",
      description: "Warrior-mage who blends sword and sorcery. Cast spells while fighting.",
      chosenAtLevel: 3,
      features: ["Spellcasting", "Weapon Bond", "War Magic", "Eldritch Strike"]
    }
  ],

  Monk: [
    {
      name: "Way of the Open Hand",
      class: "Monk",
      description: "Master of unarmed combat. Push, knock down, and stun your enemies.",
      chosenAtLevel: 3,
      features: ["Open Hand Technique", "Wholeness of Body", "Tranquility", "Quivering Palm"]
    },
    {
      name: "Way of Shadow",
      class: "Monk",
      description: "Ninja-like warrior who uses darkness and stealth. Teleport through shadows.",
      chosenAtLevel: 3,
      features: ["Shadow Arts", "Shadow Step", "Cloak of Shadows", "Opportunist"]
    },
    {
      name: "Way of the Four Elements",
      class: "Monk",
      description: "Channel elemental forces through ki. Cast elemental spells and techniques.",
      chosenAtLevel: 3,
      features: ["Elemental Disciplines", "Elemental spells", "Enhanced Disciplines"]
    }
  ],

  Paladin: [
    {
      name: "Oath of Devotion",
      class: "Paladin", 
      description: "Classic holy warrior. Protect the innocent and fight evil with unwavering dedication.",
      chosenAtLevel: 3,
      features: ["Sacred Weapon", "Turn the Unholy", "Aura of Devotion", "Purity of Spirit"]
    },
    {
      name: "Oath of the Ancients",
      class: "Paladin",
      description: "Defender of nature and joy. Fight against darkness that would destroy beauty.",
      chosenAtLevel: 3,
      features: ["Nature's Wrath", "Turn the Faithless", "Aura of Warding", "Undying Sentinel"]
    },
    {
      name: "Oath of Vengeance",
      class: "Paladin",
      description: "Relentless hunter of evil. Pursue and destroy those who commit great wickedness.",
      chosenAtLevel: 3,
      features: ["Abjure Enemy", "Vow of Enmity", "Relentless Avenger", "Soul of Vengeance"]
    }
  ],

  Ranger: [
    {
      name: "Hunter",
      class: "Ranger",
      description: "Versatile warrior against monstrous threats. Specialize in fighting specific enemy types.",
      chosenAtLevel: 3,
      features: ["Hunter's Prey", "Defensive Tactics", "Multiattack", "Superior Hunter's Defense"]
    },
    {
      name: "Beast Master",
      class: "Ranger",
      description: "Bond with an animal companion. Fight alongside your loyal beast ally.",
      chosenAtLevel: 3,
      features: ["Ranger's Companion", "Exceptional Training", "Bestial Fury", "Share Spells"]
    },
    {
      name: "Gloom Stalker",
      class: "Ranger",
      description: "Defender against creatures from dark realms. Excel in darkness and surprise attacks.",
      chosenAtLevel: 3,
      features: ["Dread Ambusher", "Umbral Sight", "Iron Mind", "Stalker's Flurry"]
    }
  ],

  Rogue: [
    {
      name: "Thief",
      class: "Rogue",
      description: "Master burglar and acrobat. Use quick hands and climbing skills.",
      chosenAtLevel: 3,
      features: ["Fast Hands", "Second-Story Work", "Supreme Sneak", "Use Magic Device"]
    },
    {
      name: "Assassin",
      class: "Rogue",
      description: "Master of disguise and death. Strike with deadly precision from hiding.",
      chosenAtLevel: 3,
      features: ["Bonus Proficiencies", "Assassinate", "Infiltration Expertise", "Impostor"]
    },
    {
      name: "Arcane Trickster",
      class: "Rogue",
      description: "Thief who uses magic. Enhance roguish abilities with illusion and enchantment.",
      chosenAtLevel: 3,
      features: ["Spellcasting", "Mage Hand Legerdemain", "Magical Ambush", "Versatile Trickster"]
    }
  ],

  Sorcerer: [
    {
      name: "Draconic Bloodline",
      class: "Sorcerer",
      description: "Magic flows from draconic ancestry. Gain resilience and elemental affinity.",
      chosenAtLevel: 1,
      features: ["Dragon Ancestor", "Draconic Resilience", "Elemental Affinity", "Dragon Wings"]
    },
    {
      name: "Wild Magic",
      class: "Sorcerer", 
      description: "Unpredictable magic surges through you. Embrace chaos and wild power.",
      chosenAtLevel: 1,
      features: ["Wild Magic Surge", "Tides of Chaos", "Bend Luck", "Controlled Chaos"]
    },
    {
      name: "Divine Soul",
      class: "Sorcerer",
      description: "Blessed with divine magic. Access both sorcerer and cleric spell lists.",
      chosenAtLevel: 1,
      features: ["Divine Magic", "Favored by the Gods", "Empowered Healing", "Otherworldly Wings"]
    }
  ],

  Warlock: [
    {
      name: "The Fiend",
      class: "Warlock",
      description: "Pact with a being from the Lower Planes. Gain fiery powers and dark resilience.",
      chosenAtLevel: 1,
      features: ["Dark One's Blessing", "Dark One's Own Luck", "Fiendish Resilience", "Hurl Through Hell"]
    },
    {
      name: "The Archfey",
      class: "Warlock",
      description: "Pact with a fey lord or lady. Charm enemies and step between worlds.",
      chosenAtLevel: 1,
      features: ["Fey Presence", "Misty Escape", "Beguiling Defenses", "Dark Delirium"]
    },
    {
      name: "The Great Old One",
      class: "Warlock",
      description: "Pact with an alien intelligence. Communicate telepathically and control minds.",
      chosenAtLevel: 1,
      features: ["Telepathic Communication", "Entropic Ward", "Thought Shield", "Create Thrall"]
    }
  ],

  Wizard: [
    {
      name: "School of Evocation",
      class: "Wizard",
      description: "Master of destructive magic. Sculpt spells to protect allies from your blasts.",
      chosenAtLevel: 2,
      features: ["Sculpt Spells", "Potent Cantrip", "Empowered Evocation", "Overchannel"]
    },
    {
      name: "School of Abjuration",
      class: "Wizard",
      description: "Protector and defender. Create magical wards and dispel enemy magic.",
      chosenAtLevel: 2,
      features: ["Arcane Ward", "Projected Ward", "Improved Abjuration", "Spell Resistance"]
    },
    {
      name: "School of Divination",
      class: "Wizard",
      description: "Seer who peers into the future. Manipulate fate and foresee danger.",
      chosenAtLevel: 2,
      features: ["Portent", "Expert Divination", "The Third Eye", "Greater Portent"]
    },
    {
      name: "School of Necromancy", 
      class: "Wizard",
      description: "Master of death magic. Animate undead and drain life from enemies.",
      chosenAtLevel: 2,
      features: ["Grim Harvest", "Undead Thralls", "Inured to Undeath", "Command Undead"]
    }
  ]
};

// Get available subclasses for a class
export function getSubclassesForClass(characterClass: string): Subclass[] {
  return SUBCLASSES[characterClass] || [];
}

// Get the level at which a class chooses their subclass
export function getSubclassChoiceLevel(characterClass: string): number {
  const subclasses = getSubclassesForClass(characterClass);
  return subclasses.length > 0 ? subclasses[0].chosenAtLevel : 3; // Default to 3 if no subclasses
}

// Check if a class should choose a subclass at character creation (level 1)
export function choosesSubclassAtCreation(characterClass: string): boolean {
  return getSubclassChoiceLevel(characterClass) === 1;
} 