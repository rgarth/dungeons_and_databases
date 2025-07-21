import { Monster } from '../../types/monster';

export const elementalMonsters: Monster[] = [
  {
    "name": "Air Elemental",
    "size": "Large",
    "type": "elemental",
    "alignment": "neutral",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 14,
    "dexterity": 20,
    "constitution": 14,
    "intelligence": 6,
    "wisdom": 10,
    "charisma": 6,
    "armorClass": 15,
    "armorType": "dex",
    "hitPoints": 90,
    "hitDice": "12d10",
    "speed": {
      "fly": 90,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "lightning",
      "thunder",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
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
      "Auran"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Air Form",
        "description": "The elemental can enter a hostile creature's space and stop there. It can move through a space as narrow as 1 inch wide without squeezing."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The elemental makes two slam attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage.",
        "attackBonus": 8,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8 + 5",
          "average": 14
        }
      },
      {
        "name": "Whirlwind",
        "description": "Each creature in the elemental's space must make a DC 13 Strength saving throw. On a failure, a target takes 15 (3d8 + 2) bludgeoning damage and is flung up 20 feet away from the elemental in a random direction and knocked prone. If a thrown target strikes an object, such as a wall or floor, the target takes 3 (1d6) bludgeoning damage for every 10 feet it was thrown. If the target is thrown at another creature, that creature must succeed on a DC 13 Dexterity saving throw or take the same damage and be knocked prone.\nIf the saving throw is successful, the target takes half the bludgeoning damage and isn't flung away or knocked prone.",
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d8 + 2",
          "average": 15
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "elemental",
      "large",
      "neutral"
    ]
  },
  {
    "name": "Azer",
    "size": "Medium",
    "type": "elemental",
    "alignment": "lawful neutral",
    "challengeRating": "2",
    "xp": 450,
    "strength": 17,
    "dexterity": 12,
    "constitution": 15,
    "intelligence": 12,
    "wisdom": 13,
    "charisma": 10,
    "armorClass": 15,
    "armorType": "natural",
    "hitPoints": 39,
    "hitDice": "6d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "fire",
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
      "passivePerception": 11
    },
    "languages": [
      "Ignan"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Heated Body",
        "description": "A creature that touches the azer or hits it with a melee attack while within 5 ft. of it takes 5 (1d10) fire damage."
      },
      {
        "name": "Heated Weapons",
        "description": "When the azer hits with a metal melee weapon, it deals an extra 3 (1d6) fire damage (included in the attack)."
      },
      {
        "name": "Illumination",
        "description": "The azer sheds bright light in a 10-foot radius and dim light for an additional 10 ft.."
      }
    ],
    "actions": [
      {
        "name": "Warhammer",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage, or 8 (1d10 + 3) bludgeoning damage if used with two hands to make a melee attack, plus 3 (1d6) fire damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d8 + 3",
          "average": 7,
          "description": "One-handed"
        },
        "secondaryDamage": {
          "type": "Bludgeoning",
          "roll": "1d10 + 3",
          "average": 8,
          "description": "Two-handed"
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "elemental",
      "medium",
      "lawful neutral"
    ]
  },
  {
    "name": "Djinni",
    "size": "Large",
    "type": "elemental",
    "alignment": "chaotic good",
    "challengeRating": "11",
    "xp": 7200,
    "strength": 21,
    "dexterity": 15,
    "constitution": 22,
    "intelligence": 15,
    "wisdom": 16,
    "charisma": 20,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 161,
    "hitDice": "14d10",
    "speed": {
      "walk": 30,
      "fly": 90,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "lightning",
      "thunder"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 120,
      "passivePerception": 13
    },
    "languages": [
      "Auran"
    ],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Elemental Demise",
        "description": "If the djinni dies, its body disintegrates into a warm breeze, leaving behind only equipment the djinni was wearing or carrying."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The djinni's innate spellcasting ability is Charisma (spell save DC 17, +9 to hit with spell attacks). It can innately cast the following spells, requiring no material components:\n\nAt will: detect evil and good, detect magic, thunderwave\n3/day each: create food and water (can create wine instead of water), tongues, wind walk\n1/day each: conjure elemental (air elemental only), creation, gaseous form, invisibility, major image, plane shift"
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The djinni makes three scimitar attacks."
      },
      {
        "name": "Scimitar",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage plus 3 (1d6) lightning or thunder damage (djinni's choice).",
        "attackBonus": 9,
        "damage": {
          "type": "Slashing",
          "roll": "2d6 + 5",
          "average": 12
        }
      },
      {
        "name": "Create Whirlwind",
        "description": "A 5-foot-radius, 30-foot-tall cylinder of swirling air magically forms on a point the djinni can see within 120 feet of it. The whirlwind lasts as long as the djinni maintains concentration (as if concentrating on a spell). Any creature but the djinni that enters the whirlwind must succeed on a DC 18 Strength saving throw or be restrained by it. The djinni can move the whirlwind up to 60 feet as an action, and creatures restrained by the whirlwind move with it. The whirlwind ends if the djinni loses sight of it.\nA creature can use its action to free a creature restrained by the whirlwind, including itself, by succeeding on a DC 18 Strength check. If the check succeeds, the creature is no longer restrained and moves to the nearest space outside the whirlwind."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "elemental",
      "large",
      "chaotic good"
    ]
  },
  {
    "name": "Dust Mephit",
    "size": "Small",
    "type": "elemental",
    "alignment": "neutral evil",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 5,
    "dexterity": 14,
    "constitution": 10,
    "intelligence": 9,
    "wisdom": 11,
    "charisma": 10,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 17,
    "hitDice": "5d6",
    "speed": {
      "walk": 30,
      "fly": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 2,
      "Stealth": 4
    },
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
    "damageVulnerabilities": [
      "fire"
    ],
    "senses": {
      "darkvision": 60,
      "passivePerception": 12
    },
    "languages": [
      "Auran",
      "Terran"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "When the mephit dies, it explodes in a burst of dust. Each creature within 5 ft. of it must then succeed on a DC 10 Constitution saving throw or be blinded for 1 minute. A blinded creature can repeat the saving throw on each of its turns, ending the effect on itself on a success."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The mephit can innately cast sleep, requiring no material components. Its innate spellcasting ability is Charisma."
      }
    ],
    "actions": [
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) slashing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Slashing",
          "roll": "1d4 + 2",
          "average": 4
        }
      },
      {
        "name": "Blinding Breath",
        "description": "The mephit exhales a 15-foot cone of blinding dust. Each creature in that area must succeed on a DC 10 Dexterity saving throw or be blinded for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "elemental",
      "small",
      "neutral evil"
    ]
  },
  {
    "name": "Earth Elemental",
    "size": "Large",
    "type": "elemental",
    "alignment": "neutral",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 20,
    "dexterity": 8,
    "constitution": 20,
    "intelligence": 5,
    "wisdom": 10,
    "charisma": 5,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 126,
    "hitDice": "12d10",
    "speed": {
      "walk": 30,
      "burrow": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning, piercing, and slashing from nonmagical weapons"
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
        "index": "unconscious",
        "name": "Unconscious",
        "url": "/api/2014/conditions/unconscious"
      }
    ],
    "damageVulnerabilities": [
      "thunder"
    ],
    "senses": {
      "darkvision": 60,
      "tremorsense": 60,
      "passivePerception": 10
    },
    "languages": [
      "Terran"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Earth Glide",
        "description": "The elemental can burrow through nonmagical, unworked earth and stone. While doing so, the elemental doesn't disturb the material it moves through."
      },
      {
        "name": "Siege Monster",
        "description": "The elemental deals double damage to objects and structures."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The elemental makes two slam attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage.",
        "attackBonus": 8,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8 + 5",
          "average": 14
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "elemental",
      "large",
      "neutral"
    ]
  },
  {
    "name": "Efreeti",
    "size": "Large",
    "type": "elemental",
    "alignment": "lawful evil",
    "challengeRating": "11",
    "xp": 7200,
    "strength": 22,
    "dexterity": 12,
    "constitution": 24,
    "intelligence": 16,
    "wisdom": 15,
    "charisma": 16,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 200,
    "hitDice": "16d10",
    "speed": {
      "walk": 40,
      "fly": 60,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 120,
      "passivePerception": 12
    },
    "languages": [
      "Ignan"
    ],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Elemental Demise",
        "description": "If the efreeti dies, its body disintegrates in a flash of fire and puff of smoke, leaving behind only equipment the djinni was wearing or carrying."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The efreeti's innate spell casting ability is Charisma (spell save DC 15, +7 to hit with spell attacks). It can innately cast the following spells, requiring no material components:\n\nAt will: detect magic\n3/day: enlarge/reduce, tongues\n1/day each: conjure elemental (fire elemental only), gaseous form, invisibility, major image, plane shift, wall of fire"
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The efreeti makes two scimitar attacks or uses its Hurl Flame twice."
      },
      {
        "name": "Scimitar",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage plus 7 (2d6) fire damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Slashing",
          "roll": "2d6 + 6",
          "average": 13
        },
        "secondaryDamage": {
          "type": "Fire",
          "roll": "2d6",
          "average": 7,
          "description": "Additional"
        }
      },
      {
        "name": "Hurl Flame",
        "description": "Ranged Spell Attack: +7 to hit, range 120 ft., one target. Hit: 17 (5d6) fire damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Fire",
          "roll": "5d6",
          "average": 17
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "elemental",
      "large",
      "lawful evil"
    ]
  },
  {
    "name": "Fire Elemental",
    "size": "Large",
    "type": "elemental",
    "alignment": "neutral",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 10,
    "dexterity": 17,
    "constitution": 16,
    "intelligence": 6,
    "wisdom": 10,
    "charisma": 7,
    "armorClass": 13,
    "armorType": "dex",
    "hitPoints": 102,
    "hitDice": "12d10",
    "speed": {
      "walk": 50,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [
      "fire",
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
      "Ignan"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Fire Form",
        "description": "The elemental can move through a space as narrow as 1 inch wide without squeezing. A creature that touches the elemental or hits it with a melee attack while within 5 ft. of it takes 5 (1d10) fire damage. In addition, the elemental can enter a hostile creature's space and stop there. The first time it enters a creature's space on a turn, that creature takes 5 (1d10) fire damage and catches fire; until someone takes an action to douse the fire, the creature takes 5 (1d10) fire damage at the start of each of its turns."
      },
      {
        "name": "Illumination",
        "description": "The elemental sheds bright light in a 30-foot radius and dim light in an additional 30 ft.."
      },
      {
        "name": "Water Susceptibility",
        "description": "For every 5 ft. the elemental moves in water, or for every gallon of water splashed on it, it takes 1 cold damage."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The elemental makes two touch attacks."
      },
      {
        "name": "Touch",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) fire damage. If the target is a creature or a flammable object, it ignites. Until a creature takes an action to douse the fire, the target takes 5 (1d10) fire damage at the start of each of its turns.",
        "attackBonus": 6,
        "damage": {
          "type": "Fire",
          "roll": "2d6 + 3",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "elemental",
      "large",
      "neutral"
    ]
  },
  {
    "name": "Gargoyle",
    "size": "Medium",
    "type": "elemental",
    "alignment": "chaotic evil",
    "challengeRating": "2",
    "xp": 450,
    "strength": 15,
    "dexterity": 11,
    "constitution": 16,
    "intelligence": 6,
    "wisdom": 11,
    "charisma": 7,
    "armorClass": 15,
    "armorType": "natural",
    "hitPoints": 52,
    "hitDice": "7d8",
    "speed": {
      "walk": 30,
      "fly": 60,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't adamantine"
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
        "index": "petrified",
        "name": "Petrified",
        "url": "/api/2014/conditions/petrified"
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
      "passivePerception": 10
    },
    "languages": [
      "Terran"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the gargoyle remains motion less, it is indistinguishable from an inanimate statue."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The gargoyle makes two attacks: one with its bite and one with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d6 + 2",
          "average": 5
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Slashing",
          "roll": "1d6 + 2",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "elemental",
      "medium",
      "chaotic evil"
    ]
  },
  {
    "name": "Ice Mephit",
    "size": "Small",
    "type": "elemental",
    "alignment": "neutral evil",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 7,
    "dexterity": 13,
    "constitution": 10,
    "intelligence": 9,
    "wisdom": 11,
    "charisma": 12,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 21,
    "hitDice": "6d6",
    "speed": {
      "walk": 30,
      "fly": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 2,
      "Stealth": 3
    },
    "damageResistances": [],
    "damageImmunities": [
      "cold",
      "poison"
    ],
    "conditionImmunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "damageVulnerabilities": [
      "bludgeoning",
      "fire"
    ],
    "senses": {
      "darkvision": 60,
      "passivePerception": 12
    },
    "languages": [
      "Aquan",
      "Auran"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "When the mephit dies, it explodes in a burst of jagged ice. Each creature within 5 ft. of it must make a DC 10 Dexterity saving throw, taking 4 (1d8) slashing damage on a failed save, or half as much damage on a successful one."
      },
      {
        "name": "False Appearance",
        "description": "While the mephit remains motionless, it is indistinguishable from an ordinary shard of ice."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The mephit can innately cast fog cloud, requiring no material components. Its innate spellcasting ability is Charisma."
      }
    ],
    "actions": [
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 3 (1d4 + 1) slashing damage plus 2 (1d4) cold damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Slashing",
          "roll": "1d4 + 1",
          "average": 3
        },
        "secondaryDamage": {
          "type": "Cold",
          "roll": "1d4",
          "average": 2,
          "description": "Additional"
        }
      },
      {
        "name": "Frost Breath",
        "description": "The mephit exhales a 15-foot cone of cold air. Each creature in that area must succeed on a DC 10 Dexterity saving throw, taking 5 (2d4) cold damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Cold",
          "roll": "2d4",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "elemental",
      "small",
      "neutral evil"
    ]
  },
  {
    "name": "Invisible Stalker",
    "size": "Medium",
    "type": "elemental",
    "alignment": "neutral",
    "challengeRating": "6",
    "xp": 2300,
    "strength": 16,
    "dexterity": 19,
    "constitution": 14,
    "intelligence": 10,
    "wisdom": 15,
    "charisma": 11,
    "armorClass": 14,
    "armorType": "dex",
    "hitPoints": 104,
    "hitDice": "16d8",
    "speed": {
      "walk": 50,
      "fly": 50,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 8,
      "Stealth": 10
    },
    "damageResistances": [
      "bludgeoning, piercing, and slashing from nonmagical weapons"
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
      "passivePerception": 18
    },
    "languages": [
      "Auran",
      "understands Common but doesn't speak it"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Invisibility",
        "description": "The stalker is invisible."
      },
      {
        "name": "Faultless Tracker",
        "description": "The stalker is given a quarry by its summoner. The stalker knows the direction and distance to its quarry as long as the two of them are on the same plane of existence. The stalker also knows the location of its summoner."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The stalker makes two slam attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d6 + 3",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "elemental",
      "medium",
      "neutral"
    ]
  },
  {
    "name": "Magma Mephit",
    "size": "Small",
    "type": "elemental",
    "alignment": "neutral evil",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 8,
    "dexterity": 12,
    "constitution": 12,
    "intelligence": 7,
    "wisdom": 10,
    "charisma": 10,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 22,
    "hitDice": "5d6",
    "speed": {
      "walk": 30,
      "fly": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Stealth": 3
    },
    "damageResistances": [],
    "damageImmunities": [
      "fire",
      "poison"
    ],
    "conditionImmunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "damageVulnerabilities": [
      "cold"
    ],
    "senses": {
      "darkvision": 60,
      "passivePerception": 10
    },
    "languages": [
      "Ignan",
      "Terran"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "When the mephit dies, it explodes in a burst of lava. Each creature within 5 ft. of it must make a DC 11 Dexterity saving throw, taking 7 (2d6) fire damage on a failed save, or half as much damage on a successful one."
      },
      {
        "name": "False Appearance",
        "description": "While the mephit remains motionless, it is indistinguishable from an ordinary mound of magma."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The mephit can innately cast heat metal (spell save DC 10), requiring no material components. Its innate spellcasting ability is Charisma."
      }
    ],
    "actions": [
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 3 (1d4 + 1) slashing damage plus 2 (1d4) fire damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Slashing",
          "roll": "1d4 + 1",
          "average": 3
        },
        "secondaryDamage": {
          "type": "Fire",
          "roll": "1d4",
          "average": 2,
          "description": "Additional"
        }
      },
      {
        "name": "Fire Breath",
        "description": "The mephit exhales a 15-foot cone of fire. Each creature in that area must make a DC 11 Dexterity saving throw, taking 7 (2d6) fire damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Fire",
          "roll": "2d6",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "elemental",
      "small",
      "neutral evil"
    ]
  },
  {
    "name": "Magmin",
    "size": "Small",
    "type": "elemental",
    "alignment": "chaotic neutral",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 7,
    "dexterity": 15,
    "constitution": 12,
    "intelligence": 8,
    "wisdom": 11,
    "charisma": 10,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 9,
    "hitDice": "2d6",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 10
    },
    "languages": [
      "Ignan"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "When the magmin dies, it explodes in a burst of fire and magma. Each creature within 10 ft. of it must make a DC 11 Dexterity saving throw, taking 7 (2d6) fire damage on a failed save, or half as much damage on a successful one. Flammable objects that aren't being worn or carried in that area are ignited."
      },
      {
        "name": "Ignited Illumination",
        "description": "As a bonus action, the magmin can set itself ablaze or extinguish its flames. While ablaze, the magmin sheds bright light in a 10-foot radius and dim light for an additional 10 ft."
      }
    ],
    "actions": [
      {
        "name": "Touch",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d6) fire damage. If the target is a creature or a flammable object, it ignites. Until a target takes an action to douse the fire, the target takes 3 (1d6) fire damage at the end of each of its turns.",
        "attackBonus": 4,
        "damage": {
          "type": "Fire",
          "roll": "2d6",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "elemental",
      "small",
      "chaotic neutral"
    ]
  },
  {
    "name": "Salamander",
    "size": "Large",
    "type": "elemental",
    "alignment": "neutral evil",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 18,
    "dexterity": 14,
    "constitution": 15,
    "intelligence": 11,
    "wisdom": 10,
    "charisma": 12,
    "armorClass": 15,
    "armorType": "natural",
    "hitPoints": 90,
    "hitDice": "12d10",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [
      "cold"
    ],
    "senses": {
      "darkvision": 60,
      "passivePerception": 10
    },
    "languages": [
      "Ignan"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Heated Body",
        "description": "A creature that touches the salamander or hits it with a melee attack while within 5 ft. of it takes 7 (2d6) fire damage."
      },
      {
        "name": "Heated Weapons",
        "description": "Any metal melee weapon the salamander wields deals an extra 3 (1d6) fire damage on a hit (included in the attack)."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The salamander makes two attacks: one with its spear and one with its tail."
      },
      {
        "name": "Spear",
        "description": "Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20 ft./60 ft., one target. Hit: 11 (2d6 + 4) piercing damage, or 13 (2d8 + 4) piercing damage if used with two hands to make a melee attack, plus 3 (1d6) fire damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "2d6 + 4",
          "average": 11,
          "description": "One-handed"
        },
        "secondaryDamage": {
          "type": "Piercing",
          "roll": "2d8 + 4",
          "average": 13,
          "description": "Two-handed"
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage plus 7 (2d6) fire damage, and the target is grappled (escape DC 14). Until this grapple ends, the target is restrained, the salamander can automatically hit the target with its tail, and the salamander can't make tail attacks against other targets.",
        "attackBonus": 7,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d6 + 4",
          "average": 11
        },
        "secondaryDamage": {
          "type": "Fire",
          "roll": "2d6",
          "average": 7,
          "description": "Additional"
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "elemental",
      "large",
      "neutral evil"
    ]
  },
  {
    "name": "Steam Mephit",
    "size": "Small",
    "type": "elemental",
    "alignment": "neutral evil",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 5,
    "dexterity": 11,
    "constitution": 10,
    "intelligence": 11,
    "wisdom": 10,
    "charisma": 12,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 21,
    "hitDice": "6d6",
    "speed": {
      "walk": 30,
      "fly": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "fire",
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
      "passivePerception": 10
    },
    "languages": [
      "Aquan",
      "Ignan"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Death Burst",
        "description": "When the mephit dies, it explodes in a cloud of steam. Each creature within 5 ft. of the mephit must succeed on a DC 10 Dexterity saving throw or take 4 (1d8) fire damage."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The mephit can innately cast blur, requiring no material components. Its innate spellcasting ability is Charisma."
      }
    ],
    "actions": [
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one creature. Hit: 2 (1d4) slashing damage plus 2 (1d4) fire damage.",
        "attackBonus": 2,
        "damage": {
          "type": "Slashing",
          "roll": "1d4",
          "average": 2
        },
        "secondaryDamage": {
          "type": "Fire",
          "roll": "1d4",
          "average": 2,
          "description": "Additional"
        }
      },
      {
        "name": "Steam Breath",
        "description": "The mephit exhales a 15-foot cone of scalding steam. Each creature in that area must succeed on a DC 10 Dexterity saving throw, taking 4 (1d8) fire damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Fire",
          "roll": "1d8",
          "average": 4
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "elemental",
      "small",
      "neutral evil"
    ]
  },
  {
    "name": "Water Elemental",
    "size": "Large",
    "type": "elemental",
    "alignment": "neutral",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 18,
    "dexterity": 14,
    "constitution": 18,
    "intelligence": 5,
    "wisdom": 10,
    "charisma": 8,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 114,
    "hitDice": "12d10",
    "speed": {
      "walk": 30,
      "swim": 90,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "acid",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
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
      "Aquan"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Water Form",
        "description": "The elemental can enter a hostile creature's space and stop there. It can move through a space as narrow as 1 inch wide without squeezing."
      },
      {
        "name": "Freeze",
        "description": "If the elemental takes cold damage, it partially freezes; its speed is reduced by 20 ft. until the end of its next turn."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The elemental makes two slam attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8 + 4",
          "average": 13
        }
      },
      {
        "name": "Whelm",
        "description": "Each creature in the elemental's space must make a DC 15 Strength saving throw. On a failure, a target takes 13 (2d8 + 4) bludgeoning damage. If it is Large or smaller, it is also grappled (escape DC 14). Until this grapple ends, the target is restrained and unable to breathe unless it can breathe water. If the saving throw is successful, the target is pushed out of the elemental's space.\nThe elemental can grapple one Large creature or up to two Medium or smaller creatures at one time. At the start of each of the elemental's turns, each target grappled by it takes 13 (2d8 + 4) bludgeoning damage. A creature within 5 feet of the elemental can pull a creature or object out of it by taking an action to make a DC 14 Strength and succeeding.",
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
      "elemental",
      "large",
      "neutral"
    ]
  },
  {
    "name": "Xorn",
    "size": "Medium",
    "type": "elemental",
    "alignment": "neutral",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 17,
    "dexterity": 10,
    "constitution": 22,
    "intelligence": 11,
    "wisdom": 10,
    "charisma": 11,
    "armorClass": 19,
    "armorType": "natural",
    "hitPoints": 73,
    "hitDice": "7d8",
    "speed": {
      "walk": 20,
      "burrow": 20,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 6,
      "Stealth": 3
    },
    "damageResistances": [
      "piercing and slashing from nonmagical weapons that aren't adamantine"
    ],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "tremorsense": 60,
      "passivePerception": 16
    },
    "languages": [
      "Terran"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Earth Glide",
        "description": "The xorn can burrow through nonmagical, unworked earth and stone. While doing so, the xorn doesn't disturb the material it moves through."
      },
      {
        "name": "Stone Camouflage",
        "description": "The xorn has advantage on Dexterity (Stealth) checks made to hide in rocky terrain."
      },
      {
        "name": "Treasure Sense",
        "description": "The xorn can pinpoint, by scent, the location of precious metals and stones, such as coins and gems, within 60 ft. of it."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The xorn makes three claw attacks and one bite attack."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (3d6 + 3) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "3d6 + 3",
          "average": 13
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Slashing",
          "roll": "1d6 + 3",
          "average": 6
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "elemental",
      "medium",
      "neutral"
    ]
  }
];
