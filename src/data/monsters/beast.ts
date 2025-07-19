import { Monster } from '@/types/monster';

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
    "hitDice": "3d8+6",
    "speed": {
      "walk": 30,
      "climb": 30
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
        "description": "The ape makes two fist attacks."
      },
      {
        "name": "Fist",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d6+3",
          "average": 7
        }
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +5 to hit, range 25/50 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d6+3",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "A powerful primate with muscular arms and intelligent eyes. Apes are highly intelligent creatures that can use tools and communicate through gestures and vocalizations. They are excellent climbers and can swing through trees with remarkable agility.",
    "background": "Apes inhabit dense forests and jungles where they live in social groups led by dominant males. They are omnivorous, feeding on fruits, leaves, insects, and occasionally small animals. Apes are known for their problem-solving abilities and have been observed using sticks as tools to extract insects from tree bark.",
    "imagePrompt": "A medium-sized gorilla-like ape with dark fur, muscular arms, and intelligent eyes",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "3d10+3",
    "speed": {
      "walk": 50
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
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Slashing",
          "roll": "1d8+2",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "An axe beak is a tall flightless bird with strong legs and a heavy, wedge-shaped beak. It has a nasty disposition and tends to attack any unfamiliar creature that wanders too close.",
    "background": "An axe beak is a tall flightless bird with strong legs and a heavy, wedge-shaped beak. It has a nasty disposition and tends to attack any unfamiliar creature that wanders too close.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
      "climb": 30
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
        "description": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 1 (1d4 - 1) piercing damage.",
        "attackBonus": 1,
        "damage": {
          "type": "Piercing",
          "roll": "1d4-1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, intelligent primate with distinctive facial features and a long tail. Baboons are highly social animals that live in large troops with complex hierarchies. They are excellent climbers and can be quite aggressive when defending their territory.",
    "background": "Baboons inhabit savannas, grasslands, and rocky areas where they forage for food in large groups. They are omnivorous, eating fruits, seeds, insects, and small animals. Baboons are known for their complex social behavior and communication through vocalizations and body language.",
    "imagePrompt": "A small beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "small",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "1d4+1",
    "speed": {
      "walk": 20,
      "burrow": 5
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 11,
      "darkvision": 30
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
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 1 piercing damage.",
        "attackBonus": 2,
        "damage": {
          "type": "Piercing",
          "roll": "1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, harmless animal that poses no threat to adventurers. Tiny beasts are often found in natural environments and serve as prey for larger creatures.",
    "imagePrompt": "A tiny beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "1d4+-1",
    "speed": {
      "walk": 5,
      "fly": 30
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 11,
      "blindsight": 60
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
        "description": "Melee Weapon Attack: +0 to hit, reach 5 ft., one creature. Hit: 1 piercing damage.",
        "damage": {
          "type": "Piercing",
          "roll": "1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small flying mammal with leathery wings and echolocation abilities. Bats hunt insects at night and can navigate in complete darkness. They often roost in caves and abandoned buildings, hanging upside down from ceilings.",
    "imagePrompt": "A small brown bat with leathery wings, pointed ears, and tiny claws hanging upside down",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "3d8+6",
    "speed": {
      "walk": 40,
      "climb": 30
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
        "description": "The bear makes two attacks: one with its bite and one with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Piercing",
          "roll": "1d6+2",
          "average": 6
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Slashing",
          "roll": "2d4+2",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "A powerful forest predator with shaggy black fur and sharp claws. Black bears are excellent climbers, often scaling trees to escape danger or reach food. They roam dense woodlands and mountain valleys, where their dark fur helps them blend into the shadows. Though generally shy, black bears become fierce when protecting their cubs or when surprised by travelers. They are known to raid campsites and villages for food, and their strength makes them dangerous opponents even for experienced adventurers. In the wild, they often mark their territory with deep claw marks on trees, serving as warnings to other creatures and unwary travelers.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
      "fly": 60
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
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d4+2",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "Taking its name from its crimson feathers and aggressive nature, the blood hawk fearlessly attacks almost any animal, stabbing it with its daggerlike beak. Blood hawks flock together in large numbers, attacking as a pack to take down prey.",
    "background": "Taking its name from its crimson feathers and aggressive nature, the blood hawk fearlessly attacks almost any animal, stabbing it with its daggerlike beak. Blood hawks flock together in large numbers, attacking as a pack to take down prey.",
    "imagePrompt": "A small beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "small",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "2d8+2",
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
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) slashing damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Slashing",
          "roll": "1d6+1",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "A fierce wild pig with thick bristly fur and deadly curved tusks. Boars are incredibly tough creatures that refuse to die easily, often continuing to fight even when grievously wounded. They roam forests and scrublands, using their powerful snouts to root through the earth for food. Boars are known for their aggressive nature and will charge at anything that threatens them, using their tusks to gore enemies and knock them to the ground. They often travel in small groups called sounders, and their territory is marked by deep wallows they create in muddy areas. Boars are dangerous opponents that can easily overwhelm unwary travelers, and their meat is prized by hunters and villagers alike.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "4d10+12",
    "speed": {
      "walk": 40,
      "climb": 30
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
        "description": "The bear makes two attacks: one with its bite and one with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d8+4",
          "average": 9
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+4",
          "average": 11
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive brown bear with powerful claws and incredible strength. Brown bears are territorial predators that can take down large prey with their sheer power. They are excellent swimmers and climbers, often fishing for salmon in rivers or raiding beehives for honey. Brown bears are more aggressive than black bears and will defend their territory fiercely.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "2d10+4",
    "speed": {
      "walk": 50
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
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large desert beast with a distinctive hump that stores water and fat. Camels can travel for days without water across scorching sands, making them essential for desert caravans and expeditions. They are stubborn but reliable mounts that can carry heavy loads through harsh terrain.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
      "climb": 30
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
        "description": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 slashing damage.",
        "damage": {
          "type": "Slashing",
          "roll": "1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, agile feline with sharp claws and keen senses. Cats are excellent climbers and can move silently through shadows, making them perfect companions for rogues and rangers. They are independent hunters that can survive in both urban and wilderness environments.",
    "imagePrompt": "A tiny beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "2d10+2",
    "speed": {
      "walk": 30,
      "swim": 30
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10,
      "blindsight": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d6+2",
          "average": 6
        }
      },
      {
        "name": "Constrict",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) bludgeoning damage, and the target is grappled (escape DC 14). Until this grapple ends, the creature is restrained, and the snake can't constrict another target.",
        "attackBonus": 4,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d8+2",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive serpent that hunts by coiling around its prey and crushing them to death. Constrictor snakes are excellent swimmers and can hold their breath for extended periods while stalking prey in rivers and swamps. They are patient hunters that strike from ambush.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
      "swim": 20
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
      "passivePerception": 9,
      "blindsight": 30
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
        "description": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 bludgeoning damage.",
        "damage": {
          "type": "Bludgeoning",
          "roll": "1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small armored crustacean with powerful pincers and a hard shell. Crabs scuttle sideways along beaches and riverbanks, using their claws to dig for food and defend themselves. They can breathe both air and water, making them adaptable to coastal environments.",
    "imagePrompt": "A tiny beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "3d10+3",
    "speed": {
      "walk": 20,
      "swim": 20
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
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target is grappled (escape DC 12). Until this grapple ends, the target is restrained, and the crocodile can't bite another target",
        "attackBonus": 4,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d10+2",
          "average": 8
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive reptile with armored scales and powerful jaws. Crocodiles lurk in rivers and swamps, waiting motionless for prey to approach before launching a devastating attack. They can hold their breath for hours while stalking underwater.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
      "walk": 50
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
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage.",
        "attackBonus": 2,
        "damage": {
          "type": "Piercing",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A graceful forest creature with branching antlers and keen senses. Deer are excellent runners and can leap great distances to escape predators. They are often found in woodlands and serve as prey for larger hunters.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "5d10+10",
    "speed": {
      "walk": 50
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
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "2d6+3",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive, savage wolf with thick fur and powerful jaws. Dire wolves are pack hunters that coordinate attacks to bring down large prey. They are more aggressive and dangerous than regular wolves.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "3d10+3",
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
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) bludgeoning damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d4+4",
          "average": 9
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large, muscular horse bred for heavy labor and pulling carts. Draft horses are patient and strong, making them ideal for farm work and transporting goods. They are less skittish than riding horses.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
      "fly": 60
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
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d4+2",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "A majestic bird of prey with keen eyesight and powerful talons. Eagles soar high above mountains and forests, scanning for prey below. They are symbols of freedom and strength in many cultures.",
    "imagePrompt": "A small beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "small",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "8d12+24",
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
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 19 (3d8 + 6) piercing damage.",
        "attackBonus": 8,
        "damage": {
          "type": "Piercing",
          "roll": "3d8+6",
          "average": 20
        }
      },
      {
        "name": "Stomp",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one prone creature. Hit: 22 (3d10 + 6) bludgeoning damage.",
        "attackBonus": 8,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d10+6",
          "average": 23
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive pachyderm with a long trunk and ivory tusks. Elephants are incredibly strong and intelligent, capable of complex social behaviors. They are often used as mounts or beasts of burden in warmer climates.",
    "imagePrompt": "A huge beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "2d10+2",
    "speed": {
      "walk": 50
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
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d6+3",
          "average": 7
        }
      },
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one prone creature. Hit: 8 (2d4 + 3) bludgeoning damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d4+3",
          "average": 8
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large, muscular horse bred for heavy labor and pulling carts. Draft horses are patient and strong, making them ideal for farm work and transporting goods. They are less skittish than riding horses.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
      "swim": 30
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 11,
      "blindsight": 10
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
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 1 piercing damage plus 7 (3d4) poison damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "A slender serpent that can glide through the air by flattening its body. Flying snakes launch themselves from trees and can cover surprising distances while hunting or escaping predators.",
    "background": "A flying snake is a brightly colored, winged serpent found in remote jungles. Tribespeople and cultists sometimes domesticate flying snakes to serve as messengers that deliver scrolls wrapped in their coils.",
    "imagePrompt": "A small colorful snake with feathered wings on its back, flying through the air with wings spread wide, snake body extended straight, head pointing forward",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "1d4+-1",
    "speed": {
      "walk": 20,
      "swim": 20
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
      "passivePerception": 11,
      "darkvision": 30
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
    "description": "A small amphibian with long legs and sticky tongue. Frogs inhabit ponds and marshes, using their powerful jumps to escape danger and catch insects. They are often found near water sources.",
    "background": "A frog has no effective attacks. It feeds on small insects and typically dwells near water, in trees, or underground. The frog's statistics can also be used to represent a toad.",
    "imagePrompt": "A tiny beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "15d12+60",
    "speed": {
      "walk": 40,
      "climb": 40
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
        "description": "The ape makes two fist attacks."
      },
      {
        "name": "Fist",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (3d10 + 6) bludgeoning damage.",
        "attackBonus": 9,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d10+6",
          "average": 23
        }
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +9 to hit, range 50/100 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage.",
        "attackBonus": 9,
        "damage": {
          "type": "Bludgeoning",
          "roll": "7d6+6",
          "average": 31
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive primate with incredible strength and intelligence. Giant apes are territorial creatures that can use simple tools and communicate through gestures and vocalizations.",
    "imagePrompt": "A massive gorilla-like ape with enormous muscles, dark fur, and intimidating presence",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "2d8+4",
    "speed": {
      "walk": 30,
      "burrow": 10
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 11,
      "darkvision": 30
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
        "description": "The badger makes two attacks: one with its bite and one with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Piercing",
          "roll": "1d6+1",
          "average": 5
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) slashing damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Slashing",
          "roll": "2d4+1",
          "average": 6
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large, aggressive burrowing mammal with powerful claws. Giant badgers dig extensive tunnel systems and are fiercely protective of their territory. They are known for their tenacity in combat.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
      "fly": 60
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 11,
      "blindsight": 60
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
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d6+2",
          "average": 6
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive flying mammal with leathery wings and sharp fangs. Giant bats hunt larger prey than their smaller cousins and can be found in deep caves or abandoned ruins.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "5d10+15",
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
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+3",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive wild pig with deadly tusks and incredible toughness. Giant boars are even more aggressive than regular boars and can charge with devastating force.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "1d6+1",
    "speed": {
      "walk": 30,
      "climb": 30
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 8,
      "blindsight": 30
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) piercing damage, and the target must succeed on a DC 11 Constitution saving throw or take 10 (3d6) poison damage. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d4+2",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive segmented arthropod with venomous fangs. Giant centipedes hunt in dark places and can inject deadly poison with their bites.",
    "imagePrompt": "A long segmented arthropod with one pair of legs per body segment, flat body, antennae on head, venomous fangs, reddish-brown color, crawling on ground",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "small",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "8d12+8",
    "speed": {
      "walk": 30,
      "swim": 30
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
      "blindsight": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one creature. Hit: 11 (2d6 + 4) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "2d6+4",
          "average": 11
        }
      },
      {
        "name": "Constrict",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 13 (2d8 + 4) bludgeoning damage, and the target is grappled (escape DC 16). Until this grapple ends, the creature is restrained, and the snake can't constrict another target.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+4",
          "average": 13
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive serpent that can crush even large prey. Giant constrictor snakes are patient hunters that coil around their victims and squeeze the life from them.",
    "imagePrompt": "A huge beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned",
      "beast",
      "animal"
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
      "swim": 30
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
      "passivePerception": 9,
      "blindsight": 30
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
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage, and the target is grappled (escape DC 11). The crab has two claws, each of which can grapple only one target.",
        "attackBonus": 3,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d6+1",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive crustacean with powerful pincers and armored shell. Giant crabs are dangerous coastal predators that can easily crush smaller creatures.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "9d12+27",
    "speed": {
      "walk": 30,
      "swim": 50
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
        "description": "The crocodile makes two attacks: one with its bite and one with its tail."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 21 (3d10 + 5) piercing damage, and the target is grappled (escape DC 16). Until this grapple ends, the target is restrained, and the crocodile can't bite another target.",
        "attackBonus": 8,
        "damage": {
          "type": "Piercing",
          "roll": "3d10+5",
          "average": 22
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target not grappled by the crocodile. Hit: 14 (2d8 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 16 Strength saving throw or be knocked prone.",
        "attackBonus": 8,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+5",
          "average": 14
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive reptile that rules rivers and swamps. Giant crocodiles are ancient predators that can take down even large prey with their powerful jaws.",
    "imagePrompt": "A huge beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "4d10+4",
    "speed": {
      "walk": 10,
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
        "description": "The eagle makes two attacks: one with its beak and one with its talons."
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d6+3",
          "average": 7
        }
      },
      {
        "name": "Talons",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+3",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "A majestic bird of prey large enough to carry humanoids. Giant eagles are intelligent creatures that often serve as mounts or allies to good-aligned beings.",
    "background": "A giant eagle is a noble creature that speaks its own language and understands speech in the Common tongue. A mated pair of giant eagles typically has up to four eggs or young in their nest (treat the young as normal eagles).",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "neutral-good",
      "beast",
      "animal"
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
    "hitDice": "5d12+10",
    "speed": {
      "walk": 60
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
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d6+4",
          "average": 11
        }
      },
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one prone creature. Hit: 22 (4d8 + 4) bludgeoning damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "4d8+4",
          "average": 22
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive deer with impressive antlers and powerful hooves. Giant elk are majestic creatures that roam ancient forests and are often revered by druids.",
    "background": "The majestic giant elk is rare to the point that its appearance is often taken as a foreshadowing of an important event, such as the birth of a king. Legends tell of gods that take the form of giant elk when visiting the Material Plane. Many cultures therefore believe that to hunt these creatures is to invite divine wrath.",
    "imagePrompt": "A huge beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "1d6+1",
    "speed": {
      "walk": 30
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 8,
      "blindsight": 30
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
        "description": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 2 (1d6 - 1) slashing damage.",
        "attackBonus": 1,
        "damage": {
          "type": "Slashing",
          "roll": "1d6-1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large insect that glows with internal light. Giant fire beetles are often kept as pets or used as light sources in underground communities.",
    "background": "A giant fire beetle is a nocturnal creature that takes its name from a pair of glowing glands that give off light. Miners and adventurers prize these creatures, for a giant fire beetle's glands continue to shed light for 1d6 days after the beetle dies. Giant fire beetles are most commonly found underground and in dark forests.",
    "imagePrompt": "A small beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "small",
      "unaligned",
      "beast",
      "animal"
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
      "swim": 30
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
      "passivePerception": 12,
      "darkvision": 30
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
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage, and the target is grappled (escape DC 11). Until this grapple ends, the target is restrained, and the frog can't bite another target.",
        "attackBonus": 3,
        "damage": {
          "type": "Piercing",
          "roll": "1d6+1",
          "average": 5
        }
      },
      {
        "name": "Swallow",
        "description": "The frog makes one bite attack against a Small or smaller target it is grappling. If the attack hits, the target is swallowed, and the grapple ends. The swallowed target is blinded and restrained, it has total cover against attacks and other effects outside the frog, and it takes 5 (2d4) acid damage at the start of each of the frog's turns. The frog can have only one target swallowed at a time. If the frog dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 5 ft. of movement, exiting prone."
      }
    ],
    "legendaryActions": [],
    "description": "A massive amphibian with powerful leaps and sticky tongue. Giant frogs can swallow smaller creatures whole and are excellent swimmers.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "3d10+3",
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
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) bludgeoning damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d4+3",
          "average": 8
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large, sure-footed mountain dweller with curved horns. Giant goats can climb steep cliffs and are often used as mounts in mountainous regions.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "6d10+12",
    "speed": {
      "walk": 50
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
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "2d6+3",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive scavenger with powerful jaws and pack mentality. Giant hyenas are dangerous predators that hunt in groups and can bring down large prey.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "3d10+3",
    "speed": {
      "walk": 30,
      "climb": 30
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10,
      "darkvision": 30
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d8+2",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large reptile with armored scales and powerful tail. Giant lizards are territorial creatures that can be found in warm climates and underground.",
    "background": "A giant lizard can be ridden or used as a draft animal. Lizardfolk also keep them as pets, and subterranean giant lizards are used as mounts and pack animals by drow, duergar, and others.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "8d10+8",
    "speed": {
      "walk": 10,
      "swim": 60
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
      "passivePerception": 14,
      "darkvision": 60
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
        "description": "Melee Weapon Attack: +5 to hit, reach 15 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage. If the target is a creature, it is grappled (escape DC 16). Until this grapple ends, the target is restrained, and the octopus can't use its tentacles on another target.",
        "attackBonus": 5,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d6+3",
          "average": 10
        }
      },
      {
        "name": "Ink Cloud",
        "description": "A 20-foot-radius cloud of ink extends all around the octopus if it is underwater. The area is heavily obscured for 1 minute, although a significant current can disperse the ink. After releasing the ink, the octopus can use the Dash action as a bonus action."
      }
    ],
    "legendaryActions": [],
    "description": "A massive cephalopod with eight powerful tentacles. Giant octopuses are intelligent hunters that can squeeze through small openings and use camouflage.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "3d10+3",
    "speed": {
      "walk": 5,
      "fly": 60
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
      "passivePerception": 15,
      "darkvision": 120
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
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 8 (2d6 + 1) slashing damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+1",
          "average": 8
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive nocturnal bird with silent flight and keen senses. Giant owls are intelligent creatures that often serve as mounts or companions to spellcasters.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "neutral",
      "beast",
      "animal"
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
    "hitDice": "2d8+2",
    "speed": {
      "walk": 30,
      "swim": 30
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
      "blindsight": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 6 (1d4 + 4) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d4+4",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive serpent with deadly venom. Giant poisonous snakes are feared for their lethal bites and are often found in jungles and swamps.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
      "walk": 30
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10,
      "darkvision": 60
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
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d4+2",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large rodent with sharp teeth and disease-carrying fleas. Giant rats are often found in sewers and dungeons, spreading filth and disease.",
    "imagePrompt": "A small beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "small",
      "unaligned",
      "beast",
      "animal"
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
      "walk": 30
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10,
      "darkvision": 60
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
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 2) piercing damage. If the target is a creature, it must succeed on a DC 10 Constitution saving throw or contract a disease. Until the disease is cured, the target can't regain hit points except by magical means, and the target's hit point maximum decreases by 3 (1d6) every 24 hours. If the target's hit point maximum drops to 0 as a result of this disease, the target dies.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d4+2",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large rodent with sharp teeth and disease-carrying fleas. Giant rats are often found in sewers and dungeons, spreading filth and disease.",
    "imagePrompt": "A large diseased rat with matted fur, open sores, yellowed teeth, red eyes, and aggressive stance, clearly sick and dangerous",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "small",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "7d10+14",
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
      "passivePerception": 9,
      "blindsight": 60
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) bludgeoning damage, and the target is grappled (escape DC 12). The scorpion has two claws, each of which can grapple only one target.",
        "attackBonus": 4,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d8+2",
          "average": 7
        }
      },
      {
        "name": "Multiattack",
        "description": "The scorpion makes three attacks: two with its claws and one with its sting."
      },
      {
        "name": "Sting",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target must make a DC 12 Constitution saving throw, taking 22 (4d10) poison damage on a failed save, or half as much damage on a successful one.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+2",
          "average": 8
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive arachnid with deadly stinger and powerful pincers. Giant scorpions are dangerous desert predators that inject lethal poison.",
    "background": "This giant scorpion is a deadly desert predator with venomous stinger.",
    "imagePrompt": "A large scorpion with curved tail and stinger in desert environment",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
      "swim": 40
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
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d6+1",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive aquatic creature with horse-like head and prehensile tail. Giant sea horses are often used as mounts by aquatic races.",
    "background": "Like their smaller kin, giant sea horses are shy, colorful fish with elongated bodies and curled tails. Aquatic elves train them as mounts.",
    "imagePrompt": "A large seahorse fish with elongated body, curled tail, colorful scales, seahorse head with tubular snout, underwater in ocean depths",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "11d12+55",
    "speed": {
      "swim": 50
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
      "passivePerception": 13,
      "blindsight": 60
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
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 22 (3d10 + 6) piercing damage.",
        "attackBonus": 9,
        "damage": {
          "type": "Piercing",
          "roll": "3d10+6",
          "average": 23
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive ocean predator with rows of razor-sharp teeth. Giant sharks are the apex predators of the deep, feared by sailors and coastal dwellers.",
    "background": "A giant shark is 30 feet long and normally found in deep oceans. Utterly fearless, it preys on anything that crosses its path, including whales and ships.",
    "imagePrompt": "A huge predatory shark with sleek body, sharp teeth, powerful jaws, swimming in deep ocean waters",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "4d10+4",
    "speed": {
      "walk": 30,
      "climb": 30
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
      "passivePerception": 10,
      "darkvision": 60,
      "blindsight": 10
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
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 7 (1d8 + 3) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 9 (2d8) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d8+3",
          "average": 8
        }
      },
      {
        "name": "Web",
        "description": "Ranged Weapon Attack: +5 to hit, range 30/60 ft., one creature. Hit: The target is restrained by webbing. As an action, the restrained target can make a DC 12 Strength check, bursting the webbing on a success. The webbing can also be attacked and destroyed (AC 10; hp 5; vulnerability to fire damage; immunity to bludgeoning, poison, and psychic damage).",
        "attackBonus": 5
      }
    ],
    "legendaryActions": [],
    "description": "A massive arachnid that spins webs and injects poison. Giant spiders are ambush predators that trap prey in their sticky webs.",
    "background": "To snare its prey, a giant spider spins elaborate webs or shoots sticky strands of webbing from its abdomen. Giant spiders are most commonly found underground, making their lairs on ceilings or in dark, web-filled crevices. Such lairs are often festooned with web cocoons holding past victims.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "6d10+6",
    "speed": {
      "walk": 20,
      "swim": 40
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10,
      "darkvision": 30
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
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 5 (1d10) poison damage, and the target is grappled (escape DC 13). Until this grapple ends, the target is restrained, and the toad can't bite another target.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+2",
          "average": 8
        }
      },
      {
        "name": "Swallow",
        "description": "The toad makes one bite attack against a Medium or smaller target it is grappling. If the attack hits, the target is swallowed, and the grapple ends. The swallowed target is blinded and restrained, it has total cover against attacks and other effects outside the toad, and it takes 10 (3d6) acid damage at the start of each of the toad's turns. The toad can have only one target swallowed at a time.\nIf the toad dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 5 feet of movement, exiting prone."
      }
    ],
    "legendaryActions": [],
    "description": "A massive amphibian with powerful leaps and toxic skin. Giant toads can swallow smaller creatures whole and are often found in swamps.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "3d10+6",
    "speed": {
      "walk": 10,
      "fly": 60
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
        "description": "The vulture makes two attacks: one with its beak and one with its talons."
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "2d4+2",
          "average": 7
        }
      },
      {
        "name": "Talons",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) slashing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+2",
          "average": 9
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive carrion bird with sharp beak and keen eyesight. Giant vultures circle above battlefields and dungeons, waiting for the dead.",
    "background": "A giant vulture has advanced intelligence and a malevolent bent. Unlike its smaller kin, it will attack a wounded creature to hasten its end. Giant vultures have been known to haunt a thirsty, starving creature for days to enjoy its suffering.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "neutral-evil",
      "beast",
      "animal"
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
      "swim": 50
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
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d6+2",
          "average": 6
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive flying insect with deadly stinger and aggressive nature. Giant wasps are territorial creatures that attack anything that threatens their nests.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
      "walk": 40
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
      "passivePerception": 13,
      "darkvision": 60
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
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d4+3",
          "average": 6
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large, agile predator with sharp teeth and hunting instincts. Giant weasels are excellent trackers and can squeeze through small openings.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "2d8+2",
    "speed": {
      "walk": 40,
      "climb": 40
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
      "passivePerception": 13,
      "darkvision": 60,
      "blindsight": 10
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
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 4 (1d6 + 1) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 7 (2d6) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way.",
        "attackBonus": 3,
        "damage": {
          "type": "Piercing",
          "roll": "1d6+1",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive arachnid that hunts actively rather than spinning webs. Giant wolf spiders are fast and aggressive hunters.",
    "background": "Smaller than a giant spider, a giant wolf spider hunts prey across open ground or hides in a burrow or crevice, or in a hidden cavity beneath debris.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
      "walk": 40
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
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) bludgeoning damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d4+1",
          "average": 4
        }
      }
    ],
    "legendaryActions": [],
    "description": "A sure-footed mountain dweller with curved horns and stubborn nature. Goats can climb steep cliffs and are often kept as livestock in hilly regions.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "1d4+-1",
    "speed": {
      "walk": 10,
      "fly": 60
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
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 slashing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Slashing",
          "roll": "1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "A swift bird of prey with keen eyesight and sharp talons. Hawks are excellent hunters that can spot prey from great distances.",
    "imagePrompt": "A tiny beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "6d10+12",
    "speed": {
      "swim": 40
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
      "darkvision": 30
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
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+4",
          "average": 13
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large ocean predator that actively hunts for prey. Hunter sharks are aggressive and will attack anything that looks like food.",
    "background": "Smaller than a giant shark but larger and fiercer than a reef shark, a hunter shark haunts deep waters. It usually hunts alone, but multiple hunter sharks might feed in the same area. A fully grown hunter shark is 15 to 20 feet long.",
    "imagePrompt": "A large predatory shark with sleek body, sharp teeth, powerful jaws, swimming in deep ocean waters",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "1d8+1",
    "speed": {
      "walk": 50
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
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) piercing damage.",
        "attackBonus": 2,
        "damage": {
          "type": "Piercing",
          "roll": "1d6",
          "average": 4
        }
      }
    ],
    "legendaryActions": [],
    "description": "A scavenging predator with powerful jaws and pack mentality. Hyenas are often found near battlefields and dungeons, feeding on the dead.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
      "walk": 40
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
        "description": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 1 (1d4 - 1) piercing damage.",
        "attackBonus": 1,
        "damage": {
          "type": "Piercing",
          "roll": "1d4-1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, opportunistic predator with keen senses. Jackals are often found in deserts and wastelands, scavenging for food.",
    "imagePrompt": "A small beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "small",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "12d12+12",
    "speed": {
      "swim": 60
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
      "passivePerception": 13,
      "blindsight": 120
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
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (5d6 + 4) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "5d6+4",
          "average": 22
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive ocean predator with intelligence and pack hunting tactics. Killer whales are apex predators that hunt in coordinated groups.",
    "background": "This killer whale is a powerful marine predator found in ocean waters.",
    "imagePrompt": "A huge killer whale with black and white coloring, powerful body, swimming in deep ocean waters",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "4d10+4",
    "speed": {
      "walk": 50
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
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d8+3",
          "average": 8
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Slashing",
          "roll": "1d6+3",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "A majestic big cat with powerful build and hunting prowess. Lions are social predators that hunt in prides and are symbols of strength.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
      "climb": 20
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 9,
      "darkvision": 30
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 piercing damage.",
        "damage": {
          "type": "Piercing",
          "roll": "1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small reptile with scaly skin and quick movements. Lizards are common in warm climates and can be found basking in the sun.",
    "imagePrompt": "A tiny beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "11d12+55",
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
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 25 (4d8 + 7) piercing damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Piercing",
          "roll": "4d8+7",
          "average": 25
        }
      },
      {
        "name": "Stomp",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one prone creature. Hit: 29 (4d10 + 7) bludgeoning damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Bludgeoning",
          "roll": "4d10+7",
          "average": 29
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive prehistoric elephant with long tusks and shaggy fur. Mammoths are powerful creatures adapted to cold climates.",
    "background": "A mammoth is an elephantine creature with thick fur and long tusks. Stockier and fiercer than normal elephants, mammoths inhabit a wide range of climes, from subarctic to subtropical.",
    "imagePrompt": "A huge hairy elephant with thick fur, long curved tusks, four legs, trunk, mammoth anatomy, prehistoric elephant",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "1d8+1",
    "speed": {
      "walk": 40
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
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone.",
        "attackBonus": 3,
        "damage": {
          "type": "Piercing",
          "roll": "1d6+1",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large, loyal dog bred for guarding and protection. Mastiffs are fearless defenders that will protect their masters to the death.",
    "background": "Mastiffs are impressive hounds prized by humanoids for their loyalty and keen senses. Mastiffs can be trained as guard dogs, hunting dogs, and war dogs. Halflings and other Small humanoids ride them as mounts.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "2d8+2",
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
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) bludgeoning damage.",
        "attackBonus": 2,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d4+2",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "A hardy hybrid of horse and donkey with great endurance. Mules are excellent pack animals that can carry heavy loads through rough terrain.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
      "swim": 30
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
      "passivePerception": 12,
      "darkvision": 30
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
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 1 bludgeoning damage, and the target is grappled (escape DC 10). Until this grapple ends, the octopus can't use its tentacles on another target.",
        "attackBonus": 4,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1",
          "average": 0
        }
      },
      {
        "name": "Ink Cloud",
        "description": "A 5-foot-radius cloud of ink extends all around the octopus if it is underwater. The area is heavily obscured for 1 minute, although a significant current can disperse the ink. After releasing the ink, the octopus can use the Dash action as a bonus action."
      }
    ],
    "legendaryActions": [],
    "description": "A highly intelligent cephalopod with eight tentacles and camouflage abilities. Octopuses are excellent escape artists and can squeeze through tiny openings.",
    "background": "Octopuses inhabit coastal waters and coral reefs, where they hunt for crabs, fish, and other small marine creatures. They are highly intelligent for invertebrates and have been known to solve complex puzzles and use tools. When threatened, they release a cloud of dark ink to confuse predators and escape.",
    "imagePrompt": "A small beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "small",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "1d4+-1",
    "speed": {
      "walk": 5,
      "fly": 60
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
      "passivePerception": 13,
      "darkvision": 120
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
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 1 slashing damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Slashing",
          "roll": "1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "A nocturnal bird of prey with silent flight and keen hearing. Owls are excellent hunters that can see in near darkness.",
    "imagePrompt": "A tiny beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
      "climb": 40
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
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d6+2",
          "average": 6
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Slashing",
          "roll": "1d4+2",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "A sleek black big cat with stealth and hunting abilities. Panthers are solitary hunters that prefer to stalk their prey from the shadows.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "8d10+24",
    "speed": {
      "walk": 20,
      "swim": 40
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
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 14 (3d6 + 4) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d6+4",
          "average": 15
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive prehistoric marine reptile with a long neck and powerful flippers. Plesiosaurus are excellent swimmers that hunt fish and other sea creatures in ancient oceans. They can hold their breath for extended periods while stalking prey underwater.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
      "swim": 30
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10,
      "blindsight": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 piercing damage, and the target must make a DC 10 Constitution saving throw, taking 5 (2d4) poison damage on a failed save, or half as much damage on a successful one.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "A venomous serpent that can deliver lethal bites. Poisonous snakes are feared for their deadly venom and are often found in warm climates.",
    "imagePrompt": "A tiny beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "5d10+15",
    "speed": {
      "walk": 40,
      "swim": 30
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
        "description": "The bear makes two attacks: one with its bite and one with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (1d8 + 5) piercing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "1d8+5",
          "average": 10
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+5",
          "average": 12
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive white bear adapted to arctic conditions. Polar bears are powerful predators that hunt seals and other arctic animals.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "2d8+2",
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
      "passivePerception": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) bludgeoning damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d4+2",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, hardy horse suitable for children and small riders. Ponies are often used as mounts for halflings and gnomes.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "1d4+-1",
    "speed": {
      "swim": 40
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
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, aggressive fish with razor-sharp teeth. Quippers are dangerous in groups and are often found in dark waters.",
    "background": "A quipper is a carnivorous fish with sharp teeth. Quippers can adapt to any aquatic environment, including cold subterranean lakes. They frequently gather in swarms; the statistics for a swarm of quippers appear later in this appendix.",
    "imagePrompt": "A tiny beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "1d4+-1",
    "speed": {
      "walk": 20
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10,
      "darkvision": 30
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
        "description": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 piercing damage.",
        "damage": {
          "type": "Piercing",
          "roll": "1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small rodent that spreads disease and filth. Rats are common in cities and dungeons, often serving as familiars to evil spellcasters.",
    "imagePrompt": "A tiny beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "1d4+-1",
    "speed": {
      "walk": 10,
      "fly": 50
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
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 1 piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "An intelligent black bird with mimicry abilities. Ravens are often associated with omens and can be found serving dark masters.",
    "imagePrompt": "A tiny beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "4d8+4",
    "speed": {
      "swim": 40
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
      "blindsight": 30
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
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d8+2",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "A medium-sized shark that hunts in coral reefs. Reef sharks are territorial and will attack anything that enters their domain.",
    "background": "Smaller than giant sharks and hunter sharks, reef sharks inhabit shallow waters and coral reefs, gathering in small packs to hunt. A full-grown specimen measures 6 to 10 feet long.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "6d10+12",
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
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8+5",
          "average": 14
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive herbivore with thick gray skin and a deadly horn on its snout. Rhinoceroses are incredibly strong and can charge with devastating force, using their horn to gore enemies and knock them prone. They are territorial creatures that will attack anything that threatens them.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "2d10+2",
    "speed": {
      "walk": 60
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
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) bludgeoning damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d4+3",
          "average": 8
        }
      }
    ],
    "legendaryActions": [],
    "description": "A well-trained horse bred for speed and endurance. Riding horses are the preferred mounts for travelers and adventurers.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "7d10+14",
    "speed": {
      "walk": 40
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
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (1d10 + 5) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+5",
          "average": 11
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+5",
          "average": 12
        }
      }
    ],
    "legendaryActions": [],
    "description": "A prehistoric big cat with massive fangs and hunting prowess. Saber-toothed tigers are extinct in most worlds but can be found in ancient ruins.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "1d4+-1",
    "speed": {
      "walk": 10
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 9,
      "blindsight": 10
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Sting",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one creature. Hit: 1 piercing damage, and the target must make a DC 9 Constitution saving throw, taking 4 (1d8) poison damage on a failed save, or half as much damage on a successful one.",
        "attackBonus": 2,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small arachnid with deadly stinger and armored body. Scorpions are dangerous desert creatures that inject lethal poison.",
    "background": "This tiny scorpion is a venomous desert creature with deadly stinger.",
    "imagePrompt": "A tiny scorpion with curved tail and stinger in desert environment",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "1d4+-1",
    "speed": {
      "swim": 20
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
    "description": "A small aquatic creature with horse-like head and prehensile tail. Sea horses are often kept as pets by aquatic races.",
    "background": "This tiny seahorse is a shy, colorful fish found in ocean waters.",
    "imagePrompt": "A tiny seahorse fish with elongated body, curled tail, colorful scales, seahorse head with tubular snout, underwater in ocean depths",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "1d4+-1",
    "speed": {
      "walk": 20,
      "climb": 20
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
      "passivePerception": 12,
      "darkvision": 30
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
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 1 piercing damage, and the target must succeed on a DC 9 Constitution saving throw or take 2 (1d4) poison damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small arachnid that spins webs and injects poison. Spiders are common in dark places and are often used as familiars.",
    "imagePrompt": "A tiny beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
      "fly": 40
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 9,
      "darkvision": 60
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [],
    "actions": [
      {
        "name": "Blood Drain",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 5 (1d4 + 3) piercing damage, and the stirge attaches to the target. While attached, the stirge doesn't attack. Instead, at the start of each of the stirge's turns, the target loses 5 (1d4 + 3) hit points due to blood loss.\nThe stirge can detach itself by spending 5 feet of its movement. It does so after it drains 10 hit points of blood from the target or the target dies. A creature, including the target, can use its action to detach the stirge.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d4+3",
          "average": 6
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small flying creature with bat-like wings and a long proboscis. Stirges are blood-sucking parasites that attach to their prey and drain their life force. They are often found in swamps and dungeons, hunting in groups to overwhelm larger creatures.",
    "imagePrompt": "A tiny beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "5d10+10",
    "speed": {
      "walk": 40
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
      "passivePerception": 13,
      "darkvision": 60
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
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+3",
          "average": 9
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Slashing",
          "roll": "1d8+3",
          "average": 8
        }
      }
    ],
    "legendaryActions": [],
    "description": "A powerful big cat with striped fur and hunting prowess. Tigers are solitary hunters that prefer to stalk their prey from the shadows.",
    "imagePrompt": "A large beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "10d12+30",
    "speed": {
      "walk": 50
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
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 24 (4d8 + 6) piercing damage.",
        "attackBonus": 9,
        "damage": {
          "type": "Piercing",
          "roll": "4d8+6",
          "average": 24
        }
      },
      {
        "name": "Stomp",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one prone creature. Hit: 22 (3d10 + 6) bludgeoning damage",
        "attackBonus": 9,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d10+6",
          "average": 23
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive prehistoric dinosaur with three horns and armored frill. Triceratops are powerful herbivores that can defend themselves against predators.",
    "imagePrompt": "A huge beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "13d12+52",
    "speed": {
      "walk": 50
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
        "description": "The tyrannosaurus makes two attacks: one with its bite and one with its tail. It can't make both attacks against the same target."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 33 (4d12 + 7) piercing damage. If the target is a Medium or smaller creature, it is grappled (escape DC 17). Until this grapple ends, the target is restrained, and the tyrannosaurus can't bite another target.",
        "attackBonus": 10,
        "damage": {
          "type": "Piercing",
          "roll": "4d12+7",
          "average": 33
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 20 (3d8 + 7) bludgeoning damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d8+7",
          "average": 21
        }
      }
    ],
    "legendaryActions": [],
    "description": "A massive prehistoric predator with powerful jaws and tiny arms. T-Rex is the apex predator of prehistoric times.",
    "imagePrompt": "A huge beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "huge",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "1d8+1",
    "speed": {
      "walk": 10,
      "fly": 50
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
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage.",
        "attackBonus": 2,
        "damage": {
          "type": "Piercing",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A carrion bird that feeds on the dead. Vultures are often found near battlefields and dungeons, waiting for the dead.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "3d10+3",
    "speed": {
      "walk": 60
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
    "description": "A large, trained horse bred for combat. Warhorses are fearless in battle and can carry armored riders into combat.",
    "background": "Warhorses are specially bred and trained horses designed for combat. They are larger and stronger than regular horses, with the stamina and courage needed for battle. They are equipped with war bridles and saddles that allow riders to fight effectively while mounted.",
    "imagePrompt": "A great big horse bred for war, muscular build and powerful legs, war bridle and saddle designed for combat, sturdy leather straps and metal fittings, dark well-groomed coat, strong confident bearing for carrying armored riders into battle.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "large",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "1d4+-1",
    "speed": {
      "walk": 30
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
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 1 piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1",
          "average": 0
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small, agile predator with sharp teeth and hunting instincts. Weasels are excellent trackers and can squeeze through small openings.",
    "imagePrompt": "A tiny beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "tiny",
      "unaligned",
      "beast",
      "animal"
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
    "hitDice": "2d8+2",
    "speed": {
      "walk": 40
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
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "2d4+2",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "A pack-hunting canine with keen senses and coordination. Wolves are social predators that hunt in coordinated groups.",
    "imagePrompt": "A medium beast creature with animal-like features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "beast",
      "medium",
      "unaligned",
      "beast",
      "animal"
    ]
  }
];
