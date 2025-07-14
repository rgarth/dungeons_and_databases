import { Monster } from '@/types/monster';

export const monstersData: Monster[] = [
  {
    name: "Aboleth",
    size: "Large",
    type: "aberration",
    alignment: "Lawful Evil",
    challengeRating: "10",
    xp: 5900,
    
    // Ability Scores
    strength: 21,
    dexterity: 9,
    constitution: 15,
    intelligence: 18,
    wisdom: 15,
    charisma: 18,
    
    // Combat Stats
    armorClass: 17,
    armorType: "natural armor",
    hitPoints: 135,
    hitDice: "18d10+36",
    speed: {
      walk: 10,
      swim: 40
    },
    
    // Proficiencies
    savingThrows: {
      constitution: 6,
      intelligence: 8,
      wisdom: 6
    },
    skills: {
      "History": 12,
      "Perception": 10
    },
    damageResistances: ["cold", "psychic"],
    damageImmunities: ["acid"],
    conditionImmunities: ["charmed", "exhaustion", "paralyzed", "petrified", "poisoned", "stunned"],
    
    // Senses
    senses: {
      darkvision: 120,
      passivePerception: 20
    },
    
    // Languages
    languages: ["Deep Speech", "Undercommon", "telepathy 120 ft."],
    telepathy: 120,
    
    // Challenge Rating Details
    proficiencyBonus: 4,
    
    // Traits
    traits: [
      {
        name: "Amphibious",
        description: "The aboleth can breathe air and water."
      },
      {
        name: "Mucous Cloud",
        description: "While underwater, the aboleth is surrounded by transformative mucus. A creature that touches the aboleth or that hits it with a melee attack while within 5 feet of it must make a DC 14 Constitution saving throw. On a failure, the creature is diseased for 1d4 hours. The diseased creature can breathe only underwater."
      },
      {
        name: "Probing Telepathy",
        description: "If a creature communicates telepathically with the aboleth, the aboleth learns the creature's greatest desires if the aboleth can see the creature."
      }
    ],
    
    // Actions
    actions: [
      {
        name: "Multiattack",
        description: "The aboleth makes three tentacle attacks."
      },
      {
        name: "Tentacle",
        description: "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Constitution saving throw or become diseased. The disease has no effect for 1 minute and can be removed by any magic that cures disease. After 1 minute, the diseased creature's skin becomes translucent and slimy, the creature can't regain hit points unless it is underwater, and the disease can be removed only by heal or another disease-curing spell of 6th level or higher. When the creature is outside a body of water, it takes 6 (1d12) acid damage every 10 minutes unless moisture is applied to the skin before 10 minutes have passed."
      },
      {
        name: "Tail",
        description: "Melee Weapon Attack: +9 to hit, reach 10 ft. one target. Hit: 15 (3d6 + 5) bludgeoning damage."
      },
      {
        name: "Enslave (3/Day)",
        description: "The aboleth targets one creature it can see within 30 feet of it. The target must succeed on a DC 14 Wisdom saving throw or be magically charmed by the aboleth until the aboleth dies or until it is on a different plane of existence from the target. The charmed target is under the aboleth's control and can't take reactions, and the aboleth and the target can communicate telepathically with each other over any distance. Whenever the charmed target takes damage, the target can repeat the saving throw. On a success, the effect ends. No more than once every 24 hours, the target can also repeat the saving throw when it is at least 1 mile away from the aboleth."
      }
    ],
    
    // Legendary Actions
    legendaryActions: [
      {
        name: "Detect",
        cost: 1,
        description: "The aboleth makes a Wisdom (Perception) check."
      },
      {
        name: "Tail Swipe",
        cost: 2,
        description: "The aboleth makes one tail attack."
      },
      {
        name: "Psychic Drain (Costs 2 Actions)",
        cost: 2,
        description: "One creature charmed by the aboleth takes 10 (3d6) psychic damage, and the aboleth regains hit points equal to the damage the creature takes."
      }
    ],
    
    // Description and Lore
    description: "Aboleths are among the oldest of the aberrations, predating the gods themselves. These revolting fishlike creatures combine physical might with formidable psionic power.",
    background: "Aboleths dwell in the deepest reaches of the ocean, in subterranean lakes, and in other water-filled caverns. They are the undisputed masters of their domains, and they view all other creatures as either slaves or food.",
    environment: ["underwater", "underground"],
    organization: "Solitary or colony (2-4)",
    
    // Image Generation
    imagePrompt: "A massive, ancient aboleth with translucent, slimy skin, multiple tentacles, and glowing eyes. Dark underwater environment with eerie lighting.",
    imageStyle: "dark fantasy",
    
    // Metadata
    source: "SRD",
    tags: ["aberration", "aquatic", "psionic", "ancient", "evil"]
  },
  
  {
    name: "Goblin",
    size: "Small",
    type: "humanoid",
    subtype: "goblinoid",
    alignment: "Neutral Evil",
    challengeRating: "1/4",
    xp: 50,
    
    // Ability Scores
    strength: 8,
    dexterity: 14,
    constitution: 10,
    intelligence: 10,
    wisdom: 8,
    charisma: 8,
    
    // Combat Stats
    armorClass: 15,
    armorType: "leather armor, shield",
    hitPoints: 7,
    hitDice: "2d6",
    speed: {
      walk: 30
    },
    
    // Proficiencies
    skills: {
      "Stealth": 6
    },
    damageResistances: [],
    damageImmunities: [],
    conditionImmunities: [],
    damageVulnerabilities: [],
    
    // Senses
    senses: {
      darkvision: 60,
      passivePerception: 9
    },
    
    // Languages
    languages: ["Common", "Goblin"],
    
    // Challenge Rating Details
    proficiencyBonus: 2,
    
    // Traits
    traits: [
      {
        name: "Nimble Escape",
        description: "The goblin can take the Disengage or Hide action as a bonus action on each of its turns."
      }
    ],
    
    // Actions
    actions: [
      {
        name: "Scimitar",
        description: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage.",
        attackBonus: 4,
        damage: {
          type: "slashing",
          roll: "1d6+2",
          average: 5
        }
      },
      {
        name: "Shortbow",
        description: "Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        attackBonus: 4,
        damage: {
          type: "piercing",
          roll: "1d6+2",
          average: 5
        }
      }
    ],
    
    // Description and Lore
    description: "Goblins are small, black-hearted, selfish humanoids that lair in caves, abandoned mines, despoiled dungeons, and other dismal settings.",
    background: "Goblins are typically found in tribes ruled by the strongest or smartest among them. A goblin boss might command a single lair, while a goblin king or queen (who is actually a hobgoblin) might rule hundreds of goblins, spread out among multiple lairs to ensure the tribe's survival.",
    environment: ["forest", "hill", "mountain", "underground"],
    organization: "Gang (2-12) or band (3-6)",
    
    // Image Generation
    imagePrompt: "A small, wiry goblin with greenish skin, pointed ears, and yellow eyes. Wearing leather armor and wielding a scimitar. Sneaky and cunning expression.",
    imageStyle: "fantasy",
    
    // Metadata
    source: "SRD",
    tags: ["humanoid", "goblinoid", "small", "evil", "stealthy"]
  }
];

// Helper functions for monster data
export const getMonsterByName = (name: string): Monster | undefined => {
  return monstersData.find(monster => 
    monster.name.toLowerCase() === name.toLowerCase()
  );
};

export const getMonstersByType = (type: string): Monster[] => {
  return monstersData.filter(monster => 
    monster.type.toLowerCase() === type.toLowerCase()
  );
};

export const getMonstersByChallengeRating = (cr: string): Monster[] => {
  return monstersData.filter(monster => 
    monster.challengeRating === cr
  );
};

export const getMonstersBySize = (size: string): Monster[] => {
  return monstersData.filter(monster => 
    monster.size.toLowerCase() === size.toLowerCase()
  );
};

export const searchMonsters = (query: string): Monster[] => {
  const lowerQuery = query.toLowerCase();
  return monstersData.filter(monster => 
    monster.name.toLowerCase().includes(lowerQuery) ||
    monster.type.toLowerCase().includes(lowerQuery) ||
    monster.subtype?.toLowerCase().includes(lowerQuery) ||
    monster.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}; 