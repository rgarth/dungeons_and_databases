const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkClasses() {
  try {
    console.log('Checking class starting gold formulas...\n');
    
    const classes = await prisma.dndClass.findMany({
      select: {
        name: true,
        startingGoldFormula: true
      }
    });
    
    console.log('Class starting gold formulas:');
    classes.forEach(c => {
      console.log(`${c.name}: ${c.startingGoldFormula || 'null'}`);
    });
    
    console.log('\nTotal classes:', classes.length);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkClasses(); 