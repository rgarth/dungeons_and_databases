// Name generator for D&D races
// Based on official D&D 5e sources:
// - Player's Handbook (PHB)
// - Xanathar's Guide to Everything (XGE)
// - Mordenkainen's Tome of Foes (MTF)
// - Volo's Guide to Monsters (VGM)

// Type definitions for name components
interface NameComponent {
  prefixes: string[];
  suffixes: string[];
}

interface HumanEthnicComponent {
  prefixes: string[];
  vowels: string[];
  consonants: string[];
  suffixes: string[];
}

interface DragonbornComponents {
  personalNames: NameComponent;
  clanNames: NameComponent;
}

interface DwarfComponents {
  givenNames: NameComponent;
  clanNames: NameComponent;
}

interface ElfComponents {
  childNames: NameComponent;
  familyNames: NameComponent;
}

interface GnomeComponents {
  givenNames: NameComponent;
  clanNames: NameComponent;
}

interface HalfElfComponents {
  elfNames: NameComponent;
  humanNames: NameComponent;
}

interface HalfOrcComponents {
  givenNames: NameComponent;
  clanNames: NameComponent;
}

interface HalflingComponents {
  givenNames: NameComponent;
  familyNames: NameComponent;
}

interface HumanComponents {
  calashite: HumanEthnicComponent;
  chondathan: HumanEthnicComponent;
  damaran: HumanEthnicComponent;
  illuskan: HumanEthnicComponent;
  mulan: HumanEthnicComponent;
}

interface TieflingComponents {
  givenNames: NameComponent;
  virtueNames: NameComponent;
}

interface GoliathComponents {
  givenNames: NameComponent;
  clanNames: NameComponent;
}

interface AasimarComponents {
  givenNames: NameComponent;
  virtueNames: NameComponent;
}

interface TabaxiComponents {
  givenNames: NameComponent;
  clanNames: NameComponent;
}

interface FirbolgComponents {
  givenNames: NameComponent;
  clanNames: NameComponent;
}

interface KenkuComponents {
  givenNames: NameComponent;
  clanNames: NameComponent;
}

interface LizardfolkComponents {
  givenNames: NameComponent;
  clanNames: NameComponent;
}

interface TritonComponents {
  givenNames: NameComponent;
  clanNames: NameComponent;
}

interface BugbearComponents {
  givenNames: NameComponent;
  clanNames: NameComponent;
}

interface GoblinComponents {
  givenNames: NameComponent;
  clanNames: NameComponent;
}

interface HobgoblinComponents {
  givenNames: NameComponent;
  clanNames: NameComponent;
}

interface KoboldComponents {
  givenNames: NameComponent;
  clanNames: NameComponent;
}

interface OrcComponents {
  givenNames: NameComponent;
  clanNames: NameComponent;
}

interface YuanTiComponents {
  givenNames: NameComponent;
  clanNames: NameComponent;
}

type RaceComponents = DragonbornComponents | DwarfComponents | ElfComponents | GnomeComponents | HalfElfComponents | HalfOrcComponents | HalflingComponents | HumanComponents | TieflingComponents | GoliathComponents | AasimarComponents | TabaxiComponents | FirbolgComponents | KenkuComponents | LizardfolkComponents | TritonComponents | BugbearComponents | GoblinComponents | HobgoblinComponents | KoboldComponents | OrcComponents | YuanTiComponents;

// Helper function to get random element from array
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to capitalize first letter
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Type guard functions
function isDragonbornComponents(components: RaceComponents): components is DragonbornComponents {
  return 'givenNames' in components && 'clanNames' in components;
}

function isDwarfComponents(components: RaceComponents): components is DwarfComponents {
  return 'givenNames' in components && 'clanNames' in components;
}

function isElfComponents(components: RaceComponents): components is ElfComponents {
  return 'givenNames' in components && 'familyNames' in components;
}

function isGnomeComponents(components: RaceComponents): components is GnomeComponents {
  return 'givenNames' in components && 'clanNames' in components;
}

function isHalfElfComponents(components: RaceComponents): components is HalfElfComponents {
  return 'givenNames' in components && 'familyNames' in components;
}

function isHalfOrcComponents(components: RaceComponents): components is HalfOrcComponents {
  return 'givenNames' in components && 'clanNames' in components;
}

function isHalflingComponents(components: RaceComponents): components is HalflingComponents {
  return 'givenNames' in components && 'familyNames' in components;
}

function isTieflingComponents(components: RaceComponents): components is TieflingComponents {
  return 'givenNames' in components && 'virtueNames' in components;
}

function isGoliathComponents(components: RaceComponents): components is GoliathComponents {
  return 'givenNames' in components && 'clanNames' in components;
}

function isAasimarComponents(components: RaceComponents): components is AasimarComponents {
  return 'givenNames' in components && 'virtueNames' in components;
}

function isTabaxiComponents(components: RaceComponents): components is TabaxiComponents {
  return 'givenNames' in components && 'clanNames' in components;
}

function isFirbolgComponents(components: RaceComponents): components is FirbolgComponents {
  return 'givenNames' in components && 'clanNames' in components;
}

function isKenkuComponents(components: RaceComponents): components is KenkuComponents {
  return 'givenNames' in components && 'clanNames' in components;
}

function isLizardfolkComponents(components: RaceComponents): components is LizardfolkComponents {
  return 'givenNames' in components && 'clanNames' in components;
}

function isTritonComponents(components: RaceComponents): components is TritonComponents {
  return 'givenNames' in components && 'clanNames' in components;
}

function isBugbearComponents(components: RaceComponents): components is BugbearComponents {
  return 'givenNames' in components && 'clanNames' in components;
}

function isGoblinComponents(components: RaceComponents): components is GoblinComponents {
  return 'givenNames' in components && 'clanNames' in components;
}

function isHobgoblinComponents(components: RaceComponents): components is HobgoblinComponents {
  return 'givenNames' in components && 'clanNames' in components;
}

function isKoboldComponents(components: RaceComponents): components is KoboldComponents {
  return 'givenNames' in components && 'clanNames' in components;
}

function isOrcComponents(components: RaceComponents): components is OrcComponents {
  return 'givenNames' in components && 'clanNames' in components;
}

function isYuanTiComponents(components: RaceComponents): components is YuanTiComponents {
  return 'givenNames' in components && 'clanNames' in components;
}

// Name components for each race based on official sources
const nameComponents: Record<string, RaceComponents> = {
  // Dragonborn names (PHB p.32)
  // Dragonborn have a personal name, a clan name, and possibly a nickname
  // Their names are typically short and harsh-sounding, with many hard consonants
  dragonborn: {
    // Personal names from PHB
    personalNames: {
      prefixes: [
        "Arj", "Bal", "Bhar", "Dona", "Fa", "Har", "Jher", "Kriv", "Med", "Nad",
        "Pand", "Pat", "Rhog", "Sham", "Shed", "Tar", "Tor", "Uka", "Vik"
      ],
      suffixes: [
        "aan", "aar", "ah", "al", "ar", "ash", "ax", "eh", "ek", "i", "ir",
        "ix", "oh", "or", "u", "uh", "ur", "us", "ux"
      ]
    },
    // Clan names from PHB
    clanNames: {
      prefixes: [
        "Cleth", "Daar", "Delm", "Dra", "Fen", "Kep", "Kerr", "Kim", "Lin", "Myar",
        "Nym", "Pand", "Pat", "Posh", "Shev", "Shul", "Thul", "Vere", "Vik", "Vos"
      ],
      suffixes: [
        "tinth", "tinth", "tinth", "tinth", "tinth", "tinth", "tinth", "tinth", "tinth", "tinth",
        "tinth", "tinth", "tinth", "tinth", "tinth", "tinth", "tinth", "tinth", "tinth", "tinth"
      ]
    }
  },

  // Dwarf names (PHB p.20)
  // Dwarves have a given name and a clan name
  // Their names are typically short and strong-sounding
  dwarf: {
    // Given names from PHB
    givenNames: {
      prefixes: [
        "Ad", "Al", "Bal", "Bar", "Bru", "Dal", "Dar", "Del", "Dol", "Dor",
        "Dun", "Dur", "Dwal", "Dwol", "Far", "Gar", "Gim", "Glo", "Gor", "Grim"
      ],
      suffixes: [
        "ain", "ak", "al", "an", "ar", "as", "ath", "ek", "el", "en",
        "er", "ik", "in", "ir", "or", "ur", "us"
      ]
    },
    // Clan names from PHB
    clanNames: {
      prefixes: [
        "Balder", "Battle", "Big", "Bronze", "Copper", "Diamond", "Fire", "Gold", "Iron", "Mithril",
        "Rock", "Silver", "Steel", "Stone", "Thunder", "Titan", "War", "Wind", "Winter", "Wolf"
      ],
      suffixes: [
        "axe", "beard", "belly", "bender", "breaker", "fist", "forge", "hammer", "heart", "helm",
        "hide", "maker", "mountain", "shield", "shoulder", "stone", "strider", "sword", "toe", "wind"
      ]
    }
  },

  // Elf names (PHB p.21)
  // Elves have a child name, an adult name, and a family name
  // Their names are typically long and melodic
  elf: {
    // Child names from PHB
    childNames: {
      prefixes: [
        "Ad", "Ara", "Ari", "Arw", "Bael", "Ber", "Car", "En", "Er", "Ere",
        "Gal", "Had", "Hei", "Hol", "Im", "Iva", "Lau", "Mia", "Pha", "Rau"
      ],
      suffixes: [
        "ael", "al", "an", "ar", "el", "en", "ian", "iel", "il", "in",
        "ion", "or", "us", "yn"
      ]
    },
    // Family names from PHB
    familyNames: {
      prefixes: [
        "Amakiir", "Amastacia", "Galanodel", "Holimion", "Ilphelkiir", "Liadon", "Meliamne", "Naïlo", "Siannodel", "Xiloscient"
      ],
      suffixes: [
        "Gemflower", "Starflower", "Moonwhisper", "Goldpetal", "Gemflower", "Silverfrond", "Oakenheel", "Brightwater", "Moonflower", "Stardancer"
      ]
    }
  },

  // Gnome names (PHB p.17)
  // Gnomes have a given name and a clan name
  // Their names are typically whimsical and playful
  gnome: {
    // Given names from PHB
    givenNames: {
      prefixes: [
        "Al", "Bim", "Bod", "Bri", "Cog", "Dib", "Dim", "Fim", "Fip", "Gim",
        "Glim", "Jeb", "Kell", "Nam", "Or", "Pip", "Quin", "Rim", "Sib", "Thim"
      ],
      suffixes: [
        "ble", "bob", "bop", "bottle", "buck", "diddle", "dip", "do", "doodle", "dum",
        "fiddle", "fip", "giggle", "gob", "gop", "ip", "ipop"
      ]
    },
    // Clan names from PHB
    clanNames: {
      prefixes: [
        "Beren", "Daergel", "Folkor", "Garrick", "Nackle", "Murnig", "Ningel", "Raulnor", "Scheppen", "Timbers"
      ],
      suffixes: [
        "Beren", "Daergel", "Folkor", "Garrick", "Nackle", "Murnig", "Ningel", "Raulnor", "Scheppen", "Timbers"
      ]
    }
  },

  // Half-Elf names (PHB p.38)
  // Half-elves use either human or elf naming conventions
  // They often have both a human name and an elf name
  halfElf: {
    // Elf-style names from PHB
    elfNames: {
      prefixes: [
        "Ad", "Ara", "Ari", "Arw", "Bael", "Ber", "Car", "En", "Er", "Ere",
        "Gal", "Had", "Hei", "Hol", "Im", "Iva", "Lau", "Mia", "Pha", "Rau"
      ],
      suffixes: [
        "ael", "al", "an", "ar", "el", "en", "ian", "iel", "il", "in",
        "ion", "or", "us", "yn"
      ]
    },
    // Human-style names from PHB
    humanNames: {
      prefixes: [
        "Bil", "Bod", "Bri", "Cog", "Dib", "Dim", "Fim", "Fip", "Gim", "Glim",
        "Jeb", "Kell", "Nam", "Or", "Pip", "Quin", "Rim", "Sib", "Thim"
      ],
      suffixes: [
        "ble", "bob", "bop", "bottle", "buck", "diddle", "dip", "do", "doodle", "dum",
        "fiddle", "fip", "giggle", "gob", "gop", "ip", "ipop"
      ]
    }
  },

  // Half-Orc names (PHB p.40)
  // Half-orcs have a given name and a clan name
  // Their names are typically short and harsh
  halfOrc: {
    // Given names from PHB
    givenNames: {
      prefixes: [
        "Den", "Fen", "Gell", "Hen", "Hol", "Ims", "Keth", "Krus", "Mhur", "Ront",
        "Sham", "Thokk"
      ],
      suffixes: [
        "a", "ak", "ar", "ash", "ek", "g", "ha", "ig", "ir", "k",
        "og", "ug", "uk", "ur"
      ]
    },
    // Clan names from PHB
    clanNames: {
      prefixes: [
        "Bone", "Death", "Doom", "Dragon", "Fang", "Fire", "Iron", "Skull", "Steel", "Stone"
      ],
      suffixes: [
        "breaker", "crusher", "eater", "killer", "ripper", "slayer", "splitter", "taker", "tamer", "walker"
      ]
    }
  },

  // Halfling names (PHB p.26)
  // Halflings have a given name and a family name
  // Their names are typically cheerful and simple
  halfling: {
    // Given names from PHB
    givenNames: {
      prefixes: [
        "Al", "Bil", "Bod", "Bri", "Cog", "Dib", "Dim", "Fim", "Fip", "Gim",
        "Glim", "Jeb", "Kell", "Nam", "Or", "Pip", "Quin", "Rim", "Sib", "Thim"
      ],
      suffixes: [
        "ble", "bob", "bop", "bottle", "buck", "diddle", "dip", "do", "doodle", "dum",
        "fiddle", "fip", "giggle", "gob", "gop", "ip", "ipop"
      ]
    },
    // Family names from PHB
    familyNames: {
      prefixes: [
        "Brush", "Good", "Green", "High", "Hill", "Lea", "Tea", "Thorngage", "Tosscobble", "Underbough"
      ],
      suffixes: [
        "gatherer", "barrel", "bottle", "hill", "topple", "leaf", "kettle", "apple", "cobble", "bough"
      ]
    }
  },

  // Human names (PHB p.29)
  // Humans have a given name and a family name
  // Their names vary by ethnicity
  human: {
    // Calashite names (PHB p.29)
  calashite: {
    prefixes: ["", "", "b", "bh", "f", "h", "j", "kh", "m", "n", "nh", "r", "rh", "s", "z"],
    vowels: ["a", "e", "u", "a", "e", "u", "a", "e", "u", "i", "ei"],
    consonants: ["b", "d", "hm", "hn", "hl", "kh", "l", "m", "rd", "r", "s", "sh", "z"],
      suffixes: ["d", "m", "n", "r"]
  },
    // Chondathan names (PHB p.29)
  chondathan: {
    prefixes: ["", "b", "br", "d", "g", "gr", "h", "m", "n", "r", "st", "t", "v"],
    vowels: ["a", "e", "i", "o", "u"],
    consonants: ["", "br", "cr", "gr", "kv", "kr", "l", "ll", "ld", "lv", "nd", "ng", "nk", "nv", "rd", "rg", "rk", "rst", "rv", "v"],
      suffixes: ["", "", "", "d", "dd", "g", "l", "lm", "m", "n", "r", "rk", "rn"]
  },
    // Damaran names (PHB p.29)
  damaran: {
    prefixes: ["", "", "b", "br", "f", "g", "gl", "gr", "h", "k", "m", "n", "p", "r", "s", "v"],
    vowels: ["a", "e", "i", "o"],
    consonants: ["b", "br", "d", "dr", "dg", "g", "gr", "r", "rg", "rd", "rv", "s", "v", "z"],
      suffixes: ["f", "l", "m", "n", "r"]
  },
    // Illuskan names (PHB p.29)
  illuskan: {
    prefixes: ["", "", "", "bl", "br", "fr", "g", "gr", "l", "m", "r", "st", "str", "t", "tr", "v", "z"],
    vowels: ["a", "e", "o", "u"],
    consonants: ["ck", "dr", "dv", "gr", "gn", "lc", "ld", "lv", "lb", "m", "nn", "nd", "nv", "rd", "rc", "rk", "rb"],
      suffixes: ["m", "n", "r", "rth", "th"]
  },
    // Mulan names (PHB p.29)
  mulan: {
    prefixes: ["b", "d", "g", "h", "j", "k", "l", "m", "n", "r", "s", "t", "th", "v", "z"],
    vowels: ["a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "io", "ao", "eo", "eu", "ue"],
    consonants: ["d-k", "d-v", "k-d", "k-v", "k-m", "k-r", "m-k", "m-z", "m-v", "n-v", "n-z", "n-d", "r-k", "r-v", "r-z", "t-k", "r-d", "h-k", "h-z", "-k", "-d", "-m", "-n", "-v", "-z", "-t", "-r", "ch", "d", "h", "hp", "hk", "hv", "j", "k", "m", "n", "r", "rh", "t", "th", "v", "z"],
      suffixes: ["", "", "d", "f", "h", "k", "n", "r", "s", "th", "z"]
    }
  },

  // Tiefling names (PHB p.42)
  // Tieflings have a given name and a virtue name
  // Their names are typically exotic and infernal-sounding
  tiefling: {
    // Given names from PHB
    givenNames: {
      prefixes: [
        "Ak", "Am", "Bar", "Dam", "Ek", "Iri", "Jal", "Kor", "Miz", "Pel",
        "Rad", "Ser", "Sev", "Sul", "Szor", "Tev", "Tham", "The", "Ves", "Zak"
      ],
      suffixes: [
        "ai", "ak", "an", "ar", "as", "ek", "el", "en", "er", "es",
        "ik", "in", "ir", "is", "or", "ur", "us"
      ]
    },
    // Virtue names from PHB
    virtueNames: {
      prefixes: [
        "Art", "Carr", "Chant", "Creed", "Desp", "Ex", "Fear", "Glory", "Hope", "Ideal",
        "Music", "Now", "Open", "Poetry", "Quest", "Re", "Rhythm", "Courage", "Doubt", "Flame"
      ],
      suffixes: [
        "istry", "ion", "ious", "ious", "ious", "ious", "ious", "ious", "ious", "ious",
        "ious", "ious", "ious", "ious", "ious", "ious", "ious", "ious", "ious", "ious"
      ]
    }
  },

  // Aasimar names (Volo's Guide to Monsters)
  aasimar: {
    givenNames: {
      prefixes: [
        "Ari", "Cel", "Dia", "Eli", "Gab", "Had", "Ion", "Jor", "Lor", "Mor",
        "Ori", "Phe", "Raz", "Ser", "Val", "Xan", "Yor", "Zor", "Aur", "Bel",
        "Cor", "Del", "Eos", "Fae", "Gla", "Hel", "Ira", "Jas", "Kor", "Lum",
        "Mik", "Nyx", "Ora", "Pax", "Qui", "Rex", "Sol", "Tyr", "Uri", "Vex",
        "Zen", "Yan", "Xer", "Wyn", "Vos", "Umi", "Tis", "Syl", "Ryn", "Qin"
      ],
      suffixes: [
        "ael", "iel", "iel", "iel", "iel", "iel", "iel", "iel", "iel", "iel",
        "iel", "iel", "iel", "iel", "iel", "iel", "iel", "iel", "iel", "iel",
        "iel", "iel", "iel", "iel", "iel", "iel", "iel", "iel", "iel", "iel",
        "iel", "iel", "iel", "iel", "iel", "iel", "iel", "iel", "iel", "iel"
      ]
    },
    virtueNames: {
      prefixes: [
        "Art", "Carr", "Chant", "Creed", "Desp", "Ex", "Fear", "Glory", "Hope", "Ideal",
        "Music", "Now", "Open", "Poetry", "Quest", "Re", "Rhythm", "Courage", "Doubt", "Flame",
        "Grace", "Honor", "Joy", "Kind", "Love", "Mercy", "Peace", "Pride", "Truth", "Virtue",
        "Wisdom", "Zeal", "Faith", "Glory", "Hope", "Joy", "Love", "Peace", "Pride", "Truth",
        "Beauty", "Charity", "Compassion", "Dignity", "Equality", "Freedom", "Harmony", "Integrity", "Justice", "Liberty",
        "Nobility", "Patience", "Purity", "Respect", "Reverence", "Sacred", "Serenity", "Sincerity", "Tranquility", "Unity"
      ],
      suffixes: [
        "istry", "ion", "ious", "ious", "ious", "ious", "ious", "ious", "ious", "ious",
        "ious", "ious", "ious", "ious", "ious", "ious", "ious", "ious", "ious", "ious",
        "ious", "ious", "ious", "ious", "ious", "ious", "ious", "ious", "ious", "ious",
        "ious", "ious", "ious", "ious", "ious", "ious", "ious", "ious", "ious", "ious",
        "ious", "ious", "ious", "ious", "ious", "ious", "ious", "ious", "ious", "ious"
      ]
    }
  },

  // Tabaxi names (Volo's Guide to Monsters)
  tabaxi: {
    givenNames: {
      prefixes: [
        "A", "Ba", "Da", "Fa", "Ga", "Ha", "Ja", "Ka", "La", "Ma",
        "Na", "Pa", "Ra", "Sa", "Ta", "Va", "Wa", "Ya", "Za", "Cha",
        "Sha", "Tha", "Zha", "Kha", "Mha", "Nha", "Pha", "Rha", "Sha", "Tha",
        "Kra", "Mra", "Nra", "Pra", "Sra", "Tra", "Vra", "Wra", "Yra", "Zra"
      ],
      suffixes: [
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh",
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh"
      ]
    },
    clanNames: {
      prefixes: [
        "Cloud", "Dark", "Dawn", "Dusk", "Ember", "Flame", "Frost", "Haze", "Mist", "Night",
        "Rain", "River", "Shadow", "Sky", "Star", "Storm", "Sun", "Thunder", "Wind", "Winter",
        "Autumn", "Blaze", "Breeze", "Crystal", "Dawn", "Dusk", "Echo", "Frost", "Glade", "Haze",
        "Mist", "Moon", "Night", "Rain", "River", "Shadow", "Sky", "Star", "Storm", "Wind",
        "Aurora", "Blizzard", "Cyclone", "Deluge", "Eclipse", "Firestorm", "Glacier", "Hurricane", "Inferno", "Jupiter",
        "Kaleidoscope", "Lightning", "Meteor", "Nebula", "Ozone", "Phantom", "Quasar", "Radiant", "Supernova", "Tempest"
      ],
      suffixes: [
        "claw", "eye", "fang", "fur", "heart", "hide", "pelt", "scale", "skin", "tail",
        "tooth", "whisker", "wing", "paw", "mane", "ear", "nose", "cheek", "brow", "chin",
        "shoulder", "chest", "back", "leg", "foot", "hand", "arm", "neck", "head", "face",
        "jaw", "lip", "tongue", "throat", "belly", "hip", "knee", "ankle", "wrist", "elbow"
      ]
    }
  },

  // Goliath names (Elemental Evil Player's Companion)
  // Goliaths have a given name and a clan name
  // Their names are typically short and strong-sounding
  goliath: {
    // Given names from EEPC
    givenNames: {
      prefixes: [
        "A", "E", "Ga", "Ge", "Gi", "Go", "Gu", "I", "Ka", "Ke",
        "Ki", "Ko", "Ku", "Ma", "Me", "Mi", "Mo", "Mu", "Na", "Ne",
        "Ni", "No", "Nu", "O", "Pa", "Pe", "Pi", "Po", "Pu", "Ra",
        "Re", "Ri", "Ro", "Ru", "Sa", "Se", "Si", "So", "Su", "Ta",
        "Te", "Ti", "To", "Tu", "U", "Va", "Ve", "Vi", "Vo", "Vu"
      ],
      suffixes: [
        "ga", "ge", "gi", "go", "gu", "ka", "ke", "ki", "ko", "ku",
        "ma", "me", "mi", "mo", "mu", "na", "ne", "ni", "no", "nu",
        "pa", "pe", "pi", "po", "pu", "ra", "re", "ri", "ro", "ru",
        "sa", "se", "si", "so", "su", "ta", "te", "ti", "to", "tu",
        "va", "ve", "vi", "vo", "vu"
      ]
    },
    // Clan names from EEPC
    clanNames: {
      prefixes: [
        "Anak", "Eglath", "Gan", "Gath", "Gog", "Gorg", "Goth", "Grog", "Grom", "Grum",
        "Guth", "Keg", "Kig", "Kog", "Kug", "Mag", "Mog", "Mug", "Nag", "Nog",
        "Nug", "Pag", "Pog", "Pug", "Rag", "Rog", "Rug", "Sag", "Sog", "Sug",
        "Tag", "Tog", "Tug", "Vag", "Vog", "Vug"
      ],
      suffixes: [
        "anak", "eglath", "gan", "gath", "gog", "gorg", "goth", "grog", "grom", "grum",
        "guth", "keg", "kig", "kog", "kug", "mag", "mog", "mug", "nag", "nog",
        "nug", "pag", "pog", "pug", "rag", "rog", "rug", "sag", "sog", "sug",
        "tag", "tog", "tug", "vag", "vog", "vug"
      ]
    }
  },

  // Firbolg names (Volo's Guide to Monsters)
  firbolg: {
    givenNames: {
      prefixes: [
        "A", "E", "I", "O", "U", "Ae", "Ai", "Ao", "Au", "Ea",
        "Ei", "Eo", "Eu", "Ia", "Ie", "Io", "Iu", "Oa", "Oe", "Oi",
        "Oo", "Ou", "Ua", "Ue", "Ui", "Uo", "Uu", "Y", "Ya", "Ye",
        "Ba", "Be", "Bi", "Bo", "Bu", "Ca", "Ce", "Ci", "Co", "Cu",
        "Da", "De", "Di", "Do", "Du", "Fa", "Fe", "Fi", "Fo", "Fu"
      ],
      suffixes: [
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh",
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh"
      ]
    },
    clanNames: {
      prefixes: [
        "Bear", "Boar", "Deer", "Eagle", "Elk", "Fox", "Hawk", "Lion", "Lynx", "Moose",
        "Owl", "Puma", "Stag", "Tiger", "Wolf", "Bear", "Boar", "Deer", "Eagle", "Elk",
        "Fox", "Hawk", "Lion", "Lynx", "Moose", "Owl", "Puma", "Stag", "Tiger", "Wolf",
        "Badger", "Beaver", "Bison", "Coyote", "Crane", "Dolphin", "Dragon", "Falcon", "Hare", "Horse",
        "Lark", "Otter", "Pheasant", "Rabbit", "Raven", "Salmon", "Seal", "Shark", "Swan", "Whale"
      ],
      suffixes: [
        "claw", "eye", "fang", "fur", "heart", "hide", "pelt", "scale", "skin", "tail",
        "tooth", "whisker", "wing", "claw", "eye", "fang", "fur", "heart", "hide", "pelt",
        "claw", "eye", "fang", "fur", "heart", "hide", "pelt", "scale", "skin", "tail",
        "beak", "fin", "flipper", "hoof", "horn", "mane", "paw", "shell", "snout", "tusk"
      ]
    }
  },

  // Kenku names (Volo's Guide to Monsters)
  kenku: {
    givenNames: {
      prefixes: [
        "A", "E", "I", "O", "U", "Ae", "Ai", "Ao", "Au", "Ea",
        "Ei", "Eo", "Eu", "Ia", "Ie", "Io", "Iu", "Oa", "Oe", "Oi",
        "Oo", "Ou", "Ua", "Ue", "Ui", "Uo", "Uu", "Y", "Ya", "Ye",
        "Ba", "Be", "Bi", "Bo", "Bu", "Ca", "Ce", "Ci", "Co", "Cu",
        "Da", "De", "Di", "Do", "Du", "Fa", "Fe", "Fi", "Fo", "Fu"
      ],
      suffixes: [
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh",
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh"
      ]
    },
    clanNames: {
      prefixes: [
        "Black", "Blue", "Brown", "Gray", "Green", "Red", "White", "Yellow", "Black", "Blue",
        "Brown", "Gray", "Green", "Red", "White", "Yellow", "Black", "Blue", "Brown", "Gray",
        "Green", "Red", "White", "Yellow", "Black", "Blue", "Brown", "Gray", "Green", "Red",
        "Amber", "Azure", "Bronze", "Crimson", "Ebony", "Gold", "Indigo", "Ivory", "Maroon", "Navy",
        "Orange", "Pink", "Purple", "Ruby", "Silver", "Teal", "Turquoise", "Violet", "Wine", "Zinc"
      ],
      suffixes: [
        "feather", "wing", "beak", "claw", "eye", "tail", "feather", "wing", "beak", "claw",
        "eye", "tail", "feather", "wing", "beak", "claw", "eye", "tail", "feather", "wing",
        "beak", "claw", "eye", "tail", "feather", "wing", "beak", "claw", "eye", "tail",
        "crest", "down", "plume", "quill", "talon", "wingtip", "flight", "soar", "glide", "swoop"
      ]
    }
  },

  // Lizardfolk names (Volo's Guide to Monsters)
  lizardfolk: {
    givenNames: {
      prefixes: [
        "A", "E", "I", "O", "U", "Ae", "Ai", "Ao", "Au", "Ea",
        "Ei", "Eo", "Eu", "Ia", "Ie", "Io", "Iu", "Oa", "Oe", "Oi",
        "Oo", "Ou", "Ua", "Ue", "Ui", "Uo", "Uu", "Y", "Ya", "Ye",
        "Ba", "Be", "Bi", "Bo", "Bu", "Ca", "Ce", "Ci", "Co", "Cu",
        "Da", "De", "Di", "Do", "Du", "Fa", "Fe", "Fi", "Fo", "Fu"
      ],
      suffixes: [
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh",
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh"
      ]
    },
    clanNames: {
      prefixes: [
        "Black", "Blue", "Brown", "Gray", "Green", "Red", "White", "Yellow", "Black", "Blue",
        "Brown", "Gray", "Green", "Red", "White", "Yellow", "Black", "Blue", "Brown", "Gray",
        "Green", "Red", "White", "Yellow", "Black", "Blue", "Brown", "Gray", "Green", "Red",
        "Amber", "Azure", "Bronze", "Crimson", "Ebony", "Gold", "Indigo", "Ivory", "Maroon", "Navy",
        "Orange", "Pink", "Purple", "Ruby", "Silver", "Teal", "Turquoise", "Violet", "Wine", "Zinc"
      ],
      suffixes: [
        "scale", "hide", "claw", "fang", "eye", "scale", "hide", "claw", "fang", "eye",
        "scale", "hide", "claw", "fang", "eye", "scale", "hide", "claw", "fang", "eye",
        "scale", "hide", "claw", "fang", "eye", "scale", "hide", "claw", "fang", "eye",
        "frill", "horn", "spike", "tail", "tooth", "venom", "spine", "ridge", "plate", "armor"
      ]
    }
  },

  // Triton names (Volo's Guide to Monsters)
  triton: {
    givenNames: {
      prefixes: [
        "A", "E", "I", "O", "U", "Ae", "Ai", "Ao", "Au", "Ea",
        "Ei", "Eo", "Eu", "Ia", "Ie", "Io", "Iu", "Oa", "Oe", "Oi",
        "Oo", "Ou", "Ua", "Ue", "Ui", "Uo", "Uu", "Y", "Ya", "Ye",
        "Ba", "Be", "Bi", "Bo", "Bu", "Ca", "Ce", "Ci", "Co", "Cu",
        "Da", "De", "Di", "Do", "Du", "Fa", "Fe", "Fi", "Fo", "Fu"
      ],
      suffixes: [
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh",
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh"
      ]
    },
    clanNames: {
      prefixes: [
        "Coral", "Pearl", "Shell", "Wave", "Tide", "Ocean", "Sea", "Deep", "Blue", "Green",
        "Silver", "Gold", "Bronze", "Copper", "Iron", "Steel", "Coral", "Pearl", "Shell", "Wave",
        "Tide", "Ocean", "Sea", "Deep", "Blue", "Green", "Silver", "Gold", "Bronze", "Copper",
        "Abyss", "Current", "Depths", "Fathom", "Gulf", "Harbor", "Lagoon", "Marine", "Reef", "Shoal",
        "Strait", "Surf", "Swirl", "Trench", "Undertow", "Vortex", "Whirlpool", "Waters", "Waves", "Wells"
      ],
      suffixes: [
        "shell", "scale", "fin", "tail", "eye", "shell", "scale", "fin", "tail", "eye",
        "shell", "scale", "fin", "tail", "eye", "shell", "scale", "fin", "tail", "eye",
        "shell", "scale", "fin", "tail", "eye", "shell", "scale", "fin", "tail", "eye",
        "crest", "gill", "spine", "stream", "surge", "swell", "tide", "torrent", "wave", "whirl"
      ]
    }
  },

  // Bugbear names (Volo's Guide to Monsters)
  bugbear: {
    givenNames: {
      prefixes: [
        "A", "E", "I", "O", "U", "Ae", "Ai", "Ao", "Au", "Ea",
        "Ei", "Eo", "Eu", "Ia", "Ie", "Io", "Iu", "Oa", "Oe", "Oi",
        "Oo", "Ou", "Ua", "Ue", "Ui", "Uo", "Uu", "Y", "Ya", "Ye",
        "Ba", "Be", "Bi", "Bo", "Bu", "Ca", "Ce", "Ci", "Co", "Cu",
        "Da", "De", "Di", "Do", "Du", "Fa", "Fe", "Fi", "Fo", "Fu"
      ],
      suffixes: [
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh",
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh"
      ]
    },
    clanNames: {
      prefixes: [
        "Black", "Blue", "Brown", "Gray", "Green", "Red", "White", "Yellow", "Black", "Blue",
        "Brown", "Gray", "Green", "Red", "White", "Yellow", "Black", "Blue", "Brown", "Gray",
        "Green", "Red", "White", "Yellow", "Black", "Blue", "Brown", "Gray", "Green", "Red",
        "Amber", "Azure", "Bronze", "Crimson", "Ebony", "Gold", "Indigo", "Ivory", "Maroon", "Navy",
        "Orange", "Pink", "Purple", "Ruby", "Silver", "Teal", "Turquoise", "Violet", "Wine", "Zinc"
      ],
      suffixes: [
        "claw", "fang", "hide", "skin", "eye", "claw", "fang", "hide", "skin", "eye",
        "claw", "fang", "hide", "skin", "eye", "claw", "fang", "hide", "skin", "eye",
        "claw", "fang", "hide", "skin", "eye", "claw", "fang", "hide", "skin", "eye",
        "arm", "back", "chest", "hand", "head", "leg", "neck", "shoulder", "throat", "wrist"
      ]
    }
  },

  // Goblin names (Volo's Guide to Monsters)
  goblin: {
    givenNames: {
      prefixes: [
        "A", "E", "I", "O", "U", "Ae", "Ai", "Ao", "Au", "Ea",
        "Ei", "Eo", "Eu", "Ia", "Ie", "Io", "Iu", "Oa", "Oe", "Oi",
        "Oo", "Ou", "Ua", "Ue", "Ui", "Uo", "Uu", "Y", "Ya", "Ye",
        "Ba", "Be", "Bi", "Bo", "Bu", "Ca", "Ce", "Ci", "Co", "Cu",
        "Da", "De", "Di", "Do", "Du", "Fa", "Fe", "Fi", "Fo", "Fu"
      ],
      suffixes: [
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh",
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh"
      ]
    },
    clanNames: {
      prefixes: [
        "Black", "Blue", "Brown", "Gray", "Green", "Red", "White", "Yellow", "Black", "Blue",
        "Brown", "Gray", "Green", "Red", "White", "Yellow", "Black", "Blue", "Brown", "Gray",
        "Green", "Red", "White", "Yellow", "Black", "Blue", "Brown", "Gray", "Green", "Red",
        "Amber", "Azure", "Bronze", "Crimson", "Ebony", "Gold", "Indigo", "Ivory", "Maroon", "Navy",
        "Orange", "Pink", "Purple", "Ruby", "Silver", "Teal", "Turquoise", "Violet", "Wine", "Zinc"
      ],
      suffixes: [
        "ear", "eye", "nose", "tooth", "ear", "eye", "nose", "tooth", "ear", "eye",
        "nose", "tooth", "ear", "eye", "nose", "tooth", "ear", "eye", "nose", "tooth",
        "ear", "eye", "nose", "tooth", "ear", "eye", "nose", "tooth", "ear", "eye",
        "arm", "back", "chest", "hand", "head", "leg", "neck", "shoulder", "throat", "wrist"
      ]
    }
  },

  // Hobgoblin names (Volo's Guide to Monsters)
  hobgoblin: {
    givenNames: {
      prefixes: [
        "A", "E", "I", "O", "U", "Ae", "Ai", "Ao", "Au", "Ea",
        "Ei", "Eo", "Eu", "Ia", "Ie", "Io", "Iu", "Oa", "Oe", "Oi",
        "Oo", "Ou", "Ua", "Ue", "Ui", "Uo", "Uu", "Y", "Ya", "Ye",
        "Ba", "Be", "Bi", "Bo", "Bu", "Ca", "Ce", "Ci", "Co", "Cu",
        "Da", "De", "Di", "Do", "Du", "Fa", "Fe", "Fi", "Fo", "Fu"
      ],
      suffixes: [
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh",
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh"
      ]
    },
    clanNames: {
      prefixes: [
        "Black", "Blue", "Brown", "Gray", "Green", "Red", "White", "Yellow", "Black", "Blue",
        "Brown", "Gray", "Green", "Red", "White", "Yellow", "Black", "Blue", "Brown", "Gray",
        "Green", "Red", "White", "Yellow", "Black", "Blue", "Brown", "Gray", "Green", "Red",
        "Amber", "Azure", "Bronze", "Crimson", "Ebony", "Gold", "Indigo", "Ivory", "Maroon", "Navy",
        "Orange", "Pink", "Purple", "Ruby", "Silver", "Teal", "Turquoise", "Violet", "Wine", "Zinc"
      ],
      suffixes: [
        "ear", "eye", "nose", "tooth", "ear", "eye", "nose", "tooth", "ear", "eye",
        "nose", "tooth", "ear", "eye", "nose", "tooth", "ear", "eye", "nose", "tooth",
        "ear", "eye", "nose", "tooth", "ear", "eye", "nose", "tooth", "ear", "eye",
        "arm", "back", "chest", "hand", "head", "leg", "neck", "shoulder", "throat", "wrist"
      ]
    }
  },

  // Kobold names (Volo's Guide to Monsters)
  kobold: {
    givenNames: {
      prefixes: [
        "A", "E", "I", "O", "U", "Ae", "Ai", "Ao", "Au", "Ea",
        "Ei", "Eo", "Eu", "Ia", "Ie", "Io", "Iu", "Oa", "Oe", "Oi",
        "Oo", "Ou", "Ua", "Ue", "Ui", "Uo", "Uu", "Y", "Ya", "Ye",
        "Ba", "Be", "Bi", "Bo", "Bu", "Ca", "Ce", "Ci", "Co", "Cu",
        "Da", "De", "Di", "Do", "Du", "Fa", "Fe", "Fi", "Fo", "Fu"
      ],
      suffixes: [
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh",
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh",
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu"
      ]
    },
    clanNames: {
      prefixes: [
        "Black", "Blue", "Brown", "Gray", "Green", "Red", "White", "Yellow", "Black", "Blue",
        "Brown", "Gray", "Green", "Red", "White", "Yellow", "Black", "Blue", "Brown", "Gray",
        "Green", "Red", "White", "Yellow", "Black", "Blue", "Brown", "Gray", "Green", "Red"
      ],
      suffixes: [
        "claw", "fang", "hide", "skin", "eye", "claw", "fang", "hide", "skin", "eye",
        "claw", "fang", "hide", "skin", "eye", "claw", "fang", "hide", "skin", "eye",
        "claw", "fang", "hide", "skin", "eye", "claw", "fang", "hide", "skin", "eye"
      ]
    }
  },

  // Yuan-ti names (Volo's Guide to Monsters)
  yuanTi: {
    givenNames: {
      prefixes: [
        "A", "E", "I", "O", "U", "Ae", "Ai", "Ao", "Au", "Ea",
        "Ei", "Eo", "Eu", "Ia", "Ie", "Io", "Iu", "Oa", "Oe", "Oi",
        "Oo", "Ou", "Ua", "Ue", "Ui", "Uo", "Uu", "Y", "Ya", "Ye"
      ],
      suffixes: [
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu",
        "ah", "eh", "ih", "oh", "uh", "aah", "eeh", "iih", "ooh", "uuh",
        "a", "e", "i", "o", "u", "aa", "ee", "ii", "oo", "uu"
      ]
    },
    clanNames: {
      prefixes: [
        "Black", "Blue", "Brown", "Gray", "Green", "Red", "White", "Yellow", "Black", "Blue",
        "Brown", "Gray", "Green", "Red", "White", "Yellow", "Black", "Blue", "Brown", "Gray",
        "Green", "Red", "White", "Yellow", "Black", "Blue", "Brown", "Gray", "Green", "Red"
      ],
      suffixes: [
        "scale", "hide", "claw", "fang", "eye", "scale", "hide", "claw", "fang", "eye",
        "scale", "hide", "claw", "fang", "eye", "scale", "hide", "claw", "fang", "eye",
        "scale", "hide", "claw", "fang", "eye", "scale", "hide", "claw", "fang", "eye"
      ]
    }
  }
};

// Surnames for humans (PHB p.29)
const humanSurnames = {
  prefixes: [
    "Axe", "Glow", "Blade", "Blood", "Bone", "Cloud", "Crag", "Crest", "Doom", "Dream",
    "Coven", "Elf", "Fern", "Feather", "Fire", "Fist", "Flame", "Forest", "Hammer", "Heart",
    "Hell", "Leaf", "Light", "Moon", "Rage", "River", "Rock", "Shade", "Shadow", "Shield",
    "Snow", "Spirit", "Star", "Steel", "Stone", "Swift", "Tree", "Whisper", "Wind", "Wolf"
  ],
  suffixes: [
    "axe", "glow", "beam", "blade", "blood", "bone", "cloud", "dane", "crag", "crest",
    "doom", "dream", "feather", "fire", "fist", "flame", "forest", "hammer", "heart", "hell",
    "leaf", "light", "moon", "rage", "river", "rock", "shade", "claw", "shadow", "shield",
    "snow", "spirit", "star", "steel", "stone", "swift", "tree", "whisper", "wind", "wolf"
  ]
};

// Generate a human name with ethnic variation
function generateHumanName(ethnicity: keyof HumanComponents, gender: 'male' | 'female' = 'male'): string {
  const components = (nameComponents.human as HumanComponents)[ethnicity];
  
  // Generate first name
  let firstName = '';
  const prefix = getRandomElement(components.prefixes);
  const vowel = getRandomElement(components.vowels);
  const consonant = getRandomElement(components.consonants);
  const suffix = getRandomElement(components.suffixes);
  
  // Add gender-specific suffix for female names
  if (gender === 'female') {
    firstName = prefix + vowel + consonant + vowel + suffix + 'a';
  } else {
    firstName = prefix + vowel + consonant + vowel + suffix;
  }
  
  // Generate surname
  const surnamePrefix = getRandomElement(humanSurnames.prefixes);
  const surnameSuffix = getRandomElement(humanSurnames.suffixes);
  const surname = surnamePrefix + surnameSuffix;
  
  return `${capitalize(firstName)} ${capitalize(surname)}`;
}

// Main function to generate a name
export function generateName(race: string, gender?: 'male' | 'female'): string {
  // Normalize race name by converting hyphens to camelCase
  const raceLower = race.toLowerCase().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  
  // Handle human ethnic variations
  if (raceLower === 'human') {
    const ethnicities = Object.keys(nameComponents.human) as Array<keyof HumanComponents>;
    const ethnicity = getRandomElement(ethnicities);
    return generateHumanName(ethnicity, gender);
  }
  
  // Handle other races
  return generateRaceName(raceLower);
}

// Map race names to their component keys
const raceKeyMap: Record<string, keyof typeof nameComponents> = {
  'halfelf': 'halfElf',
  'half-elf': 'halfElf',
  'half elf': 'halfElf',
  'halforc': 'halfOrc',
  'half-orc': 'halfOrc',
  'half orc': 'halfOrc',
  'dragonborn': 'dragonborn',
  'dwarf': 'dwarf',
  'elf': 'elf',
  'gnome': 'gnome',
  'halfling': 'halfling',
  'tiefling': 'tiefling',
  'goliath': 'goliath',
  'aasimar': 'aasimar',
  'tabaxi': 'tabaxi',
  'firbolg': 'firbolg',
  'kenku': 'kenku',
  'lizardfolk': 'lizardfolk',
  'triton': 'triton',
  'bugbear': 'bugbear',
  'goblin': 'goblin',
  'hobgoblin': 'hobgoblin',
  'kobold': 'kobold',
  'orc': 'orc',
  'yuan-ti': 'yuanTi',
  'yuan ti': 'yuanTi',
  'yuantiti': 'yuanTi'
};

// Generate a name for a specific race
function generateRaceName(race: string): string {
  const raceKey = raceKeyMap[race.toLowerCase()] || race.toLowerCase();
  const components = nameComponents[raceKey];
  
  if (!components) {
    throw new Error(`Unsupported race: ${race}`);
  }

  let firstName = '';
  let familyName = '';

  if (isDragonbornComponents(components)) {
    // Dragonborn have personal names and clan names
    const personalPrefix = getRandomElement(components.personalNames.prefixes);
    const personalSuffix = getRandomElement(components.personalNames.suffixes);
    firstName = personalPrefix + personalSuffix;
    
    const clanPrefix = getRandomElement(components.clanNames.prefixes);
    const clanSuffix = getRandomElement(components.clanNames.suffixes);
    familyName = clanPrefix + clanSuffix;
  } else if (isDwarfComponents(components)) {
    // Dwarves have given names and clan names
    const givenPrefix = getRandomElement(components.givenNames.prefixes);
    const givenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = givenPrefix + givenSuffix;
    
    const dwarfClanPrefix = getRandomElement(components.clanNames.prefixes);
    const dwarfClanSuffix = getRandomElement(components.clanNames.suffixes);
    familyName = dwarfClanPrefix + dwarfClanSuffix;
  } else if (isElfComponents(components)) {
    // Elves have child names and family names
    const childPrefix = getRandomElement(components.childNames.prefixes);
    const childSuffix = getRandomElement(components.childNames.suffixes);
    firstName = childPrefix + childSuffix;
    
    const familyPrefix = getRandomElement(components.familyNames.prefixes);
    const familySuffix = getRandomElement(components.familyNames.suffixes);
    familyName = familyPrefix + familySuffix;
  } else if (isGnomeComponents(components)) {
    // Gnomes have given names and clan names
    const gnomeGivenPrefix = getRandomElement(components.givenNames.prefixes);
    const gnomeGivenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = gnomeGivenPrefix + gnomeGivenSuffix;
    
    const gnomeClanPrefix = getRandomElement(components.clanNames.prefixes);
    const gnomeClanSuffix = getRandomElement(components.clanNames.suffixes);
    familyName = gnomeClanPrefix + gnomeClanSuffix;
  } else if (isHalfElfComponents(components)) {
    // Half-elves can use either elf or human naming conventions
    if (Math.random() < 0.5) {
      // Use elf-style name
      const elfPrefix = getRandomElement(components.elfNames.prefixes);
      const elfSuffix = getRandomElement(components.elfNames.suffixes);
      firstName = elfPrefix + elfSuffix;
    } else {
      // Use human-style name
      const humanPrefix = getRandomElement(components.humanNames.prefixes);
      const humanSuffix = getRandomElement(components.humanNames.suffixes);
      firstName = humanPrefix + humanSuffix;
    }
    // Use a human surname
    const halfElfSurnamePrefix = getRandomElement(humanSurnames.prefixes);
    const halfElfSurnameSuffix = getRandomElement(humanSurnames.suffixes);
    familyName = halfElfSurnamePrefix + halfElfSurnameSuffix;
  } else if (isHalfOrcComponents(components)) {
    // Half-orcs have given names and clan names
    const orcGivenPrefix = getRandomElement(components.givenNames.prefixes);
    const orcGivenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = orcGivenPrefix + orcGivenSuffix;
    
    const orcClanPrefix = getRandomElement(components.clanNames.prefixes);
    const orcClanSuffix = getRandomElement(components.clanNames.suffixes);
    familyName = orcClanPrefix + orcClanSuffix;
  } else if (isHalflingComponents(components)) {
    // Halflings have given names and family names
    const halflingGivenPrefix = getRandomElement(components.givenNames.prefixes);
    const halflingGivenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = halflingGivenPrefix + halflingGivenSuffix;
    
    const halflingFamilyPrefix = getRandomElement(components.familyNames.prefixes);
    const halflingFamilySuffix = getRandomElement(components.familyNames.suffixes);
    familyName = halflingFamilyPrefix + halflingFamilySuffix;
  } else if (isTieflingComponents(components)) {
    // Tieflings have given names and virtue names
    const tieflingGivenPrefix = getRandomElement(components.givenNames.prefixes);
    const tieflingGivenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = tieflingGivenPrefix + tieflingGivenSuffix;
    
    const virtuePrefix = getRandomElement(components.virtueNames.prefixes);
    const virtueSuffix = getRandomElement(components.virtueNames.suffixes);
    familyName = virtuePrefix + virtueSuffix;
  } else if (isGoliathComponents(components)) {
    // Goliaths have given names and clan names
    const givenPrefix = getRandomElement(components.givenNames.prefixes);
    const givenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = givenPrefix + givenSuffix;
    
    const clanPrefix = getRandomElement(components.clanNames.prefixes);
    const clanSuffix = getRandomElement(components.clanNames.suffixes);
    familyName = clanPrefix + clanSuffix;
  } else if (isAasimarComponents(components)) {
    // Aasimar have given names and virtue names
    const givenPrefix = getRandomElement(components.givenNames.prefixes);
    const givenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = givenPrefix + givenSuffix;
    
    const virtuePrefix = getRandomElement(components.virtueNames.prefixes);
    const virtueSuffix = getRandomElement(components.virtueNames.suffixes);
    familyName = virtuePrefix + virtueSuffix;
  } else if (isTabaxiComponents(components)) {
    // Tabaxi have given names and clan names
    const givenPrefix = getRandomElement(components.givenNames.prefixes);
    const givenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = givenPrefix + givenSuffix;
    
    const clanPrefix = getRandomElement(components.clanNames.prefixes);
    const clanSuffix = getRandomElement(components.clanNames.suffixes);
    familyName = clanPrefix + clanSuffix;
  } else if (isFirbolgComponents(components)) {
    const givenPrefix = getRandomElement(components.givenNames.prefixes);
    const givenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = givenPrefix + givenSuffix;
    
    const clanPrefix = getRandomElement(components.clanNames.prefixes);
    const clanSuffix = getRandomElement(components.clanNames.suffixes);
    familyName = clanPrefix + clanSuffix;
  } else if (isKenkuComponents(components)) {
    const givenPrefix = getRandomElement(components.givenNames.prefixes);
    const givenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = givenPrefix + givenSuffix;
    
    const clanPrefix = getRandomElement(components.clanNames.prefixes);
    const clanSuffix = getRandomElement(components.clanNames.suffixes);
    familyName = clanPrefix + clanSuffix;
  } else if (isLizardfolkComponents(components)) {
    const givenPrefix = getRandomElement(components.givenNames.prefixes);
    const givenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = givenPrefix + givenSuffix;
    
    const clanPrefix = getRandomElement(components.clanNames.prefixes);
    const clanSuffix = getRandomElement(components.clanNames.suffixes);
    familyName = clanPrefix + clanSuffix;
  } else if (isTritonComponents(components)) {
    const givenPrefix = getRandomElement(components.givenNames.prefixes);
    const givenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = givenPrefix + givenSuffix;
    
    const clanPrefix = getRandomElement(components.clanNames.prefixes);
    const clanSuffix = getRandomElement(components.clanNames.suffixes);
    familyName = clanPrefix + clanSuffix;
  } else if (isBugbearComponents(components)) {
    const givenPrefix = getRandomElement(components.givenNames.prefixes);
    const givenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = givenPrefix + givenSuffix;
    
    const clanPrefix = getRandomElement(components.clanNames.prefixes);
    const clanSuffix = getRandomElement(components.clanNames.suffixes);
    familyName = clanPrefix + clanSuffix;
  } else if (isGoblinComponents(components)) {
    const givenPrefix = getRandomElement(components.givenNames.prefixes);
    const givenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = givenPrefix + givenSuffix;
    
    const clanPrefix = getRandomElement(components.clanNames.prefixes);
    const clanSuffix = getRandomElement(components.clanNames.suffixes);
    familyName = clanPrefix + clanSuffix;
  } else if (isHobgoblinComponents(components)) {
    const givenPrefix = getRandomElement(components.givenNames.prefixes);
    const givenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = givenPrefix + givenSuffix;
    
    const clanPrefix = getRandomElement(components.clanNames.prefixes);
    const clanSuffix = getRandomElement(components.clanNames.suffixes);
    familyName = clanPrefix + clanSuffix;
  } else if (isKoboldComponents(components)) {
    const givenPrefix = getRandomElement(components.givenNames.prefixes);
    const givenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = givenPrefix + givenSuffix;
    
    const clanPrefix = getRandomElement(components.clanNames.prefixes);
    const clanSuffix = getRandomElement(components.clanNames.suffixes);
    familyName = clanPrefix + clanSuffix;
  } else if (isOrcComponents(components)) {
    const givenPrefix = getRandomElement(components.givenNames.prefixes);
    const givenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = givenPrefix + givenSuffix;
    
    const clanPrefix = getRandomElement(components.clanNames.prefixes);
    const clanSuffix = getRandomElement(components.clanNames.suffixes);
    familyName = clanPrefix + clanSuffix;
  } else if (isYuanTiComponents(components)) {
    const givenPrefix = getRandomElement(components.givenNames.prefixes);
    const givenSuffix = getRandomElement(components.givenNames.suffixes);
    firstName = givenPrefix + givenSuffix;
    
    const clanPrefix = getRandomElement(components.clanNames.prefixes);
    const clanSuffix = getRandomElement(components.clanNames.suffixes);
    familyName = clanPrefix + clanSuffix;
  } else {
    throw new Error(`Unsupported race: ${race}`);
  }

  return `${capitalize(firstName)} ${capitalize(familyName)}`;
}

// Export example names from PHB for testing
export const exampleNames = {
  dragonborn: [
    "Arjhan Kimbatuul",
    "Balasar Shedinn",
    "Donaar Kepeshkmolik",
    "Ghesh Tiamat",
    "Heskan Kethend",
    "Kriv Medrash",
    "Medrash Tiamat",
    "Mehen Tiamat",
    "Nadarr Kethend",
    "Pandjed Medrash"
  ],
  dwarf: [
    "Adrik Alagarsgran",
    "Alberich Battlehammer",
    "Baern Ironfist",
    "Barendd Bronzebeard",
    "Brottor Battleaxe",
    "Bruenor Battlehammer",
    "Dain Ironfoot",
    "Darrak Fireforge",
    "Delg Stonefist",
    "Eberk Ironfist"
  ],
  elf: [
    "Adran Amakiir",
    "Aelar Amastacia",
    "Aramil Galanodel",
    "Arannis Holimion",
    "Aust Ilphelkiir",
    "Bryn Liadon",
    "Carric Meliamne",
    "Enialis Naïlo",
    "Erdan Siannodel",
    "Erevan Xiloscient"
  ],
  gnome: [
    "Alston Timbers",
    "Alvyn Boddynock",
    "Boddynock Timbers",
    "Brocc Boddynock",
    "Burgell Timbers",
    "Caramip Boddynock",
    "Chip Boddynock",
    "Daffyd Timbers",
    "Donella Boddynock",
    "Duvamil Timbers"
  ],
  halfElf: [
    "Adran Amakiir",
    "Aelar Amastacia",
    "Aramil Galanodel",
    "Arannis Holimion",
    "Aust Ilphelkiir",
    "Bryn Liadon",
    "Carric Meliamne",
    "Enialis Naïlo",
    "Erdan Siannodel",
    "Erevan Xiloscient"
  ],
  halfOrc: [
    "Dench Bonebreaker",
    "Feng Deathwalker",
    "Gell Flamefist",
    "Henk Ironfist",
    "Holg Skullsplitter",
    "Imsh Bonecrusher",
    "Keth Skulltaker",
    "Krusk Ironfist",
    "Mhur Skullcrusher",
    "Ront Skullsplitter"
  ],
  halfling: [
    "Alton Goodbarrel",
    "Ander Goodhill",
    "Cade Goodleaf",
    "Corrin Goodkettle",
    "Eldon Goodapple",
    "Errich Goodleaf",
    "Finnan Goodkettle",
    "Garret Goodapple",
    "Lindal Goodbough",
    "Lyle Goodbough"
  ],
  human: [
    "Aseir Amblecrown",
    "Bardeid Amblecrown",
    "Haseid Amblecrown",
    "Khemed Amblecrown",
    "Mehmen Amblecrown",
    "Sudeiman Amblecrown",
    "Zasheir Amblecrown",
    "Darvin Amblecrown",
    "Dorn Amblecrown",
    "Evendur Amblecrown"
  ],
  tiefling: [
    "Akmenos Carrion",
    "Amnon Carrion",
    "Barakas Carrion",
    "Damakos Carrion",
    "Ekemon Carrion",
    "Iados Carrion",
    "Kairon Carrion",
    "Leucis Carrion",
    "Melech Carrion",
    "Mordai Carrion"
  ],
  goliath: [
    "A", "E", "Ga", "Ge", "Gi", "Go", "Gu", "I", "Ka", "Ke",
    "Ki", "Ko", "Ku", "Ma", "Me", "Mi", "Mo", "Mu", "Na", "Ne",
    "Ni", "No", "Nu", "O", "Pa", "Pe", "Pi", "Po", "Pu", "Ra",
    "Re", "Ri", "Ro", "Ru", "Sa", "Se", "Si", "So", "Su", "Ta",
    "Te", "Ti", "To", "Tu", "U", "Va", "Ve", "Vi", "Vo", "Vu"
  ]
}; 