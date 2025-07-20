#!/usr/bin/env node

const fs = require('fs');

const filePath = 'src/data/monsters/dragon.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Fix missing commas after Multiattack descriptions
content = content.replace(
  /"description": "The dragon makes three attacks: one with its bite and two with its claws\."}/g,
  '"description": "The dragon makes three attacks: one with its bite and two with its claws."\n      },'
);

// Fix missing commas after other Multiattack descriptions
content = content.replace(
  /"description": "The dragon can use its Frightful Presence\. It then makes three attacks: one with its bite and two with its claws\."}/g,
  '"description": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."\n      },'
);

fs.writeFileSync(filePath, content);
console.log('Fixed missing commas in dragon.ts'); 