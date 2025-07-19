const fs = require('fs');
const path = require('path');

const beastFile = path.join(__dirname, '../src/data/monsters/beast.ts');

console.log('Fixing beast monster data...');

let content = fs.readFileSync(beastFile, 'utf8');

// Extract the monster array
const monsterArrayMatch = content.match(/export const beastMonsters: Monster\[\] = (\[[\s\S]*\]);/);
if (!monsterArrayMatch) {
  console.log('Could not parse beast monsters array');
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
      
      // Fix wrong damage types
      if (action.damage) {
        // Bite attacks should be piercing
        if (actionName === 'Bite' && action.damage.type !== 'Piercing') {
          console.log(`  - Fixing ${actionName} damage type from ${action.damage.type} to Piercing`);
          action.damage.type = 'Piercing';
          changes++;
        }
        
        // Claw attacks should be slashing
        if ((actionName === 'Claw' || actionName === 'Claws') && action.damage.type !== 'Slashing') {
          console.log(`  - Fixing ${actionName} damage type from ${action.damage.type} to Slashing`);
          action.damage.type = 'Slashing';
          changes++;
        }
        
        // Gore attacks should be piercing
        if (actionName === 'Gore' && action.damage.type !== 'Piercing') {
          console.log(`  - Fixing ${actionName} damage type from ${action.damage.type} to Piercing`);
          action.damage.type = 'Piercing';
          changes++;
        }
      }
      
      // Add missing attack bonuses for weapon attacks
      if (action.description && action.description.includes('Melee Weapon Attack') && !action.attackBonus) {
        // Extract attack bonus from description
        const attackMatch = action.description.match(/\+(\d+) to hit/);
        if (attackMatch) {
          const attackBonus = parseInt(attackMatch[1]);
          console.log(`  - Adding missing attack bonus ${attackBonus} to ${actionName}`);
          action.attackBonus = attackBonus;
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
    /export const beastMonsters: Monster\[\] = (\[[\s\S]*\]);/,
    `export const beastMonsters: Monster[] = ${newMonsterArrayStr};`
  );
  
  fs.writeFileSync(beastFile, newContent);
  console.log(`Fixed ${changes} issues in beast monsters`);
} else {
  console.log('No issues found in beast monsters');
} 