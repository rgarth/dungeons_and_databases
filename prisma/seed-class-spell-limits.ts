import prisma from './client';
import { classSpellLimitsData } from './data/class-spell-limits-data';

export async function seedClassSpellLimits() {
  console.log('🌱 Seeding class spell limits...');

  try {
    // Get all classes to map names to IDs
    const classes = await prisma.dndClass.findMany();
    const classMap = new Map(classes.map(c => [c.name, c.id]));

    // Clear existing class spell limits
    await prisma.classSpellLimits.deleteMany({});

    // Create spell limits using the provided data
    for (const limitData of classSpellLimitsData) {
      const classId = classMap.get(limitData.className);
      if (!classId) {
        console.warn(`⚠️  Class not found: ${limitData.className}`);
        continue;
      }

      // Calculate max spell level based on character level
      const maxSpellLevel = Math.min(Math.floor((limitData.level + 1) / 2), 9);
      
      // Create spell level limits object
      const spellLevelLimits: Record<string, number> = {};
      for (let level = 1; level <= maxSpellLevel; level++) {
        // This is a simplified calculation - in practice, you'd want to use the actual PHB tables
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
    }

    console.log('✅ Class spell limits seeded successfully!');
    
    // Log summary
    const totalLimits = await prisma.classSpellLimits.count();
    console.log(`📊 Total class spell limits created: ${totalLimits}`);
    
    // Show breakdown by class
    const limitsByClass = await prisma.classSpellLimits.groupBy({
      by: ['classId'],
      _count: { level: true }
    });
    
    for (const group of limitsByClass) {
      const className = classes.find(c => c.id === group.classId)?.name || 'Unknown';
      console.log(`  ${className}: ${group._count.level} spell level limits`);
    }

  } catch (error) {
    console.error('❌ Error seeding class spell limits:', error);
    throw error;
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  seedClassSpellLimits()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
} 