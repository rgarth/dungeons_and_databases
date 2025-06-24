import { PrismaClient } from '@prisma/client';
import { spellLevelLimitsData } from './data/spell-level-limits-data';

const prisma = new PrismaClient();

async function seedSpellLevelLimits() {
  console.log('🌱 Seeding spell level limits...');

  try {
    // Get all classes to map names to IDs
    const classes = await prisma.dndClass.findMany();
    const classMap = new Map(classes.map(c => [c.name, c.id]));

    // Clear existing spell limits
    await prisma.classSpellLimits.deleteMany({});

    // Insert new spell level limits data
    for (const limitData of spellLevelLimitsData) {
      const classId = classMap.get(limitData.className);
      if (!classId) {
        console.warn(`⚠️  Class not found: ${limitData.className}`);
        continue;
      }

      await prisma.classSpellLimits.create({
        data: {
          classId,
          level: limitData.level,
          cantripsKnown: limitData.cantripsKnown,
          spellsKnown: limitData.spellsKnown,
          spellcastingType: limitData.spellcastingType,
          maxSpellLevel: limitData.maxSpellLevel,
          spellLevelLimits: limitData.spellLevelLimits
        }
      });
    }

    console.log('✅ Spell level limits seeded successfully!');
    
    // Log summary
    const totalLimits = await prisma.classSpellLimits.count();
    console.log(`📊 Total spell level limits created: ${totalLimits}`);
    
    // Show breakdown by class
    const limitsByClass = await prisma.classSpellLimits.groupBy({
      by: ['classId'],
      _count: { level: true }
    });
    
    for (const group of limitsByClass) {
      const className = classes.find(c => c.id === group.classId)?.name || 'Unknown';
      console.log(`  ${className}: ${group._count.level} levels`);
    }

  } catch (error) {
    console.error('❌ Error seeding spell level limits:', error);
    throw error;
  }
}

// Run the seed function
seedSpellLevelLimits()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }); 