import { Monster } from '../../types/monster';

export const undeadMonsters: Monster[] = [
  {
    "name": "Ghast",
    "size": "Medium",
    "type": "undead",
    "alignment": "chaotic evil",
    "challengeRating": "2",
    "xp": 450,
    "strength": 16,
    "dexterity": 17,
    "constitution": 10,
    "intelligence": 11,
    "wisdom": 10,
    "charisma": 8,
    "armorClass": 13,
    "armorType": "dex",
    "hitPoints": 36,
    "hitDice": "8d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "necrotic"
    ],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      },
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 10
    },
    "languages": [
      "Common"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Stench",
        "description": "Any creature that starts its turn within 5 ft. of the ghast must succeed on a DC 10 Constitution saving throw or be poisoned until the start of its next turn. On a successful saving throw, the creature is immune to the ghast's Stench for 24 hours."
      },
      {
        "name": "Turn Defiance",
        "description": "The ghast and any ghouls within 30 ft. of it have advantage on saving throws against effects that turn undead."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 12 (2d8 + 3) piercing damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Piercing",
          "roll": "2d8 + 3",
          "average": 12
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If the target is a creature other than an undead, it must succeed on a DC 10 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "attackBonus": 5,
        "damage": {
          "type": "Slashing",
          "roll": "2d6 + 3",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "medium",
      "chaotic evil"
    ]
  },
  {
    "name": "Ghost",
    "size": "Medium",
    "type": "undead",
    "alignment": "any alignment",
    "challengeRating": "4",
    "xp": 1100,
    "strength": 7,
    "dexterity": 13,
    "constitution": 10,
    "intelligence": 10,
    "wisdom": 12,
    "charisma": 17,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 45,
    "hitDice": "10d8",
    "speed": {
      "walk": 0,
      "fly": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "acid",
      "fire",
      "lightning",
      "thunder",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [
      "cold",
      "necrotic",
      "poison"
    ],
    "conditionImmunities": [
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      },
      {
        "index": "frightened",
        "name": "Frightened",
        "url": "/api/2014/conditions/frightened"
      },
      {
        "index": "grappled",
        "name": "Grappled",
        "url": "/api/2014/conditions/grappled"
      },
      {
        "index": "paralyzed",
        "name": "Paralyzed",
        "url": "/api/2014/conditions/paralyzed"
      },
      {
        "index": "petrified",
        "name": "Petrified",
        "url": "/api/2014/conditions/petrified"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      },
      {
        "index": "prone",
        "name": "Prone",
        "url": "/api/2014/conditions/prone"
      },
      {
        "index": "restrained",
        "name": "Restrained",
        "url": "/api/2014/conditions/restrained"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 11
    },
    "languages": [
      "any languages it knew in life"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Ethereal Sight",
        "description": "The ghost can see 60 ft. into the Ethereal Plane when it is on the Material Plane, and vice versa."
      },
      {
        "name": "Incorporeal Movement",
        "description": "The ghost can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object."
      }
    ],
    "actions": [
      {
        "name": "Withering Touch",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 17 (4d6 + 3) necrotic damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Necrotic",
          "roll": "4d6 + 3",
          "average": 17
        }
      },
      {
        "name": "Etherealness",
        "description": "The ghost enters the Ethereal Plane from the Material Plane, or vice versa. It is visible on the Material Plane while it is in the Border Ethereal, and vice versa, yet it can't affect or be affected by anything on the other plane."
      },
      {
        "name": "Horrifying Visage",
        "description": "Each non-undead creature within 60 ft. of the ghost that can see it must succeed on a DC 13 Wisdom saving throw or be frightened for 1 minute. If the save fails by 5 or more, the target also ages 1d4 × 10 years. A frightened target can repeat the saving throw at the end of each of its turns, ending the frightened condition on itself on a success. If a target's saving throw is successful or the effect ends for it, the target is immune to this ghost's Horrifying Visage for the next 24 hours. The aging effect can be reversed with a greater restoration spell, but only within 24 hours of it occurring."
      },
      {
        "name": "Possession",
        "description": "One humanoid that the ghost can see within 5 ft. of it must succeed on a DC 13 Charisma saving throw or be possessed by the ghost; the ghost then disappears, and the target is incapacitated and loses control of its body. The ghost now controls the body but doesn't deprive the target of awareness. The ghost can't be targeted by any attack, spell, or other effect, except ones that turn undead, and it retains its alignment, Intelligence, Wisdom, Charisma, and immunity to being charmed and frightened. It otherwise uses the possessed target's statistics, but doesn't gain access to the target's knowledge, class features, or proficiencies.\nThe possession lasts until the body drops to 0 hit points, the ghost ends it as a bonus action, or the ghost is turned or forced out by an effect like the dispel evil and good spell. When the possession ends, the ghost reappears in an unoccupied space within 5 ft. of the body. The target is immune to this ghost's Possession for 24 hours after succeeding on the saving throw or after the possession ends."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "medium",
      "any alignment"
    ]
  },
  {
    "name": "Ghoul",
    "size": "Medium",
    "type": "undead",
    "alignment": "chaotic evil",
    "challengeRating": "1",
    "xp": 200,
    "strength": 13,
    "dexterity": 15,
    "constitution": 10,
    "intelligence": 7,
    "wisdom": 10,
    "charisma": 6,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 22,
    "hitDice": "5d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      },
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 10
    },
    "languages": [
      "Common"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one creature. Hit: 9 (2d6 + 2) piercing damage.",
        "attackBonus": 2,
        "damage": {
          "type": "Piercing",
          "roll": "2d6 + 2",
          "average": 9
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage. If the target is a creature other than an elf or undead, it must succeed on a DC 10 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "attackBonus": 4,
        "damage": {
          "type": "Slashing",
          "roll": "2d4 + 2",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "medium",
      "chaotic evil"
    ]
  },
  {
    "name": "Lich",
    "size": "Medium",
    "type": "undead",
    "alignment": "any evil alignment",
    "challengeRating": "21",
    "xp": 33000,
    "strength": 11,
    "dexterity": 16,
    "constitution": 16,
    "intelligence": 20,
    "wisdom": 14,
    "charisma": 16,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 135,
    "hitDice": "18d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Arcana": 18,
      "History": 12,
      "Insight": 9,
      "Perception": 9
    },
    "damageResistances": [
      "cold",
      "lightning",
      "necrotic"
    ],
    "damageImmunities": [
      "poison",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "conditionImmunities": [
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      },
      {
        "index": "frightened",
        "name": "Frightened",
        "url": "/api/2014/conditions/frightened"
      },
      {
        "index": "paralyzed",
        "name": "Paralyzed",
        "url": "/api/2014/conditions/paralyzed"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "truesight": 120,
      "passivePerception": 19
    },
    "languages": [
      "Common plus up to five other languages"
    ],
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Legendary Resistance",
        "description": "If the lich fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Rejuvenation",
        "description": "If it has a phylactery, a destroyed lich gains a new body in 1d10 days, regaining all its hit points and becoming active again. The new body appears within 5 feet of the phylactery."
      },
      {
        "name": "Spellcasting",
        "description": "The lich is an 18th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 20, +12 to hit with spell attacks). The lich has the following wizard spells prepared:\n\n- Cantrips (at will): mage hand, prestidigitation, ray of frost\n- 1st level (4 slots): detect magic, magic missile, shield, thunderwave\n- 2nd level (3 slots): acid arrow, detect thoughts, invisibility, mirror image\n- 3rd level (3 slots): animate dead, counterspell, dispel magic, fireball\n- 4th level (3 slots): blight, dimension door\n- 5th level (3 slots): cloudkill, scrying\n- 6th level (1 slot): disintegrate, globe of invulnerability\n- 7th level (1 slot): finger of death, plane shift\n- 8th level (1 slot): dominate monster, power word stun\n- 9th level (1 slot): power word kill"
      },
      {
        "name": "Turn Resistance",
        "description": "The lich has advantage on saving throws against any effect that turns undead."
      }
    ],
    "actions": [
      {
        "name": "Paralyzing Touch",
        "description": "Melee Spell Attack: +12 to hit, reach 5 ft., one creature. Hit: 10 (3d6) cold damage. The target must succeed on a DC 18 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "attackBonus": 12,
        "damage": {
          "type": "Cold",
          "roll": "3d6",
          "average": 10
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Cantrip",
        "description": "The lich casts a cantrip."
      },
      {
        "name": "Paralyzing Touch (Costs 2 Actions)",
        "description": "The lich uses its Paralyzing Touch."
      },
      {
        "name": "Frightening Gaze (Costs 2 Actions)",
        "description": "The lich fixes its gaze on one creature it can see within 10 feet of it. The target must succeed on a DC 18 Wisdom saving throw against this magic or become frightened for 1 minute. The frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a target's saving throw is successful or the effect ends for it, the target is immune to the lich's gaze for the next 24 hours."
      },
      {
        "name": "Disrupt Life (Costs 3 Actions)",
        "description": "Each living creature within 20 feet of the lich must make a DC 18 Constitution saving throw against this magic, taking 21 (6d6) necrotic damage on a failed save, or half as much damage on a successful one."
      }
    ],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "medium",
      "any evil alignment"
    ]
  },
  {
    "name": "Minotaur Skeleton",
    "size": "Large",
    "type": "undead",
    "alignment": "lawful evil",
    "challengeRating": "2",
    "xp": 450,
    "strength": 18,
    "dexterity": 11,
    "constitution": 15,
    "intelligence": 6,
    "wisdom": 8,
    "charisma": 5,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 67,
    "hitDice": "9d10",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "damageVulnerabilities": [
      "bludgeoning"
    ],
    "senses": {
      "darkvision": 60,
      "passivePerception": 9
    },
    "languages": [
      "understands Abyssal but can't speak"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the skeleton moves at least 10 feet straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 9 (2d8) piercing damage. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be pushed up to 10 feet away and knocked prone."
      }
    ],
    "actions": [
      {
        "name": "Greataxe",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Slashing",
          "roll": "2d12 + 4",
          "average": 17
        }
      },
      {
        "name": "Gore",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "2d8 + 4",
          "average": 13
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "large",
      "lawful evil"
    ]
  },
  {
    "name": "Mummy",
    "size": "Medium",
    "type": "undead",
    "alignment": "lawful evil",
    "challengeRating": "3",
    "xp": 700,
    "strength": 16,
    "dexterity": 8,
    "constitution": 15,
    "intelligence": 6,
    "wisdom": 10,
    "charisma": 12,
    "armorClass": 11,
    "armorType": "natural",
    "hitPoints": 58,
    "hitDice": "9d8",
    "speed": {
      "walk": 20,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [
      "necrotic",
      "poison"
    ],
    "conditionImmunities": [
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      },
      {
        "index": "frightened",
        "name": "Frightened",
        "url": "/api/2014/conditions/frightened"
      },
      {
        "index": "paralyzed",
        "name": "Paralyzed",
        "url": "/api/2014/conditions/paralyzed"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "damageVulnerabilities": [
      "fire"
    ],
    "senses": {
      "darkvision": 60,
      "passivePerception": 10
    },
    "languages": [
      "the languages it knew in life"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The mummy can use its Dreadful Glare and makes one attack with its rotting fist."
      },
      {
        "name": "Rotting Fist",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage plus 10 (3d6) necrotic damage. If the target is a creature, it must succeed on a DC 12 Constitution saving throw or be cursed with mummy rot. The cursed target can't regain hit points, and its hit point maximum decreases by 10 (3d6) for every 24 hours that elapse. If the curse reduces the target's hit point maximum to 0, the target dies, and its body turns to dust. The curse lasts until removed by the remove curse spell or other magic.",
        "attackBonus": 5,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d6 + 3",
          "average": 10
        },
        "secondaryDamage": {
          "type": "Necrotic",
          "roll": "3d6",
          "average": 10,
          "description": "Additional"
        }
      },
      {
        "name": "Dreadful Glare",
        "description": "The mummy targets one creature it can see within 60 ft. of it. If the target can see the mummy, it must succeed on a DC 11 Wisdom saving throw against this magic or become frightened until the end of the mummy's next turn. If the target fails the saving throw by 5 or more, it is also paralyzed for the same duration. A target that succeeds on the saving throw is immune to the Dreadful Glare of all mummies (but not mummy lords) for the next 24 hours."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Mummy Lord",
    "size": "Medium",
    "type": "undead",
    "alignment": "lawful evil",
    "challengeRating": "15",
    "xp": 13000,
    "strength": 18,
    "dexterity": 10,
    "constitution": 17,
    "intelligence": 11,
    "wisdom": 18,
    "charisma": 16,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 97,
    "hitDice": "13d8",
    "speed": {
      "walk": 20,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "History": 5,
      "Religion": 5
    },
    "damageResistances": [],
    "damageImmunities": [
      "necrotic",
      "poison",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "conditionImmunities": [
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      },
      {
        "index": "frightened",
        "name": "Frightened",
        "url": "/api/2014/conditions/frightened"
      },
      {
        "index": "paralyzed",
        "name": "Paralyzed",
        "url": "/api/2014/conditions/paralyzed"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "damageVulnerabilities": [
      "fire"
    ],
    "senses": {
      "darkvision": 60,
      "passivePerception": 14
    },
    "languages": [
      "the languages it knew in life"
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The mummy lord has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Rejuvenation",
        "description": "A destroyed mummy lord gains a new body in 24 hours if its heart is intact, regaining all its hit points and becoming active again. The new body appears within 5 feet of the mummy lord's heart."
      },
      {
        "name": "Spellcasting",
        "description": "The mummy lord is a 10th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 17, +9 to hit with spell attacks). The mummy lord has the following cleric spells prepared:\n\n- Cantrips (at will): sacred flame, thaumaturgy\n- 1st level (4 slots): command, guiding bolt, shield of faith\n- 2nd level (3 slots): hold person, silence, spiritual weapon\n- 3rd level (3 slots): animate dead, dispel magic\n- 4th level (3 slots): divination, guardian of faith\n- 5th level (2 slots): contagion, insect plague\n- 6th level (1 slot): harm"
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The mummy can use its Dreadful Glare and makes one attack with its rotting fist."
      },
      {
        "name": "Rotting Fist",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 14 (3d6 + 4) bludgeoning damage plus 21 (6d6) necrotic damage. If the target is a creature, it must succeed on a DC 16 Constitution saving throw or be cursed with mummy rot. The cursed target can't regain hit points, and its hit point maximum decreases by 10 (3d6) for every 24 hours that elapse. If the curse reduces the target's hit point maximum to 0, the target dies, and its body turns to dust. The curse lasts until removed by the remove curse spell or other magic.",
        "attackBonus": 9,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d6 + 4",
          "average": 14
        },
        "secondaryDamage": {
          "type": "Necrotic",
          "roll": "6d6",
          "average": 21,
          "description": "Additional"
        }
      },
      {
        "name": "Dreadful Glare",
        "description": "The mummy lord targets one creature it can see within 60 feet of it. If the target can see the mummy lord, it must succeed on a DC 16 Wisdom saving throw against this magic or become frightened until the end of the mummy's next turn. If the target fails the saving throw by 5 or more, it is also paralyzed for the same duration. A target that succeeds on the saving throw is immune to the Dreadful Glare of all mummies and mummy lords for the next 24 hours."
      }
    ],
    "legendaryActions": [
      {
        "name": "Attack",
        "description": "The mummy lord makes one attack with its rotting fist or uses its Dreadful Glare."
      },
      {
        "name": "Blinding Dust",
        "description": "Blinding dust and sand swirls magically around the mummy lord. Each creature within 5 feet of the mummy lord must succeed on a DC 16 Constitution saving throw or be blinded until the end of the creature's next turn."
      },
      {
        "name": "Blasphemous Word (Costs 2 Actions)",
        "description": "The mummy lord utters a blasphemous word. Each non-undead creature within 10 feet of the mummy lord that can hear the magical utterance must succeed on a DC 16 Constitution saving throw or be stunned until the end of the mummy lord's next turn."
      },
      {
        "name": "Channel Negative Energy (Costs 2 Actions)",
        "description": "The mummy lord magically unleashes negative energy. Creatures within 60 feet of the mummy lord, including ones behind barriers and around corners, can't regain hit points until the end of the mummy lord's next turn."
      },
      {
        "name": "Whirlwind of Sand (Costs 2 Actions)",
        "description": "The mummy lord magically transforms into a whirlwind of sand, moves up to 60 feet, and reverts to its normal form. While in whirlwind form, the mummy lord is immune to all damage, and it can't be grappled, petrified, knocked prone, restrained, or stunned. Equipment worn or carried by the mummy lord remain in its possession."
      }
    ],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Ogre Zombie",
    "size": "Large",
    "type": "undead",
    "alignment": "neutral evil",
    "challengeRating": "2",
    "xp": 450,
    "strength": 19,
    "dexterity": 6,
    "constitution": 18,
    "intelligence": 3,
    "wisdom": 6,
    "charisma": 5,
    "armorClass": 8,
    "armorType": "dex",
    "hitPoints": 85,
    "hitDice": "9d10",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 8
    },
    "languages": [
      "understands Common and Giant but can't speak"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Undead Fortitude",
        "description": "If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5+the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead."
      }
    ],
    "actions": [
      {
        "name": "Morningstar",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8 + 4",
          "average": 13
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "large",
      "neutral evil"
    ]
  },
  {
    "name": "Shadow",
    "size": "Medium",
    "type": "undead",
    "alignment": "chaotic evil",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 6,
    "dexterity": 14,
    "constitution": 13,
    "intelligence": 6,
    "wisdom": 10,
    "charisma": 8,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 16,
    "hitDice": "3d8",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Stealth": 4
    },
    "damageResistances": [
      "acid",
      "cold",
      "fire",
      "lightning",
      "thunder",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [
      "necrotic",
      "poison"
    ],
    "conditionImmunities": [
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      },
      {
        "index": "frightened",
        "name": "Frightened",
        "url": "/api/2014/conditions/frightened"
      },
      {
        "index": "grappled",
        "name": "Grappled",
        "url": "/api/2014/conditions/grappled"
      },
      {
        "index": "paralyzed",
        "name": "Paralyzed",
        "url": "/api/2014/conditions/paralyzed"
      },
      {
        "index": "petrified",
        "name": "Petrified",
        "url": "/api/2014/conditions/petrified"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      },
      {
        "index": "prone",
        "name": "Prone",
        "url": "/api/2014/conditions/prone"
      },
      {
        "index": "restrained",
        "name": "Restrained",
        "url": "/api/2014/conditions/restrained"
      }
    ],
    "damageVulnerabilities": [
      "radiant"
    ],
    "senses": {
      "darkvision": 60,
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amorphous",
        "description": "The shadow can move through a space as narrow as 1 inch wide without squeezing."
      },
      {
        "name": "Shadow Stealth",
        "description": "While in dim light or darkness, the shadow can take the Hide action as a bonus action. Its stealth bonus is also improved to +6."
      },
      {
        "name": "Sunlight Weakness",
        "description": "While in sunlight, the shadow has disadvantage on attack rolls, ability checks, and saving throws."
      }
    ],
    "actions": [
      {
        "name": "Strength Drain",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 9 (2d6 + 2) necrotic damage, and the target's Strength score is reduced by 1d4. The target dies if this reduces its Strength to 0. Otherwise, the reduction lasts until the target finishes a short or long rest.\nIf a non-evil humanoid dies from this attack, a new shadow rises from the corpse 1d4 hours later.",
        "attackBonus": 4,
        "damage": {
          "type": "Necrotic",
          "roll": "2d6 + 2",
          "average": 9
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "medium",
      "chaotic evil"
    ]
  },
  {
    "name": "Skeleton",
    "size": "Medium",
    "type": "undead",
    "alignment": "lawful evil",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 10,
    "dexterity": 14,
    "constitution": 15,
    "intelligence": 6,
    "wisdom": 8,
    "charisma": 5,
    "armorClass": 13,
    "armorType": "armor",
    "hitPoints": 13,
    "hitDice": "2d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      }
    ],
    "damageVulnerabilities": [
      "bludgeoning"
    ],
    "senses": {
      "darkvision": 60,
      "passivePerception": 9
    },
    "languages": [
      "understands all languages it spoke in life but can't speak"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Shortsword",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d6 + 2",
          "average": 5
        }
      },
      {
        "name": "Shortbow",
        "description": "Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d6 + 2",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Specter",
    "size": "Medium",
    "type": "undead",
    "alignment": "chaotic evil",
    "challengeRating": "1",
    "xp": 200,
    "strength": 1,
    "dexterity": 14,
    "constitution": 11,
    "intelligence": 10,
    "wisdom": 10,
    "charisma": 11,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 22,
    "hitDice": "5d8",
    "speed": {
      "walk": 0,
      "fly": 50,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "acid",
      "cold",
      "fire",
      "lightning",
      "thunder",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [
      "necrotic",
      "poison"
    ],
    "conditionImmunities": [
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      },
      {
        "index": "grappled",
        "name": "Grappled",
        "url": "/api/2014/conditions/grappled"
      },
      {
        "index": "paralyzed",
        "name": "Paralyzed",
        "url": "/api/2014/conditions/paralyzed"
      },
      {
        "index": "petrified",
        "name": "Petrified",
        "url": "/api/2014/conditions/petrified"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      },
      {
        "index": "prone",
        "name": "Prone",
        "url": "/api/2014/conditions/prone"
      },
      {
        "index": "restrained",
        "name": "Restrained",
        "url": "/api/2014/conditions/restrained"
      },
      {
        "index": "unconscious",
        "name": "Unconscious",
        "url": "/api/2014/conditions/unconscious"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 10
    },
    "languages": [
      "understands all languages it knew in life but can't speak"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Incorporeal Movement",
        "description": "The specter can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the specter has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Life Drain",
        "description": "Melee Spell Attack: +4 to hit, reach 5 ft., one creature. Hit: 10 (3d6) necrotic damage. The target must succeed on a DC 10 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the creature finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.",
        "attackBonus": 4,
        "damage": {
          "type": "Necrotic",
          "roll": "3d6",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "medium",
      "chaotic evil"
    ]
  },
  {
    "name": "Vampire, Bat Form",
    "size": "Medium",
    "type": "undead",
    "alignment": "lawful evil",
    "challengeRating": "13",
    "xp": 10000,
    "strength": 18,
    "dexterity": 18,
    "constitution": 18,
    "intelligence": 17,
    "wisdom": 15,
    "charisma": 18,
    "armorClass": 16,
    "armorType": "natural",
    "hitPoints": 144,
    "hitDice": "17d8",
    "speed": {
      "walk": 5,
      "fly": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 7,
      "Stealth": 9
    },
    "damageResistances": [
      "necrotic",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 120,
      "passivePerception": 17
    },
    "languages": [
      "the languages it knew in life"
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "If the vampire isn't in sun light or running water, it can use its action to polymorph into a Tiny bat or a Medium cloud of mist, or back into its true form.\nWhile in bat form, the vampire can't speak, its walking speed is 5 feet, and it has a flying speed of 30 feet. Its statistics, other than its size and speed, are unchanged. Anything it is wearing transforms with it, but nothing it is carrying does. It reverts to its true form if it dies.\nWhile in mist form, the vampire can't take any actions, speak, or manipulate objects. It is weightless, has a flying speed of 20 feet, can hover, and can enter a hostile creature's space and stop there. In addition, if air can pass through a space, the mist can do so without squeezing, and it can't pass through water. It has advantage on Strength, Dexterity, and Constitution saving throws, and it is immune to all nonmagical damage, except the damage it takes from sunlight."
      },
      {
        "name": "Legendary Resistance",
        "description": "If the vampire fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Misty Escape",
        "description": "When it drops to 0 hit points outside its resting place, the vampire transforms into a cloud of mist (as in the Shapechanger trait) instead of falling unconscious, provided that it isn't in sunlight or running water. If it can't transform, it is destroyed.\nWhile it has 0 hit points in mist form, it can't revert to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it reverts to its vampire form. It is then paralyzed until it regains at least 1 hit point. After spending 1 hour in its resting place with 0 hit points, it regains 1 hit point."
      },
      {
        "name": "Regeneration",
        "description": "The vampire regains 20 hit points at the start of its turn if it has at least 1 hit point and isn't in sunlight or running water. If the vampire takes radiant damage or damage from holy water, this trait doesn't function at the start of the vampire's next turn."
      },
      {
        "name": "Spider Climb",
        "description": "The vampire can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Vampire Weaknesses",
        "description": "The vampire has the following flaws:\nForbiddance. The vampire can't enter a residence without an invitation from one of the occupants.\nHarmed by Running Water. The vampire takes 20 acid damage if it ends its turn in running water.\nStake to the Heart. If a piercing weapon made of wood is driven into the vampire's heart while the vampire is incapacitated in its resting place, the vampire is paralyzed until the stake is removed.\nSunlight Hypersensitivity. The vampire takes 20 radiant damage when it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one willing creature, or a creature that is grappled by the vampire, incapacitated, or restrained. Hit: 7 (1d6 + 4) piercing damage plus 10 (3d6) necrotic damage. The target's hit point maximum is reduced by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. The reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0. A humanoid slain in this way and then buried in the ground rises the following night as a vampire spawn under the vampire's control.",
        "attackBonus": 9,
        "damage": {
          "type": "Piercing",
          "roll": "1d6 + 4",
          "average": 7
        },
        "secondaryDamage": {
          "type": "Necrotic",
          "roll": "3d6",
          "average": 10,
          "description": "Additional"
        }
      },
      {
        "name": "Charm",
        "description": "The vampire targets one humanoid it can see within 30 ft. of it. If the target can see the vampire, the target must succeed on a DC 17 Wisdom saving throw against this magic or be charmed by the vampire. The charmed target regards the vampire as a trusted friend to be heeded and protected. Although the target isn't under the vampire's control, it takes the vampire's requests or actions in the most favorable way it can, and it is a willing target for the vampire's bit attack.\nEach time the vampire or the vampire's companions do anything harmful to the target, it can repeat the saving throw, ending the effect on itself on a success. Otherwise, the effect lasts 24 hours or until the vampire is destroyed, is on a different plane of existence than the target, or takes a bonus action to end the effect."
      },
      {
        "name": "Children of the Night",
        "description": "The vampire magically calls 2d4 swarms of bats or rats, provided that the sun isn't up. While outdoors, the vampire can call 3d6 wolves instead. The called creatures arrive in 1d4 rounds, acting as allies of the vampire and obeying its spoken commands. The beasts remain for 1 hour, until the vampire dies, or until the vampire dismisses them as a bonus action."
      }
    ],
    "legendaryActions": [
      {
        "name": "Move",
        "description": "The vampire moves up to its speed without provoking opportunity attacks."
      },
      {
        "name": "Unarmed Strike",
        "description": "The vampire makes one unarmed strike."
      },
      {
        "name": "Bite (Costs 2 Actions)",
        "description": "The vampire makes one bite attack."
      }
    ],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Vampire, Mist Form",
    "size": "Medium",
    "type": "undead",
    "alignment": "lawful evil",
    "challengeRating": "13",
    "xp": 10000,
    "strength": 18,
    "dexterity": 18,
    "constitution": 18,
    "intelligence": 17,
    "wisdom": 15,
    "charisma": 18,
    "armorClass": 16,
    "armorType": "natural",
    "hitPoints": 144,
    "hitDice": "17d8",
    "speed": {
      "fly": 20,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 7,
      "Stealth": 9
    },
    "damageResistances": [
      "necrotic",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 120,
      "passivePerception": 17
    },
    "languages": [
      "the languages it knew in life"
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "If the vampire isn't in sun light or running water, it can use its action to polymorph into a Tiny bat or a Medium cloud of mist, or back into its true form.\nWhile in bat form, the vampire can't speak, its walking speed is 5 feet, and it has a flying speed of 30 feet. Its statistics, other than its size and speed, are unchanged. Anything it is wearing transforms with it, but nothing it is carrying does. It reverts to its true form if it dies.\nWhile in mist form, the vampire can't take any actions, speak, or manipulate objects. It is weightless, has a flying speed of 20 feet, can hover, and can enter a hostile creature's space and stop there. In addition, if air can pass through a space, the mist can do so without squeezing, and it can't pass through water. It has advantage on Strength, Dexterity, and Constitution saving throws, and it is immune to all nonmagical damage, except the damage it takes from sunlight."
      },
      {
        "name": "Legendary Resistance",
        "description": "If the vampire fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Misty Escape",
        "description": "When it drops to 0 hit points outside its resting place, the vampire transforms into a cloud of mist (as in the Shapechanger trait) instead of falling unconscious, provided that it isn't in sunlight or running water. If it can't transform, it is destroyed.\nWhile it has 0 hit points in mist form, it can't revert to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it reverts to its vampire form. It is then paralyzed until it regains at least 1 hit point. After spending 1 hour in its resting place with 0 hit points, it regains 1 hit point."
      },
      {
        "name": "Regeneration",
        "description": "The vampire regains 20 hit points at the start of its turn if it has at least 1 hit point and isn't in sunlight or running water. If the vampire takes radiant damage or damage from holy water, this trait doesn't function at the start of the vampire's next turn."
      },
      {
        "name": "Spider Climb",
        "description": "The vampire can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Vampire Weaknesses",
        "description": "The vampire has the following flaws:\nForbiddance. The vampire can't enter a residence without an invitation from one of the occupants.\nHarmed by Running Water. The vampire takes 20 acid damage if it ends its turn in running water.\nStake to the Heart. If a piercing weapon made of wood is driven into the vampire's heart while the vampire is incapacitated in its resting place, the vampire is paralyzed until the stake is removed.\nSunlight Hypersensitivity. The vampire takes 20 radiant damage when it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks."
      }
    ],
    "actions": [],
    "legendaryActions": [
      {
        "name": "Move",
        "description": "The vampire moves up to its speed without provoking opportunity attacks."
      },
      {
        "name": "Unarmed Strike",
        "description": "The vampire makes one unarmed strike."
      },
      {
        "name": "Bite (Costs 2 Actions)",
        "description": "The vampire makes one bite attack."
      }
    ],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Vampire Spawn",
    "size": "Medium",
    "type": "undead",
    "alignment": "neutral evil",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 16,
    "dexterity": 16,
    "constitution": 16,
    "intelligence": 11,
    "wisdom": 10,
    "charisma": 12,
    "armorClass": 15,
    "armorType": "natural",
    "hitPoints": 82,
    "hitDice": "11d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 3,
      "Stealth": 6
    },
    "damageResistances": [
      "necrotic",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 13
    },
    "languages": [
      "the languages it knew in life"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Regeneration",
        "description": "The vampire regains 10 hit points at the start of its turn if it has at least 1 hit point and isn't in sunlight or running water. If the vampire takes radiant damage or damage from holy water, this trait doesn't function at the start of the vampire's next turn."
      },
      {
        "name": "Spider Climb",
        "description": "The vampire can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Vampire Weaknesses",
        "description": "The vampire has the following flaws:\nForbiddance. The vampire can't enter a residence without an invitation from one of the occupants.\nHarmed by Running Water. The vampire takes 20 acid damage when it ends its turn in running water.\nStake to the Heart. The vampire is destroyed if a piercing weapon made of wood is driven into its heart while it is incapacitated in its resting place.\nSunlight Hypersensitivity. The vampire takes 20 radiant damage when it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The vampire makes two attacks, only one of which can be a bite attack."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one willing creature, or a creature that is grappled by the vampire, incapacitated, or restrained. Hit: 6 (1d6 + 3) piercing damage plus 7 (2d6) necrotic damage. The target's hit point maximum is reduced by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. The reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d6 + 3",
          "average": 6
        },
        "secondaryDamage": {
          "type": "Necrotic",
          "roll": "2d6",
          "average": 7,
          "description": "Additional"
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 8 (2d4 + 3) slashing damage. Instead of dealing damage, the vampire can grapple the target (escape DC 13).",
        "attackBonus": 6,
        "damage": {
          "type": "Slashing",
          "roll": "2d4 + 3",
          "average": 8
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "medium",
      "neutral evil"
    ]
  },
  {
    "name": "Vampire, Vampire Form",
    "size": "Medium",
    "type": "undead",
    "alignment": "lawful evil",
    "challengeRating": "13",
    "xp": 10000,
    "strength": 18,
    "dexterity": 18,
    "constitution": 18,
    "intelligence": 17,
    "wisdom": 15,
    "charisma": 18,
    "armorClass": 16,
    "armorType": "natural",
    "hitPoints": 144,
    "hitDice": "17d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 7,
      "Stealth": 9
    },
    "damageResistances": [
      "necrotic",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 120,
      "passivePerception": 17
    },
    "languages": [
      "the languages it knew in life"
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "If the vampire isn't in sun light or running water, it can use its action to polymorph into a Tiny bat or a Medium cloud of mist, or back into its true form.\nWhile in bat form, the vampire can't speak, its walking speed is 5 feet, and it has a flying speed of 30 feet. Its statistics, other than its size and speed, are unchanged. Anything it is wearing transforms with it, but nothing it is carrying does. It reverts to its true form if it dies.\nWhile in mist form, the vampire can't take any actions, speak, or manipulate objects. It is weightless, has a flying speed of 20 feet, can hover, and can enter a hostile creature's space and stop there. In addition, if air can pass through a space, the mist can do so without squeezing, and it can't pass through water. It has advantage on Strength, Dexterity, and Constitution saving throws, and it is immune to all nonmagical damage, except the damage it takes from sunlight."
      },
      {
        "name": "Legendary Resistance",
        "description": "If the vampire fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Misty Escape",
        "description": "When it drops to 0 hit points outside its resting place, the vampire transforms into a cloud of mist (as in the Shapechanger trait) instead of falling unconscious, provided that it isn't in sunlight or running water. If it can't transform, it is destroyed.\nWhile it has 0 hit points in mist form, it can't revert to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it reverts to its vampire form. It is then paralyzed until it regains at least 1 hit point. After spending 1 hour in its resting place with 0 hit points, it regains 1 hit point."
      },
      {
        "name": "Regeneration",
        "description": "The vampire regains 20 hit points at the start of its turn if it has at least 1 hit point and isn't in sunlight or running water. If the vampire takes radiant damage or damage from holy water, this trait doesn't function at the start of the vampire's next turn."
      },
      {
        "name": "Spider Climb",
        "description": "The vampire can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Vampire Weaknesses",
        "description": "The vampire has the following flaws:\nForbiddance. The vampire can't enter a residence without an invitation from one of the occupants.\nHarmed by Running Water. The vampire takes 20 acid damage if it ends its turn in running water.\nStake to the Heart. If a piercing weapon made of wood is driven into the vampire's heart while the vampire is incapacitated in its resting place, the vampire is paralyzed until the stake is removed.\nSunlight Hypersensitivity. The vampire takes 20 radiant damage when it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The vampire makes two attacks, only one of which can be a bite attack."
      },
      {
        "name": "Unarmed Strike",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one creature. Hit: 8 (1d8 + 4) bludgeoning damage. Instead of dealing damage, the vampire can grapple the target (escape DC 18).",
        "attackBonus": 9,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d8 + 4",
          "average": 8
        }
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one willing creature, or a creature that is grappled by the vampire, incapacitated, or restrained. Hit: 7 (1d6 + 4) piercing damage plus 10 (3d6) necrotic damage. The target's hit point maximum is reduced by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. The reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0. A humanoid slain in this way and then buried in the ground rises the following night as a vampire spawn under the vampire's control.",
        "attackBonus": 9,
        "damage": {
          "type": "Piercing",
          "roll": "1d6 + 4",
          "average": 7
        },
        "secondaryDamage": {
          "type": "Necrotic",
          "roll": "3d6",
          "average": 10,
          "description": "Additional"
        }
      },
      {
        "name": "Charm",
        "description": "The vampire targets one humanoid it can see within 30 ft. of it. If the target can see the vampire, the target must succeed on a DC 17 Wisdom saving throw against this magic or be charmed by the vampire. The charmed target regards the vampire as a trusted friend to be heeded and protected. Although the target isn't under the vampire's control, it takes the vampire's requests or actions in the most favorable way it can, and it is a willing target for the vampire's bit attack.\nEach time the vampire or the vampire's companions do anything harmful to the target, it can repeat the saving throw, ending the effect on itself on a success. Otherwise, the effect lasts 24 hours or until the vampire is destroyed, is on a different plane of existence than the target, or takes a bonus action to end the effect."
      },
      {
        "name": "Children of the Night",
        "description": "The vampire magically calls 2d4 swarms of bats or rats, provided that the sun isn't up. While outdoors, the vampire can call 3d6 wolves instead. The called creatures arrive in 1d4 rounds, acting as allies of the vampire and obeying its spoken commands. The beasts remain for 1 hour, until the vampire dies, or until the vampire dismisses them as a bonus action."
      }
    ],
    "legendaryActions": [
      {
        "name": "Move",
        "description": "The vampire moves up to its speed without provoking opportunity attacks."
      },
      {
        "name": "Unarmed Strike",
        "description": "The vampire makes one unarmed strike."
      },
      {
        "name": "Bite (Costs 2 Actions)",
        "description": "The vampire makes one bite attack."
      }
    ],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Warhorse Skeleton",
    "size": "Large",
    "type": "undead",
    "alignment": "lawful evil",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 18,
    "dexterity": 12,
    "constitution": 15,
    "intelligence": 2,
    "wisdom": 8,
    "charisma": 5,
    "armorClass": 13,
    "armorType": "armor",
    "hitPoints": 22,
    "hitDice": "3d10",
    "speed": {
      "walk": 60,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "damageVulnerabilities": [
      "bludgeoning"
    ],
    "senses": {
      "darkvision": 60,
      "passivePerception": 9
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d6 + 4",
          "average": 11
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "large",
      "lawful evil"
    ]
  },
  {
    "name": "Wight",
    "size": "Medium",
    "type": "undead",
    "alignment": "neutral evil",
    "challengeRating": "3",
    "xp": 700,
    "strength": 15,
    "dexterity": 14,
    "constitution": 16,
    "intelligence": 10,
    "wisdom": 13,
    "charisma": 15,
    "armorClass": 14,
    "armorType": "armor",
    "hitPoints": 45,
    "hitDice": "6d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 3,
      "Stealth": 4
    },
    "damageResistances": [
      "necrotic",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 13
    },
    "languages": [
      "the languages it knew in life"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the wight has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The wight makes two longsword attacks or two longbow attacks. It can use its Life Drain in place of one longsword attack."
      },
      {
        "name": "Life Drain",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) necrotic damage. The target must succeed on a DC 13 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.\nA humanoid slain by this attack rises 24 hours later as a zombie under the wight's control, unless the humanoid is restored to life or its body is destroyed. The wight can have no more than twelve zombies under its control at one time.",
        "attackBonus": 4,
        "damage": {
          "type": "Necrotic",
          "roll": "1d6 + 2",
          "average": 5
        }
      },
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage, or 7 (1d10 + 2) slashing damage if used with two hands.",
        "attackBonus": 4,
        "damage": {
          "type": "Slashing",
          "roll": "1d8 + 2",
          "average": 6,
          "description": "One-handed"
        },
        "secondaryDamage": {
          "type": "Slashing",
          "roll": "1d10 + 2",
          "average": 7,
          "description": "Two-handed"
        }
      },
      {
        "name": "Longbow",
        "description": "Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d8 + 2",
          "average": 6
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "medium",
      "neutral evil"
    ]
  },
  {
    "name": "Will-o'-Wisp",
    "size": "Tiny",
    "type": "undead",
    "alignment": "chaotic evil",
    "challengeRating": "2",
    "xp": 450,
    "strength": 1,
    "dexterity": 28,
    "constitution": 10,
    "intelligence": 13,
    "wisdom": 14,
    "charisma": 11,
    "armorClass": 19,
    "armorType": "dex",
    "hitPoints": 22,
    "hitDice": "9d4",
    "speed": {
      "walk": 0,
      "fly": 50,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "acid",
      "cold",
      "fire",
      "necrotic",
      "thunder",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [
      "lightning",
      "poison"
    ],
    "conditionImmunities": [
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      },
      {
        "index": "grappled",
        "name": "Grappled",
        "url": "/api/2014/conditions/grappled"
      },
      {
        "index": "paralyzed",
        "name": "Paralyzed",
        "url": "/api/2014/conditions/paralyzed"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      },
      {
        "index": "prone",
        "name": "Prone",
        "url": "/api/2014/conditions/prone"
      },
      {
        "index": "restrained",
        "name": "Restrained",
        "url": "/api/2014/conditions/restrained"
      },
      {
        "index": "unconscious",
        "name": "Unconscious",
        "url": "/api/2014/conditions/unconscious"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 120,
      "passivePerception": 12
    },
    "languages": [
      "the languages it knew in life"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Consume Life",
        "description": "As a bonus action, the will-o'-wisp can target one creature it can see within 5 ft. of it that has 0 hit points and is still alive. The target must succeed on a DC 10 Constitution saving throw against this magic or die. If the target dies, the will-o'-wisp regains 10 (3d6) hit points."
      },
      {
        "name": "Ephemeral",
        "description": "The will-o'-wisp can't wear or carry anything."
      },
      {
        "name": "Incorporeal Movement",
        "description": "The will-o'-wisp can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object."
      },
      {
        "name": "Variable Illumination",
        "description": "The will-o'-wisp sheds bright light in a 5- to 20-foot radius and dim light for an additional number of ft. equal to the chosen radius. The will-o'-wisp can alter the radius as a bonus action."
      }
    ],
    "actions": [
      {
        "name": "Shock",
        "description": "Melee Spell Attack: +4 to hit, reach 5 ft., one creature. Hit: 9 (2d8) lightning damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Lightning",
          "roll": "2d8",
          "average": 9
        }
      },
      {
        "name": "Invisibility",
        "description": "The will-o'-wisp and its light magically become invisible until it attacks or uses its Consume Life, or until its concentration ends (as if concentrating on a spell)."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "tiny",
      "chaotic evil"
    ]
  },
  {
    "name": "Wraith",
    "size": "Medium",
    "type": "undead",
    "alignment": "neutral evil",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 6,
    "dexterity": 16,
    "constitution": 16,
    "intelligence": 12,
    "wisdom": 14,
    "charisma": 15,
    "armorClass": 13,
    "armorType": "dex",
    "hitPoints": 67,
    "hitDice": "9d8",
    "speed": {
      "walk": 0,
      "fly": 60,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "acid",
      "cold",
      "fire",
      "lightning",
      "thunder",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "damageImmunities": [
      "necrotic",
      "poison"
    ],
    "conditionImmunities": [
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      },
      {
        "index": "grappled",
        "name": "Grappled",
        "url": "/api/2014/conditions/grappled"
      },
      {
        "index": "paralyzed",
        "name": "Paralyzed",
        "url": "/api/2014/conditions/paralyzed"
      },
      {
        "index": "petrified",
        "name": "Petrified",
        "url": "/api/2014/conditions/petrified"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      },
      {
        "index": "prone",
        "name": "Prone",
        "url": "/api/2014/conditions/prone"
      },
      {
        "index": "restrained",
        "name": "Restrained",
        "url": "/api/2014/conditions/restrained"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 12
    },
    "languages": [
      "the languages it knew in life"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Incorporeal Movement",
        "description": "The wraith can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the wraith has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Life Drain",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 21 (4d8 + 3) necrotic damage. The target must succeed on a DC 14 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.",
        "attackBonus": 6,
        "damage": {
          "type": "Necrotic",
          "roll": "4d8 + 3",
          "average": 21
        }
      },
      {
        "name": "Create Specter",
        "description": "The wraith targets a humanoid within 10 feet of it that has been dead for no longer than 1 minute and died violently. The target's spirit rises as a specter in the space of its corpse or in the nearest unoccupied space. The specter is under the wraith's control. The wraith can have no more than seven specters under its control at one time."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "medium",
      "neutral evil"
    ]
  },
  {
    "name": "Zombie",
    "size": "Medium",
    "type": "undead",
    "alignment": "neutral evil",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 13,
    "dexterity": 6,
    "constitution": 16,
    "intelligence": 3,
    "wisdom": 6,
    "charisma": 5,
    "armorClass": 8,
    "armorType": "dex",
    "hitPoints": 22,
    "hitDice": "3d8",
    "speed": {
      "walk": 20,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 8
    },
    "languages": [
      "understands all languages it spoke in life but can't speak"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Undead Fortitude",
        "description": "If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5+the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead."
      }
    ],
    "actions": [
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d6 + 1",
          "average": 4
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "undead",
      "medium",
      "neutral evil"
    ]
  }
];
