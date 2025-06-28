const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkBackgrounds() {
  try {
    console.log('Checking backgrounds in database...');
    
    const backgrounds = await prisma.background.findMany({
      select: {
        name: true,
        phbDescription: true,
        startingGoldFormula: true,
        startingGold: true
      },
      orderBy: { name: 'asc' }
    });

    console.log(`Found ${backgrounds.length} backgrounds:`);
    
    backgrounds.forEach(bg => {
      console.log(`\n${bg.name}:`);
      console.log(`  PHB Description: ${bg.phbDescription ? 'Has data' : 'NULL'}`);
      console.log(`  Starting Gold Formula: ${bg.startingGoldFormula ? 'Has data' : 'NULL'}`);
      console.log(`  Starting Gold: ${bg.startingGold}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkBackgrounds(); 