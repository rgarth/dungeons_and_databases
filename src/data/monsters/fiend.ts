import { Monster } from '../../types/monster';

export const fiendMonsters: Monster[] = [
  {
    "name": "Balor",
    "size": "Huge",
    "type": "fiend",
    "alignment": "chaotic evil",
    "challengeRating": "19",
    "xp": 22000,
    "strength": 26,
    "dexterity": 15,
    "constitution": 22,
    "intelligence": 20,
    "wisdom": 16,
    "charisma": 22,
    "armorClass": 19,
    "armorType": "natural",
    "hitPoints": 262,
    "hitDice": "21d12",
    "speed": {
      "walk": 40,
      "fly": 80,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "cold",
      "lightning",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
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
      "truesight": 120,
      "passivePerception": 13
    },
    "languages": [
      "Abyssal",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Death Throes",
        "description": "When the balor dies, it explodes, and each creature within 30 feet of it must make a DC 20 Dexterity saving throw, taking 70 (20d6) fire damage on a failed save, or half as much damage on a successful one. The explosion ignites flammable objects in that area that aren't being worn or carried, and it destroys the balor's weapons."
      },
      {
        "name": "Fire Aura",
        "description": "At the start of each of the balor's turns, each creature within 5 feet of it takes 10 (3d6) fire damage, and flammable objects in the aura that aren't being worn or carried ignite. A creature that touches the balor or hits it with a melee attack while within 5 feet of it takes 10 (3d6) fire damage."
      },
      {
        "name": "Magic Resistance",
        "description": "The balor has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The balor's weapon attacks are magical."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The balor makes two attacks: one with its longsword and one with its whip."
      },
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 21 (3d8 + 8) slashing damage plus 13 (3d8) lightning damage. If the balor scores a critical hit, it rolls damage dice three times, instead of twice.",
        "attackBonus": 14,
        "damage": {
          "type": "Slashing",
          "roll": "3d8 + 8",
          "average": 21
        },
        "secondaryDamage": {
          "type": "Lightning",
          "roll": "3d8",
          "average": 13,
          "description": "Additional"
        }
      },
      {
        "name": "Whip",
        "description": "Melee Weapon Attack: +14 to hit, reach 30 ft., one target. Hit: 15 (2d6 + 8) slashing damage plus 10 (3d6) fire damage, and the target must succeed on a DC 20 Strength saving throw or be pulled up to 25 feet toward the balor.",
        "attackBonus": 14,
        "damage": {
          "type": "Slashing",
          "roll": "2d6 + 8",
          "average": 15
        },
        "secondaryDamage": {
          "type": "Fire",
          "roll": "3d6",
          "average": 10,
          "description": "Additional"
        }
      },
      {
        "name": "Teleport",
        "description": "The balor magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "huge",
      "chaotic evil"
    ]
  },
  {
    "name": "Barbed Devil",
    "size": "Medium",
    "type": "fiend",
    "alignment": "lawful evil",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 16,
    "dexterity": 17,
    "constitution": 18,
    "intelligence": 12,
    "wisdom": 14,
    "charisma": 14,
    "armorClass": 15,
    "armorType": "natural",
    "hitPoints": 110,
    "hitDice": "13d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Deception": 5,
      "Insight": 5,
      "Perception": 8
    },
    "damageResistances": [
      "cold",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
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
      "darkvision": 120,
      "passivePerception": 18
    },
    "languages": [
      "Infernal",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Barbed Hide",
        "description": "At the start of each of its turns, the barbed devil deals 5 (1d10) piercing damage to any creature grappling it."
      },
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The devil makes three melee attacks: one with its tail and two with its claws. Alternatively, it can use Hurl Flame twice."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d6 + 3",
          "average": 6
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "2d6 + 3",
          "average": 10
        }
      },
      {
        "name": "Hurl Flame",
        "description": "Ranged Spell Attack: +5 to hit, range 150 ft., one target. Hit: 10 (3d6) fire damage. If the target is a flammable object that isn't being worn or carried, it also catches fire.",
        "attackBonus": 5,
        "damage": {
          "type": "Fire",
          "roll": "3d6",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Bearded Devil",
    "size": "Medium",
    "type": "fiend",
    "alignment": "lawful evil",
    "challengeRating": "3",
    "xp": 700,
    "strength": 16,
    "dexterity": 15,
    "constitution": 15,
    "intelligence": 9,
    "wisdom": 11,
    "charisma": 11,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 52,
    "hitDice": "8d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "cold",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
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
      "darkvision": 120,
      "passivePerception": 10
    },
    "languages": [
      "Infernal",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Steadfast",
        "description": "The devil can't be frightened while it can see an allied creature within 30 feet of it."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The devil makes two attacks: one with its beard and one with its glaive."
      },
      {
        "name": "Beard",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) piercing damage, and the target must succeed on a DC 12 Constitution saving throw or be poisoned for 1 minute. While poisoned in this way, the target can't regain hit points. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d8 + 2",
          "average": 6
        }
      },
      {
        "name": "Glaive",
        "description": "Melee Weapon Attack: +5 to hit, reach 10 ft., one target. Hit: 8 (1d10 + 3) slashing damage. If the target is a creature other than an undead or a construct, it must succeed on a DC 12 Constitution saving throw or lose 5 (1d10) hit points at the start of each of its turns due to an infernal wound. Each time the devil hits the wounded target with this attack, the damage dealt by the wound increases by 5 (1d10). Any creature can take an action to stanch the wound with a successful DC 12 Wisdom (Medicine) check. The wound also closes if the target receives magical healing.",
        "attackBonus": 5,
        "damage": {
          "type": "Slashing",
          "roll": "1d10 + 3",
          "average": 8
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Bone Devil",
    "size": "Large",
    "type": "fiend",
    "alignment": "lawful evil",
    "challengeRating": "9",
    "xp": 5000,
    "strength": 18,
    "dexterity": 16,
    "constitution": 18,
    "intelligence": 13,
    "wisdom": 14,
    "charisma": 16,
    "armorClass": 19,
    "armorType": "natural",
    "hitPoints": 142,
    "hitDice": "15d10",
    "speed": {
      "walk": 40,
      "fly": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Deception": 7,
      "Insight": 6
    },
    "damageResistances": [
      "cold",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
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
      "darkvision": 120,
      "passivePerception": 12
    },
    "languages": [
      "Infernal",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The devil makes three attacks: two with its claws and one with its sting."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 8 (1d8 + 4) slashing damage.",
        "attackBonus": 8,
        "damage": {
          "type": "Slashing",
          "roll": "1d8 + 4",
          "average": 8
        }
      },
      {
        "name": "Sting",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) piercing damage plus 17 (5d6) poison damage, and the target must succeed on a DC 14 Constitution saving throw or become poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "attackBonus": 8,
        "damage": {
          "type": "Piercing",
          "roll": "2d8 + 4",
          "average": 13
        },
        "secondaryDamage": {
          "type": "Poison",
          "roll": "5d6",
          "average": 17,
          "description": "Additional"
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "large",
      "lawful evil"
    ]
  },
  {
    "name": "Chain Devil",
    "size": "Medium",
    "type": "fiend",
    "alignment": "lawful evil",
    "challengeRating": "8",
    "xp": 3900,
    "strength": 18,
    "dexterity": 15,
    "constitution": 18,
    "intelligence": 11,
    "wisdom": 12,
    "charisma": 14,
    "armorClass": 16,
    "armorType": "natural",
    "hitPoints": 85,
    "hitDice": "10d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "cold",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
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
      "darkvision": 120,
      "passivePerception": 11
    },
    "languages": [
      "Infernal",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The devil makes two attacks with its chains."
      },
      {
        "name": "Chain",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) slashing damage. The target is grappled (escape DC 14) if the devil isn't already grappling a creature. Until this grapple ends, the target is restrained and takes 7 (2d6) piercing damage at the start of each of its turns.",
        "attackBonus": 8,
        "damage": {
          "type": "Slashing",
          "roll": "2d6 + 4",
          "average": 11
        }
      },
      {
        "name": "Animate Chains",
        "description": "Up to four chains the devil can see within 60 feet of it magically sprout razor-edged barbs and animate under the devil's control, provided that the chains aren't being worn or carried.\nEach animated chain is an object with AC 20, 20 hit points, resistance to piercing damage, and immunity to psychic and thunder damage. When the devil uses Multiattack on its turn, it can use each animated chain to make one additional chain attack. An animated chain can grapple one creature of its own but can't make attacks while grappling. An animated chain reverts to its inanimate state if reduced to 0 hit points or if the devil is incapacitated or dies."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Dretch",
    "size": "Small",
    "type": "fiend",
    "alignment": "chaotic evil",
    "challengeRating": "0.25",
    "xp": 25,
    "strength": 11,
    "dexterity": 11,
    "constitution": 12,
    "intelligence": 5,
    "wisdom": 8,
    "charisma": 3,
    "armorClass": 11,
    "armorType": "natural",
    "hitPoints": 18,
    "hitDice": "4d6",
    "speed": {
      "walk": 20,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "cold",
      "fire",
      "lightning"
    ],
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
      "passivePerception": 9
    },
    "languages": [
      "Abyssal",
      "telepathy 60 ft. (works only with creatures that understand Abyssal)"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dretch makes two attacks: one with its bite and one with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) piercing damage.",
        "attackBonus": 2,
        "damage": {
          "type": "Piercing",
          "roll": "1d6",
          "average": 3
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 5 (2d4) slashing damage.",
        "attackBonus": 2,
        "damage": {
          "type": "Slashing",
          "roll": "2d4",
          "average": 5
        }
      },
      {
        "name": "Fetid Cloud",
        "description": "A 10-foot radius of disgusting green gas extends out from the dretch. The gas spreads around corners, and its area is lightly obscured. It lasts for 1 minute or until a strong wind disperses it. Any creature that starts its turn in that area must succeed on a DC 11 Constitution saving throw or be poisoned until the start of its next turn. While poisoned in this way, the target can take either an action or a bonus action on its turn, not both, and can't take reactions."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "small",
      "chaotic evil"
    ]
  },
  {
    "name": "Erinyes",
    "size": "Medium",
    "type": "fiend",
    "alignment": "lawful evil",
    "challengeRating": "12",
    "xp": 8400,
    "strength": 18,
    "dexterity": 16,
    "constitution": 18,
    "intelligence": 14,
    "wisdom": 14,
    "charisma": 18,
    "armorClass": 18,
    "armorType": "armor",
    "hitPoints": 153,
    "hitDice": "18d8",
    "speed": {
      "walk": 30,
      "fly": 60,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "cold",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
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
      "truesight": 120,
      "passivePerception": 12
    },
    "languages": [
      "Infernal",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Hellish Weapons",
        "description": "The erinyes's weapon attacks are magical and deal an extra 13 (3d8) poison damage on a hit (included in the attacks)."
      },
      {
        "name": "Magic Resistance",
        "description": "The erinyes has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The erinyes makes three attacks"
      },
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands, plus 13 (3d8) poison damage.",
        "attackBonus": 8,
        "damage": {
          "type": "Slashing",
          "roll": "1d8 + 4",
          "average": 8,
          "description": "One-handed"
        },
        "secondaryDamage": {
          "type": "Slashing",
          "roll": "1d10 + 4",
          "average": 9,
          "description": "Two-handed"
        }
      },
      {
        "name": "Longbow",
        "description": "Ranged Weapon Attack: +7 to hit, range 150/600 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 13 (3d8) poison damage, and the target must succeed on a DC 14 Constitution saving throw or be poisoned. The poison lasts until it is removed by the lesser restoration spell or similar magic.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "1d8 + 3",
          "average": 7
        },
        "secondaryDamage": {
          "type": "Poison",
          "roll": "3d8",
          "average": 13,
          "description": "Additional"
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Glabrezu",
    "size": "Large",
    "type": "fiend",
    "alignment": "chaotic evil",
    "challengeRating": "9",
    "xp": 5000,
    "strength": 20,
    "dexterity": 15,
    "constitution": 21,
    "intelligence": 19,
    "wisdom": 17,
    "charisma": 16,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 157,
    "hitDice": "15d10",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "cold",
      "fire",
      "lightning",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
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
      "truesight": 120,
      "passivePerception": 13
    },
    "languages": [
      "Abyssal",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Innate Spellcasting",
        "description": "The glabrezu's spellcasting ability is Intelligence (spell save DC 16). The glabrezu can innately cast the following spells, requiring no material components:\nAt will: darkness, detect magic, dispel magic\n1/day each: confusion, fly, power word stun"
      },
      {
        "name": "Magic Resistance",
        "description": "The glabrezu has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The glabrezu makes four attacks: two with its pincers and two with its fists. Alternatively, it makes two attacks with its pincers and casts one spell."
      },
      {
        "name": "Pincer",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 16 (2d10 + 5) bludgeoning damage. If the target is a Medium or smaller creature, it is grappled (escape DC 15). The glabrezu has two pincers, each of which can grapple only one target.",
        "attackBonus": 9,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d10 + 5",
          "average": 16
        }
      },
      {
        "name": "Fist",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) bludgeoning damage.",
        "attackBonus": 9,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d4 + 2",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "large",
      "chaotic evil"
    ]
  },
  {
    "name": "Hell Hound",
    "size": "Medium",
    "type": "fiend",
    "alignment": "lawful evil",
    "challengeRating": "3",
    "xp": 700,
    "strength": 17,
    "dexterity": 12,
    "constitution": 14,
    "intelligence": 6,
    "wisdom": 13,
    "charisma": 6,
    "armorClass": 15,
    "armorType": "natural",
    "hitPoints": 45,
    "hitDice": "7d8",
    "speed": {
      "walk": 50,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 5
    },
    "damageResistances": [],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 15
    },
    "languages": [
      "understands Infernal but can't speak it"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The hound has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The hound has advantage on an attack roll against a creature if at least one of the hound's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 7 (2d6) fire damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d8 + 3",
          "average": 7
        },
        "secondaryDamage": {
          "type": "Fire",
          "roll": "2d6",
          "average": 7,
          "description": "Additional"
        }
      },
      {
        "name": "Fire Breath",
        "description": "The hound exhales fire in a 15-foot cone. Each creature in that area must make a DC 12 Dexterity saving throw, taking 21 (6d6) fire damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Fire",
          "roll": "6d6",
          "average": 21
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Hezrou",
    "size": "Large",
    "type": "fiend",
    "alignment": "chaotic evil",
    "challengeRating": "8",
    "xp": 3900,
    "strength": 19,
    "dexterity": 17,
    "constitution": 20,
    "intelligence": 5,
    "wisdom": 12,
    "charisma": 13,
    "armorClass": 16,
    "armorType": "natural",
    "hitPoints": 136,
    "hitDice": "13d10",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "cold",
      "fire",
      "lightning",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
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
      "darkvision": 120,
      "passivePerception": 11
    },
    "languages": [
      "Abyssal",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The hezrou has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Stench",
        "description": "Any creature that starts its turn within 10 feet of the hezrou must succeed on a DC 14 Constitution saving throw or be poisoned until the start of its next turn. On a successful saving throw, the creature is immune to the hezrou's stench for 24 hours."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The hezrou makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 15 (2d10 + 4) piercing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "2d10 + 4",
          "average": 15
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Slashing",
          "roll": "2d6 + 4",
          "average": 11
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "large",
      "chaotic evil"
    ]
  },
  {
    "name": "Horned Devil",
    "size": "Large",
    "type": "fiend",
    "alignment": "lawful evil",
    "challengeRating": "11",
    "xp": 7200,
    "strength": 22,
    "dexterity": 17,
    "constitution": 21,
    "intelligence": 12,
    "wisdom": 16,
    "charisma": 17,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 178,
    "hitDice": "17d10",
    "speed": {
      "walk": 20,
      "fly": 60,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "cold",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
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
      "darkvision": 120,
      "passivePerception": 13
    },
    "languages": [
      "Infernal",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The devil makes three melee attacks: two with its fork and one with its tail. It can use Hurl Flame in place of any melee attack."
      },
      {
        "name": "Fork",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 15 (2d8 + 6) piercing damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Piercing",
          "roll": "2d8 + 6",
          "average": 15
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 10 (1d8 + 6) piercing damage. If the target is a creature other than an undead or a construct, it must succeed on a DC 17 Constitution saving throw or lose 10 (3d6) hit points at the start of each of its turns due to an infernal wound. Each time the devil hits the wounded target with this attack, the damage dealt by the wound increases by 10 (3d6). Any creature can take an action to stanch the wound with a successful DC 12 Wisdom (Medicine) check. The wound also closes if the target receives magical healing.",
        "attackBonus": 10,
        "damage": {
          "type": "Piercing",
          "roll": "1d8 + 6",
          "average": 10
        }
      },
      {
        "name": "Hurl Flame",
        "description": "Ranged Spell Attack: +7 to hit, range 150 ft., one target. Hit: 14 (4d6) fire damage. If the target is a flammable object that isn't being worn or carried, it also catches fire.",
        "attackBonus": 7,
        "damage": {
          "type": "Fire",
          "roll": "4d6",
          "average": 14
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "large",
      "lawful evil"
    ]
  },
  {
    "name": "Ice Devil",
    "size": "Large",
    "type": "fiend",
    "alignment": "lawful evil",
    "challengeRating": "14",
    "xp": 11500,
    "strength": 21,
    "dexterity": 14,
    "constitution": 18,
    "intelligence": 18,
    "wisdom": 15,
    "charisma": 18,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 180,
    "hitDice": "19d10",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
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
      "darkvision": 120,
      "blindsight": 60,
      "passivePerception": 12
    },
    "languages": [
      "Infernal",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the devil's darkvision."
      },
      {
        "name": "Magic Resistance",
        "description": "The devil has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The devil makes three attacks: one with its bite, one with its claws, and one with its tail."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) piercing damage plus 10 (3d6) cold damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Piercing",
          "roll": "2d6 + 5",
          "average": 12
        },
        "secondaryDamage": {
          "type": "Cold",
          "roll": "3d6",
          "average": 10,
          "description": "Additional"
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 10 (2d4 + 5) slashing damage plus 10 (3d6) cold damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Slashing",
          "roll": "2d4 + 5",
          "average": 10
        },
        "secondaryDamage": {
          "type": "Cold",
          "roll": "3d6",
          "average": 10,
          "description": "Additional"
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage plus 10 (3d6) cold damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d6 + 5",
          "average": 12
        },
        "secondaryDamage": {
          "type": "Cold",
          "roll": "3d6",
          "average": 10,
          "description": "Additional"
        }
      },
      {
        "name": "Wall of Ice",
        "description": "The devil magically forms an opaque wall of ice on a solid surface it can see within 60 feet of it. The wall is 1 foot thick and up to 30 feet long and 10 feet high, or it's a hemispherical dome up to 20 feet in diameter.\nWhen the wall appears, each creature in its space is pushed out of it by the shortest route. The creature chooses which side of the wall to end up on, unless the creature is incapacitated. The creature then makes a DC 17 Dexterity saving throw, taking 35 (10d6) cold damage on a failed save, or half as much damage on a successful one.\nThe wall lasts for 1 minute or until the devil is incapacitated or dies. The wall can be damaged and breached; each 10-foot section has AC 5, 30 hit points, vulnerability to fire damage, and immunity to acid, cold, necrotic, poison, and psychic damage. If a section is destroyed, it leaves behind a sheet of frigid air in the space the wall occupied. Whenever a creature finishes moving through the frigid air on a turn, willingly or otherwise, the creature must make a DC 17 Constitution saving throw, taking 17 (5d6) cold damage on a failed save, or half as much damage on a successful one. The frigid air dissipates when the rest of the wall vanishes.",
        "damage": {
          "type": "Cold",
          "roll": "10d6",
          "average": 35
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "large",
      "lawful evil"
    ]
  },
  {
    "name": "Imp",
    "size": "Tiny",
    "type": "fiend",
    "alignment": "lawful evil",
    "challengeRating": "1",
    "xp": 200,
    "strength": 6,
    "dexterity": 17,
    "constitution": 13,
    "intelligence": 11,
    "wisdom": 12,
    "charisma": 14,
    "armorClass": 13,
    "armorType": "dex",
    "hitPoints": 10,
    "hitDice": "3d4",
    "speed": {
      "walk": 20,
      "fly": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Deception": 4,
      "Insight": 3,
      "Persuasion": 4,
      "Stealth": 5
    },
    "damageResistances": [
      "cold",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
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
      "darkvision": 120,
      "passivePerception": 11
    },
    "languages": [
      "Infernal",
      "Common"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The imp can use its action to polymorph into a beast form that resembles a rat (speed 20 ft.), a raven (20 ft., fly 60 ft.), or a spider (20 ft., climb 20 ft.), or back into its true form. Its statistics are the same in each form, except for the speed changes noted. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the imp's darkvision."
      },
      {
        "name": "Magic Resistance",
        "description": "The imp has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Sting (Bite in Beast Form)",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage, and the target must make on a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d4 + 3",
          "average": 5
        }
      },
      {
        "name": "Invisibility",
        "description": "The imp magically turns invisible until it attacks, or until its concentration ends (as if concentrating on a spell). Any equipment the imp wears or carries is invisible with it."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "tiny",
      "lawful evil"
    ]
  },
  {
    "name": "Lemure",
    "size": "Medium",
    "type": "fiend",
    "alignment": "lawful evil",
    "challengeRating": "0",
    "xp": 10,
    "strength": 10,
    "dexterity": 5,
    "constitution": 11,
    "intelligence": 1,
    "wisdom": 11,
    "charisma": 3,
    "armorClass": 7,
    "armorType": "dex",
    "hitPoints": 13,
    "hitDice": "3d8",
    "speed": {
      "walk": 15,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "cold"
    ],
    "damageImmunities": [
      "fire",
      "poison"
    ],
    "conditionImmunities": [
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "frightened",
        "name": "Frightened",
        "url": "/api/2014/conditions/frightened"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 120,
      "passivePerception": 10
    },
    "languages": [
      "understands infernal but can't speak"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Devil's Sight",
        "description": "Magical darkness doesn't impede the lemure's darkvision."
      },
      {
        "name": "Hellish Rejuvenation",
        "description": "A lemure that dies in the Nine Hells comes back to life with all its hit points in 1d10 days unless it is killed by a good-aligned creature with a bless spell cast on that creature or its remains are sprinkled with holy water."
      }
    ],
    "actions": [
      {
        "name": "Fist",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d4",
          "average": 2
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Marilith",
    "size": "Large",
    "type": "fiend",
    "alignment": "chaotic evil",
    "challengeRating": "16",
    "xp": 15000,
    "strength": 18,
    "dexterity": 20,
    "constitution": 20,
    "intelligence": 18,
    "wisdom": 16,
    "charisma": 20,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 189,
    "hitDice": "18d10",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "cold",
      "fire",
      "lightning",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
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
      "truesight": 120,
      "passivePerception": 13
    },
    "languages": [
      "Abyssal",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The marilith has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The marilith's weapon attacks are magical."
      },
      {
        "name": "Reactive",
        "description": "The marilith can take one reaction on every turn in combat."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The marilith can make seven attacks: six with its longswords and one with its tail."
      },
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.",
        "attackBonus": 9,
        "damage": {
          "type": "Slashing",
          "roll": "2d8 + 4",
          "average": 13
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one creature. Hit: 15 (2d10 + 4) bludgeoning damage. If the target is Medium or smaller, it is grappled (escape DC 19). Until this grapple ends, the target is restrained, the marilith can automatically hit the target with its tail, and the marilith can't make tail attacks against other targets.",
        "attackBonus": 9,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d10 + 4",
          "average": 15
        }
      },
      {
        "name": "Teleport",
        "description": "The marilith magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "large",
      "chaotic evil"
    ]
  },
  {
    "name": "Nalfeshnee",
    "size": "Large",
    "type": "fiend",
    "alignment": "chaotic evil",
    "challengeRating": "13",
    "xp": 10000,
    "strength": 21,
    "dexterity": 10,
    "constitution": 22,
    "intelligence": 19,
    "wisdom": 12,
    "charisma": 15,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 184,
    "hitDice": "16d10",
    "speed": {
      "walk": 20,
      "fly": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "cold",
      "fire",
      "lightning",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
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
      "truesight": 120,
      "passivePerception": 11
    },
    "languages": [
      "Abyssal",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The nalfeshnee has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The nalfeshnee uses Horror Nimbus if it can. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 32 (5d10 + 5) piercing damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Piercing",
          "roll": "5d10 + 5",
          "average": 32
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 15 (3d6 + 5) slashing damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Slashing",
          "roll": "3d6 + 5",
          "average": 15
        }
      },
      {
        "name": "Horror Nimbus",
        "description": "The nalfeshnee magically emits scintillating, multicolored light. Each creature within 15 feet of the nalfeshnee that can see the light must succeed on a DC 15 Wisdom saving throw or be frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the nalfeshnee's Horror Nimbus for the next 24 hours."
      },
      {
        "name": "Teleport",
        "description": "The nalfeshnee magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "large",
      "chaotic evil"
    ]
  },
  {
    "name": "Night Hag",
    "size": "Medium",
    "type": "fiend",
    "alignment": "neutral evil",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 18,
    "dexterity": 15,
    "constitution": 16,
    "intelligence": 16,
    "wisdom": 14,
    "charisma": 16,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 112,
    "hitDice": "15d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Deception": 7,
      "Insight": 6,
      "Perception": 6,
      "Stealth": 6
    },
    "damageResistances": [
      "cold",
      "fire",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "damageImmunities": [],
    "conditionImmunities": [
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 120,
      "passivePerception": 16
    },
    "languages": [
      "Abyssal",
      "Common",
      "Infernal",
      "Primordial"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Innate Spellcasting",
        "description": "The hag's innate spellcasting ability is Charisma (spell save DC 14, +6 to hit with spell attacks). She can innately cast the following spells, requiring no material components:\n\nAt will: detect magic, magic missile\n2/day each: plane shift (self only), ray of enfeeblement, sleep"
      },
      {
        "name": "Magic Resistance",
        "description": "The hag has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Night Hag Items",
        "description": "A night hag carries two very rare magic items that she must craft for herself If either object is lost, the night hag will go to great lengths to retrieve it, as creating a new tool takes time and effort.\nHeartstone: This lustrous black gem allows a night hag to become ethereal while it is in her possession. The touch of a heartstone also cures any disease. Crafting a heartstone takes 30 days.\nSoul Bag: When an evil humanoid dies as a result of a night hag's Nightmare Haunting, the hag catches the soul in this black sack made of stitched flesh. A soul bag can hold only one evil soul at a time, and only the night hag who crafted the bag can catch a soul with it. Crafting a soul bag takes 7 days and a humanoid sacrifice (whose flesh is used to make the bag)."
      }
    ],
    "actions": [
      {
        "name": "Claws (Hag Form Only)",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Slashing",
          "roll": "2d8 + 4",
          "average": 13
        }
      },
      {
        "name": "Change Shape",
        "description": "The hag magically polymorphs into a Small or Medium female humanoid, or back into her true form. Her statistics are the same in each form. Any equipment she is wearing or carrying isn't transformed. She reverts to her true form if she dies."
      },
      {
        "name": "Etherealness",
        "description": "The hag magically enters the Ethereal Plane from the Material Plane, or vice versa. To do so, the hag must have a heartstone in her possession."
      },
      {
        "name": "Nightmare Haunting",
        "description": "While on the Ethereal Plane, the hag magically touches a sleeping humanoid on the Material Plane. A protection from evil and good spell cast on the target prevents this contact, as does a magic circle. As long as the contact persists, the target has dreadful visions. If these visions last for at least 1 hour, the target gains no benefit from its rest, and its hit point maximum is reduced by 5 (1d10). If this effect reduces the target's hit point maximum to 0, the target dies, and if the target was evil, its soul is trapped in the hag's soul bag. The reduction to the target's hit point maximum lasts until removed by the greater restoration spell or similar magic."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "medium",
      "neutral evil"
    ]
  },
  {
    "name": "Nightmare",
    "size": "Large",
    "type": "fiend",
    "alignment": "neutral evil",
    "challengeRating": "3",
    "xp": 700,
    "strength": 18,
    "dexterity": 15,
    "constitution": 16,
    "intelligence": 10,
    "wisdom": 13,
    "charisma": 15,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 68,
    "hitDice": "8d10",
    "speed": {
      "walk": 60,
      "fly": 90,
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
      "passivePerception": 11
    },
    "languages": [
      "understands Abyssal",
      "Common",
      "and Infernal but can't speak"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Confer Fire Resistance",
        "description": "The nightmare can grant resistance to fire damage to anyone riding it."
      },
      {
        "name": "Illumination",
        "description": "The nightmare sheds bright light in a 10-foot radius and dim light for an additional 10 feet."
      }
    ],
    "actions": [
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage plus 7 (2d6) fire damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8 + 4",
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
        "name": "Ethereal Stride",
        "description": "The nightmare and up to three willing creatures within 5 feet of it magically enter the Ethereal Plane from the Material Plane, or vice versa."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "large",
      "neutral evil"
    ]
  },
  {
    "name": "Pit Fiend",
    "size": "Large",
    "type": "fiend",
    "alignment": "lawful evil",
    "challengeRating": "20",
    "xp": 25000,
    "strength": 26,
    "dexterity": 14,
    "constitution": 24,
    "intelligence": 22,
    "wisdom": 18,
    "charisma": 24,
    "armorClass": 19,
    "armorType": "natural",
    "hitPoints": 300,
    "hitDice": "24d10",
    "speed": {
      "walk": 30,
      "fly": 60,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "cold",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
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
      "truesight": 120,
      "passivePerception": 14
    },
    "languages": [
      "Infernal",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Fear Aura",
        "description": "Any creature hostile to the pit fiend that starts its turn within 20 feet of the pit fiend must make a DC 21 Wisdom saving throw, unless the pit fiend is incapacitated. On a failed save, the creature is frightened until the start of its next turn. If a creature's saving throw is successful, the creature is immune to the pit fiend's Fear Aura for the next 24 hours."
      },
      {
        "name": "Magic Resistance",
        "description": "The pit fiend has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The pit fiend's weapon attacks are magical."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The pit fiend's spellcasting ability is Charisma (spell save DC 21). The pit fiend can innately cast the following spells, requiring no material components:\nAt will: detect magic, fireball\n3/day each: hold monster, wall of fire"
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The pit fiend makes four attacks: one with its bite, one with its claw, one with its mace, and one with its tail."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 22 (4d6 + 8) piercing damage. The target must succeed on a DC 21 Constitution saving throw or become poisoned. While poisoned in this way, the target can't regain hit points, and it takes 21 (6d6) poison damage at the start of each of its turns. The poisoned target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "attackBonus": 14,
        "damage": {
          "type": "Piercing",
          "roll": "4d6 + 8",
          "average": 22
        },
        "secondaryDamage": {
          "type": "Poison",
          "roll": "6d6",
          "average": 21,
          "description": "Additional"
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 17 (2d8 + 8) slashing damage.",
        "attackBonus": 14,
        "damage": {
          "type": "Slashing",
          "roll": "2d8 + 8",
          "average": 17
        }
      },
      {
        "name": "Mace",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) bludgeoning damage plus 21 (6d6) fire damage.",
        "attackBonus": 14,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d6 + 8",
          "average": 15
        },
        "secondaryDamage": {
          "type": "Fire",
          "roll": "6d6",
          "average": 21,
          "description": "Additional"
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 24 (3d10 + 8) bludgeoning damage.",
        "attackBonus": 14,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d10 + 8",
          "average": 24
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "large",
      "lawful evil"
    ]
  },
  {
    "name": "Quasit",
    "size": "Tiny",
    "type": "fiend",
    "alignment": "chaotic evil",
    "challengeRating": "1",
    "xp": 200,
    "strength": 5,
    "dexterity": 17,
    "constitution": 10,
    "intelligence": 7,
    "wisdom": 10,
    "charisma": 10,
    "armorClass": 13,
    "armorType": "dex",
    "hitPoints": 7,
    "hitDice": "3d4",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Stealth": 5
    },
    "damageResistances": [
      "cold",
      "fire",
      "lightning",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
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
      "darkvision": 120,
      "passivePerception": 10
    },
    "languages": [
      "Abyssal",
      "Common"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The quasit can use its action to polymorph into a beast form that resembles a bat (speed 10 ft. fly 40 ft.), a centipede (40 ft., climb 40 ft.), or a toad (40 ft., swim 40 ft.), or back into its true form . Its statistics are the same in each form, except for the speed changes noted. Any equipment it is wearing or carrying isn't transformed . It reverts to its true form if it dies."
      },
      {
        "name": "Magic Resistance",
        "description": "The quasit has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Claw (Bite in Beast Form)",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage, and the target must succeed on a DC 10 Constitution saving throw or take 5 (2d4) poison damage and become poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d4 + 3",
          "average": 5
        }
      },
      {
        "name": "Scare",
        "description": "One creature of the quasit's choice within 20 ft. of it must succeed on a DC 10 Wisdom saving throw or be frightened for 1 minute. The target can repeat the saving throw at the end of each of its turns, with disadvantage if the quasit is within line of sight, ending the effect on itself on a success."
      },
      {
        "name": "Invisibility",
        "description": "The quasit magically turns invisible until it attacks or uses Scare, or until its concentration ends (as if concentrating on a spell). Any equipment the quasit wears or carries is invisible with it."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "tiny",
      "chaotic evil"
    ]
  },
  {
    "name": "Rakshasa",
    "size": "Medium",
    "type": "fiend",
    "alignment": "lawful evil",
    "challengeRating": "13",
    "xp": 10000,
    "strength": 14,
    "dexterity": 17,
    "constitution": 18,
    "intelligence": 13,
    "wisdom": 16,
    "charisma": 20,
    "armorClass": 16,
    "armorType": "natural",
    "hitPoints": 110,
    "hitDice": "13d8",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Deception": 10,
      "Insight": 8
    },
    "damageResistances": [],
    "damageImmunities": [
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [
      "piercing from magic weapons wielded by good creatures"
    ],
    "senses": {
      "darkvision": 60,
      "passivePerception": 13
    },
    "languages": [
      "Common",
      "Infernal"
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Limited Magic Immunity",
        "description": "The rakshasa can't be affected or detected by spells of 6th level or lower unless it wishes to be. It has advantage on saving throws against all other spells and magical effects."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The rakshasa's innate spellcasting ability is Charisma (spell save DC 18, +10 to hit with spell attacks). The rakshasa can innately cast the following spells, requiring no material components:\n\nAt will: detect thoughts, disguise self, mage hand, minor illusion\n3/day each: charm person, detect magic, invisibility, major image, suggestion\n1/day each: dominate person, fly, plane shift, true seeing"
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The rakshasa makes two claw attacks"
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) slashing damage, and the target is cursed if it is a creature. The magical curse takes effect whenever the target takes a short or long rest, filling the target's thoughts with horrible images and dreams. The cursed target gains no benefit from finishing a short or long rest. The curse lasts until it is lifted by a remove curse spell or similar magic.",
        "attackBonus": 7,
        "damage": {
          "type": "Slashing",
          "roll": "2d6 + 2",
          "average": 9
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Succubus/Incubus",
    "size": "Medium",
    "type": "fiend",
    "alignment": "neutral evil",
    "challengeRating": "4",
    "xp": 1100,
    "strength": 8,
    "dexterity": 17,
    "constitution": 13,
    "intelligence": 15,
    "wisdom": 12,
    "charisma": 20,
    "armorClass": 15,
    "armorType": "natural",
    "hitPoints": 66,
    "hitDice": "12d8",
    "speed": {
      "walk": 30,
      "fly": 60,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Deception": 9,
      "Insight": 5,
      "Perception": 5,
      "Persuasion": 9,
      "Stealth": 7
    },
    "damageResistances": [
      "cold",
      "fire",
      "lightning",
      "poison",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 15
    },
    "languages": [
      "Abyssal",
      "Common",
      "Infernal",
      "telepathy 60 ft."
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Telepathic Bond",
        "description": "The fiend ignores the range restriction on its telepathy when communicating with a creature it has charmed. The two don't even need to be on the same plane of existence."
      },
      {
        "name": "Shapechanger",
        "description": "The fiend can use its action to polymorph into a Small or Medium humanoid, or back into its true form. Without wings, the fiend loses its flying speed. Other than its size and speed, its statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      }
    ],
    "actions": [
      {
        "name": "Claw (Fiend Form Only)",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Slashing",
          "roll": "1d6 + 3",
          "average": 6
        }
      },
      {
        "name": "Charm",
        "description": "One humanoid the fiend can see within 30 feet of it must succeed on a DC 15 Wisdom saving throw or be magically charmed for 1 day. The charmed target obeys the fiend's verbal or telepathic commands. If the target suffers any harm or receives a suicidal command, it can repeat the saving throw, ending the effect on a success. If the target successfully saves against the effect, or if the effect on it ends, the target is immune to this fiend's Charm for the next 24 hours.\nThe fiend can have only one target charmed at a time. If it charms another, the effect on the previous target ends."
      },
      {
        "name": "Draining Kiss",
        "description": "The fiend kisses a creature charmed by it or a willing creature. The target must make a DC 15 Constitution saving throw against this magic, taking 32 (5d10 + 5) psychic damage on a failed save, or half as much damage on a successful one. The target's hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.",
        "damage": {
          "type": "Psychic",
          "roll": "5d10 + 5",
          "average": 32
        }
      },
      {
        "name": "Etherealness",
        "description": "The fiend magically enters the Ethereal Plane from the Material Plane, or vice versa."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "medium",
      "neutral evil"
    ]
  },
  {
    "name": "Vrock",
    "size": "Large",
    "type": "fiend",
    "alignment": "chaotic evil",
    "challengeRating": "6",
    "xp": 2300,
    "strength": 17,
    "dexterity": 15,
    "constitution": 18,
    "intelligence": 8,
    "wisdom": 13,
    "charisma": 8,
    "armorClass": 15,
    "armorType": "natural",
    "hitPoints": 104,
    "hitDice": "11d10",
    "speed": {
      "walk": 40,
      "fly": 60,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "cold",
      "fire",
      "lightning",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
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
      "darkvision": 120,
      "passivePerception": 11
    },
    "languages": [
      "Abyssal",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The vrock has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The vrock makes two attacks: one with its beak and one with its talons."
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "2d6 + 3",
          "average": 10
        }
      },
      {
        "name": "Talons",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 14 (2d10 + 3) slashing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Slashing",
          "roll": "2d10 + 3",
          "average": 14
        }
      },
      {
        "name": "Spores",
        "description": "A 15-foot-radius cloud of toxic spores extends out from the vrock. The spores spread around corners. Each creature in that area must succeed on a DC 14 Constitution saving throw or become poisoned. While poisoned in this way, a target takes 5 (1d10) poison damage at the start of each of its turns. A target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. Emptying a vial of holy water on the target also ends the effect on it.",
        "damage": {
          "type": "Poison",
          "roll": "1d10",
          "average": 5
        }
      },
      {
        "name": "Stunning Screech",
        "description": "The vrock emits a horrific screech. Each creature within 20 feet of it that can hear it and that isn't a demon must succeed on a DC 14 Constitution saving throw or be stunned until the end of the vrock's next turn ."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fiend",
      "large",
      "chaotic evil"
    ]
  }
];
