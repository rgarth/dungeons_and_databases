// Character generation utilities

// Starting Equipment by Class
export function getStartingEquipment(characterClass: string, background: string): string[] {
  const classEquipment: Record<string, string[]> = {
    Barbarian: ['Greataxe', 'Handaxe (2)', 'Javelin (4)', 'Leather Armor', 'Explorers Pack'],
    Bard: ['Rapier', 'Leather Armor', 'Dagger', 'Simple Weapon', 'Lute', 'Entertainers Pack'],
    Cleric: ['Scale Mail', 'Shield', 'Warhammer', 'Light Crossbow', 'Priests Pack'],
    Druid: ['Leather Armor', 'Shield', 'Scimitar', 'Simple Weapon', 'Explorers Pack'],
    Fighter: ['Chain Mail', 'Shield', 'Martial Weapon', 'Martial Weapon', 'Light Crossbow', 'Dungeoneer Pack'],
    Monk: ['Shortsword', 'Simple Weapon', 'Dart (10)', 'Dungeoneer Pack'],
    Paladin: ['Chain Mail', 'Shield', 'Martial Weapon', 'Javelin (5)', 'Explorers Pack'],
    Ranger: ['Scale Mail', 'Shield', 'Shortsword (2)', 'Simple Weapon', 'Longbow', 'Dungeoneer Pack'],
    Rogue: ['Leather Armor', 'Shortsword (2)', 'Shortbow', 'Arrow (20)', 'Thieves Tools', 'Dungeoneer Pack'],
    Sorcerer: ['Light Crossbow', 'Simple Weapon', 'Dagger (2)', 'Dungeoneer Pack'],
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