import { Monster } from '../../types/monster';

export const constructMonsters: Monster[] = [
  {
    "name": "Animated Armor",
    "size": "Medium",
    "type": "construct",
    "alignment": "unaligned",
    "challengeRating": "1",
    "xp": 200,
    "strength": 14,
    "dexterity": 11,
    "constitution": 13,
    "intelligence": 1,
    "wisdom": 3,
    "charisma": 1,
    "armorClass": 18,
    "armorType": "natural",
    "hitPoints": 33,
    "hitDice": "6d8",
    "speed": {
      "walk": 25,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "poison",
      "psychic"
    ],
    "conditionImmunities": [
      {
        "index": "blinded",
        "name": "Blinded",
        "url": "/api/2014/conditions/blinded"
      },
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "deafened",
        "name": "Deafened",
        "url": "/api/2014/conditions/deafened"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
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
        "index": "petrified",
        "name": "Petrified",
        "url": "/api/2014/conditions/petrified"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "blindsight": 60,
      "passivePerception": 6
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Antimagic Susceptibility",
        "description": "The armor is incapacitated while in the area of an antimagic field. If targeted by dispel magic, the armor must succeed on a Constitution saving throw against the caster's spell save DC or fall unconscious for 1 minute."
      },
      {
        "name": "False Appearance",
        "description": "While the armor remains motionless, it is indistinguishable from a normal suit of armor."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The armor makes two melee attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) bludgeoning damage.",
        "attackBonus": 4,
        "damage": {
          "type": "Bludgeoning",
          "roll": "1d6 + 2",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "construct",
      "medium",
      "unaligned"
    ]
  },
  {
    "name": "Clay Golem",
    "size": "Large",
    "type": "construct",
    "alignment": "unaligned",
    "challengeRating": "9",
    "xp": 5000,
    "strength": 20,
    "dexterity": 9,
    "constitution": 18,
    "intelligence": 3,
    "wisdom": 8,
    "charisma": 1,
    "armorClass": 14,
    "armorType": "natural",
    "hitPoints": 133,
    "hitDice": "14d10",
    "speed": {
      "walk": 20,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "acid",
      "poison",
      "psychic",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't adamantine"
    ],
    "conditionImmunities": [
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
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
        "index": "petrified",
        "name": "Petrified",
        "url": "/api/2014/conditions/petrified"
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
      "passivePerception": 9
    },
    "languages": [
      "understands the languages of its creator but can't speak"
    ],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Acid Absorption",
        "description": "Whenever the golem is subjected to acid damage, it takes no damage and instead regains a number of hit points equal to the acid damage dealt."
      },
      {
        "name": "Berserk",
        "description": "Whenever the golem starts its turn with 60 hit points or fewer, roll a d6. On a 6, the golem goes berserk. On each of its turns while berserk, the golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object, with preference for an object smaller than itself. Once the golem goes berserk, it continues to do so until it is destroyed or regains all its hit points."
      },
      {
        "name": "Immutable Form",
        "description": "The golem is immune to any spell or effect that would alter its form."
      },
      {
        "name": "Magic Resistance",
        "description": "The golem has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The golem's weapon attacks are magical."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The golem makes two slam attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 16 (2d10 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 15 Constitution saving throw or have its hit point maximum reduced by an amount equal to the damage taken. The target dies if this attack reduces its hit point maximum to 0. The reduction lasts until removed by the greater restoration spell or other magic.",
        "attackBonus": 8,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d10 + 5",
          "average": 16
        }
      },
      {
        "name": "Haste",
        "description": "Until the end of its next turn, the golem magically gains a +2 bonus to its AC, has advantage on Dexterity saving throws, and can use its slam attack as a bonus action."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "construct",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Flesh Golem",
    "size": "Medium",
    "type": "construct",
    "alignment": "neutral",
    "challengeRating": "5",
    "xp": 1800,
    "strength": 19,
    "dexterity": 9,
    "constitution": 18,
    "intelligence": 6,
    "wisdom": 10,
    "charisma": 5,
    "armorClass": 9,
    "armorType": "dex",
    "hitPoints": 93,
    "hitDice": "11d8",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "lightning",
      "poison",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't adamantine"
    ],
    "conditionImmunities": [
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
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
        "index": "petrified",
        "name": "Petrified",
        "url": "/api/2014/conditions/petrified"
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
      "passivePerception": 10
    },
    "languages": [
      "understands the languages of its creator but can't speak"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Berserk",
        "description": "Whenever the golem starts its turn with 40 hit points or fewer, roll a d6. On a 6, the golem goes berserk. On each of its turns while berserk, the golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object, with preference for an object smaller than itself. Once the golem goes berserk, it continues to do so until it is destroyed or regains all its hit points.\nThe golem's creator, if within 60 feet of the berserk golem, can try to calm it by speaking firmly and persuasively. The golem must be able to hear its creator, who must take an action to make a DC 15 Charisma (Persuasion) check. If the check succeeds, the golem ceases being berserk. If it takes damage while still at 40 hit points or fewer, the golem might go berserk again."
      },
      {
        "name": "Aversion of Fire",
        "description": "If the golem takes fire damage, it has disadvantage on attack rolls and ability checks until the end of its next turn."
      },
      {
        "name": "Immutable Form",
        "description": "The golem is immune to any spell or effect that would alter its form."
      },
      {
        "name": "Lightning Absorption",
        "description": "Whenever the golem is subjected to lightning damage, it takes no damage and instead regains a number of hit points equal to the lightning damage dealt."
      },
      {
        "name": "Magic Resistance",
        "description": "The golem has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The golem's weapon attacks are magical."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The golem makes two slam attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d8 + 4",
          "average": 13
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "construct",
      "medium",
      "neutral"
    ]
  },
  {
    "name": "Flying Sword",
    "size": "Small",
    "type": "construct",
    "alignment": "unaligned",
    "challengeRating": "0.25",
    "xp": 50,
    "strength": 12,
    "dexterity": 15,
    "constitution": 11,
    "intelligence": 1,
    "wisdom": 5,
    "charisma": 1,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 17,
    "hitDice": "5d6",
    "speed": {
      "walk": 0,
      "fly": 50,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "poison",
      "psychic"
    ],
    "conditionImmunities": [
      {
        "index": "blinded",
        "name": "Blinded",
        "url": "/api/2014/conditions/blinded"
      },
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "blinded",
        "name": "Blinded",
        "url": "/api/2014/conditions/blinded"
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
        "index": "petrified",
        "name": "Petrified",
        "url": "/api/2014/conditions/petrified"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "blindsight": 60,
      "passivePerception": 7
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Antimagic Susceptibility",
        "description": "The sword is incapacitated while in the area of an antimagic field. If targeted by dispel magic, the sword must succeed on a Constitution saving throw against the caster's spell save DC or fall unconscious for 1 minute."
      },
      {
        "name": "False Appearance",
        "description": "While the sword remains motionless and isn't flying, it is indistinguishable from a normal sword."
      }
    ],
    "actions": [
      {
        "name": "Longsword",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) slashing damage.",
        "attackBonus": 3,
        "damage": {
          "type": "Slashing",
          "roll": "1d8 + 1",
          "average": 5
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "construct",
      "small",
      "unaligned"
    ]
  },
  {
    "name": "Homunculus",
    "size": "Tiny",
    "type": "construct",
    "alignment": "neutral",
    "challengeRating": "0",
    "xp": 10,
    "strength": 4,
    "dexterity": 15,
    "constitution": 11,
    "intelligence": 10,
    "wisdom": 10,
    "charisma": 7,
    "armorClass": 13,
    "armorType": "natural",
    "hitPoints": 5,
    "hitDice": "2d4",
    "speed": {
      "walk": 20,
      "fly": 40,
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
      "passivePerception": 10
    },
    "languages": [
      "understands the languages of its creator but can't speak"
    ],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Telepathic Bond",
        "description": "While the homunculus is on the same plane of existence as its master, it can magically convey what it senses to its master, and the two can communicate telepathically."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 1 piercing damage, and the target must succeed on a DC 10 Constitution saving throw or be poisoned for 1 minute. If the saving throw fails by 5 or more, the target is instead poisoned for 5 (1d10) minutes and unconscious while poisoned in this way.",
        "attackBonus": 4
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "construct",
      "tiny",
      "neutral"
    ]
  },
  {
    "name": "Iron Golem",
    "size": "Large",
    "type": "construct",
    "alignment": "unaligned",
    "challengeRating": "16",
    "xp": 15000,
    "strength": 24,
    "dexterity": 9,
    "constitution": 20,
    "intelligence": 3,
    "wisdom": 11,
    "charisma": 1,
    "armorClass": 20,
    "armorType": "natural",
    "hitPoints": 210,
    "hitDice": "20d10",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "fire",
      "poison",
      "psychic",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't adamantine"
    ],
    "conditionImmunities": [
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
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
        "index": "petrified",
        "name": "Petrified",
        "url": "/api/2014/conditions/petrified"
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
      "understands the languages of its creator but can't speak"
    ],
    "proficiencyBonus": 5,
    "traits": [
      {
        "name": "Fire Absorption",
        "description": "Whenever the golem is subjected to fire damage, it takes no damage and instead regains a number of hit points equal to the fire damage dealt."
      },
      {
        "name": "Immutable Form",
        "description": "The golem is immune to any spell or effect that would alter its form."
      },
      {
        "name": "Magic Resistance",
        "description": "The golem has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The golem's weapon attacks are magical."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The golem makes two melee attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 20 (3d8 + 7) bludgeoning damage.",
        "attackBonus": 13,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d8 + 7",
          "average": 20
        }
      },
      {
        "name": "Sword",
        "description": "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 23 (3d10 + 7) slashing damage.",
        "attackBonus": 13,
        "damage": {
          "type": "Slashing",
          "roll": "3d10 + 7",
          "average": 23
        }
      },
      {
        "name": "Poison Breath",
        "description": "The golem exhales poisonous gas in a 15-foot cone. Each creature in that area must make a DC 19 Constitution saving throw, taking 45 (10d8) poison damage on a failed save, or half as much damage on a successful one.",
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
      "construct",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Rug of Smothering",
    "size": "Large",
    "type": "construct",
    "alignment": "unaligned",
    "challengeRating": "2",
    "xp": 450,
    "strength": 17,
    "dexterity": 14,
    "constitution": 10,
    "intelligence": 1,
    "wisdom": 3,
    "charisma": 1,
    "armorClass": 12,
    "armorType": "dex",
    "hitPoints": 33,
    "hitDice": "6d10",
    "speed": {
      "walk": 10,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "poison",
      "psychic"
    ],
    "conditionImmunities": [
      {
        "index": "blinded",
        "name": "Blinded",
        "url": "/api/2014/conditions/blinded"
      },
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "blinded",
        "name": "Blinded",
        "url": "/api/2014/conditions/blinded"
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
        "index": "petrified",
        "name": "Petrified",
        "url": "/api/2014/conditions/petrified"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "damageVulnerabilities": [],
    "senses": {
      "blindsight": 60,
      "passivePerception": 6
    },
    "languages": [],
    "proficiencyBonus": 2,
    "traits": [
      {
        "name": "Antimagic Susceptibility",
        "description": "The rug is incapacitated while in the area of an antimagic field. If targeted by dispel magic, the rug must succeed on a Constitution saving throw against the caster's spell save DC or fall unconscious for 1 minute."
      },
      {
        "name": "Damage Transfer",
        "description": "While it is grappling a creature, the rug takes only half the damage dealt to it, and the creature grappled by the rug takes the other half."
      },
      {
        "name": "False Appearance",
        "description": "While the rug remains motionless, it is indistinguishable from a normal rug."
      }
    ],
    "actions": [
      {
        "name": "Smother",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one Medium or smaller creature. Hit: The creature is grappled (escape DC 13). Until this grapple ends, the target is restrained, blinded, and at risk of suffocating, and the rug can't smother another target. In addition, at the start of each of the target's turns, the target takes 10 (2d6 + 3) bludgeoning damage.",
        "attackBonus": 5,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d6 + 3",
          "average": 10
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "construct",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Shield Guardian",
    "size": "Large",
    "type": "construct",
    "alignment": "unaligned",
    "challengeRating": "7",
    "xp": 2900,
    "strength": 18,
    "dexterity": 8,
    "constitution": 18,
    "intelligence": 7,
    "wisdom": 10,
    "charisma": 3,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 142,
    "hitDice": "15d10",
    "speed": {
      "walk": 30,
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
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
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
      "darkvision": 60,
      "blindsight": 10,
      "passivePerception": 10
    },
    "languages": [
      "understands commands given in any language but can't speak"
    ],
    "proficiencyBonus": 3,
    "traits": [
      {
        "name": "Bound",
        "description": "The shield guardian is magically bound to an amulet. As long as the guardian and its amulet are on the same plane of existence, the amulet's wearer can telepathically call the guardian to travel to it, and the guardian knows the distance and direction to the amulet. If the guardian is within 60 feet of the amulet's wearer, half of any damage the wearer takes (rounded up) is transferred to the guardian."
      },
      {
        "name": "Regeneration",
        "description": "The shield guardian regains 10 hit points at the start of its turn if it has at least 1 hit. point."
      },
      {
        "name": "Spell Storing",
        "description": "A spellcaster who wears the shield guardian's amulet can cause the guardian to store one spell of 4th level or lower. To do so, the wearer must cast the spell on the guardian. The spell has no effect but is stored within the guardian. When commanded to do so by the wearer or when a situation arises that was predefined by the spellcaster, the guardian casts the stored spell with any parameters set by the original caster, requiring no components. When the spell is cast or a new spell is stored, any previously stored spell is lost."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The guardian makes two fist attacks."
      },
      {
        "name": "Fist",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.",
        "attackBonus": 7,
        "damage": {
          "type": "Bludgeoning",
          "roll": "2d6 + 4",
          "average": 11
        }
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "construct",
      "large",
      "unaligned"
    ]
  },
  {
    "name": "Stone Golem",
    "size": "Large",
    "type": "construct",
    "alignment": "unaligned",
    "challengeRating": "10",
    "xp": 5900,
    "strength": 22,
    "dexterity": 9,
    "constitution": 20,
    "intelligence": 3,
    "wisdom": 11,
    "charisma": 1,
    "armorClass": 17,
    "armorType": "natural",
    "hitPoints": 178,
    "hitDice": "17d10",
    "speed": {
      "walk": 30,
      "hover": false
    },
    "savingThrows": {},
    "skills": {},
    "damageResistances": [],
    "damageImmunities": [
      "poison",
      "psychic",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't adamantine"
    ],
    "conditionImmunities": [
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
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
        "index": "petrified",
        "name": "Petrified",
        "url": "/api/2014/conditions/petrified"
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
      "understands the languages of its creator but can't speak"
    ],
    "proficiencyBonus": 4,
    "traits": [
      {
        "name": "Immutable Form",
        "description": "The golem is immune to any spell or effect that would alter its form."
      },
      {
        "name": "Magic Resistance",
        "description": "The golem has advantage on saving throws against spells and other magical effects."
      },
      {
        "name": "Magic Weapons",
        "description": "The golem's weapon attacks are magical."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "The golem makes two slam attacks."
      },
      {
        "name": "Slam",
        "description": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 19 (3d8 + 6) bludgeoning damage.",
        "attackBonus": 10,
        "damage": {
          "type": "Bludgeoning",
          "roll": "3d8 + 6",
          "average": 19
        }
      },
      {
        "name": "Slow",
        "description": "The golem targets one or more creatures it can see within 10 ft. of it. Each target must make a DC 17 Wisdom saving throw against this magic. On a failed save, a target can't use reactions, its speed is halved, and it can't make more than one attack on its turn. In addition, the target can take either an action or a bonus action on its turn, not both. These effects last for 1 minute. A target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
      }
    ],
    "legendaryActions": [],
    "description": "",
    "source": "SRD",
    "tags": [
      "construct",
      "large",
      "unaligned"
    ]
  }
];
