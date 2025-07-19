const fs = require('fs');
const path = require('path');

const undeadFile = path.join(__dirname, '../src/data/monsters/undead.ts');

console.log('Fixing undead monster data...');

let content = fs.readFileSync(undeadFile, 'utf8');

// Extract the monster array
const monsterArrayMatch = content.match(/export const undeadMonsters: Monster\[\] = (\[[\s\S]*\]);/);
if (!monsterArrayMatch) {
  console.log('Could not parse undead monsters array');
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
      if (['Multiattack', 'Etherealness', 'Horrifying Visage', 'Possession', 'Dreadful Glare', 'Charm', 'Children of the Night', 'Create Specter'].some(ability => 
        actionName.toLowerCase().includes(ability.toLowerCase().replace(/\s+/g, '')))) {
        if (action.damage) {
          console.log(`  - Removing damage from ${actionName}`);
          delete action.damage;
          changes++;
        }
      }
      
      // Fix wrong damage types
      if (action.damage) {
        // Longsword should be slashing
        if (actionName === 'Longsword' && action.damage.type === 'Bludgeoning') {
          console.log(`  - Fixing ${actionName} damage type from Bludgeoning to Slashing`);
          action.damage.type = 'Slashing';
          changes++;
        }
      }
    });
  }
  
  // Check legendary actions
  if (monster.legendaryActions) {
    monster.legendaryActions.forEach(action => {
      const actionName = action.name;
      
      if (['Multiattack', 'Etherealness', 'Horrifying Visage', 'Possession', 'Dreadful Glare', 'Charm', 'Children of the Night', 'Create Specter'].some(ability => 
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
      
      if (['Multiattack', 'Etherealness', 'Horrifying Visage', 'Possession', 'Dreadful Glare', 'Charm', 'Children of the Night', 'Create Specter'].some(ability => 
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
    /export const undeadMonsters: Monster\[\] = (\[[\s\S]*\]);/,
    `export const undeadMonsters: Monster[] = ${newMonsterArrayStr};`
  );
  
  fs.writeFileSync(undeadFile, newContent);
  console.log(`Fixed ${changes} issues in undead monsters`);
} else {
  console.log('No issues found in undead monsters');
} 