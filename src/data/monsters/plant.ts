import { Monster } from '@/types/monster';

export const plantMonsters: Monster[] = [
  {
    "name": "Awakened Shrub",
    "size": "Small",
    "type": "plant",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 3,
    "dexterity": 8,
    "constitution": 11,
    "intelligence": 10,
    "wisdom": 10,
    "charisma": 6,
    "armorClass": 9,
    "armorType": "dex",
    "hitPoints": 10,
    "hitDice": "3d6",
    "speed": {
      "walk": 20
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "piercing"
    ],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [
      "fire"
    ],
    "senses": {
      "passivePerception": 10
    },
    "languages": [
      "one language known by its creator"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the shrub remains motionless, it is indistinguishable from a normal shrub."
      }
    ],
    "actions": [
      {
        "name": "Rake",
        "description": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 1 (1d4 - 1) slashing damage.",
        "attackBonus": 1,
        "damage": {
          "type": "Slashing",
          "roll": "1d4-1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "An awakened shrub is an ordinary shrub given sentience and mobility by the awaken spell or similar magic.",
    "background": "An awakened shrub is an ordinary shrub given sentience and mobility by the awaken spell or similar magic.",
    "imagePrompt": "A small plant creature with plant-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "plant",
      "small",
      "unaligned",
      "plant"
    ]
  },
  {
    "name": "Awakened Tree",
    "size": "Huge",
    "type": "plant",
    "alignment": "unaligned",
    "challengeRating": "2",
    "xp": 450,
    "strength": 19,
    "dexterity": 6,
    "constitution": 15,
    "intelligence": 10,
    "wisdom": 10,
    "charisma": 7,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 59,
    "hitDice": "7d12+14",
    "speed": {
      "walk": 20
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning",
      "piercing"
    ],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [
      "fire"
    ],
    "senses": {
      "passivePerception": 10
    },
    "languages": [
      "one language known by its creator"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the tree remains motionless, it is indistinguishable from a normal tree."
      }
    ],
    "actions": [
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 14 (3d6 + 4) bludgeoning damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d6+4",
          "average": 15
        }
      }
    ],
    "legendaryActions": [],
    "description": "An awakened tree is an ordinary tree given sentience and mobility by the awaken spell or similar magic.",
    "background": "An awakened tree is an ordinary tree given sentience and mobility by the awaken spell or similar magic.",
    "imagePrompt": "A huge plant creature with plant-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "plant",
      "huge",
      "unaligned",
      "plant"
    ]
  },
  {
    "name": "Shambling Mound",
    "size": "Large",
    "type": "plant",
    "alignment": "unaligned",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 18,
    "dexterity": 8,
    "constitution": 16,
    "intelligence": 5,
    "wisdom": 10,
    "charisma": 5,
    "armorClass": 15,
    "armorType": "natural",
    "hitPoints": 136,
    "hitDice": "16d10+48",
    "speed": {
      "walk": 20,
      "swim": 20
    },
    "savingThrows": {},
    "skills": {
      "Stealth": 2
    },
    "damageResistances": [
      "cold",
      "fire"
    ],
    "damageImmunities": [
      "lightning"
    ],
    "conditionImmunities": [
      "Blinded",
      "Exhaustion"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10,
      "blindsight": 60
    },
    "languages": [],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Lightning Absorption",
        "description": "Whenever the shambling mound is subjected to lightning damage, it takes no damage and regains a number of hit points equal to the lightning damage dealt."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The shambling mound makes two slam attacks. If both attacks hit a Medium or smaller target, the target is grappled (escape DC 14), and the shambling mound uses its Engulf on it.",
        },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+4",
          "average": 13
        }
      },
      {
        "name": "Engulf",
        "description": "The shambling mound engulfs a Medium or smaller creature grappled by it. The engulfed target is blinded, restrained, and unable to breathe, and it must succeed on a DC 14 Constitution saving throw at the start of each of the mound's turns or take 13 (2d8 + 4) bludgeoning damage. If the mound moves, the engulfed target moves with it. The mound can have only one creature engulfed at a time.",
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+4",
          "average": 13
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive, sentient tree with gnarled branches and a face formed in its bark. Awakened trees are often guardians of ancient forests and can communicate with other plants and animals.",    "imagePrompt": "A large plant creature with plant-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "plant",
      "large",
      "unaligned",
      "plant"
    ]
  },
  {
    "name": "Shrieker",
    "size": "Medium",
    "type": "plant",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 1,
    "dexterity": 1,
    "constitution": 10,
    "intelligence": 1,
    "wisdom": 3,
    "charisma": 1,
    "armorClass": 5,
    "armorType": "dex",
    "hitPoints": 13,
    "hitDice": "3d8",
    "speed": {
      "walk": 0
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [
      "Blinded",
      "Blinded",
      "Frightened"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 6,
      "blindsight": 30
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the shrieker remains motionless, it is indistinguishable from an ordinary fungus."
      }
    ],
    "actions": [],
    "legendaryActions": [],
    "description": "A small shrub that has been given sentience and mobility through magic. Awakened shrubs are often used as guards or companions by druids and other nature-loving spellcasters.",    "imagePrompt": "A medium plant creature with plant-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "plant",
      "medium",
      "unaligned",
      "plant"
    ]
  },
  {
    "name": "Treant",
    "size": "Huge",
    "type": "plant",
    "alignment": "chaotic good",
    "challengeRating": "9",
    "xp": 5000,
    "strength": 23,
    "dexterity": 8,
    "constitution": 21,
    "intelligence": 12,
    "wisdom": 16,
    "charisma": 12,
    "armorClass": 16,
    "armorType": "natural",
    "hitPoints": 138,
    "hitDice": "12d12+60",
    "speed": {
      "walk": 30
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning",
      "piercing"
    ],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [
      "fire"
    ],
    "senses": {
      "passivePerception": 13
    },
    "languages": [
      "Common",
      "Druidic",
      "Elvish",
      "Sylvan"
    ],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the treant remains motionless, it is indistinguishable from a normal tree."
      },
      {
        "name": "Siege Monster",
        "description": "The treant deals double damage to objects and structures."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The treant makes two slam attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 16 (3d6 + 6) bludgeoning damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d6+6",
          "average": 17
        }
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +10 to hit, range 60/180 ft., one target. Hit: 28 (4d10 + 6) bludgeoning damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Bludgeoning",
          "roll": "4d10+6",
          "average": 28
        }
      },
      {
        "name": "Animate Trees",
        "description": "The treant magically animates one or two trees it can see within 60 feet of it. These trees have the same statistics as a treant, except they have Intelligence and Charisma scores of 1, they can't speak, and they have only the Slam action option. An animated tree acts as an ally of the treant. The tree remains animate for 1 day or until it dies; until the treant dies or is more than 120 feet from the tree; or until the treant takes a bonus action to turn it back into an inanimate tree. The tree then takes root if possible."
      }
    ],
    "legendaryActions": [],
    "description": "A massive, carnivorous plant with enormous petals and a gaping maw filled with sharp teeth. Shambling mounds are created when lightning strikes a dead tree, animating it with elemental energy.",    "imagePrompt": "A huge plant creature with plant-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "plant",
      "huge",
      "chaotic-good",
      "plant"
    ]
  },
  {
    "name": "Violet Fungus",
    "size": "Medium",
    "type": "plant",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 3,
    "dexterity": 1,
    "constitution": 10,
    "intelligence": 1,
    "wisdom": 3,
    "charisma": 1,
    "armorClass": 5,
    "armorType": "dex",
    "hitPoints": 18,
    "hitDice": "4d8",
    "speed": {
      "walk": 5
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [
      "Blinded",
      "Blinded",
      "Frightened"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 6,
      "blindsight": 30
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the violet fungus remains motionless, it is indistinguishable from an ordinary fungus."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The fungus makes 1d4 Rotting Touch attacks."
      },
      {
        "name": "Rotting Touch",
        "description": "Melee Weapon Attack: +2 to hit, reach 10 ft., one creature. Hit: 4 (1d8) necrotic damage.",
        "attackBonus": 2,
        "damage": {
          "type": "Necrotic",
          "roll": "1d8",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, animated plant that can move and attack. Awakened shrubs are often used as guards or companions by druids and other nature-loving spellcasters.",    "imagePrompt": "A medium plant creature with plant-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "plant",
      "medium",
      "unaligned",
      "plant"
    ]
  }
];
