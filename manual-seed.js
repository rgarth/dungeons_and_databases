const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Sample data for testing
const testData = [
  {
    className: "Bard",
    level: 1,
    cantripsKnown: 2,
    spellsKnown: 4,
    spellcastingType: "known"
  },
  {
    className: "Cleric",
    level: 1,
    cantripsKnown: 3,
    spellsKnown: 0,
    spellcastingType: "prepared"
  }
];

async function manualSeed() {
  try {
    console.log('🌱 Manual seeding class spell limits...');
    
    // Get all classes to map names to IDs
    const classes = await prisma.dndClass.findMany();
    console.log(`Found ${classes.length} classes:`, classes.map(c => c.name));
    
    const classMap = new Map(classes.map(c => [c.name, c.id]));

    // Clear existing class spell limits
    await prisma.classSpellLimits.deleteMany({});
    console.log('Cleared existing data');

    // Create spell limits using test data
    for (const limitData of testData) {
      const classId = classMap.get(limitData.className);
      if (!classId) {
        console.warn(`⚠️  Class not found: ${limitData.className}`);
        continue;
      }

      console.log(`Creating spell limits for ${limitData.className} level ${limitData.level}`);

      // Calculate max spell level based on character level
      const maxSpellLevel = Math.min(Math.floor((limitData.level + 1) / 2), 9);
      
      // Create spell level limits object
      const spellLevelLimits = {};
      for (let level = 1; level <= maxSpellLevel; level++) {
        const maxSpells = level === 1 ? 2 : 1;
        spellLevelLimits[level.toString()] = maxSpells;
      }

      await prisma.classSpellLimits.create({
        data: {
          classId,
          level: limitData.level,
          cantripsKnown: limitData.cantripsKnown,
          spellsKnown: limitData.spellsKnown,
          spellcastingType: limitData.spellcastingType,
          maxSpellLevel,
          spellLevelLimits
        }
      });
      
      console.log(`✅ Created spell limits for ${limitData.className} level ${limitData.level}`);
    }

    console.log('✅ Manual seeding completed!');
    
    // Log summary
    const totalLimits = await prisma.classSpellLimits.count();
    console.log(`📊 Total class spell limits created: ${totalLimits}`);
    
  } catch (error) {
    console.error('❌ Error in manual seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

manualSeed(); 