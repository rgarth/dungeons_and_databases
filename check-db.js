const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function check() {
  try {
    const spells = await prisma.spell.count();
    const subraces = await prisma.subrace.count();
    const ammunitionSuggestions = await prisma.ammunitionSuggestion.count();
    const classSpellLimits = await prisma.classSpellLimits.count();
    
    console.log('Spells:', spells);
    console.log('Subraces:', subraces);
    console.log('Ammunition Suggestions:', ammunitionSuggestions);
    console.log('Class Spell Limits:', classSpellLimits);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

check(); 