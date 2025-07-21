#!/usr/bin/env node

const fs = require('fs');

// Helper function to parse damage from action description
function parseDamageFromDescription(description) {
  // Normalize the description by replacing newlines with spaces and normalizing whitespace
  const normalizedDescription = description.replace(/\s+/g, ' ').trim();
  
  // Look for damage patterns like "X (YdZ + W) damage" or "X (YdZ) damage"
  // Handle both single damage and multiple damage options (e.g., "7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands")
  
  // First, try to match the primary damage (before any "or" clause)
  const primaryDamageMatch = normalizedDescription.match(/(\d+)\s*\((\d+d\d+\s*\+\s*\d+)\)\s*(\w+)\s*damage/);
  
  if (primaryDamageMatch) {
    const damageType = primaryDamageMatch[3].charAt(0).toUpperCase() + primaryDamageMatch[3].slice(1);
    const primaryRoll = primaryDamageMatch[2];
    const primaryAverage = parseInt(primaryDamageMatch[1]);
    
    // Check if there's a secondary damage option (after "or")
    const secondaryMatch = normalizedDescription.match(/or\s+(\d+)\s*\((\d+d\d+\s*\+\s*\d+)\)\s*(\w+)\s*damage/);
    
    if (secondaryMatch) {
      // We have multiple damage options - return both
      const secondaryRoll = secondaryMatch[2];
      const secondaryAverage = parseInt(secondaryMatch[1]);
      
      return {
        primary: {
          type: damageType,
          roll: primaryRoll,
          average: primaryAverage,
          description: "One-handed"
        },
        secondary: {
          type: damageType,
          roll: secondaryRoll,
          average: secondaryAverage,
          description: "Two-handed"
        }
      };
    }
    
    // Check if there's additional damage (e.g., "plus X (YdZ) damage" or "it takes X (YdZ) damage")
    const additionalDamageMatch = normalizedDescription.match(/(?:plus|it takes)\s+(\d+)\s*\((\d+d\d+)\)\s*(\w+)\s*damage/);
    
    if (additionalDamageMatch) {
      // We have multiple damage types in one attack
      const additionalRoll = additionalDamageMatch[2];
      const additionalAverage = parseInt(additionalDamageMatch[1]);
      const additionalType = additionalDamageMatch[3].charAt(0).toUpperCase() + additionalDamageMatch[3].slice(1);
      
      return {
        primary: {
          type: damageType,
          roll: primaryRoll,
          average: primaryAverage
        },
        secondary: {
          type: additionalType,
          roll: additionalRoll,
          average: additionalAverage,
          description: "Additional"
        }
      };
    }
    
    // Single damage option
    return {
      primary: {
        type: damageType,
        roll: primaryRoll,
        average: primaryAverage
      }
    };
  }
  
  // Handle cases with just dice rolls (no modifiers)
  const simpleDamageMatch = normalizedDescription.match(/(\d+)\s*\((\d+d\d+)\)\s*(\w+)\s*damage/);
  
  if (simpleDamageMatch) {
    const damageType = simpleDamageMatch[3].charAt(0).toUpperCase() + simpleDamageMatch[3].slice(1);
    const roll = simpleDamageMatch[2];
    const average = parseInt(simpleDamageMatch[1]);
    
    // Check if there's additional damage
    const additionalDamageMatch = normalizedDescription.match(/(?:plus|it takes)\s+(\d+)\s*\((\d+d\d+)\)\s*(\w+)\s*damage/);
    
    if (additionalDamageMatch) {
      const additionalRoll = additionalDamageMatch[2];
      const additionalAverage = parseInt(additionalDamageMatch[1]);
      const additionalType = additionalDamageMatch[3].charAt(0).toUpperCase() + additionalDamageMatch[3].slice(1);
      
      return {
        primary: {
          type: damageType,
          roll: roll,
          average: average
        },
        secondary: {
          type: additionalType,
          roll: additionalRoll,
          average: additionalAverage,
          description: "Additional"
        }
      };
    }
    
    return {
      primary: {
        type: damageType,
        roll: roll,
        average: average
      }
    };
  }
  
  return null;
}

// Helper function to parse attack bonus from description
function parseAttackBonusFromDescription(description) {
  const attackMatch = description.match(/\+(\d+)\s+to\s+hit/);
  return attackMatch ? parseInt(attackMatch[1]) : null;
}

async function fetchMonsterWithRetry(monsterRef, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Fetching ${monsterRef.name} (attempt ${attempt})`);
      
      const monsterResponse = await fetch(`https://www.dnd5eapi.co/api/2014/monsters/${monsterRef.index}`);
      
      if (!monsterResponse.ok) {
        throw new Error(`HTTP ${monsterResponse.status}: ${monsterResponse.statusText}`);
      }
      
      const monster = await monsterResponse.json();
      
      if (!monster || !monster.name) {
        throw new Error('Invalid monster data received');
      }
      
      // Transform the API data to match our Monster type
      const transformedMonster = {
        name: monster.name,
        size: monster.size,
        type: monster.type,
        alignment: monster.alignment,
        challengeRating: monster.challenge_rating.toString(),
        xp: monster.xp,
        strength: monster.strength,
        dexterity: monster.dexterity,
        constitution: monster.constitution,
        intelligence: monster.intelligence,
        wisdom: monster.wisdom,
        charisma: monster.charisma,
        armorClass: monster.armor_class[0]?.value || 10,
        armorType: monster.armor_class[0]?.type || "natural",
        hitPoints: monster.hit_points,
        hitDice: monster.hit_dice,
        speed: {
          walk: monster.speed.walk ? parseInt(monster.speed.walk.replace(' ft.', '')) : undefined,
          fly: monster.speed.fly ? parseInt(monster.speed.fly.replace(' ft.', '')) : undefined,
          swim: monster.speed.swim ? parseInt(monster.speed.swim.replace(' ft.', '')) : undefined,
          climb: monster.speed.climb ? parseInt(monster.speed.climb.replace(' ft.', '')) : undefined,
          burrow: monster.speed.burrow ? parseInt(monster.speed.burrow.replace(' ft.', '')) : undefined,
          hover: monster.speed.hover === 'true'
        },
        savingThrows: {},
        skills: {},
        damageResistances: monster.damage_resistances || [],
        damageImmunities: monster.damage_immunities || [],
        conditionImmunities: monster.condition_immunities || [],
        damageVulnerabilities: monster.damage_vulnerabilities || [],
        senses: {
          darkvision: monster.senses.darkvision ? parseInt(monster.senses.darkvision.replace(' ft.', '')) : undefined,
          blindsight: monster.senses.blindsight ? parseInt(monster.senses.blindsight.replace(' ft.', '')) : undefined,
          tremorsense: monster.senses.tremorsense ? parseInt(monster.senses.tremorsense.replace(' ft.', '')) : undefined,
          truesight: monster.senses.truesight ? parseInt(monster.senses.truesight.replace(' ft.', '')) : undefined,
          passivePerception: monster.senses.passive_perception
        },
        languages: monster.languages ? monster.languages.split(',').map(l => l.trim()).filter(l => l) : [],
        proficiencyBonus: monster.proficiency_bonus,
        traits: (monster.special_abilities || []).map(ability => ({
          name: ability.name,
          description: ability.desc
        })),
        actions: (monster.actions || []).map(action => {
          const transformedAction = {
            name: action.name,
            description: action.desc
          };
          
          // Only add attackBonus if it's an attack action
          if (action.attack_bonus) {
            transformedAction.attackBonus = action.attack_bonus;
          } else {
            // Try to parse attack bonus from description
            const parsedAttackBonus = parseAttackBonusFromDescription(action.desc);
            if (parsedAttackBonus) {
              transformedAction.attackBonus = parsedAttackBonus;
            }
          }
          
          // Only add damage if there's actually damage in the description
          const parsedDamage = parseDamageFromDescription(action.desc);
          if (parsedDamage) {
            if (parsedDamage.primary) {
              transformedAction.damage = parsedDamage.primary;
            }
            if (parsedDamage.secondary) {
              transformedAction.secondaryDamage = parsedDamage.secondary;
            }
          }
          
          return transformedAction;
        }),
        legendaryActions: (monster.legendary_actions || []).map(action => {
          const transformedAction = {
            name: action.name,
            description: action.desc,
            cost: action.cost
          };
          
          // Parse damage for legendary actions
          const parsedDamage = parseDamageFromDescription(action.desc);
          if (parsedDamage && parsedDamage.primary) {
            transformedAction.damage = parsedDamage.primary;
          }
          
          return transformedAction;
        }),
        description: monster.desc || "",
        source: "SRD",
        // Always add tags for filtering
        tags: Array.isArray(monster.tags) && monster.tags.length > 0
          ? monster.tags
          : [
              monster.type?.toLowerCase() || 'unknown',
              monster.size?.toLowerCase() || 'unknown',
              monster.alignment?.toLowerCase() || 'unknown'
            ],
      };
      
      // Add skills from proficiencies
      if (monster.proficiencies) {
        for (const prof of monster.proficiencies) {
          if (prof.proficiency.index.startsWith('skill-')) {
            const skillName = prof.proficiency.name.replace('Skill: ', '');
            transformedMonster.skills[skillName] = prof.value;
          }
        }
      }
      
      return transformedMonster;
      
    } catch (error) {
      console.error(`Error fetching ${monsterRef.name} (attempt ${attempt}):`, error.message);
      
      if (attempt === maxRetries) {
        console.error(`❌ Failed to fetch ${monsterRef.name} after ${maxRetries} attempts`);
        return null;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

async function fetchAllMonsters() {
  console.log('Fetching monster list from API...');
  
  // Get the list of all monsters
  const response = await fetch('https://www.dnd5eapi.co/api/2014/monsters');
  const data = await response.json();
  
  console.log(`Found ${data.count} monsters`);
  
  const monsters = [];
  const failedMonsters = [];
  let processed = 0;
  
  // Fetch each monster individually
  for (const monsterRef of data.results) {
    const monster = await fetchMonsterWithRetry(monsterRef);
    
    if (monster) {
      monsters.push(monster);
      processed++;
      console.log(`✅ Successfully fetched ${monsterRef.name} (${processed}/${data.count})`);
    } else {
      failedMonsters.push(monsterRef.name);
      console.log(`❌ Failed to fetch ${monsterRef.name}`);
    }
    
    // Small delay to be nice to the API
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log(`\nFetch complete: ${monsters.length} successful, ${failedMonsters.length} failed`);
  
  if (failedMonsters.length > 0) {
    console.log('\nFailed monsters:');
    failedMonsters.forEach(name => console.log(`  - ${name}`));
  }
  
  return monsters;
}

function generateTypeScriptFile(monsters) {
  const beastMonsters = monsters.filter(m => m.type === 'beast');
  const aberrationMonsters = monsters.filter(m => m.type === 'aberration');
  const celestialMonsters = monsters.filter(m => m.type === 'celestial');
  const constructMonsters = monsters.filter(m => m.type === 'construct');
  const dragonMonsters = monsters.filter(m => m.type === 'dragon');
  const elementalMonsters = monsters.filter(m => m.type === 'elemental');
  const feyMonsters = monsters.filter(m => m.type === 'fey');
  const fiendMonsters = monsters.filter(m => m.type === 'fiend');
  const giantMonsters = monsters.filter(m => m.type === 'giant');
  const humanoidMonsters = monsters.filter(m => m.type === 'humanoid');
  const monstrosityMonsters = monsters.filter(m => m.type === 'monstrosity');
  const oozeMonsters = monsters.filter(m => m.type === 'ooze');
  const plantMonsters = monsters.filter(m => m.type === 'plant');
  const swarmMonsters = monsters.filter(m => m.type.startsWith('swarm'));
  const undeadMonsters = monsters.filter(m => m.type === 'undead');
  
  // Generate beast.ts
  const beastContent = `import { Monster } from '../../types/monster';

export const beastMonsters: Monster[] = ${JSON.stringify(beastMonsters, null, 2)};
`;
  
  fs.writeFileSync('../src/data/monsters/beast.ts', beastContent);
  console.log(`Generated beast.ts with ${beastMonsters.length} monsters`);
  
  // Generate aberration.ts
  const aberrationContent = `import { Monster } from '../../types/monster';

export const aberrationMonsters: Monster[] = ${JSON.stringify(aberrationMonsters, null, 2)};
`;
  
  fs.writeFileSync('../src/data/monsters/aberration.ts', aberrationContent);
  console.log(`Generated aberration.ts with ${aberrationMonsters.length} monsters`);
  
  // Continue for other types...
  const typeFiles = [
    { name: 'celestial', monsters: celestialMonsters },
    { name: 'construct', monsters: constructMonsters },
    { name: 'dragon', monsters: dragonMonsters },
    { name: 'elemental', monsters: elementalMonsters },
    { name: 'fey', monsters: feyMonsters },
    { name: 'fiend', monsters: fiendMonsters },
    { name: 'giant', monsters: giantMonsters },
    { name: 'humanoid', monsters: humanoidMonsters },
    { name: 'monstrosity', monsters: monstrosityMonsters },
    { name: 'ooze', monsters: oozeMonsters },
    { name: 'plant', monsters: plantMonsters },
    { name: 'swarm', monsters: swarmMonsters },
    { name: 'undead', monsters: undeadMonsters }
  ];
  
  for (const file of typeFiles) {
    const content = `import { Monster } from '../../types/monster';

export const ${file.name}Monsters: Monster[] = ${JSON.stringify(file.monsters, null, 2)};
`;
    
    fs.writeFileSync(`../src/data/monsters/${file.name}.ts`, content);
    console.log(`Generated ${file.name}.ts with ${file.monsters.length} monsters`);
  }
  
  // Generate index.ts
  const indexContent = `import { beastMonsters } from './beast';
import { aberrationMonsters } from './aberration';
import { celestialMonsters } from './celestial';
import { constructMonsters } from './construct';
import { dragonMonsters } from './dragon';
import { elementalMonsters } from './elemental';
import { feyMonsters } from './fey';
import { fiendMonsters } from './fiend';
import { giantMonsters } from './giant';
import { humanoidMonsters } from './humanoid';
import { monstrosityMonsters } from './monstrosity';
import { oozeMonsters } from './ooze';
import { plantMonsters } from './plant';
import { swarmMonsters } from './swarm';
import { undeadMonsters } from './undead';

export { beastMonsters } from './beast';
export { aberrationMonsters } from './aberration';
export { celestialMonsters } from './celestial';
export { constructMonsters } from './construct';
export { dragonMonsters } from './dragon';
export { elementalMonsters } from './elemental';
export { feyMonsters } from './fey';
export { fiendMonsters } from './fiend';
export { giantMonsters } from './giant';
export { humanoidMonsters } from './humanoid';
export { monstrosityMonsters } from './monstrosity';
export { oozeMonsters } from './ooze';
export { plantMonsters } from './plant';
export { swarmMonsters } from './swarm';
export { undeadMonsters } from './undead';

export const allMonsters = [
  ...beastMonsters,
  ...aberrationMonsters,
  ...celestialMonsters,
  ...constructMonsters,
  ...dragonMonsters,
  ...elementalMonsters,
  ...feyMonsters,
  ...fiendMonsters,
  ...giantMonsters,
  ...humanoidMonsters,
  ...monstrosityMonsters,
  ...oozeMonsters,
  ...plantMonsters,
  ...swarmMonsters,
  ...undeadMonsters
];
`;
  
  fs.writeFileSync('../src/data/monsters/index.ts', indexContent);
  console.log('Generated index.ts');
}

async function main() {
  try {
    console.log('Starting monster regeneration from official API...\n');
    
    // Update TypeScript types first
    console.log('Updating TypeScript types...');
    require('./update-monster-types.js');
    
    const monsters = await fetchAllMonsters();
    
    if (monsters.length === 0) {
      console.error('❌ No monsters fetched successfully');
      process.exit(1);
    }
    
    console.log('\nGenerating TypeScript files...\n');
    generateTypeScriptFile(monsters);
    
    console.log('\n✅ Monster regeneration complete!');
    console.log('All monster data is now sourced directly from the official D&D 5e API');
    console.log('Full support for multiple damage options (one-handed/two-handed)');
  } catch (error) {
    console.error('❌ Error during monster regeneration:', error);
    process.exit(1);
  }
}

main(); 