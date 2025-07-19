const fs = require('fs');
const path = require('path');

const celestialFile = path.join(__dirname, '../src/data/monsters/celestial.ts');

console.log('Fixing celestial monster data...');

let content = fs.readFileSync(celestialFile, 'utf8');

// Extract the monster array
const monsterArrayMatch = content.match(/export const celestialMonsters: Monster\[\] = (\[[\s\S]*\]);/);
if (!monsterArrayMatch) {
  console.log('Could not parse celestial monsters array');
  process.exit(1);
}

const monsterArrayStr = monsterArrayMatch[1];
let monsters;

try {
  monsters = JSON.parse(monsterArrayStr);
} catch (error) {
  console.log(`JSON parsing error: ${error.message}`);
  process.exit(1);
}

let changes = 0;

monsters.forEach(monster => {
  console.log(`Checking ${monster.name}...`);
  
  // Check actions
  if (monster.actions) {
    monster.actions.forEach(action => {
      const actionName = action.name;
      
      // Remove damage from utility abilities
      if (['Healing Touch', 'Change Shape', 'Flying Sword', 'Teleport'].some(ability => 
        actionName.toLowerCase().includes(ability.toLowerCase().replace(/\s+/g, '')))) {
        if (action.damage) {
          console.log(`  - Removing damage from ${actionName}`);
          delete action.damage;
          changes++;
        }
      }
    });
  }
  
  // Check legendary actions
  if (monster.legendaryActions) {
    monster.legendaryActions.forEach(action => {
      const actionName = action.name;
      
      if (['Healing Touch', 'Change Shape', 'Flying Sword', 'Teleport'].some(ability => 
        actionName.toLowerCase().includes(ability.toLowerCase().replace(/\s+/g, '')))) {
        if (action.damage) {
          console.log(`  - Removing damage from legendary ${actionName}`);
          delete action.damage;
          changes++;
        }
      }
    });
  }
  
  // Check traits
  if (monster.traits) {
    monster.traits.forEach(trait => {
      const traitName = trait.name;
      
      if (['Healing Touch', 'Change Shape', 'Flying Sword', 'Teleport'].some(ability => 
        traitName.toLowerCase().includes(ability.toLowerCase().replace(/\s+/g, '')))) {
        if (trait.damage) {
          console.log(`  - Removing damage from trait ${traitName}`);
          delete trait.damage;
          changes++;
        }
      }
    });
  }
});

if (changes > 0) {
  // Reconstruct the file
  const newMonsterArrayStr = JSON.stringify(monsters, null, 2);
  const newContent = content.replace(
    /export const celestialMonsters: Monster\[\] = (\[[\s\S]*\]);/,
    `export const celestialMonsters: Monster[] = ${newMonsterArrayStr};`
  );
  
  fs.writeFileSync(celestialFile, newContent);
  console.log(`Fixed ${changes} issues in celestial monsters`);
} else {
  console.log('No issues found in celestial monsters');
} 