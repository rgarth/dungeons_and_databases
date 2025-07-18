import { Monster } from '@/types/monster';

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
    "hitDice": "19d10+95",
    "speed": {
      "walk": 40,
      "fly": 60
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
      "Charmed",
      "Frightened"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 20,
      "truesight": 120
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
        "description": "The sphinx makes two claw attacks.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 17 (2d10 + 6) slashing damage.",
        "attackBonus": 12,
        "damage": {
          "type": "Slashing",
          "roll": "2d10+6",
          "average": 17
        }
      },
      {
        "name": "Roar",
        "description": "The sphinx emits a magical roar. Each time it roars before finishing a long rest, the roar is louder and the effect is different, as detailed below. Each creature within 500 feet of the sphinx and able to hear the roar must make a saving throw.\n\nFirst Roar. Each creature that fails a DC 18 Wisdom saving throw is frightened for 1 minute. A frightened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.\n\nSecond Roar. Each creature that fails a DC 18 Wisdom saving throw is deafened and frightened for 1 minute. A frightened creature is paralyzed and can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.\n\nThird Roar. Each creature makes a DC 18 Constitution saving throw. On a failed save, a creature takes 44 (8d10) thunder damage and is knocked prone. On a successful save, the creature takes half as much damage and isn't knocked prone.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
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
    "description": "A majestic androsphinx with the powerful body of a lion, magnificent falcon wings, and the noble head of a bearded human male. Its golden mane flows like a king's crown, and its eyes hold ancient wisdom. Human hands with opposable thumbs instead of lion paws allow it to manipulate objects and cast spells with precision.",
    "background": "Androsphinxes are the male counterparts to gynosphinxes, embodying strength, wisdom, and divine authority. They serve as guardians of ancient knowledge and sacred places, often testing those who seek their wisdom with riddles and quests. Their magical roars can instill fear, paralysis, or devastating thunder damage, and they possess powerful clerical magic.",
    "imagePrompt": "A majestic androsphinx with powerful lion body, magnificent falcon wings, noble bearded human male head, golden flowing mane like a crown, ancient wise eyes, human hands with opposable thumbs, regal Egyptian-inspired appearance, divine magical guardian. Noble and powerful sphinx guardian.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "lawful-neutral",
      "monstrosity"
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
    "hitDice": "6d10+6",
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
      "darkvision": 60,
      "tremorsense": 60
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
          "roll": "2d6+3",
          "average": 10
        }
      },
      {
        "name": "Acid Spray",
        "description": "The ankheg spits acid in a line that is 30 ft. long and 5 ft. wide, provided that it has no creature grappled. Each creature in that line must make a DC 13 Dexterity saving throw, taking 10 (3d6) acid damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Acid",
          "roll": "3d6",
          "average": 11
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large 10-foot long insectoid predator with segmented chitinous exoskeleton, six legs, powerful mandibles, black compound eyes, and long antennae. Brown or orange and dark yellow coloring.",
    "background": "Ankhegs are large insectoid predators known for their burrowing and ambush tactics. They are a menace to farmers due to their destructive burrowing and attacks on livestock.",
    "imagePrompt": "A large 10-foot long insectoid predator with segmented chitinous exoskeleton, six legs with front pair adapted for burrowing, powerful mandibles, black compound eyes, long antennae, brown or orange and dark yellow coloring. Burrowing ambush predator.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "unaligned",
      "monstrosity"
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
    "hitDice": "8d8+16",
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
      "passivePerception": 9,
      "darkvision": 60
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
          "roll": "2d6+3",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "A deadly basilisk with a reptilian body covered in dark scales and a crown-like crest on its head. Its eyes glow with malevolent power, capable of turning creatures to stone with a single glance. It has sharp fangs and a forked tongue.",
    "background": "Basilisks are deadly reptiles known for their petrifying gaze. They are found in dark places like caves and ruins, where they use their stone-turning eyes to hunt prey. Even their reflection can petrify them, making them vulnerable to mirrors and polished surfaces.",
    "imagePrompt": "A medium reptilian creature with dark scales, crown-like crest on head, glowing malevolent eyes, sharp fangs, forked tongue, petrifying gaze. Deadly stone-turning reptile with magical eyes.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "medium",
      "unaligned",
      "monstrosity"
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
    "hitDice": "16d12+64",
    "speed": {
      "walk": 50,
      "climb": 40
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
      "passivePerception": 16,
      "darkvision": 90
    },
    "languages": [
      "Draconic"
    ],
    "proficiencyBonus": 4,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The behir makes two attacks: one with its bite and one to constrict.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 22 (3d10 + 6) piercing damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Piercing",
          "roll": "3d10+6",
          "average": 23
        }
      },
      {
        "name": "Constrict",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one Large or smaller creature. Hit: 17 (2d10 + 6) bludgeoning damage plus 17 (2d10 + 6) slashing damage. The target is grappled (escape DC 16) if the behir isn't already constricting a creature, and the target is restrained until this grapple ends.",
        "attackBonus": 10,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d10+6",
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
    "description": "A huge serpentine monstrosity with a long blue-scaled body, twelve legs with three clawed toes each, crocodile-like head with curved black horns, and sharp multi-colored teeth. Centipede-dragon hybrid appearance.",
    "background": "Behirs are huge serpentine monstrosities known for their lightning breath and hatred for dragons. They can slither like snakes and use their twelve legs to climb with surprising speed.",
    "imagePrompt": "A huge serpentine monstrosity with long blue-scaled body, thick armored scales from deep blue to ultramarine, twelve legs with three clawed toes each, crocodile-like head with curved black horns, sharp multi-colored teeth, centipede-dragon hybrid. Lightning-breathing dragon hunter.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "huge",
      "neutral-evil",
      "monstrosity"
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
    "hitDice": "9d10+45",
    "speed": {
      "walk": 40,
      "burrow": 40
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
      "passivePerception": 16,
      "darkvision": 60,
      "tremorsense": 60
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
          "roll": "4d12+4",
          "average": 30
        }
      },
      {
        "name": "Deadly Leap",
        "description": "If the bulette jumps at least 15 ft. as part of its movement, it can then use this action to land on its feet in a space that contains one or more other creatures. Each of those creatures must succeed on a DC 16 Strength or Dexterity saving throw (target's choice) or be knocked prone and take 14 (3d6 + 4) bludgeoning damage plus 14 (3d6 + 4) slashing damage. On a successful save, the creature takes only half the damage, isn't knocked prone, and is pushed 5 ft. out of the bulette's space into an unoccupied space of the creature's choice. If no unoccupied space is within range, the creature instead falls prone in the bulette's space.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large heavily armored monstrosity with a pointed shark-like head, carapace that forms a fin-like crest, and powerful claws. Known as the 'landshark' for its burrowing and hunting tactics.",
    "background": "Bulettes are massive solitary burrowing predators feared for their ferocity and relentless hunting. They prefer certain types of humanoid flesh, particularly halflings, and use tremor sense to ambush prey from below.",
    "imagePrompt": "A large heavily armored monstrosity with pointed shark-like head, carapace forming fin-like crest, powerful claws, armored hide, burrowing predator appearance. Landshark that hunts from underground.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "unaligned",
      "monstrosity"
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
    "hitDice": "6d10+12",
    "speed": {
      "walk": 50
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
        "description": "The centaur makes two attacks: one with its pike and one with its hooves or two with its longbow.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Pike",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 9 (1d10 + 4) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+4",
          "average": 10
        }
      },
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d6+4",
          "average": 11
        }
      },
      {
        "name": "Longbow",
        "description": "Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d8+2",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large humanoid with the upper body of a human and the lower body of a horse. Noble and graceful in appearance.",
    "background": "Centaurs are noble creatures with the upper body of a human and the lower body of a horse. They are typically peaceful and live in harmony with nature.",
    "imagePrompt": "5e Fantasy Centaur",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "neutral-good",
      "monstrosity"
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
    "hitDice": "12d10+48",
    "speed": {
      "walk": 30,
      "fly": 60
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
      "passivePerception": 18,
      "darkvision": 60
    },
    "languages": [
      "understands Draconic but can't speak"
    ],
    "proficiencyBonus": 3,
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The chimera makes three attacks: one with its bite, one with its horns, and one with its claws. When its fire breath is available, it can use the breath in place of its bite or horns.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) piercing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "2d6+4",
          "average": 11
        }
      },
      {
        "name": "Horns",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 10 (1d12 + 4) bludgeoning damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d12+4",
          "average": 11
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+4",
          "average": 11
        }
      },
      {
        "name": "Fire Breath",
        "description": "The dragon head exhales fire in a 15-foot cone. Each creature in that area must make a DC 15 Dexterity saving throw, taking 31 (7d8) fire damage on a failed save, or half as much damage on a successful one.",
        "damage": {
          "type": "Fire",
          "roll": "7d8",
          "average": 32
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large creature with a lion's head and body, a goat's head emerging from its back, and a dragon's head at the end of its tail. Wings and fire breath from the dragon head.",
    "background": "Chimeras are fearsome creatures with three heads: a lion's head, a goat's head on their back, and a dragon's head on their tail. They can breathe fire and are known for their ferocity.",
    "imagePrompt": "A large creature with lion head and body, goat head emerging from back, dragon head on tail, wings, fire breath capability. Classic chimera with three distinct heads.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "chaotic-evil",
      "monstrosity"
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
    "hitDice": "6d6+6",
    "speed": {
      "walk": 20,
      "fly": 40
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 11,
      "darkvision": 60
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
          "roll": "1d4+1",
          "average": 4
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small cockatrice with the body of a rooster and the tail of a lizard. Its feathers are colorful but its eyes hold deadly power, and its beak and claws can turn creatures to stone with their touch.",
    "background": "Cockatrices are small but deadly creatures that combine the features of a rooster and a lizard. They are known for their ability to turn creatures to stone with their touch, making them dangerous despite their small size. They are often found in rural areas and can be aggressive when threatened.",
    "imagePrompt": "A small creature with rooster body and lizard tail, colorful feathers, deadly eyes, sharp beak and claws, petrifying touch. Small but deadly stone-turning hybrid creature.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "small",
      "unaligned",
      "monstrosity"
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
    "hitDice": "5d6+5",
    "speed": {
      "walk": 10,
      "fly": 30
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
      "passivePerception": 10,
      "blindsight": 60
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
          "roll": "1d6+3",
          "average": 7
        }
      },
      {
        "name": "Darkness Aura",
        "description": "A 15-foot radius of magical darkness extends out from the darkmantle, moves with it, and spreads around corners. The darkness lasts as long as the darkmantle maintains concentration, up to 10 minutes (as if concentrating on a spell). Darkvision can't penetrate this darkness, and no natural light can illuminate it. If any of the darkness overlaps with an area of light created by a spell of 2nd level or lower, the spell creating the light is dispelled.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A small 4-foot long squid-like monstrosity with a soft, rubbery body and multiple tentacles. It can camouflage itself to appear as stalactites or cave formations. Creates magical darkness and uses echolocation to hunt.",
    "background": "Darkmantles are small squid-like monstrosities found in caves and the Underdark. They use camouflage to appear as stalactites and create magical darkness to ambush prey. They are more like flying squids than bats.",
    "imagePrompt": "A small 4-foot long squid-like monstrosity with soft rubbery body, multiple tentacles, hovering in air like a squid in water, camouflage ability to mimic stalactites or cave formations, magical darkness aura, echolocation, crushing attack style. Cave-dwelling hovering squid ambush predator, no wings.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "small",
      "unaligned",
      "monstrosity"
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
    "hitDice": "6d8+12",
    "speed": {
      "walk": 40
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
        "description": "The dog makes two bite attacks.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage. If the target is a creature, it must succeed on a DC 12 Constitution saving throw against disease or become poisoned until the disease is cured. Every 24 hours that elapse, the creature must repeat the saving throw, reducing its hit point maximum by 5 (1d10) on a failure. This reduction lasts until the disease is cured. The creature dies if the disease reduces its hit point maximum to 0.",
        "attackBonus": 4,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d6+2",
          "average": 6
        }
      }
    ],
    "legendaryActions": [],
    "description": "A death dog is an ugly two-headed hound that roams plains, and deserts. Hate burns in a death dog’s heart, and a taste for humanoid flesh drives it to attack travelers and explorers. Death dog saliva carries a foul disease that causes a victim’s flesh to slowly rot off the bone.",
    "background": "A death dog is an ugly two-headed hound that roams plains, and deserts. Hate burns in a death dog’s heart, and a taste for humanoid flesh drives it to attack travelers and explorers. Death dog saliva carries a foul disease that causes a victim’s flesh to slowly rot off the bone.",
    "imagePrompt": "A medium monstrosity creature with monstrous and terrifying features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "medium",
      "neutral-evil",
      "monstrosity"
    ]
  },
  {
    "name": "Doppelganger",
    "size": "Medium",
    "type": "monstrosity",
    "subtype": "shapechanger",
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
    "hitDice": "8d8+16",
    "speed": {
      "walk": 30
    },
    "savingThrows": {},
    "skills": {
      "Deception": 6,
      "Insight": 3
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [
      "Charmed"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 11,
      "darkvision": 60
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
        "description": "The doppelganger makes two melee attacks.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) bludgeoning damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d6+4",
          "average": 8
        }
      },
      {
        "name": "Read Thoughts",
        "description": "The doppelganger magically reads the surface thoughts of one creature within 60 ft. of it. The effect can penetrate barriers, but 3 ft. of wood or dirt, 2 ft. of stone, 2 inches of metal, or a thin sheet of lead blocks it. While the target is in range, the doppelganger can continue reading its thoughts, as long as the doppelganger's concentration isn't broken (as if concentrating on a spell). While reading the target's mind, the doppelganger has advantage on Wisdom (Insight) and Charisma (Deception, Intimidation, and Persuasion) checks against the target.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A medium humanoid with pale, featureless skin and large, colorless eyes. In its true form, it appears as a blank slate, but it can shapeshift to perfectly mimic any humanoid it has seen, with its form blurring and morphing between shapes.",
    "background": "Doppelgangers are shapechanging creatures that can perfectly mimic any humanoid they have observed. They use their ability to read thoughts and shapeshift to infiltrate and deceive. Their true form is featureless, but they can take on any humanoid appearance.",
    "imagePrompt": "A normal-looking human with opaque black eyes, form blurring and shifting like it's in mid-transformation, shapeshifting infiltrator and deceiver with morphing abilities. Human appearance but with shifting blurry form and opaque black eyes.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "medium",
      "unaligned",
      "monstrosity"
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
    "hitDice": "13d10+52",
    "speed": {
      "walk": 30,
      "climb": 30
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
      "passivePerception": 15,
      "darkvision": 120
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
        "description": "The drider makes three attacks, either with its longsword or its longbow. It can replace one of those attacks with a bite attack.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 2 (1d4) piercing damage plus 9 (2d8) poison damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands.",
        "attackBonus": 6,
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Longbow",
        "description": "Ranged Weapon Attack: +6 to hit, range 150/600 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 4 (1d8) poison damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d8+3",
          "average": 8
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large creature with the upper body of a drow elf and the lower body of a giant spider. Eight spider legs, dark skin, and white hair typical of drow.",
    "background": "Driders are drow elves who have been transformed into spider-like creatures as punishment. They have the upper body of a drow and the lower body of a giant spider.",
    "imagePrompt": "A large creature with upper body of drow elf (dark skin, white hair) and lower body of giant spider with eight legs, spider-like abdomen, drow features. Transformed drow spider hybrid.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "chaotic-evil",
      "monstrosity"
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
    "hitDice": "8d8+8",
    "speed": {
      "walk": 30,
      "climb": 30
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
      "passivePerception": 13,
      "darkvision": 60
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
        "description": "The ettercap makes two attacks: one with its bite and one with its claws.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) piercing damage plus 4 (1d8) poison damage. The target must succeed on a DC 11 Constitution saving throw or be poisoned for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "2d6+2",
          "average": 9
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d4+2",
          "average": 7
        }
      },
      {
        "name": "Web",
        "description": "Ranged Weapon Attack: +4 to hit, range 30/60 ft., one Large or smaller creature. Hit: The creature is restrained by webbing. As an action, the restrained creature can make a DC 11 Strength check, escaping from the webbing on a success. The effect ends if the webbing is destroyed. The webbing has AC 10, 5 hit points, is vulnerable to fire damage and immune to bludgeoning damage.",
        "attackBonus": 4,
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A hunched, grey-purplish humanoid with a spider-like face featuring fangs and multiple eyes. Sharp black chitinous claws instead of hands and feet, distended white belly, covered in coarse black hair.",
    "background": "Ettercaps are monstrous spider-like humanoids known for their cruelty and affinity for spiders. They create webs to trap prey and are cowardly but cruel, preferring ambush tactics.",
    "imagePrompt": "A hunched grey-purplish humanoid with spider-like face, fangs, multiple eyes, sharp black chitinous claws instead of hands and feet, distended white belly, coarse black hair covering body. Spider-affinity creature.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "medium",
      "neutral-evil",
      "monstrosity"
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
    "hitDice": "12d10+48",
    "speed": {
      "walk": 40
    },
    "savingThrows": {},
    "skills": {
      "Perception": 4
    },
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [
      "Petrified"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14,
      "darkvision": 60
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
          "roll": "2d12+5",
          "average": 18
        }
      },
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 16 (2d10 + 5) bludgeoning damage.",
        "attackBonus": 8,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d10+5",
          "average": 16
        }
      },
      {
        "name": "Petrifying Breath",
        "description": "The gorgon exhales petrifying gas in a 30-foot cone. Each creature in that area must succeed on a DC 13 Constitution saving throw. On a failed save, a target begins to turn to stone and is restrained. The restrained target must repeat the saving throw at the end of its next turn. On a success, the effect ends on the target. On a failure, the target is petrified until freed by the greater restoration spell or other magic.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large bull-like creature with metallic scales covering its body. Horns, hooves, and the ability to exhale petrifying gas that turns creatures to stone.",
    "background": "Gorgons are large bull-like monstrosities covered in metallic scales. They can exhale petrifying gas that turns creatures to stone and are known for their trampling charge attacks.",
    "imagePrompt": "A large bull-like creature with metallic scales covering its body, horns, hooves, petrifying gas breath, armored appearance. Metallic-scaled bull with stone-turning breath.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "unaligned",
      "monstrosity"
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
      "climb": 30
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
      "passivePerception": 12,
      "darkvision": 60
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
        "description": "The grick makes one attack with its tentacles. If that attack hits, the grick can make one beak attack against the same target.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Tentacles",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) slashing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+2",
          "average": 9
        }
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Piercing",
          "roll": "1d6+2",
          "average": 6
        }
      }
    ],
    "legendaryActions": [],
    "description": "A medium worm-like creature with a beak and tentacles. Covered in stone-like skin that allows it to camouflage in rocky terrain.",
    "background": "Gricks are worm-like monstrosities that dwell in caves and underground areas. They use their stone camouflage to ambush prey and have tentacles and a beak for attacking.",
    "imagePrompt": "A medium worm-like creature with beak, tentacles, stone-like skin for camouflage, cave-dwelling appearance. Worm-like monstrosity with stone camouflage ability.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "medium",
      "neutral",
      "monstrosity"
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
    "hitDice": "7d10+21",
    "speed": {
      "walk": 30,
      "fly": 80
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
      "passivePerception": 15,
      "darkvision": 60
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
        "description": "The griffon makes two attacks: one with its beak and one with its claws.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d8+4",
          "average": 9
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Slashing",
          "roll": "2d6+4",
          "average": 11
        }
      }
    ],
    "legendaryActions": [],
    "description": "A majestic griffon with the body of a powerful lion and the head, wings, and talons of a giant eagle. Its golden-brown fur and white feathers create a striking appearance, and its keen eyes can spot prey from great distances.",
    "background": "Griffons are noble creatures that combine the strength of lions with the aerial prowess of eagles. They are known for their loyalty and are often used as mounts by knights and other warriors. They build their nests in high places and are fiercely protective of their territory.",
    "imagePrompt": "A large majestic creature with lion body and eagle head, golden-brown fur, white feathers, powerful wings, sharp talons, keen eyes. Noble lion-eagle hybrid with aerial hunting abilities.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "unaligned",
      "monstrosity"
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
    "hitDice": "15d10+45",
    "speed": {
      "walk": 40
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Poisoned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14,
      "darkvision": 60
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
          "roll": "1d8+4",
          "average": 9
        }
      },
      {
        "name": "Spit Poison",
        "description": "Ranged Weapon Attack: +8 to hit, range 15/30 ft., one creature. Hit: The target must make a DC 15 Constitution saving throw, taking 45 (10d8) poison damage on a failed save, or half as much damage on a successful one.",
        "attackBonus": 8,
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large serpentine creature with a humanoid head, covered in golden scales that shimmer with divine light. Its eyes glow with ancient wisdom and benevolent power, and it moves with graceful, sinuous movements.",
    "background": "Guardian nagas are benevolent serpentine creatures dedicated to protecting sacred places and ancient knowledge. They are lawful good by nature and serve as divine guardians, often found in temples, libraries, or other places of great importance. They possess powerful clerical magic and can rejuvenate themselves if slain, making them nearly immortal protectors.",
    "imagePrompt": "A large serpentine creature with humanoid head, golden shimmering scales, divine light aura, ancient wise eyes, benevolent expression, graceful sinuous movements. Divine guardian serpent with holy presence.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "lawful-good",
      "monstrosity"
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
    "hitDice": "16d10+48",
    "speed": {
      "walk": 40,
      "fly": 60
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
      "Charmed",
      "Frightened"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 18,
      "truesight": 120
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
        "description": "The sphinx makes two claw attacks.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.",
        "attackBonus": 9,
        "damage": {
          "type": "Slashing",
          "roll": "2d8+4",
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
    "description": "A graceful gynosphinx with the elegant body of a lioness, beautiful falcon wings, and the refined head of a human woman. Her features are regal and wise, with flowing hair that cascades like a queen's mantle. Human hands with opposable thumbs instead of lion paws enable her to cast arcane magic and manipulate objects with precision.",
    "background": "Gynosphinxes are the female counterparts to androsphinxes, embodying wisdom, knowledge, and arcane power. They are guardians of ancient libraries, magical sites, and places of learning. Unlike androsphinxes, they focus on arcane magic rather than divine spells, and they are known for their vast knowledge of history, magic, and ancient lore. They test seekers with riddles and puzzles rather than physical challenges.",
    "imagePrompt": "A graceful gynosphinx with elegant lioness body, beautiful falcon wings, refined human female head, regal wise features, flowing hair like queen's mantle, human hands with opposable thumbs, arcane magical guardian, ancient knowledge keeper. Wise and elegant sphinx scholar.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "lawful-neutral",
      "monstrosity"
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
    "hitDice": "7d8+7",
    "speed": {
      "walk": 20,
      "fly": 40
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
        "description": "The harpy makes two attacks: one with its claws and one with its club.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
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
      },
      {
        "name": "Club",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) bludgeoning damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d4+1",
          "average": 4
        }
      },
      {
        "name": "Luring Song",
        "description": "The harpy sings a magical melody. Every humanoid and giant within 300 ft. of the harpy that can hear the song must succeed on a DC 11 Wisdom saving throw or be charmed until the song ends. The harpy must take a bonus action on its subsequent turns to continue singing. It can stop singing at any time. The song ends if the harpy is incapacitated.\nWhile charmed by the harpy, a target is incapacitated and ignores the songs of other harpies. If the charmed target is more than 5 ft. away from the harpy, the must move on its turn toward the harpy by the most direct route. It doesn't avoid opportunity attacks, but before moving into damaging terrain, such as lava or a pit, and whenever it takes damage from a source other than the harpy, a target can repeat the saving throw. A creature can also repeat the saving throw at the end of each of its turns. If a creature's saving throw is successful, the effect ends on it.\nA target that successfully saves is immune to this harpy's song for the next 24 hours.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A beautiful but dangerous harpy with the upper body of a stunning human woman and the lower body, wings, and talons of a vulture. Her face is alluring but her eyes hold malice, and her voice carries an enchanting but deadly song that can lure victims to their doom.",
    "background": "Harpies are beautiful but malevolent creatures that combine the allure of human women with the predatory nature of birds of prey. They use their enchanting songs to lure travelers and sailors to their deaths, then feast on their remains. They are known for their cruelty and their ability to charm victims with their magical luring song before attacking with their sharp talons.",
    "imagePrompt": "A beautiful dangerous harpy with upper body of stunning human woman, lower body wings and talons of vulture, alluring face with malicious eyes, enchanting deadly song, predatory bird-woman hybrid. Seductive but deadly siren creature.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "medium",
      "chaotic-evil",
      "monstrosity"
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
    "hitDice": "3d10+3",
    "speed": {
      "walk": 40,
      "fly": 60
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
        "description": "The hippogriff makes two attacks: one with its beak and one with its claws.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+3",
          "average": 9
        }
      },
      {
        "name": "Claws",
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
    "description": "A majestic hippogriff with the front half of an eagle (head, wings, front legs with talons) and the back half of a horse (hindquarters, tail, back legs with hooves). It has a powerful eagle's beak and sharp talons on its front legs, while its rear legs end in horse hooves.",
    "background": "Hippogriffs are noble flying creatures that combine the best features of eagles and horses. They have the head, wings, and front legs of an eagle with the body and hind legs of a horse. They are often used as mounts by knights and are known for their loyalty and courage.",
    "imagePrompt": "A hippogriff with EAGLE HEAD and EAGLE WINGS, EAGLE FRONT LEGS with TALONS, HORSE BACK HALF with HORSE HIND LEGS and HORSE HOOVES, HORSE TAIL, eagle beak, sharp talons on front legs, horse body and hindquarters, flying eagle-horse hybrid, NOT a griffon, clearly eagle front and horse back",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "unaligned",
      "monstrosity"
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
    "hitDice": "15d12+75",
    "speed": {
      "walk": 30,
      "swim": 30
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
      "passivePerception": 16,
      "darkvision": 60
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
        "description": "The hydra makes as many bite attacks as it has heads.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.",
        "attackBonus": 8,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+5",
          "average": 11
        }
      }
    ],
    "legendaryActions": [],
    "description": "A huge hydra with a massive reptilian body and five writhing serpentine heads, each with sharp fangs and malevolent eyes. Its scales are dark and tough, and when one head is severed, two more grow in its place unless the wound is cauterized with fire.",
    "background": "Hydras are fearsome multi-headed reptiles known for their regenerative abilities. Each head can attack independently, and when a head is severed, two new heads grow in its place unless the wound is sealed with fire. They are found in swamps and marshes, where they are apex predators.",
    "imagePrompt": "A huge hydra with massive reptilian body, five writhing serpentine heads with sharp fangs and malevolent eyes, dark tough scales, regenerative heads that grow back when severed, swamp-dwelling apex predator. Multi-headed dragon-like monster.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "huge",
      "unaligned",
      "monstrosity"
    ]
  },
  {
    "name": "Kraken",
    "size": "Gargantuan",
    "type": "monstrosity",
    "subtype": "titan",
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
    "hitDice": "27d20+189",
    "speed": {
      "walk": 20,
      "swim": 60
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "lightning",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "conditionImmunities": [
      "Frightened",
      "Paralyzed"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14,
      "truesight": 120
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
        "description": "The kraken makes three tentacle attacks, each of which it can replace with one use of Fling.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 23 (3d8 + 10) piercing damage. If the target is a Large or smaller creature grappled by the kraken, that creature is swallowed, and the grapple ends. While swallowed, the creature is blinded and restrained, it has total cover against attacks and other effects outside the kraken, and it takes 42 (12d6) acid damage at the start of each of the kraken's turns. If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, which fall prone in a space within 10 feet of the kraken. If the kraken dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 15 feet of movement, exiting prone.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "3d8+10",
          "average": 24
        }
      },
      {
        "name": "Tentacle",
        "description": "Melee Weapon Attack: +7 to hit, reach 30 ft., one target. Hit: 20 (3d6 + 10) bludgeoning damage, and the target is grappled (escape DC 18). Until this grapple ends, the target is restrained. The kraken has ten tentacles, each of which can grapple one target.",
        "attackBonus": 7,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d6+10",
          "average": 21
        }
      },
      {
        "name": "Fling",
        "description": "One Large or smaller object held or creature grappled by the kraken is thrown up to 60 feet in a random direction and knocked prone. If a thrown target strikes a solid surface, the target takes 3 (1d6) bludgeoning damage for every 10 feet it was thrown. If the target is thrown at another creature, that creature must succeed on a DC 18 Dexterity saving throw or take the same damage and be knocked prone.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
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
    "description": "A gargantuan kraken with a massive squid-like body covered in dark, leathery skin. Its enormous head features a massive beak and intelligent eyes, while ten massive tentacles extend from its body, each capable of crushing ships and dragging them beneath the waves. It dwells in the deepest ocean depths.",
    "background": "Krakens are the most feared creatures of the deep ocean, massive cephalopods of incredible intelligence and power. They dwell in the deepest trenches and can control storms and lightning. They are known for dragging entire ships beneath the waves and are considered among the most dangerous creatures in the world.",
    "imagePrompt": "A gargantuan kraken with massive squid-like body, dark leathery skin, enormous head with massive beak and intelligent eyes, ten massive tentacles extending from body, deep ocean dwelling, storm and lightning control, ship-destroying sea monster. Ancient deep sea titan.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "environment": ["ocean", "underwater", "deep-sea"],
    "tags": [
      "monstrosity",
      "gargantuan",
      "chaotic-evil",
      "monstrosity"
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
    "hitDice": "13d10+26",
    "speed": {
      "walk": 30
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
      "passivePerception": 12,
      "darkvision": 60
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
        "description": "The lamia makes two attacks: one with its claws and one with its dagger or Intoxicating Touch.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 14 (2d10 + 3) slashing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Slashing",
          "roll": "2d10+3",
          "average": 14
        }
      },
      {
        "name": "Dagger",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d4+3",
          "average": 6
        }
      },
      {
        "name": "Intoxicating Touch",
        "description": "Melee Spell Attack: +5 to hit, reach 5 ft., one creature. Hit: The target is magically cursed for 1 hour. Until the curse ends, the target has disadvantage on Wisdom saving throws and all ability checks.",
        "attackBonus": 5,
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A beautiful lamia with the upper body of a stunning human woman and the lower body of a massive serpent. Her face is alluring and seductive, with long flowing hair and enchanting eyes. Her serpentine tail is covered in colorful scales and can coil around prey with deadly strength.",
    "background": "Lamia are beautiful but malevolent creatures that combine the allure of human women with the predatory nature of serpents. They use their beauty and magical abilities to seduce and deceive victims, often appearing as beautiful women to lure travelers into their lairs. They are known for their cruelty and their ability to cast illusions and charm spells.",
    "imagePrompt": "A beautiful lamia with upper body of stunning human woman, lower body of massive serpent, alluring seductive face, long flowing hair, enchanting eyes, colorful serpentine scales, coiling tail, seductive but deadly snake-woman. Beautiful serpent goddess demon.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "chaotic-evil",
      "monstrosity"
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
    "hitDice": "8d10+24",
    "speed": {
      "walk": 30,
      "fly": 50
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 11,
      "darkvision": 60
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
        "description": "The manticore makes three attacks: one with its bite and two with its claws or three with its tail spikes.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
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
      },
      {
        "name": "Tail Spike",
        "description": "Ranged Weapon Attack: +5 to hit, range 100/200 ft., one target. Hit: 7 (1d8 + 3) piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d8+3",
          "average": 8
        }
      }
    ],
    "legendaryActions": [],
    "description": "A fearsome manticore with the body of a powerful lion, the face of a human male with sharp teeth, and a scorpion-like tail covered in deadly spikes. Its wings allow it to fly, and it can launch its tail spikes as deadly projectiles.",
    "background": "Manticores are dangerous predators that combine the strength of a lion with the intelligence of a human and the deadly weaponry of a scorpion. They are known for their ability to launch tail spikes as projectiles and their preference for human flesh. They are found in mountainous regions and are feared for their hunting prowess.",
    "imagePrompt": "A fearsome manticore with powerful lion body, human male face with sharp teeth, scorpion-like tail with deadly spikes, wings for flight, projectile tail spikes, mountainous predator. Lion-bodied human-faced scorpion-tailed monster.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "lawful-evil",
      "monstrosity"
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
    "hitDice": "17d8+51",
    "speed": {
      "walk": 30
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
      "passivePerception": 14,
      "darkvision": 60
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
        "description": "The medusa makes either three melee attacks--one with its snake hair and two with its shortsword--or two ranged attacks with its longbow.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Snake Hair",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) piercing damage plus 14 (4d6) poison damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d4+2",
          "average": 5
        }
      },
      {
        "name": "Shortsword",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d6+2",
          "average": 6
        }
      },
      {
        "name": "Longbow",
        "description": "Ranged Weapon Attack: +5 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage plus 7 (2d6) poison damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d8+2",
          "average": 7
        }
      }
    ],
    "legendaryActions": [],
    "description": "A beautiful but cursed medusa with the body of a human woman and a head covered in writhing, venomous snakes instead of hair. Her eyes can turn creatures to stone with a single glance, and her face is both alluring and terrifying.",
    "background": "Medusas are cursed women whose hair has been transformed into venomous snakes. They are known for their petrifying gaze that can turn creatures to stone, and their snake hair that can bite and poison enemies. They are often found in ancient ruins and dungeons, where they guard treasures or serve as cursed guardians.",
    "imagePrompt": "A beautiful cursed medusa with human woman body, head covered in writhing venomous snakes instead of hair, petrifying gaze, alluring but terrifying face, snake hair that can bite, ancient ruin guardian. Beautiful but deadly snake-haired woman.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "medium",
      "lawful-evil",
      "monstrosity"
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
    "hitDice": "6d10+12",
    "speed": {
      "walk": 10,
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
      "darkvision": 60
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
        "description": "The merrow makes two attacks: one with its bite and one with its claws or harpoon.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "1d8+4",
          "average": 9
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) slashing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Slashing",
          "roll": "2d4+4",
          "average": 9
        }
      },
      {
        "name": "Harpoon",
        "description": "Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) piercing damage. If the target is a Huge or smaller creature, it must succeed on a Strength contest against the merrow or be pulled up to 20 feet toward the merrow.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "2d6+4",
          "average": 11
        }
      }
    ],
    "legendaryActions": [],
    "description": "A savage merrow with a massive humanoid torso and a fish-like lower body covered in rigid, sharp scales. Its face features sharp serrated teeth and dark predatory eyes, while its hands end in large claws. Its fins are torn and rough, reflecting its brutal nature.",
    "background": "Merrow are monstrous aquatic humanoids, twisted and corrupted versions of merfolk influenced by the Abyss. They are larger than merfolk with brute strength and savage nature, dwelling in deep ocean caves among treasures and trophies. They are known for tying rotting corpses of victims to kelp to mark their territory.",
    "imagePrompt": "A savage merrow with massive humanoid torso, fish-like lower body with rigid sharp scales, sharp serrated teeth, dark predatory eyes, large claws, torn rough fins, deep ocean dwelling, abyssal corruption. Twisted corrupted merfolk monster.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "chaotic-evil",
      "monstrosity"
    ]
  },
  {
    "name": "Mimic",
    "size": "Medium",
    "type": "monstrosity",
    "subtype": "shapechanger",
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
    "hitDice": "9d8+18",
    "speed": {
      "walk": 15
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
      "Prone"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 11,
      "darkvision": 60
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
          "roll": "1d8+3",
          "average": 8
        }
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 4 (1d8) acid damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Piercing",
          "roll": "1d8+3",
          "average": 8
        }
      }
    ],
    "legendaryActions": [],
    "description": "A shapeshifting mimic that can transform into any object, most commonly appearing as a treasure chest, door, or piece of furniture. In its true form, it appears as an amorphous blob of grayish-brown flesh with pseudopods and a large mouth filled with sharp teeth.",
    "background": "Mimics are shapeshifting creatures that can perfectly mimic the appearance of objects to ambush prey. They are commonly found in dungeons and ruins where they pose as treasure chests, doors, or other objects to lure unsuspecting adventurers. They can transform between their amorphous true form and any object they choose.",
    "imagePrompt": "A monstrous mimic chest with teeth in the lid, long tongue, sharp teeth, treasure chest with mouth, classic mimic chest, NOT a monster holding a chest, clearly a chest with teeth and tongue",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "medium",
      "neutral",
      "monstrosity"
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
    "hitDice": "9d10+27",
    "speed": {
      "walk": 40
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
      "passivePerception": 17,
      "darkvision": 60
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
          "roll": "2d12+4",
          "average": 17
        }
      },
      {
        "name": "Gore",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "2d8+4",
          "average": 13
        }
      }
    ],
    "legendaryActions": [],
    "description": "A fearsome manticore with the body of a powerful lion, the face of a human male with sharp teeth, and a scorpion-like tail covered in deadly spikes. Its wings allow it to fly, and it can launch its tail spikes as deadly projectiles.",
    "background": "Manticores are dangerous predators that combine the strength of a lion with the intelligence of a human and the deadly weaponry of a scorpion. They are known for their ability to launch tail spikes as projectiles and their insatiable hunger for human flesh. They are often found in remote wilderness areas where they can hunt without interference.",
    "imagePrompt": "A fearsome manticore with lion body, human male face with sharp teeth, scorpion-like tail with deadly spikes, wings for flight, projectile tail spikes. Lion-bodied human-faced scorpion-tailed monster with projectile attacks.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "chaotic-evil",
      "monstrosity"
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
    "hitDice": "7d10+21",
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
      "passivePerception": 13,
      "darkvision": 60
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
        "description": "The owlbear makes two attacks: one with its beak and one with its claws.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one creature. Hit: 10 (1d10 + 5) piercing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "1d10+5",
          "average": 11
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Slashing",
          "roll": "2d8+5",
          "average": 14
        }
      }
    ],
    "legendaryActions": [],
    "description": "A fierce owlbear with the body of a massive bear and the head of a giant owl. Its fur is thick and shaggy, and its owl-like face features large, intelligent eyes and a sharp beak. Its powerful claws and beak make it a deadly predator.",
    "background": "Owlbears are dangerous predators that combine the strength and ferocity of bears with the keen senses and hunting instincts of owls. They are known for their aggressive nature and their ability to hunt both day and night. They are often found in forests and wilderness areas where they can ambush prey.",
    "imagePrompt": "A fierce owlbear with massive bear body, giant owl head, thick shaggy fur, large intelligent eyes, sharp beak, powerful claws. Bear-owl hybrid with deadly hunting abilities.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "unaligned",
      "monstrosity"
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
    "hitDice": "5d10+5",
    "speed": {
      "walk": 30,
      "climb": 30
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
      "passivePerception": 10,
      "darkvision": 60
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
          "roll": "1d10+2",
          "average": 8
        }
      }
    ],
    "legendaryActions": [],
    "description": "A phase spider possesses the magical ability to phase in and out of the Ethereal Plane. It seems to appear out of nowhere and quickly vanishes after attacking. Its movement on the Ethereal Plane before coming back to the Material Plane makes it seem like it can teleport.",
    "background": "A phase spider possesses the magical ability to phase in and out of the Ethereal Plane. It seems to appear out of nowhere and quickly vanishes after attacking. Its movement on the Ethereal Plane before coming back to the Material Plane makes it seem like it can teleport.",
    "imagePrompt": "A large phase spider with ethereal shifting abilities, appearing and disappearing between planes, spider-like body with magical phase abilities, ethereal jaunt movement. Magical spider that can shift between Material and Ethereal planes.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "unaligned",
      "monstrosity"
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
    "hitDice": "15d20+90",
    "speed": {
      "walk": 50,
      "burrow": 30
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 9,
      "blindsight": 30,
      "tremorsense": 60
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
        "description": "The worm makes two attacks: one with its bite and one with its stinger.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (3d8 + 9) piercing damage. If the target is a Large or smaller creature, it must succeed on a DC 19 Dexterity saving throw or be swallowed by the worm. A swallowed creature is blinded and restrained, it has total cover against attacks and other effects outside the worm, and it takes 21 (6d6) acid damage at the start of each of the worm's turns.\nIf the worm takes 30 damage or more on a single turn from a creature inside it, the worm must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, which fall prone in a space within 10 feet of the worm. If the worm dies, a swallowed creature is no longer restrained by it and can escape from the corpse by using 20 feet of movement, exiting prone.",
        "attackBonus": 9,
        "damage": {
          "type": "Piercing",
          "roll": "3d8+9",
          "average": 23
        }
      },
      {
        "name": "Tail Stinger",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one creature. Hit: 19 (3d6 + 9) piercing damage, and the target must make a DC 19 Constitution saving throw, taking 42 (12d6) poison damage on a failed save, or half as much damage on a successful one.",
        "attackBonus": 9,
        "damage": {
          "type": "Piercing",
          "roll": "3d6+9",
          "average": 20
        }
      }
    ],
    "legendaryActions": [],
    "description": "A gargantuan purple worm with a massive, segmented body covered in thick purple chitin. Its enormous maw is ringed with sharp teeth, and its tail ends in a deadly stinger. It can burrow through solid rock and leave massive tunnels in its wake.",
    "background": "Purple worms are massive burrowing predators that dwell deep beneath the surface. They are known for their ability to tunnel through solid rock and their voracious appetite. They are apex predators in the Underdark and are feared by all creatures that dwell there.",
    "imagePrompt": "A gargantuan purple worm with massive segmented body, thick purple chitin, enormous maw with sharp teeth, deadly tail stinger, burrowing through rock. Massive underground predator with tunneling abilities.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "gargantuan",
      "unaligned",
      "monstrosity"
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
    "hitDice": "17d12+85",
    "speed": {
      "walk": 30,
      "burrow": 20
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
      "passivePerception": 10,
      "darkvision": 60,
      "tremorsense": 60
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
          "roll": "6d10+7",
          "average": 40
        }
      },
      {
        "name": "Swallow",
        "description": "The remorhaz makes one bite attack against a Medium or smaller creature it is grappling. If the attack hits, that creature takes the bite's damage and is swallowed, and the grapple ends. While swallowed, the creature is blinded and restrained, it has total cover against attacks and other effects outside the remorhaz, and it takes 21 (6d6) acid damage at the start of each of the remorhaz's turns.\nIf the remorhaz takes 30 damage or more on a single turn from a creature inside it, the remorhaz must succeed on a DC 15 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, which fall prone in a space within 10 feet of the remorhaz. If the remorhaz dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 15 feet of movement, exiting prone.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A huge remorhaz with a massive, centipede-like body covered in heated armor plates that glow with intense heat. Its head features massive mandibles and its body radiates heat that can burn those who touch it. It is adapted to extreme cold environments.",
    "background": "Remorhazes are massive heat-generating predators that dwell in arctic and subarctic regions. They are known for their ability to generate intense heat and their resistance to cold. They are apex predators in frozen environments and are feared for their ability to swallow prey whole.",
    "imagePrompt": "A huge remorhaz with SEGMENTED CENTIPEDE BODY, MANY LEGS along each segment, heated armor plates glowing with heat, massive insect mandibles, heat-radiating body, arctic predator, giant centipede-like insect, NOT a worm, clearly segmented body with multiple legs",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "huge",
      "unaligned",
      "monstrosity"
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
    "hitDice": "16d20+80",
    "speed": {
      "walk": 20,
      "fly": 120
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
        "description": "The roc makes two attacks: one with its beak and one with its talons.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 27 (4d8 + 9) piercing damage.",
        "attackBonus": 13,
        "damage": {
          "type": "Piercing",
          "roll": "4d8+9",
          "average": 27
        }
      },
      {
        "name": "Talons",
        "description": "Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 23 (4d6 + 9) slashing damage, and the target is grappled (escape DC 19). Until this grapple ends, the target is restrained, and the roc can't use its talons on another target.",
        "attackBonus": 13,
        "damage": {
          "type": "Slashing",
          "roll": "4d6+9",
          "average": 23
        }
      }
    ],
    "legendaryActions": [],
    "description": "A gargantuan roc with massive wings that span hundreds of feet and a body the size of a small castle. Its feathers are dark and its beak and talons are massive and deadly. It is one of the largest flying creatures in existence.",
    "background": "Rocs are massive birds of prey that are among the largest flying creatures in the world. They are known for their ability to carry off large prey, including elephants and other massive creatures. They build their nests on the highest peaks and are rarely seen by humanoids.",
    "imagePrompt": "A gargantuan roc with massive wings spanning hundreds of feet, castle-sized body, dark feathers, massive deadly beak and talons. Enormous bird of prey capable of carrying massive prey.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "gargantuan",
      "unaligned",
      "monstrosity"
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
    "hitDice": "11d10+33",
    "speed": {
      "walk": 10,
      "climb": 10
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
      "passivePerception": 16,
      "darkvision": 60
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
        "description": "The roper makes four attacks with its tendrils, uses Reel, and makes one attack with its bite.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) piercing damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Piercing",
          "roll": "4d8+4",
          "average": 22
        }
      },
      {
        "name": "Tendril",
        "description": "Melee Weapon Attack: +7 to hit, reach 50 ft., one creature. Hit: The target is grappled (escape DC 15). Until the grapple ends, the target is restrained and has disadvantage on Strength checks and Strength saving throws, and the roper can't use the same tendril on another target.",
        "attackBonus": 7,
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Reel",
        "description": "The roper pulls each creature grappled by it up to 25 ft. straight toward it.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large monstrous creature that resembles a rocky outcropping, typically a stalagmite or stalactite, with yellowish-gray hide that can change color to blend with surroundings. It has a single yellow eye and a maw filled with sharp teeth. Six nubs extrude sticky, barbed tendril-like limbs that can grapple and weaken prey. It moves slowly using cilia-like appendages and can climb walls and ceilings.",
    "background": "Ropers are ambush predators that dwell in caves and the Underdark. They use their rocky camouflage to blend into cave formations, appearing as natural stalagmites or stalactites until they strike. They use ultrasonic pulses for echolocation and can digest almost anything except platinum, gemstones, and magic items. Their tendrils can penetrate flesh and weaken prey before dragging them to the central maw for consumption.",
    "imagePrompt": "A large monstrous creature resembling a rocky outcropping or stalagmite, yellowish-gray hide that changes color to blend with surroundings, single yellow eye, maw filled with sharp teeth, six nubs extruding sticky barbed tendril-like limbs, cilia-like appendages for movement. Cave-dwelling ambush predator with echolocation and flesh-weakening tendrils.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "neutral-evil",
      "monstrosity"
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
    "hitDice": "5d8+5",
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
      "passivePerception": 11,
      "darkvision": 60
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
          "roll": "1d8+1",
          "average": 6
        }
      },
      {
        "name": "Antennae",
        "description": "The rust monster corrodes a nonmagical ferrous metal object it can see within 5 feet of it. If the object isn't being worn or carried, the touch destroys a 1-foot cube of it. If the object is being worn or carried by a creature, the creature can make a DC 11 Dexterity saving throw to avoid the rust monster's touch.\nIf the object touched is either metal armor or a metal shield being worn or carried, its takes a permanent and cumulative -1 penalty to the AC it offers. Armor reduced to an AC of 10 or a shield that drops to a +0 bonus is destroyed. If the object touched is a held metal weapon, it rusts as described in the Rust Metal trait.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A medium rust monster with a segmented body covered in metallic-looking plates and four long antennae. Its head features a pair of large mandibles and its body has a metallic sheen. It is drawn to metal and can corrode it with its touch.",
    "background": "Rust monsters are creatures that feed on metal and are drawn to ferrous materials. They are known for their ability to corrode and destroy metal objects, including weapons and armor. They are often found in dungeons and ruins where they can find metal to consume.",
    "imagePrompt": "A medium rust monster with segmented body, metallic-looking plates, four long antennae, large mandibles, metallic sheen, metal-corrosive touch. Metal-eating creature that destroys ferrous materials.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "medium",
      "unaligned",
      "monstrosity"
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
    "hitDice": "10d10+20",
    "speed": {
      "walk": 40
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      "Charmed",
      "Poisoned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 12,
      "darkvision": 60
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
          "roll": "1d6+4",
          "average": 8
        }
      }
    ],
    "legendaryActions": [],
    "description": "A malevolent spirit naga with a massive serpentine body covered in dark, iridescent scales. Its head features a humanoid face with sharp features and malevolent eyes. It possesses powerful arcane magic and can cast spells to control and destroy its enemies.",
    "background": "Spirit nagas are evil serpentine creatures that possess powerful arcane magic. They are known for their malevolence and their ability to cast powerful spells. They are often found in ancient ruins and dungeons where they serve as guardians or pursue their own dark agendas.",
    "imagePrompt": "A malevolent spirit naga with massive serpentine body, dark iridescent scales, humanoid face with sharp features, malevolent eyes, arcane magic abilities. Evil serpent with powerful spellcasting abilities.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "chaotic-evil",
      "monstrosity"
    ]
  },
  {
    "name": "Tarrasque",
    "size": "Gargantuan",
    "type": "monstrosity",
    "subtype": "titan",
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
    "hitDice": "33d20+330",
    "speed": {
      "walk": 40
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
      "Charmed",
      "Frightened",
      "Paralyzed",
      "Poisoned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10,
      "blindsight": 120
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
        "description": "The tarrasque can use its Frightful Presence. It then makes five attacks: one with its bite, two with its claws, one with its horns, and one with its tail. It can use its Swallow instead of its bite.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +19 to hit, reach 10 ft., one target. Hit: 36 (4d12 + 10) piercing damage. If the target is a creature, it is grappled (escape DC 20). Until this grapple ends, the target is restrained, and the tarrasque can't bite another target.",
        "attackBonus": 19,
        "damage": {
          "type": "Piercing",
          "roll": "4d12+10",
          "average": 36
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +19 to hit, reach 15 ft., one target. Hit: 28 (4d8 + 10) slashing damage.",
        "attackBonus": 19,
        "damage": {
          "type": "Slashing",
          "roll": "4d8+10",
          "average": 28
        }
      },
      {
        "name": "Horns",
        "description": "Melee Weapon Attack: +19 to hit, reach 10 ft., one target. Hit: 32 (4d10 + 10) piercing damage.",
        "attackBonus": 19,
        "damage": {
          "type": "Piercing",
          "roll": "4d10+10",
          "average": 32
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +19 to hit, reach 20 ft., one target. Hit: 24 (4d6 + 10) bludgeoning damage. If the target is a creature, it must succeed on a DC 20 Strength saving throw or be knocked prone.",
        "attackBonus": 19,
        "damage": {
          "type": "Bludgeoning",
          "roll": "4d6+10",
          "average": 24
        }
      },
      {
        "name": "Frightful Presence",
        "description": "Each creature of the tarrasque's choice within 120 feet of it and aware of it must succeed on a DC 17 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, with disadvantage if the tarrasque is within line of sight, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the tarrasque's Frightful Presence for the next 24 hours.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      },
      {
        "name": "Swallow",
        "description": "The tarrasque makes one bite attack against a Large or smaller creature it is grappling. If the attack hits, the target takes the bite's damage, the target is swallowed, and the grapple ends. While swallowed, the creature is blinded and restrained, it has total cover against attacks and other effects outside the tarrasque, and it takes 56 (16d6) acid damage at the start of each of the tarrasque's turns.\nIf the tarrasque takes 60 damage or more on a single turn from a creature inside it, the tarrasque must succeed on a DC 20 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, which fall prone in a space within 10 feet of the tarrasque. If the tarrasque dies, a swallowed creature is no longer restrained by it and can escape from the corpse by using 30 feet of movement, exiting prone.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
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
    "description": "A gargantuan, massive creature like a giant T-Rex, standing over 50 feet tall and 70 feet long. Its body is covered in thick, armored scales and spikes, with a massive head featuring multiple horns, razor-sharp teeth, and malevolent eyes. Its powerful tail can smash buildings, and its massive claws can tear through stone. It is the most feared creature in existence, capable of destroying entire cities with its sheer size and power.",
    "background": "The tarrasque is the most powerful and feared creature in the world, a gargantuan monster like a giant T-Rex that can level entire cities and armies. It is nearly indestructible and possesses incredible regenerative abilities. It is said to be the last of its kind and sleeps for centuries before awakening to wreak havoc. Its massive size makes it tower over buildings and its destructive power is unmatched.",
    "imagePrompt": "A gargantuan massive creature like a giant T-Rex, over 50 feet tall and 70 feet long, thick armored scales and spikes, massive head with multiple horns and razor-sharp teeth, malevolent eyes, powerful tail that can smash buildings, massive claws that tear through stone. City-destroying monster that towers over buildings with unmatched destructive power.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "gargantuan",
      "unaligned",
      "monstrosity"
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
    "hitDice": "10d10+20",
    "speed": {
      "walk": 50
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
          "roll": "2d6+4",
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
    "background": "The arctic-dwelling winter wolf is as large as a dire wolf but has snow-white fur and pale blue eyes. Frost giants use these evil creatures as guards and hunting companions, putting the wolves’ deadly breath weapon to use against their foes. Winter wolves communicate with one another using growls and barks, but they speak Common and Giant well enough to follow simple conversations.",
    "imagePrompt": "A large monstrosity creature with monstrous and terrifying features",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "neutral-evil",
      "monstrosity"
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
    "hitDice": "4d10+4",
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
      "passivePerception": 14,
      "darkvision": 60
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
          "roll": "2d6+3",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "A large, intelligent wolf with shaggy gray or black fur, sharp yellow eyes, and powerful jaws. It has a wolf-like appearance but is larger and more cunning than ordinary wolves. Its body is muscular and built for hunting, with keen senses and a malevolent intelligence that sets it apart from regular wolves.",
    "background": "A worg is an evil, intelligent wolf that delights in hunting and devouring creatures weaker than itself. Cunning and malevolent, worgs roam across the remote wilderness or are raised by goblins and hobgoblins. Those creatures use worgs as mounts, but a worg will turn on its rider if it feels mistreated or malnourished. Worgs speak in their own language and Goblin, and a few learn to speak Common as well.",
    "imagePrompt": "A large intelligent wolf with shaggy gray or black fur, sharp yellow eyes, powerful jaws, muscular wolf-like body built for hunting, keen senses, malevolent intelligence. Large wolf-like creature that is more cunning than ordinary wolves.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "monstrosity",
      "large",
      "neutral-evil",
      "monstrosity"
    ]
  }
];
