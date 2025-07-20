import { Monster } from '../../types/monster';

export const feyMonsters: Monster[] = [
  {
    "name": "Blink Dog",
    "size": "Medium",
    "type": "fey",
    "alignment": "lawful good",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 12,
    "dexterity": 17,
    "constitution": 12,
    "intelligence": 10,
    "wisdom": 13,
    "charisma": 11,
    "armorClass": 13,
    "armorType": "dex",
    "hitPoints": 22,
    "hitDice": "4d8",
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
      "passivePerception": 10
    },
    "languages": [
      "Blink Dog",
      "understands Sylvan but can't speak it"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The dog has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage.",
        "attackBonus": 3
      },
      {
        "name": "Teleport",
        "description": "The dog magically teleports, along with any equipment it is wearing or carrying, up to 40 ft. to an unoccupied space it can see. Before or after teleporting, the dog can make one bite attack."
      }
    ],
    "legendaryActions": [],
    "description": "A blink dog takes its name from its ability to blink in and out of existence, a talent it uses to aid its attacks and to avoid harm.",
    "source": "SRD",
    "tags": [
      "fey",
      "medium",
      "lawful good"
    ]
  },
  {
    "name": "Dryad",
    "size": "Medium",
    "type": "fey",
    "alignment": "neutral",
    "challengeRating": "1",
    "xp": 200,
    "strength": 10,
    "dexterity": 12,
    "constitution": 11,
    "intelligence": 14,
    "wisdom": 15,
    "charisma": 18,
    "armorClass": 11,
    "armorType": "dex",
    "hitPoints": 22,
    "hitDice": "5d8",
    "speed": {
      "walk": 30,
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
    "languages": [
      "Elvish",
      "Sylvan"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Innate Spellcasting",
        "description": "The dryad's innate spellcasting ability is Charisma (spell save DC 14). The dryad can innately cast the following spells, requiring no material components:\n\nAt will: druidcraft\n3/day each: entangle, goodberry\n1/day each: barkskin, pass without trace, shillelagh"
      },
      {
        "name": "Magic Resistance",
        "description": "The dryad has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Speak with Beasts and Plants",
        "description": "The dryad can communicate with beasts and plants as if they shared a language."
      },
      {
        "name": "Tree Stride",
        "description": "Once on her turn, the dryad can use 10 ft. of her movement to step magically into one living tree within her reach and emerge from a second living tree within 60 ft. of the first tree, appearing in an unoccupied space within 5 ft. of the second tree. Both trees must be large or bigger."
      }
    ],
    "actions": [
      {
        "name": "Club",
        "description": "Melee Weapon Attack: +2 to hit (+6 to hit with shillelagh), reach 5 ft., one target. Hit: 2 (1 d4) bludgeoning damage, or 8 (1d8 + 4) bludgeoning damage with shillelagh.",
        "attackBonus": 2
      },
      {
        "name": "Fey Charm",
        "description": "The dryad targets one humanoid or beast that she can see within 30 feet of her. If the target can see the dryad, it must succeed on a DC 14 Wisdom saving throw or be magically charmed. The charmed creature regards the dryad as a trusted friend to be heeded and protected. Although the target isn't under the dryad's control, it takes the dryad's requests or actions in the most favorable way it can.\nEach time the dryad or its allies do anything harmful to the target, it can repeat the saving throw, ending the effect on itself on a success. Otherwise, the effect lasts 24 hours or until the dryad dies, is on a different plane of existence from the target, or ends the effect as a bonus action. If a target's saving throw is successful, the target is immune to the dryad's Fey Charm for the next 24 hours.\nThe dryad can have no more than one humanoid and up to three beasts charmed at a time."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fey",
      "medium",
      "neutral"
    ]
  },
  {
    "name": "Green Hag",
    "size": "Medium",
    "type": "fey",
    "alignment": "neutral evil",
    "challengeRating": "3",
    "xp": 700,
    "strength": 18,
    "dexterity": 12,
    "constitution": 16,
    "intelligence": 13,
    "wisdom": 14,
    "charisma": 14,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 82,
    "hitDice": "11d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Arcana": 3,
      "Deception": 4,
      "Perception": 4,
      "Stealth": 3
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
      "Common",
      "Draconic",
      "Sylvan"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The hag can breathe air and water."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The hag's innate spellcasting ability is Charisma (spell save DC 12). She can innately cast the following spells, requiring no material components:\n\nAt will: dancing lights, minor illusion, vicious mockery"
      },
      {
        "name": "Mimicry",
        "description": "The hag can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations with a successful DC 14 Wisdom (Insight) check."
      }
    ],
    "actions": [
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.",
        "attackBonus": 6
      },
      {
        "name": "Illusory Appearance",
        "description": "The hag covers herself and anything she is wearing or carrying with a magical illusion that makes her look like another creature of her general size and humanoid shape. The illusion ends if the hag takes a bonus action to end it or if she dies.\nThe changes wrought by this effect fail to hold up to physical inspection. For example, the hag could appear to have smooth skin, but someone touching her would feel her rough flesh. Otherwise, a creature must take an action to visually inspect the illusion and succeed on a DC 20 Intelligence (Investigation) check to discern that the hag is disguised."
      },
      {
        "name": "Invisible Passage",
        "description": "The hag magically turns invisible until she attacks or casts a spell, or until her concentration ends (as if concentrating on a spell). While invisible, she leaves no physical evidence of her passage, so she can be tracked only by magic. Any equipment she wears or carries is invisible with her."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fey",
      "medium",
      "neutral evil"
    ]
  },
  {
    "name": "Satyr",
    "size": "Medium",
    "type": "fey",
    "alignment": "chaotic neutral",
    "challengeRating": "0.5",
    "xp": 100,
    "strength": 12,
    "dexterity": 16,
    "constitution": 11,
    "intelligence": 12,
    "wisdom": 10,
    "charisma": 14,
    "armorClass": 14,
    "armorType": "armor",
    "hitPoints": 31,
    "hitDice": "7d8",
    "speed": {
      "walk": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 2,
      "Performance": 6,
      "Stealth": 5
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 12
    },
    "languages": [
      "Common",
      "Elvish",
      "Sylvan"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Magic Resistance",
        "description": "The satyr has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Ram",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) bludgeoning damage.",
        "attackBonus": 3
      },
      {
        "name": "Shortsword",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1 d6 + 3) piercing damage.",
        "attackBonus": 5
      },
      {
        "name": "Shortbow",
        "description": "Ranged Weapon Attack: +5 to hit, range 80/320 ft., one target. Hit: 6 (1d6 + 3) piercing damage.",
        "attackBonus": 5
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fey",
      "medium",
      "chaotic neutral"
    ]
  },
  {
    "name": "Sea Hag",
    "size": "Medium",
    "type": "fey",
    "alignment": "chaotic evil",
    "challengeRating": "2",
    "xp": 450,
    "strength": 16,
    "dexterity": 13,
    "constitution": 16,
    "intelligence": 12,
    "wisdom": 12,
    "charisma": 13,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 52,
    "hitDice": "7d8",
    "speed": {
      "walk": 30,
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
      "passivePerception": 11
    },
    "languages": [
      "Aquan",
      "Common",
      "Giant"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The hag can breathe air and water."
      },
      {
        "name": "Horrific Appearance",
        "description": "Any humanoid that starts its turn within 30 feet of the hag and can see the hag's true form must make a DC 11 Wisdom saving throw. On a failed save, the creature is frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, with disadvantage if the hag is within line of sight, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the hag's Horrific Appearance for the next 24 hours.\nUnless the target is surprised or the revelation of the hag's true form is sudden, the target can avert its eyes and avoid making the initial saving throw. Until the start of its next turn, a creature that averts its eyes has disadvantage on attack rolls against the hag."
      }
    ],
    "actions": [
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage.",
        "attackBonus": 5
      },
      {
        "name": "Death Glare",
        "description": "The hag targets one frightened creature she can see within 30 ft. of her. If the target can see the hag, it must succeed on a DC 11 Wisdom saving throw against this magic or drop to 0 hit points."
      },
      {
        "name": "Illusory Appearance",
        "description": "The hag covers herself and anything she is wearing or carrying with a magical illusion that makes her look like an ugly creature of her general size and humanoid shape. The effect ends if the hag takes a bonus action to end it or if she dies.\nThe changes wrought by this effect fail to hold up to physical inspection. For example, the hag could appear to have no claws, but someone touching her hand might feel the claws. Otherwise, a creature must take an action to visually inspect the illusion and succeed on a DC 16 Intelligence (Investigation) check to discern that the hag is disguised."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fey",
      "medium",
      "chaotic evil"
    ]
  },
  {
    "name": "Sprite",
    "size": "Tiny",
    "type": "fey",
    "alignment": "neutral good",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 3,
    "dexterity": 18,
    "constitution": 10,
    "intelligence": 14,
    "wisdom": 13,
    "charisma": 11,
    "armorClass": 15,
    "armorType": "armor",
    "hitPoints": 2,
    "hitDice": "1d4",
    "speed": {
      "walk": 10,
      "fly": 40,
      "hover": false
    },
    "savingThrows": {},
    "skills": {
      "Perception": 3,
      "Stealth": 8
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 13
    },
    "languages": [
      "Common",
      "Elvish",
      "Sylvan"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 1 slashing damage.",
        "attackBonus": 2
      },
      {
        "name": "Shortbow",
        "description": "Ranged Weapon Attack: +6 to hit, range 40/160 ft., one target. Hit: 1 piercing damage, and the target must succeed on a DC 10 Constitution saving throw or become poisoned for 1 minute. If its saving throw result is 5 or lower, the poisoned target falls unconscious for the same duration, or until it takes damage or another creature takes an action to shake it awake.",
        "attackBonus": 6
      },
      {
        "name": "Heart Sight",
        "description": "The sprite touches a creature and magically knows the creature's current emotional state. If the target fails a DC 10 Charisma saving throw, the sprite also knows the creature's alignment. Celestials, fiends, and undead automatically fail the saving throw."
      },
      {
        "name": "Invisibility",
        "description": "The sprite magically turns invisible until it attacks or casts a spell, or until its concentration ends (as if concentrating on a spell). Any equipment the sprite wears or carries is invisible with it."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "fey",
      "tiny",
      "neutral good"
    ]
  }
];
