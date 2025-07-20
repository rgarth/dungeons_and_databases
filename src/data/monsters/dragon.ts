import { Monster } from '@/types/monster';

export const dragonMonsters: Monster[] = [
  {
    "name": "Adult Black Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "chaotic evil",
    "challengeRating": "14",
    "xp": 11500,
    "strength": 23,
    "dexterity": 14,
    "constitution": 21,
    "intelligence": 14,
    "wisdom": 13,
    "charisma": 17,
    "armorClass": 19,
    "armorType": "natural",
    "hitPoints": 195,
    "hitDice": "17d12+85",
    "speed": {
      "walk": 40,
      "fly": 80,
      "swim": 40
    },
    "savingThrows": {},
    "skills": {
      "Perception": 11,
      "Stealth": 7
    },
    "damageResistances": [],
    "damageImmunities": [
      "acid"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 21,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 4 (1d8) acid damage.",
        "attackBonus": 11,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+6",
          "average": 17
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.",
        "attackBonus": 11,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+6",
          "average": 13
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.",
        "attackBonus": 11,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+6",
          "average": 15
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Acid Breath",
        "description": "The dragon exhales acid in a 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 54 (12d8) acid damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Acid",
          "roll": "12d8",
          "average": 54
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A cunning, evil dragon with slick black scales and a foul, acidic breath. Adult black dragons haunt swamps and ruins, lurking in the shadows and ambushing prey. They are territorial, cruel, and delight in spreading fear and decay throughout their domains.",    "imagePrompt": "A huge dragon creature with slick black scales, acid dripping from its jaws, lurking in a swamp or ruined temple",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "huge",
      "chaotic-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Adult Blue Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "lawful evil",
    "challengeRating": "16",
    "xp": 15000,
    "strength": 25,
    "dexterity": 10,
    "constitution": 23,
    "intelligence": 16,
    "wisdom": 15,
    "charisma": 19,
    "armorClass": 19,
    "armorType": "natural",
    "hitPoints": 225,
    "hitDice": "18d12+108",
    "speed": {
      "walk": 40,
      "fly": 80,
      "burrow": 30
    },
    "savingThrows": {},
    "skills": {
      "Perception": 12,
      "Stealth": 5
    },
    "damageResistances": [],
    "damageImmunities": [
      "lightning"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 22,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 18 (2d10 + 7) piercing damage plus 5 (1d10) lightning damage.",
        "attackBonus": 12,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+7",
          "average": 18
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 14 (2d6 + 7) slashing damage.",
        "attackBonus": 12,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+7",
          "average": 14
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +12 to hit, reach 15 ft., one target. Hit: 16 (2d8 + 7) bludgeoning damage.",
        "attackBonus": 12,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+7",
          "average": 16
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 ft. of the dragon and aware of it must succeed on a DC 17 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Lightning Breath",
        "description": "The dragon exhales lightning in a 90-foot line that is 5 ft. wide. Each creature in that line must make a DC 19 Dexterity saving throw, taking 66 (12d10) lightning damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Lightning",
          "roll": "12d10",
          "average": 66
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 20 Dexterity saving throw or take 14 (2d6 + 7) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A large, cunning dragon with scales the color of desert sky and eyes that crackle with lightning. Adult blue dragons are territorial and prefer to dwell in arid regions, using their lightning breath and love of riddles to dominate their domain.",    "imagePrompt": "A huge dragon creature with scales, wings, and a powerful presence",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "huge",
      "lawful-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Adult Brass Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "chaotic good",
    "challengeRating": "13",
    "xp": 10000,
    "strength": 23,
    "dexterity": 10,
    "constitution": 21,
    "intelligence": 14,
    "wisdom": 13,
    "charisma": 17,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 172,
    "hitDice": "15d12+75",
    "speed": {
      "walk": 40,
      "fly": 80,
      "burrow": 40
    },
    "savingThrows": {},
    "skills": {
      "History": 7,
      "Perception": 11,
      "Persuasion": 8,
      "Stealth": 5
    },
    "damageResistances": [],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 21,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage.",
        "attackBonus": 11,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+6",
          "average": 17
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.",
        "attackBonus": 11,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+6",
          "average": 13
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.",
        "attackBonus": 11,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+6",
          "average": 15
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours ."
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nFire Breath. The dragon exhales fire in an 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 45 (13d6) fire damage on a failed save, or half as much damage on a successful one.\nSleep Breath. The dragon exhales sleep gas in a 60-foot cone. Each creature in that area must succeed on a DC 18 Constitution saving throw or fall unconscious for 10 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A large, cunning dragon with scales the color of polished brass and eyes that gleam with intelligence. Adult brass dragons are known for their love of conversation and their tendency to collect interesting objects and stories.",    "imagePrompt": "A huge dragon creature with scales, wings, and a powerful presence",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "huge",
      "chaotic-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Adult Bronze Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "lawful good",
    "challengeRating": "15",
    "xp": 13000,
    "strength": 25,
    "dexterity": 10,
    "constitution": 23,
    "intelligence": 16,
    "wisdom": 15,
    "charisma": 19,
    "armorClass": 19,
    "armorType": "natural",
    "hitPoints": 212,
    "hitDice": "17d12+102",
    "speed": {
      "walk": 40,
      "fly": 80,
      "swim": 40
    },
    "savingThrows": {},
    "skills": {
      "Insight": 7,
      "Perception": 12,
      "Stealth": 5
    },
    "damageResistances": [],
    "damageImmunities": [
      "lightning"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 22,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 18 (2d10 + 7) piercing damage.",
        "attackBonus": 12,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+7",
          "average": 18
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 14 (2d6 + 7) slashing damage.",
        "attackBonus": 12,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+7",
          "average": 14
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +12 to hit, reach 15 ft., one target. Hit: 16 (2d8 + 7) bludgeoning damage.",
        "attackBonus": 12,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+7",
          "average": 16
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 17 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nLightning Breath. The dragon exhales lightning in a 90-foot line that is 5 feet wide. Each creature in that line must make a DC 19 Dexterity saving throw, taking 66 (12d10) lightning damage on a failed save, or half as much damage on a successful one.\nRepulsion Breath. The dragon exhales repulsion energy in a 30-foot cone. Each creature in that area must succeed on a DC 19 Strength saving throw. On a failed save, the creature is pushed 60 feet away from the dragon.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 20 Dexterity saving throw or take 14 (2d6 + 7) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A noble, lawful dragon with scales the color of polished bronze and a love for the sea. Adult bronze dragons are protectors of coastal regions and islands, using their lightning breath and repulsion abilities to defend their territories. They are honorable, wise, and often serve as guardians of maritime trade routes.",    "imagePrompt": "A huge dragon creature with bronze scales, lightning crackling around its body, near a coastal region or island",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "huge",
      "lawful-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Adult Copper Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "chaotic good",
    "challengeRating": "14",
    "xp": 11500,
    "strength": 23,
    "dexterity": 12,
    "constitution": 21,
    "intelligence": 18,
    "wisdom": 15,
    "charisma": 17,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 184,
    "hitDice": "16d12+80",
    "speed": {
      "walk": 40,
      "fly": 80,
      "climb": 40
    },
    "savingThrows": {},
    "skills": {
      "Deception": 8,
      "Perception": 12,
      "Stealth": 6
    },
    "damageResistances": [],
    "damageImmunities": [
      "acid"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 22,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage.",
        "attackBonus": 11,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+6",
          "average": 17
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.",
        "attackBonus": 11,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+6",
          "average": 13
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.",
        "attackBonus": 11,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+6",
          "average": 15
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nAcid Breath. The dragon exhales acid in an 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 54 (12d8) acid damage on a failed save, or half as much damage on a successful one.\nSlowing Breath. The dragon exhales gas in a 60-foot cone. Each creature in that area must succeed on a DC 18 Constitution saving throw. On a failed save, the creature can't use reactions, its speed is halved, and it can't make more than one attack on its turn. In addition, the creature can use either an action or a bonus action on its turn, but not both. These effects last for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself with a successful save.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A clever, mischievous dragon with scales the color of burnished copper and a love for riddles and pranks. Adult copper dragons dwell in rocky hills and mountains, using their acid breath and slowing abilities to outmaneuver foes. They are playful tricksters who enjoy testing the wit and wisdom of travelers.",    "imagePrompt": "A huge dragon creature with copper scales, acid dripping from its jaws, in rocky hills or mountains",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "huge",
      "chaotic-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Adult Gold Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "lawful good",
    "challengeRating": "17",
    "xp": 18000,
    "strength": 27,
    "dexterity": 14,
    "constitution": 25,
    "intelligence": 16,
    "wisdom": 15,
    "charisma": 24,
    "armorClass": 19,
    "armorType": "natural",
    "hitPoints": 256,
    "hitDice": "19d12+133",
    "speed": {
      "walk": 40,
      "fly": 80,
      "swim": 40
    },
    "savingThrows": {},
    "skills": {
      "Insight": 8,
      "Perception": 14,
      "Persuasion": 13,
      "Stealth": 8
    },
    "damageResistances": [],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 24,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage.",
        "attackBonus": 14,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+8",
          "average": 19
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
        "attackBonus": 14,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+8",
          "average": 15
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
        "attackBonus": 14,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+8",
          "average": 17
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 21 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nFire Breath. The dragon exhales fire in a 60-foot cone. Each creature in that area must make a DC 21 Dexterity saving throw, taking 66 (12d10) fire damage on a failed save, or half as much damage on a successful one.\nWeakening Breath. The dragon exhales gas in a 60-foot cone. Each creature in that area must succeed on a DC 21 Strength saving throw or have disadvantage on Strength-based attack rolls, Strength checks, and Strength saving throws for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A large, cunning dragon with scales the color of forest canopy and eyes that gleam with deceptive intelligence. Adult green dragons make their homes in dense forests and jungles, using their poisonous breath and mastery of deception.",    "imagePrompt": "A huge dragon creature with scales, wings, and a powerful presence",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "huge",
      "lawful-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Adult Green Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "lawful evil",
    "challengeRating": "15",
    "xp": 13000,
    "strength": 23,
    "dexterity": 12,
    "constitution": 21,
    "intelligence": 18,
    "wisdom": 15,
    "charisma": 17,
    "armorClass": 19,
    "armorType": "natural",
    "hitPoints": 207,
    "hitDice": "18d12+90",
    "speed": {
      "walk": 40,
      "fly": 80,
      "swim": 40
    },
    "savingThrows": {},
    "skills": {
      "Deception": 8,
      "Insight": 7,
      "Perception": 12,
      "Persuasion": 8,
      "Stealth": 6
    },
    "damageResistances": [],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 22,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 7 (2d6) poison damage.",
        "attackBonus": 11,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+6",
          "average": 17
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.",
        "attackBonus": 11,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+6",
          "average": 13
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.",
        "attackBonus": 11,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+6",
          "average": 15
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours ."
      },
      {
        "name": "Poison Breath",
        "description": "The dragon exhales poisonous gas in a 60-foot cone. Each creature in that area must make a DC 18 Constitution saving throw, taking 56 (16d6) poison damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Poison",
          "roll": "16d6",
          "average": 56
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A cunning, manipulative dragon with scales the color of forest canopy and eyes that gleam with deceptive intelligence. Adult green dragons make their homes in dense forests and jungles, using their poisonous breath and mastery of deception to dominate their territories.",    "imagePrompt": "A huge dragon creature with green scales, poison gas emanating from its jaws, in a dense forest or jungle",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "huge",
      "lawful-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Adult Red Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "chaotic evil",
    "challengeRating": "17",
    "xp": 18000,
    "strength": 27,
    "dexterity": 10,
    "constitution": 25,
    "intelligence": 16,
    "wisdom": 13,
    "charisma": 21,
    "armorClass": 19,
    "armorType": "natural",
    "hitPoints": 256,
    "hitDice": "19d12+133",
    "speed": {
      "walk": 40,
      "fly": 80,
      "climb": 40
    },
    "savingThrows": {},
    "skills": {
      "Perception": 13,
      "Stealth": 6
    },
    "damageResistances": [],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 23,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 7 (2d6) fire damage.",
        "attackBonus": 14,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+8",
          "average": 19
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
        "attackBonus": 14,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+8",
          "average": 15
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
        "attackBonus": 14,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+8",
          "average": 17
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 ft. of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Fire Breath",
        "description": "The dragon exhales fire in a 60-foot cone. Each creature in that area must make a DC 21 Dexterity saving throw, taking 63 (18d6) fire damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Fire",
          "roll": "18d6",
          "average": 63
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A massive, greedy dragon with scales the color of molten lava and eyes that burn with malevolent intelligence. Adult red dragons are the most covetous of the true dragons, driven by their insatiable thirst for wealth and power. They prefer to dwell in mountainous regions and volcanic areas.",    "imagePrompt": "A huge dragon creature with red scales, fire and smoke billowing from its jaws, in mountainous or volcanic terrain",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "huge",
      "chaotic-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Adult Silver Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "lawful good",
    "challengeRating": "16",
    "xp": 15000,
    "strength": 27,
    "dexterity": 10,
    "constitution": 25,
    "intelligence": 16,
    "wisdom": 13,
    "charisma": 21,
    "armorClass": 19,
    "armorType": "natural",
    "hitPoints": 243,
    "hitDice": "18d12+126",
    "speed": {
      "walk": 40,
      "fly": 80
    },
    "savingThrows": {},
    "skills": {
      "Arcana": 8,
      "History": 8,
      "Perception": 11,
      "Stealth": 5
    },
    "damageResistances": [],
    "damageImmunities": [
      "cold"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 21,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage.",
        "attackBonus": 13,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+8",
          "average": 19
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
        "attackBonus": 13,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+8",
          "average": 15
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +13 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
        "attackBonus": 13,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+8",
          "average": 17
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 18 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nCold Breath. The dragon exhales an icy blast in a 60-foot cone. Each creature in that area must make a DC 20 Constitution saving throw, taking 58 (13d8) cold damage on a failed save, or half as much damage on a successful one.\nParalyzing Breath. The dragon exhales paralyzing gas in a 60-foot cone. Each creature in that area must succeed on a DC 20 Constitution saving throw or be paralyzed for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A noble, honorable dragon with scales the color of polished silver and a love for humanoid civilization. Adult silver dragons are protectors of good-aligned communities, using their cold breath and wisdom to defend the innocent. They often take humanoid form to walk among mortals.",    "imagePrompt": "A huge dragon creature with silver scales, frost and cold emanating from its body, near a humanoid settlement or castle",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "huge",
      "lawful-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Adult White Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "chaotic evil",
    "challengeRating": "13",
    "xp": 10000,
    "strength": 22,
    "dexterity": 10,
    "constitution": 22,
    "intelligence": 8,
    "wisdom": 12,
    "charisma": 12,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 200,
    "hitDice": "16d12+96",
    "speed": {
      "walk": 40,
      "fly": 80,
      "swim": 40,
      "burrow": 30
    },
    "savingThrows": {},
    "skills": {
      "Perception": 11,
      "Stealth": 5
    },
    "damageResistances": [],
    "damageImmunities": [
      "cold"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 21,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Ice Walk",
        "description": "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, difficult terrain composed of ice or snow doesn't cost it extra moment."
      },
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 4 (1d8) cold damage.",
        "attackBonus": 11,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+6",
          "average": 17
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.",
        "attackBonus": 11,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+6",
          "average": 13
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.",
        "attackBonus": 11,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+6",
          "average": 15
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 ft. of the dragon and aware of it must succeed on a DC 14 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Cold Breath",
        "description": "The dragon exhales an icy blast in a 60-foot cone. Each creature in that area must make a DC 19 Constitution saving throw, taking 54 (12d8) cold damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Cold",
          "roll": "12d8",
          "average": 54
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A savage, bestial dragon with scales the color of pure ice and eyes that gleam with primal hunger. Adult white dragons are the most feral of the true dragons, dwelling in frozen wastelands and arctic regions. They rely on brute strength and their freezing breath to hunt prey.",    "imagePrompt": "A huge dragon creature with white scales, frost and ice emanating from its jaws, in frozen wastelands or arctic terrain",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "huge",
      "chaotic-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Ancient Black Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "chaotic evil",
    "challengeRating": "21",
    "xp": 33000,
    "strength": 27,
    "dexterity": 14,
    "constitution": 25,
    "intelligence": 16,
    "wisdom": 15,
    "charisma": 19,
    "armorClass": 22,
    "armorType": "natural",
    "hitPoints": 367,
    "hitDice": "21d20+147",
    "speed": {
      "walk": 40,
      "fly": 80,
      "swim": 40
    },
    "savingThrows": {},
    "skills": {
      "Perception": 16,
      "Stealth": 9
    },
    "damageResistances": [],
    "damageImmunities": [
      "acid"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 26,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack:+ 15 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 9 (2d8) acid damage.",
        "attackBonus": 15,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+8",
          "average": 19
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
        "attackBonus": 15,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+8",
          "average": 15
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +15 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
        "attackBonus": 15,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+8",
          "average": 17
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Acid Breath",
        "description": "The dragon exhales acid in a 90-foot line that is 10 feet wide. Each creature in that line must make a DC 22 Dexterity saving throw, taking 67 (15d8) acid damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Acid",
          "roll": "15d8",
          "average": 68
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A terrifying, ancient dragon with scales as black as the deepest shadows and eyes that gleam with centuries of malevolence. Ancient black dragons are the most cunning and cruel of their kind, dwelling in the darkest swamps and ruins. Their acidic breath dissolves all before them, and they delight in spreading corruption and despair.",    "imagePrompt": "A gargantuan dragon creature with black scales, acid dripping from its jaws, in dark swamps or ruins",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "gargantuan",
      "chaotic-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Ancient Blue Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "lawful evil",
    "challengeRating": "23",
    "xp": 50000,
    "strength": 29,
    "dexterity": 10,
    "constitution": 27,
    "intelligence": 18,
    "wisdom": 17,
    "charisma": 21,
    "armorClass": 22,
    "armorType": "natural",
    "hitPoints": 481,
    "hitDice": "26d20+208",
    "speed": {
      "walk": 40,
      "fly": 80,
      "burrow": 40
    },
    "savingThrows": {},
    "skills": {
      "Perception": 17,
      "Stealth": 7
    },
    "damageResistances": [],
    "damageImmunities": [
      "lightning"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 27,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +16 to hit, reach 15 ft., one target. Hit: 20 (2d10 + 9) piercing damage plus 11 (2d10) lightning damage.",
        "attackBonus": 16,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+9",
          "average": 20
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +16 to hit, reach 10 ft., one target. Hit: 16 (2d6 + 9) slashing damage.",
        "attackBonus": 16,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+9",
          "average": 16
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +16 to hit, reach 20 ft., one target. Hit: 18 (2d8 + 9) bludgeoning damage.",
        "attackBonus": 16,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+9",
          "average": 18
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 20 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Lightning Breath",
        "description": "The dragon exhales lightning in a 120-foot line that is 10 feet wide. Each creature in that line must make a DC 23 Dexterity saving throw, taking 88 (16d10) lightning damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Lightning",
          "roll": "16d10",
          "average": 88
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 24 Dexterity saving throw or take 16 (2d6 + 9) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A massive, ancient dragon with scales the color of desert sky and eyes that crackle with lightning. Ancient blue dragons are territorial overlords of arid regions, using their lightning breath and love of riddles to dominate vast territories. They are calculating and patient, building elaborate lairs in desert mountains.",    "imagePrompt": "A gargantuan dragon creature with blue scales, lightning crackling around its body, in desert mountains or arid terrain",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "gargantuan",
      "lawful-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Ancient Brass Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "chaotic good",
    "challengeRating": "20",
    "xp": 25000,
    "strength": 27,
    "dexterity": 10,
    "constitution": 25,
    "intelligence": 16,
    "wisdom": 15,
    "charisma": 19,
    "armorClass": 20,
    "armorType": "natural",
    "hitPoints": 297,
    "hitDice": "17d20+119",
    "speed": {
      "walk": 40,
      "fly": 80,
      "burrow": 40
    },
    "savingThrows": {},
    "skills": {
      "History": 9,
      "Perception": 14,
      "Persuasion": 10,
      "Stealth": 6
    },
    "damageResistances": [],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 24,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage.",
        "attackBonus": 14,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+8",
          "average": 19
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
        "attackBonus": 14,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+8",
          "average": 15
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +14 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
        "attackBonus": 14,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+8",
          "average": 17
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 18 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons:\nFire Breath. The dragon exhales fire in an 90-foot line that is 10 feet wide. Each creature in that line must make a DC 21 Dexterity saving throw, taking 56 (16d6) fire damage on a failed save, or half as much damage on a successful one.\nSleep Breath. The dragon exhales sleep gas in a 90-foot cone. Each creature in that area must succeed on a DC 21 Constitution saving throw or fall unconscious for 10 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Change Shape",
        "description": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice).\nIn a new form, the dragon retains its alignment, hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, lair actions, and Intelligence, Wisdom, and Charisma scores, as well as this action. Its statistics and capabilities are otherwise replaced by those of the new form, except any class features or legendary actions of that form.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A wise, ancient dragon with scales the color of burnished brass and a love for conversation and debate. Ancient brass dragons are the most talkative of their kind, dwelling in desert regions and using their fire breath and sleep abilities to protect their domains. They are generous hosts who enjoy testing the wisdom of travelers.",    "imagePrompt": "A gargantuan dragon creature with brass scales, fire and heat emanating from its body, in desert regions",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "gargantuan",
      "chaotic-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Ancient Bronze Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "lawful good",
    "challengeRating": "22",
    "xp": 41000,
    "strength": 29,
    "dexterity": 10,
    "constitution": 27,
    "intelligence": 18,
    "wisdom": 17,
    "charisma": 21,
    "armorClass": 22,
    "armorType": "natural",
    "hitPoints": 444,
    "hitDice": "24d20+192",
    "speed": {
      "walk": 40,
      "fly": 80,
      "swim": 40
    },
    "savingThrows": {},
    "skills": {
      "Insight": 10,
      "Perception": 17,
      "Stealth": 7
    },
    "damageResistances": [],
    "damageImmunities": [
      "lightning"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 27,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +16 to hit, reach 15 ft., one target. Hit: 20 (2d10 + 9) piercing damage.",
        "attackBonus": 16,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+9",
          "average": 20
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +16 to hit, reach 10 ft., one target. Hit: 16 (2d6 + 9) slashing damage.",
        "attackBonus": 16,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+9",
          "average": 16
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +16 to hit, reach 20 ft., one target. Hit: 18 (2d8 + 9) bludgeoning damage.",
        "attackBonus": 16,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+9",
          "average": 18
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 20 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nLightning Breath. The dragon exhales lightning in a 120-foot line that is 10 feet wide. Each creature in that line must make a DC 23 Dexterity saving throw, taking 88 (16d10) lightning damage on a failed save, or half as much damage on a successful one.\nRepulsion Breath. The dragon exhales repulsion energy in a 30-foot cone. Each creature in that area must succeed on a DC 23 Strength saving throw. On a failed save, the creature is pushed 60 feet away from the dragon.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Change Shape",
        "description": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice).\nIn a new form, the dragon retains its alignment, hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, lair actions, and Intelligence, Wisdom, and Charisma scores, as well as this action. Its statistics and capabilities are otherwise replaced by those of the new form, except any class features or legendary actions of that form.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 24 Dexterity saving throw or take 16 (2d6 + 9) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A noble, ancient dragon with scales the color of polished bronze and a deep love for the sea. Ancient bronze dragons are protectors of coastal regions and islands, using their lightning breath and repulsion abilities to defend maritime trade routes. They are honorable guardians who have witnessed centuries of humanoid civilization.",    "imagePrompt": "A gargantuan dragon creature with bronze scales, lightning crackling around its body, near coastal regions or islands",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "gargantuan",
      "lawful-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Ancient Copper Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "chaotic good",
    "challengeRating": "21",
    "xp": 33000,
    "strength": 27,
    "dexterity": 12,
    "constitution": 25,
    "intelligence": 20,
    "wisdom": 17,
    "charisma": 19,
    "armorClass": 21,
    "armorType": "natural",
    "hitPoints": 350,
    "hitDice": "20d20+140",
    "speed": {
      "walk": 40,
      "fly": 80,
      "climb": 40
    },
    "savingThrows": {},
    "skills": {
      "Deception": 11,
      "Perception": 17,
      "Stealth": 8
    },
    "damageResistances": [],
    "damageImmunities": [
      "acid"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 27,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage.",
        "attackBonus": 15,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+8",
          "average": 19
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
        "attackBonus": 15,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+8",
          "average": 15
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +15 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
        "attackBonus": 15,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+8",
          "average": 17
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nAcid Breath. The dragon exhales acid in an 90-foot line that is 10 feet wide. Each creature in that line must make a DC 22 Dexterity saving throw, taking 63 (14d8) acid damage on a failed save, or half as much damage on a successful one.\nSlowing Breath. The dragon exhales gas in a 90-foot cone. Each creature in that area must succeed on a DC 22 Constitution saving throw. On a failed save, the creature can't use reactions, its speed is halved, and it can't make more than one attack on its turn. In addition, the creature can use either an action or a bonus action on its turn, but not both. These effects last for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself with a successful save.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Change Shape",
        "description": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice).\nIn a new form, the dragon retains its alignment, hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, lair actions, and Intelligence, Wisdom, and Charisma scores, as well as this action. Its statistics and capabilities are otherwise replaced by those of the new form, except any class features or legendary actions of that form.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A clever, ancient dragon with scales the color of burnished copper and a love for riddles and elaborate pranks. Ancient copper dragons dwell in rocky hills and mountains, using their acid breath and slowing abilities to outmaneuver foes. They are playful tricksters who have perfected their craft over centuries.",    "imagePrompt": "A gargantuan dragon creature with copper scales, acid dripping from its jaws, in rocky hills or mountains",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "gargantuan",
      "chaotic-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Ancient Gold Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "lawful good",
    "challengeRating": "24",
    "xp": 62000,
    "strength": 30,
    "dexterity": 14,
    "constitution": 29,
    "intelligence": 18,
    "wisdom": 17,
    "charisma": 28,
    "armorClass": 22,
    "armorType": "natural",
    "hitPoints": 546,
    "hitDice": "28d20+252",
    "speed": {
      "walk": 40,
      "fly": 80,
      "swim": 40
    },
    "savingThrows": {},
    "skills": {
      "Insight": 10,
      "Perception": 17,
      "Persuasion": 16,
      "Stealth": 9
    },
    "damageResistances": [],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 27,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage.",
        "attackBonus": 17,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+10",
          "average": 21
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage.",
        "attackBonus": 17,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+10",
          "average": 17
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 19 (2d8 + 10) bludgeoning damage.",
        "attackBonus": 17,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+10",
          "average": 19
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 24 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nFire Breath. The dragon exhales fire in a 90-foot cone. Each creature in that area must make a DC 24 Dexterity saving throw, taking 71 (13d10) fire damage on a failed save, or half as much damage on a successful one.\nWeakening Breath. The dragon exhales gas in a 90-foot cone. Each creature in that area must succeed on a DC 24 Strength saving throw or have disadvantage on Strength-based attack rolls, Strength checks, and Strength saving throws for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Change Shape",
        "description": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice).\nIn a new form, the dragon retains its alignment, hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, lair actions, and Intelligence, Wisdom, and Charisma scores, as well as this action. Its statistics and capabilities are otherwise replaced by those of the new form, except any class features or legendary actions of that form.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A majestic, ancient dragon with scales the color of pure gold and eyes that radiate wisdom and compassion. Ancient gold dragons are the most noble of their kind, protectors of good-aligned communities and defenders of justice. They use their fire breath and weakening abilities to fight evil and inspire hope.",    "imagePrompt": "A gargantuan dragon creature with gold scales, fire and light emanating from its body, near good-aligned communities or sacred sites",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "gargantuan",
      "lawful-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Ancient Green Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "lawful evil",
    "challengeRating": "22",
    "xp": 41000,
    "strength": 27,
    "dexterity": 12,
    "constitution": 25,
    "intelligence": 20,
    "wisdom": 17,
    "charisma": 19,
    "armorClass": 21,
    "armorType": "natural",
    "hitPoints": 385,
    "hitDice": "22d20+154",
    "speed": {
      "walk": 40,
      "fly": 80,
      "swim": 40
    },
    "savingThrows": {},
    "skills": {
      "Deception": 11,
      "Insight": 10,
      "Perception": 17,
      "Persuasion": 11,
      "Stealth": 8
    },
    "damageResistances": [],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 27,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      },
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 10 (3d6) poison damage.",
        "attackBonus": 15,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+8",
          "average": 19
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 22 (4d6 + 8) slashing damage.",
        "attackBonus": 15,
        "damage": {
          "type": "Slashing",
          "roll": "4d6+8",
          "average": 22
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +15 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
        "attackBonus": 15,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+8",
          "average": 17
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Poison Breath",
        "description": "The dragon exhales poisonous gas in a 90-foot cone. Each creature in that area must make a DC 22 Constitution saving throw, taking 77 (22d6) poison damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Poison",
          "roll": "22d6",
          "average": 77
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A cunning, ancient dragon with scales the color of forest canopy and eyes that gleam with deceptive intelligence. Ancient green dragons are master manipulators, dwelling in dense forests and jungles. They use their poisonous breath and mastery of deception to dominate their territories through fear and intrigue.",    "imagePrompt": "A gargantuan dragon creature with green scales, poison gas emanating from its jaws, in dense forests or jungles",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "gargantuan",
      "lawful-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Ancient Red Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "chaotic evil",
    "challengeRating": "24",
    "xp": 62000,
    "strength": 30,
    "dexterity": 10,
    "constitution": 29,
    "intelligence": 18,
    "wisdom": 15,
    "charisma": 23,
    "armorClass": 22,
    "armorType": "natural",
    "hitPoints": 546,
    "hitDice": "28d20+252",
    "speed": {
      "walk": 40,
      "fly": 80,
      "climb": 40
    },
    "savingThrows": {},
    "skills": {
      "Perception": 16,
      "Stealth": 7
    },
    "damageResistances": [],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 26,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage plus 14 (4d6) fire damage.",
        "attackBonus": 17,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d10+10",
          "average": 21
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage.",
        "attackBonus": 17,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+10",
          "average": 17
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 19 (2d8 + 10) bludgeoning damage.",
        "attackBonus": 17,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+10",
          "average": 19
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 21 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Fire Breath",
        "description": "The dragon exhales fire in a 90-foot cone. Each creature in that area must make a DC 24 Dexterity saving throw, taking 91 (26d6) fire damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Fire",
          "roll": "26d6",
          "average": 91
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A massive, ancient dragon with scales the color of molten lava and eyes that burn with malevolent intelligence. Ancient red dragons are the most covetous of the true dragons, driven by their insatiable thirst for wealth and power. They prefer to dwell in mountainous regions and volcanic areas, amassing vast hoards.",    "imagePrompt": "A gargantuan dragon creature with red scales, fire and smoke billowing from its jaws, in mountainous or volcanic terrain",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "gargantuan",
      "chaotic-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Ancient Silver Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "lawful good",
    "challengeRating": "23",
    "xp": 50000,
    "strength": 30,
    "dexterity": 10,
    "constitution": 29,
    "intelligence": 18,
    "wisdom": 15,
    "charisma": 23,
    "armorClass": 22,
    "armorType": "natural",
    "hitPoints": 487,
    "hitDice": "25d20+225",
    "speed": {
      "walk": 40,
      "fly": 80
    },
    "savingThrows": {},
    "skills": {
      "Arcana": 11,
      "History": 11,
      "Perception": 16,
      "Stealth": 7
    },
    "damageResistances": [],
    "damageImmunities": [
      "cold"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 26,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage.",
        "attackBonus": 17,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+10",
          "average": 21
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage.",
        "attackBonus": 17,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+10",
          "average": 17
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 19 (2d8 + 10) bludgeoning damage.",
        "attackBonus": 17,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+10",
          "average": 19
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 21 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nCold Breath. The dragon exhales an icy blast in a 90-foot cone. Each creature in that area must make a DC 24 Constitution saving throw, taking 67 (15d8) cold damage on a failed save, or half as much damage on a successful one.\nParalyzing Breath. The dragon exhales paralyzing gas in a 90- foot cone. Each creature in that area must succeed on a DC 24 Constitution saving throw or be paralyzed for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Change Shape",
        "description": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice).\nIn a new form, the dragon retains its alignment, hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, lair actions, and Intelligence, Wisdom, and Charisma scores, as well as this action. Its statistics and capabilities are otherwise replaced by those of the new form, except any class features or legendary actions of that form.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A noble, ancient dragon with scales the color of polished silver and a deep love for humanoid civilization. Ancient silver dragons are protectors of good-aligned communities, using their cold breath and wisdom to defend the innocent. They often take humanoid form to walk among mortals and guide them toward justice.",    "imagePrompt": "A gargantuan dragon creature with silver scales, frost and cold emanating from its body, near humanoid settlements or castles",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "gargantuan",
      "lawful-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Ancient White Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "chaotic evil",
    "challengeRating": "20",
    "xp": 25000,
    "strength": 26,
    "dexterity": 10,
    "constitution": 26,
    "intelligence": 10,
    "wisdom": 13,
    "charisma": 14,
    "armorClass": 20,
    "armorType": "natural",
    "hitPoints": 333,
    "hitDice": "18d20+144",
    "speed": {
      "walk": 40,
      "fly": 80,
      "swim": 40,
      "burrow": 40
    },
    "savingThrows": {},
    "skills": {
      "Perception": 13,
      "Stealth": 6
    },
    "damageResistances": [],
    "damageImmunities": [
      "cold"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 23,
      "darkvision": 120,
      "blindsight": 60
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Ice Walk",
        "description": "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, difficult terrain composed of ice or snow doesn't cost it extra moment."
      },
      {
        "name": "Legendary Resistance",
        "description": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 9 (2d8) cold damage.",
        "attackBonus": 14,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+8",
          "average": 19
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
        "attackBonus": 14,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+8",
          "average": 15
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +14 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
        "attackBonus": 14,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+8",
          "average": 17
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours ."
      },
      {
        "name": "Cold Breath",
        "description": "The dragon exhales an icy blast in a 90-foot cone. Each creature in that area must make a DC 22 Constitution saving throw, taking 72 (l6d8) cold damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Cold",
          "roll": "16d8",
          "average": 72
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The dragon makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Attack",
        "description": "The dragon makes a tail attack."
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "description": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
      }
    ],
    "description": "A savage, ancient dragon with scales the color of pure ice and eyes that gleam with primal hunger. Ancient white dragons are the most feral of the true dragons, dwelling in frozen wastelands and arctic regions. They rely on brute strength and their freezing breath to hunt prey, having little use for subtlety or strategy.",    "imagePrompt": "A gargantuan dragon creature with white scales, frost and ice emanating from its jaws, in frozen wastelands or arctic terrain",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "gargantuan",
      "chaotic-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Black Dragon Wyrmling",
    "size": "Medium",
    "type": "dragon",
    "alignment": "chaotic evil",
    "challengeRating": "2",
    "xp": 450,
    "strength": 15,
    "dexterity": 14,
    "constitution": 13,
    "intelligence": 10,
    "wisdom": 11,
    "charisma": 13,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 33,
    "hitDice": "6d8+6",
    "speed": {
      "walk": 30,
      "fly": 60,
      "swim": 30
    },
    "savingThrows": {},
    "skills": {
      "Perception": 4,
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [
      "acid"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14,
      "darkvision": 60,
      "blindsight": 10
    },
    "languages": [
      "Draconic"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 2 (1d4) acid damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+2",
          "average": 8
        }
      },
      {
        "name": "Acid Breath",
        "description": "The dragon exhales acid in a 15-foot line that is 5 feet wide. Each creature in that line must make a DC 11 Dexterity saving throw, taking 22 (5d8) acid damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Acid",
          "roll": "5d8",
          "average": 23
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, vicious dragon with scales as dark as shadows and eyes that gleam with malevolent curiosity. Black dragon wyrmlings are already cruel and cunning, lurking in swamps and ruins where they learn to use their acidic breath to dissolve prey.",    "imagePrompt": "A medium dragon creature with black scales, acid dripping from its jaws, in swamps or ruins",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "medium",
      "chaotic-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Blue Dragon Wyrmling",
    "size": "Medium",
    "type": "dragon",
    "alignment": "lawful evil",
    "challengeRating": "3",
    "xp": 700,
    "strength": 17,
    "dexterity": 10,
    "constitution": 15,
    "intelligence": 12,
    "wisdom": 11,
    "charisma": 15,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 52,
    "hitDice": "8d8+16",
    "speed": {
      "walk": 30,
      "fly": 60,
      "burrow": 15
    },
    "savingThrows": {},
    "skills": {
      "Perception": 4,
      "Stealth": 2
    },
    "damageResistances": [],
    "damageImmunities": [
      "lightning"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14,
      "darkvision": 60,
      "blindsight": 10
    },
    "languages": [
      "Draconic"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage plus 3 (1d6) lightning damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+3",
          "average": 9
        }
      },
      {
        "name": "Lightning Breath",
        "description": "The dragon exhales lightning in a 30-foot line that is 5 feet wide. Each creature in that line must make a DC 12 Dexterity saving throw, taking 22 (4d10) lightning damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Bludgeoning",
          "roll": "4d10",
          "average": 22
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, territorial dragon with scales the color of desert sky and eyes that crackle with lightning. Blue dragon wyrmlings are already calculating and patient, dwelling in arid regions where they practice their lightning breath and learn to dominate their domain.",    "imagePrompt": "A medium dragon creature with blue scales, lightning crackling around its body, in arid regions",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "medium",
      "lawful-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Brass Dragon Wyrmling",
    "size": "Medium",
    "type": "dragon",
    "alignment": "chaotic good",
    "challengeRating": "1",
    "xp": 100,
    "strength": 15,
    "dexterity": 10,
    "constitution": 13,
    "intelligence": 10,
    "wisdom": 11,
    "charisma": 13,
    "armorClass": 16,
    "armorType": "natural",
    "hitPoints": 16,
    "hitDice": "3d8+3",
    "speed": {
      "walk": 30,
      "fly": 60,
      "burrow": 15
    },
    "savingThrows": {},
    "skills": {
      "Perception": 4,
      "Stealth": 2
    },
    "damageResistances": [],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14,
      "darkvision": 60,
      "blindsight": 10
    },
    "languages": [
      "Draconic"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+2",
          "average": 8
        }
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nFire Breath. The dragon exhales fire in an 20-foot line that is 5 feet wide. Each creature in that line must make a DC 11 Dexterity saving throw, taking 14 (4d6) fire damage on a failed save, or half as much damage on a successful one.\nSleep Breath. The dragon exhales sleep gas in a 15-foot cone. Each creature in that area must succeed on a DC 11 Constitution saving throw or fall unconscious for 1 minute. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, talkative dragon with scales the color of burnished brass and an insatiable curiosity. Brass dragon wyrmlings are already social creatures, dwelling in desert regions where they practice their fire breath and love to engage travelers in conversation.",    "imagePrompt": "A medium dragon creature with brass scales, fire and heat emanating from its body, in desert regions",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "medium",
      "chaotic-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Bronze Dragon Wyrmling",
    "size": "Medium",
    "type": "dragon",
    "alignment": "lawful good",
    "challengeRating": "2",
    "xp": 450,
    "strength": 17,
    "dexterity": 10,
    "constitution": 15,
    "intelligence": 12,
    "wisdom": 11,
    "charisma": 15,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 32,
    "hitDice": "5d8+10",
    "speed": {
      "walk": 30,
      "fly": 60,
      "swim": 30
    },
    "savingThrows": {},
    "skills": {
      "Perception": 4,
      "Stealth": 2
    },
    "damageResistances": [],
    "damageImmunities": [
      "lightning"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14,
      "darkvision": 60,
      "blindsight": 10
    },
    "languages": [
      "Draconic"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+3",
          "average": 9
        }
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nLightning Breath. The dragon exhales lightning in a 40-foot line that is 5 feet wide. Each creature in that line must make a DC 12 Dexterity saving throw, taking 16 (3d10) lightning damage on a failed save, or half as much damage on a successful one.\nRepulsion Breath. The dragon exhales repulsion energy in a 30-foot cone. Each creature in that area must succeed on a DC 12 Strength saving throw. On a failed save, the creature is pushed 30 feet away from the dragon.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, noble dragon with scales the color of polished bronze and a natural affinity for the sea. Bronze dragon wyrmlings are already protective and honorable, dwelling near coastal regions where they practice their lightning breath and learn to defend their territories.",    "imagePrompt": "A medium dragon creature with bronze scales, lightning crackling around its body, near coastal regions",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "medium",
      "lawful-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Copper Dragon Wyrmling",
    "size": "Medium",
    "type": "dragon",
    "alignment": "chaotic good",
    "challengeRating": "1",
    "xp": 200,
    "strength": 15,
    "dexterity": 12,
    "constitution": 13,
    "intelligence": 14,
    "wisdom": 11,
    "charisma": 13,
    "armorClass": 16,
    "armorType": "natural",
    "hitPoints": 22,
    "hitDice": "4d8+4",
    "speed": {
      "walk": 30,
      "fly": 60,
      "climb": 30
    },
    "savingThrows": {},
    "skills": {
      "Perception": 4,
      "Stealth": 3
    },
    "damageResistances": [],
    "damageImmunities": [
      "acid"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14,
      "darkvision": 60,
      "blindsight": 10
    },
    "languages": [
      "Draconic"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+2",
          "average": 8
        }
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nAcid Breath. The dragon exhales acid in an 20-foot line that is 5 feet wide. Each creature in that line must make a DC 11 Dexterity saving throw, taking 18 (4d8) acid damage on a failed save, or half as much damage on a successful one.\nSlowing Breath. The dragon exhales gas in a 15-foot cone. Each creature in that area must succeed on a DC 11 Constitution saving throw. On a failed save, the creature can't use reactions, its speed is halved, and it can't make more than one attack on its turn. In addition, the creature can use either an action or a bonus action on its turn, but not both. These effects last for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself with a successful save.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, mischievous dragon with scales the color of burnished copper and a love for simple pranks. Copper dragon wyrmlings are already clever and playful, dwelling in rocky hills where they practice their acid breath and enjoy testing the wit of travelers.",    "imagePrompt": "A medium dragon creature with copper scales, acid dripping from its jaws, in rocky hills",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "medium",
      "chaotic-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Dragon Turtle",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "neutral",
    "challengeRating": "17",
    "xp": 18000,
    "strength": 25,
    "dexterity": 10,
    "constitution": 20,
    "intelligence": 10,
    "wisdom": 12,
    "charisma": 12,
    "armorClass": 20,
    "armorType": "natural",
    "hitPoints": 341,
    "hitDice": "22d20+110",
    "speed": {
      "walk": 20,
      "swim": 40
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
      "passivePerception": 11,
      "darkvision": 120
    },
    "languages": [
      "Aquan",
      "Draconic"
    ],
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon turtle can breathe air and water."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon turtle makes three attacks: one with its bite and two with its claws. It can make one tail attack in place of its two claw attacks."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +13 to hit, reach 15 ft., one target. Hit: 26 (3d12 + 7) piercing damage.",
        "attackBonus": 13,
        "damage": {
          "type": "Piercing",
          "roll": "3d12+7",
          "average": 27
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 16 (2d8 + 7) slashing damage.",
        "attackBonus": 13,
        "damage": {
          "type": "Piercing",
          "roll": "2d8+7",
          "average": 16
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +13 to hit, reach 15 ft., one target. Hit: 26 (3d12 + 7) bludgeoning damage. If the target is a creature, it must succeed on a DC 20 Strength saving throw or be pushed up to 10 feet away from the dragon turtle and knocked prone.",
        "attackBonus": 13,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d12+7",
          "average": 27
        }
      },
      {
        "name": "Steam Breath",
        "description": "The dragon turtle exhales scalding steam in a 60-foot cone. Each creature in that area must make a DC 18 Constitution saving throw, taking 52 (15d6) fire damage on a failed save, or half as much damage on a successful one. Being underwater doesn't grant resistance against this damage.",
        "damage": {
          "type": "Fire",
          "roll": "15d6",
          "average": 53
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive, ancient dragon with a shell like a living fortress and scales that gleam like polished sea stone. Dragon turtles are the guardians of the deep, dwelling in the darkest ocean depths where they use their steam breath to boil the waters around them. They are territorial and protective of their underwater domains, often demanding tribute from ships that pass through their waters.",    "imagePrompt": "A gargantuan dragon creature with a massive shell, steam billowing from its jaws, in deep ocean waters",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "gargantuan",
      "neutral",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Gold Dragon Wyrmling",
    "size": "Medium",
    "type": "dragon",
    "alignment": "lawful good",
    "challengeRating": "3",
    "xp": 700,
    "strength": 19,
    "dexterity": 14,
    "constitution": 17,
    "intelligence": 14,
    "wisdom": 11,
    "charisma": 16,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 60,
    "hitDice": "8d8+24",
    "speed": {
      "walk": 30,
      "fly": 60,
      "swim": 30
    },
    "savingThrows": {},
    "skills": {
      "Perception": 4,
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14,
      "darkvision": 60,
      "blindsight": 10
    },
    "languages": [
      "Draconic"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (1d10 + 4) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+4",
          "average": 10
        }
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nFire Breath. The dragon exhales fire in a 15-foot cone. Each creature in that area must make a DC 13 Dexterity saving throw, taking 22 (4d10) fire damage on a failed save, or half as much damage on a successful one.\nWeakening Breath. The dragon exhales gas in a 15-foot cone. Each creature in that area must succeed on a DC 13 Strength saving throw or have disadvantage on Strength-based attack rolls, Strength checks, and Strength saving throws for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, majestic dragon with scales the color of pure gold and eyes that radiate innate goodness. Gold dragon wyrmlings are already noble and compassionate, dwelling near good-aligned communities where they practice their fire breath and learn to protect the innocent.",    "imagePrompt": "A medium dragon creature with gold scales, fire and light emanating from its body, near good-aligned communities",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "medium",
      "lawful-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Green Dragon Wyrmling",
    "size": "Medium",
    "type": "dragon",
    "alignment": "lawful evil",
    "challengeRating": "2",
    "xp": 450,
    "strength": 15,
    "dexterity": 12,
    "constitution": 13,
    "intelligence": 14,
    "wisdom": 11,
    "charisma": 13,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 38,
    "hitDice": "7d8+7",
    "speed": {
      "walk": 30,
      "fly": 60,
      "swim": 30
    },
    "savingThrows": {},
    "skills": {
      "Perception": 4,
      "Stealth": 3
    },
    "damageResistances": [],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14,
      "darkvision": 60,
      "blindsight": 10
    },
    "languages": [
      "Draconic"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 3 (1d6) poison damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+2",
          "average": 8
        }
      },
      {
        "name": "Poison Breath",
        "description": "The dragon exhales poisonous gas in a 15-foot cone. Each creature in that area must make a DC 11 Constitution saving throw, taking 21 (6d6) poison damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Poison",
          "roll": "6d6",
          "average": 21
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, cunning dragon with scales the color of forest canopy and eyes that gleam with deceptive intelligence. Green dragon wyrmlings are already manipulative and territorial, dwelling in dense forests where they practice their poisonous breath and learn the art of deception.",    "imagePrompt": "A medium dragon creature with green scales, poison gas emanating from its jaws, in dense forests",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "medium",
      "lawful-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Pseudodragon",
    "size": "Tiny",
    "type": "dragon",
    "alignment": "neutral good",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 6,
    "dexterity": 15,
    "constitution": 13,
    "intelligence": 10,
    "wisdom": 12,
    "charisma": 10,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 7,
    "hitDice": "2d4+2",
    "speed": {
      "walk": 15,
      "fly": 60
    },
    "savingThrows": {},
    "skills": {
      "Perception": 3,
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 13,
      "darkvision": 60,
      "blindsight": 10
    },
    "languages": [
      "understands Common and Draconic but can't speak"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Senses",
        "description": "The pseudodragon has advantage on Wisdom (Perception) checks that rely on sight, hearing, or smell."
      },
      {
        "name": "Magic Resistance",
        "description": "The pseudodragon has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Limited Telepathy",
        "description": "The pseudodragon can magically communicate simple ideas, emotions, and images telepathically with any creature within 100 ft. of it that can understand a language."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d4+2",
          "average": 5
        }
      },
      {
        "name": "Sting",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) piercing damage, and the target must succeed on a DC 11 Constitution saving throw or become poisoned for 1 hour. If the saving throw fails by 5 or more, the target falls unconscious for the same duration, or until it takes damage or another creature uses an action to shake it awake.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d4+2",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "A tiny, cat-sized dragon with scales that shimmer like precious metals and a long, scorpion-like tail tipped with a venomous stinger. Pseudodragons are intelligent and curious creatures who often form bonds with spellcasters and other magical beings. They communicate through limited telepathy and are known for their keen senses and magical resistance.",    "imagePrompt": "A tiny dragon creature with shimmering scales, scorpion-like tail with stinger, near spellcasters or magical beings",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "tiny",
      "neutral-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Red Dragon Wyrmling",
    "size": "Medium",
    "type": "dragon",
    "alignment": "chaotic evil",
    "challengeRating": "4",
    "xp": 1100,
    "strength": 19,
    "dexterity": 10,
    "constitution": 17,
    "intelligence": 12,
    "wisdom": 11,
    "charisma": 15,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 75,
    "hitDice": "10d8+30",
    "speed": {
      "walk": 30,
      "fly": 60,
      "climb": 30
    },
    "savingThrows": {},
    "skills": {
      "Perception": 4,
      "Stealth": 2
    },
    "damageResistances": [],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14,
      "darkvision": 60,
      "blindsight": 10
    },
    "languages": [
      "Draconic"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (1d10 + 4) piercing damage plus 3 (1d6) fire damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+4",
          "average": 10
        }
      },
      {
        "name": "Fire Breath",
        "description": "The dragon exhales fire in a 15-foot cone. Each creature in that area must make a DC 13 Dexterity saving throw, taking 24 (7d6) fire damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Fire",
          "roll": "7d6",
          "average": 25
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, greedy dragon with scales the color of molten lava and eyes that burn with malevolent intelligence. Red dragon wyrmlings are already covetous and aggressive, dwelling in mountainous regions where they practice their fire breath and begin amassing their first hoards.",    "imagePrompt": "A medium dragon creature with red scales, fire and smoke billowing from its jaws, in mountainous regions",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "medium",
      "chaotic-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Silver Dragon Wyrmling",
    "size": "Medium",
    "type": "dragon",
    "alignment": "lawful good",
    "challengeRating": "2",
    "xp": 450,
    "strength": 19,
    "dexterity": 10,
    "constitution": 17,
    "intelligence": 12,
    "wisdom": 11,
    "charisma": 15,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 45,
    "hitDice": "6d8+18",
    "speed": {
      "walk": 30,
      "fly": 60
    },
    "savingThrows": {},
    "skills": {
      "Perception": 4,
      "Stealth": 2
    },
    "damageResistances": [],
    "damageImmunities": [
      "cold"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14,
      "darkvision": 60,
      "blindsight": 10
    },
    "languages": [
      "Draconic"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (1d10 + 4) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+4",
          "average": 10
        }
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nCold Breath. The dragon exhales an icy blast in a 15-foot cone. Each creature in that area must make a DC 13 Constitution saving throw, taking 18 (4d8) cold damage on a failed save, or half as much damage on a successful one.\nParalyzing Breath. The dragon exhales paralyzing gas in a 15-foot cone. Each creature in that area must succeed on a DC 13 Constitution saving throw or be paralyzed for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, honorable dragon with scales the color of polished silver and a natural love for humanoid civilization. Silver dragon wyrmlings are already noble and protective, dwelling near humanoid settlements where they practice their cold breath and learn to defend the innocent.",    "imagePrompt": "A medium dragon creature with silver scales, frost and cold emanating from its body, near humanoid settlements",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "medium",
      "lawful-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "White Dragon Wyrmling",
    "size": "Medium",
    "type": "dragon",
    "alignment": "chaotic evil",
    "challengeRating": "2",
    "xp": 450,
    "strength": 14,
    "dexterity": 10,
    "constitution": 14,
    "intelligence": 5,
    "wisdom": 10,
    "charisma": 11,
    "armorClass": 16,
    "armorType": "natural",
    "hitPoints": 32,
    "hitDice": "5d8+10",
    "speed": {
      "walk": 30,
      "fly": 60,
      "swim": 30,
      "burrow": 15
    },
    "savingThrows": {},
    "skills": {
      "Perception": 4,
      "Stealth": 2
    },
    "damageResistances": [],
    "damageImmunities": [
      "cold"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14,
      "darkvision": 60,
      "blindsight": 10
    },
    "languages": [
      "Draconic"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 2 (1d4) cold damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+2",
          "average": 8
        }
      },
      {
        "name": "Cold Breath",
        "description": "The dragon exhales an icy blast of hail in a 15-foot cone. Each creature in that area must make a DC 12 Constitution saving throw, taking 22 (5d8) cold damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Cold",
          "roll": "5d8",
          "average": 23
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, savage dragon with scales the color of pure ice and eyes that gleam with primal hunger. White dragon wyrmlings are already feral and aggressive, dwelling in frozen wastelands where they practice their freezing breath and learn to hunt prey through brute strength.",    "imagePrompt": "A medium dragon creature with white scales, frost and ice emanating from its jaws, in frozen wastelands",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "medium",
      "chaotic-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Wyvern",
    "size": "Large",
    "type": "dragon",
    "alignment": "unaligned",
    "challengeRating": "6",
    "xp": 2300,
    "strength": 19,
    "dexterity": 10,
    "constitution": 16,
    "intelligence": 5,
    "wisdom": 12,
    "charisma": 6,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 110,
    "hitDice": "13d10+39",
    "speed": {
      "walk": 20,
      "fly": 80
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
      "passivePerception": 14,
      "darkvision": 60
    },
    "languages": [],
    "proficiencyBonus": 3,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The wyvern makes two attacks: one with its bite and one with its stinger. While flying, it can use its claws in place of one other attack."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one creature. Hit: 11 (2d6 + 4) piercing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "2d6+4",
          "average": 11
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Slashing",
          "roll": "2d8+4",
          "average": 13
        }
      },
      {
        "name": "Stinger",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one creature. Hit: 11 (2d6 + 4) piercing damage. The target must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "2d6+4",
          "average": 11
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large, dragon-like creature with leathery wings, powerful hind legs, and a long tail tipped with a venomous stinger. Wyverns are aggressive predators that hunt from the skies, using their poisonous sting to bring down prey. Unlike true dragons, they lack forelegs and are more bestial in nature, relying on brute strength and their deadly venom.",    "imagePrompt": "A large wyvern creature with leathery wings, hind legs, and a venomous stinger tail",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "large",
      "unaligned",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Young Black Dragon",
    "size": "Large",
    "type": "dragon",
    "alignment": "chaotic evil",
    "challengeRating": "7",
    "xp": 2900,
    "strength": 19,
    "dexterity": 14,
    "constitution": 17,
    "intelligence": 12,
    "wisdom": 11,
    "charisma": 15,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 127,
    "hitDice": "15d10+45",
    "speed": {
      "walk": 40,
      "fly": 80,
      "swim": 40
    },
    "savingThrows": {},
    "skills": {
      "Perception": 6,
      "Stealth": 5
    },
    "damageResistances": [],
    "damageImmunities": [
      "acid"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 16,
      "darkvision": 120,
      "blindsight": 30
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage plus 4 (1d8) acid damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+4",
          "average": 15
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+4",
          "average": 11
        }
      },
      {
        "name": "Acid Breath",
        "description": "The dragon exhales acid in a 30-foot line that is 5 feet wide. Each creature in that line must make a DC 14 Dexterity saving throw, taking 49 (11d8) acid damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Acid",
          "roll": "11d8",
          "average": 50
        }
      }
    ],
    "legendaryActions": [],
    "description": "A young, cunning dragon with slick black scales and a foul, acidic breath. Young black dragons are smaller but no less dangerous than their adult counterparts, lurking in swamps and ruins to ambush prey. They are territorial and cruel, using their acid breath to dissolve both flesh and stone.",    "imagePrompt": "A large dragon creature with scales, wings, and a powerful presence",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "large",
      "chaotic-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Young Blue Dragon",
    "size": "Large",
    "type": "dragon",
    "alignment": "lawful evil",
    "challengeRating": "9",
    "xp": 5000,
    "strength": 21,
    "dexterity": 10,
    "constitution": 19,
    "intelligence": 14,
    "wisdom": 13,
    "charisma": 17,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 152,
    "hitDice": "16d10+64",
    "speed": {
      "walk": 40,
      "fly": 80,
      "burrow": 20
    },
    "savingThrows": {},
    "skills": {
      "Perception": 9,
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [
      "lightning"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 19,
      "darkvision": 120,
      "blindsight": 30
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 4,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 16 (2d10 + 5) piercing damage plus 5 (1d10) lightning damage.",
        "attackBonus": 9,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+5",
          "average": 16
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage.",
        "attackBonus": 9,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+5",
          "average": 12
        }
      },
      {
        "name": "Lightning Breath",
        "description": "The dragon exhales lightning in an 60-foot line that is 5 feet wide. Each creature in that line must make a DC 16 Dexterity saving throw, taking 55 (10d10) lightning damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Lightning",
          "roll": "10d10",
          "average": 55
        }
      }
    ],
    "legendaryActions": [],
    "description": "A young dragon with scales the color of desert sky and eyes that crackle with lightning. Young blue dragons are territorial and prefer to dwell in arid regions, using their lightning breath to hunt prey. They are cunning and patient, often burrowing into the sand to ambush unsuspecting travelers.",    "imagePrompt": "A large dragon creature with scales, wings, and a powerful presence",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "large",
      "lawful-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Young Brass Dragon",
    "size": "Large",
    "type": "dragon",
    "alignment": "chaotic good",
    "challengeRating": "6",
    "xp": 2300,
    "strength": 19,
    "dexterity": 10,
    "constitution": 17,
    "intelligence": 12,
    "wisdom": 11,
    "charisma": 15,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 110,
    "hitDice": "13d10+39",
    "speed": {
      "walk": 40,
      "fly": 80,
      "burrow": 20
    },
    "savingThrows": {},
    "skills": {
      "Perception": 6,
      "Persuasion": 5,
      "Stealth": 3
    },
    "damageResistances": [],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 16,
      "darkvision": 120,
      "blindsight": 30
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
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+4",
          "average": 15
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+4",
          "average": 11
        }
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nFire Breath. The dragon exhales fire in a 40-foot line that is 5 feet wide. Each creature in that line must make a DC 14 Dexterity saving throw, taking 42 (12d6) fire damage on a failed save, or half as much damage on a successful one.\nSleep Breath. The dragon exhales sleep gas in a 30-foot cone. Each creature in that area must succeed on a DC 14 Constitution saving throw or fall unconscious for 5 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A young dragon with scales the color of polished brass and eyes that gleam with intelligence. Young brass dragons are known for their love of conversation and their tendency to talk to anyone they meet. They prefer to dwell in warm deserts and arid hills, using their fire breath and sleep gas to subdue rather than kill their prey.",    "imagePrompt": "A large dragon creature with scales, wings, and a powerful presence",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "large",
      "chaotic-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Young Bronze Dragon",
    "size": "Large",
    "type": "dragon",
    "alignment": "lawful good",
    "challengeRating": "8",
    "xp": 3900,
    "strength": 21,
    "dexterity": 10,
    "constitution": 19,
    "intelligence": 14,
    "wisdom": 13,
    "charisma": 17,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 142,
    "hitDice": "15d10+60",
    "speed": {
      "walk": 40,
      "fly": 80,
      "swim": 40
    },
    "savingThrows": {},
    "skills": {
      "Insight": 4,
      "Perception": 7,
      "Stealth": 3
    },
    "damageResistances": [],
    "damageImmunities": [
      "lightning"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 17,
      "darkvision": 120,
      "blindsight": 30
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 16 (2d10 + 5) piercing damage.",
        "attackBonus": 8,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+5",
          "average": 16
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage.",
        "attackBonus": 8,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+5",
          "average": 12
        }
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nLightning Breath. The dragon exhales lightning in a 60-foot line that is 5 feet wide. Each creature in that line must make a DC 15 Dexterity saving throw, taking 55 (10d10) lightning damage on a failed save, or half as much damage on a successful one.\nRepulsion Breath. The dragon exhales repulsion energy in a 30-foot cone. Each creature in that area must succeed on a DC 15 Strength saving throw. On a failed save, the creature is pushed 40 feet away from the dragon.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A young, noble dragon with scales the color of polished bronze and a love for the sea. Young bronze dragons are protectors of coastal regions and islands, using their lightning breath and repulsion breath to defend their territories. They are lawful and good-natured, often forming alliances with coastal communities.",    "imagePrompt": "A large dragon creature with scales, wings, and a powerful presence",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "large",
      "lawful-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Young Copper Dragon",
    "size": "Large",
    "type": "dragon",
    "alignment": "chaotic good",
    "challengeRating": "7",
    "xp": 2900,
    "strength": 19,
    "dexterity": 12,
    "constitution": 17,
    "intelligence": 16,
    "wisdom": 13,
    "charisma": 15,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 119,
    "hitDice": "14d10+42",
    "speed": {
      "walk": 40,
      "fly": 80,
      "climb": 40
    },
    "savingThrows": {},
    "skills": {
      "Deception": 5,
      "Perception": 7,
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [
      "acid"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 17,
      "darkvision": 120,
      "blindsight": 30
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
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+4",
          "average": 15
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+4",
          "average": 11
        }
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nAcid Breath. The dragon exhales acid in an 40-foot line that is 5 feet wide. Each creature in that line must make a DC 14 Dexterity saving throw, taking 40 (9d8) acid damage on a failed save, or half as much damage on a successful one.\nSlowing Breath. The dragon exhales gas in a 30-foot cone. Each creature in that area must succeed on a DC 14 Constitution saving throw. On a failed save, the creature can't use reactions, its speed is halved, and it can't make more than one attack on its turn. In addition, the creature can use either an action or a bonus action on its turn, but not both. These effects last for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself with a successful save.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A young, clever dragon with scales the color of burnished copper and a love for riddles and pranks. Young copper dragons dwell in rocky hills and mountains, using their acid breath and slowing breath to play tricks on travelers. They are mischievous but good-natured, often testing visitors with riddles before revealing themselves.",    "imagePrompt": "A large dragon creature with scales, wings, and a powerful presence",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "large",
      "chaotic-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Young Gold Dragon",
    "size": "Large",
    "type": "dragon",
    "alignment": "lawful good",
    "challengeRating": "10",
    "xp": 5900,
    "strength": 23,
    "dexterity": 14,
    "constitution": 21,
    "intelligence": 16,
    "wisdom": 13,
    "charisma": 20,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 178,
    "hitDice": "17d10+85",
    "speed": {
      "walk": 40,
      "fly": 80,
      "swim": 40
    },
    "savingThrows": {},
    "skills": {
      "Insight": 5,
      "Perception": 9,
      "Persuasion": 9,
      "Stealth": 6
    },
    "damageResistances": [],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 19,
      "darkvision": 120,
      "blindsight": 30
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+6",
          "average": 17
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+6",
          "average": 13
        }
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nFire Breath. The dragon exhales fire in a 30-foot cone. Each creature in that area must make a DC 17 Dexterity saving throw, taking 55 (10d10) fire damage on a failed save, or half as much damage on a successful one.\nWeakening Breath. The dragon exhales gas in a 30-foot cone. Each creature in that area must succeed on a DC 17 Strength saving throw or have disadvantage on Strength-based attack rolls, Strength checks, and Strength saving throws for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A young, noble dragon with scales the color of burnished gold and eyes that gleam with wisdom. Young gold dragons are the most powerful of the metallic dragons, using their fire breath and weakening breath to protect the innocent. They are lawful and good, often serving as guardians of ancient knowledge and protectors of civilization.",    "imagePrompt": "A large dragon creature with scales, wings, and a powerful presence",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "large",
      "lawful-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Young Green Dragon",
    "size": "Large",
    "type": "dragon",
    "alignment": "lawful evil",
    "challengeRating": "8",
    "xp": 3900,
    "strength": 19,
    "dexterity": 12,
    "constitution": 17,
    "intelligence": 16,
    "wisdom": 13,
    "charisma": 15,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 136,
    "hitDice": "16d10+48",
    "speed": {
      "walk": 40,
      "fly": 80,
      "swim": 40
    },
    "savingThrows": {},
    "skills": {
      "Deception": 5,
      "Perception": 7,
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      "Poisoned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 17,
      "darkvision": 120,
      "blindsight": 30
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The dragon can breathe air and water."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage plus 7 (2d6) poison damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+4",
          "average": 15
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+4",
          "average": 11
        }
      },
      {
        "name": "Poison Breath",
        "description": "The dragon exhales poisonous gas in a 30-foot cone. Each creature in that area must make a DC 14 Constitution saving throw, taking 42 (12d6) poison damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Poison",
          "roll": "12d6",
          "average": 42
        }
      }
    ],
    "legendaryActions": [],
    "description": "A young, cunning dragon with scales the color of forest canopy and eyes that gleam with deceptive intelligence. Young green dragons make their homes in dense forests and jungles, using their poison breath to hunt prey. They are manipulative and territorial, often setting up elaborate schemes to control their domains.",    "imagePrompt": "A large dragon creature with scales, wings, and a powerful presence",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "large",
      "lawful-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Young Red Dragon",
    "size": "Large",
    "type": "dragon",
    "alignment": "chaotic evil",
    "challengeRating": "10",
    "xp": 5900,
    "strength": 23,
    "dexterity": 10,
    "constitution": 21,
    "intelligence": 14,
    "wisdom": 11,
    "charisma": 19,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 178,
    "hitDice": "17d10+85",
    "speed": {
      "walk": 40,
      "fly": 80,
      "climb": 40
    },
    "savingThrows": {},
    "skills": {
      "Perception": 8,
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 18,
      "darkvision": 120,
      "blindsight": 30
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 4,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 3 (1d6) fire damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+6",
          "average": 17
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+6",
          "average": 13
        }
      },
      {
        "name": "Fire Breath",
        "description": "The dragon exhales fire in a 30-foot cone. Each creature in that area must make a DC 17 Dexterity saving throw, taking 56 (16d6) fire damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Fire",
          "roll": "16d6",
          "average": 56
        }
      }
    ],
    "legendaryActions": [],
    "description": "A young, greedy dragon with scales the color of molten lava and eyes that burn with malevolent intelligence. Young red dragons are the most covetous of the true dragons, driven by their insatiable desire for treasure and power. They prefer to dwell in mountainous regions, using their devastating fire breath to incinerate enemies and claim territory.",    "imagePrompt": "A large dragon creature with scales, wings, and a powerful presence",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "large",
      "chaotic-evil",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Young Silver Dragon",
    "size": "Large",
    "type": "dragon",
    "alignment": "lawful good",
    "challengeRating": "9",
    "xp": 5000,
    "strength": 23,
    "dexterity": 10,
    "constitution": 21,
    "intelligence": 14,
    "wisdom": 11,
    "charisma": 19,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 168,
    "hitDice": "16d10+80",
    "speed": {
      "walk": 40,
      "fly": 80
    },
    "savingThrows": {},
    "skills": {
      "Arcana": 6,
      "History": 6,
      "Perception": 8,
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [
      "cold"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 18,
      "darkvision": 120,
      "blindsight": 30
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 4,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+6",
          "average": 17
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+6",
          "average": 13
        }
      },
      {
        "name": "Breath Weapons",
        "description": "The dragon uses one of the following breath weapons.\nCold Breath. The dragon exhales an icy blast in a 30-foot cone. Each creature in that area must make a DC 17 Constitution saving throw, taking 54 (12d8) cold damage on a failed save, or half as much damage on a successful one.\nParalyzing Breath. The dragon exhales paralyzing gas in a 30-foot cone. Each creature in that area must succeed on a DC 17 Constitution saving throw or be paralyzed for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A young, noble dragon with scales the color of polished silver and a love for humanoid civilization. Young silver dragons are protectors of good-aligned communities, using their cold breath and paralyzing breath to defend the innocent. They are honorable and wise, often studying humanoid cultures and forming close bonds with paladins and other champions of good.",    "imagePrompt": "A large dragon creature with scales, wings, and a powerful presence",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "large",
      "lawful-good",
      "dragon",
      "legendary"
    ]
  },
  {
    "name": "Young White Dragon",
    "size": "Large",
    "type": "dragon",
    "alignment": "chaotic evil",
    "challengeRating": "6",
    "xp": 2300,
    "strength": 18,
    "dexterity": 10,
    "constitution": 18,
    "intelligence": 6,
    "wisdom": 11,
    "charisma": 12,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 133,
    "hitDice": "14d10+56",
    "speed": {
      "walk": 40,
      "fly": 80,
      "swim": 40,
      "burrow": 20
    },
    "savingThrows": {},
    "skills": {
      "Perception": 6,
      "Stealth": 3
    },
    "damageResistances": [],
    "damageImmunities": [
      "cold"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 16,
      "darkvision": 120,
      "blindsight": 30
    },
    "languages": [
      "Common",
      "Draconic"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Ice Walk",
        "description": "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, difficult terrain composed of ice or snow doesn't cost it extra moment."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dragon makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage plus 4 (1d8) cold damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "2d10+4",
          "average": 15
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+4",
          "average": 11
        }
      },
      {
        "name": "Cold Breath",
        "description": "The dragon exhales an icy blast in a 30-foot cone. Each creature in that area must make a DC 15 Constitution saving throw, taking 45 (10d8) cold damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Cold",
          "roll": "10d8",
          "average": 45
        }
      }
    ],
    "legendaryActions": [],
    "description": "A young, savage dragon with scales the color of pure ice and eyes that gleam with primal hunger. Young white dragons are the most feral of the true dragons, dwelling in frozen wastelands and arctic regions. They are bestial and cruel, using their cold breath to freeze prey before devouring it whole.",    "imagePrompt": "A large dragon creature with scales, wings, and a powerful presence",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "dragon",
      "large",
      "chaotic-evil",
      "dragon",
      "legendary"
    ]
  }
];
