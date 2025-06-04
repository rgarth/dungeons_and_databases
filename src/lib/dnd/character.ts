// Character generation utilities
import { Weapon, WEAPONS, Armor, ARMOR } from './equipment';

// D&D 5e Equipment Packages by Class (players choose from these options)
export function getEquipmentPackageOptions(characterClass: string): Array<{name: string, items: string[]}> {
  const packageOptions: Record<string, Array<{name: string, items: string[]}>> = {
    Barbarian: [
      {
        name: "Wilderness Warrior",
        items: ['Greataxe', 'Handaxe', 'Handaxe', 'Javelin', 'Javelin', 'Javelin', 'Javelin', 'Leather Armor', 'Explorers Pack', 'Shield']
      },
      {
        name: "Tribal Hunter", 
        items: ['Battleaxe', 'Shortbow', 'Quiver of 20 Arrows', 'Handaxe', 'Handaxe', 'Leather Armor', 'Explorers Pack']
      },
      {
        name: "Berserker",
        items: ['Greatsword', 'Handaxe', 'Handaxe', 'Javelin', 'Javelin', 'Leather Armor', 'Explorers Pack']
      }
    ],
    Fighter: [
      {
        name: "Armored Warrior",
        items: ['Chain Mail', 'Shield', 'Longsword', 'Handaxe', 'Handaxe', 'Light Crossbow', 'Quiver of 20 Bolts', 'Dungeoneers Pack']
      },
      {
        name: "Archer",
        items: ['Leather Armor', 'Longbow', 'Quiver of 20 Arrows', 'Shortsword', 'Shortsword', 'Dungeoneers Pack']
      },
      {
        name: "Weapon Master",
        items: ['Chain Mail', 'Greatsword', 'Handaxe', 'Handaxe', 'Light Crossbow', 'Quiver of 20 Bolts', 'Dungeoneers Pack']
      },
      {
        name: "Scout",
        items: ['Studded Leather Armor', 'Shield', 'Scimitar', 'Shortbow', 'Quiver of 20 Arrows', 'Explorers Pack']
      }
    ],
    Cleric: [
      {
        name: "Battle Cleric",
        items: ['Chain Mail', 'Shield', 'Warhammer', 'Light Crossbow', 'Quiver of 20 Bolts', 'Priests Pack', 'Holy Symbol']
      },
      {
        name: "Divine Healer",
        items: ['Scale Mail', 'Shield', 'Mace', 'Javelin', 'Javelin', 'Priests Pack', 'Holy Symbol', 'Healers Kit']
      },
      {
        name: "Temple Guardian",
        items: ['Chain Mail', 'Shield', 'Morningstar', 'Handaxe', 'Handaxe', 'Priests Pack', 'Holy Symbol']
      }
    ],
    Wizard: [
      {
        name: "Scholar Mage",
        items: ['Quarterstaff', 'Spellbook', 'Component Pouch', 'Scholars Pack', 'Dagger', 'Dagger']
      },
      {
        name: "Court Wizard",
        items: ['Dagger', 'Spellbook', 'Arcane Focus', 'Scholars Pack', 'Light Crossbow', 'Quiver of 20 Bolts']
      },
      {
        name: "War Mage",
        items: ['Quarterstaff', 'Spellbook', 'Arcane Focus', 'Dungeoneers Pack', 'Scimitar']
      }
    ],
    Rogue: [
      {
        name: "Burglar",
        items: ['Studded Leather Armor', 'Shortsword', 'Shortsword', 'Thieves Tools', 'Burglars Pack', 'Leather Armor', 'Dagger', 'Dagger']
      },
      {
        name: "Scout",
        items: ['Leather Armor', 'Shortbow', 'Quiver of 20 Arrows', 'Shortsword', 'Thieves Tools', 'Dungeoneers Pack', 'Dagger', 'Dagger']
      },
      {
        name: "Assassin",
        items: ['Studded Leather Armor', 'Shortsword', 'Shortbow', 'Quiver of 20 Arrows', 'Thieves Tools', 'Dungeoneers Pack', 'Dagger', 'Dagger', 'Dagger']
      }
    ],
    Ranger: [
      {
        name: "Beast Hunter",
        items: ['Studded Leather Armor', 'Shortsword', 'Shortsword', 'Longbow', 'Quiver of 20 Arrows', 'Explorers Pack']
      },
      {
        name: "Tracker",
        items: ['Scale Mail', 'Shield', 'Scimitar', 'Shortbow', 'Quiver of 20 Arrows', 'Explorers Pack']
      },
      {
        name: "Wilderness Guide",
        items: ['Leather Armor', 'Rapier', 'Longbow', 'Quiver of 20 Arrows', 'Explorers Pack', 'Handaxe', 'Handaxe']
      }
    ],
    Paladin: [
      {
        name: "Holy Knight",
        items: ['Chain Mail', 'Shield', 'Longsword', 'Javelin', 'Javelin', 'Javelin', 'Javelin', 'Javelin', 'Explorers Pack', 'Holy Symbol']
      },
      {
        name: "Divine Warrior",
        items: ['Chain Mail', 'Greatsword', 'Handaxe', 'Handaxe', 'Javelin', 'Javelin', 'Explorers Pack', 'Holy Symbol']
      },
      {
        name: "Crusader",
        items: ['Chain Mail', 'Shield', 'Warhammer', 'Light Crossbow', 'Quiver of 20 Bolts', 'Explorers Pack', 'Holy Symbol']
      }
    ],
    Bard: [
      {
        name: "Traveling Minstrel",
        items: ['Leather Armor', 'Rapier', 'Entertainers Pack', 'Lute', 'Dagger']
      },
      {
        name: "College Scholar",
        items: ['Studded Leather Armor', 'Shortsword', 'Scholars Pack', 'Lyre', 'Dagger', 'Dagger']
      },
      {
        name: "Court Bard",
        items: ['Leather Armor', 'Scimitar', 'Entertainers Pack', 'Dulcimer', 'Shortbow', 'Quiver of 20 Arrows']
      }
    ],
    Warlock: [
      {
        name: "Pact Keeper",
        items: ['Leather Armor', 'Scimitar', 'Light Crossbow', 'Quiver of 20 Bolts', 'Scholars Pack', 'Dagger', 'Dagger']
      },
      {
        name: "Eldritch Warrior",
        items: ['Studded Leather Armor', 'Shortsword', 'Shortbow', 'Quiver of 20 Arrows', 'Dungeoneers Pack', 'Dagger', 'Dagger']
      },
      {
        name: "Dark Scholar",
        items: ['Leather Armor', 'Quarterstaff', 'Light Crossbow', 'Quiver of 20 Bolts', 'Scholars Pack', 'Dagger', 'Dagger']
      }
    ],
    Sorcerer: [
      {
        name: "Wild Mage",
        items: ['Dagger', 'Dagger', 'Component Pouch', 'Dungeoneers Pack', 'Light Crossbow', 'Quiver of 20 Bolts']
      },
      {
        name: "Noble Bloodline",
        items: ['Quarterstaff', 'Arcane Focus', 'Explorers Pack', 'Dagger', 'Dagger']
      },
      {
        name: "Elemental Adept",
        items: ['Dagger', 'Component Pouch', 'Scholars Pack', 'Light Crossbow', 'Quiver of 20 Bolts']
      }
    ],
    Druid: [
      {
        name: "Circle Guardian",
        items: ['Leather Armor', 'Shield', 'Scimitar', 'Javelin', 'Javelin', 'Explorers Pack', 'Druidcraft Focus']
      },
      {
        name: "Wilderness Hermit",
        items: ['Studded Leather Armor', 'Quarterstaff', 'Dart', 'Dart', 'Dart', 'Dart', 'Explorers Pack', 'Druidcraft Focus']
      },
      {
        name: "Beast Friend",
        items: ['Leather Armor', 'Shield', 'Spear', 'Shortbow', 'Quiver of 20 Arrows', 'Explorers Pack', 'Druidcraft Focus']
      }
    ],
    Monk: [
      {
        name: "Temple Initiate",
        items: ['Shortsword', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Dungeoneers Pack']
      },
      {
        name: "Wandering Ascetic",
        items: ['Handaxe', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Explorers Pack']
      },
      {
        name: "Mountain Monk",
        items: ['Spear', 'Shortbow', 'Quiver of 20 Arrows', 'Explorers Pack']
      }
    ]
  };

  return packageOptions[characterClass] || [
    {
      name: "Basic Adventurer",
      items: ['Dagger', 'Explorers Pack', 'Leather Armor']
    }
  ];
}

// D&D 5e Equipment Packs (separate from weapons)
export function getEquipmentPackOptions(): Array<{name: string, items: Array<{name: string, quantity: number}>, description: string}> {
  return [
    {
      name: "Dungeoneers Pack",
      description: "For exploring dungeons and underground adventures",
      items: [
        {name: 'Backpack', quantity: 1},
        {name: 'Crowbar', quantity: 1},
        {name: 'Hammer', quantity: 1},
        {name: 'Piton', quantity: 10},
        {name: 'Torch', quantity: 10},
        {name: 'Tinderbox', quantity: 1},
        {name: 'Rations (10 days)', quantity: 1},
        {name: 'Waterskin', quantity: 1},
        {name: 'Hempen Rope (50 feet)', quantity: 1}
      ]
    },
    {
      name: "Explorers Pack", 
      description: "For wilderness exploration and outdoor adventures",
      items: [
        {name: 'Backpack', quantity: 1},
        {name: 'Bedroll', quantity: 1},
        {name: 'Mess Kit', quantity: 1},
        {name: 'Tinderbox', quantity: 1},
        {name: 'Torch', quantity: 10},
        {name: 'Rations (10 days)', quantity: 1},
        {name: 'Waterskin', quantity: 1},
        {name: 'Hempen Rope (50 feet)', quantity: 1}
      ]
    },
    {
      name: "Entertainers Pack",
      description: "For bards and performers",
      items: [
        {name: 'Backpack', quantity: 1},
        {name: 'Bedroll', quantity: 1},
        {name: 'Costume Clothes', quantity: 2},
        {name: 'Candle', quantity: 5},
        {name: 'Rations (5 days)', quantity: 1},
        {name: 'Waterskin', quantity: 1},
        {name: 'Disguise Kit', quantity: 1}
      ]
    },
    {
      name: "Priests Pack",
      description: "For clerics and religious characters", 
      items: [
        {name: 'Backpack', quantity: 1},
        {name: 'Blanket', quantity: 1},
        {name: 'Tinderbox', quantity: 1},
        {name: 'Alms Box', quantity: 1},
        {name: 'Incense', quantity: 2},
        {name: 'Censer', quantity: 1},
        {name: 'Vestments', quantity: 1},
        {name: 'Rations (2 days)', quantity: 1},
        {name: 'Waterskin', quantity: 1}
      ]
    },
    {
      name: "Scholars Pack",
      description: "For wizards and learned characters",
      items: [
        {name: 'Backpack', quantity: 1},
        {name: 'Book of Lore', quantity: 1},
        {name: 'Ink', quantity: 2},
        {name: 'Quill', quantity: 1},
        {name: 'Parchment (10 sheets)', quantity: 1},
        {name: 'Little Bag of Sand', quantity: 1},
        {name: 'Small Knife', quantity: 1}
      ]
    },
    {
      name: "Burglars Pack", 
      description: "For rogues and sneaky characters",
      items: [
        {name: 'Backpack', quantity: 1},
        {name: 'Ball Bearings (1000)', quantity: 1},
        {name: 'String (10 feet)', quantity: 1},
        {name: 'Bell', quantity: 1},
        {name: 'Candle', quantity: 5},
        {name: 'Crowbar', quantity: 1},
        {name: 'Hammer', quantity: 1},
        {name: 'Piton', quantity: 10},
        {name: 'Hooded Lantern', quantity: 1},
        {name: 'Oil (2 flasks)', quantity: 1},
        {name: 'Rations (5 days)', quantity: 1},
        {name: 'Waterskin', quantity: 1},
        {name: 'Hempen Rope (50 feet)', quantity: 1}
      ]
    }
  ];
}

// Weapon suggestions by class (players can customize freely)
export function getClassWeaponSuggestions(characterClass: string): Weapon[] {
  const weaponSuggestions: Record<string, string[]> = {
    Barbarian: ['Greataxe', 'Handaxe', 'Javelin'],
    Fighter: ['Longsword', 'Shield', 'Handaxe', 'Light Crossbow'],
    Cleric: ['Warhammer', 'Light Crossbow'],
    Wizard: ['Quarterstaff', 'Dagger'],
    Rogue: ['Shortsword', 'Shortbow', 'Dagger'],
    Ranger: ['Shortsword', 'Longbow'],
    Paladin: ['Longsword', 'Javelin'],
    Bard: ['Rapier', 'Dagger'],
    Warlock: ['Scimitar', 'Light Crossbow'],
    Sorcerer: ['Dagger', 'Light Crossbow'],
    Druid: ['Scimitar', 'Javelin'],
    Monk: ['Shortsword', 'Dart']
  };

  const suggestions = weaponSuggestions[characterClass] || ['Dagger'];
  return suggestions.map(name => WEAPONS.find(w => w.name === name)).filter(Boolean) as Weapon[];
}

// Armor suggestions by class 
export function getClassArmorSuggestions(characterClass: string): Armor[] {
  const armorSuggestions: Record<string, string[]> = {
    Barbarian: ['Leather Armor'],
    Fighter: ['Chain Mail', 'Shield'],
    Cleric: ['Scale Mail', 'Shield'],
    Wizard: [],
    Rogue: ['Leather Armor'],
    Ranger: ['Studded Leather'],
    Paladin: ['Chain Mail', 'Shield'], 
    Bard: ['Leather Armor'],
    Warlock: ['Leather Armor'],
    Sorcerer: [],
    Druid: ['Leather Armor', 'Shield'],
    Monk: []
  };

  const suggestions = armorSuggestions[characterClass] || [];
  return suggestions.map(name => ARMOR.find(a => a.name === name)).filter(Boolean) as Armor[];
}

// Legacy function for auto-assignment (keep for backwards compatibility but discourage use)
export function getStartingEquipment(characterClass: string, background: string): string[] {
  const classEquipment: Record<string, string[]> = {
    Barbarian: ['Greataxe', 'Handaxe', 'Handaxe', 'Javelin', 'Javelin', 'Javelin', 'Javelin', 'Leather Armor', 'Explorers Pack'],
    Bard: ['Rapier', 'Leather Armor', 'Dagger', 'Simple Weapon', 'Lute', 'Entertainers Pack'],
    Cleric: ['Scale Mail', 'Shield', 'Warhammer', 'Light Crossbow', 'Priests Pack'],
    Druid: ['Leather Armor', 'Shield', 'Scimitar', 'Simple Weapon', 'Explorers Pack'],
    Fighter: ['Chain Mail', 'Shield', 'Martial Weapon', 'Martial Weapon', 'Light Crossbow', 'Dungeoneer Pack'],
    Monk: ['Shortsword', 'Simple Weapon', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Dart', 'Dungeoneer Pack'],
    Paladin: ['Chain Mail', 'Shield', 'Martial Weapon', 'Javelin', 'Javelin', 'Javelin', 'Javelin', 'Javelin', 'Explorers Pack'],
    Ranger: ['Scale Mail', 'Shield', 'Shortsword', 'Shortsword', 'Simple Weapon', 'Longbow', 'Dungeoneer Pack'],
    Rogue: ['Leather Armor', 'Shortsword', 'Shortsword', 'Shortbow', 'Arrow (20)', 'Thieves Tools', 'Dungeoneer Pack'],
    Sorcerer: ['Light Crossbow', 'Simple Weapon', 'Dagger', 'Dagger', 'Dungeoneer Pack'],
    Warlock: ['Light Armor', 'Simple Weapon', 'Simple Weapon', 'Light Crossbow', 'Scholars Pack'],
    Wizard: ['Quarterstaff', 'Dagger', 'Light Crossbow', 'Scholars Pack', 'Spellbook']
  };

  const backgroundEquipment: Record<string, string[]> = {
    Acolyte: ['Holy Symbol', 'Prayer Book', 'Incense (5)', 'Vestments', 'Common Clothes', 'Belt Pouch'],
    Criminal: ['Crowbar', 'Dark Common Clothes', 'Hood', 'Belt Pouch'],
    'Folk Hero': ['Artisan Tools', 'Shovel', 'Iron Pot', 'Common Clothes', 'Belt Pouch'],
    Noble: ['Signet Ring', 'Scroll of Pedigree', 'Fine Clothes', 'Belt Pouch'],
    Sage: ['Ink Bottle', 'Quill', 'Small Knife', 'Letter', 'Common Clothes', 'Belt Pouch'],
    Soldier: ['Insignia of Rank', 'Trophy', 'Deck of Cards', 'Common Clothes', 'Belt Pouch']
  };

  return [
    ...(classEquipment[characterClass] || []),
    ...(backgroundEquipment[background] || [])
  ];
}

// Background skill proficiencies
export function getBackgroundSkills(background: string): string[] {
  const backgroundSkills: Record<string, string[]> = {
    Acolyte: ['Insight', 'Religion'],
    Criminal: ['Deception', 'Stealth'],
    'Folk Hero': ['Animal Handling', 'Survival'],
    Noble: ['History', 'Persuasion'],
    Sage: ['Arcana', 'History'],
    Soldier: ['Athletics', 'Intimidation'],
    Charlatan: ['Deception', 'Sleight of Hand'],
    Entertainer: ['Acrobatics', 'Performance'],
    'Guild Artisan': ['Insight', 'Persuasion'],
    Hermit: ['Medicine', 'Religion'],
    Outlander: ['Athletics', 'Survival'],
    Sailor: ['Athletics', 'Perception']
  };
  
  return backgroundSkills[background] || [];
}

// Fantasy Name Generator using online API
export async function generateFantasyName(race: string, gender?: string): Promise<string> {
  try {
    // Map D&D races to IronArachne API format (direct matches!)
    const raceMapping: Record<string, string> = {
      'Dragonborn': 'dragonborn',
      'Dwarf': 'dwarf',
      'Elf': 'elf', 
      'Gnome': 'gnome',
      'Half-Elf': 'half-elf',
      'Halfling': 'halfling',
      'Half-Orc': 'half-orc',
      'Human': 'human',
      'Tiefling': 'tiefling'
    };

    const apiRace = raceMapping[race];
    if (!apiRace) {
      console.log('Race not found in mapping, using fallback');
      return generateFallbackName(race);
    }

    // Determine name type based on gender
    let nameType = 'given'; // Default gender-neutral for non-binary/other
    if (gender === 'Male') {
      nameType = 'male';
    } else if (gender === 'Female') {
      nameType = 'female';
    }

    console.log(`Trying API calls for race: ${apiRace}, nameType: ${nameType}`);

    // Get first name and family name
    const [firstNameResponse, familyNameResponse] = await Promise.all([
      fetch(`https://names.ironarachne.com/race/${apiRace}/${nameType}/1`),
      fetch(`https://names.ironarachne.com/race/${apiRace}/family/1`)
    ]);

    console.log(`API responses: ${firstNameResponse.status}, ${familyNameResponse.status}`);

    if (!firstNameResponse.ok || !familyNameResponse.ok) {
      console.log(`API failed with status codes: ${firstNameResponse.status}, ${familyNameResponse.status}`);
      throw new Error(`API returned ${firstNameResponse.status} or ${familyNameResponse.status}`);
    }

    const [firstNames, familyNames] = await Promise.all([
      firstNameResponse.json(),
      familyNameResponse.json()
    ]);

    console.log('API responses:', { firstNames, familyNames });
    
    // Handle different possible response formats
    let firstName = '';
    let familyName = '';
    
    // Try to extract names from various possible formats
    if (typeof firstNames === 'object' && firstNames !== null) {
      if (Array.isArray(firstNames) && firstNames.length > 0) {
        firstName = firstNames[0];
      } else if (firstNames.names && Array.isArray(firstNames.names)) {
        firstName = firstNames.names[0];
      } else if (firstNames.name) {
        firstName = firstNames.name;
      } else if (typeof firstNames === 'string') {
        firstName = firstNames;
      } else {
        // Try to get the first property value if it's a string
        const values = Object.values(firstNames);
        if (values.length > 0 && typeof values[0] === 'string') {
          firstName = values[0];
        }
      }
    }
    
    if (typeof familyNames === 'object' && familyNames !== null) {
      if (Array.isArray(familyNames) && familyNames.length > 0) {
        familyName = familyNames[0];
      } else if (familyNames.names && Array.isArray(familyNames.names)) {
        familyName = familyNames.names[0];
      } else if (familyNames.name) {
        familyName = familyNames.name;
      } else if (typeof familyNames === 'string') {
        familyName = familyNames;
      } else {
        // Try to get the first property value if it's a string
        const values = Object.values(familyNames);
        if (values.length > 0 && typeof values[0] === 'string') {
          familyName = values[0];
        }
      }
    }
    
    if (firstName && familyName) {
      const fullName = `${firstName} ${familyName}`;
      console.log('Generated API name:', fullName);
      return fullName;
    }
    
    console.log('Could not extract names from API response, using fallback');
    console.log('firstName extracted:', firstName, 'familyName extracted:', familyName);
    // Fallback to local generation if API fails
    return generateFallbackName(race);
  } catch (error) {
    console.error('Error generating fantasy name:', error);
    return generateFallbackName(race);
  }
}

// Fallback name generator if API fails - now generates full names too
function generateFallbackName(race: string): string {
  console.log('Using fallback name generation for race:', race);
  
  const firstNamePrefixes = ['Aer', 'Bel', 'Cel', 'Dar', 'Eld', 'Fel', 'Gar', 'Hal', 'Ith', 'Jor', 'Kel', 'Lor', 'Mor', 'Nal', 'Ord', 'Pel', 'Quin', 'Ral', 'Sel', 'Tar', 'Ul', 'Vel', 'Wil', 'Xar', 'Yor', 'Zel'];
  const firstNameSuffixes = ['ahn', 'ath', 'dar', 'eth', 'ian', 'iel', 'ith', 'lyn', 'mir', 'nal', 'orn', 'ric', 'tar', 'wen', 'wyn'];
  
  const lastNamePrefixes = ['Iron', 'Gold', 'Stone', 'Fire', 'Storm', 'Night', 'Moon', 'Star', 'Wind', 'Frost', 'Shadow', 'Light', 'Dark', 'Silver', 'Bronze'];
  const lastNameSuffixes = ['forge', 'hammer', 'blade', 'heart', 'soul', 'ward', 'guard', 'shield', 'crown', 'throne', 'bane', 'song', 'walker', 'rider', 'born'];
  
  // Customize prefixes slightly based on race
  let raceSpecificFirstPrefixes = firstNamePrefixes;
  let raceSpecificLastPrefixes = lastNamePrefixes;
  
  if (race === 'Elf' || race === 'Half-Elf') {
    raceSpecificFirstPrefixes = ['Aer', 'Cel', 'Eld', 'Ith', 'Kel', 'Lor', 'Pel', 'Sel', 'Vel'];
    raceSpecificLastPrefixes = ['Moon', 'Star', 'Wind', 'Light', 'Silver', 'Song', 'Walker'];
  } else if (race === 'Dwarf') {
    raceSpecificFirstPrefixes = ['Bel', 'Dar', 'Gar', 'Mor', 'Ord', 'Tar', 'Ul'];
    raceSpecificLastPrefixes = ['Iron', 'Stone', 'Fire', 'Frost', 'Bronze', 'Hammer', 'Forge'];
  } else if (race === 'Dragonborn') {
    raceSpecificFirstPrefixes = ['Dar', 'Gar', 'Mor', 'Xar', 'Yor', 'Zel'];
    raceSpecificLastPrefixes = ['Fire', 'Storm', 'Crown', 'Throne', 'Bane', 'Born'];
  }
  
  const firstName = raceSpecificFirstPrefixes[Math.floor(Math.random() * raceSpecificFirstPrefixes.length)] + 
                   firstNameSuffixes[Math.floor(Math.random() * firstNameSuffixes.length)];
  
  const lastName = raceSpecificLastPrefixes[Math.floor(Math.random() * raceSpecificLastPrefixes.length)] + 
                  lastNameSuffixes[Math.floor(Math.random() * lastNameSuffixes.length)];
  
  const fullName = `${firstName} ${lastName}`;
  console.log('Generated fallback name:', fullName);
  return fullName;
} 