const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testTraitsSeed() {
  try {
    console.log('🧪 Testing traits seeding...');
    
    // Import and run the seed functions
    const { seedTraits, seedRaceTraitAssociations } = require('./prisma/seed-traits.ts');
    
    await seedTraits();
    await seedRaceTraitAssociations();
    
    // Verify the data was seeded
    const traitCount = await prisma.trait.count();
    const raceTraitCount = await prisma.raceTrait.count();
    
    console.log(`✅ Traits seeded: ${traitCount}`);
    console.log(`✅ Race-trait associations: ${raceTraitCount}`);
    
    // Show some sample traits
    const sampleTraits = await prisma.trait.findMany({
      take: 5,
      select: { name: true, type: true }
    });
    
    console.log('📋 Sample traits:');
    sampleTraits.forEach(trait => {
      console.log(`  - ${trait.name} (${trait.type})`);
    });
    
  } catch (error) {
    console.error('❌ Error testing traits seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testTraitsSeed(); 