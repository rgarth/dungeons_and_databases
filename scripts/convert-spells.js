const fs = require('fs');

// Read the downloaded SRD spells
const srdSpells = JSON.parse(fs.readFileSync('/tmp/srd_spells.json', 'utf8'));

console.log(`Converting ${srdSpells.length} spells from SRD format...`);

// Convert to our database format
const convertedSpells = srdSpells.map(spell => {
  // Convert level - handle "cantrip" as 0
  let level = 0;
  if (spell.level === 'cantrip') {
    level = 0;
  } else {
    level = parseInt(spell.level);
  }

  // Convert school - capitalize first letter
  const school = spell.school.charAt(0).toUpperCase() + spell.school.slice(1);

  // Convert classes array to JSON string (properly formatted)
  const classes = JSON.stringify(spell.classes.map(c => 
    c.charAt(0).toUpperCase() + c.slice(1)
  ));

  // Convert components to our format
  let components = '';
  if (spell.components.verbal) components += 'V';
  if (spell.components.somatic) {
    if (components) components += ', ';
    components += 'S';
  }
  if (spell.components.material) {
    if (components) components += ', ';
    components += 'M';
    if (spell.components.materials_needed && spell.components.materials_needed.length > 0) {
      components += ` (${spell.components.materials_needed.join(', ')})`;
    }
  }

  return {
    name: spell.name,
    level: level,
    school: school,
    castingTime: spell.casting_time,
    range: spell.range,
    components: components,
    duration: spell.duration,
    description: spell.description.replace(/\n/g, ' ').trim(),
    classes: classes
  };
});

// Group by level for easier management
const spellsByLevel = {};
convertedSpells.forEach(spell => {
  if (!spellsByLevel[spell.level]) {
    spellsByLevel[spell.level] = [];
  }
  spellsByLevel[spell.level].push(spell);
});

// Generate TypeScript export
let output = `// Complete D&D 5e SRD Spells Database\n`;
output += `// Converted from official SRD data - ${convertedSpells.length} total spells\n\n`;

output += `export const spellsData = [\n`;

// Add spells level by level
for (let level = 0; level <= 9; level++) {
  const spells = spellsByLevel[level] || [];
  if (spells.length > 0) {
    output += `  // Level ${level} ${level === 0 ? '(Cantrips)' : ''} - ${spells.length} spells\n`;
    spells.forEach((spell, index) => {
      output += `  {\n`;
      output += `    name: "${spell.name}",\n`;
      output += `    level: ${spell.level},\n`;
      output += `    school: "${spell.school}",\n`;
      output += `    castingTime: "${spell.castingTime}",\n`;
      output += `    range: "${spell.range}",\n`;
      output += `    components: "${spell.components}",\n`;
      output += `    duration: "${spell.duration}",\n`;
      output += `    description: "${spell.description.replace(/"/g, '\\"')}",\n`;
      output += `    classes: "${spell.classes.replace(/"/g, '\\"')}"\n`;
      output += `  }${index === spells.length - 1 && level === 9 ? '' : ','}\n`;
    });
    if (level < 9 && Object.keys(spellsByLevel).some(l => parseInt(l) > level)) {
      output += `\n`;
    }
  }
}

output += `]\n`;

// Write the converted file
fs.writeFileSync('prisma/data/spells-data.ts', output);

// Generate summary
console.log('\n📊 Spell Conversion Summary:');
for (let level = 0; level <= 9; level++) {
  const count = spellsByLevel[level]?.length || 0;
  if (count > 0) {
    console.log(`   Level ${level} ${level === 0 ? '(Cantrips)' : ''}: ${count} spells`);
  }
}
console.log(`\n✅ Total: ${convertedSpells.length} spells converted`);
console.log(`📁 Output: prisma/data/spells-data.ts`); 