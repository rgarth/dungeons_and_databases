import { Monster } from '@/types/monster';

export const swarmMonsters: Monster[] = [
  {
    "name": "Swarm of Bats",
    "size": "Medium",
    "type": "swarm of Tiny beasts",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 5,
    "dexterity": 15,
    "constitution": 10,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 4,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 22,
    "hitDice": "5d8",
    "speed": {
      "walk": 0,
      "fly": 30
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning",
      "piercing",
      "slashing"
    ],
    "damageImmunities": [],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 11,
      "blindsight": 60
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Echolocation",
        "description": "The swarm can't use its blindsight while deafened."
      },
      {
        "name": "Keen Hearing",
        "description": "The swarm has advantage on Wisdom (Perception) checks that rely on hearing."
      },
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny bat. The swarm can't regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "name": "Bites",
        "description": "Melee Weapon Attack: +4 to hit, reach 0 ft., one creature in the swarm's space. Hit: 5 (2d4) piercing damage, or 2 (1d4) piercing damage if the swarm has half of its hit points or fewer.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "2d4",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "A medium swarm of Tiny beasts with challenge rating 0.25.",    "imagePrompt": "Multiple bats flying together in a dark cloud formation, swarm of flying creatures, no single portrait focus",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "swarm of Tiny beasts",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Swarm of Beetles",
    "size": "Medium",
    "type": "swarm of Tiny beasts",
    "alignment": "unaligned",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 3,
    "dexterity": 13,
    "constitution": 10,
    "intelligence": 1,
    "wisdom": 7,
    "charisma": 1,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 22,
    "hitDice": "5d8",
    "speed": {
      "walk": 20,
      "climb": 20,
      "burrow": 5
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning",
      "piercing",
      "slashing"
    ],
    "damageImmunities": [],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 8,
      "blindsight": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny insect. The swarm can't regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "name": "Bites",
        "description": "Melee Weapon Attack: +3 to hit, reach 0 ft., one target in the swarm's space. Hit: 10 (4d4) piercing damage, or 5 (2d4) piercing damage if the swarm has half of its hit points or fewer.",
        "attackBonus": 3,
        "damage": {
          "type": "Piercing",
          "roll": "4d4",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "A medium swarm of Tiny beasts with challenge rating 0.5.",    "imagePrompt": "Multiple beetles crawling together in a mass formation, swarm of insects, no single portrait focus",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "swarm of Tiny beasts",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Swarm of Centipedes",
    "size": "Medium",
    "type": "swarm of Tiny beasts",
    "alignment": "unaligned",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 3,
    "dexterity": 13,
    "constitution": 10,
    "intelligence": 1,
    "wisdom": 7,
    "charisma": 1,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 22,
    "hitDice": "5d8",
    "speed": {
      "walk": 20,
      "climb": 20
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning",
      "piercing",
      "slashing"
    ],
    "damageImmunities": [],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 8,
      "blindsight": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny insect. The swarm can't regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "name": "Bites",
        "description": "Melee Weapon Attack: +3 to hit, reach 0 ft., one target in the swarm's space. Hit: 10 (4d4) piercing damage, or 5 (2d4) piercing damage if the swarm has half of its hit points or fewer.\nA creature reduced to 0 hit points by a swarm of centipedes is stable but poisoned for 1 hour, even after regaining hit points, and paralyzed while poisoned in this way.",
        "attackBonus": 3,
        "damage": {
          "type": "Piercing",
          "roll": "4d4",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "A medium swarm of Tiny beasts with challenge rating 0.5.",    "imagePrompt": "Multiple centipedes writhing together in a mass formation, swarm of poisonous insects, no single portrait focus",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "swarm of Tiny beasts",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Swarm of Insects",
    "size": "Medium",
    "type": "swarm of Tiny beasts",
    "alignment": "unaligned",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 3,
    "dexterity": 13,
    "constitution": 10,
    "intelligence": 1,
    "wisdom": 7,
    "charisma": 1,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 22,
    "hitDice": "5d8",
    "speed": {
      "walk": 20,
      "climb": 20
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning",
      "piercing",
      "slashing"
    ],
    "damageImmunities": [],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 8,
      "blindsight": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny insect. The swarm can't regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "name": "Bites",
        "description": "Melee Weapon Attack: +3 to hit, reach 0 ft., one target in the swarm's space. Hit: 10 (4d4) piercing damage, or 5 (2d4) piercing damage if the swarm has half of its hit points or fewer.",
        "attackBonus": 3,
        "damage": {
          "type": "Piercing",
          "roll": "4d4",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "A medium swarm of Tiny beasts with challenge rating 0.5.",    "imagePrompt": "A medium swarm of Tiny beasts creature",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "swarm of Tiny beasts",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Swarm of Poisonous Snakes",
    "size": "Medium",
    "type": "swarm of Tiny beasts",
    "alignment": "unaligned",
    "challengeRating": "2",
    "xp": 450,
    "strength": 8,
    "dexterity": 18,
    "constitution": 11,
    "intelligence": 1,
    "wisdom": 10,
    "charisma": 3,
    "armorClass": 14,
    "armorType": "dex",
    "hitPoints": 36,
    "hitDice": "8d8",
    "speed": {
      "walk": 30,
      "swim": 30
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning",
      "piercing",
      "slashing"
    ],
    "damageImmunities": [],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10,
      "blindsight": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny snake. The swarm can't regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "name": "Bites",
        "description": "Melee Weapon Attack: +6 to hit, reach 0 ft., one creature in the swarm's space. Hit: 7 (2d6) piercing damage, or 3 (1d6) piercing damage if the swarm has half of its hit points or fewer. The target must make a DC 10 Constitution saving throw, taking 14 (4d6) poison damage on a failed save, or half as much damage on a successful one.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "2d6",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "A medium swarm of Tiny beasts with challenge rating 2.",    "imagePrompt": "A medium swarm of Tiny beasts creature",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "swarm of Tiny beasts",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Swarm of Quippers",
    "size": "Medium",
    "type": "swarm of Tiny beasts",
    "alignment": "unaligned",
    "challengeRating": "1",
    "xp": 200,
    "strength": 13,
    "dexterity": 16,
    "constitution": 9,
    "intelligence": 1,
    "wisdom": 7,
    "charisma": 2,
    "armorClass": 13,
    "armorType": "dex",
    "hitPoints": 28,
    "hitDice": "8d8+-8",
    "speed": {
      "walk": 0,
      "swim": 40
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning",
      "piercing",
      "slashing"
    ],
    "damageImmunities": [],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 8,
      "darkvision": 60
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Blood Frenzy",
        "description": "The swarm has advantage on melee attack rolls against any creature that doesn't have all its hit points."
      },
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny quipper. The swarm can't regain hit points or gain temporary hit points."
      },
      {
        "name": "Water Breathing",
        "description": "The swarm can breathe only underwater."
      }
    ],
    "actions": [
      {
        "name": "Bites",
        "description": "Melee Weapon Attack: +5 to hit, reach 0 ft., one creature in the swarm's space. Hit: 14 (4d6) piercing damage, or 7 (2d6) piercing damage if the swarm has half of its hit points or fewer.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "4d6",
          "average": 14
        }
      }
    ],
    "legendaryActions": [],
    "description": "A medium swarm of Tiny beasts with challenge rating 1.",    "imagePrompt": "A medium swarm of Tiny beasts creature",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "swarm of Tiny beasts",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Swarm of Rats",
    "size": "Medium",
    "type": "swarm of Tiny beasts",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 9,
    "dexterity": 11,
    "constitution": 9,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 3,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 24,
    "hitDice": "7d8+-7",
    "speed": {
      "walk": 30
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning",
      "piercing",
      "slashing"
    ],
    "damageImmunities": [],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10,
      "darkvision": 30
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The swarm has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny rat. The swarm can't regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "name": "Bites",
        "description": "Melee Weapon Attack: +2 to hit, reach 0 ft., one target in the swarm's space. Hit: 7 (2d6) piercing damage, or 3 (1d6) piercing damage if the swarm has half of its hit points or fewer.",
        "attackBonus": 2,
        "damage": {
          "type": "Piercing",
          "roll": "2d6",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "A medium swarm of Tiny beasts with challenge rating 0.25.",    "imagePrompt": "A medium swarm of Tiny beasts creature",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "swarm of Tiny beasts",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Swarm of Ravens",
    "size": "Medium",
    "type": "swarm of Tiny beasts",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 6,
    "dexterity": 14,
    "constitution": 8,
    "intelligence": 3,
    "wisdom": 12,
    "charisma": 6,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 24,
    "hitDice": "7d8+-7",
    "speed": {
      "walk": 10,
      "fly": 50
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning",
      "piercing",
      "slashing"
    ],
    "damageImmunities": [],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 15
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny raven. The swarm can't regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "name": "Beaks",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target in the swarm's space. Hit: 7 (2d6) piercing damage, or 3 (1d6) piercing damage if the swarm has half of its hit points or fewer.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "2d6",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "A medium swarm of Tiny beasts with challenge rating 0.25.",    "imagePrompt": "A medium swarm of Tiny beasts creature",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "swarm of Tiny beasts",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Swarm of Spiders",
    "size": "Medium",
    "type": "swarm of Tiny beasts",
    "alignment": "unaligned",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 3,
    "dexterity": 13,
    "constitution": 10,
    "intelligence": 1,
    "wisdom": 7,
    "charisma": 1,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 22,
    "hitDice": "5d8",
    "speed": {
      "walk": 20,
      "climb": 20
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning",
      "piercing",
      "slashing"
    ],
    "damageImmunities": [],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Paralyzed",
      "Petrified",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 8,
      "blindsight": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny insect. The swarm can't regain hit points or gain temporary hit points."
      },
      {
        "name": "Spider Climb",
        "description": "The swarm can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Sense",
        "description": "While in contact with a web, the swarm knows the exact location of any other creature in contact with the same web."
      },
      {
        "name": "Web Walker",
        "description": "The swarm ignores movement restrictions caused by webbing."
      }
    ],
    "actions": [
      {
        "name": "Bites",
        "description": "Melee Weapon Attack: +3 to hit, reach 0 ft., one target in the swarm's space. Hit: 10 (4d4) piercing damage, or 5 (2d4) piercing damage if the swarm has half of its hit points or fewer.",
        "attackBonus": 3,
        "damage": {
          "type": "Piercing",
          "roll": "4d4",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "A medium swarm of Tiny beasts with challenge rating 0.5.",    "imagePrompt": "A MASSIVE SWARM of HUNDREDS of spiders, thousands of tiny spiders crawling over each other, dense cloud of spiders, spider swarm covering area, NOT just a few spiders, clearly hundreds of individual spiders moving together",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "swarm of Tiny beasts",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Swarm of Wasps",
    "size": "Medium",
    "type": "swarm of Tiny beasts",
    "alignment": "unaligned",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 3,
    "dexterity": 13,
    "constitution": 10,
    "intelligence": 1,
    "wisdom": 7,
    "charisma": 1,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 22,
    "hitDice": "5d8",
    "speed": {
      "walk": 5,
      "fly": 30
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning",
      "piercing",
      "slashing"
    ],
    "damageImmunities": [],
    "conditionImmunities": [
      "Charmed",
      "Frightened",
      "Grappled",
      "Paralyzed",
      "Petrified",
      "Prone",
      "Restrained",
      "Stunned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 8,
      "blindsight": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Swarm",
        "description": "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny insect. The swarm can't regain hit points or gain temporary hit points."
      }
    ],
    "actions": [
      {
        "name": "Bites",
        "description": "Melee Weapon Attack: +3 to hit, reach 0 ft., one target in the swarm's space. Hit: 10 (4d4) piercing damage, or 5 (2d4) piercing damage if the swarm has half of its hit points or fewer.",
        "attackBonus": 3,
        "damage": {
          "type": "Piercing",
          "roll": "4d4",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "A medium swarm of Tiny beasts with challenge rating 0.5.",    "imagePrompt": "A MASSIVE SWARM of HUNDREDS of wasps, thousands of angry wasps flying together, dense cloud of wasps, wasp swarm covering area, NOT just a single wasp, clearly hundreds of individual wasps flying in formation",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "swarm of Tiny beasts",
      "medium",
      "unaligned"
    ]
  }
];
