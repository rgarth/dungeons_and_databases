#!/usr/bin/env node

const fs = require('fs');

const filePath = 'src/data/monsters/dragon.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Fix trailing commas in Multiattack actions
content = content.replace(
  /"description": "The dragon can use its Frightful Presence\. It then makes three attacks: one with its bite and two with its claws\."\s*},/g,
  '"description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."\n      },'
);

// Fix any other trailing commas in actions
content = content.replace(
  /"description": "([^"]+)"\s*},/g,
  (match, description) => {
    // Only fix if it's not already properly formatted
    if (match.includes('\n')) {
      return match;
    }
    return `"description": "${description}"\n      },`;
  }
);

fs.writeFileSync(filePath, content);
console.log('Fixed trailing commas in dragon.ts'); 