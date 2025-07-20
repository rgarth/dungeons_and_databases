import { Monster } from '@/types/monster';

export const oozeMonsters: Monster[] = [
  {
    "name": "Black Pudding",
    "size": "Large",
    "type": "ooze",
    "alignment": "unaligned",
    "challengeRating": "4",
    "xp": 1100,
    "strength": 16,
    "dexterity": 5,
    "constitution": 16,
    "intelligence": 1,
    "wisdom": 6,
    "charisma": 1,
    "armorClass": 7,
    "armorType": "dex",
    "hitPoints": 85,
    "hitDice": "10d10+30",
    "speed": {
      "walk": 20,
      "climb": 20
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "acid",
      "cold",
      "lightning",
      "slashing"
    ],
    "conditionImmunities": [
      "Blinded",
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Prone"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 8,
      "blindsight": 60
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amorphous",
        "description": "The pudding can move through a space as narrow as 1 inch wide without squeezing."
      },
      {
        "name": "Corrosive Form",
        "description": "A creature that touches the pudding or hits it with a melee attack while within 5 feet of it takes 4 (1d8) acid damage. Any nonmagical weapon made of metal or wood that hits the pudding corrodes. After dealing damage, the weapon takes a permanent and cumulative -1 penalty to damage rolls. If its penalty drops to -5, the weapon is destroyed. Nonmagical ammunition made of metal or wood that hits the pudding is destroyed after dealing damage. The pudding can eat through 2-inch-thick, nonmagical wood or metal in 1 round."
      },
      {
        "name": "Spider Climb",
        "description": "The pudding can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      }
    ],
    "actions": [
      {
        "name": "Pseudopod",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 18 (4d8) acid damage. In addition, nonmagical armor worn by the target is partly dissolved and takes a permanent and cumulative -1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10.",
        "attackBonus": 5,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d6+3",
          "average": 7
        },
        "secondaryDamage": {
          "type": "Acid",
          "roll": "4d8",
          "average": 18
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive, amorphous blob of acidic jelly that can dissolve almost anything it touches. Black puddings are among the most dangerous oozes, capable of splitting into multiple smaller creatures when damaged.",    "imagePrompt": "A large ooze creature with amorphous and fluid form",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "ooze",
      "large",
      "unaligned",
      "ooze",
      "amorphous"
    ]
  },
  {
    "name": "Gelatinous Cube",
    "size": "Large",
    "type": "ooze",
    "alignment": "unaligned",
    "challengeRating": "2",
    "xp": 450,
    "strength": 14,
    "dexterity": 3,
    "constitution": 20,
    "intelligence": 1,
    "wisdom": 6,
    "charisma": 1,
    "armorClass": 6,
    "armorType": "dex",
    "hitPoints": 84,
    "hitDice": "8d10+40",
    "speed": {
      "walk": 15
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [
      "Blinded",
      "Charmed",
      "Deafened",
      "Exhaustion",
      "Frightened",
      "Prone"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 8,
      "blindsight": 60
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Ooze Cube",
        "description": "The cube takes up its entire space. Other creatures can enter the space, but a creature that does so is subjected to the cube's Engulf and has disadvantage on the saving throw.\nCreatures inside the cube can be seen but have total cover.\nA creature within 5 feet of the cube can take an action to pull a creature or object out of the cube. Doing so requires a successful DC 12 Strength check, and the creature making the attempt takes 10 (3d6) acid damage.\nThe cube can hold only one Large creature or up to four Medium or smaller creatures inside it at a time."
      },
      {
        "name": "Transparent",
        "description": "Even when the cube is in plain sight, it takes a successful DC 15 Wisdom (Perception) check to spot a cube that has neither moved nor attacked. A creature that tries to enter the cube's space while unaware of the cube is surprised by the cube."
      }
    ],
    "actions": [
      {
        "name": "Pseudopod",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 10 (3d6) acid damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Acid",
          "roll": "3d6",
          "average": 11
        }
      },
      {
        "name": "Engulf",
        "description": "The cube moves up to its speed. While doing so, it can enter Large or smaller creatures' spaces. Whenever the cube enters a creature's space, the creature must make a DC 12 Dexterity saving throw.\nOn a successful save, the creature can choose to be pushed 5 feet back or to the side of the cube. A creature that chooses not to be pushed suffers the consequences of a failed saving throw.\nOn a failed save, the cube enters the creature's space, and the creature takes 10 (3d6) acid damage and is engulfed. The engulfed creature can't breathe, is restrained, and takes 21 (6d6) acid damage at the start of each of the cube's turns. When the cube moves, the engulfed creature moves with it.\nAn engulfed creature can try to escape by taking an action to make a DC 12 Strength check. On a success, the creature escapes and enters a space of its choice within 5 feet of the cube.",
        "damage": {
          "type": "Acid",
          "roll": "3d6",
          "average": 11
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large, acidic ooze that can dissolve flesh and bone. Ochre jellies are dangerous predators that can split into multiple smaller creatures when damaged.",    "imagePrompt": "A large ooze creature with amorphous and fluid form",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "ooze",
      "large",
      "unaligned",
      "ooze",
      "amorphous"
    ]
  },
  {
    "name": "Gray Ooze",
    "size": "Medium",
    "type": "ooze",
    "alignment": "unaligned",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 12,
    "dexterity": 6,
    "constitution": 16,
    "intelligence": 1,
    "wisdom": 6,
    "charisma": 2,
    "armorClass": 8,
    "armorType": "dex",
    "hitPoints": 22,
    "hitDice": "3d8+9",
    "speed": {
      "walk": 10,
      "climb": 10
    },
    "savingThrows": {},
    "skills": {
      "Stealth": 2
    },
    "damageResistances": [
      "acid",
      "cold",
      "fire"
    ],
    "damageImmunities": [],
    "conditionImmunities": [
      "Blinded",
      "Charmed",
      "Deafened",
      "Exhaustion",
      "Frightened",
      "Prone"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 8,
      "blindsight": 60
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amorphous",
        "description": "The ooze can move through a space as narrow as 1 inch wide without squeezing."
      },
      {
        "name": "Corrode Metal",
        "description": "Any nonmagical weapon made of metal that hits the ooze corrodes. After dealing damage, the weapon takes a permanent and cumulative -1 penalty to damage rolls. If its penalty drops to -5, the weapon is destroyed. Nonmagical ammunition made of metal that hits the ooze is destroyed after dealing damage.\nThe ooze can eat through 2-inch-thick, nonmagical metal in 1 round."
      },
      {
        "name": "False Appearance",
        "description": "While the ooze remains motionless, it is indistinguishable from an oily pool or wet rock."
      }
    ],
    "actions": [
      {
        "name": "Pseudopod",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage plus 7 (2d6) acid damage, and if the target is wearing nonmagical metal armor, its armor is partly corroded and takes a permanent and cumulative -1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10.",
        "attackBonus": 3,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d6+1",
          "average": 5
        },
        "secondaryDamage": {
          "type": "Acid",
          "roll": "2d6",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, acidic ooze that can dissolve metal and other materials. Gray oozes are often found in dungeons and ruins where they feed on rusted metal and other debris.",    "imagePrompt": "A medium ooze creature with amorphous and fluid form",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "ooze",
      "medium",
      "unaligned",
      "ooze",
      "amorphous"
    ]
  },
  {
    "name": "Ochre Jelly",
    "size": "Large",
    "type": "ooze",
    "alignment": "unaligned",
    "challengeRating": "2",
    "xp": 450,
    "strength": 15,
    "dexterity": 6,
    "constitution": 14,
    "intelligence": 2,
    "wisdom": 6,
    "charisma": 1,
    "armorClass": 8,
    "armorType": "dex",
    "hitPoints": 45,
    "hitDice": "6d10+12",
    "speed": {
      "walk": 10,
      "climb": 10
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [
      "acid"
    ],
    "damageImmunities": [
      "lightning",
      "slashing"
    ],
    "conditionImmunities": [
      "Blinded",
      "Charmed",
      "Exhaustion",
      "Frightened",
      "Prone"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 8,
      "blindsight": 60
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amorphous",
        "description": "The jelly can move through a space as narrow as 1 inch wide without squeezing."
      },
      {
        "name": "Spider Climb",
        "description": "The jelly can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      }
    ],
    "actions": [
      {
        "name": "Pseudopod",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) bludgeoning damage plus 3 (1d6) acid damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d6+2",
          "average": 9
        },
        "secondaryDamage": {
          "type": "Acid",
          "roll": "1d6",
          "average": 4
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large, acidic ooze that can dissolve flesh and bone. Ochre jellies are dangerous predators that can split into multiple smaller creatures when damaged by lightning or slashing attacks, making them particularly difficult to destroy.",    "imagePrompt": "A large ooze creature with amorphous and fluid form",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "ooze",
      "large",
      "unaligned",
      "ooze",
      "amorphous"
    ]
  }
];
