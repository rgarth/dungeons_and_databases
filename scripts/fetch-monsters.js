const fs = require('fs');
const path = require('path');

// Function to convert API monster data to our TypeScript format
function convertMonsterData(apiMonster) {
  // Helper function to convert speed object
  function convertSpeed(speed) {
    const converted = {};
    if (speed.walk) converted.walk = speed.walk;
    if (speed.fly) converted.fly = speed.fly;
    if (speed.swim) converted.swim = speed.swim;
    if (speed.climb) converted.climb = speed.climb;
    if (speed.burrow) converted.burrow = speed.burrow;
    if (speed.hover) converted.hover = speed.hover;
    return converted;
  }

  // Helper function to convert senses
  function convertSenses(senses) {
    const converted = {
      passivePerception: 10 // Default value
    };
    
    if (senses.darkvision) converted.darkvision = senses.darkvision;
    if (senses.blindsight) converted.blindsight = senses.blindsight;
    if (senses.tremorsense) converted.tremorsense = senses.tremorsense;
    if (senses.truesight) converted.truesight = senses.truesight;
    if (senses.passive_perception) converted.passivePerception = senses.passive_perception;
    
    return converted;
  }

  // Helper function to convert actions
  function convertActions(actions) {
    return actions.map(action => {
      const converted = {
        name: action.name,
        description: action.desc
      };
      
      if (action.attack_bonus) converted.attackBonus = action.attack_bonus;
      if (action.damage) {
        converted.damage = {
          type: action.damage[0]?.damage_type?.name || 'bludgeoning',
          roll: action.damage[0]?.damage_dice || '1d4',
          average: action.damage[0]?.damage_bonus || 0
        };
      }
      
      return converted;
    });
  }

  // Helper function to convert legendary actions
  function convertLegendaryActions(legendaryActions) {
    return legendaryActions.map(action => ({
      name: action.name,
      cost: action.cost,
      description: action.desc
    }));
  }

  // Helper function to convert traits
  function convertTraits(traits) {
    return traits.map(trait => ({
      name: trait.name,
      description: trait.desc
    }));
  }

  // Helper function to generate image prompt
  function generateImagePrompt(monster) {
    const size = monster.size;
    const type = monster.type;
    const name = monster.name;
    
    let prompt = `A ${size.toLowerCase()} ${type} creature`;
    
    // Add specific details based on monster type
    if (type === 'dragon') {
      prompt += ` with scales, wings, and a powerful presence`;
    } else if (type === 'humanoid') {
      prompt += ` with humanoid features`;
    } else if (type === 'beast') {
      prompt += ` with animal-like features`;
    } else if (type === 'aberration') {
      prompt += ` with otherworldly and alien appearance`;
    } else if (type === 'fiend') {
      prompt += ` with demonic or devilish features`;
    } else if (type === 'celestial') {
      prompt += ` with divine and angelic features`;
    } else if (type === 'undead') {
      prompt += ` with deathly and spectral features`;
    } else if (type === 'construct') {
      prompt += ` with mechanical or magical construction`;
    } else if (type === 'elemental') {
      prompt += ` with elemental energy`;
    } else if (type === 'fey') {
      prompt += ` with magical and ethereal features`;
    } else if (type === 'giant') {
      prompt += ` with massive size and strength`;
    } else if (type === 'monstrosity') {
      prompt += ` with monstrous and terrifying features`;
    } else if (type === 'ooze') {
      prompt += ` with amorphous and fluid form`;
    } else if (type === 'plant') {
      prompt += ` with plant-like features`;
    }
    
    return prompt;
  }

  // Helper function to generate tags
  function generateTags(monster) {
    const tags = [monster.type];
    
    if (monster.size) tags.push(monster.size.toLowerCase());
    if (monster.alignment && monster.alignment !== 'Unaligned') {
      tags.push(monster.alignment.toLowerCase().replace(' ', '-'));
    }
    
    // Add specific tags based on type
    if (monster.type === 'dragon') tags.push('dragon', 'legendary');
    if (monster.type === 'humanoid') tags.push('humanoid');
    if (monster.type === 'beast') tags.push('beast', 'animal');
    if (monster.type === 'aberration') tags.push('aberration', 'alien');
    if (monster.type === 'fiend') tags.push('fiend', 'evil');
    if (monster.type === 'celestial') tags.push('celestial', 'good');
    if (monster.type === 'undead') tags.push('undead', 'evil');
    if (monster.type === 'construct') tags.push('construct', 'magical');
    if (monster.type === 'elemental') tags.push('elemental');
    if (monster.type === 'fey') tags.push('fey', 'magical');
    if (monster.type === 'giant') tags.push('giant', 'large');
    if (monster.type === 'monstrosity') tags.push('monstrosity');
    if (monster.type === 'ooze') tags.push('ooze', 'amorphous');
    if (monster.type === 'plant') tags.push('plant');
    
    return tags;
  }

  return {
    name: apiMonster.name,
    size: apiMonster.size,
    type: apiMonster.type,
    subtype: apiMonster.subtype || undefined,
    alignment: apiMonster.alignment,
    challengeRating: apiMonster.challenge_rating.toString(),
    xp: apiMonster.xp,
    
    // Ability Scores
    strength: apiMonster.strength,
    dexterity: apiMonster.dexterity,
    constitution: apiMonster.constitution,
    intelligence: apiMonster.intelligence,
    wisdom: apiMonster.wisdom,
    charisma: apiMonster.charisma,
    
    // Combat Stats
    armorClass: apiMonster.armor_class[0]?.value || 10,
    armorType: apiMonster.armor_class[0]?.type || 'natural armor',
    hitPoints: apiMonster.hit_points,
    hitDice: apiMonster.hit_dice,
    speed: convertSpeed(apiMonster.speed),
    
    // Proficiencies
    savingThrows: apiMonster.proficiencies?.filter(p => p.proficiency.name.includes('Saving Throw')).reduce((acc, p) => {
      const ability = p.proficiency.name.split(' ')[0].toLowerCase();
      acc[ability] = p.value;
      return acc;
    }, {}) || {},
    skills: apiMonster.proficiencies?.filter(p => !p.proficiency.name.includes('Saving Throw')).reduce((acc, p) => {
      acc[p.proficiency.name] = p.value;
      return acc;
    }, {}) || {},
    damageResistances: apiMonster.damage_resistances || [],
    damageImmunities: apiMonster.damage_immunities || [],
    conditionImmunities: apiMonster.condition_immunities || [],
    damageVulnerabilities: apiMonster.damage_vulnerabilities || [],
    
    // Senses
    senses: convertSenses(apiMonster.senses),
    
    // Languages
    languages: apiMonster.languages || [],
    telepathy: apiMonster.senses?.telepathy || undefined,
    
    // Challenge Rating Details
    proficiencyBonus: Math.floor((parseInt(apiMonster.challenge_rating) - 1) / 4) + 2,
    
    // Actions and Abilities
    traits: convertTraits(apiMonster.special_abilities || []),
    actions: convertActions(apiMonster.actions || []),
    legendaryActions: convertLegendaryActions(apiMonster.legendary_actions || []),
    
    // Description and Lore
    description: apiMonster.desc || `A ${apiMonster.size.toLowerCase()} ${apiMonster.type} with challenge rating ${apiMonster.challenge_rating}.`,
    background: apiMonster.desc || `This ${apiMonster.type} is a formidable opponent.`,
    environment: [], // Would need additional data source
    organization: '', // Would need additional data source
    
    // Image Generation
    imagePrompt: generateImagePrompt(apiMonster),
    imageStyle: 'fantasy',
    
    // Metadata
    source: 'SRD',
    tags: generateTags(apiMonster)
  };
}

// Main function to fetch all monsters
async function fetchAllMonsters() {
  try {
    console.log('Fetching monster list...');
    const response = await fetch('https://www.dnd5eapi.co/api/2014/monsters');
    const data = await response.json();
    
    console.log(`Found ${data.results.length} monsters. Fetching individual monster data...`);
    
    const monsters = [];
    let processed = 0;
    
    for (const monsterRef of data.results) {
      try {
        console.log(`Fetching ${monsterRef.name} (${processed + 1}/${data.results.length})`);
        
        const monsterResponse = await fetch(`https://www.dnd5eapi.co/api/2014/monsters/${monsterRef.index}`);
        const monsterData = await monsterResponse.json();
        
        const convertedMonster = convertMonsterData(monsterData);
        monsters.push(convertedMonster);
        
        processed++;
        
        // Add a small delay to be respectful to the API
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Error fetching ${monsterRef.name}:`, error.message);
      }
    }
    
    console.log(`Successfully converted ${monsters.length} monsters.`);
    
    // Write to TypeScript file
    const tsContent = `import { Monster } from '@/types/monster';

export const monstersData: Monster[] = ${JSON.stringify(monsters, null, 2)};

// Helper functions for monster data
export const getMonsterByName = (name: string): Monster | undefined => {
  return monstersData.find(monster => 
    monster.name.toLowerCase() === name.toLowerCase()
  );
};

export const getMonstersByType = (type: string): Monster[] => {
  return monstersData.filter(monster => 
    monster.type.toLowerCase() === type.toLowerCase()
  );
};

export const getMonstersByChallengeRating = (cr: string): Monster[] => {
  return monstersData.filter(monster => 
    monster.challengeRating === cr
  );
};

export const getMonstersBySize = (size: string): Monster[] => {
  return monstersData.filter(monster => 
    monster.size.toLowerCase() === size.toLowerCase()
  );
};

export const searchMonsters = (query: string): Monster[] => {
  const lowerQuery = query.toLowerCase();
  return monstersData.filter(monster => 
    monster.name.toLowerCase().includes(lowerQuery) ||
    monster.type.toLowerCase().includes(lowerQuery) ||
    monster.subtype?.toLowerCase().includes(lowerQuery) ||
    monster.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
`;
    
    fs.writeFileSync(path.join(__dirname, '../src/data/monsters-data.ts'), tsContent);
    console.log('Monster data written to src/data/monsters-data.ts');
    
    // Also write a summary
    const summary = {
      totalMonsters: monsters.length,
      byType: monsters.reduce((acc, monster) => {
        acc[monster.type] = (acc[monster.type] || 0) + 1;
        return acc;
      }, {}),
      bySize: monsters.reduce((acc, monster) => {
        acc[monster.size] = (acc[monster.size] || 0) + 1;
        return acc;
      }, {}),
      byCR: monsters.reduce((acc, monster) => {
        acc[monster.challengeRating] = (acc[monster.challengeRating] || 0) + 1;
        return acc;
      }, {})
    };
    
    fs.writeFileSync(path.join(__dirname, 'monster-summary.json'), JSON.stringify(summary, null, 2));
    console.log('Monster summary written to scripts/monster-summary.json');
    
  } catch (error) {
    console.error('Error fetching monsters:', error);
  }
}

// Run the script
fetchAllMonsters(); 