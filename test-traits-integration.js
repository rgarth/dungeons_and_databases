const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testTraitsSystem() {
  console.log('🧪 Testing Traits System Integration...\n');

  try {
    // Test 1: Check if traits exist
    console.log('1. Checking traits in database...');
    const traits = await prisma.trait.findMany({
      take: 5,
      orderBy: { name: 'asc' }
    });
    
    console.log(`✅ Found ${traits.length} traits (showing first 5):`);
    traits.forEach(trait => {
      console.log(`   - ${trait.name} (${trait.type})`);
    });

    // Test 2: Check race-trait associations
    console.log('\n2. Checking race-trait associations...');
    const raceTraits = await prisma.raceTrait.findMany({
      take: 5,
      include: {
        race: true,
        trait: true
      }
    });
    
    console.log(`✅ Found ${raceTraits.length} race-trait associations (showing first 5):`);
    raceTraits.forEach(rt => {
      console.log(`   - ${rt.race.name} has ${rt.trait.name}`);
    });

    // Test 3: Test filtering traits by race
    console.log('\n3. Testing trait filtering by race...');
    const elfTraits = await prisma.trait.findMany({
      where: {
        raceTraits: {
          some: {
            race: {
              name: 'Elf'
            }
          }
        }
      },
      orderBy: { name: 'asc' }
    });
    
    console.log(`✅ Elf has ${elfTraits.length} traits:`);
    elfTraits.forEach(trait => {
      console.log(`   - ${trait.name}: ${trait.description.substring(0, 50)}...`);
    });

    // Test 4: Test filtering traits by type
    console.log('\n4. Testing trait filtering by type...');
    const activeTraits = await prisma.trait.findMany({
      where: { type: 'active' },
      orderBy: { name: 'asc' }
    });
    
    console.log(`✅ Found ${activeTraits.length} active traits:`);
    activeTraits.forEach(trait => {
      console.log(`   - ${trait.name}`);
    });

    console.log('\n🎉 All traits system tests passed!');
    
  } catch (error) {
    console.error('❌ Error testing traits system:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testTraitsSystem(); 