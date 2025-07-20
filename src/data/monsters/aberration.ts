import { Monster } from '@/types/monster';

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
    "hitDice": "18d10+36",
    "speed": {
      "walk": 10,
      "swim": 40
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
      "passivePerception": 20,
      "darkvision": 120
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
          "type": "Bludgeoning",
          "roll": "2d6+5",
          "average": 12
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 15 (3d6 + 5) bludgeoning damage.",
        "attackBonus": 9,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d6+5",
          "average": 16
        }
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
    "description": "A massive, ancient aberration with a bulbous, fish-like body and four writhing tentacles. The aboleth's skin is covered in a slimy, translucent mucus that transforms creatures it touches. Its three eyes glow with malevolent intelligence, and it possesses memories that span millennia, making it one of the oldest and most knowledgeable creatures in existence.",
    "background": "Aboleths are among the oldest creatures in the multiverse, predating even the gods themselves. They dwell in vast underwater caverns and ancient ruins, where they rule over enslaved minions and plot to expand their influence. Aboleths possess perfect memories that stretch back to the dawn of time, and they use their telepathic abilities to probe the minds of lesser creatures, learning their deepest desires and using this knowledge to manipulate and enslave them. They are master manipulators who prefer to work through proxies rather than confront enemies directly.",
    "imagePrompt": "A large aberration creature with otherworldly and alien appearance",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "aberration",
      "large",
      "lawful-evil",
      "aberration",
      "alien"
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
    "hitDice": "11d10+33",
    "speed": {
      "walk": 30,
      "swim": 30
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
      "Poisoned"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 14,
      "darkvision": 60
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
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d6+4",
          "average": 11
        }
      },
      {
        "name": "Tentacles",
        "description": "One creature grappled by the chuul must succeed on a DC 13 Constitution saving throw or be poisoned for 1 minute. Until this poison ends, the target is paralyzed. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      }
    ],
    "legendaryActions": [],
    "description": "A massive, lobster-like aberration with chitinous armor and powerful pincers. The chuul's body is covered in dark, segmented plates, and it has numerous writhing tentacles around its mouth. Its eyes glow with a malevolent intelligence, and it can sense magical auras from great distances.",
    "background": "Chuuls are ancient aberrations that serve as guardians and enforcers for more powerful creatures like aboleths and mind flayers. They are often found in underground lakes, ancient ruins, or near magical sites where they can detect and hunt spellcasters. Chuuls are highly territorial and will attack any creature that enters their domain, especially those carrying magical items or displaying magical abilities.",
    "imagePrompt": "A large aberration creature with otherworldly and alien appearance",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "aberration",
      "large",
      "chaotic-evil",
      "aberration",
      "alien"
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
    "hitDice": "12d10+12",
    "speed": {
      "walk": 10,
      "fly": 40
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
      "passivePerception": 11,
      "darkvision": 60
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
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "2d6+3",
          "average": 10
        }
      },
      {
        "name": "Tail",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one creature. Hit: 7 (1d8 + 3) slashing damage.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d8+3",
          "average": 8
        }
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
    "description": "A large, leathery aberration that resembles a living cloak or manta ray. The cloaker's body is covered in dark, rubbery skin that can blend seamlessly with shadows. When motionless, it appears to be nothing more than a discarded piece of clothing, but when it attacks, it reveals rows of sharp teeth and a long, whip-like tail.",
    "background": "Cloakers are stealthy aberrations that lurk in dark places, particularly in the Underdark and abandoned ruins. They are ambush predators that use their ability to create illusory duplicates to confuse and overwhelm their prey. Cloakers are highly intelligent and often work together in small groups, using their moaning abilities to disorient victims before swooping in for the kill.",
    "imagePrompt": "A large aberration creature with otherworldly and alien appearance",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "aberration",
      "large",
      "chaotic-neutral",
      "aberration",
      "alien"
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
    "hitDice": "9d8+27",
    "speed": {
      "walk": 10,
      "swim": 10
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [],
    "conditionImmunities": [
      "Prone"
    ],
    "damageVulnerabilities": [],
    "senses": {
      "passivePerception": 10,
      "darkvision": 60
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
          "type": "Bludgeoning",
          "roll": "5d6",
          "average": 18
        }
      },
      {
        "name": "Blinding Spittle",
        "description": "The mouther spits a chemical glob at a point it can see within 15 feet of it. The glob explodes in a blinding flash of light on impact. Each creature within 5 feet of the flash must succeed on a DC 13 Dexterity saving throw or be blinded until the end of the mouther's next turn.",
        "damage": {
          "type": "bludgeoning",
          "roll": "1d4",
          "average": 3
        }
      }
    ],
    "legendaryActions": [],
    "description": "A writhing mass of liquefied flesh covered in dozens of eyes and mouths that constantly babble and gibber. The gibbering mouther's amorphous body shifts and flows like quicksand, and the ground around it becomes soft and unstable. Its many mouths speak in different voices, creating a maddening cacophony that can drive creatures to insanity.",
    "background": "Gibbering mouthers are the result of failed magical experiments or the corruption of living creatures by aberrant magic. They are often found in areas where reality has been warped by powerful magic, such as near ancient spell circles or in regions affected by planar rifts. The creature's constant babbling contains fragments of forgotten languages and forbidden knowledge, making it both fascinating and dangerous to study.",
    "imagePrompt": "A roughly three-foot across and three to four-foot high creature composed of liquefied flesh, eyes, and mouths. The body has a color similar to human flesh but with a consistency like viscous ooze or slime. The surface constantly shifts with new eyes and mouths forming and dissolving as it moves. Multiple mouths babble incoherently while numerous eyes of various sizes dot the amorphous surface.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "aberration",
      "medium",
      "neutral",
      "aberration",
      "alien"
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
    "hitDice": "12d10+48",
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
      "passivePerception": 11,
      "darkvision": 120
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
        "attackBonus": 6,
        "damage": {
          "type": "Piercing",
          "roll": "2d8+3",
          "average": 12
        }
      },
      {
        "name": "Tentacle",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage plus 4 (1d8) piercing damage. If the target is Medium or smaller, it is grappled (escape DC 13) and restrained until the grapple ends. The otyugh has two tentacles, each of which can grapple one target.",
        "attackBonus": 6,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d8+3",
          "average": 8
        }
      },
      {
        "name": "Tentacle Slam",
        "description": "The otyugh slams creatures grappled by it into each other or a solid surface. Each creature must succeed on a DC 14 Constitution saving throw or take 10 (2d6 + 3) bludgeoning damage and be stunned until the end of the otyugh's next turn. On a successful save, the target takes half the bludgeoning damage and isn't stunned."
      }
    ],
    "legendaryActions": [],
    "description": "A massive, bloated aberration with a roughly spherical body supported by three thick, elephantine legs. The otyugh's rough, rock-like hide is covered in filth and emits a foul stench of decay. It has two prehensile tentacles ending in leaf-like pads with sharp spikes, and a third tentacle topped with three eyes and an olfactory organ. Its massive mouth is filled with sharp teeth, and the entire creature is often covered in refuse and carrion.",
    "background": "Otyughs are scavenger aberrations that dwell in sewers, dungeons, and other filthy environments where they can feed on waste and carrion. They are often found near settlements where they can scavenge from garbage dumps or sewage systems. Despite their grotesque appearance, otyughs are intelligent enough to communicate telepathically and can sometimes be bargained with, though they prefer to eat rather than talk.",
    "imagePrompt": "A large, bloated, oval-shaped aberration about 8 feet in diameter, standing on three sturdy, elephantine legs. Its rough, rock-like hide is caked in filth and emits a foul odor of rot and decay. The creature has two prehensile tentacles covered in thorny growths ending in leaf-like pads with sharp spikes, and a third tentacle rising from its body, topped with a stalk bearing three eyes and an olfactory organ. Its massive mouth is filled with sharp teeth, and the entire creature is covered in refuse and carrion, giving it a grotesque, scavenger appearance.",
    "imageStyle": "fantasy",
    "source": "SRD",
    "tags": [
      "aberration",
      "large",
      "neutral",
      "aberration",
      "alien"
    ]
  }
];
