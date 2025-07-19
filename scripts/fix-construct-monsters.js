const fs = require('fs');
const path = require('path');

const constructFile = path.join(__dirname, '../src/data/monsters/construct.ts');

console.log('Fixing construct monster data...');

let content = fs.readFileSync(constructFile, 'utf8');

// Extract the monster array
const monsterArrayMatch = content.match(/export const constructMonsters: Monster\[\] = (\[[\s\S]*\]);/);
if (!monsterArrayMatch) {
  console.log('Could not parse construct monsters array');
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
      
      // Fix Rug of Smothering Smother - add missing damage
      if (monster.name === 'Rug of Smothering' && actionName === 'Smother') {
        if (!action.damage) {
          console.log(`  - Adding missing damage to ${actionName}`);
          action.damage = {
            "type": "Bludgeoning",
            "roll": "2d6+3",
            "average": 10
          };
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
    /export const constructMonsters: Monster\[\] = (\[[\s\S]*\]);/,
    `export const constructMonsters: Monster[] = ${newMonsterArrayStr};`
  );
  
  fs.writeFileSync(constructFile, newContent);
  console.log(`Fixed ${changes} issues in construct monsters`);
} else {
  console.log('No issues found in construct monsters');
} 