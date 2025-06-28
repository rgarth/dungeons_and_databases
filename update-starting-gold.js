const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const startingGoldFormulae = {
  'Acolyte': '5d4 × 10',
  'Charlatan': '5d4 × 10',
  'Criminal': '5d4 × 10',
  'Entertainer': '5d4 × 10',
  'Folk Hero': '5d4 × 10',
  'Guild Artisan': '5d4 × 10',
  'Hermit': '5d4 × 10',
  'Noble': '5d4 × 10',
  'Outlander': '5d4 × 10',
  'Sage': '5d4 × 10',
  'Sailor': '5d4 × 10',
  'Soldier': '5d4 × 10'
};

async function updateStartingGoldFormulae() {
  try {
    console.log('Updating starting gold formulae...');
    
    for (const [backgroundName, formula] of Object.entries(startingGoldFormulae)) {
      const result = await prisma.background.update({
        where: { name: backgroundName },
        data: { startingGoldFormula: formula }
      });
      
      console.log(`Updated ${backgroundName}: ${formula}`);
    }
    
    console.log('\nAll starting gold formulae updated successfully!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateStartingGoldFormulae(); 