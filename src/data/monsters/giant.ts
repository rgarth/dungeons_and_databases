import { Monster } from '../../types/monster';

export const giantMonsters: Monster[] = [
  {
    "name": "Cloud Giant",
    "size": "Huge",
    "type": "giant",
    "alignment": "neutral good (50%) or neutral evil (50%)",
    "challengeRating": "9",
    "xp": 5000,
    "strength": 27,
    "dexterity": 10,
    "constitution": 22,
    "intelligence": 12,
    "wisdom": 16,
    "charisma": 16,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 200,
    "hitDice": "16d12",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Insight": 7,
      "Perception": 7
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 17
    },
    "languages": [
      "Common",
      "Giant"
    ],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The giant has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The giant's innate spellcasting ability is Charisma. It can innately cast the following spells, requiring no material components:\n\nAt will: detect magic, fog cloud, light\n3/day each: feather fall, fly, misty step, telekinesis\n1/day each: control weather, gaseous form"
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The giant makes two morningstar attacks.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Morningstar",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Morningstar",
        "desc": "Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 21 (3d8 + 8) piercing damage.",
        "attack_bonus": 12,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "3d8+8"
          }
        ],
        "actions": []
      },
      {
        "name": "Rock",
        "desc": "Ranged Weapon Attack: +12 to hit, range 60/240 ft., one target. Hit: 30 (4d10 + 8) bludgeoning damage.",
        "attack_bonus": 12,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "4d10+8"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "giant",
      "huge",
      "neutral good (50%) or neutral evil (50%)"
    ]
  },
  {
    "name": "Ettin",
    "size": "Large",
    "type": "giant",
    "alignment": "chaotic evil",
    "challengeRating": "4",
    "xp": 1100,
    "strength": 21,
    "dexterity": 8,
    "constitution": 17,
    "intelligence": 6,
    "wisdom": 10,
    "charisma": 8,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 85,
    "hitDice": "10d10",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 4
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 14
    },
    "languages": [
      "Giant",
      "Orc"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Two Heads",
        "description": "The ettin has advantage on Wisdom (Perception) checks and on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious."
      },
      {
        "name": "Wakeful",
        "description": "When one of the ettin's heads is asleep, its other head is awake."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The ettin makes two attacks: one with its battleaxe and one with its morningstar.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Battleaxe",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Morningstar",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Battleaxe",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d8+5"
          }
        ],
        "actions": []
      },
      {
        "name": "Morningstar",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) piercing damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d8+5"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "giant",
      "large",
      "chaotic evil"
    ]
  },
  {
    "name": "Fire Giant",
    "size": "Huge",
    "type": "giant",
    "alignment": "lawful evil",
    "challengeRating": "9",
    "xp": 5000,
    "strength": 25,
    "dexterity": 9,
    "constitution": 23,
    "intelligence": 10,
    "wisdom": 14,
    "charisma": 13,
    "armorClass": 18,
    "armorType": "armor",
    "hitPoints": 162,
    "hitDice": "13d12",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Athletics": 11,
      "Perception": 6
    },
    "damageResistances": [],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 16
    },
    "languages": [
      "Giant"
    ],
    "proficiencyBonus": 4,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The giant makes two greatsword attacks.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Greatsword",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Greatsword",
        "desc": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 28 (6d6 + 7) slashing damage.",
        "attack_bonus": 11,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "6d6+7"
          }
        ],
        "actions": []
      },
      {
        "name": "Rock",
        "desc": "Ranged Weapon Attack: +11 to hit, range 60/240 ft., one target. Hit: 29 (4d10 + 7) bludgeoning damage.",
        "attack_bonus": 11,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "4d10+7"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "giant",
      "huge",
      "lawful evil"
    ]
  },
  {
    "name": "Frost Giant",
    "size": "Huge",
    "type": "giant",
    "alignment": "neutral evil",
    "challengeRating": "8",
    "xp": 3900,
    "strength": 23,
    "dexterity": 9,
    "constitution": 21,
    "intelligence": 9,
    "wisdom": 10,
    "charisma": 12,
    "armorClass": 15,
    "armorType": "armor",
    "hitPoints": 138,
    "hitDice": "12d12",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Athletics": 9,
      "Perception": 3
    },
    "damageResistances": [],
    "damageImmunities": [
      "cold"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 13
    },
    "languages": [
      "Giant"
    ],
    "proficiencyBonus": 3,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The giant makes two greataxe attacks.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Greataxe",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Greataxe",
        "desc": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 25 (3d12 + 6) slashing damage.",
        "attack_bonus": 9,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "3d12+6"
          }
        ],
        "actions": []
      },
      {
        "name": "Rock",
        "desc": "Ranged Weapon Attack: +9 to hit, range 60/240 ft., one target. Hit: 28 (4d10 + 6) bludgeoning damage.",
        "attack_bonus": 9,
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
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "giant",
      "huge",
      "neutral evil"
    ]
  },
  {
    "name": "Hill Giant",
    "size": "Huge",
    "type": "giant",
    "alignment": "chaotic evil",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 21,
    "dexterity": 8,
    "constitution": 19,
    "intelligence": 5,
    "wisdom": 9,
    "charisma": 6,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 105,
    "hitDice": "10d12",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 2
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 12
    },
    "languages": [
      "Giant"
    ],
    "proficiencyBonus": 3,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The giant makes two greatclub attacks.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Greatclub",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Greatclub",
        "desc": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 18 (3d8 + 5) bludgeoning damage.",
        "attack_bonus": 8,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "3d8+5"
          }
        ],
        "actions": []
      },
      {
        "name": "Rock",
        "desc": "Ranged Weapon Attack: +8 to hit, range 60/240 ft., one target. Hit: 21 (3d10 + 5) bludgeoning damage.",
        "attack_bonus": 8,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "3d10+5"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "giant",
      "huge",
      "chaotic evil"
    ]
  },
  {
    "name": "Ogre",
    "size": "Large",
    "type": "giant",
    "alignment": "chaotic evil",
    "challengeRating": "2",
    "xp": 450,
    "strength": 19,
    "dexterity": 8,
    "constitution": 16,
    "intelligence": 5,
    "wisdom": 7,
    "charisma": 7,
    "armorClass": 11,
    "armorType": "armor",
    "hitPoints": 59,
    "hitDice": "7d10",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 8
    },
    "languages": [
      "Common",
      "Giant"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Greatclub",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage.",
        "attack_bonus": 6,
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
        "name": "Javelin",
        "desc": "Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 11 (2d6 + 4) piercing damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d6+4"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "giant",
      "large",
      "chaotic evil"
    ]
  },
  {
    "name": "Oni",
    "size": "Large",
    "type": "giant",
    "alignment": "lawful evil",
    "challengeRating": "7",
    "xp": 2900,
    "strength": 19,
    "dexterity": 11,
    "constitution": 16,
    "intelligence": 14,
    "wisdom": 12,
    "charisma": 15,
    "armorClass": 16,
    "armorType": "armor",
    "hitPoints": 110,
    "hitDice": "13d10",
    "speed": {
      "walk": 30,
      "fly": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Arcana": 5,
      "Deception": 8,
      "Perception": 4
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 14
    },
    "languages": [
      "Common",
      "Giant"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Innate Spellcasting",
        "description": "The oni's innate spellcasting ability is Charisma (spell save DC 13). The oni can innately cast the following spells, requiring no material components:\n\nAt will: darkness, invisibility\n1/day each: charm person, cone of cold, gaseous form, sleep"
      },
      {
        "name": "Magic Weapons",
        "description": "The oni's weapon attacks are magical."
      },
      {
        "name": "Regeneration",
        "description": "The oni regains 10 hit points at the start of its turn if it has at least 1 hit point."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The oni makes two attacks, either with its claws or its glaive.",
        "damage": [],
        "multiattack_type": "action_options",
        "action_options": {
          "choose": 1,
          "type": "action",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "action",
                "action_name": "Glaive",
                "count": 2,
                "type": "melee"
              },
              {
                "option_type": "action",
                "action_name": "Claw",
                "desc": "If in Oni form",
                "count": 2,
                "type": "melee"
              },
              {
                "desc": "If in Oni form",
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Glaive",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Claw",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              }
            ]
          }
        },
        "actions": []
      },
      {
        "name": "Claw (Oni Form Only)",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d8+4"
          }
        ],
        "actions": []
      },
      {
        "name": "Glaive",
        "desc": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) slashing damage, or 9 (1d10 + 4) slashing damage in Small or Medium form.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d10+4"
          }
        ],
        "actions": []
      },
      {
        "name": "Change Shape",
        "desc": "The oni magically polymorphs into a Small or Medium humanoid, into a Large giant, or back into its true form. Other than its size, its statistics are the same in each form. The only equipment that is transformed is its glaive, which shrinks so that it can be wielded in humanoid form. If the oni dies, it reverts to its true form, and its glaive reverts to its normal size.",
        "damage": [],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "giant",
      "large",
      "lawful evil"
    ]
  },
  {
    "name": "Stone Giant",
    "size": "Huge",
    "type": "giant",
    "alignment": "neutral",
    "challengeRating": "7",
    "xp": 2900,
    "strength": 23,
    "dexterity": 15,
    "constitution": 20,
    "intelligence": 10,
    "wisdom": 12,
    "charisma": 9,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 126,
    "hitDice": "11d12",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Athletics": 12,
      "Perception": 4
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 14
    },
    "languages": [
      "Giant"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Stone Camouflage",
        "description": "The giant has advantage on Dexterity (Stealth) checks made to hide in rocky terrain."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The giant makes two greatclub attacks.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Greatclub",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Greatclub",
        "desc": "Melee Weapon Attack: +9 to hit, reach 15 ft., one target. Hit: 19 (3d8 + 6) bludgeoning damage.",
        "attack_bonus": 9,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "3d8+6"
          }
        ],
        "actions": []
      },
      {
        "name": "Rock",
        "desc": "Ranged Weapon Attack: +9 to hit, range 60/240 ft., one target. Hit: 28 (4d10 + 6) bludgeoning damage. If the target is a creature, it must succeed on a DC 17 Strength saving throw or be knocked prone.",
        "attack_bonus": 9,
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
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "giant",
      "huge",
      "neutral"
    ]
  },
  {
    "name": "Storm Giant",
    "size": "Huge",
    "type": "giant",
    "alignment": "chaotic good",
    "challengeRating": "13",
    "xp": 10000,
    "strength": 29,
    "dexterity": 14,
    "constitution": 20,
    "intelligence": 16,
    "wisdom": 18,
    "charisma": 18,
    "armorClass": 16,
    "armorType": "armor",
    "hitPoints": 230,
    "hitDice": "20d12",
    "speed": {
      "walk": 50,
      "swim": 50,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Arcana": 8,
      "Athletics": 14,
      "History": 8,
      "Perception": 9
    },
    "damageResistances": [
      "cold"
    ],
    "damageImmunities": [
      "lightning",
      "thunder"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 19
    },
    "languages": [
      "Common",
      "Giant"
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The giant can breathe air and water."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The giant's innate spellcasting ability is Charisma (spell save DC 17). It can innately cast the following spells, requiring no material components:\n\nAt will: detect magic, feather fall, levitate, light\n3/day each: control weather, water breathing"
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The giant makes two greatsword attacks.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Greatsword",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Greatsword",
        "desc": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 30 (6d6 + 9) slashing damage.",
        "attack_bonus": 14,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "6d6+9"
          }
        ],
        "actions": []
      },
      {
        "name": "Rock",
        "desc": "Ranged Weapon Attack: +14 to hit, range 60/240 ft., one target. Hit: 35 (4d12 + 9) bludgeoning damage.",
        "attack_bonus": 14,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "4d12+9"
          }
        ],
        "actions": []
      },
      {
        "name": "Lightning Strike",
        "desc": "The giant hurls a magical lightning bolt at a point it can see within 500 feet of it. Each creature within 10 feet of that point must make a DC 17 Dexterity saving throw, taking 54 (12d8) lightning damage on a failed save, or half as much damage on a successful one.",
        "damage": [
          {
            "damage_type": {
              "index": "lightning",
              "name": "Lightning",
              "url": "/api/2014/damage-types/lightning"
            },
            "damage_dice": "12d8"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "giant",
      "huge",
      "chaotic good"
    ]
  },
  {
    "name": "Troll",
    "size": "Large",
    "type": "giant",
    "alignment": "chaotic evil",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 18,
    "dexterity": 13,
    "constitution": 20,
    "intelligence": 7,
    "wisdom": 9,
    "charisma": 7,
    "armorClass": 15,
    "armorType": "natural",
    "hitPoints": 84,
    "hitDice": "8d10",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 2
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 12
    },
    "languages": [
      "Giant"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The troll has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Regeneration",
        "description": "The troll regains 10 hit points at the start of its turn. If the troll takes acid or fire damage, this trait doesn't function at the start of the troll's next turn. The troll dies only if it starts its turn with 0 hit points and doesn't regenerate."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The troll makes three attacks: one with its bite and two with its claws.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+4"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+4"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "giant",
      "large",
      "chaotic evil"
    ]
  }
];
