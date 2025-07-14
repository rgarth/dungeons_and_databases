import { Monster } from '@/types/monster';

export const celestialMonsters: Monster[] = [
  {
    "name": "Couatl",
    "size": "Medium",
    "type": "celestial",
    "alignment": "lawful good",
    "challengeRating": "4",
    "xp": 1100,
    "strength": 16,
    "dexterity": 20,
    "constitution": 17,
    "intelligence": 18,
    "wisdom": 20,
    "charisma": 18,
    "armorClass": 19,
    "armorType": "natural",
    "hitPoints": 97,
    "hitDice": "13d8+39",
    "speed": {
      "walk": 30,
      "fly": 90
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "radiant"
    ],
    "damageImmunities": [
      "psychic",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 15,
      "truesight": 120
    },
    "languages": [
      "all",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Innate Spellcasting",
        "description": "The couatl's spellcasting ability is Charisma (spell save DC 14). It can innately cast the following spells, requiring only verbal components:\n\nAt will: detect evil and good, detect magic, detect thoughts\n3/day each: bless, create food and water, cure wounds, lesser restoration, protection from poison, sanctuary, shield\n1/day each: dream, greater restoration, scrying"
      },
      {
        "name": "Magic Weapons",
        "description": "The couatl's weapon attacks are magical."
      },
      {
        "name": "Shielded Mind",
        "description": "The couatl is immune to scrying and to any effect that would sense its emotions, read its thoughts, or detect its location."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one creature. Hit: 8 (1d6 + 5) piercing damage, and the target must succeed on a DC 13 Constitution saving throw or be poisoned for 24 hours. Until this poison ends, the target is unconscious. Another creature can use an action to shake the target awake.",
        "attackBonus": 8,
        "damage": {
          "type": "Piercing",
          "roll": "1d6+5",
          "average": 9
        }
      },
      {
        "name": "Constrict",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one Medium or smaller creature. Hit: 10 (2d6 + 3) bludgeoning damage, and the target is grappled (escape DC 15). Until this grapple ends, the target is restrained, and the couatl can't constrict another target.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d6+3",
          "average": 10
        }
      },
      {
        "name": "Change Shape",
        "description": "The couatl magically polymorphs into a humanoid or beast that has a challenge rating equal to or less than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the couatl's choice).\nIn a new form, the couatl retains its game statistics and ability to speak, but its AC, movement modes, Strength, Dexterity, and other actions are replaced by those of the new form, and it gains any statistics and capabilities (except class features, legendary actions, and lair actions) that the new form has but that it lacks. If the new form has a bite attack, the couatl can use its bite in that form.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A medium celestial with challenge rating 4.",
    "background": "This celestial is a formidable opponent.",
    "imagePrompt": "A medium celestial creature with divine and angelic features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "celestial",
      "medium",
      "lawful-good",
      "celestial",
      "good"
    ]
  },
  {
    "name": "Deva",
    "size": "Medium",
    "type": "celestial",
    "alignment": "lawful good",
    "challengeRating": "10",
    "xp": 5900,
    "strength": 18,
    "dexterity": 18,
    "constitution": 18,
    "intelligence": 17,
    "wisdom": 20,
    "charisma": 20,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 136,
    "hitDice": "16d8+64",
    "speed": {
      "walk": 30,
      "fly": 90
    },
    "savingThrows": {},
    "skills": {
      "Insight": 9,
      "Perception": 9
    },
    "damageResistances": [
      "radiant",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 19,
      "darkvision": 120
    },
    "languages": [
      "all",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Angelic Weapons",
        "description": "The deva's weapon attacks are magical. When the deva hits with any weapon, the weapon deals an extra 4d8 radiant damage (included in the attack)."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The deva's spellcasting ability is Charisma (spell save DC 17). The deva can innately cast the following spells, requiring only verbal components:\nAt will: detect evil and good\n1/day each: commune, raise dead"
      },
      {
        "name": "Magic Resistance",
        "description": "The deva has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The deva makes two melee attacks.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Mace",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) bludgeoning damage plus 18 (4d8) radiant damage.",
        "attackBonus": 8,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d6+4",
          "average": 8
        }
      },
      {
        "name": "Healing Touch",
        "description": "The deva touches another creature. The target magically regains 20 (4d8 + 2) hit points and is freed from any curse, disease, poison, blindness, or deafness.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Change Shape",
        "description": "The deva magically polymorphs into a humanoid or beast that has a challenge rating equal to or less than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the deva's choice).\nIn a new form, the deva retains its game statistics and ability to speak, but its AC, movement modes, Strength, Dexterity, and special senses are replaced by those of the new form, and it gains any statistics and capabilities (except class features, legendary actions, and lair actions) that the new form has but that it lacks.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A medium celestial with challenge rating 10.",
    "background": "This celestial is a formidable opponent.",
    "imagePrompt": "A medium celestial creature with divine and angelic features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "celestial",
      "medium",
      "lawful-good",
      "celestial",
      "good"
    ]
  },
  {
    "name": "Pegasus",
    "size": "Large",
    "type": "celestial",
    "alignment": "chaotic good",
    "challengeRating": "2",
    "xp": 450,
    "strength": 18,
    "dexterity": 15,
    "constitution": 16,
    "intelligence": 10,
    "wisdom": 15,
    "charisma": 13,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 59,
    "hitDice": "7d10+21",
    "speed": {
      "walk": 60,
      "fly": 90
    },
    "savingThrows": {},
    "skills": {
      "Perception": 6
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 16
    },
    "languages": [
      "understands Celestial",
      "Common",
      "Elvish",
      "and Sylvan but can't speak"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d6+4",
          "average": 11
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large celestial with challenge rating 2.",
    "background": "This celestial is a formidable opponent.",
    "imagePrompt": "A large celestial creature with divine and angelic features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "celestial",
      "large",
      "chaotic-good",
      "celestial",
      "good"
    ]
  },
  {
    "name": "Planetar",
    "size": "Large",
    "type": "celestial",
    "alignment": "lawful good",
    "challengeRating": "16",
    "xp": 15000,
    "strength": 24,
    "dexterity": 20,
    "constitution": 24,
    "intelligence": 19,
    "wisdom": 22,
    "charisma": 25,
    "armorClass": 19,
    "armorType": "natural",
    "hitPoints": 200,
    "hitDice": "16d10+112",
    "speed": {
      "walk": 40,
      "fly": 120
    },
    "savingThrows": {},
    "skills": {
      "Perception": 11
    },
    "damageResistances": [
      "radiant",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 21,
      "truesight": 120
    },
    "languages": [
      "all",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Angelic Weapons",
        "description": "The planetar's weapon attacks are magical. When the planetar hits with any weapon, the weapon deals an extra 5d8 radiant damage (included in the attack)."
      },
      {
        "name": "Divine Awareness",
        "description": "The planetar knows if it hears a lie."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The planetar's spellcasting ability is Charisma (spell save DC 20). The planetar can innately cast the following spells, requiring no material components:\nAt will: detect evil and good, invisibility (self only)\n3/day each: blade barrier, dispel evil and good, flame strike, raise dead\n1/day each: commune, control weather, insect plague"
      },
      {
        "name": "Magic Resistance",
        "description": "The planetar has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The planetar makes two melee attacks.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Greatsword",
        "description": "Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 21 (4d6 + 7) slashing damage plus 22 (5d8) radiant damage.",
        "attackBonus": 12,
        "damage": {
          "type": "Slashing",
          "roll": "4d6+7",
          "average": 21
        }
      },
      {
        "name": "Healing Touch",
        "description": "The planetar touches another creature. The target magically regains 30 (6d8 + 3) hit points and is freed from any curse, disease, poison, blindness, or deafness.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large celestial with challenge rating 16.",
    "background": "This celestial is a formidable opponent.",
    "imagePrompt": "A large celestial creature with divine and angelic features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "celestial",
      "large",
      "lawful-good",
      "celestial",
      "good"
    ]
  },
  {
    "name": "Solar",
    "size": "Large",
    "type": "celestial",
    "alignment": "lawful good",
    "challengeRating": "21",
    "xp": 33000,
    "strength": 26,
    "dexterity": 22,
    "constitution": 26,
    "intelligence": 25,
    "wisdom": 25,
    "charisma": 30,
    "armorClass": 21,
    "armorType": "natural",
    "hitPoints": 243,
    "hitDice": "18d10+144",
    "speed": {
      "walk": 50,
      "fly": 150
    },
    "savingThrows": {},
    "skills": {
      "Perception": 14
    },
    "damageResistances": [
      "radiant",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [
      "necrotic",
      "poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Poisoned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 24,
      "truesight": 120
    },
    "languages": [
      "all",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Angelic Weapons",
        "description": "The solar's weapon attacks are magical. When the solar hits with any weapon, the weapon deals an extra 6d8 radiant damage (included in the attack)."
      },
      {
        "name": "Divine Awareness",
        "description": "The solar knows if it hears a lie."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The solar's spell casting ability is Charisma (spell save DC 25). It can innately cast the following spells, requiring no material components:\nAt will: detect evil and good, invisibility (self only)\n3/day each: blade barrier, dispel evil and good, resurrection\n1/day each: commune, control weather"
      },
      {
        "name": "Magic Resistance",
        "description": "The solar has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The solar makes two greatsword attacks.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Greatsword",
        "description": "Melee Weapon Attack: +15 to hit, reach 5 ft., one target. Hit: 22 (4d6 + 8) slashing damage plus 27 (6d8) radiant damage.",
        "attackBonus": 15,
        "damage": {
          "type": "Radiant",
          "roll": "4d6+8",
          "average": 22
        }
      },
      {
        "name": "Slaying Longbow",
        "description": "Ranged Weapon Attack: +13 to hit, range 150/600 ft., one target. Hit: 15 (2d8 + 6) piercing damage plus 27 (6d8) radiant damage. If the target is a creature that has 190 hit points or fewer, it must succeed on a DC 15 Constitution saving throw or die.",
        "attackBonus": 13,
        "damage": {
          "type": "Piercing",
          "roll": "2d8+6",
          "average": 15
        }
      },
      {
        "name": "Flying Sword",
        "description": "The solar releases its greatsword to hover magically in an unoccupied space within 5 ft. of it. If the solar can see the sword, the solar can mentally command it as a bonus action to fly up to 50 ft. and either make one attack against a target or return to the solar's hands. If the hovering sword is targeted by any effect, the solar is considered to be holding it. The hovering sword falls if the solar dies.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Healing Touch",
        "description": "The solar touches another creature. The target magically regains 40 (8d8 + 4) hit points and is freed from any curse, disease, poison, blindness, or deafness.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Teleport",
        "description": "The solar magically teleports, along with any equipment it is wearing or carrying, up to 120 ft. to an unoccupied space it can see."
      },
      {
        "name": "Searing Burst (Costs 2 Actions)",
        "description": "The solar emits magical, divine energy. Each creature of its choice in a 10 -foot radius must make a DC 23 Dexterity saving throw, taking 14 (4d6) fire damage plus 14 (4d6) radiant damage on a failed save, or half as much damage on a successful one."
      },
      {
        "name": "Blinding Gaze (Costs 3 Actions)",
        "description": "The solar targets one creature it can see within 30 ft. of it. If the target can see it, the target must succeed on a DC 15 Constitution saving throw or be blinded until magic such as the lesser restoration spell removes the blindness."
      }
    ],
    "description": "A large celestial with challenge rating 21.",
    "background": "This celestial is a formidable opponent.",
    "imagePrompt": "A large celestial creature with divine and angelic features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "celestial",
      "large",
      "lawful-good",
      "celestial",
      "good"
    ]
  },
  {
    "name": "Unicorn",
    "size": "Large",
    "type": "celestial",
    "alignment": "lawful good",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 18,
    "dexterity": 14,
    "constitution": 15,
    "intelligence": 11,
    "wisdom": 17,
    "charisma": 16,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 67,
    "hitDice": "9d10+18",
    "speed": {
      "walk": 50
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Paralyzed",
      "Poisoned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 13,
      "darkvision": 60
    },
    "languages": [
      "Celestial",
      "Elvish",
      "Sylvan",
      "telepathy 60 ft."
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Charge",
        "description": "If the unicorn moves at least 20 ft. straight toward a target and then hits it with a horn attack on the same turn, the target takes an extra 9 (2d8) piercing damage. If the target is a creature, it must succeed on a DC 15 Strength saving throw or be knocked prone."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The unicorn's innate spellcasting ability is Charisma (spell save DC 14). The unicorn can innately cast the following spells, requiring no components:\n\nAt will: detect evil and good, druidcraft, pass without trace\n1/day each: calm emotions, dispel evil and good, entangle"
      },
      {
        "name": "Magic Resistance",
        "description": "The unicorn has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The unicorn's weapon attacks are magical."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The unicorn makes two attacks: one with its hooves and one with its horn.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d6+4",
          "average": 11
        }
      },
      {
        "name": "Horn",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "1d8+4",
          "average": 9
        }
      },
      {
        "name": "Healing Touch",
        "description": "The unicorn touches another creature with its horn. The target magically regains 11 (2d8 + 2) hit points. In addition, the touch removes all diseases and neutralizes all poisons afflicting the target.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Teleport",
        "description": "The unicorn magically teleports itself and up to three willing creatures it can see within 5 ft. of it, along with any equipment they are wearing or carrying, to a location the unicorn is familiar with, up to 1 mile away.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Hooves",
        "description": "The unicorn makes one attack with its hooves."
      },
      {
        "name": "Shimmering Shield (Costs 2 Actions)",
        "description": "The unicorn creates a shimmering, magical field around itself or another creature it can see within 60 ft. of it. The target gains a +2 bonus to AC until the end of the unicorn's next turn."
      },
      {
        "name": "Heal Self (Costs 3 Actions)",
        "description": "The unicorn magically regains 11 (2d8 + 2) hit points."
      }
    ],
    "description": "A large celestial with challenge rating 5.",
    "background": "This celestial is a formidable opponent.",
    "imagePrompt": "A large celestial creature with divine and angelic features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "celestial",
      "large",
      "lawful-good",
      "celestial",
      "good"
    ]
  }
];
