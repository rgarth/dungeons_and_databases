// Test script to demonstrate dwarf age system
// This is a demonstration of the dwarf age logic without importing TypeScript modules

console.log('🧙‍♂️ Dwarf Age System Demonstration\n');

// Dwarf age stages based on D&D 5e lore
const DWARF_AGE_STAGES = [
  { stage: 'child', ageRange: [0, 29], description: 'Childhood - still learning and growing' },
  { stage: 'adolescent', ageRange: [30, 39], description: 'Adolescence - finding their place in society' },
  { stage: 'young_adult', ageRange: [40, 79], description: 'Young adulthood - establishing themselves' },
  { stage: 'adult', ageRange: [80, 149], description: 'Full adulthood - respected member of community' },
  { stage: 'middle_aged', ageRange: [150, 239], description: 'Middle age - wise and experienced' },
  { stage: 'elderly', ageRange: [240, 299], description: 'Elderly - highly respected and wise' },
  { stage: 'venerable', ageRange: [300, 400], description: 'Venerable - living legend, ancient wisdom' }
];

function getDwarfAgeStage(age) {
  for (const stage of DWARF_AGE_STAGES) {
    if (age >= stage.ageRange[0] && age <= stage.ageRange[1]) {
      return stage;
    }
  }
  return DWARF_AGE_STAGES[DWARF_AGE_STAGES.length - 1]; // venerable
}

function getDwarfAppearanceDescription(age, gender) {
  const stage = getDwarfAgeStage(age);
  
  const maleBeardDescriptions = {
    'child': 'no beard, clean-shaven, youthful appearance',
    'adolescent': 'scraggly beard, patchy facial hair, adolescent growth',
    'young_adult': 'well-groomed beard, full facial hair, traditional dwarven style',
    'adult': 'thick, well-maintained beard, traditional braids or beads, signs of care',
    'middle_aged': 'thick, long beard, often with elaborate braids, beads, or metalwork, well-maintained',
    'elderly': 'long, flowing beard, often white or gray, elaborate braids and decorations, sign of status',
    'venerable': 'extremely long, flowing beard, often white, elaborate decorations and braids, legendary status'
  };
  
  const femaleBeardDescriptions = {
    'child': 'no facial hair, clean-shaven',
    'adolescent': 'minimal facial hair, clean-shaven',
    'young_adult': 'short, well-groomed beard or clean-shaven',
    'adult': 'short, well-maintained beard or clean-shaven',
    'middle_aged': 'moderate beard, well-groomed, traditional style',
    'elderly': 'longer beard, well-maintained, elaborate braids',
    'venerable': 'long, flowing beard, elaborate decorations, legendary status'
  };
  
  const appearanceDescriptions = {
    'child': 'youthful dwarf features, smooth skin, minimal wrinkles, child-like proportions, round face, bright eyes',
    'adolescent': 'young dwarf features, some fine lines beginning, developing adult proportions, earnest expression',
    'young_adult': 'young adult dwarf, mature features, some fine lines, confident expression, strong features',
    'adult': 'mature adult dwarf, weathered features, prominent wrinkles, experienced expression, strong character',
    'middle_aged': 'middle-aged dwarf, deeply weathered features, prominent wrinkles, wise expression, experienced',
    'elderly': 'elderly dwarf, deeply wrinkled face, wise eyes, weathered but strong features, venerable appearance',
    'venerable': 'venerable dwarf, ancient features, deeply wrinkled, wise and knowing expression, legendary appearance'
  };
  
  const beardDesc = gender === 'Female' ? femaleBeardDescriptions[stage.stage] : maleBeardDescriptions[stage.stage];
  return `${appearanceDescriptions[stage.stage]}, ${beardDesc}`;
}

// Test different ages for male dwarves
console.log('=== Male Dwarf Examples ===');
const maleAges = [15, 35, 60, 100, 200, 250, 350];
maleAges.forEach(age => {
  const stage = getDwarfAgeStage(age);
  const appearance = getDwarfAppearanceDescription(age, 'Male');
  
  console.log(`\nAge ${age}:`);
  console.log(`  Stage: ${stage.stage}`);
  console.log(`  Maturity: ${stage.description}`);
  console.log(`  Appearance: ${appearance}`);
});

// Test different ages for female dwarves
console.log('\n=== Female Dwarf Examples ===');
const femaleAges = [15, 35, 60, 100, 200, 250, 350];
femaleAges.forEach(age => {
  const stage = getDwarfAgeStage(age);
  const appearance = getDwarfAppearanceDescription(age, 'Female');
  
  console.log(`\nAge ${age}:`);
  console.log(`  Stage: ${stage.stage}`);
  console.log(`  Maturity: ${stage.description}`);
  console.log(`  Appearance: ${appearance}`);
});

// Show diverse descriptions for unspecified ages
console.log('\n=== Diverse Age Descriptions (No Age Specified) ===');
console.log('\nMale (no age):');
console.log('diverse dwarf ages from young adult to elderly, young adult dwarf (40-79 years), mature features, some fine lines, confident expression, adult dwarf (80-149 years), weathered features, prominent wrinkles, experienced expression, middle-aged dwarf (150-239 years), deeply weathered features, prominent wrinkles, wise expression, elderly dwarf (240-299 years), deeply wrinkled face, wise eyes, venerable appearance, varied beard styles: thick, well-maintained beard, thick, long beard with braids, long, flowing beard with decorations, traditional dwarven features, stocky build, broad shoulders');

console.log('\nFemale (no age):');
console.log('diverse dwarf ages from young adult to elderly, young adult dwarf (40-79 years), mature features, some fine lines, confident expression, adult dwarf (80-149 years), weathered features, prominent wrinkles, experienced expression, middle-aged dwarf (150-239 years), deeply weathered features, prominent wrinkles, wise expression, elderly dwarf (240-299 years), deeply wrinkled face, wise eyes, venerable appearance, varied beard styles: short, well-groomed beard, moderate beard, well-maintained, longer beard, elaborate braids, traditional dwarven features, stocky build, broad shoulders');

console.log('\n✅ Dwarf age system demonstration complete!');
console.log('\nKey Features:');
console.log('• Dwarves reach adulthood at age 50 (not 18 like humans)');
console.log('• They can live 350+ years, with some reaching 400+');
console.log('• Age stages: Child (0-29), Adolescent (30-39), Young Adult (40-79), Adult (80-149), Middle-aged (150-239), Elderly (240-299), Venerable (300+)');
console.log('• Female dwarves typically have shorter, more groomed beards');
console.log('• When no age is specified, the system encourages diverse age representation'); 