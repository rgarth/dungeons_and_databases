const fs = require('fs');
const path = require('path');

const aberrationFile = path.join(__dirname, '../src/data/monsters/aberration.ts');

console.log('Fixing aberration monster data...');

let content = fs.readFileSync(aberrationFile, 'utf8');

// Extract the monster array
const monsterArrayMatch = content.match(/export const aberrationMonsters: Monster\[\] = (\[[\s\S]*\]);/);
if (!monsterArrayMatch) {
  console.log('Could not parse aberration monsters array');
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
      
      // Fix Cloaker Tail damage type
      if (monster.name === 'Cloaker' && actionName === 'Tail' && action.damage) {
        if (action.damage.type === 'Slashing') {
          console.log(`  - Fixing ${actionName} damage type from Slashing to Bludgeoning`);
          action.damage.type = 'Bludgeoning';
          changes++;
        }
      }
      
      // Remove damage from utility abilities
      if (['Phantasms', 'Blinding Spittle'].some(ability => 
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
      
      if (['Phantasms', 'Blinding Spittle'].some(ability => 
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
      
      if (['Phantasms', 'Blinding Spittle'].some(ability => 
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
    /export const aberrationMonsters: Monster\[\] = (\[[\s\S]*\]);/,
    `export const aberrationMonsters: Monster[] = ${newMonsterArrayStr};`
  );
  
  fs.writeFileSync(aberrationFile, newContent);
  console.log(`Fixed ${changes} issues in aberration monsters`);
} else {
  console.log('No issues found in aberration monsters');
} 