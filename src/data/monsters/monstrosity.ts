import { Monster } from '../../types/monster';

export const monstrosityMonsters: Monster[] = [
  {
    "name": "Androsphinx",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "lawful neutral",
    "challengeRating": "17",
    "xp": 18000,
    "strength": 22,
    "dexterity": 10,
    "constitution": 20,
    "intelligence": 16,
    "wisdom": 18,
    "charisma": 23,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 199,
    "hitDice": "19d10",
    "speed": {
      "walk": 40,
      "fly": 60,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Arcana": 9,
      "Perception": 10,
      "Religion": 15
    },
    "damageResistances": [],
    "damageImmunities": [
      "psychic",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
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
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "truesight": 120,
      "passivePerception": 20
    },
    "languages": [
      "Common",
      "Sphinx"
    ],
    "proficiencyBonus": 6,
    "traits": [
      {
        "name": "Inscrutable",
        "description": "The sphinx is immune to any effect that would sense its emotions or read its thoughts, as well as any divination spell that it refuses. Wisdom (Insight) checks made to ascertain the sphinx's intentions or sincerity have disadvantage."
      },
      {
        "name": "Magic Weapons",
        "description": "The sphinx's weapon attacks are magical."
      },
      {
        "name": "Spellcasting",
        "description": "The sphinx is a 12th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 18, +10 to hit with spell attacks). It requires no material components to cast its spells. The sphinx has the following cleric spells prepared:\n\n- Cantrips (at will): sacred flame, spare the dying, thaumaturgy\n- 1st level (4 slots): command, detect evil and good, detect magic\n- 2nd level (3 slots): lesser restoration, zone of truth\n- 3rd level (3 slots): dispel magic, tongues\n- 4th level (3 slots): banishment, freedom of movement\n- 5th level (2 slots): flame strike, greater restoration\n- 6th level (1 slot): heroes' feast"
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The sphinx makes two claw attacks."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 17 (2d10 + 6) slashing damage.",
        "attackBonus": 12,
        "damage": {
          "type": "Slashing",
          "roll": "2d10 + 6",
          "average": 17
        }
      },
      {
        "name": "Roar",
        "description": "The sphinx emits a magical roar. Each time it roars before finishing a long rest, the roar is louder and the effect is different, as detailed below. Each creature within 500 feet of the sphinx and able to hear the roar must make a saving throw.\n\nFirst Roar. Each creature that fails a DC 18 Wisdom saving throw is frightened for 1 minute. A frightened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.\n\nSecond Roar. Each creature that fails a DC 18 Wisdom saving throw is deafened and frightened for 1 minute. A frightened creature is paralyzed and can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.\n\nThird Roar. Each creature makes a DC 18 Constitution saving throw. On a failed save, a creature takes 44 (8d10) thunder damage and is knocked prone. On a successful save, the creature takes half as much damage and isn't knocked prone.",
        "damage": {
          "type": "Thunder",
          "roll": "8d10",
          "average": 44
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Claw Attack",
        "description": "The sphinx makes one claw attack."
      },
      {
        "name": "Teleport (Costs 2 Actions)",
        "description": "The sphinx magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see."
      },
      {
        "name": "Cast a Spell (Costs 3 Actions)",
        "description": "The sphinx casts a spell from its list of prepared spells, using a spell slot as normal."
      }
    ],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "lawful neutral"
    ]
  },
  {
    "name": "Ankheg",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "unaligned",
    "challengeRating": "2",
    "xp": 250,
    "strength": 17,
    "dexterity": 11,
    "constitution": 13,
    "intelligence": 1,
    "wisdom": 13,
    "charisma": 6,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 39,
    "hitDice": "6d10",
    "speed": {
      "walk": 30,
      "burrow": 10,
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
      "tremorsense": 60,
      "passivePerception": 11
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage plus 3 (1d6) acid damage. If the target is a Large or smaller creature, it is grappled (escape DC 13). Until this grapple ends, the ankheg can bite only the grappled creature and has advantage on attack rolls to do so.",
        "attackBonus": 5,
        "damage": {
          "type": "Slashing",
          "roll": "2d6 + 3",
          "average": 10
        },
        "secondaryDamage": {
          "type": "Acid",
          "roll": "1d6",
          "average": 3,
          "description": "Additional"
        }
      },
      {
        "name": "Acid Spray",
        "description": "The ankheg spits acid in a line that is 30 ft. long and 5 ft. wide, provided that it has no creature grappled. Each creature in that line must make a DC 13 Dexterity saving throw, taking 10 (3d6) acid damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Acid",
          "roll": "3d6",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Basilisk",
    "size": "Medium",
    "type": "monstrosity",
    "alignment": "unaligned",
    "challengeRating": "3",
    "xp": 700,
    "strength": 16,
    "dexterity": 8,
    "constitution": 15,
    "intelligence": 2,
    "wisdom": 8,
    "charisma": 7,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 52,
    "hitDice": "8d8",
    "speed": {
      "walk": 20,
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
      "passivePerception": 9
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Petrifying Gaze",
        "description": "If a creature starts its turn within 30 ft. of the basilisk and the two of them can see each other, the basilisk can force the creature to make a DC 12 Constitution saving throw if the basilisk isn't incapacitated. On a failed save, the creature magically begins to turn to stone and is restrained. It must repeat the saving throw at the end of its next turn. On a success, the effect ends. On a failure, the creature is petrified until freed by the greater restoration spell or other magic.\nA creature that isn't surprised can avert its eyes to avoid the saving throw at the start of its turn. If it does so, it can't see the basilisk until the start of its next turn, when it can avert its eyes again. If it looks at the basilisk in the meantime, it must immediately make the save.\nIf the basilisk sees its reflection within 30 ft. of it in bright light, it mistakes itself for a rival and targets itself with its gaze."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage plus 7 (2d6) poison damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "2d6 + 3",
          "average": 10
        },
        "secondaryDamage": {
          "type": "Poison",
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
      "monstrosity",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Behir",
    "size": "Huge",
    "type": "monstrosity",
    "alignment": "neutral evil",
    "challengeRating": "11",
    "xp": 7200,
    "strength": 23,
    "dexterity": 16,
    "constitution": 18,
    "intelligence": 7,
    "wisdom": 14,
    "charisma": 12,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 168,
    "hitDice": "16d12",
    "speed": {
      "walk": 50,
      "climb": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 6,
      "Stealth": 7
    },
    "damageResistances": [],
    "damageImmunities": [
      "lightning"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 90,
      "passivePerception": 16
    },
    "languages": [
      "Draconic"
    ],
    "proficiencyBonus": 4,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The behir makes two attacks: one with its bite and one to constrict."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 22 (3d10 + 6) piercing damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Piercing",
          "roll": "3d10 + 6",
          "average": 22
        }
      },
      {
        "name": "Constrict",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one Large or smaller creature. Hit: 17 (2d10 + 6) bludgeoning damage plus 17 (2d10 + 6) slashing damage. The target is grappled (escape DC 16) if the behir isn't already constricting a creature, and the target is restrained until this grapple ends.",
        "attackBonus": 10,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d10 + 6",
          "average": 17
        }
      },
      {
        "name": "Lightning Breath",
        "description": "The behir exhales a line of lightning that is 20 ft. long and 5 ft. wide. Each creature in that line must make a DC 16 Dexterity saving throw, taking 66 (12d10) lightning damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Lightning",
          "roll": "12d10",
          "average": 66
        }
      },
      {
        "name": "Swallow",
        "description": "The behir makes one bite attack against a Medium or smaller target it is grappling. If the attack hits, the target is also swallowed, and the grapple ends. While swallowed, the target is blinded and restrained, it has total cover against attacks and other effects outside the behir, and it takes 21 (6d6) acid damage at the start of each of the behir's turns. A behir can have only one creature swallowed at a time.\nIf the behir takes 30 damage or more on a single turn from the swallowed creature, the behir must succeed on a DC 14 Constitution saving throw at the end of that turn or regurgitate the creature, which falls prone in a space within 10 ft. of the behir. If the behir dies, a swallowed creature is no longer restrained by it and can escape from the corpse by using 15 ft. of movement, exiting prone.",
        "damage": {
          "type": "Acid",
          "roll": "6d6",
          "average": 21
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "huge",
      "neutral evil"
    ]
  },
  {
    "name": "Bulette",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "unaligned",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 19,
    "dexterity": 11,
    "constitution": 21,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 5,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 94,
    "hitDice": "9d10",
    "speed": {
      "walk": 40,
      "burrow": 40,
      "hover": false
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
      "darkvision": 60,
      "tremorsense": 60,
      "passivePerception": 16
    },
    "languages": [],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Standing Leap",
        "description": "The bulette's long jump is up to 30 ft. and its high jump is up to 15 ft., with or without a running start."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 30 (4d12 + 4) piercing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "4d12 + 4",
          "average": 30
        }
      },
      {
        "name": "Deadly Leap",
        "description": "If the bulette jumps at least 15 ft. as part of its movement, it can then use this action to land on its feet in a space that contains one or more other creatures. Each of those creatures must succeed on a DC 16 Strength or Dexterity saving throw (target's choice) or be knocked prone and take 14 (3d6 + 4) bludgeoning damage plus 14 (3d6 + 4) slashing damage. On a successful save, the creature takes only half the damage, isn't knocked prone, and is pushed 5 ft. out of the bulette's space into an unoccupied space of the creature's choice. If no unoccupied space is within range, the creature instead falls prone in the bulette's space.",
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d6 + 4",
          "average": 14
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Centaur",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "neutral good",
    "challengeRating": "2",
    "xp": 450,
    "strength": 18,
    "dexterity": 14,
    "constitution": 14,
    "intelligence": 9,
    "wisdom": 13,
    "charisma": 11,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 45,
    "hitDice": "6d10",
    "speed": {
      "walk": 50,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Athletics": 6,
      "Perception": 3,
      "Survival": 3
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 13
    },
    "languages": [
      "Elvish",
      "Sylvan"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the centaur moves at least 30 ft. straight toward a target and then hits it with a pike attack on the same turn, the target takes an extra 10 (3d6) piercing damage."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The centaur makes two attacks: one with its pike and one with its hooves or two with its longbow."
      },
      {
        "name": "Pike",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 9 (1d10 + 4) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d10 + 4",
          "average": 9
        }
      },
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d6 + 4",
          "average": 11
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
      "monstrosity",
      "large",
      "neutral good"
    ]
  },
  {
    "name": "Chimera",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "chaotic evil",
    "challengeRating": "6",
    "xp": 2300,
    "strength": 19,
    "dexterity": 11,
    "constitution": 19,
    "intelligence": 3,
    "wisdom": 14,
    "charisma": 10,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 114,
    "hitDice": "12d10",
    "speed": {
      "walk": 30,
      "fly": 60,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 8
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 18
    },
    "languages": [
      "understands Draconic but can't speak"
    ],
    "proficiencyBonus": 3,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The chimera makes three attacks: one with its bite, one with its horns, and one with its claws. When its fire breath is available, it can use the breath in place of its bite or horns."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) piercing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "2d6 + 4",
          "average": 11
        }
      },
      {
        "name": "Horns",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 10 (1d12 + 4) bludgeoning damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d12 + 4",
          "average": 10
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
      },
      {
        "name": "Fire Breath",
        "description": "The dragon head exhales fire in a 15-foot cone. Each creature in that area must make a DC 15 Dexterity saving throw, taking 31 (7d8) fire damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Fire",
          "roll": "7d8",
          "average": 31
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "chaotic evil"
    ]
  },
  {
    "name": "Cockatrice",
    "size": "Small",
    "type": "monstrosity",
    "alignment": "unaligned",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 6,
    "dexterity": 12,
    "constitution": 12,
    "intelligence": 2,
    "wisdom": 13,
    "charisma": 5,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 27,
    "hitDice": "6d6",
    "speed": {
      "walk": 20,
      "fly": 40,
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
      "passivePerception": 11
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 3 (1d4 + 1) piercing damage, and the target must succeed on a DC 11 Constitution saving throw against being magically petrified. On a failed save, the creature begins to turn to stone and is restrained. It must repeat the saving throw at the end of its next turn. On a success, the effect ends. On a failure, the creature is petrified for 24 hours.",
        "attackBonus": 3,
        "damage": {
          "type": "Piercing",
          "roll": "1d4 + 1",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "small",
      "unaligned"
    ]
  },
  {
    "name": "Darkmantle",
    "size": "Small",
    "type": "monstrosity",
    "alignment": "unaligned",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 16,
    "dexterity": 12,
    "constitution": 13,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 5,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 22,
    "hitDice": "5d6",
    "speed": {
      "walk": 10,
      "fly": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Stealth": 3
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "blindsight": 60,
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Echolocation",
        "description": "The darkmantle can't use its blindsight while deafened."
      },
      {
        "name": "False Appearance",
        "description": "While the darkmantle remains motionless, it is indistinguishable from a cave formation such as a stalactite or stalagmite."
      }
    ],
    "actions": [
      {
        "name": "Crush",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 6 (1d6 + 3) bludgeoning damage, and the darkmantle attaches to the target. If the target is Medium or smaller and the darkmantle has advantage on the attack roll, it attaches by engulfing the target's head, and the target is also blinded and unable to breathe while the darkmantle is attached in this way.\nWhile attached to the target, the darkmantle can attack no other creature except the target but has advantage on its attack rolls. The darkmantle's speed also becomes 0, it can't benefit from any bonus to its speed, and it moves with the target.\nA creature can detach the darkmantle by making a successful DC 13 Strength check as an action. On its turn, the darkmantle can detach itself from the target by using 5 feet of movement.",
        "attackBonus": 5,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d6 + 3",
          "average": 6
        }
      },
      {
        "name": "Darkness Aura",
        "description": "A 15-foot radius of magical darkness extends out from the darkmantle, moves with it, and spreads around corners. The darkness lasts as long as the darkmantle maintains concentration, up to 10 minutes (as if concentrating on a spell). Darkvision can't penetrate this darkness, and no natural light can illuminate it. If any of the darkness overlaps with an area of light created by a spell of 2nd level or lower, the spell creating the light is dispelled."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "small",
      "unaligned"
    ]
  },
  {
    "name": "Death Dog",
    "size": "Medium",
    "type": "monstrosity",
    "alignment": "neutral evil",
    "challengeRating": "1",
    "xp": 200,
    "strength": 15,
    "dexterity": 14,
    "constitution": 14,
    "intelligence": 3,
    "wisdom": 13,
    "charisma": 6,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 39,
    "hitDice": "6d8",
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
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 120,
      "passivePerception": 15
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Two-Headed",
        "description": "The dog has advantage on Wisdom (Perception) checks and on saving throws against being blinded, charmed, deafened, frightened, stunned, or knocked unconscious."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The dog makes two bite attacks."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage. If the target is a creature, it must succeed on a DC 12 Constitution saving throw against disease or become poisoned until the disease is cured. Every 24 hours that elapse, the creature must repeat the saving throw, reducing its hit point maximum by 5 (1d10) on a failure. This reduction lasts until the disease is cured. The creature dies if the disease reduces its hit point maximum to 0.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d6 + 2",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "A death dog is an ugly two-headed hound that roams plains, and deserts. Hate burns in a death dog’s heart, and a taste for humanoid flesh drives it to attack travelers and explorers. Death dog saliva carries a foul disease that causes a victim’s flesh to slowly rot off the bone.",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "medium",
      "neutral evil"
    ]
  },
  {
    "name": "Doppelganger",
    "size": "Medium",
    "type": "monstrosity",
    "alignment": "unaligned",
    "challengeRating": "3",
    "xp": 700,
    "strength": 11,
    "dexterity": 18,
    "constitution": 14,
    "intelligence": 11,
    "wisdom": 12,
    "charisma": 14,
    "armorClass": 14,
    "armorType": "dex",
    "hitPoints": 52,
    "hitDice": "8d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Deception": 6,
      "Insight": 3
    },
    "damageResistances": [],
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
      "darkvision": 60,
      "passivePerception": 11
    },
    "languages": [
      "Common"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The doppelganger can use its action to polymorph into a Small or Medium humanoid it has seen, or back into its true form. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Ambusher",
        "description": "In the first round of combat, the doppelganger has advantage on attack rolls against any creature it has surprised."
      },
      {
        "name": "Surprise Attack",
        "description": "If the doppelganger surprises a creature and hits it with an attack during the first round of combat, the target takes an extra 10 (3d6) damage from the attack."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The doppelganger makes two melee attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) bludgeoning damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d6 + 4",
          "average": 7
        }
      },
      {
        "name": "Read Thoughts",
        "description": "The doppelganger magically reads the surface thoughts of one creature within 60 ft. of it. The effect can penetrate barriers, but 3 ft. of wood or dirt, 2 ft. of stone, 2 inches of metal, or a thin sheet of lead blocks it. While the target is in range, the doppelganger can continue reading its thoughts, as long as the doppelganger's concentration isn't broken (as if concentrating on a spell). While reading the target's mind, the doppelganger has advantage on Wisdom (Insight) and Charisma (Deception, Intimidation, and Persuasion) checks against the target."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Drider",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "chaotic evil",
    "challengeRating": "6",
    "xp": 2300,
    "strength": 16,
    "dexterity": 16,
    "constitution": 18,
    "intelligence": 13,
    "wisdom": 14,
    "charisma": 12,
    "armorClass": 19,
    "armorType": "natural",
    "hitPoints": 123,
    "hitDice": "13d10",
    "speed": {
      "walk": 30,
      "climb": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 5,
      "Stealth": 9
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
      "Elvish",
      "Undercommon"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Fey Ancestry",
        "description": "The drider has advantage on saving throws against being charmed, and magic can't put the drider to sleep."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The drider's innate spellcasting ability is Wisdom (spell save DC 13). The drider can innately cast the following spells, requiring no material components:\nAt will: dancing lights\n1/day each: darkness, faerie fire"
      },
      {
        "name": "Spider Climb",
        "description": "The drider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Sunlight Sensitivity",
        "description": "While in sunlight, the drider has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight."
      },
      {
        "name": "Web Walker",
        "description": "The drider ignores movement restrictions caused by webbing."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The drider makes three attacks, either with its longsword or its longbow. It can replace one of those attacks with a bite attack."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 2 (1d4) piercing damage plus 9 (2d8) poison damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d4",
          "average": 2
        },
        "secondaryDamage": {
          "type": "Poison",
          "roll": "2d8",
          "average": 9,
          "description": "Additional"
        }
      },
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands.",
        "attackBonus": 6,
        "damage": {
          "type": "Slashing",
          "roll": "1d8 + 3",
          "average": 7,
          "description": "One-handed"
        },
        "secondaryDamage": {
          "type": "Slashing",
          "roll": "1d10 + 3",
          "average": 8,
          "description": "Two-handed"
        }
      },
      {
        "name": "Longbow",
        "description": "Ranged Weapon Attack: +6 to hit, range 150/600 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 4 (1d8) poison damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d8 + 3",
          "average": 7
        },
        "secondaryDamage": {
          "type": "Poison",
          "roll": "1d8",
          "average": 4,
          "description": "Additional"
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "chaotic evil"
    ]
  },
  {
    "name": "Ettercap",
    "size": "Medium",
    "type": "monstrosity",
    "alignment": "neutral evil",
    "challengeRating": "2",
    "xp": 450,
    "strength": 14,
    "dexterity": 15,
    "constitution": 13,
    "intelligence": 7,
    "wisdom": 12,
    "charisma": 8,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 44,
    "hitDice": "8d8",
    "speed": {
      "walk": 30,
      "climb": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 3,
      "Stealth": 4,
      "Survival": 3
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The ettercap can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Sense",
        "description": "While in contact with a web, the ettercap knows the exact location of any other creature in contact with the same web."
      },
      {
        "name": "Web Walker",
        "description": "The ettercap ignores movement restrictions caused by webbing."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The ettercap makes two attacks: one with its bite and one with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) piercing damage plus 4 (1d8) poison damage. The target must succeed on a DC 11 Constitution saving throw or be poisoned for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d8 + 2",
          "average": 6
        },
        "secondaryDamage": {
          "type": "Poison",
          "roll": "1d8",
          "average": 4,
          "description": "Additional"
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Slashing",
          "roll": "2d4 + 2",
          "average": 7
        }
      },
      {
        "name": "Web",
        "description": "Ranged Weapon Attack: +4 to hit, range 30/60 ft., one Large or smaller creature. Hit: The creature is restrained by webbing. As an action, the restrained creature can make a DC 11 Strength check, escaping from the webbing on a success. The effect ends if the webbing is destroyed. The webbing has AC 10, 5 hit points, is vulnerable to fire damage and immune to bludgeoning damage.",
        "attackBonus": 4
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "medium",
      "neutral evil"
    ]
  },
  {
    "name": "Gorgon",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "unaligned",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 20,
    "dexterity": 11,
    "constitution": 18,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 7,
    "armorClass": 19,
    "armorType": "natural",
    "hitPoints": 114,
    "hitDice": "12d10",
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
    "conditionImmunities": [
      {
        "index": "petrified",
        "name": "Petrified",
        "url": "/api/2014/conditions/petrified"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 14
    },
    "languages": [],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Trampling Charge",
        "description": "If the gorgon moves at least 20 feet straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 16 Strength saving throw or be knocked prone. If the target is prone, the gorgon can make one attack with its hooves against it as a bonus action."
      }
    ],
    "actions": [
      {
        "name": "Gore",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 18 (2d12 + 5) piercing damage.",
        "attackBonus": 8,
        "damage": {
          "type": "Piercing",
          "roll": "2d12 + 5",
          "average": 18
        }
      },
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 16 (2d10 + 5) bludgeoning damage.",
        "attackBonus": 8,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d10 + 5",
          "average": 16
        }
      },
      {
        "name": "Petrifying Breath",
        "description": "The gorgon exhales petrifying gas in a 30-foot cone. Each creature in that area must succeed on a DC 13 Constitution saving throw. On a failed save, a target begins to turn to stone and is restrained. The restrained target must repeat the saving throw at the end of its next turn. On a success, the effect ends on the target. On a failure, the target is petrified until freed by the greater restoration spell or other magic."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Grick",
    "size": "Medium",
    "type": "monstrosity",
    "alignment": "neutral",
    "challengeRating": "2",
    "xp": 450,
    "strength": 14,
    "dexterity": 14,
    "constitution": 11,
    "intelligence": 3,
    "wisdom": 14,
    "charisma": 5,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 27,
    "hitDice": "6d8",
    "speed": {
      "walk": 30,
      "climb": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [],
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
        "name": "Stone Camouflage",
        "description": "The grick has advantage on Dexterity (Stealth) checks made to hide in rocky terrain."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The grick makes one attack with its tentacles. If that attack hits, the grick can make one beak attack against the same target."
      },
      {
        "name": "Tentacles",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) slashing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Slashing",
          "roll": "2d6 + 2",
          "average": 9
        }
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
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
      "monstrosity",
      "medium",
      "neutral"
    ]
  },
  {
    "name": "Griffon",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "unaligned",
    "challengeRating": "2",
    "xp": 450,
    "strength": 18,
    "dexterity": 15,
    "constitution": 16,
    "intelligence": 2,
    "wisdom": 13,
    "charisma": 8,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 59,
    "hitDice": "7d10",
    "speed": {
      "walk": 30,
      "fly": 80,
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
      "darkvision": 60,
      "passivePerception": 15
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The griffon has advantage on Wisdom (Perception) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The griffon makes two attacks: one with its beak and one with its claws."
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d8 + 4",
          "average": 8
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.",
        "attackBonus": 6,
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
      "monstrosity",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Guardian Naga",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "lawful good",
    "challengeRating": "10",
    "xp": 5900,
    "strength": 19,
    "dexterity": 18,
    "constitution": 16,
    "intelligence": 16,
    "wisdom": 19,
    "charisma": 18,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 127,
    "hitDice": "15d10",
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
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
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
      "passivePerception": 14
    },
    "languages": [
      "Celestial",
      "Common"
    ],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Rejuvenation",
        "description": "If it dies, the naga returns to life in 1d6 days and regains all its hit points. Only a wish spell can prevent this trait from functioning."
      },
      {
        "name": "Spellcasting",
        "description": "The naga is an 11th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 16, +8 to hit with spell attacks), and it needs only verbal components to cast its spells. It has the following cleric spells prepared:\n\n- Cantrips (at will): mending, sacred flame, thaumaturgy\n- 1st level (4 slots): command, cure wounds, shield of faith\n- 2nd level (3 slots): calm emotions, hold person\n- 3rd level (3 slots): bestow curse, clairvoyance\n- 4th level (3 slots): banishment, freedom of movement\n- 5th level (2 slots): flame strike, geas\n- 6th level (1 slot): true seeing"
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one creature. Hit: 8 (1d8 + 4) piercing damage, and the target must make a DC 15 Constitution saving throw, taking 45 (10d8) poison damage on a failed save, or half as much damage on a successful one.",
        "attackBonus": 8,
        "damage": {
          "type": "Piercing",
          "roll": "1d8 + 4",
          "average": 8
        }
      },
      {
        "name": "Spit Poison",
        "description": "Ranged Weapon Attack: +8 to hit, range 15/30 ft., one creature. Hit: The target must make a DC 15 Constitution saving throw, taking 45 (10d8) poison damage on a failed save, or half as much damage on a successful one.",
        "attackBonus": 8,
        "damage": {
          "type": "Poison",
          "roll": "10d8",
          "average": 45
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "lawful good"
    ]
  },
  {
    "name": "Gynosphinx",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "lawful neutral",
    "challengeRating": "11",
    "xp": 7200,
    "strength": 18,
    "dexterity": 15,
    "constitution": 16,
    "intelligence": 18,
    "wisdom": 18,
    "charisma": 18,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 136,
    "hitDice": "16d10",
    "speed": {
      "walk": 40,
      "fly": 60,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Arcana": 12,
      "History": 12,
      "Perception": 8,
      "Religion": 8
    },
    "damageResistances": [
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damageImmunities": [
      "psychic"
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
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "truesight": 120,
      "passivePerception": 18
    },
    "languages": [
      "Common",
      "Sphinx"
    ],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Inscrutable",
        "description": "The sphinx is immune to any effect that would sense its emotions or read its thoughts, as well as any divination spell that it refuses. Wisdom (Insight) checks made to ascertain the sphinx's intentions or sincerity have disadvantage."
      },
      {
        "name": "Magic Weapons",
        "description": "The sphinx's weapon attacks are magical."
      },
      {
        "name": "Spellcasting",
        "description": "The sphinx is a 9th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 16, +8 to hit with spell attacks). It requires no material components to cast its spells. The sphinx has the following wizard spells prepared:\n\n- Cantrips (at will): mage hand, minor illusion, prestidigitation\n- 1st level (4 slots): detect magic, identify, shield\n- 2nd level (3 slots): darkness, locate object, suggestion\n- 3rd level (3 slots): dispel magic, remove curse, tongues\n- 4th level (3 slots): banishment, greater invisibility\n- 5th level (1 slot): legend lore"
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The sphinx makes two claw attacks."
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.",
        "attackBonus": 9,
        "damage": {
          "type": "Slashing",
          "roll": "2d8 + 4",
          "average": 13
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Claw Attack",
        "description": "The sphinx makes one claw attack."
      },
      {
        "name": "Teleport (Costs 2 Actions)",
        "description": "The sphinx magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see."
      },
      {
        "name": "Cast a Spell (Costs 3 Actions)",
        "description": "The sphinx casts a spell from its list of prepared spells, using a spell slot as normal."
      }
    ],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "lawful neutral"
    ]
  },
  {
    "name": "Harpy",
    "size": "Medium",
    "type": "monstrosity",
    "alignment": "chaotic evil",
    "challengeRating": "1",
    "xp": 200,
    "strength": 12,
    "dexterity": 13,
    "constitution": 12,
    "intelligence": 7,
    "wisdom": 10,
    "charisma": 13,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 38,
    "hitDice": "7d8",
    "speed": {
      "walk": 20,
      "fly": 40,
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
      "Common"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The harpy makes two attacks: one with its claws and one with its club."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) slashing damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Slashing",
          "roll": "2d4 + 1",
          "average": 6
        }
      },
      {
        "name": "Club",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) bludgeoning damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d4 + 1",
          "average": 3
        }
      },
      {
        "name": "Luring Song",
        "description": "The harpy sings a magical melody. Every humanoid and giant within 300 ft. of the harpy that can hear the song must succeed on a DC 11 Wisdom saving throw or be charmed until the song ends. The harpy must take a bonus action on its subsequent turns to continue singing. It can stop singing at any time. The song ends if the harpy is incapacitated.\nWhile charmed by the harpy, a target is incapacitated and ignores the songs of other harpies. If the charmed target is more than 5 ft. away from the harpy, the must move on its turn toward the harpy by the most direct route. It doesn't avoid opportunity attacks, but before moving into damaging terrain, such as lava or a pit, and whenever it takes damage from a source other than the harpy, a target can repeat the saving throw. A creature can also repeat the saving throw at the end of each of its turns. If a creature's saving throw is successful, the effect ends on it.\nA target that successfully saves is immune to this harpy's song for the next 24 hours."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "medium",
      "chaotic evil"
    ]
  },
  {
    "name": "Hippogriff",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "unaligned",
    "challengeRating": "1",
    "xp": 200,
    "strength": 17,
    "dexterity": 13,
    "constitution": 13,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 8,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 19,
    "hitDice": "3d10",
    "speed": {
      "walk": 40,
      "fly": 60,
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
      "passivePerception": 15
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The hippogriff has advantage on Wisdom (Perception) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The hippogriff makes two attacks: one with its beak and one with its claws."
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d10 + 3",
          "average": 8
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage.",
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
      "monstrosity",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Hydra",
    "size": "Huge",
    "type": "monstrosity",
    "alignment": "unaligned",
    "challengeRating": "8",
    "xp": 3900,
    "strength": 20,
    "dexterity": 12,
    "constitution": 20,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 7,
    "armorClass": 15,
    "armorType": "natural",
    "hitPoints": 172,
    "hitDice": "15d12",
    "speed": {
      "walk": 30,
      "swim": 30,
      "hover": false
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
      "darkvision": 60,
      "passivePerception": 16
    },
    "languages": [],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The hydra can hold its breath for 1 hour."
      },
      {
        "name": "Multiple Heads",
        "description": "The hydra has five heads. While it has more than one head, the hydra has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious.\nWhenever the hydra takes 25 or more damage in a single turn, one of its heads dies. If all its heads die, the hydra dies.\nAt the end of its turn, it grows two heads for each of its heads that died since its last turn, unless it has taken fire damage since its last turn. The hydra regains 10 hit points for each head regrown in this way."
      },
      {
        "name": "Reactive Heads",
        "description": "For each head the hydra has beyond one, it gets an extra reaction that can be used only for opportunity attacks."
      },
      {
        "name": "Wakeful",
        "description": "While the hydra sleeps, at least one of its heads is awake."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The hydra makes as many bite attacks as it has heads."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.",
        "attackBonus": 8,
        "damage": {
          "type": "Piercing",
          "roll": "1d10 + 5",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "huge",
      "unaligned"
    ]
  },
  {
    "name": "Kraken",
    "size": "Gargantuan",
    "type": "monstrosity",
    "alignment": "chaotic evil",
    "challengeRating": "23",
    "xp": 50000,
    "strength": 30,
    "dexterity": 11,
    "constitution": 25,
    "intelligence": 22,
    "wisdom": 18,
    "charisma": 20,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 472,
    "hitDice": "27d20",
    "speed": {
      "walk": 20,
      "swim": 60,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "lightning",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "conditionImmunities": [
      {
        "index": "frightened",
        "name": "Frightened",
        "url": "/api/2014/conditions/frightened"
      },
      {
        "index": "paralyzed",
        "name": "Paralyzed",
        "url": "/api/2014/conditions/paralyzed"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "truesight": 120,
      "passivePerception": 14
    },
    "languages": [
      "understands Abyssal",
      "Celestial",
      "Infernal",
      "and Primordial but can't speak",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 7,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The kraken can breathe air and water."
      },
      {
        "name": "Freedom of Movement",
        "description": "The kraken ignores difficult terrain, and magical effects can't reduce its speed or cause it to be restrained. It can spend 5 feet of movement to escape from nonmagical restraints or being grappled."
      },
      {
        "name": "Siege Monster",
        "description": "The kraken deals double damage to objects and structures."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The kraken makes three tentacle attacks, each of which it can replace with one use of Fling."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 23 (3d8 + 10) piercing damage. If the target is a Large or smaller creature grappled by the kraken, that creature is swallowed, and the grapple ends. While swallowed, the creature is blinded and restrained, it has total cover against attacks and other effects outside the kraken, and it takes 42 (12d6) acid damage at the start of each of the kraken's turns. If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, which fall prone in a space within 10 feet of the kraken. If the kraken dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 15 feet of movement, exiting prone.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "3d8 + 10",
          "average": 23
        }
      },
      {
        "name": "Tentacle",
        "description": "Melee Weapon Attack: +7 to hit, reach 30 ft., one target. Hit: 20 (3d6 + 10) bludgeoning damage, and the target is grappled (escape DC 18). Until this grapple ends, the target is restrained. The kraken has ten tentacles, each of which can grapple one target.",
        "attackBonus": 7,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d6 + 10",
          "average": 20
        }
      },
      {
        "name": "Fling",
        "description": "One Large or smaller object held or creature grappled by the kraken is thrown up to 60 feet in a random direction and knocked prone. If a thrown target strikes a solid surface, the target takes 3 (1d6) bludgeoning damage for every 10 feet it was thrown. If the target is thrown at another creature, that creature must succeed on a DC 18 Dexterity saving throw or take the same damage and be knocked prone.",
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d6",
          "average": 3
        }
      },
      {
        "name": "Lightning Storm",
        "description": "The kraken magically creates three bolts of lightning, each of which can strike a target the kraken can see within 120 feet of it. A target must make a DC 23 Dexterity saving throw, taking 22 (4d10) lightning damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Lightning",
          "roll": "4d10",
          "average": 22
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Tentacle Attack or Fling",
        "description": "The kraken makes one tentacle attack or uses its Fling."
      },
      {
        "name": "Lightning Storm (Costs 2 Actions)",
        "description": "The kraken uses Lightning Storm."
      },
      {
        "name": "Ink Cloud (Costs 3 Actions)",
        "description": "While underwater, the kraken expels an ink cloud in a 60-foot radius. The cloud spreads around corners, and that area is heavily obscured to creatures other than the kraken. Each creature other than the kraken that ends its turn there must succeed on a DC 23 Constitution saving throw, taking 16 (3d10) poison damage on a failed save, or half as much damage on a successful one. A strong current disperses the cloud, which otherwise disappears at the end of the kraken's next turn."
      }
    ],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "gargantuan",
      "chaotic evil"
    ]
  },
  {
    "name": "Lamia",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "chaotic evil",
    "challengeRating": "4",
    "xp": 1100,
    "strength": 16,
    "dexterity": 13,
    "constitution": 15,
    "intelligence": 14,
    "wisdom": 15,
    "charisma": 16,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 97,
    "hitDice": "13d10",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Deception": 7,
      "Insight": 4,
      "Stealth": 3
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
      "Abyssal",
      "Common"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Innate Spellcasting",
        "description": "The lamia's innate spellcasting ability is Charisma (spell save DC 13). It can innately cast the following spells, requiring no material components. At will: disguise self (any humanoid form), major image 3/day each: charm person, mirror image, scrying, suggestion 1/day: geas"
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The lamia makes two attacks: one with its claws and one with its dagger or Intoxicating Touch."
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 14 (2d10 + 3) slashing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Slashing",
          "roll": "2d10 + 3",
          "average": 14
        }
      },
      {
        "name": "Dagger",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d4 + 3",
          "average": 5
        }
      },
      {
        "name": "Intoxicating Touch",
        "description": "Melee Spell Attack: +5 to hit, reach 5 ft., one creature. Hit: The target is magically cursed for 1 hour. Until the curse ends, the target has disadvantage on Wisdom saving throws and all ability checks.",
        "attackBonus": 5
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "chaotic evil"
    ]
  },
  {
    "name": "Manticore",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "lawful evil",
    "challengeRating": "3",
    "xp": 700,
    "strength": 17,
    "dexterity": 16,
    "constitution": 17,
    "intelligence": 7,
    "wisdom": 12,
    "charisma": 8,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 68,
    "hitDice": "8d10",
    "speed": {
      "walk": 30,
      "fly": 50,
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
      "passivePerception": 11
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Tail Spike Regrowth",
        "description": "The manticore has twenty-four tail spikes. Used spikes regrow when the manticore finishes a long rest."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The manticore makes three attacks: one with its bite and two with its claws or three with its tail spikes."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d8 + 3",
          "average": 7
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Slashing",
          "roll": "1d6 + 3",
          "average": 6
        }
      },
      {
        "name": "Tail Spike",
        "description": "Ranged Weapon Attack: +5 to hit, range 100/200 ft., one target. Hit: 7 (1d8 + 3) piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d8 + 3",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "lawful evil"
    ]
  },
  {
    "name": "Medusa",
    "size": "Medium",
    "type": "monstrosity",
    "alignment": "lawful evil",
    "challengeRating": "6",
    "xp": 2300,
    "strength": 10,
    "dexterity": 15,
    "constitution": 16,
    "intelligence": 12,
    "wisdom": 13,
    "charisma": 15,
    "armorClass": 15,
    "armorType": "natural",
    "hitPoints": 127,
    "hitDice": "17d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Deception": 5,
      "Insight": 4,
      "Perception": 4,
      "Stealth": 5
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
      "Common"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Petrifying Gaze",
        "description": "When a creature that can see the medusa's eyes starts its turn within 30 ft. of the medusa, the medusa can force it to make a DC 14 Constitution saving throw if the medusa isn't incapacitated and can see the creature. If the saving throw fails by 5 or more, the creature is instantly petrified. Otherwise, a creature that fails the save begins to turn to stone and is restrained. The restrained creature must repeat the saving throw at the end of its next turn, becoming petrified on a failure or ending the effect on a success. The petrification lasts until the creature is freed by the greater restoration spell or other magic.\nUnless surprised, a creature can avert its eyes to avoid the saving throw at the start of its turn. If the creature does so, it can't see the medusa until the start of its next turn, when it can avert its eyes again. If the creature looks at the medusa in the meantime, it must immediately make the save.\nIf the medusa sees itself reflected on a polished surface within 30 ft. of it and in an area of bright light, the medusa is, due to its curse, affected by its own gaze."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The medusa makes either three melee attacks--one with its snake hair and two with its shortsword--or two ranged attacks with its longbow."
      },
      {
        "name": "Snake Hair",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) piercing damage plus 14 (4d6) poison damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d4 + 2",
          "average": 4
        },
        "secondaryDamage": {
          "type": "Poison",
          "roll": "4d6",
          "average": 14,
          "description": "Additional"
        }
      },
      {
        "name": "Shortsword",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d6 + 2",
          "average": 5
        }
      },
      {
        "name": "Longbow",
        "description": "Ranged Weapon Attack: +5 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage plus 7 (2d6) poison damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d8 + 2",
          "average": 6
        },
        "secondaryDamage": {
          "type": "Poison",
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
      "monstrosity",
      "medium",
      "lawful evil"
    ]
  },
  {
    "name": "Merrow",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "chaotic evil",
    "challengeRating": "2",
    "xp": 450,
    "strength": 18,
    "dexterity": 10,
    "constitution": 15,
    "intelligence": 8,
    "wisdom": 10,
    "charisma": 9,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 45,
    "hitDice": "6d10",
    "speed": {
      "walk": 10,
      "swim": 40,
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
      "Abyssal",
      "Aquan"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The merrow can breathe air and water."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The merrow makes two attacks: one with its bite and one with its claws or harpoon."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d8 + 4",
          "average": 8
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) slashing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Slashing",
          "roll": "2d4 + 4",
          "average": 9
        }
      },
      {
        "name": "Harpoon",
        "description": "Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) piercing damage. If the target is a Huge or smaller creature, it must succeed on a Strength contest against the merrow or be pulled up to 20 feet toward the merrow.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "2d6 + 4",
          "average": 11
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "chaotic evil"
    ]
  },
  {
    "name": "Mimic",
    "size": "Medium",
    "type": "monstrosity",
    "alignment": "neutral",
    "challengeRating": "2",
    "xp": 450,
    "strength": 17,
    "dexterity": 12,
    "constitution": 15,
    "intelligence": 5,
    "wisdom": 13,
    "charisma": 8,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 58,
    "hitDice": "9d8",
    "speed": {
      "walk": 15,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Stealth": 5
    },
    "damageResistances": [],
    "damageImmunities": [
      "acid"
    ],
    "conditionImmunities": [
      {
        "index": "prone",
        "name": "Prone",
        "url": "/api/2014/conditions/prone"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 11
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Shapechanger",
        "description": "The mimic can use its action to polymorph into an object or back into its true, amorphous form. Its statistics are the same in each form. Any equipment it is wearing or carrying isn 't transformed. It reverts to its true form if it dies."
      },
      {
        "name": "Adhesive (Object Form Only)",
        "description": "The mimic adheres to anything that touches it. A Huge or smaller creature adhered to the mimic is also grappled by it (escape DC 13). Ability checks made to escape this grapple have disadvantage."
      },
      {
        "name": "False Appearance (Object Form Only)",
        "description": "While the mimic remains motionless, it is indistinguishable from an ordinary object."
      },
      {
        "name": "Grappler",
        "description": "The mimic has advantage on attack rolls against any creature grappled by it."
      }
    ],
    "actions": [
      {
        "name": "Pseudopod",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage. If the mimic is in object form, the target is subjected to its Adhesive trait.",
        "attackBonus": 5,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d8 + 3",
          "average": 7
        }
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 4 (1d8) acid damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d8 + 3",
          "average": 7
        },
        "secondaryDamage": {
          "type": "Acid",
          "roll": "1d8",
          "average": 4,
          "description": "Additional"
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "medium",
      "neutral"
    ]
  },
  {
    "name": "Minotaur",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "chaotic evil",
    "challengeRating": "3",
    "xp": 700,
    "strength": 18,
    "dexterity": 11,
    "constitution": 16,
    "intelligence": 6,
    "wisdom": 16,
    "charisma": 9,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 76,
    "hitDice": "9d10",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 7
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 17
    },
    "languages": [
      "Abyssal"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the minotaur moves at least 10 ft. straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 9 (2d8) piercing damage. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be pushed up to 10 ft. away and knocked prone."
      },
      {
        "name": "Labyrinthine Recall",
        "description": "The minotaur can perfectly recall any path it has traveled."
      },
      {
        "name": "Reckless",
        "description": "At the start of its turn, the minotaur can gain advantage on all melee weapon attack rolls it makes during that turn, but attack rolls against it have advantage until the start of its next turn."
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
      "monstrosity",
      "large",
      "chaotic evil"
    ]
  },
  {
    "name": "Owlbear",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "unaligned",
    "challengeRating": "3",
    "xp": 700,
    "strength": 20,
    "dexterity": 12,
    "constitution": 17,
    "intelligence": 3,
    "wisdom": 12,
    "charisma": 7,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 59,
    "hitDice": "7d10",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 3
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight and Smell",
        "description": "The owlbear has advantage on Wisdom (Perception) checks that rely on sight or smell."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The owlbear makes two attacks: one with its beak and one with its claws."
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one creature. Hit: 10 (1d10 + 5) piercing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "1d10 + 5",
          "average": 10
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Slashing",
          "roll": "2d8 + 5",
          "average": 14
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Phase Spider",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "unaligned",
    "challengeRating": "3",
    "xp": 700,
    "strength": 15,
    "dexterity": 15,
    "constitution": 12,
    "intelligence": 6,
    "wisdom": 10,
    "charisma": 6,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 32,
    "hitDice": "5d10",
    "speed": {
      "walk": 30,
      "climb": 30,
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
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Ethereal Jaunt",
        "description": "As a bonus action, the spider can magically shift from the Material Plane to the Ethereal Plane, or vice versa."
      },
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webbing."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 18 (4d8) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d10 + 2",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "A phase spider possesses the magical ability to phase in and out of the Ethereal Plane. It seems to appear out of nowhere and quickly vanishes after attacking. Its movement on the Ethereal Plane before coming back to the Material Plane makes it seem like it can teleport.",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Purple Worm",
    "size": "Gargantuan",
    "type": "monstrosity",
    "alignment": "unaligned",
    "challengeRating": "15",
    "xp": 13000,
    "strength": 28,
    "dexterity": 7,
    "constitution": 22,
    "intelligence": 1,
    "wisdom": 8,
    "charisma": 4,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 247,
    "hitDice": "15d20",
    "speed": {
      "walk": 50,
      "burrow": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "blindsight": 30,
      "tremorsense": 60,
      "passivePerception": 9
    },
    "languages": [],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Tunneler",
        "description": "The worm can burrow through solid rock at half its burrow speed and leaves a 10-foot-diameter tunnel in its wake."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The worm makes two attacks: one with its bite and one with its stinger."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (3d8 + 9) piercing damage. If the target is a Large or smaller creature, it must succeed on a DC 19 Dexterity saving throw or be swallowed by the worm. A swallowed creature is blinded and restrained, it has total cover against attacks and other effects outside the worm, and it takes 21 (6d6) acid damage at the start of each of the worm's turns.\nIf the worm takes 30 damage or more on a single turn from a creature inside it, the worm must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, which fall prone in a space within 10 feet of the worm. If the worm dies, a swallowed creature is no longer restrained by it and can escape from the corpse by using 20 feet of movement, exiting prone.",
        "attackBonus": 9,
        "damage": {
          "type": "Piercing",
          "roll": "3d8 + 9",
          "average": 22
        }
      },
      {
        "name": "Tail Stinger",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one creature. Hit: 19 (3d6 + 9) piercing damage, and the target must make a DC 19 Constitution saving throw, taking 42 (12d6) poison damage on a failed save, or half as much damage on a successful one.",
        "attackBonus": 9,
        "damage": {
          "type": "Piercing",
          "roll": "3d6 + 9",
          "average": 19
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "gargantuan",
      "unaligned"
    ]
  },
  {
    "name": "Remorhaz",
    "size": "Huge",
    "type": "monstrosity",
    "alignment": "unaligned",
    "challengeRating": "11",
    "xp": 7200,
    "strength": 24,
    "dexterity": 13,
    "constitution": 21,
    "intelligence": 4,
    "wisdom": 10,
    "charisma": 5,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 195,
    "hitDice": "17d12",
    "speed": {
      "walk": 30,
      "burrow": 20,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "cold",
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "tremorsense": 60,
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Heated Body",
        "description": "A creature that touches the remorhaz or hits it with a melee attack while within 5 feet of it takes 10 (3d6) fire damage."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 40 (6d10 + 7) piercing damage plus 10 (3d6) fire damage. If the target is a creature, it is grappled (escape DC 17). Until this grapple ends, the target is restrained, and the remorhaz can't bite another target.",
        "attackBonus": 11,
        "damage": {
          "type": "Piercing",
          "roll": "6d10 + 7",
          "average": 40
        },
        "secondaryDamage": {
          "type": "Fire",
          "roll": "3d6",
          "average": 10,
          "description": "Additional"
        }
      },
      {
        "name": "Swallow",
        "description": "The remorhaz makes one bite attack against a Medium or smaller creature it is grappling. If the attack hits, that creature takes the bite's damage and is swallowed, and the grapple ends. While swallowed, the creature is blinded and restrained, it has total cover against attacks and other effects outside the remorhaz, and it takes 21 (6d6) acid damage at the start of each of the remorhaz's turns.\nIf the remorhaz takes 30 damage or more on a single turn from a creature inside it, the remorhaz must succeed on a DC 15 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, which fall prone in a space within 10 feet of the remorhaz. If the remorhaz dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 15 feet of movement, exiting prone.",
        "damage": {
          "type": "Acid",
          "roll": "6d6",
          "average": 21
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "huge",
      "unaligned"
    ]
  },
  {
    "name": "Roc",
    "size": "Gargantuan",
    "type": "monstrosity",
    "alignment": "unaligned",
    "challengeRating": "11",
    "xp": 7200,
    "strength": 28,
    "dexterity": 10,
    "constitution": 20,
    "intelligence": 3,
    "wisdom": 10,
    "charisma": 9,
    "armorClass": 15,
    "armorType": "natural",
    "hitPoints": 248,
    "hitDice": "16d20",
    "speed": {
      "walk": 20,
      "fly": 120,
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
      "passivePerception": 14
    },
    "languages": [],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The roc has advantage on Wisdom (Perception) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The roc makes two attacks: one with its beak and one with its talons."
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 27 (4d8 + 9) piercing damage.",
        "attackBonus": 13,
        "damage": {
          "type": "Piercing",
          "roll": "4d8 + 9",
          "average": 27
        }
      },
      {
        "name": "Talons",
        "description": "Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 23 (4d6 + 9) slashing damage, and the target is grappled (escape DC 19). Until this grapple ends, the target is restrained, and the roc can't use its talons on another target.",
        "attackBonus": 13,
        "damage": {
          "type": "Slashing",
          "roll": "4d6 + 9",
          "average": 23
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "gargantuan",
      "unaligned"
    ]
  },
  {
    "name": "Roper",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "neutral evil",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 18,
    "dexterity": 8,
    "constitution": 17,
    "intelligence": 7,
    "wisdom": 16,
    "charisma": 6,
    "armorClass": 20,
    "armorType": "natural",
    "hitPoints": 93,
    "hitDice": "11d10",
    "speed": {
      "walk": 10,
      "climb": 10,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 6,
      "Stealth": 5
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 16
    },
    "languages": [],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "False Appearance",
        "description": "While the roper remains motionless, it is indistinguishable from a normal cave formation, such as a stalagmite."
      },
      {
        "name": "Grasping Tendrils",
        "description": "The roper can have up to six tendrils at a time. Each tendril can be attacked (AC 20; 10 hit points; immunity to poison and psychic damage). Destroying a tendril deals no damage to the roper, which can extrude a replacement tendril on its next turn. A tendril can also be broken if a creature takes an action and succeeds on a DC 15 Strength check against it."
      },
      {
        "name": "Spider Climb",
        "description": "The roper can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The roper makes four attacks with its tendrils, uses Reel, and makes one attack with its bite."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) piercing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "4d8 + 4",
          "average": 22
        }
      },
      {
        "name": "Tendril",
        "description": "Melee Weapon Attack: +7 to hit, reach 50 ft., one creature. Hit: The target is grappled (escape DC 15). Until the grapple ends, the target is restrained and has disadvantage on Strength checks and Strength saving throws, and the roper can't use the same tendril on another target.",
        "attackBonus": 7
      },
      {
        "name": "Reel",
        "description": "The roper pulls each creature grappled by it up to 25 ft. straight toward it."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "neutral evil"
    ]
  },
  {
    "name": "Rust Monster",
    "size": "Medium",
    "type": "monstrosity",
    "alignment": "unaligned",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 13,
    "dexterity": 12,
    "constitution": 13,
    "intelligence": 2,
    "wisdom": 13,
    "charisma": 6,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 27,
    "hitDice": "5d8",
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
      "passivePerception": 11
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Iron Scent",
        "description": "The rust monster can pinpoint, by scent, the location of ferrous metal within 30 feet of it."
      },
      {
        "name": "Rust Metal",
        "description": "Any nonmagical weapon made of metal that hits the rust monster corrodes. After dealing damage, the weapon takes a permanent and cumulative -1 penalty to damage rolls. If its penalty drops to -5, the weapon is destroyed. Nonmagical ammunition made of metal that hits the rust monster is destroyed after dealing damage."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Piercing",
          "roll": "1d8 + 1",
          "average": 5
        }
      },
      {
        "name": "Antennae",
        "description": "The rust monster corrodes a nonmagical ferrous metal object it can see within 5 feet of it. If the object isn't being worn or carried, the touch destroys a 1-foot cube of it. If the object is being worn or carried by a creature, the creature can make a DC 11 Dexterity saving throw to avoid the rust monster's touch.\nIf the object touched is either metal armor or a metal shield being worn or carried, its takes a permanent and cumulative -1 penalty to the AC it offers. Armor reduced to an AC of 10 or a shield that drops to a +0 bonus is destroyed. If the object touched is a held metal weapon, it rusts as described in the Rust Metal trait."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Spirit Naga",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "chaotic evil",
    "challengeRating": "8",
    "xp": 3900,
    "strength": 18,
    "dexterity": 17,
    "constitution": 14,
    "intelligence": 16,
    "wisdom": 15,
    "charisma": 16,
    "armorClass": 15,
    "armorType": "natural",
    "hitPoints": 75,
    "hitDice": "10d10",
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
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
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
      "passivePerception": 12
    },
    "languages": [
      "Abyssal",
      "Common"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Rejuvenation",
        "description": "If it dies, the naga returns to life in 1d6 days and regains all its hit points. Only a wish spell can prevent this trait from functioning."
      },
      {
        "name": "Spellcasting",
        "description": "The naga is a 10th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks), and it needs only verbal components to cast its spells. It has the following wizard spells prepared:\n\n- Cantrips (at will): mage hand, minor illusion, ray of frost\n- 1st level (4 slots): charm person, detect magic, sleep\n- 2nd level (3 slots): detect thoughts, hold person\n- 3rd level (3 slots): lightning bolt, water breathing\n- 4th level (3 slots): blight, dimension door\n- 5th level (2 slots): dominate person"
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one creature. Hit: 7 (1d6 + 4) piercing damage, and the target must make a DC 13 Constitution saving throw, taking 31 (7d8) poison damage on a failed save, or half as much damage on a successful one.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "1d6 + 4",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "chaotic evil"
    ]
  },
  {
    "name": "Tarrasque",
    "size": "Gargantuan",
    "type": "monstrosity",
    "alignment": "unaligned",
    "challengeRating": "30",
    "xp": 155000,
    "strength": 30,
    "dexterity": 11,
    "constitution": 30,
    "intelligence": 3,
    "wisdom": 11,
    "charisma": 11,
    "armorClass": 25,
    "armorType": "natural",
    "hitPoints": 676,
    "hitDice": "33d20",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "fire",
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
      "blindsight": 120,
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 9,
    "traits": [
      {
        "name": "Legendary Resistance",
        "description": "If the tarrasque fails a saving throw, it can choose to succeed instead."
      },
      {
        "name": "Magic Resistance",
        "description": "The tarrasque has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Reflective Carapace",
        "description": "Any time the tarrasque is targeted by a magic missile spell, a line spell, or a spell that requires a ranged attack roll, roll a d6. On a 1 to 5, the tarrasque is unaffected. On a 6, the tarrasque is unaffected, and the effect is reflected back at the caster as though it originated from the tarrasque, turning the caster into the target."
      },
      {
        "name": "Siege Monster",
        "description": "The tarrasque deals double damage to objects and structures."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The tarrasque can use its Frightful Presence. It then makes five attacks: one with its bite, two with its claws, one with its horns, and one with its tail. It can use its Swallow instead of its bite."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +19 to hit, reach 10 ft., one target. Hit: 36 (4d12 + 10) piercing damage. If the target is a creature, it is grappled (escape DC 20). Until this grapple ends, the target is restrained, and the tarrasque can't bite another target.",
        "attackBonus": 19,
        "damage": {
          "type": "Piercing",
          "roll": "4d12 + 10",
          "average": 36
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +19 to hit, reach 15 ft., one target. Hit: 28 (4d8 + 10) slashing damage.",
        "attackBonus": 19,
        "damage": {
          "type": "Slashing",
          "roll": "4d8 + 10",
          "average": 28
        }
      },
      {
        "name": "Horns",
        "description": "Melee Weapon Attack: +19 to hit, reach 10 ft., one target. Hit: 32 (4d10 + 10) piercing damage.",
        "attackBonus": 19,
        "damage": {
          "type": "Piercing",
          "roll": "4d10 + 10",
          "average": 32
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +19 to hit, reach 20 ft., one target. Hit: 24 (4d6 + 10) bludgeoning damage. If the target is a creature, it must succeed on a DC 20 Strength saving throw or be knocked prone.",
        "attackBonus": 19,
        "damage": {
          "type": "Bludgeoning",
          "roll": "4d6 + 10",
          "average": 24
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the tarrasque's choice within 120 feet of it and aware of it must succeed on a DC 17 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, with disadvantage if the tarrasque is within line of sight, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the tarrasque's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Swallow",
        "description": "The tarrasque makes one bite attack against a Large or smaller creature it is grappling. If the attack hits, the target takes the bite's damage, the target is swallowed, and the grapple ends. While swallowed, the creature is blinded and restrained, it has total cover against attacks and other effects outside the tarrasque, and it takes 56 (16d6) acid damage at the start of each of the tarrasque's turns.\nIf the tarrasque takes 60 damage or more on a single turn from a creature inside it, the tarrasque must succeed on a DC 20 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, which fall prone in a space within 10 feet of the tarrasque. If the tarrasque dies, a swallowed creature is no longer restrained by it and can escape from the corpse by using 30 feet of movement, exiting prone.",
        "damage": {
          "type": "Acid",
          "roll": "16d6",
          "average": 56
        }
      }
    ],
    "legendaryActions": [
      {
        "name": "Attack",
        "description": "The tarrasque makes one claw attack or tail attack."
      },
      {
        "name": "Move",
        "description": "The tarrasque moves up to half its speed."
      },
      {
        "name": "Chomp (Costs 2 Actions)",
        "description": "The tarrasque makes one bite attack or uses its Swallow."
      }
    ],
    "description": "",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "gargantuan",
      "unaligned"
    ]
  },
  {
    "name": "Winter Wolf",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "neutral evil",
    "challengeRating": "3",
    "xp": 700,
    "strength": 18,
    "dexterity": 13,
    "constitution": 14,
    "intelligence": 7,
    "wisdom": 12,
    "charisma": 8,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 75,
    "hitDice": "10d10",
    "speed": {
      "walk": 50,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 5,
      "Stealth": 3
    },
    "damageResistances": [],
    "damageImmunities": [
      "cold"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 15
    },
    "languages": [
      "Common",
      "Giant",
      "Winter Wolf"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      },
      {
        "name": "Snow Camouflage",
        "description": "The wolf has advantage on Dexterity (Stealth) checks made to hide in snowy terrain."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) piercing damage. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be knocked prone.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "2d6 + 4",
          "average": 11
        }
      },
      {
        "name": "Cold Breath",
        "description": "The wolf exhales a blast of freezing wind in a 15-foot cone. Each creature in that area must make a DC 12 Dexterity saving throw, taking 18 (4d8) cold damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Cold",
          "roll": "4d8",
          "average": 18
        }
      }
    ],
    "legendaryActions": [],
    "description": "The arctic-dwelling winter wolf is as large as a dire wolf but has snow-white fur and pale blue eyes. Frost giants use these evil creatures as guards and hunting companions, putting the wolves’ deadly breath weapon to use against their foes. Winter wolves communicate with one another using growls and barks, but they speak Common and Giant well enough to follow simple conversations.",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "neutral evil"
    ]
  },
  {
    "name": "Worg",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "neutral evil",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 16,
    "dexterity": 13,
    "constitution": 13,
    "intelligence": 7,
    "wisdom": 11,
    "charisma": 8,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 26,
    "hitDice": "4d10",
    "speed": {
      "walk": 50,
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
      "Goblin",
      "Worg"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The worg has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "2d6 + 3",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "A worg is an evil predator that delights in hunting and devouring creatures weaker than itself. Cunning and malevolent, worgs roam across the remote wilderness or are raised by goblins and hobgoblins. Those creatures use worgs as mounts, but a worg will turn on its rider if it feels mistreated or malnourished. Worgs speak in their own language and Goblin, and a few learn to speak Common as well.",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "neutral evil"
    ]
  }
];
