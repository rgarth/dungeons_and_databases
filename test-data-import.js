const { classSpellLimitsData } = require('./prisma/data/class-spell-limits-data.ts');

console.log('Testing data import...');
console.log(`Data length: ${classSpellLimitsData.length}`);
console.log('First few records:');
console.log(JSON.stringify(classSpellLimitsData.slice(0, 3), null, 2)); 