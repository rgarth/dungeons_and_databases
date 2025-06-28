const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testSpellLimits() {
  try {
    console.log('Testing ClassSpellLimits data...');
    
    // Check if any data exists
    const count = await prisma.classSpellLimits.count();
    console.log(`Total ClassSpellLimits records: ${count}`);
    
    if (count > 0) {
      // Get a sample record
      const sample = await prisma.classSpellLimits.findFirst({
        include: {
          class: {
            select: { name: true }
          }
        }
      });
      console.log('Sample record:', JSON.stringify(sample, null, 2));
      
      // Check for Bard specifically
      const bardLimits = await prisma.classSpellLimits.findMany({
        where: {
          class: {
            name: 'Bard'
          }
        },
        include: {
          class: {
            select: { name: true }
          }
        }
      });
      console.log(`Bard spell limits: ${bardLimits.length} records`);
      if (bardLimits.length > 0) {
        console.log('Bard level 1:', JSON.stringify(bardLimits.find(l => l.level === 1), null, 2));
      }
    } else {
      console.log('No ClassSpellLimits data found!');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testSpellLimits(); 