import { Monster } from '../../types/monster';

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
      "walk": 20,
      "hover": false
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
        "desc": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 1 (1d4 - 1) slashing damage.",
        "attack_bonus": 1,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d4-1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "An awakened shrub is an ordinary shrub given sentience and mobility by the awaken spell or similar magic.",
    "source": "SRD",
    "tags": [
      "plant",
      "small",
      "unaligned"
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
    "hitDice": "7d12",
    "speed": {
      "walk": 20,
      "hover": false
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
        "desc": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 14 (3d6 + 4) bludgeoning damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "3d6+4"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "An awakened tree is an ordinary tree given sentience and mobility by the awaken spell or similar magic.",
    "source": "SRD",
    "tags": [
      "plant",
      "huge",
      "unaligned"
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
    "hitDice": "16d10",
    "speed": {
      "walk": 20,
      "swim": 20,
      "hover": false
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
      {
        "index": "blinded",
        "name": "Blinded",
        "url": "/api/2014/conditions/blinded"
      },
      {
        "index": "blinded",
        "name": "Blinded",
        "url": "/api/2014/conditions/blinded"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "blindsight": 60,
      "passivePerception": 10
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
        "desc": "The shambling mound makes two slam attacks. If both attacks hit a Medium or smaller target, the target is grappled (escape DC 14), and the shambling mound uses its Engulf on it.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Slam",
            "count": "2",
            "type": "melee"
          },
          {
            "action_name": "Engulf",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Slam",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+4"
          }
        ],
        "actions": []
      },
      {
        "name": "Engulf",
        "desc": "The shambling mound engulfs a Medium or smaller creature grappled by it. The engulfed target is blinded, restrained, and unable to breathe, and it must succeed on a DC 14 Constitution saving throw at the start of each of the mound's turns or take 13 (2d8 + 4) bludgeoning damage. If the mound moves, the engulfed target moves with it. The mound can have only one creature engulfed at a time.",
        "damage": [],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "plant",
      "large",
      "unaligned"
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
      "walk": 0,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [
      {
        "index": "blinded",
        "name": "Blinded",
        "url": "/api/2014/conditions/blinded"
      },
      {
        "index": "blinded",
        "name": "Blinded",
        "url": "/api/2014/conditions/blinded"
      },
      {
        "index": "frightened",
        "name": "Frightened",
        "url": "/api/2014/conditions/frightened"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "blindsight": 30,
      "passivePerception": 6
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
    "description": "",
    "source": "SRD",
    "tags": [
      "plant",
      "medium",
      "unaligned"
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
    "hitDice": "12d12",
    "speed": {
      "walk": 30,
      "hover": false
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
        "desc": "The treant makes two slam attacks.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Slam",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Slam",
        "desc": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 16 (3d6 + 6) bludgeoning damage.",
        "attack_bonus": 10,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "3d6+6"
          }
        ],
        "actions": []
      },
      {
        "name": "Rock",
        "desc": "Ranged Weapon Attack: +10 to hit, range 60/180 ft., one target. Hit: 28 (4d10 + 6) bludgeoning damage.",
        "attack_bonus": 10,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "4d10+6"
          }
        ],
        "actions": []
      },
      {
        "name": "Animate Trees",
        "desc": "The treant magically animates one or two trees it can see within 60 feet of it. These trees have the same statistics as a treant, except they have Intelligence and Charisma scores of 1, they can't speak, and they have only the Slam action option. An animated tree acts as an ally of the treant. The tree remains animate for 1 day or until it dies; until the treant dies or is more than 120 feet from the tree; or until the treant takes a bonus action to turn it back into an inanimate tree. The tree then takes root if possible.",
        "damage": [],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "plant",
      "huge",
      "chaotic good"
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
      "walk": 5,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [
      {
        "index": "blinded",
        "name": "Blinded",
        "url": "/api/2014/conditions/blinded"
      },
      {
        "index": "blinded",
        "name": "Blinded",
        "url": "/api/2014/conditions/blinded"
      },
      {
        "index": "frightened",
        "name": "Frightened",
        "url": "/api/2014/conditions/frightened"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "blindsight": 30,
      "passivePerception": 6
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
        "desc": "The fungus makes 1d4 Rotting Touch attacks.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Rotting Touch",
            "count": "1d4",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Rotting Touch",
        "desc": "Melee Weapon Attack: +2 to hit, reach 10 ft., one creature. Hit: 4 (1d8) necrotic damage.",
        "attack_bonus": 2,
        "damage": [
          {
            "damage_type": {
              "index": "necrotic",
              "name": "Necrotic",
              "url": "/api/2014/damage-types/necrotic"
            },
            "damage_dice": "1d8"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "plant",
      "medium",
      "unaligned"
    ]
  }
];
