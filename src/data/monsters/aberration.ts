import { Monster } from '../../types/monster';

export const aberrationMonsters: Monster[] = [
  {
    "name": "Aboleth",
    "size": "Large",
    "type": "aberration",
    "alignment": "lawful evil",
    "challengeRating": "10",
    "xp": 5900,
    "strength": 21,
    "dexterity": 9,
    "constitution": 15,
    "intelligence": 18,
    "wisdom": 15,
    "charisma": 18,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 135,
    "hitDice": "18d10",
    "speed": {
      "walk": 10,
      "swim": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "History": 12,
      "Perception": 10
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 120,
      "passivePerception": 20
    },
    "languages": [
      "Deep Speech",
      "telepathy 120 ft."
    ],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The aboleth can breathe air and water."
      },
      {
        "name": "Mucous Cloud",
        "description": "While underwater, the aboleth is surrounded by transformative mucus. A creature that touches the aboleth or that hits it with a melee attack while within 5 ft. of it must make a DC 14 Constitution saving throw. On a failure, the creature is diseased for 1d4 hours. The diseased creature can breathe only underwater."
      },
      {
        "name": "Probing Telepathy",
        "description": "If a creature communicates telepathically with the aboleth, the aboleth learns the creature's greatest desires if the aboleth can see the creature."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The aboleth makes three tentacle attacks."
      },
      {
        "name": "Tentacle",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Constitution saving throw or become diseased. The disease has no effect for 1 minute and can be removed by any magic that cures disease. After 1 minute, the diseased creature's skin becomes translucent and slimy, the creature can't regain hit points unless it is underwater, and the disease can be removed only by heal or another disease-curing spell of 6th level or higher. When the creature is outside a body of water, it takes 6 (1d12) acid damage every 10 minutes unless moisture is applied to the skin before 10 minutes have passed.",
        "attackBonus": 9,
        "damage": {
          "type": "Acid",
          "roll": "1d12",
          "average": 6
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 15 (3d6 + 5) bludgeoning damage.",
        "attackBonus": 9
      },
      {
        "name": "Enslave",
        "description": "The aboleth targets one creature it can see within 30 ft. of it. The target must succeed on a DC 14 Wisdom saving throw or be magically charmed by the aboleth until the aboleth dies or until it is on a different plane of existence from the target. The charmed target is under the aboleth's control and can't take reactions, and the aboleth and the target can communicate telepathically with each other over any distance.\nWhenever the charmed target takes damage, the target can repeat the saving throw. On a success, the effect ends. No more than once every 24 hours, the target can also repeat the saving throw when it is at least 1 mile away from the aboleth."
      }
    ],
    "legendaryActions": [
      {
        "name": "Detect",
        "description": "The aboleth makes a Wisdom (Perception) check."
      },
      {
        "name": "Tail Swipe",
        "description": "The aboleth makes one tail attack."
      },
      {
        "name": "Psychic Drain (Costs 2 Actions)",
        "description": "One creature charmed by the aboleth takes 10 (3d6) psychic damage, and the aboleth regains hit points equal to the damage the creature takes."
      }
    ],
    "description": "",
    "source": "SRD",
    "tags": [
      "aberration",
      "large",
      "lawful evil"
    ]
  },
  {
    "name": "Chuul",
    "size": "Large",
    "type": "aberration",
    "alignment": "chaotic evil",
    "challengeRating": "4",
    "xp": 1100,
    "strength": 19,
    "dexterity": 10,
    "constitution": 16,
    "intelligence": 5,
    "wisdom": 11,
    "charisma": 5,
    "armorClass": 16,
    "armorType": "natural",
    "hitPoints": 93,
    "hitDice": "11d10",
    "speed": {
      "walk": 30,
      "swim": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 4
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
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 14
    },
    "languages": [
      "understands Deep Speech but can't speak"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The chuul can breathe air and water."
      },
      {
        "name": "Sense Magic",
        "description": "The chuul senses magic within 120 feet of it at will. This trait otherwise works like the detect magic spell but isn't itself magical."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The chuul makes two pincer attacks. If the chuul is grappling a creature, the chuul can also use its tentacles once."
      },
      {
        "name": "Pincer",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage. The target is grappled (escape DC 14) if it is a Large or smaller creature and the chuul doesn't have two other creatures grappled.",
        "attackBonus": 6
      },
      {
        "name": "Tentacles",
        "description": "One creature grappled by the chuul must succeed on a DC 13 Constitution saving throw or be poisoned for 1 minute. Until this poison ends, the target is paralyzed. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "aberration",
      "large",
      "chaotic evil"
    ]
  },
  {
    "name": "Cloaker",
    "size": "Large",
    "type": "aberration",
    "alignment": "chaotic neutral",
    "challengeRating": "8",
    "xp": 3900,
    "strength": 17,
    "dexterity": 15,
    "constitution": 12,
    "intelligence": 13,
    "wisdom": 12,
    "charisma": 14,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 78,
    "hitDice": "12d10",
    "speed": {
      "walk": 10,
      "fly": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Stealth": 5
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "passivePerception": 11
    },
    "languages": [
      "Deep Speech",
      "Undercommon"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Damage Transfer",
        "description": "While attached to a creature, the cloaker takes only half the damage dealt to it (rounded down). and that creature takes the other half."
      },
      {
        "name": "False Appearance",
        "description": "While the cloaker remains motionless without its underside exposed, it is indistinguishable from a dark leather cloak."
      },
      {
        "name": "Light Sensitivity",
        "description": "While in bright light, the cloaker has disadvantage on attack rolls and Wisdom (Perception) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The cloaker makes two attacks: one with its bite and one with its tail."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 10 (2d6 + 3) piercing damage, and if the target is Large or smaller, the cloaker attaches to it. If the cloaker has advantage against the target, the cloaker attaches to the target's head, and the target is blinded and unable to breathe while the cloaker is attached. While attached, the cloaker can make this attack only against the target and has advantage on the attack roll. The cloaker can detach itself by spending 5 feet of its movement. A creature, including the target, can take its action to detach the cloaker by succeeding on a DC 16 Strength check.",
        "attackBonus": 6
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one creature. Hit: 7 (1d8 + 3) slashing damage.",
        "attackBonus": 6
      },
      {
        "name": "Moan",
        "description": "Each creature within 60 feet of the cloaker that can hear its moan and that isn't an aberration must succeed on a DC 13 Wisdom saving throw or become frightened until the end of the cloaker's next turn. If a creature's saving throw is successful, the creature is immune to the cloaker's moan for the next 24 hours."
      },
      {
        "name": "Phantasms",
        "description": "The cloaker magically creates three illusory duplicates of itself if it isn't in bright light. The duplicates move with it and mimic its actions, shifting position so as to make it impossible to track which cloaker is the real one. If the cloaker is ever in an area of bright light, the duplicates disappear.\nWhenever any creature targets the cloaker with an attack or a harmful spell while a duplicate remains, that creature rolls randomly to determine whether it targets the cloaker or one of the duplicates. A creature is unaffected by this magical effect if it can't see or if it relies on senses other than sight.\nA duplicate has the cloaker's AC and uses its saving throws. If an attack hits a duplicate, or if a duplicate fails a saving throw against an effect that deals damage, the duplicate disappears."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "aberration",
      "large",
      "chaotic neutral"
    ]
  },
  {
    "name": "Gibbering Mouther",
    "size": "Medium",
    "type": "aberration",
    "alignment": "neutral",
    "challengeRating": "2",
    "xp": 450,
    "strength": 10,
    "dexterity": 8,
    "constitution": 16,
    "intelligence": 3,
    "wisdom": 10,
    "charisma": 6,
    "armorClass": 9,
    "armorType": "dex",
    "hitPoints": 67,
    "hitDice": "9d8",
    "speed": {
      "walk": 10,
      "swim": 10,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
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
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Aberrant Ground",
        "description": "The ground in a 10-foot radius around the mouther is doughlike difficult terrain. Each creature that starts its turn in that area must succeed on a DC 10 Strength saving throw or have its speed reduced to 0 until the start of its next turn."
      },
      {
        "name": "Gibbering",
        "description": "The mouther babbles incoherently while it can see any creature and isn't incapacitated. Each creature that starts its turn within 20 feet of the mouther and can hear the gibbering must succeed on a DC 10 Wisdom saving throw. On a failure, the creature can't take reactions until the start of its next turn and rolls a d8 to determine what it does during its turn. On a 1 to 4, the creature does nothing. On a 5 or 6, the creature takes no action or bonus action and uses all its movement to move in a randomly determined direction. On a 7 or 8, the creature makes a melee attack against a randomly determined creature within its reach or does nothing if it can't make such an attack."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The gibbering mouther makes one bite attack and, if it can, uses its Blinding Spittle."
      },
      {
        "name": "Bites",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one creature. Hit: 17 (5d6) piercing damage. If the target is Medium or smaller, it must succeed on a DC 10 Strength saving throw or be knocked prone. If the target is killed by this damage, it is absorbed into the mouther.",
        "attackBonus": 2,
        "damage": {
          "type": "Piercing",
          "roll": "5d6",
          "average": 17
        }
      },
      {
        "name": "Blinding Spittle",
        "description": "The mouther spits a chemical glob at a point it can see within 15 feet of it. The glob explodes in a blinding flash of light on impact. Each creature within 5 feet of the flash must succeed on a DC 13 Dexterity saving throw or be blinded until the end of the mouther's next turn."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "aberration",
      "medium",
      "neutral"
    ]
  },
  {
    "name": "Otyugh",
    "size": "Large",
    "type": "aberration",
    "alignment": "neutral",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 16,
    "dexterity": 11,
    "constitution": 19,
    "intelligence": 6,
    "wisdom": 13,
    "charisma": 6,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 114,
    "hitDice": "12d10",
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
      "darkvision": 120,
      "passivePerception": 11
    },
    "languages": [
      "Otyugh"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Limited Telepathy",
        "description": "The otyugh can magically transmit simple messages and images to any creature within 120 ft. of it that can understand a language. This form of telepathy doesn't allow the receiving creature to telepathically respond."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The otyugh makes three attacks: one with its bite and two with its tentacles."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) piercing damage. If the target is a creature, it must succeed on a DC 15 Constitution saving throw against disease or become poisoned until the disease is cured. Every 24 hours that elapse, the target must repeat the saving throw, reducing its hit point maximum by 5 (1d10) on a failure. The disease is cured on a success. The target dies if the disease reduces its hit point maximum to 0. This reduction to the target's hit point maximum lasts until the disease is cured.",
        "attackBonus": 6
      },
      {
        "name": "Tentacle",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage plus 4 (1d8) piercing damage. If the target is Medium or smaller, it is grappled (escape DC 13) and restrained until the grapple ends. The otyugh has two tentacles, each of which can grapple one target.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d8",
          "average": 4
        }
      },
      {
        "name": "Tentacle Slam",
        "description": "The otyugh slams creatures grappled by it into each other or a solid surface. Each creature must succeed on a DC 14 Constitution saving throw or take 10 (2d6 + 3) bludgeoning damage and be stunned until the end of the otyugh's next turn. On a successful save, the target takes half the bludgeoning damage and isn't stunned."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "aberration",
      "large",
      "neutral"
    ]
  }
];
