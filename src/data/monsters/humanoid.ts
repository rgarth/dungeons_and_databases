import { Monster } from '../../types/monster';

export const humanoidMonsters: Monster[] = [
  {
    "name": "Acolyte",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any alignment",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 10,
    "dexterity": 10,
    "constitution": 10,
    "intelligence": 10,
    "wisdom": 14,
    "charisma": 11,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 9,
    "hitDice": "2d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Medicine": 4,
      "Religion": 2
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 12
    },
    "languages": [
      "any one language (usually Common)"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spellcasting",
        "description": "The acolyte is a 1st-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). The acolyte has following cleric spells prepared:\n\n- Cantrips (at will): light, sacred flame, thaumaturgy\n- 1st level (3 slots): bless, cure wounds, sanctuary"
      }
    ],
    "actions": [
      {
        "name": "Club",
        "desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.",
        "attack_bonus": 2,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d4"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Acolytes are junior members of a clergy, usually answerable to a priest. They perform a variety of functions in a temple and are granted minor spellcasting power by their deities.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any alignment"
    ]
  },
  {
    "name": "Archmage",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any alignment",
    "challengeRating": "12",
    "xp": 8400,
    "strength": 10,
    "dexterity": 14,
    "constitution": 12,
    "intelligence": 20,
    "wisdom": 15,
    "charisma": 16,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 99,
    "hitDice": "18d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Arcana": 13,
      "History": 13
    },
    "damageResistances": [
      "damage from spells",
      "bludgeoning, piercing, and slashing from nonmagical attacks (from stoneskin)"
    ],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 12
    },
    "languages": [
      "any six languages"
    ],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The archmage has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Spellcasting",
        "description": "The archmage is an 18th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 17, +9 to hit with spell attacks). The archmage can cast disguise self and invisibility at will and has the following wizard spells prepared:\n\n- Cantrips (at will): fire bolt, light, mage hand, prestidigitation, shocking grasp\n- 1st level (4 slots): detect magic, identify, mage armor*, magic missile\n- 2nd level (3 slots): detect thoughts, mirror image, misty step\n- 3rd level (3 slots): counterspell, fly, lightning bolt\n- 4th level (3 slots): banishment, fire shield, stoneskin*\n- 5th level (3 slots): cone of cold, scrying, wall of force\n- 6th level (1 slot): globe of invulnerability\n- 7th level (1 slot): teleport\n- 8th level (1 slot): mind blank*\n- 9th level (1 slot): time stop\n* The archmage casts these spells on itself before combat."
      }
    ],
    "actions": [
      {
        "name": "Dagger",
        "desc": "Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4 + 2) piercing damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Archmages are powerful (and usually quite old) spellcasters dedicated to the study of the arcane arts. Benevolent ones counsel kings and queens, while evil ones rule as tyrants and pursue lichdom. Those who are neither good nor evil sequester themselves in remote towers to practice their magic without interruption. \n\nAn archmage typically has one or more apprentice mages, and an archmage’s abode has numerous magical wards and guardians to discourage interlopers.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any alignment"
    ]
  },
  {
    "name": "Assassin",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any non-good alignment",
    "challengeRating": "8",
    "xp": 3900,
    "strength": 11,
    "dexterity": 16,
    "constitution": 14,
    "intelligence": 13,
    "wisdom": 11,
    "charisma": 10,
    "armorClass": 15,
    "armorType": "armor",
    "hitPoints": 78,
    "hitDice": "12d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Acrobatics": 6,
      "Deception": 3,
      "Perception": 3,
      "Stealth": 9
    },
    "damageResistances": [
      "poison"
    ],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 13
    },
    "languages": [
      "Thieves' cant plus any two languages"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Assassinate",
        "description": "During its first turn, the assassin has advantage on attack rolls against any creature that hasn't taken a turn. Any hit the assassin scores against a surprised creature is a critical hit."
      },
      {
        "name": "Evasion",
        "description": "If the assassin is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the assassin instead takes no damage if it succeeds on the saving throw, and only half damage if it fails."
      },
      {
        "name": "Sneak Attack (1/Turn)",
        "description": "The assassin deals an extra 13 (4d6) damage when it hits a target with a weapon attack and has advantage on the attack roll, or when the target is within 5 ft. of an ally of the assassin that isn't incapacitated and the assassin doesn't have disadvantage on the attack roll."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The assassin makes two shortsword attacks.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Shortsword",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Shortsword",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage, and the target must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+3"
          },
          {
            "dc": {
              "dc_type": {
                "index": "con",
                "name": "CON",
                "url": "/api/2014/ability-scores/con"
              },
              "dc_value": 15,
              "success_type": "half"
            },
            "damage_type": {
              "index": "poison",
              "name": "Poison",
              "url": "/api/2014/damage-types/poison"
            },
            "damage_dice": "7d6"
          }
        ],
        "actions": []
      },
      {
        "name": "Light Crossbow",
        "desc": "Ranged Weapon Attack: +6 to hit, range 80/320 ft., one target. Hit: 7 (1d8 + 3) piercing damage, and the target must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+3"
          },
          {
            "dc": {
              "dc_type": {
                "index": "con",
                "name": "CON",
                "url": "/api/2014/ability-scores/con"
              },
              "dc_value": 15,
              "success_type": "half"
            },
            "damage_type": {
              "index": "poison",
              "name": "Poison",
              "url": "/api/2014/damage-types/poison"
            },
            "damage_dice": "7d6"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Trained in the use of poison, assassins are remorseless killers who work for nobles, guildmasters, sovereigns, and anyone else who can afford them.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any non-good alignment"
    ]
  },
  {
    "name": "Bandit",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any non-lawful alignment",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 11,
    "dexterity": 12,
    "constitution": 12,
    "intelligence": 10,
    "wisdom": 10,
    "charisma": 10,
    "armorClass": 12,
    "armorType": "armor",
    "hitPoints": 11,
    "hitDice": "2d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10
    },
    "languages": [
      "any one language (usually Common)"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Scimitar",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) slashing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d6+1"
          }
        ],
        "actions": []
      },
      {
        "name": "Light Crossbow",
        "desc": "Ranged Weapon Attack: +3 to hit, range 80 ft./320 ft., one target. Hit: 5 (1d8 + 1) piercing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "**Bandits** rove in gangs and are sometimes led by thugs, veterans, or spellcasters. Not all bandits are evil. Oppression, drought, disease, or famine can often drive otherwise honest folk to a life of banditry.\n\n**Pirates** are bandits of the high seas. They might be freebooters interested only in treasure and murder, or they might be privateers sanctioned by the crown to attack and plunder an enemy nation’s vessels.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any non-lawful alignment"
    ]
  },
  {
    "name": "Bandit Captain",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any non-lawful alignment",
    "challengeRating": "2",
    "xp": 450,
    "strength": 15,
    "dexterity": 16,
    "constitution": 14,
    "intelligence": 14,
    "wisdom": 11,
    "charisma": 14,
    "armorClass": 15,
    "armorType": "armor",
    "hitPoints": 65,
    "hitDice": "10d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Athletics": 4,
      "Deception": 4
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10
    },
    "languages": [
      "any two languages"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The captain makes three melee attacks: two with its scimitar and one with its dagger. Or the captain makes two ranged attacks with its daggers.",
        "damage": [],
        "multiattack_type": "action_options",
        "action_options": {
          "choose": 1,
          "type": "action",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Scimitar",
                    "count": 2,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Dagger",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              },
              {
                "option_type": "action",
                "action_name": "Dagger",
                "count": 2,
                "type": "ranged"
              }
            ]
          }
        },
        "actions": []
      },
      {
        "name": "Scimitar",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d6+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Dagger",
        "desc": "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d4 + 3) piercing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4+3"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "It takes a strong personality, ruthless cunning, and a silver tongue to keep a gang of bandits in line. The **bandit captain** has these qualities in spades.\n\nIn addition to managing a crew of selfish malcontents, the **pirate captain** is a variation of the bandit captain, with a ship to protect and command. To keep the crew in line, the captain must mete out rewards and punishment on a regular basis.\n\nMore than treasure, a bandit captain or pirate captain craves infamy. A prisoner who appeals to the captain’s vanity or ego is more likely to be treated fairly than a prisoner who does not or claims not to know anything of the captain’s colorful reputation.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any non-lawful alignment"
    ]
  },
  {
    "name": "Berserker",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any chaotic alignment",
    "challengeRating": "2",
    "xp": 450,
    "strength": 16,
    "dexterity": 12,
    "constitution": 17,
    "intelligence": 9,
    "wisdom": 11,
    "charisma": 9,
    "armorClass": 13,
    "armorType": "armor",
    "hitPoints": 67,
    "hitDice": "9d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10
    },
    "languages": [
      "any one language (usually Common)"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Reckless",
        "description": "At the start of its turn, the berserker can gain advantage on all melee weapon attack rolls during that turn, but attack rolls against it have advantage until the start of its next turn."
      }
    ],
    "actions": [
      {
        "name": "Greataxe",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d12 + 3) slashing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d12+3"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any chaotic alignment"
    ]
  },
  {
    "name": "Bugbear",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "chaotic evil",
    "challengeRating": "1",
    "xp": 200,
    "strength": 15,
    "dexterity": 14,
    "constitution": 13,
    "intelligence": 8,
    "wisdom": 11,
    "charisma": 9,
    "armorClass": 16,
    "armorType": "armor",
    "hitPoints": 27,
    "hitDice": "5d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Stealth": 6,
      "Survival": 2
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 10
    },
    "languages": [
      "Common",
      "Goblin"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Brute",
        "description": "A melee weapon deals one extra die of its damage when the bugbear hits with it (included in the attack)."
      },
      {
        "name": "Surprise Attack",
        "description": "If the bugbear surprises a creature and hits it with an attack during the first round of combat, the target takes an extra 7 (2d6) damage from the attack."
      }
    ],
    "actions": [
      {
        "name": "Morningstar",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d8+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Javelin",
        "desc": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 9 (2d6 + 2) piercing damage in melee or 5 (1d6 + 2) piercing damage at range.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d6+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "chaotic evil"
    ]
  },
  {
    "name": "Commoner",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any alignment",
    "challengeRating": "0",
    "xp": 10,
    "strength": 10,
    "dexterity": 10,
    "constitution": 10,
    "intelligence": 10,
    "wisdom": 10,
    "charisma": 10,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 4,
    "hitDice": "1d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10
    },
    "languages": [
      "any one language (usually Common)"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Club",
        "desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.",
        "attack_bonus": 2,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d4"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Commoners include peasants, serfs, slaves, servants, pilgrims, merchants, artisans, and hermits.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any alignment"
    ]
  },
  {
    "name": "Cult Fanatic",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any non-good alignment",
    "challengeRating": "2",
    "xp": 450,
    "strength": 11,
    "dexterity": 14,
    "constitution": 12,
    "intelligence": 10,
    "wisdom": 13,
    "charisma": 14,
    "armorClass": 13,
    "armorType": "armor",
    "hitPoints": 22,
    "hitDice": "6d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Deception": 4,
      "Persuasion": 4,
      "Religion": 2
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 11
    },
    "languages": [
      "any one language (usually Common)"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Dark Devotion",
        "description": "The fanatic has advantage on saving throws against being charmed or frightened."
      },
      {
        "name": "Spellcasting",
        "description": "The fanatic is a 4th-level spellcaster. Its spell casting ability is Wisdom (spell save DC 11, +3 to hit with spell attacks). The fanatic has the following cleric spells prepared:\n\nCantrips (at will): light, sacred flame, thaumaturgy\n- 1st level (4 slots): command, inflict wounds, shield of faith\n- 2nd level (3 slots): hold person, spiritual weapon"
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The fanatic makes two melee attacks.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Dagger",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Dagger",
        "desc": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one creature. Hit: 4 (1d4 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Fanatics are often part of a cult’s leadership, using their charisma and dogma to influence and prey on those of weak will. Most are interested in personal power above all else.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any non-good alignment"
    ]
  },
  {
    "name": "Cultist",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any non-good alignment",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 11,
    "dexterity": 12,
    "constitution": 10,
    "intelligence": 10,
    "wisdom": 11,
    "charisma": 10,
    "armorClass": 12,
    "armorType": "armor",
    "hitPoints": 9,
    "hitDice": "2d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Deception": 2,
      "Religion": 2
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10
    },
    "languages": [
      "any one language (usually Common)"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Dark Devotion",
        "description": "The cultist has advantage on saving throws against being charmed or frightened."
      }
    ],
    "actions": [
      {
        "name": "Scimitar",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 4 (1d6 + 1) slashing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d6+1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Cultists swear allegiance to dark powers such as elemental princes, demon lords, or archdevils. Most conceal their loyalties to avoid being ostracized, imprisoned, or executed for their beliefs. Unlike evil acolytes, cultists often show signs of insanity in their beliefs and practices.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any non-good alignment"
    ]
  },
  {
    "name": "Deep Gnome (Svirfneblin)",
    "size": "Small",
    "type": "humanoid",
    "alignment": "neutral good",
    "challengeRating": "0.5",
    "xp": 50,
    "strength": 15,
    "dexterity": 14,
    "constitution": 14,
    "intelligence": 12,
    "wisdom": 10,
    "charisma": 9,
    "armorClass": 15,
    "armorType": "armor",
    "hitPoints": 16,
    "hitDice": "3d6",
    "speed": {
      "walk": 20,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Investigation": 3,
      "Perception": 2,
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 120,
      "passivePerception": 12
    },
    "languages": [
      "Gnomish",
      "Terran",
      "Undercommon"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Stone Camouflage",
        "description": "The gnome has advantage on Dexterity (Stealth) checks made to hide in rocky terrain."
      },
      {
        "name": "Gnome Cunning",
        "description": "The gnome has advantage on Intelligence, Wisdom, and Charisma saving throws against magic."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The gnome's innate spellcasting ability is Intelligence (spell save DC 11). It can innately cast the following spells, requiring no material components:\nAt will: nondetection (self only)\n1/day each: blindness/deafness, blur, disguise self"
      }
    ],
    "actions": [
      {
        "name": "War Pick",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Poisoned Dart",
        "desc": "Ranged Weapon Attack: +4 to hit, range 30/120 ft., one creature. Hit: 4 (1d4 + 2) piercing damage, and the target must succeed on a DC 12 Constitution saving throw or be poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "small",
      "neutral good"
    ]
  },
  {
    "name": "Drow",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "neutral evil",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 10,
    "dexterity": 14,
    "constitution": 10,
    "intelligence": 11,
    "wisdom": 11,
    "charisma": 12,
    "armorClass": 15,
    "armorType": "armor",
    "hitPoints": 13,
    "hitDice": "3d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 2,
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 120,
      "passivePerception": 12
    },
    "languages": [
      "Elvish",
      "Undercommon"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Fey Ancestry",
        "description": "The drow has advantage on saving throws against being charmed, and magic can't put the drow to sleep."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The drow's spellcasting ability is Charisma (spell save DC 11). It can innately cast the following spells, requiring no material components:\nAt will: dancing lights\n1/day each: darkness, faerie fire"
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the drow has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Shortsword",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Hand Crossbow",
        "desc": "Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage, and the target must succeed on a DC 13 Constitution saving throw or be poisoned for 1 hour. If the saving throw fails by 5 or more, the target is also unconscious while poisoned in this way. The target wakes up if it takes damage or if another creature takes an action to shake it awake.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "neutral evil"
    ]
  },
  {
    "name": "Druid",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any alignment",
    "challengeRating": "2",
    "xp": 450,
    "strength": 10,
    "dexterity": 12,
    "constitution": 13,
    "intelligence": 12,
    "wisdom": 15,
    "charisma": 11,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 27,
    "hitDice": "5d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Medicine": 4,
      "Nature": 3,
      "Perception": 4
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14
    },
    "languages": [
      "Druidic plus any two languages"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spellcasting",
        "description": "The druid is a 4th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). It has the following druid spells prepared:\n\n- Cantrips (at will): druidcraft, produce flame, shillelagh\n- 1st level (4 slots): entangle, longstrider, speak with animals, thunderwave\n- 2nd level (3 slots): animal messenger, barkskin"
      }
    ],
    "actions": [
      {
        "name": "Quarterstaff",
        "desc": " Melee Weapon Attack: +2 to hit (+4 to hit with shillelagh), reach 5 ft., one target. Hit: 3 (1d6) bludgeoning damage, 4 (1d8) bludgeoning damage if wielded with two hands, or 6 (1d8 + 2) bludgeoning damage with shillelagh.",
        "attack_bonus": 2,
        "damage": [
          {
            "choose": 1,
            "type": "damage",
            "from": {
              "option_set_type": "options_array",
              "options": [
                {
                  "option_type": "damage",
                  "damage_type": {
                    "index": "bludgeoning",
                    "name": "Bludgeoning",
                    "url": "/api/2014/damage-types/bludgeoning"
                  },
                  "damage_dice": "1d6",
                  "notes": "One handed"
                },
                {
                  "option_type": "damage",
                  "damage_type": {
                    "index": "bludgeoning",
                    "name": "Bludgeoning",
                    "url": "/api/2014/damage-types/bludgeoning"
                  },
                  "damage_dice": "1d8",
                  "notes": "Two handed"
                },
                {
                  "option_type": "damage",
                  "damage_type": {
                    "index": "bludgeoning",
                    "name": "Bludgeoning",
                    "url": "/api/2014/damage-types/bludgeoning"
                  },
                  "damage_dice": "1d8+2",
                  "notes": "With shillelagh"
                }
              ]
            }
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "**Druids** dwell in forests and other secluded wilderness locations, where they protect the natural world from monsters and the encroachment of civilization. Some are **tribal shamans** who heal the sick, pray to animal spirits, and provide spiritual guidance.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any alignment"
    ]
  },
  {
    "name": "Duergar",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "lawful evil",
    "challengeRating": "1",
    "xp": 200,
    "strength": 14,
    "dexterity": 11,
    "constitution": 14,
    "intelligence": 11,
    "wisdom": 10,
    "charisma": 9,
    "armorClass": 16,
    "armorType": "armor",
    "hitPoints": 26,
    "hitDice": "4d8",
    "speed": {
      "walk": 25,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "poison"
    ],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 120,
      "passivePerception": 10
    },
    "languages": [
      "Dwarvish",
      "Undercommon"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Duergar Resilience",
        "description": "The duergar has advantage on saving throws against poison, spells, and illusions, as well as to resist being charmed or paralyzed."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the duergar has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Enlarge",
        "desc": "For 1 minute, the duergar magically increases in size, along with anything it is wearing or carrying. While enlarged, the duergar is Large, doubles its damage dice on Strength-based weapon attacks (included in the attacks), and makes Strength checks and Strength saving throws with advantage. If the duergar lacks the room to become Large, it attains the maximum size possible in the space available.",
        "damage": [],
        "actions": []
      },
      {
        "name": "War Pick",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage, or 11 (2d8 + 2) piercing damage while enlarged.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Javelin",
        "desc": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage, or 9 (2d6 + 2) piercing damage while enlarged.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Invisibility",
        "desc": "The duergar magically turns invisible until it attacks, casts a spell, or uses its Enlarge, or until its concentration is broken, up to 1 hour (as if concentrating on a spell). Any equipment the duergar wears or carries is invisible with it.",
        "damage": [],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Gladiator",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any alignment",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 18,
    "dexterity": 15,
    "constitution": 16,
    "intelligence": 10,
    "wisdom": 12,
    "charisma": 15,
    "armorClass": 16,
    "armorType": "armor",
    "hitPoints": 112,
    "hitDice": "15d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Athletics": 10,
      "Intimidation": 5
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 11
    },
    "languages": [
      "any one language (usually Common)"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Brave",
        "description": "The gladiator has advantage on saving throws against being frightened."
      },
      {
        "name": "Brute",
        "description": "A melee weapon deals one extra die of its damage when the gladiator hits with it (included in the attack)."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The gladiator makes three melee attacks or two ranged attacks.",
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
                "action_name": "Spear",
                "count": 3,
                "type": "melee"
              },
              {
                "option_type": "action",
                "action_name": "Shield Bash",
                "count": 3,
                "type": "melee"
              },
              {
                "option_type": "action",
                "action_name": "Spear",
                "count": 2,
                "type": "ranged"
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Spear",
                    "count": 2,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Shield Bash",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Spear",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Shield Bash",
                    "count": 2,
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
        "name": "Spear",
        "desc": "Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) piercing damage, or 13 (2d8 + 4) piercing damage if used with two hands to make a melee attack.",
        "attack_bonus": 7,
        "damage": [
          {
            "choose": 1,
            "type": "damage",
            "from": {
              "option_set_type": "options_array",
              "options": [
                {
                  "option_type": "damage",
                  "notes": "One handed",
                  "damage_type": {
                    "index": "piercing",
                    "name": "Piercing",
                    "url": "/api/2014/damage-types/piercing"
                  },
                  "damage_dice": "2d6+4"
                },
                {
                  "option_type": "damage",
                  "notes": "Two handed",
                  "damage_type": {
                    "index": "piercing",
                    "name": "Piercing",
                    "url": "/api/2014/damage-types/piercing"
                  },
                  "damage_dice": "2d8+4"
                }
              ]
            }
          }
        ],
        "actions": []
      },
      {
        "name": "Shield Bash",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one creature. Hit: 9 (2d4 + 4) bludgeoning damage. If the target is a Medium or smaller creature, it must succeed on a DC 15 Strength saving throw or be knocked prone.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d4+4"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Gladiators battle for the entertainment of raucous crowds. Some gladiators are brutal pit fighters who treat each match as a life-or-death struggle, while others are professional duelists who command huge fees but rarely fight to the death.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any alignment"
    ]
  },
  {
    "name": "Gnoll",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "chaotic evil",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 14,
    "dexterity": 12,
    "constitution": 11,
    "intelligence": 6,
    "wisdom": 10,
    "charisma": 7,
    "armorClass": 15,
    "armorType": "armor",
    "hitPoints": 22,
    "hitDice": "5d8",
    "speed": {
      "walk": 30,
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
      "passivePerception": 10
    },
    "languages": [
      "Gnoll"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Rampage",
        "description": "When the gnoll reduces a creature to 0 hit points with a melee attack on its turn, the gnoll can take a bonus action to move up to half its speed and make a bite attack."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Spear",
        "desc": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used with two hands to make a melee attack.",
        "attack_bonus": 4,
        "damage": [
          {
            "choose": 1,
            "type": "damage",
            "from": {
              "option_set_type": "options_array",
              "options": [
                {
                  "option_type": "damage",
                  "notes": "One handed",
                  "damage_type": {
                    "index": "piercing",
                    "name": "Piercing",
                    "url": "/api/2014/damage-types/piercing"
                  },
                  "damage_dice": "1d6+2"
                },
                {
                  "option_type": "damage",
                  "notes": "Two handed",
                  "damage_type": {
                    "index": "piercing",
                    "name": "Piercing",
                    "url": "/api/2014/damage-types/piercing"
                  },
                  "damage_dice": "1d8+2"
                }
              ]
            }
          }
        ],
        "actions": []
      },
      {
        "name": "Longbow",
        "desc": "Ranged Weapon Attack: +3 to hit, range 150/600 ft., one target. Hit: 5 (1d8 + 1) piercing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "chaotic evil"
    ]
  },
  {
    "name": "Goblin",
    "size": "Small",
    "type": "humanoid",
    "alignment": "neutral evil",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 8,
    "dexterity": 14,
    "constitution": 10,
    "intelligence": 10,
    "wisdom": 8,
    "charisma": 8,
    "armorClass": 15,
    "armorType": "armor",
    "hitPoints": 7,
    "hitDice": "2d6",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Stealth": 6
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 9
    },
    "languages": [
      "Common",
      "Goblin"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Nimble Escape",
        "description": "The goblin can take the Disengage or Hide action as a bonus action on each of its turns."
      }
    ],
    "actions": [
      {
        "name": "Scimitar",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Shortbow",
        "desc": "Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "small",
      "neutral evil"
    ]
  },
  {
    "name": "Grimlock",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "neutral evil",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 16,
    "dexterity": 12,
    "constitution": 12,
    "intelligence": 9,
    "wisdom": 8,
    "charisma": 6,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 11,
    "hitDice": "2d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Athletics": 5,
      "Perception": 3,
      "Stealth": 3
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [
      {
        "index": "blinded",
        "name": "Blinded",
        "url": "/api/2014/conditions/blinded"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "blindsight": 30,
      "passivePerception": 13
    },
    "languages": [
      "Undercommon"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Blind Senses",
        "description": "The grimlock can't use its blindsight while deafened and unable to smell."
      },
      {
        "name": "Keen Hearing and Smell",
        "description": "The grimlock has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      },
      {
        "name": "Stone Camouflage",
        "description": "The grimlock has advantage on Dexterity (Stealth) checks made to hide in rocky terrain."
      }
    ],
    "actions": [
      {
        "name": "Spiked Bone Club",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) bludgeoning damage plus 2 (1d4) piercing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d4+3"
          },
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "neutral evil"
    ]
  },
  {
    "name": "Guard",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any alignment",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 13,
    "dexterity": 12,
    "constitution": 12,
    "intelligence": 10,
    "wisdom": 11,
    "charisma": 10,
    "armorClass": 16,
    "armorType": "armor",
    "hitPoints": 11,
    "hitDice": "2d8",
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
      "passivePerception": 12
    },
    "languages": [
      "any one language (usually Common)"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Spear",
        "desc": "Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6 + 1) piercing damage or 5 (1d8 + 1) piercing damage if used with two hands to make a melee attack.",
        "attack_bonus": 3,
        "damage": [
          {
            "choose": 1,
            "type": "damage",
            "from": {
              "option_set_type": "options_array",
              "options": [
                {
                  "option_type": "damage",
                  "notes": "One handed",
                  "damage_type": {
                    "index": "piercing",
                    "name": "Piercing",
                    "url": "/api/2014/damage-types/piercing"
                  },
                  "damage_dice": "1d6+1"
                },
                {
                  "option_type": "damage",
                  "notes": "Two handed",
                  "damage_type": {
                    "index": "piercing",
                    "name": "Piercing",
                    "url": "/api/2014/damage-types/piercing"
                  },
                  "damage_dice": "1d8+1"
                }
              ]
            }
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Guards include members of a city watch, sentries in a citadel or fortified town, and the bodyguards of merchants and nobles.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any alignment"
    ]
  },
  {
    "name": "Half-Red Dragon Veteran",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any alignment",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 16,
    "dexterity": 13,
    "constitution": 14,
    "intelligence": 10,
    "wisdom": 11,
    "charisma": 10,
    "armorClass": 18,
    "armorType": "armor",
    "hitPoints": 65,
    "hitDice": "10d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "fire"
    ],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "blindsight": 10,
      "passivePerception": 12
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 3,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The veteran makes two longsword attacks. If it has a shortsword drawn, it can also make a shortsword attack.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Longsword",
            "count": "2",
            "type": "melee"
          },
          {
            "action_name": "Shortsword",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Longsword",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands.",
        "attack_bonus": 5,
        "damage": [
          {
            "choose": 1,
            "type": "damage",
            "from": {
              "option_set_type": "options_array",
              "options": [
                {
                  "option_type": "damage",
                  "notes": "One handed",
                  "damage_type": {
                    "index": "slashing",
                    "name": "Slashing",
                    "url": "/api/2014/damage-types/slashing"
                  },
                  "damage_dice": "1d8+3"
                },
                {
                  "option_type": "damage",
                  "notes": "Two handed",
                  "damage_type": {
                    "index": "slashing",
                    "name": "Slashing",
                    "url": "/api/2014/damage-types/slashing"
                  },
                  "damage_dice": "1d10+3"
                }
              ]
            }
          }
        ],
        "actions": []
      },
      {
        "name": "Shortsword",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Heavy Crossbow",
        "desc": "Ranged Weapon Attack: +3 to hit, range 100/400 ft., one target. Hit: 6 (1d10 + 1) piercing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d10+1"
          }
        ],
        "actions": []
      },
      {
        "name": "Fire Breath",
        "desc": "The veteran exhales fire in a 15-foot cone. Each creature in that area must make a DC 15 Dexterity saving throw, taking 24 (7d6) fire damage on a failed save, or half as much damage on a successful one.",
        "damage": [
          {
            "damage_type": {
              "index": "fire",
              "name": "Fire",
              "url": "/api/2014/damage-types/fire"
            },
            "damage_dice": "7d6"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any alignment"
    ]
  },
  {
    "name": "Hobgoblin",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "lawful evil",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 13,
    "dexterity": 12,
    "constitution": 12,
    "intelligence": 10,
    "wisdom": 10,
    "charisma": 9,
    "armorClass": 18,
    "armorType": "armor",
    "hitPoints": 11,
    "hitDice": "2d8",
    "speed": {
      "walk": 30,
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
      "passivePerception": 10
    },
    "languages": [
      "Common",
      "Goblin"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Martial Advantage",
        "description": "Once per turn, the hobgoblin can deal an extra 7 (2d6) damage to a creature it hits with a weapon attack if that creature is within 5 ft. of an ally of the hobgoblin that isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Longsword",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) slashing damage, or 6 (1d10 + 1) slashing damage if used with two hands.",
        "attack_bonus": 3,
        "damage": [
          {
            "choose": 1,
            "type": "damage",
            "from": {
              "option_set_type": "options_array",
              "options": [
                {
                  "option_type": "damage",
                  "notes": "One handed",
                  "damage_type": {
                    "index": "slashing",
                    "name": "Slashing",
                    "url": "/api/2014/damage-types/slashing"
                  },
                  "damage_dice": "1d8+1"
                },
                {
                  "option_type": "damage",
                  "notes": "Two handed",
                  "damage_type": {
                    "index": "slashing",
                    "name": "Slashing",
                    "url": "/api/2014/damage-types/slashing"
                  },
                  "damage_dice": "1d10+1"
                }
              ]
            }
          }
        ],
        "actions": []
      },
      {
        "name": "Longbow",
        "desc": "Ranged Weapon Attack: +3 to hit, range 150/600 ft., one target. Hit: 5 (1d8 + 1) piercing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Knight",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any alignment",
    "challengeRating": "3",
    "xp": 700,
    "strength": 16,
    "dexterity": 11,
    "constitution": 14,
    "intelligence": 11,
    "wisdom": 11,
    "charisma": 15,
    "armorClass": 18,
    "armorType": "armor",
    "hitPoints": 52,
    "hitDice": "8d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10
    },
    "languages": [
      "any one language (usually Common)"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Brave",
        "description": "The knight has advantage on saving throws against being frightened."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The knight makes two melee attacks.",
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
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Heavy Crossbow",
        "desc": "Ranged Weapon Attack: +2 to hit, range 100/400 ft., one target. Hit: 5 (1d10) piercing damage.",
        "attack_bonus": 2,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d10"
          }
        ],
        "actions": []
      },
      {
        "name": "Leadership",
        "desc": "For 1 minute, the knight can utter a special command or warning whenever a nonhostile creature that it can see within 30 ft. of it makes an attack roll or a saving throw. The creature can add a d4 to its roll provided it can hear and understand the knight. A creature can benefit from only one Leadership die at a time. This effect ends if the knight is incapacitated.",
        "damage": [],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Knights are warriors who pledge service to rulers, religious orders, and noble causes. A knight’s alignment determines the extent to which a pledge is honored. Whether undertaking a quest or patrolling a realm, a knight often travels with an entourage that includes squires and hirelings who are commoners.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any alignment"
    ]
  },
  {
    "name": "Kobold",
    "size": "Small",
    "type": "humanoid",
    "alignment": "lawful evil",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 7,
    "dexterity": 15,
    "constitution": 9,
    "intelligence": 8,
    "wisdom": 7,
    "charisma": 8,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 5,
    "hitDice": "2d6",
    "speed": {
      "walk": 30,
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
      "Draconic"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the kobold has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight."
      },
      {
        "name": "Pack Tactics",
        "description": "The kobold has advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Dagger",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Sling",
        "desc": "Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 4 (1d4 + 2) bludgeoning damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d4+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "small",
      "lawful evil"
    ]
  },
  {
    "name": "Lizardfolk",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "neutral",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 15,
    "dexterity": 10,
    "constitution": 13,
    "intelligence": 7,
    "wisdom": 12,
    "charisma": 7,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 22,
    "hitDice": "4d8",
    "speed": {
      "walk": 30,
      "swim": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 3,
      "Stealth": 4,
      "Survival": 5
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 13
    },
    "languages": [
      "Draconic"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The lizardfolk can hold its breath for 15 minutes."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The lizardfolk makes two melee attacks, each one with a different weapon.",
        "damage": [],
        "multiattack_type": "action_options",
        "action_options": {
          "choose": 1,
          "type": "action",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Bite",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Heavy Club",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Bite",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Javelin",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Bite",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Spiked Shield",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Javelin",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Heavy Club",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Spiked Shield",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Javelin",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Spiked Shield",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Heavy Club",
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
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Heavy Club",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) bludgeoning damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Javelin",
        "desc": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Spiked Shield",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "neutral"
    ]
  },
  {
    "name": "Mage",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any alignment",
    "challengeRating": "6",
    "xp": 2300,
    "strength": 9,
    "dexterity": 14,
    "constitution": 11,
    "intelligence": 17,
    "wisdom": 12,
    "charisma": 11,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 40,
    "hitDice": "9d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Arcana": 6,
      "History": 6
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 11
    },
    "languages": [
      "any four languages"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Spellcasting",
        "description": "The mage is a 9th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks). The mage has the following wizard spells prepared:\n\n- Cantrips (at will): fire bolt, light, mage hand, prestidigitation\n- 1st level (4 slots): detect magic, mage armor, magic missile, shield\n- 2nd level (3 slots): misty step, suggestion\n- 3rd level (3 slots): counterspell, fireball, fly\n- 4th level (3 slots): greater invisibility, ice storm\n- 5th level (1 slot): cone of cold"
      }
    ],
    "actions": [
      {
        "name": "Dagger",
        "desc": "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4 + 2) piercing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Mages spend their lives in the study and practice of magic. Good-aligned mages offer counsel to nobles and others in power, while evil mages dwell in isolated sites to perform unspeakable experiments without interference.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any alignment"
    ]
  },
  {
    "name": "Merfolk",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "neutral",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 10,
    "dexterity": 13,
    "constitution": 12,
    "intelligence": 11,
    "wisdom": 11,
    "charisma": 12,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 11,
    "hitDice": "2d8",
    "speed": {
      "walk": 10,
      "swim": 40,
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
      "Aquan",
      "Common"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The merfolk can breathe air and water."
      }
    ],
    "actions": [
      {
        "name": "Spear",
        "desc": "Melee or Ranged Weapon Attack: +2 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 3 (1d6) piercing damage, or 4 (1d8) piercing damage if used with two hands to make a melee attack.",
        "attack_bonus": 2,
        "damage": [
          {
            "choose": 1,
            "type": "damage",
            "from": {
              "option_set_type": "options_array",
              "options": [
                {
                  "option_type": "damage",
                  "notes": "One handed",
                  "damage_type": {
                    "index": "piercing",
                    "name": "Piercing",
                    "url": "/api/2014/damage-types/piercing"
                  },
                  "damage_dice": "1d6"
                },
                {
                  "option_type": "damage",
                  "notes": "Two handed",
                  "damage_type": {
                    "index": "piercing",
                    "name": "Piercing",
                    "url": "/api/2014/damage-types/piercing"
                  },
                  "damage_dice": "1d8"
                }
              ]
            }
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "neutral"
    ]
  },
  {
    "name": "Noble",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any alignment",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 11,
    "dexterity": 12,
    "constitution": 11,
    "intelligence": 12,
    "wisdom": 14,
    "charisma": 16,
    "armorClass": 15,
    "armorType": "armor",
    "hitPoints": 9,
    "hitDice": "2d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Deception": 5,
      "Insight": 4,
      "Persuasion": 5
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 12
    },
    "languages": [
      "any two languages"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Rapier",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d8+1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "**Nobles** wield great authority and influence as members of the upper class, possessing wealth and connections that can make them as powerful as monarchs and generals. A noble often travels in the company of guards, as well as servants who are commoners.\n\nThe noble’s statistics can also be used to represent **courtiers** who aren’t of noble birth.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any alignment"
    ]
  },
  {
    "name": "Orc",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "chaotic evil",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 16,
    "dexterity": 12,
    "constitution": 16,
    "intelligence": 7,
    "wisdom": 11,
    "charisma": 10,
    "armorClass": 13,
    "armorType": "armor",
    "hitPoints": 15,
    "hitDice": "2d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Intimidation": 2
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 10
    },
    "languages": [
      "Common",
      "Orc"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Aggressive",
        "description": "As a bonus action, the orc can move up to its speed toward a hostile creature that it can see."
      }
    ],
    "actions": [
      {
        "name": "Greataxe",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d12 + 3) slashing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d12+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Javelin",
        "desc": "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 6 (1d6 + 3) piercing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+3"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "chaotic evil"
    ]
  },
  {
    "name": "Priest",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any alignment",
    "challengeRating": "2",
    "xp": 450,
    "strength": 10,
    "dexterity": 10,
    "constitution": 12,
    "intelligence": 13,
    "wisdom": 16,
    "charisma": 13,
    "armorClass": 13,
    "armorType": "armor",
    "hitPoints": 27,
    "hitDice": "5d8",
    "speed": {
      "walk": 25,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Medicine": 7,
      "Persuasion": 3,
      "Religion": 4
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 13
    },
    "languages": [
      "any two languages"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Divine Eminence",
        "description": "As a bonus action, the priest can expend a spell slot to cause its melee weapon attacks to magically deal an extra 10 (3d6) radiant damage to a target on a hit. This benefit lasts until the end of the turn. If the priest expends a spell slot of 2nd level or higher, the extra damage increases by 1d6 for each level above 1st."
      },
      {
        "name": "Spellcasting",
        "description": "The priest is a 5th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 13, +5 to hit with spell attacks). The priest has the following cleric spells prepared:\n\n- Cantrips (at will): light, sacred flame, thaumaturgy\n- 1st level (4 slots): cure wounds, guiding bolt, sanctuary\n- 2nd level (3 slots): lesser restoration, spiritual weapon\n- 3rd level (2 slots): dispel magic, spirit guardians"
      }
    ],
    "actions": [
      {
        "name": "Mace",
        "desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) bludgeoning damage.",
        "attack_bonus": 2,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Priests bring the teachings of their gods to the common folk. They are the spiritual leaders of temples and shrines and often hold positions of influence in their communities. Evil priests might work openly under a tyrant, or they might be the leaders of religious sects hidden in the shadows of good society, overseeing depraved rites.\n\nA priest typically has one or more acolytes to help with religious ceremonies and other sacred duties.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any alignment"
    ]
  },
  {
    "name": "Sahuagin",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "lawful evil",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 13,
    "dexterity": 11,
    "constitution": 12,
    "intelligence": 12,
    "wisdom": 13,
    "charisma": 9,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 22,
    "hitDice": "4d8",
    "speed": {
      "walk": 30,
      "swim": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 5
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 120,
      "passivePerception": 15
    },
    "languages": [
      "Sahuagin"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Blood Frenzy",
        "description": "The sahuagin has advantage on melee attack rolls against any creature that doesn't have all its hit points."
      },
      {
        "name": "Limited Amphibiousness",
        "description": "The sahuagin can breathe air and water, but it needs to be submerged at least once every 4 hours to avoid suffocating."
      },
      {
        "name": "Shark Telepathy",
        "description": "The sahuagin can magically command any shark within 120 feet of it, using a limited telepathy."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The sahuagin makes two melee attacks: one with its bite and one with its claws or spear.",
        "damage": [],
        "multiattack_type": "action_options",
        "action_options": {
          "choose": 1,
          "type": "action",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Bite",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Claws",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Bite",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Spear",
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
        "name": "Bite",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) piercing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4+1"
          }
        ],
        "actions": []
      },
      {
        "name": "Claws",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) slashing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d4+1"
          }
        ],
        "actions": []
      },
      {
        "name": "Spear",
        "desc": "Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6 + 1) piercing damage, or 5 (1d8 + 1) piercing damage if used with two hands to make a melee attack.",
        "attack_bonus": 3,
        "damage": [
          {
            "choose": 1,
            "type": "damage",
            "from": {
              "option_set_type": "options_array",
              "options": [
                {
                  "option_type": "damage",
                  "notes": "One handed",
                  "damage_type": {
                    "index": "piercing",
                    "name": "Piercing",
                    "url": "/api/2014/damage-types/piercing"
                  },
                  "damage_dice": "1d6+1"
                },
                {
                  "option_type": "damage",
                  "notes": "Two handed",
                  "damage_type": {
                    "index": "piercing",
                    "name": "Piercing",
                    "url": "/api/2014/damage-types/piercing"
                  },
                  "damage_dice": "1d8+1"
                }
              ]
            }
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Scout",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any alignment",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 11,
    "dexterity": 14,
    "constitution": 12,
    "intelligence": 11,
    "wisdom": 13,
    "charisma": 11,
    "armorClass": 13,
    "armorType": "armor",
    "hitPoints": 16,
    "hitDice": "3d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Nature": 4,
      "Perception": 5,
      "Stealth": 6,
      "Survival": 5
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 15
    },
    "languages": [
      "any one language (usually Common)"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Sight",
        "description": "The scout has advantage on Wisdom (Perception) checks that rely on hearing or sight."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The scout makes two melee attacks or two ranged attacks.",
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
                "action_name": "Shortsword",
                "count": 2,
                "type": "melee"
              },
              {
                "option_type": "action",
                "action_name": "Longbow",
                "count": 2,
                "type": "ranged"
              }
            ]
          }
        },
        "actions": []
      },
      {
        "name": "Shortsword",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Longbow",
        "desc": "Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Scouts are skilled hunters and trackers who offer their services for a fee. Most hunt wild game, but a few work as bounty hunters, serve as guides, or provide military reconnaissance.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any alignment"
    ]
  },
  {
    "name": "Spy",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any alignment",
    "challengeRating": "1",
    "xp": 200,
    "strength": 10,
    "dexterity": 15,
    "constitution": 10,
    "intelligence": 12,
    "wisdom": 14,
    "charisma": 16,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 27,
    "hitDice": "6d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Deception": 5,
      "Insight": 4,
      "Investigation": 5,
      "Perception": 6,
      "Persuasion": 5,
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 16
    },
    "languages": [
      "any two languages"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Cunning Action",
        "description": "On each of its turns, the spy can use a bonus action to take the Dash, Disengage, or Hide action."
      },
      {
        "name": "Sneak Attack (1/Turn)",
        "description": "The spy deals an extra 7 (2d6) damage when it hits a target with a weapon attack and has advantage on the attack roll, or when the target is within 5 ft. of an ally of the spy that isn't incapacitated and the spy doesn't have disadvantage on the attack roll."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The spy makes two melee attacks.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Shortsword",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Shortsword",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Hand Crossbow",
        "desc": "Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Rulers, nobles, merchants, guildmasters, and other wealthy individuals use spies to gain the upper hand in a world of cutthroat politics. A spy is trained to secretly gather information. Loyal spies would rather die than divulge information that could compromise them or their employers.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any alignment"
    ]
  },
  {
    "name": "Thug",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any non-good alignment",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 15,
    "dexterity": 11,
    "constitution": 14,
    "intelligence": 10,
    "wisdom": 10,
    "charisma": 11,
    "armorClass": 11,
    "armorType": "armor",
    "hitPoints": 32,
    "hitDice": "5d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Intimidation": 2
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10
    },
    "languages": [
      "any one language (usually Common)"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The thug has advantage on an attack roll against a creature if at least one of the thug's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The thug makes two melee attacks.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Mace",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Mace",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) bludgeoning damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Heavy Crossbow",
        "desc": "Ranged Weapon Attack: +2 to hit, range 100/400 ft., one target. Hit: 5 (1d10) piercing damage.",
        "attack_bonus": 2,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d10"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Thugs are ruthless enforcers skilled at intimidation and violence. They work for money and have few scruples.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any non-good alignment"
    ]
  },
  {
    "name": "Tribal Warrior",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any alignment",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 13,
    "dexterity": 11,
    "constitution": 12,
    "intelligence": 8,
    "wisdom": 11,
    "charisma": 8,
    "armorClass": 12,
    "armorType": "armor",
    "hitPoints": 11,
    "hitDice": "2d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10
    },
    "languages": [
      "any one language"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The warrior has advantage on an attack roll against a creature if at least one of the warrior's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Spear",
        "desc": "Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6 + 1) piercing damage, or 5 (1d8 + 1) piercing damage if used with two hands to make a melee attack.",
        "attack_bonus": 3,
        "damage": [
          {
            "choose": 1,
            "type": "damage",
            "from": {
              "option_set_type": "options_array",
              "options": [
                {
                  "option_type": "damage",
                  "notes": "One handed",
                  "damage_type": {
                    "index": "piercing",
                    "name": "Piercing",
                    "url": "/api/2014/damage-types/piercing"
                  },
                  "damage_dice": "1d6+1"
                },
                {
                  "option_type": "damage",
                  "notes": "Two handed",
                  "damage_type": {
                    "index": "piercing",
                    "name": "Piercing",
                    "url": "/api/2014/damage-types/piercing"
                  },
                  "damage_dice": "1d8+1"
                }
              ]
            }
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Tribal warriors live beyond civilization, most often subsisting on fishing and hunting. Each tribe acts in accordance with the wishes of its chief, who is the greatest or oldest warrior of the tribe or a tribe member blessed by the gods.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any alignment"
    ]
  },
  {
    "name": "Veteran",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "any alignment",
    "challengeRating": "3",
    "xp": 700,
    "strength": 16,
    "dexterity": 13,
    "constitution": 14,
    "intelligence": 10,
    "wisdom": 11,
    "charisma": 10,
    "armorClass": 17,
    "armorType": "armor",
    "hitPoints": 58,
    "hitDice": "9d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Athletics": 5,
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
      "any one language (usually Common)"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The veteran makes two longsword attacks. If it has a shortsword drawn, it can also make a shortsword attack.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Longsword",
            "count": "2",
            "type": "melee"
          },
          {
            "action_name": "Shortsword",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Longsword",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands.",
        "attack_bonus": 5,
        "damage": [
          {
            "choose": 1,
            "type": "damage",
            "from": {
              "option_set_type": "options_array",
              "options": [
                {
                  "option_type": "damage",
                  "notes": "One handed",
                  "damage_type": {
                    "index": "slashing",
                    "name": "Slashing",
                    "url": "/api/2014/damage-types/slashing"
                  },
                  "damage_dice": "1d8+3"
                },
                {
                  "option_type": "damage",
                  "notes": "Two handed",
                  "damage_type": {
                    "index": "slashing",
                    "name": "Slashing",
                    "url": "/api/2014/damage-types/slashing"
                  },
                  "damage_dice": "1d10+3"
                }
              ]
            }
          }
        ],
        "actions": []
      },
      {
        "name": "Shortsword",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Heavy Crossbow",
        "desc": "Ranged Weapon Attack: +3 to hit, range 100/400 ft., one target. Hit: 6 (1d10 + 1) piercing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d10+1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Veterans are professional fighters that take up arms for pay or to protect something they believe in or value. Their ranks include soldiers retired from long service and warriors who never served anyone but themselves.",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "any alignment"
    ]
  },
  {
    "name": "Werebear, Bear Form",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "neutral good",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 19,
    "dexterity": 10,
    "constitution": 17,
    "intelligence": 11,
    "wisdom": 12,
    "charisma": 12,
    "armorClass": 11,
    "armorType": "natural",
    "hitPoints": 135,
    "hitDice": "18d8",
    "speed": {
      "walk": 40,
      "climb": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 7
    },
    "damageResistances": [],
    "damageImmunities": [
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 17
    },
    "languages": [],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The werebear can use its action to polymorph into a Large bear-humanoid hybrid or into a Large bear, or back into its true form, which is humanoid. Its statistics, other than its size and AC, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Keen Smell",
        "description": "The werebear has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "In bear form, the werebear makes two claw attacks. In humanoid form, it makes two greataxe attacks. In hybrid form, it can attack like a bear or a humanoid.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 15 (2d10 + 4) piercing damage. If the target is a humanoid, it must succeed on a DC 14 Constitution saving throw or be cursed with werebear lycanthropy.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+4"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d8+4"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "neutral good"
    ]
  },
  {
    "name": "Werebear, Human Form",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "neutral good",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 19,
    "dexterity": 10,
    "constitution": 17,
    "intelligence": 11,
    "wisdom": 12,
    "charisma": 12,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 135,
    "hitDice": "18d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 7
    },
    "damageResistances": [],
    "damageImmunities": [
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 17
    },
    "languages": [
      "Common"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The werebear can use its action to polymorph into a Large bear-humanoid hybrid or into a Large bear, or back into its true form, which is humanoid. Its statistics, other than its size and AC, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Keen Smell",
        "description": "The werebear has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "In bear form, the werebear makes two claw attacks. In humanoid form, it makes two greataxe attacks. In hybrid form, it can attack like a bear or a humanoid.",
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
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 10 (1d12 + 4) slashing damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d12+4"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "neutral good"
    ]
  },
  {
    "name": "Werebear, Hybrid Form",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "neutral good",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 19,
    "dexterity": 10,
    "constitution": 17,
    "intelligence": 11,
    "wisdom": 12,
    "charisma": 12,
    "armorClass": 11,
    "armorType": "natural",
    "hitPoints": 135,
    "hitDice": "18d8",
    "speed": {
      "walk": 40,
      "climb": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 7
    },
    "damageResistances": [],
    "damageImmunities": [
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 17
    },
    "languages": [
      "Common"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The werebear can use its action to polymorph into a Large bear-humanoid hybrid or into a Large bear, or back into its true form, which is humanoid. Its statistics, other than its size and AC, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Keen Smell",
        "description": "The werebear has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "In bear form, the werebear makes two claw attacks. In humanoid form, it makes two greataxe attacks. In hybrid form, it can attack like a bear or a humanoid.",
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
                "action_name": "Claw",
                "count": 2,
                "type": "melee"
              },
              {
                "option_type": "action",
                "action_name": "Greataxe",
                "count": 2,
                "type": "melee"
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Greataxe",
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
        "name": "Bite",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 15 (2d10 + 4) piercing damage. If the target is a humanoid, it must succeed on a DC 14 Constitution saving throw or be cursed with werebear lycanthropy.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+4"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d8+4"
          }
        ],
        "actions": []
      },
      {
        "name": "Greataxe",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 10 (1d12 + 4) slashing damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d12+4"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "neutral good"
    ]
  },
  {
    "name": "Wereboar, Boar Form",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "neutral evil",
    "challengeRating": "4",
    "xp": 1100,
    "strength": 17,
    "dexterity": 10,
    "constitution": 15,
    "intelligence": 10,
    "wisdom": 11,
    "charisma": 8,
    "armorClass": 11,
    "armorType": "natural",
    "hitPoints": 78,
    "hitDice": "12d8",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 2
    },
    "damageResistances": [],
    "damageImmunities": [
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 12
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The wereboar can use its action to polymorph into a boar-humanoid hybrid or into a boar, or back into its true form, which is humanoid. Its statistics, other than its AC, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Charge (Boar or Hybrid Form Only)",
        "description": "If the wereboar moves at least 15 feet straight toward a target and then hits it with its tusks on the same turn, the target takes an extra 7 (2d6) slashing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone."
      },
      {
        "name": "Relentless",
        "description": "If the wereboar takes 14 damage or less that would reduce it to 0 hit points, it is reduced to 1 hit point instead."
      }
    ],
    "actions": [
      {
        "name": "Tusks",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If the target is a humanoid, it must succeed on a DC 12 Constitution saving throw or be cursed with wereboar lycanthropy.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+3"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "neutral evil"
    ]
  },
  {
    "name": "Wereboar, Human Form",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "neutral evil",
    "challengeRating": "4",
    "xp": 1100,
    "strength": 17,
    "dexterity": 10,
    "constitution": 15,
    "intelligence": 10,
    "wisdom": 11,
    "charisma": 8,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 78,
    "hitDice": "12d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 2
    },
    "damageResistances": [],
    "damageImmunities": [
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 12
    },
    "languages": [
      "Common (can't speak in boar form)"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The wereboar can use its action to polymorph into a boar-humanoid hybrid or into a boar, or back into its true form, which is humanoid. Its statistics, other than its AC, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Relentless",
        "description": "If the wereboar takes 14 damage or less that would reduce it to 0 hit points, it is reduced to 1 hit point instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The wereboar makes two attacks, only one of which can be with its tusks.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Maul",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Maul",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+3"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "neutral evil"
    ]
  },
  {
    "name": "Wereboar, Hybrid Form",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "neutral evil",
    "challengeRating": "4",
    "xp": 1100,
    "strength": 17,
    "dexterity": 10,
    "constitution": 15,
    "intelligence": 10,
    "wisdom": 11,
    "charisma": 8,
    "armorClass": 11,
    "armorType": "natural",
    "hitPoints": 78,
    "hitDice": "12d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 2
    },
    "damageResistances": [],
    "damageImmunities": [
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 12
    },
    "languages": [
      "Common"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The wereboar can use its action to polymorph into a boar-humanoid hybrid or into a boar, or back into its true form, which is humanoid. Its statistics, other than its AC, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Charge (Boar or Hybrid Form Only)",
        "description": "If the wereboar moves at least 15 feet straight toward a target and then hits it with its tusks on the same turn, the target takes an extra 7 (2d6) slashing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone."
      },
      {
        "name": "Relentless",
        "description": "If the wereboar takes 14 damage or less that would reduce it to 0 hit points, it is reduced to 1 hit point instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The wereboar makes two attacks, only one of which can be with its tusks.",
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
                "action_name": "Maul",
                "count": 2,
                "type": "melee"
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Maul",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Tusks",
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
        "name": "Maul",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Tusks",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If the target is a humanoid, it must succeed on a DC 12 Constitution saving throw or be cursed with wereboar lycanthropy.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+3"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "neutral evil"
    ]
  },
  {
    "name": "Wererat, Human Form",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "lawful evil",
    "challengeRating": "2",
    "xp": 450,
    "strength": 10,
    "dexterity": 15,
    "constitution": 12,
    "intelligence": 11,
    "wisdom": 10,
    "charisma": 8,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 33,
    "hitDice": "6d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 2,
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 12
    },
    "languages": [
      "Common"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The wererat can use its action to polymorph into a rat-humanoid hybrid or into a giant rat, or back into its true form, which is humanoid. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Keen Smell",
        "description": "The wererat has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The wererat makes two attacks, only one of which can be a bite.",
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
                "action_name": "Shortsword",
                "count": 2,
                "type": "melee"
              },
              {
                "option_type": "action",
                "action_name": "Hand Crossbow",
                "count": 2,
                "type": "ranged"
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Shortsword",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Hand Crossbow",
                    "count": 1,
                    "type": "ranged"
                  }
                ]
              }
            ]
          }
        },
        "actions": []
      },
      {
        "name": "Shortsword",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Hand Crossbow",
        "desc": "Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Wererat, Hybrid Form",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "lawful evil",
    "challengeRating": "2",
    "xp": 450,
    "strength": 10,
    "dexterity": 15,
    "constitution": 12,
    "intelligence": 11,
    "wisdom": 10,
    "charisma": 8,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 33,
    "hitDice": "6d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 2,
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 12
    },
    "languages": [
      "Common"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The wererat can use its action to polymorph into a rat-humanoid hybrid or into a giant rat, or back into its true form, which is humanoid. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Keen Smell",
        "description": "The wererat has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The wererat makes two attacks, only one of which can be a bite.",
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
                "action_name": "Shortsword",
                "count": 2,
                "type": "melee"
              },
              {
                "option_type": "action",
                "action_name": "Hand Crossbow",
                "count": 2,
                "type": "ranged"
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Shortsword",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Hand Crossbow",
                    "count": 1,
                    "type": "ranged"
                  }
                ]
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Shortsword",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Bite",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Hand Crossbow",
                    "count": 1,
                    "type": "ranged"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Bite",
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
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage. If the target is a humanoid, it must succeed on a DC 11 Constitution saving throw or be cursed with wererat lycanthropy.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Shortsword",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Hand Crossbow",
        "desc": "Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Wererat, Rat Form",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "lawful evil",
    "challengeRating": "2",
    "xp": 450,
    "strength": 10,
    "dexterity": 15,
    "constitution": 12,
    "intelligence": 11,
    "wisdom": 10,
    "charisma": 8,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 33,
    "hitDice": "6d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 2,
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 12
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The wererat can use its action to polymorph into a rat-humanoid hybrid or into a giant rat, or back into its true form, which is humanoid. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Keen Smell",
        "description": "The wererat has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage. If the target is a humanoid, it must succeed on a DC 11 Constitution saving throw or be cursed with wererat lycanthropy.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Weretiger, Human Form",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "neutral",
    "challengeRating": "4",
    "xp": 1100,
    "strength": 17,
    "dexterity": 15,
    "constitution": 16,
    "intelligence": 10,
    "wisdom": 13,
    "charisma": 11,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 120,
    "hitDice": "16d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 5,
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 15
    },
    "languages": [
      "Common"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The weretiger can use its action to polymorph into a tiger-humanoid hybrid or into a tiger, or back into its true form, which is humanoid. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Keen Hearing and Smell",
        "description": "The weretiger has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "In humanoid form, the weretiger makes two scimitar attacks or two longbow attacks. In hybrid form, it can attack like a humanoid or make two claw attacks.",
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
                "action_name": "Scimitar",
                "count": 2,
                "type": "melee"
              },
              {
                "option_type": "action",
                "action_name": "Longbow",
                "count": 2,
                "type": "ranged"
              }
            ]
          }
        },
        "actions": []
      },
      {
        "name": "Scimitar",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d6+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Longbow",
        "desc": "Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "neutral"
    ]
  },
  {
    "name": "Weretiger, Hybrid Form",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "neutral",
    "challengeRating": "4",
    "xp": 1100,
    "strength": 17,
    "dexterity": 15,
    "constitution": 16,
    "intelligence": 10,
    "wisdom": 13,
    "charisma": 11,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 120,
    "hitDice": "16d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 5,
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 15
    },
    "languages": [
      "Common"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The weretiger can use its action to polymorph into a tiger-humanoid hybrid or into a tiger, or back into its true form, which is humanoid. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Keen Hearing and Smell",
        "description": "The weretiger has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      },
      {
        "name": "Pounce",
        "description": "If the weretiger moves at least 15 feet straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone. If the target is prone, the weretiger can make one bite attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "In humanoid form, the weretiger makes two scimitar attacks or two longbow attacks. In hybrid form, it can attack like a humanoid or make two claw attacks.",
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
                "action_name": "Scimitar",
                "count": 2,
                "type": "melee"
              },
              {
                "option_type": "action",
                "action_name": "Longbow",
                "count": 2,
                "type": "ranged"
              },
              {
                "option_type": "action",
                "action_name": "Claw",
                "count": 2,
                "type": "melee"
              }
            ]
          }
        },
        "actions": []
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage. If the target is a humanoid, it must succeed on a DC 13 Constitution saving throw or be cursed with weretiger lycanthropy.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d10+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d8+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Scimitar",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d6+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Longbow",
        "desc": "Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "neutral"
    ]
  },
  {
    "name": "Weretiger, Tiger Form",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "neutral",
    "challengeRating": "4",
    "xp": 1100,
    "strength": 17,
    "dexterity": 15,
    "constitution": 16,
    "intelligence": 10,
    "wisdom": 13,
    "charisma": 11,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 120,
    "hitDice": "16d8",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 5,
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 15
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The weretiger can use its action to polymorph into a tiger-humanoid hybrid or into a tiger, or back into its true form, which is humanoid. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Keen Hearing and Smell",
        "description": "The weretiger has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      },
      {
        "name": "Pounce",
        "description": "If the weretiger moves at least 15 feet straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone. If the target is prone, the weretiger can make one bite attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage. If the target is a humanoid, it must succeed on a DC 13 Constitution saving throw or be cursed with weretiger lycanthropy.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d10+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d8+3"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "neutral"
    ]
  },
  {
    "name": "Werewolf, Human Form",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "chaotic evil",
    "challengeRating": "3",
    "xp": 700,
    "strength": 15,
    "dexterity": 13,
    "constitution": 14,
    "intelligence": 10,
    "wisdom": 11,
    "charisma": 10,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 58,
    "hitDice": "9d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 4
    },
    "damageResistances": [],
    "damageImmunities": [
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14
    },
    "languages": [
      "Common"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The werewolf can use its action to polymorph into a wolf-humanoid hybrid or into a wolf, or back into its true form, which is humanoid. Its statistics, other than its AC, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Keen Hearing and Smell",
        "description": "The werewolf has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The werewolf makes two attacks: two with its spear (humanoid form) or one with its bite and one with its claws (hybrid form).",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Spear",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Spear",
        "desc": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one creature. Hit: 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used with two hands to make a melee attack.",
        "attack_bonus": 4,
        "damage": [
          {
            "choose": 1,
            "type": "damage",
            "from": {
              "option_set_type": "options_array",
              "options": [
                {
                  "option_type": "damage",
                  "notes": "One handed",
                  "damage_type": {
                    "index": "piercing",
                    "name": "Piercing",
                    "url": "/api/2014/damage-types/piercing"
                  },
                  "damage_dice": "1d6+2"
                },
                {
                  "option_type": "damage",
                  "notes": "Two handed",
                  "damage_type": {
                    "index": "piercing",
                    "name": "Piercing",
                    "url": "/api/2014/damage-types/piercing"
                  },
                  "damage_dice": "1d8+2"
                }
              ]
            }
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "chaotic evil"
    ]
  },
  {
    "name": "Werewolf, Hybrid Form",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "chaotic evil",
    "challengeRating": "3",
    "xp": 700,
    "strength": 15,
    "dexterity": 13,
    "constitution": 14,
    "intelligence": 10,
    "wisdom": 11,
    "charisma": 10,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 58,
    "hitDice": "9d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 4
    },
    "damageResistances": [],
    "damageImmunities": [
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14
    },
    "languages": [
      "Common"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The werewolf can use its action to polymorph into a wolf-humanoid hybrid or into a wolf, or back into its true form, which is humanoid. Its statistics, other than its AC, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Keen Hearing and Smell",
        "description": "The werewolf has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The werewolf makes two attacks: two with its spear (humanoid form) or one with its bite and one with its claws (hybrid form).",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claws",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage. If the target is a humanoid, it must succeed on a DC 12 Constitution saving throw or be cursed with werewolf lycanthropy.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Claws",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (2d4 + 2) slashing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d4+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "chaotic evil"
    ]
  },
  {
    "name": "Werewolf, Wolf Form",
    "size": "Medium",
    "type": "humanoid",
    "alignment": "chaotic evil",
    "challengeRating": "3",
    "xp": 700,
    "strength": 15,
    "dexterity": 13,
    "constitution": 14,
    "intelligence": 10,
    "wisdom": 11,
    "charisma": 10,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 58,
    "hitDice": "9d8",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 4
    },
    "damageResistances": [],
    "damageImmunities": [
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The werewolf can use its action to polymorph into a wolf-humanoid hybrid or into a wolf, or back into its true form, which is humanoid. Its statistics, other than its AC, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Keen Hearing and Smell",
        "description": "The werewolf has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage. If the target is a humanoid, it must succeed on a DC 12 Constitution saving throw or be cursed with werewolf lycanthropy.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "humanoid",
      "medium",
      "chaotic evil"
    ]
  }
];
