import { Monster } from '@/types/monster';

export const giantMonsters: Monster[] = [
  {
    "name": "Cloud Giant",
    "size": "Huge",
    "type": "giant",
    "alignment": "neutral good (50%) or neutral evil (50%)",
    "challengeRating": "9",
    "xp": 5000,
    "strength": 27,
    "dexterity": 10,
    "constitution": 22,
    "intelligence": 12,
    "wisdom": 16,
    "charisma": 16,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 200,
    "hitDice": "16d12+96",
    "speed": {
      "walk": 40
    },
    "savingThrows": {},
    "skills": {
      "Insight": 7,
      "Perception": 7
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 17
    },
    "languages": [
      "Common",
      "Giant"
    ],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "A massive giant with skin that ranges from pearly white to sky blue, often with hair that resembles clouds. Cloud giants are among the most intelligent and cultured of the giant races, dwelling in floating castles and valuing art and music."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The giant's innate spellcasting ability is Charisma. It can innately cast the following spells, requiring no material components:\n\nAt will: detect magic, fog cloud, light\n3/day each: feather fall, fly, misty step, telekinesis\n1/day each: control weather, gaseous form"
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The giant makes two morningstar attacks."
      },
      {
        "name": "Morningstar",
        "description": "Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 21 (3d8 + 8) piercing damage.",
        "attackBonus": 12,
        "damage": {
          "type": "Piercing",
          "roll": "3d8+8",
          "average": 22
        }
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +12 to hit, range 60/240 ft., one target. Hit: 30 (4d10 + 8) bludgeoning damage.",
        "attackBonus": 12,
        "damage": {
          "type": "Bludgeoning",
          "roll": "4d10+8",
          "average": 30
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive giant with skin that ranges from pearly white to sky blue, often with hair that resembles clouds. Cloud giants are among the most intelligent and cultured of the giant races, dwelling in floating castles and valuing art and music.",
    "imagePrompt": "A huge giant with pearly white to sky blue skin, cloud-like hair, floating castle dweller, cultured and intelligent appearance, massive size and strength",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "giant",
      "huge",
      "neutral-good (50%) or neutral evil (50%)",
      "giant",
      "large"
    ]
  },
  {
    "name": "Ettin",
    "size": "Large",
    "type": "giant",
    "alignment": "chaotic evil",
    "challengeRating": "4",
    "xp": 1100,
    "strength": 21,
    "dexterity": 8,
    "constitution": 17,
    "intelligence": 6,
    "wisdom": 10,
    "charisma": 8,
    "armorClass": 12,
    "armorType": "natural",
    "hitPoints": 85,
    "hitDice": "10d10+30",
    "speed": {
      "walk": 40
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
    "languages": [
      "Giant",
      "Orc"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Two Heads",
        "description": "A large two-headed giant-like humanoid with filthy, unkempt hair and dirty skin. Each head has its own personality and desires, often arguing with itself. Ettins are brutish, solitary creatures that prefer to live alone in remote areas."
      },
      {
        "name": "Wakeful",
        "description": "When one of the ettin's heads is asleep, its other head is awake."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The ettin makes two attacks: one with its battleaxe and one with its morningstar."
      },
      {
        "name": "Battleaxe",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Slashing",
          "roll": "2d8+5",
          "average": 14
        }
      },
      {
        "name": "Morningstar",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) piercing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "2d8+5",
          "average": 14
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large two-headed giant-like humanoid with filthy, unkempt hair and dirty skin. Each head has its own personality and desires.",
    "background": "Ettins are two-headed, giant-like humanoids known for their brute strength and brutish nature. They are typically solitary, chaotic evil creatures that prefer to live alone in remote areas.",
    "imagePrompt": "A large two-headed giant-like humanoid with filthy unkempt hair, dirty skin, two heads each with its own personality, brutish appearance, solitary demonic giant",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "giant",
      "large",
      "chaotic-evil",
      "giant",
      "large"
    ]
  },
  {
    "name": "Fire Giant",
    "size": "Huge",
    "type": "giant",
    "alignment": "lawful evil",
    "challengeRating": "9",
    "xp": 5000,
    "strength": 25,
    "dexterity": 9,
    "constitution": 23,
    "intelligence": 10,
    "wisdom": 14,
    "charisma": 13,
    "armorClass": 18,
    "armorType": "armor",
    "hitPoints": 162,
    "hitDice": "13d12+78",
    "speed": {
      "walk": 30
    },
    "savingThrows": {},
    "skills": {
      "Athletics": 11,
      "Perception": 6
    },
    "damageResistances": [],
    "damageImmunities": [
      "fire"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 16
    },
    "languages": [
      "Giant"
    ],
    "proficiencyBonus": 4,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "A massive giant with skin the color of molten iron and hair that flickers like flame. Fire giants dwell in volcanic regions and are master smiths, creating powerful weapons and armor in their forges. They are lawful evil and highly organized."
      },
      {
        "name": "Greatsword",
        "description": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 28 (6d6 + 7) slashing damage.",
        "attackBonus": 11,
        "damage": {
          "type": "Slashing",
          "roll": "6d6+7",
          "average": 28
        }
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +11 to hit, range 60/240 ft., one target. Hit: 29 (4d10 + 7) bludgeoning damage.",
        "attackBonus": 11,
        "damage": {
          "type": "Bludgeoning",
          "roll": "4d10+7",
          "average": 29
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive giant with skin the color of molten iron and hair that flickers like flame. Fire giants dwell in volcanic regions and are master smiths, creating powerful weapons and armor in their forges. They are lawful evil and highly organized.",
    "imagePrompt": "A huge giant with molten iron-colored skin, flame-like hair, volcanic dweller, master smith appearance, massive size and strength, lawful evil demeanor",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "giant",
      "huge",
      "lawful-evil",
      "giant",
      "large"
    ]
  },
  {
    "name": "Frost Giant",
    "size": "Huge",
    "type": "giant",
    "alignment": "neutral evil",
    "challengeRating": "8",
    "xp": 3900,
    "strength": 23,
    "dexterity": 9,
    "constitution": 21,
    "intelligence": 9,
    "wisdom": 10,
    "charisma": 12,
    "armorClass": 15,
    "armorType": "armor",
    "hitPoints": 138,
    "hitDice": "12d12+60",
    "speed": {
      "walk": 40
    },
    "savingThrows": {},
    "skills": {
      "Athletics": 9,
      "Perception": 3
    },
    "damageResistances": [],
    "damageImmunities": [
      "cold"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 13
    },
    "languages": [
      "Giant"
    ],
    "proficiencyBonus": 3,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The giant makes two greataxe attacks."
      },
      {
        "name": "Greataxe",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 25 (3d12 + 6) slashing damage.",
        "attackBonus": 9,
        "damage": {
          "type": "Slashing",
          "roll": "3d12+6",
          "average": 26
        }
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +9 to hit, range 60/240 ft., one target. Hit: 28 (4d10 + 6) bludgeoning damage.",
        "attackBonus": 9,
        "damage": {
          "type": "Bludgeoning",
          "roll": "4d10+6",
          "average": 28
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive giant with pale blue skin and hair as white as snow. Frost giants are native to cold regions and are well-adapted to freezing temperatures, often keeping giant animals as pets and mounts. They are neutral evil and value strength above all.",
    "imagePrompt": "A huge giant with pale blue skin, snow-white hair, cold region dweller, frost-adapted appearance, massive size and strength, neutral evil demeanor",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "giant",
      "huge",
      "neutral-evil",
      "giant",
      "large"
    ]
  },
  {
    "name": "Hill Giant",
    "size": "Huge",
    "type": "giant",
    "alignment": "chaotic evil",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 21,
    "dexterity": 8,
    "constitution": 19,
    "intelligence": 5,
    "wisdom": 9,
    "charisma": 6,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 105,
    "hitDice": "10d12+40",
    "speed": {
      "walk": 40
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
      "passivePerception": 12
    },
    "languages": [
      "Giant"
    ],
    "proficiencyBonus": 3,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The giant makes two greatclub attacks."
      },
      {
        "name": "Greatclub",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 18 (3d8 + 5) bludgeoning damage.",
        "attackBonus": 8,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d8+5",
          "average": 19
        }
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +8 to hit, range 60/240 ft., one target. Hit: 21 (3d10 + 5) bludgeoning damage.",
        "attackBonus": 8,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d10+5",
          "average": 22
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large, brutish giant with dirty, unkempt hair and simple clothing made of animal hides. Hill giants are the most common and least intelligent of the giant races, living in simple communities. They are chaotic evil and often raid human settlements for food.",
    "imagePrompt": "A large brutish giant with dirty unkempt hair, animal hide clothing, simple community dweller, least intelligent appearance, chaotic evil demeanor",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "giant",
      "huge",
      "chaotic-evil",
      "giant",
      "large"
    ]
  },
  {
    "name": "Ogre",
    "size": "Large",
    "type": "giant",
    "alignment": "chaotic evil",
    "challengeRating": "2",
    "xp": 450,
    "strength": 19,
    "dexterity": 8,
    "constitution": 16,
    "intelligence": 5,
    "wisdom": 7,
    "charisma": 7,
    "armorClass": 11,
    "armorType": "armor",
    "hitPoints": 59,
    "hitDice": "7d10+21",
    "speed": {
      "walk": 40
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 8,
      "darkvision": 60
    },
    "languages": [
      "Common",
      "Giant"
    ],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Greatclub",
        "description": "A large, brutish giant with dirty, unkempt hair and simple clothing made of animal hides. Ogres are among the most common and least intelligent of the giant races, living in simple communities and often serving as muscle for more powerful creatures.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+4",
          "average": 13
        }
      },
      {
        "name": "Javelin",
        "description": "Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 11 (2d6 + 4) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "2d6+4",
          "average": 11
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large, brutish giant with dirty, unkempt hair and simple clothing made of animal hides. Hill giants are the most common and least intelligent of the giant races, living in simple communities.",
    "imagePrompt": "A large brutish giant with dirty unkempt hair, animal hide clothing, simple community dweller, least intelligent appearance, chaotic evil demeanor",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "giant",
      "large",
      "chaotic-evil",
      "giant",
      "large"
    ]
  },
  {
    "name": "Oni",
    "size": "Large",
    "type": "giant",
    "alignment": "lawful evil",
    "challengeRating": "7",
    "xp": 2900,
    "strength": 19,
    "dexterity": 11,
    "constitution": 16,
    "intelligence": 14,
    "wisdom": 12,
    "charisma": 15,
    "armorClass": 16,
    "armorType": "armor",
    "hitPoints": 110,
    "hitDice": "13d10+39",
    "speed": {
      "walk": 30
    },
    "savingThrows": {},
    "skills": {
      "Arcana": 5,
      "Deception": 8,
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
    "languages": [
      "Common",
      "Giant"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Innate Spellcasting",
        "description": "A large 8-14 foot tall monstrous humanoid with blue or green skin, dark hair, horns, and sharp teeth. Some have red faces like kabuki masks. Oni are intelligent and cunning, known for their cruelty and love of causing suffering. They can shapeshift to deceive and manipulate their prey."
      },
      {
        "name": "Magic Weapons",
        "description": "The oni's weapon attacks are magical."
      },
      {
        "name": "Regeneration",
        "description": "The oni regains 10 hit points at the start of its turn if it has at least 1 hit point."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The oni makes two attacks, either with its claws or its glaive."
      },
      {
        "name": "Claw (Oni Form Only)",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Slashing",
          "roll": "1d8+4",
          "average": 9
        }
      },
      {
        "name": "Glaive",
        "description": "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) slashing damage, or 9 (1d10 + 4) slashing damage in Small or Medium form.",
        "attackBonus": 7,
        "damage": {
          "type": "Slashing",
          "roll": "2d10+4",
          "average": 15
        }
      },
      {
        "name": "Change Shape",
        "description": "The oni magically polymorphs into a Small or Medium humanoid, into a Large giant, or back into its true form. Other than its size, its statistics are the same in each form. The only equipment that is transformed is its glaive, which shrinks so that it can be wielded in humanoid form. If the oni dies, it reverts to its true form, and its glaive reverts to its normal size.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large 8-14 foot tall monstrous humanoid with blue or green skin, dark hair, horns, and sharp teeth. Some have red faces like kabuki masks.",
    "background": "Oni are intelligent and cunning monstrous humanoids known for their cruelty and love of causing suffering. They can shapeshift to deceive and manipulate their prey.",
    "imagePrompt": "A large 8-14 foot tall monstrous humanoid with blue or green skin, dark hair, horns, sharp teeth, some with red faces like kabuki masks, fearsome demonic ogre appearance",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "giant",
      "large",
      "lawful-evil",
      "giant",
      "large"
    ]
  },
  {
    "name": "Stone Giant",
    "size": "Huge",
    "type": "giant",
    "alignment": "neutral",
    "challengeRating": "7",
    "xp": 2900,
    "strength": 23,
    "dexterity": 15,
    "constitution": 20,
    "intelligence": 10,
    "wisdom": 12,
    "charisma": 9,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 126,
    "hitDice": "11d12+55",
    "speed": {
      "walk": 40
    },
    "savingThrows": {},
    "skills": {
      "Athletics": 12,
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
    "languages": [
      "Giant"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Stone Camouflage",
        "description": "A massive giant with skin that resembles weathered stone and a stoic, contemplative demeanor. Stone giants prefer to live in mountainous regions and are deeply connected to the earth. They are neutral in alignment and value solitude and meditation."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The giant makes two greatclub attacks."
      },
      {
        "name": "Greatclub",
        "description": "Melee Weapon Attack: +9 to hit, reach 15 ft., one target. Hit: 19 (3d8 + 6) bludgeoning damage.",
        "attackBonus": 9,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d8+6",
          "average": 20
        }
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +9 to hit, range 60/240 ft., one target. Hit: 28 (4d10 + 6) bludgeoning damage. If the target is a creature, it must succeed on a DC 17 Strength saving throw or be knocked prone.",
        "attackBonus": 9,
        "damage": {
          "type": "Bludgeoning",
          "roll": "4d10+6",
          "average": 28
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large giant with skin that resembles weathered stone and a stoic, contemplative demeanor. Stone giants prefer to live in mountainous regions and are deeply connected to the earth.",
    "imagePrompt": "A huge giant with weathered stone-like skin, stoic contemplative demeanor, mountainous dweller, earth-connected appearance, massive size and strength, neutral alignment",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "giant",
      "huge",
      "neutral",
      "giant",
      "large"
    ]
  },
  {
    "name": "Storm Giant",
    "size": "Huge",
    "type": "giant",
    "alignment": "chaotic good",
    "challengeRating": "13",
    "xp": 10000,
    "strength": 29,
    "dexterity": 14,
    "constitution": 20,
    "intelligence": 16,
    "wisdom": 18,
    "charisma": 18,
    "armorClass": 16,
    "armorType": "armor",
    "hitPoints": 230,
    "hitDice": "20d12+100",
    "speed": {
      "walk": 50,
      "swim": 50
    },
    "savingThrows": {},
    "skills": {
      "Arcana": 8,
      "Athletics": 14,
      "History": 8,
      "Perception": 9
    },
    "damageResistances": [
      "cold"
    ],
    "damageImmunities": [
      "lightning",
      "thunder"
    ],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 19
    },
    "languages": [
      "Common",
      "Giant"
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Amphibious",
        "description": "The giant can breathe air and water."
      },
      {
        "name": "Innate Spellcasting",
        "description": "The giant's innate spellcasting ability is Charisma (spell save DC 17). It can innately cast the following spells, requiring no material components:\n\nAt will: detect magic, feather fall, levitate, light\n3/day each: control weather, water breathing"
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The giant makes two greatsword attacks."
      },
      {
        "name": "Greatsword",
        "description": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 30 (6d6 + 9) slashing damage.",
        "attackBonus": 14,
        "damage": {
          "type": "Slashing",
          "roll": "6d6+9",
          "average": 30
        }
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +14 to hit, range 60/240 ft., one target. Hit: 35 (4d12 + 9) bludgeoning damage.",
        "attackBonus": 14,
        "damage": {
          "type": "Bludgeoning",
          "roll": "4d12+9",
          "average": 35
        }
      },
      {
        "name": "Lightning Strike",
        "description": "The giant hurls a magical lightning bolt at a point it can see within 500 feet of it. Each creature within 10 feet of that point must make a DC 17 Dexterity saving throw, taking 54 (12d8) lightning damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Lightning",
          "roll": "12d8",
          "average": 54
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive giant with skin that ranges from deep blue to purple, with hair that crackles with lightning. Storm giants are the most powerful and noble of the giant races, dwelling in cloud castles and commanding the weather. They are chaotic good and protect the natural world.",
    "imagePrompt": "A huge giant with deep blue to purple skin, lightning-crackling hair, cloud castle dweller, noble powerful appearance, massive size and strength, chaotic good demeanor",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "giant",
      "huge",
      "chaotic-good",
      "giant",
      "large"
    ]
  },
  {
    "name": "Troll",
    "size": "Large",
    "type": "giant",
    "alignment": "chaotic evil",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 18,
    "dexterity": 13,
    "constitution": 20,
    "intelligence": 7,
    "wisdom": 9,
    "charisma": 7,
    "armorClass": 15,
    "armorType": "natural",
    "hitPoints": 84,
    "hitDice": "8d10+40",
    "speed": {
      "walk": 30
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
      "passivePerception": 12,
      "darkvision": 60
    },
    "languages": [
      "Giant"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The troll has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Regeneration",
        "description": "The troll regains 10 hit points at the start of its turn. If the troll takes acid or fire damage, this trait doesn't function at the start of the troll's next turn. The troll dies only if it starts its turn with 0 hit points and doesn't regenerate."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The troll makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "1d6+4",
          "average": 8
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
      }
    ],
    "legendaryActions": [],
    "description": "A large, gangly humanoid with rubbery, warty skin that ranges from green to gray. Trolls have long arms, sharp claws, and a hideous face with a prominent nose. They are incredibly resilient and can regenerate from almost any wound, making them fearsome opponents.",
    "imagePrompt": "A large gangly humanoid with rubbery warty green to gray skin, long arms, sharp claws, hideous face with prominent nose, regenerative appearance, chaotic evil demeanor",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "giant",
      "large",
      "chaotic-evil",
      "giant",
      "large"
    ]
  }
];
