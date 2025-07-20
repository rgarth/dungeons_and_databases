import { Monster } from '../../types/monster';

export const beastMonsters: Monster[] = [
  {
    "name": "Ape",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 16,
    "dexterity": 14,
    "constitution": 14,
    "intelligence": 6,
    "wisdom": 12,
    "charisma": 7,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 19,
    "hitDice": "3d8",
    "speed": {
      "walk": 30,
      "climb": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Athletics": 5,
      "Perception": 3
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The ape makes two fist attacks.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Fist",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Fist",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Rock",
        "desc": "Ranged Weapon Attack: +5 to hit, range 25/50 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
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
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Axe Beak",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 14,
    "dexterity": 12,
    "constitution": 12,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 5,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 19,
    "hitDice": "3d10",
    "speed": {
      "walk": 50,
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
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Beak",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d8+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "An axe beak is a tall flightless bird with strong legs and a heavy, wedge-shaped beak. It has a nasty disposition and tends to attack any unfamiliar creature that wanders too close.",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Baboon",
    "size": "Small",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 8,
    "dexterity": 14,
    "constitution": 11,
    "intelligence": 4,
    "wisdom": 12,
    "charisma": 6,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 3,
    "hitDice": "1d6",
    "speed": {
      "walk": 30,
      "climb": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 11
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The baboon has advantage on an attack roll against a creature if at least one of the baboon's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 1 (1d4 - 1) piercing damage.",
        "attack_bonus": 1,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4-1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "small",
      "unaligned"
    ]
  },
  {
    "name": "Badger",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 4,
    "dexterity": 11,
    "constitution": 12,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 5,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 3,
    "hitDice": "1d4",
    "speed": {
      "walk": 20,
      "burrow": 5,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 30,
      "passivePerception": 11
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The badger has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 1 piercing damage.",
        "attack_bonus": 2,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Bat",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 2,
    "dexterity": 15,
    "constitution": 8,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 4,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 1,
    "hitDice": "1d4",
    "speed": {
      "walk": 5,
      "fly": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "blindsight": 60,
      "passivePerception": 11
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Echolocation",
        "description": "The bat can't use its blindsight while deafened."
      },
      {
        "name": "Keen Hearing",
        "description": "The bat has advantage on Wisdom (Perception) checks that rely on hearing."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +0 to hit, reach 5 ft., one creature. Hit: 1 piercing damage.",
        "attack_bonus": 0,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Black Bear",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 15,
    "dexterity": 10,
    "constitution": 14,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 7,
    "armorClass": 11,
    "armorType": "natural",
    "hitPoints": 19,
    "hitDice": "3d8",
    "speed": {
      "walk": 40,
      "climb": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The bear has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The bear makes two attacks: one with its bite and one with its claws.",
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
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attack_bonus": 3,
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
        "name": "Claws",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage.",
        "attack_bonus": 3,
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
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Blood Hawk",
    "size": "Small",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 6,
    "dexterity": 14,
    "constitution": 10,
    "intelligence": 3,
    "wisdom": 14,
    "charisma": 5,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 7,
    "hitDice": "2d6",
    "speed": {
      "walk": 10,
      "fly": 60,
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
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The hawk has advantage on Wisdom (Perception) checks that rely on sight."
      },
      {
        "name": "Pack Tactics",
        "description": "The hawk has advantage on an attack roll against a creature if at least one of the hawk's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Beak",
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
      }
    ],
    "legendaryActions": [],
    "description": "Taking its name from its crimson feathers and aggressive nature, the blood hawk fearlessly attacks almost any animal, stabbing it with its daggerlike beak. Blood hawks flock together in large numbers, attacking as a pack to take down prey.",
    "source": "SRD",
    "tags": [
      "beast",
      "small",
      "unaligned"
    ]
  },
  {
    "name": "Boar",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 13,
    "dexterity": 11,
    "constitution": 12,
    "intelligence": 2,
    "wisdom": 9,
    "charisma": 5,
    "armorClass": 11,
    "armorType": "natural",
    "hitPoints": 11,
    "hitDice": "2d8",
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
      "passivePerception": 9
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the boar moves at least 20 ft. straight toward a target and then hits it with a tusk attack on the same turn, the target takes an extra 3 (1d6) slashing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone."
      },
      {
        "name": "Relentless",
        "description": "If the boar takes 7 damage or less that would reduce it to 0 hit points, it is reduced to 1 hit point instead."
      }
    ],
    "actions": [
      {
        "name": "Tusk",
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
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Brown Bear",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "1",
    "xp": 200,
    "strength": 19,
    "dexterity": 10,
    "constitution": 16,
    "intelligence": 2,
    "wisdom": 13,
    "charisma": 7,
    "armorClass": 11,
    "armorType": "natural",
    "hitPoints": 34,
    "hitDice": "4d10",
    "speed": {
      "walk": 40,
      "climb": 30,
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
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The bear has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The bear makes two attacks: one with its bite and one with its claws.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Bite",
            "count": "1",
            "type": "ability"
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
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+4"
          }
        ],
        "actions": []
      },
      {
        "name": "Claws",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.",
        "attack_bonus": 5,
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
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Camel",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 16,
    "dexterity": 8,
    "constitution": 14,
    "intelligence": 2,
    "wisdom": 8,
    "charisma": 5,
    "armorClass": 9,
    "armorType": "dex",
    "hitPoints": 15,
    "hitDice": "2d10",
    "speed": {
      "walk": 50,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 9
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.",
        "attack_bonus": 5,
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
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Cat",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 3,
    "dexterity": 15,
    "constitution": 10,
    "intelligence": 3,
    "wisdom": 12,
    "charisma": 7,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 2,
    "hitDice": "1d4",
    "speed": {
      "walk": 40,
      "climb": 30,
      "hover": false
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
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The cat has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "name": "Claws",
        "desc": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 slashing damage.",
        "attack_bonus": 0,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Constrictor Snake",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 15,
    "dexterity": 14,
    "constitution": 12,
    "intelligence": 1,
    "wisdom": 10,
    "charisma": 3,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 13,
    "hitDice": "2d10",
    "speed": {
      "walk": 30,
      "swim": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "blindsight": 10,
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) piercing damage.",
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
        "name": "Constrict",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) bludgeoning damage, and the target is grappled (escape DC 14). Until this grapple ends, the creature is restrained, and the snake can't constrict another target.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
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
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Crab",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 2,
    "dexterity": 11,
    "constitution": 10,
    "intelligence": 1,
    "wisdom": 8,
    "charisma": 2,
    "armorClass": 11,
    "armorType": "natural",
    "hitPoints": 2,
    "hitDice": "1d4",
    "speed": {
      "walk": 20,
      "swim": 20,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Stealth": 2
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "blindsight": 30,
      "passivePerception": 9
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The crab can breathe air and water."
      }
    ],
    "actions": [
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 bludgeoning damage.",
        "attack_bonus": 0,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Crocodile",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 15,
    "dexterity": 10,
    "constitution": 13,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 5,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 19,
    "hitDice": "3d10",
    "speed": {
      "walk": 20,
      "swim": 20,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Stealth": 2
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The crocodile can hold its breath for 15 minutes."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target is grappled (escape DC 12). Until this grapple ends, the target is restrained, and the crocodile can't bite another target",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d10+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Deer",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 11,
    "dexterity": 16,
    "constitution": 11,
    "intelligence": 2,
    "wisdom": 14,
    "charisma": 5,
    "armorClass": 13,
    "armorType": "dex",
    "hitPoints": 4,
    "hitDice": "1d8",
    "speed": {
      "walk": 50,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 12
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage.",
        "attack_bonus": 2,
        "damage": [
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
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Dire Wolf",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "1",
    "xp": 200,
    "strength": 17,
    "dexterity": 15,
    "constitution": 15,
    "intelligence": 3,
    "wisdom": 12,
    "charisma": 7,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 37,
    "hitDice": "5d10",
    "speed": {
      "walk": 50,
      "hover": false
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
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
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
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Draft Horse",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 18,
    "dexterity": 10,
    "constitution": 12,
    "intelligence": 2,
    "wisdom": 11,
    "charisma": 7,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 19,
    "hitDice": "3d10",
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
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Hooves",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) bludgeoning damage.",
        "attack_bonus": 6,
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
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Eagle",
    "size": "Small",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 6,
    "dexterity": 15,
    "constitution": 10,
    "intelligence": 2,
    "wisdom": 14,
    "charisma": 7,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 3,
    "hitDice": "1d6",
    "speed": {
      "walk": 10,
      "fly": 60,
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
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The eagle has advantage on Wisdom (Perception) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Talons",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage.",
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
      "beast",
      "small",
      "unaligned"
    ]
  },
  {
    "name": "Elephant",
    "size": "Huge",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "4",
    "xp": 1100,
    "strength": 22,
    "dexterity": 9,
    "constitution": 17,
    "intelligence": 3,
    "wisdom": 11,
    "charisma": 6,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 76,
    "hitDice": "8d12",
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
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Trampling Charge",
        "description": "If the elephant moves at least 20 ft. straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 12 Strength saving throw or be knocked prone. If the target is prone, the elephant can make one stomp attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "name": "Gore",
        "desc": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 19 (3d8 + 6) piercing damage.",
        "attack_bonus": 8,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "3d8+6"
          }
        ],
        "actions": []
      },
      {
        "name": "Stomp",
        "desc": "Melee Weapon Attack: +8 to hit, reach 5 ft., one prone creature. Hit: 22 (3d10 + 6) bludgeoning damage.",
        "attack_bonus": 8,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "3d10+6"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned"
    ]
  },
  {
    "name": "Elk",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 16,
    "dexterity": 10,
    "constitution": 12,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 6,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 13,
    "hitDice": "2d10",
    "speed": {
      "walk": 50,
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
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the elk moves at least 20 ft. straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone."
      }
    ],
    "actions": [
      {
        "name": "Ram",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Hooves",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one prone creature. Hit: 8 (2d4 + 3) bludgeoning damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d4+3"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Flying Snake",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 4,
    "dexterity": 18,
    "constitution": 11,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 5,
    "armorClass": 14,
    "armorType": "dex",
    "hitPoints": 5,
    "hitDice": "2d4",
    "speed": {
      "walk": 30,
      "fly": 60,
      "swim": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "blindsight": 10,
      "passivePerception": 11
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Flyby",
        "description": "The snake doesn't provoke opportunity attacks when it flies out of an enemy's reach."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 1 piercing damage plus 7 (3d4) poison damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1"
          },
          {
            "damage_type": {
              "index": "poison",
              "name": "Poison",
              "url": "/api/2014/damage-types/poison"
            },
            "damage_dice": "3d4"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "A flying snake is a brightly colored, winged serpent found in remote jungles. Tribespeople and cultists sometimes domesticate flying snakes to serve as messengers that deliver scrolls wrapped in their coils.",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Frog",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 0,
    "strength": 1,
    "dexterity": 13,
    "constitution": 8,
    "intelligence": 1,
    "wisdom": 8,
    "charisma": 3,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 1,
    "hitDice": "1d4",
    "speed": {
      "walk": 20,
      "swim": 20,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 1,
      "Stealth": 3
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 30,
      "passivePerception": 11
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The frog can breathe air and water"
      },
      {
        "name": "Standing Leap",
        "description": "The frog's long jump is up to 10 ft. and its high jump is up to 5 ft., with or without a running start."
      }
    ],
    "actions": [],
    "legendaryActions": [],
    "description": "A frog has no effective attacks. It feeds on small insects and typically dwells near water, in trees, or underground. The frog’s statistics can also be used to represent a toad.",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Giant Ape",
    "size": "Huge",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "7",
    "xp": 2900,
    "strength": 23,
    "dexterity": 14,
    "constitution": 18,
    "intelligence": 7,
    "wisdom": 12,
    "charisma": 7,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 157,
    "hitDice": "15d12",
    "speed": {
      "walk": 40,
      "climb": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Athletics": 9,
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
    "proficiencyBonus": 3,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The ape makes two fist attacks.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Fist",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Fist",
        "desc": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (3d10 + 6) bludgeoning damage.",
        "attack_bonus": 9,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "3d10+6"
          }
        ],
        "actions": []
      },
      {
        "name": "Rock",
        "desc": "Ranged Weapon Attack: +9 to hit, range 50/100 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage.",
        "attack_bonus": 9,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "7d6+6"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned"
    ]
  },
  {
    "name": "Giant Badger",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 13,
    "dexterity": 10,
    "constitution": 15,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 5,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 13,
    "hitDice": "2d8",
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
      "darkvision": 30,
      "passivePerception": 11
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The badger has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The badger makes two attacks: one with its bite and one with its claws.",
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
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+1"
          }
        ],
        "actions": []
      },
      {
        "name": "Claws",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) slashing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d4+1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Giant Bat",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 15,
    "dexterity": 16,
    "constitution": 11,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 6,
    "armorClass": 13,
    "armorType": "dex",
    "hitPoints": 22,
    "hitDice": "4d10",
    "speed": {
      "walk": 10,
      "fly": 60,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "blindsight": 60,
      "passivePerception": 11
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Echolocation",
        "description": "The bat can't use its blindsight while deafened."
      },
      {
        "name": "Keen Hearing",
        "description": "The bat has advantage on Wisdom (Perception) checks that rely on hearing."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) piercing damage.",
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
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Giant Boar",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "2",
    "xp": 450,
    "strength": 17,
    "dexterity": 10,
    "constitution": 16,
    "intelligence": 2,
    "wisdom": 7,
    "charisma": 5,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 42,
    "hitDice": "5d10",
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
      "passivePerception": 8
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the boar moves at least 20 ft. straight toward a target and then hits it with a tusk attack on the same turn, the target takes an extra 7 (2d6) slashing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone."
      },
      {
        "name": "Relentless",
        "description": "If the boar takes 10 damage or less that would reduce it to 0 hit points, it is reduced to 1 hit point instead."
      }
    ],
    "actions": [
      {
        "name": "Tusk",
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
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Giant Centipede",
    "size": "Small",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 5,
    "dexterity": 14,
    "constitution": 12,
    "intelligence": 1,
    "wisdom": 7,
    "charisma": 3,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 4,
    "hitDice": "1d6",
    "speed": {
      "walk": 30,
      "climb": 30,
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
      "passivePerception": 8
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) piercing damage, and the target must succeed on a DC 11 Constitution saving throw or take 10 (3d6) poison damage. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way.",
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
      "beast",
      "small",
      "unaligned"
    ]
  },
  {
    "name": "Giant Constrictor Snake",
    "size": "Huge",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "2",
    "xp": 450,
    "strength": 19,
    "dexterity": 14,
    "constitution": 12,
    "intelligence": 1,
    "wisdom": 10,
    "charisma": 3,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 60,
    "hitDice": "8d12",
    "speed": {
      "walk": 30,
      "swim": 30,
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
      "blindsight": 10,
      "passivePerception": 12
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +6 to hit, reach 10 ft., one creature. Hit: 11 (2d6 + 4) piercing damage.",
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
      },
      {
        "name": "Constrict",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 13 (2d8 + 4) bludgeoning damage, and the target is grappled (escape DC 16). Until this grapple ends, the creature is restrained, and the snake can't constrict another target.",
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
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned"
    ]
  },
  {
    "name": "Giant Crab",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 13,
    "dexterity": 15,
    "constitution": 11,
    "intelligence": 1,
    "wisdom": 9,
    "charisma": 3,
    "armorClass": 15,
    "armorType": "natural",
    "hitPoints": 13,
    "hitDice": "3d8",
    "speed": {
      "walk": 30,
      "swim": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "blindsight": 30,
      "passivePerception": 9
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The crab can breathe air and water."
      }
    ],
    "actions": [
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage, and the target is grappled (escape DC 11). The crab has two claws, each of which can grapple only one target.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Giant Crocodile",
    "size": "Huge",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 21,
    "dexterity": 9,
    "constitution": 17,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 7,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 85,
    "hitDice": "9d12",
    "speed": {
      "walk": 30,
      "swim": 50,
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
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The crocodile can hold its breath for 30 minutes."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The crocodile makes two attacks: one with its bite and one with its tail.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Tail",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 21 (3d10 + 5) piercing damage, and the target is grappled (escape DC 16). Until this grapple ends, the target is restrained, and the crocodile can't bite another target.",
        "attack_bonus": 8,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "3d10+5"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target not grappled by the crocodile. Hit: 14 (2d8 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 16 Strength saving throw or be knocked prone.",
        "attack_bonus": 8,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
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
      "beast",
      "huge",
      "unaligned"
    ]
  },
  {
    "name": "Giant Eagle",
    "size": "Large",
    "type": "beast",
    "alignment": "neutral good",
    "challengeRating": "1",
    "xp": 200,
    "strength": 16,
    "dexterity": 17,
    "constitution": 13,
    "intelligence": 8,
    "wisdom": 14,
    "charisma": 10,
    "armorClass": 13,
    "armorType": "dex",
    "hitPoints": 26,
    "hitDice": "4d10",
    "speed": {
      "walk": 10,
      "fly": 80,
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
    "languages": [
      "Giant Eagle",
      "understands Common and Auran but can't speak"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The eagle has advantage on Wisdom (Perception) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The eagle makes two attacks: one with its beak and one with its talons.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Beak",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Talons",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Beak",
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
        "name": "Talons",
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
      }
    ],
    "legendaryActions": [],
    "description": "A giant eagle is a noble creature that speaks its own language and understands speech in the Common tongue. A mated pair of giant eagles typically has up to four eggs or young in their nest (treat the young as normal eagles).",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "neutral good"
    ]
  },
  {
    "name": "Giant Elk",
    "size": "Huge",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "2",
    "xp": 450,
    "strength": 19,
    "dexterity": 16,
    "constitution": 14,
    "intelligence": 7,
    "wisdom": 14,
    "charisma": 10,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 42,
    "hitDice": "5d12",
    "speed": {
      "walk": 60,
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
    "languages": [
      "Giant Elk",
      "understands Common",
      "Elvish",
      "and Sylvan but can't speak"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the elk moves at least 20 ft. straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) damage. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be knocked prone."
      }
    ],
    "actions": [
      {
        "name": "Ram",
        "desc": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+4"
          }
        ],
        "actions": []
      },
      {
        "name": "Hooves",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one prone creature. Hit: 22 (4d8 + 4) bludgeoning damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "4d8+4"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "The majestic giant elk is rare to the point that its appearance is often taken as a foreshadowing of an important event, such as the birth of a king. Legends tell of gods that take the form of giant elk when visiting the Material Plane. Many cultures therefore believe that to hunt these creatures is to invite divine wrath.",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned"
    ]
  },
  {
    "name": "Giant Fire Beetle",
    "size": "Small",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 8,
    "dexterity": 10,
    "constitution": 12,
    "intelligence": 1,
    "wisdom": 7,
    "charisma": 3,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 4,
    "hitDice": "1d6",
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
      "blindsight": 30,
      "passivePerception": 8
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Illumination",
        "description": "The beetle sheds bright light in a 10-foot radius and dim light for an additional 10 ft.."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 2 (1d6 - 1) slashing damage.",
        "attack_bonus": 1,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d6-1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "A giant fire beetle is a nocturnal creature that takes its name from a pair of glowing glands that give off light. Miners and adventurers prize these creatures, for a giant fire beetle’s glands continue to shed light for 1d6 days after the beetle dies. Giant fire beetles are most commonly found underground and in dark forests.",
    "source": "SRD",
    "tags": [
      "beast",
      "small",
      "unaligned"
    ]
  },
  {
    "name": "Giant Frog",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 12,
    "dexterity": 13,
    "constitution": 11,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 3,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 18,
    "hitDice": "4d8",
    "speed": {
      "walk": 30,
      "swim": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 2,
      "Stealth": 3
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 30,
      "passivePerception": 12
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The frog can breathe air and water"
      },
      {
        "name": "Standing Leap",
        "description": "The frog's long jump is up to 20 ft. and its high jump is up to 10 ft., with or without a running start."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage, and the target is grappled (escape DC 11). Until this grapple ends, the target is restrained, and the frog can't bite another target.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+1"
          }
        ],
        "actions": []
      },
      {
        "name": "Swallow",
        "desc": "The frog makes one bite attack against a Small or smaller target it is grappling. If the attack hits, the target is swallowed, and the grapple ends. The swallowed target is blinded and restrained, it has total cover against attacks and other effects outside the frog, and it takes 5 (2d4) acid damage at the start of each of the frog's turns. The frog can have only one target swallowed at a time. If the frog dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 5 ft. of movement, exiting prone.",
        "damage": [],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Giant Goat",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 17,
    "dexterity": 11,
    "constitution": 12,
    "intelligence": 3,
    "wisdom": 12,
    "charisma": 6,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 19,
    "hitDice": "3d10",
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
      "passivePerception": 11
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the goat moves at least 20 ft. straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 5 (2d4) bludgeoning damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone."
      },
      {
        "name": "Sure-Footed",
        "description": "The goat has advantage on Strength and Dexterity saving throws made against effects that would knock it prone."
      }
    ],
    "actions": [
      {
        "name": "Ram",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) bludgeoning damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d4+3"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Giant Hyena",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "1",
    "xp": 200,
    "strength": 16,
    "dexterity": 14,
    "constitution": 14,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 7,
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
      "Perception": 3
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Rampage",
        "description": "When the hyena reduces a creature to 0 hit points with a melee attack on its turn, the hyena can take a bonus action to move up to half its speed and make a bite attack."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
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
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Giant Lizard",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 15,
    "dexterity": 12,
    "constitution": 13,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 5,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 19,
    "hitDice": "3d10",
    "speed": {
      "walk": 30,
      "climb": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 30,
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
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
      }
    ],
    "legendaryActions": [],
    "description": "A giant lizard can be ridden or used as a draft animal. Lizardfolk also keep them as pets, and subterranean giant lizards are used as mounts and pack animals by drow, duergar, and others.",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Giant Octopus",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "1",
    "xp": 200,
    "strength": 17,
    "dexterity": 13,
    "constitution": 13,
    "intelligence": 4,
    "wisdom": 10,
    "charisma": 4,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 52,
    "hitDice": "8d10",
    "speed": {
      "walk": 10,
      "swim": 60,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
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
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "While out of water, the octopus can hold its breath for 1 hour."
      },
      {
        "name": "Underwater Camouflage",
        "description": "The octopus has advantage on Dexterity (Stealth) checks made while underwater."
      },
      {
        "name": "Water Breathing",
        "description": "The octopus can breathe only underwater."
      }
    ],
    "actions": [
      {
        "name": "Tentacles",
        "desc": "Melee Weapon Attack: +5 to hit, reach 15 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage. If the target is a creature, it is grappled (escape DC 16). Until this grapple ends, the target is restrained, and the octopus can't use its tentacles on another target.",
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
        "name": "Ink Cloud",
        "desc": "A 20-foot-radius cloud of ink extends all around the octopus if it is underwater. The area is heavily obscured for 1 minute, although a significant current can disperse the ink. After releasing the ink, the octopus can use the Dash action as a bonus action.",
        "damage": [],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Giant Owl",
    "size": "Large",
    "type": "beast",
    "alignment": "neutral",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 13,
    "dexterity": 15,
    "constitution": 12,
    "intelligence": 8,
    "wisdom": 13,
    "charisma": 10,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 19,
    "hitDice": "3d10",
    "speed": {
      "walk": 5,
      "fly": 60,
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
    "languages": [
      "Giant Owl",
      "understands Common",
      "Elvish",
      "and Sylvan but can't speak"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Flyby",
        "description": "The owl doesn't provoke opportunity attacks when it flies out of an enemy's reach."
      },
      {
        "name": "Keen Hearing and Sight",
        "description": "The owl has advantage on Wisdom (Perception) checks that rely on hearing or sight."
      }
    ],
    "actions": [
      {
        "name": "Talons",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 8 (2d6 + 1) slashing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "neutral"
    ]
  },
  {
    "name": "Giant Poisonous Snake",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 10,
    "dexterity": 18,
    "constitution": 13,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 3,
    "armorClass": 14,
    "armorType": "dex",
    "hitPoints": 11,
    "hitDice": "2d8",
    "speed": {
      "walk": 30,
      "swim": 30,
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
      "blindsight": 10,
      "passivePerception": 12
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 6 (1d4 + 4) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4+4"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Giant Rat",
    "size": "Small",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 7,
    "dexterity": 15,
    "constitution": 11,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 4,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 7,
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
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The rat has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The rat has advantage on an attack roll against a creature if at least one of the rat's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Bite",
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
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "small",
      "unaligned"
    ]
  },
  {
    "name": "Giant Rat (Diseased)",
    "size": "Small",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 7,
    "dexterity": 15,
    "constitution": 11,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 4,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 7,
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
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The rat has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The rat has advantage on an attack roll against a creature if at least one of the rat's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 2) piercing damage. If the target is a creature, it must succeed on a DC 10 Constitution saving throw or contract a disease. Until the disease is cured, the target can't regain hit points except by magical means, and the target's hit point maximum decreases by 3 (1d6) every 24 hours. If the target's hit point maximum drops to 0 as a result of this disease, the target dies.",
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
      "beast",
      "small",
      "unaligned"
    ]
  },
  {
    "name": "Giant Scorpion",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "3",
    "xp": 700,
    "strength": 15,
    "dexterity": 13,
    "constitution": 15,
    "intelligence": 1,
    "wisdom": 9,
    "charisma": 3,
    "armorClass": 15,
    "armorType": "natural",
    "hitPoints": 52,
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
      "blindsight": 60,
      "passivePerception": 9
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) bludgeoning damage, and the target is grappled (escape DC 12). The scorpion has two claws, each of which can grapple only one target.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d8+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Multiattack",
        "desc": "The scorpion makes three attacks: two with its claws and one with its sting.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          },
          {
            "action_name": "Sting",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Sting",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target must make a DC 12 Constitution saving throw, taking 22 (4d10) poison damage on a failed save, or half as much damage on a successful one.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d10+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Giant Sea Horse",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 12,
    "dexterity": 15,
    "constitution": 11,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 5,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 16,
    "hitDice": "3d10",
    "speed": {
      "walk": 0,
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
      "passivePerception": 11
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the sea horse moves at least 20 ft. straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) bludgeoning damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone."
      },
      {
        "name": "Water Breathing",
        "description": "The sea horse can breathe only underwater."
      }
    ],
    "actions": [
      {
        "name": "Ram",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Like their smaller kin, giant sea horses are shy, colorful fish with elongated bodies and curled tails. Aquatic elves train them as mounts.",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Giant Shark",
    "size": "Huge",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 23,
    "dexterity": 11,
    "constitution": 21,
    "intelligence": 1,
    "wisdom": 10,
    "charisma": 5,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 126,
    "hitDice": "11d12",
    "speed": {
      "swim": 50,
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
      "blindsight": 60,
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Blood Frenzy",
        "description": "The shark has advantage on melee attack rolls against any creature that doesn't have all its hit points."
      },
      {
        "name": "Water Breathing",
        "description": "The shark can breathe only underwater."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 22 (3d10 + 6) piercing damage.",
        "attack_bonus": 9,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "3d10+6"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "A giant shark is 30 feet long and normally found in deep oceans. Utterly fearless, it preys on anything that crosses its path, including whales and ships.",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned"
    ]
  },
  {
    "name": "Giant Spider",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "1",
    "xp": 200,
    "strength": 14,
    "dexterity": 16,
    "constitution": 12,
    "intelligence": 2,
    "wisdom": 11,
    "charisma": 4,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 26,
    "hitDice": "4d10",
    "speed": {
      "walk": 30,
      "climb": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Stealth": 7
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "blindsight": 10,
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Sense",
        "description": "While in contact with a web, the spider knows the exact location of any other creature in contact with the same web."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webbing."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 7 (1d8 + 3) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 9 (2d8) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Web",
        "desc": "Ranged Weapon Attack: +5 to hit, range 30/60 ft., one creature. Hit: The target is restrained by webbing. As an action, the restrained target can make a DC 12 Strength check, bursting the webbing on a success. The webbing can also be attacked and destroyed (AC 10; hp 5; vulnerability to fire damage; immunity to bludgeoning, poison, and psychic damage).",
        "attack_bonus": 5,
        "damage": [],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "To snare its prey, a giant spider spins elaborate webs or shoots sticky strands of webbing from its abdomen. Giant spiders are most commonly found underground, making their lairs on ceilings or in dark, web-filled crevices. Such lairs are often festooned with web cocoons holding past victims.",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Giant Toad",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "1",
    "xp": 200,
    "strength": 15,
    "dexterity": 13,
    "constitution": 13,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 3,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 39,
    "hitDice": "6d10",
    "speed": {
      "walk": 20,
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
      "darkvision": 30,
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The toad can breathe air and water"
      },
      {
        "name": "Standing Leap",
        "description": "The toad's long jump is up to 20 ft. and its high jump is up to 10 ft., with or without a running start."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 5 (1d10) poison damage, and the target is grappled (escape DC 13). Until this grapple ends, the target is restrained, and the toad can't bite another target.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d10+2"
          },
          {
            "damage_type": {
              "index": "poison",
              "name": "Poison",
              "url": "/api/2014/damage-types/poison"
            },
            "damage_dice": "1d10"
          }
        ],
        "actions": []
      },
      {
        "name": "Swallow",
        "desc": "The toad makes one bite attack against a Medium or smaller target it is grappling. If the attack hits, the target is swallowed, and the grapple ends. The swallowed target is blinded and restrained, it has total cover against attacks and other effects outside the toad, and it takes 10 (3d6) acid damage at the start of each of the toad's turns. The toad can have only one target swallowed at a time.\nIf the toad dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 5 feet of movement, exiting prone.",
        "damage": [],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Giant Vulture",
    "size": "Large",
    "type": "beast",
    "alignment": "neutral evil",
    "challengeRating": "1",
    "xp": 200,
    "strength": 15,
    "dexterity": 10,
    "constitution": 15,
    "intelligence": 6,
    "wisdom": 12,
    "charisma": 7,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 22,
    "hitDice": "3d10",
    "speed": {
      "walk": 10,
      "fly": 60,
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
      "passivePerception": 13
    },
    "languages": [
      "understands Common but can't speak"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight and Smell",
        "description": "The vulture has advantage on Wisdom (Perception) checks that rely on sight or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The vulture has advantage on an attack roll against a creature if at least one of the vulture's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The vulture makes two attacks: one with its beak and one with its talons.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Beak",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Talons",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Beak",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d4+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Talons",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) slashing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+2"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "A giant vulture has advanced intelligence and a malevolent bent. Unlike its smaller kin, it will attack a wounded creature to hasten its end. Giant vultures have been known to haunt a thirsty, starving creature for days to enjoy its suffering.",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "neutral evil"
    ]
  },
  {
    "name": "Giant Wasp",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 10,
    "dexterity": 14,
    "constitution": 10,
    "intelligence": 1,
    "wisdom": 10,
    "charisma": 3,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 13,
    "hitDice": "3d8",
    "speed": {
      "walk": 10,
      "fly": 50,
      "swim": 50,
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
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Sting",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way.",
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
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Giant Weasel",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 11,
    "dexterity": 16,
    "constitution": 10,
    "intelligence": 4,
    "wisdom": 12,
    "charisma": 5,
    "armorClass": 13,
    "armorType": "dex",
    "hitPoints": 9,
    "hitDice": "2d8",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 3,
      "Stealth": 5
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
        "name": "Keen Hearing and Smell",
        "description": "The weasel has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage.",
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
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Giant Wolf Spider",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 12,
    "dexterity": 16,
    "constitution": 13,
    "intelligence": 3,
    "wisdom": 12,
    "charisma": 4,
    "armorClass": 13,
    "armorType": "dex",
    "hitPoints": 11,
    "hitDice": "2d8",
    "speed": {
      "walk": 40,
      "climb": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 3,
      "Stealth": 7
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 60,
      "blindsight": 10,
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Sense",
        "description": "While in contact with a web, the spider knows the exact location of any other creature in contact with the same web."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webbing."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 4 (1d6 + 1) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 7 (2d6) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Smaller than a giant spider, a giant wolf spider hunts prey across open ground or hides in a burrow or crevice, or in a hidden cavity beneath debris.",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Goat",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 12,
    "dexterity": 10,
    "constitution": 11,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 5,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 4,
    "hitDice": "1d8",
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
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the goat moves at least 20 ft. straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 2 (1d4) bludgeoning damage. If the target is a creature, it must succeed on a DC 10 Strength saving throw or be knocked prone."
      },
      {
        "name": "Sure-Footed",
        "description": "The goat has advantage on Strength and Dexterity saving throws made against effects that would knock it prone."
      }
    ],
    "actions": [
      {
        "name": "Ram",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) bludgeoning damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d4+1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Hawk",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 5,
    "dexterity": 16,
    "constitution": 8,
    "intelligence": 2,
    "wisdom": 14,
    "charisma": 6,
    "armorClass": 13,
    "armorType": "dex",
    "hitPoints": 1,
    "hitDice": "1d4",
    "speed": {
      "walk": 10,
      "fly": 60,
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
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight",
        "description": "The hawk has advantage on Wisdom (Perception) checks that rely on sight."
      }
    ],
    "actions": [
      {
        "name": "Talons",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 slashing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Hunter Shark",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "2",
    "xp": 450,
    "strength": 18,
    "dexterity": 13,
    "constitution": 15,
    "intelligence": 1,
    "wisdom": 10,
    "charisma": 4,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 45,
    "hitDice": "6d10",
    "speed": {
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
      "darkvision": 30,
      "passivePerception": 12
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Blood Frenzy",
        "description": "The shark has advantage on melee attack rolls against any creature that doesn't have all its hit points."
      },
      {
        "name": "Water Breathing",
        "description": "The shark can breathe only underwater."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage.",
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
      }
    ],
    "legendaryActions": [],
    "description": "Smaller than a giant shark but larger and fiercer than a reef shark, a hunter shark haunts deep waters. It usually hunts alone, but multiple hunter sharks might feed in the same area. A fully grown hunter shark is 15 to 20 feet long.",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Hyena",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 11,
    "dexterity": 13,
    "constitution": 12,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 5,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 5,
    "hitDice": "1d8",
    "speed": {
      "walk": 50,
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
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The hyena has advantage on an attack roll against a creature if at least one of the hyena's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) piercing damage.",
        "attack_bonus": 2,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Jackal",
    "size": "Small",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 8,
    "dexterity": 15,
    "constitution": 11,
    "intelligence": 3,
    "wisdom": 12,
    "charisma": 6,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 3,
    "hitDice": "1d6",
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
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The jackal has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The jackal has advantage on an attack roll against a creature if at least one of the jackal's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 1 (1d4 - 1) piercing damage.",
        "attack_bonus": 1,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4-1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "small",
      "unaligned"
    ]
  },
  {
    "name": "Killer Whale",
    "size": "Huge",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "3",
    "xp": 700,
    "strength": 19,
    "dexterity": 10,
    "constitution": 13,
    "intelligence": 3,
    "wisdom": 12,
    "charisma": 7,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 90,
    "hitDice": "12d12",
    "speed": {
      "swim": 60,
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
      "blindsight": 120,
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Echolocation",
        "description": "The whale can't use its blindsight while deafened."
      },
      {
        "name": "Hold Breath",
        "description": "The whale can hold its breath for 30 minutes"
      },
      {
        "name": "Keen Hearing",
        "description": "The whale has advantage on Wisdom (Perception) checks that rely on hearing."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (5d6 + 4) piercing damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "5d6+4"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned"
    ]
  },
  {
    "name": "Lion",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "1",
    "xp": 200,
    "strength": 17,
    "dexterity": 15,
    "constitution": 13,
    "intelligence": 3,
    "wisdom": 12,
    "charisma": 8,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 26,
    "hitDice": "4d10",
    "speed": {
      "walk": 50,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 3,
      "Stealth": 6
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The lion has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The lion has advantage on an attack roll against a creature if at least one of the lion's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      },
      {
        "name": "Pounce",
        "description": "If the lion moves at least 20 ft. straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone. If the target is prone, the lion can make one bite attack against it as a bonus action."
      },
      {
        "name": "Running Leap",
        "description": "With a 10-foot running start, the lion can long jump up to 25 ft.."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
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
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Lizard",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 2,
    "dexterity": 11,
    "constitution": 10,
    "intelligence": 1,
    "wisdom": 8,
    "charisma": 3,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 2,
    "hitDice": "1d4",
    "speed": {
      "walk": 20,
      "climb": 20,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 30,
      "passivePerception": 9
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 piercing damage.",
        "attack_bonus": 0,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Mammoth",
    "size": "Huge",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "6",
    "xp": 2300,
    "strength": 24,
    "dexterity": 9,
    "constitution": 21,
    "intelligence": 3,
    "wisdom": 11,
    "charisma": 6,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 126,
    "hitDice": "11d12",
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
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Trampling Charge",
        "description": "If the mammoth moves at least 20 ft. straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 18 Strength saving throw or be knocked prone. If the target is prone, the mammoth can make one stomp attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "name": "Gore",
        "desc": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 25 (4d8 + 7) piercing damage.",
        "attack_bonus": 10,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "4d8+7"
          }
        ],
        "actions": []
      },
      {
        "name": "Stomp",
        "desc": "Melee Weapon Attack: +10 to hit, reach 5 ft., one prone creature. Hit: 29 (4d10 + 7) bludgeoning damage.",
        "attack_bonus": 10,
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
    "description": "A mammoth is an elephantine creature with thick fur and long tusks. Stockier and fiercer than normal elephants, mammoths inhabit a wide range of climes, from subarctic to subtropical.",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned"
    ]
  },
  {
    "name": "Mastiff",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 13,
    "dexterity": 14,
    "constitution": 12,
    "intelligence": 3,
    "wisdom": 12,
    "charisma": 7,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 5,
    "hitDice": "1d8",
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
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The mastiff has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "Mastiffs are impressive hounds prized by humanoids for their loyalty and keen senses. Mastiffs can be trained as guard dogs, hunting dogs, and war dogs. Halflings and other Small humanoids ride them as mounts.",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Mule",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 14,
    "dexterity": 10,
    "constitution": 13,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 5,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 11,
    "hitDice": "2d8",
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
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Beast of Burden",
        "description": "The mule is considered to be a Large animal for the purpose of determining its carrying capacity."
      },
      {
        "name": "Sure-Footed",
        "description": "The mule has advantage on Strength and Dexterity saving throws made against effects that would knock it prone."
      }
    ],
    "actions": [
      {
        "name": "Hooves",
        "desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) bludgeoning damage.",
        "attack_bonus": 2,
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
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Octopus",
    "size": "Small",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 4,
    "dexterity": 15,
    "constitution": 11,
    "intelligence": 3,
    "wisdom": 10,
    "charisma": 4,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 3,
    "hitDice": "1d6",
    "speed": {
      "walk": 5,
      "swim": 30,
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
      "darkvision": 30,
      "passivePerception": 12
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "While out of water, the octopus can hold its breath for 30 minutes."
      },
      {
        "name": "Underwater Camouflage",
        "description": "The octopus has advantage on Dexterity (Stealth) checks made while underwater."
      },
      {
        "name": "Water Breathing",
        "description": "The octopus can breathe only underwater."
      }
    ],
    "actions": [
      {
        "name": "Tentacles",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 1 bludgeoning damage, and the target is grappled (escape DC 10). Until this grapple ends, the octopus can't use its tentacles on another target.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      },
      {
        "name": "Ink Cloud",
        "desc": "A 5-foot-radius cloud of ink extends all around the octopus if it is underwater. The area is heavily obscured for 1 minute, although a significant current can disperse the ink. After releasing the ink, the octopus can use the Dash action as a bonus action.",
        "attack_bonus": 0,
        "damage": [],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "small",
      "unaligned"
    ]
  },
  {
    "name": "Owl",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 3,
    "dexterity": 13,
    "constitution": 8,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 7,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 1,
    "hitDice": "1d4",
    "speed": {
      "walk": 5,
      "fly": 60,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 3,
      "Stealth": 3
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 120,
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Flyby",
        "description": "The owl doesn't provoke opportunity attacks when it flies out of an enemy's reach."
      },
      {
        "name": "Keen Hearing and Sight",
        "description": "The owl has advantage on Wisdom (Perception) checks that rely on hearing or sight."
      }
    ],
    "actions": [
      {
        "name": "Talons",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 1 slashing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Panther",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 14,
    "dexterity": 15,
    "constitution": 10,
    "intelligence": 3,
    "wisdom": 14,
    "charisma": 7,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 13,
    "hitDice": "3d8",
    "speed": {
      "walk": 50,
      "climb": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 4,
      "Stealth": 6
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The panther has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Pounce",
        "description": "If the panther moves at least 20 ft. straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 12 Strength saving throw or be knocked prone. If the target is prone, the panther can make one bite attack against it as a bonus action."
      }
    ],
    "actions": [
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
        "name": "Claw",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
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
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Plesiosaurus",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "2",
    "xp": 450,
    "strength": 18,
    "dexterity": 15,
    "constitution": 16,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 5,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 68,
    "hitDice": "8d10",
    "speed": {
      "walk": 20,
      "swim": 40,
      "hover": false
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
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The plesiosaurus can hold its breath for 1 hour."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 14 (3d6 + 4) piercing damage.",
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
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Poisonous Snake",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 2,
    "dexterity": 16,
    "constitution": 11,
    "intelligence": 1,
    "wisdom": 10,
    "charisma": 3,
    "armorClass": 13,
    "armorType": "dex",
    "hitPoints": 2,
    "hitDice": "1d4",
    "speed": {
      "walk": 30,
      "swim": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "blindsight": 10,
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 piercing damage, and the target must make a DC 10 Constitution saving throw, taking 5 (2d4) poison damage on a failed save, or half as much damage on a successful one.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Polar Bear",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "2",
    "xp": 450,
    "strength": 20,
    "dexterity": 10,
    "constitution": 16,
    "intelligence": 2,
    "wisdom": 13,
    "charisma": 7,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 42,
    "hitDice": "5d10",
    "speed": {
      "walk": 40,
      "swim": 30,
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
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The bear has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The bear makes two attacks: one with its bite and one with its claws.",
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
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (1d8 + 5) piercing damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+5"
          }
        ],
        "actions": []
      },
      {
        "name": "Claws",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+5"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Pony",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 15,
    "dexterity": 10,
    "constitution": 13,
    "intelligence": 2,
    "wisdom": 11,
    "charisma": 7,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 11,
    "hitDice": "2d8",
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
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Hooves",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) bludgeoning damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
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
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Quipper",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 2,
    "dexterity": 16,
    "constitution": 9,
    "intelligence": 1,
    "wisdom": 7,
    "charisma": 2,
    "armorClass": 13,
    "armorType": "dex",
    "hitPoints": 1,
    "hitDice": "1d4",
    "speed": {
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
      "passivePerception": 8
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Blood Frenzy",
        "description": "The quipper has advantage on melee attack rolls against any creature that doesn't have all its hit points."
      },
      {
        "name": "Water Breathing",
        "description": "The quipper can breathe only underwater."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 piercing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "A quipper is a carnivorous fish with sharp teeth. Quippers can adapt to any aquatic environment, including cold subterranean lakes. They frequently gather in swarms; the statistics for a swarm of quippers appear later in this appendix.",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Rat",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 2,
    "dexterity": 11,
    "constitution": 9,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 4,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 1,
    "hitDice": "1d4",
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
      "darkvision": 30,
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The rat has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 piercing damage.",
        "attack_bonus": 0,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Raven",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 2,
    "dexterity": 14,
    "constitution": 8,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 6,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 1,
    "hitDice": "1d4",
    "speed": {
      "walk": 10,
      "fly": 50,
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
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Mimicry",
        "description": "The raven can mimic simple sounds it has heard, such as a person whispering, a baby crying, or an animal chittering. A creature that hears the sounds can tell they are imitations with a successful DC 10 Wisdom (Insight) check."
      }
    ],
    "actions": [
      {
        "name": "Beak",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 1 piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Reef Shark",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 14,
    "dexterity": 13,
    "constitution": 13,
    "intelligence": 1,
    "wisdom": 10,
    "charisma": 4,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 22,
    "hitDice": "4d8",
    "speed": {
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
      "blindsight": 30,
      "passivePerception": 12
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The shark has advantage on an attack roll against a creature if at least one of the shark's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      },
      {
        "name": "Water Breathing",
        "description": "The shark can breathe only underwater."
      }
    ],
    "actions": [
      {
        "name": "Bite",
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
      }
    ],
    "legendaryActions": [],
    "description": "Smaller than giant sharks and hunter sharks, reef sharks inhabit shallow waters and coral reefs, gathering in small packs to hunt. A full-grown specimen measures 6 to 10 feet long.",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Rhinoceros",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "2",
    "xp": 450,
    "strength": 21,
    "dexterity": 8,
    "constitution": 15,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 6,
    "armorClass": 11,
    "armorType": "natural",
    "hitPoints": 45,
    "hitDice": "6d10",
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
      "passivePerception": 11
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Charge",
        "description": "If the rhinoceros moves at least 20 ft. straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 9 (2d8) bludgeoning damage. If the target is a creature, it must succeed on a DC 15 Strength saving throw or be knocked prone."
      }
    ],
    "actions": [
      {
        "name": "Gore",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
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
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Riding Horse",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 25,
    "strength": 16,
    "dexterity": 10,
    "constitution": 12,
    "intelligence": 2,
    "wisdom": 11,
    "charisma": 7,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 13,
    "hitDice": "2d10",
    "speed": {
      "walk": 60,
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
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Hooves",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) bludgeoning damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d4+3"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Saber-Toothed Tiger",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "2",
    "xp": 450,
    "strength": 18,
    "dexterity": 14,
    "constitution": 15,
    "intelligence": 3,
    "wisdom": 12,
    "charisma": 8,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 52,
    "hitDice": "7d10",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 3,
      "Stealth": 6
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The tiger has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Pounce",
        "description": "If the tiger moves at least 20 ft. straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone. If the target is prone, the tiger can make one bite attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (1d10 + 5) piercing damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d10+5"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+5"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Scorpion",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 2,
    "dexterity": 11,
    "constitution": 8,
    "intelligence": 1,
    "wisdom": 8,
    "charisma": 2,
    "armorClass": 11,
    "armorType": "natural",
    "hitPoints": 1,
    "hitDice": "1d4",
    "speed": {
      "walk": 10,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "blindsight": 10,
      "passivePerception": 9
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Sting",
        "desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one creature. Hit: 1 piercing damage, and the target must make a DC 9 Constitution saving throw, taking 4 (1d8) poison damage on a failed save, or half as much damage on a successful one.",
        "attack_bonus": 2,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Sea Horse",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 0,
    "strength": 1,
    "dexterity": 12,
    "constitution": 8,
    "intelligence": 1,
    "wisdom": 10,
    "charisma": 2,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 1,
    "hitDice": "1d4",
    "speed": {
      "swim": 20,
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
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Water Breathing",
        "description": "The sea horse can breathe only underwater."
      }
    ],
    "actions": [],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Spider",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 2,
    "dexterity": 14,
    "constitution": 8,
    "intelligence": 1,
    "wisdom": 10,
    "charisma": 2,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 1,
    "hitDice": "1d4",
    "speed": {
      "walk": 20,
      "climb": 20,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Stealth": 4
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "darkvision": 30,
      "passivePerception": 12
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Sense",
        "description": "While in contact with a web, the spider knows the exact location of any other creature in contact with the same web."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webbing."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 1 piercing damage, and the target must succeed on a DC 9 Constitution saving throw or take 2 (1d4) poison damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Stirge",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.125",
    "xp": 25,
    "strength": 4,
    "dexterity": 16,
    "constitution": 11,
    "intelligence": 2,
    "wisdom": 8,
    "charisma": 6,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 2,
    "hitDice": "1d4",
    "speed": {
      "walk": 10,
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
      "passivePerception": 9
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Blood Drain",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 5 (1d4 + 3) piercing damage, and the stirge attaches to the target. While attached, the stirge doesn't attack. Instead, at the start of each of the stirge's turns, the target loses 5 (1d4 + 3) hit points due to blood loss.\nThe stirge can detach itself by spending 5 feet of its movement. It does so after it drains 10 hit points of blood from the target or the target dies. A creature, including the target, can use its action to detach the stirge.",
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
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Tiger",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "1",
    "xp": 200,
    "strength": 17,
    "dexterity": 15,
    "constitution": 14,
    "intelligence": 3,
    "wisdom": 12,
    "charisma": 8,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 37,
    "hitDice": "5d10",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 3,
      "Stealth": 6
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
        "name": "Keen Smell",
        "description": "The tiger has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Pounce",
        "description": "If the tiger moves at least 20 ft. straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone. If the target is prone, the tiger can make one bite attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage.",
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
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Triceratops",
    "size": "Huge",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 22,
    "dexterity": 9,
    "constitution": 17,
    "intelligence": 2,
    "wisdom": 11,
    "charisma": 5,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 95,
    "hitDice": "10d12",
    "speed": {
      "walk": 50,
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
    "languages": [],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Trampling Charge",
        "description": "If the triceratops moves at least 20 ft. straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone. If the target is prone, the triceratops can make one stomp attack against it as a bonus action."
      }
    ],
    "actions": [
      {
        "name": "Gore",
        "desc": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 24 (4d8 + 6) piercing damage.",
        "attack_bonus": 9,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "4d8+6"
          }
        ],
        "actions": []
      },
      {
        "name": "Stomp",
        "desc": "Melee Weapon Attack: +9 to hit, reach 5 ft., one prone creature. Hit: 22 (3d10 + 6) bludgeoning damage",
        "attack_bonus": 9,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "3d10+6"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned"
    ]
  },
  {
    "name": "Tyrannosaurus Rex",
    "size": "Huge",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "8",
    "xp": 3900,
    "strength": 25,
    "dexterity": 10,
    "constitution": 19,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 9,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 136,
    "hitDice": "13d12",
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
      "passivePerception": 14
    },
    "languages": [],
    "proficiencyBonus": 3,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The tyrannosaurus makes two attacks: one with its bite and one with its tail. It can't make both attacks against the same target.",
        "damage": [],
        "multiattack_type": "actions",
        "actions": [
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Tail",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 33 (4d12 + 7) piercing damage. If the target is a Medium or smaller creature, it is grappled (escape DC 17). Until this grapple ends, the target is restrained, and the tyrannosaurus can't bite another target.",
        "attack_bonus": 10,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "4d12+7"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 20 (3d8 + 7) bludgeoning damage.",
        "attack_bonus": 10,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "3d8+7"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned"
    ]
  },
  {
    "name": "Vulture",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 7,
    "dexterity": 10,
    "constitution": 13,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 4,
    "armorClass": 10,
    "armorType": "dex",
    "hitPoints": 5,
    "hitDice": "1d8",
    "speed": {
      "walk": 10,
      "fly": 50,
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
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Sight and Smell",
        "description": "The vulture has advantage on Wisdom (Perception) checks that rely on sight or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The vulture has advantage on an attack roll against a creature if at least one of the vulture's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Beak",
        "desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage.",
        "attack_bonus": 2,
        "damage": [
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
      "beast",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Warhorse",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 18,
    "dexterity": 12,
    "constitution": 13,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 7,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 19,
    "hitDice": "3d10",
    "speed": {
      "walk": 60,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 11
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Trampling Charge",
        "description": "If the horse moves at least 20 ft. straight toward a creature and then hits it with a hooves attack on the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone. If the target is prone, the horse can make another attack with its hooves against it as a bonus action."
      }
    ],
    "actions": [
      {
        "name": "Hooves",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
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
      "beast",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Weasel",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0",
    "xp": 10,
    "strength": 3,
    "dexterity": 16,
    "constitution": 8,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 3,
    "armorClass": 13,
    "armorType": "dex",
    "hitPoints": 1,
    "hitDice": "1d4",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 3,
      "Stealth": 5
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The weasel has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 1 piercing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned"
    ]
  },
  {
    "name": "Wolf",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 12,
    "dexterity": 15,
    "constitution": 12,
    "intelligence": 3,
    "wisdom": 12,
    "charisma": 6,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 11,
    "hitDice": "2d8",
    "speed": {
      "walk": 40,
      "hover": false
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
      "passivePerception": 13
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
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
      "beast",
      "medium",
      "unaligned"
    ]
  }
];
